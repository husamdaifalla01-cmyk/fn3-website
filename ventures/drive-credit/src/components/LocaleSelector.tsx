'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { routing, LOCALE_DISPLAY } from '@/i18n/routing'

const COOKIE_NAME = 'MINTBROOKS_LOCALE'

export default function LocaleSelector() {
  const [open, setOpen] = useState(false)
  const currentLocale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function switchLocale(targetLocale: string) {
    // Save preference in cookie
    document.cookie = `${COOKIE_NAME}=${targetLocale};max-age=${60 * 60 * 24 * 365};path=/;samesite=lax;secure`

    // Strip current locale prefix from pathname
    let cleanPath = pathname
    for (const locale of routing.locales) {
      if (cleanPath.startsWith(`/${locale}/`)) {
        cleanPath = cleanPath.slice(locale.length + 1)
        break
      }
      if (cleanPath === `/${locale}`) {
        cleanPath = '/'
        break
      }
    }

    const newPath =
      targetLocale === 'en'
        ? cleanPath || '/'
        : `/${targetLocale}${cleanPath === '/' ? '' : cleanPath}`

    setOpen(false)
    router.push(newPath)
  }

  const current = LOCALE_DISPLAY[currentLocale]

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Select language"
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'none',
          border: '1.5px solid rgba(29,58,47,0.25)',
          borderRadius: '100px',
          padding: '6px 12px',
          cursor: 'pointer',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: '#1A1714',
          transition: 'border-color 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1D3A2F')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(29,58,47,0.25)')}
      >
        {/* Globe icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>{current?.flag}</span>
        {/* Chevron */}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            background: '#FDFAF6',
            border: '1px solid rgba(184,149,90,0.2)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(26,23,20,0.12)',
            minWidth: '200px',
            zIndex: 200,
            overflow: 'hidden',
          }}
        >
          {routing.locales.map((locale) => {
            const info = LOCALE_DISPLAY[locale]
            const isActive = locale === currentLocale
            return (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '10px 16px',
                  background: isActive ? 'rgba(184,149,90,0.08)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '13px',
                  color: isActive ? '#1D3A2F' : '#1A1714',
                  fontWeight: isActive ? 700 : 400,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'rgba(184,149,90,0.05)'
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent'
                }}
              >
                <span style={{ fontSize: '16px', lineHeight: 1 }}>{info?.flag}</span>
                <span>{info?.nativeName}</span>
                {isActive && (
                  <span style={{ marginLeft: 'auto', color: '#B8955A' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
