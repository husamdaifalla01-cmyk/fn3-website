'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const incidentTypes = [
  { value: 'unauthorized_access', label: 'Unauthorized Access', description: 'Someone accessed records without authorization' },
  { value: 'lost_device', label: 'Lost or Stolen Device', description: 'Laptop, phone, or drive with PHI is missing' },
  { value: 'wrong_recipient', label: 'Wrong Recipient', description: 'Fax, email, or mail sent to wrong person' },
  { value: 'ransomware', label: 'Ransomware / Malware', description: 'Systems encrypted or infected with malicious software' },
  { value: 'paper_records', label: 'Paper Records Breach', description: 'Physical records lost, stolen, or improperly disposed' },
]

interface FormState {
  selectedTypes: string[]
  patientCount: string
  description: string
  discoveryDate: string
  practiceName: string
  practiceState: string
  practiceType: string
}

interface GeneratedResponse {
  ocrLetter: string
  patientNotification: string
  investigationChecklist: string
  severity: string
  requiresImmediateOCR: boolean
  deadline: string
}

export default function IncidentPage() {
  const [form, setForm] = useState<FormState>({
    selectedTypes: [],
    patientCount: '',
    description: '',
    discoveryDate: new Date().toISOString().split('T')[0],
    practiceName: '',
    practiceState: 'CA',
    practiceType: 'medical',
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GeneratedResponse | null>(null)
  const [activeTab, setActiveTab] = useState<'ocr' | 'patient' | 'checklist'>('ocr')
  const [error, setError] = useState('')

  function toggleType(val: string) {
    setForm((f) => ({
      ...f,
      selectedTypes: f.selectedTypes.includes(val)
        ? f.selectedTypes.filter((t) => t !== val)
        : [...f.selectedTypes, val],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.selectedTypes.length) {
      setError('Please select at least one incident type.')
      return
    }
    if (!form.patientCount || isNaN(Number(form.patientCount))) {
      setError('Please enter the number of patients affected.')
      return
    }
    if (!form.practiceName) {
      setError('Please enter your practice name.')
      return
    }

    setLoading(true)
    try {
      const affectedCount = parseInt(form.patientCount, 10)
      const incidentTypeLabel = form.selectedTypes
        .map((v) => incidentTypes.find((t) => t.value === v)?.label || v)
        .join(', ')

      const res = await fetch('/api/incident-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          incidentType: incidentTypeLabel,
          description: form.description || incidentTypeLabel,
          affectedCount,
          discoveryDate: form.discoveryDate,
          practiceInfo: {
            name: form.practiceName,
            type: form.practiceType,
            state: form.practiceState,
          },
        }),
      })

      if (!res.ok) throw new Error('Failed to generate response')

      const data = await res.json()

      // The API returns responseGuidance as one big block; we'll segment it
      const guidance: string = data.responseGuidance || ''

      // Extract sections using regex patterns
      const ocrSection = extractSection(guidance, ['OCR BREACH REPORT', 'NOTIFICATION LETTER', 'OCR BREACH NOTIFICATION LETTER', '60-DAY BREACH NOTIFICATION'])
      const patientSection = extractSection(guidance, ['NOTIFICATION LETTER TEMPLATE', 'PATIENT NOTIFICATION', 'INDIVIDUAL NOTIFICATION'])
      const checklistSection = extractSection(guidance, ['DOCUMENTATION CHECKLIST', 'INVESTIGATION CHECKLIST', 'REQUIRED DOCUMENTATION', 'RESPONSE WORKFLOW', 'STEP-BY-STEP'])

      setResult({
        ocrLetter: ocrSection || buildOCRLetter(form, affectedCount, data),
        patientNotification: patientSection || buildPatientLetter(form, affectedCount, incidentTypeLabel),
        investigationChecklist: checklistSection || guidance,
        severity: data.severity || 'high',
        requiresImmediateOCR: data.requiresImmediateNotification,
        deadline: data.notificationDeadline
          ? new Date(data.notificationDeadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
          : '',
      })
    } catch {
      setError('Failed to generate response. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function extractSection(text: string, keywords: string[]): string {
    for (const kw of keywords) {
      const idx = text.toUpperCase().indexOf(kw)
      if (idx !== -1) {
        // Take up to 2000 chars from that section
        return text.slice(idx, idx + 2500).trim()
      }
    }
    return ''
  }

  function buildOCRLetter(f: FormState, count: number, data: { deadline?: string }): string {
    const deadline = data.deadline
      ? new Date(data.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      : ''
    return `HIPAA BREACH NOTIFICATION TO OFFICE FOR CIVIL RIGHTS
Pursuant to 45 CFR 164.400–164.414

Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

TO:
U.S. Department of Health and Human Services
Office for Civil Rights
[Regional OCR Office — see hhs.gov/ocr/contact]

RE: HIPAA Breach Notification — ${f.practiceName}

This notice is submitted pursuant to the HIPAA Breach Notification Rule, 45 CFR Part 164, Subpart D.

COVERED ENTITY INFORMATION:
Name: ${f.practiceName}
Practice Type: ${f.practiceType}
State: ${f.practiceState}

BREACH SUMMARY:
Incident Type: ${f.selectedTypes.map((v) => incidentTypes.find((t) => t.value === v)?.label || v).join(', ')}
Date of Discovery: ${new Date(f.discoveryDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
Number of Individuals Affected: ${count}
${deadline ? `Notification Deadline (60 days): ${deadline}` : ''}

DESCRIPTION OF BREACH:
${f.description || '[Describe what happened, what PHI was involved, and how the breach occurred]'}

PHI INVOLVED:
[List the types of PHI involved: e.g., names, dates of birth, medical record numbers, diagnosis codes, treatment information]

STEPS TAKEN TO MITIGATE:
[Describe immediate containment steps taken]

REMEDIATION MEASURES:
[Describe measures implemented to prevent recurrence]

This notification is submitted in accordance with 45 CFR 164.408. We are simultaneously notifying affected individuals as required by 45 CFR 164.404.

Respectfully submitted,

_________________________________
Privacy Officer
${f.practiceName}
Date: _______________

[File at: https://ocrportal.hhs.gov/ocr/breach/wizard_breach.jsf]`
  }

  function buildPatientLetter(f: FormState, count: number, typeLabel: string): string {
    return `NOTICE OF PRIVACY BREACH
As Required by 45 CFR 164.404

Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

Dear [Patient Name],

We are writing to inform you of a breach of your protected health information (PHI) at ${f.practiceName}. We take the privacy and security of your health information very seriously and are notifying you in accordance with the HIPAA Breach Notification Rule (45 CFR 164.400–164.414).

WHAT HAPPENED:
On or around ${new Date(f.discoveryDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}, we discovered a data security incident involving ${typeLabel.toLowerCase()}. ${f.description || '[Describe what happened in plain language]'}

WHAT INFORMATION WAS INVOLVED:
The following types of information may have been involved:
• [Name, date of birth, address]
• [Medical record number / patient ID]
• [Diagnosis, treatment, or clinical information]
• [Health insurance information]
• [Other PHI as applicable]

WHAT WE ARE DOING:
• We have contained the incident and secured affected systems.
• We have notified the HHS Office for Civil Rights as required by law.
• We have implemented additional safeguards to prevent recurrence.
• We are conducting a full internal investigation.

WHAT YOU CAN DO:
• Monitor your Explanation of Benefits (EOB) statements for any unauthorized charges.
• Consider placing a fraud alert or security freeze with credit bureaus (Equifax, Experian, TransUnion).
• Review your medical records for any inaccuracies.
• Report any suspicious activity to your insurance company immediately.

FOR MORE INFORMATION:
If you have questions about this notice or would like more information, please contact our Privacy Officer:

${f.practiceName}
Privacy Officer
Phone: [Phone Number]
Email: [Email Address]
Address: [Practice Address]

You also have the right to file a complaint with the HHS Office for Civil Rights at:
https://www.hhs.gov/hipaa/filing-a-complaint

We sincerely apologize for this incident and any inconvenience it may cause you.

Sincerely,

_________________________________
Privacy Officer
${f.practiceName}`
  }

  const severityColors: Record<string, string> = {
    critical: '#ef4444',
    high: '#f97316',
    medium: '#f59e0b',
    low: '#00d4aa',
  }

  return (
    <div style={{ backgroundColor: '#0a0a0f', color: '#e8e8e8', fontFamily: 'Inter, -apple-system, sans-serif', minHeight: '100vh' }}>

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'rgba(10,10,15,0.95)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: 'rgba(0,212,170,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#00d4aa', fontSize: 12, fontWeight: 700 }}>C</span>
            </div>
            <span style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>ComplianceAI</span>
          </Link>
          <span style={{ color: '#6b7280', fontSize: 13 }}>HIPAA Breach Response Tool</span>
        </div>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '5px 14px',
            borderRadius: 100,
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)',
            marginBottom: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
            <span style={{ color: '#ef4444', fontSize: 12, fontWeight: 500 }}>45 CFR 164.400–164.414 Compliant</span>
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 800, color: '#fff', marginBottom: 12, lineHeight: 1.2 }}>
            HIPAA Incident Response
          </h1>
          <p style={{ color: '#9ca3af', fontSize: 16, lineHeight: 1.6, maxWidth: 520, margin: '0 auto' }}>
            Describe what happened. We generate your OCR notification letter, patient notification template, and internal investigation checklist — with correct regulatory citations.
          </p>
        </div>

        {!result ? (
          <form onSubmit={handleSubmit}>

            {/* Practice Info */}
            <div style={{
              background: '#12121a',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16,
              padding: '24px 28px',
              marginBottom: 20,
            }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Practice Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, color: '#9ca3af', display: 'block', marginBottom: 6 }}>Practice Name *</label>
                  <input
                    type="text"
                    value={form.practiceName}
                    onChange={(e) => setForm((f) => ({ ...f, practiceName: e.target.value }))}
                    placeholder="e.g., Sunrise Family Practice"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: 14,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: '#9ca3af', display: 'block', marginBottom: 6 }}>State</label>
                  <select
                    value={form.practiceState}
                    onChange={(e) => setForm((f) => ({ ...f, practiceState: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: '#1a1a24',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: 14,
                      boxSizing: 'border-box',
                    }}
                  >
                    {['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, color: '#9ca3af', display: 'block', marginBottom: 6 }}>Practice Type</label>
                  <select
                    value={form.practiceType}
                    onChange={(e) => setForm((f) => ({ ...f, practiceType: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: '#1a1a24',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: 14,
                      boxSizing: 'border-box',
                    }}
                  >
                    {['medical', 'dental', 'mental health', 'chiropractic', 'physical therapy', 'urgent care', 'optometry', 'other'].map((t) => (
                      <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, color: '#9ca3af', display: 'block', marginBottom: 6 }}>Date Discovered *</label>
                  <input
                    type="date"
                    value={form.discoveryDate}
                    onChange={(e) => setForm((f) => ({ ...f, discoveryDate: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: 14,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Incident Type */}
            <div style={{
              background: '#12121a',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16,
              padding: '24px 28px',
              marginBottom: 20,
            }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 6 }}>What Happened? *</h2>
              <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 18 }}>Select all that apply</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {incidentTypes.map((t) => {
                  const selected = form.selectedTypes.includes(t.value)
                  return (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => toggleType(t.value)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: '14px 18px',
                        borderRadius: 10,
                        border: `1px solid ${selected ? 'rgba(0,212,170,0.35)' : 'rgba(255,255,255,0.08)'}`,
                        background: selected ? 'rgba(0,212,170,0.06)' : 'rgba(255,255,255,0.02)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s',
                      }}
                    >
                      <div style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        border: `2px solid ${selected ? '#00d4aa' : 'rgba(255,255,255,0.2)'}`,
                        background: selected ? '#00d4aa' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: 11,
                        color: '#0a0a0f',
                        fontWeight: 800,
                      }}>
                        {selected && '✓'}
                      </div>
                      <div>
                        <p style={{ color: selected ? '#fff' : '#d1d5db', fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{t.label}</p>
                        <p style={{ color: '#6b7280', fontSize: 12 }}>{t.description}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Details */}
            <div style={{
              background: '#12121a',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16,
              padding: '24px 28px',
              marginBottom: 20,
            }}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 15, fontWeight: 700, color: '#fff', display: 'block', marginBottom: 6 }}>
                  How many patients may be affected? *
                </label>
                <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 10 }}>
                  500+ triggers immediate OCR notification and media notice requirements (45 CFR 164.408)
                </p>
                <input
                  type="number"
                  min="1"
                  value={form.patientCount}
                  onChange={(e) => setForm((f) => ({ ...f, patientCount: e.target.value }))}
                  placeholder="Enter estimated number"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 600,
                    boxSizing: 'border-box',
                  }}
                />
                {form.patientCount && Number(form.patientCount) >= 500 && (
                  <div style={{
                    marginTop: 10,
                    padding: '10px 14px',
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    borderRadius: 8,
                    color: '#ef4444',
                    fontSize: 13,
                  }}>
                    500+ affected individuals — immediate OCR notification and media notice required within 60 days of discovery.
                  </div>
                )}
              </div>

              <div>
                <label style={{ fontSize: 15, fontWeight: 700, color: '#fff', display: 'block', marginBottom: 6 }}>
                  Brief description (optional)
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Describe what happened in your own words. More detail = more specific guidance."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: 14,
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    lineHeight: 1.6,
                  }}
                />
              </div>
            </div>

            {error && (
              <div style={{ color: '#ef4444', fontSize: 14, marginBottom: 16, padding: '10px 14px', background: 'rgba(239,68,68,0.08)', borderRadius: 8, border: '1px solid rgba(239,68,68,0.2)' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: 12,
                background: loading ? 'rgba(0,212,170,0.4)' : '#00d4aa',
                color: '#0a0a0f',
                fontSize: 16,
                fontWeight: 700,
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Generating Response Documents...' : 'Generate Breach Response Documents'}
            </button>
            <p style={{ textAlign: 'center', color: '#4b5563', fontSize: 13, marginTop: 12 }}>
              Generates OCR notification letter, patient template & investigation checklist with 45 CFR citations
            </p>
          </form>
        ) : (
          <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>

              {/* Status Banner */}
              <div style={{
                background: result.requiresImmediateOCR ? 'rgba(239,68,68,0.08)' : 'rgba(245,158,11,0.08)',
                border: `1px solid ${result.requiresImmediateOCR ? 'rgba(239,68,68,0.3)' : 'rgba(245,158,11,0.3)'}`,
                borderRadius: 14,
                padding: '16px 20px',
                marginBottom: 20,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
              }}>
                <span style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: result.requiresImmediateOCR ? '#ef4444' : '#f59e0b',
                  flexShrink: 0,
                  marginTop: 4,
                  display: 'block',
                }} />
                <div>
                  <p style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                    {result.requiresImmediateOCR
                      ? 'Immediate OCR Notification Required'
                      : 'OCR Annual Log Entry Required'}
                  </p>
                  <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.5 }}>
                    {result.requiresImmediateOCR
                      ? `500+ individuals affected. You must notify OCR at hhs.gov/ocr and send individual notifications by ${result.deadline}. Media notice may be required. (45 CFR 164.408)`
                      : `Fewer than 500 individuals affected. Log this breach for annual HHS report due March 1 of the following year. Individual notifications still required within 60 days. (45 CFR 164.408(c))`}
                  </p>
                </div>
              </div>

              {/* Severity */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 24,
              }}>
                <span style={{
                  padding: '5px 14px',
                  borderRadius: 100,
                  background: `${severityColors[result.severity] || '#f59e0b'}18`,
                  border: `1px solid ${severityColors[result.severity] || '#f59e0b'}40`,
                  color: severityColors[result.severity] || '#f59e0b',
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: 'capitalize',
                }}>
                  {result.severity} Severity
                </span>
                <button
                  onClick={() => setResult(null)}
                  style={{
                    marginLeft: 'auto',
                    padding: '6px 14px',
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#9ca3af',
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  Start Over
                </button>
              </div>

              {/* Tabs */}
              <div style={{
                display: 'flex',
                gap: 4,
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 10,
                padding: 4,
                marginBottom: 20,
              }}>
                {[
                  { key: 'ocr', label: 'OCR Notification Letter' },
                  { key: 'patient', label: 'Patient Notification' },
                  { key: 'checklist', label: 'Investigation Checklist' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as typeof activeTab)}
                    style={{
                      flex: 1,
                      padding: '10px 8px',
                      borderRadius: 7,
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 600,
                      background: activeTab === tab.key ? 'rgba(0,212,170,0.12)' : 'transparent',
                      color: activeTab === tab.key ? '#00d4aa' : '#6b7280',
                      transition: 'all 0.15s',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div style={{
                background: '#12121a',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 14,
                padding: '24px 28px',
                marginBottom: 20,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <p style={{ fontSize: 12, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {activeTab === 'ocr' && '45 CFR 164.408 — OCR Breach Report'}
                    {activeTab === 'patient' && '45 CFR 164.404 — Individual Notification'}
                    {activeTab === 'checklist' && 'Internal Investigation & Response'}
                  </p>
                  <button
                    onClick={() => {
                      const text = activeTab === 'ocr' ? result.ocrLetter
                        : activeTab === 'patient' ? result.patientNotification
                        : result.investigationChecklist
                      navigator.clipboard.writeText(text)
                    }}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 6,
                      background: 'rgba(0,212,170,0.08)',
                      border: '1px solid rgba(0,212,170,0.2)',
                      color: '#00d4aa',
                      fontSize: 12,
                      cursor: 'pointer',
                    }}
                  >
                    Copy
                  </button>
                </div>
                <pre style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontSize: 13,
                  color: '#d1d5db',
                  lineHeight: 1.8,
                  fontFamily: 'inherit',
                  margin: 0,
                  maxHeight: 500,
                  overflowY: 'auto',
                }}>
                  {activeTab === 'ocr' && result.ocrLetter}
                  {activeTab === 'patient' && result.patientNotification}
                  {activeTab === 'checklist' && result.investigationChecklist}
                </pre>
              </div>

              {/* CTA */}
              <div style={{
                background: 'rgba(0,212,170,0.04)',
                border: '1px solid rgba(0,212,170,0.15)',
                borderRadius: 14,
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                flexWrap: 'wrap',
              }}>
                <div>
                  <p style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                    Track this incident and all future ones in ComplianceAI
                  </p>
                  <p style={{ color: '#6b7280', fontSize: 13 }}>
                    Dashboard, audit trail, deadline tracking, and auto-generated documentation — from $199/month.
                  </p>
                </div>
                <Link
                  href="/dashboard"
                  style={{
                    padding: '12px 22px',
                    borderRadius: 10,
                    background: '#00d4aa',
                    color: '#0a0a0f',
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Start Free Trial
                </Link>
              </div>

            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
