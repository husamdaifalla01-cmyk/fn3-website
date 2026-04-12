import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import MoneyResetCTA from '@/components/MoneyResetCTA'
import {
  YENDO_GUIDE_HERO,
  YENDO_GUIDE_MID,
  YENDO_GUIDE_CTA,
  SLAM_DUNK_GUIDE,
} from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'How to Rebuild Credit Fast in 2026 — Practical Steps That Actually Work',
  description: 'Rebuilding credit with bad credit takes strategy, not luck. This guide covers the fastest legal methods to raise your score — including one most people miss.',
  keywords: 'how to rebuild credit, rebuild credit fast, rebuild credit with bad credit, how to fix bad credit, credit repair steps, raise credit score bad credit',
  alternates: { canonical: 'https://mintbrooks.com/how-to-rebuild-credit' },
  openGraph: {
    title: 'How to Rebuild Credit Fast in 2026 — Practical Steps That Actually Work',
    description: 'Rebuild your credit score from bad or thin with these practical, zero-gimmick steps.',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Rebuild Credit Fast in 2026',
  description: 'A step-by-step guide to rebuilding credit with bad credit or no credit history.',
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
      name: 'How fast can I rebuild my credit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most people see meaningful improvement (30–50 points) within 6–12 months of consistent on-time payments. The fastest method is opening a new positive account and keeping utilization low — results show up within 1–2 billing cycles.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does rebuilding credit work if I have collections on my report?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can add positive accounts to your report even while old negative items exist. As positive items accumulate and negative items age (7 years for most), your score improves. You do not need a clean slate to start rebuilding.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the fastest way to rebuild credit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The fastest approach: open a secured or car-secured credit card, keep utilization under 10%, and pay on time every month. Each on-time payment is reported to all 3 bureaus. After 6–12 months you will have a meaningful positive track record.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I rebuild credit without a cash deposit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — if you own a car. Yendo offers a car-secured Visa card that uses your vehicle\'s equity instead of a cash deposit. You keep driving your car, and the card reports to all 3 credit bureaus monthly.',
      },
    },
  ],
}

export default function HowToRebuildCredit() {
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

      <main className="min-h-screen bg-stone-950 text-white">
        {/* Hero */}
        <section className="px-4 py-16 max-w-3xl mx-auto">
          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Credit Education
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6">
            How to Rebuild Credit Fast in 2026
          </h1>
          <p className="text-xl text-stone-300 leading-relaxed mb-8">
            Rebuilding credit with a bad score or thin file is not a mystery — it is a math problem.
            Every on-time payment adds a positive mark. Every new positive account improves your mix.
            The trick is starting, not waiting.
          </p>
          <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-5 mb-8">
            <p className="text-amber-300 font-semibold text-sm">
              📌 Own a car? Skip to Step 2 — there is a no-deposit method most guides miss entirely.
            </p>
          </div>
        </section>

        {/* The Core Strategy */}
        <section className="px-4 max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-4">The Two-Track Strategy</h2>
          <p className="text-stone-300 leading-relaxed mb-4">
            Credit scores are built from two things: what is already on your report (history you
            cannot change) and what you add going forward (history you control entirely).
          </p>
          <p className="text-stone-300 leading-relaxed mb-4">
            Rebuilding works on the second track. Old negative items age off in 7 years regardless.
            Your job is to add positive items faster than the negatives age — so that within 12–18
            months, the new positive pattern outweighs the old negative one.
          </p>
          <p className="text-stone-300 leading-relaxed">
            This is not credit repair in the traditional sense (disputing old items). This is credit
            building — adding real positive accounts that lenders see.
          </p>
        </section>

        {/* Step by Step */}
        <section className="px-4 max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-black mb-10">Step-by-Step Rebuild Plan</h2>

          {/* Step 1 */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-amber-400 text-stone-950 rounded-full flex items-center justify-center font-black text-lg">
                1
              </span>
              <h3 className="text-xl font-bold">Pull Your Free Credit Report</h3>
            </div>
            <p className="text-stone-300 leading-relaxed mb-4 ml-13">
              Before anything else, know exactly what you are working with. Go to AnnualCreditReport.com
              — the only federally mandated free report site — and download all three (Equifax,
              Experian, TransUnion). You get one free per bureau per week in 2026.
            </p>
            <p className="text-stone-300 leading-relaxed ml-13">
              Look for: (a) errors to dispute, (b) accounts in good standing you can keep using,
              (c) the age of your oldest account — this affects your score significantly.
            </p>
          </div>

          {/* Step 2 */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-amber-400 text-stone-950 rounded-full flex items-center justify-center font-black text-lg">
                2
              </span>
              <h3 className="text-xl font-bold">Open a New Reporting Credit Account</h3>
            </div>
            <p className="text-stone-300 leading-relaxed mb-4">
              This is the core of rebuilding. You need an account that reports to all 3 bureaus every
              month. Every on-time payment becomes a positive data point. Three options, ranked by
              accessibility:
            </p>

            <div className="space-y-4">
              {/* Option A */}
              <div className="bg-stone-900 rounded-xl p-5 border border-stone-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-400 font-bold text-sm uppercase tracking-wide">
                    Best if you own a car
                  </span>
                </div>
                <h4 className="font-bold text-lg mb-2">Car-Secured Credit Card (No Cash Deposit)</h4>
                <p className="text-stone-300 text-sm leading-relaxed mb-3">
                  Yendo offers a Visa credit card secured by your car&apos;s equity instead of a cash
                  deposit. You keep driving your car — it is not a title loan or collateral seizure.
                  Your credit limit ($500–$10,000) is based on your vehicle&apos;s value. The eligibility
                  check is a soft inquiry — your score is not affected just to see if you qualify.
                </p>
                <p className="text-stone-300 text-sm leading-relaxed mb-4">
                  This is the fastest path if you own a car because it requires zero cash out of
                  pocket. Most secured cards lock up $200–$500 of your money. Yendo does not.
                </p>
                <AffiliateLink
                  href={YENDO_GUIDE_HERO}
                  placement="how-to-rebuild-credit-step2"
                  offer="yendo"
                  className="inline-block bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-6 py-3 rounded-lg transition-colors"
                >
                  Check If Your Car Qualifies →
                </AffiliateLink>
                <p className="text-xs text-stone-500 mt-2">
                  Soft inquiry only. Won&apos;t affect your credit score.
                </p>
              </div>

              {/* Option B */}
              <div className="bg-stone-900 rounded-xl p-5 border border-stone-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-400 font-bold text-sm uppercase tracking-wide">
                    If no car
                  </span>
                </div>
                <h4 className="font-bold text-lg mb-2">Traditional Secured Credit Card</h4>
                <p className="text-stone-300 text-sm leading-relaxed">
                  OpenSky Secured Visa and Chime Credit Builder are the most accessible. They require
                  a $200–$500 cash deposit that becomes your credit limit. Avoid secured cards with
                  annual fees over $35 until your score is above 580.
                </p>
              </div>

              {/* Option C */}
              <div className="bg-stone-900 rounded-xl p-5 border border-stone-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-purple-400 font-bold text-sm uppercase tracking-wide">
                    Alternative
                  </span>
                </div>
                <h4 className="font-bold text-lg mb-2">Credit Builder Loan</h4>
                <p className="text-stone-300 text-sm leading-relaxed">
                  Self and similar services let you &quot;borrow&quot; money that is locked in a savings account
                  while you pay monthly. At the end you get the money. The upside: it adds both a
                  loan account and on-time history. The downside: your money is locked for 12–24
                  months.{' '}
                  <Link href="/credit-builder-loan" className="text-amber-400 hover:text-amber-300">
                    Compare credit builder loans vs car-secured cards →
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-amber-400 text-stone-950 rounded-full flex items-center justify-center font-black text-lg">
                3
              </span>
              <h3 className="text-xl font-bold">Keep Utilization Below 10%</h3>
            </div>
            <p className="text-stone-300 leading-relaxed mb-4">
              Credit utilization — how much of your limit you use — is 30% of your FICO score. If
              you have a $500 limit, keep your balance below $50. This feels counterintuitive but
              it is how the scoring model works.
            </p>
            <p className="text-stone-300 leading-relaxed">
              Pay your statement balance in full each month. This keeps utilization at 0% on the
              reporting date and generates on-time payment history simultaneously. You do not need
              to carry a balance to build credit — that is a myth.
            </p>
          </div>

          {/* Step 4 */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-amber-400 text-stone-950 rounded-full flex items-center justify-center font-black text-lg">
                4
              </span>
              <h3 className="text-xl font-bold">Set Up Autopay for Every Account</h3>
            </div>
            <p className="text-stone-300 leading-relaxed mb-4">
              Payment history is 35% of your FICO score — the single largest factor. One missed
              payment can drop your score 50–100 points and stay on your report for 7 years.
            </p>
            <p className="text-stone-300 leading-relaxed">
              Set autopay for the minimum payment on every account. Then pay the remainder manually
              each month. Autopay is insurance — even if you forget, you never miss.
            </p>
          </div>

          {/* Step 5 */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-amber-400 text-stone-950 rounded-full flex items-center justify-center font-black text-lg">
                5
              </span>
              <h3 className="text-xl font-bold">Dispute Errors on Your Report</h3>
            </div>
            <p className="text-stone-300 leading-relaxed mb-4">
              The FTC estimates 1 in 5 credit reports contains an error. Common errors: accounts
              that are not yours (often due to mixed files or identity theft), paid collections still
              showing as unpaid, incorrect account status, and wrong payment history.
            </p>
            <p className="text-stone-300 leading-relaxed">
              Dispute directly with each bureau online (Equifax, Experian, TransUnion each have
              dispute portals). They are required to investigate within 30 days. A successful dispute
              removes the item — which can boost your score significantly if the item was weighing
              it down.
            </p>
          </div>

          {/* Step 6 */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-amber-400 text-stone-950 rounded-full flex items-center justify-center font-black text-lg">
                6
              </span>
              <h3 className="text-xl font-bold">Do Not Close Old Accounts</h3>
            </div>
            <p className="text-stone-300 leading-relaxed">
              Length of credit history is 15% of your score. An old account — even one you barely
              use — adds to your average age of accounts. Keep old cards open with a small recurring
              charge (a monthly subscription) and autopay. Closing them shortens your history and
              reduces total available credit, both of which hurt your score.
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className="px-4 max-w-3xl mx-auto mb-16 bg-stone-900 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Realistic Timeline</h2>
          <div className="space-y-4">
            {[
              { period: 'Month 1–2', outcome: 'New account opens. First on-time payment reported. Score may dip slightly (new account), then recover.' },
              { period: 'Month 3–6', outcome: '3–6 consecutive on-time payments. Utilization history established. Most people see 20–40 point improvement.' },
              { period: 'Month 6–12', outcome: 'Pattern is clear to lenders. FICO recognizes positive trend. 40–80 point improvement is realistic from a starting score under 580.' },
              { period: 'Month 12–24', outcome: 'Multiple positive accounts, 12+ months of history. Old negative items are aging. You may qualify for unsecured cards. 600–650 range achievable from most starting points.' },
            ].map((item) => (
              <div key={item.period} className="flex gap-4">
                <div className="w-24 shrink-0">
                  <span className="text-amber-400 font-bold text-sm">{item.period}</span>
                </div>
                <p className="text-stone-300 text-sm leading-relaxed">{item.outcome}</p>
              </div>
            ))}
          </div>
          <p className="text-stone-400 text-xs mt-6">
            * Results vary by starting score, number of negative items, and consistency of payments.
            This is not financial advice.
          </p>
        </section>

        {/* CTA Mid */}
        <section className="px-4 max-w-3xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-amber-400/20 to-stone-900 border border-amber-400/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Own a Car? Start Rebuilding Today</h2>
            <p className="text-stone-300 mb-6 max-w-lg mx-auto">
              Yendo uses your car&apos;s equity as collateral — no cash deposit required. Soft inquiry
              only. See if you qualify in under 2 minutes.
            </p>
            <AffiliateLink
              href={YENDO_GUIDE_MID}
              placement="how-to-rebuild-credit-mid"
              offer="yendo"
              className="inline-block bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-lg px-8 py-4 rounded-xl transition-colors"
            >
              Check If My Car Qualifies →
            </AffiliateLink>
            <p className="text-xs text-stone-500 mt-3">
              Checking eligibility is a soft inquiry — won&apos;t affect your credit score.
            </p>
          </div>
        </section>

        <div className="px-4 max-w-3xl mx-auto">
          <MoneyResetCTA variant="mid" />
        </div>

        {/* FAQ */}
        <section className="px-4 max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'How fast can I rebuild my credit?',
                a: 'Most people see meaningful improvement (30–50 points) within 6–12 months of consistent on-time payments. The fastest method is opening a new positive account and keeping utilization low — results show up within 1–2 billing cycles.',
              },
              {
                q: 'Does rebuilding credit work if I have collections?',
                a: 'Yes. You can add positive accounts to your report while old negative items exist. As positive items accumulate and negatives age (7 years for most), your score improves. You do not need a clean slate to start.',
              },
              {
                q: 'What is the fastest way to rebuild credit?',
                a: 'Open a secured or car-secured credit card, keep utilization under 10%, and pay on time every month. After 6–12 months you will have a meaningful positive track record. Car-secured cards are fastest for car owners because they require no cash deposit.',
              },
              {
                q: 'Can I rebuild credit without a cash deposit?',
                a: "Yes — if you own a car. Yendo offers a car-secured Visa card that uses your vehicle's equity instead of a cash deposit. You keep driving your car, and the card reports to all 3 bureaus monthly.",
              },
              {
                q: 'Will opening a new account hurt my credit?',
                a: 'Briefly, yes — a hard inquiry at application can drop your score 5–10 points. But within 3–6 months, the positive payment history from the new account more than offsets that. With Yendo, the eligibility check is a soft inquiry (no impact), and the hard pull only occurs if you proceed to full application.',
              },
            ].map((faq) => (
              <div key={faq.q} className="border-b border-stone-800 pb-6">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-stone-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Content */}
        <section className="px-4 max-w-3xl mx-auto mb-16">
          <h2 className="text-xl font-bold mb-4">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/credit-builder-loan', label: 'Credit Builder Loan vs Car-Secured Card' },
              { href: '/bad-credit-credit-card', label: 'Best Credit Cards for Bad Credit' },
              { href: '/secured-credit-card-bad-credit', label: 'Secured Credit Cards Explained' },
              { href: '/use-car-as-collateral', label: 'How to Use Your Car as Collateral' },
              { href: '/does-applying-for-credit-card-hurt-credit', label: 'Does Applying Hurt Your Score?' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-xl p-4 text-sm font-medium transition-colors"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </section>

        <div className="px-4 max-w-3xl mx-auto">
          <MoneyResetCTA variant="end" />
        </div>

        {/* Final CTA */}
        <section className="px-4 max-w-3xl mx-auto mb-20 text-center">
          <h2 className="text-3xl font-black mb-4">Ready to Start Rebuilding?</h2>
          <p className="text-stone-300 mb-6">
            If you own a car, you may have a no-deposit path to a real Visa credit card that builds
            your credit every month. Check your eligibility now — it is a soft pull.
          </p>
          <AffiliateLink
            href={YENDO_GUIDE_CTA}
            placement="how-to-rebuild-credit-bottom"
            offer="yendo"
            className="inline-block bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xl px-10 py-5 rounded-xl transition-colors"
          >
            Check If My Car Qualifies →
          </AffiliateLink>
          <p className="text-xs text-stone-500 mt-3">
            Affiliate disclosure: Mintbrooks may earn a commission if you apply through our links at
            no cost to you. We are not a lender.
          </p>
        </section>
      </main>
    </>
  )
}
