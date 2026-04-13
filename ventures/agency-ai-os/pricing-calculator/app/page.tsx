'use client'

import { useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type ServiceType = 'content-creation' | 'sales-automation' | 'customer-service' | 'data-analysis' | 'process-automation' | 'custom'
type Complexity = 'plug-and-play' | 'moderate' | 'fully-custom'
type PricingModel = 'Performance Retainer' | 'Setup + Retainer' | 'Usage-Based'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function round(n: number, nearest = 50) {
  return Math.round(n / nearest) * nearest
}

// ─── Service labels ───────────────────────────────────────────────────────────

const SERVICE_LABELS: Record<ServiceType, string> = {
  'content-creation': 'Content Creation',
  'sales-automation': 'Sales Automation',
  'customer-service': 'Customer Service',
  'data-analysis': 'Data Analysis',
  'process-automation': 'Process Automation',
  'custom': 'Custom / Other',
}

// Maps service type to a human-readable process name for the one-liner
const SERVICE_PROCESS: Record<ServiceType, string> = {
  'content-creation': 'content production',
  'sales-automation': 'sales outreach',
  'customer-service': 'customer support',
  'data-analysis': 'reporting & analysis',
  'process-automation': 'manual workflows',
  'custom': 'operational',
}

// ─── Setup fee multipliers by complexity ─────────────────────────────────────

const SETUP_MULTIPLIERS: Record<Complexity, { low: number; high: number }> = {
  'plug-and-play': { low: 1.5, high: 2.0 },
  'moderate':      { low: 2.0, high: 2.5 },
  'fully-custom':  { low: 2.5, high: 3.0 },
}

const COMPLEXITY_LABELS: Record<Complexity, string> = {
  'plug-and-play': 'Plug-and-Play',
  'moderate': 'Moderate Customization',
  'fully-custom': 'Fully Custom',
}

// ─── Pricing model selection logic ───────────────────────────────────────────

function recommendPricingModel(service: ServiceType, hourlyRate: number, complexity: Complexity): PricingModel {
  if (service === 'sales-automation' || service === 'customer-service') return 'Performance Retainer'
  if (complexity === 'fully-custom' || complexity === 'moderate') return 'Setup + Retainer'
  if (service === 'data-analysis' || hourlyRate >= 125) return 'Usage-Based'
  return 'Setup + Retainer'
}

const MODEL_DESCRIPTIONS: Record<PricingModel, string> = {
  'Performance Retainer': 'Monthly retainer tied to results (e.g. leads generated, tickets resolved). Easiest to sell — client pays for outcomes, not hours.',
  'Setup + Retainer': 'One-time setup fee covers build cost; ongoing retainer covers maintenance and improvements. Industry standard for custom work.',
  'Usage-Based': 'Client pays per output (reports, calls handled, tasks automated). Best for data and analytics work where volume varies.',
}

const MODEL_COLOR: Record<PricingModel, string> = {
  'Performance Retainer': '#10b981',
  'Setup + Retainer': '#4f46e5',
  'Usage-Based': '#f59e0b',
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PricingCalculator() {
  const [service, setService] = useState<ServiceType>('content-creation')
  const [hours, setHours] = useState(20)
  const [hourlyRate, setHourlyRate] = useState(75)
  const [complexity, setComplexity] = useState<Complexity>('moderate')
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  // ── Core calculation — 1/5th Rule ──────────────────────────────────────────
  const clientMonthlyCost = hours * hourlyRate
  const monthlyPrice = round(clientMonthlyCost / 5)
  const annualValue = monthlyPrice * 12

  const setupMultiplier = SETUP_MULTIPLIERS[complexity]
  const setupLow = round(monthlyPrice * setupMultiplier.low)
  const setupHigh = round(monthlyPrice * setupMultiplier.high)

  // Gross margin: assuming $150/hr for setup work
  // Estimate setup hours based on complexity
  const setupHoursMap: Record<Complexity, number> = {
    'plug-and-play': 8,
    'moderate': 20,
    'fully-custom': 40,
  }
  const setupHours = setupHoursMap[complexity]
  const setupCost = setupHours * 150
  const setupMid = (setupLow + setupHigh) / 2
  const setupMargin = setupMid > 0 ? Math.round(((setupMid - setupCost) / setupMid) * 100) : 0

  // Monthly margin: assume 2h/month ongoing maintenance at $150/hr
  const ongoingCost = 2 * 150
  const monthlyMargin = monthlyPrice > 0 ? Math.round(((monthlyPrice - ongoingCost) / monthlyPrice) * 100) : 0

  const pricingModel = recommendPricingModel(service, hourlyRate, complexity)

  // One-liner positioning
  const clientSaving = fmt(clientMonthlyCost)
  const positioningLine = `Charge ${fmt(monthlyPrice)}/month for saving your client ${clientSaving}/month in ${SERVICE_PROCESS[service]} costs.`

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    // Log capture (no backend needed per spec)
    console.log('[Lead capture]', {
      email,
      service,
      hours,
      hourlyRate,
      complexity,
      monthlyPrice,
      setupLow,
      setupHigh,
      annualValue,
      capturedAt: new Date().toISOString(),
    })
    setEmailSent(true)
  }

  // ── Styles ─────────────────────────────────────────────────────────────────

  const label: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: '700',
    color: '#8080a0',
    marginBottom: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
  }

  const card: React.CSSProperties = {
    background: '#0f0f1a',
    border: '1px solid #2a2a4a',
    borderRadius: '14px',
    padding: '24px',
  }

  const sliderTrackStyle: React.CSSProperties = {
    width: '100%',
    height: '4px',
    borderRadius: '2px',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none' as const,
    WebkitAppearance: 'none' as const,
    background: '#2a2a4a',
    accentColor: '#4f46e5',
  }

  return (
    <>
      <style>{`
        input[type=range] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 2px;
          background: #2a2a4a;
          outline: none;
          cursor: pointer;
          accent-color: #4f46e5;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #4f46e5;
          cursor: pointer;
          border: 2px solid #ffffff22;
          box-shadow: 0 0 0 4px #4f46e522;
        }
        input[type=range]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #4f46e5;
          cursor: pointer;
          border: 2px solid #ffffff22;
        }
        * { box-sizing: border-box; }
        select { -webkit-appearance: none; appearance: none; }
        @media (max-width: 600px) {
          .grid-2 { grid-template-columns: 1fr !important; }
          .result-grid { grid-template-columns: 1fr 1fr !important; }
          h1 { font-size: 28px !important; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', padding: '48px 20px 80px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>

          {/* ── Header ── */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{ fontSize: '12px', color: '#4f46e5', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px' }}>
              Agency AI OS
            </div>
            <h1 style={{ fontSize: '38px', fontWeight: '900', margin: '0 0 14px', lineHeight: '1.1', color: '#ffffff' }}>
              AI Service Pricing Calculator
            </h1>
            <p style={{ fontSize: '17px', color: '#6b6b80', margin: 0, lineHeight: '1.65', maxWidth: '540px' }}>
              Enter your client's numbers. Get your exact price, setup fee, and margin — powered by the industry-standard 1/5th Rule.
            </p>
          </div>

          {/* ── Inputs ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>

            {/* Service Type */}
            <div style={card}>
              <label style={label}>1. Service Type</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }} className="grid-2">
                {(Object.keys(SERVICE_LABELS) as ServiceType[]).map(s => (
                  <button
                    key={s}
                    onClick={() => setService(s)}
                    style={{
                      padding: '10px 8px',
                      background: service === s ? '#4f46e5' : '#13131f',
                      border: service === s ? '1px solid #4f46e5' : '1px solid #2a2a4a',
                      borderRadius: '8px',
                      color: service === s ? '#fff' : '#8080a0',
                      fontSize: '13px',
                      fontWeight: service === s ? '700' : '400',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      textAlign: 'center',
                    }}
                  >
                    {SERVICE_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>

            {/* Hours Slider */}
            <div style={card}>
              <label style={label}>
                2. Hours this process takes per month
                <span style={{ color: '#4f46e5', fontSize: '16px', fontWeight: '800', float: 'right', letterSpacing: 0 }}>{hours}h / month</span>
              </label>
              <input
                type="range"
                min={1}
                max={100}
                step={1}
                value={hours}
                onChange={e => setHours(Number(e.target.value))}
                style={sliderTrackStyle}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '12px', color: '#555570' }}>
                <span>1h</span>
                <span>50h</span>
                <span>100h</span>
              </div>
            </div>

            {/* Hourly Rate Slider */}
            <div style={card}>
              <label style={label}>
                3. Client team hourly cost (salary + overhead)
                <span style={{ color: '#4f46e5', fontSize: '16px', fontWeight: '800', float: 'right', letterSpacing: 0 }}>${hourlyRate}/hr</span>
              </label>
              <input
                type="range"
                min={25}
                max={200}
                step={5}
                value={hourlyRate}
                onChange={e => setHourlyRate(Number(e.target.value))}
                style={sliderTrackStyle}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '12px', color: '#555570' }}>
                <span>$25/hr</span>
                <span>$100/hr</span>
                <span>$200/hr</span>
              </div>
              <p style={{ margin: '10px 0 0', fontSize: '12px', color: '#555570' }}>
                Include salary, benefits, management overhead. Use $50–75 for ops staff, $100–150 for knowledge workers.
              </p>
            </div>

            {/* Complexity */}
            <div style={card}>
              <label style={label}>4. Complexity Level</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
                {(['plug-and-play', 'moderate', 'fully-custom'] as Complexity[]).map(c => (
                  <button
                    key={c}
                    onClick={() => setComplexity(c)}
                    style={{
                      flex: 1,
                      minWidth: '140px',
                      padding: '12px 10px',
                      background: complexity === c ? '#4f46e5' : '#13131f',
                      border: complexity === c ? '1px solid #4f46e5' : '1px solid #2a2a4a',
                      borderRadius: '8px',
                      color: complexity === c ? '#fff' : '#8080a0',
                      fontSize: '13px',
                      fontWeight: complexity === c ? '700' : '400',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {COMPLEXITY_LABELS[c]}
                  </button>
                ))}
              </div>
              <p style={{ margin: '10px 0 0', fontSize: '12px', color: '#555570' }}>
                {complexity === 'plug-and-play' && 'Off-the-shelf tools, minimal config. Fast to deploy. Setup fee: 1.5–2× monthly.'}
                {complexity === 'moderate' && 'Custom prompts, integrations, and workflows. Setup fee: 2–2.5× monthly.'}
                {complexity === 'fully-custom' && 'Bespoke AI agents, custom data pipelines, deep integrations. Setup fee: 2.5–3× monthly.'}
              </p>
            </div>
          </div>

          {/* ── Results ── */}
          <div style={{
            background: 'linear-gradient(135deg, #0d0d20 0%, #0a0a18 100%)',
            border: '1px solid #3a3a6a',
            borderRadius: '18px',
            overflow: 'hidden',
            marginBottom: '24px',
          }}>
            {/* Price header */}
            <div style={{ padding: '32px', borderBottom: '1px solid #1a1a30' }}>
              <div style={{ fontSize: '12px', color: '#6b6bff', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
                Your Recommended Monthly Price
              </div>
              <div style={{ fontSize: '56px', fontWeight: '900', color: '#ffffff', lineHeight: '1', marginBottom: '10px' }}>
                {fmt(monthlyPrice)}
                <span style={{ fontSize: '20px', fontWeight: '500', color: '#6b6b80', marginLeft: '8px' }}>/month</span>
              </div>

              {/* Math shown */}
              <div style={{
                display: 'inline-block',
                background: '#13131f',
                border: '1px solid #2a2a4a',
                borderRadius: '8px',
                padding: '10px 16px',
                fontSize: '14px',
                color: '#a0a0c0',
                fontFamily: 'monospace',
                marginTop: '4px',
              }}>
                ({hours}h × ${hourlyRate}/hr) ÷ 5 = <span style={{ color: '#4f46e5', fontWeight: '700' }}>{fmt(monthlyPrice)}/month</span>
              </div>
            </div>

            {/* Key metrics grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1px', background: '#1a1a30' }} className="result-grid">
              {[
                { label: 'Setup Fee Range', value: `${fmt(setupLow)}–${fmt(setupHigh)}`, sub: 'one-time' },
                { label: 'Setup Margin', value: `${setupMargin}%`, sub: 'gross margin' },
                { label: 'Monthly Margin', value: `${monthlyMargin}%`, sub: 'gross margin' },
                { label: 'Annual Contract', value: fmt(annualValue), sub: 'retainer only' },
              ].map(({ label: l, value, sub }) => (
                <div key={l} style={{ background: '#0f0f1a', padding: '20px', textAlign: 'center' as const }}>
                  <div style={{ fontSize: '11px', color: '#555570', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{l}</div>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff' }}>{value}</div>
                  <div style={{ fontSize: '11px', color: '#404055', marginTop: '3px' }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* Pricing model recommendation */}
            <div style={{ padding: '28px 32px', borderTop: '1px solid #1a1a30' }}>
              <div style={{ fontSize: '12px', color: '#8080a0', fontWeight: '700', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Best Pricing Model For This Engagement
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  flexShrink: 0,
                  padding: '6px 14px',
                  background: `${MODEL_COLOR[pricingModel]}22`,
                  border: `1px solid ${MODEL_COLOR[pricingModel]}55`,
                  borderRadius: '20px',
                  color: MODEL_COLOR[pricingModel],
                  fontSize: '13px',
                  fontWeight: '700',
                  whiteSpace: 'nowrap' as const,
                }}>
                  {pricingModel}
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#9090b0', lineHeight: '1.6' }}>
                  {MODEL_DESCRIPTIONS[pricingModel]}
                </p>
              </div>

              {/* Model comparison pills */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' as const }}>
                {(['Performance Retainer', 'Setup + Retainer', 'Usage-Based'] as PricingModel[]).map(m => (
                  <div key={m} style={{
                    padding: '4px 12px',
                    background: pricingModel === m ? `${MODEL_COLOR[m]}22` : '#13131f',
                    border: `1px solid ${pricingModel === m ? MODEL_COLOR[m] + '55' : '#2a2a4a'}`,
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: pricingModel === m ? MODEL_COLOR[m] : '#555570',
                    fontWeight: pricingModel === m ? '700' : '400',
                  }}>
                    {pricingModel === m ? '✓ ' : ''}{m}
                  </div>
                ))}
              </div>
            </div>

            {/* Positioning one-liner */}
            <div style={{ padding: '0 32px 32px' }}>
              <div style={{
                background: '#0d1a0d',
                border: '1px solid #1a3a1a',
                borderRadius: '10px',
                padding: '16px 20px',
              }}>
                <div style={{ fontSize: '11px', color: '#4ade80', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Your Positioning One-Liner
                </div>
                <p style={{ margin: 0, fontSize: '15px', color: '#d0ffd0', lineHeight: '1.5', fontStyle: 'italic' }}>
                  "{positioningLine}"
                </p>
              </div>
            </div>
          </div>

          {/* ── Lead Capture ── */}
          <div style={{
            background: '#0f0f1a',
            border: '1px solid #2a2a4a',
            borderRadius: '14px',
            padding: '28px 32px',
            marginBottom: '24px',
          }}>
            {!emailSent ? (
              <>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', marginBottom: '6px' }}>
                  Want the proposal template that closes this deal?
                </div>
                <p style={{ fontSize: '14px', color: '#6b6b80', margin: '0 0 20px', lineHeight: '1.6' }}>
                  Get the exact proposal template — with pricing tables, ROI framing, and objection handlers — that agencies use to close {fmt(monthlyPrice)}/month AI retainers.
                </p>
                <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' as const }}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{
                      flex: 1,
                      minWidth: '220px',
                      padding: '13px 16px',
                      background: '#13131f',
                      border: '1px solid #3a3a5f',
                      borderRadius: '8px',
                      color: '#f0f0f0',
                      fontSize: '15px',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '13px 24px',
                      background: '#4f46e5',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '15px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap' as const,
                    }}
                  >
                    Send me the template
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center' as const, padding: '8px 0' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>✓</div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#4ade80', marginBottom: '8px' }}>
                  Template on its way!
                </div>
                <p style={{ fontSize: '14px', color: '#6b6b80', margin: '0 0 20px' }}>
                  Check your inbox. While you wait, explore all 25 proposal templates:
                </p>
                <a
                  href="https://landing-one-lac.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    background: '#4f46e5',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: '700',
                    textDecoration: 'none',
                  }}
                >
                  See all 25 templates →
                </a>
              </div>
            )}

            {!emailSent && (
              <p style={{ margin: '14px 0 0', fontSize: '13px', color: '#404055', textAlign: 'center' as const }}>
                Or browse all 25 proposal templates now →{' '}
                <a
                  href="https://landing-one-lac.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#6b6bff', textDecoration: 'none' }}
                >
                  landing-one-lac.vercel.app
                </a>
              </p>
            )}
          </div>

          {/* ── Footer ── */}
          <div style={{ textAlign: 'center' as const, paddingTop: '8px' }}>
            <p style={{ fontSize: '13px', color: '#404055', margin: 0, lineHeight: '1.8' }}>
              Part of{' '}
              <a
                href="https://landing-one-lac.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#4f46e5', textDecoration: 'none' }}
              >
                Agency AI OS
              </a>
              {' '}— the complete operating system for AI agencies.
            </p>
          </div>

        </div>
      </div>
    </>
  )
}
