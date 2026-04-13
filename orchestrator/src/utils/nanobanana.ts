/**
 * nanobanana.ts
 * Google AI visual generation for the Video Content Creator Agent.
 *
 * Models available on this key:
 *   IMAGE: models/nano-banana-pro-preview  (~$0.02/image)
 *          models/gemini-2.5-flash-image   (cheaper fallback)
 *          models/imagen-4.0-generate-001  (Imagen 4, highest quality)
 *   VIDEO: models/veo-3.0-generate-001     (~$0.35/sec)
 *          models/veo-3.1-generate-preview  (latest)
 *
 * Requires billing enabled on Google Cloud project 697071962869
 * API key: GOOGLE_AI_API_KEY in orchestrator/.env
 */

import * as fs from 'fs';
import * as path from 'path';

const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

// ─── IMAGE GENERATION ─────────────────────────────────────────────────────────

export type ImageModel =
  | 'nano-banana-pro-preview'  // nanobanana — best quality, character consistency
  | 'gemini-2.5-flash-image'   // faster, cheaper
  | 'imagen-4.0-generate-001'; // highest quality, different endpoint

export interface GenerateImageRequest {
  prompt: string;
  outputPath: string;
  model?: ImageModel;
  negativePrompt?: string;
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
  referenceImagePath?: string;  // chaining: pass previous frame as visual anchor
}

export interface GenerateImageResult {
  success: boolean;
  filePath?: string;
  mimeType?: string;
  error?: string;
}

/**
 * Generate a single image asset for a Remotion composition.
 * Returns the absolute file path — pass directly as Remotion <Img src={...} />.
 */
export async function generateImage(req: GenerateImageRequest): Promise<GenerateImageResult> {
  requireApiKey();

  const model = req.model ?? 'nano-banana-pro-preview';

  // Imagen 4 uses a different endpoint
  if (model === 'imagen-4.0-generate-001') {
    return generateWithImagen(req);
  }

  const url = `${API_BASE}/models/${model}:generateContent?key=${GOOGLE_AI_API_KEY}`;
  const prompt = buildImagePrompt(req.prompt, req.negativePrompt, req.aspectRatio);

  // Build parts — prepend reference image if chaining frames
  const parts: any[] = [];
  if (req.referenceImagePath && fs.existsSync(req.referenceImagePath)) {
    const imgData = fs.readFileSync(req.referenceImagePath).toString('base64');
    const ext = path.extname(req.referenceImagePath).toLowerCase();
    const mimeType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';
    parts.push({ inlineData: { mimeType, data: imgData } });
  }
  parts.push({ text: prompt });

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: { message: response.statusText } })) as any;
    return { success: false, error: `${response.status}: ${err?.error?.message ?? response.statusText}` };
  }

  const data = await response.json() as any;
  const imgPart = data.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData?.data);

  if (!imgPart) {
    return { success: false, error: 'No image data in response' };
  }

  ensureDir(req.outputPath);
  const buffer = Buffer.from(imgPart.inlineData.data, 'base64');
  fs.writeFileSync(req.outputPath, buffer);

  return {
    success: true,
    filePath: path.resolve(req.outputPath),
    mimeType: imgPart.inlineData.mimeType,
  };
}

async function generateWithImagen(req: GenerateImageRequest): Promise<GenerateImageResult> {
  const url = `${API_BASE}/models/imagen-4.0-generate-001:predict?key=${GOOGLE_AI_API_KEY}`;
  const prompt = buildImagePrompt(req.prompt, req.negativePrompt, req.aspectRatio);

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: req.aspectRatio ?? '9:16',
      },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({})) as any;
    return { success: false, error: `${response.status}: ${err?.error?.message ?? response.statusText}` };
  }

  const data = await response.json() as any;
  const b64 = data.predictions?.[0]?.bytesBase64Encoded;

  if (!b64) {
    return { success: false, error: 'No image in Imagen response' };
  }

  ensureDir(req.outputPath);
  fs.writeFileSync(req.outputPath, Buffer.from(b64, 'base64'));

  return {
    success: true,
    filePath: path.resolve(req.outputPath),
    mimeType: 'image/png',
  };
}

// ─── BATCH IMAGE GENERATION ───────────────────────────────────────────────────

export interface VideoAssetScene {
  id: string;         // e.g. 'hook-bg', 'problem-visual', 'cta-card'
  prompt: string;
  negativePrompt?: string;
  aspectRatio?: GenerateImageRequest['aspectRatio'];
  model?: ImageModel;
}

export interface GenerateVideoAssetsRequest {
  scenes: VideoAssetScene[];
  outputDir: string;
}

export interface GenerateVideoAssetsResult {
  success: boolean;
  assets: Record<string, string>;   // scene id → absolute file path
  errors: Record<string, string>;
}

/**
 * Generate all visual assets for a Remotion composition in one call.
 * Assets are saved to outputDir/{scene.id}.png and returned as a map.
 *
 * Usage in Remotion:
 *   const result = await generateVideoAssets({ scenes: [...], outputDir: 'assets/video-01' })
 *   // Then pass result.assets into your composition inputProps
 *   // <Img src={inputProps.assets['hook-bg']} />
 */
export async function generateVideoAssets(req: GenerateVideoAssetsRequest): Promise<GenerateVideoAssetsResult> {
  const assets: Record<string, string> = {};
  const errors: Record<string, string> = {};

  for (const scene of req.scenes) {
    const outputPath = path.join(req.outputDir, `${scene.id}.png`);

    try {
      const result = await generateImage({
        prompt: scene.prompt,
        outputPath,
        model: scene.model,
        negativePrompt: scene.negativePrompt,
        aspectRatio: scene.aspectRatio,
      });

      if (result.success && result.filePath) {
        assets[scene.id] = result.filePath;
        console.log(`  ✓ ${scene.id} → ${result.filePath}`);
      } else {
        errors[scene.id] = result.error ?? 'Unknown error';
        console.error(`  ✗ ${scene.id}: ${result.error}`);
      }
    } catch (err) {
      errors[scene.id] = err instanceof Error ? err.message : String(err);
    }

    // Rate limit buffer — free tier: 2 req/min; paid: 10 req/min
    await sleep(6500);
  }

  return {
    success: Object.keys(errors).length === 0,
    assets,
    errors,
  };
}

// ─── VIDEO GENERATION (VEO) ───────────────────────────────────────────────────

export type VeoModel =
  | 'veo-3.0-generate-001'      // stable, production
  | 'veo-3.1-generate-preview'; // latest

export interface GenerateVideoClipRequest {
  prompt: string;
  outputPath: string;            // .mp4
  model?: VeoModel;
  durationSeconds?: 4 | 6 | 8;  // VEO accepts 4, 6, or 8. Must be 8 with reference images.
  aspectRatio?: '9:16' | '16:9';
  referenceImagePath?: string;   // optional — image-to-video mode (uses referenceImages API)
}

export interface GenerateVideoClipResult {
  success: boolean;
  filePath?: string;
  durationSeconds?: number;
  error?: string;
}

/**
 * Generate a video clip with VEO 3.
 * These clips can be used directly in Remotion as <Video src={...} /> props
 * or stitched together via nanobanana post-processing.
 *
 * Note: VEO generation is async — this polls until complete (typically 30-90s).
 * Cost: ~$0.35/second of generated video
 */
export async function generateVideoClip(req: GenerateVideoClipRequest): Promise<GenerateVideoClipResult> {
  requireApiKey();

  const model = req.model ?? 'veo-3.1-generate-preview';
  const url = `${API_BASE}/models/${model}:predictLongRunning?key=${GOOGLE_AI_API_KEY}`;

  // With reference images, durationSeconds MUST be "8" (string, not number)
  const hasRefImage = req.referenceImagePath && fs.existsSync(req.referenceImagePath);
  const duration = hasRefImage ? '8' : String(req.durationSeconds ?? 8);

  const body: any = {
    instances: [{ prompt: req.prompt }],
    parameters: {
      aspectRatio: req.aspectRatio ?? '9:16',
      durationSeconds: duration,  // API requires string: "4", "6", or "8"
    },
  };

  // Image-to-video mode — use instances[0].image with bytesBase64Encoded
  // NOTE: referenceImages with inlineData is NOT supported by veo-3.1-generate-preview
  // despite docs claiming otherwise. Use the Vertex-style image field instead.
  if (hasRefImage) {
    const imgData = fs.readFileSync(req.referenceImagePath!).toString('base64');
    const ext = path.extname(req.referenceImagePath!).toLowerCase();
    const mimeType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';
    body.instances[0].image = { bytesBase64Encoded: imgData, mimeType };
  }

  const initResponse = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!initResponse.ok) {
    const err = await initResponse.json().catch(() => ({})) as any;
    return { success: false, error: `VEO init failed ${initResponse.status}: ${err?.error?.message}` };
  }

  const operation = await initResponse.json() as { name: string; done?: boolean; response?: any; error?: any };

  // Poll for completion
  const operationUrl = `${API_BASE}/${operation.name}?key=${GOOGLE_AI_API_KEY}`;
  let attempts = 0;
  const maxAttempts = 30; // 5 min max

  while (attempts < maxAttempts) {
    await sleep(10000); // poll every 10s
    attempts++;

    const pollRes = await fetch(operationUrl, {
      headers: { 'x-goog-api-key': GOOGLE_AI_API_KEY! },
    });
    const pollData = await pollRes.json() as any;

    if (pollData.error) {
      return { success: false, error: `VEO generation failed: ${pollData.error.message}` };
    }

    if (pollData.done) {
      const sample = pollData.response?.generateVideoResponse?.generatedSamples?.[0];

      // New API: video is a URI to download from the Files API
      const videoUri: string | undefined = sample?.video?.uri;
      // Legacy API: video was base64-embedded
      const videoB64: string | undefined =
        pollData.response?.predictions?.[0]?.bytesBase64Encoded ??
        pollData.response?.predictions?.[0]?.video?.bytesBase64Encoded;

      ensureDir(req.outputPath);

      if (videoUri) {
        // Download from Files API (append API key)
        const downloadUrl = videoUri.includes('?')
          ? `${videoUri}&key=${GOOGLE_AI_API_KEY}`
          : `${videoUri}?key=${GOOGLE_AI_API_KEY}`;
        const dlRes = await fetch(downloadUrl);
        if (!dlRes.ok) {
          return { success: false, error: `VEO download failed ${dlRes.status}: ${dlRes.statusText}` };
        }
        const buffer = Buffer.from(await dlRes.arrayBuffer());
        fs.writeFileSync(req.outputPath, buffer);
      } else if (videoB64) {
        fs.writeFileSync(req.outputPath, Buffer.from(videoB64, 'base64'));
      } else {
        const debugDump = JSON.stringify(pollData.response ?? pollData, null, 2).slice(0, 600);
        console.error('  [VEO] unexpected response shape:', debugDump);
        return { success: false, error: 'VEO returned no video data' };
      }

      return {
        success: true,
        filePath: path.resolve(req.outputPath),
        durationSeconds: req.durationSeconds ?? 8,
      };
    }

    console.log(`  VEO generating... attempt ${attempts}/${maxAttempts}`);
  }

  return { success: false, error: 'VEO generation timed out after 5 minutes' };
}

// ─── MULTI-FRAME SCENE GENERATION (still → VEO animate → clip) ──────────────

export interface FrameSpec {
  frameId: string;
  imagePrompt: string;        // invariant block + variant beat (for still generation)
  motionPrompt: string;       // VEO motion narrative (for animation)
  negativePrompt?: string;
  durationFrames: number;     // how long Remotion holds this clip
  imageModel?: ImageModel;
  veoModel?: VeoModel;
  veoDuration?: 4 | 6 | 8;   // VEO clip length — must be 8 with reference images
  extractAt?: number;         // timestamp (seconds) to extract best frame from VEO clip
}

export interface SceneFrameResult {
  frames: Array<{
    frameId: string;
    stillPath: string;        // the generated still image
    clipPath: string;         // the VEO-animated clip (.mp4)
    durationFrames: number;
  }>;
  errors: Record<string, string>;
}

/**
 * Generate all frames for a single scene using image-to-image chaining + VEO animation.
 *
 * Flow per frame:
 *   1. Generate still via generateImage() — first frame is fresh, subsequent chain from previous
 *   2. Animate still via VEO generateVideoClip() in image-to-video mode
 *   3. Return both still path and clip path — Remotion uses <Video src={clipPath} />
 *
 * The still is kept for director critique and as the chain seed for the next frame.
 * The clip is what Remotion actually plays.
 */
export async function generateSceneFrames(
  sceneId: string,
  frameSpecs: FrameSpec[],
  outputDir: string,
): Promise<SceneFrameResult> {
  const frames: SceneFrameResult['frames'] = [];
  const errors: Record<string, string> = {};
  let previousStillPath: string | undefined;

  ensureDir(path.join(outputDir, 'stills', '_'));
  ensureDir(path.join(outputDir, 'clips', '_'));

  console.log(`\n  [${sceneId}] Generating ${frameSpecs.length} frames...`);

  for (let i = 0; i < frameSpecs.length; i++) {
    const spec = frameSpecs[i];
    const stillPath = path.join(outputDir, 'stills', `${spec.frameId}.png`);
    const clipPath = path.join(outputDir, 'clips', `${spec.frameId}.mp4`);

    // ── Step 1: Generate still (image-to-image chain)
    console.log(`  [${spec.frameId}] Step 1: Generating still${i > 0 ? ` (chained from ${frameSpecs[i - 1].frameId})` : ' (anchor)'}...`);

    const imgResult = await generateImage({
      prompt: spec.imagePrompt,
      outputPath: stillPath,
      model: spec.imageModel ?? 'nano-banana-pro-preview',
      negativePrompt: spec.negativePrompt,
      aspectRatio: '9:16',
      referenceImagePath: previousStillPath,
    });

    if (!imgResult.success || !imgResult.filePath) {
      console.error(`  ✗ [${spec.frameId}] Still generation failed: ${imgResult.error}`);
      errors[spec.frameId] = `Still: ${imgResult.error}`;
      // Don't break chain — skip this frame but try next with same previous anchor
      await sleep(6500);
      continue;
    }

    console.log(`  ✓ [${spec.frameId}] Still: ${imgResult.filePath}`);
    previousStillPath = imgResult.filePath;

    // Rate limit buffer between image generation and VEO
    await sleep(3000);

    // ── Step 2: Animate with VEO (image-to-video)
    console.log(`  [${spec.frameId}] Step 2: Animating with VEO...`);

    const clipResult = await generateVideoClip({
      prompt: spec.motionPrompt,
      outputPath: clipPath,
      model: spec.veoModel ?? 'veo-3.1-generate-preview',
      durationSeconds: spec.veoDuration ?? 8,
      aspectRatio: '9:16',
      referenceImagePath: imgResult.filePath,
    });

    if (!clipResult.success || !clipResult.filePath) {
      console.error(`  ✗ [${spec.frameId}] VEO animation failed: ${clipResult.error}`);
      errors[spec.frameId] = `VEO: ${clipResult.error}`;
      // Still add the still as a fallback — Remotion can use <Img> if <Video> missing
      frames.push({
        frameId: spec.frameId,
        stillPath: imgResult.filePath,
        clipPath: imgResult.filePath, // fallback: still image path
        durationFrames: spec.durationFrames,
      });
      await sleep(6500);
      continue;
    }

    console.log(`  ✓ [${spec.frameId}] Clip: ${clipResult.filePath} (${clipResult.durationSeconds}s)`);

    frames.push({
      frameId: spec.frameId,
      stillPath: imgResult.filePath,
      clipPath: clipResult.filePath,
      durationFrames: spec.durationFrames,
    });

    // Rate limit buffer between frames
    await sleep(6500);
  }

  console.log(`  [${sceneId}] Done: ${frames.length}/${frameSpecs.length} frames generated`);

  return { frames, errors };
}

/**
 * Build the RemotionAssetConfig from all scene frame results.
 * Flattens all frames into a single ordered asset map.
 */
export function buildRemotionConfig(
  sceneResults: Array<{ sceneId: string; result: SceneFrameResult }>,
  compositionId: string,
  outputDir: string,
  punchFrameId?: string,
  captions?: Record<string, string>,
  transitions?: Record<string, 'cut' | 'slideleft' | 'fadew'>,
): {
  assetMap: Record<string, string>;
  sceneOrder: string[];
  frameDurations: Record<string, number>;
  punchFrameId?: string;
  captions?: Record<string, string>;
  transitions?: Record<string, string>;
  totalDurationFrames: number;
  compositionId: string;
  outputDir: string;
} {
  const assetMap: Record<string, string> = {};
  const sceneOrder: string[] = [];
  const frameDurations: Record<string, number> = {};
  let totalDurationFrames = 0;

  for (const { result } of sceneResults) {
    for (const frame of result.frames) {
      assetMap[frame.frameId] = frame.clipPath;
      sceneOrder.push(frame.frameId);
      frameDurations[frame.frameId] = frame.durationFrames;
      totalDurationFrames += frame.durationFrames;
    }
  }

  return {
    assetMap,
    sceneOrder,
    frameDurations,
    punchFrameId,
    captions,
    transitions,
    totalDurationFrames,
    compositionId,
    outputDir,
  };
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function buildImagePrompt(
  base: string,
  negative?: string,
  aspectRatio?: string,
): string {
  const aspectNote = aspectRatio === '9:16'
    ? 'vertical 9:16 composition, mobile-first framing, '
    : aspectRatio === '16:9'
      ? 'horizontal 16:9 widescreen framing, '
      : '';

  const quality = 'cinematic quality, high detail, sharp focus, professional color grading';
  const neg = negative
    ? ` Avoid: ${negative}.`
    : ' Avoid: text overlays, watermarks, blurry elements, stock photo feel.';

  return `${aspectNote}${base}. ${quality}.${neg}`;
}

function ensureDir(filePath: string): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function requireApiKey(): void {
  if (!GOOGLE_AI_API_KEY) {
    throw new Error(
      'GOOGLE_AI_API_KEY not set. Add it to orchestrator/.env:\n' +
      'GOOGLE_AI_API_KEY=AIzaS...'
    );
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── QUICK TEST ───────────────────────────────────────────────────────────────

export async function testConnection(): Promise<{ ok: boolean; models: string[]; error?: string }> {
  try {
    requireApiKey();
    const res = await fetch(`${API_BASE}/models?key=${GOOGLE_AI_API_KEY}`);
    const data = await res.json() as any;
    const imageModels = (data.models ?? [])
      .filter((m: any) => m.name?.includes('image') || m.name?.includes('nano') || m.name?.includes('veo'))
      .map((m: any) => m.name as string);
    return { ok: res.ok, models: imageModels };
  } catch (err) {
    return { ok: false, models: [], error: err instanceof Error ? err.message : String(err) };
  }
}
