'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Practice } from '@/types'
import ComplianceDashboard from '@/components/ComplianceDashboard'
import PolicyGenerator from '@/components/PolicyGenerator'
import IncidentLogger from '@/components/IncidentLogger'
import Link from 'next/link'

type ActiveTab = 'overview' | 'policies' | 'incidents' | 'reports' | 'setup'

export default function DashboardPage() {
  const [practice, setPractice] = useState<Practice | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview')
  const [showPracticeSetup, setShowPracticeSetup] = useState(false)
  const [setupForm, setSetupForm] = useState({
    name: '',
    practice_type: 'medical',
    provider_count: 1,
    state: 'CA',
  })
  const [setupLoading, setSetupLoading] = useState(false)

  useEffect(() => {
    fetchPractice()
  }, [])

  const fetchPractice = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setLoading(false)
      setShowPracticeSetup(true)
      return
    }

    const { data } = await supabase
      .from('practices')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (!data) {
      setShowPracticeSetup(true)
    } else {
      setPractice(data as Practice)
    }
    setLoading(false)
  }

  const createPractice = async (e: React.FormEvent) => {
    e.preventDefault()
    setSetupLoading(true)

    // For demo: create a mock practice without auth
    const mockPractice: Practice = {
      id: `practice-${Date.now()}`,
      user_id: 'demo-user',
      name: setupForm.name,
      practice_type: setupForm.practice_type as Practice['practice_type'],
      provider_count: setupForm.provider_count,
      state: setupForm.state,
      created_at: new Date().toISOString(),
    }

    // Try to save to Supabase
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data, error } = await supabase
        .from('practices')
        .insert({ ...setupForm, user_id: user.id })
        .select()
        .single()

      if (!error && data) {
        setPractice(data as Practice)
        setShowPracticeSetup(false)
        setSetupLoading(false)
        return
      }
    }

    // Fallback: use local practice for demo
    setPractice(mockPractice)
    setShowPracticeSetup(false)
    setSetupLoading(false)
  }

  const tabs: { id: ActiveTab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Compliance Overview', icon: '📊' },
    { id: 'policies', label: 'Policy Generator', icon: '📝' },
    { id: 'incidents', label: 'Incident Response', icon: '🚨' },
    { id: 'reports', label: 'Audit Reports', icon: '📑' },
    { id: 'setup', label: 'Practice Setup', icon: '⚙️' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your compliance dashboard...</p>
        </div>
      </div>
    )
  }

  if (showPracticeSetup || !practice) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 212, 170, 0.2)' }}>
                <span className="text-teal-400 text-sm font-bold">C</span>
              </div>
              <span className="text-white font-semibold">ComplianceAI</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Set Up Your Practice</h1>
            <p className="text-gray-400">Tell us about your practice to generate personalized compliance tools</p>
          </div>

          <form onSubmit={createPractice} className="bg-[#12121a] border border-white/10 rounded-2xl p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Practice Name</label>
              <input
                type="text"
                value={setupForm.name}
                onChange={e => setSetupForm(prev => ({ ...prev, name: e.target.value }))}
                required
                placeholder="e.g. Riverside Family Medicine"
                className="w-full bg-[#0d0d14] border border-white/10 text-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/50 placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Practice Type</label>
              <select
                value={setupForm.practice_type}
                onChange={e => setSetupForm(prev => ({ ...prev, practice_type: e.target.value }))}
                className="w-full bg-[#0d0d14] border border-white/10 text-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/50"
              >
                <option value="medical">Medical (Primary Care / Internal Medicine)</option>
                <option value="dental">Dental</option>
                <option value="mental_health">Mental Health / Behavioral Health</option>
                <option value="chiropractic">Chiropractic</option>
                <option value="optometry">Optometry</option>
                <option value="physical_therapy">Physical Therapy</option>
                <option value="urgent_care">Urgent Care</option>
                <option value="other">Other Healthcare</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Number of Providers</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={setupForm.provider_count}
                  onChange={e => setSetupForm(prev => ({ ...prev, provider_count: parseInt(e.target.value) || 1 }))}
                  className="w-full bg-[#0d0d14] border border-white/10 text-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                <select
                  value={setupForm.state}
                  onChange={e => setSetupForm(prev => ({ ...prev, state: e.target.value }))}
                  className="w-full bg-[#0d0d14] border border-white/10 text-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500/50"
                >
                  {['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={setupLoading}
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all disabled:opacity-50"
              style={{
                background: 'rgba(0, 212, 170, 0.15)',
                color: '#00d4aa',
                border: '1px solid rgba(0, 212, 170, 0.3)',
              }}
            >
              {setupLoading ? 'Setting up...' : 'Start Compliance Dashboard →'}
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="border-b border-white/8 bg-[#0a0a0f]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0, 212, 170, 0.2)' }}>
                <span className="text-teal-400 text-xs font-bold">C</span>
              </div>
              <span className="text-white font-semibold text-sm">ComplianceAI</span>
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-gray-400 text-sm">{practice.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/training" className="text-xs text-gray-400 hover:text-teal-400 bg-white/5 hover:bg-teal-500/10 px-3 py-1.5 rounded-full transition-all">
              Training
            </Link>
            <Link href="/vendors" className="text-xs text-gray-400 hover:text-teal-400 bg-white/5 hover:bg-teal-500/10 px-3 py-1.5 rounded-full transition-all">
              Vendors
            </Link>
            <Link href="/audit-sim" className="text-xs text-gray-400 hover:text-orange-400 bg-white/5 hover:bg-orange-500/10 px-3 py-1.5 rounded-full transition-all">
              OCR Audit Sim
            </Link>
            <span className="text-xs text-gray-500 bg-white/5 px-3 py-1.5 rounded-full capitalize ml-2">
              {practice.practice_type.replace('_', ' ')} · {practice.state} · {practice.provider_count} provider{practice.provider_count !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">{practice.name}</h1>
          <p className="text-gray-500 mt-1">HIPAA Compliance Dashboard</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 bg-[#12121a] border border-white/8 rounded-xl p-1 w-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-teal-500/15 text-teal-400 border border-teal-500/20'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatedContent key={activeTab}>
          {activeTab === 'overview' && (
            <ComplianceDashboard
              practiceId={practice.id}
              practiceName={practice.name}
            />
          )}

          {activeTab === 'policies' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">AI Policy Generator</h2>
                <p className="text-gray-500 mt-1">Generate practice-specific HIPAA policy documents — not generic templates</p>
              </div>
              <PolicyGenerator practice={practice} />
            </div>
          )}

          {activeTab === 'incidents' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">Incident Response System</h2>
                <p className="text-gray-500 mt-1">Log incidents and receive AI-powered response workflows with breach notification requirements</p>
              </div>
              <IncidentLogger practice={practice} />
            </div>
          )}

          {activeTab === 'reports' && (
            <AuditReportsTab practice={practice} />
          )}

          {activeTab === 'setup' && (
            <PracticeSetupTab practice={practice} onUpdate={(updated) => setPractice(updated)} />
          )}
        </AnimatedContent>
      </div>
    </div>
  )
}

function AnimatedContent({ children, key }: { children: React.ReactNode; key: string }) {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

function AuditReportsTab({ practice }: { practice: Practice }) {
  const [generating, setGenerating] = useState(false)
  const [report, setReport] = useState<string | null>(null)

  const generateReport = async () => {
    setGenerating(true)

    try {
      // Fetch compliance areas
      const { data: areas } = await supabase
        .from('compliance_areas')
        .select('*')
        .eq('practice_id', practice.id)

      // Fetch policy documents
      const { data: policies } = await supabase
        .from('policy_documents')
        .select('*')
        .eq('practice_id', practice.id)

      // Fetch incidents
      const { data: incidents } = await supabase
        .from('incidents')
        .select('*')
        .eq('practice_id', practice.id)

      // Calculate score
      const scoreRes = await fetch('/api/compliance-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ complianceAreas: areas || [] }),
      })
      const scoreData = await scoreRes.json()

      const reportContent = generateReportContent(practice, areas || [], policies || [], incidents || [], scoreData)
      setReport(reportContent)
    } catch (error) {
      console.error('Report generation error:', error)
    } finally {
      setGenerating(false)
    }
  }

  const generateReportContent = (
    practice: Practice,
    areas: unknown[],
    policies: unknown[],
    incidents: unknown[],
    scoreData: { overall: number; administrative: number; physical: number; technical: number; organizational: number; riskLevel: string; recommendations: string[] }
  ): string => {
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const typedAreas = areas as Array<{ area: string; category: string; status: string; last_reviewed?: string }>
    const typedPolicies = policies as Array<{ document_type: string; title: string; generated_at: string }>
    const typedIncidents = incidents as Array<{ incident_type: string; severity: string; status: string; created_at: string }>

    return `HIPAA COMPLIANCE AUDIT REPORT
${practice.name}
Generated: ${date}

================================================================================
EXECUTIVE SUMMARY
================================================================================

Practice: ${practice.name}
Type: ${practice.practice_type.replace('_', ' ')}
State: ${practice.state}
Providers: ${practice.provider_count}
Report Date: ${date}

OVERALL COMPLIANCE SCORE: ${scoreData.overall}/100
Risk Level: ${scoreData.riskLevel?.toUpperCase() ?? 'UNKNOWN'}

Scores by Safeguard Area:
  Administrative Safeguards:  ${scoreData.administrative ?? 0}/100
  Physical Safeguards:        ${scoreData.physical ?? 0}/100
  Technical Safeguards:       ${scoreData.technical ?? 0}/100
  Organizational Requirements: ${scoreData.organizational ?? 0}/100

================================================================================
COMPLIANCE AREAS ASSESSMENT
================================================================================

${['administrative', 'physical', 'technical', 'organizational'].map(area => {
  const areaItems = typedAreas.filter((a) => a.area === area)
  return `${area.toUpperCase()} SAFEGUARDS (${areaItems.length} items assessed)
${areaItems.map(item =>
  `  [${item.status === 'compliant' ? '✓' : item.status === 'partial' ? '~' : item.status === 'non_compliant' ? '✗' : '○'}] ${item.category}`
).join('\n')}
`
}).join('\n')}

================================================================================
POLICY DOCUMENTS
================================================================================

${typedPolicies.length > 0 ? typedPolicies.map((p) =>
  `  ✓ ${p.title} (Generated: ${new Date(p.generated_at).toLocaleDateString()})`
).join('\n') : '  No policy documents generated yet.'}

================================================================================
INCIDENT LOG
================================================================================

Total Incidents: ${typedIncidents.length}
${typedIncidents.length > 0 ? typedIncidents.map((i) =>
  `  • ${i.incident_type} | Severity: ${i.severity} | Status: ${i.status} | Date: ${new Date(i.created_at).toLocaleDateString()}`
).join('\n') : '  No incidents logged.'}

================================================================================
PRIORITY RECOMMENDATIONS
================================================================================

${scoreData.recommendations?.map((r: string, i: number) => `${i + 1}. ${r}`).join('\n') ?? 'No recommendations at this time.'}

================================================================================
DISCLAIMER
================================================================================

This report was generated by ComplianceAI. While this report is intended to help
practices assess their HIPAA compliance posture, it does not constitute legal advice.
Practices should consult with qualified healthcare attorneys for legal guidance.
This report should be maintained for at least 6 years per 45 CFR 164.530(j).

Generated by ComplianceAI — HIPAA Compliance Automation
https://complianceai.com
`
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Audit-Ready Reports</h2>
        <p className="text-gray-500 mt-1">Generate comprehensive compliance reports for HHS investigations or internal reviews</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Compliance Summary Report</h3>
          <p className="text-xs text-gray-500 mb-4">Full compliance assessment across all 4 HIPAA safeguard domains with scores, findings, and recommendations.</p>
          <button
            onClick={generateReport}
            disabled={generating}
            className="w-full py-2.5 px-4 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
            style={{
              background: 'rgba(0, 212, 170, 0.15)',
              color: '#00d4aa',
              border: '1px solid rgba(0, 212, 170, 0.3)',
            }}
          >
            {generating ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-3 h-3 border border-teal-400 border-t-transparent rounded-full animate-spin" />
                Generating...
              </span>
            ) : 'Generate Report'}
          </button>
        </div>

        <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 opacity-60">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Annual Review Report</h3>
          <p className="text-xs text-gray-500 mb-4">Year-over-year compliance trend analysis with improvement tracking.</p>
          <button disabled className="w-full py-2.5 px-4 rounded-xl text-sm font-medium border border-white/10 text-gray-600 cursor-not-allowed">
            Coming Soon
          </button>
        </div>

        <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 opacity-60">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">OCR Investigation Response</h3>
          <p className="text-xs text-gray-500 mb-4">Pre-formatted response package for HHS Office for Civil Rights investigations.</p>
          <button disabled className="w-full py-2.5 px-4 rounded-xl text-sm font-medium border border-white/10 text-gray-600 cursor-not-allowed">
            Coming Soon
          </button>
        </div>
      </div>

      {report && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">Compliance Summary Report</h3>
            <button
              onClick={() => {
                const blob = new Blob([report], { type: 'text/plain' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `hipaa-compliance-report-${new Date().toISOString().split('T')[0]}.txt`
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 text-gray-400 hover:text-gray-200 hover:border-white/20 transition-all"
            >
              Download .txt
            </button>
          </div>

          <div className="bg-[#0d0d14] border border-white/8 rounded-xl p-6 max-h-[600px] overflow-y-auto">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed font-mono text-xs">
              {report}
            </pre>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// Practice type metadata for customization
const PRACTICE_TYPE_CONFIG: Record<string, {
  label: string
  requiredPolicies: string[]
  complianceWeights: { administrative: number; physical: number; technical: number; organizational: number }
  defaultBAAs: string[]
  specialNotes: string[]
}> = {
  solo_therapist: {
    label: 'Solo Therapist',
    requiredPolicies: ['Notice of Privacy Practices', 'HIPAA Security Policy', 'Psychotherapy Notes Policy', 'Workforce Training Policy', 'BAA Template', 'Risk Assessment', 'Sanctions Policy'],
    complianceWeights: { administrative: 35, physical: 20, technical: 20, organizational: 25 },
    defaultBAAs: ['EHR / Practice Management Software', 'Video Telehealth Platform (Zoom, Doxy.me)', 'Billing Service', 'Cloud Storage (Google Drive, Dropbox)', 'Email Provider'],
    specialNotes: [
      '42 CFR Part 2 applies if you treat substance use disorders — adds extra consent requirements beyond HIPAA.',
      'Psychotherapy notes have heightened protections and cannot be disclosed with standard treatment/payment/operations authorization.',
      'Telehealth sessions require Business Associate Agreements with your video platform.',
    ],
  },
  group_practice: {
    label: 'Group Practice',
    requiredPolicies: ['Notice of Privacy Practices', 'HIPAA Security Policy', 'Workforce Training Policy', 'BAA Template', 'Risk Assessment', 'Sanctions Policy', 'Access Authorization Policy'],
    complianceWeights: { administrative: 35, physical: 25, technical: 25, organizational: 15 },
    defaultBAAs: ['EHR System', 'Billing Company', 'IT Support', 'Accounting Firm', 'Payroll Service', 'Cloud Backup', 'Answering Service'],
    specialNotes: [
      'Multi-provider practices must define role-based access controls for each staff member.',
      'Each provider must have unique EHR credentials — shared logins are a direct HIPAA violation.',
      'Workforce training records must be maintained for all current and former employees for 6 years.',
    ],
  },
  medical_spa: {
    label: 'Medical Spa',
    requiredPolicies: ['Notice of Privacy Practices', 'HIPAA Security Policy', 'Workforce Training Policy', 'BAA Template', 'Risk Assessment', 'Sanctions Policy'],
    complianceWeights: { administrative: 30, physical: 30, technical: 25, organizational: 15 },
    defaultBAAs: ['EHR / EMR System', 'Payment Processor', 'Before/After Photo Storage', 'Booking Software', 'Email Marketing Platform'],
    specialNotes: [
      'Before/after photos are PHI if linked to a patient identity. Secure storage with BAA required.',
      'Online booking platforms that collect patient health history are business associates.',
      'Marketing communications about specific treatments to specific patients requires HIPAA-compliant email.',
    ],
  },
  telehealth: {
    label: 'Telehealth',
    requiredPolicies: ['Notice of Privacy Practices', 'HIPAA Security Policy', 'Telehealth-Specific Privacy Policy', 'Workforce Training Policy', 'BAA Template', 'Risk Assessment', 'Sanctions Policy'],
    complianceWeights: { administrative: 25, physical: 10, technical: 45, organizational: 20 },
    defaultBAAs: ['Telehealth Video Platform (Zoom/Doxy.me)', 'EHR System', 'Cloud Storage Provider', 'Email Provider', 'E-Prescribing Service', 'Billing Service'],
    specialNotes: [
      'Technical safeguards have the highest weight for telehealth — encryption, access controls, and transmission security are critical.',
      'Your video platform MUST have a signed Business Associate Agreement. Consumer Zoom/FaceTime are not HIPAA-compliant.',
      'Remote work devices used for telehealth sessions must have full-disk encryption and auto-lock.',
    ],
  },
  dental: {
    label: 'Dental',
    requiredPolicies: ['Notice of Privacy Practices', 'HIPAA Security Policy', 'Dental Records Retention Policy', 'Workforce Training Policy', 'BAA Template', 'Risk Assessment', 'Sanctions Policy'],
    complianceWeights: { administrative: 30, physical: 30, technical: 25, organizational: 15 },
    defaultBAAs: ['Dental Practice Management Software', 'Digital Imaging / X-Ray Software', 'Billing Clearinghouse', 'IT Support', 'Sterilization Service'],
    specialNotes: [
      'Digital X-rays and intraoral photos are ePHI requiring the same protections as other medical records.',
      'Many dental practices use multiple systems (PMS, imaging, billing) — each requires a BAA.',
      'Paper dental charts must be stored securely and disposed of via certified shredding.',
    ],
  },
  chiropractic: {
    label: 'Chiropractic',
    requiredPolicies: ['Notice of Privacy Practices', 'HIPAA Security Policy', 'Workforce Training Policy', 'BAA Template', 'Risk Assessment', 'Sanctions Policy'],
    complianceWeights: { administrative: 30, physical: 30, technical: 25, organizational: 15 },
    defaultBAAs: ['Practice Management Software', 'Billing Service / Clearinghouse', 'X-Ray Software', 'IT Support', 'Answering Service'],
    specialNotes: [
      'Insurance authorizations and coordination of benefits involve PHI — billing services require BAAs.',
      'Patient intake forms containing health history are PHI from the moment they are completed.',
      'Chiropractic adjustment notes and imaging are part of the designated record set subject to patient access rights.',
    ],
  },
  psychiatry: {
    label: 'Psychiatry',
    requiredPolicies: ['Notice of Privacy Practices', 'HIPAA Security Policy', 'Psychotherapy Notes Policy', 'Minimum Necessary Policy', 'Workforce Training Policy', 'BAA Template', 'Risk Assessment', 'Sanctions Policy'],
    complianceWeights: { administrative: 35, physical: 20, technical: 25, organizational: 20 },
    defaultBAAs: ['EHR System', 'Telehealth Platform', 'E-Prescribing Service (DEA Controlled Substances)', 'Billing Service', 'Pharmacy Benefit Manager'],
    specialNotes: [
      '42 CFR Part 2 applies to records related to substance use disorder diagnosis or treatment — stricter than HIPAA.',
      'Psychotherapy notes are separately protected and require specific patient authorization for most disclosures.',
      'DEA controlled substance prescribing creates additional record-keeping obligations beyond HIPAA.',
    ],
  },
  medical: {
    label: 'Medical (Primary Care / Internal Medicine)',
    requiredPolicies: ['Notice of Privacy Practices', 'HIPAA Security Policy', 'Workforce Training Policy', 'BAA Template', 'Risk Assessment', 'Sanctions Policy'],
    complianceWeights: { administrative: 30, physical: 25, technical: 25, organizational: 20 },
    defaultBAAs: ['EHR System', 'Billing Company', 'Lab Services', 'Imaging / Radiology', 'IT Support', 'Answering Service', 'Accounting Firm'],
    specialNotes: [
      'Lab orders and results contain PHI — lab services require a BAA.',
      'Referrals to specialists involve PHI disclosures covered by the treatment exception.',
      'Patient portal access must be secured with strong authentication.',
    ],
  },
}

function PracticeSetupTab({ practice, onUpdate }: { practice: Practice; onUpdate: (p: Practice) => void }) {
  const [form, setForm] = useState({
    name: practice.name,
    practice_type: practice.practice_type,
    provider_count: practice.provider_count,
    state: practice.state,
  })
  const [saved, setSaved] = useState(false)

  const selectedType = PRACTICE_TYPE_CONFIG[form.practice_type] || PRACTICE_TYPE_CONFIG['medical']

  const handleSave = () => {
    onUpdate({ ...practice, ...form, practice_type: form.practice_type as Practice['practice_type'] })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Practice Setup</h2>
        <p className="text-gray-500 text-sm">Configure your practice type to receive customized compliance requirements, policy recommendations, and default BAA counterparties.</p>
      </div>

      {/* Edit form */}
      <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-widest">Practice Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Practice Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-[#0d0d14] border border-white/10 text-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500/50"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Practice Type</label>
            <select
              value={form.practice_type}
              onChange={e => setForm(prev => ({ ...prev, practice_type: e.target.value as Practice['practice_type'] }))}
              className="w-full bg-[#0d0d14] border border-white/10 text-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500/50"
            >
              <option value="solo_therapist">Solo Therapist</option>
              <option value="group_practice">Group Practice</option>
              <option value="medical_spa">Medical Spa</option>
              <option value="telehealth">Telehealth</option>
              <option value="dental">Dental</option>
              <option value="chiropractic">Chiropractic</option>
              <option value="psychiatry">Psychiatry</option>
              <option value="medical">Medical (Primary Care / Internal Medicine)</option>
              <option value="mental_health">Mental Health / Behavioral Health</option>
              <option value="optometry">Optometry</option>
              <option value="physical_therapy">Physical Therapy</option>
              <option value="urgent_care">Urgent Care</option>
              <option value="other">Other Healthcare</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Number of Providers</label>
            <input
              type="number"
              min="1"
              max="500"
              value={form.provider_count}
              onChange={e => setForm(prev => ({ ...prev, provider_count: parseInt(e.target.value) || 1 }))}
              className="w-full bg-[#0d0d14] border border-white/10 text-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500/50"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">State</label>
            <select
              value={form.state}
              onChange={e => setForm(prev => ({ ...prev, state: e.target.value }))}
              className="w-full bg-[#0d0d14] border border-white/10 text-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500/50"
            >
              {['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{
              background: saved ? 'rgba(0,212,170,0.25)' : 'rgba(0,212,170,0.15)',
              color: '#00d4aa',
              border: '1px solid rgba(0,212,170,0.3)',
            }}
          >
            {saved ? '✓ Saved' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Practice-type guidance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Required policies */}
        <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-1 uppercase tracking-widest">Required Policies</h3>
          <p className="text-xs text-gray-600 mb-4">For {selectedType.label} practices</p>
          <div className="space-y-2">
            {selectedType.requiredPolicies.map((policy) => (
              <div key={policy} className="flex items-center gap-2 text-sm text-gray-400">
                <span className="text-teal-400 shrink-0">→</span>
                {policy}
              </div>
            ))}
          </div>
        </div>

        {/* Default BAA counterparties */}
        <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-1 uppercase tracking-widest">Default BAA Counterparties</h3>
          <p className="text-xs text-gray-600 mb-4">Vendors typically requiring BAAs for {selectedType.label}</p>
          <div className="space-y-2">
            {selectedType.defaultBAAs.map((vendor) => (
              <div key={vendor} className="flex items-center gap-2 text-sm text-gray-400">
                <span className="text-amber-400 shrink-0">→</span>
                {vendor}
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
            <Link
              href="/vendors"
              className="text-xs font-medium transition-all"
              style={{ color: '#00d4aa' }}
            >
              Manage vendors in Vendor Risk Tracker →
            </Link>
          </div>
        </div>

        {/* Compliance score weights */}
        <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-1 uppercase tracking-widest">Compliance Score Weights</h3>
          <p className="text-xs text-gray-600 mb-4">How each safeguard domain is weighted for {selectedType.label}</p>
          <div className="space-y-3">
            {Object.entries(selectedType.complianceWeights).map(([area, weight]) => (
              <div key={area}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400 capitalize">{area}</span>
                  <span className="text-gray-500 font-mono">{weight}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-teal-500/60"
                    style={{ width: `${weight}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special notes */}
        <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-1 uppercase tracking-widest">Practice-Specific Notes</h3>
          <p className="text-xs text-gray-600 mb-4">Important compliance considerations for {selectedType.label}</p>
          <div className="space-y-3">
            {selectedType.specialNotes.map((note, i) => (
              <div key={i} className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                <p className="text-xs text-gray-400 leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tools */}
      <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-widest">V3 Compliance Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/training" className="p-4 rounded-xl border border-white/8 hover:border-teal-500/30 hover:bg-teal-500/5 transition-all group">
            <div className="text-xl mb-2">📚</div>
            <p className="text-sm font-medium text-white group-hover:text-teal-400 transition-colors">Employee Training</p>
            <p className="text-xs text-gray-500 mt-1">5 modules · OCR-compliant · Certificate</p>
            <p className="text-xs text-gray-600 mt-1">45 CFR 164.530(b)</p>
          </Link>
          <Link href="/audit-sim" className="p-4 rounded-xl border border-white/8 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all group">
            <div className="text-xl mb-2">🏛️</div>
            <p className="text-sm font-medium text-white group-hover:text-orange-400 transition-colors">OCR Audit Simulation</p>
            <p className="text-xs text-gray-500 mt-1">20 Phase 2 questions · Instant report</p>
            <p className="text-xs text-gray-600 mt-1">OCR Phase 2 Protocol</p>
          </Link>
          <Link href="/vendors" className="p-4 rounded-xl border border-white/8 hover:border-teal-500/30 hover:bg-teal-500/5 transition-all group">
            <div className="text-xl mb-2">📋</div>
            <p className="text-sm font-medium text-white group-hover:text-teal-400 transition-colors">Vendor Risk Tracker</p>
            <p className="text-xs text-gray-500 mt-1">BAA tracking · 3-year review alerts</p>
            <p className="text-xs text-gray-600 mt-1">45 CFR 164.504(e)</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
