// content-ranking.ts — Pure TypeScript scoring engine
// No Next.js, React, or file I/O imports.

export interface ContentScore {
  id: string
  type: 'article' | 'product'
  category: string
  score: number         // 0-100
  trending: boolean
  featured: boolean
  badge?: 'trending' | 'featured' | 'new' | 'editors-pick'
  factors: {
    recency: number       // 0-30
    engagement: number    // 0-30
    category_heat: number // 0-20
    editorial: number     // 0-20
  }
}

// ── Category heat maps ──────────────────────────────────────────────────────

const PRODUCT_CATEGORY_HEAT: Record<string, number> = {
  beauty: 20,
  wellness: 18,
  'home-decor': 16,
  kitchen: 15,
  lifestyle: 12,
}

const ARTICLE_CATEGORY_HEAT: Record<string, number> = {
  beauty: 20,
  wellness: 18,
  'home-decor': 17,
  kitchen: 15,
  finance: 12,
}

// ── Product scoring ─────────────────────────────────────────────────────────

export function scoreProduct(product: {
  asin: string
  category: string
  rating?: number
  review_count?: number
  has_pin?: boolean
  featured?: boolean
}): ContentScore {
  const recency = 20

  const rating = product.rating ?? 3.0
  const reviews = product.review_count ?? 0
  const rawEngagement = Math.round(
    (rating - 3.0) * 15 + Math.log10(reviews + 1) * 4
  )
  const engagement = Math.min(30, Math.max(0, rawEngagement))

  const category_heat = PRODUCT_CATEGORY_HEAT[product.category] ?? 10

  const editorial = product.has_pin ? 20 : product.featured ? 15 : 8

  const score = Math.min(100, recency + engagement + category_heat + editorial)

  return {
    id: product.asin,
    type: 'product',
    category: product.category,
    score,
    trending: false,
    featured: false,
    factors: { recency, engagement, category_heat, editorial },
  }
}

// ── Article scoring ─────────────────────────────────────────────────────────

function parseRecency(date?: string): number {
  if (!date) return 15

  const published = new Date(date)
  if (isNaN(published.getTime())) return 15

  const now = new Date()
  const msPerWeek = 7 * 24 * 60 * 60 * 1000
  const weeksAgo = (now.getTime() - published.getTime()) / msPerWeek

  const raw = 30 - weeksAgo * 3
  return Math.min(30, Math.max(5, Math.round(raw)))
}

function parseEngagement(title: string, readTime: string): number {
  const lower = title.toLowerCase()

  let score = 15

  // +8 for high-trust words
  if (/\b(actually|honest|tested|review)\b/.test(lower)) score += 8

  // +5 for value-signal words
  if (/\b(worth|best|real)\b/.test(lower)) score += 5

  // +4 for curiosity words
  if (/\b(mistake|secret)\b/.test(lower)) score += 4

  // +3 if read time >= 6 minutes
  const minuteMatch = readTime.match(/(\d+)/)
  if (minuteMatch && parseInt(minuteMatch[1], 10) >= 6) score += 3

  return Math.min(30, score)
}

export function scoreArticle(article: {
  slug: string
  categorySlug: string
  readTime: string
  date?: string
  featured?: boolean
  title: string
}): ContentScore {
  const recency = parseRecency(article.date)
  const engagement = parseEngagement(article.title, article.readTime)
  const category_heat = ARTICLE_CATEGORY_HEAT[article.categorySlug] ?? 10
  const editorial = article.featured ? 20 : 8

  const score = Math.min(100, recency + engagement + category_heat + editorial)

  return {
    id: article.slug,
    type: 'article',
    category: article.categorySlug,
    score,
    trending: false,
    featured: false,
    factors: { recency, engagement, category_heat, editorial },
  }
}

// ── Batch ranking ───────────────────────────────────────────────────────────

export function rankContent(scores: ContentScore[]): ContentScore[] {
  // Group by category
  const byCategory = new Map<string, ContentScore[]>()
  for (const s of scores) {
    if (!byCategory.has(s.category)) byCategory.set(s.category, [])
    byCategory.get(s.category)!.push(s)
  }

  const ranked: ContentScore[] = []

  for (const [, group] of byCategory) {
    // Sort descending by score
    group.sort((a, b) => b.score - a.score)

    const total = group.length
    const featuredCount = Math.max(1, Math.ceil(total * 0.1))
    const trendingCount = Math.max(1, Math.ceil(total * 0.25))

    for (let i = 0; i < group.length; i++) {
      const item = { ...group[i] }

      if (i < featuredCount) {
        item.featured = true
        item.trending = true
        item.badge = 'editors-pick'
      } else if (i < trendingCount) {
        item.trending = true
        item.featured = false
        item.badge = 'trending'
      } else {
        item.trending = false
        item.featured = false
        item.badge = undefined
      }

      ranked.push(item)
    }
  }

  return ranked
}

export function scoreAllArticles(
  articles: Array<{
    slug: string
    categorySlug: string
    readTime: string
    date?: string
    featured?: boolean
    title: string
  }>
): ContentScore[] {
  return articles.map(a => scoreArticle(a))
}

export function scoreAllProducts(
  products: Array<{
    asin: string
    category: string
    rating?: number
    review_count?: number
    has_pin?: boolean
    featured?: boolean
  }>
): ContentScore[] {
  return products.map(p => scoreProduct(p))
}

export function getTrending(
  scores: ContentScore[],
  category?: string,
  limit = 10
): ContentScore[] {
  return scores
    .filter(s => s.trending && (!category || s.category === category))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

export function getFeatured(
  scores: ContentScore[],
  category?: string,
  limit = 10
): ContentScore[] {
  return scores
    .filter(s => s.featured && (!category || s.category === category))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}
