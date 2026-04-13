/**
 * Regenerate frame_d for Subzii v1 — CTA frame without close-up face (VEO3 safety bypass).
 * Uses a hands + phone + event environment composition instead.
 */
import 'dotenv/config';
import * as path from 'path';
import * as fs from 'fs';
import { generateImage, generateVideoClip } from '../src/utils/nanobanana';

const OUTPUT_DIR = path.resolve('./output/subzii-v1');

// CTA frame: phone + drink + event energy. Face visible but small, not dominant.
const FRAME_D_PROMPT = `
TikTok/Instagram CTA frame — event night aesthetic.

Shot from slightly above and behind — lifestyle POV angle.
Two hands in frame: one holding a phone showing the Subzii app dashboard with commission notifications,
one holding a drink (vodka soda, condensation on glass).
Subject's shoulder and side of face visible at right edge — not centered, not dominant.
Background fills most of the frame: venue crowd, coloured stage lights, energy of the night.

The phone screen is clear and readable: "Subzii" app, a feed of green commission numbers.
This is the aspirational CTA — life is good, and this runs in the background.

LIGHTING: Warm ambient venue light, stage washes in amber and teal. Natural, not posed.
STYLE: Shot on iPhone aesthetic, slightly grainy, authentic. Vertical 9:16. NOT stock photo.
COLOR: Warm amber highlights, bokeh crowd lights, rich depth.
AVOID: Close-up face. Centered portrait. Stock photo energy.
`.trim();

const MOTION_D = `
Natural handheld motion — slightly swaying to music.
Phone and drink both move with the body. The crowd behind pulses.
At 2 seconds, a new commission notification drops on the phone screen — a gentle green flash.
Camera drifts slowly right, revealing more of the crowd. The energy of the night.
No zoom. Just living the moment.
`.trim();

async function run() {
  // Regenerate the image
  console.log('[frame_d] Regenerating image (no close-up face)...');
  const imgResult = await generateImage({
    prompt: FRAME_D_PROMPT,
    outputPath: path.join(OUTPUT_DIR, 'frame_d.png'),
    model: 'nano-banana-pro-preview',
    aspectRatio: '9:16',
  });

  if (!imgResult.success || !imgResult.filePath) {
    throw new Error(`Image failed: ${imgResult.error}`);
  }
  console.log('✓ frame_d.png regenerated');

  await new Promise(r => setTimeout(r, 8000));

  // Delete old clip if exists
  const clipPath = path.join(OUTPUT_DIR, 'frame_d_clip.mp4');
  if (fs.existsSync(clipPath)) fs.unlinkSync(clipPath);

  // Animate
  console.log('[frame_d] VEO3 animating...');
  const clipResult = await generateVideoClip({
    prompt: MOTION_D,
    outputPath: clipPath,
    model: 'veo-3.0-generate-001',
    durationSeconds: 8,
    aspectRatio: '9:16',
    referenceImagePath: imgResult.filePath,
  });

  if (!clipResult.success || !clipResult.filePath) {
    throw new Error(`VEO3 failed: ${clipResult.error}`);
  }
  console.log('✓ frame_d_clip.mp4');
  console.log('\nDone. Run animate-subzii-v1.ts to write the final manifest.');
}

run().catch(err => {
  console.error('✗', err.message);
  process.exit(1);
});
