'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Navbar } from '@/components/Navbar'
import { motion, AnimatePresence } from 'framer-motion'

type RuleType = 'vendor_contains' | 'amount_gt' | 'amount_lt' | 'vendor_exact' | 'category_contains'
type RuleAction = 'assign_gl' | 'flag_review' | 'skip_duplicate'

interface Rule {
  id: string
  org_id: string
  name: string
  rule_type: RuleType
  condition_value: string
  action: RuleAction
  action_value: string
  gl_code?: string
  gl_category?: string
  is_active: boolean
  priority: number
  created_at: string
}

const RULE_TYPES: { value: RuleType; label: string; placeholder: string }[] = [
  { value: 'vendor_contains', label: 'Vendor name contains', placeholder: 'e.g. AWS, Google Cloud' },
  { value: 'vendor_exact', label: 'Vendor name is exactly', placeholder: 'e.g. Amazon Web Services' },
  { value: 'amount_gt', label: 'Amount greater than', placeholder: 'e.g. 10000' },
  { value: 'amount_lt', label: 'Amount less than', placeholder: 'e.g. 50' },
  { value: 'category_contains', label: 'Category contains', placeholder: 'e.g. Software' },
]

const RULE_ACTIONS: { value: RuleAction; label: string }[] = [
  { value: 'assign_gl', label: 'Assign GL code' },
  { value: 'flag_review', label: 'Flag for manual review' },
  { value: 'skip_duplicate', label: 'Skip duplicate check' },
]

const GL_OPTIONS = [
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
  { code: '7200', name: 'Cloud Infrastructure' },
]

const PRESET_RULES = [
  { name: 'AWS → Cloud Infrastructure', rule_type: 'vendor_contains' as RuleType, condition_value: 'AWS', action: 'assign_gl' as RuleAction, action_value: '7200', gl_code: '7200', gl_category: 'Cloud Infrastructure' },
  { name: 'Google Cloud → Cloud Infrastructure', rule_type: 'vendor_contains' as RuleType, condition_value: 'Google Cloud', action: 'assign_gl' as RuleAction, action_value: '7200', gl_code: '7200', gl_category: 'Cloud Infrastructure' },
  { name: 'Large invoices → Flag review', rule_type: 'amount_gt' as RuleType, condition_value: '10000', action: 'flag_review' as RuleAction, action_value: 'Amount exceeds $10,000 threshold', gl_code: '', gl_category: '' },
  { name: 'Stripe → Bank & Finance Charges', rule_type: 'vendor_contains' as RuleType, condition_value: 'Stripe', action: 'assign_gl' as RuleAction, action_value: '6120', gl_code: '6120', gl_category: 'Bank & Finance Charges' },
]

export default function RulesPage() {
  const router = useRouter()
  const [orgId, setOrgId] = useState<string | null>(null)
  const [rules, setRules] = useState<Rule[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    name: '',
    rule_type: 'vendor_contains' as RuleType,
    condition_value: '',
    action: 'assign_gl' as RuleAction,
    action_value: '',
    gl_code: '',
    gl_category: '',
    priority: 10,
  })

  const loadRules = useCallback(async (oid: string) => {
    const { data } = await supabase
      .from('categorization_rules')
      .select('*')
      .eq('org_id', oid)
      .order('priority', { ascending: true })
    setRules((data as Rule[]) || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.push('/auth/login'); return }
      const { data: org } = await supabase.from('organizations').select('id').eq('owner_id', data.user.id).single()
      if (!org) { router.push('/onboarding'); return }
      setOrgId(org.id)
      loadRules(org.id)
    })
  }, [router, loadRules])

  const handleSave = async () => {
    if (!orgId || !form.name.trim() || !form.condition_value.trim()) return
    setSaving(true)

    const payload = {
      org_id: orgId,
      name: form.name.trim(),
      rule_type: form.rule_type,
      condition_value: form.condition_value.trim(),
      action: form.action,
      action_value: form.action === 'assign_gl' ? form.gl_code : form.action_value,
      gl_code: form.action === 'assign_gl' ? form.gl_code : null,
      gl_category: form.action === 'assign_gl' ? form.gl_category : null,
      is_active: true,
      priority: form.priority,
    }

    const { data, error } = await supabase.from('categorization_rules').insert(payload).select().single()

    if (!error && data) {
      setRules(r => [...r, data as Rule].sort((a, b) => a.priority - b.priority))
      setShowModal(false)
      resetForm()
    }
    setSaving(false)
  }

  const handleAddPreset = async (preset: typeof PRESET_RULES[0]) => {
    if (!orgId) return
    const { data } = await supabase.from('categorization_rules').insert({
      org_id: orgId,
      name: preset.name,
      rule_type: preset.rule_type,
      condition_value: preset.condition_value,
      action: preset.action,
      action_value: preset.action_value,
      gl_code: preset.gl_code || null,
      gl_category: preset.gl_category || null,
      is_active: true,
      priority: 10,
    }).select().single()
    if (data) setRules(r => [...r, data as Rule])
  }

  const handleToggle = async (rule: Rule) => {
    await supabase.from('categorization_rules').update({ is_active: !rule.is_active }).eq('id', rule.id)
    setRules(r => r.map(r2 => r2.id === rule.id ? { ...r2, is_active: !r2.is_active } : r2))
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this rule?')) return
    await supabase.from('categorization_rules').delete().eq('id', id)
    setRules(r => r.filter(r2 => r2.id !== id))
  }

  const resetForm = () => {
    setForm({ name: '', rule_type: 'vendor_contains', condition_value: '', action: 'assign_gl', action_value: '', gl_code: '', gl_category: '', priority: 10 })
  }

  const ruleTypeLabel = (type: RuleType) => RULE_TYPES.find(t => t.value === type)?.label || type
  const actionLabel = (action: RuleAction) => RULE_ACTIONS.find(a => a.value === action)?.label || action

  const actionBadgeColor = (action: RuleAction) => {
    switch (action) {
      case 'assign_gl': return 'bg-[#4f8ef7]/10 text-[#4f8ef7]'
      case 'flag_review': return 'bg-red-400/10 text-red-400'
      case 'skip_duplicate': return 'bg-yellow-400/10 text-yellow-400'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f14] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#4f8ef7] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const presetIds = rules.map(r => r.name)

  return (
    <div className="min-h-screen bg-[#0f0f14] text-[#e2e8f0]">
      <Navbar variant="app" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Rules Engine</h1>
            <p className="text-white/40 text-sm mt-1">Auto-categorization rules applied before AI processing — reduces API costs</p>
          </div>
          <button
            onClick={() => { resetForm(); setShowModal(true) }}
            className="flex items-center gap-2 px-4 py-2 bg-[#4f8ef7] hover:bg-[#4f8ef7]/80 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Rule
          </button>
        </div>

        {/* Preset rules */}
        {PRESET_RULES.some(p => !presetIds.includes(p.name)) && (
          <div className="mb-8">
            <p className="text-xs font-medium text-white/30 mb-3">QUICK START — Common rules</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {PRESET_RULES.filter(p => !presetIds.includes(p.name)).map((preset, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleAddPreset(preset)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-[#1a1a24] border border-white/10 hover:border-[#4f8ef7]/30 rounded-xl p-4 text-left transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-[#4f8ef7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-xs text-white/30 group-hover:text-white/50 transition-colors">Add preset</span>
                  </div>
                  <p className="text-sm text-white font-medium">{preset.name}</p>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Rules Table */}
        {rules.length === 0 ? (
          <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-16 text-center">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-white/50 text-sm mb-1">No rules yet</p>
            <p className="text-white/25 text-xs">Add rules to auto-categorize invoices before they reach Claude AI</p>
          </div>
        ) : (
          <div className="bg-[#1a1a24] border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <span className="text-sm text-white/50">{rules.filter(r => r.is_active).length} active rules · {rules.length} total</span>
              <span className="text-xs text-white/30">Rules run in priority order (lowest first)</span>
            </div>
            <div className="divide-y divide-white/5">
              {rules.map((rule, i) => (
                <motion.div key={rule.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className={`px-6 py-4 flex items-center gap-4 ${!rule.is_active ? 'opacity-40' : ''}`}>
                  {/* Priority */}
                  <span className="text-xs text-white/20 w-6 text-right">{rule.priority}</span>

                  {/* Rule info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">{rule.name}</span>
                      {!rule.is_active && <span className="text-xs text-white/30">(disabled)</span>}
                    </div>
                    <div className="text-xs text-white/40 font-mono">
                      IF {ruleTypeLabel(rule.rule_type)} &quot;{rule.condition_value}&quot;
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${actionBadgeColor(rule.action)}`}>
                      {actionLabel(rule.action)}
                    </span>
                    {rule.action === 'assign_gl' && rule.gl_code && (
                      <span className="text-xs text-white/40">{rule.gl_code} — {rule.gl_category}</span>
                    )}
                  </div>

                  {/* Toggle + Delete */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggle(rule)}
                      className={`relative w-10 h-5 rounded-full transition-colors ${rule.is_active ? 'bg-[#4f8ef7]' : 'bg-white/10'}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${rule.is_active ? 'left-5' : 'left-0.5'}`} />
                    </button>
                    <button
                      onClick={() => handleDelete(rule.id)}
                      className="text-white/20 hover:text-red-400 transition-colors p-1"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Rule Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false) }}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1a1a24] border border-white/10 rounded-2xl w-full max-w-lg">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Add Rule</h2>
                <button onClick={() => setShowModal(false)} className="text-white/30 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2">Rule Name *</label>
                  <input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. AWS → Cloud Infrastructure"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#4f8ef7]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2">Condition *</label>
                  <div className="flex gap-2">
                    <select
                      value={form.rule_type}
                      onChange={e => setForm(f => ({ ...f, rule_type: e.target.value as RuleType }))}
                      className="bg-[#0f0f14] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#4f8ef7]/50"
                    >
                      {RULE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                    <input
                      value={form.condition_value}
                      onChange={e => setForm(f => ({ ...f, condition_value: e.target.value }))}
                      placeholder={RULE_TYPES.find(t => t.value === form.rule_type)?.placeholder || 'Value'}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#4f8ef7]/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2">Action *</label>
                  <select
                    value={form.action}
                    onChange={e => setForm(f => ({ ...f, action: e.target.value as RuleAction }))}
                    className="w-full bg-[#0f0f14] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#4f8ef7]/50"
                  >
                    {RULE_ACTIONS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                  </select>
                </div>

                {form.action === 'assign_gl' && (
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-2">GL Account</label>
                    <select
                      value={form.gl_code}
                      onChange={e => {
                        const opt = GL_OPTIONS.find(g => g.code === e.target.value)
                        setForm(f => ({ ...f, gl_code: e.target.value, gl_category: opt?.name || '', action_value: e.target.value }))
                      }}
                      className="w-full bg-[#0f0f14] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#4f8ef7]/50"
                    >
                      <option value="">Select GL account...</option>
                      {GL_OPTIONS.map(g => <option key={g.code} value={g.code}>{g.code} — {g.name}</option>)}
                    </select>
                  </div>
                )}

                {form.action === 'flag_review' && (
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-2">Flag Reason</label>
                    <input
                      value={form.action_value}
                      onChange={e => setForm(f => ({ ...f, action_value: e.target.value }))}
                      placeholder="e.g. Amount exceeds $10,000 threshold"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#4f8ef7]/50"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2">Priority (lower runs first)</label>
                  <input
                    type="number"
                    value={form.priority}
                    onChange={e => setForm(f => ({ ...f, priority: parseInt(e.target.value) || 10 }))}
                    min={1}
                    max={100}
                    className="w-24 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#4f8ef7]/50"
                  />
                </div>
              </div>

              <div className="p-6 border-t border-white/5 flex items-center justify-end gap-3">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !form.name.trim() || !form.condition_value.trim()}
                  className="px-5 py-2 bg-[#4f8ef7] hover:bg-[#4f8ef7]/80 disabled:opacity-40 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  {saving ? 'Saving...' : 'Save Rule'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
