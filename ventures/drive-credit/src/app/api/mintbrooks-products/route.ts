import { NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export const dynamic = 'force-dynamic'

const PRODUCTS_PATH = join(process.cwd(), 'public/articles/products.json')

// Map Amazon bot niche keys to Mintbrooks category slugs
const NICHE_TO_CATEGORY: Record<string, string> = {
  clean_beauty: 'beauty', skincare: 'beauty', makeup: 'beauty', hair: 'beauty', nail_art: 'beauty',
  home_decor: 'home-decor', bathroom: 'home-decor', organization: 'home-decor',
  candles_cozy: 'home-decor', outdoor_garden: 'home-decor',
  kitchen: 'kitchen',
  wellness: 'wellness', fitness: 'wellness',
  jewelry: 'lifestyle', fashion_accessories: 'lifestyle', gift_ideas: 'lifestyle',
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  try {
    if (!existsSync(PRODUCTS_PATH)) {
      return NextResponse.json({ products: [], total: 0 })
    }

    const raw = readFileSync(PRODUCTS_PATH, 'utf-8')
    const data = JSON.parse(raw)

    // products.json structure: { skincare: [...], clean_beauty: [...], ... }
    const allProducts: unknown[] = []
    const seen = new Set<string>()

    for (const [niche, items] of Object.entries(data)) {
      if (niche.startsWith('_')) continue // skip _meta fields
      if (!Array.isArray(items)) continue

      const mintbrooksCategory = NICHE_TO_CATEGORY[niche] || 'lifestyle'
      if (category && category !== mintbrooksCategory) continue

      for (const p of items as any[]) {
        const asin: string = p.asin
        if (!asin || seen.has(asin)) continue
        seen.add(asin)

        allProducts.push({
          asin,
          name: p.name || p.title,
          price: p.price,
          rating: p.rating,
          review_count: p.review_count,
          affiliate_url: p.affiliate_url || `https://www.amazon.com/dp/${asin}?tag=mintbrooks-20`,
          category: mintbrooksCategory,
          image_url: p.image_url || '',
          primary_image_url: p.image_url || '',
        })
      }
    }

    return NextResponse.json({ products: allProducts, total: allProducts.length })
  } catch {
    return NextResponse.json({ products: [], error: 'Could not load products' })
  }
}
