'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function LifestyleFooter() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')
  const locale = useLocale()

  const localePath = (path: string) =>
    locale === 'en' ? path : `/${locale}${path}`

  const SECTIONS = [
    {
      heading: t('explore'),
      links: [
        { label: tNav('homeDecor'), href: localePath('/home-decor') },
        { label: tNav('wellness'),  href: localePath('/wellness') },
        { label: tNav('beauty'),    href: localePath('/beauty') },
        { label: tNav('kitchen'),   href: localePath('/kitchen') },
        { label: tNav('finance'),   href: '/finance' },
      ],
    },
    {
      heading: 'Mintbrooks',
      links: [
        { label: 'About',        href: localePath('/about') },
        { label: 'Reading List', href: localePath('/reading-list') },
        { label: 'Newsletter',   href: localePath('/#newsletter') },
        { label: 'Pinterest',    href: 'https://pinterest.com/mintbrooks' },
      ],
    },
    {
      heading: t('legal'),
      links: [
        { label: t('privacy'), href: localePath('/privacy') },
        { label: t('terms'),   href: localePath('/terms') },
      ],
    },
  ]

  return (
    <footer style={{ background: '#1A1714', color: '#FDFAF6', padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px) 40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
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
            <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '28px', fontWeight: 700, color: '#FDFAF6', marginBottom: '16px', letterSpacing: '-0.02em' }}>
              Mintbrooks
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(253,250,246,0.5)', lineHeight: 1.7, margin: '0 0 28px', maxWidth: '260px' }}>
              {t('tagline')}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { label: 'Pinterest', url: 'https://pinterest.com/mintbrooks' },
                { label: 'Substack',  url: 'https://mintbrooks.substack.com' },
                { label: 'Instagram', url: 'https://instagram.com/mintbrooks' },
              ].map(({ label, url }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(253,250,246,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#B8955A')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,250,246,0.4)')}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {SECTIONS.map((section) => (
            <div key={section.heading}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B8955A', marginBottom: '20px' }}>
                {section.heading}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {section.links.map((link) => (
                  <li key={link.label} style={{ marginBottom: '12px' }}>
                    <Link href={link.href}
                      style={{ fontSize: '13px', color: 'rgba(253,250,246,0.55)', textDecoration: 'none', transition: 'color 0.2s', lineHeight: 1 }}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontSize: '11px', color: 'rgba(253,250,246,0.3)', margin: 0, lineHeight: 1.6, maxWidth: '600px' }}>
            {t('affiliate_disclosure')}
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(253,250,246,0.25)', margin: 0 }}>
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .ls-footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .ls-footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
