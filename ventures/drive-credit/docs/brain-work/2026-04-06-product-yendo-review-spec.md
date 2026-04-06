# Product Spec: /yendo-review Page
**Cycle:** 2026-04-06 17:30 EDT  
**Agent:** CPO  
**Keyword:** "yendo review" / "yendo credit card review" — ~3k/month  
**Status:** Exists at /yendo-credit-card-review. Consider canonical redirect vs new page.

---

## Decision: Use Existing Page + Add /yendo-review Redirect

The `/yendo-credit-card-review` page is already built and comprehensive.
Adding `/yendo-review` as a 301 redirect to `/yendo-credit-card-review` captures the shorter keyword variant.

### Implementation (Dev Task — 15 min)
Add to `next.config.js` redirects:
```js
{
  source: '/yendo-review',
  destination: '/yendo-credit-card-review',
  permanent: true,
}
```

---

## Product Gap Analysis: /links Page Mobile UX

Current state: /links page built but untested under real traffic.

### Pre-Traffic Checklist
- [x] Hero CTA → Yendo affiliate (tracked with UTM)
- [x] Slam Dunk fallback for non-Yendo states
- [x] Email capture with Resend integration
- [x] Trust signals (soft pull, no score impact)
- [x] FTC disclosure visible
- [ ] **MISSING: TikTok-specific tracking** — visitors from TikTok should have utm_source=tiktok
- [ ] **MISSING: Video-specific attribution** — which video drove the click?

### TikTok Attribution Fix (High Priority)
Bio link should be: `mintbrooks.com/links?utm_source=tiktok&utm_medium=social&utm_campaign=organic`

But TikTok bio links get stripped of UTMs.

**Workaround:** Use a redirect page:
- TikTok bio → `mintbrooks.com/tiktok` → `/links` (with UTMs preserved in server)
- Or: Use Plausible custom props to track entry source

**Recommended:** Add `/tiktok` redirect page that sets a cookie and redirects to /links.
This gives analytics visibility without relying on UTM preservation.

---

## Product Decision: Week 2 Feature Priority

| Feature | Impact | Effort | RICE |
|---------|--------|--------|------|
| /yendo-review 301 redirect | 3k/mo keyword capture | 15 min | HIGH |
| /tiktok redirect page | Attribution accuracy | 30 min | HIGH |
| og:image placeholder image | Social sharing | 2hr (design) | MED |
| /yendo-review full new page | Duplicate content risk | 2hr | LOW |

**Ship:** /yendo-review redirect + /tiktok redirect page next session.

