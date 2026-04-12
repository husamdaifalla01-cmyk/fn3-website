# Mintbrooks — Excluded-State Waterfall on /qualify: Product Spec
**Date:** 2026-04-08 | **Agent:** Head of Product | **Status:** BLOCKED (needs FlexOffers)

---

## Problem
When a visitor enters an excluded Yendo state on /qualify, they currently see:
- A message that says they're not eligible
- A Slam Dunk Loans fallback ($9 CPL)
- No alternative credit card offer

**Revenue loss:** Every excluded-state visitor earns $9 instead of a potential $20–$50.

---

## Proposed Solution: FlexOffers Waterfall
Once FlexOffers is approved, add a tier-2 CTA for excluded states:

### User Flow
```
/qualify → state input → excluded state detected
  → Show: "Yendo isn't in [State] yet."
  → Show: "Here's your best alternative:"
  → CTA 1: OpenSky Secured Visa (no credit check, $200 deposit) → FlexOffers link
  → CTA 2: Self Visa Credit Builder → Impact link
  → Keep: Slam Dunk Loans as tier-3 fallback
```

### Dev Implementation Notes
- `/finance/qualify/page.tsx` — `result-excluded` section
- New variable: `OPENSKY_QUALIFY_EXCLUDED` → FlexOffers URL
- Show only when state is in excluded list
- Card display: same "product card" component used elsewhere
- Must include: FTC disclosure, "No credit check required" for OpenSky
- Estimated dev time: 45 minutes after FlexOffers link obtained

### Copy
**Header:** "Yendo isn't available in [State] yet — but you still have great options."
**OpenSky card copy:** "OpenSky Secured Visa — No credit check. $200 deposit. Available nationwide."
**CTA:** "Apply to OpenSky →"

---

## Activation Criteria
- [ ] FlexOffers account approved
- [ ] OpenSky affiliate link obtained from FlexOffers dashboard
- [ ] Compliance: OpenSky link must include "requires $200 minimum deposit" disclosure

**Estimated revenue uplift:** ~$11/excluded-state visitor (from $9 → $20 avg)
