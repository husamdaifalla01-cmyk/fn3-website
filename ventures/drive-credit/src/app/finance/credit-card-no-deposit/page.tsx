import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import { YENDO_NO_DEPOSIT_HERO, YENDO_NO_DEPOSIT_CTA } from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'Credit Card with No Deposit Required: Real Options — Mintbrooks',
  description: 'Most secured cards require a cash deposit. Here are real credit cards that require no deposit — even with bad or no credit.',
  alternates: { canonical: 'https://mintbrooks.com/finance/credit-card-no-deposit' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Credit Card with No Deposit Required: Real Options',
  description: 'Guide to no-deposit credit cards for people with bad or no credit.',
  datePublished: '2026-01-01',
  dateModified: '2026-03-22',
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
          <span>No Deposit Credit Card</span>
        </nav>

        <div className="section-label mb-3">Credit Guide</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>
          Credit Card with No Deposit:<br />How to Get Approved
        </h1>
        <p className="text-lg mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          When you have poor or no credit, lenders typically ask for a cash deposit as collateral. But not all do. Here's how to get a real credit card without tying up hundreds of dollars.
        </p>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Why Do Cards Require Deposits?</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Secured cards exist because lenders need protection. When your credit score is low, they can't fully trust that you'll repay. A cash deposit — typically $200–$500 — acts as their safety net. If you default, they keep the deposit.
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          The problem: if you had $200–$500 sitting around, you probably wouldn't need a credit card for emergencies. That's the catch. But there are two ways around it: use different collateral, or find unsecured products that don't require deposits.
        </p>

        <div className="rounded-2xl p-6 mb-10" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.2)' }}>
          <div className="font-bold mb-2" style={{ color: '#d97706' }}>🚗 Your car can replace the deposit entirely.</div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#78716c' }}>
            Yendo uses your <strong style={{ color: '#1c1917' }}>car's equity as collateral</strong> instead of cash. No deposit. No cash out of pocket. Your vehicle's value secures the credit line — and you keep driving your car normally.
          </p>
          <AffiliateLink href={YENDO_NO_DEPOSIT_HERO} placement="no-deposit-guide-hero" className="btn-primary text-sm py-2.5 px-6 inline-block">
            Check My Car's Eligibility →
          </AffiliateLink>
          <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>No cash deposit · Affiliate link · Soft inquiry</p>
        </div>

        <h2 className="text-2xl font-black mb-6" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>No-Deposit Options Compared</h2>

        <div className="overflow-x-auto rounded-2xl mb-10" style={{ border: '1px solid rgba(217,119,6,0.12)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#fef9ee', borderBottom: '1px solid rgba(217,119,6,0.1)' }}>
                <th className="text-left px-5 py-3.5 font-semibold" style={{ color: '#78716c' }}>Product</th>
                <th className="px-5 py-3.5 font-semibold text-center" style={{ color: '#78716c' }}>Deposit</th>
                <th className="px-5 py-3.5 font-semibold text-center" style={{ color: '#78716c' }}>Credit Limit</th>
                <th className="px-5 py-3.5 font-semibold text-center" style={{ color: '#78716c' }}>Score Needed</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Car-Secured Card (Yendo)', 'None', '$500–$10,000+', 'None'],
                ['Chime Credit Builder', 'Chime balance only', 'Up to $10,000', 'None'],
                ['Petal 1 Visa', 'None', '$300–$5,000', '500+ (variable)'],
                ['Capital One Platinum', 'None', '$300+', '580+ typical'],
                ['OpenSky Secured', '$200 cash', 'Equals deposit', 'None'],
              ].map(([product, deposit, limit, score], i) => (
                <tr key={product as string} style={{ borderBottom: i < 4 ? '1px solid rgba(217,119,6,0.07)' : 'none', background: i % 2 === 0 ? 'white' : '#fffdf7' }}>
                  <td className="px-5 py-3 font-semibold" style={{ color: '#1c1917' }}>{product}</td>
                  <td className="px-5 py-3 text-center" style={{ color: deposit === 'None' ? '#059669' : '#78716c', fontWeight: deposit === 'None' ? 700 : 400 }}>{deposit}</td>
                  <td className="px-5 py-3 text-center" style={{ color: '#78716c' }}>{limit}</td>
                  <td className="px-5 py-3 text-center" style={{ color: '#78716c' }}>{score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>The Car-Secured Advantage</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Most no-deposit options still require a 580+ credit score, which excludes many people. The car-secured approach is genuinely different: your FICO score isn't the deciding factor. If your car has equity — meaning it's worth more than you owe on it — that equity replaces both the deposit and the credit score requirement.
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          Additionally, the credit limits available through car-secured cards are typically much higher than secured alternatives. A $5,000–$10,000 limit on a no-deposit card is rare through traditional paths, but accessible if you have sufficient vehicle equity.
        </p>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>What to Watch Out For</h2>
        <div className="space-y-3 mb-10">
          {[
            'Compare APRs carefully — no-deposit doesn\'t mean cheap credit',
            'Annual fees vary significantly ($0 to $99+)',
            'Check whether the card reports to all three bureaus (it should)',
            'Understand the default process for any secured product (car or cash)',
            'Verify state availability before applying',
          ].map(q => (
            <div key={q} className="flex gap-3 items-start">
              <span className="text-sm flex-shrink-0 mt-0.5" style={{ color: '#d97706' }}>→</span>
              <span className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{q}</span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-6 text-center mb-12" style={{ background: '#1c1917' }}>
          <h3 className="text-xl font-black text-white mb-2">Skip the Cash Deposit</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Use your car's value instead of cash. Check eligibility in under 5 minutes.
          </p>
          <AffiliateLink href={YENDO_NO_DEPOSIT_CTA} placement="no-deposit-guide-cta" className="btn-primary inline-block py-3 px-8">
            Check My Car's Eligibility →
          </AffiliateLink>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.28)' }}>Affiliate link · Soft inquiry only · Mintbrooks is not a lender</p>
        </div>

        <div className="text-xs pt-8 leading-relaxed" style={{ color: '#a8a29e', borderTop: '1px solid rgba(28,25,23,0.07)' }}>
          Mintbrooks is an independent educational resource. Product details based on publicly available information and subject to change. We may earn a commission when you apply through our links. This is not financial advice. Verify current terms directly with the issuer.
        </div>
      </article>
    </>
  )
}
