import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import { YENDO_STATES_HERO, YENDO_STATES_TABLE, YENDO_STATES_CTA, SLAM_DUNK_STATES } from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'Is Yendo Available in My State? — Complete State Eligibility Guide — Mintbrooks',
  description: 'Check if the Yendo car-secured credit card is available in your state. Yendo operates in 37 states + DC. See the full list and find your best option if your state isn\'t covered.',
  keywords: 'is yendo available in my state, yendo states, yendo eligibility, car equity credit card states, yendo not available',
  alternates: { canonical: 'https://mintbrooks.com/yendo-states-guide' },
  openGraph: {
    title: 'Is Yendo Available in My State? — Complete Guide',
    description: 'Yendo is available in 37 states + DC. Check your state and find the best car-equity credit option for you.',
    type: 'article',
  },
}

const ELIGIBLE_STATES: [string, string][] = [
  ['AL', 'Alabama'], ['AR', 'Arkansas'], ['AZ', 'Arizona'], ['CA', 'California'],
  ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DC', 'Washington D.C.'], ['DE', 'Delaware'],
  ['FL', 'Florida'], ['GA', 'Georgia'], ['ID', 'Idaho'], ['IL', 'Illinois'],
  ['IN', 'Indiana'], ['KS', 'Kansas'], ['KY', 'Kentucky'], ['MI', 'Michigan'],
  ['MS', 'Mississippi'], ['MT', 'Montana'], ['NC', 'North Carolina'], ['ND', 'North Dakota'],
  ['NE', 'Nebraska'], ['NH', 'New Hampshire'], ['NM', 'New Mexico'], ['NV', 'Nevada'],
  ['OH', 'Ohio'], ['OR', 'Oregon'], ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'],
  ['SC', 'South Carolina'], ['TN', 'Tennessee'], ['TX', 'Texas'], ['UT', 'Utah'],
  ['VA', 'Virginia'], ['VT', 'Vermont'], ['WA', 'Washington'], ['WV', 'West Virginia'],
  ['WY', 'Wyoming'],
]

const EXCLUDED_STATES: [string, string][] = [
  ['AK', 'Alaska'], ['HI', 'Hawaii'], ['IA', 'Iowa'], ['LA', 'Louisiana'],
  ['ME', 'Maine'], ['MD', 'Maryland'], ['MA', 'Massachusetts'], ['MN', 'Minnesota'],
  ['MO', 'Missouri'], ['NJ', 'New Jersey'], ['NY', 'New York'], ['OK', 'Oklahoma'],
  ['SD', 'South Dakota'], ['WI', 'Wisconsin'],
]

const faqs = [
  {
    q: 'Why isn\'t Yendo available in my state?',
    a: 'Yendo\'s availability depends on state-level financial regulations and licensing requirements. Secured credit card products that use vehicle titles as collateral require specific state approvals. Yendo is actively expanding — check their website for the latest coverage updates.',
  },
  {
    q: 'What\'s the best alternative if Yendo isn\'t in my state?',
    a: 'If you\'re in one of the 14 excluded states, Slam Dunk Loans is a strong alternative — personal loans up to $50,000 with any credit history welcome. For credit building specifically, consider secured cards like OpenSky (no credit check required) or Credit Builder loans through your local credit union.',
  },
  {
    q: 'Is Yendo expanding to more states?',
    a: 'Yendo has been expanding steadily. The product requires vehicle title placement which varies in complexity by state. Check Yendo\'s website directly for current expansion news. At launch they were in fewer states; the current 37-state coverage reflects significant growth.',
  },
  {
    q: 'Can I use a Yendo card from a state it\'s not licensed in?',
    a: 'No. Eligibility is determined by your state of residence, not where you use the card. If you live in an excluded state, you won\'t qualify regardless of where you travel or shop.',
  },
  {
    q: 'Does moving to an eligible state qualify me for Yendo?',
    a: 'If you permanently relocate to an eligible state and update your address, you could then apply. Yendo would verify your state of residence during the application process.',
  },
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Yendo Available in My State? Complete State Eligibility Guide',
    description: 'Full state-by-state guide to Yendo car-secured credit card availability, with alternatives for excluded states.',
    datePublished: '2026-04-06',
    dateModified: '2026-04-06',
    author: { '@type': 'Organization', name: 'Mintbrooks' },
    publisher: { '@type': 'Organization', name: 'Mintbrooks', url: 'https://mintbrooks.com' },
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

export default function YendoStatesGuidePage() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <NavBar />

      <main className="min-h-screen" style={{ background: '#0f0f0f', color: '#f5f5f0' }}>

        {/* Hero */}
        <section className="px-5 pt-16 pb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: 'rgba(217,119,6,0.15)', color: '#d97706', border: '1px solid rgba(217,119,6,0.3)' }}>
            Updated April 2026 · 37 States + DC
          </div>

          <h1 className="text-4xl font-black mb-4 leading-tight">
            Is <span style={{ color: '#d97706' }}>Yendo</span> Available<br />in Your State?
          </h1>
          <p className="text-lg mb-8" style={{ color: '#a8a29e' }}>
            Yendo car-secured Visa cards are available in <strong style={{ color: '#34d399' }}>37 states + DC</strong>.
            If your state is covered, you can check eligibility in 60 seconds — no hard credit pull.
          </p>

          <AffiliateLink
            href={YENDO_STATES_HERO}
            placement="states-guide-hero"
            className="inline-block px-8 py-4 rounded-xl font-black text-lg"
            style={{ background: '#d97706', color: '#fff' }}
          >
            Check If My State Qualifies →
          </AffiliateLink>

          <p className="text-xs mt-3" style={{ color: '#78716c' }}>
            Soft pull only · Won&apos;t affect your credit score
          </p>
        </section>

        {/* Quick answer section */}
        <section className="px-5 pb-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">

            {/* Eligible */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
                  style={{ background: 'rgba(52,211,153,0.2)', color: '#34d399' }}>
                  ✓
                </div>
                <h2 className="text-lg font-black" style={{ color: '#34d399' }}>
                  Yendo-Eligible States ({ELIGIBLE_STATES.length})
                </h2>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {ELIGIBLE_STATES.map(([abbr, name]) => (
                  <div key={abbr} className="text-center py-1.5 px-2 rounded-lg text-sm"
                    style={{ background: 'rgba(52,211,153,0.1)', color: '#a7f3d0' }}
                    title={name}>
                    {abbr}
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(52,211,153,0.15)' }}>
                <AffiliateLink
                  href={YENDO_STATES_TABLE}
                  placement="states-guide-table"
                  className="block w-full text-center py-3 rounded-xl font-black text-sm"
                  style={{ background: '#34d399', color: '#0f0f0f' }}
                >
                  Check Yendo Eligibility →
                </AffiliateLink>
              </div>
            </div>

            {/* Not eligible */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
                  style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171' }}>
                  ✕
                </div>
                <h2 className="text-lg font-black" style={{ color: '#f87171' }}>
                  Not Yet Available ({EXCLUDED_STATES.length} states)
                </h2>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {EXCLUDED_STATES.map(([abbr, name]) => (
                  <div key={abbr} className="text-center py-1.5 px-2 rounded-lg text-sm"
                    style={{ background: 'rgba(239,68,68,0.08)', color: '#fca5a5' }}
                    title={name}>
                    {abbr}
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(239,68,68,0.12)' }}>
                <AffiliateLink
                  href={SLAM_DUNK_STATES}
                  placement="states-guide-fallback"
                  className="block w-full text-center py-3 rounded-xl font-black text-sm"
                  style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}
                >
                  Find Your Best Alternative →
                </AffiliateLink>
                <p className="text-xs text-center mt-2" style={{ color: '#78716c' }}>
                  Personal loans up to $50k · Any credit welcome
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Full state table */}
        <section className="px-5 pb-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-black mb-2">Full State Eligibility Table</h2>
          <p className="mb-8" style={{ color: '#a8a29e' }}>
            Every US state and territory — with eligibility status and the best option if Yendo isn&apos;t available.
          </p>

          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <th className="text-left py-3 px-4 font-bold" style={{ color: '#a8a29e' }}>State</th>
                  <th className="text-left py-3 px-4 font-bold" style={{ color: '#a8a29e' }}>Yendo</th>
                  <th className="text-left py-3 px-4 font-bold hidden sm:table-cell" style={{ color: '#a8a29e' }}>Best Option</th>
                </tr>
              </thead>
              <tbody>
                {[...ELIGIBLE_STATES, ...EXCLUDED_STATES]
                  .sort((a, b) => a[1].localeCompare(b[1]))
                  .map(([abbr, name], i) => {
                    const eligible = ELIGIBLE_STATES.some(([s]) => s === abbr)
                    return (
                      <tr key={abbr}
                        style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                        <td className="py-3 px-4 font-semibold">
                          <span className="hidden sm:inline">{name} </span>
                          <span style={{ color: '#78716c' }}>({abbr})</span>
                        </td>
                        <td className="py-3 px-4">
                          {eligible ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                              style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399' }}>
                              ✓ Available
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                              style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }}>
                              ✕ Not yet
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 hidden sm:table-cell" style={{ color: '#a8a29e' }}>
                          {eligible ? (
                            <AffiliateLink href={YENDO_STATES_TABLE} placement="states-guide-table-row"
                              className="text-xs font-semibold hover:underline"
                              style={{ color: '#d97706' }}>
                              Check Yendo eligibility →
                            </AffiliateLink>
                          ) : (
                            <AffiliateLink href={SLAM_DUNK_STATES} placement="states-guide-fallback-row"
                              className="text-xs font-semibold hover:underline"
                              style={{ color: '#a8a29e' }}>
                              Try Slam Dunk Loans →
                            </AffiliateLink>
                          )}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </section>

        {/* What to do if excluded */}
        <section className="px-5 pb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-black mb-4">My State Isn&apos;t on the List. Now What?</h2>
          <p className="mb-6" style={{ color: '#a8a29e' }}>
            If you&apos;re in one of the 14 states where Yendo isn&apos;t yet available, you still have strong options.
            Here&apos;s the hierarchy we recommend for bad-credit borrowers:
          </p>

          <div className="space-y-4">
            {[
              {
                rank: '1',
                title: 'Slam Dunk Loans — Personal Loans Up to $50,000',
                desc: 'Any credit welcome. Fast decision. Great for consolidating debt or covering a one-time expense while you rebuild. Not a credit card, but a fast path to cash.',
                tag: 'Best Alternative',
                tagColor: '#d97706',
                href: SLAM_DUNK_STATES,
                cta: 'Check Loan Options →',
              },
              {
                rank: '2',
                title: 'OpenSky Secured Visa — No Credit Check Required',
                desc: 'OpenSky doesn\'t even pull your credit. You deposit $200–$3,000 and get a card with that limit. It reports to all 3 bureaus monthly — great for rebuilding.',
                tag: 'Credit Builder',
                tagColor: '#34d399',
                href: null,
                cta: 'Visit OpenSky.com →',
              },
              {
                rank: '3',
                title: 'Credit Builder Loan — Via Local Credit Union',
                desc: 'You "borrow" money that gets held in a savings account. You make monthly payments. When paid off, you get the money AND a credit history. Low risk, high impact.',
                tag: 'Long-term Strategy',
                tagColor: '#78716c',
                href: null,
                cta: 'Search your local credit union',
              },
            ].map((item) => (
              <div key={item.rank} className="flex gap-4 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#78716c' }}>
                  {item.rank}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-black text-base">{item.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: `${item.tagColor}20`, color: item.tagColor }}>
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-sm mb-3" style={{ color: '#a8a29e' }}>{item.desc}</p>
                  {item.href ? (
                    <AffiliateLink href={item.href} placement="states-guide-alternatives"
                      className="text-sm font-bold hover:underline" style={{ color: item.tagColor }}>
                      {item.cta}
                    </AffiliateLink>
                  ) : (
                    <span className="text-sm font-bold" style={{ color: item.tagColor }}>{item.cta}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="px-5 pb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-black mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details key={q}
                className="group rounded-xl p-5 cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <summary className="font-black text-base list-none flex justify-between items-center gap-3">
                  {q}
                  <span className="text-xl flex-shrink-0 transition-transform group-open:rotate-45"
                    style={{ color: '#d97706' }}>+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: '#a8a29e' }}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-5 pb-20 max-w-2xl mx-auto text-center">
          <div className="rounded-3xl p-8" style={{ background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.2)' }}>
            <h2 className="text-2xl font-black mb-3">Your State Is Covered?</h2>
            <p className="mb-6" style={{ color: '#a8a29e' }}>
              Check eligibility in 60 seconds. Soft pull only — won&apos;t hurt your score.
              Credit lines from $500 to $10,000 based on your car&apos;s value.
            </p>
            <AffiliateLink
              href={YENDO_STATES_CTA}
              placement="states-guide-final-cta"
              className="inline-block px-8 py-4 rounded-xl font-black text-lg"
              style={{ background: '#d97706', color: '#fff' }}
            >
              Check If My Car Qualifies →
            </AffiliateLink>
          </div>
        </section>

        {/* Internal links */}
        <section className="px-5 pb-16 max-w-3xl mx-auto">
          <h3 className="text-lg font-black mb-4" style={{ color: '#78716c' }}>Related Guides</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { href: '/yendo-credit-card-review', label: 'Yendo Credit Card Review' },
              { href: '/car-equity-vs-secured-cards', label: 'Car Equity vs. Secured Cards' },
              { href: '/credit-card-500-credit-score', label: 'Credit Cards for 500 Score' },
            ].map(({ href, label }) => (
              <Link key={href} href={href}
                className="block p-4 rounded-xl text-sm font-semibold text-center hover:opacity-80 transition-opacity"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#d97706' }}>
                {label}
              </Link>
            ))}
          </div>
        </section>

        {/* Disclosure */}
        <footer className="px-5 pb-10 max-w-3xl mx-auto text-center">
          <p className="text-xs" style={{ color: '#57534e' }}>
            Affiliate disclosure: Mintbrooks may earn a commission when you apply through our links at no extra cost to you.
            We are not a lender. State eligibility data is based on publicly available information and may change.
            Always verify current availability directly with Yendo.
          </p>
        </footer>
      </main>
    </>
  )
}
