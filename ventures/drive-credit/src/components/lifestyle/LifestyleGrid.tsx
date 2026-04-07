'use client'

import ArticleCard from './ArticleCard'
import { type EditorialArticle, EDITORIAL_ARTICLES, getFeaturedEditorialArticles } from '../../lib/lifestyle/articles-editorial'

export default function LifestyleGrid() {
  const featured = getFeaturedEditorialArticles()
  const firstFeatured = featured[0]
  const secondFeatured = featured[1]
  const gridArticles = EDITORIAL_ARTICLES.filter(
    (a: EditorialArticle) => a.slug !== firstFeatured?.slug && a.slug !== secondFeatured?.slug
  ).slice(0, 4)

  return (
    <section
      style={{
        background: '#F7F4EF',
        padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)',
      }}
    >
      <style>{`
        @keyframes ls-fade-up {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ls-hero-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 16px;
        }

        .ls-hero-grid .ls-span-2 {
          grid-column: span 2;
        }

        .ls-sub-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .ls-view-all {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 100px;
          border: 1.5px solid #1D3A2F;
          color: #1D3A2F;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .ls-view-all:hover {
          background: #1D3A2F;
          color: #FDFAF6;
        }

        @media (max-width: 768px) {
          .ls-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .ls-hero-grid .ls-span-2 {
            grid-column: span 1 !important;
          }
          .ls-sub-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: '52px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <div style={{ height: '1px', width: '32px', background: '#B8955A' }} />
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8955A' }}>
            The Edit
          </span>
        </div>
        <h2 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(32px, 4.5vw, 52px)',
          fontWeight: 700,
          color: '#1A1714',
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          margin: '0 0 10px',
        }}>
          What we&apos;re reading.
        </h2>
        <p style={{ fontSize: '14px', color: '#9B9388', margin: 0 }}>
          Curated guides, honest reviews, and the reads worth your time.
        </p>
      </div>

      {/* Hero row: featured (span 2) + second featured (span 1) */}
      {firstFeatured && (
        <div className="ls-hero-grid">
          <div
            className="ls-span-2"
            style={{
              animation: 'ls-fade-up 0.7s ease forwards',
              animationDelay: '0ms',
            }}
          >
            <ArticleCard article={firstFeatured} layout="featured" />
          </div>
          {secondFeatured && (
            <div
              style={{
                animation: 'ls-fade-up 0.7s ease forwards',
                animationDelay: '80ms',
              }}
            >
              <ArticleCard article={secondFeatured} layout="featured" />
            </div>
          )}
        </div>
      )}

      {/* Sub grid: remaining 4 articles */}
      <div className="ls-sub-grid">
        {gridArticles.map((article: EditorialArticle, i: number) => (
          <div
            key={article.slug}
            style={{
              animation: 'ls-fade-up 0.7s ease forwards',
              animationDelay: `${(i + 2) * 80}ms`,
            }}
          >
            <ArticleCard article={article} layout="grid" />
          </div>
        ))}
      </div>
    </section>
  )
}
