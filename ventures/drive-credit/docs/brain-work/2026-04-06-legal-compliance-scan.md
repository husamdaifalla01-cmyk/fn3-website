# Mintbrooks Legal — Compliance Scan (15:30 Cycle)

**Prepared by:** General Counsel  
**Date:** 2026-04-06

---

## CAN-SPAM Compliance — VERIFIED ✅

All 3 Resend email sequences include:
- ✅ Physical address (651 N Broad St, Suite 201, Middletown, DE 19709)
- ✅ Advertising disclosure ("Advertising Disclosure: Mintbrooks may receive compensation...")
- ✅ Unsubscribe link (mintbrooks.com/unsubscribe?email=...)
- ✅ Sender identification (Mintbrooks <support@mintbrooks.com>)
- ✅ No deceptive subject lines — all honest, relevant to content

**Risk:** LOW

---

## FTC Affiliate Disclosure — /secured-credit-card-bad-credit Audit

New page shipped today. Compliance check:
- ✅ Affiliate disclosure at page footer (before affiliate CTAs in page flow)
- ✅ "Mintbrooks may earn a commission when you apply through our links at no extra cost to you."
- ✅ "We are not a lender, bank, or credit card issuer."
- ⚠️ Disclosure appears at BOTTOM of page — should also appear near FIRST affiliate link (hero CTA)

**Recommendation:** Add a 1-line disclosure note near the hero CTA on all pages. Current pattern only has footer disclosure. FTC guidance requires disclosure near (before or adjacent to) the first material claim.

**Fix (next dev session):** Add `<p className="text-stone-500 text-xs mt-2">Affiliate disclosure: we may earn a commission. Not a lender.</p>` below hero CTA buttons on all money pages.

---

## TikTok/IG Social Disclosure — STATUS NEEDED

Current social accounts: @mintbrookscredit
Content status: 0 videos posted (never tested compliance)

**Required disclosures before posting:**
- ✅ Caption must include "#ad" or "#affiliate" in first 3 lines
- ✅ On-screen text must state "Ad" or "Sponsored"
- Caption guide (written today) includes "#affiliate #ad" at end of caption — CONFIRM this is in the first 3 visible lines when caption is collapsed on TikTok

**Action needed:** When posting tonight, verify "#affiliate #ad" appears before TikTok truncates the caption (≈ 80 characters). The current caption guides have it at the END — move it to line 2 or 3 for safety.

---

## MaxBounty Partnership — Terms Review

MaxBounty requires:
- ✅ No guaranteed approval language — our content uses "may qualify," "check eligibility"
- ✅ No misleading claims about credit scores
- ✅ Disclosure of affiliate relationship
- ⚠️ Need to verify MaxBounty TOS for TikTok affiliate promotion (some networks restrict social)

**Action:** Review MaxBounty publisher agreement for social media promotion terms before first TikTok post.

---

## Overall Legal Risk Score: LOW-MEDIUM
- Main risk: FTC disclosure placement (hero area) — LOW effort to fix
- MaxBounty TOS for social — needs 10-min review
- CAN-SPAM: COMPLIANT

