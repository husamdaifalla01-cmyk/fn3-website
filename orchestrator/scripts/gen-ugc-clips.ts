/**
 * gen-ugc-clips.ts
 * Generate UGC-style talking head clips for SubziiDemo.tsx.
 *
 * Two clips:
 *   ugc_hook   — frustrated promoter, 8s (used 0–4s in demo)
 *   ugc_return — satisfied/impressed reaction, 8s (used 22–28s in demo)
 *
 * Workflow: generate reference image → VEO3 animate → copy to remotion/public/
 */
import 'dotenv/config';
import * as path from 'path';
import * as fs from 'fs';
import { generateVideoClip } from '../src/utils/nanobanana';

const OUTPUT_DIR = path.resolve('./output/subzii-ugc');
const PUBLIC_DIR = path.resolve('../remotion/public');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ── Locked character description (invariant across both frames for consistency)
const CHARACTER = `
Young South Asian woman, mid-20s. Natural beauty — no heavy makeup.
Wearing a casual oversized crewneck sweatshirt, dark colour.
Long dark hair down, slightly wavy. Small gold earrings.
Shot on iPhone aesthetic — slightly grainy, portrait mode, authentic.
Selfie-angle camera, slightly below eye level, face centred in frame.
Background: living room wall, soft ambient lamp light. Warm tones. Bokeh.
NOT stock photo. NOT staged. Vertical 9:16 format.
`.trim();

// ── Hook: frustrated talking head, text-to-video direct
const HOOK_MOTION = `
${CHARACTER}

She is talking directly to camera, venting — frustrated and disbelieving.
Expression: eyebrows furrowed, mouth mid-word, one hand slightly raised in a "can you believe this" gesture.
Casual handheld motion — slight sway. Eyes widen with emphasis.
At 2s she shakes her head slowly. At 4s she looks down then back up — exasperated.
No zoom. Natural light flicker from lamp. Real-person energy. Authentic, NOT posed.
`.trim();

// ── Return: same character, calm + vindicated
const RETURN_MOTION = `
${CHARACTER}

She speaks to camera with calm authority — soft smile, satisfied, the "I told you" energy.
Head tilted slightly. Eyes warm. One eyebrow raises knowingly.
At 3s she glances to the side briefly, then back — like she's remembering the old way.
Small genuine smile that grows. Natural breathing. Subtle hair movement.
No zoom. Warm, still energy. Authentic, NOT posed.
`.trim();

async function generateClip(name: string, motionPrompt: string): Promise<string> {
  const clipPath = path.join(OUTPUT_DIR, `${name}_clip.mp4`);

  if (fs.existsSync(clipPath)) {
    console.log(`  ⏭  ${name}_clip.mp4 already exists`);
    return clipPath;
  }

  console.log(`\n[${name}] VEO3 text-to-video... (~60–90s)`);
  const clipResult = await generateVideoClip({
    prompt: motionPrompt,
    outputPath: clipPath,
    model: 'veo-3.1-generate-preview',
    durationSeconds: 8,
    aspectRatio: '9:16',
  });
  if (!clipResult.success || !clipResult.filePath) {
    throw new Error(`VEO3 failed for ${name}: ${clipResult.error}`);
  }
  console.log(`  ✓ ${name}_clip.mp4`);
  return clipPath;
}

async function run() {
  console.log('\n── Subzii UGC Clip Generation ──────────────────────────────\n');

  const hookClip   = await generateClip('ugc_hook',   HOOK_MOTION);
  const returnClip = await generateClip('ugc_return', RETURN_MOTION);

  // Copy clips to remotion/public/ so staticFile() can serve them
  const hookDest   = path.join(PUBLIC_DIR, 'ugc_hook_clip.mp4');
  const returnDest = path.join(PUBLIC_DIR, 'ugc_return_clip.mp4');
  fs.copyFileSync(hookClip,   hookDest);
  fs.copyFileSync(returnClip, returnDest);

  console.log('\n  ✓ Copied to remotion/public/');
  console.log('     ugc_hook_clip.mp4');
  console.log('     ugc_return_clip.mp4');
  console.log('\n  Next: render the full SubziiDemo composition');
  console.log('        cd ../remotion && npx remotion render src/index.ts SubziiDemo ../orchestrator/output/subzii-demo-v1/subzii-demo-ugc.mp4\n');
}

run().catch(err => {
  console.error('✗', err.message);
  process.exit(1);
});
