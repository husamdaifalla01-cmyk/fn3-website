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
    const cpaStableRedirects = [
      ['yendo-bad-credit-approval-odds-20260424', 'yendo-bad-credit-approval-odds'],
      ['slamdunk-debt-consolidation-real-options-20260424', 'slamdunk-debt-consolidation-real-options'],
      ['fast-personal-loans-bad-credit-approval-20260424', 'fast-personal-loans-bad-credit-approval'],
      ['emergency-cash-loans-bad-credit-20260424', 'emergency-cash-loans-bad-credit'],
      ['compare-personal-loans-bad-credit-20-lenders-20260424', 'compare-personal-loans-bad-credit-20-lenders'],
    ].flatMap(([oldSlug, newSlug]) => [
      { source: `/articles/${oldSlug}`,                   destination: `/articles/${newSlug}`,                   permanent: true },
      { source: `/:locale/articles/${oldSlug}`,           destination: `/:locale/articles/${newSlug}`,           permanent: true },
      { source: `/articles/editorial/${oldSlug}`,         destination: `/articles/${newSlug}`,                   permanent: true },
      { source: `/articles/editorial/${oldSlug}.html`,    destination: `/articles/${newSlug}`,                   permanent: true },
    ])

    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.mintbrooks.com' }],
        destination: 'https://mintbrooks.com/:path*',
        permanent: true,
      },
      { source: '/en/:path*', destination: '/:path*', permanent: true },
      ...cpaStableRedirects,
      ...lifestyleRedirects,
      ...financeRedirects,
      { source: '/lifestyle', destination: '/', permanent: true },
      { source: '/tiktok', destination: '/finance/links', permanent: false },
      { source: '/finance/yendo-review', destination: '/finance/yendo-credit-card-review', permanent: true },
    ]
  },
}

export default withNextIntl(nextConfig)
