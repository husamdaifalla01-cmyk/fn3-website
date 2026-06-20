'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

const VERTICALS = [
  {
    id: 'home',
    label: 'Home & Decor',
    headline: 'Spaces that feel like you',
    teaser: 'Curated finds for a home that reflects your life, not a showroom.',
    accent: '#2C4A3E',
    bg: '#EEF3F1',
    pattern: '⌂',
    span: 2,
    image: '/home-decor.jpg',
  },
  {
    id: 'wellness',
    label: 'Wellness',
    headline: 'Rituals worth keeping',
    teaser: 'From weighted blankets to morning routines that actually hold.',
    accent: '#7B5E4A',
    bg: '#F5EDE5',
    pattern: '◯',
    span: 1,
    image: '/wellness.jpg',
  },
  {
    id: 'beauty',
    label: 'Beauty',
    headline: 'Your skin, on purpose',
    teaser: 'Clean, effective, worth every penny — and we tested them.',
    accent: '#8B4E6B',
    bg: '#F5EAF0',
    pattern: '✦',
    span: 1,
    image: '/beauty.jpg',
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    headline: 'Cook like you mean it',
    teaser: 'The gear, the method, the aesthetic. All in one place.',
    accent: '#4A5E2C',
    bg: '#EDF2E5',
    pattern: '◈',
    span: 1,
    image: '/kitchen.jpg',
  },
  {
    id: 'finance',
    label: 'Money & Credit',
    headline: 'Fund the life you\'re building',
    teaser: 'Credit isn\'t a ceiling — it\'s a foundation. Let\'s build yours.',
    accent: '#1D3A2F',
    bg: '#1D3A2F',
    pattern: '◆',
    span: 2,
    dark: true,
    image: '/finance.jpg',
  },
]

function VerticalCard({ v, index }: { v: typeof VERTICALS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }, index * 80)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      style={{
        gridColumn: `span ${v.span}`,
        background: v.bg,
        borderRadius: '20px',
        padding: '44px 40px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        opacity: 0,
        transform: 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease',
        minHeight: v.span === 2 ? '320px' : '280px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.14)'
        e.currentTarget.style.transform = 'translateY(-4px)'
        const img = e.currentTarget.querySelector<HTMLElement>('.ls-vertical-img')
        if (img) img.style.transform = 'scale(1.06)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
        const img = e.currentTarget.querySelector<HTMLElement>('.ls-vertical-img')
        if (img) img.style.transform = 'scale(1)'
      }}
    >
      {/* Background image (when available) — Ingrid: fades to let type breathe */}
      {'image' in v && v.image && (
        <>
          <Image
            src={v.image as string}
            alt={v.label}
            fill
            sizes="(max-width: 900px) 50vw, 33vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              transition: 'transform 0.6s ease',
            }}
            className="ls-vertical-img"
          />
          {/* Gradient overlay so text stays readable — Sofia's call */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: v.dark
              ? 'linear-gradient(to top, rgba(29,58,47,0.96) 0%, rgba(29,58,47,0.6) 60%, rgba(29,58,47,0.2) 100%)'
              : 'linear-gradient(to top, rgba(253,250,246,0.98) 0%, rgba(253,250,246,0.7) 55%, rgba(253,250,246,0.1) 100%)',
            zIndex: 1,
          }} />
        </>
      )}

      {/* Background pattern character */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20px',
          right: '32px',
          fontSize: '96px',
          opacity: 0.08,
          color: v.dark ? '#FDFAF6' : v.accent,
          lineHeight: 1,
          fontFamily: 'Georgia, serif',
          userSelect: 'none',
        }}
      >
        {v.pattern}
      </div>

      {/* All content above overlay — zIndex 2 */}
      {/* Category label */}
      <span style={{
        display: 'inline-block',
        fontSize: '10px',
        position: 'relative',
        zIndex: 2,
        fontWeight: 700,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: v.dark ? 'rgba(253,250,246,0.6)' : v.accent,
        marginBottom: '14px',
      }}>
        {v.label}
      </span>

      {/* Headline */}
      <h3 style={{
        position: 'relative',
        zIndex: 2,
        fontFamily: '"Playfair Display", Georgia, serif',
        fontSize: 'clamp(22px, 3vw, 30px)',
        fontWeight: 700,
        color: v.dark ? '#FDFAF6' : '#1A1714',
        lineHeight: 1.2,
        margin: '0 0 12px',
        letterSpacing: '-0.02em',
      }}>
        {v.headline}
      </h3>

      {/* Teaser */}
      <p style={{
        position: 'relative',
        zIndex: 2,
        fontSize: '14px',
        color: v.dark ? 'rgba(253,250,246,0.7)' : '#6B6557',
        lineHeight: 1.6,
        margin: '0 0 24px',
        maxWidth: '320px',
      }}>
        {v.teaser}
      </p>

      {/* Arrow CTA */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: v.dark ? '#B8955A' : v.accent,
      }}>
        <span>Explore</span>
        <span style={{ fontSize: '16px', transition: 'transform 0.2s' }}>→</span>
      </div>
    </div>
  )
}

export default function LifestyleVerticals() {
  return (
    <section
      id="verticals"
      style={{
        background: '#FDFAF6',
        padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)',
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: '56px' }}>
        <span style={{
          display: 'block',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#B8955A',
          marginBottom: '16px',
        }}>
          What we cover
        </span>
        <h2 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 700,
          color: '#1A1714',
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
          margin: 0,
          maxWidth: '520px',
        }}>
          Every part of the life
          <em style={{ fontStyle: 'italic' }}> you're after.</em>
        </h2>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
      }}
        className="ls-verticals-grid"
      >
        {VERTICALS.map((v, i) => (
          <VerticalCard key={v.id} v={v} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ls-verticals-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .ls-verticals-grid > div[style*="span 2"] {
            grid-column: span 2 !important;
          }
        }
        @media (max-width: 580px) {
          .ls-verticals-grid {
            grid-template-columns: 1fr !important;
          }
          .ls-verticals-grid > div[style*="span 2"] {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  )
}
