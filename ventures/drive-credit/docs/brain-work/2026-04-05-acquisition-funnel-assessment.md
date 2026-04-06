# Acquisition Funnel Bottleneck Assessment
## Funnel Optimizer: 2026-04-05

### Current Funnel
```
TikTok View → Bio Link Click → /links page → Yendo CTA Click → Yendo Application → Lead ($112.50)
```

### Bottleneck Analysis

| Stage | Status | Bottleneck? |
|-------|--------|------------|
| TikTok views | 0 — no content posted | 🔴 PRIMARY BOTTLENECK |
| Bio link CTR | Unknown — no data | Cannot assess |
| /links page → CTA click | Page exists, verified | Ready |
| CTA click → Yendo app | Tracking URLs configured | Ready |
| Yendo app → Lead | Out of our control | N/A |

### Verdict
The funnel is BUILT. The bottleneck is entirely at the top — zero content posted means zero views means zero clicks. No funnel optimization is meaningful until we have data.

### Pre-Launch Funnel Checklist
- [x] /links page live with Yendo CTA
- [x] UTMs configured per-placement
- [x] Plausible analytics tracking
- [x] Email capture popup (ExitIntentPopup)
- [x] Resend welcome email with Yendo CTA
- [ ] GA4 verified (check NEXT_PUBLIC_GA_ID in Vercel)
- [ ] TikTok bio link set to mintbrooks.com/links
- [ ] First video posted

### First 100 Visitors Plan
Once first videos go up, monitor:
1. TikTok → /links page traffic (Plausible)
2. /links → Yendo click-through rate (UTM tracking in MaxBounty)
3. Email capture rate (Resend dashboard)
4. Bounce rate on /links page

### Next Session
- Review first traffic data once content is posted
- If /links page bounce rate >80%, redesign above-the-fold
