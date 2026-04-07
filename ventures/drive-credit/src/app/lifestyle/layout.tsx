import { Playfair_Display } from 'next/font/google'
import LifestyleNav from '@/components/lifestyle/LifestyleNav'
import LifestyleFooter from '@/components/lifestyle/LifestyleFooter'
import type { Metadata } from 'next'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Mintbrooks — The Good Life, Curated',
    template: '%s | Mintbrooks',
  },
  description:
    'Home, wellness, beauty, kitchen, and the credit to build it all. Mintbrooks is the lifestyle guide for people building a life worth living.',
  keywords:
    'lifestyle blog, home decor, wellness, beauty, kitchen, credit building, curated finds',
  openGraph: {
    title: 'Mintbrooks — The Good Life, Curated',
    description:
      'Home. Wellness. Beauty. Kitchen. And the financial foundation to build it all — without compromise.',
    type: 'website',
    siteName: 'Mintbrooks',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mintbrooks — The Good Life, Curated',
    description:
      'The lifestyle guide for people building a beautiful life and the credit to sustain it.',
  },
}

export default function LifestyleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={playfair.variable}
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
    </div>
  )
}
