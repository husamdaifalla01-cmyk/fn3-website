# Mintbrooks — Hook A/B Testing Framework
**Date:** 2026-04-05
**Author:** Growth Lead (Dara Denney lens)

## Testing Strategy: Hook Categories

We have 12 scripts across 5 hook categories. Once posted, we'll measure which category drives the most profile clicks (our primary growth metric).

### Hook Categories to Test

| Category | Scripts | Hypothesis |
|----------|---------|-----------|
| **Anger/System** | "Banks Want You Broke", "Credit System Broken" | Highest views, moderate CTR — emotion drives shares |
| **Curiosity** | "$10K Card Nobody Talks About", "Car Equity Secret" | High views + high CTR — curiosity gap drives profile clicks |
| **Empathy** | "Rejection Loop", "Not a Scam" | Lower views but highest trust → email signups |
| **Math/Logic** | "I Ran the Numbers", Hook variant: Math | Niche but converts highest — data-driven audience |
| **Urgency** | "State Check", Hook variant: Fear Removal | Moderate views, high conversion — scarcity drives action |

### Measurement Plan

| Metric | How to Measure | When |
|--------|---------------|------|
| Views | TikTok analytics | 48h after posting |
| Watch time % | TikTok analytics | 48h after posting |
| Profile click rate | TikTok analytics (profile visits / views) | 48h after posting |
| Bio link clicks | Plausible (referrer = tiktok.com) | 48h after posting |
| Yendo clicks | MaxBounty SubID report | 7 days after posting |
| Shares | TikTok analytics | 48h after posting |

### Testing Schedule (Week 1-2)

| Day | Video | Hook Category | Goal |
|-----|-------|--------------|------|
| Day 1 | BankSaysNo (animated) | Anger/System | Baseline views |
| Day 2 | CarEquitySecret (animated) | Curiosity | Compare vs. anger |
| Day 3 | CreditSystemBroken (animated) | Anger/System | Confirm anger pattern |
| Day 4 | StateAvailability (animated) | Urgency | Test urgency |
| Day 5-7 | First filmed videos | Curiosity + Empathy | Face-to-camera vs. animated |

### Success Criteria
- **Winner hook category:** >3% profile click rate AND >40% watch-through rate
- **Scale signal:** Any video >5,000 views in 48h → make 3 more in that category
- **Kill signal:** <1% profile click rate after 72h → deprioritize category

### Growth Experiments Queue (Post-Launch)

| Experiment | Type | Effort | Expected Impact |
|------------|------|--------|----------------|
| Animated vs. filmed A/B | Content format | Low | Determines if Husam needs to film |
| Post time optimization (9AM/12PM/6PM/9PM) | Timing | Low | 20-50% view lift |
| Hashtag set rotation (broad vs. niche) | Distribution | Low | 10-30% reach lift |
| Comment engagement rate vs. video performance | Correlation study | Low | Identifies algorithm levers |
| Duet/Stitch with credit creators | Collab format | Medium | Tap into existing audiences |
| Pinterest → TikTok cross-promotion | Channel | Medium | Diversify traffic sources |

### UTM Tracking for Growth Tests
Each test gets its own UTM campaign:
- `utm_campaign=hook_test_anger_v1`
- `utm_campaign=hook_test_curiosity_v1`
- `utm_campaign=animated_vs_filmed`
- `utm_campaign=post_time_9pm`
