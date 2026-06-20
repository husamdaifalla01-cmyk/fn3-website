import type { Metadata } from 'next'
import Image from 'next/image'
import { Playfair_Display } from 'next/font/google'
import LifestyleNav from '@/components/lifestyle/LifestyleNav'
import LifestyleFooter from '@/components/lifestyle/LifestyleFooter'
import HomeDecorEmailCapture from './EmailCapture'
import { getProductsByCategory } from '@/lib/lifestyle/products'
import { EDITORIAL_ARTICLES } from '@/lib/lifestyle/articles-editorial'
import ProductGrid from '@/components/lifestyle/ProductGrid'
import CategoryEditorial from '@/components/lifestyle/CategoryEditorial'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  robots: { index: false, follow: true }, // de-indexed: concentrate authority on /finance
  title: 'Home & Decor',
  description:
    'Curated home decor finds, interior styling tips, and the products worth buying for a home that feels like you.',
  alternates: { canonical: 'https://mintbrooks.com/lifestyle/home-decor' },
  openGraph: {
    title: 'Home & Decor — Mintbrooks',
    description:
      'Curated home decor finds, interior styling tips, and the products worth buying for a home that feels like you.',
    type: 'website',
    url: 'https://mintbrooks.com/lifestyle/home-decor',
    images: [{ url: 'https://mintbrooks.com/lifestyle/home-decor.jpg', width: 1200, height: 630, alt: 'Mintbrooks Home & Decor' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home & Decor — Mintbrooks',
    description:
      'Curated home decor finds, interior styling tips, and the products worth buying for a home that feels like you.',
    images: ['https://mintbrooks.com/lifestyle/home-decor.jpg'],
  },
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomeDecorPage() {
  const products = getProductsByCategory('home-decor', 12)
  const articles = EDITORIAL_ARTICLES.filter(a => a.categorySlug === 'home-decor')
  return (
    <div
      className={playfair.variable}
      style={{ background: '#FDFAF6', color: '#1A1714', overflowX: 'hidden' }}
    >
      {/* ── Navigation ── */}
      <LifestyleNav />

      {/* ── Category Hero ─────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          height: '100svh',
          minHeight: '560px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        {/* Background image */}
        <Image
          src="/home-decor.jpg"
          alt="A beautifully styled living room"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
        />

        {/* Cream gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(253,250,246,0.97) 0%, rgba(253,250,246,0.55) 45%, rgba(253,250,246,0.08) 100%)',
          }}
        />

        {/* Hero content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            padding: '0 clamp(20px, 5vw, 80px) clamp(60px, 8vw, 100px)',
            maxWidth: '860px',
            margin: '0 auto',
          }}
        >
          {/* Category pill */}
          <span
            style={{
              display: 'inline-block',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#B8955A',
              background: 'rgba(184,149,90,0.12)',
              border: '1px solid rgba(184,149,90,0.3)',
              borderRadius: '100px',
              padding: '6px 16px',
              marginBottom: '24px',
              animation: 'ls-fade-up 0.6s ease forwards',
            }}
          >
            Home &amp; Decor
          </span>

          {/* Headline */}
          <h1
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(42px, 7vw, 88px)',
              fontWeight: 700,
              color: '#1A1714',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: '0 0 20px',
              animation: 'ls-fade-up 0.7s ease forwards',
              animationDelay: '0.1s',
              opacity: 0,
            }}
          >
            Spaces that feel like you
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: '#6B6557',
              lineHeight: 1.65,
              margin: '0 0 40px',
              animation: 'ls-fade-up 0.7s ease forwards',
              animationDelay: '0.2s',
              opacity: 0,
            }}
          >
            Curated finds for a home that reflects your life — not a showroom.
          </p>

          {/* Scroll CTA */}
          <a
            href="#articles"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#1D3A2F',
              textDecoration: 'none',
              animation: 'ls-fade-up 0.7s ease forwards',
              animationDelay: '0.3s',
              opacity: 0,
            }}
          >
            Explore the edit
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3v10M3 8l5 5 5-5" stroke="#1D3A2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── Editorial ───────────────────────────────────────────────────── */}
      <section style={{
        background: '#F0EDE8',
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <CategoryEditorial
            articles={articles}
            categoryLabel="Home & Decor"
            categorySlug="home-decor"
          />
        </div>
      </section>

      {/* ── Product Picks ─────────────────────────────────────────────── */}
      <section style={{
        background: '#FDFAF6',
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)',
        borderTop: '1px solid rgba(184,149,90,0.12)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <span style={{
              display: 'block',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#B8955A',
              marginBottom: '12px',
            }}>
              Curated Picks
            </span>
            <h2 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(26px, 3.5vw, 40px)',
              fontWeight: 700,
              color: '#1A1714',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              margin: '0 0 12px',
            }}>
              Things worth buying.
            </h2>
            <p style={{ fontSize: '15px', color: '#6B6557', margin: 0 }}>
              Tested, rated, and linked directly to Amazon. No fluff.
            </p>
          </div>
          <ProductGrid
            products={products}
            category={'home-decor'}
            limit={12}
            showHeader={false}
          />
        </div>
      </section>

      {/* ── Email Capture ──────────────────────────────────────────────── */}
      <HomeDecorEmailCapture />

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <LifestyleFooter />

      {/* ── Global styles ─────────────────────────────────────────────── */}
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

        /* Article grid */
        .hd-article-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* Article card hover */
        .hd-article-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(26,23,20,0.10);
        }

        /* Product grid */
        .hd-product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        /* Product card hover */
        .hd-product-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hd-product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(26,23,20,0.09);
        }

        /* Amazon link hover */
        .ls-amazon-link:hover { border-color: #1D3A2F !important; }

        @media (max-width: 900px) {
          .hd-article-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 640px) {
          .hd-article-grid {
            grid-template-columns: 1fr !important;
          }
          .hd-product-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
