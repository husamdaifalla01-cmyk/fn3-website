import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import Image from 'next/image'
import LifestyleNav from '@/components/lifestyle/LifestyleNav'
import LifestyleFooter from '@/components/lifestyle/LifestyleFooter'
import KitchenEmailCapture from './KitchenEmailCapture'
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
  title: 'Kitchen & Cooking',
  description:
    'Kitchen gear guides, coffee bar setups, and the cookware that earns its place in your home.',
  alternates: { canonical: 'https://mintbrooks.com/lifestyle/kitchen' },
  openGraph: {
    title: 'Kitchen & Cooking — Mintbrooks',
    description:
      'Kitchen gear guides, coffee bar setups, and the cookware that earns its place in your home.',
    type: 'website',
    url: 'https://mintbrooks.com/lifestyle/kitchen',
    images: [{ url: 'https://mintbrooks.com/lifestyle/kitchen.jpg', width: 1200, height: 630, alt: 'Mintbrooks Kitchen & Cooking' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kitchen & Cooking — Mintbrooks',
    description:
      'Kitchen gear guides, coffee bar setups, and the cookware that earns its place in your home.',
    images: ['https://mintbrooks.com/lifestyle/kitchen.jpg'],
  },
}

export default async function KitchenPage() {
  const products = getProductsByCategory('kitchen', 12)
  const articles = EDITORIAL_ARTICLES.filter(a => a.categorySlug === 'kitchen')
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
          src="/kitchen.jpg"
          alt="Kitchen & Cooking"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />

        {/* Gradient overlay — warm cream from bottom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(247,244,239,0.06) 0%, rgba(247,244,239,0.32) 40%, rgba(247,244,239,0.82) 70%, rgba(247,244,239,0.97) 100%)',
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
              background: 'rgba(247,244,239,0.75)',
              backdropFilter: 'blur(4px)',
            }}
          >
            Kitchen
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
            Cook like you
            <br />
            <em style={{ fontStyle: 'italic' }}>mean it.</em>
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
            The gear, the method, the aesthetic. Curated for people who actually use their kitchen.
          </p>

          {/* Scroll CTA */}
          <a
            href="#kitchen-articles"
            className="ls-fade-up ls-fade-delay-3 ls-hero-cta"
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
              transition: 'background 0.25s',
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
            categoryLabel="Kitchen"
            categorySlug="kitchen"
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
            category={'kitchen'}
            limit={12}
            showHeader={false}
          />
        </div>
      </section>

      {/* ── 4. FEATURED GUIDE ─────────────────────────────────────────── */}
      <section
        style={{
          padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)',
          background: '#F7F4EF',
          borderTop: '1px solid rgba(26,23,20,0.06)',
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
                Our philosophy
              </p>
              <h2
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 'clamp(30px, 4vw, 48px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#1A1714',
                  margin: 0,
                  lineHeight: 1.15,
                }}
              >
                The Mintbrooks Kitchen Philosophy
              </h2>
              <div
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 'clamp(22px, 3vw, 32px)',
                  fontWeight: 700,
                  fontStyle: 'italic',
                  color: '#4A5E2C',
                  lineHeight: 1.2,
                }}
              >
                &ldquo;Buy it once. Buy it right.&rdquo;
              </div>
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.75,
                  color: '#6B6557',
                  margin: 0,
                  maxWidth: '460px',
                }}
              >
                We only recommend things built to last. Everything on our list passes the
                5-year test: would you still own it, use it, and love it in five years?
                If not, we don&apos;t recommend it.
              </p>
              <a
                href="/about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#4A5E2C',
                  textDecoration: 'none',
                  transition: 'gap 0.2s',
                }}
                className="ls-methodology-link"
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
                border: '1px solid rgba(26,23,20,0.08)',
                boxShadow: '0 20px 60px rgba(26,23,20,0.08)',
              }}
            >
              <Image
                src="/kitchen.jpg"
                alt="The Mintbrooks kitchen philosophy"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(247,244,239,0.4) 0%, transparent 60%)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. EMAIL CAPTURE ──────────────────────────────────────────── */}
      <KitchenEmailCapture />

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

        /* Hero CTA hover */
        .ls-hero-cta:hover { background: #B8955A !important; }

        /* Article card hover */
        .ls-article-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(74,94,44,0.12);
        }

        /* Product card hover */
        .ls-product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(26,23,20,0.1);
        }

        /* Amazon shop button hover */
        .ls-amazon-btn:hover { background: #B8955A !important; }

        /* Methodology link hover */
        .ls-methodology-link:hover { gap: 14px; }

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
