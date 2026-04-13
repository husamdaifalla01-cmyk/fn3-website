'use client'

import { useState } from 'react'
import { Button, Textarea } from '@/components/ui'
import { Card } from '@/components/ui'
import { Sparkles, AlertTriangle, CheckCircle, AlertCircle, MapPin } from 'lucide-react'
import { LeaseRiskBadge } from '@/components/dashboard/LeaseRiskBadge'
import { cn } from '@/lib/utils'

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
  'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
  'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
]

const TENANT_FRIENDLY_STATES = ['California', 'New York', 'Washington', 'Oregon', 'New Jersey', 'Massachusetts', 'Illinois', 'Colorado', 'Maryland', 'Connecticut']
const LANDLORD_FRIENDLY_STATES = ['Texas', 'Georgia', 'Florida', 'Alabama', 'Mississippi', 'Indiana', 'South Carolina', 'Tennessee', 'Oklahoma', 'Kansas']

const STATE_PROTECTIONS: Record<string, string[]> = {
  'California': ['AB 1482 rent control (max 5% + CPI annually)', 'Strict habitability standards (Civil Code §1941)', '21-day security deposit return window', 'Just-cause eviction required for covered units'],
  'New York': ['Warranty of habitability — affirmative landlord duty', 'HSTPA rent stabilization in NYC', '14-day notice required before eviction filing', 'Security deposit capped at 1 month rent'],
  'Washington': ['Residential Landlord-Tenant Act protections', 'Just-cause eviction (HB 1236)', '72-hour cure period for non-payment before eviction', 'Security deposit requires written condition report'],
  'Oregon': ['Statewide rent control (max 7% + CPI)', 'Just-cause eviction for month-to-month tenants', '10-day cure period for non-payment', 'Relocation assistance required in some no-cause terminations'],
}

const STATE_RISKS: Record<string, string[]> = {
  'Texas': ['No statewide rent control', 'Landlord may enter with reasonable notice (no statutory minimum)', '3-day notice to vacate before eviction filing', 'Self-help remedies prohibited but enforcement limited'],
  'Georgia': ['No rent control statewide', '3-day demand letter then immediate dispossessory filing', 'Tenant bears burden in habitability disputes', 'No statutory security deposit return timeline (35 days recommended)'],
  'Florida': ['No rent control (preempted by state law since 2023)', '3-day notice for non-payment, no cure for lease violations', 'Summary eviction process — expedited timeline', 'Limited implied warranty of habitability outside single-family'],
}

function JurisdictionBanner({ state }: { state: string }) {
  if (TENANT_FRIENDLY_STATES.includes(state) && STATE_PROTECTIONS[state]) {
    return (
      <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <p className="text-xs font-semibold text-blue-400">Extra protections active — {state}</p>
        </div>
        <ul className="space-y-1">
          {STATE_PROTECTIONS[state].map((p, i) => (
            <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
              <span className="text-blue-400 mt-0.5 shrink-0">·</span>{p}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  if (LANDLORD_FRIENDLY_STATES.includes(state) && STATE_RISKS[state]) {
    return (
      <div className="p-3 bg-orange-500/5 border border-orange-500/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-3.5 h-3.5 text-orange-400 shrink-0" />
          <p className="text-xs font-semibold text-orange-400">Note: {state} has fewer tenant protections — flagging landlord risk exposure</p>
        </div>
        <ul className="space-y-1">
          {STATE_RISKS[state].map((r, i) => (
            <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
              <span className="text-orange-400 mt-0.5 shrink-0">·</span>{r}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  if (state) {
    return (
      <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <p className="text-xs text-slate-400">{state} selected — analysis will reference applicable state landlord-tenant law</p>
        </div>
      </div>
    )
  }
  return null
}

interface LeaseAnalysis {
  risk_score: number
  risk_level: string
  summary: string
  flagged_clauses: Array<{ type: string; clause: string; risk: string; severity: string }>
  recommendations: string[]
  renewal_terms: string
  early_termination_risk: string
  pet_policy: string
  maintenance_responsibilities: string
  rent_increase_cap: string
}

interface LeaseAnalyzerProps {
  tenantId: string
  existingAnalysis: LeaseAnalysis | null
  existingLeaseText: string | null
}

export function LeaseAnalyzer({ tenantId, existingAnalysis, existingLeaseText }: LeaseAnalyzerProps) {
  const [leaseText, setLeaseText] = useState(existingLeaseText || '')
  const [analysis, setAnalysis] = useState<LeaseAnalysis | null>(existingAnalysis)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showInput, setShowInput] = useState(!existingAnalysis)
  const [selectedState, setSelectedState] = useState('')

  const handleAnalyze = async () => {
    if (!leaseText.trim()) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/analyze-lease', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leaseText, tenantId, state: selectedState || undefined }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Analysis failed')
      setAnalysis(data.analysis)
      setShowInput(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {showInput ? (
        <div className="space-y-3">
          {/* State/jurisdiction selector */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
              Property State (optional)
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-violet-500 transition-colors"
            >
              <option value="">Select state for jurisdiction-aware analysis...</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Jurisdiction banner */}
          {selectedState && <JurisdictionBanner state={selectedState} />}

          <Textarea
            label="Paste lease text"
            placeholder="Paste the full lease agreement text here for AI analysis..."
            rows={8}
            value={leaseText}
            onChange={(e) => setLeaseText(e.target.value)}
          />
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>
          )}
          <div className="flex gap-3">
            <Button onClick={handleAnalyze} loading={loading} disabled={!leaseText.trim()}>
              <Sparkles className="w-4 h-4" />
              Analyze Lease
            </Button>
            {analysis && (
              <Button variant="ghost" onClick={() => setShowInput(false)}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      ) : analysis ? (
        <div className="space-y-4">
          {/* Risk summary */}
          <div className="flex items-center justify-between">
            <LeaseRiskBadge score={analysis.risk_score} />
            <Button variant="ghost" size="sm" onClick={() => setShowInput(true)}>
              Re-analyze
            </Button>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">{analysis.summary}</p>

          {/* Flagged clauses */}
          {analysis.flagged_clauses.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider">Flagged Clauses</h4>
              {analysis.flagged_clauses.map((clause, i) => (
                <div
                  key={i}
                  className={cn(
                    'p-3 rounded-lg border',
                    clause.severity === 'high' ? 'bg-red-500/5 border-red-500/20' :
                    clause.severity === 'medium' ? 'bg-yellow-500/5 border-yellow-500/20' :
                    'bg-slate-800/50 border-slate-700'
                  )}
                >
                  <div className="flex items-start gap-2">
                    {clause.severity === 'high' ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                    ) : clause.severity === 'medium' ? (
                      <AlertCircle className="w-3.5 h-3.5 text-yellow-400 mt-0.5 shrink-0" />
                    ) : (
                      <CheckCircle className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                    )}
                    <div>
                      <p className={cn(
                        'text-xs font-semibold mb-1',
                        clause.severity === 'high' ? 'text-red-400' :
                        clause.severity === 'medium' ? 'text-yellow-400' :
                        'text-slate-400'
                      )}>
                        {clause.type}
                      </p>
                      <p className="text-xs text-slate-400 mb-1 italic">&quot;{clause.clause}&quot;</p>
                      <p className="text-xs text-slate-300">{clause.risk}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recommendations */}
          {analysis.recommendations.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Recommendations</h4>
              <ul className="space-y-1.5">
                {analysis.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-violet-400 mt-0.5 shrink-0">·</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key terms grid */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3">
              <p className="text-xs text-slate-500 mb-1">Renewal Terms</p>
              <p className="text-xs text-slate-300">{analysis.renewal_terms}</p>
            </Card>
            <Card className="p-3">
              <p className="text-xs text-slate-500 mb-1">Rent Increase Cap</p>
              <p className="text-xs text-slate-300">{analysis.rent_increase_cap}</p>
            </Card>
            <Card className="p-3">
              <p className="text-xs text-slate-500 mb-1">Pet Policy</p>
              <p className="text-xs text-slate-300">{analysis.pet_policy}</p>
            </Card>
            <Card className="p-3">
              <p className="text-xs text-slate-500 mb-1">Maintenance Responsibility</p>
              <p className="text-xs text-slate-300">{analysis.maintenance_responsibilities}</p>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 border border-slate-800 border-dashed rounded-xl">
          <Sparkles className="w-8 h-8 text-slate-700 mx-auto mb-3" />
          <p className="text-slate-400 text-sm mb-3">No lease analysis yet</p>
          <Button onClick={() => setShowInput(true)} variant="secondary" size="sm">
            Analyze Lease
          </Button>
        </div>
      )}
    </div>
  )
}
