'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Navbar } from '@/components/Navbar'
import { motion, AnimatePresence } from 'framer-motion'

interface Client {
  id: string
  org_id: string
  name: string
  industry: string
  target_system: 'quickbooks' | 'xero' | 'generic'
  custom_gl_mappings: Record<string, string>
  invoice_count_this_month: number
  total_processed: number
  last_activity: string | null
  status: 'active' | 'inactive'
  created_at: string
}

const INDUSTRIES = [
  'Retail', 'Healthcare', 'Technology', 'Construction', 'Real Estate',
  'Manufacturing', 'Hospitality', 'Legal', 'Non-profit', 'Other',
]

const DEFAULT_GL_MAPPINGS = {
  quickbooks: {
    'Software & Subscriptions': '6020',
    'Office Supplies': '6010',
    'Professional Services': '6030',
    'Marketing & Advertising': '6040',
    'Travel & Entertainment': '6050',
    'Utilities': '6060',
    'Rent & Facilities': '6070',
    'Insurance': '6080',
    'Equipment & Hardware': '6090',
    'Shipping & Postage': '6110',
  },
  xero: {
    'IT Software & Subscriptions': '461',
    'Office Expenses': '471',
    'Consulting & Accounting': '433',
    'Advertising': '420',
    'Travel': '493',
    'Light, Power, Heating': '463',
    'Rent': '479',
    'Insurance': '449',
    'General Expenses': '445',
    'Freight & Courier': '441',
  },
  generic: {
    'Software & Subscriptions': '6020',
    'Office Supplies': '6010',
    'Professional Services': '6030',
  },
}

export default function ClientsPage() {
  const router = useRouter()
  const [orgId, setOrgId] = useState<string | null>(null)
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    name: '',
    industry: 'Technology',
    target_system: 'quickbooks' as 'quickbooks' | 'xero' | 'generic',
    custom_gl_mappings: {} as Record<string, string>,
  })
  const [glRows, setGlRows] = useState<{ category: string; code: string }[]>([])

  const loadClients = useCallback(async (oid: string) => {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .eq('org_id', oid)
      .order('created_at', { ascending: false })
    setClients((data as Client[]) || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.push('/auth/login'); return }
      const { data: org } = await supabase
        .from('organizations')
        .select('id')
        .eq('owner_id', data.user.id)
        .single()
      if (!org) { router.push('/onboarding'); return }
      setOrgId(org.id)
      loadClients(org.id)
    })
  }, [router, loadClients])

  const handleTargetSystemChange = (ts: 'quickbooks' | 'xero' | 'generic') => {
    const defaults = DEFAULT_GL_MAPPINGS[ts]
    const rows = Object.entries(defaults).map(([category, code]) => ({ category, code }))
    setForm(f => ({ ...f, target_system: ts, custom_gl_mappings: defaults }))
    setGlRows(rows)
  }

  const openAddModal = () => {
    const defaults = DEFAULT_GL_MAPPINGS.quickbooks
    setForm({ name: '', industry: 'Technology', target_system: 'quickbooks', custom_gl_mappings: defaults })
    setGlRows(Object.entries(defaults).map(([category, code]) => ({ category, code })))
    setShowAddModal(true)
  }

  const handleGlRowChange = (idx: number, field: 'category' | 'code', value: string) => {
    const updated = glRows.map((r, i) => i === idx ? { ...r, [field]: value } : r)
    setGlRows(updated)
    const mappings = Object.fromEntries(updated.map(r => [r.category, r.code]))
    setForm(f => ({ ...f, custom_gl_mappings: mappings }))
  }

  const addGlRow = () => setGlRows(r => [...r, { category: '', code: '' }])
  const removeGlRow = (idx: number) => {
    const updated = glRows.filter((_, i) => i !== idx)
    setGlRows(updated)
    setForm(f => ({ ...f, custom_gl_mappings: Object.fromEntries(updated.map(r => [r.category, r.code])) }))
  }

  const handleSave = async () => {
    if (!orgId || !form.name.trim()) return
    setSaving(true)
    const { data, error } = await supabase.from('clients').insert({
      org_id: orgId,
      name: form.name.trim(),
      industry: form.industry,
      target_system: form.target_system,
      custom_gl_mappings: form.custom_gl_mappings,
      invoice_count_this_month: 0,
      total_processed: 0,
      last_activity: null,
      status: 'active',
    }).select().single()

    if (!error && data) {
      setClients(c => [data as Client, ...c])
      setShowAddModal(false)
    }
    setSaving(false)
  }

  const statusColor = (s: string) => s === 'active' ? 'text-green-400 bg-green-400/10' : 'text-white/30 bg-white/5'

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
            <h1 className="text-2xl font-bold text-white">Client Portal</h1>
            <p className="text-white/40 text-sm mt-1">Manage invoices across all your clients</p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-[#4f8ef7] hover:bg-[#4f8ef7]/80 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Client
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Clients', value: clients.length, color: 'text-[#4f8ef7]' },
            { label: 'Active Clients', value: clients.filter(c => c.status === 'active').length, color: 'text-green-400' },
            { label: 'Invoices This Month', value: clients.reduce((s, c) => s + (c.invoice_count_this_month || 0), 0), color: 'text-white' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-[#1a1a24] border border-white/10 rounded-2xl p-5">
              <div className={`text-2xl font-bold mb-1 ${s.color}`}>{s.value}</div>
              <div className="text-xs text-white/30 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Client Table */}
        {clients.length === 0 ? (
          <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-16 text-center">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-white/50 text-sm mb-2">No clients yet</p>
            <p className="text-white/25 text-xs">Add your first client to start managing their invoices</p>
          </div>
        ) : (
          <div className="bg-[#1a1a24] border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs text-white/30 font-medium px-6 py-4">Client</th>
                  <th className="text-left text-xs text-white/30 font-medium px-6 py-4">Industry</th>
                  <th className="text-right text-xs text-white/30 font-medium px-6 py-4">This Month</th>
                  <th className="text-right text-xs text-white/30 font-medium px-6 py-4">Total</th>
                  <th className="text-left text-xs text-white/30 font-medium px-6 py-4">System</th>
                  <th className="text-left text-xs text-white/30 font-medium px-6 py-4">Last Activity</th>
                  <th className="text-left text-xs text-white/30 font-medium px-6 py-4">Status</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody>
                {clients.map((client, i) => (
                  <motion.tr key={client.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#4f8ef7]/20 flex items-center justify-center text-[#4f8ef7] text-xs font-bold">
                          {client.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-white">{client.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/50">{client.industry}</td>
                    <td className="px-6 py-4 text-sm text-white text-right font-medium">{client.invoice_count_this_month || 0}</td>
                    <td className="px-6 py-4 text-sm text-white/50 text-right">{client.total_processed || 0}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-white/50 capitalize">
                        {client.target_system === 'quickbooks' ? 'QuickBooks' : client.target_system === 'xero' ? 'Xero' : 'Generic'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/30">
                      {client.last_activity ? new Date(client.last_activity).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColor(client.status)}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => router.push(`/dashboard?client=${client.id}`)}
                        className="text-xs text-[#4f8ef7] hover:text-[#4f8ef7]/70 transition-colors"
                      >
                        View invoices
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Client Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={(e) => { if (e.target === e.currentTarget) setShowAddModal(false) }}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1a1a24] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Add New Client</h2>
                <button onClick={() => setShowAddModal(false)} className="text-white/30 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2">Client Name *</label>
                  <input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Acme Corp"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#4f8ef7]/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-2">Industry</label>
                    <select
                      value={form.industry}
                      onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}
                      className="w-full bg-[#0f0f14] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#4f8ef7]/50"
                    >
                      {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-2">Accounting System</label>
                    <select
                      value={form.target_system}
                      onChange={e => handleTargetSystemChange(e.target.value as 'quickbooks' | 'xero' | 'generic')}
                      className="w-full bg-[#0f0f14] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#4f8ef7]/50"
                    >
                      <option value="quickbooks">QuickBooks</option>
                      <option value="xero">Xero</option>
                      <option value="generic">Generic</option>
                    </select>
                  </div>
                </div>

                {/* GL Mappings */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-medium text-white/50">GL Account Mappings</label>
                    <button onClick={addGlRow} className="text-xs text-[#4f8ef7] hover:text-[#4f8ef7]/70 transition-colors">
                      + Add row
                    </button>
                  </div>
                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {glRows.map((row, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          value={row.category}
                          onChange={e => handleGlRowChange(idx, 'category', e.target.value)}
                          placeholder="Expense category"
                          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#4f8ef7]/30"
                        />
                        <input
                          value={row.code}
                          onChange={e => handleGlRowChange(idx, 'code', e.target.value)}
                          placeholder="GL code"
                          className="w-24 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#4f8ef7]/30"
                        />
                        <button onClick={() => removeGlRow(idx)} className="text-white/20 hover:text-red-400 transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/5 flex items-center justify-end gap-3">
                <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !form.name.trim()}
                  className="px-5 py-2 bg-[#4f8ef7] hover:bg-[#4f8ef7]/80 disabled:opacity-40 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  {saving ? 'Saving...' : 'Add Client'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
