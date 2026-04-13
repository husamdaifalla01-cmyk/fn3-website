'use client'

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1>Error</h1>
      <p><b>Message:</b> {error.message}</p>
      <p><b>Digest:</b> {error.digest}</p>
      <p><b>Stack:</b></p>
      <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>{error.stack}</pre>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
