# Mintbrooks.com Page Speed Audit — 2026-04-05

**Auditor:** QA Director (Brain Beehive)
**Target:** < 2 seconds mobile load time
**Status:** Actionable — 5 issues identified, fixes specified

---

## Current Performance Snapshot

### Server & Network (measured via curl)
| Metric | Value |
|--------|-------|
| DNS Lookup | 10ms |
| TCP Connect | 37ms |
| TTFB (Time to First Byte) | 102ms |
| Full HTML Download | 127ms |
| HTML Size (uncompressed) | 127.6 KB |
| HTML Size (gzipped) | 22.8 KB |
| Hosting | Vercel (Edge, HIT cache) |
| CDN Cache Status | HIT |
| HTTP/2 | Yes |

**Verdict:** Server performance is excellent. TTFB of ~100ms is well under the 800ms threshold. Vercel CDN caching is working. The bottlenecks are all client-side.

### Client-Side Resource Budget
| Resource | Size | Count |
|----------|------|-------|
| JavaScript (all chunks) | 716 KB | 14 files |
| CSS | 1 file (bundled via Tailwind) | 1 |
| Font (Inter, WOFF2) | ~20 KB est. | 1 subset |
| Hero Image (Unsplash) | 77 KB (JPEG, external) | 1 |
| Favicon | 25.9 KB (.ico) | 1 |
| Analytics (Plausible) | ~1.5 KB | 1 external script |
| **Total estimated initial load** | **~860 KB** | |

### Estimated Core Web Vitals (based on code analysis)
| Metric | Estimated | Target | Status |
|--------|-----------|--------|--------|
| FCP | ~1.2-1.8s | < 1.8s | Borderline |
| LCP | ~2.5-3.5s | < 2.5s | FAIL - hero image from external origin |
| TBT | ~150-300ms | < 200ms | Borderline - many client components |
| CLS | ~0.02-0.05 | < 0.1 | PASS |
| Speed Index | ~2.0-3.0s | < 3.4s | Marginal |

> Note: Google PageSpeed API was rate-limited (429) at time of audit. Estimates derived from resource analysis, HTML inspection, and curl timing. Run `npx lighthouse https://www.mintbrooks.com --output json` locally for precise numbers.

---

## Top 5 Issues (Priority Order)

### 1. CRITICAL: Hero Image Loaded from External Unsplash CDN (No next/image)

**Impact:** +800-1500ms to LCP on mobile
**File:** `src/components/HeroSection.tsx` (line 150-158)

The hero image is the LCP element on desktop. It uses a raw `<img>` tag loading from `images.unsplash.com`:

```tsx
<img
  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=860&q=85&fit=crop&crop=faces,center"
  alt="People enjoying life with financial freedom"
  width={430}
  height={520}
  loading="eager"
  decoding="async"
/>
```

**Problems:**
- External origin requires DNS lookup + TLS handshake to `images.unsplash.com` (~200-400ms)
- No responsive `srcset` — serves 860px wide image to all devices
- JPEG format instead of WebP/AVIF (77KB vs ~30KB potential)
- No `fetchpriority="high"` hint
- Not routed through Vercel Image Optimization

**Fix:**
1. Download the image to `public/images/hero-lifestyle.jpg`
2. Use `next/image` with `priority` prop:
```tsx
import Image from 'next/image'

<Image
  src="/images/hero-lifestyle.jpg"
  alt="People enjoying life with financial freedom"
  width={430}
  height={520}
  priority
  className="w-full h-full object-cover object-top"
  sizes="(max-width: 1024px) 0px, 430px"
/>
```
3. Add image domain config to `next.config.ts`:
```ts
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};
```

**Expected improvement:** -800ms to LCP (eliminates external origin, auto-serves WebP/AVIF, responsive sizing)

---

### 2. HIGH: 8 of 9 Components Are 'use client' — Excessive Client-Side JS

**Impact:** +200-500ms TBT, larger JS bundle
**Files:**
- `src/components/HeroSection.tsx` — `'use client'`
- `src/components/NavBar.tsx` — `'use client'`
- `src/components/ProductDemo.tsx` — `'use client'`
- `src/components/TestimonialsSection.tsx` — `'use client'`
- `src/components/CarCalculator.tsx` — `'use client'`
- `src/components/ExitIntentPopup.tsx` — `'use client'`
- `src/components/AffiliateLink.tsx` — `'use client'`
- `src/components/CreditEducation.tsx` — NOT client (good)
- `src/components/LinksEmailCapture.tsx` — `'use client'`

**Why this matters:** Every `'use client'` component ships its full React component code to the browser and must hydrate. Several of these only use `'use client'` for a single `onClick` handler (trackAffiliateClick).

**Fix — convert to Server Components where possible:**

**NavBar.tsx:** Only needs client for the onClick on the CTA button. Extract just the CTA into a tiny client component:
```tsx
// NavBar.tsx — remove 'use client', make server component
// NavCTA.tsx — 'use client', just the button with onClick
```

**TestimonialsSection.tsx:** Only client for a single `onClick`. Same pattern — extract the CTA button.

**ProductDemo.tsx:** Same — only client for onClick on affiliate link.

**HeroSection.tsx:** Only client for trackAffiliateClick. Extract CTA button.

**Expected improvement:** -100-200ms TBT, -50-100KB JS transferred

---

### 3. HIGH: Remotion Dependencies in package.json (Not Used in App)

**Impact:** Potentially +100-200KB to node_modules parse/bundle if tree-shaking fails
**File:** `package.json`

```json
"@remotion/cli": "^4.0.443",
"@remotion/player": "^4.0.443",
"remotion": "^4.0.443",
```

Remotion is only used in `src/remotion/` for TikTok video generation — it is NOT imported anywhere in the app routes or components. However, having it in `dependencies` (not `devDependencies`) means:
- It inflates `node_modules` and build times
- Any accidental import would pull ~500KB+ into the client bundle
- It may affect Vercel cold start times for API routes

**Fix:**
1. Move to `devDependencies` or a separate workspace:
```json
"devDependencies": {
  "@remotion/cli": "^4.0.443",
  "@remotion/player": "^4.0.443",
  "remotion": "^4.0.443",
}
```
2. Or better: move Remotion to a separate `packages/video` workspace that doesn't affect the Next.js build.

**Expected improvement:** Faster builds, reduced risk. Minimal direct page speed impact unless tree-shaking is failing.

---

### 4. MEDIUM: Oversized Favicon (25.9 KB .ico format)

**Impact:** +50-100ms on slow connections, wasted bandwidth on every page
**File:** `src/app/favicon.ico` — 25,931 bytes

A 26KB favicon is 5-10x larger than necessary. Modern best practice is a small PNG or SVG.

**Fix:**
1. Create a 32x32 PNG favicon (~1-2KB) and a 180x180 apple-touch-icon
2. Add to `src/app/layout.tsx`:
```tsx
export const metadata: Metadata = {
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  // ... rest
}
```
3. Delete the 26KB .ico file

**Expected improvement:** -24KB per page load

---

### 5. MEDIUM: No Font Display Strategy / Preload Hint

**Impact:** +100-200ms FCP on cold loads (FOIT risk)
**File:** `src/app/layout.tsx` (line 7)

```tsx
const inter = Inter({ subsets: ["latin"] });
```

Next.js `next/font/google` handles `font-display: swap` by default, which is good. However:
- There is no explicit `display: 'swap'` to make it visible in code review
- The font file is not preloaded with `<link rel="preload">` — Next.js should handle this automatically, but verify in production HTML
- The CSS also references `font-family: 'Inter', system-ui, sans-serif` in `globals.css` (line 26), which could conflict with the Next.js font variable approach

**Fix:**
1. Make display strategy explicit:
```tsx
const inter = Inter({ subsets: ["latin"], display: "swap" });
```
2. Use the CSS variable approach for consistency:
```tsx
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
// In <html>: className={inter.variable}
```
3. In `globals.css`, use the variable:
```css
body {
  font-family: var(--font-inter), system-ui, sans-serif;
}
```

**Expected improvement:** Eliminates flash-of-invisible-text risk, ensures font loading is deterministic.

---

## Additional Observations (Lower Priority)

### ExitIntentPopup Loads at App Root
`src/app/layout.tsx` line 60 mounts `<ExitIntentPopup />` in the root layout. This component:
- Is `'use client'` with useState, useEffect, useCallback, useRef
- Registers scroll listeners and mouseleave handlers immediately
- Ships ~5KB of component JS on every single page

**Recommendation:** Lazy-load with `dynamic(() => import(...), { ssr: false })` so it loads after initial paint.

### No `<meta name="viewport">` Explicitly Set
Next.js adds this automatically, but verify it appears in production HTML. Missing viewport meta causes mobile layout recalculations.

### Inline Styles vs. Tailwind
Many components use inline `style={{}}` objects (e.g., HeroSection has 15+ inline styles). While this doesn't directly impact load time, it:
- Increases HTML document size (the 127KB HTML is larger than typical)
- Prevents CSS deduplication
- Consider migrating to Tailwind utility classes for smaller HTML payload

### 307 Redirect: mintbrooks.com -> www.mintbrooks.com
The bare domain redirects with a 307. This adds ~100ms for users who type without `www.`. Not a code fix — configure in Vercel dashboard to set `www` as the primary or vice versa.

---

## Summary Action Plan

| Priority | Issue | Expected LCP Impact | Effort |
|----------|-------|-------------------|--------|
| P0 | Self-host hero image + use next/image | -800ms | 30 min |
| P1 | Convert 4 components to Server Components | -200ms TBT | 2 hours |
| P1 | Lazy-load ExitIntentPopup | -100ms TBT | 15 min |
| P2 | Move Remotion to devDependencies | Build safety | 5 min |
| P2 | Optimize favicon to PNG | -24KB | 15 min |
| P3 | Explicit font display strategy | -100ms FCP risk | 10 min |

**After P0 + P1 fixes, estimated mobile LCP: ~1.5-2.0s (target achieved).**

---

## How to Verify

```bash
# Local Lighthouse audit
npx lighthouse https://www.mintbrooks.com --output html --output-path ./lighthouse-report.html

# Or via Chrome DevTools
# 1. Open https://www.mintbrooks.com in Chrome
# 2. DevTools → Lighthouse tab → Mobile → Performance → Analyze

# PageSpeed Insights (when API quota resets)
# https://pagespeed.web.dev/analysis?url=https://www.mintbrooks.com
```
