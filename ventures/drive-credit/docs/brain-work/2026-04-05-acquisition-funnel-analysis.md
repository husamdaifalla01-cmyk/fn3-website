# Mintbrooks — Acquisition Funnel Pre-Launch Audit
**Date:** 2026-04-05
**Author:** Funnel Optimizer (Acquisition Dept)

## Current Funnel Architecture

```
TikTok Video (0 views) → Bio Link → /links page → Yendo CTA → Lead ($112.50)
                                    ↘ /calculator → Yendo CTA
                                    ↘ /guides → Inline CTA
                                    ↘ Exit Intent → Email → Nurture → Yendo CTA
```

## Pre-Launch Funnel Checklist

| Step | Element | Status | Issue |
|------|---------|--------|-------|
| 1 | TikTok bio link → mintbrooks.com/links | NOT SET | Bio link not configured yet |
| 2 | IG bio link → mintbrooks.com/links | NOT SET | Bio link not configured yet |
| 3 | /links page loads fast on mobile | LIVE ✅ | Needs mobile speed test |
| 4 | /links → Yendo CTA visible above fold | LIVE ✅ | — |
| 5 | /links → Email capture form | LIVE ✅ | ExitIntentPopup wired |
| 6 | Yendo link has UTM tracking | LIVE ✅ | buildAffiliateUrl() working |
| 7 | MaxBounty SubID tracking | LIVE ✅ | Click ID appended |
| 8 | /calculator → Yendo CTA | LIVE ✅ | — |
| 9 | Exit intent popup | LIVE ✅ | — |
| 10 | Email nurture → Yendo CTA | CODED ✅ | Not triggered until subscribers exist |
| 11 | GA4 tracking | YELLOW | Needs env var |
| 12 | Plausible tracking | LIVE ✅ | — |

## Critical Path Issues

### Issue 1: Bio Links Not Set (P0)
Neither TikTok nor IG bio currently links to mintbrooks.com/links. This means even if videos are posted, there's no path from viewer to site.
**Fix:** Set bio link on both accounts immediately when first video is posted.

### Issue 2: /links Page Mobile Experience
95%+ of TikTok traffic is mobile. The /links page MUST:
- Load in <2 seconds on 4G
- Have Yendo CTA visible without scrolling
- Have clear trust signals (FTC disclosure, "soft pull only")
- Track all clicks via analytics

### Issue 3: Excluded State Handling
14 states see only Slam Dunk ($9 CPL). No state-detection or alternative routing exists.
**Future fix:** See sales dept's excluded state plan.

## Projected Funnel Metrics (Week 1-4 Estimates)

| Metric | Conservative | Moderate | Optimistic |
|--------|-------------|----------|-----------|
| Video views (4 videos) | 2,000 | 8,000 | 25,000 |
| Profile clicks (3% CTR) | 60 | 240 | 750 |
| Bio link clicks (50%) | 30 | 120 | 375 |
| Site visits (80%) | 24 | 96 | 300 |
| Yendo CTA clicks (15%) | 4 | 14 | 45 |
| Leads (5% conversion) | 0 | 1 | 2 |
| Revenue | $0 | $112.50 | $225 |

**Key insight:** At conservative estimates, 4 videos won't generate meaningful revenue. Need 10+ videos to hit critical mass where the algorithm shows content to larger audiences.
