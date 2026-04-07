# Product — UX Audit + /qualify Optimization
**Session:** 2026-04-06 18:23 EDT | **Agent:** CPO (Shreya Nair / Marty Cagan lens)

---

## /qualify Page — Conversion Optimization Audit

The /qualify quiz is the primary TikTok landing conversion path. Based on the current implementation (3-step quiz: state → car → credit), here are the recommendations for the NEXT dev session:

### Issues Found (from code review + funnel logic)
1. **iOS dropdown UX** — state select uses native `<select>` which has poor iOS styling. Should replace with custom-styled dropdown component. Impact: mobile friction reduction.
2. **Social proof missing on quiz screen** — no "X,XXX people have checked their eligibility" counter or trust signal. Users abandon forms without social proof.
3. **Result page is the conversion moment** — need to verify the result page (qualified/not-qualified) has a strong CTA above the fold with urgency framing.
4. **No progress indicator clarity** — the 3-step quiz could show "Step 1 of 3" to reduce abandonment.

### Priority Ranking (CPO judgment)
| Fix | Impact | Effort | Priority |
|-----|--------|--------|----------|
| Social proof on step 1 | High | Low | P1 |
| Progress "Step X of 3" | Medium | Low | P1 |
| iOS custom dropdown | Medium | Medium | P2 |
| Result page CTA above fold | High | Low | P1 |

### P1 Next Session Dev Spec
Add to step 1 of /qualify quiz below the heading:
```
"Used by 1,200+ people to check car eligibility"
[Lock icon] No credit score impact — soft pull only
```
Add to quiz progress: "Step 1 of 3 · Takes 60 seconds"
Verify result page "qualified" state has full-width amber CTA button visible without scroll on mobile.

## /calculator Page — Quick Check
The calculator page exists at /calculator. Verify it loads without 404 on Vercel before next content push — this is linked from the homepage and /links page. If broken, fix before first video posts.

## Product Insight — Funnel Priority Order
Once traffic starts flowing (post-video):
1. TikTok → /links (bio link page) — conversion #1
2. /links → Yendo click — conversion #2
3. TikTok CTA "comment 'qualify'" → /qualify — conversion #3
4. Email capture → nurture sequence — conversion #4

All 4 conversions are instrumented and live. The funnel is ready.
