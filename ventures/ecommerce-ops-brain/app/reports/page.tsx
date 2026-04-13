'use client'

import { useState, useRef } from 'react'

interface SKURow {
  sku: string
  name: string
  inventory: number
  sales_last_30_days: number
  price: number
}

interface SKUReport {
  sku: string
  name: string
  inventory: number
  sales_last_30_days: number
  price: number
  revenue_30d: number
  daily_velocity: number
  days_to_stockout: number
  tier: 'Hero' | 'Steady' | 'Fading' | 'Dead'
  tierColor: string
  tierBg: string
  recommendation: string
}

interface AIInsights {
  summary: string
  heroStrategy: string
  steadyStrategy: string
  fadingStrategy: string
  deadStrategy: string
  topOpportunity: string
}

const TIER_COLORS = {
  Hero: { color: '#22c55e', bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  Steady: { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  Fading: { color: '#f97316', bg: 'rgba(249, 115, 22, 0.15)', border: 'rgba(249, 115, 22, 0.3)' },
  Dead: { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.3)' },
}

const SAMPLE_CSV = `sku,name,inventory,sales_last_30_days,price
TRS-001,Trail Running Shoes,45,38,159.99
CRT-002,Compression Tights,312,12,89.99
PRV-003,Performance Vest,8,29,129.99
HB-004,Hydration Belt,204,64,39.99
RFR-005,Foam Roller,18,3,49.99
SS-006,Sport Socks 3-Pack,890,142,24.99
WB-007,Water Bottle,67,18,34.99
TH-008,Thermal Base Layer,3,0,74.99
CT-009,Compression Top,156,52,69.99
GB-010,Gym Bag,22,7,99.99`

function classifySKU(row: SKURow): Pick<SKUReport, 'tier' | 'tierColor' | 'tierBg' | 'recommendation'> {
  const dailyVelocity = row.sales_last_30_days / 30
  const daysToStockout = dailyVelocity > 0 ? Math.floor(row.inventory / dailyVelocity) : 9999
  const revenue30d = row.sales_last_30_days * row.price

  // Classification logic
  const hasGoodSales = row.sales_last_30_days >= 20
  const isMovingFast = dailyVelocity >= 1
  const isHighRevenue = revenue30d >= 1000
  const hasNoSales = row.sales_last_30_days === 0
  const hasLowSales = row.sales_last_30_days < 5
  const isLowStock = daysToStockout < 30

  let tier: 'Hero' | 'Steady' | 'Fading' | 'Dead'
  let recommendation: string

  if (hasNoSales || (hasLowSales && row.inventory > 100)) {
    tier = 'Dead'
    recommendation = `Zero or near-zero velocity with ${row.inventory} units in stock. Run a clearance promotion (40–60% off) or bundle with a Hero SKU. If no movement in 30 days, consider liquidating to free up capital.`
  } else if (hasGoodSales && (isMovingFast || isHighRevenue)) {
    tier = 'Hero'
    recommendation = isLowStock
      ? `Top performer with only ${daysToStockout} days of stock left. Reorder immediately — ${Math.ceil(dailyVelocity * 60)} units for 60-day coverage. Prioritize for BFCM inventory.`
      : `Strong performer generating $${revenue30d.toFixed(0)}/month. Feature prominently in ads, email campaigns, and collection page. Consider expanding color/size variants.`
  } else if (hasLowSales && !hasNoSales) {
    tier = 'Fading'
    recommendation = `Sales declining — only ${row.sales_last_30_days} units sold in 30 days. Test a 15–20% discount or refresh product description with new SEO keywords. If no improvement next month, flag for clearance.`
  } else {
    tier = 'Steady'
    recommendation = `Reliable contributor at $${revenue30d.toFixed(0)}/month. Maintain stock levels, ensure ${Math.ceil(dailyVelocity * 45)} units on hand at all times. Low maintenance — monitor quarterly.`
  }

  const colors = TIER_COLORS[tier]
  return { tier, tierColor: colors.color, tierBg: colors.bg, recommendation }
}

function parseCSV(csv: string): SKURow[] {
  const lines = csv.trim().split('\n')
  if (lines.length < 2) return []
  const headers = lines[0].toLowerCase().split(',').map(h => h.trim())

  const skuIdx = headers.indexOf('sku')
  const nameIdx = headers.indexOf('name')
  const invIdx = headers.indexOf('inventory')
  const salesIdx = headers.indexOf('sales_last_30_days')
  const priceIdx = headers.indexOf('price')

  if ([skuIdx, nameIdx, invIdx, salesIdx, priceIdx].includes(-1)) return []

  return lines.slice(1).map(line => {
    const cols = line.split(',').map(c => c.trim())
    return {
      sku: cols[skuIdx] || '',
      name: cols[nameIdx] || '',
      inventory: parseInt(cols[invIdx]) || 0,
      sales_last_30_days: parseInt(cols[salesIdx]) || 0,
      price: parseFloat(cols[priceIdx]) || 0,
    }
  }).filter(r => r.sku && r.name)
}

function buildReports(rows: SKURow[]): SKUReport[] {
  return rows.map(row => {
    const dailyVelocity = row.sales_last_30_days / 30
    const daysToStockout = dailyVelocity > 0 ? Math.floor(row.inventory / dailyVelocity) : 9999
    const revenue30d = row.sales_last_30_days * row.price
    const classification = classifySKU(row)
    return { ...row, revenue_30d: revenue30d, daily_velocity: dailyVelocity, days_to_stockout: daysToStockout, ...classification }
  }).sort((a, b) => {
    const tierOrder = { Hero: 0, Steady: 1, Fading: 2, Dead: 3 }
    return tierOrder[a.tier] - tierOrder[b.tier]
  })
}

async function generateAIInsights(reports: SKUReport[]): Promise<AIInsights> {
  const heroes = reports.filter(r => r.tier === 'Hero')
  const steady = reports.filter(r => r.tier === 'Steady')
  const fading = reports.filter(r => r.tier === 'Fading')
  const dead = reports.filter(r => r.tier === 'Dead')
  const totalRevenue = reports.reduce((s, r) => s + r.revenue_30d, 0)

  const res = await fetch('/api/generate-product-content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productName: 'SKU Performance Analysis',
      category: 'Operations Report',
      keyFeatures: `${heroes.length} Hero SKUs generating $${heroes.reduce((s,r) => s+r.revenue_30d, 0).toFixed(0)}/month, ${steady.length} Steady SKUs, ${fading.length} Fading SKUs, ${dead.length} Dead SKUs. Total portfolio revenue: $${totalRevenue.toFixed(0)}/month. Hero SKUs: ${heroes.map(r => r.name).join(', ') || 'none'}. Dead SKUs: ${dead.map(r => r.name).join(', ') || 'none'}.`,
      targetAudience: 'Shopify merchant operations team',
      contentType: 'product_description',
      storeInfo: JSON.stringify({ name: 'Portfolio Analysis' }),
    }),
  })

  const data = await res.json()
  const raw = data.content || ''

  return {
    summary: raw.split('\n').slice(0, 3).join(' ').replace(/[#\-*]/g, '').trim() ||
      `Your portfolio of ${reports.length} SKUs generates $${totalRevenue.toFixed(0)}/month. ${heroes.length} Hero SKUs drive most revenue; ${dead.length} Dead SKUs are tying up capital.`,
    heroStrategy: `Focus inventory investment and ad spend on ${heroes.map(r => r.name).slice(0, 3).join(', ') || 'your top performers'}. These drive outsized revenue and should never stockout.`,
    steadyStrategy: `Maintain ${steady.length} Steady SKUs at 45-day stock coverage. Low-touch — review quarterly and look for cross-sell opportunities with Hero SKUs.`,
    fadingStrategy: fading.length > 0 ? `Run targeted 15–20% discounts on ${fading.map(r => r.name).slice(0, 2).join(', ')} to test price sensitivity. Refresh product copy with updated keywords.` : 'No Fading SKUs detected — healthy portfolio velocity.',
    deadStrategy: dead.length > 0 ? `Clear ${dead.map(r => r.name).slice(0, 2).join(', ')} via bundle offers or steep discounts. Capital tied in dead stock earns zero return.` : 'No Dead SKUs — excellent portfolio health.',
    topOpportunity: heroes.length > 0 ? `${heroes[0].name} is your highest performer. Expanding variants or increasing ad spend here has the highest ROI in your current catalog.` : 'Identify and double down on emerging high-velocity SKUs.',
  }
}

export default function ReportsPage() {
  const [csvInput, setCsvInput] = useState('')
  const [reports, setReports] = useState<SKUReport[] | null>(null)
  const [aiInsights, setAiInsights] = useState<AIInsights | null>(null)
  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setCsvInput((ev.target?.result as string) || '')
    reader.readAsText(file)
  }

  function loadSample() {
    setCsvInput(SAMPLE_CSV)
  }

  async function runAnalysis() {
    setLoading(true)
    setReports(null)
    setAiInsights(null)
    try {
      const rows = parseCSV(csvInput)
      if (rows.length === 0) {
        alert('Could not parse CSV. Check your column headers: sku, name, inventory, sales_last_30_days, price')
        setLoading(false)
        return
      }
      const built = buildReports(rows)
      setReports(built)
      setLoading(false)

      // Run AI insights separately
      setAiLoading(true)
      try {
        const insights = await generateAIInsights(built)
        setAiInsights(insights)
      } catch {
        // AI insights are optional — don't block report display
      }
      setAiLoading(false)
    } catch {
      setLoading(false)
      setAiLoading(false)
    }
  }

  function downloadReport() {
    if (!reports) return
    const lines = [
      'SKU,Name,Inventory,Sales (30d),Price,Revenue (30d),Daily Velocity,Days to Stockout,Tier,Recommendation',
      ...reports.map(r => [
        r.sku,
        `"${r.name}"`,
        r.inventory,
        r.sales_last_30_days,
        r.price.toFixed(2),
        r.revenue_30d.toFixed(2),
        r.daily_velocity.toFixed(2),
        r.days_to_stockout >= 9999 ? 'N/A' : r.days_to_stockout,
        r.tier,
        `"${r.recommendation}"`,
      ].join(','))
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sku-performance-report-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const tierCounts = reports ? {
    Hero: reports.filter(r => r.tier === 'Hero').length,
    Steady: reports.filter(r => r.tier === 'Steady').length,
    Fading: reports.filter(r => r.tier === 'Fading').length,
    Dead: reports.filter(r => r.tier === 'Dead').length,
  } : null

  return (
    <div style={{ padding: '32px', maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>
          SKU Performance Report
        </h1>
        <p style={{ color: '#64748b', fontSize: '15px' }}>
          Upload your product CSV to classify every SKU into performance tiers with AI-powered recommendations.
        </p>
      </div>

      {/* Upload Panel */}
      {!reports && (
        <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '16px', padding: '28px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Upload Your SKU Data</h2>

          <div style={{ background: 'rgba(249, 115, 22, 0.05)', border: '1px solid rgba(249, 115, 22, 0.2)', borderRadius: '8px', padding: '12px', marginBottom: '16px', fontSize: '13px', color: '#94a3b8' }}>
            <strong style={{ color: '#f97316' }}>Required columns:</strong> sku, name, inventory, sales_last_30_days, price
            <br />
            <span style={{ color: '#64748b' }}>Export from Shopify Admin &rarr; Products &rarr; Export, or from your analytics tool.</span>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{ background: '#1e293b', color: '#f1f5f9', border: '1px solid #334155', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
            >
              Upload CSV File
            </button>
            <button
              onClick={loadSample}
              style={{ background: 'transparent', color: '#64748b', border: '1px solid #1e293b', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' }}
            >
              Load Sample Data
            </button>
            <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} />
          </div>

          <textarea
            value={csvInput}
            onChange={e => setCsvInput(e.target.value)}
            placeholder="Paste CSV here, or use the upload button above..."
            style={{
              width: '100%',
              minHeight: '160px',
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
            onClick={runAnalysis}
            disabled={loading || !csvInput.trim()}
            style={{
              marginTop: '12px',
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              color: 'white',
              border: 'none',
              padding: '11px 28px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: loading || !csvInput.trim() ? 'not-allowed' : 'pointer',
              opacity: !csvInput.trim() ? 0.5 : 1,
            }}
          >
            {loading ? 'Analyzing SKUs...' : 'Run Performance Analysis'}
          </button>
        </div>
      )}

      {/* Results */}
      {reports && (
        <>
          {/* Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
            {(Object.entries(TIER_COLORS) as [keyof typeof TIER_COLORS, { color: string; bg: string; border: string }][]).map(([tier, colors]) => (
              <div key={tier} style={{ background: colors.bg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '18px 20px' }}>
                <div style={{ fontSize: '12px', color: colors.color, fontWeight: 700, letterSpacing: '0.08em', marginBottom: '6px' }}>{tier.toUpperCase()}</div>
                <div style={{ fontSize: '32px', fontWeight: 800, color: colors.color }}>{tierCounts![tier]}</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                  {tier === 'Hero' && 'Top performers — protect stock'}
                  {tier === 'Steady' && 'Reliable revenue contributors'}
                  {tier === 'Fading' && 'Declining — needs attention'}
                  {tier === 'Dead' && 'No velocity — clear or bundle'}
                </div>
              </div>
            ))}
          </div>

          {/* AI Insights */}
          {(aiLoading || aiInsights) && (
            <div style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(249,115,22,0.08))', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span style={{ fontSize: '20px' }}>🧠</span>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#8b5cf6' }}>AI Portfolio Insights</h3>
                {aiLoading && <span style={{ fontSize: '12px', color: '#64748b' }}>Generating insights...</span>}
              </div>
              {aiInsights && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {[
                    { label: 'Portfolio Summary', text: aiInsights.summary, color: '#8b5cf6' },
                    { label: 'Hero Strategy', text: aiInsights.heroStrategy, color: '#22c55e' },
                    { label: 'Fading SKU Action', text: aiInsights.fadingStrategy, color: '#f97316' },
                    { label: 'Dead Stock Action', text: aiInsights.deadStrategy, color: '#ef4444' },
                    { label: 'Top Opportunity', text: aiInsights.topOpportunity, color: '#3b82f6' },
                    { label: 'Steady SKU Guidance', text: aiInsights.steadyStrategy, color: '#64748b' },
                  ].map((item, i) => (
                    <div key={i} style={{ background: 'rgba(8,12,20,0.6)', borderRadius: '10px', padding: '14px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: item.color, letterSpacing: '0.08em', marginBottom: '6px' }}>{item.label.toUpperCase()}</div>
                      <div style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.6 }}>{item.text}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ fontSize: '15px', fontWeight: 600, color: '#f1f5f9' }}>
              {reports.length} SKUs analyzed
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={downloadReport}
                style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '8px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                Download CSV Report
              </button>
              <button
                onClick={() => { setReports(null); setAiInsights(null); setCsvInput('') }}
                style={{ background: 'transparent', color: '#64748b', border: '1px solid #1e293b', padding: '8px 18px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}
              >
                New Analysis
              </button>
            </div>
          </div>

          {/* Table */}
          <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '120px 2fr 80px 90px 80px 110px 110px 100px',
              padding: '12px 20px',
              borderBottom: '1px solid #1e293b',
              fontSize: '11px',
              fontWeight: 700,
              color: '#475569',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}>
              <div>SKU</div>
              <div>Product</div>
              <div>Stock</div>
              <div>Sales 30d</div>
              <div>Price</div>
              <div>Revenue 30d</div>
              <div>Days Left</div>
              <div>Tier</div>
            </div>

            {reports.map((r, i) => {
              const colors = TIER_COLORS[r.tier]
              return (
                <div key={r.sku} style={{ borderBottom: i < reports.length - 1 ? '1px solid #1e293b' : 'none' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 2fr 80px 90px 80px 110px 110px 100px',
                    padding: '14px 20px',
                    alignItems: 'center',
                    background: r.tier === 'Dead' ? 'rgba(239, 68, 68, 0.03)' : r.tier === 'Hero' ? 'rgba(34, 197, 94, 0.03)' : 'transparent',
                  }}>
                    <div style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>{r.sku}</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9' }}>{r.name}</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: r.inventory < 20 ? '#ef4444' : '#f1f5f9' }}>{r.inventory}</div>
                    <div style={{ fontSize: '14px', color: '#94a3b8' }}>{r.sales_last_30_days}</div>
                    <div style={{ fontSize: '14px', color: '#94a3b8' }}>${r.price.toFixed(2)}</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#22c55e' }}>${r.revenue_30d.toFixed(0)}</div>
                    <div style={{ fontSize: '13px', color: r.days_to_stockout < 30 ? '#f97316' : '#64748b' }}>
                      {r.days_to_stockout >= 9999 ? '—' : `${r.days_to_stockout}d`}
                    </div>
                    <div>
                      <span style={{
                        background: colors.bg,
                        color: colors.color,
                        border: `1px solid ${colors.border}`,
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: '100px',
                      }}>
                        {r.tier}
                      </span>
                    </div>
                  </div>
                  {/* Recommendation row */}
                  <div style={{
                    padding: '8px 20px 14px',
                    fontSize: '12px',
                    color: '#64748b',
                    lineHeight: 1.5,
                    borderTop: '1px solid rgba(30, 41, 59, 0.5)',
                  }}>
                    <span style={{ color: colors.color, fontWeight: 600 }}>Recommendation: </span>
                    {r.recommendation}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
