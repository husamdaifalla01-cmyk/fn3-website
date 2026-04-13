import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ComplianceAI | HIPAA Compliance for Solo Practitioners',
  description:
    'HIPAA compliance automation for solo practitioners and small group practices. Policy generator, risk assessment, BAA templates, OCR audit prep. From $199/month.',
  keywords: [
    'HIPAA compliance',
    'hipaa compliance solo practice',
    'hipaa for small practice',
    'healthcare compliance',
    'HIPAA automation',
    'medical practice compliance',
    'HIPAA policy generator',
    'breach notification',
    'OCR audit',
    'hipaa business associate agreement',
  ],
  openGraph: {
    title: 'ComplianceAI | HIPAA Compliance for Solo Practitioners',
    description:
      'HIPAA compliance automation for solo practitioners and small group practices. Policy generator, risk assessment, BAA templates, OCR audit prep. From $199/month.',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ComplianceAI',
  applicationCategory: 'HealthcareApplication',
  operatingSystem: 'Web',
  description:
    'HIPAA compliance automation for solo practitioners and small group practices. Policy generator, risk assessment, BAA templates, OCR audit prep.',
  url: 'https://compliance-ai-tau.vercel.app',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '199',
    highPrice: '799',
    priceSpecification: [
      {
        '@type': 'UnitPriceSpecification',
        name: 'Starter',
        price: '199',
        priceCurrency: 'USD',
        billingIncrement: 1,
        unitCode: 'MON',
      },
      {
        '@type': 'UnitPriceSpecification',
        name: 'Practice',
        price: '399',
        priceCurrency: 'USD',
        billingIncrement: 1,
        unitCode: 'MON',
      },
      {
        '@type': 'UnitPriceSpecification',
        name: 'Enterprise',
        price: '799',
        priceCurrency: 'USD',
        billingIncrement: 1,
        unitCode: 'MON',
      },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1240',
    bestRating: '5',
    worstRating: '1',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-[#e8e8e8]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        {children}
      </body>
    </html>
  )
}
