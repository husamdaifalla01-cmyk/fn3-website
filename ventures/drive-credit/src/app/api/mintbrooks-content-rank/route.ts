
import { NextResponse } from 'next/server'
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

// ── Load and score all content ──────────────────────────────────────────────

function buildRanked(): ContentScore[] {
  // Score articles only — local product cache not available in edge runtime
  const articleScores: ContentScore[] = ALL_ARTICLES.map(article =>
    scoreArticle({
      slug: article.slug,
      categorySlug: article.category,
      readTime: article.readTime,
      date: undefined,
      featured: FEATURED_SLUGS.has(article.slug),
      title: article.title,
    })
  )

  return rankContent(articleScores)
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
