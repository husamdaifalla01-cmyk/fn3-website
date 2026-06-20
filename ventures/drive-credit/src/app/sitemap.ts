import { MetadataRoute } from 'next'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

// Prerender at build so git/fs lookups run on the build host (where the repo
// filesystem exists) rather than on the Cloudflare Worker (where it doesn't).
export const dynamic = 'force-static'

// Per-URL lastmod: derived from real git commit time (filesystem mtime fallback)
// so the value reflects content changes, not build time.
function gitMtime(relPath: string): Date {
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${relPath}"`, {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    if (iso) return new Date(iso)
  } catch {}
  try {
    return fs.statSync(path.join(process.cwd(), relPath)).mtime
  } catch {}
  return new Date()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mintbrooks.com'

  // Topical focus = finance. The lifestyle/affiliate/editorial articles are
  // de-indexed (noindex, kept live) to concentrate the domain's authority on
  // /finance, so they no longer belong in the sitemap. Only finance, the core
  // legal/brand pages, and the paid product are advertised.
  const corePages: { path: string; src: string }[] = [
    { path: '',        src: 'src/app/[locale]/page.tsx' },
    { path: '/about',  src: 'src/app/[locale]/about/page.tsx' },
    { path: '/privacy',src: 'src/app/[locale]/privacy/page.tsx' },
    { path: '/terms',  src: 'src/app/[locale]/terms/page.tsx' },
  ]

  // Finance pages — English only, no locale prefix (canonical = /finance/<slug>).
  const financePages: string[] = [
    'finance',
    'finance/calculator',
    'finance/bad-credit-credit-card',
    'finance/credit-card-500-credit-score',
    'finance/credit-sequence-order-of-operations',
    'finance/use-car-as-collateral',
    'finance/no-credit-history-credit-card',
    'finance/credit-card-no-deposit',
    'finance/emergency-cash-between-paychecks',
    'finance/how-it-works',
    'finance/car-title-loan-alternative',
    'finance/car-equity-vs-secured-cards',
    'finance/how-to-build-credit-with-bad-credit',
    'finance/how-to-get-credit-card-bad-credit-no-deposit',
    'finance/yendo-states-guide',
    'finance/yendo-credit-card-review',
    'finance/auto-equity-loan',
    'finance/credit-builder-loan',
    'finance/secured-credit-card-bad-credit',
    'finance/qualify',
    'finance/how-to-rebuild-credit',
    'finance/first-credit-card-bad-credit',
    'finance/credit-card-to-rebuild-credit',
    'finance/faq',
    'finance/yendo-review',
    'finance/car-equity-credit-card-reviews',
    'finance/does-applying-for-credit-card-hurt-credit',
    'finance/no-credit-check-credit-card',
    'finance/build-credit-with-your-car',
    'finance/debt-consolidation-check',
    'finance/personal-loans-up-to-50k',
    'finance/car-equity-loan-requirements',
    'finance/what-credit-score-do-you-need-for-a-credit-card',
  ]

  // Paid product (money page) — was missing from the sitemap entirely.
  const productPages: string[] = ['products/90-day-money-reset']

  const entries: MetadataRoute.Sitemap = []

  for (const { path: p, src } of corePages) {
    const url = `${base}/en${p}`.replace(/\/$/, '') || `${base}/en`
    entries.push({ url, lastModified: gitMtime(src), changeFrequency: 'monthly', priority: 0.6 })
  }
  for (const p of financePages) {
    entries.push({
      url: `${base}/${p}`,
      lastModified: gitMtime(`src/app/${p}/page.tsx`),
      changeFrequency: 'weekly',
      priority: p === 'finance' ? 0.9 : 0.8,
    })
  }
  for (const p of productPages) {
    entries.push({ url: `${base}/${p}`, lastModified: gitMtime(`src/app/${p}/page.tsx`), changeFrequency: 'monthly', priority: 0.9 })
  }

  return entries
}
