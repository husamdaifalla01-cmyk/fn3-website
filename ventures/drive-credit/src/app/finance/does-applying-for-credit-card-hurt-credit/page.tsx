import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import FTCDisclosure from '@/components/FTCDisclosure'
import {
  YENDO_INQUIRY_HERO,
  YENDO_INQUIRY_MID,
  YENDO_INQUIRY_CTA,
  SLAM_DUNK_INQUIRY,
} from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'Does Applying for a Credit Card Hurt Your Credit Score? — Mintbrooks',
  description:
    'Applying for a credit card can drop your score 5–10 points temporarily. Here is exactly what happens, how long it lasts, and how to apply without the hard inquiry.',
  keywords:
    'does applying for a credit card hurt your credit, hard inquiry credit card, soft pull credit card, credit card application credit score, does checking credit card hurt score',
  alternates: { canonical: 'https://mintbrooks.com/finance/does-applying-for-credit-card-hurt-credit' },
  openGraph: {
    title: 'Does Applying for a Credit Card Hurt Your Credit Score?',
    description:
      'Hard inquiries drop your score 5–10 points. Learn how long it lasts and how to find cards that only do a soft pull first.',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Does Applying for a Credit Card Hurt Your Credit Score?',
  description:
    'A complete guide to hard vs soft credit inquiries, how they affect your score, and how to minimize the impact when applying for a credit card.',
  datePublished: '2026-04-07',
  dateModified: '2026-04-07',
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
      name: 'Does applying for a credit card hurt your credit score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, most credit card applications trigger a hard inquiry, which can drop your score by 5–10 points temporarily. The impact fades within 3–6 months and disappears from your report after 2 years.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a hard and soft inquiry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A hard inquiry happens when a lender pulls your full credit report during an application — it shows on your report and can lower your score slightly. A soft inquiry is a background check that does not affect your score at all. Pre-approval checks and eligibility screens are typically soft inquiries.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a hard inquiry stay on your credit report?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hard inquiries remain visible on your credit report for 2 years. However, the score impact is typically largest in the first few months and shrinks to near-zero by month 6–12.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I apply for a credit card without a hard inquiry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Some cards offer soft-pull pre-qualification that does not affect your score. You can check your eligibility safely, and the hard pull only happens if you decide to proceed. Yendo, a car-secured Visa card, uses a soft pull for the initial eligibility check.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many credit card applications are too many?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Multiple applications within a short window (6–12 months) can signal risk to lenders and compound the score impact. As a rule: space applications at least 3–6 months apart and only apply when you have a reasonable chance of approval.',
      },
    },
  ],
}

export default function DoesApplyingHurtCredit() {
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
      <main className="bg-stone-950 text-stone-100 min-h-screen pt-16">

        {/* Hero */}
        <section className="px-4 max-w-3xl mx-auto pt-12 pb-10">
          <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-3">
            Credit Score Education
          </p>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-6">
            Does Applying for a Credit Card Hurt Your Credit Score?
          </h1>
        <FTCDisclosure />
          <p className="text-stone-300 text-lg leading-relaxed mb-8">
            Short answer: yes — but less than you think, and only temporarily. Here is exactly
            what happens when you apply, how long the impact lasts, and how to find cards that
            let you check eligibility without the hard pull.
          </p>
          <AffiliateLink
            href={YENDO_INQUIRY_HERO}
            placement="inquiry-guide-hero"
            offer="yendo"
            className="inline-block bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-lg px-8 py-4 rounded-xl transition-colors"
          >
            Check Eligibility — Soft Pull Only →
          </AffiliateLink>
          <p className="text-xs text-stone-500 mt-3">
            Checking eligibility does not affect your credit score.
          </p>
        </section>

        {/* Hard vs Soft Inquiry Explainer */}
        <section className="px-4 max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6">Hard Inquiry vs. Soft Inquiry — What&apos;s the Difference?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-950/30 border border-red-800/40 rounded-2xl p-6">
              <p className="text-red-400 font-black text-sm uppercase tracking-wider mb-2">Hard Inquiry</p>
              <ul className="space-y-2 text-stone-300 text-sm">
                <li>• Triggered by a full credit card application</li>
                <li>• Drops your score 5–10 points temporarily</li>
                <li>• Visible on your credit report for 2 years</li>
                <li>• Score impact fades to near-zero by month 6</li>
                <li>• Multiple in 6 months = bigger combined impact</li>
              </ul>
            </div>
            <div className="bg-emerald-950/30 border border-emerald-700/40 rounded-2xl p-6">
              <p className="text-emerald-400 font-black text-sm uppercase tracking-wider mb-2">Soft Inquiry</p>
              <ul className="space-y-2 text-stone-300 text-sm">
                <li>• Triggered by pre-qualification or eligibility checks</li>
                <li>• <strong className="text-white">Zero impact on your credit score</strong></li>
                <li>• Not visible to lenders reviewing your report</li>
                <li>• Used by employers, landlords, background checks</li>
                <li>• You can do unlimited soft pulls safely</li>
              </ul>
            </div>
          </div>
          <p className="text-stone-400 leading-relaxed text-sm">
            The key insight: most people avoid applying for credit because they fear the score hit.
            But 5–10 points for 3–6 months is a small price to pay for opening a positive account
            that can add 40–80 points over the next year. The math almost always favors applying —
            if you pick the right card.
          </p>
        </section>

        {/* What Actually Happens to Your Score */}
        <section className="px-4 max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6">What Actually Happens to Your Score After You Apply</h2>
          <div className="space-y-4">
            {[
              {
                label: 'Day 1 — Application submitted',
                detail:
                  'Lender pulls a hard inquiry. Your score drops 5–10 points. This is the only time the impact is at its maximum.',
                color: 'text-red-400',
              },
              {
                label: 'Week 2–4 — Account opens (if approved)',
                detail:
                  'Your new account is reported to the bureaus. You now have a new account with zero history — your average account age may dip slightly.',
                color: 'text-amber-400',
              },
              {
                label: 'Month 1–3 — First on-time payments',
                detail:
                  'Each on-time payment builds positive history. The new account begins to offset the hard inquiry. Score typically returns toward baseline.',
                color: 'text-amber-400',
              },
              {
                label: 'Month 6–12 — Net positive territory',
                detail:
                  'The hard inquiry effect is nearly gone. Positive payment history compounds. Most people are 20–50 points above where they started if they used the card responsibly.',
                color: 'text-emerald-400',
              },
              {
                label: 'Month 24 — Hard inquiry disappears',
                detail:
                  'Hard inquiry falls off your report entirely. Only positive history remains. Net result: significantly better credit than before you applied.',
                color: 'text-emerald-400',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex gap-4 border-b border-stone-800 pb-4"
              >
                <div className="w-5 shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-1" />
                </div>
                <div>
                  <p className={`font-bold text-sm ${item.color} mb-1`}>{item.label}</p>
                  <p className="text-stone-300 text-sm leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mid CTA — Soft Pull Option */}
        <section className="px-4 max-w-3xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-amber-400/20 to-stone-900 border border-amber-400/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Want to Check Without the Hard Pull?
            </h2>
            <p className="text-stone-300 mb-2 max-w-lg mx-auto">
              Yendo is a car-secured Visa card designed for bad or thin credit. The initial
              eligibility check is a <strong className="text-amber-400">soft inquiry only</strong> —
              it will not affect your score.
            </p>
            <p className="text-stone-400 text-sm mb-6 max-w-lg mx-auto">
              If you own a car, you may qualify in under 2 minutes. No deposit required.
              Reports to all 3 bureaus monthly.
            </p>
            <AffiliateLink
              href={YENDO_INQUIRY_MID}
              placement="inquiry-guide-mid"
              offer="yendo"
              className="inline-block bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-lg px-8 py-4 rounded-xl transition-colors"
            >
              See If My Car Qualifies →
            </AffiliateLink>
            <p className="text-xs text-stone-500 mt-3">
              Soft pull only. Your score is safe.
            </p>
          </div>
        </section>

        {/* When to Apply vs Wait */}
        <section className="px-4 max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6">When to Apply — and When to Wait</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-emerald-950/20 border border-emerald-800/30 rounded-2xl p-6">
              <p className="text-emerald-400 font-black text-sm uppercase tracking-wider mb-3">
                Apply Now If…
              </p>
              <ul className="space-y-3 text-stone-300 text-sm">
                <li>✓ You have not applied for any new credit in 3+ months</li>
                <li>✓ You are building credit from scratch (no history = no other options)</li>
                <li>✓ The card reports to all 3 bureaus monthly</li>
                <li>✓ You have no major loan application (mortgage, auto) in the next 6 months</li>
                <li>✓ The pre-qualification is a soft pull</li>
              </ul>
            </div>
            <div className="bg-red-950/20 border border-red-900/30 rounded-2xl p-6">
              <p className="text-red-400 font-black text-sm uppercase tracking-wider mb-3">
                Wait If…
              </p>
              <ul className="space-y-3 text-stone-300 text-sm">
                <li>✗ You applied for 2+ cards in the last 6 months</li>
                <li>✗ You are 60 days away from a mortgage or auto loan application</li>
                <li>✗ Your score is currently below 500 and you don&apos;t own a car</li>
                <li>✗ You have no plan to use the card (dormant accounts hurt utilization math)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Score Impact by Starting Point */}
        <section className="px-4 max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6">How Much Does a Hard Inquiry Actually Drop Your Score?</h2>
          <p className="text-stone-300 mb-6 leading-relaxed">
            The impact depends on your starting score and how many inquiries you already have.
            Here are realistic estimates based on FICO scoring behavior:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-700">
                  <th className="text-left py-3 pr-4 text-stone-400 font-medium">Starting Score</th>
                  <th className="text-left py-3 pr-4 text-stone-400 font-medium">Typical Drop</th>
                  <th className="text-left py-3 text-stone-400 font-medium">Recovery Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800">
                {[
                  { range: '750–850 (Excellent)', drop: '2–5 points', recovery: '1–3 months' },
                  { range: '680–749 (Good)', drop: '5–10 points', recovery: '3–6 months' },
                  { range: '580–679 (Fair)', drop: '5–10 points', recovery: '3–6 months' },
                  { range: '500–579 (Poor)', drop: '5–10 points', recovery: '3–6 months' },
                  { range: 'Below 500 (Very Poor)', drop: '5–10 points', recovery: '3–6 months' },
                ].map((row) => (
                  <tr key={row.range}>
                    <td className="py-3 pr-4 text-stone-200">{row.range}</td>
                    <td className="py-3 pr-4 text-red-400 font-medium">{row.drop}</td>
                    <td className="py-3 text-emerald-400">{row.recovery}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-stone-500 text-xs mt-4">
            Note: These are estimates. Actual impact varies by total inquiry count, account age mix,
            and current utilization. FICO and VantageScore weight inquiries differently.
          </p>
        </section>

        {/* Fallback for non-car-owners */}
        <section className="px-4 max-w-3xl mx-auto mb-16">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-2">Don&apos;t Own a Car?</h3>
            <p className="text-stone-300 text-sm mb-4 leading-relaxed">
              Slam Dunk Loans offers personal loans for any credit history — including bad and thin
              credit — with no upfront fees. Checking rates is a soft pull.
            </p>
            <AffiliateLink
              href={SLAM_DUNK_INQUIRY}
              placement="inquiry-guide-fallback"
              offer="slam-dunk"
              className="inline-block bg-stone-700 hover:bg-stone-600 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors"
            >
              Check Personal Loan Rates →
            </AffiliateLink>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Does applying for a credit card hurt your credit score?',
                a: 'Yes, most applications trigger a hard inquiry, which drops your score 5–10 points temporarily. The impact fades within 3–6 months and disappears from your report after 2 years.',
              },
              {
                q: 'What is the difference between a hard and soft inquiry?',
                a: 'A hard inquiry happens during a full credit application and can lower your score slightly. A soft inquiry — used for pre-qualification and eligibility checks — has zero impact on your score.',
              },
              {
                q: 'How long does a hard inquiry stay on your credit report?',
                a: 'Hard inquiries remain visible for 2 years, but the score impact typically shrinks to near-zero by month 6–12.',
              },
              {
                q: 'Can I apply for a credit card without a hard inquiry?',
                a: 'Some cards offer soft-pull pre-qualification. Yendo, a car-secured Visa card, uses a soft pull for the initial eligibility check — no score impact until you decide to proceed.',
              },
              {
                q: 'How many credit card applications are too many?',
                a: 'Multiple applications within 6–12 months compound the impact and signal risk to lenders. Space applications at least 3–6 months apart when possible.',
              },
            ].map((faq) => (
              <div key={faq.q} className="border-b border-stone-800 pb-6">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-stone-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Guides */}
        <section className="px-4 max-w-3xl mx-auto mb-16">
          <h2 className="text-xl font-bold mb-4">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/how-to-rebuild-credit', label: 'How to Rebuild Credit Fast' },
              { href: '/bad-credit-credit-card', label: 'Best Credit Cards for Bad Credit' },
              { href: '/secured-credit-card-bad-credit', label: 'Secured Credit Cards Explained' },
              { href: '/credit-builder-loan', label: 'Credit Builder Loan vs Car-Secured Card' },
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

        {/* Final CTA */}
        <section className="px-4 max-w-3xl mx-auto mb-20 text-center">
          <h2 className="text-3xl font-black mb-4">Check Eligibility Without Hurting Your Score</h2>
          <p className="text-stone-300 mb-6 max-w-lg mx-auto">
            Yendo&apos;s eligibility check is a soft pull only. If you own a car, see if you qualify in
            under 2 minutes — no credit score impact, no deposit required.
          </p>
          <AffiliateLink
            href={YENDO_INQUIRY_CTA}
            placement="inquiry-guide-bottom"
            offer="yendo"
            className="inline-block bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xl px-10 py-5 rounded-xl transition-colors"
          >
            See If My Car Qualifies →
          </AffiliateLink>
          <p className="text-xs text-stone-500 mt-3">
            Affiliate disclosure: Mintbrooks may earn a commission if you apply through our links
            at no cost to you. We are not a lender. Checking eligibility is a soft inquiry and
            will not affect your credit score.
          </p>
        </section>
      </main>
    </>
  )
}
