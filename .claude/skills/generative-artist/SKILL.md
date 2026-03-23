---
name: generative-artist
description: Transform Claude into a digital fine artist operating at the intersection of Bob Ross (light physics, material rendering), David Ogilvy (user psychology, persuasion through visual hierarchy), and Cursor-level craft (real React architecture, spring physics, dense information design). Use when creating UI/UX at any fidelity — from photorealistic SVG textures to full React page systems. Triggers on "realistic", "beautiful UI", "premium design", "3D effect", "texture", "material", "glassmorphism", "breathing room", "mobile", "typography", "animation", "motion", "component", "page layout", "dark UI", or when output feels flat, compressed, generic, or lifeless. Covers SVG filter pipeline, CSS systems, Framer Motion, React component architecture, spatial rhythm, typography hierarchy, and mobile-first responsive design.
---

# Generative Artist Skill

**The Bob Ross of Code** — Understanding WHY light behaves, then translating that into generative primitives.

## Core Philosophy

Most UI looks flat because developers skip the art. Most art can't be coded because artists skip the math. This skill bridges both: **see like an artist, output like an engineer.**

Every realistic surface follows the same 10-point light scale. Master this once, apply it to any material.

## The Light Scale (Memorize This)

```
1. HIGHLIGHT ——— Direct light source reflection (brightest)
2. CENTER LIGHT — Area facing light directly
3-5. HALFTONES — Gradual transition (light → mid → dark)
6. TERMINATOR —— Where light ends (critical edge)
7. CORE SHADOW — Darkest on the form itself
8. REFLECTED —— Light bouncing from environment
9. CAST SHADOW — Shadow projected onto other surfaces
10. OCCLUSION —— Crevices where no light reaches (darkest)
```

**The Insight:** You're not drawing shadows. You're drawing where light ISN'T.

## SVG Filter Translation

| Art Concept | SVG Primitive | Key Parameters |
|-------------|---------------|----------------|
| Surface texture | `feTurbulence` | baseFrequency, numOctaves |
| 3D form from texture | `feDiffuseLighting` | surfaceScale, elevation |
| Sparkle/shine | `feSpecularLighting` | specularExponent (higher = tighter) |
| Warp/distort | `feDisplacementMap` | scale, xChannelSelector |
| Color grading | `feColorMatrix` | matrix values |
| Contrast/levels | `feComponentTransfer` | slope, intercept, gamma |
| Layer blending | `feBlend` | mode (multiply, screen, overlay) |
| Heightmap creation | `feColorMatrix type="luminanceToAlpha"` | — |

## The Universal Pipeline

```
TEXTURE → HEIGHTMAP → LIGHTING → COLOR → COMPOSITE
   ↓          ↓           ↓         ↓          ↓
feTurbulence → grayscale → feDiffuse + feSpecular → feColorMatrix → feBlend
```

**Critical Rule:** The SAME heightmap must feed BOTH diffuse and specular lighting for coherent 3D.

## Quick Start: Any Material

1. **Analyze the surface** — Is it rough/smooth? Metallic/matte? What's the grain scale?
2. **Create heightmap** — feTurbulence with appropriate frequency
3. **Apply diffuse lighting** — surfaceScale controls depth perception
4. **Add specular** — High exponent = metal/wet, Low = matte/fabric
5. **Color grade** — Warm highlights, cool shadows (or inverse)
6. **Composite** — Multiply for shadows, Screen for highlights

## Reference Files

- **Art Fundamentals**: `references/art-fundamentals.md` — Deep dive on light physics, color theory, material properties
- **Material Recipes**: `references/material-recipes.md` — Ready-to-use code for sand, water, metal, glass, fabric, stone
- **Cognitive Loop**: `references/cognitive-loop.md` — When stuck, draw the light physics first

## When Output Looks Flat

Check these in order:
1. Is surfaceScale too low? (Try 15-30 for pronounced 3D)
2. Is light elevation too high? (Lower = more dramatic shadows)
3. Missing specular layer? (Even matte surfaces have subtle shine)
4. Heightmap not grayscale? (Lighting needs luminance input)
5. Same turbulence feeding both displacement AND lighting?

## The Competitive Edge

Generic UI uses: `box-shadow`, `linear-gradient`, `border-radius`

This skill produces: Physically-based lighting, material-accurate textures, depth that feels touchable

The difference is understanding that a button isn't a rectangle with effects — it's a **surface in 3D space** responding to light.

---

## The Three Masters Framework

This skill operates at the intersection of three mastery domains. Before writing any code, identify which layer(s) the task requires:

**Bob Ross — Materials & Light** (already built above)
Physics-first. Establish atmosphere before detail. Every surface responds to light correctly. Depth before decoration.

**David Ogilvy — Psychology & Persuasion**
Every visual decision encodes a psychological intent. What should the user feel? What should they do next? Where does the eye land first? Build trust before asking for action. See: `references/psychology.md`

**Cursor-Level Craft — Architecture & Motion**
Real React. Spring physics. Dense information with perfect hierarchy. Keyboard-first. State-driven everything. Nothing static. See: `references/motion.md` and `references/react-architecture.md`

---

## The Ogilvy Layer — Psychology Before Pixels

Before writing a single line, answer these four questions. The answers become visual decisions, not afterthoughts:

**1. What does the user FEEL here?**
Safety, excitement, trust, urgency, calm, delight, curiosity?
→ Color temperature, spacing, motion speed, and typography weight encode emotion.

**2. What is the ONE action this screen exists to drive?**
Every element either supports that action or is removed. No decorative clutter.
→ The CTA is the brightest, most visually dominant element. Everything else is hierarchy below it.

**3. Where does the eye land first, second, third?**
Map the scan path before laying out. F-pattern for reading. Z-pattern for landing pages. Spot-pattern for dashboards.
→ Size, contrast, whitespace, and motion control the eye path. Plan it, don't hope for it.

**4. What builds trust at this exact moment?**
Social proof? Precision/density (expert signal)? Simplicity (low effort)? Familiar patterns (safety)?
→ Trust is built visually before the user reads a word.

```
The Ogilvy UI Rule:
A confused user doesn't convert. A crowded layout creates confusion.
Clarity is not simplicity — it's intentional visual priority.
```

---

## Breathing & Space — The Zoom-Out Principle

**The single most violated rule in AI-generated UI:** Everything is compressed.

Generous space is not empty space. It is structure. It signals confidence.

### The Core Rules

**1. Never compress — always extend**
When in doubt, double the padding. Then consider doubling it again.
Default padding unit: `1.5rem` minimum for inner content. `3rem–6rem` for section gaps. `8rem–16rem` for major section breaks on desktop.

**2. The Zoom-Out Test**
At 50% browser zoom, the layout should still feel balanced — not dense. If it looks cramped at 50%, it is suffocating at 100%.

**3. Content Width vs Container Width**
Readable prose: max 65–75 characters per line (`max-w-prose` = 65ch).
Feature sections: `max-w-5xl` to `max-w-7xl` with auto margins.
Full-bleed backgrounds: 100vw. Content inside: always constrained.
Never stretch text to full width. Ever.

**4. Vertical Rhythm is a Grid**
Use a consistent base unit (8px or 4px grid). All spacing is a multiple of it.
`gap-4` (16px), `gap-8` (32px), `gap-16` (64px), `gap-24` (96px), `gap-32` (128px).
Sections breathe at `py-24` to `py-32` on desktop. `py-16` on mobile.

**5. Let Elements Float**
Elements should not touch each other. Each element needs room to exist independently.
Cards: `p-6` to `p-8` minimum. Modals: `p-8` to `p-10`. Forms: `space-y-6` between fields.

**6. The Sky Principle (Bob Ross)**
Bob Ross always painted sky first — the largest, most open element. In UI, establish the open space first, then place elements into it. Don't fill a container and then try to add space around content.

```css
/* Wrong — cramped, AI-default */
.section { padding: 16px; gap: 8px; }

/* Right — breathes */
.section { padding: clamp(3rem, 8vw, 8rem); gap: clamp(2rem, 4vw, 4rem); }
```

### Responsive Space Scaling

Use `clamp()` for all spacing that should breathe differently across breakpoints:

```css
/* Space that scales naturally without breakpoints */
padding: clamp(1.5rem, 5vw, 6rem);
gap: clamp(1rem, 3vw, 3rem);
font-size: clamp(1rem, 2.5vw, 1.25rem);
```

---

## Typography as Weapon

Typography is not decoration. It is the primary carrier of meaning, hierarchy, and emotion.

### The Hierarchy Rules

**One typeface family. Maximum two.**
A display font (headlines, hero) + a body font (reading, UI). Never three.

**Size creates hierarchy before color does.**
The eye reads size before it reads color. Use extreme size contrast: `text-xs` body notes alongside `text-5xl` or `text-6xl` headlines. Avoid a sea of same-size text.

**Weight carries authority.**
`font-black` (900) for statements. `font-semibold` (600) for navigation and labels. `font-normal` (400) for body. `font-light` (300) for captions and secondary. Never use bold for everything — it means nothing is bold.

**Line height for reading vs display:**
- Headlines: `leading-none` to `leading-tight` (0.95–1.15)
- Body text: `leading-relaxed` to `leading-loose` (1.6–1.8)
- UI labels: `leading-normal` (1.4–1.5)

**Letter spacing by purpose:**
- Large display text: `tracking-tight` (−0.025em) — tightens big text so it reads as a unit
- Body text: `tracking-normal`
- ALL CAPS labels: `tracking-widest` — always loosen caps, never tighten them
- Small UI labels: `tracking-wide` to `tracking-wider`

### The Readability Test

Every text block passes when:
- Line length: 45–75 characters (use `max-w-prose`)
- Contrast ratio: 4.5:1 minimum (WCAG AA), 7:1 preferred (WCAG AAA)
- Font size at body: `16px` minimum on desktop, `16px` minimum on mobile (never 14px for body)
- Leading on body: never below 1.5

```tsx
// Production-ready typography system
const typography = {
  display: "font-black tracking-tight leading-none",       // Hero headlines
  heading: "font-bold tracking-tight leading-tight",        // Section headers
  subheading: "font-semibold tracking-normal leading-snug", // Sub-headers
  body: "font-normal tracking-normal leading-relaxed",      // Reading text
  caption: "font-light tracking-wide leading-normal",       // Small secondary
  label: "font-medium tracking-wider uppercase text-xs",    // ALL CAPS labels
}
```

---

## Motion Philosophy — Spring Physics Over Tweens

Animation is communication. It is not decoration. Every animation answers: **why is this moving, and what does the movement tell the user?**

### The Physics Rules

**Things with mass have inertia.** Use spring animations, not linear or ease-in-out.
A modal appearing should overshoot slightly and settle — like a physical object.
A dismissed card should accelerate away — like it's being removed with force.

**Fast in, slow out for entrances. Slow in, fast out for exits.**
Elements entering: `ease-out` — they decelerate as they arrive (natural landing).
Elements leaving: `ease-in` — they accelerate as they go (natural departure).
Never `ease-in-out` on UI feedback — it reads as indecisive.

**Duration by element size:**
- Micro-interactions (button hover, checkbox): 100–150ms
- Component transitions (dropdown, tooltip): 150–250ms
- Page-level transitions (modal, drawer, route): 250–400ms
- Never over 500ms — users are waiting

**Related elements choreograph together.**
Don't animate elements independently. Stagger related items by 50–80ms.
The parent moves first, children follow.

### Framer Motion Patterns

```tsx
// Spring config for physical feel — use over ease-in-out always
const spring = { type: "spring", stiffness: 400, damping: 30 }
const gentleSpring = { type: "spring", stiffness: 200, damping: 25 }
const bouncySpring = { type: "spring", stiffness: 600, damping: 20 }

// Entrance with spring
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={spring}
/>

// Staggered children
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map((item, i) => (
    <motion.div key={i} variants={itemVariants} />
  ))}
</motion.div>

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: spring }
}

// Exit animations require AnimatePresence
<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={spring}
    />
  )}
</AnimatePresence>
```

### What to Always Animate
- Hover states (scale, brightness, shadow)
- Focus states (ring appearance)
- Element entrance (staggered from parent)
- State changes (loading → loaded, empty → filled)
- Drawer / modal / sheet appearance
- List item add/remove

### What to Never Animate
- Text content changing (reflow is jarring)
- Scroll position (unless scroll-driven and optional)
- Anything that blocks interaction while animating

---

## React Architecture — Real Components

Not tutorial components. Production components.

### The Rules

**Compound components for anything with internal state coordination.**
```tsx
// Wrong — monolithic
<Select options={[...]} onChange={...} value={...} />

// Right — composable
<Select>
  <Select.Trigger />
  <Select.Content>
    <Select.Item value="a">Option A</Select.Item>
    <Select.Item value="b">Option B</Select.Item>
  </Select.Content>
</Select>
```

**Polymorphic `as` prop for semantic flexibility.**
```tsx
interface BoxProps<T extends React.ElementType> {
  as?: T
  children: React.ReactNode
}
function Box<T extends React.ElementType = 'div'>({ as, children, ...props }: BoxProps<T>) {
  const Component = as ?? 'div'
  return <Component {...props}>{children}</Component>
}
// Usage: <Box as="section">, <Box as="article">, <Box as="main">
```

**Forward refs always on any component that wraps a DOM element.**
```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <button ref={ref} {...props}>{children}</button>
  )
)
Button.displayName = 'Button'
```

**TypeScript variants with cva (class-variance-authority).**
```tsx
const button = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
)
```

**State machines over boolean flags for complex UI state.**
```tsx
// Wrong — boolean soup
const [isOpen, setIsOpen] = useState(false)
const [isLoading, setIsLoading] = useState(false)
const [hasError, setHasError] = useState(false)

// Right — explicit states
type State = 'idle' | 'loading' | 'success' | 'error'
const [state, setState] = useState<State>('idle')
```

### Component File Structure
```
components/
  ui/           # Primitive building blocks (Button, Input, Badge)
  patterns/     # Composed patterns (SearchInput, FilterBar, DataTable)
  sections/     # Page sections (Hero, Features, Pricing, CTA)
  layouts/      # Layout wrappers (PageLayout, SidebarLayout, AuthLayout)
```

---

## Mobile-First — Non-Negotiable

Every component is designed mobile-first and enhanced for desktop. Not the reverse.

### The Rules

**Start with the smallest viewport. Add complexity up.**
```tsx
// Wrong — desktop first, mobile afterthought
className="flex-row md:flex-row flex-col"

// Right — mobile first
className="flex-col md:flex-row"
```

**Touch targets: minimum 44×44px (Apple HIG) / 48×48dp (Material).**
```tsx
// Always ensure touch target even when visual is smaller
className="min-h-[44px] min-w-[44px] flex items-center justify-center"
```

**Font sizes on mobile: never below 16px for body text.**
iOS Safari auto-zooms on inputs with font-size < 16px. Prevent it:
```css
input, textarea, select { font-size: 16px; }
```

**Thumb zones matter.**
Primary actions: bottom center or bottom right (right thumb reach).
Navigation: bottom (mobile) or left sidebar (desktop).
Dangerous actions (delete): top left — hardest to hit accidentally.

**Horizontal scroll is a bug, not a feature.**
Every layout must be tested at 320px width (smallest common phone).
Use `overflow-x-hidden` on root if needed, but investigate why content overflows first.

**Responsive spacing with clamp:**
```tsx
// Scales from 16px at 320px to 96px at 1440px
padding: clamp(1rem, 5vw, 6rem)

// Scales font from 32px mobile to 72px desktop
fontSize: clamp(2rem, 6vw, 4.5rem)
```

**Images: always with aspect-ratio and object-fit.**
```tsx
<div className="relative aspect-video w-full overflow-hidden rounded-lg">
  <Image
    src={src}
    alt={alt}
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>
```

---

## Updated Reference Files

- **Art Fundamentals**: `references/art-fundamentals.md` — Light physics, color theory, material properties
- **Material Recipes**: `references/material-recipes.md` — Ready-to-use SVG filter code (sand, metal, water, stone, glass, wood, fabric, neon, concrete)
- **Cognitive Loop**: `references/cognitive-loop.md` — Debug flat/broken visuals systematically
- **Psychology**: `references/psychology.md` — Ogilvy principles, attention mapping, trust signals, conversion psychology in UI
- **Motion**: `references/motion.md` — Framer Motion patterns, spring physics, choreography, scroll-driven animation
- **React Architecture**: `references/react-architecture.md` — Compound components, CVA, state machines, TypeScript patterns
