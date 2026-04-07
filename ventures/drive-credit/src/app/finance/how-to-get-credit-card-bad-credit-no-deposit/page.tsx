import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import { YENDO_BAD_CREDIT_NO_DEPOSIT_HERO, YENDO_BAD_CREDIT_NO_DEPOSIT_CTA } from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'How to Get a Credit Card with Bad Credit and No Deposit (2026) — Mintbrooks',
  description: 'Real options for getting a credit card when you have bad credit and can\'t afford a deposit. No-deposit alternatives that actually work.',
  alternates: { canonical: 'https://mintbrooks.com/how-to-get-credit-card-bad-credit-no-deposit' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Get a Credit Card with Bad Credit and No Deposit',
  description: 'Guide to no-deposit credit cards for people with bad credit scores.',
  datePublished: '2026-04-03',
  dateModified: '2026-04-03',
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavBar />
      <article className="max-w-3xl mx-auto px-4 py-14">

        <nav className="text-xs mb-6 flex items-center gap-2" style={{ color: '#a8a29e' }}>
          <Link href="/" className="hover:text-amber-700 transition-colors">Mintbrooks</Link>
          <span>›</span>
          <span>Bad Credit, No Deposit</span>
        </nav>

        <div className="section-label mb-3">Credit Guide</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>
          How to Get a Credit Card with Bad Credit and No Deposit
        </h1>
        <p className="text-lg mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          If your credit score is below 580 and you don&apos;t have $200+ sitting around for a secured card deposit, you&apos;re not out of options. Here are the realistic paths to getting a credit card without putting cash down.
        </p>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>The Deposit Problem</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Most &quot;credit cards for bad credit&quot; guides point you to secured cards. The catch: they require a cash deposit of $200 to $500 that becomes your credit limit. If you had that cash available, you might not need the card in the first place.
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          The real question isn&apos;t &quot;which secured card is best&quot; — it&apos;s &quot;how do I get approved without tying up cash I don&apos;t have?&quot; There are two realistic approaches: use a different form of collateral, or find products that don&apos;t require collateral at all.
        </p>

        <div className="rounded-2xl p-6 mb-10" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.2)' }}>
          <div className="font-bold mb-2" style={{ color: '#d97706' }}>Option 1: Use Your Car Instead of Cash</div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#78716c' }}>
            If you own a car, a car-secured credit card uses your vehicle&apos;s equity as collateral — not a cash deposit. <strong style={{ color: '#1c1917' }}>Yendo</strong> offers credit limits from $500 to $10,000 based on your car&apos;s value. You keep driving your car. No credit score minimum stated. Availability varies by state.
          </p>
          <AffiliateLink href={YENDO_BAD_CREDIT_NO_DEPOSIT_HERO} placement="bad-credit-no-deposit-hero" className="btn-primary text-sm py-2 px-5 inline-block">Check If My Car Qualifies →</AffiliateLink>
          <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>Soft inquiry only · Affiliate link</p>
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>No-Deposit Options Compared</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Not every no-deposit option works for every situation. Here&apos;s an honest comparison of what&apos;s available, what the real requirements are, and what to watch out for.
        </p>

        <div className="space-y-5 mb-12">
          {[
            { name: 'Car-Secured Credit Card (Yendo)', type: 'Car collateral', deposit: 'None', limit: '$500–$10,000', pros: 'Higher limits, no cash needed, reports to bureaus', cons: 'Requires car ownership with equity. Not available in all states.', cta: true },
            { name: 'Chime Credit Builder', type: 'Account balance', deposit: 'None upfront', limit: 'Up to $10,000', pros: 'No hard inquiry, no annual fee, no interest', cons: 'Requires Chime account with direct deposit. Spending limit tied to account balance.' },
            { name: 'OpenSky Secured Visa', type: 'Cash deposit', deposit: '$200+', limit: 'Equals deposit', pros: 'No credit check at all', cons: 'Requires cash deposit. $35 annual fee. Low limits.' },
          ].map((card, i) => (
            <div key={i} className="rounded-2xl p-6" style={{ background: i === 0 ? '#fef9ee' : 'white', border: i === 0 ? '1.5px solid rgba(217,119,6,0.25)' : '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-black text-lg mb-2" style={{ color: '#1c1917' }}>{card.name}</div>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {[['Collateral', card.type], ['Deposit', card.deposit], ['Credit Limit', card.limit]].map(([label, val]) => (
                  <div key={label as string}>
                    <div className="text-xs mb-0.5" style={{ color: '#a8a29e' }}>{label}</div>
                    <div className="text-sm font-semibold" style={{ color: '#1c1917' }}>{val}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-1" style={{ color: '#78716c' }}><strong style={{ color: '#1c1917' }}>Pros:</strong> {card.pros}</p>
              <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}><strong style={{ color: '#1c1917' }}>Watch out:</strong> {card.cons}</p>
              {card.cta && <AffiliateLink href={YENDO_BAD_CREDIT_NO_DEPOSIT_HERO} placement="bad-credit-no-deposit-card" className="btn-primary text-sm py-2 px-4 mt-4 inline-block">Check If I Qualify →</AffiliateLink>}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>How to Maximize Your Chances</h2>
        <div className="space-y-4 mb-8">
          {[
            { step: '1', title: 'Check your credit report for free', desc: 'Use AnnualCreditReport.com to see where you stand. Dispute any errors — incorrect negative items are more common than you think.' },
            { step: '2', title: 'Calculate your car equity', desc: 'If you own a car, check its value on KBB or Edmunds. Subtract what you owe. That equity could become your credit limit without a cash deposit.' },
            { step: '3', title: 'Apply for soft-pull options first', desc: 'Start with products that only do a soft inquiry to check eligibility. This way a denial doesn\'t hurt your score further.' },
            { step: '4', title: 'Use the card responsibly', desc: 'Keep utilization below 30%, pay on time every month, and the score improvement compounds. Within 6-12 months you\'ll have more options.' },
          ].map(item => (
            <div key={item.step} className="flex gap-4">
              <div className="text-2xl font-black flex-shrink-0" style={{ color: 'rgba(28,25,23,0.12)' }}>{item.step}</div>
              <div>
                <div className="font-bold mb-1" style={{ color: '#1c1917' }}>{item.title}</div>
                <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-6 text-center mb-12" style={{ background: '#1c1917' }}>
          <h3 className="text-xl font-black text-white mb-2">Skip the Deposit — Use Your Car</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>No cash deposit. No credit score requirement stated. Check eligibility in under 5 minutes.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <AffiliateLink href={YENDO_BAD_CREDIT_NO_DEPOSIT_CTA} placement="bad-credit-no-deposit-cta" className="btn-primary py-3 px-6">Check Car Eligibility →</AffiliateLink>
            <Link href="/calculator" className="btn-primary py-3 px-6" style={{ background: '#059669' }}>Use Free Calculator</Link>
          </div>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.28)' }}>Affiliate links · Soft inquiry · Mintbrooks is not a lender</p>
        </div>

        <div className="text-xs pt-8 leading-relaxed" style={{ color: '#a8a29e', borderTop: '1px solid rgba(28,25,23,0.07)' }}>
          Mintbrooks is an independent educational resource. We are not affiliated with any card issuer. Card details are based on publicly available information and may change. Approval decisions are made solely by the card issuer — Mintbrooks makes no guarantee of approval. We may earn a commission when you apply through our links. This is not financial advice. Always verify current terms directly with the card issuer before applying.
        </div>
      </article>
    </>
  )
}
