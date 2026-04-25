'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import LocaleSelector from '@/components/LocaleSelector'

export default function LifestyleNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const t = useTranslations('nav')
  const locale = useLocale()

  // Build locale-aware href: English = /path, others = /fr/path
  const localePath = (path: string) =>
    locale === 'en' ? path : `/${locale}${path}`

  const NAV_LINKS = [
    { label: t('home'),      href: localePath('/') },
    { label: t('homeDecor'), href: localePath('/home-decor') },
    { label: t('wellness'),  href: localePath('/wellness') },
    { label: t('beauty'),    href: localePath('/beauty') },
    { label: t('kitchen'),   href: localePath('/kitchen') },
    { label: t('finance'),   href: '/finance' }, // always English
    { label: t('articles'),  href: localePath('/articles') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/' || href === `/${locale}`) return pathname === '/' || pathname === `/${locale}`
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
        padding: scrolled ? '14px 40px' : '28px 40px',
        background: scrolled
          ? [
              /* thin forest-green marble veins at 127° */
              'repeating-linear-gradient(127deg, transparent 0px, transparent 38px, rgba(29,58,47,0.22) 38px, rgba(29,58,47,0.22) 39px, transparent 39px, transparent 75px, rgba(29,58,47,0.12) 75px, rgba(29,58,47,0.12) 76px, transparent 76px, transparent 120px)',
              /* thin walnut veins at 48° */
              'repeating-linear-gradient(48deg, transparent 0px, transparent 55px, rgba(92,61,46,0.18) 55px, rgba(92,61,46,0.18) 56px, transparent 56px, transparent 110px, rgba(92,61,46,0.10) 110px, rgba(92,61,46,0.10) 111px, transparent 111px, transparent 180px)',
              /* warm cream marble base */
              'linear-gradient(110deg, #F5EFE6 0%, #EDE5D8 35%, #FAF6F0 55%, #E8DDD0 80%, #F2EBE0 100%)',
            ].join(', ')
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '3px solid #5C3D2E' : 'none',
        borderTop: scrolled ? '3px solid #1D3A2F' : 'none',
        boxShadow: scrolled ? '0 4px 28px rgba(29,58,47,0.18), inset 0 -1px 0 rgba(92,61,46,0.2)' : 'none',
        transition: 'all 0.45s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Wordmark */}
      <Link
        href={localePath('/')}
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: '22px',
          fontWeight: 700,
          color: scrolled ? '#1D3A2F' : '#1A1714',
          textDecoration: 'none',
          letterSpacing: '-0.01em',
          transition: 'color 0.4s ease',
        }}
      >
        Mintbrooks
      </Link>

      {/* Desktop nav */}
      <div
        style={{ display: 'flex', gap: '28px', alignItems: 'center' }}
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
                  color: scrolled ? (active ? '#1D3A2F' : '#3D2A1A') : (active ? '#1D3A2F' : '#1A1714'),
                  textDecoration: 'none',
                  opacity: active ? 1 : 0.75,
                  transition: 'opacity 0.2s, color 0.4s',
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.opacity = '1' }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.opacity = '0.75' }}
              >
                {link.label}
              </Link>
              {active && (
                <span style={{
                  display: 'block', width: '4px', height: '4px',
                  borderRadius: '50%', background: scrolled ? '#1D3A2F' : '#B8955A',
                  position: 'absolute', bottom: '-8px',
                  left: '50%', transform: 'translateX(-50%)',
                  transition: 'background 0.4s',
                }} />
              )}
            </div>
          )
        })}

        {/* Language selector */}
        <LocaleSelector />

        {/* Subscribe pill */}
        <Link
          href={localePath('/#newsletter')}
          style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', textDecoration: 'none',
            padding: '8px 20px', borderRadius: '100px', transition: 'all 0.3s',
            background: scrolled ? '#1D3A2F' : 'transparent',
            color: scrolled ? '#F2EBE0' : '#1D3A2F',
            border: scrolled ? '1.5px solid #1D3A2F' : '1.5px solid #1D3A2F',
            boxShadow: scrolled ? '0 2px 8px rgba(29,58,47,0.18)' : 'none',
          }}
          onMouseEnter={(e) => {
            if (scrolled) { e.currentTarget.style.background = '#5C3D2E'; e.currentTarget.style.borderColor = '#5C3D2E' }
            else { e.currentTarget.style.background = '#1D3A2F'; e.currentTarget.style.color = '#F2EBE0' }
          }}
          onMouseLeave={(e) => {
            if (scrolled) { e.currentTarget.style.background = '#1D3A2F'; e.currentTarget.style.borderColor = '#1D3A2F'; e.currentTarget.style.color = '#F2EBE0' }
            else { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1D3A2F' }
          }}
        >
          {t('subscribe')}
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="ls-mobile-menu-btn"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'none' }}
        aria-label={menuOpen ? t('close') : t('menu')}
      >
        <div style={{ width: 24, height: 2, background: scrolled ? '#1D3A2F' : '#1A1714', marginBottom: 6, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
        <div style={{ width: 24, height: 2, background: scrolled ? '#1D3A2F' : '#1A1714', marginBottom: 6, opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
        <div style={{ width: 24, height: 2, background: scrolled ? '#1D3A2F' : '#1A1714', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
      </button>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: '#FDFAF6', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '32px', zIndex: 99,
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
                  fontSize: '32px', fontWeight: 700,
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
          {/* Language selector in mobile menu */}
          <div style={{ marginTop: '8px' }}>
            <LocaleSelector />
          </div>
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
