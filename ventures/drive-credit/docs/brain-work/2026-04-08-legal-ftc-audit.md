# Mintbrooks — Legal: FTC Disclosure Compliance Audit
**Date:** 2026-04-08 | **Agent:** General Counsel

---

## Scope
Pre-viral audit of FTC and CFPB compliance before social channels generate meaningful traffic.

## Findings

### ✅ What's in Place
- Footer disclosure on all pages: "Affiliate Disclosure: Mintbrooks earns a commission..."
- No "guaranteed approval" language found (previous QA confirmed)
- No specific APR claims without sourcing
- Yendo described as Visa credit card (accurate)
- "Not available in all states" qualifier present on qualify page

### ⚠️ Gaps That Need Fixing Before Traffic Spike

**1. Disclosure proximity to CTAs (P0)**
FTC guidelines (2023 update) require disclosures to be "clear and conspicuous" and placed near the trigger — not just in the footer. Each primary affiliate CTA button needs a short inline disclaimer.

Fix: Add `"Mintbrooks earns a referral fee if you apply."` directly below every Yendo CTA button.
Impact: 10 minutes of dev time. Ships next cycle.

**2. Social media disclosures in video captions (P0)**
TikTok and Instagram captions must include #ad, #sponsored, or an explicit disclosure if Mintbrooks earns a commission from the featured product.

Fix: Add `#ad` or "I earn a commission if you apply" to all video captions.
Current captions in posting packages: MISSING this disclosure.
Action: Update all video caption templates to include "#ad" in the hashtag block.

**3. Car equity claims — accuracy check**
We state limits "up to $10,000." This is accurate per Yendo's published terms. ✅
We state "no minimum credit score." Accurate — Yendo's eligibility is car-value based. ✅
We state "soft pull." Accurate — eligibility check is soft, full application may be hard. ✅

**4. "Keeps driving" language**
We say "you keep driving your car normally." This is accurate — Yendo places a lien but does not take possession. ✅

### 🔴 Critical: Reddit FTC Requirement
Per FTC guidelines, paid/affiliate promoters must disclose material connections when posting in online forums. Husam must include disclosure in Reddit posts when mentioning Mintbrooks.

Required language (already in Reddit templates):
`"I should disclose I run Mintbrooks, a comparison site in this space"`

This is already in our Reddit templates. ✅

---

## Summary Action Items

| Priority | Item | Owner | Effort |
|----------|------|-------|--------|
| P0 | Add inline FTC disclosure below every CTA button | Dev | 10 min |
| P0 | Add #ad to all video caption templates | Marketing | 5 min |
| P1 | Verify "soft pull" claim against current Yendo terms | Husam | 5 min |
| P2 | Add CFPB link to FAQ page ("For free credit counseling...") | Dev | 5 min |

---

## Risk Level: LOW if P0 items fixed before viral traffic
Once P0 items are implemented, the site is FTC-compliant for the current traffic level and content type.
