'use client'
import { useState } from 'react'
import { trackEmailSubscribe } from '@/lib/analytics'

export default function LinksEmailCapture() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

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
      trackEmailSubscribe('links-page')
      setDone(true)
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="text-center py-2">
        <div className="text-lg mb-1">&#10003;</div>
        <p className="text-sm font-semibold text-white">Check your inbox!</p>
        <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
          We sent your personalized car credit estimate.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="w-full text-sm px-4 py-3 rounded-xl outline-none"
        style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: '#fff',
        }}
      />
      {error && (
        <p className="text-xs text-center" style={{ color: '#f87171' }}>{error}</p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full text-sm py-3 font-bold"
        style={{ borderRadius: '12px', opacity: submitting ? 0.7 : 1 }}
      >
        {submitting ? 'Sending...' : 'Send My Free Estimate →'}
      </button>
      <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
        No spam. Unsubscribe anytime.
      </p>
    </form>
  )
}
