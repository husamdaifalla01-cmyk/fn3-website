'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Zap,
  Clock,
  TrendingUp,
  RefreshCw,
  FileText,
  AlertTriangle,
  CheckCircle,
  Loader2,
  ChevronRight,
  Sparkles,
  Building2,
} from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { formatDate, daysUntil, formatCurrency, cn } from '@/lib/utils'

interface ExpiringLease {
  id: string
  name: string
  unit_number: string | null
  property_name: string | null
  monthly_rent: number | null
  lease_end: string | null
  lease_text: string | null
  days_remaining: number
}

interface RenewalOffer {
  market_analysis: string
  suggested_rent: number
  suggested_increase_percent: string
  offer_letter: string
  renewal_options: Array<{
    option: string
    description: string
    pros: string[]
    cons: string[]
  }>
  recommended_option: string
  negotiation_tips: string[]
}

export default function RenewalsPage() {
  const [leases, setLeases] = useState<ExpiringLease[]>([])
  const [loading, setLoading] = useState(true)
  const [generatingFor, setGeneratingFor] = useState<string | null>(null)
  const [analyzingFor, setAnalyzingFor] = useState<string | null>(null)
  const [renewalOffers, setRenewalOffers] = useState<Record<string, RenewalOffer>>({})
  const [leaseAnalyses, setLeaseAnalyses] = useState<Record<string, string>>({})
  const [expandedOffer, setExpandedOffer] = useState<string | null>(null)
  const [expandedAnalysis, setExpandedAnalysis] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data } = await supabase
        .from('pm_tenants')
        .select(`
          id, name, monthly_rent, lease_end, lease_text,
          pm_units(unit_number, pm_properties(name))
        `)
        .eq('user_id', user.id)
        .not('lease_end', 'is', null)
        .order('lease_end', { ascending: true })

      if (data) {
        const expiring = data
          .map((t) => {
            const unit = t.pm_units as unknown as { unit_number: string; pm_properties: { name: string } } | null
            const days = daysUntil(t.lease_end)
            return {
              id: t.id,
              name: t.name,
              unit_number: unit?.unit_number || null,
              property_name: unit?.pm_properties?.name || null,
              monthly_rent: t.monthly_rent,
              lease_end: t.lease_end,
              lease_text: t.lease_text,
              days_remaining: days ?? 999,
            }
          })
          .filter((t) => t.days_remaining >= 0 && t.days_remaining <= 90)
          .sort((a, b) => a.days_remaining - b.days_remaining)
        setLeases(expiring)
      }
      setLoading(false)
    }
    load()
  }, [supabase])

  async function generateRenewalOffer(lease: ExpiringLease) {
    setGeneratingFor(lease.id)
    try {
      const res = await fetch('/api/lease-renewal-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantName: lease.name,
          unitNumber: lease.unit_number || 'N/A',
          propertyName: lease.property_name || 'Property',
          currentRent: lease.monthly_rent || 0,
          leaseEndDate: lease.lease_end,
          daysRemaining: lease.days_remaining,
        }),
      })
      const data = await res.json()
      if (res.ok && data.offer) {
        setRenewalOffers((prev) => ({ ...prev, [lease.id]: data.offer }))
        setExpandedOffer(lease.id)
      }
    } catch {
      // fail silently
    } finally {
      setGeneratingFor(null)
    }
  }

  async function analyzeRenewalTerms(lease: ExpiringLease) {
    if (!lease.lease_text) return
    setAnalyzingFor(lease.id)
    try {
      const res = await fetch('/api/analyze-lease', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leaseText: lease.lease_text }),
      })
      const data = await res.json()
      if (res.ok && data.analysis) {
        const summary = `Risk Score: ${data.analysis.risk_score}/100 (${data.analysis.risk_level.toUpperCase()})\n\n${data.analysis.summary}\n\nTop flags: ${data.analysis.flagged_clauses.slice(0, 3).map((c: { type: string; severity: string }) => `${c.type} (${c.severity})`).join(', ')}`
        setLeaseAnalyses((prev) => ({ ...prev, [lease.id]: summary }))
        setExpandedAnalysis(lease.id)
      }
    } catch {
      // fail silently
    } finally {
      setAnalyzingFor(null)
    }
  }

  function urgencyColor(days: number) {
    if (days <= 30) return 'text-red-400 bg-red-500/10 border-red-500/20'
    if (days <= 60) return 'text-orange-400 bg-orange-500/10 border-orange-500/20'
    return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Nav */}
      <nav className="border-b border-slate-800/50 backdrop-blur-sm sticky top-0 z-50 bg-slate-950/90">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white text-lg tracking-tight">PropertyMind</span>
          </Link>
          <span className="text-slate-700">·</span>
          <span className="text-sm text-slate-400 font-medium">Lease Renewals</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-violet-600/10 border border-violet-500/20 rounded-xl flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-violet-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Lease Renewals</h1>
          </div>
          <p className="text-slate-400 text-sm">
            Leases expiring in the next 90 days. Generate AI renewal offers and analyze lease terms.
          </p>
        </div>

        {/* Summary bar */}
        {!loading && leases.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              {
                label: 'Expiring ≤30 days',
                value: leases.filter(l => l.days_remaining <= 30).length,
                color: 'text-red-400',
              },
              {
                label: 'Expiring 31–60 days',
                value: leases.filter(l => l.days_remaining > 30 && l.days_remaining <= 60).length,
                color: 'text-orange-400',
              },
              {
                label: 'Expiring 61–90 days',
                value: leases.filter(l => l.days_remaining > 60).length,
                color: 'text-yellow-400',
              },
            ].map((s) => (
              <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <p className={cn('text-2xl font-bold', s.color)}>{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Lease list */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-slate-900 border border-slate-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : leases.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 border-dashed rounded-2xl p-12 text-center">
            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <p className="text-slate-300 font-medium mb-1">No leases expiring in the next 90 days</p>
            <p className="text-slate-500 text-sm">All your leases are in good standing.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leases.map((lease) => {
              const hasOffer = !!renewalOffers[lease.id]
              const hasAnalysis = !!leaseAnalyses[lease.id]
              return (
                <div
                  key={lease.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
                >
                  {/* Main row */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-9 h-9 bg-violet-600/10 border border-violet-500/20 rounded-lg flex items-center justify-center shrink-0">
                          <Building2 className="w-4 h-4 text-violet-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">{lease.name}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 flex-wrap">
                            {lease.unit_number && <span>Unit {lease.unit_number}</span>}
                            {lease.property_name && <span>· {lease.property_name}</span>}
                            {lease.monthly_rent && (
                              <span>· {formatCurrency(lease.monthly_rent)}/mo</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className={cn('text-xs font-semibold px-2.5 py-1.5 rounded-lg border inline-flex items-center gap-1.5', urgencyColor(lease.days_remaining))}>
                          <Clock className="w-3 h-3" />
                          {lease.days_remaining}d remaining
                        </div>
                        <p className="text-xs text-slate-600 mt-1">Expires {formatDate(lease.lease_end)}</p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 mt-4 flex-wrap">
                      <button
                        onClick={() => generateRenewalOffer(lease)}
                        disabled={generatingFor === lease.id}
                        className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-violet-600/10 border border-violet-500/20 text-violet-400 hover:bg-violet-600/20 rounded-lg transition-all disabled:opacity-50"
                      >
                        {generatingFor === lease.id ? (
                          <><Loader2 className="w-3 h-3 animate-spin" />Generating...</>
                        ) : (
                          <><Sparkles className="w-3 h-3" />Generate renewal offer</>
                        )}
                      </button>

                      {lease.lease_text && (
                        <button
                          onClick={() => analyzeRenewalTerms(lease)}
                          disabled={analyzingFor === lease.id}
                          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-300 hover:border-slate-600 rounded-lg transition-all disabled:opacity-50"
                        >
                          {analyzingFor === lease.id ? (
                            <><Loader2 className="w-3 h-3 animate-spin" />Analyzing...</>
                          ) : (
                            <><FileText className="w-3 h-3" />Analyze renewal terms</>
                          )}
                        </button>
                      )}

                      {hasOffer && (
                        <button
                          onClick={() => setExpandedOffer(expandedOffer === lease.id ? null : lease.id)}
                          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 rounded-lg transition-all"
                        >
                          <TrendingUp className="w-3 h-3" />
                          {expandedOffer === lease.id ? 'Hide offer' : 'View offer'}
                        </button>
                      )}

                      {hasAnalysis && (
                        <button
                          onClick={() => setExpandedAnalysis(expandedAnalysis === lease.id ? null : lease.id)}
                          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500/20 rounded-lg transition-all"
                        >
                          <AlertTriangle className="w-3 h-3" />
                          {expandedAnalysis === lease.id ? 'Hide analysis' : 'View analysis'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Renewal offer expanded */}
                  {expandedOffer === lease.id && hasOffer && (
                    <div className="border-t border-slate-800 p-5 bg-slate-950/40">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-4 h-4 text-violet-400" />
                        <p className="text-sm font-semibold text-violet-400">AI Renewal Offer</p>
                      </div>
                      {(() => {
                        const offer = renewalOffers[lease.id]
                        return (
                          <div className="space-y-4">
                            {/* Suggested rent */}
                            <div className="flex items-center gap-4 p-3 bg-slate-900 rounded-xl border border-slate-800">
                              <div>
                                <p className="text-xs text-slate-500">Current Rent</p>
                                <p className="text-lg font-bold text-white">{formatCurrency(lease.monthly_rent || 0)}</p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-600" />
                              <div>
                                <p className="text-xs text-slate-500">Suggested Renewal</p>
                                <p className="text-lg font-bold text-green-400">{formatCurrency(offer.suggested_rent)}</p>
                              </div>
                              <div className="ml-auto text-xs text-slate-400">
                                +{offer.suggested_increase_percent}% increase
                              </div>
                            </div>

                            {/* Market analysis */}
                            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                              <p className="text-xs font-medium text-slate-400 mb-1.5">Market Analysis</p>
                              <p className="text-xs text-slate-300 leading-relaxed">{offer.market_analysis}</p>
                            </div>

                            {/* Renewal options */}
                            {offer.renewal_options.length > 0 && (
                              <div className="space-y-2">
                                <p className="text-xs font-medium text-slate-400">Renewal Options</p>
                                {offer.renewal_options.map((opt, i) => (
                                  <div key={i} className={cn(
                                    'p-3 rounded-xl border',
                                    offer.recommended_option === opt.option
                                      ? 'bg-violet-500/5 border-violet-500/20'
                                      : 'bg-slate-900 border-slate-800'
                                  )}>
                                    <div className="flex items-center gap-2 mb-1">
                                      <p className="text-xs font-semibold text-slate-200">{opt.option}</p>
                                      {offer.recommended_option === opt.option && (
                                        <span className="text-xs text-violet-400 bg-violet-600/10 border border-violet-500/20 px-1.5 py-0.5 rounded">Recommended</span>
                                      )}
                                    </div>
                                    <p className="text-xs text-slate-400">{opt.description}</p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Offer letter */}
                            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                              <p className="text-xs font-medium text-slate-400 mb-2">Offer Letter Draft</p>
                              <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed font-mono">{offer.offer_letter}</p>
                            </div>
                          </div>
                        )
                      })()}
                    </div>
                  )}

                  {/* Lease analysis expanded */}
                  {expandedAnalysis === lease.id && hasAnalysis && (
                    <div className="border-t border-slate-800 p-5 bg-slate-950/40">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-4 h-4 text-orange-400" />
                        <p className="text-sm font-semibold text-orange-400">Lease Analysis Summary</p>
                      </div>
                      <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">{leaseAnalyses[lease.id]}</p>
                      <Link
                        href={`/dashboard/tenants/${lease.id}`}
                        className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 mt-3 transition-colors"
                      >
                        View full analysis in tenant profile
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
