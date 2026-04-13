/**
 * visual-prompts.ts
 * PhD-level visual prompt engineering for nanobanana image generation.
 *
 * Research foundations embedded as operational protocols:
 *   Oppenlaender (2022)          — 6-modifier taxonomy
 *   Liu & Chilton (2022)         — subject+style keyword combination
 *   Pavlichenko & Ustalov (2023) — genetic-algorithm optimal keyword set
 *   DALL-E 3 Technical (2023)    — descriptive-caption methodology (95/5)
 *   ConsiStory (2024)            — anchor-based multi-image consistency
 *   Cinematography science       — focal length, lighting physics, Kelvin
 *   De-Fake / Sha et al. (2023)  — pre-empt AI artifact signatures
 */

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface SceneSpec {
  id: string;
  sceneType: SceneType;
  subject: SubjectSpec;
  mood: MoodSpec;
  brand: BrandSpec;
  consistencyAnchor?: ConsistencyAnchor;
  overrides?: Partial<PromptConfig>;
}

export interface SubjectSpec {
  primary: string;        // "smartphone screen showing credit score 720"
  secondary?: string;     // "young Black woman in business attire"
  environment?: string;   // "modern living room, warm afternoon light"
  action?: string;        // "reaching forward, expression of relief"
}

export interface MoodSpec {
  emotion: 'relief' | 'aspiration' | 'urgency' | 'trust' | 'triumph' | 'curiosity';
  energy: 'calm' | 'dynamic' | 'intimate' | 'bold';
  palette: PaletteProfile;
}

export interface BrandSpec {
  product: string;        // "DriveCredit" | "auto loan" | etc.
  demographic: string;    // "Hispanic millennial", "African American Gen-Z"
  platform: 'tiktok' | 'reels' | 'youtube_shorts';
}

export interface ConsistencyAnchor {
  characterDescription: string;  // Locked character description across scenes
  styleSignature: string;        // Visual style anchor phrase
  lightingSignature: string;     // Locked lighting setup
  colorPalette: string;          // Dominant palette anchor
}

export interface PromptConfig {
  subjectDetail: 'minimal' | 'standard' | 'rich';
  cinematography: CinematographySpec;
  lightingSetup: LightingSetup;
  qualityModifiers: string[];
  negativePrompt: string;
  aspectRatio: '9:16' | '16:9' | '1:1';
}

export interface CinematographySpec {
  focalLength: FocalLength;
  depthOfField: 'shallow' | 'medium' | 'deep';
  cameraAngle: CameraAngle;
  composition: CompositionRule;
}

export interface LightingSetup {
  style: LightingStyle;
  kelvin: number;         // 2700–6500K
  direction: string;      // "45° upper left", "frontal soft"
  fill: 'none' | 'soft' | 'hard';
  practicalLights?: string;
}

export interface BuildResult {
  prompt: string;
  negativePrompt: string;
  aspectRatio: '9:16' | '16:9' | '1:1';
  model: 'nano-banana-pro-preview' | 'gemini-2.5-flash-image' | 'imagen-4.0-generate-001';
  metadata: PromptMetadata;
}

export interface PromptMetadata {
  sceneId: string;
  oppenlaenderCategories: string[];
  consistencyAnchorsUsed: string[];
  lightingKelvin: number;
  focalLength: string;
  aiArtifactGuards: string[];
}

// ─── ENUMERATIONS ─────────────────────────────────────────────────────────────

export type SceneType =
  | 'hook'           // 0–3s: pattern interrupt, visual shock
  | 'problem'        // 3–8s: relatable pain visualization
  | 'solution'       // 8–20s: product/transformation reveal
  | 'social_proof'   // testimonial moment
  | 'cta';           // call-to-action card

export type FocalLength =
  | '24mm'    // environmental, wide, slight distortion — establishes context
  | '35mm'    // reportage, natural, slight wide — documentary feel
  | '50mm'    // human eye, neutral, most natural — trust
  | '85mm'    // portrait, shallow DoF, flattering — face-forward
  | '135mm';  // compressed, intimate, telephoto — emotional close-up

export type CameraAngle =
  | 'eye_level'      // neutral, democratic, connection
  | 'slight_low'     // authority, aspiration, power
  | 'slight_high'    // vulnerability, intimacy, accessible
  | 'over_shoulder'  // immersive POV, relatable
  | 'top_down'       // product flat lay, organized, clean
  | 'pov';           // first-person, hyper-relatable

export type CompositionRule =
  | 'rule_of_thirds'    // subject on ⅓ grid intersection
  | 'golden_ratio'      // Phi spiral, natural balance
  | 'leading_lines'     // environmental lines to subject
  | 'frame_within_frame'// architectural/natural framing
  | 'centered_symmetry' // authority, impact, bold
  | 'negative_space';   // breathing room, minimalist

export type LightingStyle =
  | 'rembrandt'      // 45° key + triangle under eye, portraiture gold standard
  | 'butterfly'      // frontal high key, glamour, beauty
  | 'loop'           // 30°–45° key, commercial standard
  | 'split'          // 90° side, dramatic, mystery
  | 'broad'          // large soft source, flattering, editorial
  | 'backlit'        // rim lighting, aspirational silhouette
  | 'window_natural' // real-world, authentic, trust
  | 'golden_hour';   // warm directional, aspirational, lifestyle

// ─── PALETTE PROFILES ─────────────────────────────────────────────────────────

export type PaletteProfile =
  | 'trust_blue'         // #1E40AF dominant, cool-neutral
  | 'aspiration_warm'    // warm gold + neutral ground, lifestyle
  | 'urgency_high'       // saturated red-orange accent, cool ground
  | 'triumph_green'      // success green, clean white space
  | 'premium_dark'       // deep navy + gold, authority
  | 'authentic_earthy';  // terracotta + natural, genuine

const PALETTE_DESCRIPTORS: Record<PaletteProfile, string> = {
  trust_blue:       'cool blue tones, clean white highlights, desaturated background, professional color grading',
  aspiration_warm:  'warm golden tones, soft cream whites, rich mid-tones, lifestyle warmth',
  urgency_high:     'bold warm accent against cool neutral ground, high contrast, immediate visual energy',
  triumph_green:    'fresh clean greens, bright whites, open airy feel, optimistic light',
  premium_dark:     'deep navy ground, warm gold accents, high contrast luxury, cinematic shadow',
  authentic_earthy: 'warm terracotta, natural browns, textured surfaces, honest daylight',
};

// ─── OPPENLAENDER 2022 — 6-MODIFIER TAXONOMY ──────────────────────────────────
// Subject modifiers, Style modifiers, Quality boosters, Image prompts,
// Repeating terms (emphasis), Magic terms (known effective triggers)

/** Pavlichenko & Ustalov 2023 — genetic-algorithm derived optimal quality modifiers */
const QUALITY_BOOSTERS_GENETIC = [
  'cinematic',
  'colorful background',
  'concept art',
  'dramatic lighting',
  'high detail',
  'highly detailed',
  'hyper realistic',
  'intricate',
  'intricate sharp details',
  'smooth',
  'studio lighting',
  'trending on artstation',
] as const;

/** Core quality stack — curated for mobile-first social content */
const QUALITY_STACK_SOCIAL = [
  'cinematic quality',
  'high detail',
  'sharp focus',
  'professional color grading',
  'photorealistic',
  '8k resolution equivalent',
] as const;

/** Anti-AI-artifact modifiers — pre-empt De-Fake signature patterns */
const ANTI_ARTIFACT_MODIFIERS = [
  'physically correct lighting',
  'coherent shadows',
  'natural skin texture',
  'accurate depth of field',
  'real optical lens characteristics',
  'motivated light sources',
  'correct perspective',
  'natural color temperature',
] as const;

// ─── NEGATIVE PROMPT LIBRARY ──────────────────────────────────────────────────

/** Universal negative prompt — suppress AI artifact signatures identified in De-Fake (Sha 2023) */
const UNIVERSAL_NEGATIVE =
  'artificial sharpness, uniform smoothness, plastic skin, uncanny valley, ' +
  'inconsistent lighting, impossible shadows, floating objects, wrong perspective, ' +
  'distorted text, blurry backgrounds without optical reason, watermark, logo, ' +
  'stock photo feel, corporate clip art, oversaturated, HDR over-processing, ' +
  'extra fingers, anatomical errors, lens distortion artifacts, AI hallucinations, ' +
  'flat lighting, generic poses, clichéd composition';

const SCENE_NEGATIVE: Record<SceneType, string> = {
  hook:        'boring, static, low energy, stock photo',
  problem:     'happy, positive, aspirational (saves as contrast)',
  solution:    'complex, cluttered, off-brand, inconsistent character',
  social_proof:'staged, forced smile, studio backdrop, fake testimonial feel',
  cta:         'cluttered, too much text, low contrast, illegible',
};

// ─── FOCAL LENGTH → CINEMATOGRAPHIC LANGUAGE ──────────────────────────────────

const FOCAL_LANGUAGE: Record<FocalLength, string> = {
  '24mm':  'wide environmental composition, slight barrel distortion, immersive space, 24mm lens',
  '35mm':  'natural reportage framing, documentary intimacy, 35mm lens perspective',
  '50mm':  'natural human eye perspective, balanced spatial relationship, 50mm standard lens',
  '85mm':  'flattering portrait compression, shallow depth of field, separated subject, 85mm portrait lens',
  '135mm': 'telephoto compression, background bokeh, emotional intimacy, 135mm telephoto lens',
};

// ─── LIGHTING → KELVIN + PHYSICAL DESCRIPTION ─────────────────────────────────

const LIGHTING_LANGUAGE: Record<LightingStyle, { kelvin: number; description: string }> = {
  rembrandt:     { kelvin: 3200, description: 'Rembrandt lighting, key light at 45 degrees upper left, characteristic triangle highlight on shadow cheek, rich shadow fill, classical portraiture' },
  butterfly:     { kelvin: 5500, description: 'butterfly lighting, frontal overhead key, soft double shadow under nose, beauty lighting, smooth even skin illumination' },
  loop:          { kelvin: 4000, description: 'loop lighting, 30-45 degree key position, small nose shadow angled down toward cheek corner, commercial flattering light' },
  split:         { kelvin: 2800, description: 'split lighting, 90 degree side key, half face in shadow half in highlight, dramatic contrast, mystery and tension' },
  broad:         { kelvin: 5000, description: 'broad soft lighting, large diffuse source on lit side, gentle gradients, editorial quality, flattering wrap' },
  backlit:       { kelvin: 5600, description: 'backlit subject, strong rim light separating from background, slight lens flare, aspirational lifestyle quality' },
  window_natural:{ kelvin: 6000, description: 'natural window light from left, soft diffused daylight, authentic real-world quality, honest illumination, slight blue-white cast' },
  golden_hour:   { kelvin: 2700, description: 'golden hour sun position, warm directional sunlight at 15-20 degrees, long shadows, bronze-gold color cast, lifestyle aspirational' },
};

// ─── CONSI-STORY CONSISTENCY ANCHORS ─────────────────────────────────────────
// Based on ConsiStory (Tewel et al. 2024) — anchor-driven multi-image consistency
// Key principle: LOCK the character/style description verbatim across all scene prompts

export function buildConsistencyAnchor(
  characterDescription: string,
  brandVisualStyle: string,
): ConsistencyAnchor {
  return {
    characterDescription,
    styleSignature: `${brandVisualStyle}, consistent visual style, same color grading throughout`,
    lightingSignature: 'consistent motivated lighting direction, same color temperature across scenes',
    colorPalette: 'consistent color palette throughout video, unified visual language',
  };
}

/** Pre-built anchors for DriveCredit demographic profiles */
export const DRIVE_CREDIT_ANCHORS: Record<string, ConsistencyAnchor> = {
  hispanic_millennial: buildConsistencyAnchor(
    'Hispanic millennial woman, late 20s, dark hair, professional casual attire, warm skin tone, expressive eyes',
    'modern aspirational lifestyle, warm color grading, authentic documentary style',
  ),
  african_american_gen_z: buildConsistencyAnchor(
    'African American man, early 20s, contemporary streetwear, confident posture, natural styling',
    'bold high-energy aesthetic, desaturated cool tones with warm skin pop, authentic urban setting',
  ),
  white_suburban: buildConsistencyAnchor(
    'Caucasian woman, 30s, casual suburban professional, relatable everyday look, natural makeup',
    'clean bright lifestyle, neutral warm tones, accessible domestic environments',
  ),
  generic_diverse: buildConsistencyAnchor(
    'diverse young adult, early 30s, modern professional casual, relatable everyday appearance',
    'balanced lifestyle aesthetic, warm neutral grading, authentic real-world environments',
  ),
};

// ─── SCENE-TYPE CINEMATOGRAPHY PROFILES ──────────────────────────────────────

const SCENE_CINEMATOGRAPHY: Record<SceneType, CinematographySpec> = {
  hook: {
    focalLength: '24mm',
    depthOfField: 'medium',
    cameraAngle: 'eye_level',
    composition: 'centered_symmetry',
  },
  problem: {
    focalLength: '50mm',
    depthOfField: 'shallow',
    cameraAngle: 'slight_high',
    composition: 'rule_of_thirds',
  },
  solution: {
    focalLength: '85mm',
    depthOfField: 'shallow',
    cameraAngle: 'eye_level',
    composition: 'rule_of_thirds',
  },
  social_proof: {
    focalLength: '85mm',
    depthOfField: 'shallow',
    cameraAngle: 'slight_low',
    composition: 'centered_symmetry',
  },
  cta: {
    focalLength: '50mm',
    depthOfField: 'deep',
    cameraAngle: 'top_down',
    composition: 'centered_symmetry',
  },
};

const SCENE_LIGHTING: Record<SceneType, LightingStyle> = {
  hook:        'golden_hour',
  problem:     'window_natural',
  solution:    'broad',
  social_proof:'rembrandt',
  cta:         'butterfly',
};

// ─── EMOTION → VISUAL LANGUAGE MAP ───────────────────────────────────────────

const EMOTION_VISUAL: Record<MoodSpec['emotion'], string> = {
  relief:      'visible body language relaxation, soft exhale quality, weight-off-shoulders posture, subtle smile, shoulders dropped',
  aspiration:  'forward-leaning engagement, bright focused eyes, slight upward gaze, energy in posture',
  urgency:     'heightened alertness, direct eye contact with viewer, forward camera presence, compressed space',
  trust:       'open body language, natural relaxed smile, warm eye contact, grounded stable posture',
  triumph:     'upward energy, open chest posture, confident direct gaze, celebratory body language',
  curiosity:   'head slightly tilted, engaged forward lean, eyes bright and questioning, active listening posture',
};

// ─── MAIN BUILDER — DALL-E 3 DESCRIPTIVE CAPTION METHODOLOGY ─────────────────
// Key insight: long descriptive captions (DALL-E 3 2023) dramatically improve prompt following
// Formula: [environment] + [subject with locked anchor] + [action/expression] + [cinematography] + [lighting] + [quality stack] + [anti-artifact guards]

export function buildScenePrompt(scene: SceneSpec): BuildResult {
  const cinematography = scene.overrides?.cinematography ?? SCENE_CINEMATOGRAPHY[scene.sceneType];
  const lightingStyle = SCENE_LIGHTING[scene.sceneType];
  const lighting = LIGHTING_LANGUAGE[lightingStyle];
  const focalDesc = FOCAL_LANGUAGE[cinematography.focalLength];
  const paletteDesc = PALETTE_DESCRIPTORS[scene.mood.palette];
  const emotionDesc = EMOTION_VISUAL[scene.mood.emotion];

  // ── Layer 1: Environment (ground the scene in physical reality)
  const environmentLayer = scene.subject.environment
    ? `Set in ${scene.subject.environment}. `
    : '';

  // ── Layer 2: Subject with ConsiStory anchor (locked description verbatim)
  const anchorDesc = scene.consistencyAnchor
    ? `${scene.consistencyAnchor.characterDescription}. `
    : '';

  const subjectLayer =
    `${anchorDesc}${scene.subject.primary}` +
    (scene.subject.secondary ? `, ${scene.subject.secondary}` : '') +
    '. ';

  // ── Layer 3: Action and emotional expression
  const actionLayer = scene.subject.action
    ? `${scene.subject.action}. ${emotionDesc}. `
    : `${emotionDesc}. `;

  // ── Layer 4: Cinematographic specification (Oppenlaender — style modifier)
  const cinemaLayer =
    `${focalDesc}, ` +
    `${cinematography.depthOfField === 'shallow' ? 'f/1.8 shallow depth of field, subject sharp background bokeh' : cinematography.depthOfField === 'medium' ? 'f/5.6 moderate depth of field' : 'f/11 deep focus entire scene sharp'}, ` +
    `${cinematography.cameraAngle.replace(/_/g, ' ')} camera angle, ` +
    `${cinematography.composition.replace(/_/g, ' ')} composition. `;

  // ── Layer 5: Lighting physics (Oppenlaender — quality booster + image prompt)
  const lightingLayer =
    `${lighting.description}. ` +
    `${lighting.kelvin}K color temperature${lighting.kelvin < 3500 ? ', warm amber cast' : lighting.kelvin > 5500 ? ', cool daylight quality' : ', neutral balanced illumination'}. `;

  // ── Layer 6: Palette and brand atmosphere
  const atmosphereLayer = `${paletteDesc}. `;

  // ── Layer 7: Quality boosters (Pavlichenko & Ustalov 2023 genetic set — curated)
  const qualityLayer = [
    'cinematic quality',
    'high detail',
    'highly detailed',
    'intricate sharp details',
    'professional color grading',
    'photorealistic',
    'smooth',
    '4K',
  ].join(', ') + '. ';

  // ── Layer 8: Anti-artifact guards (De-Fake Sha et al. 2023)
  const artifactGuards = ANTI_ARTIFACT_MODIFIERS.slice(0, 4).join(', ') + '. ';

  // ── Layer 9: Consistency anchor signature (ConsiStory — locks style across scenes)
  const consistencyLayer = scene.consistencyAnchor
    ? `${scene.consistencyAnchor.styleSignature}, ${scene.consistencyAnchor.lightingSignature}. `
    : '';

  // ── Platform framing guidance
  const platformFrame =
    scene.brand.platform === 'tiktok' || scene.brand.platform === 'reels'
      ? 'vertical 9:16 mobile-first framing, subject positioned upper two-thirds. '
      : 'horizontal 16:9 widescreen framing. ';

  // ── Assemble: DALL-E 3 methodology — rich descriptive narrative
  const prompt = [
    environmentLayer,
    subjectLayer,
    actionLayer,
    cinemaLayer,
    lightingLayer,
    atmosphereLayer,
    platformFrame,
    qualityLayer,
    artifactGuards,
    consistencyLayer,
  ].join('').trim();

  // ── Negative prompt: universal + scene-specific
  const negativePrompt =
    UNIVERSAL_NEGATIVE +
    ', ' +
    SCENE_NEGATIVE[scene.sceneType] +
    (scene.overrides?.negativePrompt ? ', ' + scene.overrides.negativePrompt : '');

  // ── Model selection: Imagen 4 for hero shots, nanobanana for speed
  const model =
    scene.sceneType === 'hook' || scene.sceneType === 'social_proof'
      ? 'imagen-4.0-generate-001'
      : 'nano-banana-pro-preview';

  // ── Aspect ratio
  const aspectRatio: '9:16' | '16:9' | '1:1' =
    scene.brand.platform === 'tiktok' || scene.brand.platform === 'reels'
      ? '9:16'
      : scene.brand.platform === 'youtube_shorts'
      ? '9:16'
      : '16:9';

  return {
    prompt,
    negativePrompt,
    aspectRatio,
    model,
    metadata: {
      sceneId: scene.id,
      oppenlaenderCategories: ['subject', 'style', 'quality_boosters', 'image_prompts'],
      consistencyAnchorsUsed: scene.consistencyAnchor
        ? ['character_description', 'style_signature', 'lighting_signature']
        : [],
      lightingKelvin: lighting.kelvin,
      focalLength: cinematography.focalLength,
      aiArtifactGuards: ANTI_ARTIFACT_MODIFIERS.slice(0, 4),
    },
  };
}

// ─── INVARIANT / VARIANT BUILDERS (Multi-Frame Pipeline) ────────────────────

/**
 * Produces the locked invariant string for all frames in a scene.
 * This string is copied VERBATIM into every frame prompt within the scene.
 * Never paraphrase — vocabulary drift = character drift.
 *
 * Contains: character anchor, lighting, Kelvin, lens, environment, palette, style.
 * Does NOT contain: action, emotion, camera angle — those go in the variant.
 */
export function buildInvariantBlock(scene: SceneSpec): string {
  const lightingStyle = SCENE_LIGHTING[scene.sceneType];
  const lighting = LIGHTING_LANGUAGE[lightingStyle];
  const cinema = scene.overrides?.cinematography ?? SCENE_CINEMATOGRAPHY[scene.sceneType];
  const focal = FOCAL_LANGUAGE[cinema.focalLength];
  const palette = PALETTE_DESCRIPTORS[scene.mood.palette];
  const dof = cinema.depthOfField === 'shallow'
    ? 'f/1.8 shallow depth of field, subject sharp background bokeh'
    : cinema.depthOfField === 'medium'
    ? 'f/5.6 moderate depth of field'
    : 'f/11 deep focus entire scene sharp';

  const kelvinNote = lighting.kelvin < 3500
    ? ', warm amber cast'
    : lighting.kelvin > 5500
    ? ', cool daylight quality'
    : ', neutral balanced illumination';

  return [
    scene.consistencyAnchor?.characterDescription
      ? scene.consistencyAnchor.characterDescription + '.'
      : '',
    lighting.description + '.',
    `${lighting.kelvin}K color temperature${kelvinNote}.`,
    `${focal}, ${dof}.`,
    scene.subject.environment ? `Set in ${scene.subject.environment}.` : '',
    palette + '.',
    scene.consistencyAnchor
      ? `${scene.consistencyAnchor.styleSignature}, ${scene.consistencyAnchor.lightingSignature}.`
      : '',
  ].filter(Boolean).join(' ');
}

export interface FrameBeat {
  action: string;           // temporal action description — "shock hits, eyes widen"
  emotion: MoodSpec['emotion'];
  angle: CameraAngle;
  composition: CompositionRule;
}

/**
 * Produces the variant portion of a frame prompt.
 * This is the 20% that changes frame to frame — action beat, emotion, camera angle.
 * Assembled as: invariant block + frame variant + quality stack + anti-artifact guards.
 */
export function buildFrameVariant(
  beat: FrameBeat,
  frameIndex: number,
  totalFrames: number,
): string {
  const emotionDesc = EMOTION_VISUAL[beat.emotion];
  const angleDesc = beat.angle.replace(/_/g, ' ');
  const compDesc = beat.composition.replace(/_/g, ' ');

  return [
    `${beat.action}.`,
    `${emotionDesc}.`,
    `${angleDesc} camera angle, ${compDesc} composition.`,
  ].join(' ');
}

/**
 * Assemble a complete frame prompt from invariant block + variant beat + quality stack.
 * For frame 0 (anchor): returns full standalone prompt.
 * For subsequent frames: prepends "Same scene continued." for image-to-image chaining.
 */
export function buildFramePrompt(
  invariantBlock: string,
  beat: FrameBeat,
  frameIndex: number,
  totalFrames: number,
): string {
  const variant = buildFrameVariant(beat, frameIndex, totalFrames);
  const quality = QUALITY_STACK_SOCIAL.join(', ') + '.';
  const antiArtifact = ANTI_ARTIFACT_MODIFIERS.slice(0, 4).join(', ') + '.';
  const platformFrame = 'vertical 9:16 mobile-first framing, subject positioned upper two-thirds.';

  const prefix = frameIndex === 0
    ? ''
    : 'Same scene continued. Maintain exact character appearance, lighting angle, and environment from reference image. ';

  return `${prefix}${invariantBlock} ${variant} ${platformFrame} ${quality} ${antiArtifact}`.trim();
}

/**
 * Camera angle grammar per scene type.
 * Each entry is a sequence of angles — one per frame in the scene.
 * Following film editing logic: wide → medium → tight mirrors escalating intensity.
 */
export const SCENE_FRAME_GRAMMAR: Record<SceneType, CameraAngle[]> = {
  hook:         ['eye_level', 'over_shoulder', 'eye_level'],
  problem:      ['slight_high', 'eye_level', 'over_shoulder', 'slight_high', 'eye_level'],
  solution:     ['eye_level', 'over_shoulder', 'pov', 'eye_level', 'slight_low', 'eye_level', 'eye_level'],
  social_proof: ['eye_level', 'slight_low', 'eye_level', 'centered_symmetry' as CameraAngle],
  cta:          ['top_down', 'eye_level'],
};

// ─── BATCH BUILDER FOR FULL VIDEO ─────────────────────────────────────────────

export interface VideoSceneSpec {
  id: string;
  sceneType: SceneType;
  subject: SubjectSpec;
}

export function buildVideoPrompts(
  scenes: VideoSceneSpec[],
  brand: BrandSpec,
  mood: MoodSpec,
  anchor: ConsistencyAnchor,
): BuildResult[] {
  return scenes.map(scene =>
    buildScenePrompt({
      ...scene,
      brand,
      mood,
      consistencyAnchor: anchor,
    }),
  );
}

// ─── DRIVE-CREDIT SCENE LIBRARY ───────────────────────────────────────────────
// Pre-built scene specs for common DriveCredit video patterns

export function buildDriveCreditHookScene(demographic: keyof typeof DRIVE_CREDIT_ANCHORS): SceneSpec {
  const anchor = DRIVE_CREDIT_ANCHORS[demographic] ?? DRIVE_CREDIT_ANCHORS.generic_diverse;
  return {
    id: 'hook-bg',
    sceneType: 'hook',
    subject: {
      primary: 'close-up of smartphone screen showing rejected loan application, red text',
      secondary: anchor.characterDescription,
      environment: 'modern apartment living room, city view through window',
      action: 'staring at phone with worried expression, then looking up with determination',
    },
    mood: {
      emotion: 'urgency',
      energy: 'dynamic',
      palette: 'urgency_high',
    },
    brand: {
      product: 'DriveCredit auto loan',
      demographic,
      platform: 'tiktok',
    },
    consistencyAnchor: anchor,
  };
}

export function buildDriveCreditSolutionScene(demographic: keyof typeof DRIVE_CREDIT_ANCHORS): SceneSpec {
  const anchor = DRIVE_CREDIT_ANCHORS[demographic] ?? DRIVE_CREDIT_ANCHORS.generic_diverse;
  return {
    id: 'solution-reveal',
    sceneType: 'solution',
    subject: {
      primary: 'smartphone screen showing DriveCredit app with approved green checkmark, loan amount $15,000',
      secondary: anchor.characterDescription,
      environment: 'car dealership showroom, shining new vehicles in background',
      action: 'smiling broadly at phone, triumphant gesture, then looking at camera',
    },
    mood: {
      emotion: 'triumph',
      energy: 'bold',
      palette: 'triumph_green',
    },
    brand: {
      product: 'DriveCredit auto loan',
      demographic,
      platform: 'tiktok',
    },
    consistencyAnchor: anchor,
  };
}

export function buildDriveCreditCTAScene(): SceneSpec {
  return {
    id: 'cta-card',
    sceneType: 'cta',
    subject: {
      primary: 'clean modern smartphone displaying DriveCredit app on bright white surface',
      environment: 'minimalist white and silver studio environment',
    },
    mood: {
      emotion: 'trust',
      energy: 'calm',
      palette: 'trust_blue',
    },
    brand: {
      product: 'DriveCredit auto loan',
      demographic: 'general',
      platform: 'tiktok',
    },
  };
}
