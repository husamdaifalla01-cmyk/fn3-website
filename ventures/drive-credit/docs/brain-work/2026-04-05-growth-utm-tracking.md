# UTM Tracking Architecture for TikTok Bio Link
## Growth Hacker: 2026-04-05
## Task: driv-task-0093

### Current State
UTM tracking is ALREADY implemented in `src/lib/offers.ts`:
- `buildAffiliateUrl()` appends utm_source, utm_medium, utm_campaign
- 4 TikTok campaign URLs pre-built in `TIKTOK_CAMPAIGN_URLS`
- Each homepage placement has a unique utm_campaign

### What's Missing: Bio Link Page UTMs

The `/links` page needs its own tracked URLs. When TikTok traffic lands on /links and clicks Yendo, the UTMs should read:
- `utm_source=tiktok`
- `utm_medium=social`
- `utm_campaign=bio-link-cta`

### Implementation Plan

**Option A (Recommended): Update /links/page.tsx**
The bio link page should use:
```typescript
const YENDO_BIO = buildAffiliateUrl(OFFERS.yendo.url, 'tiktok', 'social', 'bio-link-cta')
const SLAM_DUNK_BIO = buildAffiliateUrl(OFFERS.slamDunk.url, 'tiktok', 'social', 'bio-link-fallback')
```

**Option B: Dynamic UTM passthrough**
If TikTok adds UTMs to the bio link itself (e.g., mintbrooks.com/links?utm_source=tiktok&utm_campaign=video-1), the /links page could forward those to the affiliate CTA. This requires client-side JS to read URL params and append to outbound links.

### Recommendation
Start with Option A (static UTMs on /links page). It tells us "traffic from TikTok bio link clicked Yendo." Once we need video-level attribution, switch to Option B.

### Plausible Custom Events
Add Plausible tagged events for:
- `plausible('Yendo-Click', {props: {page: 'links'}})` on CTA click
- `plausible('Email-Capture', {props: {page: 'links'}})` on email submit

These are already supported by the `script.tagged-events.js` we're loading.

### TikTok Bio Link Setup
TikTok bio link should point to: `https://mintbrooks.com/links`
(Not the homepage — the /links page is optimized for single-CTA conversion)

### Next Session
- Verify /links page has tracked affiliate URLs
- Add Plausible custom event tracking to CTA buttons
