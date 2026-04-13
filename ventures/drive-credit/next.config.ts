import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
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

    return [
      { source: '/en/:path*', destination: '/:path*', permanent: true },
      ...lifestyleRedirects,
      ...financeRedirects,
      { source: '/lifestyle', destination: '/', permanent: true },
      { source: '/tiktok', destination: '/finance/links', permanent: false },
      { source: '/finance/yendo-review', destination: '/finance/yendo-credit-card-review', permanent: true },
    ]
  },
}

export default withNextIntl(nextConfig)
