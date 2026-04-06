import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import {
  YENDO_CREDIT_BUILDER_HERO,
  YENDO_CREDIT_BUILDER_MID,
  YENDO_CREDIT_BUILDER_CTA,
  SLAM_DUNK_CREDIT_BUILDER,
} from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'Credit Builder Loan vs Car-Secured Credit Card — Which Builds Credit Faster?',
  description: 'Credit builder loans lock your money for 12–24 months. If you own a car, a car-secured credit card builds credit faster — starting today, not next year.',
  keywords: 'credit builder loan, credit builder loan vs secured card, build credit with bad credit, credit builder loan review, how credit builder loans work',
  alternates: { canonical: 'https://mintbrooks.com/credit-builder-loan' },
  openGraph: {
    title: 'Credit Builder Loan vs Car-Secured Credit Card — Which Builds Credit Faster?',
    description: 'If you own a car, skip the locked-up money. Build credit starting today.',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Credit Builder Loan vs Car-Secured Credit Card (2026)',
  description: 'Compare credit builder loans to car-secured credit cards. Which builds credit faster for bad-credit borrowers?',
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
      name: 'What is a credit builder loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "A credit builder loan holds borrowed money in a locked savings account while you make monthly payments. You don't receive the funds until the loan is paid off — typically 12 to 24 months. The lender reports your payments to credit bureaus, which builds your credit score over time.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do credit builder loans actually work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — credit builder loans do build credit, but slowly. The CFPB found that people with no credit history who completed a credit builder loan saw scores improve by an average of 60 points over 12 months. The catch: your money is locked away the entire time.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get a credit builder loan with bad credit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most credit builder loans are specifically designed for bad credit or no credit. There is typically no hard credit pull to apply. However, you must have a steady income to qualify — lenders need confidence you can make monthly payments.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a car-secured credit card better than a credit builder loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "If you own a car, a car-secured credit card like Yendo is often a better option. You get a real Visa credit card today — no money locked up — and Yendo reports to all three credit bureaus just like a credit builder loan. The key difference: you can actually use the card for purchases while building credit.",
      },
    },
    {
      '@type': 'Question',
      name: "What if I don't own a car?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Without a car, a credit builder loan or a traditional secured credit card (which requires a cash deposit) are your best options. Credit unions typically offer the lowest-cost credit builder loans — many with APRs under 10%. Self and Credit Strong are popular online alternatives.",
      },
    },
  ],
}

const comparisonRows = [
  { feature: 'Who can apply', creditBuilder: 'Any income, no car required', carSecured: 'Must own a car' },
  { feature: 'Upfront cash required', creditBuilder: 'No cash needed (loan funds go to savings)', carSecured: 'No cash deposit — car is the collateral' },
  { feature: 'Access to funds', creditBuilder: '❌ Money locked for 12–24 months', carSecured: '✅ Spend on credit card immediately' },
  { feature: 'Credit bureau reporting', creditBuilder: '✅ All 3 bureaus (Equifax, Experian, TransUnion)', carSecured: '✅ All 3 bureaus' },
  { feature: 'Hard credit pull', creditBuilder: 'Usually none', carSecured: 'None to check eligibility' },
  { feature: 'Typical time to see score improvement', creditBuilder: '6–12 months', carSecured: '3–6 months (utilization reports monthly)' },
  { feature: 'Credit limit / loan amount', creditBuilder: '$300–$1,000 typical', carSecured: '$500–$10,000 based on car value' },
  { feature: 'Annual fee', creditBuilder: '$0–$25 typical', carSecured: 'Yendo: $0 annual fee' },
  { feature: 'Can be used for purchases', creditBuilder: '❌ No — savings account only', carSecured: '✅ Visa accepted everywhere' },
  { feature: 'Works in excluded states', creditBuilder: '✅ All 50 states', carSecured: '37 states + DC only (Yendo)' },
]

export default function CreditBuilderLoanPage() {
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

      <main className="max-w-3xl mx-auto px-4 py-12 text-stone-200">

        {/* Hero */}
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3 block">
            Credit Building Guide
          </span>
          <h1 className="text-4xl font-black text-white leading-tight mb-4">
            Credit Builder Loan vs Car-Secured Credit Card:<br />
            Which Actually Builds Credit Faster?
          </h1>
          <p className="text-xl text-stone-300 leading-relaxed mb-6">
            Credit builder loans lock your money for up to two years while you wait for your score to move.
            If you own a car, there&apos;s a faster path — one that gives you a real Visa card today.
          </p>
          <div className="bg-stone-800 border border-amber-500/30 rounded-xl p-5 mb-6">
            <p className="text-sm text-amber-300 font-semibold mb-1">TL;DR — The Quick Answer</p>
            <p className="text-stone-200 text-sm">
              Credit builder loans work, but slowly. If you own a car, a car-secured credit card (Yendo)
              builds credit faster <em>and</em> gives you spending power now — no money locked up.
              If you don&apos;t own a car, a credit builder loan from a credit union is your best bet.
            </p>
          </div>
          <AffiliateLink
            href={YENDO_CREDIT_BUILDER_HERO}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold px-6 py-3 rounded-lg text-sm transition-colors"
            placement="credit-builder-hero"
          >
            Check If My Car Qualifies — No Credit Pull →
          </AffiliateLink>
        </div>

        {/* What is a credit builder loan */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">What Is a Credit Builder Loan?</h2>
          <p className="text-stone-300 mb-4">
            A credit builder loan is designed for people with bad credit or no credit history.
            Here&apos;s how it works:
          </p>
          <ol className="list-decimal list-inside space-y-3 text-stone-300 mb-4 ml-2">
            <li>You apply (usually no hard credit check)</li>
            <li>The lender approves a loan for $300–$1,000</li>
            <li>The money goes into a <strong className="text-white">locked savings account</strong> — you can&apos;t touch it</li>
            <li>You make monthly payments for 12–24 months</li>
            <li>The lender reports every payment to all 3 credit bureaus</li>
            <li>After the loan is paid off, you receive the savings (minus interest and fees)</li>
          </ol>
          <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-5">
            <p className="text-red-300 font-semibold text-sm mb-1">The catch</p>
            <p className="text-stone-300 text-sm">
              You&apos;re paying interest on money you can&apos;t access for up to two years. The CFPB found
              that the average credit builder loan costs borrowers $6–$19 in interest per $100 borrowed
              over the loan term — essentially paying to build your own savings account.
            </p>
          </div>
        </section>

        {/* Side-by-side comparison */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            Credit Builder Loan vs Car-Secured Credit Card: Full Comparison
          </h2>
          <div className="overflow-x-auto rounded-xl border border-stone-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-800">
                  <th className="text-left py-3 px-4 text-stone-400 font-semibold">Feature</th>
                  <th className="text-left py-3 px-4 text-stone-300 font-semibold">Credit Builder Loan</th>
                  <th className="text-left py-3 px-4 text-amber-400 font-semibold">Car-Secured Card (Yendo)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-stone-900' : 'bg-stone-800/50'}>
                    <td className="py-3 px-4 text-stone-400 font-medium">{row.feature}</td>
                    <td className="py-3 px-4 text-stone-300">{row.creditBuilder}</td>
                    <td className="py-3 px-4 text-stone-200">{row.carSecured}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Why car owners should skip the credit builder loan */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            If You Own a Car, Skip the Credit Builder Loan
          </h2>
          <p className="text-stone-300 mb-4">
            The entire purpose of a credit builder loan is to give lenders collateral. For a credit builder
            loan, the collateral is the savings account. For Yendo, the collateral is your car.
          </p>
          <p className="text-stone-300 mb-4">
            If you own a car, you already have collateral. You don&apos;t need to lock up $500–$1,000 in a
            savings account you can&apos;t touch. You can use your car equity to get a real Visa credit card
            — and actually use it.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Credit limit', value: 'Up to $10,000', sub: 'Based on car value' },
              { label: 'Reports to bureaus', value: 'All 3', sub: 'Equifax, Experian, TransUnion' },
              { label: 'Time to first card', value: '~5 days', sub: 'After approval' },
            ].map((stat) => (
              <div key={stat.label} className="bg-stone-800 border border-stone-700 rounded-xl p-4 text-center">
                <p className="text-xs text-stone-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-amber-400">{stat.value}</p>
                <p className="text-xs text-stone-500 mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>
          <AffiliateLink
            href={YENDO_CREDIT_BUILDER_MID}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold px-6 py-3 rounded-lg text-sm transition-colors"
            placement="credit-builder-mid"
          >
            See My Credit Limit in 2 Minutes →
          </AffiliateLink>
        </section>

        {/* Who should use a credit builder loan */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-4">
            When a Credit Builder Loan Is the Right Choice
          </h2>
          <p className="text-stone-300 mb-4">
            Credit builder loans make sense in specific situations:
          </p>
          <ul className="space-y-3 mb-4">
            {[
              { title: "You don't own a car", desc: "No car means no car-secured card. A credit builder loan or traditional secured card (cash deposit) are your alternatives." },
              { title: "Your state doesn't qualify for Yendo", desc: "Yendo is unavailable in 14 states (AK, HI, IA, LA, ME, MD, MA, MN, MO, NJ, NY, OK, SD, WI). Check the state guide for alternatives." },
              { title: "You want to force yourself to save", desc: "The locked structure of a credit builder loan doubles as a forced savings plan. You end up with cash at the end, which some people value." },
              { title: "You want to stack tradelines", desc: "Some credit-building strategies call for having both a credit card and an installment loan on your report. A credit builder loan adds an installment tradeline that complements a credit card." },
            ].map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="text-amber-400 font-bold mt-0.5">→</span>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-stone-400 text-sm">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="bg-stone-800 border border-stone-600 rounded-xl p-5">
            <p className="text-sm text-stone-300">
              <strong className="text-white">Don&apos;t live in a qualifying state?</strong>{' '}
              <Link href="/yendo-states-guide" className="text-amber-400 hover:underline">
                Check the Yendo state guide
              </Link>{' '}
              — there&apos;s a Slam Dunk Loans fallback for excluded states.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqJsonLd.mainEntity.map((faq) => (
              <div key={faq.name} className="border-b border-stone-700 pb-5">
                <h3 className="font-bold text-white mb-2">{faq.name}</h3>
                <p className="text-stone-300 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-amber-500/10 to-stone-800 border border-amber-500/30 rounded-2xl p-8 text-center mb-10">
          <h2 className="text-2xl font-black text-white mb-3">
            Own a Car? Check Your Credit Limit Now.
          </h2>
          <p className="text-stone-300 mb-6 text-sm max-w-md mx-auto">
            No hard credit pull to check eligibility. No cash deposit. Real Visa card — accepted everywhere.
            Builds credit from day one.
          </p>
          <AffiliateLink
            href={YENDO_CREDIT_BUILDER_CTA}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-900 font-black px-8 py-4 rounded-xl text-base transition-colors"
            placement="credit-builder-cta"
          >
            Check If My Car Qualifies →
          </AffiliateLink>
          <p className="text-xs text-stone-500 mt-3">
            Yendo is available in 37 states + DC.{' '}
            <Link href="/yendo-states-guide" className="underline hover:text-stone-400">
              Check your state.
            </Link>
          </p>
        </section>

        {/* No-car fallback */}
        <section className="bg-stone-800 border border-stone-700 rounded-xl p-5 mb-10">
          <p className="text-sm text-stone-400 mb-2">
            <strong className="text-stone-300">Don&apos;t own a car?</strong> Slam Dunk Loans offers
            personal loans up to $50,000 with any credit history welcome — no car required.
          </p>
          <AffiliateLink
            href={SLAM_DUNK_CREDIT_BUILDER}
            className="text-sm text-amber-400 hover:underline font-semibold"
            placement="credit-builder-slamdunk" offer="slamdunk"
          >
            See loan options without a car →
          </AffiliateLink>
        </section>

        {/* Internal links */}
        <section className="mb-10">
          <h3 className="text-lg font-bold text-white mb-4">Related Guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/how-to-build-credit-with-bad-credit', label: '7 Ways to Build Credit with Bad Credit' },
              { href: '/bad-credit-credit-card', label: 'Best Credit Cards for Bad Credit' },
              { href: '/credit-card-no-deposit', label: 'Credit Cards with No Deposit Required' },
              { href: '/yendo-states-guide', label: 'Is Yendo Available in Your State?' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 p-3 bg-stone-800 border border-stone-700 rounded-lg text-sm text-stone-300 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
              >
                <span className="text-amber-500">→</span> {link.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Disclosure */}
        <footer className="text-xs text-stone-600 border-t border-stone-800 pt-6">
          <p className="mb-2">
            <strong className="text-stone-500">Affiliate disclosure:</strong> Mintbrooks earns a commission
            when you click affiliate links and complete an application. This does not affect our editorial
            recommendations. We only feature products we believe serve our readers.
          </p>
          <p>
            Information is for educational purposes only and does not constitute financial advice.
            Credit outcomes vary. Review all terms before applying.
          </p>
        </footer>
      </main>
    </>
  )
}
