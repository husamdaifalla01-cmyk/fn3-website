import { readdirSync, readFileSync, existsSync, statSync } from 'fs'
import { join } from 'path'
import os from 'os'

export interface Product {
  asin: string
  name: string
  price: number
  rating: number
  review_count: number
  affiliate_url: string
  image_url: string
  pin_image_url: string | null
  primary_image_url: string
  has_pin: boolean
  category: string
}

const CACHE_DIR = join(os.homedir(), 'Downloads/amazon/data/product_cache')
const OUTPUT_DIR = join(os.homedir(), 'Downloads/amazon/output')

// Map Amazon/Pinterest bot niches to Mintbrooks categories
const NICHE_TO_CATEGORY: Record<string, string> = {
  clean_beauty: 'beauty', skincare: 'beauty', makeup: 'beauty', hair: 'beauty', nail_art: 'beauty',
  home_decor: 'home-decor', bathroom: 'home-decor', organization: 'home-decor',
  candles_cozy: 'home-decor', outdoor_garden: 'home-decor',
  kitchen: 'kitchen',
  wellness: 'wellness', fitness: 'wellness',
  jewelry: 'lifestyle', fashion_accessories: 'lifestyle', gift_ideas: 'lifestyle',
}

/**
 * Scan all run directories and return:
 *   nbAsins  — ASINs with a Nano Banana lifestyle image (_nb.jpg) — served via API
 *   pinAsins — ASINs that were pinned at all (any format) — badge indicator only
 *
 * _pin.png text-overlay graphics and _original.jpg (320px thumbnails) are never
 * used as card images. Non-NB products fall back to Amazon CDN at 1500px.
 */
function buildPinIndex(): { nbAsins: Set<string>; pinAsins: Set<string> } {
  const nbAsins = new Set<string>()
  const pinAsins = new Set<string>()
  if (!existsSync(OUTPUT_DIR)) return { nbAsins, pinAsins }

  let runs: string[]
  try {
    runs = readdirSync(OUTPUT_DIR).filter(d => {
      try { return statSync(join(OUTPUT_DIR, d)).isDirectory() } catch { return false }
    })
  } catch {
    return { nbAsins, pinAsins }
  }

  for (const run of runs) {
    const pinsDir = join(OUTPUT_DIR, run, 'pins')
    if (!existsSync(pinsDir)) continue
    try {
      for (const f of readdirSync(pinsDir)) {
        const m = f.match(/^([A-Z0-9]{10})_(nb\.jpg|pin\.png)$/)
        if (!m) continue
        const [, asin, suffix] = m
        pinAsins.add(asin)
        if (suffix === 'nb.jpg') nbAsins.add(asin)
      }
    } catch { /* skip */ }
  }

  return { nbAsins, pinAsins }
}

/**
 * Load all products from the Amazon bot's product cache.
 * Optionally filter by Mintbrooks category (beauty, home-decor, kitchen, wellness, lifestyle).
 * Returns products sorted: pinned first, then by rating descending.
 */
export function getProducts(category?: string): Product[] {
  if (!existsSync(CACHE_DIR)) return []

  const { nbAsins, pinAsins } = buildPinIndex()
  const all: Product[] = []
  const seen = new Set<string>()

  try {
    const files = readdirSync(CACHE_DIR).filter(f => f.endsWith('.json'))
    for (const file of files) {
      try {
        const raw = readFileSync(join(CACHE_DIR, file), 'utf-8')
        const products = JSON.parse(raw)
        if (!Array.isArray(products)) continue
        for (const p of products) {
          if (!p.asin || seen.has(p.asin)) continue
          const niche = p.niche || p.category || 'lifestyle'
          const cat = NICHE_TO_CATEGORY[niche] || 'lifestyle'
          if (category && cat !== category) continue
          seen.add(p.asin)
          const hasNb = nbAsins.has(p.asin)  // NB lifestyle shot — only local image worth serving
          const hasPin = pinAsins.has(p.asin) // pinned at all — badge only
          // Only NB images are served via API — originals are 320px thumbnails, worse than Amazon 1500px CDN
          const localUrl = hasNb ? `/api/pin-image/${p.asin}` : null
          // Upgrade Amazon thumbnail from low-res to 1500px as last resort
          const rawAmazonImage = p.image_url || p.amazon_image_url || ''
          const amazonImage = rawAmazonImage.replace(/\._AC_(?:UL\d+|SL\d+)_\./, '._AC_SL1500_.')
          all.push({
            asin: p.asin,
            name: p.name || p.title || 'Product',
            price: typeof p.price === 'number' ? p.price : parseFloat(p.price) || 0,
            rating: typeof p.rating === 'number' ? p.rating : parseFloat(p.rating) || 0,
            review_count: typeof p.review_count === 'number' ? p.review_count : 0,
            affiliate_url: p.affiliate_url || `https://www.amazon.com/dp/${p.asin}`,
            image_url: amazonImage,
            pin_image_url: localUrl,
            primary_image_url: localUrl || amazonImage,
            has_pin: hasPin,
            category: cat,
          })
        }
      } catch { /* skip malformed cache files */ }
    }
  } catch { /* skip */ }

  // Sort: local images first (nb or original), then Amazon-only, then by rating desc
  return all.sort((a, b) => {
    const aLocal = a.pin_image_url ? 1 : 0
    const bLocal = b.pin_image_url ? 1 : 0
    if (aLocal !== bLocal) return bLocal - aLocal
    return b.rating - a.rating
  })
}

/**
 * Get products for a specific Mintbrooks category, with an optional limit.
 */
export function getProductsByCategory(category: string, limit = 12): Product[] {
  return getProducts(category).slice(0, limit)
}

/**
 * Get a cross-category featured set, prioritising pinned and high-rated products.
 */
export function getFeaturedProducts(limit = 8): Product[] {
  return getProducts().slice(0, limit)
}
