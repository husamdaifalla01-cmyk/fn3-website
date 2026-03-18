import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'FN3 — Operational Intelligence',
    template: '%s — FN3',
  },
  description: 'FN3 builds and deploys AI-powered operational intelligence. Agents, automation, and systems that make businesses run at a level most teams never reach.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'FlowNexis3',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
