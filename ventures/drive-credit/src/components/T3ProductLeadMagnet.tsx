'use client'

import { useState } from 'react'

type Props = {
  product: string
  price: string
  productUrl: string
  productDescr?: string
}

// Email-gated product lead magnet. Captures the email (Resend via the lifestyle
// subscribe API), then reveals the product link. Mirrors the EmailCapture flow.
export default function T3ProductLeadMagnet({ product, price, productUrl, productDescr = '' }: Props) {
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
        body: JSON.stringify({ email: email.trim(), source: 'finance_product' }),
      })
      setState('ok')
      if (typeof window !== 'undefined') {
        const w = window as unknown as { plausible?: (e: string, o?: unknown) => void }
        w.plausible?.('lead_magnet', { props: { product } })
      }
    } catch { setState('ok') /* don't block the reveal on a transient API error */ }
  }

  return (
    <div className="my-8 rounded-xl p-6" style={{ background: '#1D3A2F', color: '#FDFAF6' }}>
      <div className="text-sm" style={{ color: '#B8955A' }}>Get the full guide</div>
      <h3 className="mt-1 text-xl font-semibold">{product} — {price}</h3>
      {productDescr && <p className="mt-2 text-sm" style={{ color: '#cfd8d2' }}>{productDescr}</p>}
      {state === 'ok' ? (
        <a
          href={productUrl}
          className="inline-block mt-4 rounded-lg px-5 py-3 font-semibold"
          style={{ background: '#B8955A', color: '#1D3A2F' }}
          rel="nofollow sponsored"
        >
          Get {product} →
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
