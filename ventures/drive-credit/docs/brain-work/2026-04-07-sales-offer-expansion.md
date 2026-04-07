# Mintbrooks — Affiliate Offer Expansion Memo
**Date:** 2026-04-07  
**Author:** Sales Director

---

## Current Stack

| Offer | CPL | Status |
|-------|-----|--------|
| Yendo Car-Secured Visa | $112.50 | LIVE — primary |
| Slam Dunk Loans | $9.00 | LIVE — fallback |

## Gap Analysis

**Problem:** 14 states are Yendo-excluded. These visitors see our content, click the CTA, and
immediately hit "not available in your state." We lose them with zero monetization.

**Excluded state traffic estimate (once organic starts):** ~14/37 × visitors ≈ 28% of traffic
At 500 visits/week, that's ~140 visitors/week with no revenue path.

---

## Immediate Additions (Apply This Week)

### 1. OpenSky Secured Visa — FlexOffers
- CPL: $15–25
- Fit: EXCELLENT — no credit check, $200 deposit, accepts all states
- Why now: Primary fallback for excluded-state visitors + visitors who don't own cars
- Action: Apply at FlexOffers.com → search "OpenSky Secured Visa"

### 2. Credit Sesame — MaxBounty or CJ
- CPL: $12–20 (free tier) / $25–40 (premium)
- Fit: EXCELLENT — "Check your credit score free" CTA converts at very high rate
- Why now: Zero friction. "Free credit check" = entry point for users who don't know their score
- Action: Check MaxBounty dashboard for Credit Sesame offer

### 3. Chime Credit Builder — Impact
- CPL: $15–30
- Fit: EXCELLENT — no deposit, no minimum credit score, needs direct deposit
- Why now: Differentiates from cash-deposit secured cards. "No deposit, no annual fee"
- Action: Apply at impact.com → Chime partner program

---

## Implementation Plan (Once Approved)

**Phase 1 — Excluded state redirect:**
1. Detect state from IP or user input (already have state detection in /qualify)
2. For excluded states: show OpenSky + Chime + Credit Sesame instead of Yendo
3. Add dedicated /excluded-states page with alternatives

**Phase 2 — Offer waterfall on /qualify:**
```
User checks eligibility →
  If qualifies for Yendo: show Yendo ($112.50)
  If excluded state: show OpenSky + Chime ($15–30 each)
  If no car: show Credit Sesame + OpenSky ($12–25)
```

**Revenue impact estimate:**
- Current: 28% of visitors = $0
- Post-expansion: 28% × $15 avg CPL × 5% conversion = $X
- At 500 visits/week: ~140 excluded × 5% CVR × $15 = $105/week incremental

---

## Next Action

1. Apply to OpenSky on FlexOffers (1 business day approval)
2. Check MaxBounty for Credit Sesame activation
3. File DEV task: build excluded-state offer fallback on /qualify

