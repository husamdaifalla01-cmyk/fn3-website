/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
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

    return [
      ...lifestyleRedirects,
      ...financeRedirects,
      // Legacy redirects
      { source: '/lifestyle', destination: '/', permanent: true },
      { source: '/tiktok', destination: '/finance/links', permanent: false },
      { source: '/finance/yendo-review', destination: '/finance/yendo-credit-card-review', permanent: true },
    ]
  },
}
module.exports = nextConfig
