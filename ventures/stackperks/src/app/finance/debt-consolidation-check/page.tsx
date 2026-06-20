import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import AffiliateLink from '@/components/AffiliateLink'
import { SLAM_DUNK_BRIDGE_HERO, SLAM_DUNK_BRIDGE_MID, SLAM_DUNK_BRIDGE_CTA } from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'Paying Minimums on Credit Card Debt? Run the Math First.',
  description: "Most people paying $150/month on a $5,000 balance will be paying for 6 more years — and hand the bank $2,800 in interest. SlamDunk Finance shows you real loan options in minutes. No hard credit pull.",
  alternates: { canonical: 'https://mintbrooks.com/finance/debt-consolidation-check' },
  openGraph: {
    title: 'Paying Minimums on Credit Card Debt? Run the Math First.',
    description: 'See what debt consolidation options you qualify for. Soft pull only — no credit score impact.',
    type: 'article',
  },
}

export default function DebtConsolidationCheckPage() {
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
          <span>Debt Consolidation Check</span>
        </nav>

        <div className="section-label mb-3">Debt Consolidation</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>
          Paying minimums on credit card debt? Here&apos;s what the math actually looks like.
        </h1>
        <p className="text-lg mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          Most people paying $150/month on a $5,000 balance will be paying for 6 more years — and hand the bank $2,800 in interest they didn&apos;t have to pay. SlamDunk Finance shows you real loan options in minutes. No hard credit pull to check.
        </p>

        {/* Hero CTA */}
        <div className="rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.2)' }}>
          <div className="flex-1">
            <AffiliateLink href={SLAM_DUNK_BRIDGE_HERO} placement="slamdunk-bridge-hero" className="btn-primary inline-block">
              See what consolidation options I qualify for →
            </AffiliateLink>
            <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>Soft credit pull only · No credit score impact · Affiliate link</p>
          </div>
        </div>

        {/* Section 1: The Math — lead with numbers, not emotion */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>The minimum payment trap — by the numbers</h2>
        <p className="mb-6 leading-relaxed" style={{ color: '#78716c' }}>
          The math on minimum payments is not intuitive. Here is what actually happens:
        </p>

        {/* Math comparison block */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="rounded-xl p-5" style={{ background: '#fef2f2', border: '1px solid rgba(239,68,68,0.15)' }}>
            <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#dc2626' }}>If you keep paying minimums</div>
            <div className="space-y-2 text-sm" style={{ color: '#1c1917' }}>
              <div className="flex justify-between"><span style={{ color: '#78716c' }}>Balance</span><strong>$5,000</strong></div>
              <div className="flex justify-between"><span style={{ color: '#78716c' }}>Interest rate</span><strong>24% APR</strong></div>
              <div className="flex justify-between"><span style={{ color: '#78716c' }}>Monthly payment</span><strong>$150</strong></div>
              <div className="flex justify-between border-t pt-2" style={{ borderColor: 'rgba(239,68,68,0.15)' }}>
                <span style={{ color: '#78716c' }}>Time to pay off</span><strong style={{ color: '#dc2626' }}>6+ years</strong>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#78716c' }}>Total interest paid</span><strong style={{ color: '#dc2626' }}>$2,800+</strong>
              </div>
            </div>
          </div>
          <div className="rounded-xl p-5" style={{ background: '#f0fdf4', border: '1px solid rgba(5,150,105,0.2)' }}>
            <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#059669' }}>If you consolidate at 14%</div>
            <div className="space-y-2 text-sm" style={{ color: '#1c1917' }}>
              <div className="flex justify-between"><span style={{ color: '#78716c' }}>Balance</span><strong>$5,000</strong></div>
              <div className="flex justify-between"><span style={{ color: '#78716c' }}>Interest rate</span><strong>14% APR</strong></div>
              <div className="flex justify-between"><span style={{ color: '#78716c' }}>Monthly payment</span><strong>$150</strong></div>
              <div className="flex justify-between border-t pt-2" style={{ borderColor: 'rgba(5,150,105,0.2)' }}>
                <span style={{ color: '#78716c' }}>Time to pay off</span><strong style={{ color: '#059669' }}>3.2 years</strong>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#78716c' }}>Total interest paid</span><strong style={{ color: '#059669' }}>~$950</strong>
              </div>
            </div>
          </div>
        </div>

        <p className="mb-10 text-sm font-semibold text-center" style={{ color: '#78716c' }}>
          The difference isn&apos;t luck. It&apos;s a single rate change.
        </p>

        {/* Section 2: Who this is for */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>This is worth checking if:</h2>
        <div className="rounded-xl p-6 mb-8" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.06)' }}>
          <ul className="space-y-3">
            {[
              "You have credit card balances you've been paying minimums on for more than 6 months",
              "You're juggling 2 or more monthly debt payments",
              "Your interest rate on at least one card is above 18%",
              "You want to know your options without a hard credit pull affecting your score",
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: '#1c1917' }}>
                <span className="text-emerald-500 flex-shrink-0 font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: How SlamDunk works */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>How SlamDunk Finance works differently</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          SlamDunk doesn&apos;t use just your credit score to match you with loan options. They look at your income, your debt load, and your full financial picture. That&apos;s why people who&apos;ve been rejected by banks often find options they didn&apos;t expect here.
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          Checking takes a few minutes and won&apos;t affect your credit score. You&apos;re matched with real lenders — not generic estimates.
        </p>

        {/* Soft pull badge */}
        <div className="rounded-xl p-4 mb-10 flex items-center gap-3" style={{ background: '#f0fdf4', border: '1px solid rgba(5,150,105,0.2)' }}>
          <span className="text-2xl">🔒</span>
          <div>
            <div className="font-bold text-sm" style={{ color: '#059669' }}>Soft credit pull only</div>
            <div className="text-xs" style={{ color: '#78716c' }}>Checking your options does not affect your credit score. A hard inquiry only happens if you accept an offer and proceed with a lender.</div>
          </div>
        </div>

        {/* Mid CTA */}
        <div className="rounded-2xl p-6 mb-10 text-center" style={{ background: '#1c1917' }}>
          <p className="text-white font-bold mb-1">2 minutes to know your options</p>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>Soft pull only. Seeing options doesn&apos;t obligate you to anything.</p>
          <AffiliateLink href={SLAM_DUNK_BRIDGE_MID} placement="slamdunk-bridge-mid" className="btn-primary inline-block">
            Check my consolidation options →
          </AffiliateLink>
        </div>

        {/* Section 4: Objection handling */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>What most people ask before they check</h2>
        <div className="space-y-4 mb-8">
          {[
            {
              q: "Won't this hurt my credit score?",
              a: "Checking your options with SlamDunk is a soft pull only. Your score is not affected unless you accept an offer and proceed with a lender.",
            },
            {
              q: "I don't want more debt — I'm trying to get out of it.",
              a: "Consolidation is not more debt. It's restructuring existing debt at a lower rate. If the new rate is lower than your current average, you pay less total and get out faster. If the math doesn't work for your situation, you don't take the offer.",
            },
            {
              q: "My credit isn't great — I won't get a good rate.",
              a: "SlamDunk works with a network of lenders, including those who specialize in non-prime borrowers. The rate you see is based on your real situation. You might be surprised — but you won't know until you check.",
            },
          ].map((item, i) => (
            <div key={i} className="rounded-xl p-5" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.06)' }}>
              <div className="font-bold text-sm mb-2" style={{ color: '#1c1917' }}>{item.q}</div>
              <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{item.a}</p>
            </div>
          ))}
        </div>

        {/* Section 5: Social proof */}
        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>What people who were juggling multiple payments found</h2>
        <div className="space-y-4 mb-10">
          {[
            { quote: "I had three cards with rates between 22% and 28%. I figured I wouldn't qualify for anything better. SlamDunk matched me with a 15.9% loan. My monthly payment actually went down.", attr: 'Denise K., Ohio' },
            { quote: "I kept putting it off because I thought checking would hurt my score. Soft pull only — I didn't know that was even a thing. Two minutes and I had actual numbers in front of me.", attr: 'Carlos M., Arizona' },
            { quote: "I was $11,000 in across four cards. I thought consolidation was only for people in serious financial trouble. Turns out it's just math.", attr: 'Rachel T., Illinois' },
          ].map((item, i) => (
            <div key={i} className="rounded-xl p-5" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.06)', borderLeft: '3px solid #059669' }}>
              <p className="text-sm leading-relaxed mb-2" style={{ color: '#78716c' }}>&ldquo;{item.quote}&rdquo;</p>
              <p className="text-xs font-semibold" style={{ color: '#a8a29e' }}>— {item.attr}</p>
            </div>
          ))}
        </div>

        {/* Section 6: Final CTA */}
        <h2 className="text-2xl font-black mb-3" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>2 minutes to know your options</h2>
        <p className="mb-6 leading-relaxed" style={{ color: '#78716c' }}>
          You&apos;re already paying hundreds of dollars a month. A 2-minute check costs you nothing and tells you exactly what options are available for your situation. If the math works, great. If not, you&apos;re no worse off than before.
        </p>

        <div className="rounded-2xl p-8 mb-12" style={{ background: '#1c1917' }}>
          <h3 className="text-xl font-black text-white mb-2">Check my consolidation options</h3>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>No hard pull · Takes 2 minutes · Seeing your options doesn&apos;t obligate you to anything</p>
          <AffiliateLink href={SLAM_DUNK_BRIDGE_CTA} placement="slamdunk-bridge-cta" className="btn-primary inline-block">
            Check my consolidation options — no hard pull →
          </AffiliateLink>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.28)' }}>Affiliate link · Mintbrooks is not a lender · Results vary</p>
        </div>

        {/* Related reading */}
        <div className="mb-10">
          <div className="font-black mb-4" style={{ color: '#1c1917' }}>Related Reading</div>
          <div className="space-y-2">
            {[
              { href: '/finance/emergency-cash-between-paychecks', label: 'Emergency Cash Between Paychecks — Your Options' },
              { href: '/finance/bad-credit-credit-card', label: 'Best Credit Cards for Bad Credit' },
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
          <strong>Affiliate Disclosure:</strong> Mintbrooks may earn a commission if you apply through links on this page, at no extra cost to you. This does not affect our editorial independence. The debt scenarios above are illustrative examples based on standard loan mathematics — your actual situation will vary. Loan rates and terms are determined by the lender, not Mintbrooks. Mintbrooks is not a lender and makes no guarantee of approval or specific rates. Results vary. Not everyone will qualify.
        </div>
      </article>
    </>
  )
}
