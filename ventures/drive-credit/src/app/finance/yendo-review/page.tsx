import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import { buildAffiliateUrl, OFFERS } from '@/lib/offers'

const YENDO_REVIEW_HERO = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'yendo-review-hero')
const YENDO_REVIEW_MID  = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'yendo-review-mid')
const YENDO_REVIEW_CTA  = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'yendo-review-cta')
const SLAM_DUNK_REVIEW  = buildAffiliateUrl(OFFERS.slamDunk.url, 'organic', 'seo', 'yendo-review-fallback')

export const metadata: Metadata = {
  title: 'Yendo Credit Card Review 2026 — Legit or Scam? Real Approval Odds Explained',
  description: 'Yendo is a car-secured Visa credit card that uses your vehicle as collateral instead of your credit score. This review covers approval requirements, fees, credit limits, and who it\'s best for.',
  keywords: 'yendo credit card review, yendo review, yendo legit, yendo scam, yendo card approval odds, yendo vs secured credit card, yendo bad credit',
  alternates: { canonical: 'https://mintbrooks.com/finance/yendo-review' },
  openGraph: {
    title: 'Yendo Credit Card Review 2026 — Is It Legit?',
    description: 'Yendo uses your car as collateral to give you a real Visa credit card with up to $10,000 limit — no credit score required. Our honest review.',
    type: 'article',
    url: 'https://mintbrooks.com/yendo-review',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Review',
  name: 'Yendo Credit Card Review 2026',
  description: 'An independent review of the Yendo car-secured Visa credit card, including approval requirements, fees, and who it suits best.',
  reviewRating: {
    '@type': 'Rating',
    ratingValue: '4.2',
    bestRating: '5',
    worstRating: '1',
  },
  author: {
    '@type': 'Organization',
    name: 'Mintbrooks',
    url: 'https://mintbrooks.com',
  },
  itemReviewed: {
    '@type': 'FinancialProduct',
    name: 'Yendo Credit Card',
    description: 'A car-secured Visa credit card that uses vehicle equity instead of credit score for approval.',
    url: 'https://yendo.com',
    provider: {
      '@type': 'Organization',
      name: 'Yendo',
    },
  },
  datePublished: '2026-04-01',
  dateModified: '2026-04-06',
  publisher: {
    '@type': 'Organization',
    name: 'Mintbrooks',
    url: 'https://mintbrooks.com',
  },
}

const faqItems = [
  {
    q: 'Is Yendo a legitimate credit card?',
    a: 'Yes. Yendo is a real Visa credit card issued by a licensed U.S. bank. It uses your vehicle\'s equity as collateral instead of your credit score to determine eligibility. The card is accepted anywhere Visa is accepted.',
  },
  {
    q: 'What credit score do you need for Yendo?',
    a: 'Yendo does not require a minimum credit score. The approval decision is based primarily on your vehicle\'s value and equity, not your credit history. People with scores as low as 450–500 have been approved.',
  },
  {
    q: 'What vehicles qualify for Yendo?',
    a: 'Most vehicles 2011 or newer with a clear title (no outstanding loans) qualify. The car must be insured, registered in your name, and located in an eligible state. Yendo currently operates in 36+ states.',
  },
  {
    q: 'Does Yendo charge an annual fee?',
    a: 'Yes. Yendo charges an annual fee (typically $75–$99 depending on your credit limit). There is no setup fee or security deposit. The fee is charged to your new card balance.',
  },
  {
    q: 'Will applying for Yendo hurt my credit score?',
    a: 'Checking your eligibility uses a soft inquiry, which does not affect your credit score. If you proceed with a full application, a hard inquiry may be placed — standard for all credit card applications.',
  },
  {
    q: 'What is Yendo\'s credit limit?',
    a: 'Credit limits range from $1,000 to $10,000 based on your vehicle\'s appraised equity value. Most applicants receive a limit between $2,000 and $5,000.',
  },
  {
    q: 'What happens if I don\'t pay my Yendo bill?',
    a: 'Like any secured credit product, Yendo can take action against your vehicle if you severely default. Making on-time minimum payments protects your vehicle. Yendo reports to all three credit bureaus, so on-time payments also build your credit score.',
  },
  {
    q: 'Is Yendo available in my state?',
    a: 'Yendo is available in 36+ states as of 2026. Check the eligibility page to confirm availability in your state before applying.',
  },
]

const prosAndCons = {
  pros: [
    'No minimum credit score — approval based on your vehicle',
    'Soft pull eligibility check (won\'t hurt your score)',
    'Real Visa card — accepted everywhere',
    'Up to $10,000 credit limit',
    'Reports to all 3 credit bureaus (builds credit over time)',
    'No cash deposit required',
    'Can apply with thin credit, no credit, or past bankruptcies',
  ],
  cons: [
    'Annual fee ($75–$99) — no free version',
    'Requires a clear vehicle title (no existing auto loan)',
    'Not available in all 50 states (36+ as of 2026)',
    'APR is higher than prime credit cards (~29.99%)',
    'Vehicle must be 2011 or newer',
    'Defaulting risks vehicle repossession in extreme cases',
  ],
}

const comparisonRows = [
  { feature: 'Approval basis', yendo: 'Vehicle equity', secured: 'Cash deposit + credit check', traditional: 'Credit score (670+ typically)' },
  { feature: 'Min credit score', yendo: 'None', secured: '580+ (some)', traditional: '670+' },
  { feature: 'Security deposit', yendo: 'None (car is collateral)', secured: '$200–$500 cash', traditional: 'None' },
  { feature: 'Credit limit', yendo: '$1,000–$10,000', secured: 'Equals your deposit', traditional: '$500–$30,000+' },
  { feature: 'Annual fee', yendo: '$75–$99', secured: '$0–$49', traditional: '$0–$99' },
  { feature: 'Builds credit', yendo: 'Yes (all 3 bureaus)', secured: 'Yes (all 3 bureaus)', traditional: 'Yes (all 3 bureaus)' },
  { feature: 'Soft eligibility check', yendo: 'Yes', secured: 'Some', traditional: 'Rare' },
  { feature: 'Best for', yendo: 'Bad credit + car owner', secured: 'Bad credit, no car', traditional: 'Good–excellent credit' },
]

export default function YendoReviewPage() {
  return (
    <>
      <NavBar />
      <article className="max-w-2xl mx-auto px-4 pt-8 pb-16">

        {/* Breadcrumb */}
        <nav className="text-xs mb-6" style={{ color: '#a8a29e' }}>
          <Link href="/" className="hover:underline" style={{ color: '#d97706' }}>Mintbrooks</Link>
          {' / '}
          <Link href="/bad-credit-credit-card" className="hover:underline" style={{ color: '#d97706' }}>Credit Cards for Bad Credit</Link>
          {' / '}
          <span>Yendo Review</span>
        </nav>

        {/* Score badge */}
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(217,119,6,0.12)', color: '#d97706' }}>
          ★ 4.2 / 5 — Mintbrooks Rating
        </div>

        <div className="section-label mb-3">Review</div>
        <h1 className="text-3xl font-black mb-4 leading-tight" style={{ color: '#1c1917' }}>
          Yendo Credit Card Review 2026: Legit Car-Secured Visa or Too Good to Be True?
        </h1>
        <p className="text-lg mb-2 leading-relaxed" style={{ color: '#78716c' }}>
          Yendo is a Visa credit card that uses your car&apos;s equity as collateral instead of your credit score. If you own a vehicle outright and have been rejected everywhere else, Yendo is likely the highest credit limit you can get right now.
        </p>
        <p className="text-sm mb-8" style={{ color: '#a8a29e' }}>
          Updated April 2026 · Advertising disclosure: Mintbrooks may earn a commission if you apply through our links.
        </p>

        {/* Hero CTA */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.07)' }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl" style={{ background: '#d97706' }}>
              💳
            </div>
            <div className="flex-1">
              <div className="font-black text-base mb-1" style={{ color: '#1c1917' }}>Yendo Car-Secured Visa</div>
              <div className="text-sm mb-3" style={{ color: '#78716c' }}>Up to $10,000 credit limit · No minimum credit score · Soft pull eligibility check</div>
              <AffiliateLink href={YENDO_REVIEW_HERO} placement="yendo-review-hero" className="btn-primary text-sm py-2 px-5 inline-block">
                Check If My Car Qualifies →
              </AffiliateLink>
              <div className="text-xs mt-2" style={{ color: '#a8a29e' }}>30-second check. Won&apos;t affect your credit score.</div>
            </div>
          </div>
        </div>

        {/* Pros & Cons */}
        <h2 className="text-xl font-black mb-4" style={{ color: '#1c1917' }}>Pros & Cons</h2>
        <div className="grid grid-cols-1 gap-4 mb-10 sm:grid-cols-2">
          <div className="rounded-xl p-4" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <div className="text-sm font-bold mb-3" style={{ color: '#15803d' }}>✓ Pros</div>
            <ul className="space-y-2">
              {prosAndCons.pros.map((pro, i) => (
                <li key={i} className="text-sm flex gap-2" style={{ color: '#1c1917' }}>
                  <span style={{ color: '#16a34a', flexShrink: 0 }}>✓</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl p-4" style={{ background: '#fff7ed', border: '1px solid #fed7aa' }}>
            <div className="text-sm font-bold mb-3" style={{ color: '#c2410c' }}>✗ Cons</div>
            <ul className="space-y-2">
              {prosAndCons.cons.map((con, i) => (
                <li key={i} className="text-sm flex gap-2" style={{ color: '#1c1917' }}>
                  <span style={{ color: '#ea580c', flexShrink: 0 }}>✗</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Who It's Best For */}
        <h2 className="text-xl font-black mb-3" style={{ color: '#1c1917' }}>Who Yendo Is Best For</h2>
        <p className="text-base mb-4 leading-relaxed" style={{ color: '#57534e' }}>
          Yendo is purpose-built for one profile: someone who owns their car outright, has damaged or thin credit, and needs a real credit card — not a prepaid card, not a store card, not a secured card that ties up $300 in cash.
        </p>
        <div className="rounded-xl p-5 mb-4" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.07)' }}>
          <div className="text-sm font-bold mb-3" style={{ color: '#1c1917' }}>Yendo is a great fit if you:</div>
          <ul className="space-y-2 text-sm" style={{ color: '#57534e' }}>
            <li className="flex gap-2"><span style={{ color: '#d97706' }}>→</span> Own your car outright (no existing auto loan)</li>
            <li className="flex gap-2"><span style={{ color: '#d97706' }}>→</span> Have a credit score below 620 or no credit history</li>
            <li className="flex gap-2"><span style={{ color: '#d97706' }}>→</span> Have been rejected by traditional credit cards or secured cards</li>
            <li className="flex gap-2"><span style={{ color: '#d97706' }}>→</span> Want to build credit without tying up cash in a security deposit</li>
            <li className="flex gap-2"><span style={{ color: '#d97706' }}>→</span> Live in one of the 36+ eligible states</li>
          </ul>
        </div>
        <div className="rounded-xl p-5 mb-10" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.07)' }}>
          <div className="text-sm font-bold mb-3" style={{ color: '#1c1917' }}>Yendo is NOT a good fit if you:</div>
          <ul className="space-y-2 text-sm" style={{ color: '#57534e' }}>
            <li className="flex gap-2"><span style={{ color: '#a8a29e' }}>→</span> Still owe money on your car (you need a clear title)</li>
            <li className="flex gap-2"><span style={{ color: '#a8a29e' }}>→</span> Want a $0 annual fee card</li>
            <li className="flex gap-2"><span style={{ color: '#a8a29e' }}>→</span> Have good credit and can qualify for better rewards cards</li>
            <li className="flex gap-2"><span style={{ color: '#a8a29e' }}>→</span> Don&apos;t own a vehicle or your vehicle is older than 2011</li>
          </ul>
        </div>

        {/* Mid CTA */}
        <div className="rounded-xl p-5 mb-10 text-center" style={{ background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.15)' }}>
          <p className="text-sm font-bold mb-3" style={{ color: '#1c1917' }}>See if your car qualifies — takes 30 seconds</p>
          <AffiliateLink href={YENDO_REVIEW_MID} placement="yendo-review-mid" className="btn-primary text-sm py-2 px-5 inline-block">
            Check Eligibility (Soft Pull) →
          </AffiliateLink>
        </div>

        {/* Comparison Table */}
        <h2 className="text-xl font-black mb-4" style={{ color: '#1c1917' }}>Yendo vs Secured Cards vs Traditional Cards</h2>
        <div className="overflow-x-auto mb-10 rounded-xl" style={{ border: '1px solid rgba(28,25,23,0.07)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#1c1917', color: '#fff' }}>
                <th className="text-left p-3 font-bold">Feature</th>
                <th className="text-left p-3 font-bold" style={{ color: '#d97706' }}>Yendo</th>
                <th className="text-left p-3 font-bold">Secured Card</th>
                <th className="text-left p-3 font-bold">Traditional Card</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(28,25,23,0.07)', background: i % 2 === 0 ? '#fff' : '#fafaf9' }}>
                  <td className="p-3 font-medium" style={{ color: '#1c1917' }}>{row.feature}</td>
                  <td className="p-3 font-semibold" style={{ color: '#d97706' }}>{row.yendo}</td>
                  <td className="p-3" style={{ color: '#57534e' }}>{row.secured}</td>
                  <td className="p-3" style={{ color: '#57534e' }}>{row.traditional}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How It Works */}
        <h2 className="text-xl font-black mb-4" style={{ color: '#1c1917' }}>How Yendo Works</h2>
        <div className="space-y-4 mb-10">
          {[
            { step: '1', title: 'Check eligibility (soft pull)', desc: 'Enter your car details online. Yendo uses a soft inquiry to estimate your vehicle\'s value and check state availability. This does NOT affect your credit score.' },
            { step: '2', title: 'Vehicle appraisal', desc: 'Yendo appraises your car using market data (similar to KBB). Your credit limit is based on a percentage of your car\'s equity value — typically 20–40% of the car\'s market value.' },
            { step: '3', title: 'Receive your Visa card', desc: 'If approved, your physical Yendo Visa arrives by mail within 7–10 business days. The card works everywhere Visa is accepted — gas stations, groceries, online, everywhere.' },
            { step: '4', title: 'Use it and build credit', desc: 'Yendo reports your on-time payments to Equifax, Experian, and TransUnion every month. Responsible use builds your credit score — your car is collateral, but keeping payments current protects it.' },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 p-4 rounded-xl" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.07)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0" style={{ background: '#d97706', color: '#fff' }}>{item.step}</div>
              <div>
                <div className="font-bold text-sm mb-1" style={{ color: '#1c1917' }}>{item.title}</div>
                <div className="text-sm leading-relaxed" style={{ color: '#57534e' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Verdict */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: '#1c1917', color: '#fff' }}>
          <div className="text-sm font-bold mb-2" style={{ color: '#d97706' }}>Mintbrooks Verdict</div>
          <h2 className="text-lg font-black mb-3">Yendo is legitimate and worth applying for if you own your car outright</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#a8a29e' }}>
            The annual fee is real. The APR is high. But if you&apos;ve been rejected everywhere else and you own your car free and clear, Yendo gives you the highest accessible credit limit available in your situation — without tying up cash in a deposit. The credit-building is a genuine bonus.
          </p>
          <p className="text-sm leading-relaxed mb-5" style={{ color: '#a8a29e' }}>
            The risk is real too: your car is collateral. But the math only gets scary if you stop paying entirely — minimum payments protect your vehicle. Treat it like a utility bill and it functions well.
          </p>
          <AffiliateLink href={YENDO_REVIEW_CTA} placement="yendo-review-cta" className="btn-primary text-sm py-2 px-5 inline-block">
            Check If My Car Qualifies →
          </AffiliateLink>
        </div>

        {/* FAQ */}
        <h2 className="text-xl font-black mb-6" style={{ color: '#1c1917' }}>Frequently Asked Questions</h2>
        <div className="space-y-4 mb-10">
          {faqItems.map((item, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.07)' }}>
              <div className="font-bold text-sm mb-2" style={{ color: '#1c1917' }}>{item.q}</div>
              <div className="text-sm leading-relaxed" style={{ color: '#57534e' }}>{item.a}</div>
            </div>
          ))}
        </div>

        {/* Slam Dunk fallback */}
        <div className="rounded-xl p-5 mb-10" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.07)' }}>
          <div className="text-sm font-bold mb-2" style={{ color: '#1c1917' }}>Yendo not available in your state?</div>
          <p className="text-sm mb-3" style={{ color: '#78716c' }}>Slam Dunk Financial offers personal loan options for bad-credit borrowers in states where Yendo isn&apos;t available yet.</p>
          <a href={SLAM_DUNK_REVIEW} className="text-sm font-semibold hover:underline" style={{ color: '#d97706' }}>
            See personal loan alternatives →
          </a>
        </div>

        {/* Related guides */}
        <div className="pt-8 mb-8" style={{ borderTop: '1px solid rgba(28,25,23,0.07)' }}>
          <h3 className="text-sm font-bold mb-3" style={{ color: '#1c1917' }}>Related Guides</h3>
          <div className="flex flex-col gap-2">
            <Link href="/yendo-states-guide" className="text-sm font-medium hover:underline" style={{ color: '#d97706' }}>
              → Is Yendo Available in Your State? (37-State Eligibility Guide)
            </Link>
            <Link href="/bad-credit-credit-card" className="text-sm font-medium hover:underline" style={{ color: '#d97706' }}>
              → Best Credit Cards for Bad Credit — Ranked by Real Approval Odds
            </Link>
            <Link href="/car-title-loan-alternative" className="text-sm font-medium hover:underline" style={{ color: '#d97706' }}>
              → Car Title Loan Alternatives That Don&apos;t Risk Your Vehicle
            </Link>
            <Link href="/credit-builder-loan" className="text-sm font-medium hover:underline" style={{ color: '#d97706' }}>
              → Credit Builder Loan vs. Yendo: Which Builds Credit Faster?
            </Link>
          </div>
        </div>

        {/* Disclosure */}
        <div className="text-xs pt-6 leading-relaxed" style={{ color: '#a8a29e', borderTop: '1px solid rgba(28,25,23,0.07)' }}>
          Mintbrooks is an independent educational resource. We are not affiliated with Yendo or any card issuer. Card details are based on publicly available information and may change. Approval decisions are made solely by Yendo — Mintbrooks makes no guarantee of approval. We may earn a commission when you apply through our links at no extra cost to you. This is not financial advice. Always verify current terms directly with Yendo before applying.
        </div>
      </article>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }),
        }}
      />
    </>
  )
}
