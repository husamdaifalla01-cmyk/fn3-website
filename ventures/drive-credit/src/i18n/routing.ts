import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'en-CA', 'en-GB', 'fr', 'de', 'it', 'nl', 'pl', 'es', 'sv'],
  defaultLocale: 'en',
  // 'as-needed' = English gets no /en/ prefix, all others get /fr/, /de/, etc.
  localePrefix: 'as-needed',
})

export type Locale = (typeof routing.locales)[number]

export const LOCALE_DISPLAY: Record<string, { label: string; flag: string; nativeName: string }> = {
  'en':    { label: 'English (US)',      flag: '🇺🇸', nativeName: 'English' },
  'en-CA': { label: 'English (Canada)',  flag: '🇨🇦', nativeName: 'English (CA)' },
  'en-GB': { label: 'English (UK)',      flag: '🇬🇧', nativeName: 'English (UK)' },
  'fr':    { label: 'Français',          flag: '🇫🇷', nativeName: 'Français' },
  'de':    { label: 'Deutsch',           flag: '🇩🇪', nativeName: 'Deutsch' },
  'it':    { label: 'Italiano',          flag: '🇮🇹', nativeName: 'Italiano' },
  'nl':    { label: 'Nederlands',        flag: '🇳🇱', nativeName: 'Nederlands' },
  'pl':    { label: 'Polski',            flag: '🇵🇱', nativeName: 'Polski' },
  'es':    { label: 'Español',           flag: '🇪🇸', nativeName: 'Español' },
  'sv':    { label: 'Svenska',           flag: '🇸🇪', nativeName: 'Svenska' },
}
