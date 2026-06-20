import React from 'react'
import Link from 'next/link'

interface TrendingSectionProps {
  label: string
  title: string
  subtitle?: string
  viewAllHref?: string
  viewAllLabel?: string
  children: React.ReactNode
  background?: string
}

export default function TrendingSection({
  label,
  title,
  subtitle,
  viewAllHref,
  viewAllLabel = 'View all',
  children,
  background = '#FDFAF6',
}: TrendingSectionProps) {
  return (
    <section
      style={{
        background,
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)',
      }}
    >
      {/* Gold rule */}
      <div
        style={{
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, #B8955A 30%, transparent)',
          marginBottom: '32px',
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <p
          style={{
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#B8955A',
            margin: '0 0 12px 0',
          }}
        >
          {label}
        </p>

        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            color: '#1D3A2F',
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            margin: '0 0 12px 0',
          }}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            style={{
              fontSize: '15px',
              color: '#5A6B5F',
              maxWidth: '480px',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Content slot */}
      {children}

      {/* View all link */}
      {viewAllHref && (
        <div style={{ marginTop: '36px' }}>
          <Link
            href={viewAllHref}
            style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#1D3A2F',
              textDecoration: 'none',
              borderBottom: '1px solid #1D3A2F',
              paddingBottom: '2px',
            }}
          >
            {viewAllLabel} →
          </Link>
        </div>
      )}
    </section>
  )
}
