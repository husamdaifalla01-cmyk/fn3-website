'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Navbar } from '@/components/Navbar'
import { Invoice } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface ApprovalItem extends Invoice {
  approval_status?: 'pending' | 'approved' | 'flagged' | 'reassigned'
  approved_by?: string
  approved_at?: string
  reviewer_note?: string
}

const GL_CATEGORIES_QB = [
  { code: '6000', name: 'Operating Expenses' },
  { code: '6010', name: 'Office Supplies' },
  { code: '6020', name: 'Software & Subscriptions' },
  { code: '6030', name: 'Professional Services' },
  { code: '6040', name: 'Marketing & Advertising' },
  { code: '6050', name: 'Travel & Entertainment' },
  { code: '6060', name: 'Utilities' },
  { code: '6070', name: 'Rent & Facilities' },
  { code: '6080', name: 'Insurance' },
  { code: '6090', name: 'Equipment & Hardware' },
  { code: '6100', name: 'Repairs & Maintenance' },
  { code: '6110', name: 'Shipping & Postage' },
  { code: '6120', name: 'Bank & Finance Charges' },
]

export default function ApprovalPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)
  const [orgId, setOrgId] = useState<string | null>(null)
  const [queue, setQueue] = useState<ApprovalItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<ApprovalItem | null>(null)
  const [reassignCode, setReassignCode] = useState('')
  const [reassignCategory, setReassignCategory] = useState('')
  const [reviewerNote, setReviewerNote] = useState('')
  const [processing, setProcessing] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'flagged'>('pending')

  const loadQueue = useCallback(async (oid: string) => {
    const { data } = await supabase
      .from('invoices')
      .select('*, line_items(*)')
      .eq('org_id', oid)
      .in('status', ['extracted', 'reviewed'])
      .order('created_at', { ascending: false })
      .limit(100)

    const { data: approvals } = await supabase
      .from('invoice_approvals')
      .select('*')
      .in('invoice_id', (data || []).map((i: Invoice) => i.id))

    const approvalMap = new Map((approvals || []).map((a: { invoice_id: string; status: string; approved_by: string; approved_at: string; reviewer_note: string }) => [a.invoice_id, a]))

    const items: ApprovalItem[] = (data || []).map((inv: Invoice) => {
      const approval = approvalMap.get(inv.id)
      const rawStatus = approval?.status || 'pending'
      const approvalStatus = ['pending', 'approved', 'flagged', 'reassigned'].includes(rawStatus)
        ? (rawStatus as 'pending' | 'approved' | 'flagged' | 'reassigned')
        : 'pending' as const
      return {
        ...inv,
        approval_status: approvalStatus,
        approved_by: approval?.approved_by,
        approved_at: approval?.approved_at,
        reviewer_note: approval?.reviewer_note,
      }
    })

    setQueue(items)
    setLoading(false)
  }, [])

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.push('/auth/login'); return }
      setUser({ id: data.user.id, email: data.user.email || '' })
      const { data: org } = await supabase.from('organizations').select('id').eq('owner_id', data.user.id).single()
      if (!org) { router.push('/onboarding'); return }
      setOrgId(org.id)
      loadQueue(org.id)
    })
  }, [router, loadQueue])

  const handleAction = async (invoice: ApprovalItem, action: 'approve' | 'flag' | 'reassign') => {
    if (!user) return
    setProcessing(invoice.id)

    const approvalData = {
      invoice_id: invoice.id,
      org_id: orgId,
      status: action === 'approve' ? 'approved' : action === 'flag' ? 'flagged' : 'reassigned',
      approved_by: user.email,
      approved_at: new Date().toISOString(),
      reviewer_note: reviewerNote || null,
      new_gl_code: action === 'reassign' ? reassignCode : null,
      new_category: action === 'reassign' ? reassignCategory : null,
    }

    await supabase.from('invoice_approvals').upsert(approvalData, { onConflict: 'invoice_id' })

    if (action === 'reassign' && reassignCode) {
      await supabase.from('invoices')
        .update({ gl_code: reassignCode, expense_category: reassignCategory, status: 'reviewed', updated_at: new Date().toISOString() })
        .eq('id', invoice.id)
    } else if (action === 'approve') {
      await supabase.from('invoices')
        .update({ status: 'reviewed', updated_at: new Date().toISOString() })
        .eq('id', invoice.id)
    }

    setQueue(q => q.map(i => i.id === invoice.id ? {
      ...i,
      approval_status: approvalData.status as 'approved' | 'flagged' | 'reassigned',
      approved_by: user.email,
      approved_at: approvalData.approved_at,
      reviewer_note: reviewerNote || undefined,
      gl_code: action === 'reassign' ? reassignCode : i.gl_code,
      expense_category: action === 'reassign' ? reassignCategory : i.expense_category,
    } : i))

    setSelected(null)
    setReassignCode('')
    setReassignCategory('')
    setReviewerNote('')
    setProcessing(null)
  }

  const filtered = queue.filter(i => filter === 'all' ? true : i.approval_status === filter)
  const pendingCount = queue.filter(i => i.approval_status === 'pending').length
  const approvedCount = queue.filter(i => i.approval_status === 'approved').length
  const flaggedCount = queue.filter(i => i.approval_status === 'flagged').length

  const confidenceColor = (score?: number) => {
    if (!score) return 'text-white/30'
    if (score >= 90) return 'text-green-400'
    if (score >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  const statusBadge = (status?: string) => {
    switch (status) {
      case 'approved': return 'bg-green-400/10 text-green-400'
      case 'flagged': return 'bg-red-400/10 text-red-400'
      case 'reassigned': return 'bg-yellow-400/10 text-yellow-400'
      default: return 'bg-[#4f8ef7]/10 text-[#4f8ef7]'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f14] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#4f8ef7] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f0f14] text-[#e2e8f0]">
      <Navbar variant="app" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Approval Queue</h1>
            <p className="text-white/40 text-sm mt-1">Review, approve, or flag extracted invoices before export</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="px-3 py-1.5 bg-[#4f8ef7]/10 text-[#4f8ef7] rounded-lg font-medium">{pendingCount} pending</span>
            <span className="px-3 py-1.5 bg-green-400/10 text-green-400 rounded-lg font-medium">{approvedCount} approved</span>
            <span className="px-3 py-1.5 bg-red-400/10 text-red-400 rounded-lg font-medium">{flaggedCount} flagged</span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-6 bg-white/5 rounded-lg p-1 w-fit">
          {(['all', 'pending', 'approved', 'flagged'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-sm rounded-md transition-colors capitalize font-medium ${filter === f ? 'bg-[#1a1a24] text-white' : 'text-white/40 hover:text-white'}`}>
              {f}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-16 text-center">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-white/50 text-sm">
              {filter === 'pending' ? 'No invoices awaiting review' : `No ${filter} invoices`}
            </p>
          </div>
        ) : (
          <div className="bg-[#1a1a24] border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs text-white/30 font-medium px-6 py-4">Vendor</th>
                  <th className="text-right text-xs text-white/30 font-medium px-6 py-4">Amount</th>
                  <th className="text-left text-xs text-white/30 font-medium px-6 py-4">GL Category</th>
                  <th className="text-right text-xs text-white/30 font-medium px-6 py-4">Confidence</th>
                  <th className="text-left text-xs text-white/30 font-medium px-6 py-4">Status</th>
                  <th className="text-left text-xs text-white/30 font-medium px-6 py-4">Reviewed by</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => (
                  <motion.tr key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">{item.vendor_name || 'Unknown Vendor'}</div>
                      <div className="text-xs text-white/30 mt-0.5">{item.invoice_number || 'No number'} · {item.invoice_date || '—'}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-semibold text-white">{formatCurrency(item.total_amount || 0)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white/70">{item.expense_category || '—'}</div>
                      <div className="text-xs text-white/30">{item.gl_code || '—'}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-sm font-medium ${confidenceColor(item.confidence_score)}`}>
                        {item.confidence_score ? `${item.confidence_score}%` : '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusBadge(item.approval_status)}`}>
                        {item.approval_status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-white/30">
                      {item.approved_by ? (
                        <div>
                          <div>{item.approved_by}</div>
                          <div>{item.approved_at ? new Date(item.approved_at).toLocaleDateString() : ''}</div>
                        </div>
                      ) : '—'}
                    </td>
                    <td className="px-6 py-4">
                      {item.approval_status === 'pending' && (
                        <button
                          onClick={() => { setSelected(item); setReassignCode(item.gl_code || ''); setReassignCategory(item.expense_category || '') }}
                          className="text-xs text-[#4f8ef7] hover:text-[#4f8ef7]/70 transition-colors font-medium"
                        >
                          Review
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={(e) => { if (e.target === e.currentTarget) setSelected(null) }}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1a1a24] border border-white/10 rounded-2xl w-full max-w-lg">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Review Invoice</h2>
                <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Invoice summary */}
                <div className="bg-white/5 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Vendor</span>
                    <span className="text-white font-medium">{selected.vendor_name || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Amount</span>
                    <span className="text-white font-semibold">{formatCurrency(selected.total_amount || 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Current GL</span>
                    <span className="text-white">{selected.gl_code} — {selected.expense_category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Confidence</span>
                    <span className={`font-medium ${confidenceColor(selected.confidence_score)}`}>
                      {selected.confidence_score ? `${selected.confidence_score}%` : '—'}
                    </span>
                  </div>
                </div>

                {/* Reassign GL */}
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2">Reassign GL Code</label>
                  <select
                    value={reassignCode}
                    onChange={e => {
                      const opt = GL_CATEGORIES_QB.find(g => g.code === e.target.value)
                      setReassignCode(e.target.value)
                      setReassignCategory(opt?.name || '')
                    }}
                    className="w-full bg-[#0f0f14] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#4f8ef7]/50"
                  >
                    {GL_CATEGORIES_QB.map(g => (
                      <option key={g.code} value={g.code}>{g.code} — {g.name}</option>
                    ))}
                  </select>
                </div>

                {/* Note */}
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2">Reviewer Note (optional)</label>
                  <textarea
                    value={reviewerNote}
                    onChange={e => setReviewerNote(e.target.value)}
                    placeholder="Add a note for audit trail..."
                    rows={2}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#4f8ef7]/50 resize-none"
                  />
                </div>
              </div>

              <div className="p-6 border-t border-white/5 flex items-center gap-2">
                <button
                  onClick={() => handleAction(selected, 'approve')}
                  disabled={processing === selected.id}
                  className="flex-1 px-4 py-2.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-sm font-medium rounded-lg transition-colors disabled:opacity-40"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(selected, 'reassign')}
                  disabled={processing === selected.id || !reassignCode}
                  className="flex-1 px-4 py-2.5 bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400 text-sm font-medium rounded-lg transition-colors disabled:opacity-40"
                >
                  Reassign Category
                </button>
                <button
                  onClick={() => handleAction(selected, 'flag')}
                  disabled={processing === selected.id}
                  className="flex-1 px-4 py-2.5 bg-red-400/20 hover:bg-red-400/30 text-red-400 text-sm font-medium rounded-lg transition-colors disabled:opacity-40"
                >
                  Flag for Client
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
