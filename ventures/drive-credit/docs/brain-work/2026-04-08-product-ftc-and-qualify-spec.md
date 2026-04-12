# Mintbrooks — Product: FTC Disclosure + /qualify Conversion Spec
**Date:** 2026-04-08 | **Agent:** Head of Product

---

## 1. FTC Disclosure — Implementation Spec

### Current state
- FTC disclosure exists in footer text on all pages
- Missing: disclosure NEAR hero CTAs (FTC requires "clear and conspicuous" = near the trigger)
- Risk: Low-severity, but if any posts go viral, this is the first thing compliance reviewers check

### Required change (10-min dev task)

Add this disclaimer line directly below every primary Yendo CTA button:

```tsx
<p className="text-stone-500 text-xs text-center mt-2">
  Mintbrooks earns a referral fee if you apply. No cost to you.
</p>
```

**Files to update:**
- `src/app/page.tsx` (homepage hero)
- `src/app/finance/qualify/page.tsx` (most important — this is the conversion page)
- `src/app/finance/links/page.tsx` (bio link landing)
- Any page with a hero-level Yendo affiliate CTA

### Priority: HIGH — ship before first traffic spike

---

## 2. /qualify Page — Conversion Optimization Spec

### Current state of /qualify
The /qualify page is the primary conversion destination for bio links and Reddit traffic.

### Spec: Add "What States Qualify?" inline FAQ (5-min dev task)

Place after the main CTA, before the footer:

```tsx
<details className="bg-stone-900 rounded-lg mt-4">
  <summary className="px-5 py-4 text-stone-300 text-sm cursor-pointer">
    Which states does Yendo operate in?
  </summary>
  <div className="px-5 pb-4">
    <p className="text-stone-400 text-sm mb-2">
      Yendo is available in approximately 35 states. States currently excluded include:
      California, Minnesota, Vermont, Iowa, Montana, and a few others.
    </p>
    <Link href="/finance/yendo-states-guide" className="text-amber-400 text-sm hover:underline">
      See the full state guide →
    </Link>
  </div>
</details>
```

**Why this matters:** Reddit readers will specifically ask about state availability. Addressing it inline reduces bounce from skepticism.

---

## 3. Product Backlog — Priority Stack

| Priority | Task | Effort | Impact |
|----------|------|--------|--------|
| P0 | FTC disclosure near CTAs | 10 min | Legal compliance |
| P0 | /qualify states FAQ inline | 5 min | Reduces bounce from excluded states |
| P1 | NEXT_PUBLIC_GA_ID in Vercel | 1 min | Analytics — blind without it |
| P1 | FlexOffers excluded-state waterfall | 2 hrs | Revenue from 40% of visitors currently at $0 |
| P2 | /qualify exit intent popup | 30 min | Email capture from qualified visitors |
| P3 | Video testimonial section on homepage | 1 hr | Social proof once traffic exists |

---

## Next Session
- Implement P0 FTC disclosure (quick dev task — include in next cycle)
- Verify /qualify on mobile after states FAQ added
- Check if FlexOffers application progressed
