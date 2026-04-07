import { NextResponse } from 'next/server'
import { readdirSync, readFileSync, existsSync, statSync } from 'fs'
import { join } from 'path'
import os from 'os'

export const dynamic = 'force-dynamic'

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
 * Scan all run directories under OUTPUT_DIR and build a Map<ASIN, true>
 * for every ASIN that has a pin image (_nb.jpg or _pin.png).
 * This is an existence-only scan — no file contents are read.
 */
function buildPinIndex(): Map<string, true> {
  const index = new Map<string, true>()

  if (!existsSync(OUTPUT_DIR)) return index

  let runDirs: string[]
  try {
    runDirs = readdirSync(OUTPUT_DIR).filter(d => {
      try { return statSync(join(OUTPUT_DIR, d)).isDirectory() } catch { return false }
    })
  } catch {
    return index
  }

  for (const runDir of runDirs) {
    const pinsDir = join(OUTPUT_DIR, runDir, 'pins')
    if (!existsSync(pinsDir)) continue

    let pinFiles: string[]
    try { pinFiles = readdirSync(pinsDir) } catch { continue }

    for (const file of pinFiles) {
      // Match {ASIN}_nb.jpg or {ASIN}_pin.png
      const nbMatch = file.match(/^([A-Z0-9]{10})_nb\.jpg$/)
      if (nbMatch) { index.set(nbMatch[1], true); continue }

      const pinMatch = file.match(/^([A-Z0-9]{10})_pin\.png$/)
      if (pinMatch) { index.set(pinMatch[1], true) }
    }
  }

  return index
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') // optional filter

  try {
    if (!existsSync(CACHE_DIR)) {
      return NextResponse.json({ products: [] })
    }

    // Build pin index once before iterating products
    const pinIndex = buildPinIndex()

    const files = readdirSync(CACHE_DIR).filter(f => f.endsWith('.json'))
    const allProducts: unknown[] = []

    for (const file of files) {
      try {
        const raw = readFileSync(join(CACHE_DIR, file), 'utf-8')
        const products = JSON.parse(raw)
        if (Array.isArray(products)) {
          for (const p of products) {
            const niche = p.niche || p.category || 'lifestyle'
            const mintbrooksCategory = NICHE_TO_CATEGORY[niche] || 'lifestyle'
            if (!category || category === mintbrooksCategory) {
              const asin: string = p.asin
              const hasPin = pinIndex.has(asin)
              const pinImageUrl = hasPin ? `/api/pin-image/${asin}` : null
              const primaryImageUrl = pinImageUrl ?? (p.image_url || null)

              allProducts.push({
                asin,
                name: p.name || p.title,
                price: p.price,
                rating: p.rating,
                review_count: p.review_count,
                affiliate_url: p.affiliate_url || `https://www.amazon.com/dp/${asin}`,
                category: mintbrooksCategory,
                image_url: p.image_url || '',
                pin_image_url: pinImageUrl,
                primary_image_url: primaryImageUrl,
                has_pin: hasPin,
              })
            }
          }
        }
      } catch {
        // skip malformed cache files
      }
    }

    // Deduplicate by ASIN
    const seen = new Set<string>()
    const unique = allProducts.filter((p: any) => {
      if (seen.has(p.asin)) return false
      seen.add(p.asin)
      return true
    })

    return NextResponse.json({ products: unique, total: unique.length })
  } catch {
    return NextResponse.json({ products: [], error: 'Could not load products' })
  }
}
