# UI Psychology Reference

Ogilvy principles, attention mapping, trust signals, and conversion psychology applied to interface design.

---

## The Ogilvy Framework for UI

David Ogilvy's advertising laws map directly to screens. Before touching a pixel, answer:

1. **What is the ONE thing I want the user to feel?** (Not think. Feel.)
2. **What action do I want them to take?** (One action per screen. One.)
3. **What fear or desire drives them here?** (Build the UI around that emotional state.)
4. **What would make them trust this immediately?** (Trust is felt in 50ms. Design for that moment.)

**Ogilvy UI Rule:** If you can't explain what this page is for in one sentence without the headline, the layout has failed. The visual hierarchy must tell the story before a word is read.

---

## Attention Mapping

The eye moves in predictable patterns. Use them.

### F-Pattern (Text-heavy pages)
Users scan: horizontal top → horizontal middle → vertical left edge.

- **Implication:** Load weight into top-left. Diminishing attention rightward.
- **Don't:** Place CTAs in the right column on text pages.
- **Do:** Break the F-pattern deliberately with a bold visual to reset scanning.

### Z-Pattern (Simple / hero pages)
Eyes travel: top-left → top-right → diagonal to bottom-left → bottom-right.

- **Implication:** CTA belongs at bottom-right. Logo top-left. Key message diagonal midpoint.
- **Classic pattern:** Logo → Nav → Hero visual (diagonal) → CTA.

### Gutenberg Diagram
Primary optical area: top-left. Strong fallow: top-right. Weak fallow: bottom-left. Terminal area: bottom-right.

- **Implication:** Terminal area is where eyes rest. That's where the CTA lives.
- **Use:** Landing pages, modals, forms.

### Breaking Patterns (The Interrupt)
Predictability = invisibility. A single element that violates the pattern creates a fixation point.

- Rotated text in a grid of horizontal text
- One oversized element in a field of uniform scale
- A color break in a monochromatic layout
- Asymmetric placement when everything else is centered

Use one interrupt per composition. More than one = chaos, not design.

---

## Visual Hierarchy — The 5 Weights

Every element must sit at exactly one weight level. No two elements compete for the same weight.

| Weight | Purpose | Implementation |
|--------|---------|----------------|
| 1 — Dominant | The single most important thing | Largest, highest contrast, most isolated |
| 2 — Sub-dominant | Supports dominant, provides context | Second largest or second highest contrast |
| 3 — Accent | Guides action, emotional punctuation | Color, not size — used sparingly |
| 4 — Body | The content payload | Comfortable reading size, moderate contrast |
| 5 — Recessive | Supporting detail, metadata | Lowest contrast, smallest — but still readable |

**The test:** Squint until the layout blurs. Can you still identify the intended reading order? If not, weights are too similar.

---

## Trust Signals — The First 50ms

Trust is decided before conscious thought. These signals are processed pre-cognitively:

### Immediate Trust Builders
- **Spatial generosity** — Compressed layouts feel low-budget. White space signals confidence.
- **Typography quality** — Mismatched type scales or poor leading = amateurish subconscious signal.
- **Color restraint** — 3+ accent colors = visual panic. 1-2 accents = deliberate, trustworthy.
- **Consistent density** — If some sections are dense and others are sparse, it reads as unfinished.
- **Alignment precision** — Random alignment gaps register as carelessness even if users can't articulate why.

### Social Proof Hierarchy (strongest → weakest)
1. Named person + photo + specific result ("I grew revenue by 40%")
2. Named company logo (no testimonial needed — the logo is enough)
3. Named person, no photo
4. Anonymous testimonial with specific numbers
5. Generic testimonial ("Great product!") — nearly worthless

### Authority Signals
- Specificity over vague claims: "Used by 12,847 teams" beats "Used by thousands"
- Named publication logos beat "as featured in" with no logos
- Exact metrics beat approximations — "94% customer retention" beats "high retention"

---

## Conversion Psychology

### Loss Aversion (Kahneman)
Users are 2.5× more motivated by avoiding loss than gaining equivalent value.

- **Weak:** "Start your free trial"
- **Strong:** "Don't lose access — start before your trial expires"
- **Application:** Frame CTAs around what the user risks missing, not what they gain.

### The Paradox of Choice
More options = fewer conversions. Every additional choice reduces action probability.

- **Rule:** One primary CTA per screen. Secondary CTAs must be visually subordinate (weight 4, not weight 1).
- **Navigation:** 5-7 items max. More items = analysis paralysis.
- **Forms:** Remove every optional field. Each field reduces completion by ~5%.

### Progress & Investment (Zeigarnik Effect)
Users are compelled to complete things they've started. An incomplete state creates psychological tension.

- Show progress bars even for single-step flows (start at 20%, not 0%)
- Pre-fill what you know
- Name the step ("Step 2 of 3: Your preferences") — named steps feel shorter than numbered steps

### Anchoring
The first number seen becomes the reference point for all subsequent numbers.

- Show the expensive plan first (even if it's not the recommended plan)
- Show full price before discounted price — the anchor is what makes the deal feel real
- In feature lists: lead with the most impressive metric

### Reciprocity (Cialdini)
Give value before asking for anything. Users who receive feel obligated to return.

- Free tool → email capture (not vice versa)
- Educational content before product push
- Generous free tier rather than stingy trial

---

## Emotional Architecture

### The Flow State
Design that creates flow has:
- **Clear goal** visible at all times (user knows what they're working toward)
- **Immediate feedback** (every action has a visible result within 100ms)
- **Challenge matched to skill** (not too hard, not trivially easy)
- **No interruptions** — modals, alerts, and notifications are flow-killers; use them surgically

### Emotional Valence Per Color
Not universal — context-dependent — but strong defaults:

| Color | Primary feeling | Risk |
|-------|----------------|------|
| Deep blue | Trust, stability, authority | Cold, corporate |
| Warm yellow/amber | Energy, optimism, urgency | Anxiety if overused |
| Green | Growth, safety, permission | Generic |
| Red | Urgency, danger, passion | Alarm if misused |
| Black | Premium, power, sophistication | Heavy, inaccessible |
| White/cream | Clean, honest, minimal | Sterile, forgettable |
| Purple | Creative, mysterious, luxury | Dated in tech contexts |

**Rule:** Color carries feeling. Choose one dominant emotional tone and build a palette that reinforces it. Never use a color that sends a different emotional message than the intended tone.

### The Emotional Arc of a Page
Every scroll is a journey. Map it:

1. **Hook** — Immediately address the user's pain or desire (above fold)
2. **Credibility** — Prove you can deliver (below fold, first section)
3. **Proof** — Show it working for people like them (middle)
4. **Objection handling** — Silently address the top 3 reasons they'd leave (FAQ, feature callouts)
5. **Action** — Ask for the one thing, with reduced friction (bottom, repeated if long page)

---

## Friction Audit

Every element on a page either reduces or increases the cognitive load required to take the desired action. Run this audit before shipping:

**Friction sources:**
- Unclear primary action (user doesn't know what to do next)
- Too many choices at the decision moment
- Form fields that require effort (address lookup vs freetext)
- Unclear value proposition (user isn't sure why they should act)
- Trust gaps at the conversion point (no social proof where user commits)
- Visual noise competing with the CTA
- Long distance between decision and action (scroll required to find the button)

**Reduce friction:**
- One CTA per screen, visually dominant
- Pre-fill, autofocus, autocomplete
- Show benefit in the button label ("Get my free report" not "Submit")
- Place trust signals adjacent to the conversion element
- Sticky CTA on long-form pages

---

## Negative Space as Psychology

Space is not emptiness. Space communicates:

- **Luxury:** Extreme white space signals "we don't need to fill every pixel to justify our value"
- **Focus:** A single element with generous space around it commands attention via isolation
- **Breathing:** Dense layouts create anxiety. Pages that breathe create calm confidence
- **Premium vs. budget:** Budget brands pack space to show "value." Premium brands empty space to show confidence.

**The rule:** If a section feels crowded, the problem is almost never "we need more space" — it's usually "we have too many elements." Remove before you expand.
