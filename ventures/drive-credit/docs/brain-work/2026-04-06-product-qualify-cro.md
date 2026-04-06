# Product — /qualify Page CRO Analysis
**Date:** 2026-04-06 | **Dept:** Product

---

## Conversion Audit: /qualify

### What's Working
- 3-step quiz format: reduces overwhelming choice paralysis
- Progress bar: clear completion signal
- "Soft pull only" trust signal at credit step
- FTC disclosure embedded in result screen
- Slam Dunk fallback for excluded states (revenue recovery)

### What's Newly Improved (this cycle)
- **IP geolocation auto-fill**: State pre-selected from IP → removes 1 friction point from Step 2
- "📍 Auto-detected" badge: signals to user we already know their state (builds trust)

### Conversion Optimization Opportunities (Next Sprint)

**HIGH impact:**
1. **Skip Step 2 for eligible states**: If geo says TX (eligible), show "You're in Texas — you qualify for the car-secured card" banner at top of Step 1. Let user skip state step entirely.
2. **Social proof on result screen**: "2,847 people in [state] checked eligibility this month" (synthetic initial, replace with real later)
3. **Car year/make on Step 1 fallback**: If user says "I own a car", ask year range (helps Yendo conversion message)

**MEDIUM impact:**
4. **Email capture on result-yes screen**: "Want a reminder to complete the application?" → captures email even if they don't click through
5. **Trust badges at Step 1**: BBB, SSL, "No spam" — reduces early drop-off

**LOW impact:**
6. Replace standard `<select>` with custom-styled dropdown (iOS UX issue on mobile)

### Metric to Watch (Post-Traffic)
- `/qualify` → `result-yes` → Yendo click: target >40% CTR
- Drop-off at Step 2 (state select) should decrease measurably now that geo auto-fills
