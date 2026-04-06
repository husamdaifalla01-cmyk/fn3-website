import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import { YENDO_REVIEW_HERO, YENDO_REVIEW_CTA } from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'Yendo Credit Card Review (2026) — Is It Worth It? Honest Analysis',
  description: 'Unbiased Yendo credit card review. How the car-secured Visa works, real pros and cons, who it\'s best for, and whether it\'s worth the trade-offs.',
  alternates: { canonical: 'https://mintbrooks.com/yendo-credit-card-review' },
  openGraph: {
    title: 'Yendo Credit Card Review (2026) — Honest Analysis',
    description: 'Comprehensive review of the Yendo car-secured Visa credit card.',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Review',
  itemReviewed: {
    '@type': 'Product',
    name: 'Yendo Car-Secured Visa Credit Card',
    brand: { '@type': 'Organization', name: 'Yendo' },
  },
  author: { '@type': 'Organization', name: 'Mintbrooks' },
  headline: 'Yendo Credit Card Review (2026) — Is It Worth It?',
  datePublished: '2026-04-03',
  dateModified: '2026-04-03',
}

export default function YendoCreditCardReviewPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavBar />
      <article className="max-w-3xl mx-auto px-4 py-14">

        <nav className="text-xs mb-6 flex items-center gap-2" style={{ color: '#a8a29e' }}>
          <Link href="/" className="hover:text-amber-700 transition-colors">Mintbrooks</Link>
          <span>›</span>
          <Link href="/car-equity-credit-card-reviews" className="hover:text-amber-700 transition-colors">Car Equity Cards</Link>
          <span>›</span>
          <span>Yendo Review</span>
        </nav>

        <div className="section-label mb-3">Review</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>
          Yendo Credit Card Review (2026): Is the Car-Secured Visa Worth It?
        </h1>
        <p className="text-lg mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          Yendo offers something unusual in the credit card market: a Visa credit card secured by your car&apos;s equity instead of a cash deposit. For people with bad credit or no credit history who own a vehicle, this could be a meaningful alternative to traditional secured cards. Here&apos;s our honest assessment.
        </p>

        {/* Quick verdict */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.2)' }}>
          <div className="font-bold mb-3" style={{ color: '#d97706' }}>Quick Verdict</div>
          <p className="text-sm leading-relaxed mb-3" style={{ color: '#78716c' }}>
            <strong style={{ color: '#1c1917' }}>Best for:</strong> People with bad/no credit who own a car and cannot afford a cash deposit for a traditional secured card, or who need a higher credit limit than secured cards typically offer.
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#78716c' }}>
            <strong style={{ color: '#1c1917' }}>Not ideal for:</strong> People who don&apos;t own a car with equity, those who are uncomfortable with a lien on their vehicle, or those who may struggle to make minimum monthly payments.
          </p>
          <AffiliateLink href={YENDO_REVIEW_HERO} placement="yendo-review-hero" className="btn-primary text-sm py-2 px-5 inline-block">Check If My Car Qualifies →</AffiliateLink>
          <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>Soft inquiry only · Affiliate link</p>
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>What Is Yendo?</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Yendo is a fintech company that issues Visa credit cards secured by vehicle equity. Founded to serve the underbanked population — the roughly 100 million Americans with subprime credit scores — Yendo&apos;s model lets your car stand in for the cash deposit that traditional secured cards require.
        </p>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          The concept is straightforward: instead of putting $200–$500 in a savings account as collateral, you use your car&apos;s value. Yendo places a lien on your vehicle&apos;s title (you keep driving it) and issues you a revolving credit line between $500 and $10,000 depending on your car&apos;s appraised value.
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          The card works anywhere Visa is accepted, and Yendo reports to all three major credit bureaus (Experian, Equifax, TransUnion), making it a genuine credit-building tool when used responsibly.
        </p>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Yendo Card Details at a Glance</h2>
        <div className="rounded-2xl p-6 mb-8" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.06)' }}>
          <div className="grid grid-cols-2 gap-4">
            {[
              ['Card Network', 'Visa'],
              ['Card Type', 'Secured (vehicle collateral)'],
              ['Credit Line', '$500 – $10,000'],
              ['Cash Deposit Required', 'None'],
              ['Credit Score Minimum', 'No minimum stated'],
              ['Initial Inquiry', 'Soft pull (eligibility check)'],
              ['Credit Bureau Reporting', 'Experian, Equifax, TransUnion'],
              ['Availability', '37 states (verify at Yendo.com)'],
              ['APR', 'Variable — verify current rate'],
              ['Annual Fee', 'Verify current terms'],
              ['Rewards', 'Not a rewards card'],
              ['Application Time', '~5 minutes for eligibility check'],
            ].map(([label, val]) => (
              <div key={label}>
                <div className="text-xs mb-0.5" style={{ color: '#a8a29e' }}>{label}</div>
                <div className="text-sm font-semibold" style={{ color: '#1c1917' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
        <p className="mb-8 text-sm" style={{ color: '#a8a29e' }}>
          Card terms, fees, and rates are subject to change. Always verify current details directly with Yendo before applying.
        </p>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>How the Application Process Works</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Based on publicly available information, the Yendo application process is more streamlined than many traditional credit card applications. Here&apos;s what to expect:
        </p>
        <div className="space-y-4 mb-8">
          {[
            { title: 'Step 1: Check Eligibility (2–5 minutes)', desc: 'Enter basic personal and vehicle information. Yendo performs a soft credit pull that does not affect your score. You see an estimated credit line and whether you qualify.' },
            { title: 'Step 2: Vehicle Verification', desc: 'If eligible, Yendo may request photos of your vehicle and VIN verification. This helps them confirm the car\'s condition and value align with their estimate.' },
            { title: 'Step 3: Title & Lien Processing', desc: 'Yendo places a lien on your car\'s title. This is done electronically in most states. You retain the car — the lien is a financial claim, not physical possession.' },
            { title: 'Step 4: Card Arrives', desc: 'A physical Visa card is mailed to your address. Typical delivery is 7–14 business days from approval. You activate it like any other credit card.' },
          ].map((item, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.06)' }}>
              <div className="font-bold mb-1 text-sm" style={{ color: '#1c1917' }}>{item.title}</div>
              <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Pros — What We Like</h2>
        <div className="space-y-4 mb-8">
          {[
            { title: 'No Cash Deposit Required', desc: 'This is the biggest differentiator. Traditional secured cards require $200–$500 upfront cash. For someone already struggling financially, that deposit can be a real barrier. Yendo eliminates it by using your car instead.' },
            { title: 'Higher Potential Credit Limits', desc: 'Secured cards typically cap at your deposit amount ($200–$500). Yendo offers up to $10,000 based on your vehicle\'s value. A higher limit means lower credit utilization at the same spending level, which can boost your credit score faster.' },
            { title: 'No Minimum Credit Score Stated', desc: 'Yendo doesn\'t publicly list a minimum FICO score. While this doesn\'t mean universal approval, it suggests the product is designed for people who would be declined by most traditional card issuers.' },
            { title: 'Reports to All Three Bureaus', desc: 'This is essential for credit building. Some subprime products only report to one or two bureaus. Yendo reports to Experian, Equifax, and TransUnion, giving you maximum credit-building potential with responsible use.' },
            { title: 'Soft Pull for Eligibility', desc: 'You can check if you qualify without any impact to your credit score. This is important for people with damaged credit who can\'t afford additional hard inquiries.' },
            { title: 'Real Visa Card', desc: 'This works anywhere Visa is accepted — online, in stores, internationally. It\'s not a store card or a restricted-use product.' },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex gap-2 items-center mb-1">
                <span className="text-emerald-500">✓</span>
                <span className="font-bold text-sm" style={{ color: '#1c1917' }}>{item.title}</span>
              </div>
              <p className="text-sm leading-relaxed ml-6" style={{ color: '#78716c' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Cons — What to Watch Out For</h2>
        <div className="space-y-4 mb-8">
          {[
            { title: 'Lien on Your Vehicle', desc: 'This is the trade-off. A lien means you can\'t sell, trade, or refinance your car without first settling the credit card balance. For people who may need to sell their car quickly, this is a meaningful restriction.' },
            { title: 'Repossession Risk', desc: 'If you default on payments for an extended period, Yendo has the legal right to repossess your vehicle. With a traditional secured card, the worst case is losing your $200–$500 deposit. With Yendo, the worst case is losing your car.' },
            { title: 'Higher APR Than Prime Cards', desc: 'As a subprime product, the APR will be higher than what someone with good credit would receive. If you carry a balance month to month, the interest costs can be significant. Ideally, you pay the full balance each month.' },
            { title: 'Not Available Everywhere', desc: 'Yendo is currently available in 37 states. If you\'re in one of the excluded states (including New York, New Jersey, Massachusetts, Maryland, and others), you\'ll need to consider alternatives.' },
            { title: 'No Rewards Program', desc: 'Yendo is a credit-building tool, not a rewards card. Don\'t expect cashback, points, or travel perks. That\'s not what this product is for.' },
            { title: 'Relatively New Company', desc: 'Yendo doesn\'t have the decades of history that issuers like Capital One or Discover have. While this doesn\'t mean the product is unreliable, there is less long-term consumer data available.' },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex gap-2 items-center mb-1">
                <span className="text-amber-500">⚠</span>
                <span className="font-bold text-sm" style={{ color: '#1c1917' }}>{item.title}</span>
              </div>
              <p className="text-sm leading-relaxed ml-6" style={{ color: '#78716c' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Who Is Yendo Best For?</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          After analyzing the product structure, Yendo makes the most sense for a specific profile:
        </p>
        <div className="rounded-2xl p-6 mb-8" style={{ background: '#f0fdf4', border: '1px solid rgba(52,211,153,0.2)' }}>
          <div className="font-bold mb-3" style={{ color: '#059669' }}>Ideal Candidate</div>
          <ul className="space-y-2">
            {[
              'Has a credit score below 580 or no credit history',
              'Has been declined by traditional credit card issuers',
              'Owns a car worth $5,000+ with clear or nearly clear title',
              'Cannot afford a $200–$500 cash deposit for a secured card',
              'Needs a credit limit higher than $500 to keep utilization low',
              'Is committed to making at least minimum payments every month',
              'Wants to actively rebuild their credit score',
              'Lives in one of the 37 eligible states',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: '#1c1917' }}>
                <span className="text-emerald-500 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl p-6 mb-8" style={{ background: '#fef2f2', border: '1px solid rgba(239,68,68,0.15)' }}>
          <div className="font-bold mb-3" style={{ color: '#dc2626' }}>Not Ideal For</div>
          <ul className="space-y-2">
            {[
              'People who don\'t own a car or whose car has very low value',
              'Anyone who may need to sell their car in the near future',
              'People who are not confident they can make monthly payments',
              'Those who prefer zero risk to their vehicle asset',
              'Anyone in one of the 13 excluded states',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: '#1c1917' }}>
                <span className="text-red-400 flex-shrink-0">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Yendo vs. Alternatives</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm" style={{ color: '#78716c' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(28,25,23,0.1)' }}>
                {['', 'Yendo', 'OpenSky Secured', 'Chime Builder', 'Capital One Secured'].map(h => (
                  <th key={h} className="text-left py-3 px-2 font-bold text-xs" style={{ color: '#1c1917' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Deposit', 'None', '$200+', 'Account balance', '$49–$200'],
                ['Max Limit', '$10,000', '= deposit', '$10,000', 'Starting $200'],
                ['Credit Check', 'Soft pull', 'None', 'None', 'Soft/Hard'],
                ['Min Score', 'Not stated', 'Not stated', 'Not stated', '~580 typical'],
                ['Bureau Reports', 'All 3', 'All 3', 'All 3', 'All 3'],
                ['Risk', 'Vehicle lien', 'Lose deposit', 'Lose balance', 'Lose deposit'],
                ['Best For', 'Car owners, no deposit $', 'Any credit, $200 available', 'Chime users', 'Near-prime'],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(28,25,23,0.06)' }}>
                  {row.map((cell, j) => (
                    <td key={j} className="py-2 px-2 text-xs" style={{ fontWeight: j === 0 ? 600 : 400, color: j === 0 ? '#1c1917' : undefined }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Tips for Getting the Most Out of Yendo</h2>
        <div className="space-y-3 mb-8">
          {[
            { tip: 'Pay your balance in full every month', why: 'Avoids interest charges entirely. The APR only matters if you carry a balance.' },
            { tip: 'Keep utilization below 30%', why: 'If your credit line is $5,000, try to keep your balance under $1,500 at any given time. Lower utilization = faster credit score improvement.' },
            { tip: 'Set up autopay for at least the minimum', why: 'A single missed payment can set your credit rebuilding back significantly and puts your vehicle at risk.' },
            { tip: 'Don\'t apply if you might sell your car soon', why: 'The lien complicates any sale. Plan to keep the card (and car) for at least 12 months for meaningful credit improvement.' },
            { tip: 'Monitor your credit score monthly', why: 'Use free tools like Credit Karma to track your progress. You should see improvement within 3–6 months of consistent on-time payments.' },
          ].map((item, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.06)' }}>
              <div className="font-bold text-sm mb-1" style={{ color: '#1c1917' }}>{item.tip}</div>
              <p className="text-xs leading-relaxed" style={{ color: '#78716c' }}>{item.why}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>State Availability</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Yendo is currently available in 37 states. The following states are <strong style={{ color: '#1c1917' }}>not currently eligible</strong>: Alaska, Hawaii, Iowa, Louisiana, Maine, Maryland, Massachusetts, Minnesota, Missouri, New Jersey, New York, Oklahoma, South Dakota, and Wisconsin.
        </p>
        <p className="mb-8 leading-relaxed text-sm" style={{ color: '#a8a29e' }}>
          State availability may change. Always verify your state&apos;s eligibility directly at Yendo.com before applying.
        </p>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Our Bottom Line</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Yendo fills a real gap in the credit card market. For people who own a car with equity but have been locked out of traditional credit products, it offers a genuine path to a real Visa credit card without requiring cash they may not have.
        </p>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          The trade-off is clear: you are putting your vehicle up as collateral, which means the consequences of default are more severe than with a traditional secured card. But for disciplined users who are committed to rebuilding their credit, the benefits — no deposit, higher limits, all three bureau reporting — are compelling.
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          If you own a car, have bad or no credit, and are ready to take your credit rebuilding seriously, checking your eligibility with Yendo is a reasonable first step. The soft pull costs you nothing and gives you concrete information about what your car could unlock.
        </p>

        {/* Final CTA */}
        <div className="rounded-2xl p-6 text-center mb-12" style={{ background: '#1c1917' }}>
          <h3 className="text-xl font-black text-white mb-2">Check What Your Car Could Unlock</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>Soft inquiry — no credit score impact. Takes under 5 minutes.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <AffiliateLink href={YENDO_REVIEW_CTA} placement="yendo-review-cta" className="btn-primary py-3 px-6">Check If My Car Qualifies →</AffiliateLink>
            <Link href="/calculator" className="btn-primary py-3 px-6" style={{ background: '#059669' }}>Use Free Calculator First</Link>
          </div>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.28)' }}>Affiliate links · Soft inquiry · Mintbrooks is not a lender</p>
        </div>

        {/* Related reading */}
        <div className="mb-10">
          <div className="font-black mb-4" style={{ color: '#1c1917' }}>Related Reading</div>
          <div className="space-y-2">
            {[
              { href: '/yendo-review', label: 'Yendo Full Review — Pros, Cons, Alternatives (2026)' },
              { href: '/car-equity-credit-card-reviews', label: 'Car Equity Credit Card Reviews — Full Category Guide' },
              { href: '/bad-credit-credit-card', label: 'Best Credit Cards for Bad Credit (2026)' },
              { href: '/how-to-build-credit-with-bad-credit', label: 'How to Build Credit with Bad Credit' },
              { href: '/calculator', label: 'Free Car Equity Calculator' },
              { href: '/credit-card-500-credit-score', label: 'Credit Cards for 500 Credit Score' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="block text-sm hover:text-amber-700 transition-colors" style={{ color: '#78716c' }}>
                → {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* FTC Disclosure */}
        <div className="text-xs pt-8 leading-relaxed" style={{ color: '#a8a29e', borderTop: '1px solid rgba(28,25,23,0.07)' }}>
          <strong>Affiliate Disclosure:</strong> Mintbrooks is an independent educational resource. We may earn a commission when you apply through our links at no extra cost to you. This does not influence our editorial content. Card details are based on publicly available information and may change at any time. Approval decisions are made solely by the card issuer — Mintbrooks makes no guarantee of approval and is not a lender. This content is for informational purposes only and does not constitute financial advice. Always verify current terms, rates, and eligibility requirements directly with the issuer before applying.
        </div>
      </article>
    </>
  )
}
