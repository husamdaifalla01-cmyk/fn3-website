'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const questions = [
  {
    id: 1,
    text: 'Do you use email to send or receive Protected Health Information (PHI)?',
    riskArea: 'Technical Safeguards',
    riskIfYes: 18,
    explanation: 'Unencrypted email is a top HIPAA violation. OCR has issued millions in fines for routine email PHI disclosures.',
  },
  {
    id: 2,
    text: 'Do you use consumer cloud storage (Google Drive, Dropbox, iCloud) for patient records?',
    riskArea: 'Technical Safeguards',
    riskIfYes: 16,
    explanation: 'Consumer cloud services do not sign BAAs and are not HIPAA-compliant by default.',
  },
  {
    id: 3,
    text: 'Have you completed a written HIPAA risk analysis in the last 12 months?',
    riskArea: 'Administrative Safeguards',
    riskIfNo: 15,
    explanation: 'A written annual risk analysis is required by 45 CFR 164.308(a)(1). Its absence is the #1 finding in OCR audits.',
  },
  {
    id: 4,
    text: 'Have all staff members completed HIPAA training in the last 12 months?',
    riskArea: 'Administrative Safeguards',
    riskIfNo: 14,
    explanation: 'Workforce training is required by 45 CFR 164.530(b). Untrained staff are your highest breach risk.',
  },
  {
    id: 5,
    text: 'Do you have signed Business Associate Agreements (BAAs) with every vendor who touches PHI?',
    riskArea: 'Organizational Requirements',
    riskIfNo: 13,
    explanation: 'Missing BAAs with EHR vendors, billing services, or IT providers create direct liability for their breaches.',
  },
  {
    id: 6,
    text: 'Do you use a personal smartphone to text patients or access patient records?',
    riskArea: 'Technical Safeguards',
    riskIfYes: 12,
    explanation: 'Personal devices accessing PHI without MDM controls and encryption violate the HIPAA Security Rule.',
  },
  {
    id: 7,
    text: 'Do you have a written incident response and breach notification procedure?',
    riskArea: 'Administrative Safeguards',
    riskIfNo: 11,
    explanation: 'Without a procedure, a breach will cost far more time and money. 45 CFR 164.308(a)(6) requires this.',
  },
  {
    id: 8,
    text: 'Are computer workstations that display PHI visible to patients or the public?',
    riskArea: 'Physical Safeguards',
    riskIfYes: 10,
    explanation: 'Visible PHI on screens is a physical safeguard violation under 45 CFR 164.310(b).',
  },
  {
    id: 9,
    text: 'Do you dispose of paper records containing PHI by placing them in regular trash or recycling?',
    riskArea: 'Physical Safeguards',
    riskIfYes: 9,
    explanation: 'PHI must be rendered unreadable before disposal — cross-cut shredding or secure shredding service required.',
  },
  {
    id: 10,
    text: 'Do you have a current, posted Notice of Privacy Practices (NPP) and collect patient acknowledgments?',
    riskArea: 'Administrative Safeguards',
    riskIfNo: 8,
    explanation: 'An NPP is required by 45 CFR 164.520. Failure to provide it is one of the most common OCR complaint findings.',
  },
]

function calculateRisk(answers: Record<number, boolean>): {
  score: number
  level: string
  color: string
  topRisks: { area: string; detail: string }[]
} {
  let totalRisk = 0
  const riskAreaScores: Record<string, number> = {}
  const riskAreaDetails: Record<string, string> = {}

  questions.forEach((q) => {
    const answer = answers[q.id]
    if (answer === undefined) return

    let risk = 0
    if (q.riskIfYes !== undefined && answer === true) {
      risk = q.riskIfYes
    } else if (q.riskIfNo !== undefined && answer === false) {
      risk = q.riskIfNo
    }

    if (risk > 0) {
      totalRisk += risk
      if (!riskAreaScores[q.riskArea]) riskAreaScores[q.riskArea] = 0
      riskAreaScores[q.riskArea] += risk
      if (!riskAreaDetails[q.riskArea] || risk > (riskAreaScores[q.riskArea] - risk)) {
        riskAreaDetails[q.riskArea] = q.explanation
      }
    }
  })

  // Normalize to 0–100
  const maxPossible = 126 // sum of all risk values
  const normalizedScore = Math.min(100, Math.round((totalRisk / maxPossible) * 100))

  let level: string
  let color: string
  if (normalizedScore >= 60) {
    level = 'Critical'
    color = '#ef4444'
  } else if (normalizedScore >= 35) {
    level = 'High'
    color = '#f97316'
  } else if (normalizedScore >= 15) {
    level = 'Moderate'
    color = '#f59e0b'
  } else {
    level = 'Low'
    color = '#00d4aa'
  }

  const topRisks = Object.entries(riskAreaScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([area]) => ({ area, detail: riskAreaDetails[area] }))

  return { score: normalizedScore, level, color, topRisks }
}

export default function AssessmentPage() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [finished, setFinished] = useState(false)

  const answeredCount = Object.keys(answers).length
  const risk = calculateRisk(answers)

  function handleAnswer(questionId: number, answer: boolean) {
    const updated = { ...answers, [questionId]: answer }
    setAnswers(updated)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion((q) => q + 1), 320)
    } else {
      setTimeout(() => setFinished(true), 320)
    }
  }

  const progressPct = Math.round((answeredCount / questions.length) * 100)

  return (
    <div style={{ backgroundColor: '#0a0a0f', color: '#e8e8e8', fontFamily: 'Inter, -apple-system, sans-serif', minHeight: '100vh' }}>

      {/* Navigation */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'rgba(10,10,15,0.95)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: 'rgba(0,212,170,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#00d4aa', fontSize: 12, fontWeight: 700 }}>C</span>
            </div>
            <span style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>ComplianceAI</span>
          </Link>
          <span style={{ color: '#6b7280', fontSize: 13 }}>Free HIPAA Risk Assessment</span>
        </div>
      </nav>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '5px 14px',
            borderRadius: 100,
            background: 'rgba(0,212,170,0.08)',
            border: '1px solid rgba(0,212,170,0.2)',
            marginBottom: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00d4aa', display: 'inline-block' }} />
            <span style={{ color: '#00d4aa', fontSize: 12, fontWeight: 500 }}>Free — No Account Required</span>
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 800, color: '#fff', marginBottom: 12, lineHeight: 1.2 }}>
            HIPAA Risk Assessment
          </h1>
          <p style={{ color: '#9ca3af', fontSize: 16, lineHeight: 1.6, maxWidth: 520, margin: '0 auto' }}>
            10 questions. 3 minutes. Understand your real HIPAA exposure before an OCR audit does.
          </p>
        </div>

        {/* Live Risk Score — always visible */}
        {answeredCount > 0 && !finished && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: '#12121a',
              border: `1px solid ${risk.color}40`,
              borderRadius: 16,
              padding: '16px 24px',
              marginBottom: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div>
              <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live Risk Score</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 36, fontWeight: 800, color: risk.color }}>{risk.score}</span>
                <span style={{ fontSize: 14, color: '#6b7280' }}>/ 100</span>
              </div>
            </div>
            <div style={{
              padding: '6px 16px',
              borderRadius: 100,
              background: `${risk.color}18`,
              border: `1px solid ${risk.color}40`,
              color: risk.color,
              fontSize: 14,
              fontWeight: 700,
            }}>
              {risk.level} Risk
            </div>
            <div style={{ width: '100%' }}>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                <motion.div
                  animate={{ width: `${risk.score}%` }}
                  transition={{ duration: 0.4 }}
                  style={{ height: '100%', background: risk.color, borderRadius: 3 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Progress */}
        {!finished && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: '#6b7280' }}>Question {Math.min(currentQuestion + 1, questions.length)} of {questions.length}</span>
              <span style={{ fontSize: 13, color: '#6b7280' }}>{progressPct}% complete</span>
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
              <motion.div
                animate={{ width: `${progressPct}%` }}
                style={{ height: '100%', background: '#00d4aa', borderRadius: 2 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        {/* Questions */}
        {!finished && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {questions.map((q, idx) => {
              const isActive = idx === currentQuestion
              const isAnswered = answers[q.id] !== undefined
              const isPast = idx < currentQuestion

              if (!isActive && !isAnswered) return null

              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    background: '#12121a',
                    border: `1px solid ${isActive ? 'rgba(0,212,170,0.25)' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: 16,
                    padding: '24px 28px',
                    opacity: isActive ? 1 : (isPast ? 0.65 : 1),
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                    <span style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: isAnswered ? 'rgba(0,212,170,0.15)' : 'rgba(255,255,255,0.06)',
                      border: `1px solid ${isAnswered ? 'rgba(0,212,170,0.3)' : 'rgba(255,255,255,0.1)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                      color: isAnswered ? '#00d4aa' : '#6b7280',
                      flexShrink: 0,
                      marginTop: 1,
                    }}>
                      {isAnswered ? '✓' : idx + 1}
                    </span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 16, color: '#fff', fontWeight: 600, lineHeight: 1.5, marginBottom: 4 }}>{q.text}</p>
                      <span style={{ fontSize: 11, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{q.riskArea}</span>
                    </div>
                  </div>

                  {isActive && (
                    <div style={{ display: 'flex', gap: 10, paddingLeft: 42 }}>
                      <button
                        onClick={() => handleAnswer(q.id, true)}
                        style={{
                          flex: 1,
                          padding: '12px 0',
                          borderRadius: 10,
                          border: '1px solid rgba(239,68,68,0.3)',
                          background: 'rgba(239,68,68,0.08)',
                          color: '#ef4444',
                          fontSize: 15,
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleAnswer(q.id, false)}
                        style={{
                          flex: 1,
                          padding: '12px 0',
                          borderRadius: 10,
                          border: '1px solid rgba(0,212,170,0.3)',
                          background: 'rgba(0,212,170,0.08)',
                          color: '#00d4aa',
                          fontSize: 15,
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        No
                      </button>
                    </div>
                  )}

                  {isAnswered && (
                    <div style={{ paddingLeft: 42 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 14px',
                        borderRadius: 8,
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: answers[q.id] ? '#ef4444' : '#00d4aa' }}>
                          {answers[q.id] ? 'Yes' : 'No'}
                        </span>
                        <span style={{ fontSize: 13, color: '#6b7280' }}>— {q.explanation}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Results */}
        <AnimatePresence>
          {finished && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Score Card */}
              <div style={{
                background: '#12121a',
                border: `2px solid ${risk.color}50`,
                borderRadius: 20,
                padding: '36px 32px',
                textAlign: 'center',
                marginBottom: 24,
              }}>
                <p style={{ fontSize: 13, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
                  Your HIPAA Risk Score
                </p>
                <div style={{ marginBottom: 16 }}>
                  <span style={{ fontSize: 72, fontWeight: 900, color: risk.color, lineHeight: 1 }}>{risk.score}</span>
                  <span style={{ fontSize: 24, color: '#6b7280' }}>/100</span>
                </div>
                <div style={{
                  display: 'inline-block',
                  padding: '6px 20px',
                  borderRadius: 100,
                  background: `${risk.color}18`,
                  border: `1px solid ${risk.color}40`,
                  color: risk.color,
                  fontSize: 16,
                  fontWeight: 700,
                  marginBottom: 16,
                }}>
                  {risk.level} Risk
                </div>
                <p style={{ color: '#9ca3af', fontSize: 15, lineHeight: 1.6, maxWidth: 480, margin: '0 auto' }}>
                  {risk.score >= 60
                    ? 'Your practice has significant HIPAA exposure. An OCR audit or patient complaint could result in substantial penalties.'
                    : risk.score >= 35
                    ? 'Your practice has several compliance gaps that should be addressed soon. Each gap is a potential OCR finding.'
                    : risk.score >= 15
                    ? 'Your practice has some compliance areas to improve. Addressing these will meaningfully reduce your risk.'
                    : 'Your practice has strong HIPAA foundations. Keep monitoring and maintain your current safeguards.'}
                </p>
              </div>

              {/* Top 3 Risk Areas */}
              {risk.topRisks.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
                    Your 3 Highest-Risk Areas
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {risk.topRisks.map((r, i) => (
                      <div
                        key={i}
                        style={{
                          background: '#12121a',
                          border: '1px solid rgba(239,68,68,0.2)',
                          borderLeft: '3px solid #ef4444',
                          borderRadius: 12,
                          padding: '16px 20px',
                          display: 'flex',
                          gap: 14,
                          alignItems: 'flex-start',
                        }}
                      >
                        <span style={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          background: 'rgba(239,68,68,0.15)',
                          color: '#ef4444',
                          fontSize: 12,
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: 1,
                        }}>
                          {i + 1}
                        </span>
                        <div>
                          <p style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{r.area}</p>
                          <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.6 }}>{r.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* OCR Penalty Context */}
              <div style={{
                background: 'rgba(239,68,68,0.06)',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: 14,
                padding: '20px 24px',
                marginBottom: 28,
              }}>
                <p style={{ color: '#ef4444', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>
                  What these gaps cost if OCR finds them:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { tier: 'Unknowing violation', range: '$100 – $50,000 per violation' },
                    { tier: 'Reasonable cause', range: '$1,000 – $50,000 per violation' },
                    { tier: 'Willful neglect, corrected', range: '$10,000 – $50,000 per violation' },
                    { tier: 'Willful neglect, uncorrected', range: '$50,000 per violation (max $1.9M/yr)' },
                  ].map((item) => (
                    <div key={item.tier} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 8, padding: '12px 14px' }}>
                      <p style={{ color: '#6b7280', fontSize: 12, marginBottom: 4 }}>{item.tier}</p>
                      <p style={{ color: '#ef4444', fontSize: 13, fontWeight: 600 }}>{item.range}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{
                background: 'rgba(0,212,170,0.05)',
                border: '1px solid rgba(0,212,170,0.2)',
                borderRadius: 20,
                padding: '32px 28px',
                textAlign: 'center',
              }}>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 12 }}>
                  Fix These Automatically with ComplianceAI
                </h3>
                <p style={{ color: '#9ca3af', fontSize: 15, lineHeight: 1.6, marginBottom: 24, maxWidth: 460, margin: '0 auto 24px' }}>
                  Generate all required HIPAA policies, run your annual risk assessment, manage BAAs, and respond to incidents — from $199/month. No consultant required.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <Link
                    href="/dashboard"
                    style={{
                      padding: '14px 28px',
                      borderRadius: 12,
                      background: '#00d4aa',
                      color: '#0a0a0f',
                      fontSize: 15,
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    Start Free Trial — Fix These Now
                  </Link>
                  <Link
                    href="/"
                    style={{
                      padding: '14px 28px',
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.05)',
                      color: '#e8e8e8',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontSize: 15,
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    Learn More
                  </Link>
                </div>
                <p style={{ color: '#4b5563', fontSize: 13, marginTop: 14 }}>
                  No credit card required. 14-day free trial.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
