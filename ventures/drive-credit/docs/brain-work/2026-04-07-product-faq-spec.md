# PRODUCT: /faq Page Spec + Excluded-State Offer Waterfall
**Agent:** Head of Product
**Date:** 2026-04-07 12:16 EDT

---

## Deliverable 1: /faq Page Spec

### Purpose
Capture long-tail FAQ search traffic. Target: "does yendo affect credit score", "how does car secured credit card work", "what states is yendo available in" etc. ~2-5k/mo combined.

### URL
`mintbrooks.com/faq`

### Structure
```
<FAQPage JSON-LD>
Hero: "Common Questions — Answered Honestly"
10 FAQ items (accordion or flat list)
CTA: "Ready to check if you qualify? →" → /qualify
Related: links to /yendo-review, /yendo-states-guide, /how-it-works
```

### FAQ Items (in priority order)

1. **Does applying for a car-secured credit card hurt my credit score?**
   → Soft pull to check eligibility. Hard pull only if you proceed. No score impact for checking.

2. **What states is Yendo available in?**
   → 37 states as of 2026. Full list at /yendo-states-guide. Not available in: AK, HI, IA, LA, ME, MD, MA, MN, MO, NJ, NY, OK, SD, WI.

3. **What happens to my car if I can't make payments?**
   → Yendo has a lien on the title (like a car loan). Missed payments could result in repossession. Always borrow within your means.

4. **How much can I get in credit from my car?**
   → Credit limit is based on your car's assessed value. Typically $500–$10,000. Varies by year, make, model, and condition.

5. **Does Yendo report to all three credit bureaus?**
   → Yes. Equifax, Experian, and TransUnion. On-time payments improve your score just like any other card.

6. **Can I still drive my car after I get the card?**
   → Yes — you keep driving normally. Yendo places a lien on the title, not possession of the vehicle.

7. **What credit score do I need to qualify?**
   → Yendo is designed for bad/no credit. They weigh your car's value more than your credit score. No minimum FICO required.

8. **Is Mintbrooks affiliated with Yendo?**
   → No. Mintbrooks is an independent comparison and education site. We may earn a commission if you apply through our links.

9. **How long does it take to build credit with a car-secured card?**
   → Most users see measurable improvement in 3–6 months with on-time payments and utilization below 30%.

10. **What's the difference between a car-secured card and a car title loan?**
    → A car title loan gives you cash with very high interest rates. A car-secured credit card is a revolving credit line — much lower risk and builds your credit score.

### Dev estimate: 45 min (static page, FAQ JSON-LD, simple accordion)

---

## Deliverable 2: Excluded-State Offer Waterfall Spec

### Problem
14 states = excluded from Yendo. Currently showing only Slam Dunk ($9 CPL). Revenue gap: 92%.

### Solution: Tiered offer presentation on /qualify result-no-state

**Tier 1 (highest CPL):** OpenSky Secured Visa — available all 50 states, ~$25-35 CPL
- No credit check required
- $35 annual fee
- Reports to all 3 bureaus
- Apply: opensky.com (direct) or via affiliate

**Tier 2 (fallback):** Slam Dunk Financial — personal loans, all 50 states, $9 CPL (current)

**Tier 3 (educational):** "Check back in 6 months — Yendo is expanding" + email capture for state launch notification

### UI Pattern for /qualify result-no-state

```
"Yendo isn't in [STATE] yet — but you still have options"

Card 1: OpenSky Secured Visa (featured)
  ✅ Available in all 50 states
  ✅ No credit check
  ✅ Builds credit like any card
  → Apply to OpenSky →

Card 2: Personal Loan Marketplace
  "Need cash today, not a credit card?"
  → See Loan Options (Slam Dunk) →

Card 3: Email capture (amber)
  "Notify me when Yendo comes to [STATE]"
  [email input] → [Join Waitlist]
```

### Revenue impact
At 100 monthly excluded-state visitors:
- Current: 100 × $9 = $900/mo
- Upgraded: 60 × $30 + 40 × $9 = $1,800 + $360 = $2,160/mo (+140%)

### Dev estimate: 90 min (modify qualify page result-no-state section)
### Dependency: OpenSky affiliate network application (FlexOffers carries it)

---

## Product Decisions Made This Cycle

1. **/faq page** → approved, schedule for next dev session
2. **Excluded-state waterfall** → approved, blocked on OpenSky affiliate approval
3. **Bio link target** → mintbrooks.com/qualify (confirmed, not /links)
