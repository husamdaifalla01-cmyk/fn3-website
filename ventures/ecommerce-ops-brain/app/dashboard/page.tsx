'use client'

import Link from 'next/link'
import { mockProducts, mockTickets, getDaysUntilStockout, getUrgencyLevel } from '@/lib/mock-data'

function StatCard({ label, value, sub, color }: { label: string, value: string, sub: string, color: string }) {
  return (
    <div style={{
      background: '#0f1624',
      border: '1px solid #1e293b',
      borderRadius: '12px',
      padding: '20px 24px',
    }}>
      <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px', fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: '32px', fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: '12px', color: '#475569', marginTop: '6px' }}>{sub}</div>
    </div>
  )
}

function AlertCard({ urgency, product, message, action, href }: { urgency: 'critical' | 'warning' | 'info', product: string, message: string, action: string, href: string }) {
  const colors = {
    critical: { bg: 'rgba(239, 68, 68, 0.08)', border: 'rgba(239, 68, 68, 0.3)', badge: '#ef4444', badgeBg: 'rgba(239, 68, 68, 0.15)', label: 'CRITICAL' },
    warning: { bg: 'rgba(249, 115, 22, 0.08)', border: 'rgba(249, 115, 22, 0.3)', badge: '#f97316', badgeBg: 'rgba(249, 115, 22, 0.15)', label: 'WARNING' },
    info: { bg: 'rgba(139, 92, 246, 0.08)', border: 'rgba(139, 92, 246, 0.3)', badge: '#8b5cf6', badgeBg: 'rgba(139, 92, 246, 0.15)', label: 'ACTION' },
  }
  const c = colors[urgency]
  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: '12px',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <span style={{ background: c.badgeBg, color: c.badge, fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '100px', flexShrink: 0 }}>
          {c.label}
        </span>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px', color: '#f1f5f9' }}>{product}</div>
          <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>{message}</div>
        </div>
      </div>
      <Link href={href} style={{
        background: c.badge,
        color: 'white',
        padding: '6px 14px',
        borderRadius: '6px',
        textDecoration: 'none',
        fontSize: '13px',
        fontWeight: 600,
        flexShrink: 0,
      }}>
        {action}
      </Link>
    </div>
  )
}

export default function DashboardPage() {
  const criticalProducts = mockProducts.filter(p => getUrgencyLevel(p) === 'critical')
  const warningProducts = mockProducts.filter(p => getUrgencyLevel(p) === 'warning')
  const pendingTickets = mockTickets.filter(t => t.status === 'pending')

  // Calculate store health score
  const healthScore = Math.max(0, 100 - (criticalProducts.length * 15) - (warningProducts.length * 5) - (pendingTickets.length * 3))

  const recentActivity = [
    { time: '2 hours ago', event: 'AI generated reply draft for Sarah M. — return request', icon: '💬' },
    { time: '5 hours ago', event: 'Inventory alert: Running Vest below reorder point', icon: '📦' },
    { time: '8 hours ago', event: 'Product description generated for Compression Tights', icon: '✍️' },
    { time: '12 hours ago', event: 'AI generated reply draft for Mike D. — complaint', icon: '💬' },
    { time: '1 day ago', event: 'Inventory forecast updated — 8 products analyzed', icon: '📊' },
  ]

  return (
    <div style={{ padding: '32px', maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>
          Good morning, Alex 👋
        </h1>
        <p style={{ color: '#64748b', fontSize: '15px' }}>
          Here&apos;s what needs your attention today — {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Store Health Score */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(139,92,246,0.1))',
        border: '1px solid rgba(249, 115, 22, 0.3)',
        borderRadius: '16px',
        padding: '24px 28px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
      }}>
        <div>
          <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500, marginBottom: '6px' }}>STORE HEALTH SCORE</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '56px', fontWeight: 900, background: 'linear-gradient(135deg, #f97316, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>
              {healthScore}
            </span>
            <span style={{ fontSize: '24px', color: '#64748b', fontWeight: 600 }}>/100</span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
            {healthScore >= 80 ? 'Excellent — your store is running smoothly' :
             healthScore >= 60 ? 'Good — a few things need attention' :
             'Needs attention — act on the alerts below'}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 800, color: criticalProducts.length > 0 ? '#ef4444' : '#22c55e' }}>{criticalProducts.length}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Critical Stock</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 800, color: pendingTickets.length > 0 ? '#f97316' : '#22c55e' }}>{pendingTickets.length}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Open Tickets</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#22c55e' }}>$2.4K</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Saved Today</div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <StatCard label="Today's Revenue" value="$4,821" sub="↑ 12% vs yesterday" color="#22c55e" />
        <StatCard label="Orders Today" value="47" sub="↑ 8 from yesterday" color="#f1f5f9" />
        <StatCard label="Avg Response Time" value="8min" sub="↓ 94% with AI" color="#f97316" />
        <StatCard label="Content Generated" value="23" sub="pieces this month" color="#8b5cf6" />
      </div>

      {/* Urgent Alerts */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Urgent Alerts
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {criticalProducts.slice(0, 2).map(p => (
            <AlertCard
              key={p.id}
              urgency="critical"
              product={p.title}
              message={p.current_stock === 0 ? 'Out of stock — losing sales now' : `${p.current_stock} units left — ${getDaysUntilStockout(p)} days until stockout`}
              action="Reorder Now"
              href="/inventory"
            />
          ))}
          {pendingTickets.slice(0, 1).map(t => (
            <AlertCard
              key={t.id}
              urgency="warning"
              product={`${t.customer_name} — ${t.ticket_type}`}
              message={t.subject || 'Customer awaiting response'}
              action="Reply"
              href="/customer-service"
            />
          ))}
          <AlertCard
            urgency="info"
            product="Content Opportunity"
            message="You have 3 products without optimized descriptions — missing SEO traffic"
            action="Generate"
            href="/content"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {[
            { label: 'Generate All AI Replies', icon: '💬', href: '/customer-service', desc: '4 tickets waiting' },
            { label: 'Run Inventory Forecast', icon: '📦', href: '/inventory', desc: '8 products to check' },
            { label: 'Generate Product Content', icon: '✍️', href: '/content', desc: 'Create descriptions & ads' },
            { label: 'Draft Supplier Email', icon: '🤝', href: '/content', desc: 'Negotiate better pricing' },
          ].map((action, i) => (
            <Link key={i} href={action.href} style={{
              background: '#0f1624',
              border: '1px solid #1e293b',
              borderRadius: '12px',
              padding: '18px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              display: 'block',
            }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>{action.icon}</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9', marginBottom: '4px' }}>{action.label}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{action.desc}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Recent Activity
        </h2>
        <div style={{
          background: '#0f1624',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          {recentActivity.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '14px 20px',
              borderBottom: i < recentActivity.length - 1 ? '1px solid #1e293b' : 'none',
            }}>
              <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
              <span style={{ flex: 1, fontSize: '14px', color: '#cbd5e1' }}>{item.event}</span>
              <span style={{ fontSize: '12px', color: '#475569', flexShrink: 0 }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
