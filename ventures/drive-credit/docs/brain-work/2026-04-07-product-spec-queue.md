# PRODUCT SPEC QUEUE UPDATE — Apr 7

**Date:** April 7, 2026
**Venture:** DriveCredit / Mintbrooks
**Author:** Brain — Product Faction

---

## Completed Specs (Infrastructure Phase — Week 1)

| Spec | Status |
|------|--------|
| Landing page | Done |
| Email sequence (Resend) | Done |
| Analytics dual-stack (Plausible + GA4) | Done |
| Affiliate tracking (MaxBounty) | Done |
| Exit intent popup | Done |
| 24 SEO guides | Done |
| /faq page | Done (built this cycle — `src/app/faq/page.tsx`) |

Week 1 gate: **DONE.** Infrastructure is solid.

---

## Priority Spec Queue (Week 2 Focus)

### 1. Excluded-State Waterfall — HIGH PRIORITY

**Problem:** Users in excluded states (AK, HI, IA, LA, ME, MD, MA, MN, MO, NJ, NY, OK, SD, WI) currently see nothing useful — dead end.

**Solution:** When user is in an excluded state, show alternate offers instead of nothing:
- Slam Dunk personal loan ($9 CPL)
- Credit Karma link
- Credit Sesame link

**Outcome:** Converts otherwise lost traffic into revenue.

---

### 2. State Detection via /api/geo Route

**Problem:** No current mechanism to detect user's state and route accordingly.

**Solution:**
- Use existing `/api/geo` route to detect user state on page load
- If excluded state → redirect to `/alternatives` page
- If eligible state → show normal Yendo CTA

**Implementation note:** geo detection should be edge-cached, not blocking.

---

### 3. /alternatives Page Spec

**Purpose:** Landing page for excluded-state users that monetizes the visit.

**Content structure:**
- Header: "Yendo isn't available in your state yet — here are your best options"
- Card 1: Slam Dunk personal loan — CPL: $9 (MaxBounty offer)
- Card 2: LendingTree — CPL: TBD
- Card 3: Credit Sesame — CPL: TBD
- Footer: "We'll notify you when Yendo expands to [state]" → email capture

**Conversion goal:** $9 CPL from Slam Dunk as floor revenue from excluded-state traffic.

---

### 4. NEXT_PUBLIC_GA_ID — Vercel Env Var

**Status: MISSING — DATA LOSS OCCURRING NOW**

Without this env var, GA4 events are firing to `null`. All GA4 behavioral data (scroll depth, click events, form interactions) is being lost.

**Action:** Add `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` to Vercel project environment variables immediately.

**Impact:** Every day this is missing = lost GA4 data that cannot be recovered.

---

### 5. Resend AUDIENCE_ID — Vercel Env Var

**Status: MISSING — EMAIL LIST NOT BUILDING**

Without this env var, contacts who sign up are only receiving the email sequence (transactional) but are NOT being added to the Resend audience/list for future campaigns.

**Action:** Add `AUDIENCE_ID=[resend-audience-id]` to Vercel environment variables.

**Impact:** Can't build a retargetable email list without this. Week 2 email marketing is blocked.

---

## Product North Star

**Metric:** Yendo clicks per 1,000 video views

| Data point | Value |
|------------|-------|
| Current video views | 0 (no videos posted) |
| Current Yendo clicks | 0 |
| Ratio | No data |

First data point expected immediately after first video posting. This is the core unit economics signal for the entire venture.

---

## Sprint Status

| Gate | Deadline | Status |
|------|----------|--------|
| Week 1: Infrastructure complete | Apr 3 | DONE |
| Week 2: First 3 videos posted | Apr 7 (original) | NOT MET |
| Week 2: Extended gate | Apr 8 EOD | PENDING |
| Week 3: First affiliate revenue | Apr 14 | AT RISK |
