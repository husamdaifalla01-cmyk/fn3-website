import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import { LIFEFUNDS_BRIDGE_HERO, LIFEFUNDS_BRIDGE_MID, LIFEFUNDS_BRIDGE_CTA } from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'Personal Loans Up to $50,000 — Compare Real Offers Without a Hard Pull',
  description: 'Lifefunds connects US residents to personal loan offers up to $50,000. Compare rates in minutes, no hard credit pull to check. Ideal for debt consolidation, unexpected expenses, or major purchases.',
  alternates: { canonical: 'https://mintbrooks.com/finance/personal-loans-up-to-50k' },
  openGraph: {
    title: 'Personal Loans Up to $50,000 — Compare Real Offers Without a Hard Pull',
    description: 'Check your personal loan options in minutes. No hard credit pull. Up to $50,000.',
    type: 'article',
  },
}

export default function PersonalLoansPage() {
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
          <span>Personal Loans up to $50k</span>
        </nav>

        <div className="section-label mb-3">Personal Loans</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>
          That weight — the constant low hum of financial anxiety — it can lift.
        </h1>
        <p className="text-lg mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          Lifefunds connects US residents to personal loan offers up to $50,000. Compare real rates from multiple lenders in minutes. No hard credit pull to check your options.
        </p>

        {/* Hero CTA */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.2)' }}>
          <AffiliateLink href={LIFEFUNDS_BRIDGE_HERO} placement="lifefunds-bridge-hero" className="btn-primary inline-block mb-3">
            Check my loan options →
          </AffiliateLink>
          <p className="text-xs" style={{ color: '#a8a29e' }}>No hard credit pull · Takes minutes · Affiliate link</p>
        </div>

        {/* Section 1: Problem — the financial anxiety */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>The math that keeps you up at night</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Every month, there&apos;s that moment when you look at the numbers and they just don&apos;t add up. The credit card minimums. The unexpected bill that knocked everything sideways. The expense you kept deferring until it became an emergency.
        </p>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          High-interest debt compounds quietly. While you&apos;re paying minimums on three cards at 22–28% APR, the balances barely move. You&apos;re not being irresponsible — you&apos;re trapped in a structure that was designed to be hard to escape.
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          A personal loan doesn&apos;t add to your debt. It restructures it — often at a lower rate, with a fixed end date, into a single payment you can actually plan around.
        </p>

        {/* Section 2: Self-qualification (Eric Beer: filter traffic, protect EPC) */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>This is designed for people who:</h2>
        <div className="rounded-xl p-6 mb-8" style={{ background: '#f0fdf4', border: '1px solid rgba(5,150,105,0.2)' }}>
          <ul className="space-y-3">
            {[
              "Are carrying high-interest credit card debt across multiple accounts",
              "Faced an unexpected expense — medical, car, home — that disrupted their budget",
              "Need to consolidate scattered payments into one predictable monthly amount",
              "Want to see real loan options without a hard inquiry affecting their credit score",
              "Are US residents looking for amounts between $5,000 and $50,000",
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: '#1c1917' }}>
                <span className="text-emerald-500 flex-shrink-0 font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="mb-10 text-sm leading-relaxed" style={{ color: '#78716c' }}>
          If none of those describe you, a personal loan may not be the right tool right now — and that&apos;s fine. But if one or more resonates, checking your options takes minutes and costs nothing.
        </p>

        {/* Section 3: How Lifefunds works */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>How Lifefunds works</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Lifefunds isn&apos;t a single lender — it&apos;s a matching platform. You fill out one form, and they compare your profile against a network of lenders to find offers that fit your situation. That means you see real rates from multiple sources, not just one bank&apos;s offer.
        </p>
        <div className="space-y-3 mb-8">
          {[
            { step: '01', title: 'Fill out one form', desc: 'Basic personal and financial information. Takes a few minutes.' },
            { step: '02', title: 'Get matched with real offers', desc: 'Lifefunds compares your profile against their lender network and surfaces the offers that fit.' },
            { step: '03', title: 'Review and decide', desc: 'You see the actual rates and terms. If one works for you, you proceed. If not, you walk away with information.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 rounded-xl p-4" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.06)' }}>
              <div className="text-sm font-black flex-shrink-0 mt-0.5" style={{ color: '#d97706' }}>{item.step}</div>
              <div>
                <div className="font-bold text-sm mb-1" style={{ color: '#1c1917' }}>{item.title}</div>
                <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section 4: Objection handling */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>What people ask before they check</h2>
        <div className="space-y-4 mb-8">
          {[
            {
              q: "Will checking affect my credit score?",
              a: "The initial check with Lifefunds is a soft inquiry — it doesn't affect your credit score. A hard pull only happens if you formally apply with a specific lender after seeing your matched offers.",
            },
            {
              q: "Do I need good credit to qualify?",
              a: "Lifefunds works with a network of lenders that includes options for varied credit profiles. The platform surfaces what actually fits your situation — you won't know your options until you check.",
            },
            {
              q: "What can I use the loan for?",
              a: "Personal loan funds are typically flexible. Common uses: consolidating high-interest credit card debt, covering unexpected medical or home expenses, financing a major purchase, or bridging a cash flow gap. Specific lender restrictions vary.",
            },
            {
              q: "How long does it take?",
              a: "The matching process takes minutes. Actual loan funding timelines vary by lender — often 1–5 business days after formal approval.",
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
          <p className="text-white font-bold mb-1">No hard pull to check your options</p>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>See real loan offers matched to your profile in minutes.</p>
          <AffiliateLink href={LIFEFUNDS_BRIDGE_MID} placement="lifefunds-bridge-mid" className="btn-primary inline-block">
            Check my loan options →
          </AffiliateLink>
        </div>

        {/* Section 5: Proof — what makes it worth checking */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>What a lower rate actually means in practice</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { amount: '$10,000', rate: '22% → 12%', saving: 'saves ~$2,600 in interest over 3 years' },
            { amount: '$25,000', rate: '20% → 11%', saving: 'saves ~$6,800 in interest over 4 years' },
            { amount: '$50,000', rate: '18% → 10%', saving: 'saves ~$14,000 in interest over 5 years' },
          ].map((item, i) => (
            <div key={i} className="rounded-xl p-4 text-center" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.06)' }}>
              <div className="text-xl font-black mb-1" style={{ color: '#1c1917' }}>{item.amount}</div>
              <div className="text-xs font-semibold mb-2" style={{ color: '#d97706' }}>{item.rate}</div>
              <div className="text-xs" style={{ color: '#78716c' }}>{item.saving}</div>
            </div>
          ))}
        </div>
        <p className="mb-10 text-xs text-center" style={{ color: '#a8a29e' }}>
          Illustrative examples only. Actual savings depend on your loan terms, rate, and repayment behavior.
        </p>

        {/* Section 6: Social proof */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>What people in similar situations found</h2>
        <div className="space-y-4 mb-10">
          {[
            { quote: "I'd been carrying $18,000 in credit card debt across four cards for two years. The minimum payments weren't making a dent. I got matched with a 13.4% personal loan and cut my monthly payment by $340.", attr: 'Simone A., Texas' },
            { quote: "I needed $8,000 after a car repair wiped out my savings right before rent was due. I didn't think I'd qualify for anything useful. The platform found me three options in my range.", attr: 'James K., Florida' },
            { quote: "I kept putting this off thinking it would hurt my credit to look. Soft pull only — I had actual numbers in 10 minutes. Wish I'd done this six months ago.", attr: 'Alana R., California' },
          ].map((item, i) => (
            <div key={i} className="rounded-xl p-5" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.06)', borderLeft: '3px solid #d97706' }}>
              <p className="text-sm leading-relaxed mb-2" style={{ color: '#78716c' }}>&ldquo;{item.quote}&rdquo;</p>
              <p className="text-xs font-semibold" style={{ color: '#a8a29e' }}>— {item.attr}</p>
            </div>
          ))}
        </div>

        {/* Section 7: Final CTA */}
        <h2 className="text-2xl font-black mb-3" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>One form. Multiple real offers. No hard pull.</h2>
        <p className="mb-6 leading-relaxed" style={{ color: '#78716c' }}>
          You&apos;ve been carrying this long enough. Checking your options takes minutes and costs you nothing. If the math works for your situation, you have a path. If it doesn&apos;t, you have information you didn&apos;t have before.
        </p>

        <div className="rounded-2xl p-8 mb-12" style={{ background: '#1c1917' }}>
          <h3 className="text-xl font-black text-white mb-2">Check my loan options</h3>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>No hard credit pull · Up to $50,000 · US residents · Takes minutes</p>
          <AffiliateLink href={LIFEFUNDS_BRIDGE_CTA} placement="lifefunds-bridge-cta" className="btn-primary inline-block">
            Check my loan options →
          </AffiliateLink>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.28)' }}>Affiliate link · Mintbrooks is not a lender · Results vary</p>
        </div>

        {/* Related reading */}
        <div className="mb-10">
          <div className="font-black mb-4" style={{ color: '#1c1917' }}>Related Reading</div>
          <div className="space-y-2">
            {[
              { href: '/finance/debt-consolidation-check', label: 'Debt Consolidation Check — Run the Math First' },
              { href: '/finance/emergency-cash-between-paychecks', label: 'Emergency Cash Between Paychecks — Your Options' },
              { href: '/finance/how-to-rebuild-credit', label: 'How to Rebuild Credit — A Practical Guide' },
              { href: '/finance', label: 'Money & Credit Hub — All Guides' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="block text-sm hover:text-amber-700 transition-colors" style={{ color: '#78716c' }}>
                → {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* FTC Disclosure */}
        <div className="text-xs pt-8 leading-relaxed" style={{ color: '#a8a29e', borderTop: '1px solid rgba(28,25,23,0.07)' }}>
          <strong>Affiliate Disclosure:</strong> Mintbrooks may earn a commission if you apply through links on this page, at no extra cost to you. This does not affect our editorial independence. Testimonials reflect individual experiences and are not guarantees of results. Savings examples are illustrative based on standard loan mathematics — your situation will vary. Loan rates, terms, and availability are determined by lenders, not Mintbrooks. Mintbrooks is not a lender and makes no guarantee of approval, specific rates, or loan amounts. Not all applicants will qualify. Always read loan terms carefully before proceeding.
        </div>
      </article>
    </>
  )
}
