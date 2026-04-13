import { routing } from '@/i18n/routing'

const SITE_URL = 'https://mintbrooks.com'

/**
 * Build Next.js alternates object for hreflang tags.
 * Pass the path WITHOUT locale prefix, e.g. '/articles/best-vitamin-c-serums'
 * English gets no prefix: mintbrooks.com/articles/...
 * Others get prefix:      mintbrooks.com/fr/articles/...
 */
export function buildHreflangAlternates(path: string) {
  const languages: Record<string, string> = {}

  for (const locale of routing.locales) {
    const url =
      locale === 'en'
        ? `${SITE_URL}${path === '/' ? '' : path}`
        : `${SITE_URL}/${locale}${path === '/' ? '' : path}`
    languages[locale] = url
  }

  // x-default always points to English
  languages['x-default'] = `${SITE_URL}${path === '/' ? '' : path}`

  const canonical =
    routing.defaultLocale === 'en'
      ? `${SITE_URL}${path === '/' ? '' : path}`
      : `${SITE_URL}${path === '/' ? '' : path}`

  return { canonical, languages }
}
