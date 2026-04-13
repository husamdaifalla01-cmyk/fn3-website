'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'

const departments = ['Sales', 'Marketing', 'Customer Support', 'Operations', 'Legal', 'Finance']

const revenueRanges = [
  'Under $10K/month',
  '$10K–$50K/month',
  '$50K–$150K/month',
  '$150K–$500K/month',
  '$500K+/month',
  'Pre-revenue',
]

type FormState = {
  companyName: string
  industry: string
  employeeCount: string
  monthlyRevenue: string
  departments: string[]
  bottleneck: string
  expectedResults: string
}

const initialState: FormState = {
  companyName: '',
  industry: '',
  employeeCount: '',
  monthlyRevenue: '',
  departments: [],
  bottleneck: '',
  expectedResults: '',
}

export default function ApplicationForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const validate = (): boolean => {
    const errors: Partial<Record<keyof FormState, string>> = {}
    if (!form.companyName.trim()) errors.companyName = 'Company name is required'
    if (!form.industry.trim()) errors.industry = 'Industry is required'
    if (!form.employeeCount) errors.employeeCount = 'Please select team size'
    if (!form.monthlyRevenue) errors.monthlyRevenue = 'Please select revenue range'
    if (form.departments.length === 0) errors.departments = 'Select at least one department'
    if (!form.bottleneck.trim() || form.bottleneck.trim().length < 20)
      errors.bottleneck = 'Please describe your bottleneck (at least 20 characters)'
    if (!form.expectedResults.trim() || form.expectedResults.trim().length < 20)
      errors.expectedResults = 'Please describe expected results (at least 20 characters)'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleDeptToggle = (dept: string) => {
    setForm((prev) => ({
      ...prev,
      departments: prev.departments.includes(dept)
        ? prev.departments.filter((d) => d !== dept)
        : [...prev.departments, dept],
    }))
    if (fieldErrors.departments) {
      setFieldErrors((prev) => ({ ...prev, departments: undefined }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setError(null)

    try {
      const { error: supabaseError } = await supabase.from('applications').insert([
        {
          company_name: form.companyName,
          industry: form.industry,
          employee_count: form.employeeCount,
          monthly_revenue: form.monthlyRevenue,
          departments: form.departments,
          bottleneck: form.bottleneck,
          expected_results: form.expectedResults,
          created_at: new Date().toISOString(),
        },
      ])

      if (supabaseError) throw supabaseError

      setSubmitted(true)
      setForm(initialState)
    } catch (err) {
      console.error('Submission error:', err)
      setError('Something went wrong. Please try again or email us directly at hello@fn3.agency')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (field: keyof FormState) =>
    `w-full bg-surface-3 border rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder-text-muted outline-none transition-all duration-200 form-input ${
      fieldErrors[field]
        ? 'border-red-500/50 focus:border-red-500'
        : 'border-white/[0.08] focus:border-accent hover:border-white/20'
    }`

  return (
    <section id="apply" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background to-surface/30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent/[0.06] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            Applications Open — Q2 2026
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4">
            Apply for Your{' '}
            <span className="gradient-text">AI Workforce</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            We review every application. We only take clients we&apos;re confident we can deliver results for.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-surface border border-accent/30 rounded-2xl p-10 text-center shadow-accent"
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-3">Application Received</h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                We&apos;ll review your application and reach out within 48 hours. Keep an eye on your inbox — we review every application personally and only move forward when we&apos;re confident we can deliver serious results for your business.
              </p>
              <div className="inline-flex items-center gap-2 text-xs text-text-muted bg-surface-3 border border-white/[0.06] px-4 py-2.5 rounded-lg">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                Check your inbox — we&apos;ll reply within 48 hours
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-surface border border-white/[0.08] rounded-2xl p-7 md:p-10 shadow-card space-y-6"
              >
                {/* Company + Industry */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Company name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      value={form.companyName}
                      onChange={(e) => {
                        setForm((p) => ({ ...p, companyName: e.target.value }))
                        if (fieldErrors.companyName) setFieldErrors((p) => ({ ...p, companyName: undefined }))
                      }}
                      className={inputClass('companyName')}
                    />
                    {fieldErrors.companyName && (
                      <p className="text-red-400 text-xs mt-1">{fieldErrors.companyName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Industry <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="E.g. SaaS, Law Firm, E-commerce"
                      value={form.industry}
                      onChange={(e) => {
                        setForm((p) => ({ ...p, industry: e.target.value }))
                        if (fieldErrors.industry) setFieldErrors((p) => ({ ...p, industry: undefined }))
                      }}
                      className={inputClass('industry')}
                    />
                    {fieldErrors.industry && (
                      <p className="text-red-400 text-xs mt-1">{fieldErrors.industry}</p>
                    )}
                  </div>
                </div>

                {/* Employee count + Revenue */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Number of employees <span className="text-accent">*</span>
                    </label>
                    <select
                      value={form.employeeCount}
                      onChange={(e) => {
                        setForm((p) => ({ ...p, employeeCount: e.target.value }))
                        if (fieldErrors.employeeCount) setFieldErrors((p) => ({ ...p, employeeCount: undefined }))
                      }}
                      className={`${inputClass('employeeCount')} cursor-pointer`}
                    >
                      <option value="">Select size</option>
                      {['1–5', '6–10', '11–20', '21–50', '51–100', '100+'].map((s) => (
                        <option key={s} value={s} className="bg-surface-3">{s} employees</option>
                      ))}
                    </select>
                    {fieldErrors.employeeCount && (
                      <p className="text-red-400 text-xs mt-1">{fieldErrors.employeeCount}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Monthly revenue <span className="text-accent">*</span>
                    </label>
                    <select
                      value={form.monthlyRevenue}
                      onChange={(e) => {
                        setForm((p) => ({ ...p, monthlyRevenue: e.target.value }))
                        if (fieldErrors.monthlyRevenue) setFieldErrors((p) => ({ ...p, monthlyRevenue: undefined }))
                      }}
                      className={`${inputClass('monthlyRevenue')} cursor-pointer`}
                    >
                      <option value="">Select range</option>
                      {revenueRanges.map((r) => (
                        <option key={r} value={r} className="bg-surface-3">{r}</option>
                      ))}
                    </select>
                    {fieldErrors.monthlyRevenue && (
                      <p className="text-red-400 text-xs mt-1">{fieldErrors.monthlyRevenue}</p>
                    )}
                  </div>
                </div>

                {/* Departments */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-3">
                    Which departments interest you? <span className="text-accent">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {departments.map((dept) => {
                      const selected = form.departments.includes(dept)
                      return (
                        <button
                          key={dept}
                          type="button"
                          onClick={() => handleDeptToggle(dept)}
                          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 text-left ${
                            selected
                              ? 'bg-accent/15 border-accent/40 text-accent'
                              : 'bg-surface-3 border-white/[0.07] text-text-secondary hover:border-white/20 hover:text-text-primary'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                            selected ? 'bg-accent border-accent' : 'border-white/20'
                          }`}>
                            {selected && (
                              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                              </svg>
                            )}
                          </div>
                          {dept}
                        </button>
                      )
                    })}
                  </div>
                  {fieldErrors.departments && (
                    <p className="text-red-400 text-xs mt-2">{fieldErrors.departments}</p>
                  )}
                </div>

                {/* Bottleneck */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    What&apos;s your biggest operational bottleneck? <span className="text-accent">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe the repetitive tasks eating your time, where you feel most overwhelmed, or the gaps in your operation that are costing you..."
                    value={form.bottleneck}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, bottleneck: e.target.value }))
                      if (fieldErrors.bottleneck) setFieldErrors((p) => ({ ...p, bottleneck: undefined }))
                    }}
                    className={`${inputClass('bottleneck')} resize-none`}
                  />
                  <div className="flex items-center justify-between mt-1">
                    {fieldErrors.bottleneck ? (
                      <p className="text-red-400 text-xs">{fieldErrors.bottleneck}</p>
                    ) : (
                      <p className="text-text-muted text-xs">The more specific, the better we can evaluate fit.</p>
                    )}
                    <span className={`text-xs ml-auto ${form.bottleneck.length > 20 ? 'text-text-muted' : 'text-red-400/60'}`}>
                      {form.bottleneck.length}/20 min
                    </span>
                  </div>
                </div>

                {/* Expected Results in 90 Days */}
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    What results do you expect in 90 days? <span className="text-accent">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g., Cut proposal time from 3 hours to 20 minutes, handle 100 inbound leads without adding headcount"
                    value={form.expectedResults}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, expectedResults: e.target.value }))
                      if (fieldErrors.expectedResults) setFieldErrors((p) => ({ ...p, expectedResults: undefined }))
                    }}
                    className={`${inputClass('expectedResults')} resize-none`}
                  />
                  <div className="flex items-center justify-between mt-1">
                    {fieldErrors.expectedResults ? (
                      <p className="text-red-400 text-xs">{fieldErrors.expectedResults}</p>
                    ) : (
                      <p className="text-text-muted text-xs">Specific goals help us design agents that hit your exact targets.</p>
                    )}
                    <span className={`text-xs ml-auto ${form.expectedResults.length > 20 ? 'text-text-muted' : 'text-red-400/60'}`}>
                      {form.expectedResults.length}/20 min
                    </span>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                  >
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-400">{error}</p>
                  </motion.div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02, boxShadow: '0 0 30px rgba(124, 92, 252, 0.4)' } : {}}
                  whileTap={!loading ? { scale: 0.97 } : {}}
                  className="w-full bg-accent hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-accent flex items-center justify-center gap-2 text-base"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting application...
                    </>
                  ) : (
                    <>
                      Submit Application — We&apos;ll Respond Within 24 Hours
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </>
                  )}
                </motion.button>

                <div className="space-y-2 text-center">
                  <p className="text-xs text-text-muted">
                    By submitting, you agree to be contacted about your AI workforce deployment.
                    We review every application within 24 hours.
                  </p>
                  <p className="text-xs text-text-secondary font-medium">
                    Reviewed personally by FN3 founders. Not an automated system.
                  </p>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
