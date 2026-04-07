import type { Metadata } from 'next'
import Link from 'next/link'
import { OFFERS, buildAffiliateUrl } from '@/lib/offers'
import AffiliateLink from '@/components/AffiliateLink'
import LinksEmailCapture from '@/components/LinksEmailCapture'

// TikTok/IG bio link traffic — all UTMs tagged 'social' source
const YENDO_BIO_HERO = buildAffiliateUrl(OFFERS.yendo.url, 'social', 'bio-link', 'links-hero-cta')
const YENDO_BIO_SECONDARY = buildAffiliateUrl(OFFERS.yendo.url, 'social', 'bio-link', 'links-secondary-cta')
const SLAM_DUNK_BIO = buildAffiliateUrl(OFFERS.slamDunk.url, 'social', 'bio-link', 'links-personal-loan')

export const metadata: Metadata = {
  title: 'Mintbrooks — Links',
  description: 'Your car could be worth up to $10,000 in credit. No credit score needed. No deposit. Keep driving.',
  robots: { index: false, follow: true }, // noindex — this is a bio link page, not an SEO page
}

export default function LinksPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(170deg, #1c1917 0%, #292524 40%, #1c1917 100%)' }}
    >
      {/* Ambient glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(217,119,6,0.15) 0%, transparent 70%)',
        }}
      />

      <main className="flex-1 flex flex-col items-center justify-start px-4 py-10 relative">
        {/* ── Brand ── */}
        <div className="text-center mb-8">
          <div className="text-2xl font-black text-white mb-1">
            Mint<span style={{ color: '#fbbf24' }}>brooks</span>
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Car-secured credit education
          </p>
        </div>

        {/* ── Hero message ── */}
        <div className="text-center mb-8 max-w-sm">
          <h1
            className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3"
            style={{ letterSpacing: '-0.02em' }}
          >
            Your car could unlock<br />
            <span style={{ color: '#fbbf24' }}>up to $10,000 in credit</span>
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            No credit score needed. No deposit. Keep driving your car.
            Soft inquiry only — won't affect your score.
          </p>
        </div>

        {/* ── Link stack ── */}
        <div className="w-full max-w-sm space-y-3 mb-8">
          {/* PRIMARY: Yendo CTA */}
          <AffiliateLink
            href={YENDO_BIO_HERO}
            placement="links-hero-cta"
            className="btn-primary block w-full text-center text-base py-4 font-bold"
            style={{ borderRadius: '16px' }}
          >
            Check My Car's Eligibility →
          </AffiliateLink>

          {/* SECONDARY: Calculator */}
          <Link
            href="/calculator"
            className="block w-full text-center text-base py-4 font-semibold"
            style={{
              background: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '16px',
              textDecoration: 'none',
            }}
          >
            Free Credit Estimator
          </Link>

          {/* Guide links */}
          <Link
            href="/how-it-works"
            className="block w-full text-center text-sm py-3.5 font-medium"
            style={{
              background: 'rgba(217,119,6,0.1)',
              color: '#fbbf24',
              border: '1px solid rgba(217,119,6,0.2)',
              borderRadius: '16px',
              textDecoration: 'none',
            }}
          >
            How Car-Secured Credit Works
          </Link>

          <Link
            href="/bad-credit-credit-card"
            className="block w-full text-center text-sm py-3.5 font-medium"
            style={{
              background: 'rgba(217,119,6,0.1)',
              color: '#fbbf24',
              border: '1px solid rgba(217,119,6,0.2)',
              borderRadius: '16px',
              textDecoration: 'none',
            }}
          >
            Best Cards for Bad Credit (2026)
          </Link>

          {/* Slam Dunk fallback */}
          <AffiliateLink
            href={SLAM_DUNK_BIO}
            placement="links-personal-loan"
            offer="slam-dunk"
            className="block w-full text-center text-sm py-3.5 font-medium"
            style={{
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              textDecoration: 'none',
            }}
          >
            Need a Personal Loan Instead? →
          </AffiliateLink>
        </div>

        {/* ── Email capture ── */}
        <div
          className="w-full max-w-sm rounded-2xl p-6 mb-8"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(217,119,6,0.15)',
          }}
        >
          <div className="text-center mb-4">
            <div className="text-sm font-bold text-white mb-1">Get your free car credit estimate</div>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              We'll email your personalized estimate + eligibility check link
            </p>
          </div>
          <LinksEmailCapture />
        </div>

        {/* ── Trust signals ── */}
        <div className="w-full max-w-sm mb-6">
          <div className="flex justify-center gap-6 mb-4">
            {[
              { label: 'Soft Inquiry', icon: '🔒' },
              { label: 'No Deposit', icon: '💳' },
              { label: '36+ States', icon: '🇺🇸' },
            ].map(t => (
              <div key={t.label} className="text-center">
                <div className="text-lg mb-0.5">{t.icon}</div>
                <div className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {t.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Social proof ── */}
        <div className="text-center mb-6 max-w-xs">
          <div className="flex justify-center gap-1 mb-2">
            {[1,2,3,4,5].map(i => (
              <span key={i} style={{ color: '#fbbf24', fontSize: '14px' }}>★</span>
            ))}
          </div>
          <p className="text-xs italic leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
            "I had a 480 credit score and got approved for $3,500. No deposit, kept my car."
          </p>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
            — Verified Yendo customer review
          </p>
        </div>

        {/* ── FTC disclosure + footer ── */}
        <div className="text-center max-w-sm">
          <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
            <strong style={{ color: 'rgba(255,255,255,0.35)' }}>Affiliate disclosure:</strong> Mintbrooks
            may earn a commission when you apply through our links at no extra cost to you.
            We are not a lender. All information is educational — not financial advice.
          </p>
          <div className="flex justify-center gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            <a href="https://mintbrooks.com" className="hover:text-white transition-colors" style={{ textDecoration: 'none', color: 'inherit' }}>mintbrooks.com</a>
            <span>·</span>
            <a href="https://www.tiktok.com/@mintbrookscredit" target="_blank" rel="noopener" className="hover:text-white transition-colors" style={{ textDecoration: 'none', color: 'inherit' }}>TikTok</a>
            <span>·</span>
            <a href="https://www.instagram.com/mintbrookscredit" target="_blank" rel="noopener" className="hover:text-white transition-colors" style={{ textDecoration: 'none', color: 'inherit' }}>Instagram</a>
          </div>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.12)' }}>
            © 2026 Mintbrooks
          </p>
        </div>
      </main>
    </div>
  )
}

