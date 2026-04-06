# Growth — Email Nurture Optimization + Referral Loop
**Date:** 2026-04-06 | **Agent:** Growth Lead

---

## EMAIL NURTURE OPTIMIZATION

Current sequence (3 emails):
- Day 0: Welcome + Yendo CTA
- Day 3: Objection handler ("does it hurt my credit?")
- Day 7: Step-by-step last chance

### Recommended Enhancement: Add Day 1 Urgency Email

**Subject:** "Quick: Your car's equity estimate is ready"

**Why:** Day 0 welcome is general. Day 1 should be specific — give them a personalized hook.
Tactic: "Based on average car values in your area, you may qualify for $X-$Y in credit."
This feels personalized (even if it's estimated) and creates urgency to click within 48h.

**Body outline:**
1. "You signed up yesterday — that means you're serious about building credit."
2. "Most car owners qualify for $500-$5,000 depending on vehicle age and condition."
3. "Takes 30 seconds to check. Soft inquiry only." → Yendo CTA
4. Social proof: "Thousands of car owners in [generic warm states] have used this."

**Implementation:** Add to subscribe/route.ts as Email 2 (push Day 3 → Day 4, Day 7 → Day 8)

---

## VIRAL REFERRAL LOOP ANALYSIS

### Can Mintbrooks run a referral program?
**Challenge:** We don't control the product (Yendo). We can't give referral bonuses tied to Yendo leads.
**Opportunity:** We CAN run a content-sharing loop.

### Proposed Growth Loop: "Share Your Eligibility Result"

1. User checks calculator at mintbrooks.com/calculator
2. Gets result: "Your 2018 Honda Accord may qualify for up to $4,800"
3. Show shareable card: "My car qualifies for $4,800 in credit via @mintbrookscredit — check yours"
4. User shares to TikTok/IG story → tags @mintbrookscredit
5. UGC loop begins — creates organic social proof with zero production cost

**Implementation effort:** 3-4 hours dev
- Add share button to calculator result
- Generate OG image with personalized result
- Pre-populate TikTok caption

**Expected lift:** If 5% of calculator visitors share, and each post reaches 200 people,
100 visitors × 5% × 200 reach = 1,000 additional impressions/week. Compounding.

---

## GROWTH EXPERIMENT BACKLOG

| Experiment | Hypothesis | Effort | Expected Impact |
|-----------|-----------|--------|----------------|
| Day 1 email add | Urgency + personalization → 20% lift in Day 1 CTR | 1h | Medium |
| Calculator share button | UGC loop → 1,000 extra impressions/week | 4h | High |
| Exit intent offer: "Check calculator first" | Capture non-ready visitors with lower-friction action | 2h | Medium |
| Pinterest story pins | Video pins drive 2x traffic vs static | 3h | Medium |
| Email subject A/B test | Personalized subject → 15% open rate lift | 1h | Low-Medium |

**Recommendation:** Build Day 1 email first (1h, direct revenue impact). Calculator share second (4h, viral potential).
