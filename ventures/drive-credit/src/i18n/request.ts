import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  // For regional English variants, merge with base English first
  let messages
  if (locale === 'en-CA' || locale === 'en-GB') {
    const base = (await import(`../../messages/en.json`)).default
    const override = (await import(`../../messages/${locale}.json`)).default
    messages = deepMerge(base, override)
  } else {
    messages = (await import(`../../messages/${locale}.json`)).default
  }

  return { locale, messages }
})

function deepMerge(base: Record<string, unknown>, override: Record<string, unknown>): Record<string, unknown> {
  const result = { ...base }
  for (const key of Object.keys(override)) {
    if (
      typeof override[key] === 'object' &&
      override[key] !== null &&
      typeof base[key] === 'object' &&
      base[key] !== null
    ) {
      result[key] = deepMerge(base[key] as Record<string, unknown>, override[key] as Record<string, unknown>)
    } else {
      result[key] = override[key]
    }
  }
  return result
}
