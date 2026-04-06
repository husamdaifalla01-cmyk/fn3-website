import type { Metadata } from 'next'
import Link from 'next/link'
import CarCalculator from '@/components/CarCalculator'
import TestimonialsSection from '@/components/TestimonialsSection'
import ProductDemo from '@/components/ProductDemo'
import CreditEducation from '@/components/CreditEducation'
import HeroSection from '@/components/HeroSection'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import { OFFERS, buildAffiliateUrl } from '@/lib/offers'

// Pre-built tracked URLs — one per placement so analytics shows exactly where clicks originate
const YENDO_HERO        = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo',   'homepage-hero')
const YENDO_HOW_IT_WORKS = buildAffiliateUrl(OFFERS.yendo.url,  'organic', 'seo',   'homepage-how-it-works')
const YENDO_TESTIMONIALS = buildAffiliateUrl(OFFERS.yendo.url,  'organic', 'seo',   'homepage-testimonials')
const YENDO_DEMO        = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo',   'homepage-demo')
const YENDO_FINAL_CTA   = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo',   'homepage-final-cta')
const YENDO_NAV         = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo',   'homepage-nav')
const YENDO_CALCULATOR  = buildAffiliateUrl(OFFERS.yendo.url,    'organic', 'seo',   'homepage-calculator')
const SLAM_DUNK_FOOTER  = buildAffiliateUrl(OFFERS.slamDunk.url, 'organic', 'seo',   'homepage-footer')
const SLAM_DUNK_CALC    = buildAffiliateUrl(OFFERS.slamDunk.url, 'organic', 'seo',   'homepage-calculator')

export const metadata: Metadata = {
  title: 'Mintbrooks — Your Car Could Be Worth Up to $10,000 in Credit',
  description: 'Car-secured credit cards use your vehicle equity — not your credit score — to determine your limit. No deposit. Keep driving. Available in 36+ states.',
  keywords: 'car equity credit card, bad credit credit card, use car as collateral, no credit check credit card, Yendo credit card',
  openGraph: {
    title: 'Mintbrooks — Your Car Could Be Worth Up to $10,000 in Credit',
    description: 'No credit score needed. No deposit. Keep driving. See what your car qualifies for.',
    type: 'website',
  },
}

const faqItems = [
  {
    q: 'Do I need a good credit score?',
    a: 'Car-secured credit cards like Yendo use your vehicle\'s value as the primary qualification factor — not your credit score. Having a low score doesn\'t automatically disqualify you. Yendo reviews your vehicle equity and other factors. Check their eligibility criteria directly.',
  },
  {
    q: 'How much credit could my car unlock?',
    a: 'Typically a percentage of your vehicle\'s current market value — commonly 50–70%, up to the lender\'s maximum. Our estimator gives you a directional range. The actual offer depends on Yendo\'s evaluation of your specific vehicle and situation.',
  },
  {
    q: 'Do I keep driving my car?',
    a: 'Yes. Unlike a title loan, a car-secured revolving credit card keeps your vehicle in your possession. You drive it normally. The car acts as collateral while your account is in good standing.',
  },
  {
    q: 'What if I still have a car loan?',
    a: 'You may still qualify if you have equity — meaning the car is worth more than what you owe. Yendo evaluates your equity position. Check their current requirements directly.',
  },
  {
    q: 'Will checking hurt my credit score?',
    a: 'Yendo\'s initial eligibility check typically uses a soft inquiry, which does not affect your credit score. A hard inquiry may occur later in the application process. Confirm their current policy at Yendo\'s website before applying.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <NavBar />

      {/* ── Hero — split panel ─────────────────────────────────────── */}
      <HeroSection yendoUrl={YENDO_HERO} calculatorHref="/calculator" />

      {/* ── Trust strip ───────────────────────────────────────────── */}
      <section style={{ background: 'white', borderBottom: '1px solid rgba(217,119,6,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: 'Up to $10,000', label: 'Max credit line (Yendo stated)' },
              { value: '36+ states', label: 'Currently available' },
              { value: 'Soft inquiry', label: 'To check eligibility' },
              { value: 'Visa', label: 'Accepted everywhere' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-lg font-black mb-0.5" style={{ color: '#1c1917' }}>{s.value}</div>
                <div className="text-xs" style={{ color: '#a8a29e' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calculator ────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: '#fef9ee' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label">Free Estimator</div>
            <h2
              className="font-black mb-3"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#1c1917', letterSpacing: '-0.02em' }}
            >
              What's your car worth in credit?
            </h2>
            <p style={{ color: '#78716c', maxWidth: '480px', margin: '0 auto' }}>
              Enter your details for an instant estimate. Takes 30 seconds.
            </p>
            <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>
              Estimates are illustrative. Actual credit limits are determined by the lender.
            </p>
          </div>
          <CarCalculator yendoUrl={YENDO_CALCULATOR} slamDunkUrl={SLAM_DUNK_CALC} />
        </div>
      </section>

      {/* ── Mid-page CTA peak 1 ───────────────────────────────────── */}
      <section style={{ background: '#1c1917' }} className="py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold mb-2" style={{ color: 'rgba(251,191,36,0.7)' }}>
            Ready to find out for real?
          </p>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-5 leading-tight">
            See your actual eligibility — takes about 5 minutes.
          </h3>
          <AffiliateLink
            href={YENDO_HOW_IT_WORKS}
            placement="homepage-how-it-works"
            className="btn-primary inline-block text-base font-bold py-4 px-10"
          >
            Check My Car's Eligibility →
          </AffiliateLink>
          <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.28)' }}>
            Soft inquiry · No score impact to check · Affiliate disclosure applies
          </p>
        </div>
      </section>

      {/* ── Why This Exists Now ───────────────────────────────────── */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-label">Context</div>
            <h2
              className="font-black mb-3"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', color: '#1c1917', letterSpacing: '-0.02em' }}
            >
              Banks are tightening. Costs are rising. This exists.
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: '#78716c' }}>
              Car-secured credit is a product category that emerged precisely because traditional credit access was out of reach for millions of working Americans.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: '⛽',
                label: 'Gas prices keep climbing',
                body: 'Geopolitical tension is pushing fuel costs up. Variable income earners feel it first. A revolving credit buffer helps manage cash flow without payday loans.',
              },
              {
                icon: '💳',
                label: 'Banks want you to have credit to give you credit',
                body: 'The catch-22 of credit: you can\'t build it without access, but most lenders require it to qualify. Car-secured credit sidesteps that loop.',
              },
              {
                icon: '📉',
                label: 'Cost of essentials is elevated',
                body: 'Groceries, rent, utilities — all elevated. A credit line doesn\'t solve these costs, but it can be the bridge that keeps you from falling behind.',
              },
              {
                icon: '📈',
                label: 'Every payment builds your profile',
                body: 'On-time payments are reported to all three major bureaus. That means every month you\'re not just managing cash — you\'re repairing your credit history.',
              },
            ].map(w => (
              <div key={w.label} className="card flex gap-5 items-start">
                <div className="text-3xl flex-shrink-0">{w.icon}</div>
                <div>
                  <div className="font-bold mb-1.5" style={{ color: '#1c1917' }}>{w.label}</div>
                  <div className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{w.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────── */}
      <section className="py-20" style={{ background: '#fef9ee' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-label">The Process</div>
            <h2
              className="font-black mb-3"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', color: '#1c1917', letterSpacing: '-0.02em' }}
            >
              From car to credit card — here's the path.
            </h2>
            <p className="max-w-lg mx-auto" style={{ color: '#78716c' }}>
              Think of it like a home equity line of credit — but using your vehicle instead of your house.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { n: '01', h: 'Your car has equity', b: 'The difference between what your car is worth and what you owe on it (if anything) — that\'s your equity. That\'s what Yendo uses.' },
              { n: '02', h: 'Equity becomes your limit', b: 'Typically 50–70% of your car\'s market value, up to Yendo\'s maximum. Our estimator gives you a rough range instantly.' },
              { n: '03', h: 'Apply — soft inquiry first', b: 'The initial eligibility check doesn\'t affect your credit score. You find out if you qualify before anything hard is pulled.' },
              { n: '04', h: 'You get a real Visa card', b: 'Use it anywhere Visa is accepted. Every on-time payment reports to the credit bureaus. Your card. Your credit. Your car.' },
            ].map(s => (
              <div key={s.n} className="card">
                <div className="text-4xl font-black mb-3" style={{ color: 'rgba(217,119,6,0.2)' }}>{s.n}</div>
                <div className="font-bold mb-2" style={{ color: '#1c1917' }}>{s.h}</div>
                <div className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{s.b}</div>
              </div>
            ))}
          </div>

          {/* CTA peak 2 — right after mechanism is understood */}
          <div className="text-center">
            <AffiliateLink
              href={YENDO_HOW_IT_WORKS}
              placement="homepage-how-it-works-2"
              className="btn-primary text-base py-4 px-9 inline-block"
            >
              Start My Eligibility Check →
            </AffiliateLink>
            <p className="text-xs mt-3" style={{ color: '#78716c' }}>
              Most people complete the initial check in under 5 minutes · Soft inquiry only
            </p>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────── */}
      <TestimonialsSection yendoUrl={YENDO_TESTIMONIALS} />

      {/* ── Product Demo — navy ────────────────────────────────────── */}
      <ProductDemo yendoUrl={YENDO_DEMO} />

      {/* ── Comparison ────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-label">Comparison</div>
            <h2
              className="font-black mb-3"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: '#1c1917', letterSpacing: '-0.02em' }}
            >
              Why not just get a secured credit card?
            </h2>
            <p className="text-sm" style={{ color: '#a8a29e' }}>
              General comparison for educational purposes. Verify terms with each product directly before deciding.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(217,119,6,0.15)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#fef9ee', borderBottom: '1px solid rgba(217,119,6,0.1)' }}>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#78716c' }}>Feature</th>
                  <th className="px-6 py-4 font-black text-center" style={{ color: '#d97706' }}>Car-Secured (Yendo)</th>
                  <th className="px-6 py-4 font-medium text-center" style={{ color: '#a8a29e' }}>Traditional Secured Card</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Cash deposit required', '❌ None required', '✅ $200–$500 upfront'],
                  ['Credit limit potential', 'Based on vehicle equity', 'Usually equals your deposit'],
                  ['Primary qualification', 'Vehicle value', 'Credit score + income'],
                  ['Reports to credit bureaus', '✅ Yes', '✅ Yes'],
                  ['You keep your car', '✅ Yes', 'N/A'],
                  ['Accepted at merchants', '✅ Visa network', '✅ Varies by issuer'],
                ].map(([feat, yendo, trad], i) => (
                  <tr
                    key={feat as string}
                    style={{
                      borderBottom: i < 5 ? '1px solid #f6f9ff' : 'none',
                      background: i % 2 === 0 ? 'white' : '#fffdf7',
                    }}
                  >
                    <td className="px-6 py-3.5" style={{ color: '#374151' }}>{feat}</td>
                    <td className="px-6 py-3.5 text-center font-semibold" style={{ color: '#1c1917' }}>{yendo}</td>
                    <td className="px-6 py-3.5 text-center" style={{ color: '#a8a29e' }}>{trad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs mt-4" style={{ color: '#a8a29e' }}>
            Mintbrooks is an independent educational resource. We do not recommend any specific financial product. Review all terms directly with the provider.
          </p>
        </div>
      </section>

      {/* ── Credit Education ──────────────────────────────────────── */}
      <CreditEducation />

      {/* ── Guides ────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-label">Dig Deeper</div>
            <h2
              className="font-black mb-3"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: '#1c1917', letterSpacing: '-0.02em' }}
            >
              Your situation, in detail.
            </h2>
            <p style={{ color: '#78716c' }}>
              Independent educational articles — not financial advice. Not sponsored by any lender.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { href: '/bad-credit-credit-card', title: 'Best Credit Cards for Bad Credit (2026)', desc: 'Ranked by actual approval odds — not marketing claims.' },
              { href: '/credit-card-500-credit-score', title: 'Your Options at a 500 Credit Score', desc: 'What doors are open when most banks say no.' },
              { href: '/use-car-as-collateral', title: 'Using Your Car as Collateral — What to Know', desc: 'How it works, what to watch for, what questions to ask.' },
              { href: '/no-credit-history-credit-card', title: 'Building Credit from Zero', desc: 'First-timers and newcomers have real paths forward.' },
              { href: '/credit-card-no-deposit', title: 'Credit Without Tying Up Your Cash', desc: 'Skip the secured card deposit model entirely.' },
              { href: '/emergency-cash-between-paychecks', title: 'Managing Cash Flow Gaps', desc: 'What to consider when expenses arrive before income.' },
              { href: '/secured-credit-card-bad-credit', title: 'Best Secured Credit Cards for Bad Credit', desc: 'No cash deposit required if you own a car.' },
              { href: '/credit-builder-loan', title: 'Credit Builder Loans vs. Credit Cards', desc: 'Which builds credit faster — and which fits your situation.' },
            ].map(g => (
              <Link
                key={g.href}
                href={g.href}
                className="card group hover:border-amber-300 transition-colors"
                style={{ borderColor: 'rgba(37,99,235,0.1)' }}
              >
                <div className="font-bold mb-2 group-hover:text-amber-700 transition-colors" style={{ color: '#1c1917' }}>
                  {g.title}
                </div>
                <div className="text-sm leading-relaxed mb-3" style={{ color: '#78716c' }}>{g.desc}</div>
                <div className="text-sm font-semibold" style={{ color: '#d97706' }}>Read guide →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: '#fef9ee' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-label">FAQ</div>
            <h2
              className="font-black mb-2"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: '#1c1917', letterSpacing: '-0.02em' }}
            >
              Your questions, answered directly.
            </h2>
          </div>
          <div className="space-y-3">
            {faqItems.map(f => (
              <details
                key={f.q}
                className="card"
                style={{ padding: '20px 24px' }}
              >
                <summary
                  className="font-semibold cursor-pointer list-none flex justify-between items-center gap-4"
                  style={{ color: '#1c1917' }}
                >
                  {f.q}
                  <span className="flex-shrink-0 text-lg" style={{ color: '#d97706' }}>+</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: '#78716c' }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA — navy ──────────────────────────────────────── */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)' }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-5xl mb-6">🚗</div>
          <h2
            className="font-black text-white mb-4 leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.75rem)', letterSpacing: '-0.02em' }}
          >
            Your car is sitting in the driveway.<br />
            <span style={{ color: '#fbbf24' }}>It could be working for you.</span>
          </h2>
          <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            If you own a vehicle, it may qualify as collateral for a revolving credit line — without touching your credit score. Five minutes to find out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <AffiliateLink
              href={YENDO_FINAL_CTA}
              placement="homepage-final-cta"
              className="btn-primary text-base py-4 px-8 font-bold"
            >
              Check My Car's Eligibility →
            </AffiliateLink>
            <Link
              href="/calculator"
              className="btn-primary btn-green text-base py-4 px-8"
            >
              Use the Free Estimator
            </Link>
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Soft inquiry only · No score impact to check · We may earn a commission if you apply
          </p>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer id="disclosure" className="py-12" style={{ background: '#1c1917', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="font-black text-white mb-3">
                Mint<span style={{ color: '#fbbf24' }}>brooks</span>
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.35)', maxWidth: '360px' }}>
                Mintbrooks is an independent educational resource about car-secured credit products. We are <strong className="text-white">not a lender</strong>, bank, or credit card issuer. We do not process applications or make lending decisions.
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)', maxWidth: '360px' }}>
                <strong className="text-white">Affiliate disclosure:</strong> Links on this site may be affiliate links. If you apply through our links and are approved, we may earn a commission at no additional cost to you. This does not influence our educational content. All information is provided for general education only and does not constitute financial advice.
              </p>
            </div>
            <div>
              <div className="font-semibold mb-3 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Guides</div>
              <div className="space-y-2 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <Link href="/bad-credit-credit-card" className="block hover:text-white transition-colors">Bad Credit Cards</Link>
                <Link href="/credit-card-500-credit-score" className="block hover:text-white transition-colors">500 Score Options</Link>
                <Link href="/use-car-as-collateral" className="block hover:text-white transition-colors">Car as Collateral</Link>
                <Link href="/no-credit-history-credit-card" className="block hover:text-white transition-colors">No Credit History</Link>
                <Link href="/emergency-cash-between-paychecks" className="block hover:text-white transition-colors">Cash Flow Gaps</Link>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-3 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Tools</div>
              <div className="space-y-2 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <Link href="/calculator" className="block hover:text-white transition-colors">Credit Range Estimator</Link>
                <Link href="/how-it-works" className="block hover:text-white transition-colors">How It Works</Link>
                <AffiliateLink href={SLAM_DUNK_FOOTER} placement="homepage-footer" offer="slam-dunk" className="block hover:text-white transition-colors">Personal Loan Options ↗</AffiliateLink>
              </div>
              <div className="font-semibold mt-6 mb-3 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Follow Us</div>
              <div className="space-y-2 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <a href="https://www.tiktok.com/@mintbrookscredit" target="_blank" rel="noopener" className="block hover:text-white transition-colors">TikTok @mintbrookscredit ↗</a>
                <a href="https://www.instagram.com/mintbrookscredit" target="_blank" rel="noopener" className="block hover:text-white transition-colors">Instagram @mintbrookscredit ↗</a>
                <a href="mailto:support@mintbrooks.com" className="block hover:text-white transition-colors">support@mintbrooks.com</a>
              </div>
            </div>
          </div>
          <div className="pt-6 text-xs flex flex-wrap gap-4 justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.2)' }}>
            <span>© 2026 Mintbrooks. For educational purposes only. Not financial advice.</span>
            <span>Not affiliated with Yendo, Visa, or any financial institution.</span>
          </div>
        </div>
      </footer>
    </>
  )
}
