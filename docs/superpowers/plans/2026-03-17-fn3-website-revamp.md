# FN3 Website Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the FlowNexis3 public website from scratch — replacing the current generic AI-default design with a Command Red editorial system across 5 pages (Homepage + 4 Chapter pages) that positions FN3 as an operational intelligence company.

**Architecture:** Next.js App Router with one route per page. All shared UI (Nav, PageHero, Footer) lives in `components/`. Page-specific sections live in `components/<page-slug>/`. Framer Motion handles all scroll animations via a reusable `FadeInSection` wrapper and a `CountUp` utility.

**Tech Stack:** Next.js 16 (App Router, TypeScript), Tailwind CSS v3, Framer Motion v12, Inter via `next/font/google`, Georgia via system stack, system monospace

---

## Design Token Reference

Keep this open while building. Every hex value maps to a token name.

| Token | Value | Usage |
|---|---|---|
| `fn3-red` | `#b91c1c` | Nav, hero backgrounds, brand accents, CTAs |
| `fn3-red-light` | `#f87171` | Section labels on light sections, capability numbers |
| `fn3-red-faint` | `#fde8e8` | Borders/dividers on warm-white sections |
| `fn3-warm-white` | `#fffbfb` | Philosophy, identity, contact sections |
| `fn3-near-black` | `#0c0a0a` | Numbers strips, process sections, footer |
| `fn3-dark-border` | `#1a1212` | Dividers on near-black sections |
| `fn3-dark-label` | `#2a1a1a` | Ghost labels on near-black sections |
| `fn3-dark-text` | `#3f3232` | Body copy on near-black sections |

---

## File Map

### New files to create
```
app/
  layout.tsx                          ← update metadata + font
  page.tsx                            ← homepage assembly
  what-we-are/page.tsx                ← Chapter 01
  what-weve-built/page.tsx            ← Chapter 02
  how-we-work/page.tsx                ← Chapter 03
  work-with-us/page.tsx               ← Chapter 04
  globals.css                         ← replace with new design tokens

components/
  nav.tsx                             ← shared nav (desktop + mobile)
  page-hero.tsx                       ← shared chapter page hero
  footer.tsx                          ← shared footer

  home/
    hero.tsx                          ← homepage hero (full viewport)
    identity-strip.tsx                ← Agents / Systems / Operations columns
    method-section.tsx                ← "same system that runs our businesses"
    numbers-strip.tsx                 ← 5 / 200+ / 6 / 24/7 count-up
    chapter-entry.tsx                 ← chapter index rows at homepage bottom

  what-we-are/
    philosophy.tsx                    ← 2-col headline + body
    reference-models.tsx              ← 5-col reference model strip
    operating-principles.tsx          ← 2×2 dark grid

  what-weve-built/
    ventures-intro.tsx                ← "These aren't investments. They're proof."
    ventures-list.tsx                 ← 5-row venture table

  how-we-work/
    offer-statement.tsx               ← "You don't hire us. You integrate us."
    capabilities-list.tsx             ← 6-row capability table
    engagement-process.tsx            ← 4-column dark process strip

  work-with-us/
    contact-section.tsx               ← italic question + email + 3 paths

  ui/
    fade-in-section.tsx               ← reusable scroll fade-in wrapper
    count-up.tsx                      ← number count-up animation hook
```

### Files to modify
```
tailwind.config.js      ← replace fn3 color scale with new tokens
```

### Files to delete (after all tasks complete)
```
components/hero-section.tsx
components/hero-section-pro.tsx
components/navigation.tsx
components/navigation-pro.tsx
components/portfolio-section.tsx
components/portfolio-section-pro.tsx
components/architecture-section.tsx
components/architecture-section-pro.tsx
components/niche-hero.tsx
components/pain-points-section.tsx
components/logos/fn3-logo-pro.tsx (keep logos/ dir if other logos present)
components/ui/aurora.tsx
```

---

## Task 1: Design System — Tailwind Config + Global CSS

**Files:**
- Modify: `tailwind.config.js`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace Tailwind color tokens**

Open `tailwind.config.js`. Replace the entire `colors` block and `fontFamily` block with:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'fn3-red':        '#b91c1c',
        'fn3-red-light':  '#f87171',
        'fn3-red-faint':  '#fde8e8',
        'fn3-warm-white': '#fffbfb',
        'fn3-near-black': '#0c0a0a',
        'fn3-dark-border':'#1a1212',
        'fn3-dark-label': '#2a1a1a',
        'fn3-dark-text':  '#3f3232',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Replace globals.css**

Replace the entire contents of `app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    border-color: #1a1212;
  }

  body {
    background-color: #ffffff;
    color: #1c1917;
    font-family: var(--font-inter), system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Remove all default border-radius from shadcn if any remain */
  :root {
    --radius: 0px;
  }
}

@layer utilities {
  .font-display {
    font-weight: 800;
    letter-spacing: -0.05em;
    line-height: 1.02;
  }

  .font-serif-italic {
    font-family: Georgia, 'Times New Roman', serif;
    font-style: italic;
  }

  .label-mono {
    font-family: ui-monospace, SFMono-Regular, monospace;
    font-size: 0.5625rem; /* 9px */
    letter-spacing: 0.25em;
    text-transform: uppercase;
  }
}
```

- [ ] **Step 3: Update layout.tsx with Inter font**

Replace `app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'FN3 — Operational Intelligence',
    template: '%s — FN3',
  },
  description: 'FN3 builds and deploys AI-powered operational intelligence. Agents, automation, and systems that make businesses run at a level most teams never reach.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'FlowNexis3',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Run dev server to verify no build errors**

```bash
cd /Users/husamahmed/FN3/fn3-main && npm run dev
```

Expected: Server starts on localhost:3000. Existing page may look broken — that's fine. No TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.js app/globals.css app/layout.tsx
git commit -m "feat: replace design system with FN3 Command Red tokens"
```

---

## Task 2: Scroll Animation Utilities

**Files:**
- Create: `components/ui/fade-in-section.tsx`
- Create: `components/ui/count-up.tsx`

These are used across every page. Build them first so all subsequent tasks can import them.

- [ ] **Step 1: Create FadeInSection**

Create `components/ui/fade-in-section.tsx`:

```tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface FadeInSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function FadeInSection({ children, className, delay = 0 }: FadeInSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Create CountUp hook**

Create `components/ui/count-up.tsx`:

```tsx
'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface CountUpProps {
  to: number
  duration?: number
  className?: string
  suffix?: string
}

export function CountUp({ to, duration = 1.2, className, suffix = '' }: CountUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (!isInView) return
    const controls = animate(count, to, {
      duration,
      ease: 'easeOut',
    })
    return controls.stop
  }, [isInView, count, to, duration])

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}
```

- [ ] **Step 3: Verify imports work**

```bash
cd /Users/husamahmed/FN3/fn3-main && npm run typecheck
```

Expected: No errors from the new files.

- [ ] **Step 4: Commit**

```bash
git add components/ui/fade-in-section.tsx components/ui/count-up.tsx
git commit -m "feat: add FadeInSection and CountUp animation utilities"
```

---

## Task 3: Shared Components — Navigation

**Files:**
- Create: `components/nav.tsx`

The nav has two variants: homepage (shows all chapter links) and chapter pages (shows "← Back to Home"). Controlled via a `variant` prop.

- [ ] **Step 1: Create nav.tsx**

Create `components/nav.tsx`:

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface NavProps {
  variant?: 'home' | 'chapter'
}

const chapters = [
  { label: 'What We Are', href: '/what-we-are' },
  { label: "What We've Built", href: '/what-weve-built' },
  { label: 'How We Work', href: '/how-we-work' },
]

export function Nav({ variant = 'home' }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-fn3-red">
      <nav className="flex items-center justify-between h-[52px] px-6 lg:px-12">

        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-[15px] font-bold text-white tracking-[0.05em]"
        >
          FN3
        </Link>

        {/* Desktop centre — home variant shows chapter links, chapter variant shows back */}
        <div className="hidden lg:flex items-center gap-9">
          {variant === 'home' ? (
            chapters.map((ch) => (
              <Link
                key={ch.href}
                href={ch.href}
                className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/50 hover:text-white transition-colors duration-150"
              >
                {ch.label}
              </Link>
            ))
          ) : (
            <Link
              href="/"
              className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/50 hover:text-white transition-colors duration-150"
            >
              ← Back to Home
            </Link>
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            href="/work-with-us"
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-white border-b border-white/60 hover:border-white pb-px transition-colors duration-150"
          >
            Work With Us →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="8" x2="21" y2="8" />
              <line x1="3" y1="16" x2="21" y2="16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="lg:hidden bg-fn3-red border-t border-white/10">
          {variant === 'chapter' && (
            <Link
              href="/"
              className="block px-6 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-white/50 hover:text-white transition-colors duration-150"
              onClick={() => setMobileOpen(false)}
            >
              ← Back to Home
            </Link>
          )}
          {chapters.map((ch) => (
            <Link
              key={ch.href}
              href={ch.href}
              className="block px-6 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-white/50 hover:text-white transition-colors duration-150 border-t border-white/5"
              onClick={() => setMobileOpen(false)}
            >
              {ch.label}
            </Link>
          ))}
          <Link
            href="/work-with-us"
            className="block px-6 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-white hover:text-white/80 transition-colors duration-150 border-t border-white/15"
            onClick={() => setMobileOpen(false)}
          >
            Work With Us →
          </Link>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Verify typecheck**

```bash
cd /Users/husamahmed/FN3/fn3-main && npm run typecheck
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/nav.tsx
git commit -m "feat: add Nav component with home/chapter variants and mobile menu"
```

---

## Task 4: Shared Components — PageHero + Footer

**Files:**
- Create: `components/page-hero.tsx`
- Create: `components/footer.tsx`

- [ ] **Step 1: Create PageHero**

Create `components/page-hero.tsx`:

```tsx
interface PageHeroProps {
  chapterLabel: string
  title: string
  description: string
}

export function PageHero({ chapterLabel, title, description }: PageHeroProps) {
  return (
    <section className="bg-fn3-red px-6 lg:px-12 pt-[72px] pb-[80px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end max-w-[1400px] mx-auto">
        <div>
          <p className="label-mono text-white/30 mb-5">{chapterLabel}</p>
          <h1 className="font-display text-[clamp(40px,5vw,64px)] text-white leading-[1] tracking-[-0.05em]">
            {title}
          </h1>
        </div>
        <p className="text-base text-white/55 leading-[1.75] lg:self-end">
          {description}
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create Footer**

Create `components/footer.tsx`:

```tsx
export function Footer() {
  return (
    <footer className="bg-fn3-near-black px-6 lg:px-12 py-7 flex items-center justify-between">
      <span className="font-mono text-[12px] font-bold text-fn3-red tracking-[0.1em]">
        FN3
      </span>
      <span className="label-mono text-fn3-dark-label">
        © FlowNexis3 {new Date().getFullYear()} — All Rights Reserved
      </span>
    </footer>
  )
}
```

- [ ] **Step 3: Typecheck**

```bash
cd /Users/husamahmed/FN3/fn3-main && npm run typecheck
```

- [ ] **Step 4: Commit**

```bash
git add components/page-hero.tsx components/footer.tsx
git commit -m "feat: add PageHero and Footer shared components"
```

---

## Task 5: Homepage — Hero Section

**Files:**
- Create: `components/home/hero.tsx`

- [ ] **Step 1: Create hero.tsx**

Create `components/home/hero.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'

const stagger = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

const fadeUp = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

export function HomeHero() {
  return (
    <section className="relative bg-fn3-red px-6 lg:px-12 pt-[100px] pb-[120px] min-h-[90vh] flex flex-col justify-center overflow-hidden">
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="max-w-[760px]"
      >
        {/* Eyebrow */}
        <motion.p variants={fadeUp} className="label-mono text-white/30 mb-14">
          FlowNexis3 — Operational Intelligence
        </motion.p>

        {/* Ghost manifesto */}
        <motion.p variants={fadeUp} className="font-serif-italic text-[24px] text-white/35 leading-[1.6] mb-6">
          Not an agency.<br />
          Not a studio.<br />
          Not a fund.
        </motion.p>

        {/* Rule */}
        <motion.div variants={fadeUp} className="w-10 h-px bg-white/40 mb-7" />

        {/* Main statement */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-[clamp(40px,5.5vw,68px)] text-white leading-[1.02] tracking-[-0.05em] mb-14"
        >
          FN3 is what you build<br />
          when you&apos;re done<br />
          choosing between them.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p variants={fadeUp} className="text-base text-white/50 leading-[1.7] max-w-[480px]">
          We build the operating system behind the business — agents, automation,
          and systems that make operations run at a level most teams never reach.
        </motion.p>
      </motion.div>

      {/* Scroll hint */}
      <p className="label-mono text-white/18 absolute bottom-9 left-6 lg:left-12">
        Scroll to enter ↓
      </p>
    </section>
  )
}
```

- [ ] **Step 2: Wire into page.tsx temporarily to view in browser**

Replace `app/page.tsx` with:

```tsx
import { Nav } from '@/components/nav'
import { HomeHero } from '@/components/home/hero'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main>
      <Nav variant="home" />
      <HomeHero />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 3: View in browser**

```bash
cd /Users/husamahmed/FN3/fn3-main && npm run dev
```

Open `http://localhost:3000`. Verify: red background, staggered text animation on load, manifesto ghost text, rule, bold statement, sub-headline, scroll hint at bottom.

- [ ] **Step 4: Commit**

```bash
git add components/home/hero.tsx app/page.tsx
git commit -m "feat: add homepage hero section"
```

---

## Task 6: Homepage — Identity Strip + Method Section

**Files:**
- Create: `components/home/identity-strip.tsx`
- Create: `components/home/method-section.tsx`

- [ ] **Step 1: Create identity-strip.tsx**

Create `components/home/identity-strip.tsx`:

```tsx
import { FadeInSection } from '@/components/ui/fade-in-section'

const pillars = [
  {
    num: '01 — AGENTS',
    title: 'AI Workforce',
    body: 'Persistent agents with memory and capability running operations around the clock. Not tools you prompt — a workforce you deploy.',
  },
  {
    num: '02 — SYSTEMS',
    title: 'Connected Infrastructure',
    body: 'Every process, every data flow, every decision point connected. An operating system that eliminates the gaps between tools and teams.',
  },
  {
    num: '03 — OPERATIONS',
    title: 'Execution at Scale',
    body: 'The frameworks, the SLAs, the transfer pricing — a management layer built to run multiple businesses without adding management overhead.',
  },
]

export function IdentityStrip() {
  return (
    <section className="bg-fn3-warm-white border-b border-fn3-red-faint px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="label-mono text-fn3-red-light mb-12">The FN3 Operating Model</p>
      </FadeInSection>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {pillars.map((pillar, i) => (
          <FadeInSection key={pillar.num} delay={i * 0.1}>
            <div className={`pr-0 lg:pr-12 ${i > 0 ? 'pt-10 lg:pt-0 lg:pl-12 border-t lg:border-t-0 lg:border-l border-fn3-red-faint' : ''}`}>
              <p className="label-mono text-fn3-red mb-5">{pillar.num}</p>
              <h3 className="text-[20px] font-bold text-[#1c1917] tracking-tight mb-3">{pillar.title}</h3>
              <p className="text-[14px] text-[#78716c] leading-[1.75]">{pillar.body}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create method-section.tsx**

Create `components/home/method-section.tsx`:

```tsx
import { FadeInSection } from '@/components/ui/fade-in-section'

const capabilities = [
  {
    num: 'CAPABILITY 01',
    title: 'Automation Integration',
    body: "Map, design, and deploy automation into existing operations without rebuilding what's working.",
  },
  {
    num: 'CAPABILITY 02',
    title: 'Agent Deployment',
    body: 'Purpose-built agents for specific operational roles — not generic AI, configured workforce.',
  },
  {
    num: 'CAPABILITY 03',
    title: 'Operating System Design',
    body: 'The frameworks, decision layers, and systems architecture that make scale possible without chaos.',
  },
]

export function MethodSection() {
  return (
    <section className="bg-white border-b border-[#f3f4f6] px-6 lg:px-12 py-20">
      {/* Two-col header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
        <FadeInSection>
          <h2 className="font-display text-[clamp(32px,3.5vw,48px)] text-[#1c1917] leading-[1.05] tracking-tight">
            The same system that runs{' '}
            <span className="text-fn3-red">our</span>{' '}
            businesses runs yours.
          </h2>
        </FadeInSection>
        <FadeInSection delay={0.1}>
          <p className="text-[15px] text-[#78716c] leading-[1.8] lg:pt-2">
            FN3 built an operational intelligence layer to run its own portfolio.
            Every tool, agent, and system was designed to be externalizable from day one.
            What powers our ventures powers our clients.
          </p>
        </FadeInSection>
      </div>

      {/* Capability preview cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {capabilities.map((cap, i) => (
          <FadeInSection key={cap.num} delay={i * 0.1}>
            <div className="bg-fn3-warm-white border border-fn3-red-faint p-7">
              <p className="label-mono text-fn3-red-light mb-3">{cap.num}</p>
              <h3 className="text-[15px] font-bold text-[#1c1917] mb-2">{cap.title}</h3>
              <p className="text-[13px] text-[#9ca3af] leading-[1.65]">{cap.body}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add to page.tsx**

Update `app/page.tsx`:

```tsx
import { Nav } from '@/components/nav'
import { HomeHero } from '@/components/home/hero'
import { IdentityStrip } from '@/components/home/identity-strip'
import { MethodSection } from '@/components/home/method-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main>
      <Nav variant="home" />
      <HomeHero />
      <IdentityStrip />
      <MethodSection />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 4: Verify in browser — scroll to see fade-in animations**

- [ ] **Step 5: Commit**

```bash
git add components/home/identity-strip.tsx components/home/method-section.tsx app/page.tsx
git commit -m "feat: add identity strip and method section to homepage"
```

---

## Task 7: Homepage — Numbers Strip + Chapter Entry

**Files:**
- Create: `components/home/numbers-strip.tsx`
- Create: `components/home/chapter-entry.tsx`

- [ ] **Step 1: Create numbers-strip.tsx**

Create `components/home/numbers-strip.tsx`:

```tsx
'use client'

import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { CountUp } from '@/components/ui/count-up'

const stats = [
  { value: 5, suffix: '', label: 'Ventures Running the System', accent: true },
  { value: 200, suffix: '+', label: 'Agent Vision', accent: false },
  { value: 6, suffix: '', label: 'Service Capabilities', accent: false },
  { value: null, suffix: '24/7', label: 'Autonomous Operations', accent: false },
]

export function NumbersStrip() {
  return (
    <section className="bg-fn3-near-black px-6 lg:px-12 py-20">
      <p className="label-mono text-fn3-dark-label mb-12">At a glance</p>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`${i < stats.length - 1 ? 'pb-10 lg:pb-0 lg:pr-10 lg:border-r border-fn3-dark-border' : 'pt-10 lg:pt-0 lg:pl-10'} ${i > 0 && i < stats.length ? 'border-t lg:border-t-0 border-fn3-dark-border mt-0 pt-10 lg:pt-0' : ''}`}
          >
            <div className={`font-serif text-[64px] font-normal leading-none ${stat.accent ? 'text-fn3-red' : 'text-white'}`}>
              {stat.value !== null ? (
                <CountUp to={stat.value} suffix={stat.suffix} />
              ) : (
                stat.suffix
              )}
            </div>
            <p className="label-mono text-fn3-dark-text mt-3">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create chapter-entry.tsx**

Create `components/home/chapter-entry.tsx`:

```tsx
import Link from 'next/link'
import { FadeInSection } from '@/components/ui/fade-in-section'

const chapters = [
  { num: '01', title: 'What We Are', sub: 'Philosophy + Structure', href: '/what-we-are', accent: false },
  { num: '02', title: "What We've Built", sub: 'Ventures + Proof of System', href: '/what-weve-built', accent: false },
  { num: '03', title: 'How We Work', sub: 'Capabilities + Operating Model', href: '/how-we-work', accent: false },
  { num: '04', title: 'Work With Us', sub: 'Bring FN3 Into Your Operations', href: '/work-with-us', accent: true },
]

export function ChapterEntry() {
  return (
    <section className="bg-white px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="label-mono text-[#d1d5db] mb-10">Enter the site</p>
      </FadeInSection>
      <div>
        {chapters.map((ch, i) => (
          <FadeInSection key={ch.href} delay={i * 0.08}>
            <Link
              href={ch.href}
              className="flex items-center justify-between py-6 border-t border-[#f3f4f6] last:border-b hover:bg-fn3-warm-white transition-colors duration-150 -mx-6 lg:-mx-12 px-6 lg:px-12"
            >
              <div className="flex items-center gap-5">
                <span className="font-mono text-[10px] text-[#d1d5db] w-6">{ch.num}</span>
                <span className={`text-[22px] font-bold tracking-tight ${ch.accent ? 'text-fn3-red' : 'text-[#111]'}`}>
                  {ch.title}
                </span>
              </div>
              <span className="hidden lg:block text-[11px] text-[#9ca3af] tracking-[0.05em]">
                {ch.sub} →
              </span>
            </Link>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Assemble final homepage**

Replace `app/page.tsx`:

```tsx
import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { HomeHero } from '@/components/home/hero'
import { IdentityStrip } from '@/components/home/identity-strip'
import { MethodSection } from '@/components/home/method-section'
import { NumbersStrip } from '@/components/home/numbers-strip'
import { ChapterEntry } from '@/components/home/chapter-entry'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'FN3 — Operational Intelligence',
  description: 'FN3 builds and deploys AI-powered operational intelligence. Agents, automation, and systems that make businesses run at a level most teams never reach.',
  openGraph: { title: 'FN3 — Operational Intelligence' },
}

export default function Home() {
  return (
    <main>
      <Nav variant="home" />
      <HomeHero />
      <IdentityStrip />
      <MethodSection />
      <NumbersStrip />
      <ChapterEntry />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 4: Verify full homepage in browser. Check count-up animation on Numbers Strip when scrolling to it.**

- [ ] **Step 5: Commit**

```bash
git add components/home/numbers-strip.tsx components/home/chapter-entry.tsx app/page.tsx
git commit -m "feat: complete homepage — numbers strip and chapter entry"
```

---

## Task 8: Chapter 01 — What We Are

**Files:**
- Create: `app/what-we-are/page.tsx`
- Create: `components/what-we-are/philosophy.tsx`
- Create: `components/what-we-are/reference-models.tsx`
- Create: `components/what-we-are/operating-principles.tsx`

- [ ] **Step 1: Create philosophy.tsx**

Create `components/what-we-are/philosophy.tsx`:

```tsx
import { FadeInSection } from '@/components/ui/fade-in-section'

export function Philosophy() {
  return (
    <section className="bg-fn3-warm-white border-b border-fn3-red-faint px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="label-mono text-fn3-red-light mb-12">The Philosophy</p>
      </FadeInSection>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
        <FadeInSection className="lg:col-span-2">
          <h2 className="font-display text-[clamp(28px,3vw,36px)] text-[#1c1917] leading-[1.1] tracking-tight">
            Built to run many things<br />without{' '}
            <span className="text-fn3-red">becoming</span><br />many things.
          </h2>
        </FadeInSection>
        <FadeInSection delay={0.1} className="lg:col-span-3">
          <p className="text-[16px] text-[#78716c] leading-[1.8] mb-6">
            Most companies scale by adding people, layers, and complexity. FN3 scales
            by deepening the system. Every process is designed to be automated before
            it&apos;s designed to be staffed. Every service is built as an API before
            it&apos;s built as a team.
          </p>
          <p className="text-[16px] text-[#78716c] leading-[1.8]">
            The result: a holding company that runs like software. Lean by design.
            Compound by nature. AI-native from the ground up.
          </p>
        </FadeInSection>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create reference-models.tsx**

Create `components/what-we-are/reference-models.tsx`:

```tsx
import { FadeInSection } from '@/components/ui/fade-in-section'

const models = [
  { name: 'Constellation Software', desc: 'Acquire and compound. Never sell. Operational discipline over growth theatre.' },
  { name: 'Berkshire Hathaway', desc: 'Autonomous business units. Capital allocation as the core skill. Trust the operator.' },
  { name: 'Amazon', desc: 'API mandate. Every service externalizable. Build platforms, not products.' },
  { name: 'Danaher', desc: 'The Business System. A replicable operating model applied across every acquisition.' },
  { name: 'IAC', desc: 'Build, spin, repeat. Incubate internally. Spin out when ready. Never stop building.' },
]

export function ReferenceModels() {
  return (
    <section className="bg-white border-b border-[#f3f4f6] px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="label-mono text-fn3-red-light mb-12">Informed By</p>
      </FadeInSection>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {models.map((model, i) => (
          <FadeInSection key={model.name} delay={i * 0.08}>
            <div className={`${i > 0 ? 'pt-8 lg:pt-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-[#f3f4f6]' : ''} ${i < models.length - 1 ? 'pb-8 lg:pb-0 lg:pr-6' : ''}`}>
              <h3 className="text-[13px] font-bold text-[#1c1917] mb-2">{model.name}</h3>
              <p className="text-[12px] text-[#9ca3af] leading-[1.6]">{model.desc}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create operating-principles.tsx**

Create `components/what-we-are/operating-principles.tsx`:

```tsx
import { FadeInSection } from '@/components/ui/fade-in-section'

const principles = [
  {
    num: 'PRINCIPLE 01',
    title: 'Automate Before You Staff',
    body: 'Every process gets designed for automation first. Humans handle judgment. Systems handle execution.',
  },
  {
    num: 'PRINCIPLE 02',
    title: 'Build APIs, Not Teams',
    body: 'Every service interface is designed to be externalizable from day one. Nothing is siloed by default.',
  },
  {
    num: 'PRINCIPLE 03',
    title: 'Compound With Every Venture',
    body: 'Each new business makes the operating system stronger. Infrastructure invested once, leveraged across all.',
  },
  {
    num: 'PRINCIPLE 04',
    title: 'Decisions From Frameworks',
    body: 'No gut calls on strategy. Regret minimization, Anand-Collis framework, capital allocation rules — all documented, all applied.',
  },
]

export function OperatingPrinciples() {
  return (
    <section className="bg-fn3-near-black px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="label-mono text-fn3-dark-label mb-10">Operating Principles</p>
      </FadeInSection>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {principles.map((p, i) => (
          <FadeInSection key={p.num} delay={i * 0.1}>
            <div className="border-t border-fn3-dark-border pt-6">
              <p className="label-mono text-fn3-red mb-3">{p.num}</p>
              <h3 className="text-[18px] font-bold text-white tracking-tight mb-2">{p.title}</h3>
              <p className="text-[13px] text-fn3-dark-text leading-[1.7]">{p.body}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create page**

Create `app/what-we-are/page.tsx`:

```tsx
import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { PageHero } from '@/components/page-hero'
import { Philosophy } from '@/components/what-we-are/philosophy'
import { ReferenceModels } from '@/components/what-we-are/reference-models'
import { OperatingPrinciples } from '@/components/what-we-are/operating-principles'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'What We Are',
  description: 'FN3 is not an agency, a studio, or a fund. It\'s an operational holding company built to prove that AI-first operations at scale are possible with a small, precise team.',
}

export default function WhatWeAre() {
  return (
    <main>
      <Nav variant="chapter" />
      <PageHero
        chapterLabel="Chapter 01 — What We Are"
        title="The Company Behind the System"
        description="FN3 is a lean operational holding company. Not defined by its ventures — defined by the operating model that runs them. Built to prove that AI-first operations at scale are possible with a small, precise team."
      />
      <Philosophy />
      <ReferenceModels />
      <OperatingPrinciples />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 5: Verify at `http://localhost:3000/what-we-are`**

- [ ] **Step 6: Commit**

```bash
git add app/what-we-are/ components/what-we-are/
git commit -m "feat: build Chapter 01 — What We Are"
```

---

## Task 9: Chapter 02 — What We've Built

**Files:**
- Create: `app/what-weve-built/page.tsx`
- Create: `components/what-weve-built/ventures-intro.tsx`
- Create: `components/what-weve-built/ventures-list.tsx`

- [ ] **Step 1: Create ventures-intro.tsx**

Create `components/what-weve-built/ventures-intro.tsx`:

```tsx
import { FadeInSection } from '@/components/ui/fade-in-section'

export function VenturesIntro() {
  return (
    <section className="bg-fn3-warm-white border-b border-fn3-red-faint px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="label-mono text-fn3-red-light mb-12">Why This Page Exists</p>
        <p className="text-[24px] text-[#1c1917] max-w-[680px] leading-[1.6]">
          These aren&apos;t investments. They&apos;re{' '}
          <strong className="text-fn3-red font-bold">proof</strong>. Each venture runs on
          the same agent infrastructure, the same operational frameworks, the same decision
          architecture. When a client asks &ldquo;does this actually work?&rdquo; — this page
          is the answer.
        </p>
      </FadeInSection>
    </section>
  )
}
```

- [ ] **Step 2: Create ventures-list.tsx**

Create `components/what-weve-built/ventures-list.tsx`:

```tsx
import { FadeInSection } from '@/components/ui/fade-in-section'

const ventures = [
  {
    name: 'SUBZII',
    sector: 'Event Ticketing',
    desc: 'Live entertainment ticketing platform. AI-optimized pricing, inventory management, and demand forecasting. The FN3 agent layer runs demand prediction and operational workflows end-to-end.',
    status: 'Growth',
    dotColor: '#4ade80',
  },
  {
    name: 'DETAILMAPS',
    sector: 'Auto-Care',
    desc: 'Vehicle maintenance platform connecting auto-care providers with customers. Intelligent scheduling, route optimization, and service automation driven by the FN3 operations layer.',
    status: 'Active',
    dotColor: '#60a5fa',
  },
  {
    name: 'DRYJETS',
    sector: 'On-Demand Services',
    desc: 'On-demand service coordination platform. Resource matching, real-time dispatch, and contractor management — operational complexity handled by systems, not headcount.',
    status: 'Contracting',
    dotColor: '#fbbf24',
  },
  {
    name: 'DAWA',
    sector: 'Healthcare Infrastructure',
    desc: 'Morocco healthcare infrastructure modernization. AI-driven workflow optimization and patient coordination systems. The FN3 model applied to public sector operational transformation.',
    status: 'Concept',
    dotColor: '#a78bfa',
  },
  {
    name: 'BIO',
    sector: 'To Be Announced',
    desc: 'Early concept stage. The FN3 operating model is being applied to a new vertical. Details to follow.',
    status: 'Concept',
    dotColor: '#374151',
  },
]

export function VenturesList() {
  return (
    <section className="bg-white px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="label-mono text-fn3-red-light mb-10">Active Ventures</p>
      </FadeInSection>
      <div>
        {ventures.map((v, i) => (
          <FadeInSection key={v.name} delay={i * 0.08}>
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_160px] gap-6 lg:gap-12 py-10 border-t border-[#f3f4f6] last:border-b items-start">
              {/* Name + sector */}
              <div>
                <h3 className="text-[22px] font-bold text-[#1c1917] tracking-tight mb-2">{v.name}</h3>
                <p className="label-mono text-[#d1d5db]">{v.sector}</p>
              </div>
              {/* Description */}
              <p className="text-[14px] text-[#78716c] leading-[1.75]">{v.desc}</p>
              {/* Status */}
              <div className="flex items-center gap-2 lg:justify-end">
                <span
                  className="w-2 h-2 rounded-full inline-block flex-shrink-0"
                  style={{ backgroundColor: v.dotColor }}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#9ca3af]">
                  {v.status}
                </span>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create page**

Create `app/what-weve-built/page.tsx`:

```tsx
import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { PageHero } from '@/components/page-hero'
import { VenturesIntro } from '@/components/what-weve-built/ventures-intro'
import { VenturesList } from '@/components/what-weve-built/ventures-list'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: "What We've Built",
  description: 'Five ventures running on the FN3 operating model. Different industries, same infrastructure. Proof the system works.',
}

export default function WhatWeveBuilt() {
  return (
    <main>
      <Nav variant="chapter" />
      <PageHero
        chapterLabel="Chapter 02 — What We've Built"
        title="The System In The Wild"
        description="Five ventures. Each one a live test of the FN3 operating model. Different industries, same infrastructure. This is what the system looks like when it runs."
      />
      <VenturesIntro />
      <VenturesList />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 4: Verify at `http://localhost:3000/what-weve-built`**

- [ ] **Step 5: Commit**

```bash
git add app/what-weve-built/ components/what-weve-built/
git commit -m "feat: build Chapter 02 — What We've Built"
```

---

## Task 10: Chapter 03 — How We Work

**Files:**
- Create: `app/how-we-work/page.tsx`
- Create: `components/how-we-work/offer-statement.tsx`
- Create: `components/how-we-work/capabilities-list.tsx`
- Create: `components/how-we-work/engagement-process.tsx`

- [ ] **Step 1: Create offer-statement.tsx**

Create `components/how-we-work/offer-statement.tsx`:

```tsx
import { FadeInSection } from '@/components/ui/fade-in-section'

export function OfferStatement() {
  return (
    <section className="bg-fn3-warm-white border-b border-fn3-red-faint px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="label-mono text-fn3-red-light mb-12">The Offer</p>
        <h2 className="font-display text-[clamp(32px,3.5vw,40px)] text-[#1c1917] leading-[1.1] tracking-tight max-w-[640px] mb-8">
          You don&apos;t hire us.<br />You{' '}
          <span className="text-fn3-red">integrate</span> us.
        </h2>
        <p className="text-[16px] text-[#78716c] max-w-[520px] leading-[1.75]">
          FN3 doesn&apos;t parachute in with slide decks. We plug the operating system
          directly into your business — agents, automation, and frameworks that run
          alongside your team, not above it.
        </p>
      </FadeInSection>
    </section>
  )
}
```

- [ ] **Step 2: Create capabilities-list.tsx**

Create `components/how-we-work/capabilities-list.tsx`:

```tsx
import { FadeInSection } from '@/components/ui/fade-in-section'

const capabilities = [
  {
    num: 'CAPABILITY 01',
    title: 'Automation Integration',
    body: "Map existing operations. Identify automation opportunities. Design and deploy automation that eliminates manual work without disrupting what's working. Built for operations teams, not IT departments.",
  },
  {
    num: 'CAPABILITY 02',
    title: 'Agent Deployment',
    body: 'Purpose-built AI agents for specific operational roles. Not generic chatbots — configured agents with memory, context, and defined responsibilities. A workforce extension, not a tool upgrade.',
  },
  {
    num: 'CAPABILITY 03',
    title: 'Operating System Design',
    body: 'The frameworks, decision layers, and systems architecture behind how FN3 runs. Applied to your business. Includes SLA design, transfer pricing models, and the management layer that makes scale possible without chaos.',
  },
  {
    num: 'CAPABILITY 04',
    title: 'Context Engineering',
    body: 'Building the living context layer that keeps AI systems accurate, current, and operationally relevant. The difference between AI that hallucinates and AI that actually runs your business.',
  },
  {
    num: 'CAPABILITY 05',
    title: 'Infrastructure & Observability',
    body: 'Cloud infrastructure, database architecture, and observability pipelines. Built with the same standards FN3 uses internally — OpenTelemetry, traces, metrics, and alerting that actually tells you what\'s happening.',
  },
  {
    num: 'CAPABILITY 06',
    title: 'Product & Platform Strategy',
    body: 'From concept to operating platform. Product architecture, roadmap design, and platform strategy informed by the FN3 holding company model. For founders and operators who are building something that needs to scale.',
  },
]

export function CapabilitiesList() {
  return (
    <section className="bg-white border-b border-[#f3f4f6] px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="label-mono text-fn3-red-light mb-10">Six Capabilities</p>
      </FadeInSection>
      <div>
        {capabilities.map((cap, i) => (
          <FadeInSection key={cap.num} delay={i * 0.06}>
            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4 lg:gap-12 py-9 border-t border-[#f3f4f6] last:border-b items-start">
              <div>
                <p className="label-mono text-fn3-red-light mb-2">{cap.num}</p>
                <h3 className="text-[16px] font-bold text-[#1c1917] tracking-tight">{cap.title}</h3>
              </div>
              <p className="text-[14px] text-[#78716c] leading-[1.75]">{cap.body}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create engagement-process.tsx**

Create `components/how-we-work/engagement-process.tsx`:

```tsx
import { FadeInSection } from '@/components/ui/fade-in-section'

const steps = [
  {
    num: 'STEP 01',
    title: 'Operational Audit',
    body: 'We map your current operations. Where the gaps are, where the leverage is, what\'s ready for automation now.',
  },
  {
    num: 'STEP 02',
    title: 'System Design',
    body: 'We design the operational layer — agents, automations, frameworks — tailored to your business, not templated.',
  },
  {
    num: 'STEP 03',
    title: 'Integration & Deploy',
    body: "We build and deploy directly into your stack. No handoff decks. We run it until it runs itself.",
  },
  {
    num: 'STEP 04',
    title: 'Compound & Expand',
    body: 'The system learns. Each month it does more. Capabilities expand as confidence in the foundation grows.',
  },
]

export function EngagementProcess() {
  return (
    <section className="bg-fn3-near-black px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="label-mono text-fn3-dark-label mb-10">How an Engagement Works</p>
      </FadeInSection>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <FadeInSection key={step.num} delay={i * 0.1}>
            <div className={`${i > 0 ? 'pt-10 lg:pt-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-fn3-dark-border' : ''} ${i < steps.length - 1 ? 'pb-10 lg:pb-0 lg:pr-8' : ''}`}>
              <p className="label-mono text-fn3-red mb-4">{step.num}</p>
              <h3 className="text-[15px] font-bold text-white mb-3">{step.title}</h3>
              <p className="text-[12px] text-fn3-dark-text leading-[1.65]">{step.body}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create page**

Create `app/how-we-work/page.tsx`:

```tsx
import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { PageHero } from '@/components/page-hero'
import { OfferStatement } from '@/components/how-we-work/offer-statement'
import { CapabilitiesList } from '@/components/how-we-work/capabilities-list'
import { EngagementProcess } from '@/components/how-we-work/engagement-process'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'How We Work',
  description: 'Six capabilities. One integrated system. The same operational intelligence FN3 uses to run its ventures, available to external clients.',
}

export default function HowWeWork() {
  return (
    <main>
      <Nav variant="chapter" />
      <PageHero
        chapterLabel="Chapter 03 — How We Work"
        title="The Operating Model, Available"
        description="The same operational intelligence FN3 uses to run its ventures is available to external clients. Six service capabilities. One integrated system. No agency overhead."
      />
      <OfferStatement />
      <CapabilitiesList />
      <EngagementProcess />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 5: Verify at `http://localhost:3000/how-we-work`**

- [ ] **Step 6: Commit**

```bash
git add app/how-we-work/ components/how-we-work/
git commit -m "feat: build Chapter 03 — How We Work"
```

---

## Task 11: Chapter 04 — Work With Us

**Files:**
- Create: `app/work-with-us/page.tsx`
- Create: `components/work-with-us/contact-section.tsx`

- [ ] **Step 1: Create contact-section.tsx**

Create `components/work-with-us/contact-section.tsx`:

```tsx
import { FadeInSection } from '@/components/ui/fade-in-section'

const paths = [
  {
    label: 'For Clients',
    text: "Tell us what you're building and where operations are breaking down. We'll respond within 48 hours.",
  },
  {
    label: 'For Partners',
    text: "Strategic partnerships, joint ventures, and collaborative builds. We're selective but always open to the right conversation.",
  },
  {
    label: 'For Investors',
    text: "FN3 is not actively raising. If you're building a long-term thesis around operational AI, we want to know you.",
  },
]

export function ContactSection() {
  return (
    <section className="bg-fn3-warm-white px-6 lg:px-12 py-24 lg:py-32 min-h-[60vh] flex flex-col justify-center">
      <FadeInSection>
        <p className="label-mono text-fn3-red-light mb-12">Get In Touch</p>
        <p className="font-serif-italic text-[clamp(32px,4vw,52px)] text-[#1c1917] leading-[1.2] tracking-tight max-w-[600px] mb-12">
          Ready to bring operational intelligence into your business?
        </p>
        <a
          href="mailto:hello@flownexis3.com"
          className="inline-block text-[28px] font-bold text-fn3-red tracking-tight border-b-2 border-fn3-red-faint hover:border-fn3-red pb-1 transition-colors duration-150 mb-12"
        >
          hello@flownexis3.com →
        </a>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          {paths.map((path) => (
            <div key={path.label} className="border-t border-fn3-red-faint pt-5 lg:w-[200px]">
              <p className="label-mono text-fn3-red-light mb-2">{path.label}</p>
              <p className="text-[13px] text-[#78716c] leading-[1.6]">{path.text}</p>
            </div>
          ))}
        </div>
      </FadeInSection>
    </section>
  )
}
```

- [ ] **Step 2: Create page**

Create `app/work-with-us/page.tsx`:

```tsx
import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { PageHero } from '@/components/page-hero'
import { ContactSection } from '@/components/work-with-us/contact-section'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Work With Us',
  description: "No intake form. No discovery call booking widget. If FN3 is the right fit, reach out directly.",
}

export default function WorkWithUs() {
  return (
    <main>
      <Nav variant="chapter" />
      <PageHero
        chapterLabel="Chapter 04 — Work With Us"
        title="Let's Talk Operations"
        description="No intake form. No discovery call booking widget. If you've read this far, you know if FN3 is the right fit. Reach out directly."
      />
      <ContactSection />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 3: Verify at `http://localhost:3000/work-with-us`**

- [ ] **Step 4: Commit**

```bash
git add app/work-with-us/ components/work-with-us/
git commit -m "feat: build Chapter 04 — Work With Us"
```

---

## Task 12: Cleanup — Delete Old Components

**Files to delete:**
```
components/hero-section.tsx
components/hero-section-pro.tsx
components/navigation.tsx
components/navigation-pro.tsx
components/portfolio-section.tsx
components/portfolio-section-pro.tsx
components/architecture-section.tsx
components/architecture-section-pro.tsx
components/niche-hero.tsx
components/pain-points-section.tsx
components/ui/aurora.tsx
```

- [ ] **Step 1: Delete old component files**

```bash
cd /Users/husamahmed/FN3/fn3-main && \
  rm -f components/hero-section.tsx \
        components/hero-section-pro.tsx \
        components/navigation.tsx \
        components/navigation-pro.tsx \
        components/portfolio-section.tsx \
        components/portfolio-section-pro.tsx \
        components/architecture-section.tsx \
        components/architecture-section-pro.tsx \
        components/niche-hero.tsx \
        components/pain-points-section.tsx \
        components/ui/aurora.tsx
```

- [ ] **Step 2: Full build to verify no broken imports**

```bash
cd /Users/husamahmed/FN3/fn3-main && npm run build
```

Expected: Build succeeds with no errors. If there are import errors, the old components are still referenced somewhere — find and fix before proceeding.

- [ ] **Step 3: Typecheck**

```bash
cd /Users/husamahmed/FN3/fn3-main && npm run typecheck
```

Expected: Zero errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove all legacy components replaced by FN3 revamp"
```

---

## Task 13: Final Polish — Responsive + Cross-Browser

- [ ] **Step 1: Test all 5 pages at mobile viewport (375px)**

In browser dev tools, set viewport to 375px and walk through:
- Homepage: hero text readable, identity strip stacks to 1 col, numbers strip wraps to 2×2, chapter entry rows readable
- What We Are: philosophy stacks, reference models stacks to 2 cols, principles 1 col
- What We've Built: venture rows stack to single column, status dots visible
- How We Work: capabilities stack, process steps 2×2
- Work With Us: contact section readable, email link doesn't overflow

Fix any layout issues found using responsive Tailwind prefixes (`sm:`, `lg:`).

- [ ] **Step 2: Test mobile nav**

On mobile: open menu → verify all links show → tap a link → verify menu closes → verify page navigates.

- [ ] **Step 3: Test count-up animation**

Scroll to Numbers Strip — numbers should count from 0 upward. Verify `24/7` does not count (appears with fade only).

- [ ] **Step 4: Test all internal links**

Click every chapter entry row → lands on correct page. Back to Home link on chapter pages → returns to `/`.

- [ ] **Step 5: Final build**

```bash
cd /Users/husamahmed/FN3/fn3-main && npm run build
```

Expected: Build succeeds, no warnings about missing images or broken routes.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "polish: responsive fixes and final cross-page QA"
```

---

## Done

All 5 pages built. Run `npm run dev` and verify the full site at `http://localhost:3000`.

The visual reference mockups are at:
- `fn3-main/../.superpowers/brainstorm/43598-1773794837/homepage-v2.html`
- `fn3-main/../.superpowers/brainstorm/43598-1773794837/chapter-pages.html`

Open these in a browser alongside the live site to compare.
