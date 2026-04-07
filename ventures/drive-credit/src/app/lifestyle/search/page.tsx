'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import LifestyleNav from '@/components/lifestyle/LifestyleNav'
import LifestyleFooter from '@/components/lifestyle/LifestyleFooter'

// ─── Articles Dataset ─────────────────────────────────────────────────────────

const ALL_ARTICLES = [
  // Home & Decor
  {
    title: 'The 7 things that actually make a bedroom feel expensive',
    category: 'Home & Decor',
    slug: '/lifestyle/articles/7-things-that-make-a-bedroom-feel-expensive',
    readTime: '4 min',
    tags: ['bedroom aesthetic', 'home decor', 'interior design'],
  },
  {
    title: 'Aesthetic shelf decor: the 3-2-1 rule designers actually use',
    category: 'Home & Decor',
    slug: '/lifestyle/articles/aesthetic-shelf-decor-3-2-1-rule',
    readTime: '4 min',
    tags: ['shelf decor', 'interior design', 'home decor'],
  },
  {
    title: 'Linen vs cotton bedding: which is actually worth it?',
    category: 'Home & Decor',
    slug: '/lifestyle/articles/linen-vs-cotton-bedding',
    readTime: '5 min',
    tags: ['bedding', 'linen', 'home decor', 'bedroom aesthetic'],
  },
  {
    title: 'How to style a coffee table like an interior designer',
    category: 'Home & Decor',
    slug: '/lifestyle/articles/how-to-style-a-coffee-table',
    readTime: '3 min',
    tags: ['coffee table', 'styling', 'interior design'],
  },
  {
    title: 'The best affordable art prints that look high-end',
    category: 'Home & Decor',
    slug: '/lifestyle/articles/best-affordable-art-prints',
    readTime: '6 min',
    tags: ['art prints', 'wall art', 'home decor'],
  },
  {
    title: 'Organic cotton throw blankets we actually tested',
    category: 'Home & Decor',
    slug: '/lifestyle/articles/organic-cotton-throw-blankets',
    readTime: '4 min',
    tags: ['throw blankets', 'organic cotton', 'home decor'],
  },
  // Wellness
  {
    title: 'The morning routine that actually works (backed by sleep science)',
    category: 'Wellness',
    slug: '/lifestyle/articles/morning-routine-backed-by-sleep-science',
    readTime: '5 min',
    tags: ['morning routine', 'sleep', 'wellness'],
  },
  {
    title: 'Magnesium glycinate vs magnesium citrate: what the research says',
    category: 'Wellness',
    slug: '/lifestyle/articles/magnesium-glycinate-vs-citrate',
    readTime: '6 min',
    tags: ['magnesium', 'supplements', 'wellness'],
  },
  {
    title: 'The best cold plunge routine for people with busy schedules',
    category: 'Wellness',
    slug: '/lifestyle/articles/cold-plunge-routine-busy-schedule',
    readTime: '4 min',
    tags: ['cold plunge', 'morning routine', 'wellness'],
  },
  {
    title: 'How to actually wind down: an evidence-based nighttime routine',
    category: 'Wellness',
    slug: '/lifestyle/articles/evidence-based-nighttime-routine',
    readTime: '5 min',
    tags: ['sleep', 'nighttime routine', 'wellness'],
  },
  {
    title: 'Ashwagandha: what it actually does and who should take it',
    category: 'Wellness',
    slug: '/lifestyle/articles/ashwagandha-what-it-actually-does',
    readTime: '5 min',
    tags: ['ashwagandha', 'supplements', 'wellness'],
  },
  // Beauty
  {
    title: 'Glass skin: the Korean skincare routine that actually delivers',
    category: 'Beauty',
    slug: '/lifestyle/articles/glass-skin-korean-skincare-routine',
    readTime: '6 min',
    tags: ['glass skin', 'Korean skincare', 'skincare routine'],
  },
  {
    title: 'Vitamin C serum: how to pick one without wasting your money',
    category: 'Beauty',
    slug: '/lifestyle/articles/vitamin-c-serum-how-to-pick',
    readTime: '5 min',
    tags: ['vitamin C serum', 'skincare', 'beauty'],
  },
  {
    title: 'The retinol guide for beginners: what to expect the first 90 days',
    category: 'Beauty',
    slug: '/lifestyle/articles/retinol-guide-for-beginners',
    readTime: '7 min',
    tags: ['retinol', 'skincare', 'anti-aging'],
  },
  {
    title: 'SPF 50 vs SPF 30: the truth about sunscreen protection',
    category: 'Beauty',
    slug: '/lifestyle/articles/spf-50-vs-spf-30-sunscreen-truth',
    readTime: '4 min',
    tags: ['sunscreen', 'SPF', 'skincare'],
  },
  {
    title: 'The 5-step skincare routine that actually fits into real life',
    category: 'Beauty',
    slug: '/lifestyle/articles/5-step-skincare-routine-real-life',
    readTime: '5 min',
    tags: ['skincare routine', 'beauty', 'morning routine'],
  },
  {
    title: 'Niacinamide: the ingredient your skin has been missing',
    category: 'Beauty',
    slug: '/lifestyle/articles/niacinamide-the-ingredient-your-skin-needs',
    readTime: '4 min',
    tags: ['niacinamide', 'skincare', 'beauty'],
  },
  // Kitchen
  {
    title: 'How to set up a coffee bar at home (for under $200)',
    category: 'Kitchen',
    slug: '/lifestyle/articles/how-to-set-up-a-coffee-bar-at-home',
    readTime: '5 min',
    tags: ['coffee bar', 'kitchen', 'home setup'],
  },
  {
    title: 'The best French press under $50 we actually tested',
    category: 'Kitchen',
    slug: '/lifestyle/articles/best-french-press-under-50',
    readTime: '4 min',
    tags: ['French press', 'coffee', 'kitchen'],
  },
  {
    title: 'Cast iron vs carbon steel: which pan should you actually buy?',
    category: 'Kitchen',
    slug: '/lifestyle/articles/cast-iron-vs-carbon-steel-pan',
    readTime: '6 min',
    tags: ['cast iron', 'cookware', 'kitchen'],
  },
  {
    title: 'The pantry staples every good home cook actually needs',
    category: 'Kitchen',
    slug: '/lifestyle/articles/pantry-staples-every-home-cook-needs',
    readTime: '5 min',
    tags: ['pantry', 'cooking', 'kitchen'],
  },
  {
    title: 'Japanese knives vs German knives: a practical guide',
    category: 'Kitchen',
    slug: '/lifestyle/articles/japanese-vs-german-knives',
    readTime: '5 min',
    tags: ['knives', 'cookware', 'kitchen'],
  },
  // Finance
  {
    title: 'How to build credit from scratch: the complete guide',
    category: 'Finance',
    slug: '/lifestyle/articles/how-to-build-credit-from-scratch',
    readTime: '8 min',
    tags: ['credit score', 'credit building', 'finance'],
  },
  {
    title: "What actually affects your credit score (and what doesn't)",
    category: 'Finance',
    slug: '/lifestyle/articles/what-actually-affects-your-credit-score',
    readTime: '6 min',
    tags: ['credit score', 'FICO', 'finance'],
  },
  {
    title: 'The 50/30/20 budget rule: does it actually work in 2025?',
    category: 'Finance',
    slug: '/lifestyle/articles/50-30-20-budget-rule-does-it-work',
    readTime: '5 min',
    tags: ['budgeting', 'personal finance', 'finance'],
  },
  {
    title: 'Secured credit cards: the best options for building credit',
    category: 'Finance',
    slug: '/lifestyle/articles/best-secured-credit-cards',
    readTime: '6 min',
    tags: ['secured credit card', 'credit building', 'finance'],
  },
  {
    title: 'How to dispute a credit report error (and actually win)',
    category: 'Finance',
    slug: '/lifestyle/articles/how-to-dispute-credit-report-error',
    readTime: '7 min',
    tags: ['credit report', 'credit score', 'finance'],
  },
  {
    title: 'Emergency fund vs investing: what to prioritize first',
    category: 'Finance',
    slug: '/lifestyle/articles/emergency-fund-vs-investing',
    readTime: '5 min',
    tags: ['emergency fund', 'investing', 'personal finance'],
  },
  {
    title: 'High-yield savings accounts: what to look for in 2025',
    category: 'Finance',
    slug: '/lifestyle/articles/high-yield-savings-accounts-2025',
    readTime: '4 min',
    tags: ['savings', 'high-yield', 'personal finance'],
  },
  {
    title: 'The financial habits of people who feel confident about money',
    category: 'Finance',
    slug: '/lifestyle/articles/financial-habits-of-confident-people',
    readTime: '5 min',
    tags: ['financial habits', 'mindset', 'personal finance'],
  },
]

const POPULAR_SEARCHES = [
  'vitamin C serum',
  'glass skin',
  'coffee bar',
  'credit score',
  'bedroom aesthetic',
  'morning routine',
]

const CATEGORY_COLORS: Record<string, string> = {
  'Home & Decor': '#4A6741',
  Wellness: '#7A5C3A',
  Beauty: '#1D3A2F',
  Kitchen: '#B8955A',
  Finance: '#3A4A6B',
}

// ─── Page Component ────────────────────────────────────────────────────────────

export default function SearchPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return ALL_ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    )
  }, [query])

  const hasQuery = query.trim().length > 0

  return (
    <div style={{ background: '#FDFAF6', minHeight: '100vh' }}>
      <LifestyleNav />

      {/* ── Search Hero ────────────────────────────────────────────────────── */}
      <section
        style={{
          background: '#FDFAF6',
          padding: '140px clamp(20px, 5vw, 80px) clamp(60px, 6vw, 80px)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#B8955A',
            marginBottom: '20px',
            opacity: 0,
            animation: 'ls-fade-up 0.6s ease forwards',
          }}
        >
          Search
        </div>
        <h1
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 700,
            color: '#1A1714',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '40px',
            opacity: 0,
            animation: 'ls-fade-up 0.6s ease 0.1s forwards',
          }}
        >
          Find what you're looking for.
        </h1>

        {/* Search input */}
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            opacity: 0,
            animation: 'ls-fade-up 0.6s ease 0.2s forwards',
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, guides, and reviews..."
            autoFocus
            style={{
              width: '100%',
              padding: '20px 28px',
              fontSize: '16px',
              fontFamily: 'inherit',
              color: '#1A1714',
              background: '#fff',
              border: '1.5px solid rgba(26,23,20,0.15)',
              borderRadius: '100px',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 24px rgba(26,23,20,0.06)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#B8955A'
              e.currentTarget.style.boxShadow = '0 4px 32px rgba(184,149,90,0.15)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(26,23,20,0.15)'
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(26,23,20,0.06)'
            }}
          />
        </div>
      </section>

      {/* ── Results / Default State ───────────────────────────────────────── */}
      <section
        style={{
          padding: '0 clamp(20px, 5vw, 80px) clamp(80px, 10vw, 140px)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {!hasQuery && (
          /* Popular searches */
          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#6B6557',
                marginBottom: '20px',
              }}
            >
              Popular searches
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                justifyContent: 'center',
              }}
            >
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '100px',
                    border: '1.5px solid rgba(26,23,20,0.15)',
                    background: 'transparent',
                    fontSize: '14px',
                    color: '#1A1714',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#B8955A'
                    e.currentTarget.style.background = 'rgba(184,149,90,0.07)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(26,23,20,0.15)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {hasQuery && filtered.length > 0 && (
          /* Results */
          <div>
            <p
              style={{
                fontSize: '13px',
                color: '#6B6557',
                marginBottom: '32px',
                letterSpacing: '0.02em',
              }}
            >
              {filtered.length} result{filtered.length !== 1 ? 's' : ''} for{' '}
              <span style={{ color: '#1A1714', fontWeight: 600 }}>"{query}"</span>
            </p>
            <div
              className="ls-search-results"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
              }}
            >
              {filtered.map((article) => (
                <Link
                  key={article.slug}
                  href={article.slug}
                  style={{ textDecoration: 'none' }}
                >
                  <article
                    style={{
                      background: '#F7F4EF',
                      borderRadius: '16px',
                      padding: '28px',
                      border: '1px solid rgba(26,23,20,0.05)',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                      cursor: 'pointer',
                      height: '100%',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.boxShadow = '0 16px 48px rgba(26,23,20,0.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-block',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: CATEGORY_COLORS[article.category] ?? '#B8955A',
                        marginBottom: '12px',
                      }}
                    >
                      {article.category}
                    </div>
                    <h3
                      style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#1A1714',
                        lineHeight: 1.3,
                        marginBottom: '16px',
                      }}
                    >
                      {article.title}
                    </h3>
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#6B6557',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span>{article.readTime} read</span>
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span
                        style={{
                          color: '#B8955A',
                          fontWeight: 600,
                        }}
                      >
                        Read →
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}

        {hasQuery && filtered.length === 0 && (
          /* No results */
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(20px, 2.5vw, 28px)',
                fontWeight: 700,
                color: '#1A1714',
                marginBottom: '16px',
              }}
            >
              Nothing found for "{query}".
            </p>
            <p style={{ fontSize: '16px', color: '#6B6557', marginBottom: '32px' }}>
              Try a different search or browse all articles.
            </p>
            <Link
              href="/lifestyle/articles"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                borderRadius: '100px',
                background: '#1D3A2F',
                color: '#FDFAF6',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Browse all articles →
            </Link>
          </div>
        )}
      </section>

      <LifestyleFooter />

      <style>{`
        @keyframes ls-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input::placeholder {
          color: rgba(26,23,20,0.38);
        }
        @media (max-width: 900px) {
          .ls-search-results {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 560px) {
          .ls-search-results {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
