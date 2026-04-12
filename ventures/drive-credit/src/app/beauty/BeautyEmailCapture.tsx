'use client'

import { useState } from 'react'

export default function BeautyEmailCapture() {
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
        body: JSON.stringify({ email, source: 'beauty' }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)',
        background: '#F0EDE8',
        overflow: 'hidden',
      }}
    >
      {/* Background newsletter image at 18% opacity */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/lifestyle/newsletter.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.18,
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#B8955A',
            margin: '0 0 16px',
          }}
        >
          Newsletter
        </p>

        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#1A1714',
            margin: '0 0 16px',
            lineHeight: 1.15,
          }}
        >
          Get the beauty edit.
        </h2>

        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.65,
            color: '#6B6557',
            margin: '0 0 40px',
          }}
        >
          Skincare finds, honest reviews, and the routines actually worth your time.
        </p>

        {status === 'error' && (
          <p style={{ fontSize: '13px', color: '#c0392b', textAlign: 'center', margin: '0 0 14px' }}>
            Something went wrong. Please try again.
          </p>
        )}

        {status === 'success' ? (
          <div
            style={{
              background: '#1D3A2F',
              color: '#FDFAF6',
              borderRadius: '16px',
              padding: '28px 36px',
              fontSize: '16px',
              lineHeight: 1.6,
            }}
          >
            <span
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '20px',
                fontWeight: 700,
                display: 'block',
                marginBottom: '8px',
              }}
            >
              You&apos;re in.
            </span>
            The best of the beauty edit lands in your inbox next send.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              gap: '12px',
              maxWidth: '480px',
              margin: '0 auto',
            }}
            className="ls-email-form"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                flex: 1,
                padding: '16px 20px',
                borderRadius: '100px',
                border: '1.5px solid rgba(26,23,20,0.15)',
                background: '#FDFAF6',
                fontSize: '15px',
                color: '#1A1714',
                outline: 'none',
                transition: 'border-color 0.2s',
                minWidth: 0,
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#B8955A'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(26,23,20,0.15)'
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                background: status === 'loading' ? '#6B6557' : '#1D3A2F',
                color: '#FDFAF6',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '16px 28px',
                borderRadius: '100px',
                border: 'none',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (status !== 'loading')
                  (e.currentTarget as HTMLButtonElement).style.background = '#B8955A'
              }}
              onMouseLeave={(e) => {
                if (status !== 'loading')
                  (e.currentTarget as HTMLButtonElement).style.background = '#1D3A2F'
              }}
            >
              {status === 'loading' ? 'Sending…' : 'Subscribe'}
            </button>
          </form>
        )}

        <p
          style={{
            fontSize: '11px',
            color: '#6B6557',
            opacity: 0.6,
            margin: '16px 0 0',
          }}
        >
          No spam. Unsubscribe anytime.
        </p>
      </div>

      <style>{`
        @media (max-width: 520px) {
          .ls-email-form {
            flex-direction: column !important;
          }
          .ls-email-form input,
          .ls-email-form button {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  )
}
