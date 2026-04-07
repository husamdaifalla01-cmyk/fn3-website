# Acquisition — Landing Page CRO Audit + A/B Test Ideas
**Date:** 2026-04-06 19:25 EDT
**Agent:** Funnel Optimizer (CXL lens)

---

## Current Conversion Architecture

**Primary path:** TikTok → /qualify → result-yes → Yendo
**Secondary path:** TikTok → /links → Yendo (top CTA)
**SEO path:** Google → any SEO page → Yendo (via AffiliateLink components)

---

## Pre-Traffic CRO Hypothesis Bank

These can't be tested yet (need traffic), but we should document hypotheses now so we can run A/Bs in Week 3+.

### /qualify Page Tests

| Test | Hypothesis | Metric |
|------|-----------|--------|
| A/B1 | Progress bar vs no progress bar | Quiz completion rate |
| A/B2 | "83% qualify" vs "Join 2,400 checking" on result-yes | CTR to Yendo |
| A/B3 | Q3 framing: "credit situation" vs "which profile fits you" | Q3 completion |
| A/B4 | CTA copy: "See If My Car Qualifies" vs "Check My Limit Free" | CTR |
| A/B5 | Social proof strip: testimonial quotes vs stat-based | CTR to Yendo |

### /links Page Tests

| Test | Hypothesis | Metric |
|------|-----------|--------|
| A/B1 | Calculator placement: above vs below primary CTA | Yendo CTR vs bounce |
| A/B2 | Hero CTA color: amber vs green | CTR |

---

## TikTok-to-Site Optimization (Pre-Traffic Decisions)

1. **Bio link** should be `/qualify` — NOT `/links`. The quiz pre-qualifies intent and reduces bounce.
2. **Caption CTA** should be specific: "tap link in bio to check if your car qualifies" — not just "link in bio"
3. **Video hook** should prime the viewer for the quiz: "If you own a car, take this 30-second quiz" creates completion expectation

---

## UTM Tracking Structure (For When Traffic Arrives)

```
mintbrooks.com/qualify?utm_source=tiktok&utm_medium=social&utm_campaign=careqequitysecret&utm_content=v1
mintbrooks.com/qualify?utm_source=instagram&utm_medium=social&utm_campaign=careequitysecret&utm_content=reel
```

Set these as the bio links — Plausible will segment by UTM automatically.

