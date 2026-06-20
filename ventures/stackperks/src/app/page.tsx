import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

// This build prefixes every locale (incl. the default "en"), so the bare root
// "/" has no page and Next would prerender it as a static 404 that OpenNext
// serves before middleware can run. Forcing this route dynamic makes the worker
// execute it on every request, so we redirect "/" to the geo-detected locale
// (mirrors src/middleware.ts COUNTRY_TO_LOCALE).
export const dynamic = 'force-dynamic'

const COUNTRY_TO_LOCALE: Record<string, string> = {
  US: 'en', CA: 'en-CA', GB: 'en-GB', IE: 'en-GB', AU: 'en', NZ: 'en',
  FR: 'fr', BE: 'fr', LU: 'fr', CH: 'de',
  DE: 'de', AT: 'de',
  IT: 'it',
  NL: 'nl',
  PL: 'pl',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', PE: 'es', CL: 'es',
  SE: 'sv',
}

export default async function RootPage() {
  const h = await headers()
  const country = h.get('cf-ipcountry') ?? ''
  const locale = COUNTRY_TO_LOCALE[country] ?? 'en'
  redirect(`/${locale}`)
}
