import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mintbrooks.com'
  const pages = [
    '', '/calculator', '/bad-credit-credit-card', '/credit-card-500-credit-score',
    '/use-car-as-collateral', '/no-credit-history-credit-card', '/credit-card-no-deposit',
    '/emergency-cash-between-paychecks', '/how-it-works',
    '/car-title-loan-alternative', '/car-equity-vs-secured-cards', '/how-to-build-credit-with-bad-credit',
    '/how-to-get-credit-card-bad-credit-no-deposit', '/yendo-states-guide', '/yendo-credit-card-review',
    '/auto-equity-loan', '/credit-builder-loan', '/secured-credit-card-bad-credit',
    '/yendo-review', '/qualify', '/links',
  ]
  return pages.map(p => ({
    url: `${base}${p}`,
    lastModified: new Date('2026-03-22'),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.8,
  }))
}
