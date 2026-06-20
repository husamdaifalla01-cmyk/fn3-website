'use client'

import { useEffect, useRef } from 'react'
import ProductCard from './ProductCard'

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
  products: Product[]
  category?: string
  limit?: number
  showHeader?: boolean
  headerLabel?: string
}

export default function ProductGrid({
  products,
  category,
  limit,
  showHeader = false,
  headerLabel,
}: Props) {
  const gridRef = useRef<HTMLDivElement>(null)

  // Filter by category if provided
  const filtered = category
    ? products.filter(p => p.category === category)
    : products

  // Apply limit
  const visible = limit ? filtered.slice(0, limit) : filtered

  // Feature the first card when there are 2+ products
  const hasFeatured = visible.length >= 2

  // IntersectionObserver: fade-in card rows as they enter viewport
  useEffect(() => {
    if (!gridRef.current) return

    const cards = Array.from(gridRef.current.querySelectorAll<HTMLElement>('.pg-card-wrap'))
    if (cards.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('pg-card-wrap--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    cards.forEach(card => observer.observe(card))
    return () => observer.disconnect()
  }, [visible.length])

  if (visible.length === 0) {
    return (
      <div className="pg-empty">
        <p>Curated picks arriving soon.</p>
      </div>
    )
  }

  return (
    <>
      <section className="pg-section">
        {showHeader && headerLabel && (
          <header className="pg-header">
            <h2 className="pg-header-label">{headerLabel}</h2>
          </header>
        )}

        <div className="pg-grid" ref={gridRef}>
          {visible.map((product, index) => {
            const isFeatured = hasFeatured && index === 0
            return (
              <div
                key={product.asin}
                className={['pg-card-wrap', isFeatured ? 'pg-card-wrap--featured' : ''].filter(Boolean).join(' ')}
                style={{ '--delay': `${Math.min(index, 6) * 60}ms` } as React.CSSProperties}
              >
                <ProductCard
                  product={product}
                  featured={isFeatured}
                  layout={isFeatured ? 'featured' : 'grid'}
                />
              </div>
            )
          })}
        </div>
      </section>

      <style>{`
        .pg-section {
          width: 100%;
        }

        .pg-header {
          margin-bottom: 28px;
        }
        .pg-header-label {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 26px;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #1a1a1a;
          margin: 0;
        }

        .pg-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 768px) {
          .pg-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .pg-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        /* Featured card spans 2 columns on desktop/tablet */
        .pg-card-wrap--featured {
          grid-column: span 2;
        }
        @media (max-width: 480px) {
          .pg-card-wrap--featured {
            grid-column: span 1;
          }
        }

        /* Fade-in animation — cards start invisible via this class,
           not via an inline opacity:0 so server render stays clean */
        .pg-card-wrap {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.45s ease var(--delay, 0ms), transform 0.45s ease var(--delay, 0ms);
        }
        .pg-card-wrap--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .pg-empty {
          padding: 48px 0;
          text-align: center;
          color: #aaa;
          font-size: 15px;
          letter-spacing: 0.01em;
        }
      `}</style>
    </>
  )
}
