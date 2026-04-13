'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { label: 'Daily Brief', href: '/brief', icon: '☀️' },
  { label: 'Inventory', href: '/inventory', icon: '📦' },
  { label: 'Customer Service', href: '/customer-service', icon: '💬' },
  { label: 'Returns Intelligence', href: '/returns', icon: '↩️' },
  { label: 'Content', href: '/content', icon: '✍️' },
  { label: 'Product Launch', href: '/launch', icon: '🚀' },
  { label: 'SKU Reports', href: '/reports', icon: '📊' },
  { label: 'BFCM Prep', href: '/bfcm', icon: '🔥' },
  { label: 'Guides', href: '/guides', icon: '📖' },
]

export default function DashboardNav() {
  const pathname = usePathname()

  return (
    <aside style={{
      width: '240px',
      minHeight: '100vh',
      background: '#0f1624',
      borderRight: '1px solid #1e293b',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #1e293b' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #f97316, #8b5cf6)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
            🧠
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '14px', color: '#f1f5f9' }}>Ops Brain</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Velocity Athletics</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ padding: '16px 12px', flex: 1 }}>
        <div style={{ marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px' }}>
            Operations
          </span>
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 10px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#f1f5f9' : '#64748b',
                background: isActive ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
                borderLeft: isActive ? '2px solid #f97316' : '2px solid transparent',
                marginBottom: '2px',
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Store info */}
      <div style={{ padding: '16px', borderTop: '1px solid #1e293b' }}>
        <div style={{
          background: 'rgba(249, 115, 22, 0.08)',
          border: '1px solid rgba(249, 115, 22, 0.2)',
          borderRadius: '10px',
          padding: '12px',
        }}>
          <div style={{ fontSize: '11px', color: '#f97316', fontWeight: 600, marginBottom: '4px' }}>SCALE PLAN</div>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>500 AI actions left this month</div>
          <div style={{ marginTop: '8px', height: '4px', background: '#1e293b', borderRadius: '2px' }}>
            <div style={{ width: '65%', height: '100%', background: 'linear-gradient(90deg, #f97316, #8b5cf6)', borderRadius: '2px' }}></div>
          </div>
        </div>
      </div>
    </aside>
  )
}
