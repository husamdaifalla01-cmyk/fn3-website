import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

// Static imports so esbuild can bundle all locales into the Cloudflare Worker
import enMessages from '../../messages/en.json'
import enCAMessages from '../../messages/en-CA.json'
import enGBMessages from '../../messages/en-GB.json'
import frMessages from '../../messages/fr.json'
import deMessages from '../../messages/de.json'
import esMessages from '../../messages/es.json'
import itMessages from '../../messages/it.json'
import nlMessages from '../../messages/nl.json'
import plMessages from '../../messages/pl.json'
import svMessages from '../../messages/sv.json'

const MESSAGE_MAP: Record<string, Record<string, unknown>> = {
  'en':    enMessages,
  'en-CA': enCAMessages,
  'en-GB': enGBMessages,
  'fr':    frMessages,
  'de':    deMessages,
  'es':    esMessages,
  'it':    itMessages,
  'nl':    nlMessages,
  'pl':    plMessages,
  'sv':    svMessages,
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  let messages: Record<string, unknown>
  if (locale === 'en-CA' || locale === 'en-GB') {
    messages = deepMerge(enMessages, MESSAGE_MAP[locale])
  } else {
    messages = MESSAGE_MAP[locale] ?? enMessages
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
