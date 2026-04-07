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
  title: 'Terms of Service — Mintbrooks',
  description:
    "The terms of use for Mintbrooks \u2014 what the site is, what it isn't, and how we work.",
  openGraph: {
    title: 'Terms of Service — Mintbrooks',
    description: 'The terms of use for Mintbrooks — plain English, no legalese.',
    type: 'website',
  },
}

export default function TermsPage() {
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
          Terms of Service
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
          The rules, in plain English.
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

      {/* ── Terms Body ───────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '0 clamp(20px, 5vw, 80px) clamp(80px, 10vw, 140px)',
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {/* Intro */}
          <p style={bodyStyle}>
            By using the Mintbrooks website, you agree to these terms. We've written them as
            clearly as we can. If something doesn't make sense, email us and we'll explain it.
          </p>

          {/* Section 1 */}
          <h2 style={headingStyle}>Use of the site</h2>
          <p style={bodyStyle}>
            Mintbrooks is an editorial publication. The content on this site — articles, product
            reviews, guides, and recommendations — is for informational and entertainment
            purposes only.
          </p>
          <p style={bodyStyle}>
            <strong style={strongStyle}>
              Nothing on Mintbrooks constitutes professional financial advice, medical advice,
              or legal advice.
            </strong>{' '}
            We are writers and researchers, not licensed financial advisors, doctors, or
            attorneys. Before making significant financial decisions or changes to your health
            routine, consult a qualified professional.
          </p>
          <p style={bodyStyle}>
            You agree to use this site for lawful purposes only and not to attempt to disrupt,
            scrape without permission, or reverse-engineer any part of it.
          </p>

          {/* Section 2 */}
          <h2 style={headingStyle}>Affiliate disclosure</h2>
          <p style={bodyStyle}>
            Mintbrooks participates in affiliate marketing programs. When you click a product
            link on our site and make a purchase, we may earn a commission. This is disclosed
            prominently throughout the site and applies to links from Amazon, MaxBounty, and
            other affiliate networks.
          </p>
          <p style={bodyStyle}>
            This commission comes at no extra cost to you. It does not influence our editorial
            decisions. We recommend products because they're good — not because they pay us
            more. For more detail, see our{' '}
            <a href="/lifestyle/about#disclosure" style={linkStyle}>
              full affiliate disclosure
            </a>
            .
          </p>

          {/* Section 3 */}
          <h2 style={headingStyle}>Intellectual property</h2>
          <p style={bodyStyle}>
            All content on Mintbrooks — including articles, copy, photography, and design — is
            the property of Mintbrooks and protected by copyright law.
          </p>
          <p style={bodyStyle}>
            You may share individual articles or quotes with proper attribution and a link back
            to the original URL. You may not reproduce, republish, or distribute Mintbrooks
            content in bulk, for commercial purposes, or without permission.
          </p>
          <p style={bodyStyle}>
            If you'd like to license our content or discuss a partnership, reach out at{' '}
            <a href="mailto:legal@mintbrooks.com" style={linkStyle}>
              legal@mintbrooks.com
            </a>
            .
          </p>

          {/* Section 4 */}
          <h2 style={headingStyle}>Disclaimer</h2>
          <p style={bodyStyle}>
            We work hard to make sure everything on Mintbrooks is accurate, well-researched,
            and up to date. But we cannot guarantee the accuracy, completeness, or continued
            relevance of any content.
          </p>
          <p style={bodyStyle}>
            Product formulations change. Prices fluctuate. Studies get revised. Financial
            regulations evolve. We update our recommendations regularly, but we are not liable
            for decisions made based on information that has since changed.
          </p>
          <p style={bodyStyle}>
            Mintbrooks is provided "as is" without any warranties. We are not responsible for
            any losses, damages, or outcomes arising from your use of this site or any
            information published on it.
          </p>

          {/* Section 5 */}
          <h2 style={headingStyle}>Changes to these terms</h2>
          <p style={bodyStyle}>
            We may update these terms from time to time. The "last updated" date at the top
            of this page will reflect any changes. Continued use of the site after changes are
            published constitutes acceptance of the updated terms.
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
              Questions about these terms?
            </h2>
            <p style={{ ...bodyStyle, marginBottom: 0 }}>
              We're happy to clarify anything. Reach out anytime:{' '}
              <a href="mailto:legal@mintbrooks.com" style={linkStyle}>
                legal@mintbrooks.com
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

const strongStyle: React.CSSProperties = {
  color: '#1A1714',
  fontWeight: 600,
}

const linkStyle: React.CSSProperties = {
  color: '#1D3A2F',
  textDecoration: 'none',
  fontWeight: 600,
  borderBottom: '1px solid rgba(29,58,47,0.3)',
}
