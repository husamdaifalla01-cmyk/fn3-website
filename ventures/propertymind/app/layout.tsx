import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PropertyMind | AI Property Management for Independent Landlords',
  description: 'AI-powered lease analysis, tenant screening, rent increase notices, and maintenance management. Covers all 50 states. From $149/month.',
  keywords: ['property management software', 'landlord software', 'lease analysis', 'tenant screening', 'rent increase notice'],
  openGraph: {
    title: 'PropertyMind | AI Property Management for Independent Landlords',
    description: 'AI-powered lease analysis, tenant screening, rent increase notices, and maintenance management. Covers all 50 states. From $149/month.',
    type: 'website',
    url: 'https://propertymind.vercel.app',
    siteName: 'PropertyMind',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PropertyMind | AI Property Management for Independent Landlords',
    description: 'AI-powered lease analysis, tenant screening, rent increase notices, and maintenance management. Covers all 50 states. From $149/month.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  )
}
