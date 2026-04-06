# State Exclusion Revenue Recovery Plan
## Sales Director — 2026-04-05

---

## Problem Statement

Yendo serves 37 states. Visitors from these 14 excluded states hit a $9 Slam Dunk fallback instead of the $112.50 Yendo CPL — a 92% revenue collapse per lead:

**Excluded:** AK, HI, IA, LA, ME, MD, MA, MN, MO, NJ, NY, OK, SD, WI

These are not tiny markets. NY, NJ, MA, MD, and MN alone represent ~15% of US internet traffic. We are leaving significant money on the table.

---

## 1. Page Concept: `/best-credit-options`

### Why not `/compare` or `/alternatives`
- `/compare` implies Yendo vs. competitors — wrong framing for excluded states where Yendo is unavailable
- `/alternatives` signals defeat — "we don't have what you want"
- `/best-credit-options` is SEO-friendly, positive framing, and works for ALL visitors

### How It Works
A single dynamic page that serves two experiences:

**Experience A (37 eligible states):** Yendo as hero offer + comparison table below
**Experience B (14 excluded states):** "Best Credit Options in [State]" with high-CPL waterfall

The visitor never knows they are seeing a different page. The URL is the same. The layout shifts based on detected state.

### URL Structure
- `/best-credit-options` — main dynamic page
- `/best-credit-options/new-york` — static SEO pages for high-population excluded states (NY, NJ, MA, MD, MN, MO, LA, WI, OK, IA)
- These static pages rank for "best credit card bad credit [state]" long-tail keywords

---

## 2. State Detection: Implementation Spec

### Method 1: IP Geolocation (Primary — Automatic)
```
Visitor hits page
  → Edge middleware reads IP via Vercel headers (x-vercel-ip-country, x-vercel-ip-region)
  → Map region code to state abbreviation
  → Set cookie: mb_state=[XX]
  → Render appropriate experience
```

**Vercel Edge Middleware** (runs at CDN edge, zero latency):
```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const EXCLUDED_STATES = new Set([
  'AK','HI','IA','LA','ME','MD','MA','MN','MO','NJ','NY','OK','SD','WI'
])

export function middleware(request: NextRequest) {
  const region = request.headers.get('x-vercel-ip-region') || ''
  const response = NextResponse.next()

  // Vercel provides US state codes directly in x-vercel-ip-region
  const state = region.toUpperCase()
  const isExcluded = EXCLUDED_STATES.has(state)

  response.cookies.set('mb_state', state, { maxAge: 86400 })
  response.cookies.set('mb_excluded', isExcluded ? '1' : '0', { maxAge: 86400 })

  return response
}

export const config = {
  matcher: ['/best-credit-options/:path*', '/links', '/']
}
```

### Method 2: Quiz Answer (Secondary — Higher Intent)
On pages that have the "Check Your Eligibility" quiz:
- Question: "What state do you live in?" (dropdown)
- Answer overrides IP detection cookie
- Higher intent signal — they told us directly

### Method 3: UTM Override (Campaigns)
For state-targeted ad campaigns:
- `?state=NY` parameter sets the cookie directly
- Useful for TikTok/IG campaigns targeting specific excluded states

### Priority: Method 1 (IP) is default. Method 2 overrides. Method 3 overrides both.

---

## 3. Offer Waterfall by Category

### Tier 1: High-CPL ($35-55) — Primary Fallback for Excluded States

| Offer | Type | Est. CPL | Network | All 50 States? | Notes |
|-------|------|----------|---------|-----------------|-------|
| myAutoloan | Auto refi marketplace | $35-55 | CJ Affiliate | Yes | Requires car with existing loan. Perfect ICP overlap with Yendo. |
| LendingTree Personal Loans | Loan marketplace | $15-45 | LendingTree Affiliate / FlexOffers | Yes | Wide CPL range based on lead quality. Accepts bad credit. |
| Even Financial (via MoneyLion) | Loan/card marketplace | $10-40 | Direct / Impact | Yes | API-driven — shows best match. Modern UX. |

### Tier 2: Medium-CPL ($15-35) — Solid Secondary

| Offer | Type | Est. CPL | Network | All 50 States? | Notes |
|-------|------|----------|---------|-----------------|-------|
| Self Visa Credit Builder | Secured card | $30-45 CPA | ShareASale | Yes | Reports to 3 bureaus. Zero minimum score. Strong brand. |
| IdentityIQ | Credit monitoring | $18-28/trial | MaxBounty | Yes | $1 trial = high conversion. Already on MaxBounty. |
| OpenSky Secured Visa | Secured card | $15-25 | FlexOffers | Yes | No credit check. Guaranteed approval. Easy sell. |
| Chime Credit Builder | Secured card | $15-30 CPA | Impact | Yes | No fees, no minimum deposit. Popular with young adults. |

### Tier 3: Low-CPL ($5-20) — Volume Capture

| Offer | Type | Est. CPL | Network | All 50 States? | Notes |
|-------|------|----------|---------|-----------------|-------|
| Credit Sesame | Free credit score | $12-20 | MaxBounty | Yes | Zero friction. "Check your score" CTA. Already on MaxBounty. |
| Slam Dunk Loans | Loan marketplace | $9.00 | MaxBounty | Yes | Current fallback. Keep as last resort. |

### The Waterfall Logic (Excluded State Visitor)

```
Excluded state visitor lands on /best-credit-options

SECTION 1: "Best Options for [State] Residents" (hero)
  → Do you own a car with an existing loan?
    YES → myAutoloan CTA ($35-55)     ← Highest CPL, closest to Yendo ICP
    NO  → Continue to comparison table

SECTION 2: Comparison Table (all visible, ranked by CPL)
  → Self Visa Credit Builder ($30-45)
  → OpenSky Secured Visa ($15-25)
  → Chime Credit Builder ($15-30)

SECTION 3: "Not ready to apply? Check your score first"
  → Credit Sesame ($12-20)
  → IdentityIQ $1 trial ($18-28)

SECTION 4: "Need cash now?"
  → LendingTree Personal Loans ($15-45)
  → Slam Dunk Loans ($9.00)       ← Last resort

EMAIL CAPTURE: Exit intent → "Get your personalized credit plan"
  → Nurture sequence hits all offers over 5 emails
```

---

## 4. Revenue Model: Projected Blended RPV

### Assumptions
- 1,000 visitors from excluded states per month (target at scale)
- 25% of visitors see myAutoloan section (own a car)
- 40% reach comparison table
- 20% reach free score section
- 15% reach personal loans section
- Exit intent captures 3% of all visitors

### Revenue Per 1,000 Excluded-State Visitors

| Offer Tier | Viewers | CTR | Leads | CPL | Revenue |
|------------|---------|-----|-------|-----|---------|
| myAutoloan (car owners) | 250 | 12% | 3 | $45 | $135 |
| Self / OpenSky / Chime (table) | 400 | 10% | 4 | $25 | $100 |
| Credit Sesame / IdentityIQ | 200 | 15% | 6 | $16 | $96 |
| LendingTree / Slam Dunk | 150 | 8% | 2 | $20 | $40 |
| Email nurture (5-email sequence) | 30 | 20% | 2 | $30 | $60 |
| **TOTAL** | | | **17** | | **$431** |

### Blended RPV Comparison

| Metric | Current (Slam Dunk only) | With Waterfall Page |
|--------|--------------------------|---------------------|
| Revenue per 1,000 excluded visitors | $54 (6 leads × $9) | $431 |
| Effective RPV | $0.054 | $0.431 |
| **Revenue lift** | — | **+698%** |

### Blended RPV Across ALL Traffic

| Metric | Current | With Recovery |
|--------|---------|---------------|
| Eligible state RPV | $0.90 | $0.90 (unchanged) |
| Excluded state RPV | $0.054 | $0.431 |
| Blended RPV (assuming 15% excluded) | $0.77 | $0.83 |
| **Monthly revenue at 10K visitors** | $7,700 | $8,300 |
| **Annual revenue lift** | — | **+$7,200/yr** |

---

## 5. Page Layout Spec

### Experience B: Excluded State View

```
┌─────────────────────────────────────────────┐
│ HERO                                         │
│ "Best Credit Options for [State] Residents"  │
│ Subhead: "Build credit, access cash, and     │
│ get approved — even with bad credit."        │
│                                              │
│ FTC Disclosure: "We may earn a commission..." │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ SECTION: "Own a Car? Unlock Your Equity"     │
│ ┌─────────────────────────────────────────┐  │
│ │ myAutoloan card                         │  │
│ │ "Refinance your auto loan — save $100+  │  │
│ │  per month and lower your rate"         │  │
│ │ [Check Rates →]                         │  │
│ └─────────────────────────────────────────┘  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ SECTION: "Best Credit Builder Cards"         │
│                                              │
│ ┌──────────┬──────────┬──────────┐          │
│ │ Self     │ OpenSky  │ Chime    │          │
│ │ ★★★★★   │ ★★★★☆   │ ★★★★☆   │          │
│ │ $25/mo   │ $200 dep │ No fees  │          │
│ │ 3 bureau │ No check │ No min   │          │
│ │ [Apply]  │ [Apply]  │ [Apply]  │          │
│ └──────────┴──────────┴──────────┘          │
│                                              │
│ "Editor's Pick" badge on Self (highest CPL) │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ SECTION: "Check Your Credit Score for Free"  │
│ ┌─────────────────────────────────────────┐  │
│ │ Credit Sesame  │  IdentityIQ ($1 trial) │  │
│ │ [Free Score]   │  [Start Trial]         │  │
│ └─────────────────────────────────────────┘  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ SECTION: "Need a Personal Loan?"             │
│ ┌─────────────────────────────────────────┐  │
│ │ LendingTree — Compare rates from 50+    │  │
│ │ lenders in 2 minutes                    │  │
│ │ [Compare Rates →]                       │  │
│ └─────────────────────────────────────────┘  │
│ ┌─────────────────────────────────────────┐  │
│ │ Slam Dunk — Quick loan matching         │  │
│ │ [Get Matched →]                         │  │
│ └─────────────────────────────────────────┘  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ FAQ (JSON-LD Schema)                         │
│ • "What credit score do I need?"            │
│ • "Will applying hurt my score?"            │
│ • "Which card builds credit fastest?"       │
│ • "Can I get approved with no credit?"      │
│ • "How long to see credit improvement?"     │
└─────────────────────────────────────────────┘
```

### Experience A: Eligible State View
Same page, but hero says "Yendo: Turn Your Car Into a Credit Card" with Yendo as the dominant CTA. Comparison table shows Yendo vs. secured cards (existing product spec).

---

## 6. MaxBounty Offers — Apply Immediately

These are already on MaxBounty. Husam can apply from the dashboard in <10 minutes total:

| # | Offer | Search Term in MaxBounty | Est. CPL | Action |
|---|-------|--------------------------|----------|--------|
| 1 | Credit Sesame | "credit sesame" | $12-20 | Apply → instant/1-day approval typical |
| 2 | IdentityIQ | "identityiq" | $18-28 | Apply → $1 trial offer, high conversion |
| 3 | Slam Dunk | Already live | $9.00 | Already running |

### Other Networks to Sign Up For (This Week)

| Network | Offer | Est. CPL | Sign-up URL | Time |
|---------|-------|----------|-------------|------|
| ShareASale | Self Visa Credit Builder | $30-45 | shareasale.com | 5 min signup + 1-3 day approval |
| FlexOffers | OpenSky Secured Visa | $15-25 | flexoffers.com | 5 min signup + 1-3 day approval |
| CJ Affiliate | myAutoloan | $35-55 | cj.com | 5 min signup + 2-5 day approval |
| Impact | Chime Credit Builder | $15-30 | impact.com | 5 min signup + 1-3 day approval |

### Application Order (by revenue impact)
1. **CJ → myAutoloan** ($35-55) — highest CPL fallback, closest to Yendo ICP
2. **ShareASale → Self** ($30-45) — second highest, no car required
3. **MaxBounty → IdentityIQ** ($18-28) — already on MaxBounty, zero friction
4. **MaxBounty → Credit Sesame** ($12-20) — already on MaxBounty, free offer = high conversion
5. **FlexOffers → OpenSky** ($15-25) — solid secured card
6. **Impact → Chime** ($15-30) — completes the comparison table

---

## 7. Implementation Roadmap

### Phase 1: Quick Wins (This Week — 2 hours total)
- [ ] Apply for Credit Sesame + IdentityIQ on MaxBounty (10 min)
- [ ] Sign up for CJ Affiliate, apply for myAutoloan (15 min)
- [ ] Sign up for ShareASale, apply for Self (15 min)
- [ ] Add state detection middleware to Next.js (30 min)
- [ ] Update /links page to show different primary CTA for excluded states (30 min)

### Phase 2: Page Build (Next Week — 4 hours)
- [ ] Build `/best-credit-options` page with dynamic state rendering
- [ ] Experience A (eligible states): Yendo hero + comparison table
- [ ] Experience B (excluded states): Waterfall layout per spec above
- [ ] Add offer cards as reusable components (OfferCard, ComparisonTable)
- [ ] Wire affiliate links with UTM tracking per offer
- [ ] FTC disclosure component at top of page
- [ ] FAQ section with JSON-LD schema markup

### Phase 3: SEO Pages (Week 3)
- [ ] Generate static pages for top 5 excluded states: `/best-credit-options/new-york`, `/new-jersey`, `/massachusetts`, `/maryland`, `/minnesota`
- [ ] Each page targets "best credit card bad credit [state]" long-tail
- [ ] Internal link from blog posts to these pages

### Phase 4: Optimization (Ongoing)
- [ ] A/B test offer order in comparison table
- [ ] Track per-offer CTR and conversion (Plausible custom events)
- [ ] Adjust "Editor's Pick" badge to highest-converting offer (not just highest CPL)
- [ ] Add email nurture sequence for excluded-state visitors (5 emails, one offer per email)

---

## 8. Tracking & Measurement

### Custom Events (Plausible)
```
offer_click: { offer: "myautoloan", state: "NY", tier: "excluded" }
offer_click: { offer: "self-visa", state: "NY", tier: "excluded" }
page_view: { page: "best-credit-options", experience: "excluded", state: "NY" }
```

### MaxBounty SubIDs
Format: `mb-[offer]-[state]-[source]`
Example: `mb-creditsesame-NY-tiktok`

This lets us see revenue per offer per state per traffic source.

### Weekly Dashboard Metrics
- Excluded-state RPV (target: >$0.40)
- Per-offer CTR and lead count
- Blended site RPV (target: >$0.80)
- Network approval status for pending applications

---

## 9. Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| myAutoloan / Self CPL lower than estimated | Revenue model overstated | Keep Yendo-eligible traffic unaffected. Any CPL > $9 is still a win over current Slam Dunk fallback. |
| CJ / ShareASale application rejected | Can't access high-CPL offers | Apply to multiple networks per offer. LendingTree has a direct affiliate program as backup. |
| IP geolocation inaccurate (VPN users) | Wrong experience shown | Quiz answer overrides IP. Add "Not in [State]? Click here" link. |
| Compliance issues with state-specific claims | Legal exposure | No state-specific approval guarantees. All copy says "available to residents" not "guaranteed for." Legal team reviews before launch. |

---

## Bottom Line

The current excluded-state setup leaves ~$377 per 1,000 visitors on the table. This plan recovers most of that with:
- A dynamic page that detects state and shows the right offers
- A waterfall from $55 CPL down to $9 CPL — no visitor leaves un-monetized
- 6 affiliate applications that take 20 minutes total but unlock 4 new revenue streams
- Zero changes to the Yendo flow for eligible states

**Husam's immediate action items:**
1. Open MaxBounty → apply for Credit Sesame + IdentityIQ (10 min)
2. Sign up at cj.com → apply for myAutoloan (10 min)
3. Sign up at shareasale.com → apply for Self Visa (10 min)

That is 30 minutes of work that unlocks the entire recovery plan.
