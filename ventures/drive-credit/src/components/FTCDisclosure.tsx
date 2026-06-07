// FTC affiliate disclosure banner. No props — drop it near the top of any
// monetized article/page. Server component (no client state).
export default function FTCDisclosure() {
  return (
    <div
      className="text-xs leading-relaxed rounded-md px-3 py-2 mb-4"
      style={{ color: '#6b6b6b', background: 'rgba(184,149,90,0.08)', border: '1px solid rgba(184,149,90,0.25)' }}
    >
      <strong>Advertising disclosure:</strong> Mintbrooks is reader-supported. Some links on this
      page are affiliate links — if you apply or buy through them we may earn a commission at no
      extra cost to you. This is educational content, not financial advice.
    </div>
  )
}
