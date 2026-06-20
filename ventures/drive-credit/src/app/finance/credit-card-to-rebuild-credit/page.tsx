import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import { OFFERS, buildAffiliateUrl } from '@/lib/offers'

const YENDO_REBUILD_HERO = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'rebuild-card-hero')
const YENDO_REBUILD_MID  = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'rebuild-card-mid')
const YENDO_REBUILD_BOT  = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'rebuild-card-cta')
const SLAM_REBUILD       = buildAffiliateUrl(OFFERS.slamDunk.url, 'organic', 'seo', 'rebuild-card-fallback')

export const metadata: Metadata = {
  title: 'Best Credit Card to Rebuild Credit in 2026 — Mintbrooks',
  description:
    'Looking for a credit card to rebuild credit? Compare secured cards, car-secured cards, and credit-builder options — with honest advice on which one works fastest.',
  alternates: { canonical: 'https://mintbrooks.com/finance/credit-card-to-rebuild-credit' },
  openGraph: {
    title: 'Best Credit Card to Rebuild Credit in 2026 — Mintbrooks',
    description:
      'Compare your real options for rebuilding credit: secured cards vs car-secured cards vs credit-builder loans — and which one reports fastest.',
    url: 'https://mintbrooks.com/credit-card-to-rebuild-credit',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best Credit Card to Rebuild Credit in 2026',
  description: 'A plain-English guide to choosing the right credit card to rebuild credit — secured, car-secured, or credit-builder loan.',
  url: 'https://mintbrooks.com/credit-card-to-rebuild-credit',
  author: { '@type': 'Organization', name: 'Mintbrooks' },
  publisher: { '@type': 'Organization', name: 'Mintbrooks', url: 'https://mintbrooks.com' },
  datePublished: '2026-04-07',
  dateModified: '2026-04-07',
}

const options = [
  {
    name: 'Car-Secured Credit Card (Yendo)',
    limit: '$500–$10,000',
    deposit: 'None (car is collateral)',
    reports: 'All 3 bureaus monthly',
    approval: 'Any credit score + car ownership',
    best: 'Highest limit, no cash deposit, builds credit fast',
    verdict: '★ Best overall for car owners with bad credit',
    highlight: true,
  },
  {
    name: 'Traditional Secured Card',
    limit: '$200–$500',
    deposit: '$200–$500 cash',
    reports: 'All 3 bureaus monthly',
    approval: 'Any credit score',
    best: 'Widely available, no car required',
    verdict: 'Good backup if you don\'t own a car',
    highlight: false,
  },
  {
    name: 'Credit-Builder Loan',
    limit: 'N/A (savings account)',
    deposit: 'Monthly payments ($25–$150)',
    reports: 'All 3 bureaus monthly',
    approval: 'Any credit score',
    best: 'Forces savings habit, no spending risk',
    verdict: 'Best for building payment history with no credit card',
    highlight: false,
  },
  {
    name: 'Store / Retail Card',
    limit: '$200–$500',
    deposit: 'None',
    reports: 'All 3 bureaus monthly',
    approval: 'Fair-bad credit often approved',
    best: 'Easy to get, no deposit',
    verdict: 'High APR and limited use — last resort',
    highlight: false,
  },
]

const faqs = [
  {
    question: 'How long does it take to rebuild credit with a credit card?',
    answer:
      'Most people see measurable improvement within 3–6 months of consistent on-time payments and low utilization. A full rebuild from bad to good credit typically takes 12–24 months. Car-secured cards with higher limits help faster because your utilization ratio improves more.',
  },
  {
    question: 'What credit score do I need to get a credit card to rebuild credit?',
    answer:
      'Most secured cards and car-secured cards accept any credit score — even 500 or below. Traditional secured cards require a cash deposit. Car-secured cards like Yendo use your vehicle equity instead, so there\'s no minimum score requirement.',
  },
  {
    question: 'Does getting a secured card hurt your credit?',
    answer:
      'The application may trigger a hard inquiry (5-point temporary dip). But within 3–6 months of responsible use, the positive payment history far outweighs the initial dip. Yendo\'s eligibility check is a soft pull — zero impact before you formally apply.',
  },
  {
    question: 'Is a car-secured card better than a traditional secured card?',
    answer:
      'For most car owners, yes. Car-secured cards offer much higher limits ($500–$10,000 vs $200–$500), don\'t require a cash deposit, and report to all three bureaus. Higher credit limits mean lower utilization ratios — which is the second-biggest factor in your score after payment history.',
  },
  {
    question: 'Can I get a credit card to rebuild credit with no deposit?',
    answer:
      'Yes — a car-secured credit card requires no cash deposit. Your car\'s equity serves as collateral, so you keep your cash. Traditional secured cards require a $200–$500 deposit, which is refundable when you close or upgrade the account.',
  },
]

export default function CreditCardToRebuildCreditPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen" style={{ background: '#1c1917', color: '#e7e5e4' }}>
        <NavBar />

        {/* Hero */}
        <section className="max-w-3xl mx-auto px-5 pt-16 pb-10">
          <p className="text-xs font-semibold mb-3" style={{ color: '#d97706', letterSpacing: '0.1em' }}>
            CREDIT REBUILDING GUIDE
          </p>
          <h1 className="text-4xl font-black text-white mb-4 leading-tight">
            Best Credit Card to Rebuild Credit in 2026
          </h1>
          <p className="text-lg mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Secured cards, car-secured cards, credit-builder loans — they all claim to rebuild credit.
            Here&apos;s which one actually works fastest and costs the least.
          </p>

          {/* Callout: Car-owners */}
          <div
            className="rounded-xl p-5 mb-8"
            style={{ background: 'rgba(217,119,6,0.1)', border: '1px solid rgba(217,119,6,0.25)' }}
          >
            <p className="text-sm font-bold text-white mb-1">Own a car? Skip the cash deposit.</p>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Yendo turns your car&apos;s equity into a $500–$10,000 Visa card — no cash deposit, no minimum
              credit score, and the soft-pull eligibility check won&apos;t affect your score.
            </p>
            <AffiliateLink
              href={YENDO_REBUILD_HERO}
              offer="yendo"
              placement="rebuild-card-hero"
              className="inline-block px-5 py-3 rounded-xl font-bold text-white text-sm transition-all"
              style={{ background: '#d97706' }}
            >
              Check If My Car Qualifies →
            </AffiliateLink>
          </div>
        </section>

        {/* Why credit cards rebuild credit */}
        <section className="max-w-3xl mx-auto px-5 pb-10">
          <h2 className="text-2xl font-black text-white mb-4">Why a Credit Card Rebuilds Credit</h2>
          <p className="mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Credit scores are built from five factors. A credit card directly improves two of them:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              ['Payment history (35%)', 'Every on-time payment adds a positive mark. Missed payments are the #1 score killer.'],
              ['Credit utilization (30%)', 'The percentage of your limit you use. Keep it under 30% — the lower, the better. Higher-limit cards help more.'],
              ['Credit mix (10%)', 'Having a credit card + an installment loan (like a car loan) boosts your mix score.'],
            ].map(([factor, desc]) => (
              <li key={factor} className="flex gap-3">
                <span style={{ color: '#d97706' }} className="mt-0.5 flex-shrink-0">✓</span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  <strong className="text-white">{factor}:</strong> {desc}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            The key insight: a card with a <strong className="text-white">higher limit</strong> rebuilds credit faster,
            because the same $100 balance represents a lower utilization ratio.
            This is why car-secured cards outperform standard secured cards for rebuilding.
          </p>
        </section>

        {/* Comparison table */}
        <section className="max-w-3xl mx-auto px-5 pb-12">
          <h2 className="text-2xl font-black text-white mb-6">Comparison: Your 4 Options</h2>
          <div className="space-y-4">
            {options.map((opt) => (
              <div
                key={opt.name}
                className="rounded-xl p-5"
                style={{
                  background: opt.highlight ? 'rgba(217,119,6,0.08)' : 'rgba(255,255,255,0.04)',
                  border: opt.highlight ? '1px solid rgba(217,119,6,0.3)' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-bold text-white text-base">{opt.name}</h3>
                  {opt.highlight && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: 'rgba(217,119,6,0.2)', color: '#fbbf24' }}
                    >
                      TOP PICK
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-3">
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Limit: </span>
                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>{opt.limit}</span>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Deposit: </span>
                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>{opt.deposit}</span>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Reports: </span>
                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>{opt.reports}</span>
                  </div>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Approval: </span>
                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>{opt.approval}</span>
                  </div>
                </div>
                <p className="text-xs font-semibold" style={{ color: opt.highlight ? '#fbbf24' : 'rgba(255,255,255,0.5)' }}>
                  {opt.verdict}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mid CTA */}
        <section
          className="max-w-3xl mx-auto px-5 py-8 mb-10"
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <h2 className="text-2xl font-black text-white mb-2">
            Own a car? Check your eligibility — free, 2 minutes.
          </h2>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Yendo&apos;s car-secured Visa reports to all 3 bureaus monthly. Limits up to $10,000.
            Soft pull only — your score won&apos;t be affected.
          </p>
          <AffiliateLink
            href={YENDO_REBUILD_MID}
            offer="yendo"
            placement="rebuild-card-mid"
            className="inline-block px-6 py-3.5 rounded-xl font-bold text-white text-sm transition-all"
            style={{ background: '#d97706' }}
          >
            See If My Car Qualifies →
          </AffiliateLink>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.25)' }}>
            #ad · Mintbrooks may earn a commission. No cost to you.
          </p>
        </section>

        {/* How to use a credit card to rebuild credit */}
        <section className="max-w-3xl mx-auto px-5 pb-12">
          <h2 className="text-2xl font-black text-white mb-5">
            How to Use a Credit Card to Rebuild Credit (5-Step System)
          </h2>
          <ol className="space-y-5">
            {[
              ['Get the right card', 'Car-secured if you own a vehicle (highest limit, no deposit). Traditional secured if you don\'t. Avoid retail/store cards unless it\'s the only option.'],
              ['Set up autopay for the minimum', 'Never miss a payment — it\'s 35% of your score. Autopay the minimum to eliminate risk, then pay the full balance manually each month to avoid interest.'],
              ['Keep utilization under 10%', 'Don\'t just stay under 30% — aim for under 10%. On a $1,000 limit, keep your balance below $100. Report date matters: pay it down before your statement closes, not just the due date.'],
              ['Let time work for you', 'Every month of on-time payment history compounds. Don\'t close the account — length of credit history is 15% of your score. Keep it open and active with one small purchase per month.'],
              ['Add a second account at 6 months', 'Credit mix (10%) rewards diversity. At month 6, add a credit-builder loan or become an authorized user on a family member\'s old card. Two positive accounts build faster than one.'],
            ].map(([title, body], i) => (
              <li key={i} className="flex gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-black text-sm"
                  style={{ background: 'rgba(217,119,6,0.2)', color: '#fbbf24' }}
                >
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{title}</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-5 pb-12">
          <h2 className="text-2xl font-black text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqs.map(({ question, answer }) => (
              <div key={question}>
                <h3 className="font-bold text-white mb-1 text-base">{question}</h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <section className="max-w-3xl mx-auto px-5 pb-12">
          <h2 className="text-xl font-black text-white mb-4">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ['/how-to-rebuild-credit', 'How to Rebuild Credit: Full Guide'],
              ['/secured-credit-card-bad-credit', 'Best Secured Cards for Bad Credit'],
              ['/credit-builder-loan', 'Credit-Builder Loans Explained'],
              ['/first-credit-card-bad-credit', 'First Credit Card With Bad Credit'],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="block px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#d97706',
                }}
              >
                {label} →
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          className="max-w-3xl mx-auto px-5 py-10 mb-12 rounded-2xl mx-5"
          style={{
            background: 'rgba(217,119,6,0.08)',
            border: '1px solid rgba(217,119,6,0.2)',
          }}
        >
          <h2 className="text-2xl font-black text-white mb-2">
            Ready to start rebuilding?
          </h2>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
            If you own a car, the fastest path is Yendo — no deposit, no minimum score,
            and a limit up to $10,000. The check is free and won&apos;t affect your score.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <AffiliateLink
              href={YENDO_REBUILD_BOT}
              offer="yendo"
              placement="rebuild-card-cta"
              className="inline-block px-6 py-3.5 rounded-xl font-bold text-white text-sm text-center transition-all"
              style={{ background: '#d97706' }}
            >
              Check If My Car Qualifies →
            </AffiliateLink>
            <AffiliateLink
              href={SLAM_REBUILD}
              offer="slamDunk"
              placement="rebuild-card-fallback"
              className="inline-block px-6 py-3.5 rounded-xl font-bold text-sm text-center transition-all"
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              No car? See loan options →
            </AffiliateLink>
          </div>
          <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.2)' }}>
            #ad · Mintbrooks is an independent educational site. We may earn a commission. Not financial advice.
          </p>
        </section>

        {/* Footer */}
        <footer className="max-w-3xl mx-auto px-5 pb-10 text-center">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Mintbrooks is not a lender, bank, or financial advisor. Information provided is for educational purposes only.{' '}
            <Link href="/" style={{ color: 'rgba(255,255,255,0.3)' }}>mintbrooks.com</Link>
          </p>
        </footer>
      </div>
    </>
  )
}
