import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import { YENDO_HOW_IT_WORKS_CTA } from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'How Car-Secured Credit Works — Mintbrooks',
  description: 'A clear explanation of how car-secured credit works: from application to using the card. No jargon, no surprises.',
  alternates: { canonical: 'https://mintbrooks.com/finance/how-it-works' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How Car-Secured Credit Works',
  description: 'Step-by-step guide to understanding car-secured credit cards.',
  datePublished: '2026-01-01',
  dateModified: '2026-03-22',
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavBar />
      <article className="max-w-3xl mx-auto px-4 py-14">

        <nav className="text-xs mb-6 flex items-center gap-2" style={{ color: '#a8a29e' }}>
          <Link href="/" className="hover:text-amber-700 transition-colors">Mintbrooks</Link>
          <span>›</span>
          <span>How It Works</span>
        </nav>

        <div className="section-label mb-3">The Process</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>
          How Car-Secured Credit Works
        </h1>
        <p className="text-lg mb-10 leading-relaxed" style={{ color: '#78716c' }}>
          From checking eligibility to using your card at any Visa terminal — here's the full process, plain and simple.
        </p>

        <div className="space-y-0 mb-12">
          {[
            {
              step: '01',
              title: 'You Check Your Car\'s Eligibility',
              body: 'The process starts with a soft inquiry — a check that doesn\'t affect your credit score. You provide basic information about your vehicle (year, make, model, mileage) and the lender estimates your credit line based on your car\'s current market value.',
            },
            {
              step: '02',
              title: 'Lender Assesses Your Vehicle\'s Equity',
              body: 'Unlike traditional cards, the credit limit isn\'t based on your FICO score. It\'s based on how much your car is worth and how much you owe on it (if anything). The difference — your equity — determines your potential credit line. Typical LTV is 50–70% of equity.',
            },
            {
              step: '03',
              title: 'A Lien Is Placed on Your Title',
              body: 'If you\'re approved, the lender places a lien on your vehicle\'s title. This is how the car secures the credit line. You keep the title, you keep driving your car. The lien just means the lender has a recorded security interest while the account is open.',
            },
            {
              step: '04',
              title: 'You Receive a Visa Credit Card',
              body: 'Your car-secured card works like any Visa credit card. Use it anywhere Visa is accepted — groceries, gas, online shopping. You get a statement each month with a minimum payment due.',
            },
            {
              step: '05',
              title: 'You Pay Your Bill, Your Credit Builds',
              body: 'Monthly payments are reported to all three credit bureaus (Equifax, Experian, TransUnion). On-time payments build your credit history and improve your score. Your credit line is revolving — pay it down, and it\'s available to use again.',
            },
            {
              step: '06',
              title: 'When You Close the Account',
              body: 'Once you close the account and pay the balance in full, the lien is removed from your title. Your car is fully unencumbered. Read your account agreement carefully to understand the lien removal process before you apply.',
            },
          ].map((item, i) => (
            <div
              key={item.step}
              className="flex gap-6 pb-10"
              style={{ borderLeft: i < 5 ? '2px solid rgba(217,119,6,0.2)' : '2px solid transparent', marginLeft: '20px', paddingLeft: '32px', position: 'relative' }}
            >
              <div
                className="absolute flex items-center justify-center text-sm font-black rounded-full"
                style={{ left: '-20px', top: '0', width: '40px', height: '40px', background: '#fef9ee', border: '2px solid rgba(217,119,6,0.3)', color: '#d97706' }}
              >
                {item.step}
              </div>
              <div>
                <h3 className="font-black text-lg mb-2" style={{ color: '#1c1917' }}>{item.title}</h3>
                <p className="leading-relaxed text-sm" style={{ color: '#78716c' }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Common Questions</h2>
        <div className="space-y-4 mb-10">
          {[
            {
              q: 'Do I have to hand over my car?',
              a: 'No. You keep driving your car normally. A lien is placed on the title, but your car stays with you. The lender only has a security interest — not possession.',
            },
            {
              q: 'What happens if I miss a payment?',
              a: 'Late payments are reported to credit bureaus and will negatively affect your credit score. In a severe, extended default scenario, the lender could repossess the vehicle — similar to how a home can be foreclosed on for a HELOC default. Review Yendo\'s specific default and repossession terms carefully before applying.',
            },
            {
              q: 'Does my credit score matter?',
              a: 'Your credit score is not the primary factor. Vehicle equity is. Yendo uses the value of your car to determine approval and credit limit. Review Yendo\'s current eligibility criteria directly, as underwriting standards can change.',
            },
            {
              q: 'What states is this available in?',
              a: 'Availability varies. Check Yendo\'s current state availability on their website before applying — it may not be offered in all states.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-xl p-5" style={{ background: 'white', border: '1px solid rgba(28,25,23,0.08)' }}>
              <div className="font-bold mb-2 text-sm" style={{ color: '#1c1917' }}>{q}</div>
              <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{a}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-6 text-center mb-12" style={{ background: '#1c1917' }}>
          <h3 className="text-xl font-black text-white mb-2">Ready to Check Your Car?</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Soft inquiry only — no credit score impact. Takes under 5 minutes.
          </p>
          <AffiliateLink href={YENDO_HOW_IT_WORKS_CTA} placement="how-it-works-cta" className="btn-primary inline-block py-3 px-8">
            Check My Car's Eligibility →
          </AffiliateLink>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.28)' }}>Affiliate link · Mintbrooks is not a lender</p>
        </div>

        <div className="text-xs pt-8 leading-relaxed" style={{ color: '#a8a29e', borderTop: '1px solid rgba(28,25,23,0.07)' }}>
          Mintbrooks is an independent educational resource. We are not affiliated with Yendo or any lender. Information is for general education and does not constitute financial or legal advice. Always read the full account agreement before applying. We may earn a commission when you apply through our links.
        </div>
      </article>
    </>
  )
}
