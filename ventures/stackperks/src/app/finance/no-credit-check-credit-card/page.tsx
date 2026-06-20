import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import { OFFERS, buildAffiliateUrl } from '@/lib/offers'

const YENDO_NO_CHECK_HERO = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'no-check-hero')
const YENDO_NO_CHECK_MID  = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'no-check-mid')
const YENDO_NO_CHECK_BOT  = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'no-check-cta')
const SLAM_NO_CHECK       = buildAffiliateUrl(OFFERS.slamDunk.url, 'organic', 'seo', 'no-check-fallback')

export const metadata: Metadata = {
  title: 'No Credit Check Credit Cards 2026 — Real Options That Work',
  description:
    'Looking for a credit card with no credit check? Compare the real options — no-check secured cards, car-secured cards, and credit-builder accounts — ranked by approval odds.',
  alternates: { canonical: 'https://mintbrooks.com/finance/no-credit-check-credit-card' },
  openGraph: {
    title: 'No Credit Check Credit Cards 2026 — Mintbrooks',
    description:
      'No credit check credit cards ranked by real approval odds. Find the best option for your situation — no deposit, no hard pull, no rejection.',
    url: 'https://mintbrooks.com/finance/no-credit-check-credit-card',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'No Credit Check Credit Cards 2026 — Real Options That Work',
  description:
    'A plain-English comparison of no credit check credit card options, ranked by approval accessibility and credit-building value.',
  url: 'https://mintbrooks.com/finance/no-credit-check-credit-card',
  author: { '@type': 'Organization', name: 'Mintbrooks' },
  publisher: { '@type': 'Organization', name: 'Mintbrooks', url: 'https://mintbrooks.com' },
  datePublished: '2026-04-08',
  dateModified: '2026-04-08',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a no credit check credit card?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "A no credit check credit card approves applicants without running a hard inquiry on your credit report. Some use a soft pull to verify identity; others use alternative underwriting (like vehicle equity or a cash deposit). OpenSky Secured Visa is widely known for requiring no credit check at all.",
      },
    },
    {
      '@type': 'Question',
      name: 'Will a no credit check card build my credit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — as long as the card reports to the three major credit bureaus (Equifax, Experian, TransUnion). Most legitimate no-check cards do. On-time payments and keeping utilization below 30% are the two biggest drivers of score improvement.',
      },
    },
    {
      '@type': 'Question',
      name: "What's the difference between a soft pull and no credit check?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A soft pull checks your credit file but does NOT affect your score — lenders use it for pre-qualification. A hard pull does affect your score (typically a small, temporary dip of 1–5 points). Some "no credit check" cards still do a soft pull to verify identity — that\'s fine. The key is avoiding a hard pull before you know you qualify.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get a no credit check credit card with no deposit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — if you own a car with equity. Yendo's car-secured credit card uses your vehicle's value as collateral instead of a cash deposit. No hard credit check for pre-qualification, no deposit, and you keep your car. State availability restrictions apply.",
      },
    },
  ],
}

export default function NoCheckCreditCardPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <NavBar />
      <article className="max-w-3xl mx-auto px-4 py-14">

        {/* Breadcrumb */}
        <nav className="text-xs mb-6 flex items-center gap-2" style={{ color: '#a8a29e' }}>
          <Link href="/" className="hover:text-amber-700 transition-colors">Mintbrooks</Link>
          <span>›</span>
          <Link href="/finance" className="hover:text-amber-700 transition-colors">Finance</Link>
          <span>›</span>
          <span>No Credit Check Cards</span>
        </nav>

        {/* Header */}
        <div className="section-label mb-3">Credit Cards</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>
          No Credit Check Credit Cards (2026)
        </h1>
        <p className="text-lg mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          Most "no credit check" card lists show you the same 3 secured cards with a $200 deposit requirement. This guide shows all real options — including one that requires zero deposit if you own a car.
        </p>

        {/* Top Pick Callout — Car-Secured */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.2)' }}>
          <div className="font-bold mb-2" style={{ color: '#d97706' }}>🏆 Best No-Check Option If You Own a Car</div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#78716c' }}>
            <strong style={{ color: '#1c1917' }}>Yendo</strong> uses your car's equity — not your credit score — to set your credit limit. Pre-qualification uses a <strong style={{ color: '#1c1917' }}>soft pull only</strong> (no score impact). No cash deposit. You keep driving. Limits up to $10,000.
          </p>
          <AffiliateLink href={YENDO_NO_CHECK_HERO} placement="no-check-hero" className="btn-primary text-sm py-2 px-5 inline-block">
            Check If My Car Qualifies →
          </AffiliateLink>
          <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>Soft inquiry only · Affiliate link · State restrictions apply</p>
        </div>

        {/* What "no credit check" actually means */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>
          What "No Credit Check" Actually Means
        </h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          The term is used loosely. There are three categories:
        </p>
        <div className="space-y-4 mb-8">
          {[
            {
              label: 'True no credit check',
              desc: 'No inquiry of any kind. OpenSky Secured Visa is the most well-known example — they approve based on your $200+ cash deposit, no credit file review.',
              badge: 'Easiest approval',
              color: '#34d399',
            },
            {
              label: 'Soft pull only',
              desc: "Pre-qualification checks your credit for identity verification but does NOT affect your score. Yendo uses a soft pull. You see your eligibility before any hard inquiry. Most car-secured cards work this way.",
              badge: 'Score-safe',
              color: '#d97706',
            },
            {
              label: '"No credit check" with a hard pull at final step',
              desc: 'Misleading marketing. The pre-qualify is soft, but proceeding to the full application triggers a hard pull. Always read the fine print before submitting your SSN.',
              badge: 'Watch out',
              color: '#ef4444',
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl p-5"
              style={{ background: '#ffffff', border: '1px solid rgba(28,25,23,0.08)', boxShadow: '0 1px 8px rgba(28,25,23,0.05)' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold text-sm" style={{ color: '#1c1917' }}>{item.label}</span>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${item.color}22`, color: item.color }}
                >
                  {item.badge}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <h2 className="text-2xl font-black mb-6" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>
          Top No Credit Check Cards — Ranked by Approval Accessibility
        </h2>

        <div className="space-y-5 mb-12">
          {[
            {
              rank: 1,
              name: 'Car-Secured Card (Yendo)',
              check: 'Soft pull only',
              deposit: 'None — car equity',
              limit: '$500–$10,000',
              annual: '~$75/year',
              bureaus: 'All 3',
              verdict: '★ Best if you own a car — highest limits, zero deposit',
              highlight: true,
              cta: true,
            },
            {
              rank: 2,
              name: 'OpenSky Secured Visa',
              check: 'No credit check',
              deposit: '$200+ cash',
              limit: 'Equals deposit',
              annual: '$35/year',
              bureaus: 'All 3',
              verdict: 'Best true no-check option — requires cash deposit',
              highlight: false,
              cta: false,
            },
            {
              rank: 3,
              name: 'Chime Credit Builder',
              check: 'No credit check',
              deposit: 'Chime account balance',
              limit: 'Flexible (account balance)',
              annual: 'None',
              bureaus: 'All 3',
              verdict: 'No annual fee, no interest — requires Chime direct deposit',
              highlight: false,
              cta: false,
            },
            {
              rank: 4,
              name: 'Self Visa Credit Builder',
              check: 'Soft pull',
              deposit: 'Credit builder loan',
              limit: 'Grows over time',
              annual: '$25/year',
              bureaus: 'All 3',
              verdict: 'Loan + card combo — builds savings while building credit',
              highlight: false,
              cta: false,
            },
          ].map((card) => (
            <div
              key={card.rank}
              className="rounded-2xl p-5"
              style={{
                background: card.highlight ? '#fef9ee' : '#ffffff',
                border: card.highlight ? '2px solid rgba(217,119,6,0.3)' : '1px solid rgba(28,25,23,0.08)',
                boxShadow: '0 2px 12px rgba(28,25,23,0.06)',
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#a8a29e' }}>#{card.rank}</span>
                  <h3 className="font-black text-lg" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>{card.name}</h3>
                  <p className="text-sm" style={{ color: card.highlight ? '#d97706' : '#78716c' }}>{card.verdict}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {[
                  { label: 'Credit Check', val: card.check },
                  { label: 'Deposit', val: card.deposit },
                  { label: 'Credit Limit', val: card.limit },
                  { label: 'Annual Fee', val: card.annual },
                ].map(({ label, val }) => (
                  <div key={label} className="rounded-lg p-3" style={{ background: 'rgba(28,25,23,0.03)' }}>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#a8a29e' }}>{label}</div>
                    <div className="text-sm font-semibold" style={{ color: '#1c1917' }}>{val}</div>
                  </div>
                ))}
              </div>
              {card.cta && (
                <div>
                  <AffiliateLink href={YENDO_NO_CHECK_MID} placement="no-check-mid" className="btn-primary text-sm py-2 px-5 inline-block">
                    Check If My Car Qualifies →
                  </AffiliateLink>
                  <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>Soft inquiry only · Affiliate link</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pros & Cons: No Deposit (Yendo) vs Cash Deposit (OpenSky) */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>
          No Deposit vs. Cash Deposit: Which Is Right for You?
        </h2>
        <p className="mb-6 leading-relaxed" style={{ color: '#78716c' }}>
          The biggest fork in the decision tree is whether you can tie up $200–$500 in a deposit. Here's how to think about it:
        </p>
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {[
            {
              title: 'Car-Secured Card (Yendo)',
              desc: 'No deposit, but requires a fully paid-off car with equity.',
              pros: ['$0 upfront deposit', 'Up to $10,000 limit', 'Soft pull only to pre-qualify', 'Keep driving your car'],
              cons: ['Need a paid-off car in your name', 'Not available in all states', 'Annual fee applies'],
              badge: 'Best for car owners',
              color: '#d97706',
            },
            {
              title: 'Secured Card (OpenSky)',
              desc: 'No credit check, but requires a cash deposit you don\'t spend.',
              pros: ['True no credit check', 'No bank account required (money order OK)', '$200 minimum deposit', 'Widely available nationwide'],
              cons: ['Deposit tied up (not earning interest)', 'Limit equals your deposit', '$35 annual fee', 'Lower limits than Yendo'],
              badge: 'Best if no car',
              color: '#34d399',
            },
          ].map((opt) => (
            <div
              key={opt.title}
              className="rounded-2xl p-5"
              style={{ background: '#ffffff', border: '1px solid rgba(28,25,23,0.08)', boxShadow: '0 1px 8px rgba(28,25,23,0.04)' }}
            >
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full inline-block mb-3"
                style={{ background: `${opt.color}22`, color: opt.color }}
              >
                {opt.badge}
              </span>
              <h3 className="font-black text-base mb-1" style={{ color: '#1c1917' }}>{opt.title}</h3>
              <p className="text-sm mb-4" style={{ color: '#78716c' }}>{opt.desc}</p>
              <div className="space-y-1 mb-3">
                {opt.pros.map((p) => (
                  <div key={p} className="flex items-start gap-2 text-sm" style={{ color: '#374151' }}>
                    <span style={{ color: '#34d399', marginTop: '2px', flexShrink: 0 }}>✓</span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                {opt.cons.map((c) => (
                  <div key={c} className="flex items-start gap-2 text-sm" style={{ color: '#78716c' }}>
                    <span style={{ color: '#ef4444', marginTop: '2px', flexShrink: 0 }}>✗</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* How to use to build credit */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>
          How to Actually Build Credit With a No-Check Card
        </h2>
        <p className="mb-6 leading-relaxed" style={{ color: '#78716c' }}>
          Getting approved is step one. The card only builds credit if you use it correctly. Most people don't.
        </p>
        <div className="space-y-4 mb-10">
          {[
            {
              step: '01',
              title: 'Use it for one small recurring charge',
              body: 'A Netflix subscription or gas fill-up per month is ideal. Spend $20–$50 consistently. This establishes payment history without risking overextension.',
            },
            {
              step: '02',
              title: 'Keep utilization below 30%',
              body: 'If your limit is $500, keep your balance below $150. The bureaus see your utilization on your statement date, not when you pay — so lower is always better.',
            },
            {
              step: '03',
              title: 'Pay the full balance every month',
              body: 'Interest charges are not how credit is built — they\'re a cost. Paying in full avoids interest entirely while still generating positive payment history.',
            },
            {
              step: '04',
              title: 'Wait 6–12 months before applying for new credit',
              body: 'Your score needs time to reflect your new positive history. Applying for multiple cards immediately after getting your first one generates multiple hard pulls and signals risk to lenders.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex gap-5 rounded-2xl p-5"
              style={{ background: '#ffffff', border: '1px solid rgba(28,25,23,0.08)' }}
            >
              <div
                className="font-black text-2xl flex-shrink-0 w-10 text-center"
                style={{ color: '#d97706', opacity: 0.7, fontVariantNumeric: 'tabular-nums' }}
              >
                {item.step}
              </div>
              <div>
                <h3 className="font-bold mb-1" style={{ color: '#1c1917' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mid-page CTA */}
        <div className="rounded-2xl p-6 mb-12 text-center" style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)' }}>
          <h3 className="font-black text-xl mb-2" style={{ color: '#ffffff' }}>Own a car? Check your eligibility now.</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>Soft pull only. Takes 60 seconds. No impact to your credit score.</p>
          <AffiliateLink href={YENDO_NO_CHECK_MID} placement="no-check-mid-cta" className="btn-amber inline-block">
            Check If My Car Qualifies →
          </AffiliateLink>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.35)' }}>Affiliate link · Mintbrooks may earn a commission</p>
        </div>

        {/* FAQ */}
        <h2 className="text-2xl font-black mb-6" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 mb-12">
          {[
            {
              q: 'What is a no credit check credit card?',
              a: "A no credit check credit card approves applicants without running a hard inquiry on your credit report. Some use a soft pull to verify identity; others use alternative underwriting (like vehicle equity or a cash deposit). OpenSky Secured Visa is widely known for requiring no credit check at all.",
            },
            {
              q: 'Will a no credit check card build my credit?',
              a: 'Yes — as long as the card reports to the three major credit bureaus. Most legitimate no-check cards do. On-time payments and keeping utilization below 30% are the two biggest drivers of score improvement.',
            },
            {
              q: "What's the difference between a soft pull and no credit check?",
              a: "A soft pull checks your credit file but does NOT affect your score — lenders use it for pre-qualification. A hard pull does affect your score (typically a small, temporary dip of 1–5 points). Some 'no credit check' cards still do a soft pull to verify identity — that's fine.",
            },
            {
              q: 'Can I get a no credit check credit card with no deposit?',
              a: "Yes — if you own a car with equity. Yendo's car-secured credit card uses your vehicle's value as collateral instead of a cash deposit. No hard credit check for pre-qualification, no deposit, and you keep your car. State availability restrictions apply.",
            },
            {
              q: 'What is the easiest no credit check card to get approved for?',
              a: "OpenSky Secured Visa has historically been one of the most accessible — they approve based on a $200+ cash deposit with no credit review. If you own a paid-off car, Yendo may offer better terms (higher limit, no deposit), though state availability restrictions apply.",
            },
          ].map(({ q, a }, i) => (
            <details
              key={i}
              className="rounded-xl overflow-hidden"
              style={{ background: '#ffffff', border: '1px solid rgba(217,119,6,0.15)' }}
            >
              <summary
                className="cursor-pointer font-semibold"
                style={{ padding: '18px 24px', color: '#1c1917', listStyle: 'none', fontSize: '15px' }}
              >
                {q}
              </summary>
              <div style={{ padding: '0 24px 18px', color: '#78716c', fontSize: '14px', lineHeight: 1.75, borderTop: '1px solid rgba(217,119,6,0.08)', paddingTop: '14px' }}>
                {a}
              </div>
            </details>
          ))}
        </div>

        {/* Related guides */}
        <div className="mb-12">
          <h3 className="font-bold mb-4" style={{ color: '#1c1917' }}>Related Guides</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { href: '/finance/bad-credit-credit-card', label: 'Best Credit Cards for Bad Credit' },
              { href: '/finance/secured-credit-card-bad-credit', label: 'Secured Credit Cards — Full Guide' },
              { href: '/finance/credit-card-to-rebuild-credit', label: 'Best Cards to Rebuild Credit' },
              { href: '/finance/how-to-rebuild-credit', label: 'How to Rebuild Credit Fast' },
              { href: '/finance/yendo-review', label: 'Yendo Car-Secured Card: Full Review' },
              { href: '/finance/credit-card-no-deposit', label: 'Credit Cards With No Deposit' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium hover:text-amber-700 transition-colors"
                style={{ color: '#d97706' }}
              >
                → {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.2)' }}>
          <h3 className="font-bold text-lg mb-2" style={{ color: '#1c1917' }}>Ready to check your options?</h3>
          <p className="text-sm mb-4" style={{ color: '#78716c' }}>
            If you own a car, Yendo pre-qualification takes 60 seconds with no score impact. See your potential credit limit before committing.
          </p>
          <AffiliateLink href={YENDO_NO_CHECK_BOT} placement="no-check-cta" className="btn-primary text-sm py-2 px-5 inline-block">
            Check If My Car Qualifies →
          </AffiliateLink>
          <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>Soft inquiry only · Affiliate link · No score impact</p>
        </div>

        {/* FTC Disclosure */}
        <div
          className="rounded-xl p-4"
          style={{ border: '1px solid rgba(217,119,6,0.1)', background: 'rgba(217,119,6,0.02)' }}
        >
          <p className="text-xs leading-relaxed" style={{ color: '#a8a29e' }}>
            <strong style={{ color: '#78716c' }}>Advertising Disclosure:</strong>{' '}
            Mintbrooks may earn a commission if you apply through links on this page. This does not affect our editorial rankings or recommendations. Verify all terms directly with card issuers before applying.{' '}
            <Link href="/privacy" style={{ color: '#d97706', textDecoration: 'underline' }}>Full disclosure.</Link>
          </p>
        </div>
      </article>
    </>
  )
}
