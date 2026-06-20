import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import FinanceEmailCapture from '@/components/FinanceEmailCapture'
import T3ProductLeadMagnet from '@/components/T3ProductLeadMagnet'
import AffiliateLink from '@/components/AffiliateLink'
import FTCDisclosure from '@/components/FTCDisclosure'
import { LIFEFUNDS_BRIDGE_HERO, LIFEFUNDS_BRIDGE_MID, LIFEFUNDS_BRIDGE_CTA } from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'Bad Credit Loans with an Instant Decision (2026): What It Really Means',
  description: 'Bad credit personal loans with an "instant decision" — what instant actually means, why a decision is not the same as money in your account, and how to prequalify with a soft pull before any hard inquiry.',
  alternates: { canonical: 'https://mintbrooks.com/finance/bad-credit-loans-instant-decision' },
}

const faqs = [
  {
    q: 'What does "instant decision" actually mean for a loan?',
    a: 'It usually means the platform gives you a quick prequalification result — an estimate of which lenders might work with you and at roughly what rate — within minutes. That is not the same as a final approval or funded loan. The lender still verifies your details, and a binding offer can take longer. Treat "instant decision" as "instant estimate," not "instant cash."',
  },
  {
    q: 'Can I really get a same-day loan with bad credit?',
    a: 'Same-day or next-day funding exists with some lenders, but it is not guaranteed and depends on the lender, your bank, the time you apply, and verification. Bad credit also tends to mean higher rates and stricter checks, which can slow things down. Read each lender\'s stated funding timeline rather than assuming the marketplace\'s "fast" applies to you.',
  },
  {
    q: 'Does checking my options hurt my credit score?',
    a: 'Prequalifying through a marketplace is typically a soft inquiry, which does not affect your score. A hard inquiry — which can lower your score by a few points — usually happens only when you formally apply with a specific lender. Prequalify first so you can compare estimated rates before committing to any hard pull.',
  },
  {
    q: 'What APR should I expect with bad credit?',
    a: 'Loans marketed to people with bad credit tend to carry high APRs and fees, sometimes well into the double or triple digits depending on the product and your state. There is no single rate — it depends on the lender, loan amount, term, and your profile. Always compare the total cost of repayment, not just the monthly payment, before you sign.',
  },
  {
    q: 'How much can I borrow?',
    a: 'Amounts vary widely by lender and by your situation. Some bad-credit personal loans go up to $50,000, but the amount you actually qualify for — and the rate — depend on the lender\'s assessment. Borrow only what you genuinely need and can afford to repay.',
  },
]

const PAGE_URL = 'https://mintbrooks.com/finance/bad-credit-loans-instant-decision'

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Bad Credit Loans with an Instant Decision (2026): What It Really Means',
    description: 'An honest look at bad-credit personal loans advertised with instant or same-day decisions — prequalification vs. funding, and how to compare offers safely.',
    datePublished: '2026-01-01',
    dateModified: '2026-06-01',
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
      { '@type': 'ListItem', position: 3, name: 'Bad Credit', item: 'https://mintbrooks.com/finance/bad-credit' },
      { '@type': 'ListItem', position: 4, name: 'Instant-Decision Loans' },
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
          <Link href="/finance/bad-credit" className="hover:text-amber-700 transition-colors">Bad Credit</Link>
          <span>›</span>
          <span>Instant-Decision Loans</span>
        </nav>

        <div className="section-label mb-3">Loan Guide</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>
          Bad Credit Loans with an<br />Instant Decision
        </h1>
        <FTCDisclosure />
        <p className="text-lg mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          &quot;Instant decision&quot; loans sound like instant money. They&apos;re usually not. Here&apos;s what instant actually means, how to compare real offers, and how to do it without a hard credit pull until you&apos;re ready.
        </p>

        <FinanceEmailCapture
          source="finance"
          headline="Free: The Bad-Credit Borrowing Checklist"
          subtext="The questions to answer before you accept any loan offer — so you don't sign up for a payment you can't afford. One email, no fluff."
        />

        {/* Primary offer — Lifefunds loans (the lead offer for this loan-intent page) */}
        <div className="rounded-2xl p-6 mb-6" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.2)' }}>
          <div className="font-bold mb-2" style={{ color: '#d97706' }}>💵 Compare real loan offers — soft pull only.</div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#78716c' }}>
            Instead of applying blind, prequalify across lenders that consider bad credit and see <strong style={{ color: '#1c1917' }}>estimated rates and amounts up to $50,000</strong> in minutes. Checking your options is a <strong style={{ color: '#1c1917' }}>soft inquiry — it won&apos;t affect your score.</strong> A hard inquiry only happens later, if you formally apply with a specific lender.
          </p>
          <AffiliateLink href={LIFEFUNDS_BRIDGE_HERO} offer="lifefunds" placement="instant-loans-hero" className="btn-primary text-sm py-2.5 px-6 inline-block">
            Check My Loan Options → Free
          </AffiliateLink>
          <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>Soft inquiry to prequalify · Affiliate link · Mintbrooks is not a lender</p>
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>What &quot;Instant Decision&quot; Really Means</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          When a lender or marketplace advertises an &quot;instant decision,&quot; what you usually get in minutes is a <strong style={{ color: '#1c1917' }}>prequalification</strong> — an estimate of which lenders might work with you and at roughly what rate. That&apos;s genuinely useful, but it&apos;s not the same as three things people often assume it means:
        </p>
        <div className="space-y-3 mb-8">
          {[
            ['It is not a final approval.', 'The lender still has to verify your income, identity, and bank details. The real offer can differ from the estimate.'],
            ['It is not money in your account.', 'Even after approval, funding takes time — often the same day or next business day, but sometimes longer depending on your bank and the lender.'],
            ['It is not guaranteed.', 'No legitimate lender guarantees approval for bad credit before reviewing your application. Anyone who does is a red flag.'],
          ].map(([bold, rest]) => (
            <div key={bold} className="flex gap-3 items-start">
              <span className="text-sm flex-shrink-0 mt-0.5" style={{ color: '#d97706' }}>→</span>
              <span className="text-sm leading-relaxed" style={{ color: '#78716c' }}><strong style={{ color: '#1c1917' }}>{bold}</strong> {rest}</span>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Prequalification vs. Funding: The Timeline</h2>
        <div className="overflow-x-auto rounded-2xl mb-8" style={{ border: '1px solid rgba(217,119,6,0.12)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#fef9ee', borderBottom: '1px solid rgba(217,119,6,0.1)' }}>
                <th className="text-left px-5 py-3.5 font-semibold" style={{ color: '#78716c' }}>Stage</th>
                <th className="px-5 py-3.5 font-semibold text-center" style={{ color: '#78716c' }}>Typical Speed</th>
                <th className="px-5 py-3.5 font-semibold text-center" style={{ color: '#78716c' }}>Credit Impact</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Prequalify / "instant decision"', 'Minutes', 'Soft pull — no impact'],
                ['Formal application', 'Same day', 'Hard pull — small dip'],
                ['Verification & approval', 'Hours to days', 'None'],
                ['Funding (money disbursed)', 'Same day to a few days', 'None'],
              ].map(([stage, speed, impact], i) => (
                <tr key={stage as string} style={{ borderBottom: i < 3 ? '1px solid rgba(217,119,6,0.07)' : 'none', background: i % 2 === 0 ? 'white' : '#fffdf7' }}>
                  <td className="px-5 py-3 font-semibold" style={{ color: '#1c1917' }}>{stage}</td>
                  <td className="px-5 py-3 text-center" style={{ color: '#78716c' }}>{speed}</td>
                  <td className="px-5 py-3 text-center" style={{ color: '#78716c' }}>{impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          The exact timing varies by lender, by your bank, and by the time of day you apply. The point: the &quot;instant&quot; part is the estimate at the top of the funnel. Plan for the funding to take at least until the next business day, and don&apos;t commit to a bill on the assumption money lands immediately.
        </p>

        <div className="rounded-2xl p-6 mb-10" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.2)' }}>
          <div className="font-bold mb-2" style={{ color: '#d97706' }}>See your estimated rates before any hard pull.</div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#78716c' }}>
            Compare prequalified offers from multiple lenders in one place. It&apos;s the safest way to find out what you actually qualify for without dinging your score on a blind application.
          </p>
          <AffiliateLink href={LIFEFUNDS_BRIDGE_MID} offer="lifefunds" placement="instant-loans-mid" className="btn-primary text-sm py-2.5 px-6 inline-block">
            Compare My Options →
          </AffiliateLink>
          <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>Soft inquiry · Affiliate link</p>
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>How to Compare Offers Without Getting Burned</h2>
        <div className="space-y-3 mb-10">
          {[
            'Prequalify first (soft pull) and only do a hard application once you\'ve picked the best offer.',
            'Compare the APR and total repayment — not just the monthly payment, which can hide a high rate.',
            'Read the fees: origination fees, late fees, and prepayment penalties all change the real cost.',
            'Confirm the funding timeline in writing before you rely on the money for a deadline.',
            'Borrow only what you need; a smaller loan is cheaper and easier to repay.',
            'Walk away from anyone who "guarantees" approval, asks for an upfront fee to release a loan, or pressures you to decide instantly.',
          ].map(tip => (
            <div key={tip} className="flex gap-3 items-start">
              <span className="text-sm flex-shrink-0 mt-0.5" style={{ color: '#d97706' }}>→</span>
              <span className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{tip}</span>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Before You Borrow: Is a Loan the Right Move?</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Bad-credit loans are expensive, so they make the most sense for a genuine, time-sensitive need where you&apos;ve compared real numbers and can afford the payments. If your situation is ongoing debt rather than a one-time need, consolidating or building credit first may save you far more than a fast loan costs.
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          And if you own a car, a car-secured credit line can sometimes give you access to funds at a lower cost than an unsecured bad-credit loan — worth checking before you commit.
        </p>

        <div className="rounded-2xl p-6 text-center mb-12" style={{ background: '#1c1917' }}>
          <h3 className="text-xl font-black text-white mb-2">Compare your real loan options</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
            See estimated rates from lenders that consider bad credit — a soft pull, no impact to your score.
          </p>
          <AffiliateLink href={LIFEFUNDS_BRIDGE_CTA} offer="lifefunds" placement="instant-loans-cta" className="btn-primary inline-block py-3 px-8">
            Check My Loan Options →
          </AffiliateLink>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.28)' }}>Affiliate link · Soft inquiry to prequalify · Mintbrooks is not a lender</p>
        </div>

        {/* Internal links — up to the pillar + siblings */}
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-6" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>
            Keep Reading
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <Link href="/finance/bad-credit" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>Getting Credit with Bad Credit (Hub)</div>
              <div style={{ color: '#78716c' }}>The full map of cards and loans for bad credit — and how to rebuild.</div>
            </Link>
            <Link href="/finance/personal-loans-up-to-50k" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>Personal Loans up to $50k</div>
              <div style={{ color: '#78716c' }}>What sizes and terms are realistic, and how to compare offers.</div>
            </Link>
            <Link href="/finance/debt-consolidation-check" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>Debt Consolidation Check</div>
              <div style={{ color: '#78716c' }}>When consolidating beats another loan — and when it doesn&apos;t.</div>
            </Link>
            <Link href="/finance/how-to-rebuild-credit" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>How to Rebuild Credit (in order)</div>
              <div style={{ color: '#78716c' }}>The order of operations that makes the next loan cheaper.</div>
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
          productDescr="Full PDF guide — get out of the high-cost borrowing loop, in order. Instant download. 60-day refund."
        />

        <div className="text-xs pt-8 leading-relaxed" style={{ color: '#a8a29e', borderTop: '1px solid rgba(28,25,23,0.07)' }}>
          Mintbrooks is an independent educational resource. We are not a lender and do not make credit decisions. Loan approval, rates, amounts, and funding times are determined solely by the lender and depend on your individual circumstances — Mintbrooks makes no guarantee of approval or funding speed. Details are based on publicly available information and may change. We may earn a commission when you apply through our links. This is not financial advice. Always verify current terms directly with the lender before borrowing.
        </div>
      </article>
    </>
  )
}
