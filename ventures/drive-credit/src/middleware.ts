import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// Paths that must never be locale-prefixed
const LOCALE_EXEMPT = [
  '/finance',
  '/products',
  '/quiz',
  '/api',
  '/unsubscribe',
  '/_next',
  '/favicon.ico',
  '/sitemap',
  '/robots.txt',
  '/opengraph-image',
]

// Country code → locale mapping using Cloudflare CF-IPCountry header
const COUNTRY_TO_LOCALE: Record<string, string> = {
  // English-speaking
  US: 'en', CA: 'en-CA', GB: 'en-GB', IE: 'en-GB', AU: 'en', NZ: 'en',
  // French
  FR: 'fr', BE: 'fr', LU: 'fr', CH: 'de',
  // German
  DE: 'de', AT: 'de',
  // Italian
  IT: 'it',
  // Dutch
  NL: 'nl',
  // Polish
  PL: 'pl',
  // Spanish
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', PE: 'es', CL: 'es',
  // Swedish
  SE: 'sv',
}

const COOKIE_NAME = 'MINTBROOKS_LOCALE'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

// next-intl's built-in middleware handles the [locale] routing
const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  // Redirect www → non-www
  const host = request.headers.get('host') ?? ''
  if (host.startsWith('www.')) {
    const url = request.nextUrl.clone()
    url.host = host.slice(4)
    return NextResponse.redirect(url, 301)
  }

  const pathname = request.nextUrl.pathname

  // Skip exempt paths
  if (LOCALE_EXEMPT.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next()
  }

  // Skip static files
  if (pathname.includes('.')) {
    return NextResponse.next()
  }

  // Detect if user already has a locale cookie (explicit user choice)
  const cookieLocale = request.cookies.get(COOKIE_NAME)?.value
  const validCookieLocale =
    cookieLocale && (routing.locales as readonly string[]).includes(cookieLocale)
      ? cookieLocale
      : null

  if (validCookieLocale) {
    // User has set a preference — let next-intl handle routing
    return intlMiddleware(request)
  }

  // Auto-detect from Cloudflare geo header
  const country = request.headers.get('CF-IPCountry') ?? ''
  const geoLocale = COUNTRY_TO_LOCALE[country] ?? null

  // Auto-detect from Accept-Language header as fallback
  const acceptLanguage = request.headers.get('Accept-Language') ?? ''
  const acceptLocale = parseAcceptLanguage(acceptLanguage)

  const detectedLocale = geoLocale ?? acceptLocale ?? 'en'

  // If English: this build prefixes every locale (incl. the default), so the
  // bare root has no static page — redirect "/" → "/en" explicitly. Other
  // English paths fall through to next-intl as before.
  if (detectedLocale === 'en') {
    if (pathname === '/') {
      const url = request.nextUrl.clone()
      url.pathname = '/en'
      const r = NextResponse.redirect(url, 307)
      r.cookies.set(COOKIE_NAME, 'en', {
        maxAge: COOKIE_MAX_AGE,
        sameSite: 'lax',
        secure: true,
        path: '/',
      })
      return r
    }
    const response = intlMiddleware(request)
    // Set cookie so next visits skip detection
    response.cookies.set(COOKIE_NAME, 'en', {
      maxAge: COOKIE_MAX_AGE,
      sameSite: 'lax',
      secure: true,
      path: '/',
    })
    return response
  }

  // Check if path already has the detected locale prefix
  const hasLocalePrefix = (routing.locales as readonly string[]).some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (hasLocalePrefix) {
    return intlMiddleware(request)
  }

  // Redirect to locale-prefixed path
  const url = request.nextUrl.clone()
  url.pathname = `/${detectedLocale}${pathname === '/' ? '' : pathname}`
  const response = NextResponse.redirect(url, 307)
  response.cookies.set(COOKIE_NAME, detectedLocale, {
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'lax',
    secure: true,
    path: '/',
  })
  return response
}

function parseAcceptLanguage(header: string): string | null {
  // Parse "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7" → best supported locale
  const supported = routing.locales as readonly string[]
  const parts = header
    .split(',')
    .map((part) => {
      const [lang, q] = part.trim().split(';q=')
      return { lang: lang.trim(), q: parseFloat(q ?? '1') }
    })
    .sort((a, b) => b.q - a.q)

  for (const { lang } of parts) {
    // Exact match first (e.g. 'fr-FR' → check 'fr')
    const base = lang.split('-')[0].toLowerCase()
    const match = supported.find(
      (s) => s.toLowerCase() === lang.toLowerCase() || s.toLowerCase() === base
    )
    if (match) return match
  }
  return null
}

export const config = {
  matcher: [
    // Match the bare root explicitly — the catch-all below does NOT reliably
    // match "/" under OpenNext, so without this the root-redirect never runs
    // and "/" serves a prerendered 404.
    '/',
    // Match all paths except Next.js internals and static assets
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2)).*)',
  ],
}
