import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import {
  YENDO_SECURED_HERO,
  YENDO_SECURED_MID,
  YENDO_SECURED_CTA,
  SLAM_DUNK_SECURED,
} from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'What Credit Score Do You Need for a Credit Card? (2026) — Mintbrooks',
  description:
    'Most credit cards want a 670+ score. But there are real options if your score is 300–580 — including one that doesn\'t use your credit score at all.',
  keywords:
    'what credit score do you need for a credit card, minimum credit score credit card, credit card with 500 credit score, credit card with 400 credit score, credit card no credit score',
  alternates: {
    canonical: 'https://mintbrooks.com/finance/what-credit-score-do-you-need-for-a-credit-card',
  },
  openGraph: {
    title: 'What Credit Score Do You Need for a Credit Card? (2026)',
    description:
      'The real minimums — and one option that doesn\'t care about your score at all if you own a car.',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What Credit Score Do You Need for a Credit Card? (2026)',
  description:
    'Credit score requirements by card type — and the car-secured option that has no score minimum.',
  datePublished: '2026-04-08',
  dateModified: '2026-04-08',
  author: { '@type': 'Organization', name: 'Mintbrooks' },
  publisher: {
    '@type': 'Organization',
    name: 'Mintbrooks',
    url: 'https://mintbrooks.com',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the minimum credit score to get a credit card?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For most unsecured credit cards, you need a score of at least 580–620 (fair credit). Premium rewards cards typically require 670+. However, secured credit cards and car-secured credit cards can be approved with scores as low as 300 — or even no credit score at all.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get a credit card with a 500 credit score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Secured credit cards (which require a cash deposit) are available to applicants with scores around 300–580. If you own a paid-off car, Yendo offers a Visa credit card secured by your vehicle\'s equity — with no minimum credit score requirement and no cash deposit needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What credit card can I get with no credit history?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With no credit history you have two main options: (1) a secured credit card backed by a $200–$500 cash deposit, or (2) if you own a car with no outstanding loan, a car-secured credit card like Yendo that uses your vehicle\'s equity instead of your credit history.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does applying for a credit card hurt your credit score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A hard inquiry from a credit card application can temporarily drop your score by 2–5 points. However, some cards — including Yendo\'s eligibility check — use a soft inquiry that does NOT affect your score. If you\'re approved and use the card responsibly, the long-term credit-building benefit far outweighs the short-term dip.',
      },
    },
  ],
}

export default function WhatCreditScorePage() {
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
      <main className="min-h-screen bg-stone-950 text-stone-100">
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-4 pt-16 pb-10">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Credit Card Guide
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
            What Credit Score Do You Need for a Credit Card?
          </h1>
          <p className="text-stone-300 text-lg leading-relaxed mb-6">
            Most credit cards want a 670+ score. But if your score is lower — or you have no
            credit history at all — there are real options. One of them doesn&apos;t use your
            credit score at all.
          </p>
          <p className="text-stone-400 text-sm">Updated April 2026 · Affiliate disclosure below</p>
        </section>

        {/* Score breakdown table */}
        <section className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-white mb-5">
            Credit Score Requirements by Card Type
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-stone-800 text-stone-300">
                  <th className="text-left px-4 py-3 font-semibold">Card Type</th>
                  <th className="text-left px-4 py-3 font-semibold">Min Score</th>
                  <th className="text-left px-4 py-3 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    type: 'Premium rewards (Chase Sapphire, Amex Gold)',
                    score: '720+',
                    note: 'Good to excellent credit required',
                  },
                  {
                    type: 'Standard unsecured cards',
                    score: '670+',
                    note: 'Fair credit minimum for most issuers',
                  },
                  {
                    type: 'Credit-builder unsecured cards',
                    score: '580+',
                    note: 'Higher APR, lower limits',
                  },
                  {
                    type: 'Secured cards (cash deposit)',
                    score: '300–580',
                    note: '$200–$500 cash deposit required',
                  },
                  {
                    type: 'Car-secured card (Yendo)',
                    score: 'None',
                    note: 'Uses car equity — no score minimum, no deposit',
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? 'bg-stone-900' : 'bg-stone-950'}
                  >
                    <td className="px-4 py-3 text-stone-200">{row.type}</td>
                    <td className="px-4 py-3 font-semibold text-amber-400">{row.score}</td>
                    <td className="px-4 py-3 text-stone-400">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Option for bad credit */}
        <section className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Score Under 580? Here&apos;s What Works
          </h2>
          <p className="text-stone-300 leading-relaxed mb-4">
            Standard credit cards will reject you if your score is below 580–620. But two
            categories are designed specifically for this range:
          </p>

          <h3 className="text-lg font-bold text-white mt-6 mb-2">
            Option 1: Secured Credit Card
          </h3>
          <p className="text-stone-300 leading-relaxed mb-4">
            You put down a cash deposit — usually $200 to $500 — which becomes your credit
            limit. The bank holds it while you use the card. After 12–18 months of on-time
            payments, many issuers return the deposit and upgrade you to an unsecured card.
          </p>
          <p className="text-stone-400 text-sm mb-6">
            Downside: Your money is tied up. If you need $300 for an emergency, that deposit
            is unavailable until you close or graduate the account.
          </p>

          <h3 className="text-lg font-bold text-white mt-6 mb-2">
            Option 2: Car-Secured Credit Card (No Score Minimum)
          </h3>
          <p className="text-stone-300 leading-relaxed mb-4">
            If you own a car with no outstanding loan,{' '}
            <strong className="text-white">Yendo</strong> is a Visa credit card that uses
            your vehicle&apos;s equity as collateral instead of your credit history. Your
            score doesn&apos;t factor into approval — your car&apos;s value does.
          </p>
          <ul className="text-stone-300 space-y-2 mb-6">
            {[
              'No cash deposit required',
              'Credit limit: $500–$10,000 based on car value',
              'Soft-pull eligibility check (no score impact)',
              'Reports to all 3 credit bureaus monthly',
              'You keep driving your car normally',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="bg-stone-900 border border-stone-700 rounded-xl p-6 my-6">
            <p className="text-white font-bold text-lg mb-2">
              Check if your car qualifies — takes 60 seconds
            </p>
            <p className="text-stone-400 text-sm mb-4">
              Soft pull only. Won&apos;t affect your credit score.
            </p>
            <AffiliateLink
              href={YENDO_SECURED_HERO}
              className="block w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-center py-4 rounded-lg text-lg transition-colors"
            >
              See If I Qualify →
            </AffiliateLink>
            <p className="text-stone-500 text-xs text-center mt-3">
              Mintbrooks earns a referral fee if you apply. No cost to you.
            </p>
          </div>
        </section>

        {/* Approval odds by score */}
        <section className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-white mb-5">
            Approval Odds by Credit Score Range
          </h2>
          <div className="space-y-4">
            {[
              {
                range: '720–850 (Excellent)',
                odds: 'Very high',
                options: 'All card types available',
                bar: 'w-full',
                color: 'bg-emerald-500',
              },
              {
                range: '670–719 (Good)',
                odds: 'High',
                options: 'Most unsecured + rewards cards',
                bar: 'w-5/6',
                color: 'bg-emerald-500',
              },
              {
                range: '580–669 (Fair)',
                odds: 'Moderate',
                options: 'Credit-builder unsecured + secured',
                bar: 'w-3/5',
                color: 'bg-amber-500',
              },
              {
                range: '300–579 (Poor)',
                odds: 'Low for unsecured',
                options: 'Secured cards + car-secured card',
                bar: 'w-1/3',
                color: 'bg-amber-500',
              },
              {
                range: 'No credit history',
                odds: 'Very low for most',
                options: 'Student cards, secured, or car-secured',
                bar: 'w-1/5',
                color: 'bg-red-500',
              },
            ].map((row, i) => (
              <div key={i} className="bg-stone-900 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold text-sm">{row.range}</span>
                  <span className="text-stone-400 text-xs">{row.odds}</span>
                </div>
                <div className="h-2 bg-stone-700 rounded-full mb-2">
                  <div className={`h-2 rounded-full ${row.bar} ${row.color}`} />
                </div>
                <p className="text-stone-400 text-xs">{row.options}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to improve score */}
        <section className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            How to Build Credit From Scratch
          </h2>
          <p className="text-stone-300 leading-relaxed mb-4">
            Whether you start with a secured card or a car-secured card, the credit-building
            mechanics are the same:
          </p>
          <ol className="space-y-4">
            {[
              {
                step: '1. Get a card that reports to all 3 bureaus',
                detail:
                  'Not all cards report to Equifax, Experian, and TransUnion. Verify before applying.',
              },
              {
                step: '2. Keep utilization below 30%',
                detail:
                  'If your limit is $500, keep your balance under $150. This is the second-biggest scoring factor after payment history.',
              },
              {
                step: '3. Pay on time, every time',
                detail:
                  'Payment history is 35% of your FICO score. Even one missed payment can drop your score by 60–110 points.',
              },
              {
                step: '4. Don\'t close old accounts',
                detail:
                  'Length of credit history matters. Keep your first card open even after you graduate to better products.',
              },
              {
                step: '5. Monitor your credit monthly',
                detail:
                  'Use Credit Karma (free) or AnnualCreditReport.com to track progress and catch errors.',
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-4 bg-stone-900 rounded-lg p-4">
                <span className="text-amber-400 font-black text-2xl leading-none">{i + 1}</span>
                <div>
                  <p className="text-white font-semibold mb-1">{item.step}</p>
                  <p className="text-stone-400 text-sm">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Mid-page CTA */}
        <section className="max-w-3xl mx-auto px-4 py-6">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
            <p className="text-amber-400 font-bold mb-2">Own a paid-off car?</p>
            <p className="text-stone-300 text-sm mb-4">
              Skip the cash deposit. Use your car&apos;s equity to qualify for a Visa card —
              regardless of your credit score.
            </p>
            <AffiliateLink
              href={YENDO_SECURED_MID}
              className="inline-block bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-6 py-3 rounded-lg transition-colors"
            >
              Check My Car&apos;s Qualification →
            </AffiliateLink>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'What is the minimum credit score to get a credit card?',
                a: 'For standard unsecured cards, you typically need 580–620. For secured cards, scores as low as 300 are accepted. Car-secured cards like Yendo have no minimum score — they use your car\'s equity instead.',
              },
              {
                q: 'Can I get a credit card with a 500 credit score?',
                a: 'Yes — secured credit cards (cash deposit required) are available at 500. If you own a paid-off car, Yendo\'s car-secured card has no score minimum at all.',
              },
              {
                q: 'What credit card can I get with no credit history?',
                a: 'Student secured cards, standard secured cards, or — if you own a car outright — a car-secured card. The car-secured option tends to have higher credit limits and no cash tied up.',
              },
              {
                q: 'Does applying for a credit card hurt your credit score?',
                a: 'A hard inquiry can temporarily drop your score 2–5 points. Yendo\'s eligibility check is a soft pull — no score impact. Only a full application creates a hard inquiry.',
              },
            ].map((item, i) => (
              <details key={i} className="bg-stone-900 rounded-lg group">
                <summary className="px-5 py-4 text-white font-semibold cursor-pointer list-none flex justify-between items-center">
                  {item.q}
                  <span className="text-amber-400 text-xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-4 text-stone-300 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-3xl mx-auto px-4 py-10">
          <div className="bg-stone-900 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-black text-white mb-3">
              Your Score Isn&apos;t the Final Word
            </h2>
            <p className="text-stone-300 mb-6 max-w-lg mx-auto">
              If you own a car, your credit history matters less than you think. Check if
              your vehicle qualifies for a Visa credit card — 60 seconds, soft pull only.
            </p>
            <AffiliateLink
              href={YENDO_SECURED_CTA}
              className="inline-block bg-amber-500 hover:bg-amber-400 text-stone-950 font-black px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Check My Car&apos;s Value →
            </AffiliateLink>
            <p className="text-stone-500 text-xs mt-3">
              Not available in all states.{' '}
              <Link
                href="/finance/yendo-states-guide"
                className="text-stone-400 underline hover:text-white"
              >
                Check your state →
              </Link>
            </p>
          </div>
        </section>

        {/* Internal links */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h3 className="text-lg font-bold text-stone-300 mb-4">Related Guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                href: '/finance/secured-credit-card-bad-credit',
                label: 'Best Secured Cards for Bad Credit',
              },
              {
                href: '/finance/credit-card-no-deposit',
                label: 'Credit Cards With No Cash Deposit',
              },
              {
                href: '/finance/how-to-rebuild-credit',
                label: 'How to Rebuild Credit Fast',
              },
              {
                href: '/finance/yendo-credit-card-review',
                label: 'Yendo Car-Secured Card Review',
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-stone-900 hover:bg-stone-800 px-4 py-3 rounded-lg text-stone-300 hover:text-white text-sm transition-colors"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </section>

        {/* FTC Disclosure */}
        <footer className="max-w-3xl mx-auto px-4 pb-10">
          <p className="text-stone-500 text-xs leading-relaxed border-t border-stone-800 pt-6">
            <strong>Affiliate Disclosure:</strong> Mintbrooks earns a commission when you
            apply through our links. This does not increase your cost. We only feature products
            we&apos;d recommend regardless of compensation. All information is for educational
            purposes and does not constitute financial advice.
          </p>
        </footer>
      </main>
    </>
  )
}
