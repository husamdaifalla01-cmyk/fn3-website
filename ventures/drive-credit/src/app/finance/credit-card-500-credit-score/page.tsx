import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import FinanceEmailCapture from '@/components/FinanceEmailCapture'
import AffiliateLink from '@/components/AffiliateLink'
import { YENDO_500_HERO, YENDO_500_CARD, YENDO_500_CTA } from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'Credit Card with a 500 Credit Score: What Are Your Real Options? — Mintbrooks',
  description: 'What credit cards can you actually get with a 500 credit score? Here are your realistic options — ranked by approval odds, not features.',
  alternates: { canonical: 'https://mintbrooks.com/finance/credit-card-500-credit-score' },
}

const faqs = [
  {
    q: 'What is the minimum credit score for Yendo?',
    a: 'Yendo does not have a minimum credit score requirement. Instead of evaluating your credit score, Yendo uses your car\'s equity as collateral. The initial eligibility check is a soft inquiry that does not affect your credit score.',
  },
  {
    q: 'Does Yendo do a hard credit check?',
    a: 'The initial eligibility check is a soft inquiry — it will not appear on your credit report or affect your score. If you proceed to a full application after the eligibility check, a hard inquiry may occur at that stage.',
  },
  {
    q: 'What cars qualify for Yendo?',
    a: 'Most cars that are fully paid off (or have significant equity) qualify. Yendo assesses your vehicle\'s current market value to determine your credit limit. Very old or high-mileage vehicles may have lower limits or may not qualify.',
  },
  {
    q: 'Can I use Yendo if I still have a car loan?',
    a: 'Typically, Yendo requires that your car is fully paid off (no existing lien) so they can place a first-lien position on the title. If you still have an auto loan, you may not qualify. Check eligibility directly — the soft pull is free.',
  },
  {
    q: 'What states is Yendo available in?',
    a: 'Yendo is currently available in 36+ US states. Coverage is expanding. Check eligibility at the link above — it will immediately tell you if your state is supported.',
  },
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Credit Card with a 500 Credit Score: What Are Your Real Options?',
    description: 'Realistic credit card options for people with 500 credit scores.',
    datePublished: '2026-01-01',
    dateModified: '2026-04-05',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  },
]

export default function Page() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <NavBar />
      <article className="max-w-3xl mx-auto px-4 py-14">

        {/* Breadcrumb */}
        <nav className="text-xs mb-6 flex items-center gap-2" style={{ color: '#a8a29e' }}>
          <Link href="/" className="hover:text-amber-700 transition-colors">Mintbrooks</Link>
          <span>›</span>
          <span>500 Score Options</span>
        </nav>

        <div className="section-label mb-3">Credit Guide</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>
          Credit Card with a 500 Credit Score:<br />What Are Your Actual Options?
        </h1>
        <p className="text-lg mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          Most lists of "credit cards for bad credit" include cards that will reject a 500 score in practice. This one doesn't.
        </p>

        {/* Car-secured callout */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.2)' }}>
          <div className="font-bold mb-2" style={{ color: '#d97706' }}>🚗 If you own a car — read this first</div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#78716c' }}>
            A car-secured credit card like Yendo uses your <strong style={{ color: '#1c1917' }}>vehicle equity</strong> — not your FICO score — to determine your credit limit. That means a 500, 480, even a 420 score doesn't automatically disqualify you. It's the most realistic path to a real revolving Visa card with a high limit if you have poor credit and own a car.
          </p>
          <AffiliateLink href={YENDO_500_HERO} placement="500-score-guide-hero" className="btn-primary text-sm py-2.5 px-6 inline-block">
            Check If My Car Qualifies →
          </AffiliateLink>
          <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>Soft inquiry only · Affiliate link · No score impact</p>
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>What a 500 Score Actually Means for Approval</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          A 500 FICO score falls in the "poor" range (300–579). Most major credit card issuers set their minimum somewhere between 580 and 640. That puts a 500 score below the threshold for most cards — including many that market themselves as "for bad credit."
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          That doesn't mean there are zero options. It means the standard path (apply for a credit card, get approved) is closed. You need to use a different path — one that either bypasses the credit check entirely, uses collateral instead of your score, or requires a cash deposit.
        </p>

        <h2 className="text-2xl font-black mb-6" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Ranked Options at a 500 Score</h2>

        <div className="space-y-5 mb-12">
          {[
            {
              rank: 1,
              name: 'Car-Secured Credit Card (Yendo)',
              minScore: 'No minimum',
              deposit: 'None',
              limit: '$500–$10,000',
              bestFor: 'Vehicle owners with poor/no credit',
              body: 'Yendo uses your car\'s equity as collateral instead of your credit score. No cash deposit. No minimum FICO. You keep driving your car. The limit is based on your vehicle\'s value, not your financial history. Highest potential limit of any option available to 500-score applicants.',
              highlight: true,
            },
            {
              rank: 2,
              name: 'OpenSky Secured Visa',
              minScore: 'None required',
              deposit: '$200+',
              limit: 'Equals deposit',
              bestFor: 'No bank account required',
              body: 'OpenSky does no credit check at all. You deposit $200 or more, and that becomes your limit. The $35/year fee is the main cost. Reports to all three bureaus. A reliable option if you don\'t have a car or can\'t qualify for Yendo.',
              highlight: false,
            },
            {
              rank: 3,
              name: 'Chime Credit Builder',
              minScore: 'None',
              deposit: 'Chime account balance',
              limit: 'Up to $10,000',
              bestFor: 'No annual fee, Chime users',
              body: 'No hard credit check. No interest. No annual fee. You move money into a secured account and spend against it. Requires a Chime spending account with direct deposit. If you\'re OK banking with Chime, this is an efficient option.',
              highlight: false,
            },
            {
              rank: 4,
              name: 'Self Credit Builder Account',
              minScore: '500+',
              deposit: 'N/A (credit builder loan)',
              limit: 'Builds toward $100–$150',
              bestFor: 'Credit-building focus',
              body: 'Not a credit card — it\'s a secured savings loan that builds credit history. You pay a small monthly amount, money goes into savings, you get the savings back at end of term. Slow but methodical path to building a credit file.',
              highlight: false,
            },
          ].map(card => (
            <div
              key={card.rank}
              className="rounded-2xl p-6"
              style={{
                background: card.highlight ? '#fef9ee' : 'white',
                border: card.highlight ? '1.5px solid rgba(217,119,6,0.25)' : '1px solid rgba(28,25,23,0.08)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="text-3xl font-black flex-shrink-0"
                  style={{ color: card.highlight ? '#d97706' : 'rgba(28,25,23,0.15)' }}
                >
                  #{card.rank}
                </div>
                <div className="flex-1">
                  <div className="font-black text-lg mb-3" style={{ color: '#1c1917' }}>{card.name}</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    {[
                      ['Min Score', card.minScore],
                      ['Deposit', card.deposit],
                      ['Credit Limit', card.limit],
                      ['Best For', card.bestFor],
                    ].map(([label, val]) => (
                      <div key={label as string}>
                        <div className="text-xs mb-0.5" style={{ color: '#a8a29e' }}>{label}</div>
                        <div className="text-sm font-semibold" style={{ color: '#1c1917' }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{card.body}</p>
                  {card.highlight && (
                    <AffiliateLink href={YENDO_500_CARD} placement="500-score-guide-card" className="btn-primary text-sm py-2 px-5 mt-4 inline-block">
                      Check If I Qualify →
                    </AffiliateLink>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Why a Higher Limit Matters More Than You Think</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Credit utilization — how much of your available credit you use — accounts for roughly 30% of your FICO score. If your only card has a $200 limit and you spend $150/month on it, you're at 75% utilization. That actively hurts your score.
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          If your car qualifies you for a $5,000 credit line and you spend the same $150, you're at 3% utilization. That actively helps your score. The size of the limit isn't just about spending power — it's a key lever for credit building.
        </p>

        <div className="rounded-2xl p-6 text-center mb-12" style={{ background: '#1c1917' }}>
          <h3 className="text-xl font-black text-white mb-2">Use Your Car to Skip the Score Barrier</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
            No credit score requirement. No deposit. Keep driving. Check eligibility in under 5 minutes.
          </p>
          <AffiliateLink href={YENDO_500_CTA} placement="500-score-guide-cta" className="btn-primary inline-block py-3 px-8">
            Check My Car's Eligibility →
          </AffiliateLink>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.28)' }}>Affiliate link · Soft inquiry only · Mintbrooks is not a lender</p>
        </div>

        {/* FAQ Section — triggers FAQPage rich snippet in Google */}
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-6" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="rounded-2xl p-5" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.06)' }}>
                <h3 className="font-bold mb-2" style={{ color: '#1c1917' }}>{q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-xs pt-8 leading-relaxed" style={{ color: '#a8a29e', borderTop: '1px solid rgba(28,25,23,0.07)' }}>
          Mintbrooks is an independent educational resource. Card details are based on publicly available information and may change. We may earn a commission when you apply through our links. This is not financial advice. Always verify terms directly with the card issuer.
        </div>
      
        <FinanceEmailCapture source="finance" />
      </article>
    </>
  )
}
