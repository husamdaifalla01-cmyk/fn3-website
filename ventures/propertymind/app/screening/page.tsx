'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Zap,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Info,
  Shield,
  ChevronRight,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScreeningResult {
  income_ratio: {
    percentage: number
    monthly_income: number
    requested_rent: number
    assessment: string
    note: string
  }
  credit_assessment: {
    score_provided: string | null
    assessment: string
    note: string
  }
  red_flags: Array<{
    flag: string
    severity: 'high' | 'medium' | 'low'
    explanation: string
  }>
  positive_indicators: string[]
  reference_questions: string[]
  fair_housing_note: string
  recommendation: string
  recommendation_rationale: string
  conditions: string[]
}

const RECOMMENDATION_STYLES: Record<string, { color: string; bg: string; border: string; icon: React.ReactNode }> = {
  'Approve': {
    color: 'text-green-400',
    bg: 'bg-green-500/5',
    border: 'border-green-500/20',
    icon: <CheckCircle className="w-5 h-5 text-green-400" />,
  },
  'Approve with Conditions': {
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/5',
    border: 'border-yellow-500/20',
    icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
  },
  'Need More Information': {
    color: 'text-blue-400',
    bg: 'bg-blue-500/5',
    border: 'border-blue-500/20',
    icon: <Info className="w-5 h-5 text-blue-400" />,
  },
  'Decline': {
    color: 'text-red-400',
    bg: 'bg-red-500/5',
    border: 'border-red-500/20',
    icon: <AlertTriangle className="w-5 h-5 text-red-400" />,
  },
}

function severityColor(s: string) {
  if (s === 'high') return 'text-red-400 bg-red-500/10 border-red-500/20'
  if (s === 'medium') return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
  return 'text-slate-400 bg-slate-700 border-slate-600'
}

function incomeAssessmentColor(a: string) {
  if (a === 'Pass') return 'text-green-400'
  if (a === 'Marginal') return 'text-yellow-400'
  return 'text-red-400'
}

export default function TenantScreeningPage() {
  const [form, setForm] = useState({
    applicantName: '',
    monthlyIncome: '',
    requestedRent: '',
    creditScore: '',
    rentalHistory: '',
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ScreeningResult | null>(null)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/tenant-screening', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicantName: form.applicantName,
          monthlyIncome: parseFloat(form.monthlyIncome),
          requestedRent: parseFloat(form.requestedRent),
          creditScore: form.creditScore || undefined,
          rentalHistory: form.rentalHistory || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Screening failed')
      setResult(data.screening)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const recStyle = result
    ? (RECOMMENDATION_STYLES[result.recommendation] || RECOMMENDATION_STYLES['Need More Information'])
    : null

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
          <span className="text-sm text-slate-400 font-medium">Tenant Screening</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-violet-600/10 border border-violet-500/20 rounded-xl flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-violet-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Tenant Screening Report</h1>
          </div>
          <p className="text-slate-400 text-sm">
            AI-generated screening summary with Fair Housing Act compliance — income analysis, red flag detection, and reference questions.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-5">Applicant Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Applicant Name *</label>
                  <input
                    type="text"
                    required
                    value={form.applicantName}
                    onChange={(e) => setForm({ ...form, applicantName: e.target.value })}
                    placeholder="e.g. Sarah Johnson"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Monthly Gross Income *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                    <input
                      type="number"
                      required
                      min="0"
                      value={form.monthlyIncome}
                      onChange={(e) => setForm({ ...form, monthlyIncome: e.target.value })}
                      placeholder="5000"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-7 pr-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Requested Monthly Rent *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                    <input
                      type="number"
                      required
                      min="0"
                      value={form.requestedRent}
                      onChange={(e) => setForm({ ...form, requestedRent: e.target.value })}
                      placeholder="1500"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-7 pr-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Credit Score (self-reported)</label>
                  <input
                    type="number"
                    min="300"
                    max="850"
                    value={form.creditScore}
                    onChange={(e) => setForm({ ...form, creditScore: e.target.value })}
                    placeholder="e.g. 680"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Rental History</label>
                  <textarea
                    value={form.rentalHistory}
                    onChange={(e) => setForm({ ...form, rentalHistory: e.target.value })}
                    placeholder="Describe their rental history: previous landlords, how long they stayed, any late payments, evictions, notices, reasons for leaving..."
                    rows={5}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors resize-none"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-xs text-red-400">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Generate Screening Report
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-4">
            {!result && !loading && (
              <div className="bg-slate-900 border border-slate-800 border-dashed rounded-2xl p-12 text-center">
                <UserCheck className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Fill in the applicant details to generate a screening report</p>
              </div>
            )}

            {loading && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
                <Loader2 className="w-8 h-8 text-violet-400 animate-spin mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Analyzing application...</p>
              </div>
            )}

            {result && (
              <>
                {/* Recommendation */}
                {recStyle && (
                  <div className={cn('rounded-2xl border p-5', recStyle.bg, recStyle.border)}>
                    <div className="flex items-center gap-3 mb-2">
                      {recStyle.icon}
                      <div>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Recommendation</p>
                        <p className={cn('text-lg font-bold', recStyle.color)}>{result.recommendation}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{result.recommendation_rationale}</p>
                    {result.conditions.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-700/50">
                        <p className="text-xs font-medium text-slate-400 mb-2">Conditions:</p>
                        <ul className="space-y-1">
                          {result.conditions.map((c, i) => (
                            <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                              <ChevronRight className="w-3 h-3 text-yellow-400 mt-0.5 shrink-0" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Income Ratio */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-slate-300 mb-4">Income Analysis</h3>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-slate-500">Rent-to-Income Ratio</p>
                      <p className="text-2xl font-bold text-white">{result.income_ratio.percentage}%</p>
                    </div>
                    <div className={cn('text-sm font-semibold px-3 py-1.5 rounded-lg border',
                      result.income_ratio.assessment === 'Pass' ? 'text-green-400 bg-green-500/10 border-green-500/20' :
                      result.income_ratio.assessment === 'Marginal' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' :
                      'text-red-400 bg-red-500/10 border-red-500/20'
                    )}>
                      {result.income_ratio.assessment}
                    </div>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 mb-3">
                    <div
                      className={cn('h-2 rounded-full transition-all',
                        result.income_ratio.percentage <= 30 ? 'bg-green-500' :
                        result.income_ratio.percentage <= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      )}
                      style={{ width: `${Math.min(result.income_ratio.percentage, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400">{result.income_ratio.note}</p>
                  <p className="text-xs text-slate-600 mt-1">Industry standard: rent ≤ 30% of gross income</p>
                </div>

                {/* Credit */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-slate-300 mb-3">Credit Assessment</h3>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-slate-300">
                      {result.credit_assessment.score_provided
                        ? `Reported Score: ${result.credit_assessment.score_provided}`
                        : 'No score provided'}
                    </p>
                    <span className={cn('text-xs font-medium px-2 py-1 rounded border',
                      result.credit_assessment.assessment === 'Strong' ? 'text-green-400 bg-green-500/10 border-green-500/20' :
                      result.credit_assessment.assessment === 'Acceptable' ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' :
                      result.credit_assessment.assessment === 'Marginal' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' :
                      result.credit_assessment.assessment === 'Weak' ? 'text-red-400 bg-red-500/10 border-red-500/20' :
                      'text-slate-400 bg-slate-700 border-slate-600'
                    )}>
                      {result.credit_assessment.assessment}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{result.credit_assessment.note}</p>
                </div>

                {/* Red Flags */}
                {result.red_flags.length > 0 && (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      Red Flags ({result.red_flags.length})
                    </h3>
                    <div className="space-y-3">
                      {result.red_flags.map((flag, i) => (
                        <div key={i} className="p-3 bg-slate-800/50 rounded-lg">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="text-sm text-slate-200 font-medium">{flag.flag}</p>
                            <span className={cn('text-xs font-medium px-2 py-0.5 rounded border shrink-0', severityColor(flag.severity))}>
                              {flag.severity}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">{flag.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Positive Indicators */}
                {result.positive_indicators.length > 0 && (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Positive Indicators
                    </h3>
                    <ul className="space-y-2">
                      {result.positive_indicators.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Reference Questions */}
                {result.reference_questions.length > 0 && (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <h3 className="text-sm font-semibold text-slate-300 mb-3">Recommended Reference Questions</h3>
                    <ul className="space-y-2.5">
                      {result.reference_questions.map((q, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <span className="text-violet-400 font-bold text-xs mt-0.5 shrink-0">{i + 1}.</span>
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Fair Housing Note */}
                <div className="bg-violet-500/5 border border-violet-500/20 rounded-2xl p-4">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-violet-400 mb-1">Fair Housing Act Compliance</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{result.fair_housing_note}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
