# Motion Reference

Framer Motion patterns, spring physics, choreography, and scroll-driven animation.

---

## The Physics of Good Motion

CSS easing curves feel mechanical because they are — they model time, not physics. Spring physics models mass and tension. The difference is felt immediately.

### Spring vs. Ease

| Property | CSS Ease | Spring Physics |
|----------|---------|----------------|
| Model | Time-based curve | Physics simulation |
| Feel | Mechanical, predictable | Natural, alive |
| Overshoot | Never (by design) | Configurable — often desired |
| Interrupt behavior | Jumps to new state | Continues from current velocity |
| Configurability | `cubic-bezier()` | `stiffness`, `damping`, `mass` |

**Spring interrupt behavior is critical.** When a user clicks mid-animation, a CSS transition snaps or restarts from the origin. A spring continues from its current velocity — the animation feels continuous, not glitchy.

---

## Spring Config Library

```typescript
// Framer Motion spring configurations

// SNAPPY — UI feedback, button presses, toggles
const snap = { type: "spring", stiffness: 500, damping: 30, mass: 1 }

// SMOOTH — Page transitions, panel slides, drawers
const smooth = { type: "spring", stiffness: 300, damping: 35, mass: 1 }

// BOUNCY — Playful entries, notifications, badges
const bouncy = { type: "spring", stiffness: 400, damping: 20, mass: 0.8 }

// HEAVY — Modals, full-page overlays, large panels
const heavy = { type: "spring", stiffness: 200, damping: 40, mass: 1.5 }

// GENTLE — Subtle reveals, tooltip appearances, hover states
const gentle = { type: "spring", stiffness: 150, damping: 30, mass: 1 }

// INSTANT — Micro-interactions, icon swaps, small state changes
const instant = { type: "spring", stiffness: 800, damping: 40, mass: 0.5 }
```

### Tuning Guide

| Want... | Adjust... |
|---------|-----------|
| More bounce/overshoot | Decrease `damping` (30 → 15) |
| Less bounce, crisp stop | Increase `damping` (30 → 50) |
| Faster response | Increase `stiffness` (300 → 600) |
| Slower, heavier feel | Decrease `stiffness` + increase `mass` |
| Sluggish start | Increase `mass` (1 → 2) |
| Hair-trigger response | Decrease `mass` (1 → 0.5) |

---

## Core Patterns

### Staggered List Reveal

```tsx
import { motion } from "framer-motion"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,  // 70ms between each child
      delayChildren: 0.1,     // 100ms before first child starts
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 30 }
  }
}

function StaggeredList({ items }: { items: string[] }) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, i) => (
        <motion.li key={i} variants={itemVariants}>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

### Page / Route Transition

```tsx
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 35 }
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15, ease: "easeIn" }
  }
}

// In layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

### Presence-Based Mount/Unmount

```tsx
// Always wrap conditional renders in AnimatePresence
// This is what enables exit animations — without it, elements
// disappear instantly when removed from the DOM

function Notification({ show, message }: { show: boolean; message: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 25 } }}
          exit={{ opacity: 0, x: 40, scale: 0.95, transition: { duration: 0.15 } }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

### Scroll-Driven Reveal (useInView)

```tsx
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

function RevealSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: true,        // Only trigger once — don't re-animate on scroll back up
    margin: "0px 0px -80px 0px"  // Trigger 80px before element enters viewport
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ type: "spring", stiffness: 250, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}
```

### Scroll-Driven Parallax (useScroll + useTransform)

```tsx
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]  // Track from element top to element exit
  })

  // As section scrolls out (0 → 1), move background slower than content
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-image"
        style={{ y: backgroundY }}
      />
      <motion.div
        className="relative z-10"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <h1>Hero Content</h1>
      </motion.div>
    </div>
  )
}
```

### Hover + Tap Interaction

```tsx
function InteractiveCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      whileTap={{
        scale: 0.98,
        transition: { type: "spring", stiffness: 600, damping: 30 }
      }}
    >
      {children}
    </motion.div>
  )
}
```

### Layout Animation (Shared Layout / FLIP)

```tsx
import { motion, LayoutGroup } from "framer-motion"

// Framer Motion automatically calculates FLIP animations
// when elements change position in the DOM

function TabPanel({ tabs, active, setActive }: TabProps) {
  return (
    <LayoutGroup>
      <div className="flex gap-2">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActive(tab.id)}>
            {tab.label}
            {active === tab.id && (
              <motion.div
                layoutId="activeTab"  // Same layoutId = morphing animation
                className="absolute inset-0 bg-accent rounded"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>
    </LayoutGroup>
  )
}
```

---

## Choreography — Sequencing Multi-Element Animations

Good choreography reads like a sentence: subject → verb → object. Each element enters in logical narrative order.

### The Rule of Entry Order
Elements should enter in the order the user needs to process them:

1. **Container / background** (establishes space)
2. **Primary heading** (what is this?)
3. **Supporting context** (why does it matter?)
4. **Call to action** (what should I do?)
5. **Supporting detail** (secondary information, decorative elements)

### Delay Ladder Pattern

```tsx
const heroSequence = {
  background: { delay: 0 },
  heading: { delay: 0.1 },
  subheading: { delay: 0.2 },
  cta: { delay: 0.3 },
  decorative: { delay: 0.5 }
}

// Combine with spring for natural feel
const getTransition = (delay: number) => ({
  type: "spring",
  stiffness: 300,
  damping: 30,
  delay
})
```

### Avoid Choreography Chaos
- **Max 5 distinct entry animations per viewport** — more becomes noise
- **Stagger no more than 100ms between most elements** — longer gaps feel broken
- **Decorative elements last** — content first, decoration second
- **Never animate layout-defining elements** (navigation, persistent UI) — only animate content

---

## What to Animate

**Always animate:**
- Page/route transitions (context shift)
- Modal/dialog entry and exit (focus shift)
- Notification/toast appearance
- List item additions and removals
- State change feedback (success, error, loading)
- Navigation drawer open/close
- Accordion/disclosure expand/collapse

**Sometimes animate:**
- Hero section on page load (only if it adds context, not just motion)
- Card hover states (when interaction invites it)
- Scroll-driven parallax (when it adds depth)
- Tab/segment control active indicator

**Never animate:**
- Text reflow (causes reading disruption)
- Form field focus states (must be instant)
- Destructive action confirmations (urgency = no delay)
- Scroll position itself (causes motion sickness)
- Font size or weight changes
- Anything that makes the user wait for information

---

## Performance Rules

```tsx
// 1. ALWAYS use `will-change` for GPU acceleration on heavy animations
<motion.div style={{ willChange: "transform" }} />

// 2. Prefer transform and opacity — they run on compositor thread
// GOOD: x, y, scale, rotate, opacity
// BAD: width, height, top, left, margin, padding (cause reflow)

// 3. Use layout prop sparingly — it's expensive
<motion.div layout />  // Only when element changes DOM position

// 4. Reduce motion — always respect user preference
import { useReducedMotion } from "framer-motion"

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      animate={{ y: shouldReduceMotion ? 0 : -4 }}
      transition={shouldReduceMotion ? { duration: 0 } : snap}
    />
  )
}
```

---

## Duration Reference

| Interaction type | Duration |
|-----------------|---------|
| Micro-feedback (button tap, toggle) | 80–150ms |
| Small UI (tooltip, badge, chip) | 150–200ms |
| Medium UI (dropdown, popover) | 200–280ms |
| Large UI (modal, drawer, sheet) | 280–400ms |
| Page transition | 300–500ms |
| Hero/dramatic reveal | 500–800ms |

**Rule:** Faster than 80ms = imperceptible. Slower than 500ms = frustrating (for interactions). Slower than 800ms = acceptable only for hero reveals where delay is the point.
