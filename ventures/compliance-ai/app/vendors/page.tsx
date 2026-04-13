'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type BAAStatus = 'signed' | 'pending' | 'expired' | 'not_required'

interface Vendor {
  id: string
  name: string
  serviceType: string
  baaStatus: BAAStatus
  lastReviewed: string | null
  notes: string
  isDefault?: boolean
}

const DEFAULT_VENDORS: Vendor[] = [
  {
    id: 'ehr',
    name: 'EHR Vendor',
    serviceType: 'Electronic Health Records',
    baaStatus: 'pending',
    lastReviewed: null,
    notes: 'Your EHR system stores and transmits ePHI. A BAA is required before any PHI is entered.',
    isDefault: true,
  },
  {
    id: 'billing',
    name: 'Billing Company',
    serviceType: 'Medical Billing / Revenue Cycle',
    baaStatus: 'pending',
    lastReviewed: null,
    notes: 'Billing companies process PHI to submit insurance claims. BAA required under 45 CFR 164.504(e).',
    isDefault: true,
  },
  {
    id: 'it-support',
    name: 'IT Support',
    serviceType: 'Information Technology Support',
    baaStatus: 'pending',
    lastReviewed: null,
    notes: 'If your IT company has access to systems containing PHI, they are a business associate.',
    isDefault: true,
  },
  {
    id: 'accounting',
    name: 'Accounting Firm',
    serviceType: 'Accounting / Financial Services',
    baaStatus: 'pending',
    lastReviewed: null,
    notes: 'Accountants who access billing records containing PHI require a BAA.',
    isDefault: true,
  },
  {
    id: 'answering',
    name: 'Answering Service',
    serviceType: 'Medical Answering Service',
    baaStatus: 'pending',
    lastReviewed: null,
    notes: 'After-hours answering services that receive patient messages are business associates.',
    isDefault: true,
  },
]

const SERVICE_TYPES = [
  'Electronic Health Records',
  'Medical Billing / Revenue Cycle',
  'Information Technology Support',
  'Accounting / Financial Services',
  'Medical Answering Service',
  'Cloud Storage / Backup',
  'Email Provider',
  'Telehealth Platform',
  'Transcription Service',
  'Pharmacy',
  'Lab Services',
  'Imaging / Radiology',
  'Shredding Service',
  'Other',
]

const STATUS_CONFIG: Record<BAAStatus, { label: string; color: string; bg: string; icon: string }> = {
  signed: { label: 'Signed', color: '#00d4aa', bg: 'rgba(0,212,170,0.12)', icon: '✓' },
  pending: { label: 'Pending', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', icon: '○' },
  expired: { label: 'Expired', color: '#ef4444', bg: 'rgba(239,68,68,0.12)', icon: '✗' },
  not_required: { label: 'Not Required', color: '#6b7280', bg: 'rgba(107,114,128,0.12)', icon: '—' },
}

function isOld(lastReviewed: string | null): boolean {
  if (!lastReviewed) return false
  const d = new Date(lastReviewed)
  const threeYearsAgo = new Date()
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3)
  return d < threeYearsAgo
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>(DEFAULT_VENDORS)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showBAAModal, setShowBAAModal] = useState<string | null>(null)
  const [newVendor, setNewVendor] = useState({
    name: '',
    serviceType: SERVICE_TYPES[0],
    baaStatus: 'pending' as BAAStatus,
    lastReviewed: '',
    notes: '',
  })

  const addVendor = () => {
    if (!newVendor.name.trim()) return
    const vendor: Vendor = {
      id: `vendor-${Date.now()}`,
      name: newVendor.name,
      serviceType: newVendor.serviceType,
      baaStatus: newVendor.baaStatus,
      lastReviewed: newVendor.lastReviewed || null,
      notes: newVendor.notes,
    }
    setVendors(prev => [...prev, vendor])
    setNewVendor({ name: '', serviceType: SERVICE_TYPES[0], baaStatus: 'pending', lastReviewed: '', notes: '' })
    setShowAddForm(false)
  }

  const updateStatus = (id: string, status: BAAStatus) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, baaStatus: status, ...(status === 'signed' ? { lastReviewed: new Date().toISOString().split('T')[0] } : {}) } : v))
  }

  const markReviewed = (id: string) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, lastReviewed: new Date().toISOString().split('T')[0] } : v))
  }

  const removeVendor = (id: string) => {
    setVendors(prev => prev.filter(v => v.id !== id))
  }

  const signed = vendors.filter(v => v.baaStatus === 'signed').length
  const pending = vendors.filter(v => v.baaStatus === 'pending').length
  const expired = vendors.filter(v => v.baaStatus === 'expired').length
  const needsReview = vendors.filter(v => isOld(v.lastReviewed)).length

  const BAAModalContent = ({ vendorId }: { vendorId: string }) => {
    const vendor = vendors.find(v => v.id === vendorId)
    if (!vendor) return null
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowBAAModal(null)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-lg bg-[#12121a] border border-white/15 rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Generate BAA</h2>
            <button onClick={() => setShowBAAModal(null)} className="text-gray-500 hover:text-gray-300 text-xl">✕</button>
          </div>
          <p className="text-sm text-gray-400 mb-6">
            You&apos;re generating a Business Associate Agreement for <span className="text-white font-medium">{vendor.name}</span> ({vendor.serviceType}).
          </p>
          <div className="bg-[#0d0d14] border border-white/8 rounded-xl p-4 mb-6 text-sm text-gray-400">
            <p className="text-teal-400 font-medium mb-2">This BAA will include:</p>
            <ul className="space-y-1">
              <li>→ All required 45 CFR 164.504(e)(2) provisions</li>
              <li>→ HITECH Act compliance language</li>
              <li>→ NIST SP 800-66 Rev. 2 safeguard standards</li>
              <li>→ Breach notification within 60 days (45 CFR 164.410)</li>
              <li>→ Subcontractor flow-down requirements</li>
              <li>→ Termination and data destruction provisions</li>
            </ul>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowBAAModal(null)}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-gray-400 hover:text-gray-200 transition-all"
            >
              Cancel
            </button>
            <Link
              href="/dashboard"
              onClick={() => setShowBAAModal(null)}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium text-center"
              style={{ background: 'rgba(0,212,170,0.15)', color: '#00d4aa', border: '1px solid rgba(0,212,170,0.3)' }}
            >
              Generate in Dashboard →
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <header className="border-b border-white/8 bg-[#0a0a0f]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-gray-400 hover:text-gray-200 transition-colors text-sm">← Dashboard</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white text-sm font-medium">Vendor Risk Tracker</span>
          </div>
          <span className="text-xs text-gray-500 bg-white/5 px-3 py-1.5 rounded-full">45 CFR 164.504(e)</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Vendor Risk Tracker</h1>
            <p className="text-gray-500">Track Business Associate Agreements for all vendors with access to PHI. Required by 45 CFR 164.504(e).</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap"
            style={{ background: 'rgba(0,212,170,0.15)', color: '#00d4aa', border: '1px solid rgba(0,212,170,0.3)' }}
          >
            + Add Vendor
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'BAAs Signed', value: signed, color: '#00d4aa', bg: 'rgba(0,212,170,0.1)' },
            { label: 'Pending', value: pending, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
            { label: 'Expired', value: expired, color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
            { label: 'Needs Review', value: needsReview, color: '#a855f7', bg: 'rgba(168,85,247,0.1)' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#12121a] border border-white/8 rounded-2xl p-5">
              <p className="text-2xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Alert: needs review */}
        {needsReview > 0 && (
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 mb-6 flex items-start gap-3">
            <span className="text-purple-400 text-lg mt-0.5">⚠</span>
            <div>
              <p className="text-sm font-medium text-purple-300">{needsReview} BAA{needsReview !== 1 ? 's' : ''} need review</p>
              <p className="text-xs text-gray-500 mt-0.5">OCR best practice: review BAAs every 3 years or when the underlying services agreement changes.</p>
            </div>
          </div>
        )}

        {/* Alert: pending or expired */}
        {(pending > 0 || expired > 0) && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6 flex items-start gap-3">
            <span className="text-amber-400 text-lg mt-0.5">⚠</span>
            <div>
              <p className="text-sm font-medium text-amber-300">
                {pending > 0 && `${pending} unsigned BAA${pending !== 1 ? 's' : ''}`}
                {pending > 0 && expired > 0 && ' and '}
                {expired > 0 && `${expired} expired BAA${expired !== 1 ? 's' : ''}`}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">You cannot legally share PHI with vendors without a signed BAA. This is one of OCR&apos;s most-cited violations.</p>
            </div>
          </div>
        )}

        {/* Add vendor form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-[#12121a] border border-teal-500/20 rounded-2xl p-6">
                <h2 className="text-base font-semibold text-white mb-4">Add New Vendor</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Vendor Name</label>
                    <input
                      type="text"
                      value={newVendor.name}
                      onChange={e => setNewVendor(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Athenahealth, DrChrono"
                      className="w-full bg-[#0d0d14] border border-white/10 text-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500/50 placeholder-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Service Type</label>
                    <select
                      value={newVendor.serviceType}
                      onChange={e => setNewVendor(prev => ({ ...prev, serviceType: e.target.value }))}
                      className="w-full bg-[#0d0d14] border border-white/10 text-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500/50"
                    >
                      {SERVICE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">BAA Status</label>
                    <select
                      value={newVendor.baaStatus}
                      onChange={e => setNewVendor(prev => ({ ...prev, baaStatus: e.target.value as BAAStatus }))}
                      className="w-full bg-[#0d0d14] border border-white/10 text-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500/50"
                    >
                      <option value="signed">Signed</option>
                      <option value="pending">Pending</option>
                      <option value="expired">Expired</option>
                      <option value="not_required">Not Required</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Last Reviewed Date</label>
                    <input
                      type="date"
                      value={newVendor.lastReviewed}
                      onChange={e => setNewVendor(prev => ({ ...prev, lastReviewed: e.target.value }))}
                      className="w-full bg-[#0d0d14] border border-white/10 text-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500/50"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Notes (optional)</label>
                  <input
                    type="text"
                    value={newVendor.notes}
                    onChange={e => setNewVendor(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any relevant notes about this vendor relationship"
                    className="w-full bg-[#0d0d14] border border-white/10 text-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500/50 placeholder-gray-600"
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowAddForm(false)} className="px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-gray-400 hover:text-gray-200 transition-all">
                    Cancel
                  </button>
                  <button
                    onClick={addVendor}
                    disabled={!newVendor.name.trim()}
                    className="px-6 py-2.5 rounded-xl text-sm font-medium disabled:opacity-40 transition-all"
                    style={{ background: 'rgba(0,212,170,0.15)', color: '#00d4aa', border: '1px solid rgba(0,212,170,0.3)' }}
                  >
                    Add Vendor
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vendor list */}
        <div className="space-y-3">
          {vendors.map((vendor) => {
            const statusCfg = STATUS_CONFIG[vendor.baaStatus]
            const needsRevw = isOld(vendor.lastReviewed)
            const isEditing = editingId === vendor.id

            return (
              <motion.div
                key={vendor.id}
                layout
                className="bg-[#12121a] border border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-base font-semibold text-white truncate">{vendor.name}</h3>
                        {vendor.isDefault && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-500 shrink-0">Common BA</span>
                        )}
                        {needsRevw && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 shrink-0">Review Needed</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{vendor.serviceType}</p>
                      {vendor.notes && (
                        <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{vendor.notes}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: statusCfg.bg, color: statusCfg.color }}
                      >
                        {statusCfg.icon} {statusCfg.label}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <div className="text-xs text-gray-600">
                      {vendor.lastReviewed
                        ? `Last reviewed: ${new Date(vendor.lastReviewed).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                        : 'Never reviewed'
                      }
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Status buttons */}
                      <div className="flex gap-1">
                        {(['signed', 'pending', 'expired'] as BAAStatus[]).map(s => (
                          <button
                            key={s}
                            onClick={() => updateStatus(vendor.id, s)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${vendor.baaStatus === s ? 'opacity-100' : 'opacity-25 hover:opacity-60'}`}
                            style={{ background: STATUS_CONFIG[s].bg, color: STATUS_CONFIG[s].color }}
                          >
                            {STATUS_CONFIG[s].label}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => markReviewed(vendor.id)}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium border border-white/10 text-gray-500 hover:text-gray-300 transition-all"
                      >
                        Mark Reviewed
                      </button>

                      <button
                        onClick={() => setShowBAAModal(vendor.id)}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
                        style={{ background: 'rgba(0,212,170,0.1)', color: '#00d4aa', border: '1px solid rgba(0,212,170,0.2)' }}
                      >
                        Generate BAA
                      </button>

                      <button
                        onClick={() => removeVendor(vendor.id)}
                        className="px-2 py-1 rounded-lg text-xs text-gray-600 hover:text-red-400 transition-all"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Regulatory note */}
        <div className="mt-10 p-5 bg-[#12121a] border border-white/8 rounded-2xl">
          <p className="text-xs text-gray-500 leading-relaxed">
            <span className="text-gray-400 font-medium">Regulatory basis: </span>
            45 CFR 164.504(e) requires covered entities to have written BAAs with all business associates before sharing PHI. A business associate is any person or entity that creates, receives, maintains, or transmits PHI to perform services for your practice. Failure to obtain BAAs is one of OCR&apos;s most-cited violations, with penalties up to $1.9M per violation category per year. OCR best practice recommends reviewing BAAs every 3 years and whenever underlying services or regulations change.
          </p>
        </div>
      </div>

      {/* BAA generation modal */}
      {showBAAModal && <BAAModalContent vendorId={showBAAModal} />}
    </div>
  )
}
