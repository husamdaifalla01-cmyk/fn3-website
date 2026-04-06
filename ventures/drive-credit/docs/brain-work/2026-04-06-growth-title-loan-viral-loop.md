# Growth — Viral Loop Design: Title Loan Audience
**Agent:** Growth Lead (Sean Ellis lens)
**Date:** 2026-04-06 12:00

---

## Insight: Title Loan Searchers Are High-Advocacy Users

People who almost got a title loan and found a better option are COMPELLED to share it:
- They feel relieved + grateful
- They know friends/family in the same situation
- "I almost made a huge mistake" is inherently shareable

### Viral Loop Design

```
TikTok (Hook 3/5: "About to get a title loan?")
  → mintbrooks.com/car-title-loan-alternative
    → Apply via Yendo (we earn $112.50)
      → Yendo approval email → card ships
        → User shares "I got a credit card using my car!" on social
          → Friends see → search mintbrooks → new loop starts
```

**Estimated k-factor:** Each satisfied Yendo customer tells 0.3–0.5 friends. With 100 conversions, that's 30–50 organic referrals.

### Amplification Experiment: Thank You Share Prompt

After the /qualify quiz shows "You Qualify!" — add a share prompt:

**Copy:**
> "Nice! Before you head to Yendo, share this with someone who might need it — especially anyone who's been rejected by banks or is considering a title loan."

**Share options:**
- Text message pre-written: "Found something better than a title loan for bad credit → mintbrooks.com"
- Twitter/X: "If you've been rejected by banks and own a car, look into car-secured credit cards. Built my credit, no title loan needed. [link]"

**Implementation:** Add to /qualify page after result-yes state. Pure client-side share buttons — no backend needed.

---

## Week 2 Growth Experiment: Comment Strategy on Title Loan Content

**Hypothesis:** Commenting on popular TikTok videos about title loans with a helpful redirect will drive organic traffic.

**Target content:** TikTok videos with 10k+ views tagged #titleloan, #titleloans, #cashtitleloan

**Comment script:**
> "Genuine question — have you looked into car-secured credit cards? Completely different product — you keep your title, lower APR, builds credit. Not for everyone but might be worth checking. I write about this at mintbrooks.com"

**FTC note:** Include "affiliate site" disclosure when linking.

**Tracking:** Use UTM params: mintbrooks.com?utm_source=tiktok_comment&utm_campaign=title-loan-intercept

---

## Referral Program Trigger

When we hit 10 Yendo conversions, launch:
- "Refer a friend who owns a car and has bad credit → both get a guide to maximizing car equity credit"
- No cash cost — deliver via email, collect referral info
- Simple form: mintbrooks.com/refer?via=[email]

**Metrics:** Track referral emails → Yendo clicks → conversions. If referral CVR > 15%, scale with incentive.
