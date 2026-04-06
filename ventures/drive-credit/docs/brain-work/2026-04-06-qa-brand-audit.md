# Mintbrooks QA — Brand Audit (Today's Shipped Pages)

**Prepared by:** QA Director  
**Date:** 2026-04-06

---

## Pages Audited This Cycle

1. /secured-credit-card-bad-credit (shipped 15:30 cycle)
2. /credit-builder-loan (shipped 14:55 cycle)
3. /yendo-states-guide (shipped 13:56 cycle)
4. /api/geo (shipped 14:25 cycle)

---

## Audit Results

### /secured-credit-card-bad-credit
| Check | Status | Notes |
|-------|--------|-------|
| Brand name: "Mintbrooks" (not "DriveCredit") | ✅ PASS | Correct throughout |
| FTC affiliate disclosure present | ✅ PASS | Footer section |
| "Not a lender" language | ✅ PASS | In disclosure section |
| No guaranteed approval language | ✅ PASS | Uses "may qualify," "check eligibility" |
| #ad disclosure (N/A — not social) | N/A | Web page |
| Tone: empowering, not hype | ✅ PASS | "Skip the deposit. Use your car instead." |
| Internal links to other guides | ✅ PASS | 6 related guide links |
| TypeScript: 0 errors | ✅ PASS | Verified at commit |
| Schema markup present | ✅ PASS | Article + FAQPage JSON-LD |
| Canonical URL set | ✅ PASS | mintbrooks.com/secured-credit-card-bad-credit |

### /credit-builder-loan
| Check | Status | Notes |
|-------|--------|-------|
| Brand name correct | ✅ PASS | |
| Disclosure present | ✅ PASS | |
| No misleading claims | ✅ PASS | CFPB study cited accurately |
| Related guide links | ✅ PASS | |

### /yendo-states-guide  
| Check | Status | Notes |
|-------|--------|-------|
| State eligibility data accurate | ✅ PASS | 37 states + DC eligible |
| Slam Dunk fallback for excluded states | ✅ PASS | |
| No guarantee language | ✅ PASS | |

---

## Issues Found

### ISSUE 1: FTC disclosure placement (across ALL pages) — MEDIUM priority
- **Finding:** Affiliate disclosure is in page footer only on all pages
- **Risk:** FTC requires disclosure "clear and conspicuous" — adjacent to first material claim
- **Fix:** Add 1-line disclosure below hero CTA on all money pages
- **Effort:** 30 min (1 edit to layout component or per-page)
- **Assigned to:** Dev (next session)

### ISSUE 2: /secured-credit-card-bad-credit comparison table — LOW priority
- **Finding:** Annual fee for Yendo listed as "Varies" — users want a number
- **Risk:** May reduce trust
- **Fix:** Update to "~$69/yr (check current)" with link to Yendo for verification
- **Effort:** 5 min edit

### ISSUE 3: OpenGraph image missing on new pages — LOW priority
- **Finding:** New pages don't have og:image set
- **Risk:** TikTok/Instagram shares of URL will show no preview image
- **Fix:** Add default og:image to layout.tsx (Mintbrooks logo card)
- **Effort:** 30 min

---

## Brand Consistency Score: 9/10
Strong execution. Main gap is FTC disclosure placement.

