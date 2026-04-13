# Multi-Frame Production Protocol
## nanobanana → Remotion — Film-Quality Social Video from Still Images

---

## The Core Problem This Solves

Generating one image per scene and applying Ken Burns produces a **slideshow**.
Generating multiple independent images per scene and cutting between them produces
a **slideshow with more cuts**.

What makes it look like film: **image-to-image chaining** — each frame seeds the next.
The model generates frame B from frame A as a reference, not from scratch.
Same character physics. Same lighting angle. Same environment.
Only the action beat changes. Cut together in Remotion, it reads as motion.

---

## Architecture

```
SCENE
  │
  ├─ anchor_frame → generateImage() — full 9-layer prompt
  │                  model: imagen-4.0-generate-001 (hero scenes)
  │                  no reference image
  │
  ├─ frame_b → generateImage() — invariant block + beat 2
  │              model: nano-banana-pro-preview
  │              referenceImagePath: anchor_frame  ← seeds from anchor
  │
  ├─ frame_c → generateImage() — invariant block + beat 3
  │              model: nano-banana-pro-preview
  │              referenceImagePath: frame_b  ← seeds from previous
  │
  └─ ... (continue chain)
```

Each call to `generateImage()` passes the previous frame as `referenceImagePath`.
The Gemini model receives the reference image + the new prompt in the same
`contents.parts` array — image first, text second.

---

## The Invariant / Variant Split

### Invariant Block (80% of prompt — never changes within a scene)

Copy this string **verbatim** into every frame prompt for the scene.
Paraphrasing causes character drift. Identical wording = semantic spine = stability.

Components:
```
[Character anchor — ConsiStory verbatim description]
[Lighting setup name], [key direction], [fill type].
[Kelvin]K color temperature[, warm/cool cast].
[Focal length] lens, [depth of field spec].
Set in [environment — exact words, same every frame].
[Palette descriptor].
[Style signature from ConsistencyAnchor].
```

Example for hook scene, hispanic_millennial anchor:
```
Hispanic millennial woman, late 20s, dark hair, professional casual attire,
warm skin tone, expressive eyes.
Rembrandt lighting, key light 45 degrees upper left, soft fill.
3200K color temperature, warm amber cast.
85mm portrait lens, f/1.8 shallow depth of field, subject sharp background bokeh.
Set in modern apartment living room, city view through window, warm interior lighting.
Warm golden tones, soft cream whites, rich mid-tones, lifestyle warmth.
Modern aspirational lifestyle, warm color grading, authentic documentary style,
consistent lighting direction.
```

### Variant Block (20% — the only thing that changes frame to frame)

```
[Action beat] — temporal position in a continuous action.
[Emotion] — one named emotion from the emotion vocabulary.
[Camera angle] — from the scene grammar below.
[Composition rule] — from the composition vocabulary.
```

Example — hook scene, 3 beats:
```
frame_a: "frozen stare at phone, the moment before the news registers"
         urgency, eye_level, centered_symmetry

frame_b: "shock hits — eyes widen, jaw drops, phone tilts in loose grip"
         urgency, pov, rule_of_thirds

frame_c: "jaw sets, chin lifts, eyes move forward with resolve"
         determination, eye_level, centered_symmetry
```

**Action beats must describe temporal progression** — different moments in a
continuous action, not separate random poses. The viewer's brain fills in the motion.

---

## Camera Angle Grammar Per Scene

Follow these sequences. Angle shifts = deliberate punctuation.
Wide → Medium → Tight = escalating emotional intensity.
Never mix angles randomly within a scene.

```
hook:         eye_level → pov → eye_level
problem:      slight_high → eye_level → over_shoulder → slight_high → eye_level
solution:     eye_level → over_shoulder → pov → eye_level → slight_low → eye_level → eye_level
social_proof: eye_level → slight_low → eye_level → centered_symmetry
cta:          top_down → eye_level
```

**Angle vocabulary:**
- `eye_level` — neutral, democratic, connection
- `slight_low` — authority, aspiration, power
- `slight_high` — vulnerability, intimacy, accessible
- `over_shoulder` — immersive POV, relatable
- `top_down` — product flat lay, organized, clean
- `pov` — first-person, hyper-relatable

---

## Frame Counts and Remotion Durations

```
Scene          Frames   Duration each   Cut interval   Total
─────────────────────────────────────────────────────────────
hook           3        30 frames (1s)  1s             90f   (3s)
problem        5        30 frames (1s)  1s             150f  (5s)
solution       7        51 frames       1.7s           357f  (11.9s)
social_proof   4        60 frames (2s)  2s             240f  (8s)
cta            2        60 frames (2s)  2s             120f  (4s)
─────────────────────────────────────────────────────────────
TOTAL         21        —               ~1.88s avg     957f  (31.9s)
```

17 cuts in a 32-second video. Average cut interval 1.88s.
Every cut is a pattern interrupt. None exceed the 3–5s watch-time cliff.

**Zoom punch fires on:** `solution_f2` — the approval/reveal beat.
This is the single highest emotional moment. Only one punch per video.

---

## nanobanana.ts Changes

Add `referenceImagePath` to `GenerateImageRequest`:

```typescript
export interface GenerateImageRequest {
  prompt: string;
  outputPath: string;
  model?: ImageModel;
  negativePrompt?: string;
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
  referenceImagePath?: string;  // ← NEW — chains this frame from previous
}
```

In `generateImage()`, build the `parts` array conditionally:

```typescript
const parts: any[] = [];

if (req.referenceImagePath && fs.existsSync(req.referenceImagePath)) {
  parts.push({
    inlineData: {
      mimeType: 'image/png',
      data: fs.readFileSync(req.referenceImagePath).toString('base64'),
    },
  });
}

parts.push({ text: prompt });

// body:
contents: [{ parts }]
```

The model receives the reference image as visual context + the new prompt.
It generates from the anchor rather than from scratch.

Add `generateSceneFrames()` to orchestrate the chain:

```typescript
export interface FrameSpec {
  frameId: string;
  prompt: string;         // invariant block + variant beat assembled by caller
  negativePrompt?: string;
  durationFrames: number;
  model?: ImageModel;
}

export interface SceneFrameResult {
  frames: Array<{
    frameId: string;
    filePath: string;
    durationFrames: number;
  }>;
  errors: Record<string, string>;
}

export async function generateSceneFrames(
  sceneId: string,
  frameSpecs: FrameSpec[],
  outputDir: string,
): Promise<SceneFrameResult> {
  const frames: SceneFrameResult['frames'] = [];
  const errors: Record<string, string> = {};
  let previousFramePath: string | undefined;

  for (const spec of frameSpecs) {
    const outputPath = path.join(outputDir, `${spec.frameId}.png`);

    const result = await generateImage({
      prompt: spec.prompt,
      outputPath,
      model: spec.model ?? (previousFramePath ? 'nano-banana-pro-preview' : 'imagen-4.0-generate-001'),
      negativePrompt: spec.negativePrompt,
      aspectRatio: '9:16',
      referenceImagePath: previousFramePath,  // undefined for anchor, set for all others
    });

    if (result.success && result.filePath) {
      frames.push({
        frameId: spec.frameId,
        filePath: result.filePath,
        durationFrames: spec.durationFrames,
      });
      previousFramePath = result.filePath;
    } else {
      errors[spec.frameId] = result.error ?? 'Unknown error';
      // Do not break chain — skip to next frame, log error
    }

    await sleep(6500); // rate limit buffer
  }

  return { frames, errors };
}
```

---

## video-pipeline.ts Changes

`RemotionAssetConfig` gains two new fields:

```typescript
export interface RemotionAssetConfig {
  assetMap: Record<string, string>;       // frameId → absolute file path
  sceneOrder: string[];                   // ordered flat list of all frameIds
  frameDurations: Record<string, number>; // frameId → duration in frames  ← NEW
  punchFrameId?: string;                  // which frameId gets zoom punch   ← NEW
  totalDurationFrames: number;
  compositionId: string;
  outputDir: string;
}
```

`runVideoPipeline()` replaces the single `generateImage()` per scene with
`generateSceneFrames()` per scene, then flattens all frames into the asset map:

```typescript
// Replace per-scene single generation with per-scene frame chain
for (const scene of config.scenes) {
  const frameSpecs = buildSceneFrameSpecs(scene, config.brand, config.mood, config.anchor);
  const result = await generateSceneFrames(scene.id, frameSpecs, config.outputDir);

  for (const frame of result.frames) {
    assets[frame.frameId] = {
      sceneId: scene.id,
      filePath: frame.filePath,
      // ... other SceneAsset fields
    };
  }
}
```

---

## visual-prompts.ts Changes

Add `buildInvariantBlock()` and `buildFrameVariant()`:

```typescript
/**
 * Produces the locked invariant string for all frames in a scene.
 * This string must be copied VERBATIM into every frame prompt.
 * Never paraphrase — vocabulary drift = character drift.
 */
export function buildInvariantBlock(scene: SceneSpec): string {
  const lighting = LIGHTING_LANGUAGE[SCENE_LIGHTING[scene.sceneType]];
  const cinema   = SCENE_CINEMATOGRAPHY[scene.sceneType];
  const focal    = FOCAL_LANGUAGE[cinema.focalLength];
  const palette  = PALETTE_DESCRIPTORS[scene.mood.palette];
  const dof      = cinema.depthOfField === 'shallow'
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
    scene.consistencyAnchor?.characterDescription + '.',
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
  action:      string;
  emotion:     MoodSpec['emotion'];
  angle:       CameraAngle;
  composition: CompositionRule;
}

/**
 * Produces the variant portion of the frame prompt.
 * Assembled as: [invariant block] + [frame variant] + [quality stack] + [negative]
 */
export function buildFrameVariant(beat: FrameBeat, frameIndex: number, totalFrames: number): string {
  const emotionDesc = EMOTION_VISUAL[beat.emotion];
  const angleDesc   = beat.angle.replace(/_/g, ' ');
  const compDesc    = beat.composition.replace(/_/g, ' ');
  const position    = `Frame ${frameIndex + 1} of ${totalFrames} in scene sequence.`;

  return `${position} ${beat.action}. ${emotionDesc}. ${angleDesc} camera angle. ${compDesc} composition.`;
}
```

---

## Remotion Composition — SceneCard Rules

### What is mandatory on every SceneCard:

**Ken Burns:** `scale = 1 + localFrame * 0.0003`
Not `interpolate(localFrame, [0, duration], [1.0, 1.05])`.
Accumulates per frame. Subliminal. Prevents static feel without obvious zoom.

**No opacity at cut boundaries:**
The `<Sequence>` boundary IS the smash cut. `SceneCard` never interpolates opacity to 0.
Fades are the slowest thing in social video. They are forbidden.

**Zoom punch on reveal only:**
```typescript
const punchProgress = isPunchFrame
  ? spring({ frame: localFrame, fps, config: { damping: 8, stiffness: 500, mass: 0.2 }, durationInFrames: 9 })
  : 0;
const punch = interpolate(punchProgress, [0, 1], [0, 0.05]);
// scale = kenBurns + punch
```
6–9 frames. +0.05 max. Ease-in snap. One punch per video, on the reveal.

**Text on frame 0:**
Captions are static props rendered unconditionally. No entrance animation. No opacity ramp.
The hook text is already there when the first frame appears.

**SlideLeft transition:**
```typescript
const slideX = transition === 'slideleft'
  ? interpolate(localFrame, [0, 6], [-1080, 0], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    })
  : 0;
```
6 frames. Cubic ease-out. Applied as `translateX` not opacity.

**FadeW transition (every 5th cut):**
```typescript
const wipeProgress = transition === 'fadew'
  ? interpolate(localFrame, [0, 4], [0, 1], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    })
  : 1;
// applied as: clipPath: `inset(0 ${(1 - wipeProgress) * 100}% 0 0)`
```
4 frames. Left-to-right horizontal wipe. Not a brightness fade — a spatial wipe.

---

## Director Critique Additions for Multi-Frame

When critiquing a non-anchor frame (frame_b, frame_c etc.), pass the anchor frame
as an additional visual reference in the critique prompt. The director checks:

1. Is this the same character as the anchor? (face, clothes, hair)
2. Is the lighting angle consistent? (shadow direction must match)
3. Does this feel like a later moment in the same continuous action?
4. Would these two frames cut together feel like film or like two separate images?

Add `anchorImagePath` to `CritiqueRequest` and include it as an additional
`inlineData` part in the Gemini Vision call.

---

## Frame-Level QA Gates

Before passing the `RemotionAssetConfig` back to the agent:

| Check | Threshold | Action on fail |
|---|---|---|
| Director score per frame | ≥ 75 | Regen with improved prompt (max 3 attempts) |
| Consistency score (frame vs anchor) | ≥ 70 | Regen frame with stronger invariant enforcement |
| Any frame with critical AI artifact | 0 tolerance | Mandatory regen |
| Frames in scene with < 70 avg | Flag to human | Do not ship |

---

## Common Failure Modes

**Failure: Character changes clothes between frames**
Cause: Invariant block was paraphrased between frames (e.g., "jeans and blazer" → "casual outfit")
Fix: Copy invariant block as a literal string constant. Never reconstruct it.

**Failure: Lighting direction flips between frames**
Cause: Reference image not passed, or Kelvin changed between frames
Fix: Verify `referenceImagePath` is set on all non-anchor frames. Kelvin locked in invariant.

**Failure: Frames cut together look like separate images**
Cause: Action beats describe poses, not temporal progression
Fix: Rewrite beats as moments in a continuous action ("three frames of someone picking up a cup":
     "hand reaches toward cup" → "fingers close around handle" → "lifts cup to lip level")

**Failure: Scene looks like a slideshow even with smash cuts**
Cause: Ken Burns rate too low, or all frames shot from the same angle/distance
Fix: Ensure camera grammar is followed (wide → medium → tight). Each angle shift adds spatial energy.

**Failure: Zoom punch looks too aggressive**
Cause: Punch config damping too low or stiffness too high
Fix: `{ damping: 8, stiffness: 500, mass: 0.2 }` is the calibrated config. Do not exceed +0.05.
