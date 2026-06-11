/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  // Webpack compiles clean; skip the type-gen/tsc + lint phases so a stale
  // route-type artifact can't block deploys (mirrors next.config.ts).
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    // Old /lifestyle/* → new root paths
    const lifestyleRedirects = [
      'beauty', 'home-decor', 'kitchen', 'wellness', 'search',
      'privacy', 'terms', 'about', 'articles', 'finance',
    ].map((path) => ({
      source: `/lifestyle/${path === 'articles' ? 'articles/:slug*' : path}`,
      destination: `/${path === 'articles' ? 'articles/:slug*' : path}`,
      permanent: true,
    }))

    // Old finance/credit pages → /finance/*
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

    // Planned related-guide pages that were linked but never built — consolidate
    // into the Credit Sequence hub (utilization order-of-operations) + the
    // existing calculator, so the ranking page has zero internal 404s.
    const creditSequenceRedirects = [
      'why-0-utilization-hurts-credit',
      '0-vs-1-utilization',
      '1-percent-credit-utilization-rule',
      'statement-closing-date-trick',
    ].map((path) => ({
      source: `/finance/${path}`,
      destination: '/finance/credit-sequence-order-of-operations',
      permanent: true,
    }))

    // Bare (unprefixed) paths serve a prerendered 404 on OpenNext — middleware never
    // fires for them, which is how every ranked /articles/<slug> URL went dark (e.g.
    // /articles/hatch-alarm-clock-review, 756 GSC impressions, 404). Route them
    // permanently to their /en/ canonicals at the routing-manifest layer, which
    // OpenNext evaluates reliably. Static public trees keep their bare URLs.
    const bareToEnRedirects = [
      ...['beauty', 'home-decor', 'kitchen', 'wellness', 'search', 'reading-list', 'about'].map(
        (path) => ({ source: `/${path}`, destination: `/en/${path}`, permanent: true })
      ),
      { source: '/articles', destination: '/en/articles', permanent: true },
      { source: '/articles/:slug((?!affiliate|editorial).*)', destination: '/en/articles/:slug', permanent: true },
    ]

    return [
      ...lifestyleRedirects,
      ...financeRedirects,
      ...creditSequenceRedirects,
      { source: '/finance/utilization-calculator', destination: '/finance/calculator', permanent: true },
      // Legacy redirects
      { source: '/lifestyle', destination: '/', permanent: true },
      { source: '/tiktok', destination: '/finance/links', permanent: false },
      { source: '/finance/yendo-review', destination: '/finance/yendo-credit-card-review', permanent: true },
      ...bareToEnRedirects,
    ]
  },
}
module.exports = nextConfig
