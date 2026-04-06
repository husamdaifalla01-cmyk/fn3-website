# Legal — Compliance Status Audit
**Date:** 2026-04-06 | **Agent:** General Counsel

---

## FTC AFFILIATE DISCLOSURE — STATUS

### Web Pages
✅ Advertising disclosure in email footer (includes "earn commission" language)
✅ /links page — has affiliate disclosure
⚠️ **Individual guide pages** — verify all 11 pages have inline disclosure near first CTA
⚠️ **Homepage** — verify disclosure is visible above-the-fold or near hero CTA (not just footer)

### Social Media (once posting begins)
❌ TikTok videos: "#ad" must appear in caption within first 3 lines AND as on-screen text overlay
❌ IG Reels: "#ad" in caption first line AND use "Paid Partnership" tag if available
Note: All posting-copy.md captions now include #ad ✅

---

## CAN-SPAM COMPLIANCE — STATUS

Previous gaps (checked against current code):
✅ Unsubscribe link in email footer — present in `footerHtml()` → `/unsubscribe?email=`
✅ Physical mailing address — present: "651 N Broad St, Suite 201, Middletown, DE 19709"
✅ Advertising disclosure in email body
⚠️ Need to verify: Does Resend process unsubscribes within 10 days? (Resend's standard = immediate)

**CAN-SPAM Status: COMPLIANT** (assuming Resend processes unsubscribe immediately)

---

## STATE ADVERTISING RESTRICTIONS

Excluded states: AK, HI, IA, LA, ME, MD, MA, MN, MO, NJ, NY, OK, SD, WI

Required actions:
✅ Website says "Available in 36+ states" (not "nationwide")
⚠️ Future paid TikTok ads: Must geo-target to 37 eligible states + DC only
⚠️ Future paid IG ads: Same geo-restriction required

---

## FINANCIAL CLAIMS COMPLIANCE

Required disclaimers on content:
✅ "Not a lender" disclosed on /links and FAQ
✅ "Soft inquiry only to check" (not "no credit check")
✅ "Check if you qualify" language (not "guaranteed approval")
✅ "May earn commission" affiliate disclosure

⚠️ VIDEO CONTENT CHECK: Ensure no Remotion video scripts contain:
- "Guaranteed approval" → must say "check if you qualify"
- "No credit check" → must say "soft inquiry" or "no hard pull"
- Specific credit score claims for approval
- Any guaranteed credit limits

---

## RISK REGISTER

| Risk | Likelihood | Severity | Mitigation |
|------|-----------|----------|-----------|
| FTC action on undisclosed social posts | Medium | High | Add #ad to all captions (done in copy doc) |
| CAN-SPAM violation (unsubscribe) | Low | Medium | Resend handles automatically |
| State restriction violation in paid ads | Low (no paid ads yet) | High | Geo-lock when running paid campaigns |
| MaxBounty ToS violation | Low | High | Never incentivize applications, disclose affiliate |

---

## NEXT LEGAL ACTION
1. Audit homepage: is affiliate disclosure visible near hero CTA? (Not just footer)
2. Add inline disclosure to all guide pages if missing
