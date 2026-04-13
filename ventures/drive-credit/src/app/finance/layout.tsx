// Finance routes are US-only — English, no locale prefix.
// This layout provides the HTML shell since root layout.tsx is bare.
import { Playfair_Display } from 'next/font/google'
import type { Metadata } from 'next'
import '../globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mintbrooks.com'),
}

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
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
        {children}
      </body>
    </html>
  )
}
