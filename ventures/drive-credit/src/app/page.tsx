import type { Metadata } from 'next'
import LifestyleHero from '@/components/lifestyle/LifestyleHero'
import LifestyleVerticals from '@/components/lifestyle/LifestyleVerticals'
import LifestyleEditorial from '@/components/lifestyle/LifestyleEditorial'
import LifestyleGrid from '@/components/lifestyle/LifestyleGrid'
import LifestyleBridge from '@/components/lifestyle/LifestyleBridge'
import LifestyleNewsletter from '@/components/lifestyle/LifestyleNewsletter'

export const metadata: Metadata = {
  title: 'Mintbrooks — The Good Life, Curated',
  description:
    'Home, wellness, beauty, kitchen, and the credit to build it all. Mintbrooks is the lifestyle guide for people building a life worth living.',
  alternates: { canonical: 'https://mintbrooks.com/lifestyle' },
  openGraph: {
    title: 'Mintbrooks — The Good Life, Curated',
    description:
      'Home, wellness, beauty, kitchen, and the credit to build it all. Mintbrooks is the lifestyle guide for people building a life worth living.',
    type: 'website',
    url: 'https://mintbrooks.com/lifestyle',
    images: [{ url: 'https://mintbrooks.com/lifestyle/editorial.jpg', width: 1200, height: 630, alt: 'Mintbrooks — The Good Life, Curated' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mintbrooks — The Good Life, Curated',
    description: 'Home, wellness, beauty, kitchen, and the credit to build it all.',
    images: ['https://mintbrooks.com/lifestyle/editorial.jpg'],
  },
}

export default function LifestylePage() {
  return (
    <>
      {/* ── Hero — "The good life, curated." ──────────────────────── */}
      <LifestyleHero />

      {/* ── Verticals — 5 lifestyle categories ────────────────────── */}
      <LifestyleVerticals />

      {/* ── Editorial — brand philosophy pull quote ────────────────── */}
      <LifestyleEditorial />

      {/* ── Article Grid — featured editorial content ──────────────── */}
      <LifestyleGrid />

      {/* ── Bridge — DriveCredit / finance soft CTA ───────────────── */}
      <LifestyleBridge />

      {/* ── Newsletter — email capture / Substack ──────────────────── */}
      <LifestyleNewsletter />

      {/* Global lifestyle page styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

        .lifestyle-page * {
          box-sizing: border-box;
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Selection color */
        ::selection {
          background: rgba(184,149,90,0.25);
          color: #1A1714;
        }
      `}</style>
    </>
  )
}
