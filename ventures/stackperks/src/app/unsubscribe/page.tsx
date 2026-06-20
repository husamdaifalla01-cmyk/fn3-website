'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const [status, setStatus] = useState<'loading' | 'done' | 'error'>('loading')

  useEffect(() => {
    if (!email) {
      setStatus('error')
      return
    }

    fetch('/api/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        setStatus(res.ok ? 'done' : 'error')
      })
      .catch(() => setStatus('error'))
  }, [email])

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#1c1917' }}>
      <div className="max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <div className="text-4xl mb-4">&#9203;</div>
            <h1 className="text-xl font-bold text-white mb-2">Unsubscribing...</h1>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Please wait a moment.
            </p>
          </>
        )}

        {status === 'done' && (
          <>
            <div className="text-4xl mb-4">&#10003;</div>
            <h1 className="text-xl font-bold text-white mb-2">You've been unsubscribed</h1>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              You won't receive any more emails from Mintbrooks.
            </p>
            <a
              href="/"
              className="inline-block text-sm font-semibold px-6 py-3 rounded-xl"
              style={{
                background: 'rgba(217,119,6,0.15)',
                color: '#fbbf24',
                border: '1px solid rgba(217,119,6,0.25)',
              }}
            >
              Back to Mintbrooks
            </a>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-4xl mb-4">&#9888;</div>
            <h1 className="text-xl font-bold text-white mb-2">Something went wrong</h1>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              We couldn't process your unsubscribe request. Please email{' '}
              <a href="mailto:support@mintbrooks.com" style={{ color: '#fbbf24' }}>
                support@mintbrooks.com
              </a>{' '}
              and we'll remove you manually.
            </p>
            <a
              href="/"
              className="inline-block text-sm font-semibold px-6 py-3 rounded-xl"
              style={{
                background: 'rgba(217,119,6,0.15)',
                color: '#fbbf24',
                border: '1px solid rgba(217,119,6,0.25)',
              }}
            >
              Back to Mintbrooks
            </a>
          </>
        )}

        <p className="text-xs mt-8" style={{ color: 'rgba(255,255,255,0.18)' }}>
          Mintbrooks &bull; 651 N Broad St, Suite 201, Middletown, DE 19709
        </p>
      </div>
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#1c1917' }}>
          <p className="text-white">Loading...</p>
        </div>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  )
}
