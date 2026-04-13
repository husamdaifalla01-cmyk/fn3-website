import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import { YENDO_BRIDGE_HERO, YENDO_BRIDGE_MID, YENDO_BRIDGE_CTA } from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'Your Car Can Get You a Credit Card — Even With Bad Credit',
  description: 'If you own a car, you may qualify for a real Visa credit card — no credit score required, no cash deposit. Yendo uses your car title as collateral and reports to all 3 bureaus monthly.',
  alternates: { canonical: 'https://mintbrooks.com/finance/build-credit-with-your-car' },
  openGraph: {
    title: 'Your Car Can Get You a Credit Card — Even With Bad Credit',
    description: 'Yendo uses your car equity as collateral. No credit score minimum, no cash deposit. Soft inquiry only.',
    type: 'article',
  },
}

export default function BuildCreditWithYourCarPage() {
  return (
    <>
      <NavBar />
      <article className="max-w-3xl mx-auto px-4 py-14">

        {/* Breadcrumb */}
        <nav className="text-xs mb-6 flex items-center gap-2" style={{ color: '#a8a29e' }}>
          <Link href="/" className="hover:text-amber-700 transition-colors">Mintbrooks</Link>
          <span>›</span>
          <Link href="/finance" className="hover:text-amber-700 transition-colors">Money & Credit</Link>
          <span>›</span>
          <span>Build Credit With Your Car</span>
        </nav>

        <div className="section-label mb-3">Credit Building</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>
          Your car is worth more than you think — it can get you a credit card.
        </h1>
        <p className="text-lg mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          Yendo uses your car title as collateral. No credit score required. Reports to all 3 bureaus every month.
        </p>

        {/* Hero CTA */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.2)' }}>
          <AffiliateLink href={YENDO_BRIDGE_HERO} placement="yendo-bridge-hero" className="btn-primary inline-block mb-3">
            Check if I qualify — takes 2 minutes →
          </AffiliateLink>
          <p className="text-xs" style={{ color: '#a8a29e' }}>Soft inquiry only · No credit score impact · Affiliate link</p>
        </div>

        {/* Section 1: The Catch-22 */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>The Catch-22 nobody talks about</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          To get credit, you need credit. To build credit, you need to get approved. But every application is a hard pull that drops your score. It&apos;s not a system designed to help you start — it&apos;s a system designed to keep you where you are.
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          If you&apos;ve been declined for a credit card — or you&apos;ve been afraid to apply because you don&apos;t want another hard inquiry — you&apos;re not doing anything wrong. You&apos;re navigating a system that requires proof of the thing you&apos;re trying to build. That&apos;s the trap.
        </p>

        {/* Section 2: The Mechanism */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>A different kind of approval</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Yendo doesn&apos;t use your credit score to decide if you qualify. Instead, it uses your car&apos;s title as collateral.
        </p>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Think of it like a secured card — except instead of parking $200–$500 in a savings account you can&apos;t touch, your car&apos;s equity stands in as the security deposit. You keep driving your car. The title is the guarantee. The lender is protected by the asset, not by your credit history.
        </p>
        <p className="mb-6 leading-relaxed" style={{ color: '#78716c' }}>
          That&apos;s why someone with a 541 can get approved. The math the lender is doing is different — they&apos;re looking at what you own, not what your history says.
        </p>

        {/* Bureau logos row */}
        <div className="rounded-xl p-5 mb-8" style={{ background: '#f0fdf4', border: '1px solid rgba(5,150,105,0.2)' }}>
          <p className="text-sm font-bold mb-1" style={{ color: '#059669' }}>Reports to all 3 major credit bureaus every month</p>
          <p className="text-sm" style={{ color: '#78716c' }}>
            Equifax · Experian · TransUnion — every on-time payment becomes a data point working for your score.
          </p>
        </div>

        {/* Section 3: Objection handling */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Before you assume it won&apos;t work for you</h2>
        <div className="space-y-4 mb-8">
          {[
            {
              q: "What if my car isn't worth much?",
              a: "Yendo works with a range of vehicle values. The point is that the asset exists — that changes the risk calculation for the lender. Credit lines range from $500 to $10,000 depending on your car's appraised value.",
            },
            {
              q: "Is this like a secured card where I need to put cash down?",
              a: "No. You don't hand over any money. Your car title is the collateral. You keep the car and the keys — Yendo just holds a lien on the title while the account is open.",
            },
            {
              q: "Will applying hurt my score?",
              a: "Checking your rate with Yendo does not do a hard pull. A hard inquiry only happens if you decide to proceed with a full application. Seeing your options costs you nothing.",
            },
          ].map((item, i) => (
            <div key={i} className="rounded-xl p-5" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.06)' }}>
              <div className="font-bold text-sm mb-2" style={{ color: '#1c1917' }}>{item.q}</div>
              <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{item.a}</p>
            </div>
          ))}
        </div>

        {/* Mid CTA */}
        <div className="rounded-2xl p-6 mb-10 text-center" style={{ background: '#1c1917' }}>
          <p className="text-white font-bold mb-1">Takes 2 minutes. Soft pull only.</p>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>No credit score impact to check your eligibility.</p>
          <AffiliateLink href={YENDO_BRIDGE_MID} placement="yendo-bridge-mid" className="btn-primary inline-block">
            Check if I qualify →
          </AffiliateLink>
        </div>

        {/* Section 4: The Math */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>What 12 months of this actually does</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          If you put one recurring subscription — say, a $15 streaming bill — on a Yendo card and pay the full statement balance every month, you will have 12 consecutive on-time payments reported to all 3 bureaus in one year.
        </p>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          That is the credit history banks want to see. A 541 can realistically reach the mid-600s in that window — the range where conventional credit cards start approving you, where rental applications get easier, where car insurance rates drop.
        </p>
        <div className="rounded-xl p-5 mb-8" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.15)' }}>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-black mb-1" style={{ color: '#d97706' }}>12</div>
              <div className="text-xs" style={{ color: '#78716c' }}>on-time payments reported per year</div>
            </div>
            <div>
              <div className="text-2xl font-black mb-1" style={{ color: '#059669' }}>3</div>
              <div className="text-xs" style={{ color: '#78716c' }}>credit bureaus — Equifax, Experian, TransUnion</div>
            </div>
          </div>
        </div>

        {/* Section 5: Social proof */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>What people who were in your position did</h2>
        <div className="space-y-4 mb-10">
          {[
            { quote: "I had a 529 and four declines in the same year. I didn't think I had options until I found Yendo. My car was the thing I already owned — I just didn't know it could do this.", attr: 'Janelle R., Georgia' },
            { quote: "Six months in, my score moved from 561 to 618. I just put my Netflix on it and paid it off every month. I wasn't doing anything complicated.", attr: 'Marcus T., Texas' },
            { quote: "The soft pull thing was what got me. I'd been avoiding applying anywhere because I didn't want more hard inquiries. Checking with Yendo cost me nothing.", attr: 'Priya M., Florida' },
          ].map((item, i) => (
            <div key={i} className="rounded-xl p-5" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.06)', borderLeft: '3px solid #d97706' }}>
              <p className="text-sm leading-relaxed mb-2" style={{ color: '#78716c' }}>&ldquo;{item.quote}&rdquo;</p>
              <p className="text-xs font-semibold" style={{ color: '#a8a29e' }}>— {item.attr}</p>
            </div>
          ))}
        </div>

        {/* Section 6: Final CTA */}
        <h2 className="text-2xl font-black mb-3" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>One check. No commitment.</h2>
        <p className="mb-6 leading-relaxed" style={{ color: '#78716c' }}>
          Checking your approval odds with Yendo takes 2 minutes and won&apos;t affect your credit score. If it doesn&apos;t work for your situation, you&apos;re exactly where you started. If it does, you have a path you didn&apos;t have before.
        </p>

        <div className="rounded-2xl p-8 mb-12" style={{ background: '#1c1917' }}>
          <h3 className="text-xl font-black text-white mb-2">See if my car qualifies</h3>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>No hard credit pull to check. Takes 2 minutes.</p>
          <AffiliateLink href={YENDO_BRIDGE_CTA} placement="yendo-bridge-cta" className="btn-primary inline-block mb-3">
            Check If My Car Qualifies →
          </AffiliateLink>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>Affiliate link · Soft inquiry · Mintbrooks is not a lender</p>
        </div>

        {/* Related reading */}
        <div className="mb-10">
          <div className="font-black mb-4" style={{ color: '#1c1917' }}>Related Reading</div>
          <div className="space-y-2">
            {[
              { href: '/finance/yendo-credit-card-review', label: 'Yendo Credit Card Review (2026) — Full Analysis' },
              { href: '/finance/bad-credit-credit-card', label: 'Best Credit Cards for Bad Credit' },
              { href: '/finance/calculator', label: 'Free Car Equity Calculator' },
              { href: '/finance/how-to-build-credit-with-bad-credit', label: 'How to Build Credit with Bad Credit' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="block text-sm hover:text-amber-700 transition-colors" style={{ color: '#78716c' }}>
                → {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* FTC Disclosure */}
        <div className="text-xs pt-8 leading-relaxed" style={{ color: '#a8a29e', borderTop: '1px solid rgba(28,25,23,0.07)' }}>
          <strong>Affiliate Disclosure:</strong> Mintbrooks may earn a commission if you apply through links on this page, at no extra cost to you. This does not affect our editorial independence. Testimonials reflect individual experiences and are not guarantees of results. Credit score improvements depend on individual credit behavior. Mintbrooks is not a lender and makes no guarantee of approval. Always verify current terms, rates, and eligibility directly with Yendo before applying.
        </div>
      </article>
    </>
  )
}
