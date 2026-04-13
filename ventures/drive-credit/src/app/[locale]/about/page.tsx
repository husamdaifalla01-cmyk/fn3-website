import type { Metadata } from 'next'
import Image from 'next/image'
import { Playfair_Display } from 'next/font/google'
import LifestyleNav from '@/components/lifestyle/LifestyleNav'
import LifestyleFooter from '@/components/lifestyle/LifestyleFooter'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'About — Mintbrooks',
  description:
    'The editorial team behind Mintbrooks and why we built a lifestyle guide that covers both beautiful living and financial health.',
  openGraph: {
    title: 'About — Mintbrooks',
    description:
      'The editorial team behind Mintbrooks and why we built a lifestyle guide that covers both beautiful living and financial health.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — Mintbrooks',
    description:
      'The editorial team behind Mintbrooks and why we built a lifestyle guide that covers both beautiful living and financial health.',
  },
}

// ─── Team Data ────────────────────────────────────────────────────────────────

const team = [
  {
    initials: 'MK',
    name: 'M. Kowalski',
    title: 'Editor in Chief',
    bio: "Former beauty editor. Has tried more retinol formulations than she\u2019d like to admit.",
    color: '#1D3A2F',
  },
  {
    initials: 'JT',
    name: 'J. Torres',
    title: 'Home & Kitchen Editor',
    bio: 'Interior design obsessive. Believes a good lamp changes everything.',
    color: '#B8955A',
  },
  {
    initials: 'AR',
    name: 'A. Reeves',
    title: 'Finance Writer',
    bio: 'Ex-fintech, now explains credit scores in plain English. Fluent in FICO.',
    color: '#4A6741',
  },
  {
    initials: 'SL',
    name: 'S. Laurent',
    title: 'Wellness Editor',
    bio: 'Certified sleep coach. Will not shut up about magnesium.',
    color: '#7A5C3A',
  },
]

// ─── Standards Data ───────────────────────────────────────────────────────────

const standards = [
  {
    title: 'We test before we recommend',
    body: "Every product on Mintbrooks has been evaluated against real criteria: does the science support it, is the formulation clean or honest, and is the price justifiable? We don't recommend what we wouldn't buy.",
  },
  {
    title: 'Affiliate links fund independent editorial',
    body: 'We earn a commission on purchases made through our links, at no extra cost to you. This is how we keep the lights on without a paywall. It does not influence which products we recommend — only which products we test.',
  },
  {
    title: 'We update our recommendations',
    body: 'Products change. Formulations change. Prices change. We review and update every recommendation on a rolling basis. If something no longer passes our standards, it comes off the list.',
  },
]

// ─── Page Component ────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div
      className={playfair.variable}
      style={{ background: '#FDFAF6', minHeight: '100vh' }}
    >
      <LifestyleNav />

      {/* ── About Hero ──────────────────────────────────────────────────────── */}
      <section
        style={{
          background: '#FDFAF6',
          padding: '160px clamp(20px, 5vw, 80px) clamp(80px, 10vw, 140px)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#B8955A',
            marginBottom: '28px',
            opacity: 0,
            animation: 'ls-fade-up 0.6s ease forwards',
          }}
        >
          About
        </div>
        <h1
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            fontWeight: 700,
            color: '#1A1714',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            margin: '0 auto 28px',
            maxWidth: '760px',
            opacity: 0,
            animation: 'ls-fade-up 0.6s ease 0.12s forwards',
          }}
        >
          We built the guide we always wanted.
        </h1>
        <p
          style={{
            fontSize: 'clamp(16px, 1.8vw, 20px)',
            color: '#6B6557',
            lineHeight: 1.65,
            margin: '0 auto',
            maxWidth: '560px',
            opacity: 0,
            animation: 'ls-fade-up 0.6s ease 0.24s forwards',
          }}
        >
          One place for the aesthetics, the rituals, the products — and the financial
          foundation to sustain all of it.
        </p>
      </section>

      {/* ── Mission Statement ────────────────────────────────────────────────── */}
      <section
        style={{
          padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          className="ls-about-mission"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(40px, 6vw, 100px)',
            alignItems: 'start',
          }}
        >
          {/* Left — editorial image */}
          <div
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(26,23,20,0.12)',
              aspectRatio: '3/4',
            }}
          >
            <Image
              src="/editorial.jpg"
              alt="Editorial workspace at Mintbrooks"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>

          {/* Right — copy */}
          <div style={{ paddingTop: '24px' }}>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 700,
                color: '#1A1714',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '40px',
              }}
            >
              Why Mintbrooks exists.
            </h2>
            {[
              'The best lifestyle content and the best financial advice have always lived in separate places. Gorgeous home inspiration on one side. Cold, clinical credit education on the other. We thought that was a strange divide, given that the same person wants both.',
              "So we built a place that treats them as one connected idea. A beautiful life isn't despite financial health \u2014 it's enabled by it. The linen duvet, the skincare ritual, the kitchen upgrade: all of these are better decisions when made from a position of financial confidence.",
              'Mintbrooks is the guide for people who want both. We test the products. We explain the financial concepts. We make the recommendations. And we do it all without pretending that a beautiful life and a healthy bank account are separate goals.',
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: '16px',
                  color: '#6B6557',
                  lineHeight: 1.8,
                  marginBottom: '24px',
                  margin: '0 0 24px',
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial Standards ─────────────────────────────────────────────── */}
      <section
        style={{
          background: '#1D3A2F',
          padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#B8955A',
                marginBottom: '16px',
              }}
            >
              Our standards
            </div>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 700,
                color: '#FDFAF6',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              How we work.
            </h2>
          </div>

          <div
            className="ls-standards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
          >
            {standards.map((card) => (
              <div
                key={card.title}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  padding: '36px 32px',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <h3
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#B8955A',
                    lineHeight: 1.25,
                    marginBottom: '16px',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    color: 'rgba(253,250,246,0.7)',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team Section ────────────────────────────────────────────────────── */}
      <section
        style={{
          background: '#FDFAF6',
          padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '56px' }}>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#B8955A',
                marginBottom: '16px',
              }}
            >
              The team
            </div>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 700,
                color: '#1A1714',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '24px',
              }}
            >
              The people behind the picks.
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#6B6557',
                lineHeight: 1.75,
                maxWidth: '580px',
                margin: 0,
              }}
            >
              Mintbrooks is a small editorial team with deep roots in lifestyle, skincare,
              interior design, and personal finance. We're not influencers. We're researchers
              who happen to have taste.
            </p>
          </div>

          <div
            className="ls-team-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
            }}
          >
            {team.map((member) => (
              <div
                key={member.name}
                style={{
                  background: '#F0EDE8',
                  borderRadius: '16px',
                  padding: '32px',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: member.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#FDFAF6',
                    letterSpacing: '0.02em',
                  }}
                >
                  {member.initials}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#1A1714',
                      marginBottom: '4px',
                    }}
                  >
                    {member.name}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#B8955A',
                      marginBottom: '10px',
                    }}
                  >
                    {member.title}
                  </div>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#6B6557',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Affiliate Disclosure ─────────────────────────────────────────────── */}
      <section
        style={{
          background: '#F7F4EF',
          padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#B8955A',
              marginBottom: '16px',
            }}
          >
            Transparency
          </div>
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(28px, 3.5vw, 40px)',
              fontWeight: 700,
              color: '#1A1714',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '32px',
            }}
          >
            Affiliate disclosure.
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: '#6B6557',
              lineHeight: 1.8,
              marginBottom: '20px',
            }}
          >
            Mintbrooks participates in various affiliate marketing programs, including the
            Amazon Services LLC Associates Program and MaxBounty. This means that when you
            click on links to products on our site and make a purchase, we may earn a
            commission. This commission comes at no additional cost to you.
          </p>
          <p
            style={{
              fontSize: '16px',
              color: '#6B6557',
              lineHeight: 1.8,
              marginBottom: '20px',
            }}
          >
            We only recommend products that we genuinely believe in and that meet our
            editorial standards. Our affiliate relationships do not influence our editorial
            judgment. The products we recommend are chosen because they're good — not
            because they pay us the most.
          </p>
          <p
            style={{
              fontSize: '15px',
              color: '#6B6557',
              lineHeight: 1.75,
              marginBottom: '0',
              paddingTop: '8px',
              borderTop: '1px solid rgba(26,23,20,0.08)',
            }}
          >
            Questions about our editorial process?{' '}
            <a
              href="mailto:editorial@mintbrooks.com"
              style={{
                color: '#1D3A2F',
                textDecoration: 'none',
                fontWeight: 600,
                borderBottom: '1px solid rgba(29,58,47,0.3)',
              }}
            >
              Email us at editorial@mintbrooks.com
            </a>
          </p>
        </div>
      </section>

      <LifestyleFooter />

      <style>{`
        @keyframes ls-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .ls-about-mission {
            grid-template-columns: 1fr !important;
          }
          .ls-standards-grid {
            grid-template-columns: 1fr !important;
          }
          .ls-team-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
