'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface AuditQuestion {
  id: number
  category: string
  question: string
  context: string
  requiredDoc: string
}

interface AuditAnswer {
  questionId: number
  answer: 'yes' | 'no' | 'partial' | null
  note: string
}

interface AuditReport {
  score: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  findings: {
    category: string
    concern: string
    requiredDocs: string[]
    remediation: string
  }[]
  passCount: number
  partialCount: number
  failCount: number
}

const OCR_AUDIT_QUESTIONS: AuditQuestion[] = [
  {
    id: 1,
    category: 'Risk Analysis',
    question: 'Have you conducted and documented a current risk analysis identifying all threats to ePHI?',
    context: 'OCR auditors will request your written risk analysis as first priority. It must cover all systems that create, receive, maintain, or transmit ePHI.',
    requiredDoc: 'Written risk analysis (45 CFR 164.308(a)(1))',
  },
  {
    id: 2,
    category: 'Risk Management',
    question: 'Do you have a written risk management plan with timelines and responsible parties for each identified risk?',
    context: 'The risk management plan must address all risks identified in your risk analysis and show active remediation efforts.',
    requiredDoc: 'Risk management plan with tracked mitigations',
  },
  {
    id: 3,
    category: 'Security Officer',
    question: 'Is a Security Officer formally designated in writing, and are their contact details documented in your policies?',
    context: 'Designation must be documented. For solo practices, the provider/owner typically serves this role.',
    requiredDoc: 'Written Security Officer designation with name, title, date (45 CFR 164.308(a)(2))',
  },
  {
    id: 4,
    category: 'Workforce Training',
    question: 'Do you have documented HIPAA training records for all current workforce members, including date of training?',
    context: 'Training records must be retained for 6 years. OCR will ask for the most recent training dates for each staff member.',
    requiredDoc: 'Signed training attestations for all workforce members (45 CFR 164.530(b))',
  },
  {
    id: 5,
    category: 'Workforce Training',
    question: 'Was training conducted within a reasonable period of hiring for all current staff, and has it been updated annually?',
    context: 'Training must happen promptly after hire and whenever policies materially change.',
    requiredDoc: 'Training log with hire dates and training completion dates',
  },
  {
    id: 6,
    category: 'Access Controls',
    question: 'Does every workforce member have a unique username and password for systems containing ePHI? No shared accounts?',
    context: 'Shared accounts are a direct violation. OCR will request your user account roster and access logs.',
    requiredDoc: 'EHR user account list showing unique IDs (45 CFR 164.312(a)(2)(i))',
  },
  {
    id: 7,
    category: 'Access Controls',
    question: 'Are access rights granted based on job role (minimum necessary), reviewed periodically, and revoked promptly when staff leave?',
    context: 'OCR will ask how quickly access was revoked for terminated employees. "Same day" is the expected answer.',
    requiredDoc: 'Access authorization policy and termination checklist',
  },
  {
    id: 8,
    category: 'Audit Controls',
    question: 'Are audit logs enabled on all systems containing ePHI, and are those logs reviewed regularly?',
    context: 'OCR expects log review at least monthly. You must be able to produce logs showing who accessed what PHI and when.',
    requiredDoc: 'Audit log review records and procedure (45 CFR 164.312(b))',
  },
  {
    id: 9,
    category: 'Business Associate Agreements',
    question: 'Do you have current, signed BAAs with every vendor that creates, receives, maintains, or transmits PHI on your behalf?',
    context: 'Common BAA partners: EHR vendor, billing company, IT support, cloud storage, answering service, accounting firm. OCR will request copies.',
    requiredDoc: 'Signed BAAs with all business associates (45 CFR 164.504(e))',
  },
  {
    id: 10,
    category: 'Business Associate Agreements',
    question: 'Have your BAAs been reviewed and updated within the past 3 years to reflect current HITECH/OMNIBUS requirements?',
    context: 'Pre-2013 BAAs are likely non-compliant. The 2013 Omnibus Rule significantly updated BAA requirements.',
    requiredDoc: 'BAAs dated post-September 2013 with HITECH compliance provisions',
  },
  {
    id: 11,
    category: 'Encryption',
    question: 'Is ePHI encrypted at rest on all laptops, mobile devices, USB drives, and backup media?',
    context: 'Encryption is an "addressable" standard but OCR considers it required unless you document a specific equivalent alternative. Unencrypted devices containing PHI are OCR\'s leading enforcement trigger.',
    requiredDoc: 'Encryption policy and device inventory showing encryption status (45 CFR 164.312(a)(2)(iv))',
  },
  {
    id: 12,
    category: 'Encryption',
    question: 'Is all electronic transmission of ePHI encrypted in transit (TLS/HTTPS, secure email)?',
    context: 'Sending PHI via unencrypted email is a direct violation. OCR will ask how PHI is transmitted to patients, insurance companies, and other providers.',
    requiredDoc: 'Email security documentation, HIPAA-compliant email service records (45 CFR 164.312(e)(2)(ii))',
  },
  {
    id: 13,
    category: 'Physical Safeguards',
    question: 'Are workstations positioned to prevent unauthorized viewing of PHI, with screens locked when unattended?',
    context: 'OCR may conduct a walk-through of your facility. Screens visible to waiting room patients are a common finding.',
    requiredDoc: 'Workstation use policy (45 CFR 164.310(b))',
  },
  {
    id: 14,
    category: 'Physical Safeguards',
    question: 'Do you have documented procedures for the proper disposal of PHI on paper (shredding) and electronic media (wiping/destruction)?',
    context: 'PHI in dumpsters is one of OCR\'s most common breach types. Disposal procedures must be documented.',
    requiredDoc: 'Media disposal policy and certificates of destruction (45 CFR 164.310(d)(2))',
  },
  {
    id: 15,
    category: 'Incident Response',
    question: 'Do you have a written breach notification policy with defined procedures for identifying, reporting, and notifying affected individuals?',
    context: 'OCR will ask how your staff knows when and how to report a potential breach internally.',
    requiredDoc: 'Breach notification policy and procedure (45 CFR 164.400–414)',
  },
  {
    id: 16,
    category: 'Incident Response',
    question: 'Do you maintain a breach log, including incidents that were investigated and determined NOT to be reportable breaches?',
    context: 'You must document ALL incidents and your analysis, even when you conclude it is not a breach. The documentation of your decision-making protects you.',
    requiredDoc: 'Incident/breach log with 4-factor risk assessments',
  },
  {
    id: 17,
    category: 'Privacy Officer',
    question: 'Is a Privacy Officer formally designated, with their contact information in your Notice of Privacy Practices?',
    context: 'The Privacy Officer must be reachable by patients for complaints. Their name must appear in your NPP.',
    requiredDoc: 'Written Privacy Officer designation and current NPP (45 CFR 164.530(a))',
  },
  {
    id: 18,
    category: 'Patient Rights',
    question: 'Do you have a documented process to respond to patient access requests within 30 days, including a fee schedule?',
    context: 'OCR has heavily enforced the patient right of access. You need a defined procedure and must be able to show you meet the 30-day deadline.',
    requiredDoc: 'Patient access procedure with timeline and fee schedule (45 CFR 164.524)',
  },
  {
    id: 19,
    category: 'Policies & Procedures',
    question: 'Are all required HIPAA policies in writing, dated, reviewed within the last year, and accessible to workforce members?',
    context: 'OCR will request copies of your policies. Verbal-only policies do not satisfy the written documentation requirement.',
    requiredDoc: 'Written HIPAA Privacy Policy, Security Policy, Sanctions Policy (45 CFR 164.530(i))',
  },
  {
    id: 20,
    category: 'Documentation Retention',
    question: 'Are HIPAA records (policies, training logs, risk assessments, breach logs, BAAs) retained for at least 6 years?',
    context: 'OCR can audit records up to 6 years old. Missing historical documentation is a common finding.',
    requiredDoc: 'Retention policy and archived HIPAA documentation (45 CFR 164.530(j))',
  },
]

const CATEGORY_ICONS: Record<string, string> = {
  'Risk Analysis': '📊',
  'Risk Management': '🎯',
  'Security Officer': '🔒',
  'Workforce Training': '📚',
  'Access Controls': '🔑',
  'Audit Controls': '📋',
  'Business Associate Agreements': '📝',
  'Encryption': '🔐',
  'Physical Safeguards': '🏢',
  'Incident Response': '🚨',
  'Privacy Officer': '👤',
  'Patient Rights': '👥',
  'Policies & Procedures': '📄',
  'Documentation Retention': '🗃️',
}

function computeReport(answers: AuditAnswer[]): AuditReport {
  let passCount = 0
  let partialCount = 0
  let failCount = 0

  const findings: AuditReport['findings'] = []

  answers.forEach((a) => {
    const q = OCR_AUDIT_QUESTIONS.find(q => q.id === a.questionId)!
    if (a.answer === 'yes') passCount++
    else if (a.answer === 'partial') {
      partialCount++
      findings.push({
        category: q.category,
        concern: `Partial compliance: ${q.question}`,
        requiredDocs: [q.requiredDoc],
        remediation: `Complete implementation of this control. OCR will expect full compliance. Partial controls often lead to additional scrutiny during audits.`,
      })
    } else if (a.answer === 'no') {
      failCount++
      findings.push({
        category: q.category,
        concern: `Missing control: ${q.question}`,
        requiredDocs: [q.requiredDoc],
        remediation: `Immediately implement this control. Document the implementation date. This is a direct compliance gap that OCR would cite in a formal audit.`,
      })
    }
  })

  const total = passCount + partialCount + failCount
  const score = total > 0 ? Math.round(((passCount + partialCount * 0.5) / total) * 100) : 0

  let riskLevel: AuditReport['riskLevel'] = 'low'
  if (failCount >= 5 || score < 50) riskLevel = 'critical'
  else if (failCount >= 3 || score < 70) riskLevel = 'high'
  else if (failCount >= 1 || score < 85) riskLevel = 'medium'

  return { score, riskLevel, findings, passCount, partialCount, failCount }
}

export default function AuditSimPage() {
  const [phase, setPhase] = useState<'intro' | 'audit' | 'report'>('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<AuditAnswer[]>(
    OCR_AUDIT_QUESTIONS.map(q => ({ questionId: q.id, answer: null, note: '' }))
  )
  const [report, setReport] = useState<AuditReport | null>(null)

  const setAnswer = (answer: 'yes' | 'no' | 'partial') => {
    setAnswers(prev => prev.map((a, i) => i === currentQ ? { ...a, answer } : a))
  }

  const currentAnswer = answers[currentQ]
  const progress = ((currentQ + 1) / OCR_AUDIT_QUESTIONS.length) * 100

  const generateReport = () => {
    const r = computeReport(answers)
    setReport(r)
    setPhase('report')
  }

  const riskColors = {
    low: '#00d4aa',
    medium: '#f59e0b',
    high: '#f97316',
    critical: '#ef4444',
  }

  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-10">
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">← Dashboard</Link>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mt-8 mb-4" style={{ background: 'rgba(249,115,22,0.15)' }}>
                <span className="text-2xl">🏛️</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">OCR Phase 2 Audit Simulator</h1>
              <p className="text-gray-400 max-w-lg mx-auto">Experience exactly what an OCR auditor asks during a real Phase 2 HIPAA compliance audit. Get a personalized report with gaps, required documentation, and remediation steps.</p>
            </div>

            <div className="bg-[#12121a] border border-white/10 rounded-2xl p-8 mb-6">
              <h2 className="text-base font-semibold text-white mb-4">What is an OCR Phase 2 Audit?</h2>
              <div className="space-y-3 text-sm text-gray-400">
                <p>OCR (Office for Civil Rights) conducts Phase 2 HIPAA audits of covered entities and business associates. These audits evaluate compliance across all HIPAA Privacy, Security, and Breach Notification Rules.</p>
                <p>Auditors request documentation, conduct interviews, and assess systems. Findings result in required corrective action plans and, in serious cases, civil monetary penalties up to <span className="text-amber-400">$2.067M per violation category per year</span>.</p>
                <p>This simulation uses the actual audit protocol questions OCR uses in Phase 2 audits.</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: '20 Questions', desc: 'Covering all HIPAA domains', icon: '❓' },
                { label: 'Yes/No/Partial', desc: 'Honest self-assessment', icon: '📊' },
                { label: 'Instant Report', desc: 'With remediation steps', icon: '📋' },
              ].map((item) => (
                <div key={item.label} className="bg-[#12121a] border border-white/8 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPhase('audit')}
              className="w-full py-4 rounded-xl text-base font-semibold transition-all"
              style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316', border: '1px solid rgba(249,115,22,0.3)' }}
            >
              Run OCR Audit Simulation →
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  if (phase === 'audit') {
    const q = OCR_AUDIT_QUESTIONS[currentQ]
    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <header className="border-b border-white/8 bg-[#0a0a0f]/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-white">OCR Phase 2 Audit Simulation</span>
              <span className="text-xs text-gray-500">{currentQ + 1} / {OCR_AUDIT_QUESTIONS.length}</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: '#f97316' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-6 py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full mb-4" style={{ background: 'rgba(249,115,22,0.1)', color: '#f97316' }}>
                  <span>{CATEGORY_ICONS[q.category] || '📋'}</span>
                  {q.category}
                </span>
                <h2 className="text-xl font-bold text-white leading-snug mb-4">
                  <span className="text-gray-600 mr-2 font-mono text-base">Q{q.id}.</span>
                  {q.question}
                </h2>
                <div className="p-4 bg-amber-500/5 border border-amber-500/15 rounded-xl text-sm text-gray-400">
                  <span className="text-amber-400 font-medium">OCR Context: </span>
                  {q.context}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {(['yes', 'partial', 'no'] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAnswer(opt)}
                    className={`py-5 rounded-2xl text-sm font-semibold transition-all border-2 ${
                      currentAnswer.answer === opt ? 'scale-105' : 'opacity-60 hover:opacity-90'
                    }`}
                    style={{
                      borderColor: currentAnswer.answer === opt
                        ? opt === 'yes' ? '#00d4aa' : opt === 'partial' ? '#f59e0b' : '#ef4444'
                        : 'rgba(255,255,255,0.08)',
                      background: currentAnswer.answer === opt
                        ? opt === 'yes' ? 'rgba(0,212,170,0.12)' : opt === 'partial' ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)'
                        : 'rgba(18,18,26,1)',
                      color: opt === 'yes' ? '#00d4aa' : opt === 'partial' ? '#f59e0b' : '#ef4444',
                    }}
                  >
                    <div className="text-2xl mb-2">{opt === 'yes' ? '✓' : opt === 'partial' ? '~' : '✗'}</div>
                    {opt === 'yes' ? 'Yes' : opt === 'partial' ? 'Partial' : 'No'}
                    <div className="text-xs opacity-60 mt-1 font-normal">
                      {opt === 'yes' ? 'Fully implemented' : opt === 'partial' ? 'In progress' : 'Not in place'}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setCurrentQ(q => Math.max(0, q - 1))}
                  disabled={currentQ === 0}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-gray-400 hover:text-gray-200 transition-all disabled:opacity-30"
                >
                  Previous
                </button>

                {currentQ < OCR_AUDIT_QUESTIONS.length - 1 ? (
                  <button
                    onClick={() => setCurrentQ(q => q + 1)}
                    disabled={currentAnswer.answer === null}
                    className="px-6 py-2.5 rounded-xl text-sm font-medium disabled:opacity-40 transition-all"
                    style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316', border: '1px solid rgba(249,115,22,0.3)' }}
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    onClick={generateReport}
                    disabled={answers.some(a => a.answer === null)}
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 transition-all"
                    style={{ background: 'rgba(249,115,22,0.2)', color: '#f97316', border: '1px solid rgba(249,115,22,0.4)' }}
                  >
                    Generate Audit Report →
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    )
  }

  if (phase === 'report' && report) {
    const riskColor = riskColors[report.riskLevel]
    const categories = [...new Set(report.findings.map(f => f.category))]

    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <header className="border-b border-white/8 bg-[#0a0a0f]/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => { setPhase('intro'); setCurrentQ(0); setAnswers(OCR_AUDIT_QUESTIONS.map(q => ({ questionId: q.id, answer: null, note: '' }))) }} className="text-gray-400 hover:text-gray-200 transition-colors text-sm">
                ← Restart
              </button>
              <span className="text-white text-sm font-medium">OCR Audit Report</span>
            </div>
            <Link href="/dashboard" className="text-xs text-gray-500 bg-white/5 px-3 py-1.5 rounded-full hover:bg-white/8 transition-all">Back to Dashboard</Link>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Score header */}
            <div className="bg-[#12121a] border-2 rounded-2xl p-8 mb-8" style={{ borderColor: `${riskColor}40` }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: riskColor }}>OCR Phase 2 Audit Simulation Report</p>
                  <h1 className="text-3xl font-bold text-white mb-1">{report.score}% Compliance</h1>
                  <p className="text-gray-400">
                    Risk Level: <span className="font-semibold capitalize" style={{ color: riskColor }}>{report.riskLevel}</span>
                  </p>
                </div>
                <div className="text-5xl">
                  {report.riskLevel === 'low' ? '✅' : report.riskLevel === 'medium' ? '⚠️' : report.riskLevel === 'high' ? '🔴' : '🚨'}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-teal-500/10 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-teal-400">{report.passCount}</p>
                  <p className="text-xs text-gray-500 mt-1">Controls in Place</p>
                </div>
                <div className="bg-amber-500/10 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-amber-400">{report.partialCount}</p>
                  <p className="text-xs text-gray-500 mt-1">Partial Compliance</p>
                </div>
                <div className="bg-red-500/10 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-red-400">{report.failCount}</p>
                  <p className="text-xs text-gray-500 mt-1">Gaps Identified</p>
                </div>
              </div>
            </div>

            {/* Findings */}
            {report.findings.length > 0 ? (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-white mb-4">Areas of Concern ({report.findings.length} findings)</h2>
                <div className="space-y-4">
                  {report.findings.map((finding, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="bg-[#12121a] border border-white/10 rounded-2xl p-6"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-lg">{CATEGORY_ICONS[finding.category] || '📋'}</span>
                        <div>
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{finding.category}</span>
                          <p className="text-sm font-medium text-white mt-0.5">{finding.concern}</p>
                        </div>
                      </div>

                      <div className="ml-8">
                        <div className="mb-3">
                          <p className="text-xs font-semibold text-amber-400 mb-1">Required Documentation to Produce:</p>
                          {finding.requiredDocs.map((doc, di) => (
                            <p key={di} className="text-xs text-gray-400 flex items-center gap-2">
                              <span className="text-gray-600">→</span>
                              {doc}
                            </p>
                          ))}
                        </div>
                        <div className="p-3 bg-teal-500/5 border border-teal-500/10 rounded-xl">
                          <p className="text-xs text-gray-400">
                            <span className="text-teal-400 font-semibold">Recommended Remediation: </span>
                            {finding.remediation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-8 text-center mb-8">
                <div className="text-4xl mb-3">🎉</div>
                <h2 className="text-xl font-bold text-white mb-2">Excellent OCR Readiness</h2>
                <p className="text-gray-400">No compliance gaps identified. Your practice appears well-prepared for an OCR audit. Continue performing annual assessments to maintain compliance.</p>
              </div>
            )}

            {/* Passed checks */}
            {report.passCount > 0 && (
              <div className="bg-[#12121a] border border-white/8 rounded-2xl p-6 mb-8">
                <h2 className="text-base font-semibold text-white mb-4">Passed Checks ({report.passCount})</h2>
                <div className="space-y-2">
                  {answers.filter(a => a.answer === 'yes').map(a => {
                    const q = OCR_AUDIT_QUESTIONS.find(q => q.id === a.questionId)!
                    return (
                      <div key={a.questionId} className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="text-teal-400 shrink-0">✓</span>
                        <span>{q.question}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Next steps */}
            <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 mb-8">
              <h2 className="text-base font-semibold text-white mb-4">Recommended Next Steps</h2>
              <div className="space-y-3">
                {report.failCount > 0 && (
                  <div className="flex items-start gap-3 text-sm">
                    <span className="text-red-400 mt-0.5 shrink-0">1.</span>
                    <p className="text-gray-400">Address all {report.failCount} compliance gap{report.failCount !== 1 ? 's' : ''} immediately. Use ComplianceAI&apos;s policy generators to create required documentation.</p>
                  </div>
                )}
                {report.partialCount > 0 && (
                  <div className="flex items-start gap-3 text-sm">
                    <span className="text-amber-400 mt-0.5 shrink-0">{report.failCount > 0 ? 2 : 1}.</span>
                    <p className="text-gray-400">Complete implementation of {report.partialCount} partial control{report.partialCount !== 1 ? 's' : ''}. Partial compliance does not satisfy OCR requirements.</p>
                  </div>
                )}
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-teal-400 mt-0.5 shrink-0">{report.failCount + (report.partialCount > 0 ? 1 : 0) + 1}.</span>
                  <p className="text-gray-400">Document all corrective actions with dates. OCR values good-faith remediation efforts. Keep records for 6 years.</p>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-teal-400 mt-0.5 shrink-0">{report.failCount + (report.partialCount > 0 ? 1 : 0) + 2}.</span>
                  <p className="text-gray-400">Re-run this simulation after remediation to verify compliance improvement. Consider quarterly self-assessments.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/dashboard"
                className="flex-1 py-3 rounded-xl text-sm font-medium border border-white/10 text-gray-400 hover:text-gray-200 transition-all text-center"
              >
                Go to Dashboard
              </Link>
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-center"
                style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316', border: '1px solid rgba(249,115,22,0.3)' }}
              >
                Print Report
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return null
}
