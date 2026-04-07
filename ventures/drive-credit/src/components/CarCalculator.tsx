'use client'
import { useState } from 'react'
import { estimateCarValue, estimateCreditLine, YENDO_EXCLUDED_STATES } from '@/lib/offers'
import { trackAffiliateClick } from '@/lib/analytics'

const YEARS = Array.from({ length: 20 }, (_, i) => 2026 - i)

const CONDITIONS = [
  { key: 'excellent', label: '⭐ Excellent', desc: 'Like new, minimal wear' },
  { key: 'good',      label: '👍 Good',      desc: 'Normal wear, runs great' },
  { key: 'fair',      label: '🔧 Fair',       desc: 'Some issues, still drives' },
  { key: 'poor',      label: '⚙️ Poor',      desc: 'Major issues or high miles' },
] as const

const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']
const EXCLUDED = YENDO_EXCLUDED_STATES

export default function CarCalculator({ yendoUrl, slamDunkUrl }: { yendoUrl: string; slamDunkUrl: string }) {
  const [year, setYear]           = useState<number>(2020)
  const [condition, setCondition] = useState<'excellent'|'good'|'fair'|'poor'>('good')
  const [state, setState]         = useState<string>('')
  const [result, setResult]       = useState<{ carValue: number; low: number; high: number } | null>(null)
  const [step, setStep]           = useState<1|2|3>(1)

  const stateEligible = state && !EXCLUDED.includes(state)

  function calculate() {
    const carValue = estimateCarValue(year, condition)
    const { low, high } = estimateCreditLine(carValue)
    setResult({ carValue, low, high })
    setStep(3)
  }

  // Shared input styles
  const inputStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: 'white',
    borderRadius: '12px',
    padding: '12px 14px',
    width: '100%',
    fontSize: '1rem',
    outline: 'none',
  } as React.CSSProperties

  return (
    <div className="max-w-2xl mx-auto">
      {/* Dark warm card — inverted from the light page */}
      <div
        className="rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(150deg, #1c1917 0%, #292524 100%)',
          border: '1px solid rgba(217,119,6,0.2)',
          boxShadow: '0 24px 80px rgba(28,25,23,0.18), 0 0 0 1px rgba(217,119,6,0.1)',
        }}
      >
        {/* Header strip */}
        <div
          className="px-8 py-5 flex items-center justify-between"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-3">
            <div className="text-2xl">🚗</div>
            <div>
              <div className="font-black text-white text-base">Credit Line Estimator</div>
              <div className="text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>Free · No credit check · 30 seconds</div>
            </div>
          </div>
          {step < 3 && (
            <div className="flex gap-1.5">
              {[1,2].map(n => (
                <div
                  key={n}
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: step === n ? '32px' : '12px',
                    background: step === n ? '#d97706' : 'rgba(255,255,255,0.15)',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-8">

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-2">
                <div className="text-sm font-semibold mb-1" style={{ color: '#fbbf24' }}>Step 1 of 2</div>
                <div className="text-xl font-black text-white">Tell us about your car</div>
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Car Year
                </label>
                <select
                  value={year}
                  onChange={e => setYear(Number(e.target.value))}
                  style={inputStyle}
                  className="focus:ring-2 focus:ring-amber-500"
                >
                  {YEARS.map(y => <option key={y} value={y} style={{ background: '#292524' }}>{y}</option>)}
                </select>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Vehicle Condition
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {CONDITIONS.map(c => (
                    <button
                      key={c.key}
                      onClick={() => setCondition(c.key)}
                      className="p-3.5 rounded-xl text-left transition-all"
                      style={{
                        border: condition === c.key
                          ? '1.5px solid #d97706'
                          : '1px solid rgba(255,255,255,0.1)',
                        background: condition === c.key
                          ? 'rgba(217,119,6,0.14)'
                          : 'rgba(255,255,255,0.03)',
                      }}
                    >
                      <div
                        className="font-semibold text-sm"
                        style={{ color: condition === c.key ? '#fbbf24' : 'rgba(255,255,255,0.7)' }}
                      >
                        {c.label}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{c.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Your State
                </label>
                <select
                  value={state}
                  onChange={e => setState(e.target.value)}
                  style={inputStyle}
                >
                  <option value="" style={{ background: '#292524' }}>Select your state...</option>
                  {US_STATES.map(s => <option key={s} value={s} style={{ background: '#292524' }}>{s}</option>)}
                </select>
              </div>

              <button
                onClick={() => state ? setStep(2) : null}
                disabled={!state}
                className="w-full font-bold py-4 rounded-2xl text-white text-base transition-all"
                style={{
                  background: state
                    ? 'linear-gradient(135deg, #059669, #047857)'
                    : 'rgba(255,255,255,0.08)',
                  boxShadow: state ? '0 4px 20px rgba(5,150,105,0.35)' : 'none',
                  cursor: state ? 'pointer' : 'not-allowed',
                  color: state ? 'white' : 'rgba(255,255,255,0.3)',
                }}
              >
                {state ? 'See My Estimated Credit Range →' : 'Select your state to continue'}
              </button>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-2">
                <div className="text-sm font-semibold mb-1" style={{ color: '#fbbf24' }}>Step 2 of 2</div>
                <div className="text-xl font-black text-white">One quick question</div>
              </div>

              {/* Car value preview */}
              <div
                className="rounded-2xl p-5 text-center"
                style={{ background: 'rgba(217,119,6,0.1)', border: '1px solid rgba(217,119,6,0.2)' }}
              >
                <div className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Estimated value — {year} vehicle, {condition} condition
                </div>
                <div className="text-3xl font-black" style={{ color: '#fbbf24' }}>
                  ~${estimateCarValue(year, condition).toLocaleString()}
                </div>
                <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Based on average depreciation model
                </div>
              </div>

              <div>
                <div className="font-semibold text-white mb-4">Do you still owe money on this vehicle?</div>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={calculate}
                    className="w-full font-bold py-4 rounded-2xl text-white text-base transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #059669, #047857)',
                      boxShadow: '0 4px 20px rgba(5,150,105,0.35)',
                    }}
                  >
                    No — it's fully paid off
                  </button>
                  <button
                    onClick={calculate}
                    className="w-full font-semibold py-4 rounded-2xl text-sm transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.65)',
                    }}
                  >
                    Yes — I have a loan on it
                  </button>
                </div>
                <p className="text-xs text-center mt-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Either way — if you have equity, you may still qualify.
                </p>
              </div>

              <button
                onClick={() => setStep(1)}
                className="text-xs w-full text-center"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                ← Back
              </button>
            </div>
          )}

          {/* ── STEP 3: Result ── */}
          {step === 3 && result && (
            <div className="text-center">
              {stateEligible ? (
                <>
                  {/* Success state */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl"
                    style={{ background: 'rgba(52,211,153,0.15)', border: '1.5px solid rgba(52,211,153,0.3)' }}
                  >
                    ✓
                  </div>
                  <div className="text-sm font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Your {year} vehicle in {condition} condition
                  </div>
                  <div className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Estimated value: ~${result.carValue.toLocaleString()}
                  </div>
                  <div className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Estimated credit range:
                  </div>
                  <div
                    className="text-5xl font-black mb-2"
                    style={{ color: '#fbbf24', letterSpacing: '-0.02em' }}
                  >
                    ${result.low.toLocaleString()}–${result.high.toLocaleString()}
                  </div>
                  <div className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    Illustrative estimate only. Actual offer determined by Yendo.
                  </div>

                  <div
                    className="rounded-xl p-4 mb-6 text-left"
                    style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)' }}
                  >
                    <div className="text-sm font-semibold mb-1" style={{ color: '#34d399' }}>
                      ✓ {state} is an eligible state
                    </div>
                    <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      No hard credit pull to check eligibility. No deposit. You keep driving your car.
                    </div>
                  </div>

                  <a
                    href={yendoUrl}
                    target="_blank"
                    rel="nofollow noopener"
                    className="btn-primary block w-full text-base py-4 mb-3"
                    style={{ borderRadius: '16px' }}
                    onClick={() => trackAffiliateClick('calculator-result')}
                  >
                    Check My Actual Eligibility → (Soft Inquiry)
                  </a>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    Affiliate link · No hard credit pull to check · We may earn a commission
                  </p>
                </>
              ) : (
                <>
                  {/* Ineligible state — soft redirect to fallback */}
                  <div className="text-4xl mb-4">📍</div>
                  <div className="text-xl font-black text-white mb-3">
                    {state} isn't supported yet
                  </div>
                  <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Car-secured credit cards aren't available in all states. But personal loans up to $50,000 are — with any credit score.
                  </p>
                  <a
                    href={slamDunkUrl}
                    target="_blank"
                    rel="nofollow noopener"
                    className="btn-amber block w-full text-base py-4 mb-3"
                    style={{ borderRadius: '16px' }}
                    onClick={() => trackAffiliateClick('calculator-ineligible', 'slam-dunk')}
                  >
                    See Personal Loan Options →
                  </a>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>Affiliate link · We may earn a commission</p>
                </>
              )}
              <button
                onClick={() => { setStep(1); setResult(null); setState('') }}
                className="text-xs mt-5 block mx-auto"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                ← Start over
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-center mt-4" style={{ color: '#a8a29e' }}>
        Estimates use average depreciation models and may differ significantly from actual vehicle value or lender offer.
        Not financial advice. Check directly with Yendo for current eligibility criteria.
      </p>
    </div>
  )
}
