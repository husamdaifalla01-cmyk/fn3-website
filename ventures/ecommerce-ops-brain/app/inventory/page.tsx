'use client'

import { useState } from 'react'
import { mockProducts, getDaysUntilStockout, getUrgencyLevel, getRecommendedReorderQty } from '@/lib/mock-data'

type Product = typeof mockProducts[0]

function UrgencyBadge({ level }: { level: 'critical' | 'warning' | 'ok' }) {
  const styles = {
    critical: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', label: 'Critical' },
    warning: { bg: 'rgba(249, 115, 22, 0.15)', color: '#f97316', label: 'Warning' },
    ok: { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', label: 'OK' },
  }
  const s = styles[level]
  return (
    <span style={{ background: s.bg, color: s.color, fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '100px' }}>
      {s.label}
    </span>
  )
}

function DaysBar({ days }: { days: number }) {
  const pct = Math.min(100, (days / 60) * 100)
  const color = days <= 7 ? '#ef4444' : days <= 21 ? '#f97316' : '#22c55e'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '120px' }}>
      <div style={{ flex: 1, height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '3px', transition: 'width 0.3s' }}></div>
      </div>
      <span style={{ fontSize: '13px', color, fontWeight: 600, minWidth: '32px' }}>
        {days >= 999 ? '∞' : `${days}d`}
      </span>
    </div>
  )
}

export default function InventoryPage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [generating, setGenerating] = useState<string | null>(null)
  const [generatedEmail, setGeneratedEmail] = useState<{ productId: string, email: string } | null>(null)
  const [sortBy, setSortBy] = useState<'urgency' | 'stock' | 'days'>('urgency')
  const [filterBy, setFilterBy] = useState<'all' | 'critical' | 'warning' | 'ok'>('all')

  const sorted = [...mockProducts]
    .filter(p => filterBy === 'all' ? true : getUrgencyLevel(p) === filterBy)
    .sort((a, b) => {
      if (sortBy === 'urgency') {
        const order = { critical: 0, warning: 1, ok: 2 }
        return order[getUrgencyLevel(a)] - order[getUrgencyLevel(b)]
      }
      if (sortBy === 'stock') return a.current_stock - b.current_stock
      return getDaysUntilStockout(a) - getDaysUntilStockout(b)
    })

  const toggleSelect = (id: string) => {
    setSelectedProducts(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id])
  }

  async function generateReorderEmail(product: Product) {
    setGenerating(product.id)
    setGeneratedEmail(null)
    try {
      const res = await fetch('/api/inventory-forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: [product],
          storeInfo: { name: 'Velocity Athletics' },
        }),
      })
      const data = await res.json()
      if (data.results?.[0]?.supplierEmail) {
        setGeneratedEmail({ productId: product.id, email: data.results[0].supplierEmail })
      }
    } catch (err) {
      console.error(err)
    }
    setGenerating(null)
  }

  async function generateBulkReorder() {
    const products = mockProducts.filter(p => selectedProducts.includes(p.id))
    if (products.length === 0) return
    setGenerating('bulk')
    try {
      const res = await fetch('/api/inventory-forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products,
          storeInfo: { name: 'Velocity Athletics' },
        }),
      })
      const data = await res.json()
      if (data.results?.[0]?.supplierEmail) {
        setGeneratedEmail({ productId: 'bulk', email: data.results.map((r: { productTitle: string, supplierEmail: string }) => `=== ${r.productTitle} ===\n${r.supplierEmail}`).join('\n\n') })
      }
    } catch (err) {
      console.error(err)
    }
    setGenerating(null)
  }

  const criticalCount = mockProducts.filter(p => getUrgencyLevel(p) === 'critical').length
  const warningCount = mockProducts.filter(p => getUrgencyLevel(p) === 'warning').length

  return (
    <div style={{ padding: '32px', maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>
            Inventory Intelligence
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px' }}>
            Real-time stock monitoring with 30-day forecast accuracy of 99.2%
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {selectedProducts.length > 0 && (
            <button
              onClick={generateBulkReorder}
              disabled={generating === 'bulk'}
              style={{
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: generating === 'bulk' ? 'wait' : 'pointer',
              }}
            >
              {generating === 'bulk' ? 'Generating...' : `Generate Bulk Reorder (${selectedProducts.length})`}
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: 'Total Products', value: mockProducts.length.toString(), color: '#f1f5f9' },
          { label: 'Critical Stock', value: criticalCount.toString(), color: '#ef4444' },
          { label: 'Warning', value: warningCount.toString(), color: '#f97316' },
          { label: 'Healthy', value: (mockProducts.length - criticalCount - warningCount).toString(), color: '#22c55e' },
        ].map((stat, i) => (
          <div key={i} style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '12px', padding: '18px 20px' }}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '6px', fontWeight: 500 }}>{stat.label}</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Filter:</span>
        {(['all', 'critical', 'warning', 'ok'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilterBy(f)}
            style={{
              padding: '5px 14px',
              borderRadius: '100px',
              fontSize: '13px',
              fontWeight: 500,
              border: '1px solid',
              cursor: 'pointer',
              borderColor: filterBy === f ? '#f97316' : '#1e293b',
              background: filterBy === f ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
              color: filterBy === f ? '#f97316' : '#64748b',
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginLeft: '12px' }}>Sort:</span>
        {(['urgency', 'stock', 'days'] as const).map(s => (
          <button
            key={s}
            onClick={() => setSortBy(s)}
            style={{
              padding: '5px 14px',
              borderRadius: '100px',
              fontSize: '13px',
              fontWeight: 500,
              border: '1px solid',
              cursor: 'pointer',
              borderColor: sortBy === s ? '#8b5cf6' : '#1e293b',
              background: sortBy === s ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
              color: sortBy === s ? '#8b5cf6' : '#64748b',
            }}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px' }}>
        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '40px 2fr 1fr 90px 100px 120px 140px 120px',
          gap: '0',
          padding: '12px 20px',
          borderBottom: '1px solid #1e293b',
          fontSize: '11px',
          fontWeight: 700,
          color: '#475569',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          <div></div>
          <div>Product</div>
          <div>SKU</div>
          <div>Stock</div>
          <div>Daily Sales</div>
          <div>Days Left</div>
          <div>Reorder Point</div>
          <div>Action</div>
        </div>

        {sorted.map((product, i) => {
          const urgency = getUrgencyLevel(product)
          const days = getDaysUntilStockout(product)
          const isSelected = selectedProducts.includes(product.id)
          const rowBg = urgency === 'critical' ? 'rgba(239, 68, 68, 0.04)' : urgency === 'warning' ? 'rgba(249, 115, 22, 0.04)' : 'transparent'

          return (
            <div key={product.id}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '40px 2fr 1fr 90px 100px 120px 140px 120px',
                gap: '0',
                padding: '14px 20px',
                borderBottom: i < sorted.length - 1 ? '1px solid #1e293b' : 'none',
                background: isSelected ? 'rgba(249, 115, 22, 0.06)' : rowBg,
                alignItems: 'center',
              }}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleSelect(product.id)}
                  style={{ accentColor: '#f97316', width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#f1f5f9', marginBottom: '3px' }}>{product.title}</div>
                  <UrgencyBadge level={urgency} />
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', fontFamily: 'monospace' }}>{product.sku}</div>
                <div style={{ fontWeight: 700, fontSize: '16px', color: product.current_stock === 0 ? '#ef4444' : urgency === 'critical' ? '#ef4444' : '#f1f5f9' }}>
                  {product.current_stock}
                </div>
                <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                  {product.avg_daily_sales}/day
                </div>
                <DaysBar days={days} />
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  {product.reorder_point ? `${product.reorder_point} units` : '—'}
                  <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>
                    Reorder: {getRecommendedReorderQty(product)} units
                  </div>
                </div>
                <button
                  onClick={() => generateReorderEmail(product)}
                  disabled={generating === product.id}
                  style={{
                    background: urgency === 'critical' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(249, 115, 22, 0.1)',
                    color: urgency === 'critical' ? '#ef4444' : '#f97316',
                    border: `1px solid ${urgency === 'critical' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(249, 115, 22, 0.3)'}`,
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: generating === product.id ? 'wait' : 'pointer',
                  }}
                >
                  {generating === product.id ? '...' : 'Email Supplier'}
                </button>
              </div>

              {/* Expanded email */}
              {generatedEmail?.productId === product.id && (
                <div style={{
                  padding: '20px 24px',
                  background: 'rgba(249, 115, 22, 0.05)',
                  borderTop: '1px solid rgba(249, 115, 22, 0.2)',
                  borderBottom: i < sorted.length - 1 ? '1px solid #1e293b' : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#f97316' }}>AI-Generated Supplier Email</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => navigator.clipboard.writeText(generatedEmail.email)}
                        style={{ background: 'rgba(249, 115, 22, 0.15)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.3)', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => setGeneratedEmail(null)}
                        style={{ background: 'transparent', color: '#64748b', border: '1px solid #1e293b', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                  <pre style={{ whiteSpace: 'pre-wrap', fontSize: '13px', color: '#cbd5e1', lineHeight: 1.7, fontFamily: 'inherit', margin: 0 }}>
                    {generatedEmail.email}
                  </pre>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Bulk email result */}
      {generatedEmail?.productId === 'bulk' && (
        <div style={{
          background: '#0f1624',
          border: '1px solid rgba(249, 115, 22, 0.3)',
          borderRadius: '16px',
          padding: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f97316' }}>Bulk Reorder Emails Generated</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => navigator.clipboard.writeText(generatedEmail.email)}
                style={{ background: 'rgba(249, 115, 22, 0.15)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.3)', padding: '6px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                Copy All
              </button>
              <button
                onClick={() => setGeneratedEmail(null)}
                style={{ background: 'transparent', color: '#64748b', border: '1px solid #1e293b', padding: '6px 16px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}
              >
                Dismiss
              </button>
            </div>
          </div>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '13px', color: '#cbd5e1', lineHeight: 1.7, fontFamily: 'inherit', margin: 0 }}>
            {generatedEmail.email}
          </pre>
        </div>
      )}
    </div>
  )
}
