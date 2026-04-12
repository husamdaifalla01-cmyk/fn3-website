'use client'

interface Props {
  variant?: 'mid' | 'end'
}

export default function MoneyResetCTA({ variant = 'mid' }: Props) {
  if (variant === 'end') {
    return (
      <div
        style={{
          background: '#1D3A2F',
          borderRadius: '20px',
          padding: 'clamp(36px, 5vw, 52px)',
          margin: '48px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: '-16px',
            top: '-16px',
            fontFamily: 'Georgia, serif',
            fontSize: '160px',
            fontWeight: 700,
            color: 'rgba(253,250,246,0.03)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          90
        </div>

        <span
          style={{
            display: 'block',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(184,149,90,0.8)',
            marginBottom: '16px',
          }}
        >
          mintbrooks guide
        </span>

        <h3
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 700,
            color: '#FDFAF6',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: '0 0 16px',
          }}
        >
          Ready to run the full sequence?
        </h3>

        <p
          style={{
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            color: 'rgba(253,250,246,0.65)',
            lineHeight: 1.7,
            margin: '0 0 32px',
            maxWidth: '520px',
          }}
        >
          The 90-Day Money Reset walks you through every step in this article —
          plus the creditor scripts, the weekly tracking system, and the no-shame
          mindset framework that makes it stick. $24, instant PDF delivery.
        </p>

        <a
          href="/products/90-day-money-reset"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #B8955A, #9A7A42)',
            color: '#1A1714',
            padding: '16px 40px',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(184,149,90,0.3)',
          }}
        >
          Get the 90-Day Money Reset — $24
        </a>

        <p
          style={{
            fontSize: '11px',
            color: 'rgba(253,250,246,0.35)',
            marginTop: '14px',
          }}
        >
          One-time purchase · 60-day money-back guarantee
        </p>
      </div>
    )
  }

  // variant === 'mid' (default)
  return (
    <div
      style={{
        background: '#F0EDE8',
        borderLeft: '4px solid #1D3A2F',
        borderRadius: '0 12px 12px 0',
        padding: '24px 28px',
        margin: '40px 0',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '20px',
        flexWrap: 'wrap',
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: '#1D3A2F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: '#B8955A',
          fontFamily: 'Georgia, serif',
          fontSize: '18px',
          fontWeight: 700,
        }}
      >
        90
      </div>

      <div style={{ flex: 1, minWidth: '220px' }}>
        <div
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '17px',
            fontWeight: 700,
            color: '#1A1714',
            marginBottom: '6px',
            lineHeight: 1.3,
          }}
        >
          The 90-Day Money Reset
        </div>
        <p
          style={{
            fontSize: '14px',
            color: '#6B6557',
            lineHeight: 1.6,
            margin: '0 0 14px',
          }}
        >
          A step-by-step protocol with the creditor scripts, tracking system, and
          order of operations that makes this approach stick. $24, instant PDF.
        </p>
        <a
          href="/products/90-day-money-reset"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#1D3A2F',
            color: '#FDFAF6',
            padding: '10px 22px',
            borderRadius: '100px',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          Get the guide — $24 →
        </a>
      </div>
    </div>
  )
}
