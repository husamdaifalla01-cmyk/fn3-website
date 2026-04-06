# Mintbrooks Post-Video Analytics Readiness Plan

**Prepared by:** Head of Product  
**Date:** 2026-04-06

---

## When the First Video Posts — Pull These Within 2 Hours

### TikTok Native Analytics (in-app)
- Views (total + per hour curve)
- Watch time % (target: >40% completion)
- Traffic sources breakdown (For You page vs Following vs search)
- Profile views triggered by this video
- Follower change

### Plausible Analytics (mintbrooks.com)
- Live: open plausible.io dashboard
- Key events to watch:
  - `/qualify` page visits (primary conversion path)
  - `/links` page visits (bio link)
  - Any Yendo affiliate URL clicks (shows as outbound)
- Source attribution: `utm_source=tiktok` should show up if Plausible is tracking

### MaxBounty Dashboard
- Log in to MaxBounty → check click_id report
- Any clicks from our Yendo affiliate links appear here
- First Yendo click = the system is working

---

## Analytics Decision Tree (48h after post)

| Result | Action |
|--------|--------|
| >5,000 views, >10 bio clicks | Post BankSaysNo immediately. Double cadence. |
| >500 views, <5 bio clicks | Test new hook. Caption/thumbnail issue. |
| <500 views in 24h | TikTok didn't push it. Check caption — remove hashtags from post body, keep in comments. Repost at 7PM EST if under 500 views by noon day 2. |
| Any Yendo clicks | Document CPV (cost per view = $0 since organic). Revenue = confirmed possible. |
| Zero traction day 2 | Switch to BankSaysNo. Different hook may crack the algorithm. |

---

## Product Dashboard — What Needs to Exist (Build in Next Sprint)

Currently: No unified dashboard. Analytics are spread across TikTok, Plausible, MaxBounty.

**Minimum viable dashboard (CuriousBrain can show this):**
1. Yendo clicks per day (MaxBounty API or webhook)
2. mintbrooks.com daily visitors (Plausible API)
3. Top traffic sources (TikTok, SEO, Direct, Email)
4. Conversion rate: visitors → Yendo clicks
5. Email subscriber count (Resend API)

**One-metric North Star (for daily standup):**  
→ **Yendo clicks/day** (target: 10/day by Apr 11)

Current: 0/day. First video post unlocks this metric.

---

## Content-Product Feedback Loop

After 3 videos posted:
1. Compare completion rates — which hook style works best?
2. Cross-reference with Plausible: which video drove the most site visits?
3. Hypothesis: curiosity hooks ("your car is worth X") outperform story hooks ("bank said no") for this ICP
4. Test confirmed → scale confirmed format

This feedback loop is the product. It doesn't exist until the first video posts.

