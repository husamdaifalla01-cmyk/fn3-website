import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Service Pricing Calculator — Agency AI OS',
  description: 'Find out what to charge for AI services using the 1/5th Rule. Get your monthly price, setup fee, gross margin, and the best pricing model for every engagement.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', background: '#0a0a0f', color: '#f0f0f0' }}>
        {children}
      </body>
    </html>
  )
}
