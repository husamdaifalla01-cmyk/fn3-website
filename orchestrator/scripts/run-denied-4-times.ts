#!/usr/bin/env npx tsx
/**
 * run-denied-4-times.ts
 * Full pipeline: nanobanana stills → VEO animation → Remotion render
 * for denied-4-times-v1 DriveCredit video.
 *
 * Usage:
 *   cd orchestrator && npx tsx scripts/run-denied-4-times.ts
 *   cd orchestrator && npx tsx scripts/run-denied-4-times.ts --skip-render  # generate assets only
 */

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import {
  generateSceneFrames,
  buildRemotionConfig,
  type FrameSpec,
} from '../src/utils/nanobanana';

// ─── CONFIG ──────────────────────────────────────────────────────────────────

const OUTPUT_DIR = path.resolve(__dirname, '../output/drive-credit/denied-4-times-v1');
const REMOTION_DIR = path.resolve(__dirname, '../../remotion');
const REMOTION_PUBLIC = path.join(REMOTION_DIR, 'public');
const ACTIVE_RENDER_DIR = path.resolve(__dirname, '../output/active-render');
const SKIP_RENDER = process.argv.includes('--skip-render');

const AFFILIATE_URL =
  'https://afflat3e3.com/trk/lnk/39C31C1E-2822-4350-B92A-2693C829ED6A/' +
  '?o=27618&c=918277&a=769106&k=D083BC665DB0EC415E23BE307260F10E&l=36989' +
  '&utm_source=tiktok&utm_medium=video&utm_campaign=denied-4-times-v1';

// ─── INVARIANT BLOCK ─────────────────────────────────────────────────────────
// Copied verbatim into every frame prompt. Never paraphrase.

const INVARIANT_BLOCK =
  'Diverse young adult, early 30s, modern casual clothing — plain hoodie and jeans, ' +
  'natural appearance with no styling, slightly tired expression, relatable everyday look. ' +
  'Natural car interior lighting, daylight through windshield from front, soft fill from ' +
  'side windows, warm dashboard ambient. 4500K color temperature, warm neutral cast. ' +
  '85mm portrait lens, f/1.8 shallow depth of field, subject sharp background bokeh. ' +
  'Set in driver\'s seat of a modest 2019 Honda Civic sedan, apartment complex parking lot ' +
  'visible through windows, afternoon daylight. ' +
  'Warm neutral tones, desaturated background, natural skin warmth, cool blue phone screen glow as accent. ' +
  'Authentic documentary style, warm neutral grading, slightly desaturated, real-world car ' +
  'interior lighting, not staged, not glossy, consistent lighting direction across all frames.';

const NEGATIVE =
  'artificial sharpness, uniform smoothness, plastic skin, uncanny valley, stock photo feel, ' +
  'corporate, glossy, studio lighting, perfect hair, model appearance, smiling unless specified, ' +
  'text overlays, watermarks, logos, bright saturated colors, HDR, aspirational luxury';

// ─── FRAME SPECS ─────────────────────────────────────────────────────────────

const HOOK_FRAMES: FrameSpec[] = [
  {
    frameId: 'hook_f0',
    imagePrompt:
      `${INVARIANT_BLOCK} Person slumped in driver's seat, phone face-down in lap, staring forward through windshield. ` +
      'Posture of someone who just read bad news and put the phone down. Not crying — just done. ' +
      'Eye level camera angle, centered symmetry composition. ' +
      'vertical 9:16 mobile-first framing, subject positioned upper two-thirds. ' +
      'cinematic quality, high detail, photorealistic, sharp focus, professional color grading.',
    motionPrompt:
      'Static camera. Subject sits motionless. Subtle chest rise and fall from breathing. ' +
      'Eyes blink once slowly. Phone screen in lap dims to black. No head movement. No camera movement. ' +
      'Natural ambient — slight shadow shift from passing cloud outside windshield. 5 seconds, 9:16 vertical.',
    negativePrompt: NEGATIVE + ', smiling, happy, energetic, looking at camera, staged',
    durationFrames: 30,
    imageModel: 'nano-banana-pro-preview',
    veoDuration: 8,
  },
  {
    frameId: 'hook_f1',
    imagePrompt:
      `Same scene continued. Maintain exact character appearance, lighting angle, and environment from reference image. ` +
      `${INVARIANT_BLOCK} POV close-up of smartphone screen showing a generic loan denial notification. ` +
      'Red warning icon, text reading "Application Not Approved". Notification count badge showing 4. ' +
      'Phone held in one hand, thumb resting on screen. Over shoulder camera angle, POV composition. ' +
      'vertical 9:16 mobile-first framing. cinematic quality, high detail, photorealistic.',
    motionPrompt:
      'POV shot of phone screen. Thumb taps dismissively on the denial notification. ' +
      'Screen shows red "Not Approved" text. Thumb scrolls slightly revealing previous denial notifications ' +
      'stacked below. Phone trembles slightly from hand tension. No camera movement. 5 seconds, 9:16 vertical.',
    negativePrompt: NEGATIVE + ', branded app, specific bank name, happy notification, green colors, approved',
    durationFrames: 30,
    veoDuration: 8,
  },
  {
    frameId: 'hook_f2',
    imagePrompt:
      `Same scene continued. Maintain exact character appearance, lighting angle, and environment from reference image. ` +
      `${INVARIANT_BLOCK} Back to face — eyebrows furrowed, head tilted slightly to one side, eyes narrowed. ` +
      'Expression of someone processing confusing information. Not sad — confused and curious. ' +
      'Looking slightly off-camera as if reading a text message. ' +
      'Eye level camera angle, rule of thirds composition with face on right third. ' +
      'vertical 9:16 mobile-first framing. cinematic quality, high detail, photorealistic.',
    motionPrompt:
      'Subject\'s expression shifts from blank to curious. Eyebrows furrow. Head tilts right 10 degrees. ' +
      'Eyes narrow as if reading something confusing on phone. Slight mouth movement as if mouthing ' +
      '"check my car?" to themselves. One slow blink. No camera movement. 5 seconds, 9:16 vertical.',
    negativePrompt: NEGATIVE + ', smiling, happy, looking at camera, stock expression',
    durationFrames: 30,
    veoDuration: 8,
  },
];

const PROBLEM_FRAMES: FrameSpec[] = [
  {
    frameId: 'problem_f0',
    imagePrompt:
      `Same scene continued. Maintain exact character appearance, lighting angle, and environment from reference image. ` +
      `${INVARIANT_BLOCK} Hands gripping steering wheel loosely, knuckles visible. Looking down at steering wheel ` +
      'then slowly looking up and around the car interior as if seeing it for the first time. ' +
      'Slight high camera angle, rule of thirds composition. ' +
      'vertical 9:16 mobile-first framing. cinematic quality, high detail, photorealistic.',
    motionPrompt:
      'Subject\'s hands rest on steering wheel. Slowly looks down at hands on wheel, then head lifts ' +
      'and turns to look at dashboard, then passenger seat, then back through windshield. Processing ' +
      'the car as an asset for the first time. Slight head shake of consideration. 5 seconds, 9:16 vertical.',
    negativePrompt: NEGATIVE,
    durationFrames: 30,
    veoDuration: 8,
  },
  {
    frameId: 'problem_f1',
    imagePrompt:
      `Same scene continued. Maintain exact character appearance, lighting angle, and environment from reference image. ` +
      `${INVARIANT_BLOCK} View through driver's side window looking at the exterior of a modest 2019 Honda Civic ` +
      'in an apartment complex parking lot. Not glamorous — slightly dusty, normal wear. Afternoon light hitting the hood. ' +
      'Eye level camera angle through window, leading lines composition along the car body. ' +
      'vertical 9:16 mobile-first framing. cinematic quality, high detail, photorealistic.',
    motionPrompt:
      'Exterior view of Honda Civic in parking lot. Natural handheld camera drift — very slight movement ' +
      'left to right as if the subject is looking at their own car from inside. Afternoon sunlight reflects ' +
      'off hood. A leaf blows past in background. 5 seconds, 9:16 vertical.',
    negativePrompt: NEGATIVE + ', luxury car, new car, showroom, glamorous',
    durationFrames: 30,
    veoDuration: 8,
  },
  {
    frameId: 'problem_f2',
    imagePrompt:
      `Same scene continued. Maintain exact character appearance, lighting angle, and environment from reference image. ` +
      `${INVARIANT_BLOCK} POV close-up of phone screen — Google search bar with "use car as collateral credit card" ` +
      'being typed. Search results beginning to load below. Thumb hovering over keyboard. ' +
      'Over shoulder angle, POV composition. Same car interior blurred behind phone. ' +
      'vertical 9:16 mobile-first framing. cinematic quality, high detail, photorealistic.',
    motionPrompt:
      'POV of phone screen. Thumb types last few characters of "use car as collateral credit card" ' +
      'into search. Results animate in below — first result highlighted. Thumb hovers, then taps ' +
      'the first result. Loading indicator appears briefly. 5 seconds, 9:16 vertical.',
    negativePrompt: NEGATIVE,
    durationFrames: 30,
    veoDuration: 8,
  },
  {
    frameId: 'problem_f3',
    imagePrompt:
      `Same scene continued. Maintain exact character appearance, lighting angle, and environment from reference image. ` +
      `${INVARIANT_BLOCK} Face — reading phone screen with skeptical but interested expression. ` +
      'One eyebrow slightly raised. Lips pressed together. The "wait this might actually be real" look. ' +
      'Slight high camera angle, rule of thirds composition. ' +
      'vertical 9:16 mobile-first framing. cinematic quality, high detail, photorealistic.',
    motionPrompt:
      'Subject reads phone screen. Eyes scan left to right, reading. Eyebrow raises slightly. ' +
      'Slight lip bite. Expression shifts from skeptical to cautiously interested. Eyes widen just ' +
      'slightly — not shock, just "huh." Scrolls phone with thumb. 5 seconds, 9:16 vertical.',
    negativePrompt: NEGATIVE,
    durationFrames: 30,
    veoDuration: 8,
  },
  {
    frameId: 'problem_f4',
    imagePrompt:
      `Same scene continued. Maintain exact character appearance, lighting angle, and environment from reference image. ` +
      `${INVARIANT_BLOCK} POV of phone screen showing a clean landing page with "Use your car. Not your score." ` +
      'headline. Green and white color scheme. A "Check If My Car Qualifies" button visible. ' +
      'Real-looking website interface — not a mockup. Eye level angle, centered composition on phone screen. ' +
      'vertical 9:16 mobile-first framing. cinematic quality, high detail, photorealistic.',
    motionPrompt:
      'POV of phone screen showing the landing page. Thumb scrolls slowly down — past headline, ' +
      'past car illustration, to the green CTA button. Pauses on the button. Thumb hovers. ' +
      'Phone held steady. 5 seconds, 9:16 vertical.',
    negativePrompt: NEGATIVE,
    durationFrames: 30,
    veoDuration: 8,
  },
];

const SOLUTION_FRAMES: FrameSpec[] = [
  {
    frameId: 'solution_f0',
    imagePrompt:
      `${INVARIANT_BLOCK} Filling out an application on phone. Casual posture, slightly hunched forward. ` +
      'Thumbs tapping on screen keyboard. In the car — not staged, feels like a real moment. ' +
      'Eye level camera angle, rule of thirds composition. ' +
      'vertical 9:16 mobile-first framing. cinematic quality, high detail, photorealistic.',
    motionPrompt:
      'Subject fills out form on phone. Both thumbs tap on phone keyboard. Occasionally pauses ' +
      'to read, then continues typing. Posture hunched slightly forward — focused. Bites lower lip once. ' +
      'Natural car interior sounds implied. 8 seconds, 9:16 vertical.',
    negativePrompt: NEGATIVE,
    durationFrames: 51,
    imageModel: 'nano-banana-pro-preview', // fresh anchor for solution arc
    veoDuration: 8,
  },
  {
    frameId: 'solution_f1',
    imagePrompt:
      `Same scene continued. Maintain exact character appearance, lighting angle, and environment from reference image. ` +
      `${INVARIANT_BLOCK} Phone held in both hands, screen showing a loading/processing indicator. ` +
      'Face visible above phone — jaw tight, eyes locked on screen, holding breath. ' +
      'Over shoulder camera angle framing both face and phone. ' +
      'vertical 9:16 mobile-first framing. cinematic quality, high detail, photorealistic.',
    motionPrompt:
      'Subject holds phone with both hands, staring at loading screen. Complete stillness except ' +
      'breathing — chest rises and falls. Eyes unblinking, locked on phone. Jaw clenches slightly. ' +
      'Swallows once. Tension of waiting for a financial decision. 8 seconds, 9:16 vertical.',
    negativePrompt: NEGATIVE,
    durationFrames: 51,
    veoDuration: 8,
  },
  {
    frameId: 'solution_f2', // *** ZOOM PUNCH ***
    imagePrompt:
      `Same scene continued. Maintain exact character appearance, lighting angle, and environment from reference image. ` +
      `${INVARIANT_BLOCK} Phone screen showing green checkmark and "Approved — $4,400 Credit Line" in bold. ` +
      'Phone tilted slightly toward camera as hands relax in surprise. Green approval glow illuminating face from below. ' +
      'POV angle shifted to see both screen and beginning of facial reaction. Centered symmetry composition. ' +
      'vertical 9:16 mobile-first framing. cinematic quality, high detail, photorealistic.',
    motionPrompt:
      'Loading screen resolves to green checkmark. "Approved" text appears with $4,400 credit line. ' +
      'Phone tilts toward camera as grip loosens in surprise. Green screen glow lights up face from below. ' +
      'A sharp inhale — beginning of reaction. 5 seconds, 9:16 vertical.',
    negativePrompt: NEGATIVE,
    durationFrames: 51,
    veoDuration: 8,
  },
  {
    frameId: 'solution_f3',
    imagePrompt:
      `Same scene continued. Maintain exact character appearance, lighting angle, and environment from reference image. ` +
      `${INVARIANT_BLOCK} Face — genuine shock transforming into disbelief smile. Mouth opens slightly, ` +
      'eyes widen, then smile starts from corners. One hand comes up to partially cover mouth. ' +
      'Not acting — authentic overwhelm. Eye level camera angle, centered composition. ' +
      'vertical 9:16 mobile-first framing. cinematic quality, high detail, photorealistic.',
    motionPrompt:
      'Subject face transitions from shock to joy. Mouth drops open. Eyes widen. Smile breaks — ' +
      'slow at first, then spreading. Hand rises to cover mouth. Slight laugh — shoulders shake once. ' +
      'Head shakes slightly in disbelief. 8 seconds, 9:16 vertical.',
    negativePrompt: NEGATIVE + ', fake smile, forced expression',
    durationFrames: 51,
    veoDuration: 8,
  },
  {
    frameId: 'solution_f4',
    imagePrompt:
      `Same scene continued. Maintain exact character appearance, lighting angle, and environment from reference image. ` +
      `${INVARIANT_BLOCK} Looking away from phone toward the car interior — steering wheel, dashboard, windshield. ` +
      'Then back to phone. The reframe happening in real time: "this car just did that." ' +
      'Slight low camera angle giving the car a moment of authority, rule of thirds composition. ' +
      'vertical 9:16 mobile-first framing. cinematic quality, high detail, photorealistic.',
    motionPrompt:
      'Subject looks up from phone toward steering wheel. Holds gaze on car for a beat. Looks back ' +
      'at phone. Looks up again — this time with slight disbelieving laugh. Pats the steering wheel ' +
      'once gently, almost affectionately. 8 seconds, 9:16 vertical.',
    negativePrompt: NEGATIVE,
    durationFrames: 51,
    veoDuration: 8,
  },
  {
    frameId: 'solution_f5',
    imagePrompt:
      `Same scene continued. Maintain exact character appearance, lighting angle, and environment from reference image. ` +
      `${INVARIANT_BLOCK} Phone held closer to face, scrolling through approval details. Screen shows ` +
      '"Real Visa Card", "No Deposit Required", "Keep Driving Your Car". Focused reading expression ' +
      'with undercurrent of relief. Eye level angle, rule of thirds composition. ' +
      'vertical 9:16 mobile-first framing. cinematic quality, high detail, photorealistic.',
    motionPrompt:
      'Subject holds phone close, scrolling through details. Reads slowly. Nods once at something. ' +
      'Slight smile maintained. Scrolls further. Pauses on a detail — eyebrows raise slightly in ' +
      'pleasant surprise. 8 seconds, 9:16 vertical.',
    negativePrompt: NEGATIVE,
    durationFrames: 51,
    veoDuration: 8,
  },
  {
    frameId: 'solution_f6',
    imagePrompt:
      `Same scene continued. Maintain exact character appearance, lighting angle, and environment from reference image. ` +
      `${INVARIANT_BLOCK} Leaning back into driver's seat. Full body posture change — shoulders drop, head tips ` +
      'back slightly against headrest, eyes close for a half-second. Deep exhale visible. Tension completely gone. ' +
      'Eye level camera, centered symmetry composition. ' +
      'vertical 9:16 mobile-first framing. cinematic quality, high detail, photorealistic.',
    motionPrompt:
      'Subject leans back into seat. Shoulders visibly drop. Head tilts back against headrest. ' +
      'Eyes close for one second. Deep exhale — chest deflates. Eyes open again looking upward. ' +
      'Small smile. Slight disbelieving headshake. The weight is gone. 8 seconds, 9:16 vertical.',
    negativePrompt: NEGATIVE,
    durationFrames: 51,
    veoDuration: 8,
  },
];

const CTA_FRAMES: FrameSpec[] = [
  {
    frameId: 'cta_f0',
    imagePrompt:
      `${INVARIANT_BLOCK} Clean shot of smartphone resting on the car dashboard, leaning against windshield. ` +
      'Phone screen shows a clean landing page with green CTA button. Afternoon sunlight through windshield ' +
      'illuminates phone naturally. Car keys visible next to phone. Not a studio — still in the Honda. ' +
      'Top down camera angle slightly angled, negative space composition. ' +
      'vertical 9:16 mobile-first framing. cinematic quality, high detail, photorealistic.',
    motionPrompt:
      'Phone sits on dashboard showing landing page. Subtle light shift as afternoon sun moves slightly. ' +
      'Phone screen glows. Car keys sit next to phone. Very minimal movement — calm after the storm. ' +
      '5 seconds, 9:16 vertical.',
    negativePrompt: NEGATIVE,
    durationFrames: 60,
    imageModel: 'nano-banana-pro-preview', // fresh anchor for CTA
    veoDuration: 8,
  },
  {
    frameId: 'cta_f1',
    imagePrompt:
      `Bold text card on warm neutral background matching car interior warmth. ` +
      'Large text: "Your car has money in it you\'re not using." Below in smaller text: ' +
      '"Soft check — won\'t affect your score." Brand amber color accent line between text blocks. ' +
      'Clean, minimal, readable in 1 second. Eye level, centered symmetry. ' +
      'vertical 9:16 composition. cinematic quality, sharp focus.',
    motionPrompt:
      'Text card with very subtle animation. The accent line between text blocks extends from ' +
      'center outward over 1 second. Otherwise static. Clean and confident. 5 seconds, 9:16 vertical.',
    negativePrompt: 'cluttered, too much text, low contrast, blurry, complex background',
    durationFrames: 60,
    veoDuration: 8,
  },
];

// ─── CAPTIONS ─────────────────────────────────────────────────────────────────

const CAPTIONS: Record<string, string> = {
  hook_f0:     'I got denied 4 times.',
  hook_f1:     'I got denied 4 times.',
  hook_f2:     'I got denied 4 times.',
  problem_f0:  '580 credit score.\n4 denials in 2 months.',
  problem_f1:  '580 credit score.\n4 denials in 2 months.',
  problem_f2:  '580 credit score.\n4 denials in 2 months.',
  problem_f3:  '580 credit score.\n4 denials in 2 months.',
  problem_f4:  '580 credit score.\n4 denials in 2 months.',
  solution_f0: 'Then someone told me\nto check my car.',
  solution_f1: 'Then someone told me\nto check my car.',
  solution_f2: 'Approved. $4,400.',
  solution_f3: 'Approved. $4,400.',
  solution_f4: 'This car just did that.',
  solution_f5: 'Real Visa. No deposit.\nKeep driving.',
  solution_f6: 'Real Visa. No deposit.\nKeep driving.',
  cta_f0:      'Link in bio.\nCheck if your car qualifies.',
  cta_f1:      'Your car has money\nin it you\'re not using.',
};

// ─── TRANSITIONS ──────────────────────────────────────────────────────────────

const TRANSITIONS: Record<string, 'smash' | 'slideleft' | 'fadew'> = {
  hook_f0:     'smash',
  hook_f1:     'slideleft',
  hook_f2:     'slideleft',
  problem_f0:  'fadew',
  problem_f1:  'slideleft',
  problem_f2:  'slideleft',
  problem_f3:  'slideleft',
  problem_f4:  'slideleft',
  solution_f0: 'fadew',
  solution_f1: 'slideleft',
  solution_f2: 'smash',      // REVEAL — hard cut
  solution_f3: 'slideleft',
  solution_f4: 'slideleft',
  solution_f5: 'fadew',
  solution_f6: 'slideleft',
  cta_f0:      'fadew',
  cta_f1:      'smash',
};

// ─── MAIN PIPELINE ───────────────────────────────────────────────────────────

async function main() {
  const startTime = Date.now();

  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║        DENIED-4-TIMES-V1 — MULTI-FRAME PIPELINE            ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // ── Step 1: Generate all scenes
  const scenes = [
    { sceneId: 'hook',     specs: HOOK_FRAMES },
    { sceneId: 'problem',  specs: PROBLEM_FRAMES },
    { sceneId: 'solution', specs: SOLUTION_FRAMES },
    { sceneId: 'cta',      specs: CTA_FRAMES },
  ];

  const sceneResults: Array<{ sceneId: string; result: Awaited<ReturnType<typeof generateSceneFrames>> }> = [];

  for (const { sceneId, specs } of scenes) {
    console.log(`\n━━━ Scene: ${sceneId} (${specs.length} frames) ━━━`);
    const result = await generateSceneFrames(sceneId, specs, OUTPUT_DIR);
    sceneResults.push({ sceneId, result });

    if (Object.keys(result.errors).length > 0) {
      console.warn(`  ⚠️  Errors in ${sceneId}:`, result.errors);
    }
  }

  // ── Step 2: Build Remotion manifest
  console.log('\n━━━ Building Remotion manifest ━━━');

  const remotionConfig = buildRemotionConfig(
    sceneResults,
    'DeniedFourTimes',
    OUTPUT_DIR,
    'solution_f2',
    CAPTIONS,
    TRANSITIONS,
  );

  // Convert to ClipMeta[] format for the Remotion composition
  const clips = remotionConfig.sceneOrder.map(frameId => ({
    id: frameId,
    file: path.basename(remotionConfig.assetMap[frameId]),
    durationSeconds: remotionConfig.frameDurations[frameId] / 30,
    transition: (TRANSITIONS[frameId] ?? 'smash') as 'smash' | 'slideleft' | 'fadew',
    punchAtSecond: frameId === 'solution_f2' ? 0 : undefined,
    hookText: CAPTIONS[frameId] ?? undefined,
  }));

  const manifest = {
    clips,
    totalDurationFrames: remotionConfig.totalDurationFrames,
    compositionId: 'VideoContentCreator',
  };

  // Write manifest to output dir
  const manifestPath = path.join(OUTPUT_DIR, 'remotion-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`  ✓ Manifest: ${manifestPath}`);

  // Write affiliate URL
  fs.writeFileSync(path.join(OUTPUT_DIR, 'affiliate-url.txt'), AFFILIATE_URL);

  // Write pipeline result
  const pipelineResult = {
    slug: 'denied-4-times-v1',
    pillar: 'Empathy',
    utmUrl: AFFILIATE_URL,
    success: sceneResults.every(s => Object.keys(s.result.errors).length === 0),
    totalFrames: sceneResults.reduce((acc, s) => acc + s.result.frames.length, 0),
    totalExpected: HOOK_FRAMES.length + PROBLEM_FRAMES.length + SOLUTION_FRAMES.length + CTA_FRAMES.length,
    totalTime: Date.now() - startTime,
    errors: Object.fromEntries(sceneResults.flatMap(s => Object.entries(s.result.errors))),
  };
  fs.writeFileSync(path.join(OUTPUT_DIR, 'pipeline-result.json'), JSON.stringify(pipelineResult, null, 2));

  if (SKIP_RENDER) {
    console.log('\n  --skip-render flag set. Skipping Remotion render.');
    console.log(`  Assets ready at: ${OUTPUT_DIR}`);
    printSummary(pipelineResult, Date.now() - startTime);
    return;
  }

  // ── Step 3: Copy clips to Remotion public/ and symlink manifest
  console.log('\n━━━ Preparing Remotion render ━━━');

  fs.mkdirSync(REMOTION_PUBLIC, { recursive: true });
  fs.mkdirSync(ACTIVE_RENDER_DIR, { recursive: true });

  // Copy all clip files to public/
  for (const frameId of remotionConfig.sceneOrder) {
    const srcPath = remotionConfig.assetMap[frameId];
    const destPath = path.join(REMOTION_PUBLIC, path.basename(srcPath));
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`  ✓ Copied ${path.basename(srcPath)} → public/`);
    } else {
      console.warn(`  ⚠️  Missing: ${srcPath}`);
    }
  }

  // Write manifest to active-render dir (Root.tsx reads from here)
  const activeManifestPath = path.join(ACTIVE_RENDER_DIR, 'remotion-manifest.json');
  fs.writeFileSync(activeManifestPath, JSON.stringify(manifest, null, 2));
  console.log(`  ✓ Active manifest: ${activeManifestPath}`);

  // ── Step 4: Remotion render
  console.log('\n━━━ Rendering with Remotion ━━━');

  const outputMp4 = path.join(OUTPUT_DIR, 'denied-4-times-v1.mp4');

  try {
    execSync(
      `npx remotion render VideoContentCreator "${outputMp4}" --codec h264 --concurrency 4`,
      {
        cwd: REMOTION_DIR,
        stdio: 'inherit',
        timeout: 300_000, // 5 min max
      },
    );
    console.log(`\n  ✓ Rendered: ${outputMp4}`);
  } catch (err) {
    console.error('\n  ✗ Remotion render failed:', err instanceof Error ? err.message : err);
    console.log('  Assets are still available for manual render in:', OUTPUT_DIR);
  }

  printSummary(pipelineResult, Date.now() - startTime);
}

function printSummary(result: any, totalMs: number) {
  const seconds = (totalMs / 1000).toFixed(1);

  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║              PIPELINE COMPLETE                              ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log(`  Frames generated: ${result.totalFrames}/${result.totalExpected}`);
  console.log(`  Errors: ${Object.keys(result.errors).length}`);
  console.log(`  Total time: ${seconds}s`);
  console.log(`  Output: ${OUTPUT_DIR}`);
  console.log(`  Affiliate: ${AFFILIATE_URL.slice(0, 60)}...`);
  console.log('');

  if (Object.keys(result.errors).length > 0) {
    console.warn('  ⚠️  Some frames failed:');
    for (const [k, v] of Object.entries(result.errors)) {
      console.warn(`    ${k}: ${v}`);
    }
  }
}

main().catch(err => {
  console.error('Pipeline crashed:', err);
  process.exit(1);
});
