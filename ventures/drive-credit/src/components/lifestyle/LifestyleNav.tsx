'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'Home',        href: '/lifestyle' },
  { label: 'Home & Decor', href: '/lifestyle/home-decor' },
  { label: 'Wellness',    href: '/lifestyle/wellness' },
  { label: 'Beauty',      href: '/lifestyle/beauty' },
  { label: 'Kitchen',     href: '/lifestyle/kitchen' },
  { label: 'Finance',     href: '/lifestyle/finance' },
  { label: 'Articles',    href: '/lifestyle/articles' },
]

export default function LifestyleNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/lifestyle') return pathname === '/lifestyle'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '16px 40px' : '28px 40px',
        background: scrolled ? 'rgba(253,250,246,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(184,149,90,0.15)' : 'none',
        transition: 'all 0.4s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Wordmark */}
      <Link
        href="/lifestyle"
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: '22px',
          fontWeight: 700,
          color: '#1A1714',
          textDecoration: 'none',
          letterSpacing: '-0.01em',
        }}
      >
        Mintbrooks
      </Link>

      {/* Desktop nav */}
      <div
        style={{
          display: 'flex',
          gap: '28px',
          alignItems: 'center',
        }}
        className="ls-desktop-nav"
      >
        {NAV_LINKS.map((link) => {
          const active = isActive(link.href)
          return (
            <div key={link.href} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <Link
                href={link.href}
                style={{
                  fontSize: '11px',
                  fontWeight: active ? 700 : 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: active ? '#1D3A2F' : '#1A1714',
                  textDecoration: 'none',
                  opacity: active ? 1 : 0.7,
                  transition: 'opacity 0.2s, color 0.2s, font-weight 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.opacity = '1'
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.opacity = '0.7'
                }}
              >
                {link.label}
              </Link>
              {active && (
                <span
                  style={{
                    display: 'block',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: '#B8955A',
                    position: 'absolute',
                    bottom: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                />
              )}
            </div>
          )
        })}
        <Link
          href="/lifestyle#newsletter"
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#1D3A2F',
            textDecoration: 'none',
            border: '1.5px solid #1D3A2F',
            padding: '8px 20px',
            borderRadius: '100px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1D3A2F'
            e.currentTarget.style.color = '#FDFAF6'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#1D3A2F'
          }}
        >
          Subscribe
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="ls-mobile-menu-btn"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          display: 'none',
        }}
        aria-label="Toggle menu"
      >
        <div style={{ width: 24, height: 2, background: '#1A1714', marginBottom: 6, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
        <div style={{ width: 24, height: 2, background: '#1A1714', marginBottom: 6, opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
        <div style={{ width: 24, height: 2, background: '#1A1714', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#FDFAF6',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          zIndex: 99,
        }}>
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: '32px',
                  fontWeight: 700,
                  color: active ? '#1D3A2F' : '#1A1714',
                  textDecoration: active ? 'underline' : 'none',
                  textDecorationColor: '#B8955A',
                  textUnderlineOffset: '6px',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .ls-desktop-nav { display: none !important; }
          .ls-mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
