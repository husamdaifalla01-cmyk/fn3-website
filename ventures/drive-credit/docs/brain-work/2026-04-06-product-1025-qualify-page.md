# PRODUCT — /qualify Page: New Conversion Surface
**Date:** 2026-04-06 10:25 EDT | **Agent:** CPO

---

## What Was Built
`/qualify` — a 3-step eligibility quiz that personalizes the CTA:
- Step 1: Do you own a car?
- Step 2: Which state are you in?
- Step 3: What's your credit situation?

**Routes:**
- Own car + qualifying state → Yendo ($112.50 CPL)
- Own car + excluded state → Slam Dunk ($9 CPL)
- No car → Slam Dunk ($9 CPL)

**Live at:** mintbrooks.com/qualify (deployed to Vercel on push)

## Product Decision
**Change TikTok + IG bio link from `/links` → `/qualify`**

Reasoning:
1. `/links` shows all options at once — decision paralysis, lower conversion
2. `/qualify` narrows to ONE personalized CTA — higher click-through
3. Excluded-state visitors currently bounce with zero monetization; /qualify routes them to $9 CPL
4. Quiz format = engagement = lower bounce = TikTok algorithm signal

## KPI Target for /qualify
- Quiz completion rate: >60% (3 steps is low friction)
- Yendo CTA click rate: >40% of completers
- Slam Dunk CTA click rate: >20% of completers (excluded state)

## How to Update Bio Link (Husam action)
1. TikTok: Profile → Edit → Website → mintbrooks.com/qualify
2. Instagram: Profile → Edit Profile → Link → mintbrooks.com/qualify
3. Done — takes 60 seconds

## Next Product Priority
Once traffic starts flowing, build an analytics view of /qualify funnel:
- How many start the quiz?
- Drop-off at step 2 (state selection)?
- Which states are most common?
- Click rate to Yendo vs Slam Dunk?

(Plausible custom events are already firing — just need to label them in the dashboard)
