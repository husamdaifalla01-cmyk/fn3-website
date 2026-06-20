import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import Image from 'next/image'
import LifestyleNav from '@/components/lifestyle/LifestyleNav'
import LifestyleFooter from '@/components/lifestyle/LifestyleFooter'
import BeautyEmailCapture from './BeautyEmailCapture'
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
  title: 'Beauty & Skincare',
  description:
    'Honest skincare reviews, clean beauty guides, and the products that actually earn a place in your routine.',
  alternates: { canonical: 'https://mintbrooks.com/lifestyle/beauty' },
  openGraph: {
    title: 'Beauty & Skincare — Mintbrooks',
    description:
      'Honest skincare reviews, clean beauty guides, and the products that actually earn a place in your routine.',
    type: 'website',
    url: 'https://mintbrooks.com/lifestyle/beauty',
    images: [{ url: 'https://mintbrooks.com/lifestyle/beauty.jpg', width: 1200, height: 630, alt: 'Mintbrooks Beauty & Skincare' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beauty & Skincare — Mintbrooks',
    description:
      'Honest skincare reviews, clean beauty guides, and the products that actually earn a place in your routine.',
    images: ['https://mintbrooks.com/lifestyle/beauty.jpg'],
  },
}

export default async function BeautyPage() {
  const products = getProductsByCategory('beauty', 12)
  const articles = EDITORIAL_ARTICLES.filter(a => a.categorySlug === 'beauty')
  return (
    <div
      className={playfair.variable}
      style={{
        '--ls-cream': '#FDFAF6',
        '--ls-forest': '#1D3A2F',
        '--ls-gold': '#B8955A',
        '--ls-text': '#1A1714',
        '--ls-muted': '#6B6557',
        background: '#FDFAF6',
        color: '#1A1714',
      } as React.CSSProperties}
    >
      <LifestyleNav />

      {/* ── 1. CATEGORY HERO ──────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          minHeight: '600px',
          maxHeight: '900px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {/* Background image */}
        <Image
          src="/beauty.jpg"
          alt="Beauty & Skincare"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
        />

        {/* Gradient overlay — cream from bottom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(253,250,246,0.08) 0%, rgba(253,250,246,0.35) 40%, rgba(253,250,246,0.82) 70%, rgba(253,250,246,0.97) 100%)',
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div
          className="ls-hero-content"
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            padding: 'clamp(40px, 6vw, 100px) clamp(20px, 5vw, 80px) clamp(60px, 8vw, 100px)',
            maxWidth: '860px',
          }}
        >
          {/* Category pill */}
          <div
            className="ls-fade-up"
            style={{
              display: 'inline-block',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#B8955A',
              border: '1px solid rgba(184,149,90,0.4)',
              padding: '6px 16px',
              borderRadius: '100px',
              marginBottom: '24px',
              background: 'rgba(253,250,246,0.7)',
              backdropFilter: 'blur(4px)',
            }}
          >
            Beauty
          </div>

          {/* Headline */}
          <h1
            className="ls-fade-up ls-fade-delay-1"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(42px, 7vw, 88px)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#1A1714',
              margin: '0 0 20px',
            }}
          >
            Your skin,
            <br />
            <em style={{ fontStyle: 'italic' }}>on purpose.</em>
          </h1>

          {/* Subheadline */}
          <p
            className="ls-fade-up ls-fade-delay-2"
            style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              lineHeight: 1.65,
              color: '#6B6557',
              margin: '0 0 40px',
              maxWidth: '520px',
            }}
          >
            Clean, effective, worth every penny — and we test everything
            before recommending it.
          </p>

          {/* Scroll CTA */}
          <a
            href="#beauty-articles"
            className="ls-fade-up ls-fade-delay-3 ls-cta-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#1D3A2F',
              color: '#FDFAF6',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '16px 36px',
              borderRadius: '100px',
              transition: 'background 0.25s, transform 0.2s',
            }}
          >
            Explore the edit
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
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
            categoryLabel="Beauty"
            categorySlug="beauty"
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
            category={'beauty'}
            limit={12}
            showHeader={false}
          />
        </div>
      </section>

      {/* ── 4. FEATURED GUIDE ─────────────────────────────────────────── */}
      <section
        style={{
          padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)',
          background: '#1D3A2F',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="ls-guide-grid">
            {/* Left: editorial copy */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '28px',
              }}
            >
              <p
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#B8955A',
                  margin: 0,
                }}
              >
                Our approach
              </p>
              <h2
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 'clamp(30px, 4vw, 48px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#FDFAF6',
                  margin: 0,
                  lineHeight: 1.15,
                }}
              >
                The Mintbrooks Skincare Framework
              </h2>
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.75,
                  color: 'rgba(253,250,246,0.7)',
                  margin: 0,
                  maxWidth: '460px',
                }}
              >
                We filter every product through three questions: Does the science support it?
                Is the formulation clean? Is the price justifiable? If it fails any one,
                it doesn&apos;t make our list.
              </p>
              <a
                href="/about"
                className="ls-method-link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#B8955A',
                  textDecoration: 'none',
                  transition: 'gap 0.2s',
                }}
              >
                Read our methodology →
              </a>
            </div>

            {/* Right: image card */}
            <div
              style={{
                position: 'relative',
                height: 'clamp(360px, 45vw, 520px)',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(253,250,246,0.12)',
              }}
            >
              <Image
                src="/beauty.jpg"
                alt="The Mintbrooks skincare framework"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(29,58,47,0.5) 0%, transparent 60%)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. EMAIL CAPTURE ──────────────────────────────────────────── */}
      <BeautyEmailCapture />

      <LifestyleFooter />

      {/* ── Global styles ─────────────────────────────────────────────── */}
      <style>{`
        @keyframes ls-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ls-fade-up {
          animation: ls-fade-up 0.7s ease both;
        }
        .ls-fade-delay-1 { animation-delay: 0.15s; }
        .ls-fade-delay-2 { animation-delay: 0.28s; }
        .ls-fade-delay-3 { animation-delay: 0.42s; }

        .ls-fade-up-item { animation: ls-fade-up 0.6s ease both; }
        .ls-delay-0 { animation-delay: 0.05s; }
        .ls-delay-1 { animation-delay: 0.12s; }
        .ls-delay-2 { animation-delay: 0.19s; }
        .ls-delay-3 { animation-delay: 0.26s; }
        .ls-delay-4 { animation-delay: 0.33s; }
        .ls-delay-5 { animation-delay: 0.40s; }

        /* Article grid */
        .ls-articles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* Product grid */
        .ls-products-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        /* Guide grid */
        .ls-guide-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        /* Responsive */
        @media (max-width: 960px) {
          .ls-articles-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 760px) {
          .ls-articles-grid {
            grid-template-columns: 1fr !important;
          }
          .ls-products-grid {
            grid-template-columns: 1fr !important;
          }
          .ls-guide-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }

        /* Hover states (replaces JS onMouseEnter/onMouseLeave) */
        .ls-cta-btn:hover { background: #B8955A !important; }

        .ls-article-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(139,78,107,0.12);
        }

        .ls-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(26,23,20,0.1);
        }

        .ls-method-link:hover { gap: 14px !important; }

        * { box-sizing: border-box; }

        html { scroll-behavior: smooth; }

        ::selection {
          background: rgba(184,149,90,0.25);
          color: #1A1714;
        }
      `}</style>
    </div>
  )
}
