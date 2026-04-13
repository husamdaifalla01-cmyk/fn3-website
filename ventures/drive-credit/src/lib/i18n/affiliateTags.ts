/**
 * Per-locale Amazon affiliate configuration.
 * Tags will be updated once each country program is approved.
 * Until then, non-US locales fall back to the US tag with their local Amazon domain.
 */
export const LOCALE_AMAZON_CONFIG: Record<
  string,
  { tag: string; domain: string; currency: string; currencySymbol: string }
> = {
  'en':    { tag: 'mintbrooks-20',    domain: 'www.amazon.com',    currency: 'USD', currencySymbol: '$' },
  'en-CA': { tag: 'mintbrooksca-20',  domain: 'www.amazon.ca',     currency: 'CAD', currencySymbol: 'CA$' },
  'en-GB': { tag: 'mintbrooksgb-21',  domain: 'www.amazon.co.uk',  currency: 'GBP', currencySymbol: '£' },
  'fr':    { tag: 'mintbrooksfr-21',  domain: 'www.amazon.fr',     currency: 'EUR', currencySymbol: '€' },
  'de':    { tag: 'mintbrooksde-21',  domain: 'www.amazon.de',     currency: 'EUR', currencySymbol: '€' },
  'it':    { tag: 'mintbrooksit-21',  domain: 'www.amazon.it',     currency: 'EUR', currencySymbol: '€' },
  'nl':    { tag: 'mintbrooksnl-21',  domain: 'www.amazon.nl',     currency: 'EUR', currencySymbol: '€' },
  'pl':    { tag: 'mintbrookspl-22',  domain: 'www.amazon.pl',     currency: 'PLN', currencySymbol: 'zł' },
  'es':    { tag: 'mintbrookses-21',  domain: 'www.amazon.es',     currency: 'EUR', currencySymbol: '€' },
  'sv':    { tag: 'mintbrooksse-21',  domain: 'www.amazon.se',     currency: 'SEK', currencySymbol: 'kr' },
}

/**
 * Build a locale-aware Amazon affiliate URL from an ASIN.
 * mintbrooks.com/fr/ → amazon.fr with FR tag
 */
export function buildLocaleAffiliateUrl(asin: string, locale: string): string {
  const config = LOCALE_AMAZON_CONFIG[locale] ?? LOCALE_AMAZON_CONFIG['en']
  return `https://${config.domain}/dp/${asin}?tag=${config.tag}`
}

/**
 * Transform an existing US Amazon URL to the locale-appropriate URL.
 * Extracts the ASIN and rebuilds for the target locale.
 * Safe: returns the original URL unchanged if no ASIN found.
 */
export function transformAffiliateUrl(usUrl: string, locale: string): string {
  if (locale === 'en') return usUrl
  const asinMatch = usUrl.match(/\/dp\/([A-Z0-9]{10})/)
  if (!asinMatch) return usUrl
  return buildLocaleAffiliateUrl(asinMatch[1], locale)
}

/**
 * Get the Amazon domain for a locale (for link text like "Buy on Amazon UK")
 */
export function getAmazonDomain(locale: string): string {
  return (LOCALE_AMAZON_CONFIG[locale] ?? LOCALE_AMAZON_CONFIG['en']).domain
}
