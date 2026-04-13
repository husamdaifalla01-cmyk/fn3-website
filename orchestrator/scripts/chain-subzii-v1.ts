/**
 * chain-subzii-v1.ts
 *
 * Subzii TikTok/Instagram Reels — "You were already going to the party"
 *
 * Concept:
 *   The relatable pain: you go to events, you post about them, your friends
 *   buy tickets because of you — and you've never seen a dollar from it.
 *   Subzii fixes that. You share a link. They buy. You get paid.
 *
 * Script:
 *   Frame 1 (hook, 0–2s):  "My friend just sent me $200 for... going to a party?"
 *   Frame 2 (curiosity):   Slow turn to camera. The "explain this" face.
 *   Frame 3 (reveal):      Subzii dashboard — commissions rolling in
 *   Frame 4 (cta):         At the event, phone + drink. "You're already there."
 *
 * Architecture:
 *   hook_frame (imagen-4) ──► VEO3 animate ──► hook_clip.mp4
 *       │
 *   frame_b (nano-banana + ref) ──► VEO3 ──► frame_b_clip.mp4
 *       │
 *   frame_c (nano-banana + ref) ──► VEO3 ──► frame_c_clip.mp4 (reveal punch)
 *       │
 *   frame_d (nano-banana + ref) ──► VEO3 ──► frame_d_clip.mp4 (cta)
 *
 * Remotion stitches the 4 clips with smash cuts.
 *
 * Run: npx tsx scripts/chain-subzii-v1.ts
 */

import 'dotenv/config';
import * as path from 'path';
import * as fs from 'fs';
import { generateImage, generateVideoClip } from '../src/utils/nanobanana';

const OUTPUT_DIR = path.resolve('./output/subzii-v1');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ── Character anchor — locked across all frames via chaining
// Young, social, festival-goer. The person your audience sees themselves as.
const CHARACTER = `
Young woman, mid-20s, South Asian, expressive face. Wearing a cropped graphic tee and gold hoop earrings.
Natural makeup, slight shimmer highlight. Hair half-up, loose strands framing face. Genuine, unposed energy.
Not a model. The friend who always ends up at the best events.
`.trim();

const STYLE = `
Shot on iPhone aesthetic — slightly grainy, natural light, authentic. NOT stock photo. NOT staged.
Vertical 9:16 portrait. Subject fills upper 65% of frame. Bottom 30% clear for caption.
Shallow DoF, natural bokeh. Color grade: warm amber/peach highlights, slightly desaturated midtones.
`.trim();

// ── IMAGE PROMPTS ─────────────────────────────────────────────────────────────

const HOOK_IMAGE_PROMPT = `
TikTok scroll-stop hook frame.

${CHARACTER}
${STYLE}

SCENE: She's at a venue — dark background, coloured stage lights, crowd bokeh behind her.
She's looking at her phone with an expression of PURE confused disbelief.
Eyebrows furrowed, head tilted slightly, mouth slightly open. The face of "wait... this can't be real."
The phone is visible at the bottom of frame — glowing, casting light on her chin — but the SCREEN IS NOT READABLE.
This is the micro-expression before the reaction. The scroll-stopping "wait what" beat.

LIGHTING: Practical club lighting — warm amber key from left, cyan/teal rim from right (stage wash).
High contrast. Catch lights in both eyes from the phone glow. Feels alive, not posed.
COMPOSITION: Face centered, slight tilt left. Rule of thirds — eyes at upper third line.
EMOTION: Confused disbelief tipping toward excitement. This face EARNS 2 seconds of attention.
AVOID: Smiling. That comes later. This is the "before" face — confusion is the hook.
`.trim();

const FRAME_B_PROMPT = `
${CHARACTER}
${STYLE}

SCENE: Same venue, same lighting. She has FULLY turned to face the camera now.
The expression has shifted: she's looking directly at us, one eyebrow raised, half-smile.
The "are you seeing this" face. Phone now lowered to her side. She's about to tell us something.
The body language is leaning slightly forward — conspiratorial, like she's letting us in on a secret.
Direct eye contact. This is the intimacy beat. TikTok watch time lives here.

LIGHTING: Same warm amber / cyan practical lights. Natural motion blur on background crowd.
Hold everything from the previous frame — only expression and eye direction change.
`.trim();

const FRAME_C_PROMPT = `
${CHARACTER}
${STYLE}

SCENE: Same venue. She's now holding the phone UP toward us, screen facing camera.
The Subzii app dashboard is CLEARLY VISIBLE on screen:
- A commission notification: "+$127.00" in green
- Below it: "+$43.00", "+$89.00" — a feed of rolling payouts
- App name "Subzii" visible in the top bar
Her other hand is covering her mouth in disbelief-joy. Eyes wide. THIS IS THE REVEAL.
The phone screen is bright enough to cast green-tinted light on her face.
This is the zoom-punch frame. The payoff. Peak emotion.
Hold character from previous frame exactly — only phone position and expression change.
`.trim();

const FRAME_D_PROMPT = `
${CHARACTER}
${STYLE}

SCENE: Same venue. Wider shot — now we see she has a drink in one hand, phone in the other.
She's back to enjoying the event. Relaxed smile at camera. The "I figured it out" energy.
Phone screen showing Subzii app, slight tilt so we can see it but she's not performing.
Natural, candid. Like a friend took this photo of her mid-event.
Background: venue crowd, stage lights, the full energy of the night.
This is the aspirational CTA frame — life is good, and she gets paid for this.
`.trim();

// ── VEO3 MOTION PROMPTS — what happens in the clip ───────────────────────────

const MOTION_PROMPTS = {
  hook_frame: `
    Subtle ambient motion. Subject breathes naturally, slight body sway to music.
    Club lights pulse gently in background — not strobing, just living.
    Eyes blink once, then focus back on phone with that same confused expression.
    Phone glow flickers slightly as notifications come in. 3 seconds feels like a moment, not a still.
    Camera: locked off, very slight handheld wobble. No zoom.
  `.trim(),

  frame_b: `
    She turns her head slightly toward us, completing the look-to-camera.
    Hair moves naturally from the turn. One eyebrow raises. The half-smile settles in.
    Background crowd sways, lights shift. She is completely still relative to the motion behind her.
    This contrast — stillness in chaos — creates authority. She knows something they don't.
    Camera: slight push in, 2% over 3 seconds. Subliminal but intentional.
  `.trim(),

  frame_c: `
    She pushes the phone toward the camera — a 5cm thrust, then holds.
    The Subzii commission notifications keep rolling on screen as she holds it up.
    Her other hand stays over her mouth. Eyes are glistening.
    At 1.5 seconds in, a new "+$64.00" notification drops on the screen — she gasps.
    The phone stays held up for a full beat. Let the audience read the numbers.
    Camera: subtle zoom punch at the moment the notification drops. Fast snap, 0.05 scale.
  `.trim(),

  frame_d: `
    She raises her drink slightly in a toast toward camera. Natural laugh.
    Background: full event energy — people dancing, lights sweeping the crowd.
    She glances at her phone once, smiles, puts it back in her pocket.
    The gesture says: "money's handled, now I'm just living."
    Camera: slow pull back, revealing more of the event behind her. Ending frame.
  `.trim(),
};

// ── PIPELINE ──────────────────────────────────────────────────────────────────

async function generateFrame(
  name: string,
  prompt: string,
  model: 'imagen-4.0-generate-001' | 'nano-banana-pro-preview',
  referenceImagePath?: string,
): Promise<string> {
  const outputPath = path.join(OUTPUT_DIR, `${name}.png`);
  console.log(`\n  [${name}] Generating image (${model})...`);

  const result = await generateImage({
    prompt,
    outputPath,
    model,
    aspectRatio: '9:16',
    referenceImagePath,
  });

  if (!result.success || !result.filePath) {
    throw new Error(`Image generation failed for ${name}: ${result.error}`);
  }

  console.log(`  ✓ ${name}.png`);
  return result.filePath;
}

async function animateFrame(
  name: string,
  imagePath: string,
  motionPrompt: string,
): Promise<string> {
  const outputPath = path.join(OUTPUT_DIR, `${name}_clip.mp4`);
  console.log(`  [${name}] Animating with VEO3 (image-to-video, 5s)...`);
  console.log(`           This takes 30–90s. Cost: ~$1.75.`);

  const result = await generateVideoClip({
    prompt: motionPrompt,
    outputPath,
    model: 'veo-3.0-generate-001',
    durationSeconds: 5,
    aspectRatio: '9:16',
    referenceImagePath: imagePath,
  });

  if (!result.success || !result.filePath) {
    throw new Error(`VEO3 animation failed for ${name}: ${result.error}`);
  }

  console.log(`  ✓ ${name}_clip.mp4 (${result.durationSeconds}s)`);
  return result.filePath;
}

async function run() {
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║   SUBZII — "You were already going to the party"            ║');
  console.log('║   Platform: TikTok + Instagram Reels  |  9:16  |  30fps    ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');
  console.log('PHASE 1: Generate images (chaining architecture)');
  console.log('PHASE 2: Animate each image with VEO3 (image-to-video)');
  console.log('PHASE 3: Write Remotion manifest → render\n');

  // ── PHASE 1: IMAGE GENERATION (chaining) ─────────────────────────────────

  console.log('── PHASE 1: Images ───────────────────────────────────────────');

  // Hook: imagen-4, no reference — this IS the identity anchor
  const hookPath = await generateFrame('hook_frame', HOOK_IMAGE_PROMPT, 'imagen-4.0-generate-001');
  await sleep(7000);

  // frame_b chains from hook
  const frameBPath = await generateFrame('frame_b', FRAME_B_PROMPT, 'nano-banana-pro-preview', hookPath);
  await sleep(7000);

  // frame_c chains from frame_b
  const frameCPath = await generateFrame('frame_c', FRAME_C_PROMPT, 'nano-banana-pro-preview', frameBPath);
  await sleep(7000);

  // frame_d chains from frame_c
  const frameDPath = await generateFrame('frame_d', FRAME_D_PROMPT, 'nano-banana-pro-preview', frameCPath);
  await sleep(7000);

  console.log('\n  All images generated. Verify character consistency before animating.');
  console.log(`  → open ${OUTPUT_DIR}\n`);

  // ── PHASE 2: VEO3 ANIMATION (image-to-video) ──────────────────────────────
  // Each image becomes a 5-second clip with natural motion.
  // VEO3 uses the reference image as the first frame and animates forward.

  console.log('── PHASE 2: VEO3 Animation ───────────────────────────────────');
  console.log('  Each clip: 5s @ ~$1.75. Total: ~$7. Runtime: 3–7 min.\n');

  const hookClip  = await animateFrame('hook_frame', hookPath,  MOTION_PROMPTS.hook_frame);
  const frameBClip = await animateFrame('frame_b',   frameBPath, MOTION_PROMPTS.frame_b);
  const frameCClip = await animateFrame('frame_c',   frameCPath, MOTION_PROMPTS.frame_c);
  const frameDClip = await animateFrame('frame_d',   frameDPath, MOTION_PROMPTS.frame_d);

  // ── PHASE 3: REMOTION MANIFEST ────────────────────────────────────────────

  console.log('\n── PHASE 3: Remotion Manifest ────────────────────────────────');

  const manifest = {
    id: 'subzii-v1',
    concept: 'You were already going to the party',
    platform: ['tiktok', 'instagram_reels'],
    fps: 30,
    resolution: { width: 1080, height: 1920 },
    clips: [
      {
        id: 'hook_frame',
        file: hookClip,
        durationSeconds: 5,
        transition: 'smash',
        // Text present on frame 0 — no entrance — this is your 2-second hook
        hookText: 'My friend just sent me $200\nfor... going to a party?',
        note: 'Scroll-stop. Confused disbelief face. Phone glow. 0-2s watch window.',
      },
      {
        id: 'frame_b',
        file: frameBClip,
        durationSeconds: 5,
        transition: 'smash',
        hookText: null,
        note: 'Direct eye contact. Conspiratorial half-smile. Holds watch time.',
      },
      {
        id: 'frame_c',
        file: frameCClip,
        durationSeconds: 5,
        transition: 'smash',
        // punchFrame in seconds — zoom punch fires at notification drop
        punchAtSecond: 1.5,
        hookText: 'You share a link.\nThey buy a ticket.\nYou get paid.',
        note: 'Reveal beat. Subzii dashboard. Commission notifications rolling.',
      },
      {
        id: 'frame_d',
        file: frameDClip,
        durationSeconds: 5,
        transition: 'slideleft',
        hookText: "You're literally already there.\nLink in bio →",
        note: 'CTA. Event energy. Aspirational. Toast to camera.',
      },
    ],
    totalDurationSeconds: 20,
    outputDir: OUTPUT_DIR,
  };

  const manifestPath = path.join(OUTPUT_DIR, 'remotion-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`  ✓ Manifest written: ${manifestPath}`);

  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║                      PIPELINE COMPLETE                      ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log(`\n  Images:  ${OUTPUT_DIR}/*.png`);
  console.log(`  Clips:   ${OUTPUT_DIR}/*_clip.mp4`);
  console.log(`  Total:   20s video across 4 clips`);
  console.log(`\n  Next: npx tsx scripts/render-subzii.ts`);
  console.log('         (or update /FN3/remotion to use video clips instead of images)\n');
}

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

run().catch(err => {
  console.error('\n✗ Pipeline failed:', err.message);
  process.exit(1);
});
