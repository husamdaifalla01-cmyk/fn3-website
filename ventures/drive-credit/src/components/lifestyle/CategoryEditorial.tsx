'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface Article {
  slug: string
  title: string
  category: string
  categorySlug: string
  readTime: string
  date?: string
  image: string
  accent: string
  bg: string
  excerpt?: string
  featured?: boolean
}

interface Props {
  articles: Article[]
  categoryLabel: string
  categorySlug: string
  accentColor?: string
}

function SidebarCard({ article }: { article: Article }) {
  const [imgError, setImgError] = useState(false)
  const imgSrc = imgError ? `/lifestyle/${article.categorySlug}.jpg` : article.image

  return (
    <Link
      href={`/lifestyle/articles/${article.slug}`}
      className="cated-sidebar-card"
      style={{
        display: 'flex',
        borderRadius: '12px',
        background: '#FDFAF6',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      {/* Image */}
      <div style={{ width: '110px', minWidth: '110px', position: 'relative', minHeight: '100px' }}>
        <Image
          src={imgSrc}
          alt={article.title}
          fill
          sizes="110px"
          style={{ objectFit: 'cover' }}
          onError={() => setImgError(true)}
        />
      </div>

      {/* Text */}
      <div style={{ padding: '16px 18px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Category */}
          <span style={{
            display: 'block',
            fontSize: '9px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: '#B8955A',
            marginBottom: '6px',
          }}>
            {article.category}
          </span>

          {/* Title */}
          <h3
            className="cated-sidebar-title"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(14px, 1.6vw, 16px)',
              fontWeight: 700,
              color: '#1A1714',
              lineHeight: 1.25,
              margin: '0 0 8px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              transition: 'color 0.25s ease',
            }}
          >
            {article.title}
          </h3>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#9B9388' }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="5" stroke="#9B9388" strokeWidth="1.2" />
              <path d="M6 3.5v2.75l1.5 1.5" stroke="#9B9388" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            {article.readTime} read
          </span>
          <span style={{ fontSize: '12px', color: '#9B9388' }}>→</span>
        </div>
      </div>
    </Link>
  )
}

function HeroCard({ article }: { article: Article }) {
  const [imgError, setImgError] = useState(false)
  const imgSrc = imgError ? `/lifestyle/${article.categorySlug}.jpg` : article.image

  return (
    <Link
      href={`/lifestyle/articles/${article.slug}`}
      className="cated-hero"
      style={{
        flex: '1.4',
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'block',
        textDecoration: 'none',
      }}
    >
      {/* Full-bleed image */}
      <div style={{ position: 'relative', height: 'clamp(440px, 55vw, 600px)', width: '100%' }}>
        <Image
          src={imgSrc}
          alt={article.title}
          fill
          sizes="(max-width: 860px) 100vw, 58vw"
          style={{ objectFit: 'cover' }}
          onError={() => setImgError(true)}
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="cated-hero-overlay"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />

      {/* Read time badge — top right */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          fontSize: '10px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.9)',
          border: '1px solid rgba(255,255,255,0.35)',
          borderRadius: '100px',
          padding: '5px 12px',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        {article.readTime} read
      </div>

      {/* Content — absolutely positioned at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '32px 28px',
        }}
      >
        {/* Category pill */}
        <span
          style={{
            display: 'inline-block',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#B8955A',
            background: 'rgba(253,250,246,0.12)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(184,149,90,0.4)',
            borderRadius: '100px',
            padding: '4px 12px',
            marginBottom: '14px',
          }}
        >
          {article.category}
        </span>

        {/* Title */}
        <h3
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            margin: '0 0 12px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.title}
        </h3>

        {/* Excerpt */}
        {article.excerpt && (
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.65,
              margin: '0 0 18px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {article.excerpt}
          </p>
        )}

        {/* Read article link */}
        <span
          style={{
            fontSize: '11px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.85)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          Read article →
        </span>
      </div>
    </Link>
  )
}

export default function CategoryEditorial({
  articles,
  categoryLabel,
  accentColor = '#B8955A',
}: Props) {
  if (!articles || articles.length === 0) return null

  const heroArticle = articles[0]
  const sidebarArticles = articles.slice(1, 4)

  return (
    <>
      <style>{`
        .cated-hero { cursor: pointer; }
        .cated-hero img { transition: transform 0.5s ease; }
        .cated-hero:hover img { transform: scale(1.04); }
        .cated-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,7,5,0.97) 0%, rgba(10,7,5,0.72) 40%, rgba(10,7,5,0.15) 72%, transparent 100%);
          transition: opacity 0.4s;
        }
        .cated-hero:hover .cated-hero-overlay { opacity: 1.08; }

        .cated-sidebar-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .cated-sidebar-card:hover { transform: translateX(4px); box-shadow: 0 6px 24px rgba(0,0,0,0.08); }
        .cated-sidebar-card:hover .cated-sidebar-title { color: #1D3A2F; }

        @media (max-width: 860px) {
          .cated-grid { flex-direction: column !important; }
          .cated-hero { min-height: 380px !important; }
        }
      `}</style>

      {/* Section header */}
      <div style={{ marginBottom: '48px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{ height: '1px', width: '32px', background: accentColor }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: accentColor }}>
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
          <p style={{ fontSize: '14px', color: '#9B9388', margin: 0, letterSpacing: '0.01em' }}>
            Handpicked for {categoryLabel.toLowerCase()} lovers, this week.
          </p>
        </div>
        <Link
          href="/lifestyle/articles"
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#1D3A2F',
            textDecoration: 'none',
            borderBottom: '1.5px solid rgba(29,58,47,0.3)',
            paddingBottom: '2px',
            whiteSpace: 'nowrap',
          }}
        >
          View all reads →
        </Link>
      </div>

      {/* Main grid: hero + sidebar */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'stretch' }} className="cated-grid">
        {/* Hero */}
        <HeroCard article={heroArticle} />

        {/* Sidebar */}
        {sidebarArticles.length > 0 && (
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {sidebarArticles.map((article) => (
              <SidebarCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
