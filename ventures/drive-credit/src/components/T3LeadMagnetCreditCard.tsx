'use client'

import { useState } from 'react'

// Email-gated credit-card lead magnet. No props. Captures the email then reveals
// the "check eligibility" CTA. Routes to the credit-builder funnel.
const FUNNEL_URL = '/finance/build-credit-with-your-car'

export default function T3LeadMagnetCreditCard() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setState('err'); return }
    setState('loading')
    try {
      await fetch('/api/lifestyle/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'credit_card_500_t3' }),
      })
      setState('ok')
      if (typeof window !== 'undefined') {
        const w = window as unknown as { plausible?: (e: string, o?: unknown) => void }
        w.plausible?.('lead_magnet', { props: { kind: 'credit_card_500' } })
      }
    } catch { setState('ok') }
  }

  return (
    <div className="my-8 rounded-xl p-6" style={{ background: '#1D3A2F', color: '#FDFAF6' }}>
      <div className="text-sm" style={{ color: '#B8955A' }}>Free checklist</div>
      <h3 className="mt-1 text-xl font-semibold">Approved With a 500 Score: the 5-step card plan</h3>
      <p className="mt-2 text-sm" style={{ color: '#cfd8d2' }}>
        The exact order to rebuild and get approved — no hard pull to check eligibility.
      </p>
      {state === 'ok' ? (
        <a
          href={FUNNEL_URL}
          className="inline-block mt-4 rounded-lg px-5 py-3 font-semibold"
          style={{ background: '#B8955A', color: '#1D3A2F' }}
          rel="nofollow sponsored"
        >
          Check If I Qualify →
        </a>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
          <input
            type="email" required placeholder="you@email.com" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-lg px-4 py-3 text-black"
          />
          <button
            type="submit" disabled={state === 'loading'}
            className="rounded-lg px-5 py-3 font-semibold"
            style={{ background: '#B8955A', color: '#1D3A2F' }}
          >
            {state === 'loading' ? '…' : 'Send it'}
          </button>
        </form>
      )}
      {state === 'err' && <p className="mt-2 text-xs" style={{ color: '#f3b' }}>Enter a valid email.</p>}
    </div>
  )
}
