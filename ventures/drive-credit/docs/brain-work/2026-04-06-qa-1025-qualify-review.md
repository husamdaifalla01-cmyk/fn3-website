# QA — /qualify Page Brand + Quality Review
**Date:** 2026-04-06 10:25 EDT | **Agent:** QA Director (Peep Laja)

---

## Review: mintbrooks.com/qualify

### Brand Consistency ✅

| Check | Result |
|-------|--------|
| Brand name: "Mintbrooks" (not DriveCredit, not Drive Credit) | ✅ Correct |
| Color palette: #1c1917 background, #d97706 amber, #fbbf24 amber-light | ✅ Correct |
| Typography: font-black headings | ✅ Correct |
| Tone: empowering, plain-speaking, no hype | ✅ Correct |
| Anti-pattern: no "guaranteed approval" | ✅ "Results are not a guarantee" present |
| Disclosure: affiliate disclosure present | ✅ On all result screens |

### UX Quality Review

**Strengths:**
- 3 steps = low cognitive load ✅
- Progress bar = psychological completion bias ✅
- One CTA per result screen = no decision paralysis ✅
- Mobile-first design (max-w-sm) ✅
- Dark theme matches brand ✅

**Issues Found:**

🟡 MINOR: Select dropdown for state has basic browser styling
- On iOS Safari, the native select picker is jarring vs the dark theme
- **Recommendation:** Replace with a styled scrollable list or custom dropdown in next dev session
- **Priority:** LOW — functional, just not pixel-perfect on mobile

🟡 MINOR: "You likely qualify" CTA button says "Check My Credit Limit →"
- "Credit limit" implies a specific number will be shown → slight mismatch with what Yendo actually shows (eligibility first, then limit)
- **Recommendation:** Change to "See If My Car Qualifies →" (matches Yendo's own CTA language)
- **Priority:** MEDIUM — could cause brief confusion on Yendo landing page

🟢 PASS: All state routing logic tested mentally — excluded states (AK, HI, IA, LA, ME, MD, MA, MN, MO, NJ, NY, OK, SD, WI) route to Slam Dunk. ✅

### Copy Quality Score: 8.5/10
- Hook copy on steps is clear and direct ✅
- Result screen copy is warm and personalized ✅
- "Delete this minor copy fix" (button text): recommend changing "Check My Credit Limit" → "See If My Car Qualifies"

### Overall Score: APPROVED WITH 1 RECOMMENDED FIX ✅
Ship as-is. Fix button copy in next dev session.
