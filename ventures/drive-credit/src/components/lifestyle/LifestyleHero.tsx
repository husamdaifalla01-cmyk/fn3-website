'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function LifestyleHero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ken Burns: trigger scale animation on mount
    const imgEl = imgRef.current
    if (imgEl) {
      const img = imgEl.querySelector<HTMLElement>('.ls-hero-img')
      if (img) {
        img.style.transform = 'scale(1.0)'
        requestAnimationFrame(() => {
          img.style.transition = 'transform 12s ease'
          img.style.transform = 'scale(1.08)'
        })
      }
    }

    // Staggered text entrance
    const els = [headlineRef.current, subRef.current, ctaRef.current]
    els.forEach((el, i) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(28px)'
      setTimeout(() => {
        if (!el) return
        el.style.transition = 'opacity 0.9s ease, transform 0.9s ease'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 250 + i * 180)
    })
  }, [])

  const scrollDown = () => {
    const el = document.getElementById('verticals')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 40px 80px',
      }}
    >
      {/* Full-bleed hero image — Ken Burns via JS on mount */}
      <div ref={imgRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/hero.jpg"
          alt="A beautifully styled morning bedroom — Mintbrooks lifestyle"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'scale(1.08)',
          }}
          className="ls-hero-img"
        />
      </div>

      {/* Gradient overlay — stronger mid-section where text lives */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: [
          'linear-gradient(to bottom,',
          '  rgba(253,250,246,0.45) 0%,',
          '  rgba(253,250,246,0.68) 35%,',
          '  rgba(253,250,246,0.80) 65%,',
          '  rgba(253,250,246,0.95) 100%)',
        ].join(''),
      }} />
      {/* Radial softening behind text center — Priya: text legibility at all image tones */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(253,250,246,0.45) 0%, transparent 100%)',
      }} />

      {/* Decorative top line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #B8955A 30%, #1D3A2F 70%, transparent)',
        zIndex: 2,
      }} />

      {/* All content centered over the image */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Category pills */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '52px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {['Home & Decor', 'Wellness', 'Beauty', 'Kitchen', 'Finance'].map((cat) => (
            <span
              key={cat}
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#1D3A2F',
                background: 'rgba(253,250,246,0.75)',
                border: '1px solid rgba(29,58,47,0.2)',
                padding: '5px 14px',
                borderRadius: '100px',
                backdropFilter: 'blur(4px)',
              }}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Main headline */}
        <h1
          ref={headlineRef}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(52px, 9vw, 112px)',
            fontWeight: 700,
            color: '#1A1714',
            textAlign: 'center',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            maxWidth: '900px',
            margin: '0 0 28px',
            textShadow: '0 1px 8px rgba(253,250,246,0.9), 0 4px 24px rgba(253,250,246,0.6)',
          }}
        >
          The good life,
          <br />
          <em style={{ fontStyle: 'italic', color: '#1D3A2F' }}>curated.</em>
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          style={{
            fontSize: 'clamp(17px, 2.2vw, 22px)',
            color: '#2A2520',
            textAlign: 'center',
            maxWidth: '520px',
            lineHeight: 1.6,
            margin: '0 0 52px',
            fontWeight: 400,
          }}
        >
          Home. Wellness. Beauty. And the financial foundation
          to build it all — without compromise.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={scrollDown}
            style={{
              background: '#1D3A2F',
              color: '#FDFAF6',
              border: 'none',
              padding: '16px 36px',
              borderRadius: '100px',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.25s',
              boxShadow: '0 4px 24px rgba(29,58,47,0.30)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(29,58,47,0.40)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(29,58,47,0.30)'
            }}
          >
            Explore the collection
          </button>
          <a
            href="/lifestyle#newsletter"
            style={{
              background: 'rgba(253,250,246,0.8)',
              backdropFilter: 'blur(8px)',
              color: '#1A1714',
              border: '1.5px solid rgba(26,23,20,0.2)',
              padding: '16px 36px',
              borderRadius: '100px',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(253,250,246,0.95)'
              e.currentTarget.style.borderColor = 'rgba(26,23,20,0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(253,250,246,0.8)'
              e.currentTarget.style.borderColor = 'rgba(26,23,20,0.2)'
            }}
          >
            Get the newsletter
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          opacity: 0.5,
          zIndex: 2,
        }}
        onClick={scrollDown}
      >
        <span style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1714' }}>
          Scroll
        </span>
        <div style={{
          width: '1px',
          height: '40px',
          background: '#1A1714',
          animation: 'ls-scroll-line 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes ls-scroll-line {
          0%, 100% { opacity: 0.3; transform: scaleY(1); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(0.4); transform-origin: top; }
        }
        @media (max-width: 600px) {
          .ls-hero-img { object-position: 40% center !important; }
        }
      `}</style>
    </section>
  )
}
