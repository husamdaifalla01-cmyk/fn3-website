'use client'

import { useState } from 'react'

interface Props {
  source?: string
  headline?: string
  subtext?: string
}

export default function FinanceEmailCapture({
  source = 'finance',
  headline = 'Free: Credit Repair Checklist',
  subtext = 'The exact 7 steps people use to raise their score 50–100 points in 6 months. No fluff.',
}: Props) {
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
        body: JSON.stringify({ email, source }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1D3A2F 0%, #2C4E40 100%)',
        borderRadius: '16px',
        padding: 'clamp(24px, 4vw, 40px)',
        margin: '40px 0',
        color: '#FDFAF6',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
        <div style={{
          width: '44px',
          height: '44px',
          minWidth: '44px',
          borderRadius: '50%',
          background: 'rgba(184,149,90,0.2)',
          border: '1.5px solid #B8955A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
        }}>
          📋
        </div>
        <div>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B8955A', marginBottom: '6px' }}>
            Free resource
          </p>
          <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 700, color: '#FDFAF6', lineHeight: 1.2, margin: 0 }}>
            {headline}
          </h3>
        </div>
      </div>

      <p style={{ fontSize: '14px', color: 'rgba(253,250,246,0.8)', lineHeight: 1.6, marginBottom: '24px' }}>
        {subtext}
      </p>

      {status === 'success' ? (
        <div style={{
          background: 'rgba(184,149,90,0.15)',
          border: '1px solid rgba(184,149,90,0.4)',
          borderRadius: '12px',
          padding: '16px 20px',
          fontSize: '14px',
          color: '#FDFAF6',
          fontWeight: 500,
        }}>
          ✓ Check your inbox — it's on its way.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{
              flex: '1 1 220px',
              padding: '13px 18px',
              borderRadius: '100px',
              border: '1.5px solid rgba(253,250,246,0.2)',
              fontSize: '14px',
              background: 'rgba(253,250,246,0.08)',
              color: '#FDFAF6',
              outline: 'none',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#B8955A')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(253,250,246,0.2)')}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              background: '#B8955A',
              color: '#1A1714',
              border: 'none',
              padding: '13px 24px',
              borderRadius: '100px',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: status === 'loading' ? 'wait' : 'pointer',
              opacity: status === 'loading' ? 0.7 : 1,
              whiteSpace: 'nowrap',
            }}
          >
            {status === 'loading' ? 'Sending…' : 'Send it free'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p style={{ fontSize: '12px', color: 'rgba(253,250,246,0.6)', marginTop: '10px' }}>
          Something went wrong. Try again.
        </p>
      )}

      <p style={{ fontSize: '11px', color: 'rgba(253,250,246,0.45)', marginTop: '14px' }}>
        No spam. Unsubscribe anytime.
      </p>
    </div>
  )
}
