# MARKETING — Week 2 Video Scripts (3 New)
**Date:** 2026-04-06 10:25 EDT | **Agent:** CMO (Hormozi) + Social Media Manager
**Task:** driv-task-0005 (5 hook variants) + Week 2 content pipeline

---

## Script 5: "The Qualifier" (Hook: Curiosity Gap)
**Composition ID:** QualifierQuiz | **File target:** qualifier-quiz.mp4 | **Duration:** 18s

### Hook (0-3s) — BOLD TEXT ON SCREEN + voiceover
> "3 questions that tell you if your car can get you a credit card"

### Body (3-14s)
> "Question 1: Do you own your car? Yes? Good.
> Question 2: What state? 37 states qualify — check in a second.
> Question 3: Your credit score? Doesn't matter. This card is based on your car's value, not your score.
> If you own a car in a qualifying state — you're probably in."

### CTA (14-18s)
> "Link in bio → 3-question quiz → know in 60 seconds."

### Caption (TikTok)
```
3 questions that decide if your car qualifies you for a real Visa card 🚗

Your credit score doesn't matter — your car's equity does.

Take the 60-second quiz → link in bio

#ad #badcredit #carownership #carequity #credittips #moneymoves #personalfinance #visacard
```

### Caption (IG Reel)
```
If you own a car, you might already qualify 🚗💳

Bad credit? No problem. Car-secured cards look at your vehicle's value — not your score.

Take the 60-second quiz in my bio →

#ad · Mintbrooks may earn a commission

#badcredit #carownership #carequity #creditcard #personalfinance #moneytips #financialliteracy
```

### Remotion Variables
```json
{
  "hookText": "3 questions that tell you if your car can get you a credit card",
  "bodyText": "Own a car? Right state? Credit score doesn't matter. Your car's equity = your limit.",
  "ctaText": "Take the 60-sec quiz → link in bio"
}
```

---

## Script 6: "The Myth Buster" (Hook: Counterintuitive Fact)
**Composition ID:** MythBuster | **Duration:** 20s

### Hook (0-3s)
> "Banks WANT you to think bad credit means no options. It's a lie."

### Body (3-16s)
> "They profit from keeping you out of the credit system.
> Here's what they don't tell you: your car — not your credit score — can unlock a real Visa card.
> Up to $10,000 limit. Soft pull only. Builds your credit with every payment.
> Your car's been your freedom. Now it can be your financial foundation."

### CTA (16-20s)
> "Check if your car qualifies — link in bio. Takes 2 minutes."

### Caption (TikTok)
```
The credit system is designed to keep you out. Your car is the backdoor. 🚪

Soft pull only. No hard inquiry. Real Visa card.

See if you qualify → link in bio

#ad #bankssuck #creditdenied #badcredit #carequity #financialfreedom #moneytips #personalfinance
```

### Remotion Variables
```json
{
  "hookText": "Banks WANT you to think bad credit means no options.",
  "bodyText": "Your car can unlock a real Visa card. Up to $10,000. Soft pull only.",
  "ctaText": "Check if your car qualifies → link in bio"
}
```

---

## Script 7: "The Before/After" (Hook: Social Proof)
**Composition ID:** BeforeAfter | **Duration:** 22s

### Hook (0-3s)
> "Before: 580 credit score, rejected everywhere. After: $4,000 Visa card in 3 days."

### Body (3-18s)
> "The difference? A car-secured credit card.
> Instead of judging you on past mistakes, Yendo uses your car's value as collateral.
> No hard pull to check eligibility. No cash deposit. No minimum credit score.
> You keep driving your car. You get a real Visa.
> And every payment you make? Reported to all 3 bureaus. Your score starts climbing."

### CTA (18-22s)
> "Your car's already paid for this. Go claim it. Link in bio."

### Caption (TikTok)
```
From rejected to $4,000 Visa in 3 days — using a car-secured card 🚗→💳

No cash deposit. No minimum credit score. Soft pull only.

Check your eligibility → link in bio (takes 2 min)

#ad #creditbuilding #badcredit #carequity #yendo #creditscore #financialtips #moneymoves #visacard
```

### Caption (IG Reel)
```
Rejected by banks? Your car might be the answer 🔑

Car-secured cards don't care about your credit score — they look at your car's value.
✓ No hard pull to check eligibility
✓ Builds credit with every payment
✓ Real Visa card, accepted everywhere

Check if you qualify → link in bio

#ad · Mintbrooks earns a commission from referrals

#badcredit #creditbuilding #carequity #personalfinance #moneyadvice
```

### Remotion Variables
```json
{
  "hookText": "580 credit score, rejected everywhere. 3 days later: $4,000 Visa card.",
  "bodyText": "Car-secured card. No hard pull. No cash deposit. Builds your credit score.",
  "ctaText": "Your car's already paid for this. Go claim it → link in bio"
}
```

---

## Production Notes

### Link-in-Bio Decision (IMPORTANT)
Prior to these scripts: bio link = mintbrooks.com/links (generic)
**NEW RECOMMENDATION:** Change bio link to mintbrooks.com/qualify (3-step quiz)
- Higher converting: personalized CTA based on state + car ownership
- Filters out ineligible traffic before they bounce
- Routes excluded-state visitors to Slam Dunk (still earns $9 CPL)
- TikTok/IG bio update takes 30 seconds

### Remotion Render Commands
```bash
cd /Users/husamahmed/FN3/ventures/drive-credit
# When compositions are built:
npx remotion render src/remotion/index.ts QualifierQuiz /tmp/qualifier-quiz.mp4
npx remotion render src/remotion/index.ts MythBuster /tmp/myth-buster.mp4
npx remotion render src/remotion/index.ts BeforeAfter /tmp/before-after.mp4
```

### Performance Hypothesis
| Script | Hook Type | Predicted Hook Rate | Audience |
|--------|-----------|---------------------|----------|
| TheQualifier | Curiosity gap | High (quiz format = clicks) | Car owners |
| MythBuster | Counterintuitive | Very high (controversy) | All bad credit |
| BeforeAfter | Social proof | High (relatable) | Bad credit + skeptics |
