import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    // Disable webpack build worker threads — prevents next-intl alias race
    // condition when multiple static generation workers run in parallel
    webpackBuildWorker: false,
  },
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true, // required for Cloudflare Pages
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'm.media-amazon.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images-na.ssl-images-amazon.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images-eu.ssl-images-amazon.com', pathname: '/**' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    const lifestyleRedirects = [
      'beauty', 'home-decor', 'kitchen', 'wellness', 'search',
      'privacy', 'terms', 'about', 'articles', 'finance',
    ].map((path) => ({
      source: `/lifestyle/${path === 'articles' ? 'articles/:slug*' : path}`,
      destination: `/${path === 'articles' ? 'articles/:slug*' : path}`,
      permanent: true,
    }))

    const financeRedirects = [
      'auto-equity-loan', 'bad-credit-credit-card', 'calculator',
      'car-equity-credit-card-reviews', 'car-equity-vs-secured-cards',
      'car-title-loan-alternative', 'credit-builder-loan',
      'credit-card-500-credit-score', 'credit-card-no-deposit',
      'credit-card-to-rebuild-credit', 'does-applying-for-credit-card-hurt-credit',
      'emergency-cash-between-paychecks', 'faq', 'first-credit-card-bad-credit',
      'how-it-works', 'how-to-build-credit-with-bad-credit',
      'how-to-get-credit-card-bad-credit-no-deposit', 'how-to-rebuild-credit',
      'links', 'no-credit-history-credit-card', 'qualify',
      'secured-credit-card-bad-credit', 'use-car-as-collateral',
      'yendo-credit-card-review', 'yendo-review', 'yendo-states-guide',
    ].map((path) => ({
      source: `/${path}`,
      destination: `/finance/${path}`,
      permanent: true,
    }))

    // Old date-stamped CPA URLs from the initial rollout — redirect to the
    // stable slugs that replaced them so bookmarks + social shares still work.
    // next-intl middleware rewrites to locale-prefixed URLs before Next.js
    // redirects fire, and `:locale` as a source param doesn't match reliably
    // on OpenNext/CF. So we enumerate every locale explicitly.
    const LOCALES = ['en-CA', 'en-GB', 'fr', 'de', 'it', 'nl', 'pl', 'es', 'sv']
    const cpaSlugPairs: [string, string][] = [
      ['yendo-bad-credit-approval-odds-20260424', 'yendo-bad-credit-approval-odds'],
      ['slamdunk-debt-consolidation-real-options-20260424', 'slamdunk-debt-consolidation-real-options'],
      ['fast-personal-loans-bad-credit-approval-20260424', 'fast-personal-loans-bad-credit-approval'],
      ['emergency-cash-loans-bad-credit-20260424', 'emergency-cash-loans-bad-credit'],
      ['compare-personal-loans-bad-credit-20-lenders-20260424', 'compare-personal-loans-bad-credit-20-lenders'],
    ]
    const cpaStableRedirects = cpaSlugPairs.flatMap(([oldSlug, newSlug]) => [
      { source: `/articles/${oldSlug}`,                destination: `/articles/${newSlug}`,                permanent: true },
      { source: `/articles/editorial/${oldSlug}`,      destination: `/articles/${newSlug}`,                permanent: true },
      { source: `/articles/editorial/${oldSlug}.html`, destination: `/articles/${newSlug}`,                permanent: true },
      ...LOCALES.map((loc) => ({
        source: `/${loc}/articles/${oldSlug}`,
        destination: `/${loc}/articles/${newSlug}`,
        permanent: true,
      })),
    ])

    // Bare (unprefixed) paths serve a prerendered 404 on OpenNext — middleware never
    // fires for them, which is how every ranked /articles/<slug> URL went dark. Route
    // them permanently to their /en/ canonicals at the routing-manifest layer, which
    // OpenNext evaluates reliably. (The old '/en/:path*' -> '/:path*' rule was the
    // inverse of this build's structure and a redirect-loop landmine — removed.)
    const bareToEnRedirects = [
      ...['beauty', 'home-decor', 'kitchen', 'wellness', 'search', 'reading-list', 'about'].map(
        (p) => ({ source: `/${p}`, destination: `/en/${p}`, permanent: true })
      ),
      { source: '/articles', destination: '/en/articles', permanent: true },
      // dynamic article pages only — the static public trees keep their bare URLs
      { source: '/articles/:slug((?!affiliate|editorial).*)', destination: '/en/articles/:slug', permanent: true },
    ]

    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.mintbrooks.com' }],
        destination: 'https://mintbrooks.com/:path*',
        permanent: true,
      },
      ...cpaStableRedirects,
      ...lifestyleRedirects,
      ...financeRedirects,
      { source: '/lifestyle', destination: '/', permanent: true },
      { source: '/tiktok', destination: '/finance/links', permanent: false },
      { source: '/finance/yendo-review', destination: '/finance/yendo-credit-card-review', permanent: true },
      ...bareToEnRedirects,
    ]
  },
}

export default withNextIntl(nextConfig)
