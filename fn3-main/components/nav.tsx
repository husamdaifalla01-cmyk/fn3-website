'use client'

import { useState } from 'react'
import Link from 'next/link'

interface NavProps {
  variant?: 'home' | 'chapter'
}

const chapters = [
  { label: 'What We Are', href: '/what-we-are' },
  { label: "What We've Built", href: '/what-weve-built' },
  { label: 'How We Work', href: '/how-we-work' },
]

export function Nav({ variant = 'home' }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-fn3-red">
      <nav className="flex items-center justify-between h-[52px] px-6 lg:px-12">

        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-[15px] font-bold text-white tracking-[0.05em]"
        >
          FN3
        </Link>

        {/* Desktop centre — home variant shows chapter links, chapter variant shows back */}
        <div className="hidden lg:flex items-center gap-9">
          {variant === 'home' ? (
            chapters.map((ch) => (
              <Link
                key={ch.href}
                href={ch.href}
                className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/50 hover:text-white transition-colors duration-150"
              >
                {ch.label}
              </Link>
            ))
          ) : (
            <Link
              href="/"
              className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/50 hover:text-white transition-colors duration-150"
            >
              ← Back to Home
            </Link>
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            href="/work-with-us"
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-white border-b border-white/60 hover:border-white pb-px transition-colors duration-150"
          >
            Work With Us →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="8" x2="21" y2="8" />
              <line x1="3" y1="16" x2="21" y2="16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="lg:hidden bg-fn3-red border-t border-white/10">
          {variant === 'chapter' && (
            <Link
              href="/"
              className="block px-6 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-white/50 hover:text-white transition-colors duration-150"
              onClick={() => setMobileOpen(false)}
            >
              ← Back to Home
            </Link>
          )}
          {chapters.map((ch) => (
            <Link
              key={ch.href}
              href={ch.href}
              className="block px-6 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-white/50 hover:text-white transition-colors duration-150 border-t border-white/5"
              onClick={() => setMobileOpen(false)}
            >
              {ch.label}
            </Link>
          ))}
          <Link
            href="/work-with-us"
            className="block px-6 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-white hover:text-white/80 transition-colors duration-150 border-t border-white/15"
            onClick={() => setMobileOpen(false)}
          >
            Work With Us →
          </Link>
        </div>
      )}
    </header>
  )
}
