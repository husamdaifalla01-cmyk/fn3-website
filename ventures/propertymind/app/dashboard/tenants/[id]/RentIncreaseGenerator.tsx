'use client'

import { useState } from 'react'
import { DollarSign, Sparkles, Loader2, ChevronDown, ChevronUp, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RentIncreaseResult {
  notice_period_required: string
  notice_period_days: number
  earliest_send_date: string
  state_law_citation: string
  notice_letter: string
  mailing_instructions: string
  return_receipt_recommended: boolean
  important_notes: string[]
  compliance_checklist: string[]
}

interface Props {
  tenantName: string
  unitNumber: string
  currentRent: number | null
}

export function RentIncreaseGenerator({ tenantName, unitNumber, currentRent }: Props) {
  const [form, setForm] = useState({
    newRent: '',
    effectiveDate: '',
    state: '',
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<RentIncreaseResult | null>(null)
  const [error, setError] = useState('')
  const [showLetter, setShowLetter] = useState(false)

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    if (!currentRent) return
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/rent-increase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantName,
          unit: unitNumber,
          currentRent,
          newRent: parseFloat(form.newRent),
          effectiveDate: form.effectiveDate,
          state: form.state.toUpperCase(),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Generation failed')
      setResult(data.notice)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {!result ? (
        <form onSubmit={handleGenerate} className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">New Monthly Rent *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                <input
                  type="number"
                  required
                  min={currentRent || 0}
                  value={form.newRent}
                  onChange={(e) => setForm({ ...form, newRent: e.target.value })}
                  placeholder={currentRent ? String(Math.round(currentRent * 1.05)) : ''}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-7 pr-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Effective Date *</label>
              <input
                type="date"
                required
                value={form.effectiveDate}
                onChange={(e) => setForm({ ...form, effectiveDate: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">State *</label>
              <input
                type="text"
                required
                maxLength={2}
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                placeholder="CA"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </div>

          {currentRent && form.newRent && (
            <p className="text-xs text-slate-500">
              Increase: ${(parseFloat(form.newRent) - currentRent).toFixed(0)}/mo
              ({(((parseFloat(form.newRent) - currentRent) / currentRent) * 100).toFixed(1)}%)
            </p>
          )}

          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !currentRent}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" />Generating...</>
            ) : (
              <><Sparkles className="w-4 h-4" />Generate Notice</>
            )}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          {/* Key info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-500 mb-0.5">Required Notice Period</p>
              <p className="text-sm font-semibold text-white">{result.notice_period_required}</p>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-500 mb-0.5">Earliest Send Date</p>
              <p className="text-sm font-semibold text-white">{result.earliest_send_date}</p>
            </div>
          </div>

          {/* Law citation */}
          <div className="flex items-start gap-2 p-3 bg-violet-500/5 border border-violet-500/20 rounded-lg">
            <Shield className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
            <p className="text-xs text-slate-300">{result.state_law_citation}</p>
          </div>

          {/* Compliance checklist */}
          {result.compliance_checklist.length > 0 && (
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <p className="text-xs font-medium text-slate-400 mb-2">Before You Send</p>
              <ul className="space-y-1">
                {result.compliance_checklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="w-4 h-4 border border-slate-600 rounded shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Mailing instructions */}
          <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-xs font-medium text-slate-400 mb-1">Mailing Instructions</p>
            <p className="text-xs text-slate-300">{result.mailing_instructions}</p>
            {result.return_receipt_recommended && (
              <p className="text-xs text-yellow-400 mt-1">Return receipt recommended</p>
            )}
          </div>

          {/* Important notes */}
          {result.important_notes.length > 0 && (
            <div className="p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
              <p className="text-xs font-medium text-yellow-400 mb-1.5">Important Notes</p>
              <ul className="space-y-1">
                {result.important_notes.map((note, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <span className="text-yellow-500 shrink-0">·</span>{note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Notice letter toggle */}
          <button
            onClick={() => setShowLetter(!showLetter)}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-800 border border-slate-700 hover:border-slate-600 text-sm text-slate-300 rounded-lg transition-colors"
          >
            <span className="font-medium">View Notice Letter</span>
            {showLetter ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showLetter && (
            <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed font-mono">{result.notice_letter}</p>
            </div>
          )}

          <button
            onClick={() => setResult(null)}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Generate another notice
          </button>
        </div>
      )}
    </div>
  )
}
