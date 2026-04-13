import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import LifestyleNav from '@/components/lifestyle/LifestyleNav'
import LifestyleFooter from '@/components/lifestyle/LifestyleFooter'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Privacy Policy — Mintbrooks',
  description:
    'How Mintbrooks handles your data, what we collect, how we use it, and your rights as a reader.',
  openGraph: {
    title: 'Privacy Policy — Mintbrooks',
    description: 'How Mintbrooks handles your data, what we collect, and your rights.',
    type: 'website',
  },
}

export default function PrivacyPage() {
  return (
    <div
      className={playfair.variable}
      style={{ background: '#FDFAF6', minHeight: '100vh' }}
    >
      <LifestyleNav />

      {/* ── Page Header ──────────────────────────────────────────────────────── */}
      <section
        style={{
          background: '#FDFAF6',
          padding: '140px clamp(20px, 5vw, 80px) 60px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#B8955A',
            marginBottom: '20px',
            opacity: 0,
            animation: 'ls-fade-up 0.6s ease forwards',
          }}
        >
          Privacy Policy
        </div>
        <h1
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 700,
            color: '#1A1714',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '16px',
            opacity: 0,
            animation: 'ls-fade-up 0.6s ease 0.1s forwards',
          }}
        >
          How we handle your data.
        </h1>
        <p
          style={{
            fontSize: '14px',
            color: '#6B6557',
            opacity: 0,
            animation: 'ls-fade-up 0.6s ease 0.2s forwards',
          }}
        >
          Last updated: April 2026
        </p>
      </section>

      {/* ── Policy Body ──────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '0 clamp(20px, 5vw, 80px) clamp(80px, 10vw, 140px)',
        }}
      >
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
          }}
        >
          {/* Intro */}
          <p style={bodyStyle}>
            Mintbrooks is committed to protecting your privacy. This policy explains what
            information we collect, how we use it, and what choices you have. We've written it
            in plain language because we believe you deserve to understand what's happening with
            your data.
          </p>

          {/* Section 1 */}
          <h2 style={headingStyle}>What we collect</h2>
          <p style={bodyStyle}>
            We collect information you give us directly and information we gather automatically
            when you visit the site.
          </p>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <strong style={strongStyle}>Email addresses.</strong> If you sign up for the
              Mintbrooks newsletter, we collect your email address. That's all we ask for.
            </li>
            <li style={listItemStyle}>
              <strong style={strongStyle}>Analytics data.</strong> We collect anonymized data
              about how visitors use the site — which pages are popular, how long people spend
              reading, and where traffic comes from. This data does not identify you personally.
            </li>
            <li style={listItemStyle}>
              <strong style={strongStyle}>Affiliate click data.</strong> When you click a
              product link, our affiliate partners may set a cookie to track whether a purchase
              was made. This allows us to earn a commission and is disclosed throughout the site.
            </li>
          </ul>

          {/* Section 2 */}
          <h2 style={headingStyle}>How we use your information</h2>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <strong style={strongStyle}>Newsletter delivery.</strong> If you subscribed, we
              use your email address to send the weekly Mintbrooks editorial newsletter. You can
              unsubscribe at any time using the link in every email.
            </li>
            <li style={listItemStyle}>
              <strong style={strongStyle}>Content improvement.</strong> Analytics data helps us
              understand what topics readers find valuable so we can produce more of it.
            </li>
            <li style={listItemStyle}>
              <strong style={strongStyle}>Affiliate performance.</strong> Click and purchase data
              help us understand which product categories our readers find useful and which
              affiliate partnerships are worth maintaining.
            </li>
          </ul>

          {/* Section 3 */}
          <h2 style={headingStyle}>Third parties we work with</h2>
          <p style={bodyStyle}>
            We use a small number of trusted third-party services to operate the site:
          </p>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <strong style={strongStyle}>Amazon Associates.</strong> When you click a product
              link from Amazon on our site, Amazon may set cookies according to their own privacy
              policy.
            </li>
            <li style={listItemStyle}>
              <strong style={strongStyle}>MaxBounty.</strong> We participate in MaxBounty's
              affiliate network for certain financial product recommendations.
            </li>
            <li style={listItemStyle}>
              <strong style={strongStyle}>Plausible Analytics.</strong> We use Plausible for
              privacy-respecting, cookie-free traffic analytics. Plausible does not track
              individuals across sites.
            </li>
            <li style={listItemStyle}>
              <strong style={strongStyle}>Google Analytics.</strong> We may use Google Analytics
              for additional measurement. Google's data practices are governed by their own
              privacy policy.
            </li>
          </ul>
          <p style={bodyStyle}>
            We do not sell, rent, or trade your personal information to any third party.
          </p>

          {/* Section 4 */}
          <h2 style={headingStyle}>Your rights</h2>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <strong style={strongStyle}>Unsubscribe anytime.</strong> Every newsletter we
              send includes a one-click unsubscribe link. We will remove you from our list
              immediately.
            </li>
            <li style={listItemStyle}>
              <strong style={strongStyle}>Request deletion.</strong> You can request that we
              delete any personal data we hold about you by emailing us. We will process your
              request within 30 days.
            </li>
            <li style={listItemStyle}>
              <strong style={strongStyle}>Opt out of analytics.</strong> If you prefer not to
              be included in our analytics, you can use a browser extension that blocks tracking
              scripts, or enable the Do Not Track header in your browser.
            </li>
          </ul>

          {/* Section 5 */}
          <h2 style={headingStyle}>Cookies</h2>
          <p style={bodyStyle}>
            Mintbrooks itself does not use tracking cookies for advertising. Our affiliate
            partners (Amazon, MaxBounty) may set cookies when you click through to their sites.
            You can manage and delete cookies through your browser settings at any time.
          </p>

          {/* Contact */}
          <div
            style={{
              marginTop: '56px',
              padding: '32px',
              background: '#F0EDE8',
              borderRadius: '16px',
            }}
          >
            <h2
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '22px',
                fontWeight: 700,
                color: '#1A1714',
                marginBottom: '12px',
              }}
            >
              Questions?
            </h2>
            <p style={{ ...bodyStyle, marginBottom: 0 }}>
              If you have any questions about this privacy policy or how we handle your data,
              please reach out:{' '}
              <a
                href="mailto:privacy@mintbrooks.com"
                style={{
                  color: '#1D3A2F',
                  textDecoration: 'none',
                  fontWeight: 600,
                  borderBottom: '1px solid rgba(29,58,47,0.3)',
                }}
              >
                privacy@mintbrooks.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <LifestyleFooter />

      <style>{`
        @keyframes ls-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

// ─── Shared Styles ────────────────────────────────────────────────────────────

const headingStyle: React.CSSProperties = {
  fontFamily: '"Playfair Display", Georgia, serif',
  fontSize: 'clamp(20px, 2.5vw, 26px)',
  fontWeight: 700,
  color: '#1A1714',
  lineHeight: 1.2,
  letterSpacing: '-0.015em',
  marginTop: '52px',
  marginBottom: '16px',
}

const bodyStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#6B6557',
  lineHeight: 1.8,
  marginBottom: '20px',
}

const listStyle: React.CSSProperties = {
  paddingLeft: '0',
  listStyle: 'none',
  marginBottom: '20px',
}

const listItemStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#6B6557',
  lineHeight: 1.8,
  marginBottom: '16px',
  paddingLeft: '20px',
  borderLeft: '2px solid rgba(184,149,90,0.35)',
}

const strongStyle: React.CSSProperties = {
  color: '#1A1714',
  fontWeight: 600,
}
