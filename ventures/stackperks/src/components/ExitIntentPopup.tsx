'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { OFFERS, buildAffiliateUrl } from '@/lib/offers'
import { trackEmailSubscribe, trackAffiliateClick, appendClickId } from '@/lib/analytics'

const YENDO_EXIT_POPUP = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'exit-intent-popup')

type Step = 'capture' | 'confirmed'

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [step, setStep] = useState<Step>('capture')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const shownRef = useRef(false)
  const maxScrollRef = useRef(0)

  const show = useCallback(() => {
    if (shownRef.current) return
    shownRef.current = true
    setVisible(true)
  }, [])

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (dismissed) return
    if (e.clientY <= 10) {
      show()
    }
  }, [dismissed, show])

  useEffect(() => {
    if (dismissed) return

    // --- Desktop: mouseleave after 4s delay ---
    const mouseTimer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 4000)

    // --- Mobile: scroll-back-up after reaching 60% ---
    let reachedThreshold = false

    function handleScroll() {
      if (shownRef.current || dismissed) return
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      if (scrollPct > maxScrollRef.current) maxScrollRef.current = scrollPct
      if (maxScrollRef.current >= 0.6) reachedThreshold = true
      // User scrolled past 60% then scrolled back up by at least 15%
      if (reachedThreshold && scrollPct < maxScrollRef.current - 0.15) {
        show()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // --- Mobile fallback: 30s timeout ---
    const timeoutTimer = setTimeout(() => {
      if (!shownRef.current && !dismissed) {
        show()
      }
    }, 30000)

    return () => {
      clearTimeout(mouseTimer)
      clearTimeout(timeoutTimer)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleMouseLeave, dismissed, show])

  useEffect(() => {
    if (visible) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [visible])

  function dismiss() {
    setVisible(false)
    setDismissed(true)
    shownRef.current = true
    document.removeEventListener('mouseleave', handleMouseLeave)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) throw new Error('failed')
      trackEmailSubscribe('exit-intent')
      setStep('confirmed')
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(28,25,23,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={dismiss}
    >
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(150deg, #1c1917 0%, #292524 100%)',
          border: '1px solid rgba(217,119,6,0.3)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Amber glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '200px',
            height: '120px',
            background: 'radial-gradient(ellipse, rgba(217,119,6,0.25) 0%, transparent 70%)',
          }}
        />

        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-2xl leading-none"
          style={{ color: 'rgba(255,255,255,0.35)' }}
          aria-label="Close"
        >
          ×
        </button>

        <div className="p-8 text-center">
          <div className="text-4xl mb-4">🚗</div>

          {step === 'capture' ? (
            <>
              <div
                className="text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full inline-block"
                style={{ background: 'rgba(217,119,6,0.15)', color: '#fbbf24' }}
              >
                Before you go
              </div>
              <h2 className="text-2xl font-black text-white mb-3 leading-tight">
                Your car could be worth<br />
                <span style={{ color: '#fbbf24' }}>up to $10,000 in credit</span>
              </h2>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Drop your email — we'll send you the 30-second eligibility check and your car's estimated credit line.
              </p>

              <form onSubmit={handleSubmit} className="mb-3">
                <input
                  ref={inputRef}
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full text-sm px-4 py-3 rounded-xl mb-2 outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff',
                  }}
                />
                {error && (
                  <p className="text-xs mb-2" style={{ color: '#f87171' }}>{error}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full text-base py-4"
                  style={{ borderRadius: '14px', opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? 'Sending…' : 'Get My Free Car Estimate →'}
                </button>
              </form>

              <div className="my-3 flex items-center gap-3">
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>or</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
              </div>

              <a
                href={YENDO_EXIT_POPUP}
                target="_blank"
                rel="nofollow noopener"
                className="block w-full text-sm py-3 mb-3 rounded-xl font-semibold"
                style={{
                  background: 'rgba(217,119,6,0.12)',
                  color: '#fbbf24',
                  border: '1px solid rgba(217,119,6,0.25)',
                }}
                onClick={(e) => {
                  const clickId = trackAffiliateClick('exit-intent-popup')
                  e.currentTarget.href = appendClickId(YENDO_EXIT_POPUP, clickId)
                  dismiss()
                }}
              >
                Check My Car's Eligibility Now →
              </a>

              <button
                onClick={dismiss}
                className="text-xs"
                style={{ color: 'rgba(255,255,255,0.28)' }}
              >
                No thanks, I'll pass
              </button>
            </>
          ) : (
            <>
              <div
                className="text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full inline-block"
                style={{ background: 'rgba(217,119,6,0.15)', color: '#fbbf24' }}
              >
                Check your inbox
              </div>
              <h2 className="text-2xl font-black text-white mb-3 leading-tight">
                We sent your<br />
                <span style={{ color: '#fbbf24' }}>car credit estimate</span>
              </h2>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                While you wait — see your credit range right now. Soft inquiry only, won't affect your score.
              </p>
              <a
                href={YENDO_EXIT_POPUP}
                target="_blank"
                rel="nofollow noopener"
                className="btn-primary block w-full text-base py-4 mb-3"
                style={{ borderRadius: '14px' }}
                onClick={(e) => {
                  const clickId = trackAffiliateClick('exit-intent-popup-confirmed')
                  e.currentTarget.href = appendClickId(YENDO_EXIT_POPUP, clickId)
                  dismiss()
                }}
              >
                Check My Car's Eligibility →
              </a>
              <button
                onClick={dismiss}
                className="text-xs"
                style={{ color: 'rgba(255,255,255,0.28)' }}
              >
                I'll check later
              </button>
            </>
          )}

          <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.18)' }}>
            Soft inquiry only · No score impact · Affiliate disclosure applies
          </p>
        </div>
      </div>
    </div>
  )
}
