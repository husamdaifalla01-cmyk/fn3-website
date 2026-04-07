'use client'

import Link from 'next/link'

const SECTIONS = [
  {
    heading: 'Explore',
    links: [
      { label: 'Home & Decor', href: '/#home' },
      { label: 'Wellness', href: '/#wellness' },
      { label: 'Beauty', href: '/#beauty' },
      { label: 'Kitchen', href: '/#kitchen' },
      { label: 'Money & Credit', href: '/#finance' },
    ],
  },
  {
    heading: 'Mintbrooks',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Newsletter', href: '/#newsletter' },
      { label: 'Pinterest', href: 'https://pinterest.com/mintbrooks' },
      { label: 'Advertise', href: '/advertise' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Affiliate Disclosure', href: '/finance/links' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
]

export default function LifestyleFooter() {
  return (
    <footer
      style={{
        background: '#1A1714',
        color: '#FDFAF6',
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px) 40px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px',
          marginBottom: '64px',
          paddingBottom: '64px',
          borderBottom: '1px solid rgba(253,250,246,0.08)',
        }} className="ls-footer-grid">

          {/* Brand column */}
          <div>
            <div style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '28px',
              fontWeight: 700,
              color: '#FDFAF6',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
            }}>
              Mintbrooks
            </div>
            <p style={{
              fontSize: '14px',
              color: 'rgba(253,250,246,0.5)',
              lineHeight: 1.7,
              margin: '0 0 28px',
              maxWidth: '260px',
            }}>
              The lifestyle guide for people building a beautiful life — and the financial
              foundation to sustain it.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Pinterest', 'Substack', 'Instagram'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(253,250,246,0.4)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#B8955A')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,250,246,0.4)')}
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {SECTIONS.map((section) => (
            <div key={section.heading}>
              <div style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#B8955A',
                marginBottom: '20px',
              }}>
                {section.heading}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {section.links.map((link) => (
                  <li key={link.label} style={{ marginBottom: '12px' }}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: '13px',
                        color: 'rgba(253,250,246,0.55)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                        lineHeight: 1,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#FDFAF6')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,250,246,0.55)')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{
            fontSize: '12px',
            color: 'rgba(253,250,246,0.3)',
            margin: 0,
            lineHeight: 1.5,
          }}>
            © {new Date().getFullYear()} Mintbrooks. Independent editorial. We may earn a commission
            on purchases through our links — at no extra cost to you.
          </p>
          <span style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '13px',
            color: 'rgba(253,250,246,0.2)',
            fontStyle: 'italic',
          }}>
            Live well. Spend smart.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ls-footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .ls-footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
