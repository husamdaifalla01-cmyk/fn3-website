'use client'
import { useState } from 'react'

export default function StackperksEmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status !== 'idle') return
    setStatus('loading')
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'homepage-newsletter' }),
      })
    } catch {}
    setStatus('done')
  }

  return (
    <section
      className="py-20 px-4"
      style={{ background: 'linear-gradient(145deg, #0d0c1d 0%, #150e2e 100%)' }}
    >
      {/* Violet glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-2xl mx-auto text-center relative">
        <div
          className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider"
          style={{ background: 'rgba(167,139,250,0.12)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.2)' }}
        >
          ✉ Deal alerts
        </div>

        <h2
          className="font-black text-white mb-3"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', letterSpacing: '-0.025em' }}
        >
          Never miss a perk<br />
          <span style={{ color: '#34d399' }}>worth claiming.</span>
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'rgba(240,238,255,0.50)', maxWidth: '400px', margin: '0 auto 32px' }}>
          Weekly digest of the best young-adult deals — Prime updates, new card bonuses, and
          limited-time CPA offers. Unsubscribe anytime.
        </p>

        {status === 'done' ? (
          <div
            className="inline-block px-8 py-4 rounded-2xl"
            style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', color: '#34d399' }}
          >
            <span className="font-bold">✓ You&apos;re in!</span> First deal drops in your inbox soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-3.5 rounded-full text-sm outline-none"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(167,139,250,0.2)',
                color: 'white',
                caretColor: '#a78bfa',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-emerald py-3.5 px-7 text-sm font-bold whitespace-nowrap"
            >
              {status === 'loading' ? 'Joining…' : 'Get Deal Alerts →'}
            </button>
          </form>
        )}

        <p className="text-xs mt-4" style={{ color: 'rgba(240,238,255,0.22)' }}>
          No spam · Unsubscribe anytime · We may earn a commission on deals we feature
        </p>
      </div>
    </section>
  )
}
