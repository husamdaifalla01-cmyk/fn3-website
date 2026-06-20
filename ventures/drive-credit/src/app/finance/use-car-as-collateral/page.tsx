import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import { YENDO_COLLATERAL_CTA } from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'Using Your Car as Collateral for Credit: How It Works — Mintbrooks',
  description: 'Learn how car-secured credit works, what it means to use your vehicle as collateral, and how it differs from a title loan.',
  alternates: { canonical: 'https://mintbrooks.com/finance/use-car-as-collateral' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Using Your Car as Collateral for Credit: How It Works',
  description: 'Educational guide on using vehicle equity as collateral for a revolving credit line.',
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
          <span>Using Car as Collateral</span>
        </nav>

        <div className="section-label mb-3">How It Works</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>
          Using Your Car as Collateral:<br />What This Actually Means
        </h1>
        <p className="text-lg mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          Using your vehicle as collateral doesn't mean handing over your keys. Here's how it actually works — and what questions to ask before you apply.
        </p>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>The Core Concept: Equity as a Credit Lever</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          When you own a car — or even if you're still paying it off — your vehicle has market value. The difference between what it's worth and what you owe on it (if anything) is called your <strong style={{ color: '#1c1917' }}>equity</strong>.
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          Traditional lenders use your credit score to judge risk. Car-secured lenders use your vehicle equity instead. If your car has value, that value acts as security for the lender — which is why your credit score becomes less relevant.
        </p>

        <div className="rounded-2xl p-6 mb-8" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.15)' }}>
          <div className="font-bold text-sm mb-3" style={{ color: '#d97706' }}>Simple example</div>
          <div className="space-y-2 text-sm" style={{ color: '#78716c' }}>
            <div className="flex justify-between"><span>Your car's current market value:</span> <strong style={{ color: '#1c1917' }}>$18,000</strong></div>
            <div className="flex justify-between"><span>Remaining loan balance:</span> <strong style={{ color: '#1c1917' }}>$6,000</strong></div>
            <div className="flex justify-between"><span>Your equity:</span> <strong style={{ color: '#1c1917' }}>$12,000</strong></div>
            <div className="flex justify-between pt-2" style={{ borderTop: '1px solid rgba(217,119,6,0.15)' }}>
              <span>Estimated credit line (50–70% of equity):</span> <strong style={{ color: '#d97706' }}>$6,000–$8,400</strong>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>How This Differs from a Title Loan</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          This is probably the most important distinction. A <strong style={{ color: '#1c1917' }}>title loan</strong> is a short-term loan where you hand over your car's title, often at extremely high interest rates, with your car at risk if you miss even one payment. They're generally considered predatory and should be avoided.
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          A <strong style={{ color: '#1c1917' }}>car-secured revolving credit card</strong> is a completely different product. You keep your title. You keep driving your car. The vehicle is collateral, but it functions like a regular credit card — you can use it anywhere Visa is accepted, pay it down, and use it again.
        </p>

        <div className="overflow-x-auto rounded-2xl mb-10" style={{ border: '1px solid rgba(217,119,6,0.12)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#fef9ee', borderBottom: '1px solid rgba(217,119,6,0.1)' }}>
                <th className="text-left px-5 py-3.5 font-semibold" style={{ color: '#78716c' }}>Feature</th>
                <th className="px-5 py-3.5 font-black text-center" style={{ color: '#d97706' }}>Car-Secured Card (Yendo)</th>
                <th className="px-5 py-3.5 font-medium text-center" style={{ color: '#a8a29e' }}>Title Loan</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Revolving credit', '✓ Yes — use, pay, reuse', '✗ One-time lump sum'],
                ['You keep the title', '✓ Yes', '✗ Lender holds title'],
                ['You keep driving', '✓ Yes', '✓ Usually yes'],
                ['APR range', 'Varies — check with Yendo', 'Often 100–300%+'],
                ['Reports to credit bureaus', '✓ All three', '✗ Rarely'],
                ['Risk of losing car', 'If account severely in default', 'Very high, quick repossession'],
              ].map(([feat, yes, no], i) => (
                <tr key={feat as string} style={{ borderBottom: i < 5 ? '1px solid #fef9ee' : 'none', background: i % 2 === 0 ? 'white' : '#fffdf7' }}>
                  <td className="px-5 py-3" style={{ color: '#374151' }}>{feat}</td>
                  <td className="px-5 py-3 text-center font-semibold" style={{ color: '#1c1917' }}>{yes}</td>
                  <td className="px-5 py-3 text-center" style={{ color: '#a8a29e' }}>{no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>What Happens to Your Car if You Miss Payments?</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          This is a legitimate question. Your car is collateral — that means in an extreme default scenario, the lender could theoretically repossess it. However, this is different from a title loan, which can move very quickly.
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          For revolving credit cards secured by your vehicle, the lender's goal is to collect payment — not to repossess cars. Review Yendo's specific terms around default and repossession before applying. Understand what the process looks like before you commit. The car is at risk in extreme non-payment situations, just as a home is collateral for a HELOC.
        </p>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Questions to Ask Before You Apply</h2>
        <div className="space-y-3 mb-10">
          {[
            'What is the APR? How does it compare to a secured card?',
            'Is there an annual fee?',
            'What happens to my credit score when I apply? (Soft or hard inquiry?)',
            'What states is this available in?',
            'What is the default process? What triggers repossession?',
            'How does the lien on my title work?',
            'Can I pay early or pay more than the minimum without penalty?',
          ].map(q => (
            <div key={q} className="flex gap-3 items-start">
              <span className="text-sm flex-shrink-0 mt-0.5" style={{ color: '#d97706' }}>→</span>
              <span className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{q}</span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-6 text-center mb-12" style={{ background: '#1c1917' }}>
          <h3 className="text-xl font-black text-white mb-2">See If Your Car Qualifies</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Check eligibility in under 5 minutes. Initial check uses a soft inquiry — no score impact.
          </p>
          <AffiliateLink href={YENDO_COLLATERAL_CTA} placement="collateral-guide-cta" className="btn-primary inline-block py-3 px-8">
            Check My Car's Eligibility →
          </AffiliateLink>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.28)' }}>Affiliate link · Soft inquiry · Mintbrooks is not a lender</p>
        </div>

        <div className="text-xs pt-8 leading-relaxed" style={{ color: '#a8a29e', borderTop: '1px solid rgba(28,25,23,0.07)' }}>
          Mintbrooks is an independent educational resource. We are not affiliated with Yendo. Information is for general education and does not constitute financial advice. We may earn a commission when you apply through our links.
        </div>
      </article>
    </>
  )
}
