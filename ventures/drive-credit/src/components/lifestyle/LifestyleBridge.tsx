'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

const STATS = [
  { value: '1 in 3', label: 'Americans have subprime credit holding back major purchases' },
  { value: '$847', label: 'Extra paid per year in interest by those with fair vs. good credit' },
  { value: '6 months', label: 'Average time to see meaningful credit score improvement' },
  { value: '90 days', label: 'Step-by-step protocol to rebuild your credit score — one action per day', cta: true },
]

export default function LifestyleBridge() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const revealAll = () => {
      el.querySelectorAll<HTMLElement>('.ls-bridge-reveal').forEach((child, i) => {
        setTimeout(() => {
          child.style.opacity = '1'
          child.style.transform = 'translateY(0)'
        }, i * 100)
      })
    }

    // v2: fallback always fires — observer is bonus
    const fallback = setTimeout(revealAll, 500)
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { revealAll(); obs.disconnect(); clearTimeout(fallback) } },
      { threshold: 0.02 }
    )
    obs.observe(el)
    return () => { obs.disconnect(); clearTimeout(fallback) }
  }, [])

  return (
    <section
      style={{
        background: '#FDFAF6',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 8vw, 120px)',
        borderTop: '1px solid rgba(184,149,90,0.15)',
      }}
    >
      <div ref={ref} style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(40px, 6vw, 100px)',
            alignItems: 'start',
          }}
          className="ls-bridge-grid"
        >

          {/* Left — image (full, proper aspect ratio) + copy */}
          <div>
            {/* v2 fix: aspect-ratio instead of fixed height — image fills correctly */}
            <div
              className="ls-bridge-reveal"
              style={{
                opacity: 0,
                transform: 'translateY(28px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
                position: 'relative',
                width: '100%',
                height: '380px',
                borderRadius: '20px',
                overflow: 'hidden',
                marginBottom: '36px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.10)',
              }}
            >
              <Image
                src="/bridge.jpg"
                alt="Morning workspace — building your foundation"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
              {/* Subtle warm tint on image — v2: Ingrid's polish */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(184,149,90,0.08) 0%, transparent 60%)',
              }} />
            </div>

            <div
              className="ls-bridge-reveal"
              style={{
                opacity: 0,
                transform: 'translateY(28px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
              }}
            >
              <span style={{
                display: 'block',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#B8955A',
                marginBottom: '16px',
              }}>
                Money & Credit
              </span>
              <h2 style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(26px, 3.5vw, 44px)',
                fontWeight: 700,
                color: '#1A1714',
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                margin: '0 0 20px',
              }}>
                Building the life you want
                starts with building
                <em style={{ fontStyle: 'italic', color: '#1D3A2F' }}> the credit to fund it.</em>
              </h2>
            </div>

            <p
              className="ls-bridge-reveal"
              style={{
                opacity: 0,
                transform: 'translateY(28px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
                fontSize: 'clamp(14px, 1.5vw, 16px)',
                color: '#6B6557',
                lineHeight: 1.75,
                margin: '0 0 32px',
              }}
            >
              Every linen set, kitchen upgrade, and skincare investment you've been eyeing — they're all more attainable when your credit is working for you. The 90-Day Money Reset is a step-by-step protocol that takes you from financial avoidance to a credit score you can say out loud.
            </p>

            <div
              className="ls-bridge-reveal"
              style={{
                opacity: 0,
                transform: 'translateY(28px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
              }}
            >
              <a
                href="/products/90-day-money-reset"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#1D3A2F',
                  color: '#FDFAF6',
                  padding: '16px 32px',
                  borderRadius: '100px',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.25s',
                  boxShadow: '0 4px 24px rgba(29,58,47,0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(29,58,47,0.35)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(29,58,47,0.25)'
                }}
              >
                Start the 90-Day Reset →
              </a>
              <p style={{
                fontSize: '11px',
                color: '#9B9388',
                marginTop: '12px',
                letterSpacing: '0.02em',
              }}>
                No hard credit pull to check eligibility
              </p>
              <a
                href="/finance"
                style={{
                  display: 'inline-block',
                  marginTop: '16px',
                  fontSize: '13px',
                  color: '#6B6557',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  borderBottom: '1px solid rgba(107,101,87,0.35)',
                  paddingBottom: '1px',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#1D3A2F'
                  e.currentTarget.style.borderColor = 'rgba(29,58,47,0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#6B6557'
                  e.currentTarget.style.borderColor = 'rgba(107,101,87,0.35)'
                }}
              >
                Already tracking your score? → Explore credit tools
              </a>
            </div>
          </div>

          {/* Right — stats cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '8px' }}>
            {STATS.map((stat, i) => (
              i === 3 ? (
                <a
                  key={i}
                  href="/products/90-day-money-reset"
                  className="ls-bridge-reveal"
                  style={{
                    opacity: 0,
                    transform: 'translateY(28px)',
                    transition: 'opacity 0.8s ease, transform 0.8s ease',
                    background: '#1D3A2F',
                    borderRadius: '20px',
                    padding: '36px 32px',
                    display: 'block',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(29,58,47,0.35)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(184,149,90,0.75)', marginBottom: '12px' }}>
                    The Guide
                  </div>
                  <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 700, color: '#FDFAF6', lineHeight: 1.2, marginBottom: '12px', letterSpacing: '-0.02em' }}>
                    The 90-Day Money Reset
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgba(253,250,246,0.6)', lineHeight: 1.55, marginBottom: '20px' }}>
                    A step-by-step protocol for people who know what to do — and need the structure to actually do it. $17.
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8955A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Get the guide → <span style={{ fontSize: '16px' }}>→</span>
                  </div>
                </a>
              ) : (
                <div
                  key={i}
                  className="ls-bridge-reveal"
                  style={{
                    opacity: 0,
                    transform: 'translateY(28px)',
                    transition: 'opacity 0.8s ease, transform 0.8s ease',
                    background: i === 0 ? '#1D3A2F' : '#F0EDE8',
                    borderRadius: '20px',
                    padding: '36px 32px',
                    // v2: subtle left border accent on non-hero cards
                    borderLeft: i !== 0 ? '3px solid rgba(184,149,90,0.25)' : 'none',
                  }}
                >
                  <div style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: 'clamp(30px, 3.5vw, 44px)',
                    fontWeight: 700,
                    color: i === 0 ? '#B8955A' : '#1D3A2F',
                    lineHeight: 1,
                    marginBottom: '10px',
                    letterSpacing: '-0.02em',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: i === 0 ? 'rgba(253,250,246,0.65)' : '#6B6557',
                    lineHeight: 1.55,
                  }}>
                    {stat.label}
                  </div>
                </div>
              )
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ls-bridge-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
