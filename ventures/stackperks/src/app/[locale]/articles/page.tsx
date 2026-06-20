import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import LifestyleNav from '@/components/lifestyle/LifestyleNav'
import LifestyleFooter from '@/components/lifestyle/LifestyleFooter'
import ArticlesClient from './ArticlesClient'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Articles — Mintbrooks',
  description:
    'Guides, reviews, and honest advice on home decor, wellness, beauty, kitchen, and personal finance.',
  alternates: { canonical: 'https://mintbrooks.com/articles' },
  openGraph: {
    title: 'Articles — Mintbrooks',
    description:
      'Guides, reviews, and honest advice on home decor, wellness, beauty, kitchen, and personal finance.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Articles — Mintbrooks',
    description:
      'Guides, reviews, and honest advice on home decor, wellness, beauty, kitchen, and personal finance.',
  },
}

export default function ArticlesPage() {
  return (
    <div
      className={playfair.variable}
      style={{ background: '#FDFAF6', color: '#1A1714', overflowX: 'hidden' }}
    >
      <LifestyleNav />

      {/* ── Page Hero ─────────────────────────────────────────────────── */}
      <section
        style={{
          background: '#FDFAF6',
          padding: 'clamp(140px, 16vw, 200px) clamp(20px, 5vw, 80px) clamp(60px, 8vw, 100px)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#B8955A',
              marginBottom: '24px',
              animation: 'ls-fade-up 0.6s ease forwards',
            }}
          >
            The Library
          </span>
          <h1
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(42px, 6.5vw, 86px)',
              fontWeight: 700,
              color: '#1A1714',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: '0 0 24px',
              animation: 'ls-fade-up 0.7s ease forwards',
              animationDelay: '0.1s',
              opacity: 0,
            }}
          >
            Everything we&apos;ve written.
          </h1>
          <p
            style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: '#6B6557',
              lineHeight: 1.65,
              margin: '0 0 48px',
              animation: 'ls-fade-up 0.7s ease forwards',
              animationDelay: '0.2s',
              opacity: 0,
            }}
          >
            Honest guides, real reviews, and the information that helps you make
            better decisions.
          </p>
        </div>
      </section>

      {/* ── Filter + Article Grid (client) ────────────────────────────── */}
      <ArticlesClient />

      <LifestyleFooter />

      <style>{`
        @keyframes ls-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        html { scroll-behavior: smooth; }
        ::selection {
          background: rgba(184,149,90,0.22);
          color: #1A1714;
        }
      `}</style>
    </div>
  )
}
