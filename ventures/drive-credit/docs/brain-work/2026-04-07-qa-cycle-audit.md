# Mintbrooks — QA: Cycle Audit — 2026-04-07 15:18
**Dept:** QA — QA Director (Peep Laja lens)
**Session:** 2026-04-07 15:18 EDT

---

## Outputs Audited This Cycle

### 1. /does-applying-for-credit-card-hurt-credit (Dev — New Page)

**Audit: PASS ✅**

| Check | Result |
|-------|--------|
| TypeScript build — no errors | ✅ |
| Metadata title + description present | ✅ |
| Canonical URL correct | ✅ |
| Article + FAQPage JSON-LD both present | ✅ |
| Affiliate disclosure on all CTAs | ✅ |
| Internal links to existing pages | ✅ (/how-to-rebuild-credit, /bad-credit-credit-card, /secured-credit-card-bad-credit, /credit-builder-loan) |
| Slam Dunk fallback for non-car-owners | ✅ |
| No "no credit check" language | ✅ |
| Mobile-friendly structure (max-w-3xl, px-4) | ✅ |
| affiliate URL constants added to affiliateUrls.ts | ✅ |

Defects found: None. Ship as-is.

---

### 2. Marketing Batch 2 Scripts (Videos #5–9)

**Audit: PASS with 1 note ✅**

| Check | Result |
|-------|--------|
| All scripts have #ad in caption | ✅ |
| "Soft pull only" language used, not "no credit check" | ✅ |
| No guaranteed approval language | ✅ |
| No APR claims | ✅ |
| Yendo "all 3 bureaus" claim — accurate | ✅ |
| Remotion render command referenced | ✅ |
| Legal reviewed and pre-approved hooks | Partial |

**Note on Video #7 ("Banks don't want you to know"):**
This uses the "they don't want you to know" framing. Legal pre-approved this as opinion framing,
not factual claim. Maintain the caveat in production — do not add specific claims about bank practices.
The word "scam" must NOT appear anywhere in the caption or voiceover. Current scripts are clear. ✅

---

### 3. Brand Voice Consistency Check — Batch 2 Scripts

Tone audit against Mintbrooks brand standards:
- ✅ "Trustworthy, empowering, plain-speaking" — present in all 5 scripts
- ✅ No "hack" framing (Video #7 revised to use "products designed to help" not "hack")
- ✅ No hype language ("guaranteed", "secret trick", "they hide")
- ✅ Empathy-first framing on Video #9 (missed payment anxiety — addressed with autopay solution, not dismissal)

---

## Internal Link Audit

Link added: /how-to-rebuild-credit → /does-applying-for-credit-card-hurt-credit ✅

Remaining internal link recommendation:
- /credit-card-500-credit-score should link to /does-applying-for-credit-card-hurt-credit
- /bad-credit-credit-card should link to /does-applying-for-credit-card-hurt-credit

These are LOW priority — implement next cycle.

---

## QA Score This Cycle: 9.5/10

Single deduction: Video #7 framing requires care in production (watch the "they hide" language).
Everything else is clean, compliant, and production-ready.

---

*QA — QA Director (Peep Laja lens) — 2026-04-07 15:18 EDT*
