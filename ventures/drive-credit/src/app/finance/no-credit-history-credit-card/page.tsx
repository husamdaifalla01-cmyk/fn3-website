import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import { YENDO_NO_CREDIT_HERO, YENDO_NO_CREDIT_CARD, YENDO_NO_CREDIT_CTA } from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'Credit Card with No Credit History: Your Real Options — Mintbrooks',
  description: 'No credit history? Here are the cards and products that actually approve applicants with no file — including options with no credit check.',
  alternates: { canonical: 'https://mintbrooks.com/no-credit-history-credit-card' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Credit Card with No Credit History: Your Real Options',
  description: 'Guide to credit cards and credit products for people with no credit history.',
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
          <span>No Credit History</span>
        </nav>

        <div className="section-label mb-3">Credit Guide</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>
          Credit Card with No Credit History:<br />What Actually Works
        </h1>
        <p className="text-lg mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          Having no credit history is different from having bad credit — but most lenders treat it the same way. Here's what's actually available to you.
        </p>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Why No Credit History Is a Problem</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Credit scores require a credit file. No file means no score — and most card issuers use scores to make decisions. Without a score, even people with steady income and no history of missed payments get declined.
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          This is sometimes called the "credit catch-22": you need credit to build credit. The solution is to find products that don't rely on credit history to approve you.
        </p>

        <div className="rounded-2xl p-6 mb-10" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.2)' }}>
          <div className="font-bold mb-2" style={{ color: '#d97706' }}>🚗 Own a car? This changes everything.</div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#78716c' }}>
            A car-secured card like Yendo uses your <strong style={{ color: '#1c1917' }}>vehicle equity</strong> to determine your credit limit — not your FICO score or credit history. Zero history doesn't disqualify you. If your car has value, you may qualify.
          </p>
          <AffiliateLink href={YENDO_NO_CREDIT_HERO} placement="no-credit-guide-hero" className="btn-primary text-sm py-2.5 px-6 inline-block">
            Check If My Car Qualifies →
          </AffiliateLink>
          <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>Soft inquiry only · Affiliate link · No credit history required</p>
        </div>

        <h2 className="text-2xl font-black mb-6" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Options When You Have No Credit History</h2>

        <div className="space-y-5 mb-12">
          {[
            {
              rank: 1,
              name: 'Car-Secured Credit Card (Yendo)',
              requirement: 'No credit file needed',
              deposit: 'None',
              limit: '$500–$10,000+',
              bestFor: 'Vehicle owners, any credit history',
              body: 'Uses your car\'s equity instead of your credit history. No FICO score needed, no cash deposit. Your vehicle title acts as collateral for a revolving Visa card. Reports to all three bureaus — actively builds your credit file from day one.',
              highlight: true,
            },
            {
              rank: 2,
              name: 'Secured Credit Card (OpenSky, Capital One)',
              requirement: 'No file needed for some',
              deposit: '$200–$500',
              limit: 'Equals deposit',
              bestFor: 'Building first credit file',
              body: 'You deposit cash and that becomes your credit limit. OpenSky does no credit check at all. Capital One Secured may approve thin files. The deposit reduces lender risk enough to get approved. Reports to bureaus, which builds your history.',
              highlight: false,
            },
            {
              rank: 3,
              name: 'Become an Authorized User',
              requirement: 'Need a trustworthy cardholder',
              deposit: 'None',
              limit: 'Account holder\'s limit',
              bestFor: 'Fastest way to get a score',
              body: 'Ask a family member with good credit to add you as an authorized user. Their account history shows up on your credit report and instantly creates a score. You may not even need the physical card. This is the fastest path to an initial score.',
              highlight: false,
            },
            {
              rank: 4,
              name: 'Credit-Builder Loan (Self, Credit Strong)',
              requirement: 'No credit file needed',
              deposit: 'N/A',
              limit: 'N/A',
              bestFor: 'Methodical credit building',
              body: 'Not a credit card, but builds credit history. You make monthly payments into a savings account — at end of term you get the money back. Self reports monthly to all three bureaus. Takes 6–12 months to establish meaningful history.',
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
                      ['Requirement', card.requirement],
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
                    <AffiliateLink href={YENDO_NO_CREDIT_CARD} placement="no-credit-guide-card" className="btn-primary text-sm py-2 px-5 mt-4 inline-block">
                      Check If I Qualify →
                    </AffiliateLink>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>How Fast Can You Build a Score?</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Credit bureaus need at least one account reporting for 6 months before they can generate a FICO score. With a car-secured card or secured card, you could have a usable score in 6–12 months.
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          The fastest path: combine becoming an authorized user (for an instant starting score) with opening your own account (to build independent history). Within 12 months, most people in this situation reach 650–700 with responsible use.
        </p>

        <div className="rounded-2xl p-6 text-center mb-12" style={{ background: '#1c1917' }}>
          <h3 className="text-xl font-black text-white mb-2">Start Building Without a Credit File</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
            No credit history required. Check car eligibility in under 5 minutes.
          </p>
          <AffiliateLink href={YENDO_NO_CREDIT_CTA} placement="no-credit-guide-cta" className="btn-primary inline-block py-3 px-8">
            Check My Car's Eligibility →
          </AffiliateLink>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.28)' }}>Affiliate link · Soft inquiry only · Mintbrooks is not a lender</p>
        </div>

        <div className="text-xs pt-8 leading-relaxed" style={{ color: '#a8a29e', borderTop: '1px solid rgba(28,25,23,0.07)' }}>
          Mintbrooks is an independent educational resource. Card details are based on publicly available information and may change. We may earn a commission when you apply through our links. This is not financial advice. Always verify terms directly with the card issuer.
        </div>
      </article>
    </>
  )
}
