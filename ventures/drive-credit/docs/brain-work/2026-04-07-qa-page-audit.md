# QA: /first-credit-card-bad-credit Brand + FTC Audit
**Agent:** QA Director (Peep Laja lens)
**Date:** 2026-04-07 12:16 EDT

---

## Page Audited: /first-credit-card-bad-credit

### Brand Voice Scorecard

| Criteria | Score | Notes |
|----------|-------|-------|
| Tone: empowering, not hype | ✅ 10/10 | "Getting rejected hurts. But..." — empathy-first |
| Plain language (not jargon) | ✅ 9/10 | "Soft pull" defined, "utilization" explained |
| Honest limitations stated | ✅ 10/10 | State exclusion mentioned, repossession risk disclosed |
| No fear-mongering | ✅ 9/10 | Risk disclosed without catastrophizing |
| Anti-patterns (scam language) | ✅ 10/10 | "What to Avoid" section proactively warns |
| Mintbrooks tone: "we're on your side" | ✅ 10/10 | "Stop paying deposits" framing is user-advocate |

**Brand Voice Score: 9.7/10** ✅

### FTC Compliance Checklist

| Item | Status |
|------|--------|
| #ad disclosure in comparison table | ✅ |
| #ad disclosure in final CTA | ✅ |
| "Results not guaranteed" | ✅ |
| No guaranteed approval language | ✅ |
| No "no credit check" (uses "soft pull") | ✅ |
| No specific APR claims | ✅ |
| "Not financial advice" disclaimer | ⚠️ MISSING |

### Copy Quality Flags

1. **"Your car is already the collateral you need"** — slightly aggressive claim, but defensible since it's factual (car-secured model). Keep.

2. **"Most people with bad credit don't know this exists"** — strong hook, not an unsourced stat. Keep.

3. **FAQ item: "Does applying hurt your credit?"** — accurately describes soft pull → hard pull process. Clean.

4. **Step 3 copy ("apply for traditional secured card")** — names Capital One, Discover, OpenSky without affiliate relationship. This is appropriate — editorial comparison, not affiliate promotion. Disclose it's not exhaustive.

### Recommended Fix (QA → Legal aligned)

Add to the legal/FTC disclaimer at the bottom of the final CTA section:
```
This is not financial advice. Always verify current terms directly with the card issuer before applying.
```

### Structural Quality

- ✅ H1 present and keyword-targeted
- ✅ FAQPage JSON-LD schema (6 questions)
- ✅ Article JSON-LD schema
- ✅ Canonical URL set
- ✅ OG tags present
- ✅ NavBar included
- ✅ Internal links to related pages (4 guides)
- ✅ Inbound link from homepage + bad-credit-credit-card page

### Overall QA Score: 9.5/10 — APPROVED with 1 minor fix
