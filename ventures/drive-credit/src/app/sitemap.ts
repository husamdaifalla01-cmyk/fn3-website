import { MetadataRoute } from 'next'
import { ARTICLES } from '@/lib/lifestyle/articles'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mintbrooks.com'

  const lifestylePages = [
    '', '/home-decor', '/wellness', '/beauty', '/kitchen',
    '/finance', '/articles', '/about', '/search', '/privacy', '/terms',
  ]

  const financePages = [
    '/finance/calculator', '/finance/bad-credit-credit-card',
    '/finance/credit-card-500-credit-score', '/finance/use-car-as-collateral',
    '/finance/no-credit-history-credit-card', '/finance/credit-card-no-deposit',
    '/finance/emergency-cash-between-paychecks', '/finance/how-it-works',
    '/finance/car-title-loan-alternative', '/finance/car-equity-vs-secured-cards',
    '/finance/how-to-build-credit-with-bad-credit',
    '/finance/how-to-get-credit-card-bad-credit-no-deposit',
    '/finance/yendo-states-guide', '/finance/yendo-credit-card-review',
    '/finance/auto-equity-loan', '/finance/credit-builder-loan',
    '/finance/secured-credit-card-bad-credit', '/finance/qualify',
    '/finance/how-to-rebuild-credit', '/finance/first-credit-card-bad-credit',
    '/finance/credit-card-to-rebuild-credit',
    '/finance/faq',
    '/finance/yendo-review',
    '/finance/car-equity-credit-card-reviews',
    '/finance/does-applying-for-credit-card-hurt-credit',
    '/finance/no-credit-check-credit-card',
  ]

  const articlePages = ARTICLES.map(a => `/articles/${a.slug}`)

  return [
    ...lifestylePages.map(p => ({
      url: `${base}${p}`,
      lastModified: new Date('2026-04-07'),
      changeFrequency: 'weekly' as const,
      priority: p === '' ? 1 : 0.8,
    })),
    ...financePages.map(p => ({
      url: `${base}${p}`,
      lastModified: new Date('2026-03-22'),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...articlePages.map(p => ({
      url: `${base}${p}`,
      lastModified: new Date('2026-04-07'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
