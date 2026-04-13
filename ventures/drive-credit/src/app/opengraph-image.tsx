import { ImageResponse } from 'next/og'

export const alt = 'Mintbrooks — Use Your Car to Get a Real Credit Card'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1c1917',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            letterSpacing: '-2px',
            marginBottom: 32,
            display: 'flex',
          }}
        >
          <span style={{ color: 'white' }}>Mint</span>
          <span style={{ color: '#fbbf24' }}>brooks</span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: 24,
            maxWidth: 900,
          }}
        >
          Use Your Car to Build Real Credit
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255,255,255,0.6)',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
            marginBottom: 48,
          }}
        >
          Get a $500–$10,000 Visa card using your car as collateral.
          Soft pull only — check eligibility free in 2 minutes.
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', gap: 32 }}>
          {['No hard credit pull', '36+ states eligible', '$500–$10k limit'].map((badge) => (
            <div
              key={badge}
              style={{
                background: 'rgba(217,119,6,0.15)',
                border: '1px solid rgba(217,119,6,0.4)',
                borderRadius: 12,
                padding: '10px 20px',
                color: '#fbbf24',
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              ✓ {badge}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: 60,
            fontSize: 18,
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          mintbrooks.com
        </div>
      </div>
    ),
    { ...size }
  )
}
