'use client'

import { useState } from 'react'

export default function ArticleNewsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    try {
      const res = await fetch('/api/lifestyle/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'articles' }),
      })
      if (!res.ok) throw new Error('failed')
    } catch { /* silent — still show success */ }
    setSubmitted(true)
  }

  return (
    <section
      style={{
        background: '#F0EDE8',
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px)',
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            display: 'block',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#B8955A',
            marginBottom: '16px',
          }}
        >
          Newsletter
        </span>

        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(26px, 3.5vw, 38px)',
            fontWeight: 700,
            color: '#1A1714',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            margin: '0 0 16px',
          }}
        >
          Enjoyed this?
          <br />
          Get more like it.
        </h2>

        <p
          style={{
            fontSize: '15px',
            color: '#6B6557',
            lineHeight: 1.65,
            margin: '0 0 36px',
          }}
        >
          New guides, honest reviews, and curated picks — delivered weekly. No fluff.
        </p>

        {submitted ? (
          <div
            style={{
              background: '#EEF3F1',
              border: '1px solid rgba(29,58,47,0.15)',
              borderRadius: '12px',
              padding: '24px 28px',
              fontSize: '15px',
              color: '#1D3A2F',
              fontWeight: 500,
            }}
          >
            You&apos;re in. We&apos;ll be in touch soon.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              style={{
                flex: '1 1 220px',
                padding: '14px 20px',
                borderRadius: '100px',
                border: '1.5px solid rgba(26,23,20,0.14)',
                background: '#FDFAF6',
                fontSize: '14px',
                color: '#1A1714',
                outline: 'none',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#B8955A')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(26,23,20,0.14)')}
            />
            <button
              type="submit"
              style={{
                padding: '14px 28px',
                borderRadius: '100px',
                background: '#1D3A2F',
                color: '#FDFAF6',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s',
                fontFamily: 'inherit',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#0D1F18')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#1D3A2F')}
            >
              Subscribe
            </button>
          </form>
        )}

        <p
          style={{
            fontSize: '12px',
            color: '#9B9388',
            marginTop: '16px',
            marginBottom: 0,
          }}
        >
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
