'use client'
import Link from 'next/link'

const OFFERS = [
  {
    icon: '📦',
    tag: 'Amazon',
    badge: '$30 bounty',
    badgeColor: '#10b981',
    title: 'Prime for Young Adults',
    subtitle: '$7.49/mo · Ages 18–24',
    description: 'Half-price Prime with free 2-day shipping, Prime Video, Music, and Gaming. 6-month free trial.',
    cta: 'Start Free Trial',
    href: '/prime-young-adults',
    highlight: true,
  },
  {
    icon: '💳',
    tag: 'Student Cards',
    badge: 'Up to $200 bonus',
    badgeColor: '#7c3aed',
    title: 'Best First Credit Cards',
    subtitle: 'No credit history needed',
    description: 'Discover it®, Capital One Quicksilver, and Chase Freedom Flex — all accept applicants with no credit history.',
    cta: 'See Cards',
    href: '/student-credit-cards',
    highlight: false,
  },
  {
    icon: '🛡️',
    tag: 'Insurance',
    badge: 'Up to $100/lead',
    badgeColor: '#f59e0b',
    title: 'Auto & Renters Insurance',
    subtitle: 'Compare in 2 minutes',
    description: 'First apartment, first car — compare auto and renters insurance rates and earn cashback perks.',
    cta: 'Compare Rates',
    href: '/insurance-deals',
    highlight: false,
  },
]

export default function OffersGrid() {
  return (
    <section
      className="py-20 px-4"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="section-label">All Deals</div>
          <h2
            className="font-black leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--text)', letterSpacing: '-0.025em' }}
          >
            Every perk. One place.
          </h2>
          <p className="mt-3 text-base" style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '12px auto 0' }}>
            Verified offers for the 18–24 crowd — no credit needed, no fine print, no fluff.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {OFFERS.map((offer) => (
            <div
              key={offer.title}
              className="relative rounded-2xl p-6 flex flex-col"
              style={{
                background: 'var(--surface)',
                border: offer.highlight
                  ? '1.5px solid rgba(16,185,129,0.35)'
                  : '1px solid rgba(124,58,237,0.10)',
                boxShadow: offer.highlight
                  ? '0 8px 40px rgba(16,185,129,0.10)'
                  : '0 2px 16px rgba(15,10,30,0.05)',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
            >
              {offer.highlight && (
                <div
                  className="absolute -top-3 left-6 text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: '#10b981', color: 'white' }}
                >
                  ⚡ Most Popular
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: 'var(--bg)', border: '1px solid rgba(124,58,237,0.10)' }}
                >
                  {offer.icon}
                </div>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: `${offer.badgeColor}18`,
                    color: offer.badgeColor,
                    border: `1px solid ${offer.badgeColor}30`,
                  }}
                >
                  {offer.badge}
                </span>
              </div>

              <div
                className="text-xs font-bold uppercase tracking-wider mb-1"
                style={{ color: 'var(--text-soft)' }}
              >
                {offer.tag}
              </div>
              <h3 className="text-lg font-black mb-0.5" style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}>
                {offer.title}
              </h3>
              <p className="text-xs font-semibold mb-3" style={{ color: offer.badgeColor }}>
                {offer.subtitle}
              </p>
              <p className="text-sm flex-1 mb-5" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                {offer.description}
              </p>
              <Link
                href={offer.href}
                className={offer.highlight ? 'btn-emerald text-sm py-3 text-center font-bold' : 'btn-primary text-sm py-3 text-center font-bold'}
              >
                {offer.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
