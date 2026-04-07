# ACQUISITION: Bio Link + UTM Optimization Spec
**Agent:** Acquisition Director
**Date:** 2026-04-07 12:16 EDT

---

## Current State

Bio link: NOT SET on either platform
Correct target: `mintbrooks.com/qualify`

**This is a revenue blocker.** Every video posted without the bio link set is dead traffic.

---

## Bio Link Setup (5 Minutes)

### TikTok
Profile → Edit Profile → Website:
```
https://mintbrooks.com/qualify
```

### Instagram
Profile → Edit Profile → Website:
```
https://mintbrooks.com/qualify
```

### Bio copy (TikTok):
```
Car owner with bad credit? Your car = your credit limit 🚗
Check if you qualify → link below ↓
```

### Bio copy (Instagram):
```
🚗 Use your car to build credit — no deposit
✅ Bad credit welcome
👇 Check if you qualify
```

---

## UTM Attribution Plan

When analytics are live, create platform-specific variants for tracking:

| Source | URL |
|--------|-----|
| TikTok organic | mintbrooks.com/qualify?utm_source=tiktok&utm_medium=social&utm_campaign=bio |
| IG organic | mintbrooks.com/qualify?utm_source=instagram&utm_medium=social&utm_campaign=bio |
| IG story | mintbrooks.com/qualify?utm_source=instagram&utm_medium=story&utm_campaign=bio |

**Note:** Raw bio link is fine to start. Add UTMs in week 2 once Plausible confirms tracking is working.

---

## Funnel Metrics to Watch (Week 2)

Once videos post and bio link is set:

| Metric | Tool | Target |
|--------|------|--------|
| TikTok profile visits | TikTok analytics | >5% of video views |
| Bio link clicks | TikTok analytics | >10% of profile visits |
| /qualify sessions | Plausible | >20/week after first video |
| /qualify → Yendo click | Plausible | >10% CVR |
| Yendo → Slam Dunk ratio | Plausible | <20% fallback rate |

**Key insight:** If /qualify CVR is below 5%, redesign the quiz (copy issue). If bio click-through is below 10% of profile visits, improve bio copy.

---

## A/B Test Plan (Week 3, if traffic exists)

Test 1: Bio CTA text
- Variant A: "Check if your car qualifies →"
- Variant B: "Get your limit in 2 minutes →"

Test 2: /qualify hero message
- Variant A: Current ("Does your car qualify?")
- Variant B: "Most car owners get $1,000+"

**Track via Plausible goals. Minimum 50 sessions per variant before declaring winner.**
