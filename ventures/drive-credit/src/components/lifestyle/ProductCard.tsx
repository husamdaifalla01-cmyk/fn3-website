'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface Product {
  asin: string
  name: string
  price?: number
  rating?: number
  review_count?: number
  affiliate_url: string
  primary_image_url?: string
  image_url?: string
  category: string
  has_pin?: boolean
}

interface Props {
  product: Product
  featured?: boolean
  layout?: 'grid' | 'featured' | 'horizontal'
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(rating)) return '★'
    if (i < rating) return '★' // half — simplify to filled
    return '☆'
  })
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
      <span style={{ color: '#B8955A', fontSize: '13px', letterSpacing: '1px' }}>
        {stars.join('')}
      </span>
      <span style={{ fontSize: '11px', color: '#9B9388' }}>
        {count > 0 ? `(${count.toLocaleString()})` : rating.toFixed(1)}
      </span>
    </div>
  )
}

export default function ProductCard({ product, featured = false, layout = 'grid' }: Props) {
  const effectiveLayout = featured ? 'featured' : layout
  const isFeatured = effectiveLayout === 'featured'

  const fallbackSrc = `/${product.category}.jpg`
  const initialSrc = product.primary_image_url || product.image_url || fallbackSrc

  const [imgSrc, setImgSrc] = useState(initialSrc)
  const [triedFallback, setTriedFallback] = useState(false)

  function handleImageError() {
    if (!triedFallback) {
      setTriedFallback(true)
      setImgSrc(fallbackSrc)
    }
  }

  const isUnoptimized = imgSrc.startsWith('/api/')

  // ─── Featured layout ───────────────────────────────────────────────────────
  if (isFeatured) {
    return (
      <>
        <style>{`
          .ls-product-card--featured {
            position: relative;
            overflow: hidden;
            border-radius: 20px;
            cursor: pointer;
            display: block;
            text-decoration: none;
            color: inherit;
            grid-column: span 2;
          }
          .ls-product-card--featured .ls-product-image-wrap img {
            transition: transform 0.6s ease;
          }
          .ls-product-card--featured:hover .ls-product-image-wrap img {
            transform: scale(1.05);
          }
          .ls-product-card--featured .ls-product-overlay {
            background: linear-gradient(to top, rgba(14,10,8,0.96) 0%, rgba(14,10,8,0.7) 45%, rgba(14,10,8,0.1) 75%, transparent 100%);
            transition: background 0.3s ease;
          }
          .ls-product-card--featured:hover .ls-product-overlay {
            background: linear-gradient(to top, rgba(14,10,8,0.98) 0%, rgba(14,10,8,0.8) 45%, rgba(14,10,8,0.2) 75%, transparent 100%);
          }
        `}</style>

        <Link href={product.affiliate_url} target="_blank" rel="noopener noreferrer nofollow" className="ls-product-card--featured">
          {/* Image */}
          <div
            className="ls-product-image-wrap"
            style={{ height: 'clamp(380px, 45vw, 520px)', position: 'relative', width: '100%' }}
          >
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              style={{ objectFit: 'cover' }}
              onError={handleImageError}
              unoptimized={isUnoptimized}
            />
          </div>

          {/* Dark gradient overlay */}
          <div
            className="ls-product-overlay"
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          />

          {/* ✦ Styled badge — top right */}
          {product.has_pin && (
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                background: '#B8955A',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderRadius: '100px',
                padding: '5px 12px',
                zIndex: 2,
              }}
            >
              ✦ Styled
            </div>
          )}

          {/* Content — absolutely positioned at bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '28px',
            }}
          >
            {/* Category pill — frosted glass, gold accent */}
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
              {product.category.replace(/-/g, ' ')}
            </span>

            {/* Product name */}
            <h3
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(26px, 3vw, 32px)',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                margin: '0 0 10px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.name}
            </h3>

            {/* Price */}
            {product.price != null && (
              <div
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#B8955A',
                  letterSpacing: '-0.01em',
                  marginBottom: '8px',
                }}
              >
                ${product.price.toFixed(2)}
              </div>
            )}

            {/* Rating */}
            {product.rating != null && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
                <span style={{ color: '#B8955A', fontSize: '13px', letterSpacing: '1px' }}>
                  {Array.from({ length: 5 }, (_, i) =>
                    i < Math.floor(product.rating!) ? '★' : i < product.rating! ? '★' : '☆'
                  ).join('')}
                </span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)' }}>
                  {product.review_count && product.review_count > 0
                    ? `(${product.review_count.toLocaleString()})`
                    : product.rating!.toFixed(1)}
                </span>
              </div>
            )}

            {/* CTA — outline style, white border, translucent */}
            <span
              style={{
                display: 'inline-block',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.75)',
                border: '1px solid rgba(255,255,255,0.45)',
                borderRadius: '100px',
                padding: '9px 20px',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                fontWeight: 700,
              }}
            >
              Shop on Amazon →
            </span>
          </div>
        </Link>
      </>
    )
  }

  // ─── Grid layout (default) ─────────────────────────────────────────────────
  return (
    <>
      <article className="ls-product-card">
        {/* Image area */}
        <div className="ls-product-image-wrap" style={{ height: '240px' }}>
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            onError={handleImageError}
            unoptimized={isUnoptimized}
          />

          {/* Warm hover overlay — fades in via CSS */}
          <div className="ls-product-hover-overlay" />

          {/* Category pill — top left, frosted */}
          <span
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#2D4A3E',
              background: 'rgba(245,240,232,0.82)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderRadius: '100px',
              padding: '4px 10px',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            {product.category.replace(/-/g, ' ')}
          </span>

          {/* ✦ Styled badge — top right, gold */}
          {product.has_pin && (
            <span
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                color: '#FFFFFF',
                background: '#B8955A',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderRadius: '100px',
                padding: '4px 10px',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            >
              ✦ Styled
            </span>
          )}
        </div>

        {/* Card body */}
        <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* Product name */}
          <h3
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '17px',
              fontWeight: 700,
              color: '#1A1714',
              lineHeight: 1.35,
              letterSpacing: '-0.01em',
              margin: '0 0 10px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.name}
          </h3>

          {/* Star rating */}
          {product.rating != null && (
            <StarRating
              rating={product.rating}
              count={product.review_count ?? 0}
            />
          )}

          {/* Price */}
          {product.price != null && (
            <div
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#B8955A',
                letterSpacing: '-0.01em',
                marginBottom: '16px',
              }}
            >
              ${product.price.toFixed(2)}
            </div>
          )}

          {/* Spacer to push CTA to bottom */}
          <div style={{ flex: 1 }} />

          {/* Shop CTA */}
          <Link
            href={product.affiliate_url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="ls-product-cta"
          >
            Shop on Amazon →
          </Link>
        </div>
      </article>

      <style>{`
        .ls-product-card {
          background: #FFFFFF;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .ls-product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.13);
        }

        .ls-product-image-wrap {
          overflow: hidden;
          position: relative;
          width: 100%;
          flex-shrink: 0;
        }
        .ls-product-image-wrap img {
          transition: transform 0.5s ease;
        }
        .ls-product-card:hover .ls-product-image-wrap img {
          transform: scale(1.04);
        }

        .ls-product-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(184,149,90,0.1);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
          z-index: 1;
        }
        .ls-product-card:hover .ls-product-hover-overlay {
          opacity: 1;
        }

        .ls-product-cta {
          display: block;
          width: 100%;
          padding: 0 20px;
          height: 48px;
          line-height: 48px;
          background: #1D3A2F;
          color: #FDFAF6;
          border: none;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-align: center;
          text-decoration: none;
          transition: background 0.2s;
          box-sizing: border-box;
        }
        .ls-product-cta:hover {
          background: #2C4E40;
        }
      `}</style>
    </>
  )
}
