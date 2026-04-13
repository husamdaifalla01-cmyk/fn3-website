import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import MoneyResetCTA from '@/components/MoneyResetCTA'
import { YENDO_BAD_CREDIT_HERO, YENDO_BAD_CREDIT_CARD, YENDO_BAD_CREDIT_CTA } from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'Best Credit Cards for Bad Credit 2026 — Real Approval Odds',
  description: 'The actual best credit cards if you have bad credit (below 580). Ranked by approval odds, fees, and whether they actually help you build credit.',
  alternates: { canonical: 'https://mintbrooks.com/bad-credit-credit-card' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best Credit Cards for Bad Credit 2026',
  description: 'Ranked credit card options for people with bad credit scores below 580.',
  datePublished: '2026-01-01',
  dateModified: '2026-03-01',
}

export default function BadCreditPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavBar />
      <article className="max-w-3xl mx-auto px-4 py-14">

        <nav className="text-xs mb-6 flex items-center gap-2" style={{ color: '#a8a29e' }}>
          <Link href="/" className="hover:text-amber-700 transition-colors">Mintbrooks</Link>
          <span>›</span>
          <span>Bad Credit Cards</span>
        </nav>

        <div className="section-label mb-3">Guide</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>Best Credit Cards for Bad Credit (2026)</h1>
        <p className="text-lg mb-8 leading-relaxed" style={{ color: '#78716c' }}>Most "bad credit credit card" lists recommend cards that still reject many bad-credit applicants in practice. This guide ranks options by real approval accessibility.</p>

        <div className="rounded-2xl p-6 mb-10" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.2)' }}>
          <div className="font-bold mb-2" style={{ color: '#d97706' }}>🏆 #1 Option If You Own a Car</div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#78716c' }}>If you own a car with equity, a car-secured credit card uses your vehicle's value — not your FICO score — to determine your credit limit. <strong style={{ color: '#1c1917' }}>Yendo</strong> offers up to $10,000. No deposit. You keep driving your car.</p>
          <AffiliateLink href={YENDO_BAD_CREDIT_HERO} placement="bad-credit-guide-hero" className="btn-primary text-sm py-2 px-5 inline-block">Check If My Car Qualifies →</AffiliateLink>
          <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>Soft inquiry only · Affiliate link</p>
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Why Most Bad-Credit Card Lists Are Misleading</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>The problem with "best credit cards for bad credit" lists is that they rank by features — cashback, APR, rewards — rather than the metric that matters when credit is damaged: <strong style={{ color: '#1c1917' }}>realistic approval likelihood.</strong></p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>Many widely-recommended cards require scores above 580 in practice, even when marketed broadly. Applying with a lower score results in a declined application — and a hard inquiry that can lower your score further. Verify approval criteria before applying anywhere.</p>

        <h2 className="text-2xl font-black mb-6" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Ranked by Approval Accessibility (Below 580)</h2>

        <div className="space-y-5 mb-12">
          {[
            { rank: 1, name: 'Car-Secured Credit Card (Yendo)', score: 'No minimum stated', deposit: 'None', limit: '$500–$10,000', why: 'Uses vehicle equity instead of credit score. No cash deposit required. Potential for higher limits than secured alternatives. Reports to all three bureaus. Verify current eligibility criteria and state availability directly with Yendo.', cta: true },
            { rank: 2, name: 'OpenSky Secured Visa', score: 'No credit check', deposit: '$200+', limit: 'Equals deposit', why: 'No credit check required. $35 annual fee. Requires a bank account. Limit equals cash deposit. Reports to all three bureaus. Straightforward approval process verified by publicly available issuer documentation.', cta: false },
            { rank: 3, name: 'Chime Credit Builder', score: 'No credit check', deposit: 'Chime account balance', limit: 'Up to $10,000', why: 'No hard inquiry. No interest. No annual fee. Requires a Chime spending account with direct deposit. Spending limit is your Chime account balance. Verify current terms and requirements at Chime\'s website.', cta: false },
            { rank: 4, name: 'Capital One Secured Mastercard', score: '580+ typical', deposit: '$49–$200', limit: 'Starting at $200', why: 'Often recommended for bad credit, but approval typically requires a score closer to 580. The $49 deposit tier is not guaranteed at all credit levels. Verify current terms with Capital One before applying.', cta: false },
          ].map(card => (
            <div
              key={card.rank}
              className="rounded-2xl p-6"
              style={{
                background: card.rank === 1 ? '#fef9ee' : 'white',
                border: card.rank === 1 ? '1.5px solid rgba(217,119,6,0.25)' : '1px solid rgba(28,25,23,0.08)',
              }}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl font-black flex-shrink-0" style={{ color: card.rank === 1 ? '#d97706' : 'rgba(28,25,23,0.15)' }}>#{card.rank}</div>
                <div className="flex-1">
                  <div className="font-black text-lg mb-3" style={{ color: '#1c1917' }}>{card.name}</div>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {[['Min Score', card.score], ['Deposit', card.deposit], ['Credit Limit', card.limit]].map(([label, val]) => (
                      <div key={label as string}>
                        <div className="text-xs mb-0.5" style={{ color: '#a8a29e' }}>{label}</div>
                        <div className="text-sm font-semibold" style={{ color: '#1c1917' }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{card.why}</p>
                  {card.cta && <AffiliateLink href={YENDO_BAD_CREDIT_CARD} placement="bad-credit-guide-card" className="btn-primary text-sm py-2 px-4 mt-4 inline-block">Check If I Qualify →</AffiliateLink>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <MoneyResetCTA variant="mid" />

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>What Builds Credit the Fastest</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>Consistent, on-time payments on an account that reports to all three bureaus is the most reliable path to rebuilding credit. The interest rate is secondary — if you pay your balance in full each month, you pay no interest.</p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>Credit utilization (how much of your available credit you use) accounts for roughly 30% of a FICO score. A higher credit limit at the same spending level means lower utilization — which can meaningfully improve your score faster than a low-limit secured card.</p>

        <MoneyResetCTA variant="end" />

        <div className="rounded-2xl p-6 text-center mb-12" style={{ background: '#1c1917' }}>
          <h3 className="text-xl font-black text-white mb-2">Use Your Car to Skip the Score Barrier</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>No credit score requirement. No deposit. Check eligibility in under 5 minutes.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <AffiliateLink href={YENDO_BAD_CREDIT_CTA} placement="bad-credit-guide-cta" className="btn-primary py-3 px-6">Check Car Eligibility →</AffiliateLink>
            <Link href="/finance/calculator" className="btn-primary py-3 px-6" style={{ background: '#059669' }}>Use Free Calculator</Link>
          </div>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.28)' }}>Affiliate links · Soft inquiry · Mintbrooks is not a lender</p>
        </div>

        {/* Related guides */}
        <div className="pt-8 mb-8" style={{ borderTop: '1px solid rgba(28,25,23,0.07)' }}>
          <h3 className="text-sm font-bold mb-3" style={{ color: '#1c1917' }}>Related Guides</h3>
          <div className="flex flex-col gap-2">
            <Link href="/car-title-loan-alternative" className="text-sm font-medium hover:underline" style={{ color: '#d97706' }}>
              → Car Title Loan Alternatives That Don&apos;t Risk Your Vehicle
            </Link>
            <Link href="/how-to-build-credit-with-bad-credit" className="text-sm font-medium hover:underline" style={{ color: '#d97706' }}>
              → How to Build Credit with Bad Credit (Step-by-Step)
            </Link>
            <Link href="/yendo-states-guide" className="text-sm font-medium hover:underline" style={{ color: '#d97706' }}>
              → Is Yendo Available in Your State? (37-State Eligibility Guide)
            </Link>
            <Link href="/auto-equity-loan" className="text-sm font-medium hover:underline" style={{ color: '#d97706' }}>
              → Auto Equity Loan: Use Your Car&apos;s Value to Get Cash
            </Link>
            <Link href="/first-credit-card-bad-credit" className="text-sm font-medium hover:underline" style={{ color: '#d97706' }}>
              → Getting Your First Credit Card With Bad Credit (Complete Guide)
            </Link>
          </div>
        </div>

        <div className="text-xs pt-6 leading-relaxed" style={{ color: '#a8a29e', borderTop: '1px solid rgba(28,25,23,0.07)' }}>
          Mintbrooks is an independent educational resource. We are not affiliated with any card issuer. Card details are based on publicly available information and may change. Approval decisions are made solely by the card issuer — Mintbrooks makes no guarantee of approval. We may earn a commission when you apply through our links. This is not financial advice. Always verify current terms directly with the card issuer before applying.
        </div>
      </article>
    </>
  )
}
