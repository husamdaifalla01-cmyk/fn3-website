import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shopify Operations Guides | E-commerce Ops Brain',
  description: 'Free guides on Shopify inventory management, customer service automation, stockout prevention, and AI-powered operations. Built for serious DTC merchants.',
}

const GUIDES = [
  {
    href: '/guides/shopify-stockout-prevention',
    badge: 'INVENTORY',
    badgeColor: '#f97316',
    badgeBg: 'rgba(249, 115, 22, 0.1)',
    badgeBorder: 'rgba(249, 115, 22, 0.3)',
    title: 'Shopify Stockout Prevention: How to Never Lose a Sale to Out-of-Stock',
    excerpt: 'Velocity-based forecasting, days-to-stockout formulas, reorder point calculations, and automated alerts. The complete system for eliminating stockouts from your Shopify store.',
    readTime: '9 min read',
  },
  {
    href: '/guides/shopify-customer-service-templates',
    badge: 'CUSTOMER SERVICE',
    badgeColor: '#8b5cf6',
    badgeBg: 'rgba(139, 92, 246, 0.1)',
    badgeBorder: 'rgba(139, 92, 246, 0.3)',
    title: '15 Shopify Customer Service Templates (WISMO, Refunds, Damaged Items)',
    excerpt: 'Copy-paste templates for every ticket type your support team handles daily. WISMO responses, refund approvals and denials, damaged items, wrong items, delay notifications, and win-back emails.',
    readTime: '8 min read',
  },
  {
    href: '/guides/shopify-inventory-management-tips',
    badge: 'INVENTORY',
    badgeColor: '#f97316',
    badgeBg: 'rgba(249, 115, 22, 0.1)',
    badgeBorder: 'rgba(249, 115, 22, 0.3)',
    title: '10 Shopify Inventory Management Tips That Prevent Lost Revenue',
    excerpt: 'Safety stock formulas, ABC analysis (Hero / Steady / Dead), seasonal multipliers, multi-location strategy, supplier lead time tracking, dead stock liquidation, and BFCM timing.',
    readTime: '12 min read',
  },
  {
    href: '/guides/ecommerce-customer-service-ai',
    badge: 'AI AUTOMATION',
    badgeColor: '#06b6d4',
    badgeBg: 'rgba(6, 182, 212, 0.1)',
    badgeBorder: 'rgba(6, 182, 212, 0.3)',
    title: 'AI Customer Service for E-commerce: How to Automate 74% of Tickets',
    excerpt: 'Which ticket types AI handles best, resolution rate benchmarks, the system prompt pattern, Gorgias vs. Zendesk + Claude comparison, and a full cost breakdown vs. human agents.',
    readTime: '11 min read',
  },
]

export default function GuidesIndex() {
  return (
    <div style={{ background: '#080c14', color: '#f1f5f9', minHeight: '100vh' }}>
      {/* Navigation */}
      <nav style={{ borderBottom: '1px solid #1e293b', position: 'sticky', top: 0, zIndex: 50, background: 'rgba(8, 12, 20, 0.95)', backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #f97316, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
              🧠
            </div>
            <span style={{ fontWeight: 700, fontSize: '18px' }}>Ops Brain</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/guides" style={{ color: '#f97316', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>Guides</Link>
            <Link href="/auth/signup" style={{
              background: '#f97316',
              color: 'white',
              padding: '8px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
            }}>
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '72px 24px 48px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '100px', padding: '5px 14px', marginBottom: '20px' }}>
          <span style={{ fontSize: '12px', color: '#f97316', fontWeight: 600 }}>FREE RESOURCES</span>
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-0.02em' }}>
          Shopify Operations Guides
        </h1>
        <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: 1.7, maxWidth: '600px' }}>
          Practical guides on inventory management, customer service automation, and AI-powered operations for Shopify merchants. No fluff — just formulas, frameworks, and systems that work.
        </p>
      </div>

      {/* Guide cards */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 100px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {GUIDES.map((guide, i) => (
            <Link
              key={i}
              href={guide.href}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{
                background: '#0f1624',
                border: '1px solid #1e293b',
                borderRadius: '16px',
                padding: '32px',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '260px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', background: guide.badgeBg, border: `1px solid ${guide.badgeBorder}`, borderRadius: '100px', padding: '4px 12px', marginBottom: '14px' }}>
                      <span style={{ fontSize: '11px', color: guide.badgeColor, fontWeight: 700, letterSpacing: '0.06em' }}>{guide.badge}</span>
                    </div>
                    <h2 style={{ fontSize: '20px', fontWeight: 700, lineHeight: 1.3, marginBottom: '12px', letterSpacing: '-0.01em', color: '#f1f5f9' }}>
                      {guide.title}
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
                      {guide.excerpt}
                    </p>
                  </div>
                  <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                    <span style={{ fontSize: '13px', color: '#475569' }}>{guide.readTime}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f97316', fontSize: '14px', fontWeight: 600 }}>
                      Read guide
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: '64px', background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(139,92,246,0.08))', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>
            Ready to Put These Systems on Autopilot?
          </h3>
          <p style={{ color: '#94a3b8', marginBottom: '28px', fontSize: '15px', maxWidth: '480px', margin: '0 auto 28px' }}>
            E-commerce Ops Brain automates the inventory, customer service, and content workflows covered in these guides — directly inside your Shopify store.
          </p>
          <Link href="/auth/signup" style={{
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            color: 'white',
            padding: '14px 32px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 700,
            boxShadow: '0 0 40px rgba(249, 115, 22, 0.3)',
            display: 'inline-block',
          }}>
            Start Free Trial — 14 Days Free
          </Link>
          <p style={{ marginTop: '14px', fontSize: '13px', color: '#64748b' }}>No credit card required.</p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1e293b', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #f97316, #8b5cf6)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
              🧠
            </div>
            <span style={{ fontWeight: 700, fontSize: '16px' }}>E-commerce Ops Brain</span>
          </Link>
          <p style={{ color: '#475569', fontSize: '14px', margin: 0 }}>
            © 2026 E-commerce Ops Brain. Built for merchants who mean business.
          </p>
        </div>
      </footer>
    </div>
  )
}
