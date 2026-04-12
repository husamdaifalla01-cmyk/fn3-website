# Mintbrooks — Sales: Excluded-State Revenue Waterfall Research
**Date:** 2026-04-08 | **Agent:** Sales Director (Roberge lens)

---

## Problem
14 states have no Yendo availability. Visitors from these states currently see the $9 CPL Slam Dunk fallback, generating ~$3–5 RPV (revenue per visitor). The waterfall concept can lift this to $20–40 RPV.

## Excluded States (approximate)
CA, MN, VT, IA, MT, NH, WV, OR, NM, ND, SD, HI, AK, + 1–2 more

These states represent roughly 15–20% of US population → meaningful segment.

---

## Waterfall: Best Offers for Excluded States

### Tier 1: FlexOffers (Apply First — no traffic requirement)
Target offers once approved:
- **LendingTree Bad Credit Personal Loan** — CPL: $20–$45 (varies by state)
- **OpenSky Secured Visa** — CPL: $15–$25 (available in all states)
- **Upgrade Credit Card** — CPL: $20–$30 (fair-credit tier, higher approval)

**FlexOffers apply URL:** flexoffers.com/signup (no traffic gate)
**Expected approval:** 24–48 hours

### Tier 2: Impact.com (apply week 2)
- **SoFi Personal Loan** — CPL: $50–$80 (requires fair credit, but higher CPL)
- **Carvana Auto Refi** — CPL: $15–$20 (car owners — perfect ICP crossover)

### Tier 3: CJ Affiliate (apply week 3, needs traffic proof)
- **Petal Credit Card** — CPL: $30–$45 (no credit history accepted)
- **Mission Lane Visa** — CPL: $20–$35 (bad credit segment)

---

## Implementation Logic (once FlexOffers approved)

```typescript
// In /finance/qualify/page.tsx — detect excluded state

const EXCLUDED_STATES = ['CA', 'MN', 'VT', 'IA', 'MT', 'NH', 'WV', 'OR', 'NM', 'ND', 'SD', 'HI', 'AK']

// If state is in excluded list:
// → Show "Yendo isn't in your state yet"
// → Show waterfall: LendingTree CPL offer + OpenSky + Upgrade
// → Track via UTM: source=mintbrooks&medium=waterfall&state={state}
```

The comparison page spec (from 2026-04-08-product-excluded-state-spec.md) handles the UI.

---

## Revenue Projection — Post FlexOffers

| Scenario | Excluded-state RPV | Monthly visits from excluded | Monthly revenue |
|----------|--------------------|------------------------------|-----------------|
| No waterfall (today) | $3–5 | 50 | $150–250 |
| FlexOffers approved (Month 1) | $15–25 | 50 | $750–1,250 |
| Full waterfall (Month 3) | $25–40 | 150 | $3,750–6,000 |

**Husam action:** Apply to FlexOffers. 10 minutes. No traffic requirement.

---

## Next Session
- Confirm if FlexOffers application submitted
- If approved: pull specific offer IDs and CPL rates
- Begin /compare page implementation once offers confirmed
