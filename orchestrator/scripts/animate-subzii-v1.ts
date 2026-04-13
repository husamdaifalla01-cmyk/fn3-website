/**
 * animate-subzii-v1.ts
 * Phase 2 only — animate the already-generated Subzii images with VEO3.
 * Run after chain-subzii-v1.ts phase 1 has completed.
 */
import 'dotenv/config';
import * as path from 'path';
import * as fs from 'fs';
import { generateVideoClip } from '../src/utils/nanobanana';

const OUTPUT_DIR = path.resolve('./output/subzii-v1');

const MOTION_PROMPTS: Record<string, string> = {
  hook_frame: `
    Subtle ambient motion. Subject breathes naturally, slight body sway to music.
    Club lights pulse gently in background. Eyes blink once, then refocus on phone with confused expression.
    Phone glow flickers as notifications come in. Handheld wobble, no zoom.
  `.trim(),
  frame_b: `
    She completes a slow head turn toward camera. Hair moves naturally.
    One eyebrow raises, half-smile settles in. Background crowd sways behind her.
    She is still — this contrast creates authority. Slight 2% push in over 5 seconds.
  `.trim(),
  frame_c: `
    She pushes the phone toward the camera — 5cm thrust, then holds.
    Commission notifications keep rolling on screen.
    At 1.5 seconds a new notification drops — she gasps, hand tightens over mouth.
    Phone stays held up. Let the audience read the numbers.
  `.trim(),
  frame_d: `
    She raises her drink in a toast toward camera. Natural laugh.
    Background event energy — people dancing, lights sweeping.
    She glances at phone, smiles, puts it away. The "money's handled" gesture.
    Slow pull back revealing more of the event.
  `.trim(),
};

async function animateFrame(name: string, imagePath: string, motionPrompt: string): Promise<string> {
  const outputPath = path.join(OUTPUT_DIR, `${name}_clip.mp4`);

  if (fs.existsSync(outputPath)) {
    console.log(`  ⏭  ${name}_clip.mp4 already exists, skipping`);
    return outputPath;
  }

  console.log(`\n  [${name}] VEO3 animating (5s)... ~30–90s`);

  const result = await generateVideoClip({
    prompt: motionPrompt,
    outputPath,
    model: 'veo-3.0-generate-001',
    durationSeconds: 8,
    aspectRatio: '9:16',
    referenceImagePath: imagePath,
  });

  if (!result.success || !result.filePath) {
    throw new Error(`VEO3 failed for ${name}: ${result.error}`);
  }

  console.log(`  ✓ ${name}_clip.mp4`);
  return result.filePath;
}

async function run() {
  console.log('\n── VEO3 Animation Pass — Subzii v1 ──────────────────────────\n');

  const frames = ['hook_frame', 'frame_b', 'frame_c', 'frame_d'];
  const clips: Record<string, string> = {};

  for (const name of frames) {
    const imagePath = path.join(OUTPUT_DIR, `${name}.png`);
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Missing image: ${imagePath}. Run chain-subzii-v1.ts first.`);
    }
    clips[name] = await animateFrame(name, imagePath, MOTION_PROMPTS[name]);
  }

  // Write manifest for Remotion
  const manifest = {
    id: 'subzii-v1',
    concept: 'You were already going to the party',
    platform: ['tiktok', 'instagram_reels'],
    fps: 30,
    resolution: { width: 1080, height: 1920 },
    clips: [
      { id: 'hook_frame',  file: clips.hook_frame,  durationSeconds: 5, transition: 'smash',     hookText: 'My friend just sent me $200\nfor... going to a party?', punchAtSecond: null },
      { id: 'frame_b',     file: clips.frame_b,     durationSeconds: 8, transition: 'smash',     hookText: null, punchAtSecond: null },
      { id: 'frame_c',     file: clips.frame_c,     durationSeconds: 8, transition: 'smash',     hookText: 'You share a link.\nThey buy a ticket.\nYou get paid.', punchAtSecond: 1.5 },
      { id: 'frame_d',     file: clips.frame_d,     durationSeconds: 8, transition: 'slideleft', hookText: "You're literally already there.\nLink in bio →", punchAtSecond: null },
    ],
    totalDurationSeconds: 20,
    outputDir: OUTPUT_DIR,
  };

  const manifestPath = path.join(OUTPUT_DIR, 'remotion-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log('\n  ✓ Manifest written:', manifestPath);
  console.log('\n  Next: copy clips to /FN3/remotion/public/ then render');
  console.log('        npx tsx scripts/render-subzii.ts\n');
}

run().catch(err => {
  console.error('✗', err.message);
  process.exit(1);
});
