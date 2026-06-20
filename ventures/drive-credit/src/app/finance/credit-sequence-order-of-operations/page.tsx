import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import FinanceEmailCapture from '@/components/FinanceEmailCapture'
import FTCDisclosure from '@/components/FTCDisclosure'
import AffiliateLink from '@/components/AffiliateLink'
import { YENDO_GUIDE_HERO } from '@/lib/affiliateUrls'

// Stripe checkout for the Credit Sequence ($17 product)
const STRIPE_CHECKOUT_URL = 'https://buy.stripe.com/14A4gz90Bgn230BfbG08g0c'

export const metadata: Metadata = {
  title: 'The Credit Sequence: What to Fix First, Second, Third (2026)',
  description:
    'Most people repair credit in the wrong order and waste months. The Credit Sequence is the order of operations — utilization first, statement timing second, a positive line third — and the cost of skipping a step.',
  keywords:
    'credit repair order of operations, credit sequence, what to fix first credit, 1 percent utilization rule, why 0 utilization hurts, statement closing date trick',
  alternates: { canonical: 'https://mintbrooks.com/finance/credit-sequence-order-of-operations' },
  openGraph: {
    title: 'The Credit Sequence: What to Fix First, Second, Third',
    description:
      'The order of operations for raising a credit score — and why doing it out of order costs you months.',
    type: 'article',
  },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Credit Sequence: What to Fix First, Second, Third',
  description:
    'The order of operations for credit repair: utilization, statement timing, a positive revolving line, then aging.',
  datePublished: '2026-06-07',
  dateModified: '2026-06-07',
  author: { '@type': 'Organization', name: 'Mintbrooks' },
  publisher: { '@type': 'Organization', name: 'Mintbrooks', url: 'https://mintbrooks.com' },
}

const faqs = [
  {
    q: 'Why does 0% utilization hurt my credit?',
    a: 'Reporting 0% across all cards can read as inactivity. Scoring models reward an active account showing a small balance paid on time over a file that looks dormant. A tiny reported balance (about 1%) usually scores better than a flat zero.',
  },
  {
    q: 'What is the 1% utilization rule?',
    a: 'Leave a small reported balance — roughly 1% of your limit — on one card, and keep every other card at zero. It signals active, responsible use without the penalty of high utilization or the dormancy signal of all-zero.',
  },
  {
    q: 'What is the statement-closing-date trick?',
    a: 'Your card reports your balance on the statement closing date, not the due date. Pay the balance down before the statement closes so the low number is the one that gets reported. It is the cheapest same-cycle score lift available.',
  },
  {
    q: 'What order should I fix my credit in?',
    a: 'Utilization first (it moves fastest), statement timing second (free, same cycle), a positive revolving line third (so on-time history accrues), then let the file age with autopay. Doing it out of order wastes the fastest levers.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const STEPS = [
  {
    n: '1',
    title: 'Get utilization right — including the 0% trap',
    body: 'Utilization moves your score the fastest, so it goes first. High utilization drags you down, but so does reporting 0% on everything — bureaus can read an all-zero file as inactivity. The fix is the 1% rule: leave roughly 1% of your limit reported on a single card and keep the rest at zero. A small active balance paid on time beats both extremes.',
  },
  {
    n: '2',
    title: 'Time the snapshot — the statement-closing-date trick',
    body: 'Your issuer reports your balance on the statement closing date, not the payment due date. Pay the balance down before the statement closes and the low number is what gets reported to the bureaus. It costs nothing and shows up within one billing cycle — the cheapest lift there is.',
  },
  {
    n: '3',
    title: 'Add a positive revolving line',
    body: 'With utilization handled, add an account that builds on-time history. A secured card works if you have the deposit; if you own a car, a car-equity card like Yendo can issue a real revolving Visa using your vehicle equity instead of your FICO score — viable even at a 500 score.',
  },
  {
    n: '4',
    title: 'Let it age — and automate',
    body: 'The last step is patience plus autopay. Average account age and an unbroken on-time record compound over months. Automate the minimum so a missed payment can never undo steps 1–3, then let time do the rest.',
  },
]

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <NavBar />
      <article className="max-w-3xl mx-auto px-4 py-14">

        {/* Breadcrumb */}
        <nav className="text-xs mb-6 flex items-center gap-2" style={{ color: '#a8a29e' }}>
          <Link href="/" className="hover:text-amber-700 transition-colors">Mintbrooks</Link>
          <span>›</span>
          <span>The Credit Sequence</span>
        </nav>

        <div className="section-label mb-3">Credit Guide</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>
          The Credit Sequence:<br />What to Fix First, Second, Third
        </h1>
        <FTCDisclosure />
        <p className="text-lg mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          Most people repair credit in the wrong order — chasing collections before fixing utilization — and waste months.
          The levers that move your score fastest are free and work in one billing cycle. Here is the order that matters,
          and the cost of skipping a step.
        </p>

        <FinanceEmailCapture
          source="finance"
          headline="Get The Credit Sequence Checklist"
          subtext="The exact order to fix your file — utilization, statement timing, the right new account — in one email. Free."
        />

        {/* Primary offer — Stripe $17 product */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: '#1c1917' }}>
          <div className="text-xs font-bold mb-2" style={{ color: '#B8955A', letterSpacing: '0.16em', textTransform: 'uppercase' }}>The full playbook · $17</div>
          <h3 className="text-xl font-black text-white mb-2">The 90-Day Money Reset</h3>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Every step below, sequenced day-by-day — with the bureau scripts, the statement-closing-date trick, and the
            secured-vs-Yendo decision tree. Instant PDF. 60-day refund.
          </p>
          <a href={STRIPE_CHECKOUT_URL} className="btn-primary inline-block py-2.5 px-6 text-sm">
            Get The 90-Day Reset → $17
          </a>
          <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Secure checkout via Stripe · One-time payment</p>
        </div>

        {/* The sequence */}
        {STEPS.map((s) => (
          <section key={s.n} className="mb-10">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-2xl font-black" style={{ color: '#B8955A' }}>{s.n}</span>
              <h2 className="text-xl md:text-2xl font-black" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>{s.title}</h2>
            </div>
            <p className="leading-relaxed" style={{ color: '#78716c' }}>{s.body}</p>
          </section>
        ))}

        {/* Car-secured callout */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.2)' }}>
          <div className="font-bold mb-2" style={{ color: '#d97706' }}>🚗 If you own a car — this is your step 3</div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#78716c' }}>
            A car-secured credit card like Yendo uses your <strong style={{ color: '#1c1917' }}>vehicle equity</strong> — not your
            FICO score — to set your limit. It is the most realistic way to add a real revolving Visa to your file at a low
            score, which is exactly what step 3 needs.
          </p>
          <AffiliateLink href={YENDO_GUIDE_HERO} placement="credit-sequence-step3" className="btn-primary text-sm py-2.5 px-6 inline-block">
            Check If My Car Qualifies →
          </AffiliateLink>
        </div>

        {/* The cost of skipping */}
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-black mb-2" style={{ color: '#1c1917' }}>The cost of doing it out of order</h2>
          <p className="leading-relaxed" style={{ color: '#78716c' }}>
            Open a new card before fixing utilization and you add a hard inquiry and a low average age for no fast gain.
            Chase old collections before timing your statement and you spend months on the slowest lever while ignoring the
            fastest. The sequence exists because each step makes the next one cheaper.
          </p>
        </section>

        {/* Related guides — existing pages only */}
        <section className="mb-12">
          <h2 className="text-lg font-black mb-4" style={{ color: '#1c1917' }}>Keep going</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link href="/finance/calculator" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>1% Utilization Calculator</div>
              <div style={{ color: '#78716c' }}>Free tool — the exact dollar to leave on your card.</div>
            </Link>
            <Link href="/finance/how-to-rebuild-credit" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>How to Rebuild Credit Fast</div>
              <div style={{ color: '#78716c' }}>The practical steps that actually move the needle.</div>
            </Link>
            <Link href="/finance/secured-credit-card-bad-credit" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>Secured Cards for Bad Credit</div>
              <div style={{ color: '#78716c' }}>The deposit option — and the cash-free alternative for car owners.</div>
            </Link>
            <Link href="/finance/credit-card-500-credit-score" className="rounded-xl p-4 hover:bg-stone-50 transition" style={{ border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>Credit Cards for a 500 Score</div>
              <div style={{ color: '#78716c' }}>Cards that actually approve at 500 — not aspirational lists.</div>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-black mb-4" style={{ color: '#1c1917' }}>Frequently asked questions</h2>
          {faqs.map((f) => (
            <div key={f.q} className="mb-5">
              <div className="font-bold mb-1" style={{ color: '#1c1917' }}>{f.q}</div>
              <p className="leading-relaxed" style={{ color: '#78716c' }}>{f.a}</p>
            </div>
          ))}
        </section>

        {/* Final CTA */}
        <div className="rounded-2xl p-6" style={{ background: '#1c1917' }}>
          <h3 className="text-xl font-black text-white mb-2">Want it sequenced day-by-day?</h3>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
            The 90-Day Money Reset turns this order of operations into a dated plan with scripts and decision trees. $17, instant PDF, 60-day refund.
          </p>
          <a href={STRIPE_CHECKOUT_URL} className="btn-primary inline-block py-2.5 px-6 text-sm">Get The 90-Day Reset → $17</a>
        </div>
      </article>
    </>
  )
}
