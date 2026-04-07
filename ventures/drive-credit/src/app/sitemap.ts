import { MetadataRoute } from 'next'
import { ARTICLES } from '@/lib/lifestyle/articles'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mintbrooks.com'

  // ── Core DriveCredit pages ───────────────────────────────────────────────────
  const corePages = [
    '', '/calculator', '/bad-credit-credit-card', '/credit-card-500-credit-score',
    '/use-car-as-collateral', '/no-credit-history-credit-card', '/credit-card-no-deposit',
    '/emergency-cash-between-paychecks', '/how-it-works',
    '/car-title-loan-alternative', '/car-equity-vs-secured-cards', '/how-to-build-credit-with-bad-credit',
    '/how-to-get-credit-card-bad-credit-no-deposit', '/yendo-states-guide', '/yendo-credit-card-review',
    '/auto-equity-loan', '/credit-builder-loan', '/secured-credit-card-bad-credit',
    '/yendo-review', '/qualify', '/links', '/how-to-rebuild-credit',
    '/first-credit-card-bad-credit',
  ]

  // ── Lifestyle section pages ──────────────────────────────────────────────────
  const lifestylePages = [
    '/lifestyle',
    '/lifestyle/home-decor',
    '/lifestyle/wellness',
    '/lifestyle/beauty',
    '/lifestyle/kitchen',
    '/lifestyle/finance',
    '/lifestyle/articles',
    '/lifestyle/about',
    '/lifestyle/search',
    '/lifestyle/privacy',
    '/lifestyle/terms',
  ]

  // ── Individual article pages (30 articles) ───────────────────────────────────
  const articlePages = ARTICLES.map(a => `/lifestyle/articles/${a.slug}`)

  const coreEntries: MetadataRoute.Sitemap = corePages.map(p => ({
    url: `${base}${p}`,
    lastModified: new Date('2026-03-22'),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.8,
  }))

  const lifestyleEntries: MetadataRoute.Sitemap = lifestylePages.map(p => ({
    url: `${base}${p}`,
    lastModified: new Date('2026-04-06'),
    changeFrequency: 'weekly' as const,
    priority: p === '/lifestyle' ? 0.9 : 0.8,
  }))

  const articleEntries: MetadataRoute.Sitemap = articlePages.map(p => ({
    url: `${base}${p}`,
    lastModified: new Date('2026-04-06'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...coreEntries, ...lifestyleEntries, ...articleEntries]
}
