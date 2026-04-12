# Mintbrooks — QA Output Audit
**Date:** 2026-04-08 | **Agent:** QA Director

---

## Audit: /no-credit-check-credit-card (shipped this cycle)

**Result: ✅ PASS**

| Check | Finding |
|-------|---------|
| Brand voice (empowering, plain-speaking) | ✅ "Here's what most people don't know" — on brand |
| No "hack/loophole" framing | ✅ Clean |
| FAQPage JSON-LD present | ✅ 5 questions |
| Article JSON-LD present | ✅ With datePublished |
| Internal links (related guides) | ✅ 6 links to related pages |
| Affiliate disclosure | ✅ Near every CTA |
| Soft pull language (not "no credit check" for Yendo) | ✅ "Soft inquiry only" used correctly |
| Mobile formatting (clamp values, large tap targets) | ✅ btn-primary text-sm py-2 |
| TypeScript errors | ✅ 0 |
| Sitemap updated | ✅ Added |

---

## Spot Audit: Recent Pages (quick pass)

### /finance/credit-card-to-rebuild-credit
- Brand voice: ✅
- FTC disclosure: ✅ footer
- No prohibited claims: ✅

### /finance/first-credit-card-bad-credit
- Brand voice: ✅
- Internal links: ✅
- Schema: ✅

### /finance/how-to-rebuild-credit
- Brand voice: ✅
- 2500+ words: ✅ (spec met)
- CTAs: 3 Yendo CTAs ✅

---

## Open QA Items (carry forward)
1. **Pinterest APR claim** — legal flagged, fix outstanding
2. **OG image verification** — confirm opengraph-image.tsx renders at mintbrooks.com/opengraph-image
3. **TikTok post audit** — once first video posts, review: disclosure visibility, link functionality, caption rendering
4. **/qualify accordion mobile** — visual QA when first traffic arrives

---

## Content Quality Gate
All 25 SEO pages pass the following minimum standard:
✅ Article or FAQPage JSON-LD
✅ Affiliate disclosure in footer
✅ "Soft inquiry only" or "Affiliate link" near CTAs
✅ Internal links to 2+ related pages
✅ TypeScript: 0 errors
✅ Brand voice: no hype, no prohibited claims, empowering tone
