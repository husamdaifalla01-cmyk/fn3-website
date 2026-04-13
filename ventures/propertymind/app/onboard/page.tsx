'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Zap, ArrowRight, CheckCircle, Upload, Building2, MessageSquare, Wrench, Sparkles } from 'lucide-react'
import Link from 'next/link'

const UNIT_OPTIONS = [
  { value: '1-5', label: '1–5 units', desc: 'Getting started' },
  { value: '6-20', label: '6–20 units', desc: 'Small portfolio' },
  { value: '21-50', label: '21–50 units', desc: 'Mid-size portfolio' },
  { value: '50+', label: '50+ units', desc: 'Large portfolio' },
]

const PAIN_OPTIONS = [
  { value: 'lease', label: 'Lease review', icon: CheckCircle, desc: 'Hours spent reading & flagging clauses' },
  { value: 'comms', label: 'Tenant communications', icon: MessageSquare, desc: 'Responding to every email and message' },
  { value: 'maintenance', label: 'Maintenance coordination', icon: Wrench, desc: 'Tracking requests and chasing vendors' },
  { value: 'all', label: 'All of the above', icon: Sparkles, desc: 'The whole job needs a system' },
]

export default function OnboardPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [units, setUnits] = useState<string | null>(null)
  const [pain, setPain] = useState<string | null>(null)
  const [leaseText, setLeaseText] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<null | { risk_score: number; summary: string; flagged_clauses: Array<{ type: string; severity: string; risk: string }> }>(null)
  const [error, setError] = useState<string | null>(null)

  const progress = (step / 3) * 100

  async function handleAnalyze() {
    if (!leaseText.trim()) return
    setAnalyzing(true)
    setError(null)
    try {
      const res = await fetch('/api/analyze-lease', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leaseText }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Analysis failed')
      setAnalysisResult(data.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze')
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Nav */}
      <nav className="border-b border-slate-800/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-white text-lg tracking-tight">PropertyMind</span>
        </div>
        <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
          Sign in instead
        </Link>
      </nav>

      {/* Progress */}
      <div className="w-full bg-slate-900 h-1">
        <div
          className="h-1 bg-violet-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl">

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                  s < step ? 'bg-violet-600 text-white' :
                  s === step ? 'bg-violet-600 text-white ring-2 ring-violet-400/40' :
                  'bg-slate-800 text-slate-500'
                }`}>
                  {s < step ? <CheckCircle className="w-4 h-4" /> : s}
                </div>
                {s < 3 && <div className={`w-12 h-px ${s < step ? 'bg-violet-600' : 'bg-slate-700'}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Units */}
          {step === 1 && (
            <div>
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-violet-600/10 border border-violet-500/20 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-violet-400" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white text-center mb-2">How many rental units do you manage?</h1>
              <p className="text-slate-400 text-center mb-8">We&apos;ll tailor PropertyMind to your portfolio size.</p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {UNIT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setUnits(opt.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      units === opt.value
                        ? 'bg-violet-600/10 border-violet-500/60 ring-1 ring-violet-500/40'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <p className="font-semibold text-white mb-0.5">{opt.label}</p>
                    <p className="text-xs text-slate-500">{opt.desc}</p>
                  </button>
                ))}
              </div>

              <button
                onClick={() => units && setStep(2)}
                disabled={!units}
                className="w-full py-3.5 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2: Pain point */}
          {step === 2 && (
            <div>
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-violet-600/10 border border-violet-500/20 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-violet-400" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white text-center mb-2">What&apos;s your biggest time drain?</h1>
              <p className="text-slate-400 text-center mb-8">We&apos;ll surface the most useful feature first.</p>

              <div className="space-y-3 mb-8">
                {PAIN_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setPain(opt.value)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-4 ${
                      pain === opt.value
                        ? 'bg-violet-600/10 border-violet-500/60 ring-1 ring-violet-500/40'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      pain === opt.value ? 'bg-violet-600/20' : 'bg-slate-800'
                    }`}>
                      <opt.icon className={`w-4 h-4 ${pain === opt.value ? 'text-violet-400' : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{opt.label}</p>
                      <p className="text-xs text-slate-500">{opt.desc}</p>
                    </div>
                    {pain === opt.value && (
                      <CheckCircle className="w-4 h-4 text-violet-400 ml-auto shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => pain && setStep(3)}
                  disabled={!pain}
                  className="flex-1 py-3.5 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Upload lease */}
          {step === 3 && (
            <div>
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-violet-600/10 border border-violet-500/20 rounded-2xl flex items-center justify-center">
                  <Upload className="w-6 h-6 text-violet-400" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white text-center mb-2">Upload your first lease</h1>
              <p className="text-slate-400 text-center mb-8">Paste any lease text below to see exactly what PropertyMind finds — free, right now, no account required.</p>

              {!analysisResult ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Lease text</label>
                    <textarea
                      rows={8}
                      value={leaseText}
                      onChange={(e) => setLeaseText(e.target.value)}
                      placeholder="Paste any section of a lease agreement here — even a paragraph is enough to demonstrate the analysis..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-violet-500 resize-none transition-colors"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">{error}</div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleAnalyze}
                      disabled={analyzing || !leaseText.trim()}
                      className="flex-1 py-3.5 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      {analyzing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Analyze this lease
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-center text-xs text-slate-600">
                    Skip this step —{' '}
                    <Link href="/login" className="text-violet-400 hover:text-violet-300 transition-colors">
                      go straight to your dashboard
                    </Link>
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Risk score */}
                  <div className={`p-4 rounded-xl border ${
                    analysisResult.risk_score >= 70 ? 'bg-red-500/5 border-red-500/20' :
                    analysisResult.risk_score >= 40 ? 'bg-yellow-500/5 border-yellow-500/20' :
                    'bg-green-500/5 border-green-500/20'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Risk Score</p>
                      <span className={`text-lg font-bold ${
                        analysisResult.risk_score >= 70 ? 'text-red-400' :
                        analysisResult.risk_score >= 40 ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {analysisResult.risk_score}/100
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{analysisResult.summary}</p>
                  </div>

                  {/* Flagged clauses */}
                  {analysisResult.flagged_clauses && analysisResult.flagged_clauses.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Flagged Clauses</p>
                      {analysisResult.flagged_clauses.slice(0, 3).map((clause, i) => (
                        <div key={i} className={`p-3 rounded-lg border text-sm ${
                          clause.severity === 'high' ? 'bg-red-500/5 border-red-500/20' :
                          'bg-yellow-500/5 border-yellow-500/20'
                        }`}>
                          <p className={`text-xs font-semibold mb-1 ${
                            clause.severity === 'high' ? 'text-red-400' : 'text-yellow-400'
                          }`}>{clause.type}</p>
                          <p className="text-xs text-slate-300">{clause.risk}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="p-4 bg-violet-600/5 border border-violet-500/20 rounded-xl text-center">
                    <p className="text-sm text-slate-300 mb-3">
                      Full analysis saved. Create your account to see all flags, recommendations, and renewal tracking.
                    </p>
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-sm transition-all"
                    >
                      Start free trial
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
