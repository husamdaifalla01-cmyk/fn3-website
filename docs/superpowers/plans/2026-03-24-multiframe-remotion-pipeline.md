# Multi-Frame Remotion Video Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the nanobanana → Remotion pipeline from one image per scene to 3–7 frames per scene, with corrected SceneCard animations (smash cuts, subliminal Ken Burns, zoom punch, text-on-frame-0, SlideLeft/FadeW transitions).

**Architecture:** Add a `frames[]` array to scene specs so each scene generates multiple images; the Reflexion regen loop iterates frames individually; the flat asset map and `frameMeta` feed a corrected Remotion `SceneCard` that implements watch-time best practices.

**Tech Stack:** TypeScript, Google AI (nano-banana-pro-preview / imagen-4.0-generate-001), Remotion (React), Node.js

---

## File Map

| Action | File | Scope |
|--------|------|-------|
| Modify | `orchestrator/src/utils/visual-prompts.ts` | lines 457–477: add `VideoFrameSpec`, update `VideoSceneSpec` |
| Modify | `orchestrator/src/utils/nanobanana.ts` | lines 133–197: add `VideoAssetFrame`, update `VideoAssetScene` + `generateVideoAssets()` |
| Modify | `orchestrator/src/utils/video-pipeline.ts` | types (FrameAsset, RemotionAssetConfig), runVideoPipeline loop, REMOTION_COMPOSITION_TEMPLATE, runDriveCreditPipeline |

---

## Task 1: Add VideoFrameSpec to visual-prompts.ts

**Files:**
- Modify: `orchestrator/src/utils/visual-prompts.ts:457-477`

- [ ] **Step 1: Replace VideoSceneSpec with multi-frame version**

Replace lines 457–477 in `visual-prompts.ts`:

```typescript
// ─── VIDEO FRAME SPEC ─────────────────────────────────────────────────────────

export type RemotionTransition = 'smash' | 'slideleft' | 'fadew';

export interface VideoFrameSpec {
  frameId: string;         // e.g. 'frame_a', 'frame_b' — becomes '{sceneId}_{frameId}' in asset map
  subject: SubjectSpec;    // passed to buildScenePrompt — per-frame visual description
  durationFrames: number;  // Remotion frames this image holds at 30fps
  punchFrame?: number;     // localFrame to fire zoom punch spring (null = no punch)
  hookText?: string;       // text overlay, present on frame 0, no entrance animation
  transition?: RemotionTransition;  // how this frame enters (default: 'smash')
}

export interface VideoSceneSpec {
  id: string;
  sceneType: SceneType;
  frames: VideoFrameSpec[];  // 1–7 frames per scene; each generates one image
}

export function buildVideoPrompts(
  scenes: VideoSceneSpec[],
  brand: BrandSpec,
  mood: MoodSpec,
  anchor: ConsistencyAnchor,
): BuildResult[] {
  return scenes.flatMap(scene =>
    scene.frames.map(frame =>
      buildScenePrompt({
        id: `${scene.id}_${frame.frameId}`,
        sceneType: scene.sceneType,
        subject: frame.subject,
        brand,
        mood,
        consistencyAnchor: anchor,
      }),
    ),
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
cd /Users/husamahmed/FN3/orchestrator && npm run typecheck 2>&1 | head -40
```

Expected: errors only from downstream files that still use old `VideoSceneSpec.subject` — these are fixed in later tasks.

- [ ] **Step 3: Commit**

```bash
cd /Users/husamahmed/FN3/orchestrator
git add src/utils/visual-prompts.ts
git commit -m "feat: add VideoFrameSpec multi-frame type to visual-prompts"
```

---

## Task 2: Update nanobanana.ts for multi-frame batch generation

**Files:**
- Modify: `orchestrator/src/utils/nanobanana.ts:133-197`

- [ ] **Step 1: Replace VideoAssetScene with multi-frame version**

Replace lines 133–197 in `nanobanana.ts`:

```typescript
// ─── BATCH IMAGE GENERATION ───────────────────────────────────────────────────

export interface VideoAssetFrame {
  frameId: string;          // e.g. 'frame_a' — output file becomes '{sceneId}_{frameId}.png'
  prompt: string;
  negativePrompt?: string;
  durationFrames: number;
}

export interface VideoAssetScene {
  id: string;               // e.g. 'hook-bg'
  frames: VideoAssetFrame[];
  aspectRatio?: GenerateImageRequest['aspectRatio'];
  model?: ImageModel;
}

export interface GenerateVideoAssetsRequest {
  scenes: VideoAssetScene[];
  outputDir: string;
}

export interface GenerateVideoAssetsResult {
  success: boolean;
  assets: Record<string, string>;   // '{sceneId}_{frameId}' → absolute file path
  errors: Record<string, string>;
}

/**
 * Generate all visual assets for a Remotion composition.
 * Each scene generates one image per frame: {outputDir}/{sceneId}_{frameId}.png
 * Asset map keys match Remotion sceneOrder: 'hook-bg_frame_a', 'hook-bg_frame_b', etc.
 */
export async function generateVideoAssets(req: GenerateVideoAssetsRequest): Promise<GenerateVideoAssetsResult> {
  const assets: Record<string, string> = {};
  const errors: Record<string, string> = {};

  for (const scene of req.scenes) {
    for (const frame of scene.frames) {
      const assetKey = `${scene.id}_${frame.frameId}`;
      const outputPath = path.join(req.outputDir, `${assetKey}.png`);

      try {
        const result = await generateImage({
          prompt: frame.prompt,
          outputPath,
          model: scene.model,
          negativePrompt: frame.negativePrompt,
          aspectRatio: scene.aspectRatio,
        });

        if (result.success && result.filePath) {
          assets[assetKey] = result.filePath;
          console.log(`  ✓ ${assetKey} → ${result.filePath}`);
        } else {
          errors[assetKey] = result.error ?? 'Unknown error';
          console.error(`  ✗ ${assetKey}: ${result.error}`);
        }
      } catch (err) {
        errors[assetKey] = err instanceof Error ? err.message : String(err);
      }

      // Rate limit buffer — free tier: 2 req/min; paid: 10 req/min
      await sleep(6500);
    }
  }

  return {
    success: Object.keys(errors).length === 0,
    assets,
    errors,
  };
}
```

- [ ] **Step 2: Typecheck**

```bash
cd /Users/husamahmed/FN3/orchestrator && npm run typecheck 2>&1 | head -40
```

Expected: errors only from `video-pipeline.ts` which still uses old types — fixed in next tasks.

- [ ] **Step 3: Commit**

```bash
git add src/utils/nanobanana.ts
git commit -m "feat: add VideoAssetFrame multi-frame type and update generateVideoAssets"
```

---

## Task 3: Update video-pipeline.ts types (FrameAsset + RemotionAssetConfig)

**Files:**
- Modify: `orchestrator/src/utils/video-pipeline.ts:47-107`

- [ ] **Step 1: Replace SceneAsset with FrameAsset and update RemotionAssetConfig**

Replace the `// ─── TYPES ───` block (lines 47–107):

```typescript
// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface VideoPipelineConfig {
  outputDir: string;
  brand: BrandSpec;
  mood: MoodSpec;
  scenes: VideoSceneSpec[];
  anchor: ConsistencyAnchor;
  critiqueEnabled: boolean;
  maxRegenAttempts: number;
  consistencyCheckEnabled: boolean;
  referenceSceneId?: string;
}

export interface FrameAsset {
  assetKey: string;        // '{sceneId}_{frameId}' — matches asset map key
  sceneId: string;
  frameId: string;
  filePath: string;
  model: ImageModel;
  promptUsed: string;
  durationFrames: number;
  punchFrame?: number;
  hookText?: string;
  transition?: RemotionTransition;
  critiqueScore?: number;
  critiquePass?: boolean;
  regenCount: number;
}

export interface VideoPipelineResult {
  success: boolean;
  assets: Record<string, FrameAsset>;   // keyed by '{sceneId}_{frameId}'
  remotionConfig: RemotionAssetConfig;
  errors: Record<string, string>;
  summary: PipelineSummary;
}

export interface FrameMeta {
  durationInFrames: number;
  punchFrame?: number;
  hookText?: string;
  transition?: RemotionTransition;
}

export interface RemotionAssetConfig {
  assetMap: Record<string, string>;     // '{sceneId}_{frameId}' → absolute file path
  sceneOrder: string[];                 // ordered flat frame keys
  frameMeta: Record<string, FrameMeta>; // per-frame Remotion config
  totalDurationFrames: number;
  compositionId: string;
  outputDir: string;
}

export interface PipelineSummary {
  totalFrames: number;
  generated: number;
  approved: number;
  regenned: number;
  failed: number;
  totalTime: number;
  directorApprovalRate: number;
}
```

- [ ] **Step 2: Update the import line at the top of video-pipeline.ts**

Add `RemotionTransition` and `VideoFrameSpec` to the visual-prompts import:

```typescript
import {
  buildScenePrompt,
  buildVideoPrompts,
  buildConsistencyAnchor,
  DRIVE_CREDIT_ANCHORS,
  type SceneSpec,
  type BrandSpec,
  type MoodSpec,
  type VideoSceneSpec,
  type VideoFrameSpec,
  type RemotionTransition,
  type ConsistencyAnchor,
  type BuildResult,
} from './visual-prompts';
```

- [ ] **Step 3: Typecheck**

```bash
cd /Users/husamahmed/FN3/orchestrator && npm run typecheck 2>&1 | head -40
```

Expected: errors from `runVideoPipeline`, `printPipelineSummary`, `writeRemotionInputProps`, `buildRemotionRenderConfig` — fixed in next task.

- [ ] **Step 4: Commit**

```bash
git add src/utils/video-pipeline.ts
git commit -m "feat: add FrameAsset and FrameMeta types to video-pipeline"
```

---

## Task 4: Rewrite runVideoPipeline to iterate frames

**Files:**
- Modify: `orchestrator/src/utils/video-pipeline.ts:99-468`

- [ ] **Step 1: Remove SCENE_DURATION_FRAMES constant**

Delete lines 99–107 (the `SCENE_DURATION_FRAMES` map). Duration now comes from `frame.durationFrames`.

- [ ] **Step 2: Rewrite runVideoPipeline**

Replace the `runVideoPipeline` function body (lines 111–328):

```typescript
export async function runVideoPipeline(
  config: VideoPipelineConfig,
): Promise<VideoPipelineResult> {
  const startTime = Date.now();

  fs.mkdirSync(config.outputDir, { recursive: true });

  const assets: Record<string, FrameAsset> = {};
  const errors: Record<string, string> = {};
  const promptBuilds = new Map<string, BuildResult>(); // keyed by assetKey

  const totalFrameCount = config.scenes.reduce((n, s) => n + s.frames.length, 0);

  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║              VIDEO ASSET PIPELINE STARTING                  ║');
  console.log(`╚══════════════════════════════════════════════════════════════╝\n`);
  console.log(`  Scenes: ${config.scenes.length}  (${totalFrameCount} frames total)`);
  console.log(`  Output: ${config.outputDir}`);
  console.log(`  Critique: ${config.critiqueEnabled ? 'ON' : 'OFF'}`);
  console.log(`  Max regen: ${config.maxRegenAttempts}`);
  console.log('');

  // ── Step 1: Build all prompts (per-frame)
  console.log('Step 1: Building PhD-level visual prompts...');
  for (const scene of config.scenes) {
    for (const frame of scene.frames) {
      const assetKey = `${scene.id}_${frame.frameId}`;
      const built = buildScenePrompt({
        id: assetKey,
        sceneType: scene.sceneType,
        subject: frame.subject,
        brand: config.brand,
        mood: config.mood,
        consistencyAnchor: config.anchor,
      });
      promptBuilds.set(assetKey, built);
      console.log(`  ✓ ${assetKey} — ${built.prompt.length} chars, model: ${built.model}`);
    }
  }

  // ── Step 2: Generate images with per-frame Reflexion regen loop
  console.log('\nStep 2: Generating images via nanobanana...');

  for (const scene of config.scenes) {
    for (const frame of scene.frames) {
      const assetKey = `${scene.id}_${frame.frameId}`;
      const built = promptBuilds.get(assetKey)!;
      let currentPrompt = built.prompt;
      let regenCount = 0;
      let finalAsset: FrameAsset | null = null;

      while (regenCount <= config.maxRegenAttempts) {
        const suffix = regenCount > 0 ? ` (regen ${regenCount})` : '';
        console.log(`\n  [${assetKey}] Generating${suffix}...`);

        const outputPath = path.join(
          config.outputDir,
          regenCount > 0 ? `${assetKey}_regen${regenCount}.png` : `${assetKey}.png`,
        );

        const genResult = await generateImage({
          prompt: currentPrompt,
          outputPath,
          model: built.model,
          aspectRatio: built.aspectRatio,
          // negativePrompt deliberately omitted — baked into text via buildImagePrompt
        });

        if (!genResult.success || !genResult.filePath) {
          console.error(`  ✗ Generation failed: ${genResult.error}`);
          errors[assetKey] = genResult.error ?? 'Unknown generation error';
          break;
        }

        console.log(`  ✓ Generated: ${genResult.filePath}`);

        if (!config.critiqueEnabled) {
          finalAsset = {
            assetKey,
            sceneId: scene.id,
            frameId: frame.frameId,
            filePath: genResult.filePath,
            model: built.model,
            promptUsed: currentPrompt,
            durationFrames: frame.durationFrames,
            punchFrame: frame.punchFrame,
            hookText: frame.hookText,
            transition: frame.transition,
            regenCount,
          };
          break;
        }

        console.log(`  [Director] Reviewing ${assetKey}...`);
        const critique = await critiqueImage({
          imagePath: genResult.filePath,
          sceneId: assetKey,
          sceneType: scene.sceneType,
          originalPrompt: currentPrompt,
          consistencyReference: config.anchor.characterDescription,
        });

        const emoji = critique.pass ? '✓' : '✗';
        console.log(`  ${emoji} Score: ${critique.score}/100 — ${critique.directorVerdict}`);

        if (critique.pass || critique.score >= 65) {
          finalAsset = {
            assetKey,
            sceneId: scene.id,
            frameId: frame.frameId,
            filePath: genResult.filePath,
            model: built.model,
            promptUsed: currentPrompt,
            durationFrames: frame.durationFrames,
            punchFrame: frame.punchFrame,
            hookText: frame.hookText,
            transition: frame.transition,
            critiqueScore: critique.score,
            critiquePass: critique.pass,
            regenCount,
          };
          break;
        }

        if (regenCount < config.maxRegenAttempts) {
          const improvedPrompt = improvePromptFromCritique(currentPrompt, critique);
          console.log(`  [Director] Regen guidance: ${critique.regenGuidance ?? 'improve quality'}`);
          currentPrompt = improvedPrompt;
          regenCount++;
        } else {
          console.warn(`  ⚠️  Max regen reached for ${assetKey}. Using best result.`);
          finalAsset = {
            assetKey,
            sceneId: scene.id,
            frameId: frame.frameId,
            filePath: genResult.filePath,
            model: built.model,
            promptUsed: currentPrompt,
            durationFrames: frame.durationFrames,
            punchFrame: frame.punchFrame,
            hookText: frame.hookText,
            transition: frame.transition,
            critiqueScore: critique.score,
            critiquePass: false,
            regenCount,
          };
          break;
        }

        await new Promise(r => setTimeout(r, 6500));
      }

      if (finalAsset) {
        assets[assetKey] = finalAsset;
      } else if (!errors[assetKey]) {
        errors[assetKey] = 'Generation loop exhausted without producing asset';
      }
    }
  }

  // ── Step 3: Consistency verification (compare all frames to reference scene's first frame)
  if (config.consistencyCheckEnabled && config.referenceSceneId) {
    const refScene = config.scenes.find(s => s.id === config.referenceSceneId);
    const refFrameKey = refScene ? `${refScene.id}_${refScene.frames[0]?.frameId}` : null;

    if (refFrameKey && assets[refFrameKey]) {
      console.log('\nStep 3: Consistency verification...');
      const refPath = assets[refFrameKey].filePath;

      for (const [assetKey, asset] of Object.entries(assets)) {
        if (assetKey === refFrameKey) continue;

        const check = await checkConsistency(
          refPath,
          asset.filePath,
          config.anchor.characterDescription,
        );

        console.log(`  ${check.consistent ? '✓' : '✗'} ${assetKey} consistency: ${check.score}/100`);

        if (!check.consistent && check.score < 50) {
          console.warn(`  ⚠️  Low consistency in ${assetKey}: ${check.issues.join(', ')}`);
        }
      }
    }
  }

  // ── Step 4: Build Remotion config
  console.log('\nStep 4: Building Remotion configuration...');

  const assetMap: Record<string, string> = {};
  const frameMeta: Record<string, FrameMeta> = {};
  const sceneOrder: string[] = [];
  let totalDurationFrames = 0;

  for (const scene of config.scenes) {
    for (const frame of scene.frames) {
      const assetKey = `${scene.id}_${frame.frameId}`;
      if (assets[assetKey]) {
        assetMap[assetKey] = assets[assetKey].filePath;
        frameMeta[assetKey] = {
          durationInFrames: frame.durationFrames,
          punchFrame: frame.punchFrame,
          hookText: frame.hookText,
          transition: frame.transition,
        };
        sceneOrder.push(assetKey);
        totalDurationFrames += frame.durationFrames;
      }
    }
  }

  const remotionConfig: RemotionAssetConfig = {
    assetMap,
    sceneOrder,
    frameMeta,
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
    totalFrames: totalFrameCount,
    generated,
    approved,
    regenned,
    failed,
    totalTime,
    directorApprovalRate: generated > 0 ? approved / generated : 0,
  };

  printPipelineSummary(summary, remotionConfig);

  return {
    success: failed === 0 && generated === totalFrameCount,
    assets,
    remotionConfig,
    errors,
    summary,
  };
}
```

- [ ] **Step 3: Update writeRemotionInputProps and buildRemotionRenderConfig**

Replace lines 336–376 (the two helper functions):

```typescript
export function writeRemotionInputProps(
  remotionConfig: RemotionAssetConfig,
  outputPath: string,
): void {
  const props = {
    assetMap: remotionConfig.assetMap,
    sceneOrder: remotionConfig.sceneOrder,
    frameMeta: remotionConfig.frameMeta,
    totalDurationFrames: remotionConfig.totalDurationFrames,
  };

  fs.writeFileSync(outputPath, JSON.stringify(props, null, 2));
  console.log(`  ✓ Remotion inputProps written: ${outputPath}`);
}

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
      height: 1920,
    },
    inputProps: {
      assetMap: remotionConfig.assetMap,
      sceneOrder: remotionConfig.sceneOrder,
      frameMeta: remotionConfig.frameMeta,
    },
    outputLocation: path.join(remotionConfig.outputDir, 'output.mp4'),
    codec: 'h264',
    imageFormat: 'jpeg',
    concurrency: 4,
  };
}
```

- [ ] **Step 4: Update printPipelineSummary**

Replace lines 443–468:

```typescript
function printPipelineSummary(summary: PipelineSummary, remotion: RemotionAssetConfig): void {
  const seconds = (summary.totalTime / 1000).toFixed(1);
  const approvalPct = (summary.directorApprovalRate * 100).toFixed(0);

  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║               VIDEO PIPELINE COMPLETE                       ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log(`  Frames: ${summary.generated}/${summary.totalFrames} generated`);
  console.log(`  Director approval: ${approvalPct}%`);
  console.log(`  Regen'd: ${summary.regenned} frames`);
  console.log(`  Failed: ${summary.failed} frames`);
  console.log(`  Duration: ${remotion.totalDurationFrames} frames (${(remotion.totalDurationFrames / 30).toFixed(1)}s)`);
  console.log(`  Total time: ${seconds}s`);
  console.log(`  Output: ${remotion.outputDir}`);
  console.log('');

  if (summary.failed > 0) {
    console.warn('  ⚠️  Some frames failed. Check errors for details.');
  }

  if (summary.directorApprovalRate < 0.8) {
    console.warn('  ⚠️  Director approval below 80%. Consider enabling billing for higher-quality models.');
  }
}
```

- [ ] **Step 5: Typecheck**

```bash
cd /Users/husamahmed/FN3/orchestrator && npm run typecheck 2>&1 | head -40
```

Expected: errors only from `REMOTION_COMPOSITION_TEMPLATE` (string — no type checking) and `runDriveCreditPipeline` — fixed in next tasks.

- [ ] **Step 6: Commit**

```bash
git add src/utils/video-pipeline.ts
git commit -m "feat: rewrite runVideoPipeline to iterate frames with per-frame Reflexion loop"
```

---

## Task 5: Rewrite REMOTION_COMPOSITION_TEMPLATE

**Files:**
- Modify: `orchestrator/src/utils/video-pipeline.ts:470-580` (the template string)

- [ ] **Step 1: Replace the REMOTION_COMPOSITION_TEMPLATE string**

Replace everything from `export const REMOTION_COMPOSITION_TEMPLATE = \`` to the closing `\`.trim();`:

```typescript
export const REMOTION_COMPOSITION_TEMPLATE = `
/**
 * VideoContentCreator.tsx — Remotion composition
 * Generated by video-pipeline.ts
 *
 * inputProps shape:
 *   assetMap:   Record<string, string>      // frameKey → absolute file path
 *   sceneOrder: string[]                    // ordered frameKeys
 *   frameMeta:  Record<string, FrameMeta>   // per-frame Remotion config
 *
 * Copy to your Remotion project: src/compositions/VideoContentCreator.tsx
 */
import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

type RemotionTransition = 'smash' | 'slideleft' | 'fadew';

interface FrameMeta {
  durationInFrames: number;
  punchFrame?: number;
  hookText?: string;
  transition?: RemotionTransition;
}

interface Props {
  assetMap: Record<string, string>;
  sceneOrder: string[];
  frameMeta: Record<string, FrameMeta>;
}

export const VideoContentCreator: React.FC<Props> = ({ assetMap, sceneOrder, frameMeta }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let offset = 0;
  const sequences = sceneOrder.map((frameKey) => {
    const meta = frameMeta[frameKey] ?? { durationInFrames: 90 };
    const from = offset;
    offset += meta.durationInFrames;

    return (
      <Sequence key={frameKey} from={from} durationInFrames={meta.durationInFrames}>
        <SceneCard
          imagePath={assetMap[frameKey]}
          localFrame={frame - from}
          duration={meta.durationInFrames}
          fps={fps}
          punchFrame={meta.punchFrame ?? null}
          hookText={meta.hookText}
          transition={meta.transition ?? 'smash'}
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
  punchFrame: number | null;
  hookText?: string;
  transition: RemotionTransition;
}

const SceneCard: React.FC<SceneCardProps> = ({
  imagePath,
  localFrame,
  duration,
  fps,
  punchFrame,
  hookText,
  transition,
}) => {
  // ── Ken Burns: subliminal zoom accumulates at 0.0003/frame
  // At 90 frames (hook 3s): 1.027 — barely visible, prevents static feel
  // At 360 frames (solution 12s): 1.108 — natural drift by end
  const kenBurns = 1 + localFrame * 0.0003;

  // ── Zoom punch: fast spring at reveal moment (+0.05 max)
  // Set punchFrame to the localFrame where the key reveal happens
  const punchProgress =
    punchFrame != null
      ? spring({
          frame: localFrame - punchFrame,
          fps,
          config: { damping: 8, stiffness: 500, mass: 0.2 },
        })
      : 0;
  const punch = interpolate(punchProgress, [0, 1], [0, 0.05]);
  const totalScale = kenBurns + punch;

  // ── SlideLeft: 6-frame cubic-out entrance (only when transition === 'slideleft')
  const slideX =
    transition === 'slideleft'
      ? interpolate(localFrame, [0, 6], [-1080, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.cubic),
        })
      : 0;

  // ── FadeW (horizontal wipe): clip-path left-to-right reveal over 4 frames
  // Applied via inline style on the wrapper — only when transition === 'fadew'
  const wipeWidth =
    transition === 'fadew'
      ? interpolate(localFrame, [0, 4], [0, 1080], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 1080;
  const clipPath =
    transition === 'fadew'
      ? \`inset(0 \${1080 - wipeWidth}px 0 0)\`
      : 'none';

  // ── Smash cut: opacity always 1 — Sequence boundary IS the cut
  // No fade in/out. Pattern interrupt = the hard edge.
  const opacity = 1;

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: \`translateX(\${slideX}px)\`,
        clipPath,
        overflow: 'hidden',
      }}
    >
      {/* Image layer: Ken Burns + zoom punch */}
      <AbsoluteFill
        style={{
          transform: \`scale(\${totalScale})\`,
          transformOrigin: 'center center',
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

      {/* Text layer: present on frame 0, no entrance animation */}
      {hookText && (
        <AbsoluteFill
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            padding: 48,
            paddingBottom: 160,
          }}
        >
          <p
            style={{
              color: '#fff',
              fontSize: 56,
              fontWeight: 900,
              lineHeight: 1.1,
              textShadow: '0 2px 16px rgba(0,0,0,0.7)',
              margin: 0,
              maxWidth: '90%',
            }}
          >
            {hookText}
          </p>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
`.trim();
```

- [ ] **Step 2: Visual inspection**

Print the template to stdout and verify key properties:

```bash
cd /Users/husamahmed/FN3/orchestrator
node -e "const { REMOTION_COMPOSITION_TEMPLATE } = require('./dist/utils/video-pipeline'); console.log(REMOTION_COMPOSITION_TEMPLATE)" 2>/dev/null || \
tsx -e "import { REMOTION_COMPOSITION_TEMPLATE } from './src/utils/video-pipeline.ts'; console.log(REMOTION_COMPOSITION_TEMPLATE)"
```

Manually verify:
- [ ] No `interpolate(localFrame, [0, 8, duration-8, duration], [0, 1, 1, 0])` (old fade)
- [ ] `const opacity = 1` present
- [ ] `const kenBurns = 1 + localFrame * 0.0003` present
- [ ] `spring({ frame: localFrame - punchFrame` present
- [ ] `transition === 'slideleft'` branch present
- [ ] `transition === 'fadew'` + `clipPath` present
- [ ] `hookText &&` text layer present with no entrance delay

- [ ] **Step 3: Typecheck**

```bash
cd /Users/husamahmed/FN3/orchestrator && npm run typecheck 2>&1 | head -40
```

Expected: clean (template is a string, not type-checked).

- [ ] **Step 4: Commit**

```bash
git add src/utils/video-pipeline.ts
git commit -m "feat: rewrite REMOTION_COMPOSITION_TEMPLATE — smash cuts, Ken Burns, zoom punch, SlideLeft/FadeW, text-on-frame-0"
```

---

## Task 6: Update runDriveCreditPipeline with multi-frame specs

**Files:**
- Modify: `orchestrator/src/utils/video-pipeline.ts:384-441` (runDriveCreditPipeline)

- [ ] **Step 1: Replace runDriveCreditPipeline scenes config**

Replace the `scenes` array inside `runDriveCreditPipeline` (currently 3 single-subject scenes):

```typescript
scenes: [
  {
    id: 'hook-bg',
    sceneType: 'hook',
    frames: [
      {
        frameId: 'frame_a',
        durationFrames: 30,
        transition: 'smash',
        hookText: 'They said NO to your car loan.',
        subject: {
          primary: 'smartphone screen showing loan rejection notification, red X icon, bank app UI',
          secondary: anchor.characterDescription,
          environment: 'modern apartment living room, warm evening light, city view through window',
          action: 'hand holding phone, shocked expression reading rejection',
        },
      },
      {
        frameId: 'frame_b',
        durationFrames: 30,
        transition: 'smash',
        subject: {
          primary: 'extreme close-up face showing shock and worry, eyes wide',
          secondary: anchor.characterDescription,
          environment: 'apartment interior, soft warm background bokeh',
          action: 'micro-expression of disbelief, slight jaw drop, eyes glistening',
        },
      },
      {
        frameId: 'frame_c',
        durationFrames: 30,
        transition: 'smash',
        subject: {
          primary: 'person looking up from phone with determined forward gaze',
          secondary: anchor.characterDescription,
          environment: 'apartment window, city lights at dusk, golden hour rim light',
          action: 'jaw set with resolve, slight nod, holding phone down at side',
        },
      },
    ],
  },
  {
    id: 'solution-reveal',
    sceneType: 'solution',
    frames: [
      {
        frameId: 'frame_a',
        durationFrames: 51,
        transition: 'slideleft',
        subject: {
          primary: 'smartphone showing DriveCredit app onboarding screen, clean UI',
          secondary: anchor.characterDescription,
          environment: 'home desk, soft daylight from window',
          action: 'sitting at desk, opening app for first time, curious expression',
        },
      },
      {
        frameId: 'frame_b',
        durationFrames: 51,
        transition: 'smash',
        subject: {
          primary: 'hands filling out DriveCredit application form on phone, progress bar visible',
          secondary: anchor.characterDescription,
          environment: 'same desk, afternoon light',
          action: 'focused, typing carefully, leaning forward',
        },
      },
      {
        frameId: 'frame_c',
        durationFrames: 52,
        transition: 'smash',
        punchFrame: 8,
        subject: {
          primary: 'smartphone screen exploding with green approval badge — $15,000 APPROVED in large green text',
          secondary: anchor.characterDescription,
          environment: 'desk, phone held up in celebration',
          action: 'hand thrusting phone upward, mouth open in joy',
        },
      },
      {
        frameId: 'frame_d',
        durationFrames: 51,
        transition: 'smash',
        subject: {
          primary: 'face flooded with relief and disbelief, tears of joy beginning',
          secondary: anchor.characterDescription,
          environment: 'apartment, soft warm background',
          action: 'hand over mouth, eyes bright, shoulders dropping with relief',
        },
      },
      {
        frameId: 'frame_e',
        durationFrames: 51,
        transition: 'smash',
        subject: {
          primary: 'full body posture shift — slumped to upright, triumphant',
          secondary: anchor.characterDescription,
          environment: 'living room, standing up from couch',
          action: 'standing straight, fist pump, genuine triumph expression',
        },
      },
      {
        frameId: 'frame_f',
        durationFrames: 52,
        transition: 'fadew',
        subject: {
          primary: 'car dealership showroom exterior, gleaming vehicles on lot, sunlight reflecting',
          secondary: anchor.characterDescription,
          environment: 'dealership forecourt, blue sky, multiple cars visible',
          action: 'walking toward dealership entrance with confidence, keys in hand',
        },
      },
      {
        frameId: 'frame_g',
        durationFrames: 52,
        transition: 'smash',
        subject: {
          primary: 'person showing phone screen to camera — DriveCredit approval notification visible',
          secondary: anchor.characterDescription,
          environment: 'dealership lot, new car visible in background',
          action: 'proud smile directly to camera, phone held up showing approval',
        },
      },
    ],
  },
  {
    id: 'cta-card',
    sceneType: 'cta',
    frames: [
      {
        frameId: 'frame_a',
        durationFrames: 60,
        transition: 'smash',
        subject: {
          primary: 'clean modern smartphone on white surface displaying DriveCredit app homescreen, minimalist product shot',
          environment: 'white studio surface, soft shadow, professional product photography lighting',
        },
      },
      {
        frameId: 'frame_b',
        durationFrames: 60,
        transition: 'slideleft',
        hookText: 'Get approved in 60 seconds. Link in bio.',
        subject: {
          primary: 'full-bleed brand card — DriveCredit logo centered, bold white text on deep blue gradient background',
          environment: 'clean gradient background, no people',
        },
      },
    ],
  },
],
```

- [ ] **Step 2: Update referenceSceneId**

The reference frame for consistency checking is now the first frame of hook-bg. Ensure this is set:

```typescript
referenceSceneId: 'hook-bg',  // first frame of hook-bg used as reference
```

- [ ] **Step 3: Typecheck**

```bash
cd /Users/husamahmed/FN3/orchestrator && npm run typecheck 2>&1 | head -40
```

Expected: **clean** — no errors.

- [ ] **Step 4: Smoke test (critique disabled)**

```bash
cd /Users/husamahmed/FN3/orchestrator
GOOGLE_AI_API_KEY=YOUR_KEY tsx -e "
import { runDriveCreditPipeline } from './src/utils/video-pipeline.ts';
const result = await runDriveCreditPipeline('./output/smoke-test', 'generic_diverse', false);
console.log('Generated:', Object.keys(result.assets).length, 'frames');
console.log('sceneOrder:', result.remotionConfig.sceneOrder);
console.log('totalDuration:', result.remotionConfig.totalDurationFrames, 'frames');
console.log('Errors:', result.errors);
"
```

Expected output:
```
Generated: 12 frames
sceneOrder: ['hook-bg_frame_a', 'hook-bg_frame_b', ..., 'cta-card_frame_b']
totalDuration: 570 frames
Errors: {}
```

- [ ] **Step 5: Verify asset files exist**

```bash
ls /Users/husamahmed/FN3/orchestrator/output/smoke-test/*.png | wc -l
```

Expected: `12`

- [ ] **Step 6: Commit**

```bash
git add src/utils/video-pipeline.ts
git commit -m "feat: update runDriveCreditPipeline to 12-frame multi-shot structure"
```

---

---

## Task 7: Migrate scripts/run-drive-credit-videos.ts

**Context:** `tsconfig.json` excludes `scripts/` from compilation, so `npm run typecheck` won't catch breaks here. This file has 4 videos × 3 scenes each, all using the old `VideoSceneSpec.subject` shape. Must be migrated manually.

**Files:**
- Modify: `orchestrator/scripts/run-drive-credit-videos.ts` (lines 55–300 approx, all scene objects)

- [ ] **Step 1: Wrap each scene's subject into a single-frame frames array**

For every scene object in all 4 video configs, convert from:
```typescript
{
  id: 'hook',
  sceneType: 'hook',
  subject: { primary: '...', secondary: '...', environment: '...', action: '...' },
  mood: { ... },       // ← REMOVE (belongs on config level only)
  brand: { ... },      // ← REMOVE (belongs on config level only)
  consistencyAnchor: ..., // ← REMOVE (belongs on config level only)
},
```
To:
```typescript
{
  id: 'hook',
  sceneType: 'hook',
  frames: [
    {
      frameId: 'frame_a',
      durationFrames: 90,     // use SCENE_DURATION_FRAMES for the sceneType
      transition: 'smash',
      subject: { primary: '...', secondary: '...', environment: '...', action: '...' },
    },
  ],
},
```

Duration by sceneType: hook=90, problem=150, solution=360, social_proof=240, cta=120.

Remove per-scene `mood`, `brand`, `consistencyAnchor` — these live at the config level and are already present there.

- [ ] **Step 2: Typecheck scripts directory explicitly**

```bash
cd /Users/husamahmed/FN3/orchestrator
npx tsc --noEmit --allowImportingTsExtensions --moduleResolution bundler --target ESNext --module ESNext scripts/run-drive-credit-videos.ts 2>&1 | head -40
```

Or simpler — dry-run with tsx:
```bash
tsx --no-cache scripts/run-drive-credit-videos.ts --help 2>&1 | head -10
```

Expected: imports resolve, no type errors.

- [ ] **Step 3: Remove unused imports from video-pipeline.ts**

After the pipeline rewrite, `critiqueVideoAssets` and `BatchCritiqueResult` are no longer used. Remove them from the `director-critique` import:

```typescript
// Before:
import {
  critiqueImage,
  critiqueVideoAssets,
  checkConsistency,
  improvePromptFromCritique,
  type CritiqueResult,
  type BatchCritiqueResult,
} from './director-critique';

// After:
import {
  critiqueImage,
  checkConsistency,
  improvePromptFromCritique,
  type CritiqueResult,
} from './director-critique';
```

Also remove `batchCritique?: BatchCritiqueResult` from `VideoPipelineResult` if it was not already removed in Task 3.

- [ ] **Step 4: Final typecheck**

```bash
cd /Users/husamahmed/FN3/orchestrator && npm run typecheck 2>&1
```

Expected: **zero errors**.

- [ ] **Step 5: Commit**

```bash
git add scripts/run-drive-credit-videos.ts src/utils/video-pipeline.ts
git commit -m "fix: migrate run-drive-credit-videos to multi-frame VideoSceneSpec, remove unused imports"
```

---

## Verification Checklist

After all tasks complete:

- [ ] `npm run typecheck` passes clean
- [ ] 12 frame assets generated from `runDriveCreditPipeline` (3 + 7 + 2)
- [ ] `sceneOrder` is flat: `['hook-bg_frame_a', ..., 'cta-card_frame_b']`
- [ ] `frameMeta` keys match `sceneOrder` entries
- [ ] `totalDurationFrames` = 570 (90 + 360 + 120)
- [ ] Template string contains no opacity fade interpolation
- [ ] Template string contains Ken Burns `0.0003` multiplier
- [ ] Template string contains `punchFrame` spring
- [ ] Template string contains `slideleft` and `fadew` branches
- [ ] Template string contains `hookText` text layer with `opacity: 1` (no entrance)
- [ ] solution_frame_c has `punchFrame: 8` (approval notification punch)
- [ ] hook-bg_frame_a has `hookText: 'They said NO to your car loan.'`
- [ ] cta-card_frame_b has `hookText: 'Get approved in 60 seconds. Link in bio.'`
- [ ] `scripts/run-drive-credit-videos.ts` migrated — no `subject` at scene level
- [ ] `video-pipeline.ts` has no unused `critiqueVideoAssets` or `BatchCritiqueResult` imports
- [ ] `npm run typecheck` returns zero errors
