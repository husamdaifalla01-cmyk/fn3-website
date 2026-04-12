import type { Metadata } from 'next'
import Link from 'next/link'
import AffiliateLink from '@/components/AffiliateLink'
import {
  YENDO_CAR_REQ_HERO,
  YENDO_CAR_REQ_MID,
  YENDO_CAR_REQ_CTA,
  SLAM_DUNK_CAR_REQ,
} from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'Car Equity Loan Requirements: Do You Qualify? (2026 Guide)',
  description:
    'Find out exactly what you need to qualify for a car equity loan in 2026. Vehicle age, mileage, title, state availability, and credit score requirements explained.',
  alternates: { canonical: 'https://mintbrooks.com/finance/car-equity-loan-requirements' },
  openGraph: {
    title: 'Car Equity Loan Requirements: Do You Qualify? (2026 Guide)',
    description:
      'Find out exactly what you need to qualify for a car equity loan. Vehicle, title, and credit requirements explained.',
    type: 'article',
    url: 'https://mintbrooks.com/finance/car-equity-loan-requirements',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Car Equity Loan Requirements: Do You Qualify? (2026)',
      description:
        'Complete breakdown of car equity loan qualification requirements including vehicle age, mileage limits, title ownership, and credit score criteria.',
      datePublished: '2026-04-10',
      dateModified: '2026-04-10',
      author: { '@type': 'Organization', name: 'Mintbrooks' },
      publisher: { '@type': 'Organization', name: 'Mintbrooks', url: 'https://mintbrooks.com' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What credit score do you need for a car equity loan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most car equity lenders — including Yendo — do not have a minimum credit score requirement. They use your vehicle\'s equity as collateral instead of your FICO score to determine your credit limit. A soft pull is used to verify identity, not to approve or deny.',
          },
        },
        {
          '@type': 'Question',
          name: 'What vehicle age requirements apply to car equity loans?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yendo accepts vehicles from model year 2000 or newer. Older vehicles or salvage-titled cars are typically not eligible. The vehicle must be in operable condition.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you need to own your car outright to get a car equity loan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. You can still qualify if you have an active lien on the vehicle — as long as you have positive equity remaining after your payoff balance. Yendo will assess your equity net of any outstanding loan.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there a mileage limit for car equity loans?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Yendo generally requires vehicles to have fewer than 200,000 miles. High-mileage vehicles may have reduced equity value or be ineligible. Always verify current requirements directly with the lender.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you have to stop driving your car to get a car equity loan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Unlike a traditional car title loan where the lender holds your title or vehicle, a car equity credit card (like Yendo) lets you keep driving your car while your vehicle value backs your credit limit.',
          },
        },
        {
          '@type': 'Question',
          name: 'What states are car equity loans available in?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yendo is available in most U.S. states but not all. States not currently served include Alaska, Hawaii, Iowa, Louisiana, Maine, Maryland, Massachusetts, Minnesota, Missouri, New Jersey, New York, Oklahoma, South Dakota, and Wisconsin. Check the Yendo states guide for the current list.',
          },
        },
      ],
    },
  ],
}

export default function CarEquityLoanRequirementsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0f0f0f', color: '#f5f0e8' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 pt-16 pb-10">
        <p className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: '#d97706' }}>
          Car Equity Loans
        </p>
        <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4" style={{ letterSpacing: '-0.02em' }}>
          Car Equity Loan Requirements:<br />Do You Qualify in 2026?
        </h1>
        <p className="text-lg mb-2 leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Car equity loans let you borrow against your vehicle's value — without a hard credit
          check or surrendering your keys. Here's exactly what lenders look for.
        </p>
        <p className="text-xs mb-8" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Updated April 2026 ·{' '}
          <em>Affiliate disclosure: Mintbrooks may earn a commission if you apply through our links.</em>
        </p>

        {/* Hero CTA card */}
        <div
          className="rounded-2xl p-6 mb-10"
          style={{ background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.25)' }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: '#d97706' }}>
            Check if your car qualifies — takes 2 minutes
          </p>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Yendo uses your vehicle's equity — not your FICO score — to determine your credit
            limit. Soft pull only. No effect on your credit score.
          </p>
          <AffiliateLink
            href={YENDO_CAR_REQ_HERO}
            placement="car-req-guide-hero"
            className="inline-block w-full text-center font-black py-4 rounded-xl text-base transition-all active:scale-95"
            style={{ background: '#d97706', color: '#0f0f0f' }}
          >
            See If My Car Qualifies →
          </AffiliateLink>
          <p className="text-xs text-center mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Soft pull only · No score impact · #ad · Mintbrooks earns a referral fee if you apply
          </p>
        </div>
      </section>

      {/* ── Requirements Table ─────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-black mb-2" style={{ letterSpacing: '-0.01em' }}>
          Qualification Requirements at a Glance
        </h2>
        <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Requirements are based on Yendo's publicly available eligibility criteria. Always verify
          directly with the lender before applying.
        </p>

        <div className="rounded-2xl overflow-hidden mb-8" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Requirement
                </th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Yendo Standard
                </th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  req: 'Credit score',
                  standard: 'No minimum',
                  notes: 'Equity-based — not FICO-driven',
                  pass: true,
                },
                {
                  req: 'Vehicle year',
                  standard: '2000 or newer',
                  notes: 'Pre-2000 vehicles typically ineligible',
                  pass: true,
                },
                {
                  req: 'Mileage',
                  standard: 'Under 200,000 mi',
                  notes: 'High-mileage may reduce equity value',
                  pass: true,
                },
                {
                  req: 'Title ownership',
                  standard: 'Title in your name',
                  notes: 'Lien OK if you have positive equity',
                  pass: true,
                },
                {
                  req: 'Vehicle condition',
                  standard: 'Operable, insured',
                  notes: 'Salvage/rebuilt titles typically ineligible',
                  pass: true,
                },
                {
                  req: 'State availability',
                  standard: '36+ states',
                  notes: 'See state guide for excluded states',
                  pass: true,
                },
                {
                  req: 'Income requirement',
                  standard: 'None stated',
                  notes: 'Not a standard underwriting factor',
                  pass: true,
                },
              ].map((row, i) => (
                <tr
                  key={i}
                  style={{
                    borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : undefined,
                    background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <td className="px-4 py-3 font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    {row.req}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full"
                      style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399' }}
                    >
                      ✓ {row.standard}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {row.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Vehicle Requirements Deep Dive ─────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-black mb-4" style={{ letterSpacing: '-0.01em' }}>
          Vehicle Requirements Explained
        </h2>

        <div className="space-y-5 mb-8">
          {[
            {
              title: 'Year: 2000 or Newer',
              body: 'Lenders set a model year floor because older vehicles depreciate to a point where their equity value no longer reliably supports a credit line. A 1998 vehicle with 180k miles may have a private-party value of only $1,200 — too low to secure a meaningful credit limit. Vehicles 2000 and newer in reasonable condition typically carry enough residual value.',
            },
            {
              title: 'Mileage: Under 200,000 Miles',
              body: 'High mileage reduces a vehicle\'s market value, which directly reduces your potential credit limit. A vehicle at 160,000 miles might carry $6,000 in market value; the same vehicle at 220,000 miles might be $2,000 — below the threshold for many lenders. If you\'re near the mileage limit, still apply — your specific make and model matters.',
            },
            {
              title: 'Title: In Your Name (Liens OK)',
              body: 'You don\'t need to own your car free and clear. If you\'re still making payments, you may still qualify — as long as you have positive equity. For example: if your car is worth $8,000 and you owe $3,000, you have $5,000 in equity that can potentially back a credit line. The lender will assess your payoff balance during the application.',
            },
            {
              title: 'Condition: Operable and Insured',
              body: 'The vehicle must be in driving condition and carry at minimum liability insurance. Salvage titles, rebuilt titles, and non-running vehicles are typically ineligible. Commercial vehicles and motorcycles may be excluded depending on the lender.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <h3 className="font-bold mb-2 text-base">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Yendo vs Title Loan Comparison ─────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-black mb-2" style={{ letterSpacing: '-0.01em' }}>
          Car Equity Credit Card vs. Traditional Title Loan
        </h2>
        <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Both use your car's value as collateral. The difference is significant.
        </p>

        <div className="rounded-2xl overflow-hidden mb-6" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>Feature</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: '#34d399' }}>Car Equity Card (Yendo)</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: '#f87171' }}>Traditional Title Loan</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Keep driving your car', '✓ Yes', '✓ Usually, but risk if missed payment'],
                ['Title held by lender', '✗ No — you keep title', '✓ Yes — lender holds title'],
                ['Revolving credit', '✓ Yes — reusable credit line', '✗ No — lump sum, pay back in full'],
                ['Credit bureau reporting', '✓ Builds credit history', '✗ Typically does not report'],
                ['APR range', 'Varies — check directly', '200–400% typical APR'],
                ['Rollover risk', '✗ None', '✓ High — common debt trap'],
                ['Credit score impact', 'Soft pull for eligibility', 'Often no check, no report'],
              ].map(([feature, yendo, title], i) => (
                <tr
                  key={i}
                  style={{
                    borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : undefined,
                    background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <td className="px-4 py-3 font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>{feature}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: '#34d399' }}>{yendo}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: '#f87171' }}>{title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mid CTA */}
        <div className="text-center py-6">
          <AffiliateLink
            href={YENDO_CAR_REQ_MID}
            placement="car-req-guide-mid"
            className="inline-block font-black py-4 px-8 rounded-xl text-base transition-all active:scale-95"
            style={{ background: '#d97706', color: '#0f0f0f' }}
          >
            Check My Car Eligibility →
          </AffiliateLink>
          <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Soft pull · No score impact · #ad · Mintbrooks earns a referral fee if you apply
          </p>
        </div>
      </section>

      {/* ── 3-Step Qualification Process ───────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-black mb-6" style={{ letterSpacing: '-0.01em' }}>
          How the Qualification Process Works
        </h2>

        <div className="space-y-4 mb-8">
          {[
            {
              step: '1',
              title: 'Enter Your Vehicle Info',
              body: "You'll be asked for your car's make, model, year, and mileage. This takes about 60 seconds. No documents required at this stage.",
            },
            {
              step: '2',
              title: 'Soft Credit Pull',
              body: "Yendo runs a soft pull to verify your identity and check eligibility. This does NOT appear on your credit report and has zero impact on your score. It's the same type of check you see when checking your own credit.",
            },
            {
              step: '3',
              title: 'See Your Estimated Credit Limit',
              body: "Based on your vehicle's equity value, you'll see an estimated credit limit on the spot — typically between $500 and $10,000. If you choose to move forward, a full application takes another 5–10 minutes.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="flex gap-4 rounded-xl p-5"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
                style={{ background: 'rgba(217,119,6,0.15)', color: '#d97706' }}
              >
                {s.step}
              </div>
              <div>
                <h3 className="font-bold mb-1">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── State Availability ─────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-black mb-4" style={{ letterSpacing: '-0.01em' }}>
          State Availability
        </h2>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
          Yendo is available in 36+ states. Currently not available in:{' '}
          <strong className="text-white">
            Alaska, Hawaii, Iowa, Louisiana, Maine, Maryland, Massachusetts, Minnesota, Missouri,
            New Jersey, New York, Oklahoma, South Dakota, and Wisconsin.
          </strong>
        </p>
        <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
          State availability can change. Always{' '}
          <Link
            href="/finance/yendo-states-guide"
            className="underline hover:no-underline"
            style={{ color: '#d97706' }}
          >
            check the current state availability guide
          </Link>{' '}
          or verify directly with Yendo before applying.
        </p>

        <div
          className="rounded-xl p-4 mb-6"
          style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)' }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: '#fbbf24' }}>
            Not in a supported state?
          </p>
          <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
            If Yendo isn't available where you live, there are bad-credit personal loan alternatives
            that work in all 50 states with no car required.
          </p>
          <AffiliateLink
            href={SLAM_DUNK_CAR_REQ}
            placement="car-req-guide-fallback"
            className="inline-block text-sm font-bold py-2 px-4 rounded-lg transition-all"
            style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }}
          >
            See All-State Loan Options →
          </AffiliateLink>
          <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.2)' }}>
            #ad · Mintbrooks may earn a commission
          </p>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-black mb-6" style={{ letterSpacing: '-0.01em' }}>
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 mb-10">
          {[
            {
              q: 'What credit score do you need for a car equity loan?',
              a: "Most car equity lenders — including Yendo — don't have a minimum credit score. Your vehicle's equity determines your credit limit, not your FICO score. A soft pull is used to verify identity only.",
            },
            {
              q: 'Do I need to own my car outright?',
              a: "No. You can have an active lien and still qualify, as long as you have positive equity remaining. If your car is worth $8,000 and you owe $3,000, your $5,000 in equity can back a credit line.",
            },
            {
              q: 'Is there a minimum income requirement?',
              a: "Yendo does not publish a minimum income requirement as a standard underwriting factor. The primary qualification is vehicle equity, not income.",
            },
            {
              q: 'Will applying hurt my credit score?',
              a: "No. The eligibility check is a soft pull — it does not appear on your credit report and has no effect on your score. Only if you proceed to a full application and get approved would an account appear on your report (which can help build credit).",
            },
            {
              q: 'Do I have to stop driving my car?',
              a: "No. Unlike a title loan where the lender takes physical possession of your title or vehicle, a car equity credit card lets you keep driving normally. Your car value backs the line, but you remain in full control.",
            },
            {
              q: 'How much can I borrow with a car equity loan?',
              a: "Limits typically range from $500 to $10,000, based on your vehicle's market value. A 2020 vehicle worth $14,000 might qualify for a higher limit than a 2005 vehicle worth $4,000. You'll see your estimated limit instantly after the eligibility check.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <h3 className="font-bold mb-2 text-sm">{item.q}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.2)' }}
        >
          <h2 className="text-2xl font-black mb-3">Ready to Check Your Car?</h2>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
            The eligibility check takes 2 minutes, is completely free, and won't affect your credit
            score. See your estimated credit limit on the spot.
          </p>
          <AffiliateLink
            href={YENDO_CAR_REQ_CTA}
            placement="car-req-guide-cta"
            className="inline-block font-black py-4 px-10 rounded-xl text-base transition-all active:scale-95 mb-3"
            style={{ background: '#d97706', color: '#0f0f0f' }}
          >
            Check If My Car Qualifies →
          </AffiliateLink>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Soft pull only · No effect on credit score · Takes 2 minutes
          </p>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>
            #ad · Mintbrooks earns a referral fee if you apply, at no cost to you.
          </p>
        </div>
      </section>

      {/* ── Internal Links ─────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-6 pb-16">
        <h2 className="text-lg font-bold mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Related Guides
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { href: '/finance/qualify', label: 'Check if you qualify' },
            { href: '/finance/yendo-states-guide', label: 'Yendo state availability' },
            { href: '/finance/auto-equity-loan', label: 'Auto equity loan guide' },
            { href: '/finance/car-equity-credit-card', label: 'Car equity credit cards' },
            { href: '/finance/bad-credit-credit-card', label: 'Best cards for bad credit' },
            { href: '/finance/car-title-loan-alternative', label: 'Title loan alternatives' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl p-4 text-sm font-medium hover:no-underline transition-all"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.65)',
              }}
            >
              {link.label} →
            </Link>
          ))}
        </div>
      </section>

      {/* ── Disclosure Footer ───────────────────────────────────────────── */}
      <footer className="max-w-3xl mx-auto px-4 pb-16">
        <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.2)' }}>
          <strong className="text-stone-500">Affiliate Disclosure:</strong> Mintbrooks may earn a
          commission when you apply through our links, at no extra cost to you. We are not a lender
          or financial institution. All product details are based on publicly available information
          and may change. Qualification decisions are made solely by the lender — Mintbrooks makes
          no guarantee of approval. Always verify current eligibility requirements directly with the
          product provider before applying. This content is for educational purposes only and does
          not constitute financial advice.
        </p>
      </footer>
    </div>
  )
}
