# Dev Audit: Page Speed + Tracking Verification
## Dev Lead — 2026-04-05

### Tracking Pixels — Status

| Tracker | Implementation | Status |
|---------|---------------|--------|
| Plausible Analytics | `script.tagged-events.js` via Next.js `<Script>` afterInteractive | LIVE ✅ |
| Google Analytics (GA4) | Conditional on `NEXT_PUBLIC_GA_ID` env var | ⚠️ VERIFY env var is set in Vercel |
| MaxBounty click tracking | afflat3e3.com tracking URLs with UTMs | LIVE ✅ |
| Affiliate UTMs | Per-placement UTMs via `buildAffiliateUrl()` | LIVE ✅ — 7 homepage placements, 4 TikTok campaign URLs |

### Affiliate URL Architecture — Verified ✅
- `src/lib/offers.ts` — clean separation of base URLs, UTM builder, campaign URLs
- Homepage: 7 distinct utm_campaign values (hero, how-it-works, testimonials, demo, final-cta, nav, calculator)
- TikTok: 4 pre-built campaign URLs (car-equity-secret, credit-system-broken, how-it-works-proof, state-availability)
- Slam Dunk fallback: 2 placements (footer, calculator)

### Page Speed Assessment

**Positive factors:**
- Next.js 16 with App Router (automatic code splitting, server components)
- Inter font via `next/font/google` (self-hosted, no external request)
- Plausible script is deferred + afterInteractive
- GA4 scripts are conditional + afterInteractive
- No heavy client-side JS libraries detected in layout

**Potential concerns:**
- `ExitIntentPopup` is loaded in layout (renders on every page) — verify it's lazy
- No explicit image optimization config in `next.config.ts` (empty config)
- Schema.org JSON-LD is inlined (good — no extra request)

### Recommendations
1. **ACTION NEEDED:** Verify `NEXT_PUBLIC_GA_ID` is set in Vercel env vars — if not, GA4 is silently disabled
2. **OPTIONAL:** Add image optimization config to next.config.ts if hero uses external images
3. **GOOD:** Affiliate tracking is well-architected — per-placement UTMs will show exactly where clicks originate

### Bio Links Page (TikTok traffic landing)
- `/links/page.tsx` exists — this is the TikTok bio link destination
- Critical that UTMs on this page use `source=tiktok` and `medium=social`

### Next Session
- Run Lighthouse audit once site has real traffic to establish baseline
- Verify ExitIntentPopup is code-split / lazy loaded
