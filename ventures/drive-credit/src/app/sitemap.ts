import { MetadataRoute } from 'next'
import { ARTICLES } from '@/lib/lifestyle/articles'
import { routing } from '@/i18n/routing'

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
  ]

  // Static editorial articles in /public/articles/editorial/
  const editorialSlugs = [
    'affordable-art-prints', 'bedroom-feel-expensive', 'build-credit-bad-credit',
    'build-credit-from-scratch', 'candle-warmer-lamp', 'cast-iron-skillet-guide',
    'clean-beauty-explained', 'coffee-bar-setup', 'coffee-table-styling',
    'cotton-throw-blankets', 'credit-utilization-explained', 'diffuser-oil-combinations',
    'hatch-alarm-clock-review', 'kitchen-knives-guide', 'kitchen-organization',
    'linen-vs-cotton-bedding', 'meal-prep-containers', 'morning-rituals',
    'pour-over-vs-french-press', 'retinol-mistakes', 'secured-vs-unsecured-cards',
    'shelf-decor-321-rule', 'skincare-routine-sensitive-skin', 'sleep-routine-vs-supplements',
    'spf-moisturizer-vs-sunscreen', 'use-credit-card-responsibly', 'vitamin-c-serum-review',
    'weighted-blankets-guide', 'what-is-credit-score',
  ]

  // Static affiliate articles in /public/articles/affiliate/
  const affiliateSlugs = [
    'anova-nano-vs-inkbird-isv-100w-sous-vide-comparison', 'best-air-fryer-small-spaces',
    'best-anti-aging-serum', 'best-anti-aging-serum-beginners-budget',
    'best-anti-aging-serums-2024', 'best-anti-aging-serums-for-beginners',
    'best-birthday-gifts-women-under-40', 'best-birthday-self-care-packages-women',
    'best-budget-drip-irrigation-kits', 'best-budget-friendly-eyeshadow-palettes-under-50',
    'best-chunky-knit-throw-blanket-under-50', 'best-clean-beauty-foundation-for-beginners',
    'best-clean-beauty-gifts-under-50-travel-luxury', 'best-clean-beauty-products-under-35',
    'best-clean-liquid-foundation', 'best-compact-budget-air-fryer-small-kitchen',
    'best-dark-spot-corrector-serum-under-50', 'best-drip-irrigation-kits',
    'best-drip-irrigation-system', 'best-everyday-eyeshadow-palette',
    'best-eyeshadow-palette-under-30', 'best-eyeshadow-palette-under-50',
    'best-garden-tool-set-for-women', 'best-garden-tool-set-for-women-gifts',
    'best-garden-tool-sets-for-women', 'best-get-well-soon-gift-basket',
    'best-get-well-soon-gift-baskets', 'best-hair-bonding-oil-olaplex-7-review',
    'best-hair-gloss-glass-hair-trend', 'best-large-sous-vide-container-family-meal-prep',
    'best-linen-bedding-sets', 'best-linen-duvet-cover-sets-luxury-budget',
    'best-luxury-hair-products-under-40', 'best-neutral-eyeshadow-palette',
    'best-self-care-gift-baskets-women', 'best-serum-for-dark-spots',
    'best-serums-dark-spots-brightening-enlarged-pores-2024', 'best-skincare-serums-under-50',
    'best-sous-vide-machine-review', 'best-vintage-self-care-gift-basket',
    'best-vintage-self-care-gift-baskets', 'best-waffle-duvet-cover-queen',
    'best-waffle-duvet-cover-queen-aesthetic',
    'clean-beauty-foundation-comparison-harvest-natural-beauty-jerome-alexander-clinique-bareminerals',
    'clean-foundation-for-beginners', 'drip-irrigation-kit-comparison',
    'harvest-natural-beauty-vs-jerome-alexander-foundation-beginners',
    'kerastase-kenra-glass-hair-showdown', 'kerastase-nutritive-8h-magic-night-serum-review',
    'la-roche-posay-vitamin-c-vs-retinol', 'sous-vide-accessories-large-batches',
    'too-faced-born-this-way-vs-tarte-tartelette-in-bloom', 'vitamin-c-vs-niacinamide-for-skin',
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
