import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import FinanceEmailCapture from '@/components/FinanceEmailCapture'
import T3ProductLeadMagnet from '@/components/T3ProductLeadMagnet'
import T3LeadMagnetCreditCard from '@/components/T3LeadMagnetCreditCard'
import AffiliateLink from '@/components/AffiliateLink'
import FTCDisclosure from '@/components/FTCDisclosure'
import { YENDO_500_HERO, YENDO_500_CARD, YENDO_500_CTA } from '@/lib/affiliateUrls'

// Stripe checkout for Credit Sequence ($24 product)
const STRIPE_CHECKOUT_URL = 'https://buy.stripe.com/14AbJ10u5c6McBb6Fa08g01'

export const metadata: Metadata = {
  title: 'Credit Cards for 500 Credit Score (2026): Cards That Actually Approve',
  description: 'If your score is 500, here are cards with real approval odds — not aspirational lists. Secured and unsecured options ranked for 500-score applicants.',
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

const PAGE_URL = 'https://mintbrooks.com/finance/credit-card-500-credit-score'

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Credit Cards for 500 Credit Score (2026): Cards That Actually Approve',
    description: 'Realistic credit card options for people with 500 credit scores — ranked by approval odds.',
    datePublished: '2026-01-01',
    dateModified: '2026-04-05',
    url: PAGE_URL,
    mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
    image: {
      '@type': 'ImageObject',
      url: 'https://mintbrooks.com/lifestyle/editorial.jpg',
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Organization',
      name: 'Mintbrooks Editorial',
      url: 'https://mintbrooks.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mintbrooks',
      url: 'https://mintbrooks.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mintbrooks.com/lifestyle/logo.png',
      },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Mintbrooks', item: 'https://mintbrooks.com/' },
      { '@type': 'ListItem', position: 2, name: 'Finance', item: 'https://mintbrooks.com/finance' },
      { '@type': 'ListItem', position: 3, name: 'Credit Cards for 500 Credit Score' },
    ],
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
          Credit Cards for 500 Credit Score:<br />Cards That Actually Approve
        </h1>
        <FTCDisclosure />
        <p className="text-lg mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          Most lists of "credit cards for bad credit" include cards that will reject a 500 score in practice. This one doesn't.
        </p>

        <FinanceEmailCapture
          source="finance"
          headline="Before You Apply: Get The 500-Score Approval Checklist"
          subtext="The 7 things to fix in the next 30 minutes that decide whether your application gets auto-approved or auto-declined. Free, one email."
        />

        {/* Primary action — Yendo soft-pull (highest-value, zero-friction, free to the user) */}
        <div className="rounded-2xl p-6 mb-6" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.2)' }}>
          <div className="font-bold mb-2" style={{ color: '#d97706' }}>🚗 Own a car? This is your fastest real approval.</div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#78716c' }}>
            A car-secured credit card like Yendo uses your <strong style={{ color: '#1c1917' }}>vehicle equity</strong> — not your FICO score — to set your limit. A 500, 480, even a 420 score doesn't automatically disqualify you. It's the most realistic path to a real revolving Visa with a high limit if you have poor credit and own a car. The eligibility check is a <strong style={{ color: '#1c1917' }}>soft inquiry — it won't touch your score.</strong>
          </p>
          <AffiliateLink href={YENDO_500_HERO} placement="500-score-guide-hero" className="btn-primary text-sm py-2.5 px-6 inline-block">
            Check If My Car Qualifies → Free
          </AffiliateLink>
          <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>Soft inquiry only · Affiliate link · No score impact</p>
        </div>

        {/* Secondary offer — Stripe $24 product (the full playbook) */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: '#1c1917' }}>
          <div className="text-xs font-bold mb-2" style={{ color: '#B8955A', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Want the whole plan? · $24</div>
          <h3 className="text-xl font-black text-white mb-2">The 90-Day Money Reset</h3>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Every move in this guide — sequenced day-by-day, with the bureau scripts, the statement-closing-date trick, and the secured-vs-Yendo decision tree. Instant PDF. 60-day refund.
          </p>
          <a
            href={STRIPE_CHECKOUT_URL}
            className="btn-primary inline-block py-2.5 px-6 text-sm"
          >
            Get The 90-Day Reset → $24
          </a>
          <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Secure checkout via Stripe · One-time payment</p>
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

        <T3LeadMagnetCreditCard />

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Why a Higher Limit Matters More Than You Think</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Credit utilization — how much of your available credit you use — accounts for roughly 30% of your FICO score. If your only card has a $200 limit and you spend $150/month on it, you're at 75% utilization. That actively hurts your score.
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          If your car qualifies you for a $5,000 credit line and you spend the same $150, you're at 3% utilization. That actively helps your score. The size of the limit isn't just about spending power — it's a key lever for credit building.
        </p>

        <div className="rounded-2xl p-6 text-center mb-12" style={{ background: '#1c1917' }}>
          <div className="text-xs font-bold mb-2" style={{ color: '#B8955A', letterSpacing: '0.16em', textTransform: 'uppercase' }}>The full playbook · $24</div>
          <h3 className="text-xl font-black text-white mb-2">Get The 90-Day Credit Reset</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Every move in this guide — sequenced day-by-day, with bureau scripts, the statement-closing-date trick, and the secured-vs-Yendo decision tree. Instant PDF. 60-day refund.
          </p>
          <a
            href={STRIPE_CHECKOUT_URL}
            className="btn-primary inline-block py-3 px-8"
          >
            Get The 90-Day Reset → $24
          </a>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.28)' }}>Secure checkout via Stripe · One-time payment · 60-day refund</p>
        </div>

        {/* Internal link cluster — gives Googlebot a discovery path to the
            deep finance pages that are otherwise only reachable via sitemap. */}
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-6" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>
            Keep Reading: The Credit-Repair Sequence
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <Link href="/finance/1-percent-credit-utilization-rule" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>The 1% Utilization Rule</div>
              <div style={{ color: '#78716c' }}>Why $0 hurts and ~1% wins. The mechanism the bureaus don't publish.</div>
            </Link>
            <Link href="/finance/0-vs-1-utilization" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>0% vs 1% Utilization — Side by Side</div>
              <div style={{ color: '#78716c' }}>What each reports, the FICO impact, and the cost of zero.</div>
            </Link>
            <Link href="/finance/why-0-utilization-hurts-credit" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>Why 0% Utilization Hurts Credit</div>
              <div style={{ color: '#78716c' }}>The dormancy penalty and the all-zero file problem.</div>
            </Link>
            <Link href="/finance/statement-closing-date-trick" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>The Statement-Closing-Date Trick</div>
              <div style={{ color: '#78716c' }}>Time the snapshot, not the due date. The cheapest score lift.</div>
            </Link>
            <Link href="/finance/credit-sequence-order-of-operations" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>Credit Sequence — Order of Operations</div>
              <div style={{ color: '#78716c' }}>What to fix first, second, third — and the cost of skipping.</div>
            </Link>
            <Link href="/finance/utilization-calculator" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>1% Utilization Calculator</div>
              <div style={{ color: '#78716c' }}>Free tool — exact dollar to leave on your card. No signup.</div>
            </Link>
            <Link href="/finance/secured-credit-card-bad-credit" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>Secured Cards for Bad Credit</div>
              <div style={{ color: '#78716c' }}>The $200-deposit option — and the cash-free alternative for car owners.</div>
            </Link>
            <Link href="/finance/yendo-credit-card-review" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>Yendo Credit Card Review</div>
              <div style={{ color: '#78716c' }}>Car-equity-secured Visa with limits up to $10k at a 500 score.</div>
            </Link>
            <Link href="/finance/how-to-rebuild-credit" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>How To Rebuild Credit (in order)</div>
              <div style={{ color: '#78716c' }}>The 90-day order of operations most credit-repair guides skip.</div>
            </Link>
            <Link href="/finance/does-applying-for-credit-card-hurt-credit" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>Does Applying Hurt Your Score?</div>
              <div style={{ color: '#78716c' }}>The hard-pull math, the 14-day rule, and the soft-pull workaround.</div>
            </Link>
            <Link href="/products/90-day-money-reset" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>The 90-Day Money Reset</div>
              <div style={{ color: '#78716c' }}>Full PDF — every move, in order. $24, instant, 60-day refund.</div>
            </Link>
          </div>
        </section>

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

        <T3ProductLeadMagnet
          product="The 90-Day Money Reset"
          price="$24"
          productUrl="/products/90-day-money-reset"
          productDescr="Full PDF guide — every move, in order. Instant download. 60-day refund."
        />

        <div className="text-xs pt-8 leading-relaxed" style={{ color: '#a8a29e', borderTop: '1px solid rgba(28,25,23,0.07)' }}>
          Mintbrooks is an independent educational resource. Card details are based on publicly available information and may change. We may earn a commission when you apply through our links. This is not financial advice. Always verify terms directly with the card issuer.
        </div>
      </article>
    </>
  )
}
