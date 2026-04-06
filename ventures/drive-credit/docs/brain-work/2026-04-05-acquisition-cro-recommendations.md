# Mintbrooks — Landing Page CRO Recommendations
**Date:** 2026-04-05 | **Author:** Funnel Optimizer

## Conversion Audit: /links Page (Primary Bio Link Destination)

The /links page is the first page most TikTok visitors will see. This is the highest-leverage conversion point.

### Current Funnel
TikTok → bio link → mintbrooks.com/links → Yendo CTA → conversion

### Friction Points to Fix

**1. Social proof is missing**
TikTok viewers are skeptical. Before clicking an affiliate link, they need to see that this is real.
- **Fix:** Add "Join X people who checked their eligibility" counter (even if X=0 at launch, add the counter now — it will show real numbers within days)
- **Fix:** Add 1-2 real Yendo review quotes (pull from Trustpilot or Reddit, cite the source)

**2. The hero CTA could be more specific**
"Check My Car's Eligibility" is good. But adding urgency and specificity improves conversion.
- **Current:** "Check My Car's Eligibility →"
- **Test:** "See My Car's Credit Limit (Free, 30 Sec) →"

**3. No "state check" feature**
Visitors from non-Yendo states will bounce. Give them something.
- **Fix:** Add "Is Yendo available in your state?" accordion showing the 36+ states
- **If not available:** Show the Slam Dunk Loans CTA instead

**4. Mobile load time**
The links page has an ambient glow with a 600px wide radial gradient div.
On slower connections, this could delay LCP (Largest Contentful Paint).
- **Fix:** Lazy-load the glow div, or convert to CSS-only (no JS) gradient

### A/B Test Plan (Post-Launch)

Once first 100 visitors arrive via TikTok:

**Test A: CTA button copy**
- Control: "Check My Car's Eligibility →"
- Variant: "See My Car's Credit Limit →"
- Success metric: Click-through to Yendo

**Test B: Social proof placement**
- Control: Reviews section below CTA
- Variant: Single quote above CTA ("I was rejected 3 times. This actually worked." — Reddit user)
- Success metric: Time on page + CTA click rate

**Test C: Urgency element**
- Control: No urgency
- Variant: "Offer available in your state: [State]. Check now →"
- Success metric: Conversion rate from /links → Yendo

### Revenue Math at 1% CVR Improvement
At 1,000 monthly visitors × 5% CTA click rate = 50 Yendo visits
If CRO improves CTA click rate from 5% → 6%: +10 extra Yendo visits/month × 5% conversion = +0.5 leads/month × $112.50 = +$56.25/month
Compounding: worth 3-4 hours of optimization work once traffic arrives.

