# Niche Selector Section — Design Spec

## Summary

Add a "By Vertical" section to the **How We Work** page (`app/how-we-work/page.tsx`) positioned after `<EngagementProcess />` and before `<Footer />`. The section lets prospects self-identify their industry vertical, see what FN3 agents do in that vertical, and link through to the full niche page or to Work With Us.

This is a fully client-side, self-contained component. No server-side data fetching — all agent feed data is static/simulated.

---

## Goals

- Give industry-specific visitors a proof of capability moment inside How We Work
- Show agents running in their context — not generic capabilities
- Drive two CTAs: primary to `/work-with-us`, secondary to the niche's own page (`/dental`, `/wealth`, etc.)

---

## Non-Goals

- Not a replacement for the programmatic niche pages — those still exist and are the deep-dive destination
- Not a homepage section
- No real-time data — agent feed is simulated/animated

---

## Component

**File:** `components/how-we-work/niche-selector.tsx`

**Export:** Named export `NicheSelector` (consistent with all other how-we-work components).

Directive: `'use client'` — uses `useState`, `useEffect`, `useRef`, Framer Motion `AnimatePresence` + `motion`.

Imports `niches` array from `lib/niches.ts`.

---

## Types

```ts
interface AgentEntry {
  id: number      // unique incrementing id for React key stability
  agent: string   // e.g. 'scheduler'
  task: string    // e.g. 'optimized 22 appointment slots'
  ms: string      // e.g. '340ms'
}
```

AGENT_POOLS type:
```ts
const AGENT_POOLS: Record<string, Omit<AgentEntry, 'id'>[]> = { ... }
```
When rendering, assign incrementing `id` via a `useRef` counter (same pattern as `idRef` in `components/home/hero.tsx` `LiveOpsFeed`).

---

## Layout

```
bg-white | px-6 lg:px-12 | py-20
──────────────────────────────────

Inner wrapper: max-w-[1400px] mx-auto  (consistent with all sibling sections)

Section header (FadeInSection):
  label-mono "By Vertical"
  h2 font-display text-[clamp(28px,3vw,44px)] text-[#1c1917] leading-none tracking-tight mt-4
    "The system, in your context."

Content grid (mt-14): grid-cols-1 lg:grid-cols-[200px_1fr] gap-12
```

### Left Sidebar — Desktop (`lg:` only via hidden/flex)

Stack of 5 tab buttons, one per niche:

```tsx
<button
  className={activeId === niche.id
    ? 'border-l-2 border-fn3-red text-[#1c1917] font-semibold pl-4 label-mono text-left w-full py-2'
    : 'pl-[18px] label-mono text-[#9ca3af] hover:text-[#78716c] text-left w-full py-2 transition-colors duration-150'
  }
>
  {niche.name === 'TRADES/AUTO' ? 'TRADES' : niche.name}
</button>
```

Display name rule: if `niche.name === 'TRADES/AUTO'` render `'TRADES'` in all UI contexts (tab label, CTA copy) to avoid the literal `/` rendering issue.

### Mobile Tab Row

On mobile (`lg:hidden`), render tabs as a horizontal scrolling chip row above the content area:

```
flex flex-nowrap gap-3 overflow-x-auto pb-2 mb-8
```

Each chip:
- inactive: `font-mono text-[11px] uppercase tracking-[0.1em] px-4 py-2 border border-fn3-red-faint text-[#9ca3af]`
- active: same + `border-fn3-red text-fn3-red`

No `border-l-2` indicator on mobile — active state shown by border colour change only.

---

## Right Content Area

```
AnimatePresence mode="wait"
  motion.div
    key={activeNiche.id}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.35 }}
```

Content grid inside: `grid grid-cols-1 lg:grid-cols-2 gap-10`

### Left Column — Agent Feed

```
label-mono text-fn3-red-light mb-4  →  "Agent Activity"

div h-[300px] overflow-hidden relative

  {entries.map((entry, i) => (
    <motion.div
      key={entry.id}
      initial={{ opacity: 0, x: -4 }}
      animate={{
        opacity: i === entries.length - 1
          ? 1
          : 0.45 + (i / entries.length) * 0.55
      }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-[96px_1fr_44px] gap-3 items-baseline py-3 border-b border-fn3-red-faint"
    >
      <span className="label-mono text-fn3-red-light truncate">{entry.agent}</span>
      <span className="text-[13px] text-[#1c1917] leading-snug truncate">{entry.task}</span>
      <span className="font-mono text-[11px] text-[#9ca3af] text-right">{entry.ms}</span>
    </motion.div>
  ))}
```

Opacity formula (exact, from `components/home/hero.tsx` `LiveOpsFeed`):
```
i === entries.length - 1 ? 1 : 0.45 + (i / entries.length) * 0.55
```

### Right Column — Metrics

```
label-mono text-fn3-red-light mb-6  →  "Outcomes"

{niche.metrics.map((metric, i) => (
  <div className={`py-6 ${i < niche.metrics.length - 1 ? 'border-b border-fn3-red-faint' : ''}`}>
    <p className="font-serif text-[52px] text-fn3-red leading-none">{metric.value}</p>
    <p className="text-[15px] font-semibold text-[#1c1917] mt-2">{metric.label}</p>
    <p className="text-[13px] text-[#78716c] mt-1 leading-[1.6]">{metric.description}</p>
  </div>
))}
```

### CTA Row (below two-column grid, mt-10)

```
<p className="label-mono text-[#9ca3af]">{activeNiche.tagline}</p>

<div className="mt-5 flex flex-wrap gap-5">
  <Link
    href="/work-with-us"
    className="inline-block bg-fn3-red text-white font-mono text-[11px] uppercase tracking-[0.1em] font-bold px-6 py-3.5 hover:bg-fn3-red/90 transition-colors duration-150"
  >
    Deploy for {displayName} →
  </Link>
  <Link
    href={`/${activeNiche.id}`}
    className="inline-block font-mono text-[11px] uppercase tracking-[0.1em] text-[#1c1917] border-b border-[#1c1917]/30 hover:border-[#1c1917] pb-px transition-colors duration-150"
  >
    See the full {displayName} stack →
  </Link>
</div>
```

Where `displayName = activeNiche.name === 'TRADES/AUTO' ? 'TRADES' : activeNiche.name`.

---

## Interval / State Management

Uses three refs (same pattern as hero `LiveOpsFeed`):
- `intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)`
- `poolIndexRef = useRef(0)` — per-niche current position in AGENT_POOLS
- `idRef = useRef(0)` — global incrementing entry id

On tab switch:
1. Clear `intervalRef.current` if set
2. Reset `poolIndexRef.current = 0`
3. Set initial entries (first 5 from new niche's pool with assigned ids)
4. Start new interval (2000ms cadence)
5. Store new interval in `intervalRef.current`

On unmount: clear `intervalRef.current`.

Interval callback:
1. Get next entry from `AGENT_POOLS[activeId][poolIndexRef.current % pool.length]`
2. Increment `poolIndexRef.current`
3. Assign `id: idRef.current++`
4. Append to entries, trim to last 8: `prev.slice(-8)`

---

## Per-Niche Agent Pool Data

Static data defined in component file. 8 entries per niche, derived from `niche.solutions[]`.

```ts
const AGENT_POOLS: Record<string, Omit<AgentEntry, 'id'>[]> = {
  dental: [
    { agent: 'scheduler',  task: 'optimized 22 appointment slots',       ms: '340ms' },
    { agent: 'reminder',   task: 'dispatched 18 patient reminders',       ms: '210ms' },
    { agent: 'insurance',  task: 'verified 9 patient benefits',           ms: '1.1s'  },
    { agent: 'inventory',  task: 'reordered 4 supply items',              ms: '480ms' },
    { agent: 'analytics',  task: 'generated chair utilization report',    ms: '2.3s'  },
    { agent: 'scheduler',  task: 'filled 3 cancellation slots',           ms: '290ms' },
    { agent: 'reminder',   task: 'reduced no-shows by flagging 6 at-risk',ms: '560ms' },
    { agent: 'insurance',  task: 'pre-authorized 11 upcoming procedures', ms: '1.4s'  },
  ],
  wealth: [
    { agent: 'compliance', task: 'reviewed 14 client files',              ms: '1.8s'  },
    { agent: 'onboarding', task: 'processed 2 new client applications',   ms: '940ms' },
    { agent: 'portfolio',  task: 'rebalanced 38 accounts',                ms: '2.1s'  },
    { agent: 'risk',       task: 'flagged 3 concentration alerts',        ms: '610ms' },
    { agent: 'reporting',  task: 'compiled 6 quarterly statements',       ms: '1.6s'  },
    { agent: 'compliance', task: 'updated 12 regulatory checklists',      ms: '870ms' },
    { agent: 'onboarding', task: 'completed KYC on 1 client',             ms: '1.2s'  },
    { agent: 'portfolio',  task: 'triggered tax-loss harvest on 5 accounts', ms: '730ms'},
  ],
  law: [
    { agent: 'document',   task: 'reviewed 47 pages of contracts',        ms: '3.2s'  },
    { agent: 'billing',    task: 'captured 6.5 hours of time entries',    ms: '290ms' },
    { agent: 'intake',     task: 'processed 3 new matter requests',       ms: '410ms' },
    { agent: 'comms',      task: 'sent 11 client status updates',         ms: '190ms' },
    { agent: 'deadline',   task: 'flagged 2 upcoming court dates',        ms: '150ms' },
    { agent: 'document',   task: 'extracted key clauses from 8 NDAs',     ms: '2.7s'  },
    { agent: 'billing',    task: 'reconciled 3 disputed invoice lines',   ms: '380ms' },
    { agent: 'intake',     task: 'ran conflict check on 1 new matter',    ms: '220ms' },
  ],
  clinics: [
    { agent: 'triage',     task: 'pre-screened 24 incoming patients',     ms: '510ms' },
    { agent: 'scheduler',  task: 'optimized 3 provider schedules',        ms: '430ms' },
    { agent: 'insurance',  task: 'verified 16 patient eligibilities',     ms: '1.3s'  },
    { agent: 'staffing',   task: 'adjusted shift coverage for demand spike', ms: '760ms'},
    { agent: 'docs',       task: 'drafted 9 clinical encounter notes',    ms: '2.8s'  },
    { agent: 'triage',     task: 'routed 6 urgent cases to fast-track',   ms: '180ms' },
    { agent: 'insurance',  task: 'filed 7 prior authorizations',          ms: '1.1s'  },
    { agent: 'docs',       task: 'completed discharge summaries for 5 patients', ms: '1.9s'},
  ],
  trades: [
    { agent: 'inventory',  task: 'reordered 12 low-stock parts',          ms: '320ms' },
    { agent: 'scheduler',  task: 'optimized bay assignments for 8 jobs',  ms: '410ms' },
    { agent: 'estimator',  task: 'generated 4 job quotes',                ms: '890ms' },
    { agent: 'dispatch',   task: 'assigned 6 technicians to open jobs',   ms: '270ms' },
    { agent: 'comms',      task: 'sent 14 job status updates to customers', ms: '200ms'},
    { agent: 'inventory',  task: 'flagged 2 parts approaching lead time', ms: '150ms' },
    { agent: 'scheduler',  task: 'resolved 1 double-booked bay conflict', ms: '190ms' },
    { agent: 'estimator',  task: 'updated pricing on 28 service items',   ms: '540ms' },
  ],
}
```

---

## Page Integration

`app/how-we-work/page.tsx`:

```tsx
import { NicheSelector } from '@/components/how-we-work/niche-selector'

// After <EngagementProcess />, before <Footer />:
<NicheSelector />
```

---

## Design Tokens Used

- `bg-white` section background
- `border-fn3-red-faint` dividers
- `text-fn3-red` / `border-fn3-red` active tab + metric values + primary CTA bg
- `text-fn3-red-light` label-mono labels
- `text-[#1c1917]` body text
- `text-[#9ca3af]` inactive / muted text
- `font-display` section heading
- `label-mono` section + column labels
- `font-serif` large metric numbers
- `font-mono` CTA buttons

---

## Files Changed

| Action | File |
|--------|------|
| Create | `components/how-we-work/niche-selector.tsx` |
| Modify | `app/how-we-work/page.tsx` |
