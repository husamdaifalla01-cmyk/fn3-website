# Video Production Spec: denied-4-times-v1

**Venture:** DriveCredit
**Pillar:** Empathy → Education → CTA
**Platform:** TikTok / Reels / Shorts
**Duration:** ~32s (957 frames at 30fps)
**Dimensions:** 1080x1920 (9:16)
**Demographic anchor:** `generic_diverse`
**Affiliate:** Yendo ($112.50 CPL)
**Output dir:** `orchestrator/output/drive-credit/denied-4-times-v1/`

---

## Pipeline Architecture

```
nanobanana (anchor still per scene)
    │
    ▼
image-to-image chain (subsequent frames seeded from previous)
    │
    ▼
VEO 3.1 image-to-video (animate each still → 5-8s motion clip)
    │
    ▼
Remotion (<Video> clips + smash cuts + Ken Burns + zoom punch + captions)
    │
    ▼
output.mp4 (1080x1920, 30fps, h264)
```

---

## Emotional Arc

**Before:** Defeated, ashamed, feels locked out of the financial system
**After:** Quietly stunned that something this simple exists — relieved it's not a scam
**Bridge:** The moment "check your car" clicks — reframe from "I have bad credit" to "I have a car worth $8,000"

---

## Consistency Anchor (ConsiStory)

```
characterDescription: "diverse young adult, early 30s, modern casual clothing — plain hoodie
  and jeans, natural appearance with no styling, slightly tired expression, relatable everyday
  look, sitting in driver's seat of a modest sedan"

styleSignature: "authentic documentary style, warm neutral grading, slightly desaturated,
  real-world car interior lighting, not staged, not glossy, TikTok-native aesthetic"

lightingSignature: "natural car interior lighting, daylight through windshield from front,
  soft fill from side windows, warm dashboard ambient, consistent direction across all frames"

colorPalette: "warm neutral tones, desaturated background, natural skin warmth, cool blue
  phone screen glow as accent, no saturated colors"
```

---

## Invariant Block (copied verbatim into every frame prompt)

```
Diverse young adult, early 30s, modern casual clothing — plain hoodie and jeans,
natural appearance with no styling, slightly tired expression, relatable everyday look.
Natural car interior lighting, daylight through windshield from front, soft fill from
side windows, warm dashboard ambient. 4500K color temperature, warm neutral cast.
85mm portrait lens, f/1.8 shallow depth of field, subject sharp background bokeh.
Set in driver's seat of a modest 2019 Honda Civic sedan, apartment complex parking lot
visible through windows, afternoon daylight.
Warm neutral tones, desaturated background, natural skin warmth, cool blue phone screen
glow as accent.
Authentic documentary style, warm neutral grading, slightly desaturated, real-world car
interior lighting, not staged, not glossy, consistent lighting direction across all frames.
```

---

## Frame-by-Frame Production Spec

### HOOK — Scene 1 (90 frames / 3s)

**Caption (on frame 0, always visible):** `"I got denied 4 times."`

#### hook_f0 — The Defeat (30 frames / 1s)

**Variant:** Person slumped in driver's seat, phone face-down in lap, staring forward through windshield. Posture of someone who just read bad news and put the phone down. Not crying — just done. Eye_level camera angle, centered symmetry composition.

**Negative:** smiling, happy, energetic, stock photo pose, looking at camera, staged

**Model:** imagen-4.0-generate-001 (anchor frame — hero quality)
**Reference:** none (first frame)

**VEO motion prompt:**
```
Static camera. Subject sits motionless for 1 second. Subtle chest rise and fall
from breathing. Eyes blink once. Phone screen in lap dims to black. No head movement.
No camera movement. Natural ambient — slight shadow shift from passing cloud outside
windshield. 5 seconds, 9:16 vertical.
```
**Extract at:** t=0.5s (hold the stillness — the nothing IS the hook)

---

#### hook_f1 — The Screen (30 frames / 1s)

**Variant:** POV close-up of smartphone screen showing a generic loan denial notification. Red warning icon, text reading "Application Not Approved". Below it, a small "4th attempt" or notification count badge. The phone is held in one hand, thumb resting on screen. Over_shoulder camera angle framing the phone screen with blurred car interior behind. POV composition.

**Negative:** branded app, specific bank name, happy notification, green colors, text that says "approved"

**Model:** nano-banana-pro-preview
**Reference:** hook_f0 (chain from anchor)

**VEO motion prompt:**
```
POV shot of phone screen. Thumb taps dismissively on the denial notification.
Screen shows red "Not Approved" text. Thumb scrolls slightly revealing previous
denial notifications stacked below. Phone trembles slightly from hand tension.
No camera movement. 5 seconds, 9:16 vertical.
```
**Extract at:** t=1.0s (after thumb has interacted with screen)

---

#### hook_f2 — The Shift (30 frames / 1s)

**Variant:** Back to face — eyebrows furrowed, head tilted slightly to one side, eyes narrowed. The expression of someone processing a confusing piece of information. Not sad anymore — confused and curious. Looking slightly off-camera as if reading a text message or comment. Eye_level camera angle, rule of thirds composition with face on right third.

**Negative:** smiling, happy, looking at camera, sad crying, stock expression

**Model:** nano-banana-pro-preview
**Reference:** hook_f1

**VEO motion prompt:**
```
Subject's expression shifts from blank to curious. Eyebrows furrow. Head tilts
right 10 degrees. Eyes narrow as if reading something confusing. Slight mouth
movement as if mouthing "check my car?" to themselves. One slow blink. No camera
movement. 5 seconds, 9:16 vertical.
```
**Extract at:** t=2.0s (peak of the confusion expression)

---

### PROBLEM — Scene 2 (150 frames / 5s)

**Caption shift:** `"580 credit score. 4 denials in 2 months."`

#### problem_f0 — Processing (30 frames / 1s)

**Variant:** Hands gripping steering wheel loosely, knuckles visible. Looking down at steering wheel then slowly looking up and around the car interior as if seeing it for the first time. The moment of considering — "this thing has value?" Slight_high camera angle, rule of thirds composition.

**Model:** nano-banana-pro-preview
**Reference:** hook_f2

**VEO motion prompt:**
```
Subject's hands rest on steering wheel. Slowly looks down at hands on wheel,
then head lifts and turns to look at dashboard, then passenger seat, then back
through windshield. Processing the car as an asset for the first time. Slight
head shake of consideration. 5 seconds, 9:16 vertical.
```
**Extract at:** t=2.5s (mid-scan of car interior)

---

#### problem_f1 — The Car (30 frames / 1s)

**Variant:** View through driver's side window looking at the exterior of a modest 2019 Honda Civic in an apartment complex parking lot. Not glamorous — slightly dusty, normal wear. Afternoon light hitting the hood. The car looks real and lived-in. Eye_level camera angle through window, leading lines composition along the car body.

**Model:** nano-banana-pro-preview
**Reference:** problem_f0

**VEO motion prompt:**
```
Exterior view of Honda Civic in parking lot. Natural handheld camera drift —
very slight movement left to right as if the subject is looking at their own
car from inside. Afternoon sunlight reflects off hood. A leaf blows past in
background. 5 seconds, 9:16 vertical.
```
**Extract at:** t=1.5s

---

#### problem_f2 — The Search (30 frames / 1s)

**Variant:** POV close-up of phone screen — Google search bar with "use car as collateral credit card" being typed. Search results beginning to load below. Thumb hovering over keyboard. Over_shoulder angle, POV composition. Same car interior blurred behind phone.

**Model:** nano-banana-pro-preview
**Reference:** problem_f1

**VEO motion prompt:**
```
POV of phone screen. Thumb types the last few characters of "use car as
collateral credit card" into Google search. Results animate in below — first
result highlighted. Thumb hovers, then taps the first result. Loading indicator
appears briefly. 5 seconds, 9:16 vertical.
```
**Extract at:** t=2.0s (results visible, thumb about to tap)

---

#### problem_f3 — The Skeptic (30 frames / 1s)

**Variant:** Face — reading phone screen with skeptical but interested expression. One eyebrow slightly raised. Lips pressed together. The "wait this might actually be real but I've been burned before" look. Slight_high camera angle, rule of thirds.

**Model:** nano-banana-pro-preview
**Reference:** problem_f2

**VEO motion prompt:**
```
Subject reads phone screen. Eyes scan left to right, reading. Eyebrow raises
slightly. Slight lip bite. Expression shifts from skeptical to cautiously
interested. Eyes widen just slightly — not shock, just "huh." Scrolls phone
with thumb. 5 seconds, 9:16 vertical.
```
**Extract at:** t=2.5s (the eyebrow raise moment)

---

#### problem_f4 — The Page (30 frames / 1s)

**Variant:** POV of phone screen showing a clean landing page with "Use your car. Not your score." headline. Green and white color scheme. A "Check If My Car Qualifies" button visible. Real-looking app/website interface — not a mockup. Eye_level angle, centered composition on phone screen.

**Model:** nano-banana-pro-preview
**Reference:** problem_f3

**VEO motion prompt:**
```
POV of phone screen showing the DriveCredit landing page. Thumb scrolls slowly
down the page — past the headline, past a car illustration, to the green CTA
button. Pauses on the button. Thumb hovers. Phone held steady. 5 seconds,
9:16 vertical.
```
**Extract at:** t=3.0s (thumb hovering over CTA button)

---

### SOLUTION — Scene 3 (357 frames / ~12s)

**Caption shift:** `"Then someone told me to check my car."`
**Zoom punch fires on: solution_f2**

#### solution_f0 — Taking the Shot (51 frames / 1.7s)

**Variant:** Filling out an application on phone. Casual posture, slightly hunched forward. Thumbs tapping on screen keyboard. In the car — not staged, feels like a real moment someone recorded on impulse. Eye_level camera angle, rule of thirds.

**Model:** imagen-4.0-generate-001 (new scene anchor)
**Reference:** none (new scene — fresh anchor for solution arc)

**VEO motion prompt:**
```
Subject fills out a form on phone. Both thumbs tap rapidly on phone keyboard.
Occasionally pauses to read, then continues typing. Posture is hunched slightly
forward — focused. Bites lower lip once. Natural car interior sounds implied.
8 seconds, 9:16 vertical.
```
**Extract at:** t=1.0s

---

#### solution_f1 — The Wait (51 frames / 1.7s)

**Variant:** Phone held in both hands, screen showing a loading/processing indicator. Face visible above phone — jaw tight, eyes locked on screen, holding breath. The 3-second pause everyone dreads after hitting submit. Over_shoulder camera angle framing both face and phone.

**Model:** nano-banana-pro-preview
**Reference:** solution_f0

**VEO motion prompt:**
```
Subject holds phone with both hands, staring at loading screen. Complete stillness
except for breathing — chest rises and falls. Eyes unblinking, locked on phone.
Jaw clenches slightly. Swallows once. The tension of waiting for a financial
decision. 8 seconds, 9:16 vertical.
```
**Extract at:** t=3.0s (peak tension, right before it would resolve)

---

#### solution_f2 — THE REVEAL (51 frames / 1.7s) *** ZOOM PUNCH ***

**Variant:** Phone screen showing green checkmark and "Approved — $4,400 Credit Line" in bold. The phone has tilted slightly toward camera as hands relax in surprise. Green approval glow illuminating the face from below. POV angle shifted to see both screen and the beginning of facial reaction. Centered symmetry composition — the screen IS the center.

**Model:** nano-banana-pro-preview
**Reference:** solution_f1

**VEO motion prompt:**
```
Loading screen resolves to green checkmark. "Approved" text appears with
$4,400 credit line. Phone tilts toward camera as subject's grip loosens in
surprise. Green screen glow lights up the face from below. A sharp inhale —
the beginning of the reaction. 5 seconds, 9:16 vertical.
```
**Extract at:** t=1.5s (green screen fully visible, face just starting to react)

**Remotion:** `isPunchFrame: true` — spring config `{ damping: 8, stiffness: 500, mass: 0.2 }`, +0.05 scale over 9 frames

---

#### solution_f3 — The Reaction (51 frames / 1.7s)

**Variant:** Face — genuine shock transforming into disbelief smile. Mouth opens slightly, eyes widen, then the smile starts from the corners. One hand comes up to partially cover mouth — the universal gesture of "I can't believe this." Not acting — authentic overwhelm. Eye_level camera angle, centered.

**Model:** nano-banana-pro-preview
**Reference:** solution_f2

**VEO motion prompt:**
```
Subject's face transitions from shock to joy. Mouth drops open. Eyes widen.
Then a smile breaks — slow at first, then spreading. Hand rises to cover mouth.
Slight laugh — shoulders shake once. Eyes glisten. Head shakes slightly in
disbelief. 8 seconds, 9:16 vertical.
```
**Extract at:** t=3.0s (full smile, hand near mouth)

---

#### solution_f4 — The Reframe (51 frames / 1.7s)

**Variant:** Looking away from phone toward the car interior — steering wheel, dashboard, windshield with the parking lot beyond. Then back to phone. Then back to the car. The reframe happening in real time: "this car just did that." Slight_low camera angle (gives the car a moment of authority), rule of thirds.

**Model:** nano-banana-pro-preview
**Reference:** solution_f3

**VEO motion prompt:**
```
Subject looks up from phone toward steering wheel. Holds gaze on the car for
a beat. Looks back down at phone screen. Looks up again at the car — this time
with a slight disbelieving laugh. Pats the steering wheel once gently, almost
affectionately. 8 seconds, 9:16 vertical.
```
**Extract at:** t=4.0s (the pat on the steering wheel — that's the shareable moment)

---

#### solution_f5 — The Details (51 frames / 1.7s)

**Variant:** Phone held closer to face, scrolling through approval details. Screen shows "Real Visa Card", "No Deposit Required", "Keep Driving Your Car". Expression is focused reading with an undercurrent of relief. Eye_level angle, rule of thirds.

**Model:** nano-banana-pro-preview
**Reference:** solution_f4

**VEO motion prompt:**
```
Subject holds phone close, scrolling through details. Reads slowly. Nods once
at something on screen. Slight smile maintained from previous beat. Scrolls
further. Pauses on a detail — eyebrows raise slightly in pleasant surprise.
8 seconds, 9:16 vertical.
```
**Extract at:** t=2.5s (mid-scroll, nodding)

---

#### solution_f6 — The Release (51 frames / 1.7s)

**Variant:** Leaning back into the driver's seat. Full body posture change — shoulders drop, head tips back slightly against headrest, eyes close for a half-second then open looking upward. The tension that's been in their body since frame 0 is completely gone. Deep exhale visible. Eye_level camera, centered symmetry.

**Model:** nano-banana-pro-preview
**Reference:** solution_f5

**VEO motion prompt:**
```
Subject leans back into seat. Shoulders visibly drop. Head tilts back against
headrest. Eyes close for one second. Deep exhale — chest deflates. Eyes open
again looking upward. Small smile. The weight is gone. Completely still for a
beat. Then a small disbelieving headshake. 8 seconds, 9:16 vertical.
```
**Extract at:** t=3.5s (eyes reopening after the exhale — pure relief)

---

### CTA — Scene 4 (120 frames / 4s)

**Caption:** `"Link in bio. Check if your car qualifies."`

#### cta_f0 — Product Context (60 frames / 2s)

**Variant:** Clean shot of smartphone resting on the car dashboard, leaning against the windshield. Phone screen shows the DriveCredit landing page with green CTA button. Afternoon sunlight coming through windshield illuminates the phone naturally. Car keys visible next to phone. Not a studio — still in the Honda. Top_down camera angle slightly angled, negative space composition.

**Model:** imagen-4.0-generate-001 (fresh anchor for CTA)
**Reference:** none

**VEO motion prompt:**
```
Phone sits on dashboard showing DriveCredit page. Subtle light shift as
afternoon sun moves slightly. Phone screen glows. Car keys sit next to phone.
Very minimal movement — the calm after the storm. A finger enters frame and
taps the green CTA button. 5 seconds, 9:16 vertical.
```
**Extract at:** t=2.0s (sunlight hitting phone, before finger enters)

---

#### cta_f1 — The Close (60 frames / 2s)

**Variant:** Bold text card on warm neutral background (not pure white — matches car interior warmth). Large text: "Your car has money in it you're not using." Below in smaller text: "Soft check — won't affect your score." Brand color accent line between the two text blocks. Clean, minimal, readable in 1 second. Eye_level, centered symmetry.

**Model:** nano-banana-pro-preview
**Reference:** cta_f0

**VEO motion prompt:**
```
Text card with very subtle animation. The accent line between text blocks
extends from center outward over 1 second. Otherwise static. Clean and
confident. The visual equivalent of a quiet mic drop. 5 seconds, 9:16 vertical.
```
**Extract at:** t=2.0s (accent line fully extended)

---

## Remotion Assembly Config

```typescript
const config: RemotionAssetConfig = {
  assetMap: {
    hook_f0:      'output/denied-4-times-v1/hook_f0.mp4',
    hook_f1:      'output/denied-4-times-v1/hook_f1.mp4',
    hook_f2:      'output/denied-4-times-v1/hook_f2.mp4',
    problem_f0:   'output/denied-4-times-v1/problem_f0.mp4',
    problem_f1:   'output/denied-4-times-v1/problem_f1.mp4',
    problem_f2:   'output/denied-4-times-v1/problem_f2.mp4',
    problem_f3:   'output/denied-4-times-v1/problem_f3.mp4',
    problem_f4:   'output/denied-4-times-v1/problem_f4.mp4',
    solution_f0:  'output/denied-4-times-v1/solution_f0.mp4',
    solution_f1:  'output/denied-4-times-v1/solution_f1.mp4',
    solution_f2:  'output/denied-4-times-v1/solution_f2.mp4',
    solution_f3:  'output/denied-4-times-v1/solution_f3.mp4',
    solution_f4:  'output/denied-4-times-v1/solution_f4.mp4',
    solution_f5:  'output/denied-4-times-v1/solution_f5.mp4',
    solution_f6:  'output/denied-4-times-v1/solution_f6.mp4',
    cta_f0:       'output/denied-4-times-v1/cta_f0.mp4',
    cta_f1:       'output/denied-4-times-v1/cta_f1.mp4',
  },
  sceneOrder: [
    'hook_f0', 'hook_f1', 'hook_f2',
    'problem_f0', 'problem_f1', 'problem_f2', 'problem_f3', 'problem_f4',
    'solution_f0', 'solution_f1', 'solution_f2', 'solution_f3',
    'solution_f4', 'solution_f5', 'solution_f6',
    'cta_f0', 'cta_f1',
  ],
  frameDurations: {
    hook_f0: 30, hook_f1: 30, hook_f2: 30,
    problem_f0: 30, problem_f1: 30, problem_f2: 30, problem_f3: 30, problem_f4: 30,
    solution_f0: 51, solution_f1: 51, solution_f2: 51, solution_f3: 51,
    solution_f4: 51, solution_f5: 51, solution_f6: 51,
    cta_f0: 60, cta_f1: 60,
  },
  punchFrameId: 'solution_f2',
  totalDurationFrames: 957,
  compositionId: 'DeniedFourTimes',
  outputDir: 'orchestrator/output/drive-credit/denied-4-times-v1',
};
```

## Captions Map

```typescript
const captions: Record<string, string> = {
  hook_f0:     'I got denied 4 times.',
  hook_f1:     'I got denied 4 times.',
  hook_f2:     'I got denied 4 times.',
  problem_f0:  '580 credit score. 4 denials in 2 months.',
  problem_f1:  '580 credit score. 4 denials in 2 months.',
  problem_f2:  '580 credit score. 4 denials in 2 months.',
  problem_f3:  '580 credit score. 4 denials in 2 months.',
  problem_f4:  '580 credit score. 4 denials in 2 months.',
  solution_f0: 'Then someone told me to check my car.',
  solution_f1: 'Then someone told me to check my car.',
  solution_f2: 'Approved. $4,400.',
  solution_f3: 'Approved. $4,400.',
  solution_f4: 'This car just did that.',
  solution_f5: 'Real Visa. No deposit. Keep driving.',
  solution_f6: 'Real Visa. No deposit. Keep driving.',
  cta_f0:      'Link in bio. Check if your car qualifies.',
  cta_f1:      'Your car has money in it you\'re not using.',
};
```

## Transition Map

```typescript
const transitions: Record<string, 'cut' | 'slideleft' | 'fadew'> = {
  hook_f0:     'cut',         // first frame — no transition
  hook_f1:     'slideleft',
  hook_f2:     'slideleft',
  problem_f0:  'fadew',       // scene change — wipe
  problem_f1:  'slideleft',
  problem_f2:  'slideleft',
  problem_f3:  'slideleft',
  problem_f4:  'slideleft',
  solution_f0: 'fadew',       // scene change — wipe
  solution_f1: 'slideleft',
  solution_f2: 'cut',         // REVEAL — hard cut for maximum punch
  solution_f3: 'slideleft',
  solution_f4: 'slideleft',
  solution_f5: 'fadew',       // breathing room after emotional peak
  solution_f6: 'slideleft',
  cta_f0:      'fadew',       // scene change — wipe
  cta_f1:      'cut',         // clean final card
};
```

## Compliance Notes

- Caption never says "guaranteed" or "approved for everyone" — it says "check if your car qualifies"
- $4,400 is positioned as a story ("this person got $4,400") not a promise
- "Soft check" is accurate for Yendo's initial inquiry
- No specific APR or rate claims
- CTA drives to DriveCredit landing page (affiliate link in bio), not direct to Yendo
- UTM: `utm_source=tiktok&utm_medium=video&utm_campaign=denied-4-times-v1`

## Performance Hypothesis

| Metric | Prediction | Reasoning |
|--------|-----------|-----------|
| Hook retention (3s) | 65% | Defeat posture + "denied 4 times" caption = instant self-ID for ICP. No wasted frames. |
| Watch-through rate | 45% | 17 cuts in 32s = pattern interrupt every 1.88s. Emotional arc sustains through reveal. |
| CTA click rate | 4% | $4,400 specificity drives credibility. "Check your car" is low-friction CTA. |
| Key A/B variable | Hook caption: "I got denied 4 times" vs "580 credit score. Then I checked my car." |
| Expected failure mode | VEO clips may not chain character consistency across scenes — solution anchor is fresh generation |

## Affiliate URL

```
https://afflat3e3.com/trk/lnk/39C31C1E-2822-4350-B92A-2693C829ED6A/?o=27618&c=918277&a=769106&k=D083BC665DB0EC415E23BE307260F10E&l=36989&utm_source=tiktok&utm_medium=video&utm_campaign=denied-4-times-v1
```
