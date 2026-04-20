import { routing } from '@/i18n/routing'

const SITE_URL = 'https://mintbrooks.com'

/**
 * Build Next.js alternates object for hreflang tags.
 * Pass the path WITHOUT locale prefix, e.g. '/articles/best-vitamin-c-serums'
 * English gets no prefix: mintbrooks.com/articles/...
 * Others get prefix:      mintbrooks.com/fr/articles/...
 */
export function buildHreflangAlternates(path: string, locale = 'en') {
  const languages: Record<string, string> = {}

  for (const loc of routing.locales) {
    const url =
      loc === 'en'
        ? `${SITE_URL}${path === '/' ? '' : path}`
        : `${SITE_URL}/${loc}${path === '/' ? '' : path}`
    languages[loc] = url
  }

  // x-default always points to English
  languages['x-default'] = `${SITE_URL}${path === '/' ? '' : path}`

  // Each locale self-canonicalizes to its own URL
  const canonical =
    locale === 'en'
      ? `${SITE_URL}${path === '/' ? '' : path}`
      : `${SITE_URL}/${locale}${path === '/' ? '' : path}`

  return { canonical, languages }
}
