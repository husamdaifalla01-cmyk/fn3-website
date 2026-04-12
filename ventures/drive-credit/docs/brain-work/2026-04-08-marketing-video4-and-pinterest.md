# Mintbrooks — Marketing: Video #4 Script + Pinterest Batch #3
**Date:** 2026-04-08 19:30 EDT | **Agent:** CMO (Hormozi) + Social Media Manager

---

## Video #4: "Why Your Credit Score Keeps Getting Rejected"
**Composition ID:** WhyRejected
**Target duration:** 18–22 seconds
**Platform:** TikTok + IG Reels
**Hook type:** Revelation / anger trigger

### Script

**HOOK (0–3s) — Bold text overlay + TTS:**
> "Your credit score didn't fail you. The system failed your credit score."

**BODY (3–17s):**
> "Banks set approval minimums to filter out profitable customers — not risky ones. The same score that banks reject? It qualifies for a car-secured Visa that reports to all 3 bureaus.
>
> If you own a car — fully paid off — your car's value can become your credit limit. Starting from $500 up to $10,000. No cash deposit. No hard pull to check if you qualify.
>
> Your bank knows about this. They just don't offer it."

**CTA (17–22s):**
> "Link in bio — mintbrooks.com — 60 seconds to check your car."

---

### TikTok Caption
```
Your credit score rejection is a feature, not a bug. Banks profit from keeping you in a bad-credit loop.

Here's the escape route they don't advertise:

If your car is fully paid off → it can become your credit limit (up to $10k). No cash deposit. Soft pull only.

Yendo is a real Visa card backed by your car's equity. You keep driving. They report to all 3 bureaus.

Tap the link in bio to check if your car qualifies.

#badcredit #creditscore #buildcredit #carsecuredcard #financialtips #creditcard #moneytok #personalfinance #yendo
```

---

### Remotion Composition Spec (WhyRejected)
```typescript
// Add to Root.tsx
{
  id: 'WhyRejected',
  component: MintbrooksTikTok,
  durationInFrames: 22 * 30, // 22s at 30fps = 660 frames
  fps: 30,
  width: 1080,
  height: 1920,
  defaultProps: {
    hook: "Your credit score didn't fail you.",
    hookSub: "The system failed your credit score.",
    body: "Banks set minimums to filter — not protect. But your paid-off car can become your credit limit. $500–$10k. No deposit. No hard pull.",
    cta: "60 seconds to check → mintbrooks.com",
    accentColor: '#d97706',
    theme: 'dark',
  }
}
```

**Render command:**
```bash
cd /Users/husamahmed/FN3/ventures/drive-credit
npx remotion render src/remotion/index.ts WhyRejected /tmp/mintbrooks-why-rejected.mp4
```

---

## Pinterest Batch #3 — 5 Pins

### Pin 1: "What Credit Score for a Credit Card?" (Blog repin)
- **Title:** What Credit Score Do You Actually Need for a Credit Card in 2026?
- **Description:** Most people think they need 670+. Here's the full breakdown by card type — including one option that has NO score minimum at all if you own a car.
- **URL:** mintbrooks.com/finance/what-credit-score-do-you-need-for-a-credit-card
- **Board:** Mintbrooks Credit Tips
- **Visual spec:** Dark card, score range chart (300→720→850), amber accents

### Pin 2: "Car Equity = Your Credit Limit"
- **Title:** Own a Paid-Off Car? Your Credit Limit Could Be $10,000
- **Description:** No credit check. No cash deposit. Yendo uses your car's equity as collateral for a Visa credit card. You keep driving. Check if your state qualifies.
- **URL:** mintbrooks.com/finance/qualify
- **Board:** Car-Secured Credit Cards
- **Visual spec:** Car key graphic, $10,000 highlighted in amber

### Pin 3: "Secured vs Car-Secured — Which is Better?"
- **Title:** Secured Credit Card vs Car-Secured Card: Which Builds Credit Faster?
- **Description:** One ties up $200 in cash. The other uses your car. Both report to all 3 bureaus. Here's the side-by-side comparison.
- **URL:** mintbrooks.com/finance/car-equity-vs-secured-cards
- **Board:** Mintbrooks Credit Tips
- **Visual spec:** 2-column comparison table, emerald checkmarks

### Pin 4: "500 Credit Score Options"
- **Title:** Credit Cards That Accept a 500 Credit Score (Real Options, No Scams)
- **Description:** Not prepaid debit. Not "guaranteed approval" traps. These are legitimate Visa cards that report to credit bureaus and are designed for 500-range scores.
- **URL:** mintbrooks.com/finance/credit-card-500-credit-score
- **Board:** Credit Building
- **Visual spec:** "500" score displayed prominently, dark stone background

### Pin 5: "Rebuild Credit With a Car"
- **Title:** How to Build Credit When You Own a Car (The Path Nobody Talks About)
- **Description:** Your car sitting in the driveway isn't doing anything for your credit. Here's how car equity becomes your credit-building tool — without giving up the car.
- **URL:** mintbrooks.com/finance/how-to-rebuild-credit
- **Board:** Car-Secured Credit Cards
- **Visual spec:** Car in driveway, amber overlay, credit score building animation

---

## Posting Priority (this week)
1. Post WhyRejected video (this is now script #19 in backlog)
2. Pin Batch #3 — 5 pins to Mintbrooks boards
3. Re-queue existing pins for weekend peak traffic (Sat 10am, Sun 2pm EST are peak)

## Next Session
- Check if Video #1 (CarEquitySecret) was posted
- If yes: pull TikTok views + Plausible /qualify visits
- If no: Video #1–3 are in /tmp — Husam can post immediately
