import { MetadataRoute } from 'next'
import { ARTICLES } from '@/lib/lifestyle/articles'
import { routing } from '@/i18n/routing'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mintbrooks.com'
  const locales = routing.locales
  const now = new Date('2026-04-13')

  // Lifestyle pages — translated for every locale
  const lifestylePaths = [
    '', '/home-decor', '/wellness', '/beauty', '/kitchen', '/articles', '/about', '/reading-list', '/search', '/privacy', '/terms',
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
    '/finance/build-credit-with-your-car',
    '/finance/debt-consolidation-check',
    '/finance/personal-loans-up-to-50k',
    '/finance/car-equity-loan-requirements',
    '/finance/what-credit-score-do-you-need-for-a-credit-card',
    '/finance/links',
  ]

  // Dynamic — reads /public/articles/* at build time, always up to date
  const publicDir = path.join(process.cwd(), 'public', 'articles')
  const editorialSlugs = fs.existsSync(path.join(publicDir, 'editorial'))
    ? fs.readdirSync(path.join(publicDir, 'editorial'))
        .filter(f => f.endsWith('.html'))
        .map(f => f.replace('.html', ''))
    : []
  const affiliateSlugs = fs.existsSync(path.join(publicDir, 'affiliate'))
    ? fs.readdirSync(path.join(publicDir, 'affiliate'))
        .filter(f => fs.statSync(path.join(publicDir, 'affiliate', f)).isDirectory())
    : []

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

  // Static editorial HTML articles
  for (const slug of editorialSlugs) {
    entries.push({
      url: `${base}/articles/editorial/${slug}.html`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  // Static affiliate HTML articles
  for (const slug of affiliateSlugs) {
    entries.push({
      url: `${base}/articles/affiliate/${slug}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  return entries
}
