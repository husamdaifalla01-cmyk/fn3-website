# GROWTH — Viral Loop Analysis + Sharing Mechanism Design
**Date:** 2026-04-06 13:56 EDT | **Agent:** Growth Lead (Dara Denney)
**Venture:** Mintbrooks (DriveCredit)

---

## Current Growth Model: Linear, Not Viral

```
TikTok video → view → bio click → qualify → Yendo click → CPL
```

Zero virality built in. No sharing mechanism. No loop.

## Viral Loop Opportunity Analysis

### Loop 1: Share-to-check (highest potential)
**Mechanic:** After quiz result, show shareable outcome card
- "I checked — my 2019 Honda Civic qualifies for $5,200 in credit"
- Share as TikTok green screen / IG story
- Friends with similar cars self-identify and enter funnel

**Implementation:**
- Add `?shared=true&car=2019-honda-civic&amount=5200` to share URL
- Show personalized landing page: "Your friend found out their Honda qualifies. Check yours."
- No personal data shared — just car model + estimated amount

**Estimated viral coefficient:** 0.2–0.4 (each user generates 0.2–0.4 new entrants)
**Effort:** 2 days dev

### Loop 2: TikTok comment bait
**Mechanic:** Script videos to invite comments
- End script with: "Comment your car make and year — I'll tell you what limit you'd get"
- Manually reply to first 50 comments with estimate from calculator
- High comment engagement = algorithm boost = more views
- Converts comments into warm leads (they came to you)

**Implementation:** Zero dev. Just change script endings.
**Estimated algorithm impact:** 3–5x watch time on reply threads

### Loop 3: "Check for your friend" CTA
**Mechanic:** On result page, add: "Know someone with a car and bad credit? Send them this link."
- Pre-filled iMessage/WhatsApp message with share link
- Taps existing trust networks

**Implementation:** 30 min dev (share button with pre-filled text)

## Priority Recommendation

| Loop | Revenue Impact | Effort | RICE |
|------|----------------|--------|------|
| TikTok comment bait | High | Zero | 10/10 |
| Share-to-check card | Very high | Medium | 7/10 |
| Friend referral CTA | Medium | Low | 8/10 |

**Execute now (zero dev):** Loop 2 — add to scripts 7-9 (Batch 4)
**Sprint 2 (after first 10 videos):** Loop 3 — friend referral on result page
**Phase 2 (after $500 revenue):** Loop 1 — share card with personalized amounts

## Growth Levers for This Week

1. **Comment baiting on every new script** — "Comment your car year and I'll estimate your limit"
2. **Pinterest SEO** — 10 pins/day (currently 6 total — needs scaling)
3. **Internal linking** — /yendo-states-guide now live, link from homepage and calculator
4. **Email capture** — ExitIntentPopup is wired (confirmed) → Resend nurture live
