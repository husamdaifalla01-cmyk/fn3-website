# Dev Audit — Page Speed + Tracking Pixels
**Date:** 2026-04-06 | **Agent:** Dev Lead (Pieter Levels lens)
**Task:** driv-task-0002

---

## TRACKING PIXELS STATUS

### ✅ Plausible Analytics
- Script: `plausible.io/js/script.tagged-events.js` with `data-domain=mintbrooks.com`
- Strategy: `afterInteractive` (non-blocking)
- Custom events: `trackEvent()` in `src/lib/analytics.ts` fires `window.plausible()`
- Affiliate clicks tracked: ✅ via `trackAffiliateClick()` + `sendClickToApi()`
- **Status: FULLY OPERATIONAL**

### ⚠️ GA4 (Google Analytics 4)
- Code deployed: ✅ in `src/app/layout.tsx` lines 55-72
- Conditional on: `process.env.NEXT_PUBLIC_GA_ID`
- Env var set in Vercel: ❌ NOT SET
- **Fix required:** Add `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` in Vercel project settings
- Impact: No GA4 data collection until this is set. Plausible is working as fallback.
- **Status: 1-MINUTE FIX PENDING**

### ✅ MaxBounty Click ID Tracking
- Click ID generation: `generateClickId()` in `src/lib/analytics.ts`
- Session persistence: localStorage with 30-min TTL ✅
- API endpoint: `/api/track-click` — logs to Vercel structured logs ✅
- Affiliate URL enrichment: `appendClickId()` + `trackAffiliateClick()` ✅
- Conversion postback: `/api/postback` exists for MaxBounty pixel firing ✅
- **Status: FULLY OPERATIONAL**

---

## PAGE SPEED AUDIT

### Issues Found + Fixed This Session

**🔴 FIXED: Hero image not optimized**
- Before: Raw `<img>` tag loading from Unsplash directly
- Problem: Browser fetched full-resolution image, no WebP/AVIF conversion, no CDN caching by Next.js
- Fix applied: Converted to `<Image fill priority sizes="...">` from `next/image`
- Config added: `next.config.ts` now includes Unsplash remote patterns + AVIF/WebP formats
- Expected improvement: ~40-60% reduction in hero image payload (WebP vs JPEG), LCP improvement 0.5-1.2s

**🟡 PENDING: NEXT_PUBLIC_GA_ID missing**
- GA4 scripts not loading = one less render-blocking concern (net positive for now)
- When added, ensure `strategy="afterInteractive"` is preserved (it is)

### Current Page Speed Assessment

| Metric | Status | Notes |
|--------|--------|-------|
| Hero LCP image | ✅ Fixed | Now uses Next.js Image + priority |
| Font loading | ✅ Good | Inter via `next/font/google` (self-hosted) |
| Script loading | ✅ Good | Plausible + GA4 both `afterInteractive` |
| JS bundle | ✅ Good | App Router + Server Components |
| Image formats | ✅ Fixed | AVIF + WebP enabled in next.config |
| External API calls | ✅ Contained | track-click is fire-and-forget |

### Remaining Speed Recommendations (for next session)
1. Add `rel="preconnect"` to Unsplash domain in layout.tsx `<head>`
2. Consider hosting hero image locally in `/public` to eliminate external dependency
3. Add `loading="lazy"` to any below-fold images

---

## COMMIT SUMMARY
- `next.config.ts`: Added images.remotePatterns for Unsplash + AVIF/WebP formats
- `HeroSection.tsx`: Converted `<img>` → `<Image fill priority sizes>` + added `next/image` import
- TypeScript: 0 errors after changes
