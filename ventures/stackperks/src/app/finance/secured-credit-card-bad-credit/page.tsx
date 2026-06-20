import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import MoneyResetCTA from '@/components/MoneyResetCTA'
import {
  YENDO_SECURED_HERO,
  YENDO_SECURED_MID,
  YENDO_SECURED_CTA,
  SLAM_DUNK_SECURED,
} from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'Best Secured Credit Cards for Bad Credit (2026) — No Deposit Required Option',
  description: 'Most secured credit cards require a $200–$500 cash deposit you can\'t touch. If you own a car, there\'s a better option — use your car\'s equity instead of cash.',
  keywords: 'secured credit card bad credit, best secured credit card bad credit, secured credit card no deposit, secured credit card 500 credit score, secured card for rebuilding credit',
  alternates: { canonical: 'https://mintbrooks.com/secured-credit-card-bad-credit' },
  openGraph: {
    title: 'Best Secured Credit Cards for Bad Credit (2026)',
    description: 'Skip the cash deposit. If you own a car, use your car\'s equity to qualify for a Visa credit card — no cash tied up.',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best Secured Credit Cards for Bad Credit (2026)',
  description: 'Compare secured credit card options for bad credit — including the cash-deposit alternative for car owners.',
  datePublished: '2026-04-06',
  dateModified: '2026-04-06',
  author: { '@type': 'Organization', name: 'Mintbrooks' },
  publisher: { '@type': 'Organization', name: 'Mintbrooks', url: 'https://mintbrooks.com' },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a secured credit card?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A secured credit card requires a cash deposit — typically $200 to $500 — that becomes your credit limit. The deposit is held by the bank as collateral. You use the card like a normal credit card and the bank reports your payments to credit bureaus, which builds your credit score over time. The deposit is refunded if you close the account in good standing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get a secured credit card with a 500 credit score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Most secured credit cards are specifically designed for bad credit scores — including scores as low as 300. Because the card is backed by a deposit (or, in some cases, your car\'s equity), the lender takes on minimal risk. The approval bar is significantly lower than unsecured cards.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a secured credit card that doesn\'t require a deposit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — if you own a car. Yendo is a Visa credit card secured by your vehicle\'s equity instead of a cash deposit. Your credit limit ($500–$10,000) is based on your car\'s value, not your bank account. You keep driving your car normally and there\'s no cash tied up. The initial eligibility check is a soft inquiry that doesn\'t affect your credit score.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build credit with a secured card?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most people see meaningful credit score improvements within 6 to 12 months of responsible secured card use. The key factors are: paying on time every month (most important), keeping your balance below 30% of your limit, and not opening multiple new accounts at once. Secured cards that report to all three bureaus (Equifax, Experian, TransUnion) build credit faster than those that report to only one.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum deposit for a secured credit card?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most secured credit cards require a minimum deposit of $200 to $300. Some cards (like Capital One Secured) allow a $49 minimum for qualified applicants. Higher deposits typically unlock higher credit limits. If you own a car and want to avoid tying up cash entirely, Yendo uses your car\'s equity instead of a deposit.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do secured credit cards build credit fast?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Secured credit cards build credit at the same pace as any other credit card — they\'re not faster or slower. What matters is: (1) paying on time every month, (2) keeping utilization below 30%, and (3) the card reporting to all 3 bureaus. Most people see measurable improvement within 3–6 months of consistent use.',
      },
    },
  ],
}

const securedCards = [
  {
    name: 'Yendo Car-Secured Visa',
    deposit: 'None (car equity)',
    limit: '$500–$10,000',
    annualFee: 'Varies',
    bureaus: 'All 3',
    noHardPull: true,
    bestFor: 'Car owners with bad credit',
    highlight: true,
  },
  {
    name: 'Capital One Secured Mastercard',
    deposit: '$49–$200',
    limit: '$200 (upgradeable)',
    annualFee: '$0',
    bureaus: 'All 3',
    noHardPull: false,
    bestFor: 'Low deposit with upgrade path',
    highlight: false,
  },
  {
    name: 'Discover it Secured',
    deposit: '$200 minimum',
    limit: '= deposit amount',
    annualFee: '$0',
    bureaus: 'All 3',
    noHardPull: false,
    bestFor: 'Cash back rewards + credit building',
    highlight: false,
  },
  {
    name: 'OpenSky Secured Visa',
    deposit: '$200 minimum',
    limit: '= deposit amount',
    annualFee: '$35',
    bureaus: 'All 3',
    noHardPull: true,
    bestFor: 'No credit check required',
    highlight: false,
  },
  {
    name: 'Chime Credit Builder',
    deposit: '$0 (uses direct deposit)',
    limit: 'Based on transfers',
    annualFee: '$0',
    bureaus: 'All 3',
    noHardPull: true,
    bestFor: 'No deposit, needs Chime account',
    highlight: false,
  },
]

export default function SecuredCreditCardBadCreditPage() {
  return (
    <>
      <NavBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="min-h-screen bg-stone-950 text-stone-100">
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-4 pt-16 pb-10">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Secured Credit Cards · Bad Credit Guide
          </p>
          <h1 className="text-4xl font-black text-white leading-tight mb-5">
            The Problem With Most Secured Credit Cards
          </h1>
          <p className="text-stone-300 text-lg mb-6">
            Secured credit cards are supposed to be the path out of bad credit. But there&apos;s a catch no one mentions upfront: <strong className="text-white">they lock up $200 to $500 of your cash</strong> as a deposit — money you can&apos;t touch for 12+ months.
          </p>
          <p className="text-stone-300 text-lg mb-8">
            If your credit is bad, cash is likely tight too. There&apos;s a better option — if you own a car.
          </p>
          <AffiliateLink
            href={YENDO_SECURED_HERO}
            offer="yendo"
            placement="secured-card-hero"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            See If My Car Qualifies — No Hard Pull
          </AffiliateLink>
          <p className="text-stone-500 text-sm mt-3">
            Soft inquiry only. Your score won&apos;t change.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="max-w-4xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-black text-white mb-2">Secured Credit Card Comparison (2026)</h2>
          <p className="text-stone-400 mb-6">
            Including the no-deposit option for car owners.
          </p>
          <div className="overflow-x-auto rounded-xl border border-stone-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-800 text-stone-300">
                  <th className="text-left px-4 py-3 font-semibold">Card</th>
                  <th className="text-left px-4 py-3 font-semibold">Deposit Required</th>
                  <th className="text-left px-4 py-3 font-semibold">Credit Limit</th>
                  <th className="text-left px-4 py-3 font-semibold">Annual Fee</th>
                  <th className="text-left px-4 py-3 font-semibold">Reports</th>
                  <th className="text-left px-4 py-3 font-semibold">Soft Pull?</th>
                </tr>
              </thead>
              <tbody>
                {securedCards.map((card, i) => (
                  <tr
                    key={i}
                    className={`border-t border-stone-700 ${card.highlight ? 'bg-amber-950/30' : i % 2 === 0 ? 'bg-stone-900' : 'bg-stone-950'}`}
                  >
                    <td className="px-4 py-3">
                      <span className={`font-semibold ${card.highlight ? 'text-amber-300' : 'text-white'}`}>
                        {card.highlight && '⭐ '}
                        {card.name}
                      </span>
                      {card.highlight && (
                        <span className="ml-2 bg-amber-500 text-black text-xs px-2 py-0.5 rounded font-bold">RECOMMENDED</span>
                      )}
                    </td>
                    <td className={`px-4 py-3 ${card.highlight ? 'text-emerald-400 font-semibold' : 'text-stone-300'}`}>
                      {card.deposit}
                    </td>
                    <td className="px-4 py-3 text-stone-300">{card.limit}</td>
                    <td className="px-4 py-3 text-stone-300">{card.annualFee}</td>
                    <td className="px-4 py-3 text-stone-300">{card.bureaus}</td>
                    <td className="px-4 py-3">
                      {card.noHardPull ? (
                        <span className="text-emerald-400 font-semibold">Yes ✓</span>
                      ) : (
                        <span className="text-stone-500">No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-stone-500 text-xs mt-3">
            Data current as of 2026. Verify terms directly with each issuer.{' '}
            <Link href="/disclaimer" className="underline hover:text-stone-400">Affiliate disclosure.</Link>
          </p>
        </section>

        {/* How Car-Secured Works */}
        <section className="max-w-3xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-black text-white mb-4">How a Car-Secured Card Eliminates the Deposit Problem</h2>
          <p className="text-stone-300 mb-4">
            Traditional secured cards use your cash as collateral. Yendo uses your car&apos;s equity instead. Your car is already paid for (or nearly so) — that value shouldn&apos;t sit unused.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { label: 'Traditional Secured Card', points: ['$200–$500 locked up', 'Can\'t touch deposit for 12+ months', 'Lower limit = lower credit utilization flexibility', 'Requires cash you may not have'] },
              { label: 'Yendo Car-Secured Visa', points: ['No cash deposit required', 'Use your car\'s equity instead', '$500–$10,000 limit based on vehicle value', 'Keep driving your car normally'] },
            ].map((col, i) => (
              <div key={i} className={`rounded-xl p-5 border ${i === 1 ? 'border-amber-600 bg-amber-950/20' : 'border-stone-700 bg-stone-900'}`}>
                <h3 className={`font-bold mb-3 ${i === 1 ? 'text-amber-300' : 'text-stone-300'}`}>{col.label}</h3>
                <ul className="space-y-2">
                  {col.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-stone-300">
                      <span className={i === 1 ? 'text-emerald-400' : 'text-stone-600'}>
                        {i === 1 ? '✓' : '✗'}
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <AffiliateLink
            href={YENDO_SECURED_MID}
            offer="yendo"
            placement="secured-card-mid"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Check If My Car Qualifies
          </AffiliateLink>
        </section>

        <section className="max-w-3xl mx-auto px-4">
          <MoneyResetCTA variant="mid" />
        </section>

        {/* What Makes a Good Secured Card */}
        <section className="max-w-3xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-black text-white mb-4">What to Look for in a Secured Card for Bad Credit</h2>
          <div className="space-y-5">
            {[
              { title: 'Reports to all 3 bureaus', desc: 'Equifax, Experian, and TransUnion. Some issuers only report to one or two — your score improves more slowly. Every card on this list reports to all three.' },
              { title: 'No annual fee (or low fee)', desc: 'Avoid secured cards with fees over $35/year. The Discover it Secured and Capital One Secured charge $0. A high annual fee reduces the value of a card you\'re using primarily to build credit.' },
              { title: 'Upgrade path to unsecured', desc: 'The best secured cards automatically review your account after 6–12 months and upgrade you to an unsecured card — returning your deposit. Capital One and Discover both offer this.' },
              { title: 'No credit check or soft pull only', desc: 'Hard inquiries temporarily lower your score by 5–10 points. OpenSky and Yendo both use soft pulls. If your score is borderline, this matters.' },
              { title: 'Deposit you can actually afford', desc: 'A $500 deposit on a $200/month budget is too much to lock away. Choose a card where the deposit (or no deposit) fits your current cash situation.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-500 text-black rounded-full flex items-center justify-center font-black text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-stone-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Who Should Use Which */}
        <section className="max-w-3xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-black text-white mb-4">Which Secured Card Is Right for You?</h2>
          <div className="space-y-4">
            {[
              { condition: 'You own a car (any year, any make)', recommendation: 'Yendo Car-Secured Visa', reason: 'No deposit, highest limit, soft pull only.' },
              { condition: 'You don\'t own a car but want $0 annual fee', recommendation: 'Capital One Secured or Discover it Secured', reason: 'Both offer upgrade paths and $0 fees.' },
              { condition: 'Your credit is below 500 and banks keep rejecting you', recommendation: 'OpenSky Secured Visa', reason: 'No credit check at all. $35 annual fee but guarantees approval.' },
              { condition: 'You want cash back while building credit', recommendation: 'Discover it Secured', reason: '2% cash back at gas/restaurants, 1% everywhere else.' },
              { condition: 'You want to avoid a deposit entirely (no car)', recommendation: 'Chime Credit Builder', reason: 'Requires a Chime bank account but no traditional deposit.' },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-stone-700 bg-stone-900 p-4">
                <p className="text-stone-400 text-sm mb-1">If: {item.condition}</p>
                <p className="text-white font-bold">→ {item.recommendation}</p>
                <p className="text-stone-500 text-sm mt-1">{item.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-black text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqJsonLd.mainEntity.map((faq, i) => (
              <div key={i}>
                <h3 className="font-bold text-white mb-2">{faq.name}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4">
          <MoneyResetCTA variant="end" />
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 py-14 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Skip the Deposit. Use Your Car Instead.</h2>
          <p className="text-stone-400 mb-2 max-w-xl mx-auto">
            If you own a car, Yendo gives you a real Visa credit card based on your car&apos;s equity — no cash deposit required. Check eligibility in 60 seconds.
          </p>
          <p className="text-stone-500 text-sm mb-8">Soft inquiry only. Your credit score is not affected.</p>
          <AffiliateLink
            href={YENDO_SECURED_CTA}
            offer="yendo"
            placement="secured-card-cta"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-bold px-10 py-4 rounded-xl text-lg transition-colors"
          >
            Check If My Car Qualifies
          </AffiliateLink>
          <p className="text-stone-600 text-xs mt-4">
            Don&apos;t own a car?{' '}
            <AffiliateLink
              href={SLAM_DUNK_SECURED}
              offer="slamDunk"
              placement="secured-card-fallback"
              className="text-stone-500 underline hover:text-stone-400"
            >
              See Slam Dunk Loans — personal loans for bad credit.
            </AffiliateLink>
          </p>
        </section>

        {/* Related Guides */}
        <section className="max-w-3xl mx-auto px-4 py-10 border-t border-stone-800">
          <h2 className="text-lg font-bold text-white mb-4">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/credit-builder-loan', label: 'Credit Builder Loans vs Car-Secured Cards' },
              { href: '/credit-card-500-credit-score', label: 'Credit Cards for 500 Credit Score' },
              { href: '/bad-credit-credit-card', label: 'Best Credit Cards for Bad Credit' },
              { href: '/car-equity-vs-secured-cards', label: 'Car Equity vs Traditional Secured Cards' },
              { href: '/how-to-build-credit-with-bad-credit', label: 'How to Build Credit with Bad Credit' },
              { href: '/qualify', label: 'Check If Your Car Qualifies for Yendo' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg border border-stone-700 bg-stone-900 px-4 py-3 text-sm text-stone-300 hover:text-white hover:border-stone-500 transition-colors"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </section>

        {/* Affiliate Disclosure */}
        <section className="max-w-3xl mx-auto px-4 py-8 border-t border-stone-800">
          <p className="text-stone-600 text-xs leading-relaxed">
            <strong className="text-stone-500">Affiliate disclosure:</strong> Mintbrooks may earn a commission when you apply through our links at no extra cost to you. We are not a lender, bank, or credit card issuer. This content is for educational purposes only. Always verify current terms directly with the card issuer.
          </p>
        </section>
      </main>
    </>
  )
}
