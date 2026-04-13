'use client'

import { useState } from 'react'
import ArticleCard from '@/components/lifestyle/ArticleCard'
import { EDITORIAL_ARTICLES, getFeaturedEditorialArticles } from '@/lib/lifestyle/articles-editorial'

// ─── Filter Config ─────────────────────────────────────────────────────────────

const FILTERS = ['All', 'Home & Decor', 'Wellness', 'Beauty', 'Kitchen', 'Finance', 'Trending'] as const
type Filter = (typeof FILTERS)[number]

// ─── Component ────────────────────────────────────────────────────────────────

export default function ArticlesClient() {
  const [active, setActive] = useState<Filter>('All')

  const editorsPicks = getFeaturedEditorialArticles()

  const displayed =
    active === 'All'
      ? EDITORIAL_ARTICLES
      : active === 'Trending'
      ? EDITORIAL_ARTICLES.filter((a) => a.featured)
      : EDITORIAL_ARTICLES.filter((a) => a.category === active)

  return (
    <section
      style={{
        padding: '0 clamp(20px, 5vw, 80px) clamp(80px, 10vw, 140px)',
      }}
    >
      <style>{`
        @keyframes ls-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ls-filter-tab {
          padding: 10px 22px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          border: 1.5px solid rgba(26,23,20,0.18);
          background: transparent;
          color: #6B6557;
          transition: all 0.2s ease;
        }
        .ls-filter-tab:hover {
          border-color: rgba(26,23,20,0.45);
          color: #1A1714;
        }
        .ls-filter-tab.active {
          background: #1D3A2F;
          color: #FDFAF6;
          border-color: transparent;
        }
        .ls-filter-tab.active:hover {
          background: #1D3A2F;
          color: #FDFAF6;
          border-color: transparent;
        }

        .ls-editors-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 56px;
        }

        .ls-articles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 960px) {
          .ls-editors-strip {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .ls-articles-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 580px) {
          .ls-editors-strip {
            grid-template-columns: 1fr !important;
          }
          .ls-articles-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* ── Editor's Picks Strip ─────────────────────────────────────────────── */}
        <div
          style={{
            marginBottom: '64px',
            animation: 'ls-fade-up 0.7s ease forwards',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#B8955A',
              }}
            >
              ✦ Editor&apos;s picks
            </span>
            <div
              style={{
                flex: 1,
                height: '1px',
                background: 'rgba(184,149,90,0.25)',
              }}
            />
          </div>
          <div className="ls-editors-strip">
            {editorsPicks.slice(0, 3).map((article, i) => (
              <div
                key={article.slug}
                style={{
                  animation: 'ls-fade-up 0.7s ease forwards',
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <ArticleCard article={article} layout="featured" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Filter Tabs ──────────────────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '20px',
            animation: 'ls-fade-up 0.7s ease forwards',
            animationDelay: '0.3s',
            opacity: 0,
            animationFillMode: 'forwards',
          }}
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`ls-filter-tab${active === filter ? ' active' : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* ── Article count ────────────────────────────────────────────────────── */}
        <p
          style={{
            fontSize: '12px',
            color: '#9B9388',
            marginBottom: '32px',
            letterSpacing: '0.03em',
          }}
        >
          Showing {displayed.length} article{displayed.length !== 1 ? 's' : ''}
          {active !== 'All' ? ` in ${active}` : ''}
        </p>

        {/* ── Article Grid ─────────────────────────────────────────────────────── */}
        <div className="ls-articles-grid">
          {displayed.map((article, i) => (
            <div
              key={article.slug}
              style={{
                animation: 'ls-fade-up 0.6s ease forwards',
                animationDelay: `${Math.min(i * 40, 500)}ms`,
                animationFillMode: 'both',
                opacity: 0,
              }}
            >
              <ArticleCard article={article} layout="grid" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
