# DriveCredit — Venture Context Document

**Version:** 1.0
**Updated:** 2026-03-22
**Status:** Active — building traffic

---

## Venture Overview

DriveCredit is an affiliate marketing site. We drive consumer traffic to financial product offers and earn a commission per qualified lead. There is no product we sell directly — revenue is 100% CPL (cost per lead).

**Business model:** Traffic → Landing page → Affiliate click → Lead submitted to offer partner → Commission paid
**Primary offer:** Yendo car-secured credit card ($112.50 CPL via MaxBounty)
**Fallback offer:** Slam Dunk Loans ($9.00 CPL via MaxBounty, for visitors in Yendo-excluded states)

---

## Ideal Customer Profile (ICP)

**Primary:** Americans who own a vehicle and have poor, thin, or no credit history

| Attribute | Detail |
|-----------|--------|
| Age | 22–45 |
| Vehicle ownership | Yes — car paid off or has equity |
| Credit score | 300–600 (subprime) or no credit file |
| Situation | Rebuilding after bankruptcy, divorce, medical debt, or young adult with no history |
| Need | Access to revolving credit they can't get from traditional cards |
| Income | $25k–$65k/yr — working, not broke, just locked out of credit |
| Platform | TikTok-first, Instagram, YouTube Shorts |
| Tone resonates | Relatable financial frustration, empowerment, "they don't want you to know this" |
| Tone does NOT resonate | Corporate, jargon, condescending, "financial wellness" language |

**Secondary:** Same profile but in Yendo-excluded states → route to Slam Dunk Loans (personal loans up to $50k, any credit)

---

## Offer Details

### Primary: Yendo Credit Card
- **Type:** Car-secured revolving Visa credit card
- **USP:** Uses vehicle equity — not credit score — as primary qualification factor
- **Credit limits:** $500–$10,000 (typically 50–70% of vehicle value)
- **Key hook:** Keep driving your car. No deposit. Soft inquiry to check.
- **CPL:** $112.50
- **Tracking URL:** `https://afflat3e3.com/trk/lnk/39C31C1E-2822-4350-B92A-2693C829ED6A/?o=27618&c=918277&a=769106&k=D083BC665DB0EC415E23BE307260F10E&l=36989`
- **Available states:** 36+ (see excluded list below)
- **Excluded states:** AK, HI, IA, LA, ME, MD, MA, MN, MO, NJ, NY, OK, SD, WI

### Fallback: Slam Dunk Loans
- **Type:** Personal loan marketplace
- **USP:** Up to $50,000, fast decision, any credit welcome
- **When to route:** Visitor is in an excluded state, or Yendo application ineligible
- **CPL:** $9.00
- **Tracking URL:** `https://afflat3e3.com/trk/lnk/39C31C1E-2822-4350-B92A-2693C829ED6A/?o=11384&c=918277&a=769106&k=D6769605225263EA1944C850E28B6F38&l=11476`

---

## Revenue Math

| Scenario | CPL | Conversion assumptions |
|----------|-----|------------------------|
| 1,000 Yendo clicks, 15% lead rate | $112.50 | = $16,875 |
| 1,000 Slam Dunk clicks, 20% lead rate | $9.00 | = $1,800 |
| Break-even at $10 CAC (TikTok) | — | Need >1 Yendo lead per 11 clicks |

**North star metric:** Yendo affiliate clicks per 1,000 video views
**Secondary metric:** Cost per Yendo affiliate click (CAC)

---

## Brand Voice

**Tone:** Direct, relatable, slightly conspiratorial — like a financially savvy friend telling you something you didn't know

**Emotional arc:** Frustration (credit system is rigged) → Discovery (your car is untapped equity) → Hope (this actually works for people like you)

**Language to use:**
- "Your car has money in it you're not using"
- "No credit check" / "they use your car — not your score"
- "Keep driving" / "no title loan"
- "Real Visa card" / "works everywhere Visa does"
- "$500 to $10,000 depending on your car"
- "Soft inquiry — won't ding your score"

**Language to avoid:**
- "Financial wellness" / "credit journey"
- "Empower your financial future"
- "Innovative solution" / "platform"
- Anything that sounds like a bank ad
- Anything that sounds like a predatory lender

**Format that works:** Hook (relatable problem) → Reveal (car equity secret) → Proof (calculator or stat) → CTA (check your car)

---

## Content Strategy

**Primary channel:** TikTok (organic video content)
**Secondary channels:** Instagram Reels, YouTube Shorts (repurpose same videos)
**SEO:** Long-tail keywords around "bad credit credit card", "car equity", "no credit check credit card"

**Content pillars:**
1. **Education** — "Did you know your car is worth [X] in credit?" calculators, explainers
2. **Empathy** — Relatable financial frustration content, "the credit system is broken" angle
3. **Proof** — "Here's how it works" walkthroughs, objection handling
4. **Urgency** — State availability, limited access framing

**Video format (TikTok):**
- Duration: 30–60 seconds
- Hook: First 3 seconds must show dollar amount or relatable problem
- Vertical 9:16, captions always on
- No face required — screen recordings, text-on-video, and voiceover work well
- CTA: "Link in bio" → DriveCredit landing page

---

## Landing Page

**URL:** DriveCredit site (Next.js)
**Primary CTA:** "Check If My Car Qualifies" → Yendo affiliate link
**Car Calculator:** Interactive estimator showing credit range based on car year/condition
**Exit intent popup:** Captures email before visitor leaves (ESP not yet connected)
**Fallback flow:** Excluded-state detection → Slam Dunk Loans CTA

**Key pages:**
- `/` — Main landing page (calculator, trust signals, FAQ)
- `/calculator` — Dedicated car credit calculator

---

## Compliance Rules

1. **Never guarantee approval.** Always say "check eligibility" or "may qualify"
2. **Never state specific APR or rates** — we don't know the user's actual offer
3. **Soft inquiry claim** — accurate for Yendo's initial check, but note "hard inquiry may occur later in application"
4. **Excluded states** — never drive Yendo traffic from AK, HI, IA, LA, ME, MD, MA, MN, MO, NJ, NY, OK, SD, WI
5. **Title loan distinction** — always clarify this is NOT a title loan (car stays in your possession)
6. **FTC disclosure** — landing page footer must disclose affiliate relationship
7. **No income/employment claims** — do not imply Yendo is available for all income levels

---

## Current Objectives (Q1 2026)

1. **Generate first $1,000 in affiliate commissions** — need ~9 Yendo leads
2. **Produce 4 TikTok videos** using the Remotion/nanobanana video pipeline
3. **Connect email capture** — ExitIntentPopup → ESP → welcome sequence
4. **Set up UTM tracking** on all affiliate links to measure which content converts

---

## Active Constraints

- **Budget:** Organic first — no paid ads until first revenue validates CPL math
- **No team:** Solo operation, all execution through FN3 agent system
- **Legal:** Affiliate disclosure required on all pages and in paid content
- **Tech:** Next.js site deployed, tracking links live, email capture not yet wired to ESP

---

## Agent Instructions

When working on DriveCredit:
- Always check state eligibility before choosing which offer URL to use
- Default CTA is always Yendo first; Slam Dunk is the fallback only
- Brand voice is relatable financial empowerment — not corporate, not predatory
- Video content targets TikTok-first audience aged 22–45 with car + bad/no credit
- Revenue goal is CPL — optimize for affiliate link clicks, not page views
- The car calculator is our primary engagement tool — keep it prominent
