/**
 * chain-solution-reveal.ts
 *
 * Chaining architecture — solution-reveal scene for TikTok/Instagram Reels:
 *
 *   hook_frame  (imagen-4, full 9-layer, pattern interrupt, first 2s attention)
 *       │
 *   frame_b     (nano-banana + hook_frame as reference, action beat: process)
 *       │
 *   frame_c     (nano-banana + frame_b as reference, action beat: reveal/punch)
 *
 * Platform: TikTok + Instagram Reels — 9:16, 1080×1920, 30fps
 * Watch-time principle: scroll-stopping visual + readable emotion within 2s (60 frames)
 *
 * Run: npx tsx scripts/chain-solution-reveal.ts
 */

import 'dotenv/config';
import * as path from 'path';
import * as fs from 'fs';
import { generateImage } from '../src/utils/nanobanana';
import { buildScenePrompt, DRIVE_CREDIT_ANCHORS } from '../src/utils/visual-prompts';

const OUTPUT_DIR = path.resolve('./output/solution-chain-v1');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const anchor = DRIVE_CREDIT_ANCHORS.hispanic_millennial;

// ── Invariant block: locked character + style + lighting repeats verbatim across all frames.
// This is the ConsiStory anchor — prevents identity drift between chained frames.
const INVARIANT = `
CHARACTER (maintain exactly across all frames): ${anchor.characterDescription}.
STYLE ANCHOR: ${anchor.styleSignature}.
LIGHTING LOCK: ${anchor.lightingSignature}. 4200K warm key, cool shadow fill.
PALETTE: ${anchor.colorPalette}. Aspiration_warm — amber highlights, deep teal shadows.
FORMAT: Vertical 9:16 portrait composition, 1080×1920 mobile-first framing. Subject in upper 2/3 of frame, bottom third clear for caption overlay.
QUALITY: Cinematic sharp focus, professional color grading, 85mm equivalent lens, shallow depth of field, natural bokeh background.
ANTI-ARTIFACT: Physically realistic skin texture, natural hair variation, motivated single light source, authentic DoF falloff. Not stock photo. Not staged. UGC feel.
`.trim();

// ─── HOOK FRAME ────────────────────────────────────────────────────────────────
//
// Platform principle: TikTok and Instagram Reels decide to show or hide your video
// within the first 2 seconds (60 frames at 30fps). The hook_frame must:
//   1. Show a human face with a readable, extreme emotion — stops the scroll
//   2. Create an open loop or pattern interrupt — "wait, what?"
//   3. Be legible as a thumbnail — the dominant visual at 1/4 screen size
//   4. Leave headroom for text overlay at bottom (bottom 30% clear)
//
// This is NOT a clean product shot. This is a human moment that earns 0.5s of attention.

const HOOK_FRAME_PROMPT = `
TikTok/Instagram hook frame — scroll-stopping pattern interrupt.

SCENE: Close-up face reaction — ${anchor.characterDescription}.
Person reading their smartphone screen with an expression of PURE SHOCK and disbelief.
Eyes wide, jaw slightly dropped, hand over mouth. This is the moment they see something unexpected.
The emotion must be immediately legible at thumbnail size — no ambiguity.

COMPOSITION: Face fills upper 65% of the vertical frame. Phone screen visible at lower edge showing a glowing green notification (content not readable — just the glow). Bottom 30% of frame is empty/dark for text overlay.
FRAMING: Extreme close-up, 50mm lens equivalent. Face slightly off-center to left (rule of thirds), eyes at top third line.
LIGHTING: ${anchor.lightingSignature}. High contrast — bright key on face, deep shadow on opposite side. Catch lights in both eyes.
BACKGROUND: Shallow DoF — apartment interior bokeh, warm amber city lights out of focus in the background.
EMOTION: Shock transitioning to joy — eyebrows raised, slight smile breaking through the shock. The micro-expression of "this can't be real."
PLATFORM: This frame must work as a silent thumbnail with no text. The face emotion IS the hook.
${anchor.colorPalette}.
QUALITY: Photorealistic, UGC feel, not staged, natural skin texture, hair with variation, authentic DoF.
AVOID: Plastic skin, uniform sharpness, stock photo pose, symmetrical composition, dead eyes.
`.trim();

// ─── FRAME B — Process beat ────────────────────────────────────────────────────
const BEAT_B = `
ACTION BEAT — Process moment:
Same person, same apartment. Now sitting at desk, leaning forward, actively filling out the DriveCredit application on their phone.
Both hands on the phone screen — thumbs typing. Progress bar visible at 60%. Expression: focused concentration, slight frown of effort.
The body language communicates "I'm committed to this." Slightly closer to camera than the hook frame — natural camera drift.
Hold everything from the previous frame — same lighting, same palette, same character. Only the hands, posture, and expression change.
`.trim();

// ─── FRAME C — Reveal beat (zoom punch moment) ────────────────────────────────
const BEAT_C = `
ACTION BEAT — Approval reveal (THIS IS THE PUNCH FRAME):
Same person, same apartment. Phone screen BLAZES with a green approval notification:
"$15,000 APPROVED ✓" in large bold green text — visible and legible on screen.
Person's reaction: mouth OPEN in disbelief-joy, phone thrust upward toward camera, free hand flying to chest.
This is the peak emotional moment — the payoff. Every muscle tells the story of relief.
Eye contact with camera — breaking the fourth wall for one frame. This creates intimacy on TikTok.
Hold the exact same character from previous frame — only the phone content, expression, and gesture change.
Lighting: same Rembrandt setup. Green from the phone screen adds a practical fill that warms the face from below — motivated, cinematic.
`.trim();

async function run() {
  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║    SOLUTION REVEAL — CHAINING ARCHITECTURE           ║');
  console.log('║    Platform: TikTok + Instagram Reels (9:16)         ║');
  console.log('╚══════════════════════════════════════════════════════╝\n');

  // ── Frame 1: hook_frame via imagen-4 (hero quality, no reference)
  // imagen-4 for the anchor because this is the identity-establishing frame.
  // Every subsequent frame chains from this one — it must be perfect.
  console.log('[1/3] hook_frame — imagen-4 hero quality (identity anchor)...');
  console.log('      This is your scroll-stop frame. Face-first, extreme emotion.');

  const hookResult = await generateImage({
    prompt: HOOK_FRAME_PROMPT,
    outputPath: path.join(OUTPUT_DIR, 'hook_frame.png'),
    model: 'imagen-4.0-generate-001',
    aspectRatio: '9:16',
  });

  if (!hookResult.success || !hookResult.filePath) {
    console.error('✗ hook_frame failed:', hookResult.error);
    process.exit(1);
  }
  console.log('✓ hook_frame →', hookResult.filePath);
  console.log('  Open this image and verify: face fills frame, emotion is legible as thumbnail.');

  await sleep(7000);

  // ── Frame 2: frame_b via nano-banana + hook_frame as reference
  // The reference image locks: character identity, lighting direction, color palette.
  // The text prompt only adds the new action beat.
  console.log('\n[2/3] frame_b — nano-banana + hook_frame as reference...');
  console.log('      Invariant block + process beat. Character must match hook_frame exactly.');

  const frameBResult = await generateImage({
    prompt: `${INVARIANT}\n\n${BEAT_B}`,
    outputPath: path.join(OUTPUT_DIR, 'frame_b.png'),
    model: 'nano-banana-pro-preview',
    aspectRatio: '9:16',
    referenceImagePath: hookResult.filePath,
  });

  if (!frameBResult.success || !frameBResult.filePath) {
    console.error('✗ frame_b failed:', frameBResult.error);
    process.exit(1);
  }
  console.log('✓ frame_b →', frameBResult.filePath);
  console.log('  Verify: same character, same lighting. Only action changed.');

  await sleep(7000);

  // ── Frame 3: frame_c via nano-banana + frame_b as reference
  // Chains from frame_b (not hook_frame) — this is the key.
  // The chain preserves the posture/hand position from the previous beat.
  console.log('\n[3/3] frame_c — nano-banana + frame_b as reference (reveal/punch)...');
  console.log('      This is the zoom-punch frame. Peak emotion. Eye contact with camera.');

  const frameCResult = await generateImage({
    prompt: `${INVARIANT}\n\n${BEAT_C}`,
    outputPath: path.join(OUTPUT_DIR, 'frame_c.png'),
    model: 'nano-banana-pro-preview',
    aspectRatio: '9:16',
    referenceImagePath: frameBResult.filePath,
  });

  if (!frameCResult.success || !frameCResult.filePath) {
    console.error('✗ frame_c failed:', frameCResult.error);
    process.exit(1);
  }
  console.log('✓ frame_c →', frameCResult.filePath);
  console.log('  Verify: phone shows green approval, eye contact, peak emotion.');

  // ── Write asset manifest for Remotion
  const manifest = {
    scene: 'solution-reveal',
    platform: ['tiktok', 'instagram_reels'],
    fps: 30,
    resolution: { width: 1080, height: 1920 },
    frames: [
      {
        id: 'hook_frame',
        file: hookResult.filePath,
        durationFrames: 60,  // 2s — this IS your first-2s attention grab
        transition: 'smash',
        hookText: 'Wait... they approved me?',  // text on frame 0, no entrance
        model: 'imagen-4.0-generate-001',
        note: 'Scroll-stop frame. Face + shock. Appears at t=0.',
      },
      {
        id: 'frame_b',
        file: frameBResult.filePath,
        durationFrames: 51,  // ~1.7s
        transition: 'smash',
        hookText: null,
        model: 'nano-banana-pro-preview',
        note: 'Process beat. Filling out application.',
      },
      {
        id: 'frame_c',
        file: frameCResult.filePath,
        durationFrames: 52,  // ~1.7s
        transition: 'smash',
        punchFrame: 8,  // zoom punch fires at frame 8 within this sequence
        hookText: null,
        model: 'nano-banana-pro-preview',
        note: 'Reveal beat. Green approval. Eye contact. PUNCH at frame 8.',
      },
    ],
    totalDurationFrames: 163,  // ~5.4s
    outputDir: OUTPUT_DIR,
  };

  const manifestPath = path.join(OUTPUT_DIR, 'remotion-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log('\n╔══════════════════════════════════════════════════════╗');
  console.log('║                    CHAIN COMPLETE                    ║');
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log(`\nOutput: ${OUTPUT_DIR}`);
  console.log('  hook_frame.png  — 2s scroll-stop (imagen-4)');
  console.log('  frame_b.png     — 1.7s process beat (chained from hook)');
  console.log('  frame_c.png     — 1.7s reveal punch (chained from frame_b)');
  console.log(`  remotion-manifest.json — ready for Remotion render`);
  console.log('\nNext: npx tsx scripts/render-from-manifest.ts');
}

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

run().catch(console.error);
