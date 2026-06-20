import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://mintbrooks.com'),
  title: 'The 90-Day Money Reset — Mintbrooks',
  description: 'A step-by-step 90-day protocol to repair your credit and take control of your finances. One action per day. Creditor scripts included. $17, one time.',
  alternates: { canonical: 'https://mintbrooks.com/products/90-day-money-reset' },
  openGraph: {
    title: 'The 90-Day Money Reset',
    description: 'Day-by-day credit repair protocol. Creditor scripts, dispute letters, and a weekly tracking system. $17 one-time.',
    url: 'https://mintbrooks.com/products/90-day-money-reset',
    siteName: 'Mintbrooks',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The 90-Day Money Reset — $17',
    description: 'Day-by-day credit repair protocol. Creditor scripts. Dispute letters. Weekly tracker. One time payment.',
  },
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
