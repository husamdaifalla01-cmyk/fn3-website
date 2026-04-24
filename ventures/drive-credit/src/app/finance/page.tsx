import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import FinanceFAQ from './FinanceFAQ'
import { EDITORIAL_ARTICLES } from '@/lib/lifestyle/articles-editorial'
import { getProductsByCategory } from '@/lib/lifestyle/products'
import CategoryEditorial from '@/components/lifestyle/CategoryEditorial'
import CarCalculator from '@/components/CarCalculator'
import { OFFERS, buildAffiliateUrl } from '@/lib/offers'
import LifestyleNav from '@/components/lifestyle/LifestyleNav'
import LifestyleFooter from '@/components/lifestyle/LifestyleFooter'
import { NextIntlClientProvider } from 'next-intl'
import enMessages from '../../../messages/en.json'

const YENDO_FINANCE_CALC = buildAffiliateUrl(OFFERS.yendo.url, 'organic', 'seo', 'finance-calculator')
const SLAM_DUNK_FINANCE  = buildAffiliateUrl(OFFERS.slamDunk.url, 'organic', 'seo', 'finance-calculator')

export const metadata: Metadata = {
  title: 'Money & Credit',
  description:
    'Credit education, financial guides, and tools to build real credit history — including Yendo (car-backed Visa, no hard pull) and SlamDunk Finance personal loans.',
  alternates: { canonical: 'https://mintbrooks.com/finance' },
  openGraph: {
    title: 'Money & Credit — Mintbrooks',
    description:
      'Credit education, financial guides, and tools to build real credit history — including Yendo (car-backed Visa, no hard pull) and SlamDunk Finance personal loans.',
    type: 'website',
    url: 'https://mintbrooks.com/finance',
    images: [{ url: 'https://mintbrooks.com/lifestyle/editorial.jpg', width: 1200, height: 630, alt: 'Mintbrooks Money & Credit' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Money & Credit — Mintbrooks',
    description:
      'Credit education, financial guides, and tools to build real credit history — including Yendo (car-backed Visa, no hard pull) and SlamDunk Finance personal loans.',
    images: ['https://mintbrooks.com/lifestyle/editorial.jpg'],
  },
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    icon: '○',
    step: '01',
    title: 'Know where you stand',
    body: 'Your credit score affects everything from apartment applications to interest rates. Start by understanding your current position — no guesswork, no surprises.',
  },
  {
    icon: '↗',
    step: '02',
    title: 'Build strategically',
    body: 'Not all credit moves are equal. We cut through the noise and show you the highest-leverage actions for your specific situation.',
  },
  {
    icon: '◆',
    step: '03',
    title: 'Fund the life you want',
    body: 'With strong credit, the linen sets, the kitchen upgrades, and the home renovations become decisions — not dreams.',
  },
]

const STATS = [
  { value: 'Up to $10K', label: 'Max credit line' },
  { value: '36+', label: 'States available' },
  { value: 'Soft inquiry', label: 'No score impact to check' },
  { value: 'Visa', label: 'Accepted everywhere' },
]

const GUIDES = [
  {
    title: 'What is a credit score and why does it actually matter?',
    slug: 'what-is-credit-score',
    readTime: '5 min',
  },
  {
    title: 'The fastest ways to build credit from scratch',
    slug: 'build-credit-from-scratch',
    readTime: '6 min',
  },
  {
    title: 'How to use a credit card without going into debt',
    slug: 'use-credit-card-responsibly',
    readTime: '4 min',
  },
  {
    title: 'Secured vs. unsecured credit cards: what\'s the real difference?',
    slug: 'secured-vs-unsecured-cards',
    readTime: '5 min',
  },
  {
    title: 'Why your credit utilization matters more than your payment history',
    slug: 'credit-utilization-explained',
    readTime: '4 min',
  },
  {
    title: 'Building credit with bad credit: the strategies that actually work',
    slug: 'build-credit-bad-credit',
    readTime: '6 min',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FinancePage() {
  const articles = EDITORIAL_ARTICLES.filter(a => a.categorySlug === 'finance')
  const products = getProductsByCategory('finance', 12)
  void products
  return (
    <div
      style={{ background: '#FDFAF6', color: '#1A1714', overflowX: 'hidden' }}
    >
      <NextIntlClientProvider locale="en" messages={enMessages} now={new Date()} timeZone="UTC" formats={{}}>
        <LifestyleNav />
      </NextIntlClientProvider>
      {/* ── Finance Hero ──────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100svh',
          background: '#1D3A2F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <Image
          src="/finance.jpg"
          alt="Finance"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center 40%', opacity: 0.35 }}
        />

        {/* Dark forest overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(29,58,47,0.6) 0%, rgba(29,58,47,0.85) 100%)',
            zIndex: 1,
          }}
        />

        {/* Decorative quotation mark texture */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -54%)',
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(320px, 45vw, 600px)',
            fontWeight: 700,
            color: 'rgba(184,149,90,0.06)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
            letterSpacing: '-0.05em',
          }}
        >
          &ldquo;
        </div>

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            padding: 'clamp(100px, 12vw, 160px) clamp(20px, 5vw, 80px) clamp(80px, 10vw, 120px)',
            maxWidth: '900px',
          }}
        >
          {/* Category pill */}
          <span
            style={{
              display: 'inline-block',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#B8955A',
              background: 'rgba(184,149,90,0.14)',
              border: '1px solid rgba(184,149,90,0.35)',
              borderRadius: '100px',
              padding: '6px 18px',
              marginBottom: '32px',
              animation: 'ls-fade-up 0.6s ease forwards',
            }}
          >
            Money &amp; Credit
          </span>

          {/* Headline */}
          <h1
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(38px, 6vw, 80px)',
              fontWeight: 700,
              color: '#FDFAF6',
              lineHeight: 1.07,
              letterSpacing: '-0.03em',
              margin: '0 0 28px',
              animation: 'ls-fade-up 0.7s ease forwards',
              animationDelay: '0.1s',
              opacity: 0,
            }}
          >
            The financial foundation
            <br />
            behind the life you&apos;re building.
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: 'clamp(16px, 2vw, 21px)',
              color: 'rgba(253,250,246,0.65)',
              lineHeight: 1.65,
              margin: '0 0 48px',
              maxWidth: '660px',
              marginLeft: 'auto',
              marginRight: 'auto',
              animation: 'ls-fade-up 0.7s ease forwards',
              animationDelay: '0.2s',
              opacity: 0,
            }}
          >
            Credit isn&apos;t a limitation. It&apos;s the infrastructure. We&apos;ll show you
            how to build it — and what to do with it.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              animation: 'ls-fade-up 0.7s ease forwards',
              animationDelay: '0.3s',
              opacity: 0,
            }}
          >
            <a
              href={YENDO_FINANCE_CALC}
              target="_blank"
              rel="noopener noreferrer sponsored"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#B8955A',
                color: '#FDFAF6',
                padding: '16px 32px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background 0.2s, transform 0.2s',
              }}
              className="fin-cta-primary"
            >
              Check if my car qualifies
            </a>
            <a
              href="#guides"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                color: '#FDFAF6',
                padding: '16px 32px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1.5px solid rgba(253,250,246,0.35)',
                transition: 'border-color 0.2s',
              }}
              className="fin-cta-outline"
            >
              Read our guides
            </a>
          </div>
        </div>
      </section>

      {/* ── Three Steps ───────────────────────────────────────────────── */}
      <section
        style={{
          background: '#FDFAF6',
          padding: 'clamp(80px, 10vw, 140px) clamp(20px, 5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section label + headline */}
          <div style={{ marginBottom: '60px' }}>
            <span
              style={{
                display: 'block',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#B8955A',
                marginBottom: '14px',
              }}
            >
              How it works
            </span>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(28px, 4vw, 52px)',
                fontWeight: 700,
                color: '#1A1714',
                margin: 0,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                maxWidth: '620px',
              }}
            >
              From lifestyle aspiration to financial confidence.
            </h2>
          </div>

          {/* Step cards */}
          <div className="fin-steps-grid">
            {STEPS.map((step, i) => (
              <div
                key={step.step}
                className="fin-step-card"
                style={{
                  background: '#F7F4EF',
                  borderRadius: '20px',
                  padding: '40px 36px 44px',
                  animation: 'ls-fade-up 0.7s ease forwards',
                  animationDelay: `${0.1 + i * 0.12}s`,
                  opacity: 0,
                }}
              >
                {/* Icon circle */}
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: '#1D3A2F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    color: '#FDFAF6',
                    marginBottom: '28px',
                  }}
                  aria-hidden="true"
                >
                  {step.icon}
                </div>

                {/* Step number */}
                <span
                  style={{
                    display: 'block',
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#B8955A',
                    letterSpacing: '0.08em',
                    marginBottom: '12px',
                  }}
                >
                  Step {step.step}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: 'clamp(20px, 2.2vw, 26px)',
                    fontWeight: 700,
                    color: '#1A1714',
                    margin: '0 0 16px',
                    lineHeight: 1.25,
                    letterSpacing: '-0.015em',
                  }}
                >
                  {step.title}
                </h3>

                {/* Body */}
                <p
                  style={{
                    fontSize: '15px',
                    color: '#6B6557',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Yendo — Primary Credit Tool ───────────────────────────────── */}
      <section
        style={{
          background: '#1D3A2F',
          padding: 'clamp(80px, 10vw, 140px) clamp(20px, 5vw, 80px)',
        }}
      >
        <div
          className="fin-drive-grid"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(48px, 6vw, 100px)',
            alignItems: 'center',
          }}
        >
          {/* Left: editorial copy */}
          <div>
            <span
              style={{
                display: 'block',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#B8955A',
                marginBottom: '20px',
              }}
            >
              Featured tool
            </span>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(30px, 4vw, 54px)',
                fontWeight: 700,
                color: '#FDFAF6',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                margin: '0 0 24px',
              }}
            >
              Use your car to build better credit.
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: 'rgba(253,250,246,0.7)',
                lineHeight: 1.75,
                margin: '0 0 40px',
                maxWidth: '480px',
              }}
            >
              Yendo is a real Visa credit card backed by your vehicle — no hard credit pull to
              check eligibility. Your car becomes your collateral, you get a real card, and every
              on-time payment reports to the bureaus. Credit history, built month by month.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '28px' }}>
              <a
                href={YENDO_FINANCE_CALC}
                target="_blank"
                rel="noopener noreferrer sponsored"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: '#B8955A',
                  color: '#FDFAF6',
                  padding: '14px 28px',
                  borderRadius: '100px',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                className="fin-qualify-btn"
              >
                Check if my car qualifies
              </a>
            </div>

            <p
              style={{
                fontSize: '12px',
                color: 'rgba(253,250,246,0.35)',
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Sponsored. No hard credit pull to check eligibility. Available in 36+ states.
            </p>
          </div>

          {/* Right: stat cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.value}
                className="fin-stat-card"
                style={{
                  background: 'rgba(253,250,246,0.06)',
                  border: '1px solid rgba(253,250,246,0.1)',
                  borderRadius: '16px',
                  padding: '28px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  animation: 'ls-fade-up 0.7s ease forwards',
                  animationDelay: `${0.15 + i * 0.12}s`,
                  opacity: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: 'clamp(26px, 3vw, 38px)',
                    fontWeight: 700,
                    color: '#B8955A',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    flexShrink: 0,
                    minWidth: '120px',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    color: 'rgba(253,250,246,0.6)',
                    lineHeight: 1.5,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SlamDunk Finance — Secondary Tool ─────────────────────────── */}
      <section
        style={{
          background: '#F7F4EF',
          padding: 'clamp(64px, 8vw, 100px) clamp(20px, 5vw, 80px)',
          borderTop: '1px solid rgba(184,149,90,0.12)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(48px, 6vw, 100px)',
            alignItems: 'center',
          }}
          className="fin-slam-grid"
        >
          {/* Left: copy */}
          <div>
            <span
              style={{
                display: 'block',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#B8955A',
                marginBottom: '20px',
              }}
            >
              Also featured
            </span>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(28px, 3.5vw, 46px)',
                fontWeight: 700,
                color: '#1A1714',
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                margin: '0 0 20px',
              }}
            >
              Need cash now, not a card?
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#6B6557',
                lineHeight: 1.75,
                margin: '0 0 36px',
                maxWidth: '460px',
              }}
            >
              SlamDunk Finance matches you with personal loan offers in minutes — even with
              imperfect credit. When you need emergency funds before your credit is fully rebuilt,
              this is where to start.
            </p>
            <a
              href={SLAM_DUNK_FINANCE}
              target="_blank"
              rel="noopener noreferrer sponsored"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: '#1D3A2F',
                color: '#FDFAF6',
                padding: '14px 28px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
            >
              Get emergency cash now
            </a>
            <p
              style={{
                fontSize: '12px',
                color: '#9B9388',
                margin: '16px 0 0',
                lineHeight: 1.6,
              }}
            >
              Sponsored. Loan offers vary. Not a guarantee of credit.
            </p>
          </div>

          {/* Right: feature bullets */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {[
              { icon: '⚡', title: 'Fast matching', body: 'See offers in minutes — no waiting, no lengthy application process.' },
              { icon: '◎', title: 'Bad credit welcome', body: 'Built for people who are still rebuilding. Soft pull to check your options.' },
              { icon: '↗', title: 'Flexible amounts', body: 'From $500 to $35,000 depending on your profile and lender match.' },
            ].map((feat) => (
              <div
                key={feat.title}
                style={{
                  background: '#FDFAF6',
                  borderRadius: '16px',
                  padding: '24px 28px',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                  border: '1px solid rgba(184,149,90,0.12)',
                }}
              >
                <span style={{ fontSize: '22px', lineHeight: 1, flexShrink: 0 }} aria-hidden="true">{feat.icon}</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '15px', color: '#1A1714', margin: '0 0 6px', letterSpacing: '-0.01em' }}>{feat.title}</p>
                  <p style={{ fontSize: '14px', color: '#6B6557', lineHeight: 1.65, margin: 0 }}>{feat.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Car Credit Calculator ─────────────────────────────────────── */}
      <section
        style={{
          background: '#F7F4EF',
          padding: 'clamp(80px, 10vw, 140px) clamp(20px, 5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span
              style={{
                display: 'block',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#B8955A',
                marginBottom: '14px',
              }}
            >
              Free Estimator
            </span>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(28px, 4vw, 52px)',
                fontWeight: 700,
                color: '#1A1714',
                margin: '0 0 16px',
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
              }}
            >
              What&apos;s your car worth in credit?
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#6B6557',
                maxWidth: '480px',
                margin: '0 auto',
                lineHeight: 1.65,
              }}
            >
              Enter your details for an instant estimate. Takes 30 seconds.
            </p>
            <p
              style={{
                fontSize: '11px',
                color: '#9B9388',
                marginTop: '10px',
              }}
            >
              Estimates are illustrative. Actual credit limits are determined by the lender.
            </p>
          </div>
          <CarCalculator yendoUrl={YENDO_FINANCE_CALC} slamDunkUrl={SLAM_DUNK_FINANCE} />
        </div>
      </section>

      {/* ── Featured Product — The 90-Day Money Reset ──────────────────── */}
<section
  style={{
    background: '#F0EDE8',
    padding: 'clamp(64px, 8vw, 100px) clamp(20px, 5vw, 80px)',
    borderTop: '1px solid rgba(184,149,90,0.15)',
  }}
>
  <div
    style={{
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'clamp(40px, 6vw, 80px)',
      alignItems: 'center',
    }}
    className="fin-product-grid"
  >
    {/* Left — product info */}
    <div>
      <span
        style={{
          display: 'inline-block',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#B8955A',
          marginBottom: '20px',
          background: 'rgba(184,149,90,0.12)',
          border: '1px solid rgba(184,149,90,0.22)',
          padding: '5px 14px',
          borderRadius: '100px',
        }}
      >
        New — mintbrooks guide
      </span>
      <h2
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(30px, 4.5vw, 52px)',
          fontWeight: 700,
          color: '#1A1714',
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
          margin: '0 0 20px',
        }}
      >
        The 90-Day
        <br />
        <em style={{ fontStyle: 'italic', color: '#1D3A2F' }}>Money Reset.</em>
      </h2>
      <p
        style={{
          fontSize: 'clamp(15px, 1.6vw, 18px)',
          color: '#6B6557',
          lineHeight: 1.72,
          margin: '0 0 32px',
          maxWidth: '480px',
        }}
      >
        The step-by-step protocol for people who already know what they should
        do about their credit — and need a structure that makes actually doing
        it feel possible. 90 days. One action per day. A score you can say out loud.
      </p>

      {/* Feature list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '36px' }}>
        {[
          'The Credit Sequence — the correct order of operations',
          'Word-for-word creditor communication scripts',
          'No-shame mindset framework (pages 8–14)',
          '60-day money-back guarantee',
        ].map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ color: '#1D3A2F', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: '14px', color: '#2A2520', lineHeight: 1.4 }}>{f}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <Link
          href="/products/90-day-money-reset"
          style={{
            background: '#1D3A2F',
            color: '#FDFAF6',
            padding: '16px 36px',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(29,58,47,0.28)',
            display: 'inline-block',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
        >
          Get the guide — $24
        </Link>
        <span
          style={{
            fontSize: '13px',
            color: '#9B9388',
            fontStyle: 'italic',
          }}
        >
          One-time · Instant PDF delivery
        </span>
      </div>
    </div>

    {/* Right — visual card */}
    <div
      style={{
        background: '#1D3A2F',
        borderRadius: '24px',
        padding: 'clamp(36px, 4vw, 52px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative oversized character */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: '-20px',
          top: '-20px',
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: '200px',
          fontWeight: 700,
          color: 'rgba(253,250,246,0.04)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        90
      </div>

      <span
        style={{
          display: 'block',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(184,149,90,0.7)',
          marginBottom: '28px',
        }}
      >
        Inside the guide
      </span>

      {[
        { phase: '01', title: 'The Foundation', days: 'Days 1–30' },
        { phase: '02', title: 'The Triage', days: 'Days 31–60' },
        { phase: '03', title: 'The Build', days: 'Days 61–90' },
      ].map((item, i) => (
        <div
          key={item.phase}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '18px 0',
            borderBottom: i < 2 ? '1px solid rgba(253,250,246,0.08)' : 'none',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(184,149,90,0.15)',
              border: '1px solid rgba(184,149,90,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '16px',
              fontWeight: 700,
              color: '#B8955A',
            }}
          >
            {item.phase}
          </div>
          <div>
            <div
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '18px',
                fontWeight: 700,
                color: '#FDFAF6',
                marginBottom: '3px',
              }}
            >
              {item.title}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(253,250,246,0.45)', letterSpacing: '0.04em' }}>
              {item.days}
            </div>
          </div>
        </div>
      ))}

      <div
        style={{
          marginTop: '28px',
          padding: '20px 24px',
          background: 'rgba(253,250,246,0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(253,250,246,0.08)',
        }}
      >
        <div
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '32px',
            fontWeight: 700,
            color: '#FDFAF6',
            letterSpacing: '-0.03em',
          }}
        >
          $24
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(253,250,246,0.4)', marginTop: '4px' }}>
          One-time · No subscription · 60-day guarantee
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ── Credit Guides ─────────────────────────────────────────────── */}
      <section
        id="guides"
        style={{
          padding: 'clamp(80px, 10vw, 140px) clamp(20px, 5vw, 80px)',
          background: '#FDFAF6',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section header */}
          <div style={{ marginBottom: '52px' }}>
            <span
              style={{
                display: 'block',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#B8955A',
                marginBottom: '14px',
              }}
            >
              Guides
            </span>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(28px, 4vw, 50px)',
                fontWeight: 700,
                color: '#1A1714',
                margin: 0,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
              }}
            >
              The credit library.
            </h2>
          </div>

          {/* Article cards */}
          <div className="fin-guides-grid">
            {GUIDES.map((guide, i) => (
              <Link
                key={guide.slug}
                href={`/articles/${guide.slug}`}
                className="fin-guide-card"
                style={{
                  display: 'block',
                  background: '#EEF3F1',
                  borderRadius: '16px',
                  padding: '32px 28px',
                  textDecoration: 'none',
                  color: 'inherit',
                  animation: 'ls-fade-up 0.7s ease forwards',
                  animationDelay: `${0.1 + i * 0.08}s`,
                  opacity: 0,
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#1D3A2F',
                    marginBottom: '14px',
                  }}
                >
                  Finance
                </span>
                <h3
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: 'clamp(17px, 2vw, 22px)',
                    fontWeight: 700,
                    color: '#1A1714',
                    margin: '0 0 20px',
                    lineHeight: 1.3,
                    letterSpacing: '-0.015em',
                  }}
                >
                  {guide.title}
                </h3>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#6B6557',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <circle cx="6" cy="6" r="5" stroke="#6B6557" strokeWidth="1.2" />
                      <path d="M6 3.5v2.75l1.5 1.5" stroke="#6B6557" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    {guide.readTime} read
                  </span>
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#1D3A2F',
                    }}
                  >
                    Read →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial ───────────────────────────────────────────────────── */}
      <section style={{
        background: '#F0EDE8',
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <CategoryEditorial
            articles={articles}
            categoryLabel="Finance"
            categorySlug="finance"
          />
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section
        style={{
          background: '#FDFAF6',
          padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)',
          borderTop: '1px solid rgba(184,149,90,0.12)',
        }}
      >
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ marginBottom: '52px' }}>
            <span
              style={{
                display: 'block',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#B8955A',
                marginBottom: '14px',
              }}
            >
              FAQ
            </span>
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(28px, 4vw, 50px)',
                fontWeight: 700,
                color: '#1A1714',
                margin: 0,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
              }}
            >
              Common questions.
            </h2>
          </div>

          <FinanceFAQ />
        </div>
      </section>

      <style>{`
        @keyframes ls-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        html { scroll-behavior: smooth; }

        ::selection {
          background: rgba(184,149,90,0.22);
          color: #1A1714;
        }

        /* Steps grid */
        .fin-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* Guides grid */
        .fin-guides-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* Guide card hover */
        .fin-guide-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .fin-guide-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(29,58,47,0.10);
        }

        /* Step card hover */
        .fin-step-card {
          transition: transform 0.25s ease;
        }
        .fin-step-card:hover {
          transform: translateY(-3px);
        }

        /* CTA button hovers */
        .fin-cta-primary:hover {
          background: #a07e4a !important;
          transform: translateY(-1px);
        }
        .fin-cta-outline:hover {
          border-color: rgba(253,250,246,0.7) !important;
        }
        .fin-qualify-btn:hover {
          background: #a07e4a !important;
        }
        .fin-howitworks-btn:hover {
          border-color: rgba(253,250,246,0.6) !important;
          color: #FDFAF6 !important;
        }

        /* Stat card hover */
        .fin-stat-card {
          transition: background 0.2s, border-color 0.2s;
        }
        .fin-stat-card:hover {
          background: rgba(253,250,246,0.09) !important;
          border-color: rgba(184,149,90,0.25) !important;
        }

        /* Credit tools grid responsive */
        @media (max-width: 900px) {
          .fin-drive-grid,
          .fin-slam-grid {
            grid-template-columns: 1fr !important;
          }
          .fin-steps-grid {
            grid-template-columns: 1fr !important;
          }
          .fin-guides-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 640px) {
          .fin-guides-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* Product feature grid */
        @media (max-width: 768px) {
          .fin-product-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <NextIntlClientProvider locale="en" messages={enMessages} now={new Date()} timeZone="UTC" formats={{}}>
        <LifestyleFooter />
      </NextIntlClientProvider>
    </div>
  )
}
