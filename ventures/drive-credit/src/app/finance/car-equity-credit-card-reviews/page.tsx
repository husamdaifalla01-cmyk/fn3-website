import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import { YENDO_CAR_EQUITY_REVIEW_HERO, YENDO_CAR_EQUITY_REVIEW_CTA } from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'Car Equity Credit Card Reviews (2026) — How They Work & Who Qualifies',
  description: 'In-depth review of car equity credit cards. How they work, who qualifies, the real pros and cons, and how they compare to secured cards and personal loans.',
  alternates: { canonical: 'https://mintbrooks.com/car-equity-credit-card-reviews' },
  openGraph: {
    title: 'Car Equity Credit Card Reviews (2026)',
    description: 'How car equity credit cards work, who qualifies, and honest pros/cons.',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Car Equity Credit Card Reviews (2026) — How They Work & Who Qualifies',
  description: 'Comprehensive review of car-secured credit cards including Yendo, with real pros, cons, and eligibility requirements.',
  datePublished: '2026-04-03',
  dateModified: '2026-04-03',
  author: { '@type': 'Organization', name: 'Mintbrooks' },
}

export default function CarEquityCreditCardReviewsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavBar />
      <article className="max-w-3xl mx-auto px-4 py-14">

        <nav className="text-xs mb-6 flex items-center gap-2" style={{ color: '#a8a29e' }}>
          <Link href="/" className="hover:text-amber-700 transition-colors">Mintbrooks</Link>
          <span>›</span>
          <span>Car Equity Credit Card Reviews</span>
        </nav>

        <div className="section-label mb-3">Review</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>
          Car Equity Credit Card Reviews (2026): How They Work, Who Qualifies & Honest Pros/Cons
        </h1>
        <p className="text-lg mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          Car equity credit cards are a relatively new category in consumer credit. Instead of requiring a cash deposit or relying solely on your credit score, they use your vehicle&apos;s value as collateral. This guide reviews how they work, who actually qualifies, the real pros and cons, and how they compare to alternatives.
        </p>

        {/* Hero CTA */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.2)' }}>
          <div className="font-bold mb-2" style={{ color: '#d97706' }}>🚗 Currently Available: Yendo Car-Secured Visa</div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#78716c' }}>
            Yendo is the primary issuer of car equity credit cards in 2026. They offer a Visa card with credit lines from $500 to $10,000, based on your vehicle&apos;s value. Available in 37 states.
          </p>
          <AffiliateLink href={YENDO_CAR_EQUITY_REVIEW_HERO} placement="car-equity-review-hero" className="btn-primary text-sm py-2 px-5 inline-block">Check If My Car Qualifies →</AffiliateLink>
          <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>Soft inquiry only · Affiliate link</p>
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>What Is a Car Equity Credit Card?</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          A car equity credit card is a credit card where your vehicle serves as collateral instead of a cash deposit. The issuer places a lien on your car&apos;s title (similar to an auto loan), and in return, you receive a revolving credit line based on a percentage of your car&apos;s appraised value.
        </p>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          The key distinction: you keep driving your car. Unlike a title loan where you might lose access to your vehicle, a car equity credit card works exactly like a standard credit card for everyday purchases. You make monthly payments, and the balance revolves.
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          This model exists because traditional credit underwriting excludes millions of Americans who own valuable assets but have damaged or thin credit files. By securitizing the card against vehicle equity, the issuer reduces their risk enough to offer credit without relying heavily on FICO scores.
        </p>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>How Car Equity Credit Cards Work — Step by Step</h2>
        <div className="space-y-4 mb-8">
          {[
            { step: '1', title: 'Application', desc: 'You provide basic information about yourself and your vehicle — make, model, year, mileage, and condition. This typically takes 5 minutes or less.' },
            { step: '2', title: 'Vehicle Valuation', desc: 'The issuer estimates your car\'s value using market data (similar to Kelley Blue Book). They determine how much equity you have, which directly influences your potential credit line.' },
            { step: '3', title: 'Soft Credit Check', desc: 'Most car equity card issuers perform a soft pull initially, which does not affect your credit score. A hard inquiry may occur only if you decide to proceed with formal approval.' },
            { step: '4', title: 'Lien Placement', desc: 'If approved, the issuer places a lien on your vehicle\'s title. This is a legal claim — not a repossession. You retain full use of your car.' },
            { step: '5', title: 'Credit Line Issued', desc: 'You receive a credit line typically between 50–70% of your car\'s equity value, capped at the issuer\'s maximum (usually $10,000). A physical Visa or Mastercard is mailed to you.' },
            { step: '6', title: 'Ongoing Use', desc: 'You use the card like any other credit card. Make purchases, pay your bill monthly. The issuer reports your payment history to the three major credit bureaus, helping you build or rebuild credit over time.' },
          ].map(item => (
            <div key={item.step} className="flex gap-4">
              <div className="text-2xl font-black flex-shrink-0 w-8" style={{ color: '#d97706' }}>{item.step}</div>
              <div>
                <div className="font-bold mb-1" style={{ color: '#1c1917' }}>{item.title}</div>
                <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Who Actually Qualifies?</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Car equity credit cards are designed for people who struggle with traditional credit products. Based on publicly available information, typical eligibility requirements include:
        </p>
        <ul className="space-y-3 mb-8">
          {[
            'You own a car with clear or near-clear title (minimal outstanding loans)',
            'Your vehicle has meaningful market value — generally $3,000+ for a reasonable credit line',
            'You have a valid driver\'s license and proof of insurance',
            'You are a resident of an eligible state (currently 37 states for Yendo)',
            'Your vehicle is typically 20 years old or newer and in drivable condition',
            'No minimum credit score is publicly stated by Yendo, though approval decisions are made by the issuer',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: '#78716c' }}>
              <span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mb-8 leading-relaxed text-sm" style={{ color: '#a8a29e' }}>
          Note: Meeting these criteria does not guarantee approval. The issuer makes all final approval decisions based on their underwriting standards.
        </p>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Yendo Car-Secured Visa — Detailed Review</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Yendo is currently the primary issuer offering a car equity credit card in the United States. Here is what we know from publicly available information:
        </p>

        <div className="rounded-2xl p-6 mb-6" style={{ background: 'white', border: '1px solid rgba(28,25,23,0.08)' }}>
          <div className="font-black text-lg mb-4" style={{ color: '#1c1917' }}>Yendo Car-Secured Visa — Key Facts</div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ['Card Type', 'Visa Credit Card'],
              ['Credit Line Range', '$500 – $10,000'],
              ['Collateral', 'Vehicle equity (lien on title)'],
              ['Cash Deposit', 'None required'],
              ['Credit Score Requirement', 'No minimum stated'],
              ['Initial Inquiry Type', 'Soft pull (eligibility check)'],
              ['Credit Bureau Reporting', 'All three major bureaus'],
              ['State Availability', '37 states (check Yendo.com)'],
              ['APR', 'Variable; verify current rate with Yendo'],
              ['Annual Fee', 'Verify current terms with Yendo'],
            ].map(([label, val]) => (
              <div key={label}>
                <div className="text-xs mb-0.5" style={{ color: '#a8a29e' }}>{label}</div>
                <div className="text-sm font-semibold" style={{ color: '#1c1917' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-xl font-black mb-3" style={{ color: '#1c1917' }}>Pros</h3>
        <ul className="space-y-2 mb-6">
          {[
            'No cash deposit required — unlike secured cards that require $200–$500 upfront',
            'Potentially higher credit limits — up to $10,000 vs. typical secured card limits of $200–$500',
            'No minimum credit score publicly stated — designed for subprime borrowers',
            'Reports to all three credit bureaus — enables credit building with responsible use',
            'You keep driving your car — vehicle is collateral, not surrendered',
            'Soft pull for initial eligibility check — no credit score impact from checking',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: '#78716c' }}>
              <span className="text-emerald-500 flex-shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-black mb-3" style={{ color: '#1c1917' }}>Cons & Considerations</h3>
        <ul className="space-y-2 mb-8">
          {[
            'Your car has a lien on it — you cannot sell or trade the vehicle without settling the lien',
            'If you default on payments, the issuer could potentially repossess the vehicle',
            'Not available in all states — currently 37 states; verify your state\'s eligibility',
            'APR may be higher than prime credit card rates — typical for subprime products',
            'Your car must have sufficient equity — older or lower-value vehicles may not qualify',
            'Relatively new product category — less historical consumer data available compared to established secured cards',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: '#78716c' }}>
              <span className="text-amber-500 flex-shrink-0">⚠</span>
              {item}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Car Equity Cards vs. Secured Cards vs. Title Loans</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Understanding how car equity cards compare to other options helps determine if they are the right fit:
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm" style={{ color: '#78716c' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(28,25,23,0.1)' }}>
                {['Feature', 'Car Equity Card', 'Secured Card', 'Title Loan'].map(h => (
                  <th key={h} className="text-left py-3 px-3 font-bold" style={{ color: '#1c1917' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Collateral', 'Vehicle (lien)', 'Cash deposit', 'Vehicle (may surrender)'],
                ['Credit Limit', '$500–$10,000', '$200–$500 typical', 'N/A (loan amount)'],
                ['Upfront Cost', 'None (no deposit)', '$200–$500 deposit', 'None'],
                ['Credit Building', 'Yes (all 3 bureaus)', 'Yes (varies)', 'Usually no'],
                ['Revolving Credit', 'Yes', 'Yes', 'No (term loan)'],
                ['Risk to Vehicle', 'Lien; repossession if default', 'None', 'High; repossession common'],
                ['APR Range', 'Subprime rates', 'Varies widely', 'Often 100–300% APR'],
                ['Credit Score Needed', 'No minimum stated', 'Often none', 'Often none'],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(28,25,23,0.06)' }}>
                  {row.map((cell, j) => (
                    <td key={j} className="py-3 px-3" style={{ fontWeight: j === 0 ? 600 : 400, color: j === 0 ? '#1c1917' : undefined }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>How Much Credit Can Your Car Unlock?</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Your potential credit line depends on your car&apos;s market value and equity. Car equity card issuers typically offer 50–70% of your vehicle&apos;s appraised value, up to their maximum limit. Here are rough estimates based on common vehicle values:
        </p>
        <div className="space-y-3 mb-8">
          {[
            { car: '2018 Toyota Camry (Good condition)', value: '$14,000', line: '$2,500 – $5,000' },
            { car: '2020 Honda CR-V (Good condition)', value: '$22,000', line: '$5,000 – $10,000' },
            { car: '2016 Ford F-150 (Fair condition)', value: '$18,000', line: '$4,000 – $8,000' },
            { car: '2014 Nissan Altima (Fair condition)', value: '$7,000', line: '$1,500 – $3,500' },
          ].map((item, i) => (
            <div key={i} className="rounded-xl p-4 flex justify-between items-center" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.06)' }}>
              <div>
                <div className="font-semibold text-sm" style={{ color: '#1c1917' }}>{item.car}</div>
                <div className="text-xs" style={{ color: '#a8a29e' }}>Est. value: {item.value}</div>
              </div>
              <div className="text-right">
                <div className="font-bold" style={{ color: '#059669' }}>{item.line}</div>
                <div className="text-xs" style={{ color: '#a8a29e' }}>Potential credit line</div>
              </div>
            </div>
          ))}
        </div>
        <p className="mb-8 text-sm leading-relaxed" style={{ color: '#a8a29e' }}>
          These are illustrative estimates only. Actual credit lines are determined by the issuer based on their proprietary valuation and underwriting criteria. Use our <Link href="/finance/calculator" className="underline hover:text-amber-700">free car equity calculator</Link> for a rough estimate.
        </p>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>What Happens If You Miss Payments?</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Because your vehicle serves as collateral, the consequences of missed payments are more significant than with an unsecured credit card:
        </p>
        <ul className="space-y-2 mb-4">
          {[
            'Late payments are reported to credit bureaus and will damage your credit score',
            'Late fees may apply per the card\'s terms and conditions',
            'Extended delinquency could result in the issuer exercising their lien — meaning they could repossess your vehicle',
            'Any balance that exceeds the vehicle\'s value at repossession may still be owed',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: '#78716c' }}>
              <span className="text-red-400 flex-shrink-0">•</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          This is the primary risk of car equity credit cards. If you are not confident in your ability to make minimum monthly payments consistently, a traditional secured card (where the risk is limited to your cash deposit) may be a safer option.
        </p>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Who Should Consider a Car Equity Credit Card?</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Based on the product structure, a car equity credit card makes the most sense for people who:
        </p>
        <ul className="space-y-2 mb-8">
          {[
            'Have bad or no credit but own a car with meaningful equity',
            'Cannot afford a $200–$500 cash deposit for a traditional secured card',
            'Need a higher credit limit than secured cards typically offer',
            'Want to actively rebuild their credit score with a product that reports to all three bureaus',
            'Are confident they can make at least minimum payments each month',
            'Live in one of the 37 eligible states',
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: '#78716c' }}>
              <span className="text-emerald-500 flex-shrink-0">→</span>
              {item}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Frequently Asked Questions</h2>
        <div className="space-y-6 mb-10">
          {[
            { q: 'Will checking my eligibility hurt my credit score?', a: 'No. The initial eligibility check is a soft inquiry, which does not affect your credit score. A hard inquiry may occur only if you choose to formally apply after seeing your eligibility result.' },
            { q: 'Can I still drive my car?', a: 'Yes. The issuer places a lien on your title, but you retain full possession and use of your vehicle. You continue driving it normally.' },
            { q: 'What if I want to sell my car?', a: 'You would need to settle the lien first (pay off or close the credit card balance) before transferring the title to a buyer.' },
            { q: 'Is this the same as a title loan?', a: 'No. A title loan is a short-term, high-interest loan with a fixed repayment schedule and very high APRs (often 100%+). A car equity credit card is a revolving credit line with a standard Visa card that can be used anywhere. The interest rates, while higher than prime cards, are dramatically lower than title loans.' },
            { q: 'How fast can I get the card?', a: 'Eligibility checks are typically instant. If approved, the physical card is mailed and usually arrives within 7–14 business days. Verify current timelines directly with the issuer.' },
            { q: 'Does this help build credit?', a: 'Yes, if you make payments on time. Car equity credit cards that report to all three major bureaus (Experian, Equifax, TransUnion) enable credit building through consistent positive payment history.' },
          ].map((faq, i) => (
            <div key={i}>
              <div className="font-bold mb-2" style={{ color: '#1c1917' }}>{faq.q}</div>
              <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{faq.a}</p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="rounded-2xl p-6 text-center mb-12" style={{ background: '#1c1917' }}>
          <h3 className="text-xl font-black text-white mb-2">See If Your Car Qualifies</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>Check your eligibility in under 5 minutes. Soft inquiry — no credit score impact.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <AffiliateLink href={YENDO_CAR_EQUITY_REVIEW_CTA} placement="car-equity-review-cta" className="btn-primary py-3 px-6">Check Car Eligibility →</AffiliateLink>
            <Link href="/finance/calculator" className="btn-primary py-3 px-6" style={{ background: '#059669' }}>Use Free Calculator</Link>
          </div>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.28)' }}>Affiliate links · Soft inquiry · Mintbrooks is not a lender</p>
        </div>

        {/* Related reading */}
        <div className="mb-10">
          <div className="font-black mb-4" style={{ color: '#1c1917' }}>Related Reading</div>
          <div className="space-y-2">
            {[
              { href: '/yendo-credit-card-review', label: 'Yendo Credit Card Review — Full Breakdown' },
              { href: '/bad-credit-credit-card', label: 'Best Credit Cards for Bad Credit (2026)' },
              { href: '/how-to-build-credit-with-bad-credit', label: 'How to Build Credit with Bad Credit — Step by Step' },
              { href: '/finance/calculator', label: 'Free Car Equity Calculator' },
              { href: '/use-car-as-collateral', label: 'How to Use Your Car as Collateral for a Credit Card' },
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
