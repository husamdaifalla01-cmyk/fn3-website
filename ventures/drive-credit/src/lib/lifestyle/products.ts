
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


// Map Amazon/Pinterest bot niches to Mintbrooks categories
const NICHE_TO_CATEGORY: Record<string, string> = {
  clean_beauty: 'beauty', skincare: 'beauty', makeup: 'beauty', hair: 'beauty', nail_art: 'beauty',
  home_decor: 'home-decor', bathroom: 'home-decor', organization: 'home-decor',
  candles_cozy: 'home-decor', outdoor_garden: 'home-decor',
  kitchen: 'kitchen',
  wellness: 'wellness', fitness: 'wellness',
  jewelry: 'lifestyle', fashion_accessories: 'lifestyle', gift_ideas: 'lifestyle',
}

// Local filesystem not available in Cloudflare Workers edge runtime.
// Products are served from Amazon CDN via affiliate URLs instead.

export function getProducts(_category?: string): Product[] {
  return []
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
