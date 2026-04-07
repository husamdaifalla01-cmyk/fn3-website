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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={playfair.variable}>
      <body
        style={{
          '--ls-cream': '#FDFAF6',
          '--ls-forest': '#1D3A2F',
          '--ls-gold': '#B8955A',
          '--ls-text': '#1A1714',
          '--ls-muted': '#6B6557',
        } as React.CSSProperties}
      >
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
