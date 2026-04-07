export const runtime = 'edge'

import { NextResponse } from 'next/server'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'
import os from 'os'
import { ALL_ARTICLES } from '@/lib/lifestyle/articles'
import {
  scoreArticle,
  scoreAllProducts,
  rankContent,
  getTrending,
  getFeatured,
  type ContentScore,
} from '@/lib/lifestyle/content-ranking'

export const dynamic = 'force-dynamic'

// ── Manually featured article slugs ────────────────────────────────────────

const FEATURED_SLUGS = new Set([
  'bedroom-feel-expensive',
  'glass-skin-routine',
  'candle-warmer-lamp',
  'coffee-bar-setup',
  'what-is-credit-score',
  'coffee-table-styling',
  'vitamin-c-serum-review',
  'morning-rituals',
  'cast-iron-skillet-guide',
  'build-credit-from-scratch',
])

// ── Module-level cache ──────────────────────────────────────────────────────

interface RankCache {
  ranked: ContentScore[]
  timestamp: number
}

let cache: RankCache | null = null
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

// ── Product cache path ──────────────────────────────────────────────────────

const CACHE_DIR = join(os.homedir(), 'Downloads/amazon/data/product_cache')

// ── Load and score all content ──────────────────────────────────────────────

function buildRanked(): ContentScore[] {
  // 1. Score all articles
  const articleScores: ContentScore[] = ALL_ARTICLES.map(article =>
    scoreArticle({
      slug: article.slug,
      categorySlug: article.category,
      readTime: article.readTime,
      date: undefined, // articles.ts does not carry a date field
      featured: FEATURED_SLUGS.has(article.slug),
      title: article.title,
    })
  )

  // 2. Load products from cache dir (up to 50 files, skip errors)
  const rawProducts: Array<{
    asin: string
    category: string
    rating?: number
    review_count?: number
    has_pin?: boolean
    featured?: boolean
  }> = []

  if (existsSync(CACHE_DIR)) {
    let files: string[] = []
    try {
      files = readdirSync(CACHE_DIR)
        .filter(f => f.endsWith('.json'))
        .slice(0, 50)
    } catch {
      // ignore
    }

    for (const file of files) {
      try {
        const raw = readFileSync(join(CACHE_DIR, file), 'utf-8')
        const products = JSON.parse(raw)
        if (Array.isArray(products)) {
          for (const p of products) {
            const niche: string = p.niche || p.category || 'lifestyle'
            const category = NICHE_TO_CATEGORY[niche] ?? 'lifestyle'
            rawProducts.push({
              asin: p.asin,
              category,
              rating: p.rating,
              review_count: p.review_count,
              has_pin: p.has_pin ?? false,
              featured: false,
            })
          }
        }
      } catch {
        // skip malformed files
      }
    }
  }

  // 3. Score products
  const productScores = scoreAllProducts(rawProducts)

  // 4. Rank everything together
  return rankContent([...articleScores, ...productScores])
}

// ── Niche → Mintbrooks category map (mirrors mintbrooks-products/route.ts) ──

const NICHE_TO_CATEGORY: Record<string, string> = {
  clean_beauty: 'beauty', skincare: 'beauty', makeup: 'beauty',
  hair: 'beauty', nail_art: 'beauty',
  home_decor: 'home-decor', bathroom: 'home-decor',
  organization: 'home-decor', candles_cozy: 'home-decor',
  outdoor_garden: 'home-decor',
  kitchen: 'kitchen',
  wellness: 'wellness', fitness: 'wellness',
  jewelry: 'lifestyle', fashion_accessories: 'lifestyle',
  gift_ideas: 'lifestyle',
}

// ── Route handler ───────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') ?? undefined
  const limitParam = searchParams.get('limit')
  const limit = limitParam ? parseInt(limitParam, 10) : 10
  const typeFilter = searchParams.get('type') as 'article' | 'product' | null

  const now = Date.now()

  // Refresh cache if stale or missing
  if (!cache || now - cache.timestamp > CACHE_TTL_MS) {
    cache = { ranked: buildRanked(), timestamp: now }
  }

  const cached = now - cache.timestamp < CACHE_TTL_MS && cache.timestamp !== now

  // Apply type filter if requested
  const filtered = typeFilter
    ? cache.ranked.filter(s => s.type === typeFilter)
    : cache.ranked

  const trending = getTrending(filtered, category, limit)
  const featured = getFeatured(filtered, category, limit)

  return NextResponse.json({
    trending,
    featured,
    meta: {
      total: filtered.length,
      cached,
      timestamp: new Date(cache.timestamp).toISOString(),
    },
  })
}
