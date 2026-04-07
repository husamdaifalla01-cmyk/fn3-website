import Link from 'next/link'
import { Playfair_Display } from 'next/font/google'
import LifestyleNav from '@/components/lifestyle/LifestyleNav'
import LifestyleFooter from '@/components/lifestyle/LifestyleFooter'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const QUICK_LINKS = [
  { label: 'Home & Decor', href: '/lifestyle/home-decor', arrow: '→' },
  { label: 'Wellness', href: '/lifestyle/wellness', arrow: '→' },
  { label: 'Beauty', href: '/lifestyle/beauty', arrow: '→' },
  { label: 'All Articles', href: '/lifestyle/articles', arrow: '→' },
]

export default function LifestyleNotFound() {
  return (
    <div
      className={playfair.variable}
      style={{ background: '#FDFAF6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <LifestyleNav />

      {/* ── 404 Content ──────────────────────────────────────────────────────── */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(100px, 14vw, 160px) clamp(20px, 5vw, 80px) clamp(80px, 10vw, 120px)',
        }}
      >
        {/* Large 404 numeral */}
        <div
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(80px, 14vw, 160px)',
            fontWeight: 700,
            color: '#B8955A',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            marginBottom: '24px',
            opacity: 0,
            animation: 'ls-fade-up 0.6s ease forwards',
          }}
        >
          404
        </div>

        <h1
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(24px, 3.5vw, 40px)',
            fontWeight: 700,
            color: '#1A1714',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            opacity: 0,
            animation: 'ls-fade-up 0.6s ease 0.12s forwards',
          }}
        >
          This page doesn't exist yet.
        </h1>

        <p
          style={{
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            color: '#6B6557',
            lineHeight: 1.65,
            marginBottom: '52px',
            maxWidth: '420px',
            opacity: 0,
            animation: 'ls-fade-up 0.6s ease 0.22s forwards',
          }}
        >
          But we're always adding more. Try one of these instead:
        </p>

        {/* Quick link cards */}
        <div
          className="ls-404-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            maxWidth: '520px',
            width: '100%',
            opacity: 0,
            animation: 'ls-fade-up 0.6s ease 0.32s forwards',
          }}
        >
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="ls-404-card"
              style={{
                display: 'block',
                padding: '24px 28px',
                background: '#F0EDE8',
                borderRadius: '16px',
                border: '1px solid rgba(26,23,20,0.06)',
                textDecoration: 'none',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease, background 0.2s',
              }}
            >
              <span
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: '17px',
                  fontWeight: 700,
                  color: '#1A1714',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                }}
              >
                {link.label}
                <span style={{ color: '#B8955A' }}>{link.arrow}</span>
              </span>
            </Link>
          ))}
        </div>

        {/* Back home */}
        <div
          style={{
            marginTop: '40px',
            opacity: 0,
            animation: 'ls-fade-up 0.6s ease 0.44s forwards',
          }}
        >
          <Link
            href="/lifestyle"
            className="ls-404-back-link"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#6B6557',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(107,101,87,0.3)',
              paddingBottom: '2px',
              transition: 'color 0.2s',
            }}
          >
            ← Back to Mintbrooks
          </Link>
        </div>
      </main>

      <LifestyleFooter />

      <style>{`
        @keyframes ls-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ls-404-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(26,23,20,0.09);
          background: #FDFAF6 !important;
        }
        .ls-404-back-link:hover {
          color: #1A1714 !important;
        }
        @media (max-width: 480px) {
          .ls-404-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
