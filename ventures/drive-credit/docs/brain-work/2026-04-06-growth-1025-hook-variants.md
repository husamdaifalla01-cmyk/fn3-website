# GROWTH — 5 Hook Variant Matrix (A/B Test Framework)
**Date:** 2026-04-06 10:25 EDT | **Task:** driv-task-0005
**Agent:** Growth Lead (Dara Denney lens)

---

## The Test Framework

Hook = first 3 seconds. TikTok's algorithm decides distribution based on:
- **Completion rate** (most important — watch to the end?)
- **Like rate** (passive engagement)
- **Comment rate** (active engagement = massive signal)
- **Profile click rate** (intent to learn more)
- **Link click rate** (direct conversion)

We test 5 hook CATEGORIES, not 5 variations of the same angle. Each category targets a different psychological trigger.

---

## Hook Variant 1: CURIOSITY GAP
**Trigger:** Information asymmetry — they NEED to know the answer
**Best for:** Cold traffic, all demographics

| # | Hook Copy | Why It Works |
|---|-----------|-------------|
| A | "3 questions that tell you if your car can get you a credit card" | Quiz format + tangible outcome |
| B | "Most car owners in [state] don't know this about their vehicle" | State specificity + gap |
| C | "There's a credit card that doesn't check your credit score. Here's why." | Counterintuitive + reason promised |

**Test winner prediction:** A (quiz format has highest completion on TikTok)

---

## Hook Variant 2: PATTERN INTERRUPT
**Trigger:** Breaks expectation, forces the brain to re-engage
**Best for:** Scrollers who've seen too many "credit card" videos

| # | Hook Copy | Why It Works |
|---|-----------|-------------|
| A | "Your car is lying to you about how much it's worth." | Personification + guilt-free intrigue |
| B | "Delete this if you don't own a car." | Exclusion creates urgency for car owners |
| C | "I'm not selling anything. I'm angry at banks." | Anti-sales framing = trust signal |

**Test winner prediction:** B ("delete if" forces conscious decision to stay)

---

## Hook Variant 3: AGITATION / PAIN POINT
**Trigger:** Identifies the exact frustration the viewer is feeling right now
**Best for:** Warm traffic, retargeting, people who searched "bad credit"

| # | Hook Copy | Why It Works |
|---|-----------|-------------|
| A | "Getting rejected for credit cards over and over is demoralizing. Stop." | Emotional validation first |
| B | "The bank said no. So did the next one. And the next one. Here's what actually works." | Serialized rejection = pattern match |
| C | "Why does everyone with bad credit get the same useless advice?" | Outrage + camaraderie |

**Test winner prediction:** B (serialized structure mimics viewer's experience exactly)

---

## Hook Variant 4: SOCIAL PROOF / OUTCOME FIRST
**Trigger:** Others have done this = safe to try
**Best for:** Skeptics who think "this is a scam"

| # | Hook Copy | Why It Works |
|---|-----------|-------------|
| A | "580 credit score → $4,000 Visa card in 72 hours. Here's how." | Specific number + time = credibility |
| B | "People with 480 credit scores are getting approved for this." | Low floor = inclusivity |
| C | "I helped 4 people this week get approved despite their bad credit." | Personal credibility + volume |

**Test winner prediction:** A (specific numbers outperform vague claims consistently)

---

## Hook Variant 5: AUTHORITY / EDUCATION
**Trigger:** Positions creator as expert, builds trust over time
**Best for:** Channel growth, follower retention, repeat viewers

| # | Hook Copy | Why It Works |
|---|-----------|-------------|
| A | "Car-secured credit cards: what banks won't explain in 30 seconds" | Expert with adversarial framing |
| B | "Here's everything wrong with how credit works — and the workaround" | System critique = shareable |
| C | "The 3 things Yendo checks instead of your credit score" | Specific + educational |

**Test winner prediction:** C (specific "3 things" format drives completion)

---

## A/B Test Schedule (Week 2)

| Day | Video | Hook Category | Track |
|-----|-------|--------------|-------|
| Apr 7 | CarEquitySecret (existing) | Curiosity Gap A | Baseline |
| Apr 8 | BankSaysNo (existing) | Pain Point B | Compare |
| Apr 9 | New: QualifierQuiz | Curiosity Gap A (quiz) | Test |
| Apr 10 | New: MythBuster | Pattern Interrupt A | Test |
| Apr 11 | New: BeforeAfter | Social Proof A | Test |

**Decision rule:** After each video, if hook completion rate (% who watch past 3s) is > previous video → lock that hook category as primary.

---

## Winning Hook Signals to Watch in TikTok Analytics

| Metric | Bad | Acceptable | Good |
|--------|-----|-----------|------|
| Average watch time | <3s | 3-8s | >8s |
| % who watched to end | <15% | 15-30% | >30% |
| Profile clicks / view | <0.3% | 0.3-1% | >1% |
| Link clicks / view | <0.1% | 0.1-0.5% | >0.5% |

Pull these from: TikTok Studio → Analytics → Video → each post
Track in: `docs/brain-work/tiktok-analytics-tracker.md` (create once first video posts)
