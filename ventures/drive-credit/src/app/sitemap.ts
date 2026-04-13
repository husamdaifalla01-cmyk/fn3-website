import { MetadataRoute } from 'next'
import { ARTICLES } from '@/lib/lifestyle/articles'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mintbrooks.com'
  const locales = routing.locales
  const now = new Date('2026-04-13')

  // Lifestyle pages — translated for every locale
  const lifestylePaths = [
    '', '/home-decor', '/wellness', '/beauty', '/kitchen', '/articles', '/about', '/search', '/privacy', '/terms',
  ]

  // Finance pages — English only, no locale prefix
  const financePages = [
    '/finance', '/finance/calculator', '/finance/bad-credit-credit-card',
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
    '/finance/faq', '/finance/yendo-review',
    '/finance/car-equity-credit-card-reviews',
    '/finance/does-applying-for-credit-card-hurt-credit',
    '/finance/no-credit-check-credit-card',
  ]

  const articleSlugs = ARTICLES.map((a) => `/articles/${a.slug}`)

  const entries: MetadataRoute.Sitemap = []

  // Locale-aware lifestyle pages
  for (const locale of locales) {
    const prefix = locale === 'en' ? '' : `/${locale}`
    for (const path of lifestylePaths) {
      entries.push({
        url: `${base}${prefix}${path || '/'}`.replace(/\/$/, '') || base,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: path === '' ? (locale === 'en' ? 1.0 : 0.9) : 0.8,
      })
    }
    // Article pages per locale
    for (const slug of articleSlugs) {
      entries.push({
        url: `${base}${prefix}${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  // Finance pages — English only
  for (const path of financePages) {
    entries.push({
      url: `${base}${path}`,
      lastModified: new Date('2026-03-22'),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  return entries
}
