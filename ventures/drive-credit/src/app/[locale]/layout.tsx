export const dynamic = 'force-dynamic'

import { Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import LifestyleNav from '@/components/lifestyle/LifestyleNav'
import LifestyleFooter from '@/components/lifestyle/LifestyleFooter'
import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import { buildHreflangAlternates } from '@/lib/i18n/hreflang'
import '../globals.css'

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
  display: 'swap',
})

const SITE_URL = 'https://mintbrooks.com'
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const LOCALE_DESCRIPTIONS: Record<string, string> = {
  'en':    'Home, wellness, beauty, kitchen, and the credit to build it all. Mintbrooks is the lifestyle guide for people building a life worth living.',
  'en-CA': 'Home, wellness, beauty, kitchen, and the credit to build it all. Mintbrooks is the lifestyle guide for Canadians building a life worth living.',
  'en-GB': 'Home, wellness, beauty, kitchen, and the credit to build it all. Mintbrooks is the lifestyle guide for people building a life worth living.',
  'fr':    'Maison, bien-être, beauté, cuisine et les finances pour tout construire. Mintbrooks est le guide lifestyle pour ceux qui construisent une belle vie.',
  'de':    'Wohnen, Wellness, Schönheit, Küche und die Finanzen, um alles aufzubauen. Mintbrooks ist der Lifestyle-Guide für Menschen, die ein schönes Leben aufbauen.',
  'it':    'Casa, benessere, bellezza, cucina e le finanze per costruire tutto. Mintbrooks è la guida lifestyle per chi costruisce una vita bella.',
  'nl':    'Wonen, wellness, schoonheid, keuken en de financiën om het allemaal te bouwen. Mintbrooks is de lifestyle gids voor mensen die een mooi leven opbouwen.',
  'pl':    'Dom, wellness, uroda, kuchnia i finanse do zbudowania tego wszystkiego. Mintbrooks to przewodnik lifestylowy dla osób budujących piękne życie.',
  'es':    'Hogar, bienestar, belleza, cocina y las finanzas para construirlo todo. Mintbrooks es la guía lifestyle para quienes construyen una vida hermosa.',
  'sv':    'Hem, wellness, skönhet, kök och ekonomin för att bygga allt. Mintbrooks är livsstilsguiden för människor som bygger ett vackert liv.',
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
  const alternates = buildHreflangAlternates('/')

  return {
    title: {
      default: 'Mintbrooks — The Good Life, Curated',
      template: '%s | Mintbrooks',
    },
    description,
    keywords: 'lifestyle blog, home decor, wellness, beauty, kitchen, credit building, curated finds',
    metadataBase: new URL(SITE_URL),
    alternates,
    openGraph: {
      title: 'Mintbrooks — The Good Life, Curated',
      description: 'Home. Wellness. Beauty. Kitchen. And the financial foundation to build it all.',
      type: 'website',
      siteName: 'Mintbrooks',
      url: SITE_URL,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Mintbrooks — The Good Life, Curated',
      description: 'The lifestyle guide for people building a beautiful life.',
    },
  }
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Mintbrooks',
  url: SITE_URL,
  description: 'Home, wellness, beauty, kitchen, and the credit to build it all.',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Mintbrooks',
  url: SITE_URL,
  logo: `${SITE_URL}/lifestyle/logo.png`,
  sameAs: ['https://www.pinterest.com/mintbrookslifestyle'],
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

  setRequestLocale(locale)
  let messages: Awaited<ReturnType<typeof getMessages>>
  try {
    messages = await getMessages({ locale })
  } catch (e) {
    const err = e as Error
    return (
      <html lang="en"><body>
        <pre style={{ padding: '40px' }}>
          getMessages error: {err.message}{'\n'}{err.stack}
        </pre>
      </body></html>
    )
  }
  const lang = LOCALE_LANG[locale] ?? 'en'

  return (
    <html lang={lang} className={playfair.variable}>
      <head>
        <link rel="canonical" href={SITE_URL} />
      </head>
      <body
        style={{
          '--ls-cream': '#FDFAF6',
          '--ls-forest': '#1D3A2F',
          '--ls-gold': '#B8955A',
          '--ls-text': '#1A1714',
          '--ls-muted': '#6B6557',
        } as React.CSSProperties}
      >
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
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LifestyleNav />
          {children}
          <LifestyleFooter />
        </NextIntlClientProvider>
        <Script
          defer
          data-domain="mintbrooks.com"
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
