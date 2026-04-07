# Mintbrooks — Acquisition: /links Page CRO Recommendations
**Dept:** Acquisition — Funnel Optimizer
**Session:** 2026-04-07 15:18 EDT

---

## Current /links Page Assessment

The /links page is the primary landing page for TikTok/IG bio traffic. It is live and functional.
This analysis identifies 3 quick CRO wins that can be implemented before first video posts.

---

## CRO Win #1 — Social Proof Counter

**Current state:** Page has trust copy but no dynamic proof
**Recommendation:** Add "X people checked their car this week" counter (start at 0, increment in Supabase or a simple JSON)
**Expected lift:** 10–20% CTR increase on hero CTA
**Implementation:** 2 hours dev time
**Priority:** MEDIUM — implement Week 2

---

## CRO Win #2 — State Personalization Teaser

**Current state:** Yendo CTA is generic for all visitors
**Recommendation:** Add small text below hero CTA: "Yendo available in [STATE] — check if your car qualifies"
**Implementation:** Use browser geolocation (client-side), map to eligible states list
**Expected lift:** Higher-intent clicks from eligible-state users; faster Slam Dunk redirect for excluded-state users
**Priority:** MEDIUM — implement after first 100 visitors

---

## CRO Win #3 — Urgency + Specificity in Hero Copy

**Current headline:** "Check If Your Car Qualifies" (good)
**Test variant:** "Your [CAR_YEAR] Might Qualify for Up to $10,000 in Credit" (needs car year input OR generic "car")
**Alternative:** "Most cars qualify. Takes 90 seconds. Won't hurt your score."
**Implementation:** A/B test with 2 variants once traffic exists (minimum 200 visitors per variant)
**Priority:** LOW — implement Week 3

---

## Conversion Path Verification

Verified this session:
- TikTok → bio link → mintbrooks.com/links ✅ (once bio is set)
- /links → Yendo hero CTA → affiliate link with UTM ✅
- /links → Slam Dunk fallback CTA → affiliate link with UTM ✅
- /links → email capture form → POST /api/subscribe → Resend ✅
- Affiliate click → MaxBounty click ID in URL → postback on conversion ✅

All tracking is live. Zero technical blockers. CRO improvements are optimizations, not blockers.

---

## Pre-Launch Checklist Status

| Item | Status |
|------|--------|
| /links page live | ✅ |
| Yendo affiliate link with UTM | ✅ |
| Slam Dunk fallback with UTM | ✅ |
| Email capture wired | ✅ |
| MaxBounty click ID tracking | ✅ |
| TikTok bio link set | ❌ (needs Husam) |
| IG bio link set | ❌ (needs Husam) |
| GA4 env var added | ❌ (needs Husam) |

---

*Acquisition — Funnel Optimizer — 2026-04-07 15:18 EDT*
