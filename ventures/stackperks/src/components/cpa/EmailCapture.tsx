'use client'

import { useState } from 'react'

type Variant = 'cpa' | 'editorial'

export default function EmailCapture({ source = 'articles', variant = 'editorial' }: { source?: string; variant?: Variant }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')
  const [err, setErr] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr('Enter a valid email.'); setState('err'); return
    }
    setState('loading'); setErr('')
    try {
      const res = await fetch('/api/lifestyle/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source }),
      })
      if (!res.ok) throw new Error('bad status')
      setState('ok')
      if (typeof window !== 'undefined') {
        const w = window as unknown as { plausible?: (e: string, o?: unknown) => void }
        w.plausible?.('email_capture', { props: { source } })
      }
    } catch {
      setErr('Something went wrong. Try again.'); setState('err')
    }
  }

  const isDark = variant === 'cpa'

  return (
    <section className={`mb-email ${isDark ? 'mb-email-dark' : ''}`}>
      <div className="mb-email-inner">
        {state === 'ok' ? (
          <div className="mb-email-ok">
            <div className="mb-email-check" aria-hidden>✓</div>
            <p className="mb-email-ok-head">You&apos;re in.</p>
            <p className="mb-email-ok-sub">Check your inbox — your first email is arriving now.</p>
          </div>
        ) : (
          <>
            <div className="mb-email-head">
              <span className="mb-email-eyebrow">{isDark ? 'Before you go' : 'Newsletter'}</span>
              <h3>
                {isDark ? 'Get the next one before Google does' : 'Weekly picks — no hype, no spam'}
              </h3>
              <p>
                {isDark
                  ? "Real approval odds, real lender reviews, delivered every Sunday. Free. One unsubscribe click."
                  : "One email a week, the pieces that moved the needle for our readers. Free."}
              </p>
            </div>
            <form onSubmit={onSubmit} className="mb-email-form" noValidate>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (state === 'err') setState('idle') }}
                className="mb-email-input"
                disabled={state === 'loading'}
              />
              <button
                type="submit"
                className="mb-email-btn"
                disabled={state === 'loading'}
              >
                {state === 'loading' ? 'Sending…' : (isDark ? 'Send it' : 'Join free')}
              </button>
            </form>
            {state === 'err' && <p className="mb-email-err">{err}</p>}
            <p className="mb-email-fine">Join 12,000+ readers. Unsubscribe anytime.</p>
          </>
        )}
      </div>

      <style>{`
        .mb-email {
          position: relative;
          margin: 48px 0;
          background: #FDFAF6;
          border: 1px solid #E7DFD3;
          border-radius: 18px;
          overflow: hidden;
        }
        .mb-email-dark {
          background: #1D3A2F;
          border-color: #1D3A2F;
          color: #FDFAF6;
        }
        .mb-email-inner { padding: clamp(28px, 4.5vw, 40px); }

        .mb-email-eyebrow {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #B8955A;
          margin-bottom: 10px;
        }
        .mb-email-head h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(22px, 2.8vw, 28px);
          font-weight: 700;
          line-height: 1.2;
          margin: 0 0 8px;
          letter-spacing: -0.015em;
          color: #1D3A2F;
        }
        .mb-email-dark .mb-email-head h3 { color: #FDFAF6; }
        .mb-email-head p {
          margin: 0 0 18px;
          color: #6B6557;
          font-size: 14px;
          line-height: 1.55;
        }
        .mb-email-dark .mb-email-head p { color: #D4CAB8; }

        .mb-email-form { display: flex; gap: 10px; flex-wrap: wrap; }
        .mb-email-input {
          flex: 1; min-width: 220px;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1px solid #D4CAB8;
          background: #fff;
          font: inherit; font-size: 15px;
          color: #1A1714;
          transition: border-color 160ms, box-shadow 160ms;
        }
        .mb-email-input:focus { outline: none; border-color: #1D3A2F; box-shadow: 0 0 0 3px rgba(29,58,47,0.12); }
        .mb-email-dark .mb-email-input { border-color: transparent; }
        .mb-email-btn {
          padding: 14px 24px;
          background: #1D3A2F;
          color: #FDFAF6;
          border: none;
          border-radius: 10px;
          font: inherit; font-weight: 700; font-size: 15px;
          cursor: pointer;
          transition: background 160ms, transform 120ms;
        }
        .mb-email-btn:hover:not(:disabled) { background: #24483A; transform: translateY(-1px); }
        .mb-email-btn:active { transform: translateY(0); }
        .mb-email-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .mb-email-dark .mb-email-btn { background: #B8955A; color: #1A1714; }
        .mb-email-dark .mb-email-btn:hover:not(:disabled) { background: #C9A26A; }

        .mb-email-err {
          margin: 12px 0 0;
          padding: 10px 14px;
          background: #FBEEEA;
          border: 1px solid #E8C3B8;
          border-radius: 8px;
          color: #8B3A2C;
          font-size: 13px;
        }
        .mb-email-dark .mb-email-err { background: rgba(253,250,246,0.08); border-color: rgba(253,250,246,0.18); color: #FDFAF6; }

        .mb-email-fine {
          margin: 14px 0 0;
          font-size: 12px;
          color: #8a8578;
        }
        .mb-email-dark .mb-email-fine { color: rgba(253,250,246,0.45); }

        .mb-email-ok {
          text-align: center;
          padding: 12px 0;
          animation: mb-email-pop 320ms cubic-bezier(.2,.7,.2,1);
        }
        @keyframes mb-email-pop { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: none; } }
        .mb-email-check {
          display: inline-flex; align-items: center; justify-content: center;
          width: 48px; height: 48px;
          border-radius: 50%;
          background: #1D3A2F; color: #FDFAF6;
          font-size: 22px; font-weight: 700;
          margin-bottom: 14px;
        }
        .mb-email-dark .mb-email-check { background: #B8955A; color: #1A1714; }
        .mb-email-ok-head {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 24px;
          color: #1D3A2F;
          margin: 0 0 6px;
        }
        .mb-email-dark .mb-email-ok-head { color: #FDFAF6; }
        .mb-email-ok-sub { margin: 0; color: #6B6557; font-size: 15px; }
        .mb-email-dark .mb-email-ok-sub { color: #D4CAB8; }
      `}</style>
    </section>
  )
}
