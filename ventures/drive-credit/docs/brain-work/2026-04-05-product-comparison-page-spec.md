# Product Spec: Comparison Page + Remotion Video Templates
## CPO — 2026-04-05 16:00

---

## 1. Comparison Page: /car-equity-vs-secured-cards

### Problem
Visitors who land on Mintbrooks from SEO or social may not understand how Yendo differs from traditional secured credit cards. A comparison page reduces confusion and increases Yendo CTA click-through.

### Target Keywords
- "yendo credit card review"
- "car equity credit card vs secured card"
- "best credit card for bad credit no deposit"
- "secured credit card comparison"

### Page Structure
1. **Hero**: "Car-Equity vs. Secured Cards: Which Is Right for You?"
2. **Comparison Table**: Yendo vs OpenSky vs Discover Secured vs Chime Credit Builder
3. **Deep Dive Sections**: Each card gets 2-3 paragraphs (pros, cons, who it's for)
4. **Decision Framework**: Flowchart logic — own a car? → Yendo. No car? → OpenSky/Chime
5. **FAQ**: 5 questions with JSON-LD schema markup
6. **CTA**: Primary Yendo CTA + secondary alternatives

### Success Metric
- Page CTR to Yendo: >15%
- Organic traffic within 60 days: >500 visits/month
- Bounce rate: <60%

### Compliance Requirements
- FTC disclosure before first affiliate link
- "Not financial advice" disclaimer
- Accurate feature data (verify against each issuer's site)
- No "guaranteed approval" language

---

## 2. Remotion Video Template Brief (Next Sprint)

### Purpose
Enable automated/semi-automated video generation for TikTok and IG Reels. Reduce per-video production time from 30min to 5min.

### Template Types Needed
1. **Hook + Stats**: Bold text animation with counter → reveal stat → CTA
2. **Comparison Slider**: Side-by-side card comparison with animated highlights
3. **State Checker**: "Does YOUR state qualify?" → animated map → result reveal
4. **Testimonial Card**: Quote + star rating + before/after credit score
5. **Step-by-Step**: Numbered steps with icon animations

### Technical Requirements
- Remotion already installed locally
- Output: 1080x1920 (9:16 vertical)
- Duration: 15-30 seconds
- Brand colors: #1c1917 bg, #d97706 amber, #fbbf24 gold, #34d399 emerald
- Font: System font-black for headings
- Audio: Optional background music track (royalty-free)

### Data Inputs per Video
```typescript
interface VideoProps {
  hook: string          // Bold text shown in first 3 seconds
  body: string[]        // Bullet points or paragraphs
  cta: string           // "Link in bio" or "Check eligibility"
  stats?: { label: string, value: string }[]
  variant: 'hook-stats' | 'comparison' | 'state-check' | 'testimonial' | 'steps'
}
```

### Priority
After first 4 manual videos are posted and performing. Don't build automation before proving the content works manually.
