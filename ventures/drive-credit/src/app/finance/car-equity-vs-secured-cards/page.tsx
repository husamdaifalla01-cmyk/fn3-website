import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import { YENDO_COMPARISON_HERO, YENDO_COMPARISON_TABLE, YENDO_COMPARISON_CTA } from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'Car Equity Credit Card vs Secured Credit Cards (2026 Comparison) — Mintbrooks',
  description: 'Side-by-side comparison of Yendo car-equity credit card vs OpenSky, Discover, and Chime secured cards. See which option fits your credit situation — no deposit required with car equity.',
  keywords: 'car equity credit card vs secured card, yendo vs opensky, yendo vs discover secured, no deposit credit card, secured credit card comparison, credit card bad credit',
  alternates: { canonical: 'https://mintbrooks.com/finance/car-equity-vs-secured-cards' },
  openGraph: {
    title: 'Car Equity Credit Card vs Secured Credit Cards — 2026 Comparison',
    description: 'Compare Yendo car-equity card against traditional secured cards. No cash deposit needed when you use your car.',
    type: 'article',
    url: 'https://mintbrooks.com/car-equity-vs-secured-cards',
  },
}

const cards = [
  {
    name: 'Yendo Car-Equity Visa',
    highlight: true,
    deposit: 'None — your car is the collateral',
    creditCheck: 'Soft pull only (no score impact)',
    creditLimit: '$500 – $10,000',
    annualFee: '$0',
    buildsCredit: 'Yes — reports to all 3 bureaus',
    advantage: 'Higher limits without tying up cash',
  },
  {
    name: 'OpenSky Secured Visa',
    highlight: false,
    deposit: '$200 – $3,000 cash deposit',
    creditCheck: 'No credit check',
    creditLimit: '$200 – $3,000 (equals deposit)',
    annualFee: '$35',
    buildsCredit: 'Yes — reports to all 3 bureaus',
    advantage: 'No credit check at all',
  },
  {
    name: 'Discover it Secured',
    highlight: false,
    deposit: '$200 – $2,500 cash deposit',
    creditCheck: 'Hard pull',
    creditLimit: '$200 – $2,500 (equals deposit)',
    annualFee: '$0',
    buildsCredit: 'Yes — reports to all 3 bureaus',
    advantage: '2% cash back at restaurants & gas',
  },
  {
    name: 'Chime Credit Builder',
    highlight: false,
    deposit: 'No upfront deposit (use Chime account balance)',
    creditCheck: 'No credit check',
    creditLimit: '$0 – $10,000 (varies by balance)',
    annualFee: '$0',
    buildsCredit: 'Yes — reports to all 3 bureaus',
    advantage: 'No credit check, no annual fee',
  },
]

const comparisonRows = [
  { label: 'Deposit Required', key: 'deposit' as const },
  { label: 'Credit Check Type', key: 'creditCheck' as const },
  { label: 'Credit Limit Range', key: 'creditLimit' as const },
  { label: 'Annual Fee', key: 'annualFee' as const },
  { label: 'Builds Credit', key: 'buildsCredit' as const },
  { label: 'Unique Advantage', key: 'advantage' as const },
]

const faqs = [
  {
    q: 'What is a car-equity credit card?',
    a: 'A car-equity credit card uses the value of your vehicle as collateral instead of requiring a cash deposit. A lien is placed on your car title, but you keep driving the car. Your credit limit is based on your car\'s equity rather than your credit score.',
  },
  {
    q: 'How is a car-equity card different from a secured card?',
    a: 'A traditional secured card requires you to deposit cash upfront — your credit limit usually equals your deposit. A car-equity card uses your vehicle as collateral instead, so you don\'t need to lock up hundreds or thousands in cash. Credit limits can also be significantly higher.',
  },
  {
    q: 'Does Yendo do a hard credit pull?',
    a: 'No. Yendo uses a soft inquiry to check eligibility, which does not affect your credit score. Traditional secured cards like the Discover it Secured do require a hard pull.',
  },
  {
    q: 'Can I still drive my car if I get a car-equity card?',
    a: 'Yes. You keep full possession and use of your vehicle. The lender places a lien on your title as a security interest, but the car stays with you.',
  },
  {
    q: 'Which option is best for someone with bad credit?',
    a: 'It depends on your situation. If you own a car with equity and don\'t want to tie up cash, a car-equity card like Yendo can offer higher limits. If you don\'t own a car or prefer not to use it as collateral, a traditional secured card with no credit check (like OpenSky or Chime) is a solid alternative. All four options report to credit bureaus and help build credit.',
  },
  {
    q: 'What happens if I miss payments on a car-equity card?',
    a: 'Late payments are reported to credit bureaus and will hurt your credit score. In severe, extended default situations, the lender could repossess the vehicle — similar to how a bank can foreclose on a home with a HELOC. Always review the full terms before applying.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: a,
    },
  })),
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Car Equity Credit Card vs Secured Credit Cards — 2026 Comparison',
  description: 'Side-by-side comparison of Yendo car-equity credit card vs OpenSky, Discover, and Chime secured cards.',
  datePublished: '2026-03-29',
  dateModified: '2026-03-29',
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <NavBar />
      <article className="max-w-4xl mx-auto px-4 py-14">

        {/* Breadcrumb */}
        <nav className="text-xs mb-6 flex items-center gap-2" style={{ color: '#a8a29e' }}>
          <Link href="/" className="hover:text-amber-700 transition-colors">Mintbrooks</Link>
          <span>›</span>
          <span>Car Equity vs Secured Cards</span>
        </nav>

        {/* Hero */}
        <div className="section-label mb-3">Comparison Guide</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>
          Car-Equity Credit Card vs Secured Credit Cards
        </h1>
        <p className="text-lg mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Secured credit cards have been the go-to for building credit with bad or no credit history.
          But there is another option: using your car&apos;s equity as collateral instead of a cash deposit.
          Here is how they compare side by side.
        </p>

        {/* Quick CTA above the fold */}
        <div className="mb-10">
          <AffiliateLink href={YENDO_COMPARISON_HERO} placement="comparison-hero" className="btn-primary inline-block py-3 px-8 text-sm">
            Check If My Car Qualifies →
          </AffiliateLink>
          <span className="text-xs ml-3" style={{ color: '#a8a29e' }}>Soft pull only — no score impact</span>
        </div>

        {/* ── Desktop comparison table ── */}
        <div className="hidden md:block mb-12 overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr>
                <th className="text-left p-4 font-bold" style={{ color: '#78716c', width: '18%' }}></th>
                {cards.map((card) => (
                  <th
                    key={card.name}
                    className="p-4 text-center font-black text-sm"
                    style={{
                      color: card.highlight ? '#d97706' : '#1c1917',
                      background: card.highlight ? '#fef9ee' : 'transparent',
                      borderTop: card.highlight ? '3px solid #d97706' : '1px solid rgba(28,25,23,0.08)',
                      borderLeft: card.highlight ? '1px solid rgba(217,119,6,0.2)' : '1px solid rgba(28,25,23,0.08)',
                      borderRight: card.highlight ? '1px solid rgba(217,119,6,0.2)' : '1px solid rgba(28,25,23,0.08)',
                      borderTopLeftRadius: card.highlight ? '12px' : '0',
                      borderTopRightRadius: card.highlight ? '12px' : '0',
                    }}
                  >
                    {card.name}
                    {card.highlight && (
                      <span className="block text-xs font-semibold mt-1" style={{ color: '#92400e' }}>Our Pick</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, rowIdx) => (
                <tr key={row.key}>
                  <td className="p-4 font-bold text-sm" style={{ color: '#1c1917', borderBottom: '1px solid rgba(28,25,23,0.06)' }}>
                    {row.label}
                  </td>
                  {cards.map((card) => (
                    <td
                      key={card.name}
                      className="p-4 text-center text-sm"
                      style={{
                        color: '#57534e',
                        background: card.highlight ? '#fef9ee' : 'transparent',
                        borderLeft: card.highlight ? '1px solid rgba(217,119,6,0.2)' : '1px solid rgba(28,25,23,0.08)',
                        borderRight: card.highlight ? '1px solid rgba(217,119,6,0.2)' : '1px solid rgba(28,25,23,0.08)',
                        borderBottom: rowIdx === comparisonRows.length - 1 && card.highlight
                          ? '1px solid rgba(217,119,6,0.2)'
                          : '1px solid rgba(28,25,23,0.06)',
                        borderBottomLeftRadius: rowIdx === comparisonRows.length - 1 && card.highlight ? '12px' : '0',
                        borderBottomRightRadius: rowIdx === comparisonRows.length - 1 && card.highlight ? '12px' : '0',
                      }}
                    >
                      {card[row.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Mobile card-based comparison ── */}
        <div className="md:hidden space-y-4 mb-12">
          {cards.map((card) => (
            <div
              key={card.name}
              className="rounded-2xl p-5"
              style={{
                background: card.highlight ? '#fef9ee' : 'white',
                border: card.highlight ? '2px solid rgba(217,119,6,0.3)' : '1px solid rgba(28,25,23,0.08)',
              }}
            >
              <h3 className="font-black text-base mb-3" style={{ color: card.highlight ? '#d97706' : '#1c1917' }}>
                {card.name}
                {card.highlight && (
                  <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded" style={{ background: '#fbbf24', color: '#92400e' }}>Our Pick</span>
                )}
              </h3>
              <div className="space-y-2">
                {comparisonRows.map((row) => (
                  <div key={row.key} className="flex justify-between text-sm gap-2">
                    <span className="font-semibold shrink-0" style={{ color: '#78716c' }}>{row.label}</span>
                    <span className="text-right" style={{ color: '#57534e' }}>{card[row.key]}</span>
                  </div>
                ))}
              </div>
              {card.highlight && (
                <div className="mt-4">
                  <AffiliateLink href={YENDO_COMPARISON_TABLE} placement="comparison-table-mobile" className="btn-primary inline-block py-2.5 px-6 text-sm w-full text-center">
                    Check If My Car Qualifies →
                  </AffiliateLink>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Deep dive section ── */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>
          Understanding Your Options
        </h2>

        <div className="space-y-6 mb-12">
          <div className="rounded-xl p-6" style={{ background: 'white', border: '1px solid rgba(28,25,23,0.08)' }}>
            <h3 className="font-black text-lg mb-2" style={{ color: '#1c1917' }}>Car-Equity Cards: Higher Limits, No Cash Tied Up</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}>
              A car-equity credit card like Yendo uses the value of your vehicle as collateral. Instead of depositing
              $200&ndash;$3,000 in cash that you cannot use, your car secures the credit line. This means credit limits
              up to $10,000 based on your vehicle&apos;s equity — without locking up your savings. A lien is placed on
              your car title, but you keep driving it normally.
            </p>
          </div>

          <div className="rounded-xl p-6" style={{ background: 'white', border: '1px solid rgba(28,25,23,0.08)' }}>
            <h3 className="font-black text-lg mb-2" style={{ color: '#1c1917' }}>Secured Cards: Proven and Widely Available</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}>
              Traditional secured credit cards are the most established path to building credit. You deposit cash as
              collateral, and your credit limit typically matches that deposit. Cards like OpenSky require no credit check
              at all, while Discover offers 2% cash back at restaurants and gas stations. The trade-off: your cash is
              locked until you close or graduate the account.
            </p>
          </div>

          <div className="rounded-xl p-6" style={{ background: 'white', border: '1px solid rgba(28,25,23,0.08)' }}>
            <h3 className="font-black text-lg mb-2" style={{ color: '#1c1917' }}>Which One Is Right for You?</h3>
            <ul className="text-sm leading-relaxed space-y-2 list-disc list-inside" style={{ color: '#78716c' }}>
              <li><strong style={{ color: '#1c1917' }}>You own a car with equity and want a higher limit:</strong> A car-equity card lets you access $500&ndash;$10,000 without a cash deposit.</li>
              <li><strong style={{ color: '#1c1917' }}>You prefer not to use your car as collateral:</strong> A traditional secured card is simpler — deposit cash, get your limit, build credit.</li>
              <li><strong style={{ color: '#1c1917' }}>You want cash back rewards:</strong> The Discover it Secured card offers 2% at restaurants and gas while you build credit.</li>
              <li><strong style={{ color: '#1c1917' }}>You have no credit history at all:</strong> OpenSky and Chime require no credit check — guaranteed approval with a deposit or Chime account.</li>
            </ul>
          </div>
        </div>

        {/* ── FAQ section ── */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 mb-10">
          {faqs.map(({ q, a }) => (
            <div key={q} className="rounded-xl p-5" style={{ background: 'white', border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-2 text-sm" style={{ color: '#1c1917' }}>{q}</div>
              <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{a}</p>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="rounded-2xl p-6 text-center mb-12" style={{ background: '#1c1917' }}>
          <h3 className="text-xl font-black text-white mb-2">Skip the Cash Deposit</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
            See if your car qualifies for a credit line up to $10,000. Soft inquiry only — no credit score impact.
          </p>
          <AffiliateLink href={YENDO_COMPARISON_CTA} placement="comparison-cta" className="btn-primary inline-block py-3 px-8">
            Check My Car&apos;s Eligibility →
          </AffiliateLink>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.28)' }}>Affiliate link · Mintbrooks is not a lender</p>
        </div>

        {/* ── Internal links ── */}
        <div className="rounded-xl p-5 mb-10" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.15)' }}>
          <div className="font-bold text-sm mb-3" style={{ color: '#1c1917' }}>Related Guides</div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/finance/how-it-works" className="underline hover:text-amber-700 transition-colors" style={{ color: '#d97706' }}>How Car-Secured Credit Works</Link>
            <Link href="/bad-credit-credit-card" className="underline hover:text-amber-700 transition-colors" style={{ color: '#d97706' }}>Best Cards for Bad Credit</Link>
            <Link href="/finance/calculator" className="underline hover:text-amber-700 transition-colors" style={{ color: '#d97706' }}>Credit Line Estimator</Link>
          </div>
        </div>

        {/* ── FTC Disclosure ── */}
        <div className="text-xs pt-8 leading-relaxed" style={{ color: '#a8a29e', borderTop: '1px solid rgba(28,25,23,0.07)' }}>
          <strong>Affiliate Disclosure:</strong> Mintbrooks is an independent educational resource and is not affiliated with Yendo, OpenSky, Discover, Chime, or any card issuer. We may earn a commission when you apply through our links at no additional cost to you. This does not influence our comparisons — card data is sourced from publicly available issuer materials as of March 2026. Information is for general education and does not constitute financial or legal advice. Card terms, fees, and availability are subject to change. Always read the full account agreement and issuer disclosures before applying.
        </div>
      </article>
    </>
  )
}
