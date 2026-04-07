'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function LifestyleNewsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/lifestyle/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'default' }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="newsletter"
      style={{
        background: '#F0EDE8',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 8vw, 120px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background image — v2: stronger overlay so text is always legible */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/newsletter.jpg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          aria-hidden
        />
        {/* Warm cream overlay — heavy enough that text wins at all times */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(240,237,232,0.88)',
        }} />
      </div>

      {/* Content — CSS keyframe entrance, always visible */}
      <div
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          animation: 'ls-fade-up 0.8s ease forwards',
        }}
      >
        {/* Icon */}
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: '#1D3A2F',
          margin: '0 auto 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          color: '#FDFAF6',
        }}>
          ✉
        </div>

        {/* Label */}
        <span style={{
          display: 'block',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#B8955A',
          marginBottom: '16px',
        }}>
          The Mintbrooks edit
        </span>

        {/* Headline */}
        <h2 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(26px, 4vw, 40px)',
          fontWeight: 700,
          color: '#1A1714',
          lineHeight: 1.15,
          letterSpacing: '-0.025em',
          margin: '0 0 16px',
        }}>
          Weekly picks, thoughtfully curated.
        </h2>

        <p style={{
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          color: '#6B6557',
          lineHeight: 1.7,
          margin: '0 0 36px',
        }}>
          Home finds, beauty discoveries, kitchen upgrades, and the financial
          moves that make all of it easier. No spam. Just the good stuff.
        </p>

        {status === 'success' ? (
          <div style={{
            background: '#1D3A2F',
            color: '#FDFAF6',
            padding: '24px 32px',
            borderRadius: '16px',
            fontSize: '15px',
            fontWeight: 500,
            lineHeight: 1.5,
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>✓</div>
            You're in. First issue lands this week.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                flex: '1 1 240px',
                padding: '16px 20px',
                borderRadius: '100px',
                border: '1.5px solid rgba(26,23,20,0.18)',
                fontSize: '15px',
                background: 'rgba(253,250,246,0.95)',
                color: '#1A1714',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#B8955A')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(26,23,20,0.18)')}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                background: '#1D3A2F',
                color: '#FDFAF6',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: status === 'loading' ? 'wait' : 'pointer',
                transition: 'all 0.25s',
                opacity: status === 'loading' ? 0.7 : 1,
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => { if (status !== 'loading') e.currentTarget.style.background = '#2C4E40' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#1D3A2F' }}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe free'}
            </button>
          </form>
        )}

        <p style={{
          fontSize: '11px',
          color: '#9B9388',
          marginTop: '16px',
          letterSpacing: '0.02em',
        }}>
          Join readers building their best life. Unsubscribe anytime.
        </p>
      </div>
      <style>{`
        @keyframes ls-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
