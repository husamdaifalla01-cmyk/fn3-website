'use client'
import Link from 'next/link'
import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Prime Deals', href: '/prime-young-adults' },
  { label: 'Student Cards', href: '/student-credit-cards' },
  { label: 'More Perks', href: '/insurance-deals' },
  { label: 'Blog', href: '/articles' },
]

export default function StackperksNav() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(13,12,29,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(167,139,250,0.10)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #10b981)', color: 'white' }}
            >
              S
            </div>
            <span className="font-black text-lg text-white" style={{ letterSpacing: '-0.02em' }}>
              Stack<span style={{ color: '#a78bfa' }}>perks</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium no-underline transition-colors"
                style={{ color: 'rgba(240,238,255,0.55)' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'white' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(240,238,255,0.55)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="/prime-young-adults"
              className="btn-emerald text-sm py-2.5 px-5 font-bold"
            >
              Claim Prime Free →
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-0.5 bg-white mb-1.5" />
            <div className="w-5 h-0.5 bg-white mb-1.5" />
            <div className="w-5 h-0.5 bg-white" />
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            className="md:hidden py-4 border-t"
            style={{ borderColor: 'rgba(167,139,250,0.10)' }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2.5 text-sm no-underline"
                style={{ color: 'rgba(240,238,255,0.65)' }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/prime-young-adults"
              className="btn-emerald text-sm py-2.5 px-5 font-bold inline-block mt-3"
              onClick={() => setOpen(false)}
            >
              Claim Prime Free →
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
