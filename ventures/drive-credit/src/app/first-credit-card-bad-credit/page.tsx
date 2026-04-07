import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import {
  YENDO_FIRST_CARD_HERO,
  YENDO_FIRST_CARD_MID,
  YENDO_FIRST_CARD_CTA,
  SLAM_DUNK_FIRST_CARD,
} from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'First Credit Card With Bad Credit — What Actually Works in 2026',
  description: 'Getting your first credit card with bad credit is possible. Learn which options work, which to avoid, and how a car-secured card beats traditional secured cards.',
  keywords: 'first credit card bad credit, first credit card no credit history, how to get first credit card, best first credit card bad credit, first time credit card bad credit',
  alternates: { canonical: 'https://mintbrooks.com/first-credit-card-bad-credit' },
  openGraph: {
    title: 'First Credit Card With Bad Credit — What Actually Works in 2026',
    description: 'Stop paying deposits. If you own a car, you already have the collateral you need for your first card.',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'First Credit Card With Bad Credit (2026 Guide)',
  description: 'A complete guide to getting your first credit card when you have bad credit or no credit history — including car-secured cards, secured cards, and store cards.',
  datePublished: '2026-04-07',
  dateModified: '2026-04-07',
  author: { '@type': 'Organization', name: 'Mintbrooks' },
  publisher: { '@type': 'Organization', name: 'Mintbrooks', url: 'https://mintbrooks.com' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What credit score do I need to get my first credit card?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most traditional credit cards require a score of 580 or higher. However, secured cards and car-secured cards like Yendo are designed specifically for people with bad credit or no credit history — they typically accept scores below 580 because your collateral (a deposit or your car) reduces the lender\'s risk.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the easiest first credit card to get with bad credit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The easiest first credit cards for bad credit are secured cards (require a cash deposit) and car-secured cards (use your car\'s equity instead of cash). Car-secured cards like Yendo are often easier to get because you don\'t need to come up with $200–$500 in upfront cash — your car is already your collateral.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does a car-secured credit card work for first-time applicants?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A car-secured credit card uses your vehicle\'s equity as collateral instead of requiring a cash security deposit. You keep driving your car normally. The lender places a lien on the title (similar to a car loan), and your credit limit is based on your car\'s value — typically $500 to $10,000. Yendo reports to all three credit bureaus monthly, so you build credit just like any other card.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does applying for a first credit card hurt your credit score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Traditional card applications trigger a hard inquiry, which can temporarily drop your score 5–10 points. Car-secured cards like Yendo use a soft pull to check eligibility, so checking if you qualify does not affect your credit score at all. A hard pull only happens if you proceed with a full application.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build credit with a first credit card?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most people see a measurable credit score increase within 3–6 months of responsible use — keeping utilization below 30% and paying on time every month. Secured and car-secured cards report to credit bureaus just like regular cards, so the timeline is the same. Some people graduate to an unsecured card within 12–18 months.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I avoid when getting my first credit card with bad credit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Avoid cards with extremely high annual fees (over $75/year), credit-repair scams that promise to "fix" your score instantly, predatory subprime cards with 36%+ APR and low limits, and any card that charges a fee just to apply. Stick to regulated issuers that report to all three bureaus.',
      },
    },
  ],
}

const comparisonRows = [
  { feature: 'Upfront deposit required', traditional: '$200–$500 cash', carSecured: 'None — use your car' },
  { feature: 'Typical credit limit', traditional: '$200–$500', carSecured: '$500–$10,000' },
  { feature: 'Credit score needed', traditional: '580+ preferred', carSecured: 'Any — car equity matters more' },
  { feature: 'Reports to bureaus', traditional: 'Yes (all 3)', carSecured: 'Yes (all 3)' },
  { feature: 'Hard pull to check eligibility', traditional: 'Usually yes', carSecured: 'No — soft pull only' },
  { feature: 'Cash back / rewards', traditional: 'Rarely on starter cards', carSecured: 'Varies by issuer' },
  { feature: 'Can upgrade to unsecured', traditional: 'Yes (6–18 months)', carSecured: 'Yes' },
  { feature: 'Annual fee', traditional: '$25–$75', carSecured: 'Varies' },
  { feature: 'Available in all states', traditional: 'Usually yes', carSecured: '37 states (see state guide)' },
]

export default function FirstCreditCardBadCreditPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <NavBar />

      <main className="min-h-screen" style={{ background: '#1c1917', color: '#e7e5e4' }}>

        {/* Hero */}
        <section className="max-w-3xl mx-auto px-4 pt-16 pb-10">
          <p className="text-sm font-semibold mb-3" style={{ color: '#d97706', letterSpacing: '0.08em' }}>
            FIRST CREDIT CARD GUIDE
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-5 leading-tight text-white">
            Your First Credit Card With Bad Credit
          </h1>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Getting rejected hurts. But there are cards designed for exactly your situation — and if you own a car, you have an advantage most people don&apos;t know about.
          </p>
          <AffiliateLink
            href={YENDO_FIRST_CARD_HERO}
            placement="first-card-hero"
            offer="yendo"
            className="inline-block px-8 py-4 rounded-xl font-bold text-white text-base transition-all hover:opacity-90 active:scale-95"
            style={{ background: '#d97706' }}
          >
            Check If My Car Qualifies →
          </AffiliateLink>
          <p className="mt-3 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Soft pull only — no credit score impact
          </p>
        </section>

        {/* What is a "first" credit card */}
        <section className="max-w-3xl mx-auto px-4 py-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <h2 className="text-2xl font-black text-white mb-4">
            Why Getting Your First Card Is Harder (And What to Do About It)
          </h2>
          <p className="mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Traditional credit card issuers use your credit score to decide if you&apos;ll repay them. If you have bad credit or no credit history, they have no evidence either way — so they say no.
          </p>
          <p className="mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
            The way out is <strong className="text-white">collateral-based lending</strong>: give the lender something valuable as security, and they&apos;ll approve you regardless of your credit score. There are two main ways to do this:
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex gap-3">
              <span className="mt-1 text-sm font-bold" style={{ color: '#d97706' }}>1.</span>
              <div>
                <strong className="text-white">Traditional secured card:</strong>{' '}
                <span style={{ color: 'rgba(255,255,255,0.65)' }}>You put down $200–$500 in cash as a deposit. Your credit limit equals your deposit. The cash sits in a locked account until you close the card or upgrade.</span>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="mt-1 text-sm font-bold" style={{ color: '#d97706' }}>2.</span>
              <div>
                <strong className="text-white">Car-secured card:</strong>{' '}
                <span style={{ color: 'rgba(255,255,255,0.65)' }}>Your car&apos;s equity acts as collateral — no cash deposit needed. You keep driving your car. Your credit limit is based on the car&apos;s value, often $1,000–$10,000.</span>
              </div>
            </li>
          </ul>
          <p style={{ color: 'rgba(255,255,255,0.65)' }}>
            Both options work for bad credit. The difference is your car collateral typically unlocks a higher limit without tying up hundreds of dollars in cash.
          </p>
        </section>

        {/* Comparison table */}
        <section className="max-w-3xl mx-auto px-4 py-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <h2 className="text-2xl font-black text-white mb-6">
            Secured Card vs Car-Secured Card: Side by Side
          </h2>
          <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <th className="text-left px-4 py-3 font-semibold text-white">Feature</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>Traditional Secured Card</th>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: '#d97706' }}>Car-Secured Card (Yendo)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}
                  >
                    <td className="px-4 py-3 text-white font-medium">{row.feature}</td>
                    <td className="px-4 py-3" style={{ color: 'rgba(255,255,255,0.55)' }}>{row.traditional}</td>
                    <td className="px-4 py-3 font-semibold" style={{ color: '#34d399' }}>{row.carSecured}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            #ad — Mintbrooks may earn a commission if you apply through our links.
          </p>
        </section>

        {/* Mid CTA */}
        <section className="max-w-3xl mx-auto px-4 py-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div
            className="rounded-2xl p-7"
            style={{ background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.2)' }}
          >
            <h3 className="text-xl font-black text-white mb-2">Own a car? Skip the cash deposit.</h3>
            <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Yendo uses your car as collateral — no $200–$500 deposit required. Check if you qualify in 2 minutes. Soft pull only.
            </p>
            <AffiliateLink
              href={YENDO_FIRST_CARD_MID}
              placement="first-card-mid"
              offer="yendo"
              className="inline-block px-7 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 active:scale-95"
              style={{ background: '#d97706' }}
            >
              See If My Car Qualifies →
            </AffiliateLink>
          </div>
        </section>

        {/* Step-by-step guide */}
        <section className="max-w-3xl mx-auto px-4 py-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <h2 className="text-2xl font-black text-white mb-6">
            How to Get Your First Credit Card With Bad Credit: Step by Step
          </h2>
          <ol className="space-y-6">
            {[
              {
                n: '01',
                title: 'Check if you own a qualifying car',
                body: 'If you own a car outright (or nearly paid off), you likely qualify for a car-secured card. Most makes and models qualify — the lender cares about the car\'s value, not the brand. If you don\'t own a car, go straight to step 3.',
              },
              {
                n: '02',
                title: 'Apply for a car-secured card (no deposit needed)',
                body: 'Car-secured cards like Yendo check your eligibility with a soft pull — this does not affect your credit score. You\'ll answer a few questions about your car and income. Approval can happen in minutes.',
              },
              {
                n: '03',
                title: 'No car? Apply for a traditional secured card',
                body: 'Traditional secured cards are your next best option. Capital One Secured, Discover it Secured, and OpenSky are all designed for bad/no credit. You\'ll need $200–$500 for the deposit, which you get back when you close or upgrade the card.',
              },
              {
                n: '04',
                title: 'Use the card for small, planned purchases',
                body: 'Credit scores improve fastest when you keep utilization below 30% of your limit. If your limit is $1,000, aim to never carry more than $300 at statement close. Pay the full balance every month to avoid interest.',
              },
              {
                n: '05',
                title: 'Pay on time — every time',
                body: 'Payment history is 35% of your FICO score. One missed payment can drop your score 50–100 points. Set up autopay for at least the minimum payment, then pay the rest manually if needed.',
              },
              {
                n: '06',
                title: 'Request a limit increase or upgrade after 6–12 months',
                body: 'After 6 months of on-time payments and low utilization, most issuers will raise your limit or let you graduate to an unsecured card. This improves your score further by increasing available credit.',
              },
            ].map((step) => (
              <li key={step.n} className="flex gap-5">
                <span className="text-2xl font-black flex-shrink-0 mt-0.5" style={{ color: '#d97706', fontVariantNumeric: 'tabular-nums' }}>
                  {step.n}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)' }}>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* What to avoid */}
        <section className="max-w-3xl mx-auto px-4 py-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <h2 className="text-2xl font-black text-white mb-5">
            What to Avoid When Getting Your First Card
          </h2>
          <div className="space-y-4">
            {[
              {
                flag: 'High annual fees on starter cards',
                detail: 'Some subprime cards charge $75–$100/year with a $300 credit limit. That\'s 25–33% of your available credit consumed immediately. Stick to cards with annual fees under $40 or none at all.',
              },
              {
                flag: 'Credit repair scams',
                detail: '"Guaranteed approval" or "remove all negatives from your report" promises are scams. You cannot pay someone to improve your credit faster than time and good behavior can.',
              },
              {
                flag: 'Multiple applications at once',
                detail: 'Each hard pull drops your score 5–10 points. If you apply for 4 cards in a week, you\'ve already hurt the score you\'re trying to build. Apply for one, wait for a decision, then move to the next if needed.',
              },
              {
                flag: 'Maxing out your first card',
                detail: 'High utilization (over 50%) is the fastest way to stall your credit progress. Even if you pay the balance in full each month, what\'s reported at statement close is what counts. Keep it under 30%.',
              },
            ].map((item) => (
              <div
                key={item.flag}
                className="rounded-xl p-5"
                style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}
              >
                <p className="font-bold text-white mb-1">⚠ {item.flag}</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 py-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <h2 className="text-2xl font-black text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqJsonLd.mainEntity.map((item) => (
              <div key={item.name} className="border-b pb-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-3xl mx-auto px-4 py-12 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <h2 className="text-2xl font-black text-white mb-3">
            Ready to Get Your First Card?
          </h2>
          <p className="mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
            If you own a car, check your eligibility in 2 minutes — no credit score impact. If you&apos;re not in a qualifying state, we&apos;ll show you the next best option.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <AffiliateLink
              href={YENDO_FIRST_CARD_CTA}
              placement="first-card-cta"
              offer="yendo"
              className="px-7 py-4 rounded-xl font-bold text-white text-base text-center transition-all hover:opacity-90 active:scale-95"
              style={{ background: '#d97706' }}
            >
              Check If My Car Qualifies →
            </AffiliateLink>
            <AffiliateLink
              href={SLAM_DUNK_FIRST_CARD}
              placement="first-card-fallback"
              offer="slamDunk"
              className="px-7 py-4 rounded-xl font-bold text-base text-center transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              No car? See Loan Options →
            </AffiliateLink>
          </div>
          <p className="mt-3 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            #ad — Mintbrooks may earn a commission from referrals. Results not guaranteed.
          </p>
        </section>

        {/* Related guides */}
        <section className="max-w-3xl mx-auto px-4 py-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <h2 className="text-xl font-black text-white mb-5">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/how-to-rebuild-credit', label: 'How to Rebuild Credit Fast' },
              { href: '/secured-credit-card-bad-credit', label: 'Best Secured Cards for Bad Credit' },
              { href: '/credit-builder-loan', label: 'Credit Builder Loan vs Car-Secured Card' },
              { href: '/yendo-review', label: 'Yendo Car-Secured Card — Full Review' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-xl p-4 transition-all hover:opacity-80"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <span className="text-sm font-semibold text-white">{link.label}</span>
                <span className="block text-xs mt-1" style={{ color: '#d97706' }}>Read guide →</span>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </>
  )
}
