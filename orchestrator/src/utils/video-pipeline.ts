/**
 * video-pipeline.ts
 * Full nanobanana → Director Critique → Remotion orchestrator.
 *
 * Workflow:
 *   1. Build PhD-level visual prompts (visual-prompts.ts)
 *   2. Generate images via nanobanana (nanobanana.ts)
 *   3. Director critique — human eye quality gate (director-critique.ts)
 *   4. Auto-regen with improved prompts on critique failure (Reflexion loop)
 *   5. Consistency verification across character scenes
 *   6. Output Remotion-ready asset map + composition config
 *
 * The Reflexion regen loop: max 3 attempts per scene before flagging for
 * manual intervention. Each iteration uses the director's specific notes
 * to improve the prompt (Shinn et al. NeurIPS 2023 verbal reinforcement).
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  buildScenePrompt,
  buildVideoPrompts,
  buildConsistencyAnchor,
  DRIVE_CREDIT_ANCHORS,
  type SceneSpec,
  type BrandSpec,
  type MoodSpec,
  type VideoSceneSpec,
  type ConsistencyAnchor,
  type BuildResult,
} from './visual-prompts';
import {
  generateImage,
  generateVideoAssets,
  type GenerateImageRequest,
  type ImageModel,
} from './nanobanana';
import {
  critiqueImage,
  critiqueVideoAssets,
  checkConsistency,
  improvePromptFromCritique,
  type CritiqueResult,
  type BatchCritiqueResult,
} from './director-critique';

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface VideoPipelineConfig {
  outputDir: string;
  brand: BrandSpec;
  mood: MoodSpec;
  scenes: VideoSceneSpec[];
  anchor: ConsistencyAnchor;
  critiqueEnabled: boolean;       // Set false for rapid prototyping
  maxRegenAttempts: number;       // Default 3 — Reflexion loop limit
  consistencyCheckEnabled: boolean;
  referenceSceneId?: string;      // Scene to use as consistency reference
}

export interface SceneAsset {
  sceneId: string;
  filePath: string;
  model: ImageModel;
  promptUsed: string;
  critiqueScore?: number;
  critiquePass?: boolean;
  regenCount: number;
}

export interface VideoPipelineResult {
  success: boolean;
  assets: Record<string, SceneAsset>;
  batchCritique?: BatchCritiqueResult;
  remotionConfig: RemotionAssetConfig;
  errors: Record<string, string>;
  summary: PipelineSummary;
}

export interface RemotionAssetConfig {
  /** Pass this object directly as Remotion inputProps */
  assetMap: Record<string, string>;         // scene id → absolute file path
  sceneOrder: string[];                     // ordered scene ids for composition
  totalDurationFrames: number;              // at 30fps
  compositionId: string;
  outputDir: string;
}

export interface PipelineSummary {
  totalScenes: number;
  generated: number;
  approved: number;
  regenned: number;
  failed: number;
  totalTime: number;             // ms
  directorApprovalRate: number;  // 0–1
}

// ─── SCENE DURATION MAP (frames at 30fps) ────────────────────────────────────

const SCENE_DURATION_FRAMES: Record<string, number> = {
  hook:         90,   // 3s
  problem:      150,  // 5s
  solution:     360,  // 12s
  social_proof: 240,  // 8s
  cta:          120,  // 4s
};

// ─── MAIN PIPELINE ───────────────────────────────────────────────────────────

export async function runVideoPipeline(
  config: VideoPipelineConfig,
): Promise<VideoPipelineResult> {
  const startTime = Date.now();

  // Ensure output dir exists
  fs.mkdirSync(config.outputDir, { recursive: true });

  const assets: Record<string, SceneAsset> = {};
  const errors: Record<string, string> = {};
  const promptBuilds = new Map<string, BuildResult>();

  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║              VIDEO ASSET PIPELINE STARTING                  ║');
  console.log(`╚══════════════════════════════════════════════════════════════╝\n`);
  console.log(`  Scenes: ${config.scenes.length}`);
  console.log(`  Output: ${config.outputDir}`);
  console.log(`  Critique: ${config.critiqueEnabled ? 'ON' : 'OFF'}`);
  console.log(`  Max regen: ${config.maxRegenAttempts}`);
  console.log('');

  // ── Step 1: Build all prompts
  console.log('Step 1: Building PhD-level visual prompts...');
  for (const scene of config.scenes) {
    const built = buildScenePrompt({
      ...scene,
      brand: config.brand,
      mood: config.mood,
      consistencyAnchor: config.anchor,
    });
    promptBuilds.set(scene.id, built);
    console.log(`  ✓ ${scene.id} — ${built.prompt.length} chars, model: ${built.model}`);
  }

  // ── Step 2: Generate images with Reflexion regen loop
  console.log('\nStep 2: Generating images via nanobanana...');

  for (const scene of config.scenes) {
    const built = promptBuilds.get(scene.id)!;
    let currentPrompt = built.prompt;
    let currentNegative = built.negativePrompt;
    let regenCount = 0;
    let finalAsset: SceneAsset | null = null;
    let lastCritique: CritiqueResult | null = null;

    while (regenCount <= config.maxRegenAttempts) {
      const attempt = regenCount + 1;
      const suffix = regenCount > 0 ? ` (regen ${regenCount})` : '';
      console.log(`\n  [${scene.id}] Generating${suffix}...`);

      const outputPath = path.join(
        config.outputDir,
        regenCount > 0 ? `${scene.id}_regen${regenCount}.png` : `${scene.id}.png`,
      );

      const genResult = await generateImage({
        prompt: currentPrompt,
        outputPath,
        model: built.model,
        negativePrompt: currentNegative,
        aspectRatio: built.aspectRatio,
      });

      if (!genResult.success || !genResult.filePath) {
        console.error(`  ✗ Generation failed: ${genResult.error}`);
        errors[scene.id] = genResult.error ?? 'Unknown generation error';
        break;
      }

      console.log(`  ✓ Generated: ${genResult.filePath}`);

      // ── Step 3: Director critique
      if (!config.critiqueEnabled) {
        finalAsset = {
          sceneId: scene.id,
          filePath: genResult.filePath,
          model: built.model,
          promptUsed: currentPrompt,
          regenCount,
        };
        break;
      }

      console.log(`  [Director] Reviewing scene ${scene.id}...`);
      const critique = await critiqueImage({
        imagePath: genResult.filePath,
        sceneId: scene.id,
        sceneType: scene.sceneType,
        originalPrompt: currentPrompt,
        consistencyReference: config.anchor.characterDescription,
      });

      lastCritique = critique;

      const emoji = critique.pass ? '✓' : '✗';
      console.log(`  ${emoji} Score: ${critique.score}/100 — ${critique.directorVerdict}`);

      if (critique.pass || critique.score >= 65) {
        // Director approves
        finalAsset = {
          sceneId: scene.id,
          filePath: genResult.filePath,
          model: built.model,
          promptUsed: currentPrompt,
          critiqueScore: critique.score,
          critiquePass: critique.pass,
          regenCount,
        };
        break;
      }

      // Regen with improved prompt (Reflexion verbal reinforcement)
      if (regenCount < config.maxRegenAttempts) {
        const improvedPrompt = improvePromptFromCritique(currentPrompt, critique);
        console.log(`  [Director] Regen guidance: ${critique.regenGuidance ?? 'improve quality'}`);
        currentPrompt = improvedPrompt;
        regenCount++;
      } else {
        // Exhausted regen budget — use best attempt
        console.warn(`  ⚠️  Max regen attempts reached for ${scene.id}. Using best result.`);
        finalAsset = {
          sceneId: scene.id,
          filePath: genResult.filePath,
          model: built.model,
          promptUsed: currentPrompt,
          critiqueScore: critique.score,
          critiquePass: false,
          regenCount,
        };
        break;
      }

      // Rate limit buffer between regen attempts
      await new Promise(r => setTimeout(r, 6500));
    }

    if (finalAsset) {
      assets[scene.id] = finalAsset;
    } else if (!errors[scene.id]) {
      errors[scene.id] = 'Generation loop exhausted without producing asset';
    }
  }

  // ── Step 4: Consistency verification across character scenes
  let batchCritique: BatchCritiqueResult | undefined;

  if (config.consistencyCheckEnabled && config.referenceSceneId && assets[config.referenceSceneId]) {
    console.log('\nStep 4: Consistency verification...');
    const refPath = assets[config.referenceSceneId].filePath;

    for (const [sceneId, asset] of Object.entries(assets)) {
      if (sceneId === config.referenceSceneId) continue;

      const check = await checkConsistency(
        refPath,
        asset.filePath,
        config.anchor.characterDescription,
      );

      console.log(`  ${check.consistent ? '✓' : '✗'} ${sceneId} consistency: ${check.score}/100`);

      if (!check.consistent && check.score < 50) {
        console.warn(`  ⚠️  Low consistency in ${sceneId}: ${check.issues.join(', ')}`);
      }
    }
  }

  // ── Step 5: Build Remotion config
  console.log('\nStep 5: Building Remotion configuration...');

  const assetMap: Record<string, string> = {};
  let totalDurationFrames = 0;
  const sceneOrder: string[] = [];

  for (const scene of config.scenes) {
    if (assets[scene.id]) {
      assetMap[scene.id] = assets[scene.id].filePath;
      sceneOrder.push(scene.id);
      totalDurationFrames += SCENE_DURATION_FRAMES[scene.sceneType] ?? 90;
    }
  }

  const remotionConfig: RemotionAssetConfig = {
    assetMap,
    sceneOrder,
    totalDurationFrames,
    compositionId: 'VideoContentCreator',
    outputDir: config.outputDir,
  };

  // ── Summary
  const totalTime = Date.now() - startTime;
  const generated = Object.keys(assets).length;
  const approved = Object.values(assets).filter(a => a.critiquePass !== false).length;
  const regenned = Object.values(assets).filter(a => a.regenCount > 0).length;
  const failed = Object.keys(errors).length;

  const summary: PipelineSummary = {
    totalScenes: config.scenes.length,
    generated,
    approved,
    regenned,
    failed,
    totalTime,
    directorApprovalRate: generated > 0 ? approved / generated : 0,
  };

  printPipelineSummary(summary, remotionConfig);

  return {
    success: failed === 0 && generated === config.scenes.length,
    assets,
    batchCritique,
    remotionConfig,
    errors,
    summary,
  };
}

// ─── REMOTION COMPOSITION HELPER ─────────────────────────────────────────────

/**
 * Write a Remotion root entry that uses the generated assets.
 * This creates the glue code that Remotion's renderMedia() will use.
 */
export function writeRemotionInputProps(
  remotionConfig: RemotionAssetConfig,
  outputPath: string,
): void {
  const props = {
    assetMap: remotionConfig.assetMap,
    sceneOrder: remotionConfig.sceneOrder,
    totalDurationFrames: remotionConfig.totalDurationFrames,
  };

  fs.writeFileSync(outputPath, JSON.stringify(props, null, 2));
  console.log(`  ✓ Remotion inputProps written: ${outputPath}`);
}

/**
 * Generate the Remotion renderMedia() call configuration.
 * Returns an object you can spread directly into renderMedia() options.
 */
export function buildRemotionRenderConfig(
  remotionConfig: RemotionAssetConfig,
  bundleLocation: string,
): object {
  return {
    bundleLocation,
    composition: {
      id: remotionConfig.compositionId,
      durationInFrames: remotionConfig.totalDurationFrames,
      fps: 30,
      width: 1080,
      height: 1920,  // 9:16 portrait for TikTok/Reels
    },
    inputProps: {
      assetMap: remotionConfig.assetMap,
      sceneOrder: remotionConfig.sceneOrder,
    },
    outputLocation: path.join(remotionConfig.outputDir, 'output.mp4'),
    codec: 'h264',
    imageFormat: 'jpeg',
    concurrency: 4,
  };
}

// ─── DRIVE-CREDIT QUICK-START ─────────────────────────────────────────────────

/**
 * Pre-configured pipeline for DriveCredit TikTok content.
 * Standard 3-scene structure: hook → solution → CTA
 */
export async function runDriveCreditPipeline(
  outputDir: string,
  demographic: keyof typeof DRIVE_CREDIT_ANCHORS = 'generic_diverse',
  critiqueEnabled = true,
): Promise<VideoPipelineResult> {
  const anchor = DRIVE_CREDIT_ANCHORS[demographic] ?? DRIVE_CREDIT_ANCHORS.generic_diverse;

  const config: VideoPipelineConfig = {
    outputDir,
    brand: {
      product: 'DriveCredit auto loan',
      demographic,
      platform: 'tiktok',
    },
    mood: {
      emotion: 'relief',
      energy: 'dynamic',
      palette: 'aspiration_warm',
    },
    scenes: [
      {
        id: 'hook-bg',
        sceneType: 'hook',
        subject: {
          primary: 'close-up smartphone screen showing loan rejection notification, red warning icon',
          secondary: anchor.characterDescription,
          environment: 'modern apartment, warm interior lighting, city view',
          action: 'shocked expression looking at phone, then determined forward gaze',
        },
      },
      {
        id: 'solution-reveal',
        sceneType: 'solution',
        subject: {
          primary: 'smartphone showing DriveCredit app with green approval badge, $15,000 loan approved',
          secondary: anchor.characterDescription,
          environment: 'car dealership showroom with gleaming vehicles visible',
          action: 'relieved smile, looking at camera with confidence, holding phone up',
        },
      },
      {
        id: 'cta-card',
        sceneType: 'cta',
        subject: {
          primary: 'clean modern smartphone on white surface displaying DriveCredit app homescreen',
          environment: 'minimalist clean white surface, soft studio lighting',
        },
      },
    ],
    anchor,
    critiqueEnabled,
    maxRegenAttempts: 2,
    consistencyCheckEnabled: critiqueEnabled,
    referenceSceneId: 'hook-bg',
  };

  return runVideoPipeline(config);
}

// ─── LOGGING ─────────────────────────────────────────────────────────────────

function printPipelineSummary(summary: PipelineSummary, remotion: RemotionAssetConfig): void {
  const seconds = (summary.totalTime / 1000).toFixed(1);
  const approvalPct = (summary.directorApprovalRate * 100).toFixed(0);

  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║               VIDEO PIPELINE COMPLETE                       ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log(`  Scenes: ${summary.generated}/${summary.totalScenes} generated`);
  console.log(`  Director approval: ${approvalPct}%`);
  console.log(`  Regen'd: ${summary.regenned} scenes`);
  console.log(`  Failed: ${summary.failed} scenes`);
  console.log(`  Duration: ${remotion.totalDurationFrames} frames (${(remotion.totalDurationFrames / 30).toFixed(1)}s)`);
  console.log(`  Total time: ${seconds}s`);
  console.log(`  Output: ${remotion.outputDir}`);
  console.log('');

  if (summary.failed > 0) {
    console.warn('  ⚠️  Some scenes failed. Check errors for details.');
  }

  if (summary.directorApprovalRate < 0.8) {
    console.warn('  ⚠️  Director approval below 80%. Consider enabling billing for higher-quality models.');
  }
}

// ─── REMOTION COMPOSITION TEMPLATE ───────────────────────────────────────────
// Copy this into your Remotion project's src/compositions/VideoContentCreator.tsx

export const REMOTION_COMPOSITION_TEMPLATE = `
/**
 * VideoContentCreator.tsx — Remotion composition
 * Generated by video-pipeline.ts
 *
 * Usage:
 *   const result = await runDriveCreditPipeline('./assets/video-01');
 *   // Then pass result.remotionConfig.assetMap as inputProps to this composition
 */
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

interface Props {
  assetMap: Record<string, string>;
  sceneOrder: string[];
}

// Scene durations in frames at 30fps
const SCENE_FRAMES: Record<string, number> = {
  'hook-bg':        90,
  'solution-reveal':360,
  'cta-card':       120,
};

export const VideoContentCreator: React.FC<Props> = ({ assetMap, sceneOrder }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let offset = 0;
  const sequences = sceneOrder.map((sceneId) => {
    const duration = SCENE_FRAMES[sceneId] ?? 90;
    const from = offset;
    offset += duration;

    return (
      <Sequence key={sceneId} from={from} durationInFrames={duration}>
        <SceneCard
          imagePath={assetMap[sceneId]}
          localFrame={frame - from}
          duration={duration}
          fps={fps}
        />
      </Sequence>
    );
  });

  return <AbsoluteFill style={{ backgroundColor: '#000' }}>{sequences}</AbsoluteFill>;
};

interface SceneCardProps {
  imagePath: string;
  localFrame: number;
  duration: number;
  fps: number;
}

const SceneCard: React.FC<SceneCardProps> = ({ imagePath, localFrame, duration, fps }) => {
  // Spring entrance — intentional tension+mass config for organic feel
  const entryProgress = spring({
    frame: localFrame,
    fps,
    config: { damping: 22, mass: 0.7, stiffness: 180 },
  });

  // Ken Burns: subtle zoom 1.0 → 1.05 over scene duration
  const scale = interpolate(localFrame, [0, duration], [1.0, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade in entrance, fade out exit
  const opacity = interpolate(
    localFrame,
    [0, 8, duration - 8, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const translateY = interpolate(entryProgress, [0, 1], [12, 0]);

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: \`translateY(\${translateY}px) scale(\${scale})\`,
        overflow: 'hidden',
      }}
    >
      <Img
        src={imagePath}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    </AbsoluteFill>
  );
};
`.trim();
