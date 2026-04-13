/**
 * Amazon affiliate tag config.
 *
 * We use Amazon OneLink — the US tag (mintbrooks-20) is used in all links.
 * When a visitor from France, Germany, UK etc. clicks, OneLink automatically
 * redirects them to their local Amazon store with the country-specific tag
 * that Amazon assigns when each country program is approved.
 *
 * No manual per-locale tag management needed.
 */
export const AFFILIATE_TAG = 'mintbrooks-20'
export const AFFILIATE_BASE_URL = 'https://www.amazon.com'

/**
 * Build an affiliate URL for an ASIN.
 * OneLink handles the country redirect automatically.
 */
export function buildAffiliateUrl(asin: string): string {
  return `${AFFILIATE_BASE_URL}/dp/${asin}?tag=${AFFILIATE_TAG}`
}

/**
 * No-op: OneLink handles locale routing server-side.
 * Kept for API compatibility — returns the original URL unchanged.
 */
export function transformAffiliateUrl(url: string, _locale: string): string {
  return url
}
