# Mintbrooks — Week 2 Product Spec
**Date:** 2026-04-07  
**Author:** Product (CPO lens — Anne Wojcicki)  
**Status:** Gate passed → entering Week 2

---

## Week 2 North Star Metric

**Yendo clicks per day** — target: 10/day by Friday April 11

Everything else is an input. This is the output.

---

## Product State Entering Week 2

| Component | Status |
|-----------|--------|
| mintbrooks.com | LIVE ✅ |
| 23 SEO pages | LIVE ✅ (new: /how-to-rebuild-credit) |
| Email capture | LIVE ✅ |
| Affiliate tracking | LIVE ✅ |
| TikTok @mintbrookscredit | LIVE — 0 videos |
| IG @mintbrookscredit | LIVE — 3 static posts, 0 Reels |
| GA4 analytics | DEPLOYED — needs NEXT_PUBLIC_GA_ID env var |

---

## Week 2 Product Priorities

### P0 — Must Ship

**1. NEXT_PUBLIC_GA_ID Vercel Env Var**
- Go to Vercel → mintbrooks.com → Settings → Environment Variables
- Add: `NEXT_PUBLIC_GA_ID` = your GA4 measurement ID (format: G-XXXXXXXXXX)
- Redeploy — triggers in ~2 minutes
- Without this: GA4 data is not being collected

**2. TikTok Bio Link**
- Set TikTok bio URL to: `https://mintbrooks.com/links`
- Set IG bio URL to: `https://mintbrooks.com/links`
- This is the funnel entry point. Without it, video views have nowhere to go.

### P1 — High Value This Week

**3. /qualify page A/B framing test**
- Current: generic eligibility form
- Test variant: Lead with "Your car might be worth $X in credit" (car-value hook)
- Hypothesis: car-value framing increases form completion rate

**4. Internal link audit**
- /how-to-rebuild-credit should link to /credit-builder-loan, /bad-credit-credit-card, /secured-credit-card-bad-credit
- Add /how-to-rebuild-credit to homepage's "More Guides" section

### P2 — If Time Permits

**5. Pinterest automation expansion**
- Current: 6 pins posted (automated)
- Week 2: expand to 3 pins/day automated
- Add pins for: new guides (/how-to-rebuild-credit), video content repurposed as static

---

## Success Criteria — End of Week 2

| Metric | Target |
|--------|--------|
| Videos posted | 4 (Week 1 catch-up) |
| Weekly Yendo clicks | 70+ (10/day) |
| Site visitors | 500+ |
| Email subscribers | 10+ |
| GA4 active | ✅ |

---

## Product Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Videos never posted | HIGH | CRITICAL | Automated Remotion pipeline, no human filming required |
| TikTok algo doesn't pick up animated videos | MEDIUM | HIGH | Post 3+ videos before evaluating; algorithm needs sample size |
| Yendo changes terms | LOW | HIGH | Monitor MaxBounty dashboard weekly |
| SEO pages not indexed | LOW | MEDIUM | Submit sitemap to Google Search Console |

