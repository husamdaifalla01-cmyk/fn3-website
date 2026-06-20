import type { Metadata } from 'next'

/* ─────────────────────────────────────────────────────────────────────────────
   SEO Metadata
───────────────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Mintbrooks',
  description:
    'Everything you need to know about car-secured credit cards, credit building, and how Mintbrooks works. Get answers fast.',
  alternates: { canonical: 'https://mintbrooks.com/faq' },
  openGraph: {
    title: 'Frequently Asked Questions | Mintbrooks',
    description:
      'Everything you need to know about car-secured credit cards, credit building, and how Mintbrooks works.',
    type: 'website',
    url: 'https://mintbrooks.com/faq',
    siteName: 'Mintbrooks',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ — Car-Secured Credit Cards | Mintbrooks',
    description:
      'Answers to the most common questions about car-secured credit cards and credit building.',
  },
}

/* ─────────────────────────────────────────────────────────────────────────────
   FAQ Data
───────────────────────────────────────────────────────────────────────────── */
const AFFILIATE_URL =
  'https://afflat3e3.com/trk/lnk/39C31C1E-BCBA-4A51-AA59-AC60BAA84EF4/?o=23765&c=918391&f=1&adv4=mintbrooks-faq&adv5=organic'

const faqs = [
  {
    q: 'What is a car-secured credit card?',
    a: "A car-secured credit card lets you use your vehicle's equity as collateral — instead of a cash deposit. Yendo is the leading product in this category. They place a lien on your car's title, you keep driving, and in return you get a Visa credit card with a real credit limit. It works exactly like a regular credit card: swipe, pay monthly, build credit.",
  },
  {
    q: 'Do I need good credit to qualify?',
    a: "No minimum credit score is required. Yendo's underwriting is based on your car's value, not your credit history. Applicants with credit scores as low as 300 have qualified. If traditional credit cards and secured cards have turned you down, a car-secured card is one of the few paths forward.",
  },
  {
    q: 'How much credit can I get?',
    a: "Your credit limit is calculated from your car's current market value — typically 50–75% of that value. Most approved applicants receive a limit between $500 and $10,000. The newer and more valuable your vehicle, the higher your potential limit.",
  },
  {
    q: 'Will applying hurt my credit score?',
    a: "Yendo's pre-qualification uses a soft credit pull, which does not affect your score. You can check your eligibility with zero risk. A hard inquiry only occurs if you decide to proceed to the full application — and even then, most people experience less than a 5-point temporary dip.",
  },
  {
    q: 'Do I have to give up my car?',
    a: "No. You keep your car, your keys, and your daily routine. Yendo places a lien on your car's title — a legal claim, not physical possession. As long as you stay current on your Yendo account, your car is yours to drive. The lien is removed when the account is closed in good standing.",
  },
  {
    q: 'How does using a car-secured card build credit?',
    a: 'Yendo reports your payment activity to all three major credit bureaus — Equifax, Experian, and TransUnion — every month. On-time payments and low utilization are the two biggest drivers of credit score improvement. Consistent, responsible use over 6–12 months typically produces meaningful score gains.',
  },
  {
    q: 'What states does Yendo operate in?',
    a: "Yendo is currently available in most US states. Due to state licensing requirements, it is not yet available in the following states: Alaska, Hawaii, Iowa, Louisiana, Maine, Maryland, Massachusetts, Minnesota, Missouri, New Jersey, New York, Oklahoma, South Dakota, and Wisconsin. If you're in one of those states, check back — the list shrinks as licensing expands.",
  },
  {
    q: "What's the difference between a car-secured card and a title loan?",
    a: "Title loans are predatory: they charge 200–300% APR, are designed to trap you in a debt cycle, and can result in losing your vehicle quickly. Car-secured credit cards are a completely different product. They work like standard revolving credit — you have a limit, you pay a monthly bill, you build credit history. The APR is comparable to a standard credit card, not a payday loan.",
  },
  {
    q: 'How long does approval take?',
    a: "Yendo's online pre-qualification takes about 60 seconds. If you decide to proceed, the full application typically completes the same day. Most applicants receive a decision within hours, not weeks.",
  },
  {
    q: 'What car requirements are there?',
    a: "Your vehicle must: (1) be titled in your name, (2) be fully paid off with no outstanding auto loan, and (3) meet Yendo's minimum value threshold. Most model-year 2010 or newer vehicles with clean titles qualify. Salvage titles and commercial vehicles are typically excluded.",
  },
  {
    q: 'Is Mintbrooks affiliated with Yendo?',
    a: 'Mintbrooks is an independent editorial and comparison website. We are not Yendo, and Yendo does not control our content. We may earn a referral commission when you apply through links on this site — at no cost to you. Our recommendations are based on research and editorial judgment, not on commission size.',
  },
  {
    q: 'How do I apply?',
    a: 'Click any "Check My Eligibility" or "Check If My Car Qualifies" button on this site. You\'ll be taken to Yendo\'s secure application portal. The process takes about 5 minutes: enter your name, address, car details, and run the soft pull. No documents to upload upfront.',
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   JSON-LD Schema
───────────────────────────────────────────────────────────────────────────── */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: a,
    },
  })),
}

/* ─────────────────────────────────────────────────────────────────────────────
   Page Component
───────────────────────────────────────────────────────────────────────────── */
export default function FAQPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>

        {/* ── Page Header ───────────────────────────────────────────────── */}
        <section
          style={{
            background: 'linear-gradient(160deg, #1c1917 0%, #292524 100%)',
            padding: 'clamp(100px, 14vw, 160px) clamp(20px, 5vw, 80px) clamp(60px, 8vw, 100px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* subtle amber glow orb */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-80px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(217,119,6,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            className="section-label-light"
            style={{ marginBottom: '16px' }}
          >
            Have questions?
          </div>

          <h1
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              marginBottom: '20px',
              maxWidth: '700px',
              margin: '0 auto 20px',
            }}
          >
            We've got answers.
          </h1>

          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: 'rgba(255,255,255,0.62)',
              maxWidth: '520px',
              margin: '0 auto 36px',
              lineHeight: 1.6,
            }}
          >
            Everything you need to know about car-secured credit cards,
            credit building, and how Mintbrooks works.
          </p>

          <a
            href={AFFILIATE_URL}
            className="btn-amber"
            rel="noopener noreferrer sponsored"
            target="_blank"
          >
            Check If My Car Qualifies →
          </a>
        </section>

        {/* ── FAQ Accordion ──────────────────────────────────────────────── */}
        <section
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 40px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {faqs.map(({ q, a }, i) => (
              <details
                key={i}
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(217,119,6,0.15)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(28,25,23,0.05)',
                }}
              >
                <summary
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    padding: 'clamp(18px, 3vw, 24px) clamp(20px, 4vw, 28px)',
                    cursor: 'pointer',
                    listStyle: 'none',
                    fontWeight: 600,
                    fontSize: 'clamp(15px, 2vw, 17px)',
                    color: '#1c1917',
                    lineHeight: 1.4,
                  }}
                >
                  <span>{q}</span>
                  {/* chevron via CSS — rotates when open */}
                  <span
                    aria-hidden="true"
                    className="faq-chevron"
                    style={{
                      flexShrink: 0,
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(217,119,6,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      color: '#d97706',
                      fontWeight: 700,
                      transition: 'transform 0.22s ease',
                    }}
                  >
                    ▾
                  </span>
                </summary>

                <div
                  style={{
                    padding: '0 clamp(20px, 4vw, 28px) clamp(20px, 3vw, 26px)',
                    color: '#78716c',
                    fontSize: 'clamp(14px, 1.8vw, 16px)',
                    lineHeight: 1.75,
                    borderTop: '1px solid rgba(217,119,6,0.08)',
                    paddingTop: '16px',
                  }}
                >
                  {a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── Mid-Page CTA ───────────────────────────────────────────────── */}
        <section
          style={{
            background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)',
            margin: '0 clamp(20px, 5vw, 80px) clamp(48px, 8vw, 80px)',
            borderRadius: '24px',
            padding: 'clamp(48px, 8vw, 80px) clamp(24px, 6vw, 80px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* amber accent line at top */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #d97706, transparent)',
              borderRadius: '2px',
            }}
          />

          <div
            className="section-label-light"
            style={{ marginBottom: '16px' }}
          >
            Ready to check?
          </div>

          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              marginBottom: '16px',
            }}
          >
            Your car may already qualify.
          </h2>

          <p
            style={{
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '440px',
              margin: '0 auto 36px',
              lineHeight: 1.65,
            }}
          >
            Pre-qualification takes 60 seconds. Soft pull only — no impact to
            your credit score.
          </p>

          <a
            href={AFFILIATE_URL}
            className="btn-amber"
            rel="noopener noreferrer sponsored"
            target="_blank"
          >
            Check If My Car Qualifies →
          </a>
        </section>

        {/* ── FTC Disclosure ─────────────────────────────────────────────── */}
        <section
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            padding: '0 clamp(20px, 5vw, 40px) clamp(48px, 8vw, 80px)',
          }}
        >
          <div
            style={{
              border: '1px solid rgba(217,119,6,0.12)',
              borderRadius: '12px',
              padding: '20px 24px',
              background: 'rgba(217,119,6,0.03)',
            }}
          >
            <p
              style={{
                fontSize: '12px',
                color: '#a8a29e',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              <strong style={{ color: '#78716c' }}>Advertising Disclosure:</strong>{' '}
              Mintbrooks may earn a commission if you apply through links on this
              page. This compensation does not influence our editorial content or
              recommendations. Our reviews are independent and based on research.{' '}
              <a
                href="/privacy"
                style={{ color: '#d97706', textDecoration: 'underline' }}
              >
                See our full disclosure.
              </a>
            </p>
          </div>
        </section>
      </main>

      {/* ── Accordion chevron animation ─────────────────────────────────── */}
      <style>{`
        /* Remove default marker in all browsers */
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }

        /* Hover state */
        details > summary:hover {
          background: rgba(217, 119, 6, 0.03);
        }

        /* Rotate chevron when open */
        details[open] > summary .faq-chevron {
          transform: rotate(180deg);
          background: rgba(217, 119, 6, 0.18);
        }

        /* Smooth answer reveal */
        details > div {
          animation: faq-reveal 0.22s ease;
        }

        @keyframes faq-reveal {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Mobile: full-width CTA card */
        @media (max-width: 480px) {
          details > summary { padding: 18px 20px; }
        }
      `}</style>
    </>
  )
}
