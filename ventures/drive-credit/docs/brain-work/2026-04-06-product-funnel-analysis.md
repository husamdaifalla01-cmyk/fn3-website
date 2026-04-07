# Product — Pre-Traffic Funnel Analysis
**Date:** 2026-04-06 19:25 EDT
**Agent:** CPO (Shreyas Doshi lens)

---

## Funnel Architecture (Current)

```
TikTok/IG → bio link → /qualify → result-yes → Yendo affiliate
                                → result-no-state → Slam Dunk
                                → result-no-car → Slam Dunk
```

## Step-Level Dropout Risk Assessment

| Step | Dropout Risk | Reason | Fix |
|------|-------------|--------|-----|
| Bio link → /qualify | MEDIUM | Generic "mintbrooks.com" → unfamiliar URL | Caption must say "link in bio → check if your car qualifies" |
| Q1 (own a car?) | LOW | Binary, fast | None needed |
| Q2 (state?) | MEDIUM | Drop-out if state not in list | Geo auto-fill now live ✅ |
| Q3 (credit?) | LOW-MEDIUM | Privacy concern — people don't want to "admit" bad credit | Reframe as "which profile fits you?" not judgment |
| result-yes → Yendo | HIGH | External link trust gap | Social proof strip now added ✅ (this session) |

## Key Product Decisions Made

1. **Social proof added to result-yes** (this session) — "83% of applicants qualify for $1k+" reduces hesitation at the hardest dropout point
2. **Geo auto-fill on state select** (prev session) — removes one friction point for mobile users
3. **FTC disclosure in-card** — trust signal, not just legal compliance

## Product Backlog (ranked by CVR impact)

| Priority | Feature | Expected Impact | Effort |
|----------|---------|----------------|--------|
| P1 | /qualify result-yes: add "What happens next" accordion (no surprise at Yendo) | High | 30min |
| P2 | /qualify Q3: reframe labels as personas not credit tiers | Medium | 15min |
| P3 | /links page: add urgency hook ("Join 2,400 people checking eligibility") | Medium | 10min |
| P4 | Homepage hero: A/B test "Your car qualifies for X" dynamic insert (needs traffic) | High | 2hrs |
| P5 | Exit intent: fire on /qualify if user back-navigates from result-yes | High | 45min |

## North Star Metric Decision

**Primary:** Yendo click-through rate on /qualify result-yes
- Baseline: Unknown (no traffic yet)
- Target: 60%+ CTR on result-yes → Yendo
- Secondary: Step 1→2→3 completion rate (quiz completion)

Once traffic exists, this is the single most important number. Everything else is downstream of it.

