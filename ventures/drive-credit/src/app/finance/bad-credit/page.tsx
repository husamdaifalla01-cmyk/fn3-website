import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import FinanceEmailCapture from '@/components/FinanceEmailCapture'
import T3ProductLeadMagnet from '@/components/T3ProductLeadMagnet'
import AffiliateLink from '@/components/AffiliateLink'
import FTCDisclosure from '@/components/FTCDisclosure'
import { YENDO_BAD_CREDIT_HERO, YENDO_BAD_CREDIT_CARD, YENDO_BAD_CREDIT_CTA, LIFEFUNDS_BRIDGE_MID } from '@/lib/affiliateUrls'

// Stripe checkout for the $17 product (same SKU as the 500-score page)
const STRIPE_CHECKOUT_URL = 'https://buy.stripe.com/14A4gz90Bgn230BfbG08g0c'

export const metadata: Metadata = {
  title: 'How to Get Approved for Credit with Bad Credit (2026) — Real Options',
  description: 'A clear, honest hub for getting a credit card or loan with bad credit in 2026. What "bad credit" really means, the realistic approval paths (car-secured, secured cards, no-deposit, bad-credit loans), and how to rebuild — without guaranteed-approval gimmicks.',
  alternates: { canonical: 'https://mintbrooks.com/finance/bad-credit' },
}

const faqs = [
  {
    q: 'What credit score counts as "bad credit"?',
    a: 'On the FICO scale (300–850), scores below 580 are generally labeled "poor," and 580–669 is "fair." Most mainstream unsecured credit cards look for 670+. So if your score is under about 580, you are in the range that most issuers decline — which is why the realistic paths involve collateral, a deposit, or lenders that specialize in lower scores.',
  },
  {
    q: 'Can I really get approved for a credit card with bad credit?',
    a: 'Yes, but usually not through a standard unsecured card. The reliable routes are: a car-secured card that uses your vehicle equity instead of your score, a secured card backed by a cash deposit, or one of the few no-deposit cards that accept fair credit. Each issuer makes its own decision, so no one can promise approval in advance.',
  },
  {
    q: 'Will applying hurt my credit score?',
    a: 'A full application usually triggers a hard inquiry, which can lower your score by a few points temporarily. Many products — including car-secured cards like Yendo — start with a soft inquiry that does not affect your score, so you can check your odds before committing to a hard pull. Avoid applying to many cards at once.',
  },
  {
    q: 'Is a bad-credit loan a good idea?',
    a: 'It depends on the terms. Loans marketed to people with bad credit often carry high APRs and fees, so they make sense mainly for a genuine need where you have compared real offers and can afford the payments. Prequalifying through a marketplace lets you see rates with a soft pull before any hard inquiry. Read the full cost — not just the monthly payment — before you sign.',
  },
  {
    q: 'How long does it take to rebuild bad credit?',
    a: 'There is no fixed timeline, but consistent on-time payments and low credit utilization typically produce visible improvement over several months, with larger gains over a year or more. The biggest levers are paying every bill on time and keeping balances low relative to your limits. Negative marks fade in impact as they age.',
  },
  {
    q: 'Should I pay a credit-repair company?',
    a: 'Most of what credit-repair companies do, you can do yourself for free — disputing genuine errors with the bureaus, paying down balances, and making on-time payments. Be cautious of any service that guarantees a specific score increase or promises to remove accurate negative information, which is not something anyone can lawfully guarantee.',
  },
]

const PAGE_URL = 'https://mintbrooks.com/finance/bad-credit'

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Get Approved for Credit with Bad Credit (2026): Real Options',
    description: 'A comprehensive, honest guide to getting a credit card or loan with bad credit — score bands, realistic approval paths, and how to rebuild.',
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
      { '@type': 'ListItem', position: 3, name: 'Bad Credit' },
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
          <Link href="/finance" className="hover:text-amber-700 transition-colors">Finance</Link>
          <span>›</span>
          <span>Bad Credit</span>
        </nav>

        <div className="section-label mb-3">The Bad-Credit Hub</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>
          How to Get Approved for Credit<br />with Bad Credit (2026)
        </h1>
        <FTCDisclosure />
        <p className="text-lg mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          Bad credit doesn&apos;t lock you out — it just closes the easy door. This is the honest map of what actually works: the realistic paths to a card or a loan, what each one costs, and how to rebuild so the next approval is easier. No guaranteed-approval gimmicks.
        </p>

        <FinanceEmailCapture
          source="finance"
          headline="Free: The Bad-Credit Approval Checklist"
          subtext="The handful of things to line up before you apply — so your application gets a fair look instead of an instant decline. One email, no fluff."
        />

        {/* Primary action — Yendo soft-pull (free to the user, comes before the paid product) */}
        <div className="rounded-2xl p-6 mb-6" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.2)' }}>
          <div className="font-bold mb-2" style={{ color: '#d97706' }}>🚗 Own a car? This is the most realistic real approval.</div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#78716c' }}>
            A car-secured credit card like Yendo uses your <strong style={{ color: '#1c1917' }}>vehicle&apos;s equity</strong> — not your FICO score — to set your limit. That means a low score doesn&apos;t automatically disqualify you, and there&apos;s no cash deposit to scrape together. The eligibility check is a <strong style={{ color: '#1c1917' }}>soft inquiry — it won&apos;t touch your score.</strong> If you own your car, start here.
          </p>
          <AffiliateLink href={YENDO_BAD_CREDIT_HERO} placement="bad-credit-hub-hero" className="btn-primary text-sm py-2.5 px-6 inline-block">
            Check If My Car Qualifies → Free
          </AffiliateLink>
          <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>Soft inquiry only · Affiliate link · No score impact</p>
        </div>

        {/* Secondary offer — Stripe $17 product (the full playbook) */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: '#1c1917' }}>
          <div className="text-xs font-bold mb-2" style={{ color: '#B8955A', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Want the whole plan? · $17</div>
          <h3 className="text-xl font-black text-white mb-2">The 90-Day Money Reset</h3>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Every move on this page — sequenced day-by-day, with the bureau dispute scripts, the statement-closing-date trick, and a decision tree for which path fits your situation. Instant PDF. 60-day refund.
          </p>
          <a
            href={STRIPE_CHECKOUT_URL}
            className="btn-primary inline-block py-2.5 px-6 text-sm"
          >
            Get The 90-Day Reset → $17
          </a>
          <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Secure checkout via Stripe · One-time payment</p>
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>What &quot;Bad Credit&quot; Actually Means</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          &quot;Bad credit&quot; isn&apos;t one number — it&apos;s a range. On the FICO scale (300–850), lenders generally read your score in bands. Knowing which band you fall in tells you which doors are realistically open.
        </p>

        <div className="overflow-x-auto rounded-2xl mb-8" style={{ border: '1px solid rgba(217,119,6,0.12)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#fef9ee', borderBottom: '1px solid rgba(217,119,6,0.1)' }}>
                <th className="text-left px-5 py-3.5 font-semibold" style={{ color: '#78716c' }}>FICO Band</th>
                <th className="px-5 py-3.5 font-semibold text-center" style={{ color: '#78716c' }}>Range</th>
                <th className="text-left px-5 py-3.5 font-semibold" style={{ color: '#78716c' }}>What It Usually Means</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Poor', '300–579', 'Most unsecured cards decline. Secured / car-secured paths are realistic.'],
                ['Fair', '580–669', 'Some no-deposit and starter cards possible; rates are high.'],
                ['Good', '670–739', 'Most mainstream cards open up at reasonable terms.'],
                ['Very Good / Excellent', '740+', 'Best rates and rewards cards; not "bad credit" territory.'],
              ].map(([band, range, meaning], i) => (
                <tr key={band as string} style={{ borderBottom: i < 3 ? '1px solid rgba(217,119,6,0.07)' : 'none', background: i % 2 === 0 ? 'white' : '#fffdf7' }}>
                  <td className="px-5 py-3 font-semibold" style={{ color: '#1c1917' }}>{band}</td>
                  <td className="px-5 py-3 text-center font-semibold" style={{ color: '#1c1917' }}>{range}</td>
                  <td className="px-5 py-3 leading-relaxed" style={{ color: '#78716c' }}>{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          The exact cutoffs vary by lender and by scoring model (FICO vs. VantageScore), so treat these as a guide, not a guarantee. The practical takeaway: under ~580, the standard &quot;apply and get approved&quot; route is mostly closed, and you need a path that uses collateral, a deposit, or a lender that specializes in lower scores.
        </p>

        <h2 className="text-2xl font-black mb-6" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>The Realistic Paths (And Who Each Is For)</h2>

        <div className="space-y-5 mb-10">
          {[
            {
              n: '1',
              title: 'Car-secured card (Yendo)',
              forWho: 'You own a car with equity',
              body: 'Uses your vehicle\'s value as collateral instead of your FICO score, so a low score isn\'t an automatic decline. No cash deposit, and limits can be higher than typical secured cards. The trade-off: it\'s secured by your car, so understand the terms before you commit. Eligibility check is a soft pull.',
            },
            {
              n: '2',
              title: 'Secured credit card',
              forWho: 'You can set aside a cash deposit',
              body: 'You put down a refundable deposit (often $200–$500) that becomes your credit limit. Many secured cards do little or no credit screening, so approval is accessible. Used responsibly and reporting to all three bureaus, it\'s a proven way to build history — you get the deposit back when you close or graduate the account in good standing.',
            },
            {
              n: '3',
              title: 'No-deposit / fair-credit cards',
              forWho: 'Your score is closer to 580+',
              body: 'A handful of unsecured cards accept fair credit without a deposit. Approval is less certain at the bottom of the range, and a decline still costs a hard inquiry — so check stated criteria carefully and prefer issuers that offer prequalification.',
            },
            {
              n: '4',
              title: 'Bad-credit personal loans',
              forWho: 'You need cash, not a card',
              body: 'Marketplaces let you compare offers from lenders that work with lower scores. Rates and fees are typically high, so this fits a genuine need where you\'ve compared real numbers. Prequalifying with a soft pull lets you see estimated rates before any hard inquiry.',
            },
          ].map(path => (
            <div key={path.n} className="rounded-2xl p-6" style={{ background: 'white', border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="flex items-start gap-4">
                <div className="text-3xl font-black flex-shrink-0" style={{ color: 'rgba(28,25,23,0.15)' }}>#{path.n}</div>
                <div className="flex-1">
                  <div className="font-black text-lg mb-1" style={{ color: '#1c1917' }}>{path.title}</div>
                  <div className="text-xs mb-3" style={{ color: '#d97706', fontWeight: 600 }}>Best for: {path.forWho}</div>
                  <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{path.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-6 mb-10" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.2)' }}>
          <div className="font-bold mb-2" style={{ color: '#d97706' }}>Car owner with poor credit? Skip the deposit entirely.</div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#78716c' }}>
            Of all the paths above, a car-secured card is usually the one that pairs realistic approval with a meaningful limit when your score is low. Check what your car qualifies for — the soft inquiry won&apos;t affect your score.
          </p>
          <AffiliateLink href={YENDO_BAD_CREDIT_CARD} placement="bad-credit-hub-card" className="btn-primary text-sm py-2.5 px-6 inline-block">
            Check If I Qualify →
          </AffiliateLink>
          <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>Soft inquiry only · Affiliate link</p>
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>If You Need a Loan, Not a Card</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Sometimes the real problem is a cash need — a repair, a deposit, a bill — and a credit card won&apos;t solve it. If that&apos;s you, a personal-loan marketplace lets you compare offers from lenders that work with bad credit. The key is to prequalify (a soft pull) and read the full cost before committing to anything.
        </p>
        <p className="mb-6 leading-relaxed" style={{ color: '#78716c' }}>
          Be realistic: bad-credit loan APRs run high. Borrow only what you need, confirm the total repayment — not just the monthly payment — and make sure you can afford it.
        </p>
        <div className="rounded-2xl p-6 mb-10" style={{ background: 'white', border: '1px solid rgba(28,25,23,0.08)' }}>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#78716c' }}>
            Compare personal-loan offers up to $50,000 from lenders that consider bad credit — without a hard credit pull to see your estimated rates.
          </p>
          <AffiliateLink href={LIFEFUNDS_BRIDGE_MID} offer="lifefunds" placement="bad-credit-hub-loans" className="btn-primary text-sm py-2.5 px-6 inline-block">
            Compare Loan Options →
          </AffiliateLink>
          <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>Soft inquiry to prequalify · Affiliate link · Mintbrooks is not a lender</p>
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>How to Actually Rebuild (In Order)</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Getting approved is step one. Rebuilding is what makes the next approval easier and cheaper. Two factors dominate your score: <strong style={{ color: '#1c1917' }}>payment history</strong> (roughly 35% of a FICO score) and <strong style={{ color: '#1c1917' }}>credit utilization</strong> (roughly 30%). Almost everything that moves your score fast runs through those two.
        </p>
        <div className="space-y-3 mb-10">
          {[
            'Pay every bill on time, every time — a single missed payment can undo months of progress.',
            'Keep balances low relative to your limits; lower utilization generally helps your score.',
            'Use an account that reports to all three bureaus, or the history doesn\'t count where it matters.',
            'Dispute genuine errors on your reports yourself — it\'s free at the three bureaus.',
            'Avoid applying for several products at once; space out hard inquiries.',
            'Give it time — on-time history and aging accounts compound over months, not days.',
          ].map(tip => (
            <div key={tip} className="flex gap-3 items-start">
              <span className="text-sm flex-shrink-0 mt-0.5" style={{ color: '#d97706' }}>→</span>
              <span className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{tip}</span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-6 text-center mb-12" style={{ background: '#1c1917' }}>
          <div className="text-xs font-bold mb-2" style={{ color: '#B8955A', letterSpacing: '0.16em', textTransform: 'uppercase' }}>The full playbook · $17</div>
          <h3 className="text-xl font-black text-white mb-2">Get The 90-Day Money Reset</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Every move in this guide — sequenced day-by-day, with bureau dispute scripts, the statement-closing-date trick, and a path-by-situation decision tree. Instant PDF. 60-day refund.
          </p>
          <a
            href={STRIPE_CHECKOUT_URL}
            className="btn-primary inline-block py-3 px-8"
          >
            Get The 90-Day Reset → $17
          </a>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.28)' }}>Secure checkout via Stripe · One-time payment · 60-day refund</p>
        </div>

        {/* Hub-and-spoke internal links — the discovery path to the deep finance pages */}
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-6" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>
            More Guides: The Bad-Credit Cluster
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <Link href="/finance/credit-card-500-credit-score" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>Credit Cards for a 500 Score</div>
              <div style={{ color: '#78716c' }}>Cards that actually approve at 500 — ranked by real odds, not aspiration.</div>
            </Link>
            <Link href="/finance/credit-card-no-deposit" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>Credit Card with No Deposit</div>
              <div style={{ color: '#78716c' }}>Real options that don&apos;t tie up your cash — and the car-secured alternative.</div>
            </Link>
            <Link href="/finance/secured-credit-card-bad-credit" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>Secured Cards for Bad Credit</div>
              <div style={{ color: '#78716c' }}>How the deposit works, what to look for, and the cash-free option.</div>
            </Link>
            <Link href="/finance/credit-card-to-rebuild-credit" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>Best Card to Rebuild Credit</div>
              <div style={{ color: '#78716c' }}>What makes a card good for rebuilding — and what to ignore.</div>
            </Link>
            <Link href="/finance/personal-loans-up-to-50k" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>Personal Loans up to $50k</div>
              <div style={{ color: '#78716c' }}>Compare offers from lenders that consider bad credit.</div>
            </Link>
            <Link href="/finance/debt-consolidation-check" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>Debt Consolidation Check</div>
              <div style={{ color: '#78716c' }}>When consolidating helps — and when it just moves the problem.</div>
            </Link>
            <Link href="/finance/how-to-rebuild-credit" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>How to Rebuild Credit (in order)</div>
              <div style={{ color: '#78716c' }}>The 90-day order of operations most guides skip.</div>
            </Link>
            <Link href="/finance/what-credit-score-do-you-need-for-a-credit-card" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>What Score Do You Need for a Card?</div>
              <div style={{ color: '#78716c' }}>The real thresholds by card type — and where you stand.</div>
            </Link>
            <Link href="/finance/yendo-credit-card-review" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>Yendo Credit Card Review</div>
              <div style={{ color: '#78716c' }}>Car-equity-secured Visa — how it works, who it fits, the fine print.</div>
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

        <div className="rounded-2xl p-6 text-center mb-12" style={{ background: '#1c1917' }}>
          <h3 className="text-xl font-black text-white mb-2">Start with the path that fits you</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Own a car? Check what it qualifies for — no score requirement, no deposit, soft inquiry only.
          </p>
          <AffiliateLink href={YENDO_BAD_CREDIT_CTA} placement="bad-credit-hub-cta" className="btn-primary inline-block py-3 px-8">
            Check My Car&apos;s Eligibility →
          </AffiliateLink>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.28)' }}>Affiliate link · Soft inquiry only · Mintbrooks is not a lender</p>
        </div>

        <T3ProductLeadMagnet
          product="The 90-Day Money Reset"
          price="$17"
          productUrl="/products/90-day-money-reset"
          productDescr="Full PDF guide — every move, in order. Instant download. 60-day refund."
        />

        <div className="text-xs pt-8 leading-relaxed" style={{ color: '#a8a29e', borderTop: '1px solid rgba(28,25,23,0.07)' }}>
          Mintbrooks is an independent educational resource. We are not affiliated with any card issuer or lender. Approval decisions are made solely by the issuer or lender — Mintbrooks makes no guarantee of approval. Card and loan details are based on publicly available information and may change. We may earn a commission when you apply through our links. This is not financial advice. Always verify current terms directly with the provider before applying.
        </div>
      </article>
    </>
  )
}
