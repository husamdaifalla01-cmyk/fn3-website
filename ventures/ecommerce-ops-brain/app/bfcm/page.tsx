'use client'

import { useState, useEffect } from 'react'

const BFCM_DATE = new Date('2026-11-27T00:00:00')

function getDaysUntilBFCM(): number {
  const now = new Date()
  const diff = BFCM_DATE.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

const BFCM_TICKET_TYPES = [
  'Where is my order? (WISMO)',
  'Order arrived damaged',
  'Wrong item received',
  'Refund request',
  'Price match request',
  'Out of stock — when will it be back?',
  'Discount code not working',
  'Can I change/cancel my order?',
  'Return request',
  'Complaint about shipping delays',
]

const SAMPLE_PRODUCTS = [
  { name: 'Compression Running Tights', sku: 'CRT-001', price: 89.99 },
  { name: 'Performance Running Vest', sku: 'PRV-002', price: 129.99 },
  { name: 'Trail Running Shoes', sku: 'TRS-003', price: 159.99 },
  { name: 'Recovery Foam Roller', sku: 'RFR-004', price: 49.99 },
  { name: 'Hydration Belt', sku: 'HB-005', price: 39.99 },
]

type Module = 'inventory' | 'cs' | 'copy' | 'recovery'

export default function BFCMPage() {
  const [daysLeft, setDaysLeft] = useState(getDaysUntilBFCM())
  const [activeModule, setActiveModule] = useState<Module>('inventory')

  // Inventory Check state
  const [skuList, setSkuList] = useState('')
  const [inventoryResult, setInventoryResult] = useState<string | null>(null)
  const [inventoryLoading, setInventoryLoading] = useState(false)

  // CS Prep state
  const [csResults, setCsResults] = useState<string | null>(null)
  const [csLoading, setCsLoading] = useState(false)

  // Copy Blast state
  const [copyResults, setCopyResults] = useState<string | null>(null)
  const [copyLoading, setCopyLoading] = useState(false)

  // Recovery state
  const [recoveryResults, setRecoveryResults] = useState<string | null>(null)
  const [recoveryLoading, setRecoveryLoading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setDaysLeft(getDaysUntilBFCM()), 60000)
    return () => clearInterval(interval)
  }, [])

  async function runInventoryCheck() {
    setInventoryLoading(true)
    setInventoryResult(null)
    try {
      const lines = skuList.trim().split('\n').filter(Boolean)
      const products = lines.map((line, i) => {
        const parts = line.split(',').map(s => s.trim())
        return {
          id: `bfcm-${i}`,
          title: parts[0] || `Product ${i + 1}`,
          sku: parts[1] || null,
          current_stock: parseInt(parts[2] || '100') || 100,
          avg_daily_sales: parseFloat(parts[3] || '5') || 5,
          reorder_point: parseInt(parts[4] || '50') || 50,
          supplier: parts[5] || null,
          lead_time_days: parseInt(parts[6] || '14') || 14,
        }
      })

      // Apply 5x velocity spike for BFCM
      const bfcmProducts = products.map(p => ({
        ...p,
        avg_daily_sales: (p.avg_daily_sales || 5) * 5,
      }))

      const res = await fetch('/api/inventory-forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: bfcmProducts,
          storeInfo: { name: 'Your Store' },
        }),
      })
      const data = await res.json()
      if (data.results) {
        const summary = data.results.map((r: { productTitle: string; urgencyLevel: string; daysUntilStockout: number; recommendedReorderQty: number }) => {
          const risk = r.urgencyLevel === 'critical' ? '🔴 CRITICAL' : r.urgencyLevel === 'warning' ? '🟡 WARNING' : '🟢 OK'
          return `${risk} — ${r.productTitle}\n  At 5x BFCM velocity: stockout in ${r.daysUntilStockout >= 999 ? '∞' : r.daysUntilStockout} days\n  Recommended BFCM reorder qty: ${r.recommendedReorderQty} units`
        }).join('\n\n')
        setInventoryResult(summary)
      }
    } catch {
      setInventoryResult('Error running forecast. Check your input format.')
    }
    setInventoryLoading(false)
  }

  async function generateCSReplies() {
    setCsLoading(true)
    setCsResults(null)
    try {
      const res = await fetch('/api/reply-to-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketType: 'complaint',
          customerMessage: 'BFCM prep — generate all ticket type templates',
          orderInfo: { bfcmMode: true, ticketTypes: BFCM_TICKET_TYPES },
          storeInfo: { name: 'Your Store' },
          generateAllBFCM: true,
        }),
      })
      const data = await res.json()

      // Build responses for all 10 BFCM ticket types using multiple calls
      const results: string[] = []
      for (const ticketType of BFCM_TICKET_TYPES.slice(0, 5)) {
        const r = await fetch('/api/reply-to-customer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ticketType: 'wismo',
            customerMessage: `BFCM ticket: ${ticketType}. It's Black Friday/Cyber Monday. High volume period.`,
            orderInfo: { order_number: '#12345', status: 'processing', estimated_delivery: '3-5 business days' },
            storeInfo: { name: 'Your Store' },
          }),
        })
        const rd = await r.json()
        results.push(`=== ${ticketType.toUpperCase()} ===\n${rd.reply || 'No reply generated'}`)
      }

      // Use the data from first call for remaining
      void data
      setCsResults(results.join('\n\n---\n\n'))
    } catch {
      setCsResults('Error generating responses. Please try again.')
    }
    setCsLoading(false)
  }

  async function generateCopyBlast() {
    setCopyLoading(true)
    setCopyResults(null)
    try {
      const results: string[] = []
      for (const product of SAMPLE_PRODUCTS) {
        const r = await fetch('/api/generate-product-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productName: product.name,
            category: 'Athletic Gear',
            keyFeatures: `High-performance, BFCM sale price $${(product.price * 0.8).toFixed(2)} (20% off), limited stock`,
            targetAudience: 'Runners and fitness enthusiasts looking for BFCM deals',
            contentType: 'product_description',
            storeInfo: JSON.stringify({ name: 'Velocity Athletics' }),
          }),
        })
        const rd = await r.json()
        results.push(`=== ${product.name} (SKU: ${product.sku}) ===\n${rd.content || 'No content generated'}`)
        if (results.length >= 3) break // limit to 3 for demo speed
      }
      setCopyResults(results.join('\n\n---\n\n'))
    } catch {
      setCopyResults('Error generating copy. Please try again.')
    }
    setCopyLoading(false)
  }

  async function generateRecoverySequence() {
    setRecoveryLoading(true)
    setRecoveryResults(null)
    try {
      const [cartRes, refundRes] = await Promise.all([
        fetch('/api/generate-product-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productName: 'BFCM Cart Items',
            category: 'Athletic Gear',
            keyFeatures: 'Black Friday deals, limited time 20% off, free shipping over $75, selling fast',
            targetAudience: 'Shoppers who added items to cart during BFCM but did not complete purchase',
            contentType: 'abandoned_cart_email',
            storeInfo: JSON.stringify({ name: 'Velocity Athletics' }),
          }),
        }),
        fetch('/api/reply-to-customer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ticketType: 'refund',
            customerMessage: 'I want to return my BFCM purchase. The item doesn\'t fit as expected.',
            orderInfo: { order_number: '#BFCM-001', status: 'delivered', total: 89.99 },
            storeInfo: { name: 'Your Store', bfcmReturn: true },
          }),
        }),
      ])

      const cartData = await cartRes.json()
      const refundData = await refundRes.json()

      const output = `=== POST-BFCM ABANDONED CART EMAIL SEQUENCE ===\n\n${cartData.content || 'No content generated'}\n\n---\n\n=== BFCM REFUND / EXCHANGE TEMPLATE ===\n\n${refundData.reply || 'No reply generated'}`
      setRecoveryResults(output)
    } catch {
      setRecoveryResults('Error generating recovery sequence. Please try again.')
    }
    setRecoveryLoading(false)
  }

  const modules: { id: Module; icon: string; title: string; desc: string }[] = [
    { id: 'inventory', icon: '📦', title: 'Inventory Check', desc: 'Forecast stockout risk at 5x velocity' },
    { id: 'cs', icon: '💬', title: 'CS Prep', desc: 'Pre-written BFCM ticket responses' },
    { id: 'copy', icon: '✍️', title: 'Copy Blast', desc: 'BFCM-optimized product descriptions' },
    { id: 'recovery', icon: '🔁', title: 'Post-BFCM Recovery', desc: 'Cart abandonment + refund templates' },
  ]

  const urgencyColor = daysLeft <= 30 ? '#ef4444' : daysLeft <= 60 ? '#f97316' : '#22c55e'

  return (
    <div style={{ padding: '32px', maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: '100px', padding: '5px 14px', marginBottom: '16px' }}>
          <span style={{ width: '6px', height: '6px', background: '#f97316', borderRadius: '50%', display: 'inline-block' }}></span>
          <span style={{ fontSize: '12px', color: '#f97316', fontWeight: 600 }}>BFCM 2026 PREP</span>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px' }}>
          Black Friday / Cyber Monday Command Center
        </h1>
        <p style={{ color: '#64748b', fontSize: '15px' }}>
          Get your store ready for the biggest revenue event of the year. Run all four modules before November.
        </p>
      </div>

      {/* Countdown */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(249,115,22,0.12), rgba(139,92,246,0.12))',
        border: `1px solid ${urgencyColor}40`,
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '32px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
          Days Until Black Friday 2026
        </div>
        <div style={{ fontSize: 'clamp(64px, 10vw, 96px)', fontWeight: 900, color: urgencyColor, lineHeight: 1, letterSpacing: '-0.04em' }}>
          {daysLeft}
        </div>
        <div style={{ fontSize: '16px', color: '#94a3b8', marginTop: '8px' }}>
          November 27, 2026 — {daysLeft <= 30 ? 'Final preparations needed NOW' : daysLeft <= 60 ? 'Time to run inventory checks' : 'Start planning ahead'}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '24px', flexWrap: 'wrap' }}>
          {[
            { label: 'Weeks', value: Math.floor(daysLeft / 7) },
            { label: 'Months', value: Math.floor(daysLeft / 30) },
            { label: 'Hours', value: daysLeft * 24 },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#f1f5f9' }}>{item.value}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Module Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '28px' }}>
        {modules.map(mod => (
          <button
            key={mod.id}
            onClick={() => setActiveModule(mod.id)}
            style={{
              background: activeModule === mod.id ? 'rgba(249, 115, 22, 0.12)' : '#0f1624',
              border: `1px solid ${activeModule === mod.id ? 'rgba(249, 115, 22, 0.5)' : '#1e293b'}`,
              borderRadius: '12px',
              padding: '16px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s',
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{mod.icon}</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: activeModule === mod.id ? '#f97316' : '#f1f5f9', marginBottom: '4px' }}>{mod.title}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>{mod.desc}</div>
          </button>
        ))}
      </div>

      {/* Module: Inventory Check */}
      {activeModule === 'inventory' && (
        <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '16px', padding: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>BFCM Inventory Check</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
            Paste your SKU list below. We&apos;ll forecast stockout risk assuming 5x normal velocity — typical BFCM spike for Shopify stores.
          </p>
          <div style={{ background: 'rgba(249, 115, 22, 0.05)', border: '1px solid rgba(249, 115, 22, 0.2)', borderRadius: '8px', padding: '12px', marginBottom: '16px', fontSize: '13px', color: '#94a3b8' }}>
            <strong style={{ color: '#f97316' }}>Format (one SKU per line):</strong> Product Name, SKU, Current Stock, Daily Sales, Reorder Point, Supplier, Lead Time Days
            <br />
            <span style={{ color: '#64748b' }}>Example: Running Vest, PRV-002, 240, 8, 50, FastSupply Co, 14</span>
          </div>
          <textarea
            value={skuList}
            onChange={e => setSkuList(e.target.value)}
            placeholder={`Running Vest, PRV-002, 240, 8, 50, FastSupply Co, 14\nCompression Tights, CRT-001, 180, 12, 80, SportSupply, 10\nTrail Shoes, TRS-003, 95, 6, 40, ShoeCo, 21`}
            style={{
              width: '100%',
              minHeight: '140px',
              background: '#080c14',
              border: '1px solid #1e293b',
              borderRadius: '8px',
              padding: '12px',
              color: '#f1f5f9',
              fontSize: '13px',
              fontFamily: 'monospace',
              resize: 'vertical',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={runInventoryCheck}
            disabled={inventoryLoading || !skuList.trim()}
            style={{
              marginTop: '12px',
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              color: 'white',
              border: 'none',
              padding: '11px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: inventoryLoading || !skuList.trim() ? 'not-allowed' : 'pointer',
              opacity: !skuList.trim() ? 0.5 : 1,
            }}
          >
            {inventoryLoading ? 'Forecasting at 5x velocity...' : 'Run BFCM Stockout Forecast'}
          </button>

          {inventoryResult && (
            <div style={{ marginTop: '20px', background: 'rgba(249, 115, 22, 0.05)', border: '1px solid rgba(249, 115, 22, 0.2)', borderRadius: '10px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#f97316' }}>BFCM Stockout Risk Report</span>
                <button
                  onClick={() => navigator.clipboard.writeText(inventoryResult)}
                  style={{ background: 'rgba(249, 115, 22, 0.15)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.3)', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Copy
                </button>
              </div>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '13px', color: '#cbd5e1', lineHeight: 1.7, fontFamily: 'inherit', margin: 0 }}>{inventoryResult}</pre>
            </div>
          )}
        </div>
      )}

      {/* Module: Customer Service Prep */}
      {activeModule === 'cs' && (
        <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '16px', padding: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>BFCM Customer Service Prep</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
            Generate pre-written responses for the top BFCM ticket types. Paste these into Gorgias, Zendesk, or Shopify Inbox as quick-reply macros before the rush hits.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '20px' }}>
            {BFCM_TICKET_TYPES.map((type, i) => (
              <div key={i} style={{ background: '#080c14', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#f97316', fontSize: '11px', fontWeight: 700, background: 'rgba(249,115,22,0.1)', padding: '2px 7px', borderRadius: '100px', flexShrink: 0 }}>#{i + 1}</span>
                {type}
              </div>
            ))}
          </div>

          <button
            onClick={generateCSReplies}
            disabled={csLoading}
            style={{
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              color: 'white',
              border: 'none',
              padding: '11px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: csLoading ? 'wait' : 'pointer',
            }}
          >
            {csLoading ? 'Generating BFCM templates...' : 'Generate Top 5 Response Templates'}
          </button>
          <span style={{ marginLeft: '12px', fontSize: '12px', color: '#475569' }}>Generates first 5 ticket types (fastest)</span>

          {csResults && (
            <div style={{ marginTop: '20px', background: 'rgba(249, 115, 22, 0.05)', border: '1px solid rgba(249, 115, 22, 0.2)', borderRadius: '10px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#f97316' }}>BFCM Response Templates</span>
                <button
                  onClick={() => navigator.clipboard.writeText(csResults)}
                  style={{ background: 'rgba(249, 115, 22, 0.15)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.3)', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Copy All
                </button>
              </div>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '13px', color: '#cbd5e1', lineHeight: 1.7, fontFamily: 'inherit', margin: 0 }}>{csResults}</pre>
            </div>
          )}
        </div>
      )}

      {/* Module: Product Copy Blast */}
      {activeModule === 'copy' && (
        <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '16px', padding: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>BFCM Product Copy Blast</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
            Bulk-generate BFCM-optimized product descriptions for your top sellers. Copy includes sale pricing, urgency signals, and BFCM-specific keywords.
          </p>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '10px', fontWeight: 500 }}>Products queued for BFCM copy generation:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {SAMPLE_PRODUCTS.map((p, i) => (
                <div key={i} style={{ background: '#080c14', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9' }}>{p.name}</span>
                    <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '12px', fontFamily: 'monospace' }}>{p.sku}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '13px', color: '#64748b', textDecoration: 'line-through' }}>${p.price}</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#22c55e' }}>${(p.price * 0.8).toFixed(2)}</span>
                    <span style={{ fontSize: '11px', color: '#f97316', background: 'rgba(249,115,22,0.1)', padding: '2px 8px', borderRadius: '100px', fontWeight: 600 }}>20% OFF</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={generateCopyBlast}
            disabled={copyLoading}
            style={{
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              color: 'white',
              border: 'none',
              padding: '11px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: copyLoading ? 'wait' : 'pointer',
            }}
          >
            {copyLoading ? 'Generating BFCM copy...' : 'Generate BFCM Descriptions (Top 3)'}
          </button>

          {copyResults && (
            <div style={{ marginTop: '20px', background: 'rgba(249, 115, 22, 0.05)', border: '1px solid rgba(249, 115, 22, 0.2)', borderRadius: '10px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#f97316' }}>BFCM Product Descriptions</span>
                <button
                  onClick={() => navigator.clipboard.writeText(copyResults)}
                  style={{ background: 'rgba(249, 115, 22, 0.15)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.3)', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Copy All
                </button>
              </div>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '13px', color: '#cbd5e1', lineHeight: 1.7, fontFamily: 'inherit', margin: 0 }}>{copyResults}</pre>
            </div>
          )}
        </div>
      )}

      {/* Module: Post-BFCM Recovery */}
      {activeModule === 'recovery' && (
        <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '16px', padding: '28px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Post-BFCM Recovery</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
            Generate a post-BFCM abandoned cart recovery email sequence plus refund/exchange templates tuned for the BFCM return wave.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
            <div style={{ background: '#080c14', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '20px', marginBottom: '8px' }}>📧</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9', marginBottom: '4px' }}>Cart Abandonment Sequence</div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>3-email win-back flow for post-BFCM cart abandoners. Includes subject lines and body copy tuned for Black Friday shoppers.</div>
            </div>
            <div style={{ background: '#080c14', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '20px', marginBottom: '8px' }}>🔄</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9', marginBottom: '4px' }}>Refund/Exchange Template</div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>Pre-written BFCM return/exchange reply that turns refund requests into exchanges — protecting BFCM revenue.</div>
            </div>
          </div>

          <button
            onClick={generateRecoverySequence}
            disabled={recoveryLoading}
            style={{
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              color: 'white',
              border: 'none',
              padding: '11px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: recoveryLoading ? 'wait' : 'pointer',
            }}
          >
            {recoveryLoading ? 'Generating recovery assets...' : 'Generate Recovery Package'}
          </button>

          {recoveryResults && (
            <div style={{ marginTop: '20px', background: 'rgba(249, 115, 22, 0.05)', border: '1px solid rgba(249, 115, 22, 0.2)', borderRadius: '10px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#f97316' }}>Post-BFCM Recovery Assets</span>
                <button
                  onClick={() => navigator.clipboard.writeText(recoveryResults)}
                  style={{ background: 'rgba(249, 115, 22, 0.15)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.3)', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Copy All
                </button>
              </div>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '13px', color: '#cbd5e1', lineHeight: 1.7, fontFamily: 'inherit', margin: 0 }}>{recoveryResults}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
