import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import { SLAM_DUNK_EMERGENCY_CARD, SLAM_DUNK_EMERGENCY_CTA, YENDO_EMERGENCY_CARD, YENDO_EMERGENCY_CTA } from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'Emergency Cash Between Paychecks: Real Options for 2026 — Mintbrooks',
  description: 'Short on cash before your next paycheck? Your real options — from personal loans to car-secured credit — ranked by speed and approval odds.',
  alternates: { canonical: 'https://mintbrooks.com/finance/emergency-cash-between-paychecks' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Emergency Cash Between Paychecks: Real Options for 2026',
  description: 'Options for getting emergency cash between paychecks without payday loan traps.',
  datePublished: '2026-01-01',
  dateModified: '2026-03-22',
}

export default function EmergencyCashPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavBar />
      <article className="max-w-3xl mx-auto px-4 py-14">

        <nav className="text-xs mb-6 flex items-center gap-2" style={{ color: '#a8a29e' }}>
          <Link href="/" className="hover:text-amber-700 transition-colors">Mintbrooks</Link>
          <span>›</span>
          <span>Emergency Cash</span>
        </nav>

        <div className="section-label mb-3">Emergency Guide</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>
          Emergency Cash Between Paychecks:<br />What Actually Works
        </h1>
        <p className="text-lg mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          Gas prices are up. Groceries are up. Rent is up. And your next paycheck is still days away. Here are your actual options — no judgment, just what works.
        </p>

        <div className="rounded-2xl p-5 mb-10" style={{ background: '#fffbeb', border: '1px solid rgba(217,119,6,0.2)' }}>
          <div className="font-semibold text-sm mb-1" style={{ color: '#92400e' }}>The payday loan trap</div>
          <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}>
            Payday loans can carry APRs over 400%. You borrow $300, pay back $345 in two weeks — then need another loan when the next bill hits. The options below are designed to break that cycle, not deepen it.
          </p>
        </div>

        <h2 className="text-2xl font-black mb-6" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Options Ranked by Speed &amp; Approval Odds</h2>

        <div className="space-y-5 mb-12">
          {[
            {
              rank: 1,
              name: 'Personal Loan (Up to $50k)',
              speed: 'Same day – 48 hours',
              score: 'Any credit welcome',
              bestFor: 'Larger amounts, immediate need',
              body: 'Online personal loan networks connect you with lenders for any credit type. Loan amounts up to $50,000 with fixed monthly payments. Funded same day or next day in many cases. Unlike payday loans, you repay in installments — not a lump sum on your next paycheck.',
              highlight: true,
              cta: { text: 'Get a Personal Loan →', url: SLAM_DUNK_EMERGENCY_CARD },
            },
            {
              rank: 2,
              name: 'Car-Secured Credit Line (Revolving)',
              speed: 'Days to set up, then instant',
              score: 'No FICO required',
              bestFor: 'Ongoing emergencies, credit building',
              body: 'A car-secured credit card like Yendo gives you a revolving line — borrow, repay, borrow again. Unlike a loan, you don\'t reapply every time. If your car has equity, this can be your permanent safety net. Limits up to $10,000. Reports to bureaus, builds credit.',
              highlight: false,
              cta: { text: 'Check My Car Eligibility →', url: YENDO_EMERGENCY_CARD },
            },
            {
              rank: 3,
              name: 'Credit Card Cash Advance',
              speed: 'Immediate (if you have the card)',
              score: '580+ to get approved',
              bestFor: 'If you already have a card',
              body: 'If you already have a credit card, a cash advance is fast — but expensive. Typical APR is 25–30% on cash advances plus a 3–5% fee. Only use this if you can repay within a few days. Not an option if you don\'t already have a card.',
              highlight: false,
              cta: null,
            },
            {
              rank: 4,
              name: 'Payday Loan',
              speed: 'Same day',
              score: 'Any',
              bestFor: 'Last resort only',
              body: 'Payday loans are fast, but can cost 400%+ APR. The full balance is due on your next payday — which often means borrowing again. If the options above are available to you, use them instead. Only consider a payday loan if absolutely nothing else is accessible.',
              highlight: false,
              cta: null,
            },
          ].map(opt => (
            <div
              key={opt.rank}
              className="rounded-2xl p-6"
              style={{
                background: opt.highlight ? '#fef9ee' : 'white',
                border: opt.highlight ? '1.5px solid rgba(217,119,6,0.25)' : '1px solid rgba(28,25,23,0.08)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="text-3xl font-black flex-shrink-0"
                  style={{ color: opt.highlight ? '#d97706' : 'rgba(28,25,23,0.15)' }}
                >
                  #{opt.rank}
                </div>
                <div className="flex-1">
                  <div className="font-black text-lg mb-2" style={{ color: '#1c1917' }}>{opt.name}</div>
                  <div className="flex flex-wrap gap-4 text-xs mb-3" style={{ color: '#a8a29e' }}>
                    <span>⏱ {opt.speed}</span>
                    <span>📊 {opt.score}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: '#78716c' }}>{opt.body}</p>
                  {opt.cta && (
                    <AffiliateLink href={opt.cta.url} placement={`emergency-guide-card-${opt.rank}`} offer={opt.rank === 1 ? 'slam-dunk' : 'yendo'} className="btn-primary text-sm py-2 px-5 inline-block">
                      {opt.cta.text}
                    </AffiliateLink>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>The Smarter Move: Revolving Credit, Not One-Time Loans</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          A personal loan solves this week's problem. But what about next month? A revolving credit line means you borrow once, repay, and borrow again — without reapplying every time an emergency hits.
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          If you own a car with equity, a car-secured credit line is your best long-term emergency fund. It functions like a credit card — spend on it, pay it down, use it again. No new application, no waiting period, no new hard inquiry.
        </p>

        <div className="rounded-2xl p-6 text-center mb-12" style={{ background: '#1c1917' }}>
          <h3 className="text-xl font-black text-white mb-2">Need Cash Now AND a Long-Term Solution?</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Get a personal loan for immediate needs, and set up a car credit line for the next emergency.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <AffiliateLink href={SLAM_DUNK_EMERGENCY_CTA} placement="emergency-guide-cta" offer="slam-dunk" className="btn-primary py-3 px-6">
              Personal Loan (Fast) →
            </AffiliateLink>
            <AffiliateLink href={YENDO_EMERGENCY_CTA} placement="emergency-guide-cta" className="btn-primary py-3 px-6" style={{ background: '#059669' }}>
              Car Credit Line →
            </AffiliateLink>
          </div>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.28)' }}>Affiliate links · Mintbrooks is not a lender</p>
        </div>

        <div className="pt-8 mb-8" style={{ borderTop: '1px solid rgba(28,25,23,0.07)' }}>
          <h3 className="text-sm font-bold mb-3" style={{ color: '#1c1917' }}>Related Guides</h3>
          <div className="flex flex-col gap-2">
            <Link href="/finance/credit-card-500-credit-score" className="text-sm font-medium hover:underline" style={{ color: '#d97706' }}>
              → Credit Cards for 500 Credit Score: Cards That Actually Approve
            </Link>
            <Link href="/finance/bad-credit-credit-card" className="text-sm font-medium hover:underline" style={{ color: '#d97706' }}>
              → Best Credit Cards for Bad Credit (2026)
            </Link>
          </div>
        </div>

        <div className="text-xs pt-8 leading-relaxed" style={{ color: '#a8a29e', borderTop: '1px solid rgba(28,25,23,0.07)' }}>
          Mintbrooks is an independent educational resource. We are not a lender. We may earn a commission when you apply through our links. This is not financial advice. Loan availability, rates, and terms vary by lender and state. Always read the full terms before accepting any loan or credit offer.
        </div>
      </article>
    </>
  )
}
