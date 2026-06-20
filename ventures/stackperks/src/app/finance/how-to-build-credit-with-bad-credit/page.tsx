import type { Metadata } from 'next'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import FinanceEmailCapture from '@/components/FinanceEmailCapture'
import AffiliateLink from '@/components/AffiliateLink'
import MoneyResetCTA from '@/components/MoneyResetCTA'
import { YENDO_BUILD_CREDIT_HERO, YENDO_BUILD_CREDIT_CTA } from '@/lib/affiliateUrls'

export const metadata: Metadata = {
  title: 'How to Build Credit with Bad Credit (2026) — 7 Realistic Steps',
  description: 'Step-by-step guide to building credit when you have bad credit or no credit history. Real strategies that work, ranked by effectiveness and accessibility.',
  alternates: { canonical: 'https://mintbrooks.com/finance/how-to-build-credit-with-bad-credit' },
  openGraph: {
    title: 'How to Build Credit with Bad Credit — 7 Realistic Steps',
    description: 'Practical credit-building strategies for people with damaged or thin credit files.',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Build Credit with Bad Credit (2026) — 7 Realistic Steps',
  description: 'Step-by-step guide to building credit when you have bad credit.',
  datePublished: '2026-04-03',
  dateModified: '2026-04-03',
  author: { '@type': 'Organization', name: 'Mintbrooks' },
}

export default function HowToBuildCreditBadCreditPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavBar />
      <article className="max-w-3xl mx-auto px-4 py-14">

        <nav className="text-xs mb-6 flex items-center gap-2" style={{ color: '#a8a29e' }}>
          <Link href="/" className="hover:text-amber-700 transition-colors">Mintbrooks</Link>
          <span>›</span>
          <span>How to Build Credit with Bad Credit</span>
        </nav>

        <div className="section-label mb-3">Guide</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight" style={{ color: '#1c1917', letterSpacing: '-0.02em' }}>
          How to Build Credit with Bad Credit: 7 Realistic Steps That Actually Work (2026)
        </h1>
        <p className="text-lg mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          If your credit score is below 580 — or you have no credit history at all — rebuilding feels impossible. Most advice assumes you can easily get approved for credit products. This guide is different. Every strategy here is ranked by how accessible it is to people who have already been declined elsewhere.
        </p>

        {/* Hero CTA */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.2)' }}>
          <div className="font-bold mb-2" style={{ color: '#d97706' }}>The Fastest Path If You Own a Car</div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#78716c' }}>
            A car-secured credit card lets you skip the deposit requirement and potentially get a credit line up to $10,000 — using your vehicle&apos;s equity instead of your credit score. It reports to all three bureaus.
          </p>
          <AffiliateLink href={YENDO_BUILD_CREDIT_HERO} placement="build-credit-guide-hero" className="btn-primary text-sm py-2 px-5 inline-block">Check If My Car Qualifies →</AffiliateLink>
          <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>Soft inquiry only · Affiliate link</p>
        </div>

        {/* Table of contents */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.06)' }}>
          <div className="font-bold mb-3" style={{ color: '#1c1917' }}>In This Guide</div>
          <ol className="space-y-1">
            {[
              'Understanding what actually affects your credit score',
              'Step 1: Get a credit card designed for bad credit',
              'Step 2: Become an authorized user',
              'Step 3: Use credit builder loans',
              'Step 4: Report rent and utility payments',
              'Step 5: Manage credit utilization strategically',
              'Step 6: Dispute errors on your credit report',
              'Step 7: Be patient and consistent (the timeline)',
              'Common mistakes that slow credit building',
              'Tools and resources',
            ].map((item, i) => (
              <li key={i} className="text-sm" style={{ color: '#78716c' }}>
                <span style={{ color: '#d97706' }}>{i + 1}.</span> {item}
              </li>
            ))}
          </ol>
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>What Actually Affects Your Credit Score</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Before diving into strategies, it helps to understand what FICO scores actually measure. Your score is a weighted average of five factors:
        </p>
        <div className="space-y-3 mb-8">
          {[
            { factor: 'Payment History', weight: '35%', desc: 'Whether you pay on time. A single 30-day late payment can drop your score 50–100 points. This is the most important factor.' },
            { factor: 'Credit Utilization', weight: '30%', desc: 'How much of your available credit you\'re using. Under 30% is good. Under 10% is better. This is the fastest factor to improve.' },
            { factor: 'Length of Credit History', weight: '15%', desc: 'How long your accounts have been open. Longer is better. This takes time and cannot be rushed.' },
            { factor: 'Credit Mix', weight: '10%', desc: 'Having different types of credit (credit cards, installment loans, etc.). Not worth forcing — it helps marginally.' },
            { factor: 'New Inquiries', weight: '10%', desc: 'How many times you\'ve applied for credit recently. Too many hard inquiries signal desperation to lenders.' },
          ].map((item, i) => (
            <div key={i} className="rounded-xl p-4 flex gap-4" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.06)' }}>
              <div className="text-right flex-shrink-0" style={{ minWidth: 50 }}>
                <div className="text-xl font-black" style={{ color: '#d97706' }}>{item.weight}</div>
              </div>
              <div>
                <div className="font-bold text-sm mb-1" style={{ color: '#1c1917' }}>{item.factor}</div>
                <p className="text-xs leading-relaxed" style={{ color: '#78716c' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          The takeaway: <strong style={{ color: '#1c1917' }}>payment history and utilization together make up 65% of your score.</strong> Almost everything in this guide targets those two factors because they are both the most impactful and the most controllable.
        </p>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Step 1: Get a Credit Card Designed for Bad Credit</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          The single most effective way to build credit is to have an open credit card account with on-time payments reported every month. The challenge is getting approved for one. Here are your realistic options, ranked by accessibility:
        </p>

        <h3 className="text-xl font-black mb-3" style={{ color: '#1c1917' }}>Option A: Car-Secured Credit Card (if you own a car)</h3>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          If you own a car with equity, a car-secured credit card is worth considering as your first step. Instead of requiring a cash deposit (which you may not have), these cards use your vehicle&apos;s value as collateral. This often results in a higher credit limit than traditional secured cards.
        </p>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          <strong style={{ color: '#1c1917' }}>Why it matters for credit building:</strong> A higher credit limit means lower utilization at the same spending level. If your secured card has a $200 limit and you spend $100, that is 50% utilization (bad). If your car-secured card has a $5,000 limit and you spend $100, that is 2% utilization (excellent). Utilization is 30% of your credit score.
        </p>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          The trade-off: your car has a lien placed on it, and you could lose the vehicle if you default on payments. Only pursue this option if you are confident you can make at least minimum monthly payments.
        </p>

        <h3 className="text-xl font-black mb-3" style={{ color: '#1c1917' }}>Option B: Traditional Secured Credit Card</h3>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Secured cards require a cash deposit (typically $200–$500) that becomes your credit limit. The deposit protects the issuer, so approval is more accessible than unsecured cards. Good options include:
        </p>
        <ul className="space-y-2 mb-4">
          {[
            'OpenSky Secured Visa — No credit check at all. $35 annual fee. $200 minimum deposit.',
            'Chime Credit Builder — No credit check, no annual fee. Requires Chime spending account with direct deposit.',
            'Capital One Secured Mastercard — May accept lower scores, but approval is not guaranteed below 580.',
          ].map((item, i) => (
            <li key={i} className="text-sm leading-relaxed flex gap-2" style={{ color: '#78716c' }}>
              <span style={{ color: '#d97706' }}>•</span>
              {item}
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-black mb-3" style={{ color: '#1c1917' }}>Option C: Store Cards (last resort)</h3>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          Some retail store cards have lower approval thresholds. However, they typically carry very high APRs (25%+) and can only be used at that store. They report to credit bureaus, so they do help build credit, but they are a less efficient tool than a general-purpose card. Consider these only if you cannot get approved for Options A or B.
        </p>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Step 2: Become an Authorized User</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          If someone you trust (a parent, spouse, or close family member) has a credit card with good standing, they can add you as an authorized user. The card&apos;s payment history then appears on your credit report — even if you never use the card.
        </p>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          <strong style={{ color: '#1c1917' }}>Why this works:</strong> You inherit the account&apos;s age and payment history. If the primary cardholder has a card that has been open for 10 years with perfect payments, that history now boosts your credit profile.
        </p>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          <strong style={{ color: '#1c1917' }}>Important considerations:</strong>
        </p>
        <ul className="space-y-2 mb-8">
          {[
            'The primary cardholder\'s payment behavior directly affects your credit. If they miss payments, your score gets hurt.',
            'Not all credit card issuers report authorized user accounts to credit bureaus. Confirm with the issuer before proceeding.',
            'You don\'t need to use the card or even have physical access to it for the credit benefit.',
            'This is not a long-term strategy — it is a boost to get you started while you build your own credit history.',
          ].map((item, i) => (
            <li key={i} className="text-sm leading-relaxed flex gap-2" style={{ color: '#78716c' }}>
              <span style={{ color: '#d97706' }}>•</span>
              {item}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Step 3: Use Credit Builder Loans</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Credit builder loans are designed specifically to help you build credit. Here is how they work: you make monthly payments into a savings account, and the lender reports those payments to credit bureaus. When the loan term ends, you receive the money you paid in (minus fees/interest).
        </p>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          It is essentially forced savings with credit reporting attached. You are not borrowing money — you are paying into an account to prove payment reliability.
        </p>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          <strong style={{ color: '#1c1917' }}>Where to find them:</strong> Self (formerly Self Lender), local credit unions, and some online banks offer credit builder loans. Monthly payments are typically $25–$75.
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          <strong style={{ color: '#1c1917' }}>Why combine with a credit card:</strong> Having both a revolving account (credit card) and an installment account (credit builder loan) improves your credit mix (10% of your score) and doubles the number of positive payment reports each month.
        </p>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Step 4: Report Rent and Utility Payments</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          You are likely already making monthly payments that could be building your credit but are not. Rent, utility bills, and even streaming subscriptions can be reported to credit bureaus through third-party services.
        </p>
        <ul className="space-y-2 mb-8">
          {[
            'Experian Boost — Free service that adds utility, phone, and streaming payments to your Experian report. Can increase your score immediately.',
            'Rent reporting services (Rental Kharma, RentTrack, Boom) — Report your rent payments to one or more credit bureaus. Some charge monthly fees ($2–$10/month).',
            'UltraFICO — Factors in your bank account behavior (savings, no overdrafts) into your FICO score calculation.',
          ].map((item, i) => (
            <li key={i} className="text-sm leading-relaxed flex gap-2" style={{ color: '#78716c' }}>
              <span style={{ color: '#d97706' }}>•</span>
              {item}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Step 5: Manage Credit Utilization Strategically</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Credit utilization (the percentage of your available credit that you are using) is 30% of your score and updates every billing cycle. This means it is the fastest lever you can pull.
        </p>
        <div className="space-y-3 mb-8">
          {[
            { rule: 'Keep utilization below 30% of your total credit limit', example: '$5,000 limit → keep balance under $1,500' },
            { rule: 'Below 10% is even better for score optimization', example: '$5,000 limit → keep balance under $500' },
            { rule: 'Pay before your statement closing date, not just the due date', example: 'Your balance on statement date is what gets reported to bureaus' },
            { rule: 'Multiple small payments per month can help', example: 'If you spend $200/week, pay it off weekly to keep reported balance low' },
            { rule: 'A higher credit limit with the same spending = lower utilization', example: 'This is why car-secured cards (up to $10k) can accelerate credit building' },
          ].map((item, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.06)' }}>
              <div className="font-bold text-sm mb-1" style={{ color: '#1c1917' }}>{item.rule}</div>
              <p className="text-xs leading-relaxed" style={{ color: '#a8a29e' }}>{item.example}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Step 6: Dispute Errors on Your Credit Report</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          According to a Federal Trade Commission study, roughly 1 in 4 consumers found errors on their credit reports that could affect their scores. Checking your report and disputing inaccuracies is free and can yield immediate score improvements.
        </p>
        <div className="space-y-3 mb-8">
          {[
            { action: 'Pull your free credit reports', how: 'Visit AnnualCreditReport.com — you are entitled to free weekly reports from all three bureaus.' },
            { action: 'Look for common errors', how: 'Accounts that aren\'t yours, incorrect balances, payments marked late that were on time, closed accounts showing open, duplicate entries.' },
            { action: 'File disputes online', how: 'Each bureau has an online dispute process. Equifax, Experian, and TransUnion each handle disputes separately. Provide documentation.' },
            { action: 'Follow up within 30 days', how: 'Bureaus must investigate within 30 days. If they can\'t verify the information, they must remove it.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="text-xl font-black flex-shrink-0 w-8" style={{ color: '#d97706' }}>{i + 1}</div>
              <div>
                <div className="font-bold text-sm mb-1" style={{ color: '#1c1917' }}>{item.action}</div>
                <p className="text-xs leading-relaxed" style={{ color: '#78716c' }}>{item.how}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Step 7: Be Patient and Consistent — The Realistic Timeline</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Credit building is not instant. Here is a realistic timeline based on consistent effort:
        </p>
        <div className="space-y-3 mb-8">
          {[
            { time: 'Month 1–2', milestone: 'Get approved for a credit card or credit builder loan. Utilization improvements from Experian Boost or authorized user status may show quickly.', scoreChange: '+10–30 points possible' },
            { time: 'Month 3–6', milestone: 'First 3–6 on-time payments establish a pattern. Utilization management consistently under 30%. Disputes resolved.', scoreChange: '+30–60 points possible' },
            { time: 'Month 6–12', milestone: 'Credit history length begins to matter. Consistent pattern of responsibility established. Score approaching fair territory (580–669).', scoreChange: '+60–100 points total possible' },
            { time: 'Year 1–2', milestone: 'With sustained effort: potential to move from poor (below 580) to good (670+). May qualify for unsecured credit cards.', scoreChange: 'Path to 670+ with discipline' },
          ].map((item, i) => (
            <div key={i} className="rounded-xl p-4 flex gap-4" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.06)' }}>
              <div className="flex-shrink-0" style={{ minWidth: 80 }}>
                <div className="font-black text-sm" style={{ color: '#d97706' }}>{item.time}</div>
                <div className="text-xs mt-1 font-semibold" style={{ color: '#059669' }}>{item.scoreChange}</div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#78716c' }}>{item.milestone}</p>
            </div>
          ))}
        </div>
        <p className="mb-8 leading-relaxed text-sm" style={{ color: '#a8a29e' }}>
          These are approximate ranges based on general credit scoring principles. Individual results vary based on starting score, number of negative items, and consistency of new positive behavior.
        </p>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Common Mistakes That Slow Credit Building</h2>
        <div className="space-y-3 mb-8">
          {[
            { mistake: 'Applying for too many cards at once', why: 'Each hard inquiry drops your score 5–10 points and signals desperation. Space applications at least 6 months apart.' },
            { mistake: 'Carrying a balance "to build credit"', why: 'This is a myth. You do not need to pay interest to build credit. Pay in full every month. The on-time payment is what matters, not the interest paid.' },
            { mistake: 'Closing old accounts', why: 'Closing a credit card reduces your available credit (increasing utilization) and eventually shortens your credit history. Keep old cards open, even if unused.' },
            { mistake: 'Ignoring your credit report', why: 'Errors persist if you don\'t check. Pull your free reports at least annually and dispute anything inaccurate.' },
            { mistake: 'Using credit repair companies', why: 'Most charge high fees for things you can do yourself for free (disputing errors, negotiating with creditors). The FTC has taken action against many credit repair scams.' },
            { mistake: 'Missing even one payment', why: 'A single 30-day late payment can drop your score 50–100 points and stays on your report for 7 years. Set up autopay for at least the minimum.' },
          ].map((item, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: '#fef2f2', border: '1px solid rgba(239,68,68,0.1)' }}>
              <div className="font-bold text-sm mb-1" style={{ color: '#dc2626' }}>{item.mistake}</div>
              <p className="text-xs leading-relaxed" style={{ color: '#78716c' }}>{item.why}</p>
            </div>
          ))}
        </div>

        {/* Mid-article CTA */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: '#fef9ee', border: '1px solid rgba(217,119,6,0.2)' }}>
          <div className="font-bold mb-2" style={{ color: '#d97706' }}>Skip the Deposit — Use Your Car Instead</div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#78716c' }}>
            If you own a car, you may be able to get a Visa credit card with a credit line up to $10,000 — no cash deposit, no minimum credit score. Your car&apos;s equity does the work.
          </p>
          <AffiliateLink href={YENDO_BUILD_CREDIT_CTA} placement="build-credit-guide-mid" className="btn-primary text-sm py-2 px-5 inline-block">Check If My Car Qualifies →</AffiliateLink>
          <p className="text-xs mt-2" style={{ color: '#a8a29e' }}>Soft inquiry only · Affiliate link</p>
        </div>

        <MoneyResetCTA variant="mid" />

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>Free Tools and Resources</h2>
        <div className="space-y-3 mb-8">
          {[
            { tool: 'AnnualCreditReport.com', desc: 'Free weekly credit reports from all three bureaus. The only truly free, government-authorized source.' },
            { tool: 'Credit Karma', desc: 'Free credit score monitoring (VantageScore). Useful for tracking progress, though the score may differ from your FICO.' },
            { tool: 'Experian Boost', desc: 'Free service to add utility and subscription payments to your Experian credit report.' },
            { tool: 'Mintbrooks Car Equity Calculator', desc: 'Free tool to estimate how much credit your car could unlock with a car-secured card.', link: '/calculator' },
            { tool: 'CFPB Complaint Database', desc: 'File complaints against financial companies and research company complaint histories.' },
          ].map((item, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: '#fafaf9', border: '1px solid rgba(28,25,23,0.06)' }}>
              <div className="font-bold text-sm mb-1" style={{ color: '#1c1917' }}>
                {item.link ? <Link href={item.link} className="hover:text-amber-700 transition-colors">{item.tool}</Link> : item.tool}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#78716c' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-black mb-4" style={{ color: '#1c1917', letterSpacing: '-0.01em' }}>The Bottom Line</h2>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          Building credit with bad credit is not fast, but it is entirely achievable. The formula is straightforward: get at least one credit account that reports to all three bureaus, make every payment on time, keep utilization low, and be patient.
        </p>
        <p className="mb-4 leading-relaxed" style={{ color: '#78716c' }}>
          The biggest barrier for most people is getting that first credit account. If you own a car, a car-secured credit card eliminates the cash deposit barrier and can provide a higher limit that makes utilization management easier. If you do not own a car, a traditional secured card or credit builder loan are solid starting points.
        </p>
        <p className="mb-8 leading-relaxed" style={{ color: '#78716c' }}>
          What matters most is starting. Every month without an active, reporting credit account is a month of potential credit building lost. The best time to start was yesterday. The second best time is today.
        </p>

        <MoneyResetCTA variant="end" />

        {/* Final CTA */}
        <div className="rounded-2xl p-6 text-center mb-12" style={{ background: '#1c1917' }}>
          <h3 className="text-xl font-black text-white mb-2">Start Building Credit Today</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>Check if your car qualifies for a credit card — no credit score impact.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <AffiliateLink href={YENDO_BUILD_CREDIT_CTA} placement="build-credit-guide-cta" className="btn-primary py-3 px-6">Check Car Eligibility →</AffiliateLink>
            <Link href="/finance/calculator" className="btn-primary py-3 px-6" style={{ background: '#059669' }}>Use Free Calculator</Link>
          </div>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.28)' }}>Affiliate links · Soft inquiry · Mintbrooks is not a lender</p>
        </div>

        {/* Related reading */}
        <div className="mb-10">
          <div className="font-black mb-4" style={{ color: '#1c1917' }}>Related Reading</div>
          <div className="space-y-2">
            {[
              { href: '/bad-credit-credit-card', label: 'Best Credit Cards for Bad Credit (2026)' },
              { href: '/car-equity-credit-card-reviews', label: 'Car Equity Credit Card Reviews' },
              { href: '/yendo-credit-card-review', label: 'Yendo Credit Card Review — Full Breakdown' },
              { href: '/credit-card-500-credit-score', label: 'Credit Cards for 500 Credit Score' },
              { href: '/finance/calculator', label: 'Free Car Equity Calculator' },
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
      
        <FinanceEmailCapture source="finance" />
      </article>
    </>
  )
}
