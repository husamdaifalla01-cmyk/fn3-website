# ACQUISITION — Funnel Baseline Report + Pre-Launch Checklist
**Date:** 2026-04-06 | **Agent:** Acquisition Director / Funnel Optimizer

---

## Funnel Architecture (Confirmed Live)

```
TikTok/IG Video
    ↓ "Link in bio"
mintbrooks.com/links  (bio link hub)
    ↓ Hero CTA click (tracked: affiliate_link_click)
Yendo.co/apply (MaxBounty affiliate link with click ID)
    ↓ Application + approval
MaxBounty CPA payout
```

**Secondary path (excluded states):**
```
TikTok → /links → "Personal Loan Alternative" → Slam Dunk ($9 CPL)
```

---

## Conversion Benchmarks (Industry)

| Stage | Benchmark | Our Target |
|-------|-----------|------------|
| TikTok view → profile visit | 1-3% | 2% |
| Profile visit → bio link click | 15-30% | 20% |
| /links visit → Yendo CTA click | 25-45% | 35% |
| Yendo click → application | 15-25% | 20% |
| Application → approval (Yendo) | ~40% | 40% |

**Blended projection (per 1,000 TikTok views):**
- Profile visits: 20
- /links visits: 4
- Yendo clicks: 1.4
- Applications: 0.28
- Approvals (CPA): 0.11
- Revenue at $50/approval: $5.60/1,000 views

**Breakeven content production cost:** ~25K views per video

---

## Pre-Launch Checklist Status

| Item | Status | Action |
|------|--------|--------|
| Site live | ✅ DONE | — |
| Affiliate links active | ✅ DONE | — |
| MaxBounty click tracking | ✅ DONE | — |
| Plausible analytics | ✅ DONE | — |
| Email capture | ✅ DONE | — |
| Unsubscribe flow | ✅ DONE | — |
| /links page optimized | ✅ DONE | — |
| GA4 env var | ⚠️ PENDING | Set NEXT_PUBLIC_GA_ID in Vercel |
| Bio link set on TikTok | ⚠️ PENDING | Husam: set to mintbrooks.com/links |
| Bio link set on IG | ⚠️ PENDING | Husam: same |
| First video posted | ❌ BLOCKED | Day 6 — zero posts |

**Pre-launch: 8/11 items complete. 3 require Husam action (total: ~15 min).**

---

## Week 2 A/B Tests (Planned)

### Test 1: CTA button copy on /links
- Control: "Check If You Qualify →"
- Variant: "See If Your Car Qualifies →"
- Metric: Yendo click-through rate
- Duration: 200 visits minimum

### Test 2: Hero image vs text-only on /links
- Control: Current (text + logo)
- Variant: Add car lifestyle image above CTA
- Metric: Same as Test 1

### Test 3: Email capture position
- Control: Below fold on /links
- Variant: Sticky bottom bar
- Metric: Email capture rate
- Duration: 500 visits minimum

---

## Plausible Goals to Configure

After first traffic, set up these custom goals in Plausible:
1. `affiliate_link_click` (already fired in analytics.ts)
2. `email_capture` (already fired)
3. `slam_dunk_click` (already fired)

**How:** Plausible dashboard → Goals → Add Goal → "Custom Event" → paste event name
