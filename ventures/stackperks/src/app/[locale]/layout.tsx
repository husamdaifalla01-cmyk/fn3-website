export const dynamic = 'force-dynamic'

import Script from 'next/script'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import StackperksNav from '@/components/StackperksNav'
import StackperksFooter from '@/components/StackperksFooter'
import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import { buildHreflangAlternates } from '@/lib/i18n/hreflang'
import '../globals.css'

// Static imports — esbuild bundles all locales into the Worker at build time
import enMessages from '../../../messages/en.json'
import enCAMessages from '../../../messages/en-CA.json'
import enGBMessages from '../../../messages/en-GB.json'
import frMessages from '../../../messages/fr.json'
import deMessages from '../../../messages/de.json'
import esMessages from '../../../messages/es.json'
import itMessages from '../../../messages/it.json'
import nlMessages from '../../../messages/nl.json'
import plMessages from '../../../messages/pl.json'
import svMessages from '../../../messages/sv.json'

type Messages = Record<string, unknown>

const MESSAGE_MAP: Record<string, Messages> = {
  'en': enMessages, 'en-CA': enCAMessages, 'en-GB': enGBMessages,
  'fr': frMessages, 'de': deMessages, 'es': esMessages,
  'it': itMessages, 'nl': nlMessages, 'pl': plMessages, 'sv': svMessages,
}

function deepMerge(base: Messages, override: Messages): Messages {
  const result = { ...base }
  for (const key of Object.keys(override)) {
    if (typeof override[key] === 'object' && override[key] !== null &&
        typeof base[key] === 'object' && base[key] !== null) {
      result[key] = deepMerge(base[key] as Messages, override[key] as Messages)
    } else {
      result[key] = override[key]
    }
  }
  return result
}

function getLocaleMessages(locale: string): Messages {
  if (locale === 'en-CA' || locale === 'en-GB') {
    return deepMerge(enMessages, MESSAGE_MAP[locale])
  }
  return MESSAGE_MAP[locale] ?? enMessages
}


const SITE_URL = 'https://stackperks.com'
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const LOCALE_DESCRIPTIONS: Record<string, string> = {
  'en':    'Amazon Prime for Young Adults, student credit cards, and cash-back offers — all verified, all free to claim. Stack every perk. Pay nothing.',
  'en-CA': 'Amazon Prime for Young Adults, student credit cards, and cash-back offers for Canadian 18–24-year-olds. Stack every perk. Pay nothing.',
  'en-GB': 'Best deals for UK young adults 18–24 — memberships, student cards, and cash-back offers. Stack every perk. Pay nothing.',
  'fr':    'Les meilleures offres pour les 18–24 ans — Prime jeune, cartes étudiant, et offres cashback. Cumulez chaque avantage. Gratuitement.',
  'de':    'Die besten Deals für 18–24-Jährige — Prime Jugend, Studentenkarten und Cashback-Angebote. Jeden Vorteil nutzen. Kostenlos.',
  'it':    'Le migliori offerte per i 18–24 anni — Prime giovani, carte studente e offerte cashback. Cumulate ogni vantaggio. Gratis.',
  'nl':    'Beste deals voor 18–24 jaar — Prime student, studentenkaarten en cashback aanbiedingen. Stapel elk voordeel. Gratis.',
  'pl':    'Najlepsze oferty dla 18–24 lat — Prime student, karty studenckie i oferty cashback. Zbieraj każdy benefit. Za darmo.',
  'es':    'Las mejores ofertas para 18–24 años — Prime jóvenes, tarjetas universitarias y cashback. Acumula cada beneficio. Gratis.',
  'sv':    'Bästa erbjudanden för 18–24 år — Prime ungdom, studentkort och cashback erbjudanden. Samla varje förmån. Gratis.',
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const description = LOCALE_DESCRIPTIONS[locale] ?? LOCALE_DESCRIPTIONS['en']
  const alternates = buildHreflangAlternates('/', locale)

  return {
    title: {
      default: 'Stackperks — Best Deals for Young Adults 18–24',
      template: '%s | Stackperks',
    },
    description,
    keywords: 'amazon prime young adults, student credit cards, deals for college students, cashback offers 18-24, prime young adult plan',
    metadataBase: new URL(SITE_URL),
    alternates,
    openGraph: {
      title: 'Stackperks — Best Deals for Young Adults 18–24',
      description: 'Stack every perk. Pay nothing. Prime at $7.49/mo, student card bonuses, and more.',
      type: 'website',
      siteName: 'Stackperks',
      url: SITE_URL,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Stackperks — Best Deals for Young Adults 18–24',
      description: 'Stack every perk. Pay nothing. The best deals for 18–24-year-olds.',
    },
  }
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Stackperks',
  url: SITE_URL,
  description: 'Amazon Prime for Young Adults, student credit cards, and cash-back offers for 18–24-year-olds.',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Stackperks',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [],
}

// BCP-47 lang attribute per locale
const LOCALE_LANG: Record<string, string> = {
  'en': 'en', 'en-CA': 'en-CA', 'en-GB': 'en-GB',
  'fr': 'fr', 'de': 'de', 'it': 'it',
  'nl': 'nl', 'pl': 'pl', 'es': 'es', 'sv': 'sv',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = getLocaleMessages(locale)
  const lang = LOCALE_LANG[locale] ?? 'en'

  return (
    <html lang={lang}>
      <head />
      <body>
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages} now={new Date()} timeZone="UTC" formats={{}}>
          <StackperksNav />
          {children}
          <StackperksFooter />
        </NextIntlClientProvider>
        <Script
          defer
          data-domain="stackperks.com"
          src="https://plausible.io/js/script.tagged-events.js"
          strategy="afterInteractive"
        />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
