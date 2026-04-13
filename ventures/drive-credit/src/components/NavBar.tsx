'use client'
import Link from 'next/link'
import { OFFERS, buildAffiliateUrl } from '@/lib/offers'
import { trackAffiliateClick } from '@/lib/analytics'

const YENDO_NAV = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'homepage-nav')

export default function NavBar() {
  return (
    <nav
      className="border-b sticky top-0 z-50"
      style={{
        background: 'rgba(255,253,247,0.97)',
        borderColor: 'rgba(217,119,6,0.1)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-black text-lg tracking-tight" style={{ color: '#1c1917' }}>
            Mint<span style={{ color: '#d97706' }}>brooks</span>
          </Link>
          <span className="hidden sm:inline text-xs px-2 py-0.5 rounded" style={{ background: '#fef3c7', color: '#92400e', fontWeight: 600 }}>
            Affiliate resource
          </span>
        </div>
        <div className="flex items-center gap-5 text-sm" style={{ color: '#78716c' }}>
          <Link href="/finance/calculator" className="hover:text-amber-700 transition-colors hidden md:block">Estimator</Link>
          <Link href="/bad-credit-credit-card" className="hover:text-amber-700 transition-colors hidden md:block">Bad Credit Guide</Link>
          <a
            href={YENDO_NAV}
            target="_blank"
            rel="nofollow noopener"
            className="btn-primary text-sm py-2 px-5"
            onClick={() => trackAffiliateClick('homepage-nav')}
          >
            Check My Car →
          </a>
        </div>
      </div>
    </nav>
  )
}
