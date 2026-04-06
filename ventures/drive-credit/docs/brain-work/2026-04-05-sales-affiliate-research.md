# Mintbrooks — Affiliate Expansion Research
**Date:** 2026-04-05 | **Author:** Sales Director

## Current Stack
| Offer | CPL | Status |
|-------|-----|--------|
| Yendo Car-Secured Visa | $112.50 | LIVE — primary |
| Slam Dunk Loans | $9.00 | LIVE — fallback |

## Research: High-CPL Offers for the Same ICP
Target audience: bad/no credit Americans who own a car (income $25-65k)

### Tier 1: Auto Insurance ($15-30/lead)
These offers have HIGH overlap with Mintbrooks ICP (car owners, often pay more for insurance due to credit score):

| Company | Type | Est. CPL | Notes |
|---------|------|---------|-------|
| The Zebra | Auto insurance comparison | $15-25 | Largest US auto insurance marketplace |
| Insurify | Auto insurance AI | $20-30 | High-quality leads, good payouts |
| EverQuote | Multi-insurance marketplace | $12-20 | Volume-friendly |

**Recommended integration:** After a visitor clicks to Yendo but doesn't qualify (wrong state, no car equity), redirect to an auto insurance offer. CPL is lower but reach is wider.

### Tier 2: Personal Loans / Cash Advances ($3-15/lead)
For visitors who don't own a car:

| Company | Type | Est. CPL | Notes |
|---------|------|---------|-------|
| CashNetUSA | Online loans | $5-8 | Matches bad-credit audience |
| OppLoans | Bad-credit installment | $8-12 | Legit lender, ethical model |
| Dave (app) | Cash advance | $3-5 | Lower CPL but high volume |

### Tier 3: Credit Repair / Monitoring ($25-50/lead)
Same ICP — people want to improve their credit:

| Company | Type | Est. CPL | Notes |
|---------|------|---------|-------|
| Credit Karma | Monitoring signup | free | Low CPL but massive traffic funnel |
| Lexington Law | Credit repair | $30-50 | High CPL, matches pain point |
| Sky Blue Credit | Credit repair | $25-40 | Ethical, good brand |

## Recommended Next Action
1. **Apply to The Zebra + EverQuote via MaxBounty** — Same network, fast approval
2. **Build a "What If You Don't Qualify?" flow** on the /links page
   - Yendo not available in your state? → Auto insurance comparison
   - No car? → Personal loan comparison
3. **Revenue diversification target:** By Day 30, have 3 live offers generating clicks

## Stack Architecture (Phase 2)
```
Visitor → mintbrooks.com
  ↓ (has car + bad credit)
  → Yendo CTA ($112.50 CPL) ← PRIMARY
  
  ↓ (has car + needs insurance)
  → The Zebra ($20/CPL) ← SECONDARY
  
  ↓ (no car or wrong state)
  → OppLoans ($10/CPL) ← FALLBACK
```

Expected blended CPL with full stack: $35-50 vs current effective $8-15 (many non-converting clicks to Slam Dunk).
