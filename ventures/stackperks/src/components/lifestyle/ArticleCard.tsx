'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export interface ArticleCardProps {
  article: {
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
  layout?: 'featured' | 'grid' | 'compact'
}

export default function ArticleCard({ article, layout }: ArticleCardProps) {
  const [imgError, setImgError] = useState(false)
  const isFeatured = layout === 'featured' || article.featured === true
  const imgSrc = imgError ? `/lifestyle/${article.categorySlug}.jpg` : article.image

  if (isFeatured) {
    return (
      <>
        <style>{`
          .article-card-featured {
            position: relative;
            overflow: hidden;
            border-radius: 16px;
            cursor: pointer;
            display: block;
            text-decoration: none;
            color: inherit;
          }
          .article-card-featured .article-card-img {
            transition: transform 0.5s ease;
          }
          .article-card-featured:hover .article-card-img {
            transform: scale(1.04);
          }
          .article-card-featured .article-card-overlay {
            background: linear-gradient(to top, rgba(14,10,8,0.95) 0%, rgba(14,10,8,0.65) 40%, rgba(14,10,8,0.1) 75%, transparent 100%);
            transition: background 0.3s ease;
          }
          .article-card-featured:hover .article-card-overlay {
            background: linear-gradient(to top, rgba(14,10,8,0.98) 0%, rgba(14,10,8,0.75) 40%, rgba(14,10,8,0.2) 75%, transparent 100%);
          }
        `}</style>
        <Link
          href={`/articles/${article.slug}`}
          className="article-card-featured"
        >
          {/* Image */}
          <div
            className="article-card-img"
            style={{
              height: 'clamp(320px, 40vw, 480px)',
              position: 'relative',
              width: '100%',
            }}
          >
            <Image
              src={imgSrc}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              onError={() => setImgError(true)}
            />
          </div>

          {/* Gradient overlay */}
          <div
            className="article-card-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
            }}
          />

          {/* Read time badge — top right */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              fontSize: '9px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: '100px',
              padding: '5px 10px',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            {article.readTime} read
          </div>

          {/* Content — bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '28px',
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
                fontSize: 'clamp(26px, 3vw, 32px)',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                margin: '0 0 12px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
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
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.6,
                  margin: '0 0 16px',
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
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              Read article →
            </span>
          </div>
        </Link>
      </>
    )
  }

  // Grid layout (default)
  return (
    <>
      <style>{`
        .article-card-grid {
          background: #FFFFFF;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          display: block;
          text-decoration: none;
          color: inherit;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-bottom-color 0.25s ease;
          border-bottom: 2px solid transparent;
        }
        .article-card-grid:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
          border-bottom-color: #B8955A;
        }
      `}</style>
      <Link
        href={`/articles/${article.slug}`}
        className="article-card-grid"
      >
        {/* Image */}
        <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
          <Image
            src={imgSrc}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
            onError={() => setImgError(true)}
          />
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          {/* Category pill */}
          <span
            style={{
              display: 'inline-block',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: article.accent,
              background: article.bg,
              borderRadius: '100px',
              padding: '4px 10px',
              marginBottom: '12px',
            }}
          >
            {article.category}
          </span>

          {/* Title */}
          <h3
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '18px',
              fontWeight: 700,
              color: '#1A1714',
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
              margin: '0 0 10px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
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
                fontSize: '13px',
                color: '#6B6557',
                lineHeight: 1.6,
                margin: '0 0 16px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {article.excerpt}
            </p>
          )}

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11px',
              color: '#9B9388',
            }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="5" stroke="#9B9388" strokeWidth="1.2" />
              <path d="M6 3.5v2.75l1.5 1.5" stroke="#9B9388" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span>{article.readTime} read</span>
            {article.date && (
              <>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>{article.date}</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </>
  )
}
