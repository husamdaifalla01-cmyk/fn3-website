'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

// v2 — Jake: reliable reveal utility used everywhere
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reveal = () => {
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }
    // Fallback: always reveal after 600ms regardless of observer
    const fallback = setTimeout(reveal, 600 + delay)
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { reveal(); obs.disconnect() } },
      { threshold: 0.02 }
    )
    obs.observe(el)
    return () => { obs.disconnect(); clearTimeout(fallback) }
  }, [delay])
  return ref
}

export default function LifestyleEditorial() {
  const contentRef = useReveal(0)

  return (
    <section
      style={{
        background: '#0D1F18',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 8vw, 120px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Remotion ambient reel — autoplays muted, static image poster fallback */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/lifestyle/editorial.jpg"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.5,
          }}
        >
          <source src="/lifestyle/editorial-reel.mp4" type="video/mp4" />
        </video>
        {/* Stronger overlay — Sofia: text must win over video */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(8,20,14,0.92) 0%, rgba(13,31,24,0.75) 60%, rgba(13,31,24,0.5) 100%)',
        }} />
      </div>

      {/* Decorative quote mark — background texture */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-40px',
          right: '5%',
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(200px, 28vw, 380px)',
          fontWeight: 900,
          color: 'rgba(184,149,90,0.05)',
          lineHeight: 1,
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        "
      </div>

      {/* v2: Two-column layout — text left, candle portrait right */}
      <div
        ref={contentRef}
        style={{
          opacity: 0,
          transform: 'translateY(36px)',
          transition: 'opacity 1s ease, transform 1s ease',
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'flex-start',
          maxWidth: '1000px',
        }}
        className="ls-editorial-grid"
      >
        {/* Left — all text content */}
        <div>
          {/* Issue label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
            <div style={{ width: '36px', height: '1px', background: '#B8955A' }} />
            <span style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#B8955A',
            }}>
              From the editors
            </span>
          </div>

          {/* Pull quote — v2: explicit color, no inheritance risk */}
          <blockquote style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(26px, 4vw, 52px)',
            fontWeight: 700,
            color: '#FDFAF6',
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            margin: '0 0 36px',
            padding: 0,
            border: 'none',
          }}>
            You don't have to choose between
            a beautiful home and financial health.
            <em style={{ fontStyle: 'italic', color: '#B8955A', display: 'block', marginTop: '8px' }}>
              Both are the point.
            </em>
          </blockquote>

          {/* Body copy */}
          <p style={{
            fontSize: 'clamp(14px, 1.6vw, 17px)',
            color: 'rgba(253,250,246,0.62)',
            lineHeight: 1.8,
            maxWidth: '520px',
            margin: '0 0 44px',
          }}>
            Mintbrooks exists because the best advice on how to live — the aesthetics,
            the rituals, the things worth investing in — and the financial tools to
            actually afford it have always lived in completely separate places.
            We put them in one.
          </p>

          {/* Author byline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(184,149,90,0.15)',
              border: '1px solid rgba(184,149,90,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '16px',
              color: '#B8955A',
              flexShrink: 0,
            }}>
              M
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#FDFAF6', lineHeight: 1.3 }}>
                The Mintbrooks Team
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(253,250,246,0.4)', letterSpacing: '0.06em' }}>
                mintbrooks.com
              </div>
            </div>
          </div>
        </div>

        {/* Right — candle image portrait inset — v2: editorial magazine placement */}
        <div
          style={{
            position: 'relative',
            width: '220px',
            flexShrink: 0,
            aspectRatio: '2/3',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(184,149,90,0.15)',
          }}
          className="ls-editorial-portrait"
        >
          <Image
            src="/lifestyle/editorial.jpg"
            alt="Candle glow — Mintbrooks editorial"
            fill
            sizes="220px"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Subtle warm tint on the portrait */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 60%, rgba(184,149,90,0.12) 100%)',
          }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .ls-editorial-grid {
            grid-template-columns: 1fr !important;
          }
          .ls-editorial-portrait {
            width: 160px !important;
            margin-top: 32px;
          }
        }
      `}</style>
    </section>
  )
}
