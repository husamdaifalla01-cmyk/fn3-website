import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import { OFFERS, buildAffiliateUrl } from '@/lib/offers'

const YENDO_FAQ_TOP = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'faq-top-cta')
const YENDO_FAQ_BOT = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'faq-bottom-cta')

export const metadata: Metadata = {
  title: 'Car-Secured Credit Card FAQ — Mintbrooks',
  description: 'Answers to the most common questions about car-secured credit cards: how they work, credit score impact, which states qualify, what cars are eligible, and how to apply.',
  alternates: { canonical: 'https://mintbrooks.com/faq' },
  openGraph: {
    title: 'Car-Secured Credit Card FAQ — Mintbrooks',
    description: 'Everything you want to know about using your car to get a credit card — no fluff, plain answers.',
    url: 'https://mintbrooks.com/faq',
  },
}

const faqs = [
  {
    question: 'What is a car-secured credit card?',
    answer:
      'A car-secured credit card uses your vehicle\'s equity as collateral instead of a cash deposit or a high credit score. Yendo is the main issuer of this product. Your car\'s value determines your credit limit ($500–$10,000), and you keep driving your car normally — it\'s not a title loan and there\'s no repossession risk from using the card.',
  },
  {
    question: 'Will checking my eligibility hurt my credit score?',
    answer:
      'No. The initial eligibility check with Yendo is a soft inquiry — it does not appear on your credit report and does not affect your score. If you proceed to a full application, a hard inquiry may occur at that stage. The "check if your car qualifies" step is completely score-safe.',
  },
  {
    question: 'What credit score do I need to qualify?',
    answer:
      'You do not need a minimum credit score to check eligibility. Yendo\'s car-secured card is designed for people with bad credit (300–600) or thin credit files. Your car\'s value is the primary factor, not your credit history.',
  },
  {
    question: 'Which states is Yendo available in?',
    answer:
      'Yendo is currently available in 37 states + DC: AL, AR, AZ, CA, CO, CT, DC, DE, FL, GA, ID, IL, IN, KS, KY, MI, MS, MT, NC, ND, NE, NH, NM, NV, OH, OR, PA, RI, SC, TN, TX, UT, VA, VT, WA, WV, WY. Not currently available in: AK, HI, IA, LA, ME, MD, MA, MN, MO, NJ, NY, OK, SD, WI.',
  },
  {
    question: 'What cars qualify?',
    answer:
      'Generally, you need to own a car with a clear title — meaning no existing liens or loans against it. Newer cars and cars in better condition tend to qualify for higher credit limits. The car does not need to be new or high-value; the eligibility checker will assess your specific vehicle.',
  },
  {
    question: 'How is this different from a regular secured credit card?',
    answer:
      'Traditional secured cards require a cash deposit (usually $200–$500) that you must leave locked up. A car-secured card uses your vehicle\'s equity instead — so you don\'t need to tie up cash. The credit limits are also typically higher ($500–$10,000 vs. $200–$500 on most secured cards).',
  },
  {
    question: 'Can I lose my car if I miss a payment?',
    answer:
      'No. This is not a title loan. Missing a credit card payment will affect your credit score and may incur late fees, but Yendo cannot repossess your car for a missed credit card payment. Your car secures the card, not a loan.',
  },
  {
    question: 'Does Mintbrooks process credit card applications?',
    answer:
      'No. Mintbrooks is an independent educational resource. We do not process applications, make lending decisions, or have access to your financial information. When you click "Check If My Car Qualifies," you go directly to Yendo\'s website where the application happens. Mintbrooks may earn a commission if you apply through our links.',
  },
  {
    question: 'How long does approval take?',
    answer:
      'The initial eligibility check takes about 30 seconds. If you proceed with a full application, Yendo typically makes approval decisions within 1–2 business days. Card delivery timing varies — check Yendo\'s website for current processing times.',
  },
  {
    question: 'Will using this card actually help me build credit?',
    answer:
      'Yes, if used responsibly. Yendo reports to the major credit bureaus. Paying on time and keeping your balance low relative to your limit are the two most effective ways to build your score over time. Most people with consistent on-time payments see score improvements within 6–12 months.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavBar />
      <main className="max-w-3xl mx-auto px-4 py-14">
        {/* Breadcrumb */}
        <nav className="text-xs mb-6 flex items-center gap-2" style={{ color: '#a8a29e' }}>
          <Link href="/" className="hover:text-amber-700 transition-colors">Mintbrooks</Link>
          <span>/</span>
          <span>FAQ</span>
        </nav>

        <h1 className="text-4xl font-black mb-3" style={{ color: '#fafaf9' }}>
          Frequently Asked Questions
        </h1>
        <p className="text-lg mb-8" style={{ color: '#a8a29e' }}>
          Plain answers about car-secured credit cards — no jargon, no runaround.
        </p>

        {/* Top CTA */}
        <div className="rounded-xl border p-5 mb-10" style={{ background: '#1c1917', borderColor: '#44403c' }}>
          <p className="text-sm mb-3" style={{ color: '#a8a29e' }}>
            Ready to check? The initial eligibility check is a soft inquiry — it won&apos;t affect your score.
          </p>
          <AffiliateLink
            href={YENDO_FAQ_TOP}
            placement="faq-top-cta"
            className="inline-block font-bold py-3 px-6 rounded-lg text-sm transition-colors"
            style={{ background: '#d97706', color: '#fff' }}
          >
            Check If My Car Qualifies →
          </AffiliateLink>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="rounded-xl border"
              style={{ background: '#1c1917', borderColor: '#44403c' }}
            >
              <summary
                className="px-6 py-4 cursor-pointer font-bold text-base list-none flex items-center justify-between"
                style={{ color: '#fafaf9' }}
              >
                <span>{faq.question}</span>
                <span className="ml-4 text-amber-600 text-lg flex-shrink-0">+</span>
              </summary>
              <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#a8a29e' }}>
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-xl border p-6 text-center" style={{ background: '#1c1917', borderColor: '#44403c' }}>
          <h2 className="text-xl font-black mb-2" style={{ color: '#fafaf9' }}>Still have a question?</h2>
          <p className="text-sm mb-4" style={{ color: '#a8a29e' }}>
            Or skip straight to checking eligibility — it&apos;s free and won&apos;t affect your credit score.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <AffiliateLink
              href={YENDO_FAQ_BOT}
              placement="faq-bottom-cta"
              className="inline-block font-bold py-3 px-6 rounded-lg text-sm transition-colors"
              style={{ background: '#d97706', color: '#fff' }}
            >
              Check My Car Eligibility →
            </AffiliateLink>
            <Link
              href="mailto:support@mintbrooks.com"
              className="inline-block font-bold py-3 px-6 rounded-lg text-sm border transition-colors"
              style={{ borderColor: '#57534e', color: '#a8a29e' }}
            >
              Email Support
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-10">
          <h2 className="text-lg font-black mb-4" style={{ color: '#fafaf9' }}>Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/how-it-works', label: 'How Car-Secured Credit Works' },
              { href: '/bad-credit-credit-card', label: 'Best Credit Cards for Bad Credit' },
              { href: '/yendo-review', label: 'Yendo Card Review 2026' },
              { href: '/how-to-rebuild-credit', label: 'How to Rebuild Credit (Step-by-Step)' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block rounded-lg border p-4 text-sm font-medium transition-colors hover:border-amber-700"
                style={{ background: '#1c1917', borderColor: '#44403c', color: '#a8a29e' }}
              >
                {label} →
              </Link>
            ))}
          </div>
        </div>

        {/* FTC Disclosure */}
        <p className="mt-10 text-xs" style={{ color: '#78716c' }}>
          <strong>Affiliate disclosure:</strong> Mintbrooks may earn a commission when you apply through our links at no extra cost to you. We are not a lender, bank, or credit card issuer. This content is for educational purposes only and does not constitute financial advice. See our{' '}
          <Link href="/privacy" className="underline hover:text-amber-700 transition-colors">Privacy Policy</Link>.
        </p>
      </main>
    </>
  )
}
