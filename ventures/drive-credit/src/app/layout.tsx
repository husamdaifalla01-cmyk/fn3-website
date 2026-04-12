import { Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import LifestyleNav from '@/components/lifestyle/LifestyleNav'
import LifestyleFooter from '@/components/lifestyle/LifestyleFooter'
import type { Metadata } from 'next'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const SITE_URL = 'https://mintbrooks.com'
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  title: {
    default: 'Mintbrooks — The Good Life, Curated',
    template: '%s | Mintbrooks',
  },
  description:
    'Home, wellness, beauty, kitchen, and the credit to build it all. Mintbrooks is the lifestyle guide for people building a life worth living.',
  keywords:
    'lifestyle blog, home decor, wellness, beauty, kitchen, credit building, curated finds',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Mintbrooks — The Good Life, Curated',
    description:
      'Home. Wellness. Beauty. Kitchen. And the financial foundation to build it all.',
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

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Mintbrooks',
  url: SITE_URL,
  description: 'Home, wellness, beauty, kitchen, and the credit to build it all.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Mintbrooks',
  url: SITE_URL,
  logo: `${SITE_URL}/lifestyle/logo.png`,
  sameAs: [
    'https://www.pinterest.com/mintbrookslifestyle',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={playfair.variable}>
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
        <LifestyleNav />
        {children}
        <LifestyleFooter />
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
