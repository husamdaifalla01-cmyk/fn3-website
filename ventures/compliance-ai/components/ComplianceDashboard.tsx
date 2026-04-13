'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { ComplianceArea, ComplianceStatus, SafeguardArea, HIPAA_REQUIREMENTS } from '@/types'
import { getStatusColor, getStatusLabel, getScoreColor, getScoreLabel, formatDate } from '@/lib/utils'

interface ComplianceDashboardProps {
  practiceId: string
  practiceName: string
}

interface ScoreData {
  overall: number
  administrative: number
  physical: number
  technical: number
  organizational: number
  riskLevel: string
  recommendations: string[]
}

const AREA_ICONS: Record<SafeguardArea, string> = {
  administrative: '📋',
  physical: '🏢',
  technical: '💻',
  organizational: '📄',
}

const AREA_DESCRIPTIONS: Record<SafeguardArea, string> = {
  administrative: 'Policies, procedures, and workforce training — the backbone of your HIPAA program (45 CFR 164.308)',
  physical: 'Who can access your office, devices, and paper records — locks, screens, and disposal (45 CFR 164.310)',
  technical: 'Passwords, encryption, audit logs, and secure transmission of patient data (45 CFR 164.312)',
  organizational: 'Business Associate Agreements, privacy officer, and documentation retention (45 CFR 164.314)',
}

const REQUIREMENT_GUIDANCE: Record<string, string> = {
  'Risk Analysis & Management': 'Conduct and document an annual risk analysis identifying threats to PHI. Use the Risk Assessment generator to create a compliant document. Required by 45 CFR 164.308(a)(1).',
  'Sanction Policy': 'Create a written policy describing disciplinary actions for HIPAA violations. Use the Sanctions Policy generator. Must cover all workforce members.',
  'Information System Activity Review': 'Set up logging on your EHR/practice management system and review logs at least monthly. Document reviews. Contact your EHR vendor to enable audit logs.',
  'Assigned Security Responsibility': 'Formally designate a Security Officer in writing. For solo practices, this is typically the owner/provider. Document the designation date.',
  'Workforce Training & Management': 'Train all staff on HIPAA within their first week, then annually. Use the Training Policy generator. Keep signed attestation forms for 6 years.',
  'Evaluation Procedures': 'Perform and document an annual security evaluation. Schedule a yearly review date and document your findings.',
  'Business Associate Contracts': 'Execute BAAs before sharing PHI with any vendor (EHR, billing, cloud storage). Use the BAA template generator. Keep signed copies.',
  'Contingency Plan': 'Document how you will access and restore PHI if your system goes down. Cover data backup, disaster recovery, and emergency access procedures.',
  'Emergency Mode Operation Plan': 'Document how critical business processes will continue during a system emergency. Include who can access PHI manually and how.',
  'Facility Access Controls': 'Restrict physical access to areas where PHI is stored. Use key cards, locks, or sign-in logs. Document who has access and why.',
  'Workstation Use Policy': 'Write a policy specifying what workstations can be used for, by whom, and in what physical environment. Post near workstations.',
  'Workstation Security': 'Position screens away from public view. Use privacy filters on monitors visible to patients. Lock screens when unattended.',
  'Device & Media Controls': 'Track all hardware containing PHI. Document receipt and removal of devices. Ensure proper disposal procedures are followed.',
  'Disposal Procedures': 'Use a certified shredding service for paper PHI. Wipe or physically destroy hard drives before disposal. Get a certificate of destruction.',
  'Media Re-use Procedures': 'Before reusing any device that stored PHI, perform a full wipe/overwrite. Document the wipe with software used and date.',
  'Accountability Controls': 'Maintain a log of all hardware assets containing PHI, including who is responsible for each device.',
  'Unique User Identification': 'Every user must have their own login — no shared accounts. Verify all staff have individual credentials in your EHR.',
  'Emergency Access Procedure': 'Document how providers can access PHI during a system emergency (e.g., break-glass procedure). Test it annually.',
  'Automatic Logoff': 'Configure all workstations and EHR systems to auto-lock after 15 minutes of inactivity. Check your EHR settings.',
  'Encryption & Decryption': 'Enable encryption on all devices holding PHI (laptops, phones, USB drives). Enable full-disk encryption on all practice computers.',
  'Audit Controls': 'Enable activity logging in your EHR system. Logs should record who accessed what PHI and when. Review logs monthly.',
  'Integrity Controls': 'Implement file integrity monitoring or checksums to detect unauthorized PHI alteration. Ask your EHR vendor about audit trail features.',
  'Transmission Security': 'Use TLS/HTTPS for all electronic PHI transmissions. Never send PHI via unencrypted email. Use a HIPAA-compliant email service.',
  'Authentication Procedures': 'Implement multi-factor authentication (MFA) on all systems with PHI access. Enable MFA in your EHR and email immediately.',
  'Business Associate Agreements': 'You need a signed BAA with every vendor who touches PHI. Common ones: EHR, billing service, cloud backup, email provider, IT support.',
  'Group Health Plan Requirements': 'If you offer employee health benefits, document separation of PHI from employment records and plan sponsor certification.',
  'Policies & Procedures Documentation': 'All HIPAA policies must be in writing. Use the policy generators for all 6 required documents. Keep them accessible to staff.',
  'Documentation Retention': 'Retain all HIPAA policies, training records, and risk assessments for 6 years from creation or last effective date.',
  'Privacy Officer Designation': 'Formally designate a Privacy Officer in writing. Document their contact information in your Notice of Privacy Practices.',
  'Workforce Sanctions Policy': 'Use the Sanctions Policy generator to create a written disciplinary policy. All staff must sign an acknowledgment form.',
}

export default function ComplianceDashboard({ practiceId, practiceName }: ComplianceDashboardProps) {
  const [areas, setAreas] = useState<ComplianceArea[]>([])
  const [scoreData, setScoreData] = useState<ScoreData | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [activeArea, setActiveArea] = useState<SafeguardArea>('administrative')
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const fetchAreas = useCallback(async () => {
    const { data, error } = await supabase
      .from('compliance_areas')
      .select('*')
      .eq('practice_id', practiceId)
      .order('area')

    if (error) {
      console.error('Error fetching compliance areas:', error)
      return
    }

    if (!data || data.length === 0) {
      await initializeComplianceAreas()
    } else {
      setAreas(data as ComplianceArea[])
      await recalculateScore(data as ComplianceArea[])
    }
  }, [practiceId])

  useEffect(() => {
    fetchAreas().finally(() => setLoading(false))
  }, [fetchAreas])

  const initializeComplianceAreas = async () => {
    const newAreas: Omit<ComplianceArea, 'id' | 'updated_at' | 'last_reviewed'>[] = []

    for (const [area, categories] of Object.entries(HIPAA_REQUIREMENTS)) {
      for (const category of categories) {
        newAreas.push({
          practice_id: practiceId,
          area: area as SafeguardArea,
          category,
          status: 'not_started' as ComplianceStatus,
          notes: null,
        })
      }
    }

    const { data, error } = await supabase
      .from('compliance_areas')
      .insert(newAreas)
      .select()

    if (error) {
      console.error('Error initializing compliance areas:', error)
      return
    }

    setAreas(data as ComplianceArea[])
    await recalculateScore(data as ComplianceArea[])
  }

  const recalculateScore = async (currentAreas: ComplianceArea[]) => {
    try {
      const res = await fetch('/api/compliance-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ complianceAreas: currentAreas }),
      })
      const data = await res.json()
      setScoreData(data)
    } catch (error) {
      console.error('Score calculation error:', error)
    }
  }

  const updateStatus = async (areaId: string, newStatus: ComplianceStatus) => {
    setUpdating(areaId)

    const { error } = await supabase
      .from('compliance_areas')
      .update({ status: newStatus, last_reviewed: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('id', areaId)

    if (!error) {
      const updatedAreas = areas.map(a =>
        a.id === areaId ? { ...a, status: newStatus, last_reviewed: new Date().toISOString() } : a
      )
      setAreas(updatedAreas)
      await recalculateScore(updatedAreas)
    }

    setUpdating(null)
  }

  const getAreaAreas = (area: SafeguardArea) => areas.filter(a => a.area === area)

  const getAreaScore = (area: SafeguardArea): number => {
    if (!scoreData) return 0
    return scoreData[area] ?? 0
  }

  const safeguardAreas: SafeguardArea[] = ['administrative', 'physical', 'technical', 'organizational']

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading compliance data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Overall Score Ring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-[#12121a] border border-white/10 rounded-2xl p-8 flex flex-col items-center">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-6">
              Overall Compliance Score
            </h3>
            <ScoreRing score={scoreData?.overall ?? 0} />
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold" style={{ color: getScoreColor(scoreData?.overall ?? 0) }}>
                {getScoreLabel(scoreData?.overall ?? 0)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Risk Level: <span className="capitalize">{scoreData?.riskLevel ?? 'Unknown'}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 h-full">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">
              Score by Safeguard Area
            </h3>
            <div className="space-y-4">
              {safeguardAreas.map(area => (
                <div key={area} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300 capitalize">
                      {AREA_ICONS[area]} {area}
                    </span>
                    <span className="text-sm font-mono font-medium" style={{ color: getScoreColor(getAreaScore(area)) }}>
                      {getAreaScore(area)}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: getScoreColor(getAreaScore(area)) }}
                      initial={{ width: 0 }}
                      animate={{ width: `${getAreaScore(area)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {scoreData?.recommendations && scoreData.recommendations.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
          <h3 className="text-sm font-medium text-amber-400 uppercase tracking-widest mb-4">
            Priority Actions
          </h3>
          <ul className="space-y-2">
            {scoreData.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                <span className="text-amber-400 mt-0.5 shrink-0">→</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Safeguard Area Tabs */}
      <div>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {safeguardAreas.map(area => (
            <button
              key={area}
              onClick={() => setActiveArea(area)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeArea === area
                  ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                  : 'text-gray-400 hover:text-gray-300 border border-white/10 hover:border-white/20'
              }`}
            >
              {AREA_ICONS[area]} {area.charAt(0).toUpperCase() + area.slice(1)}
              <span className="ml-2 text-xs opacity-70">
                {getAreaScore(area)}%
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeArea}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-[#12121a] border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white capitalize">
                  {AREA_ICONS[activeArea]} {activeArea} Safeguards
                </h3>
                <p className="text-sm text-gray-500 mt-1">{AREA_DESCRIPTIONS[activeArea]}</p>
              </div>

              <div className="divide-y divide-white/5">
                {getAreaAreas(activeArea).map(area => (
                  <div key={area.id} className="p-4 hover:bg-white/2 transition-colors">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() => setExpandedCategory(expandedCategory === area.id ? null : area.id)}
                        >
                          <div
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: getStatusColor(area.status as ComplianceStatus) }}
                          />
                          <span className="text-sm font-medium text-gray-200 truncate">{area.category}</span>
                          {area.last_reviewed && (
                            <span className="text-xs text-gray-600 shrink-0">
                              {formatDate(area.last_reviewed)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {(['compliant', 'partial', 'non_compliant', 'not_started'] as ComplianceStatus[]).map(status => (
                          <button
                            key={status}
                            onClick={() => updateStatus(area.id, status)}
                            disabled={updating === area.id}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                              area.status === status
                                ? 'opacity-100 ring-1 ring-offset-1 ring-offset-[#12121a]'
                                : 'opacity-30 hover:opacity-60'
                            }`}
                            style={{
                              backgroundColor: area.status === status ? `${getStatusColor(status)}20` : 'transparent',
                              color: getStatusColor(status),
                            }}
                            title={getStatusLabel(status)}
                          >
                            {status === 'compliant' ? '✓' :
                             status === 'partial' ? '~' :
                             status === 'non_compliant' ? '✗' : '○'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {expandedCategory === area.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pl-4"
                      >
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <span
                            className="px-2 py-0.5 rounded-full text-xs"
                            style={{
                              backgroundColor: `${getStatusColor(area.status as ComplianceStatus)}20`,
                              color: getStatusColor(area.status as ComplianceStatus),
                            }}
                          >
                            {getStatusLabel(area.status as ComplianceStatus)}
                          </span>
                          {area.last_reviewed && (
                            <span>Last reviewed: {formatDate(area.last_reviewed)}</span>
                          )}
                        </div>
                        {REQUIREMENT_GUIDANCE[area.category] && (
                          <div className="mb-3 p-3 bg-teal-500/5 border border-teal-500/15 rounded-lg">
                            <p className="text-xs text-gray-400 leading-relaxed">
                              <span className="text-teal-400 font-semibold">How to fix: </span>
                              {REQUIREMENT_GUIDANCE[area.category]}
                            </p>
                          </div>
                        )}
                        <div className="flex gap-2 flex-wrap mt-2">
                          {(['compliant', 'partial', 'non_compliant', 'not_started'] as ComplianceStatus[]).map(status => (
                            <button
                              key={status}
                              onClick={() => updateStatus(area.id, status)}
                              disabled={updating === area.id}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                                area.status === status
                                  ? 'border-current'
                                  : 'border-white/10 hover:border-white/20'
                              }`}
                              style={{
                                color: getStatusColor(status),
                                backgroundColor: area.status === status ? `${getStatusColor(status)}15` : 'transparent',
                              }}
                            >
                              {getStatusLabel(status)}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs text-gray-500">
        <span>Status indicators:</span>
        {(['compliant', 'partial', 'non_compliant', 'not_started'] as ComplianceStatus[]).map(status => (
          <span key={status} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: getStatusColor(status) }}
            />
            {getStatusLabel(status)}
          </span>
        ))}
      </div>
    </div>
  )
}

function ScoreRing({ score }: { score: number }) {
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference
  const color = getScoreColor(score)

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="12"
        />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-4xl font-bold"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-gray-500 mt-1">/ 100</span>
      </div>
    </div>
  )
}
