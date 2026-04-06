# PRODUCT — Qualify Page Engagement Analysis + Improvement Spec
**Date:** 2026-04-06 13:56 EDT | **Agent:** Head of Product
**Venture:** Mintbrooks (DriveCredit)

---

## Current Qualify Page: What It Does
- 3-step quiz: (1) state check → (2) car ownership → (3) result page
- Result: Yendo CTA (eligible state + owns car) OR Slam Dunk fallback
- Route: /qualify — linked from TikTok bio (mintbrooks.com/links)

## Conversion Gap Analysis

### Problem 1: State dropdown creates friction
- User must find their state in a long list
- Drop-off likely at step 1
- Fix: Auto-detect state via IP geolocation (no interaction required)

**Spec:**
```typescript
// In qualify/page.tsx — add IP geolocation on mount
useEffect(() => {
  fetch('https://ipapi.co/json/')
    .then(r => r.json())
    .then(data => {
      if (data.region_code) setState(data.region_code)
    })
    .catch(() => {}) // silent fail — user selects manually
}, [])
```

### Problem 2: Result page has one CTA, no objection handling
- After "You Qualify!" — user clicks away without converting
- Missing: social proof, risk reversal ("soft pull only"), urgency

**Spec — Add below the CTA:**
- "✓ Soft pull — won't affect your credit score"
- "✓ 60 second eligibility check"
- "✓ 96,000+ applicants in 2025"
- FAQ accordion: 2 questions ("Will this hurt my score?" + "What if I still have a loan?")

### Problem 3: No /qualify success tracking
- No event fires when user reaches result step
- Plausible can't tell us quiz completion rate
- Fix: Fire `plausible('QualifyQuizComplete', {props: {result: 'yendo'}})` on result render

## Implementation Priority

| Fix | Effort | Revenue Impact | Priority |
|-----|--------|----------------|----------|
| IP geolocation autofill | 30 min | High (reduces step 1 drop) | P1 |
| Result page social proof | 1 hour | High (improves CTA CVR) | P1 |
| Analytics event | 15 min | Medium (visibility) | P2 |

## New Page Recommendation: /yendo-states-guide (SHIPPED this cycle)
- Built by Dev dept this cycle
- Intercepts "is yendo available in my state" search queries
- Provides Slam Dunk fallback for 14 excluded states
- Revenue from excluded states: currently $0 → potential $9 CPL per qualified lead

## North Star Update
- Phase: Pre-first-video (no denominator yet)
- Current North Star metric: Yendo clicks/day (absolute count)
- Target: 10/day by Apr 11
- Current: 0
