import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import {
  YENDO_HOMEPAGE_HERO,
  SLAM_DUNK_HOMEPAGE_FOOTER,
} from '@/lib/affiliateUrls'
import { buildAffiliateUrl, OFFERS } from '@/lib/offers'

const YENDO_AUTO_EQUITY_HERO  = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'auto-equity-loan-hero')
const YENDO_AUTO_EQUITY_MID   = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'auto-equity-loan-mid')
const YENDO_AUTO_EQUITY_CTA   = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo', 'auto-equity-loan-cta')
const SLAM_DUNK_AUTO_EQUITY   = buildAffiliateUrl(OFFERS.slamDunk.url, 'organic', 'seo', 'auto-equity-loan-fallback')

export const metadata: Metadata = {
  title: 'Auto Equity Loan Alternative — Use Your Car for Revolving Credit (2026)',
  description: 'An auto equity loan gives you a lump sum and charges daily interest. A car-secured credit card gives you up to $10,000 in revolving credit — pay only what you use. No hard credit pull to check eligibility.',
  keywords: 'auto equity loan, car equity loan, auto equity credit, car equity line of credit, use car equity for credit, auto equity bad credit',
  alternates: { canonical: 'https://mintbrooks.com/auto-equity-loan' },
  openGraph: {
    title: 'Auto Equity Loan Alternative — Revolving Credit With Your Car (2026)',
    description: 'Skip the lump-sum auto equity loan. Get a revolving Visa credit line using your car — soft pull only, no cash deposit.',
    type: 'article',
    url: 'https://mintbrooks.com/auto-equity-loan',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Auto Equity Loan vs. Car-Secured Credit Card: Which Is Better?',
  description: 'Comparing auto equity loans to car-secured credit cards — costs, flexibility, risk, and which option fits bad credit borrowers.',
  url: 'https://mintbrooks.com/auto-equity-loan',
  author: { '@type': 'Organization', name: 'Mintbrooks' },
  datePublished: '2026-04-06',
  dateModified: '2026-04-06',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an auto equity loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An auto equity loan lets you borrow against the value of your car. You receive a lump sum, make fixed monthly payments, and risk losing your car if you default. Some lenders require good credit; others accept bad credit but charge very high interest.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get an auto equity loan with bad credit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some lenders offer auto equity loans for bad credit, but rates can reach 25–35% APR. A car-secured credit card (like Yendo) uses your car equity differently — your car is collateral for a revolving credit line, with no hard credit pull required to check eligibility.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between an auto equity loan and a car-secured credit card?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An auto equity loan is a one-time lump sum with fixed repayment. A car-secured credit card is a revolving credit line — you borrow what you need, repay, and borrow again. You only pay interest on what you use, and the credit line stays open as you pay it down.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do auto equity loans hurt your credit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most auto equity loan applications trigger a hard credit inquiry, which can temporarily lower your score by 5–10 points. Yendo\'s car-secured credit card uses a soft pull to check eligibility, so checking whether you qualify does not affect your credit score.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much can I borrow with an auto equity loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most lenders let you borrow 70–90% of your car\'s current market value. Yendo\'s car-secured credit card provides up to $10,000 in revolving credit based on your vehicle equity — available in 36+ states.',
      },
    },
  ],
}

const comparison = [
  { feature: 'Credit type',           equityLoan: 'Lump-sum loan',          carCard: 'Revolving credit line' },
  { feature: 'You pay interest on',   equityLoan: 'Full loan amount',        carCard: 'Only what you spend' },
  { feature: 'Credit check',          equityLoan: 'Hard pull (score drops)', carCard: 'Soft pull only' },
  { feature: 'Monthly payment',       equityLoan: 'Fixed (required)',        carCard: 'Flexible (pay min or more)' },
  { feature: 'Credit limit reuse',    equityLoan: 'No — one-time loan',      carCard: 'Yes — revolving line' },
  { feature: 'Builds credit history', equityLoan: 'Some lenders report',     carCard: 'Reports to all 3 bureaus' },
  { feature: 'Risk if you default',   equityLoan: 'Repossession possible',   carCard: 'Account closed, balance due' },
  { feature: 'Cash deposit required', equityLoan: 'No',                      carCard: 'No — car is the collateral' },
  { feature: 'Application speed',     equityLoan: '1–5 business days',       carCard: 'Online, minutes' },
  { feature: 'Available with 500 score', equityLoan: 'Rarely',              carCard: 'Yes — score not the primary factor' },
]

export default function AutoEquityLoanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <NavBar />
      <article className="max-w-3xl mx-auto px-4 py-14">

        {/* Breadcrumb */}
        <nav className="text-xs mb-6 flex items-center gap-2" style={{ color: '#a8a29e' }}>
          <Link href="/" className="hover:text-amber-700 transition-colors">Mintbrooks</Link>
          <span>›</span>
          <Link href="/bad-credit-credit-card" className="hover:text-amber-700 transition-colors">Bad Credit Cards</Link>
          <span>›</span>
          <span>Auto Equity Loan</span>
        </nav>

        <div className="section-label mb-3">Guide</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>
          Auto Equity Loan vs. Car-Secured Credit Card: Which Actually Helps?
        </h1>

        <p className="text-lg mb-3" style={{ color: '#57534e' }}>
          An auto equity loan sounds straightforward — borrow against your car, get cash. But there's a version that gives you more flexibility, builds your credit, and doesn't require a hard credit pull. Here's how the two options compare.
        </p>
        <p className="text-sm mb-8" style={{ color: '#a8a29e' }}>
          Updated April 2026 · <em>Affiliate disclosure: Mintbrooks may earn a commission if you apply through our links.</em>
        </p>

        {/* Hero CTA */}
        <div className="rounded-2xl p-6 mb-10 border" style={{ background: '#fafaf9', borderColor: '#e7e5e4' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: '#78716c' }}>Skip the lump-sum loan</p>
          <p className="text-xl font-black mb-2" style={{ color: '#1c1917' }}>Use Your Car Equity for a Revolving Credit Line</p>
          <p className="text-sm mb-4" style={{ color: '#57534e' }}>
            Up to $10,000 in revolving Visa credit. Soft pull only. No cash deposit. Available in 36+ states.
          </p>
          <AffiliateLink
            href={YENDO_AUTO_EQUITY_HERO}
            className="inline-block w-full text-center font-bold py-3 px-6 rounded-xl text-white transition-colors"
            style={{ background: '#d97706' }}
            placement="auto-equity-loan"
          >
            Check If My Car Qualifies →
          </AffiliateLink>
          <p className="text-xs mt-2 text-center" style={{ color: '#a8a29e' }}>
            Soft credit pull only — checking eligibility won't affect your score.
          </p>
        </div>

        {/* What Is an Auto Equity Loan */}
        <h2 className="text-2xl font-black mb-3" style={{ color: '#1c1917' }}>What Is an Auto Equity Loan?</h2>
        <p className="mb-4" style={{ color: '#57534e' }}>
          An auto equity loan (sometimes called a car equity loan or vehicle equity loan) lets you borrow a lump sum of cash using your car as collateral. You make fixed monthly payments over a set term — typically 12 to 60 months — and pay interest on the full loan amount from day one.
        </p>
        <p className="mb-6" style={{ color: '#57534e' }}>
          If you already own your car outright or have significant equity in it, you may qualify even with bad credit. But most lenders still run a hard credit inquiry, and APRs for subprime borrowers routinely hit 25–35%.
        </p>

        {/* What Is a Car-Secured Credit Card */}
        <h2 className="text-2xl font-black mb-3" style={{ color: '#1c1917' }}>What Is a Car-Secured Credit Card?</h2>
        <p className="mb-4" style={{ color: '#57534e' }}>
          A car-secured credit card works differently. Instead of a one-time loan, your car equity backs a revolving credit line — like a regular credit card, but secured by your vehicle instead of a cash deposit.
        </p>
        <p className="mb-4" style={{ color: '#57534e' }}>
          The biggest difference: <strong>you only pay interest on what you actually spend.</strong> If you have a $5,000 credit line and spend $300 this month, you only owe interest on $300 — not the full $5,000.
        </p>
        <p className="mb-6" style={{ color: '#57534e' }}>
          <Link href="/yendo-credit-card-review" className="font-medium hover:underline" style={{ color: '#d97706' }}>Yendo</Link> is currently the main provider offering this type of product in the U.S., with limits up to $10,000 and availability in 36+ states. They use a soft credit pull to check eligibility, so your score isn't affected just by checking.
        </p>

        {/* Comparison table */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917' }}>Auto Equity Loan vs. Car-Secured Credit Card</h2>
        <div className="overflow-x-auto mb-10">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ borderBottom: '2px solid #e7e5e4' }}>
                <th className="py-3 pr-4 text-left font-semibold" style={{ color: '#78716c' }}>Feature</th>
                <th className="py-3 px-4 text-center font-semibold" style={{ color: '#78716c' }}>Auto Equity Loan</th>
                <th className="py-3 pl-4 text-center font-semibold" style={{ color: '#d97706' }}>Car-Secured Card</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f5f5f4', background: i % 2 === 0 ? '#fafaf9' : 'white' }}>
                  <td className="py-3 pr-4 font-medium" style={{ color: '#1c1917' }}>{row.feature}</td>
                  <td className="py-3 px-4 text-center" style={{ color: '#57534e' }}>{row.equityLoan}</td>
                  <td className="py-3 pl-4 text-center font-medium" style={{ color: '#15803d' }}>{row.carCard}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mid-page CTA */}
        <div className="rounded-xl p-5 mb-10 border-l-4" style={{ background: '#fffbeb', borderColor: '#d97706' }}>
          <p className="font-semibold mb-1" style={{ color: '#92400e' }}>Own a car? You may already qualify.</p>
          <p className="text-sm mb-3" style={{ color: '#78716c' }}>
            Yendo's car-secured Visa credit card uses your vehicle equity instead of a cash deposit. Check eligibility in minutes — no hard credit pull.
          </p>
          <AffiliateLink
            href={YENDO_AUTO_EQUITY_MID}
            className="inline-block font-bold py-2 px-5 rounded-lg text-white text-sm"
            style={{ background: '#d97706' }}
            placement="auto-equity-loan"
          >
            See If I Qualify →
          </AffiliateLink>
        </div>

        {/* When an auto equity loan makes sense */}
        <h2 className="text-2xl font-black mb-3" style={{ color: '#1c1917' }}>When Does an Auto Equity Loan Make Sense?</h2>
        <p className="mb-3" style={{ color: '#57534e' }}>An auto equity loan may be the right choice if:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2" style={{ color: '#57534e' }}>
          <li>You need a <strong>large one-time cash amount</strong> (home repair, medical bill) that exceeds typical credit card limits.</li>
          <li>You prefer <strong>fixed monthly payments</strong> and a set payoff date.</li>
          <li>You already have decent credit (680+) and can qualify for a competitive rate below 15%.</li>
        </ul>

        {/* When the car-secured card wins */}
        <h2 className="text-2xl font-black mb-3" style={{ color: '#1c1917' }}>When the Car-Secured Credit Card Wins</h2>
        <p className="mb-3" style={{ color: '#57534e' }}>A car-secured credit card is typically the better option when:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2" style={{ color: '#57534e' }}>
          <li>You have <strong>bad credit or no credit history</strong> and can't qualify for a traditional loan at a reasonable rate.</li>
          <li>You want <strong>revolving access</strong> — spend, repay, and use the credit again as needed.</li>
          <li>You're trying to <strong>build credit</strong> — the card reports to all three bureaus each month.</li>
          <li>You want to <strong>avoid a hard credit inquiry</strong> just to check eligibility.</li>
          <li>You don't need a large one-time lump sum — just accessible credit for everyday purchases and emergencies.</li>
        </ul>

        {/* States section */}
        <h2 className="text-2xl font-black mb-3" style={{ color: '#1c1917' }}>Is the Car-Secured Credit Card Available in Your State?</h2>
        <p className="mb-4" style={{ color: '#57534e' }}>
          Yendo currently operates in 36+ states. If you're in an excluded state, there are strong personal loan alternatives that also don't require excellent credit.
        </p>
        <p className="mb-8" style={{ color: '#57534e' }}>
          <Link href="/yendo-states-guide" className="font-medium hover:underline" style={{ color: '#d97706' }}>
            Check your state's eligibility →
          </Link>
        </p>

        {/* FAQ */}
        <h2 className="text-2xl font-black mb-6" style={{ color: '#1c1917' }}>Frequently Asked Questions</h2>
        <div className="space-y-6 mb-12">
          {faqJsonLd.mainEntity.map((item, i) => (
            <div key={i} className="border-b pb-5" style={{ borderColor: '#f5f5f4' }}>
              <h3 className="font-bold mb-2" style={{ color: '#1c1917' }}>{item.name}</h3>
              <p className="text-sm" style={{ color: '#57534e' }}>{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="rounded-2xl p-7 text-center mb-10" style={{ background: '#1c1917', color: 'white' }}>
          <h2 className="text-2xl font-black mb-2">Ready to Use Your Car's Equity?</h2>
          <p className="text-sm mb-5" style={{ color: '#a8a29e' }}>
            Check if your car qualifies for a revolving Visa credit line — no hard pull, no cash deposit required.
          </p>
          <AffiliateLink
            href={YENDO_AUTO_EQUITY_CTA}
            className="inline-block font-bold py-3 px-8 rounded-xl text-white"
            style={{ background: '#d97706' }}
            placement="auto-equity-loan"
          >
            Check My Car's Eligibility →
          </AffiliateLink>
          <p className="text-xs mt-3" style={{ color: '#78716c' }}>
            Not available in your state?{' '}
            <AffiliateLink href={SLAM_DUNK_AUTO_EQUITY} className="underline" style={{ color: '#d97706' }} placement="auto-equity-loan">
              See personal loan alternatives
            </AffiliateLink>
          </p>
        </div>

        {/* Related guides */}
        <div className="border-t pt-8" style={{ borderColor: '#e7e5e4' }}>
          <h3 className="font-semibold mb-4" style={{ color: '#78716c' }}>Related Guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/car-title-loan-alternative',      title: 'Car Title Loan Alternative',           desc: 'Keep your title — use car equity for a credit line instead.' },
              { href: '/secured-credit-card-bad-credit',  title: 'Secured Credit Cards for Bad Credit',  desc: 'Skip the cash deposit. Use your car instead.' },
              { href: '/credit-builder-loan',             title: 'Credit Builder Loans vs. Credit Cards', desc: 'Which actually builds credit faster?' },
              { href: '/yendo-states-guide',              title: 'Yendo State Availability',              desc: 'Check if the car-secured card is available where you live.' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-xl p-4 border transition-colors hover:border-amber-400"
                style={{ borderColor: '#e7e5e4' }}
              >
                <div className="font-semibold text-sm mb-1" style={{ color: '#1c1917' }}>{link.title}</div>
                <div className="text-xs" style={{ color: '#78716c' }}>{link.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 pt-6 border-t text-xs" style={{ borderColor: '#e7e5e4', color: '#a8a29e' }}>
          <strong className="text-stone-500">Affiliate disclosure:</strong> Mintbrooks may earn a commission when you apply through our links at no extra cost to you. We are not a lender, bank, or credit card issuer. This content is for educational purposes only. Always verify current terms directly with the product provider.
        </div>

      </article>
    </>
  )
}
