'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Practice, IncidentSeverity } from '@/types'
import { formatDateTime } from '@/lib/utils'

interface IncidentLoggerProps {
  practice: Practice
}

interface IncidentFormData {
  incidentType: string
  description: string
  affectedCount: number
  discoveryDate: string
  severity: IncidentSeverity
}

interface ResponseData {
  responseGuidance: string
  severity: string
  requiresImmediateNotification: boolean
  notificationDeadline: string
  annualReportDeadline: string
  affectedCount: number
  ocrPortalUrl: string
}

const INCIDENT_TYPES = [
  'Unauthorized access to PHI by workforce member',
  'External data breach / hacking',
  'Lost or stolen device (laptop, phone, tablet)',
  'Lost or stolen paper records',
  'Misdirected fax or email containing PHI',
  'Improper disposal of PHI',
  'Ransomware attack',
  'Unauthorized disclosure to wrong patient',
  'Social media violation',
  'Verbal disclosure without authorization',
  'Other',
]

const SEVERITY_OPTIONS: { value: IncidentSeverity; label: string; description: string; color: string }[] = [
  { value: 'low', label: 'Low', description: 'Minimal PHI exposure, quickly contained', color: '#00d4aa' },
  { value: 'medium', label: 'Medium', description: 'Moderate exposure, investigation needed', color: '#f59e0b' },
  { value: 'high', label: 'High', description: 'Significant exposure or large number affected', color: '#f97316' },
  { value: 'critical', label: 'Critical', description: 'Major breach, immediate action required', color: '#ef4444' },
]

export default function IncidentLogger({ practice }: IncidentLoggerProps) {
  const [form, setForm] = useState<IncidentFormData>({
    incidentType: '',
    description: '',
    affectedCount: 0,
    discoveryDate: new Date().toISOString().split('T')[0],
    severity: 'medium',
  })
  const [loading, setLoading] = useState(false)
  const [responseData, setResponseData] = useState<ResponseData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [recentIncidents, setRecentIncidents] = useState<{ id: string; type: string; date: string; severity: string }[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResponseData(null)

    try {
      const res = await fetch('/api/incident-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          incidentType: form.incidentType,
          description: form.description,
          affectedCount: form.affectedCount,
          discoveryDate: form.discoveryDate,
          practiceInfo: {
            name: practice.name,
            type: practice.practice_type,
            state: practice.state,
          },
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to process incident')
      }

      setResponseData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const saveIncident = async () => {
    if (!responseData) return

    const { data, error } = await supabase
      .from('incidents')
      .insert({
        practice_id: practice.id,
        incident_type: form.incidentType,
        description: form.description,
        severity: responseData.severity,
        status: 'investigating',
        response_steps: [{ guidance: responseData.responseGuidance }],
      })
      .select()
      .single()

    if (error) {
      console.error('Save error:', error)
      return
    }

    setSaved(true)
    setRecentIncidents(prev => [
      {
        id: data.id,
        type: form.incidentType,
        date: data.created_at,
        severity: responseData.severity,
      },
      ...prev,
    ])
  }

  const getSeverityColor = (severity: string): string => {
    const opt = SEVERITY_OPTIONS.find(s => s.value === severity)
    return opt?.color ?? '#6b7280'
  }

  return (
    <div className="space-y-8">
      {/* Alert Banner */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-red-400 text-lg shrink-0 mt-0.5">⚠</span>
          <div>
            <p className="text-sm font-semibold text-red-400">HIPAA Breach Notification Requirements</p>
            <p className="text-xs text-gray-400 mt-1">
              Under 45 CFR 164.400-414, you must notify affected individuals, HHS, and (if 500+ affected) prominent media outlets.
              Notifications affecting 500+ individuals must be reported to OCR within 60 days.
              Incidents affecting fewer than 500 must be logged and reported annually by March 1.
            </p>
          </div>
        </div>
      </div>

      {/* Incident Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Incident Type <span className="text-red-400">*</span>
          </label>
          <select
            value={form.incidentType}
            onChange={e => setForm(prev => ({ ...prev, incidentType: e.target.value }))}
            required
            className="w-full bg-[#0d0d14] border border-white/10 text-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20"
          >
            <option value="">Select incident type...</option>
            {INCIDENT_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description <span className="text-red-400">*</span>
          </label>
          <textarea
            value={form.description}
            onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
            required
            rows={4}
            placeholder="Describe what happened, when it was discovered, what PHI was involved, and any immediate actions taken..."
            className="w-full bg-[#0d0d14] border border-white/10 text-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 resize-none placeholder-gray-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Individuals Potentially Affected
            </label>
            <input
              type="number"
              min="0"
              value={form.affectedCount}
              onChange={e => setForm(prev => ({ ...prev, affectedCount: parseInt(e.target.value) || 0 }))}
              className="w-full bg-[#0d0d14] border border-white/10 text-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20"
            />
            {form.affectedCount >= 500 && (
              <p className="text-xs text-red-400 mt-1">
                500+ individuals — immediate OCR notification required
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Discovery Date
            </label>
            <input
              type="date"
              value={form.discoveryDate}
              onChange={e => setForm(prev => ({ ...prev, discoveryDate: e.target.value }))}
              className="w-full bg-[#0d0d14] border border-white/10 text-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Initial Severity Assessment
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SEVERITY_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setForm(prev => ({ ...prev, severity: opt.value }))}
                className={`p-3 rounded-xl border text-left transition-all ${
                  form.severity === opt.value ? 'border-current' : 'border-white/10 hover:border-white/20'
                }`}
                style={{
                  color: form.severity === opt.value ? opt.color : '#9ca3af',
                  backgroundColor: form.severity === opt.value ? `${opt.color}15` : 'transparent',
                }}
              >
                <p className="text-sm font-semibold mb-0.5">{opt.label}</p>
                <p className="text-xs opacity-70">{opt.description}</p>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !form.incidentType || !form.description}
          className="w-full py-4 px-6 rounded-xl font-semibold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'rgba(0, 212, 170, 0.15)',
            color: '#00d4aa',
            border: '1px solid rgba(0, 212, 170, 0.3)',
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <span className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
              Generating Response Workflow...
            </span>
          ) : (
            'Generate Incident Response Plan'
          )}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Response */}
      <AnimatePresence>
        {responseData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Alert Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className="rounded-xl p-4 border"
                style={{
                  borderColor: `${getSeverityColor(responseData.severity)}30`,
                  backgroundColor: `${getSeverityColor(responseData.severity)}10`,
                }}
              >
                <p className="text-xs text-gray-500 mb-1">Severity Level</p>
                <p
                  className="text-lg font-bold capitalize"
                  style={{ color: getSeverityColor(responseData.severity) }}
                >
                  {responseData.severity}
                </p>
              </div>

              <div
                className={`rounded-xl p-4 border ${
                  responseData.requiresImmediateNotification
                    ? 'border-red-500/30 bg-red-500/10'
                    : 'border-amber-500/30 bg-amber-500/10'
                }`}
              >
                <p className="text-xs text-gray-500 mb-1">OCR Notification</p>
                <p className={`text-sm font-semibold ${responseData.requiresImmediateNotification ? 'text-red-400' : 'text-amber-400'}`}>
                  {responseData.requiresImmediateNotification
                    ? 'Required — 60 Days'
                    : 'Annual Log Required'}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  {responseData.requiresImmediateNotification
                    ? `By ${new Date(responseData.notificationDeadline).toLocaleDateString()}`
                    : `By ${new Date(responseData.annualReportDeadline).toLocaleDateString()}`}
                </p>
              </div>

              <div className="rounded-xl p-4 border border-white/10 bg-white/3">
                <p className="text-xs text-gray-500 mb-1">Affected Individuals</p>
                <p className="text-lg font-bold text-white">{responseData.affectedCount.toLocaleString()}</p>
                <a
                  href={responseData.ocrPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-400 hover:underline mt-0.5 block"
                >
                  OCR Breach Portal →
                </a>
              </div>
            </div>

            {/* Response Guidance */}
            <div className="bg-[#0d0d14] border border-white/8 rounded-xl p-6 max-h-[600px] overflow-y-auto">
              <h4 className="text-sm font-semibold text-gray-200 mb-4">Incident Response Guidance</h4>
              <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed font-sans">
                {responseData.responseGuidance}
              </pre>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={saveIncident}
                disabled={saved}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: 'rgba(0, 212, 170, 0.15)',
                  color: '#00d4aa',
                  border: '1px solid rgba(0, 212, 170, 0.3)',
                }}
              >
                {saved ? '✓ Incident Logged' : 'Log This Incident'}
              </button>
              <button
                onClick={() => {
                  const content = `HIPAA INCIDENT RESPONSE PLAN\n\nIncident Type: ${form.incidentType}\nDate: ${form.discoveryDate}\nAffected: ${form.affectedCount}\nSeverity: ${responseData.severity}\n\n${responseData.responseGuidance}`
                  const blob = new Blob([content], { type: 'text/plain' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = `incident-response-${form.discoveryDate}.txt`
                  a.click()
                  URL.revokeObjectURL(url)
                }}
                className="px-4 py-2 rounded-xl text-sm font-medium border border-white/10 text-gray-400 hover:text-gray-200 hover:border-white/20 transition-all"
              >
                Download Plan
              </button>
            </div>

            <p className="text-xs text-gray-600">
              This response plan is AI-generated guidance. Consult with a healthcare attorney for legal advice on specific breach situations.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Incidents */}
      {recentIncidents.length > 0 && (
        <div className="border-t border-white/10 pt-6">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-3">
            Logged This Session
          </h3>
          <div className="space-y-2">
            {recentIncidents.map(incident => (
              <div key={incident.id} className="flex items-center gap-3 text-sm p-3 bg-white/3 rounded-xl">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: getSeverityColor(incident.severity) }}
                />
                <span className="text-gray-300 flex-1 truncate">{incident.type}</span>
                <span className="text-gray-600 text-xs capitalize">{incident.severity}</span>
                <span className="text-gray-600 text-xs">{formatDateTime(incident.date)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
