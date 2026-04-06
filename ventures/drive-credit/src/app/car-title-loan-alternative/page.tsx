import type { Metadata } from 'next'
import Link from 'next/link'
import { OFFERS, buildAffiliateUrl } from '@/lib/offers'

const YENDO_CTA_HERO = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'title-loan-alt-hero')
const YENDO_CTA_MID  = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'title-loan-alt-mid')
const YENDO_CTA_FOOT = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'title-loan-alt-footer')
const SLAM_CTA       = buildAffiliateUrl(OFFERS.slamDunk.url, 'organic', 'seo', 'title-loan-alt-slam')

export const metadata: Metadata = {
  title: 'Car Title Loan Alternative — Keep Your Title, Get Up to $10,000 in Credit | Mintbrooks',
  description: 'A car title loan puts your vehicle at risk. A car-secured credit card gives you up to $10,000 in revolving credit — and you keep your title. No credit score required.',
  keywords: 'car title loan alternative, title loan vs secured credit card, car equity credit no title loan, Yendo vs title loan, keep car title get credit',
  openGraph: {
    title: 'Car Title Loan Alternative — Keep Your Title, Get Up to $10,000',
    description: 'Skip the predatory title loan. Use your car\'s equity for a real Visa credit card instead.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mintbrooks.com/car-title-loan-alternative',
  },
}

const comparisons = [
  {
    feature: 'You keep your car title',
    titleLoan: false,
    carCard: true,
  },
  {
    feature: 'Revolving credit (reuse after payment)',
    titleLoan: false,
    carCard: true,
  },
  {
    feature: 'Reports to credit bureaus',
    titleLoan: false,
    carCard: true,
  },
  {
    feature: 'No risk of repossession from normal use',
    titleLoan: false,
    carCard: true,
  },
  {
    feature: 'Average APR under 30%',
    titleLoan: false,
    carCard: true,
  },
  {
    feature: 'No credit score requirement',
    titleLoan: true,
    carCard: true,
  },
  {
    feature: 'Get cash/credit against car value',
    titleLoan: true,
    carCard: true,
  },
]

const faqItems = [
  {
    q: 'What is a car title loan?',
    a: 'A car title loan is a short-term, high-interest loan where you hand over your car\'s title as collateral. The lender holds the title until you repay. If you miss a payment, they can repossess your vehicle. APRs often exceed 300% annualized.',
  },
  {
    q: 'How is a car-secured credit card different from a title loan?',
    a: 'A car-secured credit card (like Yendo) uses your vehicle\'s equity to determine your credit limit, but you retain your title and keep driving your car. It\'s revolving credit — you pay it down and reuse it, like any Visa card. APR is significantly lower than title loans, and it builds your credit score.',
  },
  {
    q: 'Do I need good credit to qualify?',
    a: 'No. Car-secured credit cards are designed for people with bad credit or thin credit files. Your car\'s value is the primary qualification factor. The initial eligibility check is a soft pull — it doesn\'t affect your credit score.',
  },
  {
    q: 'What happens if I miss a payment?',
    a: 'Missing a payment on a car-secured credit card works like any credit card: late fees, potential interest charges, and a hit to your credit score. However, unlike a title loan, a single missed payment does not automatically trigger repossession. The lender has to follow standard credit card default procedures, which are far more consumer-protective.',
  },
  {
    q: 'How much credit can I get?',
    a: 'Yendo offers $500–$10,000 depending on your vehicle\'s value. Generally, newer cars in better condition qualify for higher limits. The eligibility check takes 30 seconds and won\'t affect your credit score.',
  },
]

export default function CarTitleLoanAlternativePage() {
  return (
    <main style={{ background: '#1c1917', minHeight: '100vh', color: '#e7e5e4' }}>
      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontWeight: 900, fontSize: '1.2rem', color: '#fff', letterSpacing: '-0.02em' }}>
            Mint<span style={{ color: '#fbbf24' }}>brooks</span>
          </span>
        </Link>
        <a
          href={YENDO_CTA_HERO}
          style={{ background: '#d97706', color: '#fff', padding: '8px 18px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '0.85rem' }}
        >
          Check My Car
        </a>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '60px 24px 40px' }}>
        <p style={{ color: '#d97706', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
          Car Title Loan Alternative
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, lineHeight: 1.1, color: '#fff', marginBottom: 20 }}>
          Skip the title loan.<br />Use your car's equity for a<br />
          <span style={{ color: '#fbbf24' }}>real Visa credit card.</span>
        </h1>
        <p style={{ color: '#a8a29e', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: 32 }}>
          Car title loans charge 300%+ APR and put your vehicle at risk. There&apos;s a better option: a car-secured credit card that gives you up to $10,000 in revolving credit — and you <strong style={{ color: '#e7e5e4' }}>keep your title</strong>.
        </p>
        <a
          href={YENDO_CTA_HERO}
          style={{ display: 'inline-block', background: '#d97706', color: '#fff', fontWeight: 800, fontSize: '1rem', padding: '16px 32px', borderRadius: '12px', textDecoration: 'none' }}
        >
          Check If My Car Qualifies →
        </a>
        <p style={{ color: '#78716c', fontSize: '0.82rem', marginTop: 12 }}>
          30-second check. Soft inquiry only — won&apos;t affect your credit score. Available in 36+ states.
        </p>
        <p style={{ color: '#78716c', fontSize: '0.78rem', marginTop: 4 }}>
          <em>Advertising disclosure: Mintbrooks may earn a commission if you apply through our links.</em>
        </p>
      </section>

      {/* Comparison Table */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 60px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: 24 }}>
          Car Title Loan vs. Car-Secured Credit Card
        </h2>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: '#292524', padding: '12px 20px' }}>
            <span style={{ color: '#78716c', fontSize: '0.82rem', fontWeight: 700 }}>Feature</span>
            <span style={{ color: '#ef4444', fontSize: '0.82rem', fontWeight: 700, textAlign: 'center' }}>Title Loan</span>
            <span style={{ color: '#34d399', fontSize: '0.82rem', fontWeight: 700, textAlign: 'center' }}>Car-Secured Card</span>
          </div>
          {comparisons.map((row, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                padding: '14px 20px',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                alignItems: 'center',
              }}
            >
              <span style={{ color: '#d6d3d1', fontSize: '0.88rem' }}>{row.feature}</span>
              <span style={{ textAlign: 'center', fontSize: '1.1rem' }}>{row.titleLoan ? '✓' : '✗'}</span>
              <span style={{ textAlign: 'center', fontSize: '1.1rem', color: row.carCard ? '#34d399' : '#ef4444' }}>{row.carCard ? '✓' : '✗'}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Mid CTA */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 60px' }}>
        <div style={{ background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.2)', borderRadius: 20, padding: '40px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', marginBottom: 12 }}>
            Your car already has the collateral.
          </h2>
          <p style={{ color: '#a8a29e', lineHeight: 1.7, marginBottom: 28 }}>
            If your car is worth more than $2,000, you may qualify for a Visa credit card with a $500–$10,000 limit. No title handed over. No 300% APR.
          </p>
          <a
            href={YENDO_CTA_MID}
            style={{ display: 'inline-block', background: '#d97706', color: '#fff', fontWeight: 800, padding: '14px 28px', borderRadius: '10px', textDecoration: 'none' }}
          >
            Check My Car&apos;s Eligibility →
          </a>
          <p style={{ color: '#78716c', fontSize: '0.8rem', marginTop: 12 }}>
            Soft pull only. Free to check. Available in 36+ states.
          </p>
        </div>
      </section>

      {/* Why Title Loans Are Dangerous */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 60px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: 20 }}>
          Why car title loans are predatory
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { icon: '⚠️', title: '300%+ APR is standard', body: 'The Consumer Financial Protection Bureau found that the typical car title loan has a 300% annualized interest rate. A $1,000 loan for 30 days costs $250 in fees — every month.' },
            { icon: '🚗', title: 'Your car is constantly at risk', body: 'Miss one payment and the lender can legally repossess your vehicle within days in most states. No car means no work means no ability to pay. It\'s a debt trap by design.' },
            { icon: '📉', title: 'They don\'t build your credit', body: 'Title loans typically don\'t report to credit bureaus. You pay $300 in fees and come out with the same (or worse) credit score. It\'s money down a hole.' },
            { icon: '🔄', title: 'Rollovers compound the problem', body: 'More than 80% of title loans are rolled over or renewed (CFPB data). The average borrower pays more in fees than the original loan amount.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{item.icon}</span>
              <div>
                <p style={{ fontWeight: 700, color: '#fff', marginBottom: 6 }}>{item.title}</p>
                <p style={{ color: '#a8a29e', lineHeight: 1.6, fontSize: '0.92rem' }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 60px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: 24 }}>
          Frequently asked questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {faqItems.map((item, i) => (
            <div key={i} style={{ padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ fontWeight: 700, color: '#fff', marginBottom: 8 }}>{item.q}</p>
              <p style={{ color: '#a8a29e', lineHeight: 1.7, fontSize: '0.93rem' }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 80px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', marginBottom: 12 }}>
          Ready to skip the title loan?
        </h2>
        <p style={{ color: '#a8a29e', lineHeight: 1.7, marginBottom: 28 }}>
          Check if your car qualifies for a real Visa credit card — no title surrender, no predatory rates. Takes 30 seconds.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={YENDO_CTA_FOOT}
            style={{ display: 'inline-block', background: '#d97706', color: '#fff', fontWeight: 800, padding: '16px 32px', borderRadius: '12px', textDecoration: 'none', fontSize: '1rem' }}
          >
            Check My Car's Eligibility →
          </a>
          <a
            href={SLAM_CTA}
            style={{ display: 'inline-block', background: 'transparent', color: '#a8a29e', fontWeight: 600, padding: '16px 24px', borderRadius: '12px', textDecoration: 'none', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            Not in my state? See alternatives
          </a>
        </div>
        <p style={{ color: '#57534e', fontSize: '0.78rem', marginTop: 16, lineHeight: 1.6 }}>
          Mintbrooks is an independent educational resource. We are not a lender. Mintbrooks may earn a commission when you apply through our links at no extra cost to you. Not financial advice.
        </p>
        <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ color: '#78716c', fontSize: '0.78rem', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Related Guides</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link href="/auto-equity-loan" style={{ color: '#d97706', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>→ Auto Equity Loan: Use Your Car&apos;s Value to Get Cash</Link>
            <Link href="/bad-credit-credit-card" style={{ color: '#d97706', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>→ Best Credit Cards for Bad Credit — Ranked by Real Approval Odds</Link>
            <Link href="/yendo-states-guide" style={{ color: '#d97706', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>→ Is Yendo Available in Your State?</Link>
          </div>
        </div>
      </section>

      {/* Schema */}
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
    </main>
  )
}
