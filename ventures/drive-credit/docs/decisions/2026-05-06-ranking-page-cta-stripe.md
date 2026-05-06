# Decision: Wire Ranking-Page Bottom CTA to Stripe Credit Sequence

**Date:** 2026-05-06  
**Venture:** Amazon / Mintbrooks  
**File:** `src/app/finance/credit-card-500-credit-score/page.tsx`

## Problem

`/finance/credit-card-500-credit-score` is the only page with significant GSC impressions (85% of venture impressions, ~134/mo). The page's bottom dark-background CTA — the highest-intent closing position — pointed to the Yendo affiliate link (MaxBounty CPA, variable commission, zero Mintbrooks product economics).

## Decision

Replace the bottom closing CTA with the Stripe $24 Credit Sequence checkout (`buy.stripe.com/14AbJ10u5c6McBb6Fa08g01`).

- **Top CTA (line ~128):** Stripe block — already wired ✅
- **Bottom CTA (line ~260):** Yendo affiliate → **now Stripe $24** ✅
- **Mid-page Yendo blocks:** kept as editorial content (Yendo IS a legitimate card recommendation for 500-score readers)

## Rationale

The Stripe product earns $24/conversion (100% margin). The Yendo affiliate earns a variable CPA that may be $0 if Yendo pauses the program. Both are honest recommendations; but the high-intent reader who scrolls to the bottom has already read the full guide and is the most qualified buyer for the Credit Sequence product.

## What Was Kept

Yendo affiliate links in the hero callout and the ranked-card list (#1) remain — they are accurate editorial recommendations, not checkout CTAs, and they serve readers for whom the Credit Sequence isn't the right next step.
