'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Wrench, Clock, AlertTriangle, CheckCircle, Plus, Zap, Sparkles, MessageSquare, ClipboardList, Loader2, X } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ChecklistItem {
  item: string
  what_to_check: string
  photo_required: boolean
  condition_options: string[]
}

interface ChecklistRoom {
  room: string
  items: ChecklistItem[]
}

interface InspectionChecklist {
  inspection_type: string
  unit_type: string
  state: string
  security_deposit_rules: {
    return_deadline: string
    itemization_required: boolean
    state_statute: string
    special_requirements: string
  }
  general_instructions: string
  rooms: ChecklistRoom[]
  photo_documentation_requirements: string[]
  normal_wear_and_tear_examples: string[]
  signature_fields: Array<{ label: string; purpose: string }>
  disclaimer: string
}

interface WorkOrder {
  id: string
  title: string
  description: string | null
  priority: string
  status: string
  created_at: string
  vendor_name?: string | null
  unit_number?: string
  property_name?: string
  tenant_name?: string
  days_open?: number
}

function priorityColor(p: string) {
  if (p === 'emergency') return 'text-red-400 bg-red-500/10 border-red-500/20'
  if (p === 'high') return 'text-orange-400 bg-orange-500/10 border-orange-500/20'
  if (p === 'medium') return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
  return 'text-slate-400 bg-slate-700 border-slate-600'
}

function statusColor(s: string) {
  if (s === 'completed') return 'text-green-400 bg-green-500/10 border-green-500/20'
  if (s === 'in_progress' || s === 'assigned') return 'text-blue-400 bg-blue-500/10 border-blue-500/20'
  return 'text-red-400 bg-red-500/10 border-red-500/20'
}

function statusLabel(s: string) {
  if (s === 'in_progress') return 'In Progress'
  if (s === 'assigned') return 'Scheduled'
  if (s === 'completed') return 'Resolved'
  return 'Open'
}

function daysOpen(dateStr: string) {
  const created = new Date(dateStr)
  const now = new Date()
  return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
}

export default function MaintenanceTrackerPage() {
  const [orders, setOrders] = useState<WorkOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [generatingFor, setGeneratingFor] = useState<string | null>(null)
  const [followUpMessages, setFollowUpMessages] = useState<Record<string, string>>({})
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showChecklistModal, setShowChecklistModal] = useState(false)
  const [checklistForm, setChecklistForm] = useState({ unitType: 'studio', state: '', moveType: 'in' })
  const [generatingChecklist, setGeneratingChecklist] = useState(false)
  const [checklist, setChecklist] = useState<InspectionChecklist | null>(null)
  const supabase = createClient()

  async function generateChecklist() {
    setGeneratingChecklist(true)
    try {
      const res = await fetch('/api/inspection-checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checklistForm),
      })
      const data = await res.json()
      if (res.ok && data.checklist) {
        setChecklist(data.checklist)
      }
    } catch {
      // fail silently
    } finally {
      setGeneratingChecklist(false)
    }
  }

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data } = await supabase
        .from('pm_maintenance')
        .select(`
          *,
          pm_units(unit_number, pm_properties(name)),
          pm_tenants(name)
        `)
        .eq('pm_units.pm_properties.user_id', user.id)
        .order('created_at', { ascending: false })

      if (data) {
        setOrders(data.map((item) => {
          const unit = item.pm_units as { unit_number: string; pm_properties: { name: string } } | null
          const tenant = item.pm_tenants as { name: string } | null
          return {
            id: item.id,
            title: item.title,
            description: item.description,
            priority: item.priority,
            status: item.status,
            created_at: item.created_at,
            vendor_name: item.vendor_name || null,
            unit_number: unit?.unit_number,
            property_name: unit?.pm_properties?.name,
            tenant_name: tenant?.name,
          }
        }))
      }
      setLoading(false)
    }
    load()
  }, [supabase])

  async function generateFollowUp(order: WorkOrder) {
    setGeneratingFor(order.id)
    try {
      const res = await fetch('/api/generate-work-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          issueDescription: order.description || order.title,
          unitNumber: order.unit_number || 'Unknown',
          propertyAddress: order.property_name || '',
          tenantName: order.tenant_name || '',
          followUp: true,
          daysOpen: daysOpen(order.created_at),
          vendorName: order.vendor_name || '',
        }),
      })
      const data = await res.json()
      if (res.ok && data.workOrder) {
        setFollowUpMessages((prev) => ({ ...prev, [order.id]: data.workOrder }))
      }
    } catch {
      // silently fail — show generic message
      setFollowUpMessages((prev) => ({
        ...prev,
        [order.id]: `Hello${order.vendor_name ? ` ${order.vendor_name}` : ''},\n\nThis is a follow-up regarding work order for Unit ${order.unit_number || '?'}: "${order.title}". This request has been open for ${daysOpen(order.created_at)} days. Please provide a status update at your earliest convenience.\n\nThank you.`,
      }))
    } finally {
      setGeneratingFor(null)
    }
  }

  const filtered = filterStatus === 'all'
    ? orders
    : orders.filter((o) => {
        if (filterStatus === 'open') return o.status === 'open'
        if (filterStatus === 'scheduled') return ['assigned', 'in_progress'].includes(o.status)
        if (filterStatus === 'resolved') return o.status === 'completed'
        return true
      })

  const overdue = orders.filter((o) => o.status !== 'completed' && daysOpen(o.created_at) >= 3)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Nav */}
      <nav className="border-b border-slate-800/50 backdrop-blur-sm sticky top-0 z-50 bg-slate-950/90">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white text-lg tracking-tight">PropertyMind</span>
            </Link>
            <span className="text-slate-700">·</span>
            <span className="text-sm text-slate-400 font-medium">Maintenance Tracker</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setShowChecklistModal(true); setChecklist(null) }}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-medium rounded-lg transition-colors"
            >
              <ClipboardList className="w-4 h-4" />
              Inspection Checklist
            </button>
            <Link
              href="/dashboard/maintenance/new"
              className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Log Request
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Open Work Orders</h1>
          <p className="text-slate-400 text-sm">
            {orders.filter(o => o.status !== 'completed').length} open ·{' '}
            {overdue.length > 0 && (
              <span className="text-red-400 font-medium">{overdue.length} overdue (3+ days)</span>
            )}
            {overdue.length === 0 && <span className="text-green-400">All on track</span>}
          </p>
        </div>

        {/* Overdue alert banner */}
        {overdue.length > 0 && (
          <div className="mb-6 p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-400 mb-0.5">{overdue.length} request{overdue.length > 1 ? 's' : ''} unresolved for 3+ days</p>
              <p className="text-xs text-slate-400">Use the &quot;Generate follow-up&quot; button on each item to draft a vendor message.</p>
            </div>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6">
          {['all', 'open', 'scheduled', 'resolved'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterStatus(f)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all capitalize',
                filterStatus === f
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              )}
            >
              {f === 'all' ? `All (${orders.length})` : f === 'open' ? `Open (${orders.filter(o => o.status === 'open').length})` : f === 'scheduled' ? `Scheduled (${orders.filter(o => ['assigned','in_progress'].includes(o.status)).length})` : `Resolved (${orders.filter(o => o.status === 'completed').length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-20 bg-slate-900 border border-slate-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 border-dashed rounded-xl p-12 text-center">
            <Wrench className="w-10 h-10 text-slate-700 mx-auto mb-3" />
            <p className="text-slate-400 mb-1">No {filterStatus !== 'all' ? filterStatus : ''} work orders</p>
            <Link href="/dashboard/maintenance/new" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
              Log a new request
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((order) => {
              const age = daysOpen(order.created_at)
              const isOverdue = order.status !== 'completed' && age >= 3
              const hasFollowUp = !!followUpMessages[order.id]
              return (
                <div key={order.id} className={cn(
                  'bg-slate-900 border rounded-xl p-4 transition-all',
                  isOverdue ? 'border-red-500/30' : 'border-slate-800 hover:border-slate-700'
                )}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <Wrench className="w-4 h-4 text-slate-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <p className="text-sm font-medium text-slate-200">{order.title}</p>
                          {isOverdue && (
                            <span className="text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded">
                              {age}d unresolved
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                          {order.unit_number && <span>Unit {order.unit_number}</span>}
                          {order.property_name && <span>· {order.property_name}</span>}
                          {order.tenant_name && <span>· {order.tenant_name}</span>}
                          {order.vendor_name && <span>· Vendor: {order.vendor_name}</span>}
                        </div>
                        {order.description && (
                          <p className="text-xs text-slate-500 mt-1 line-clamp-1">{order.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={cn('text-xs font-medium px-2 py-1 rounded-md border', priorityColor(order.priority))}>
                        {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
                      </span>
                      <span className={cn('text-xs font-medium px-2 py-1 rounded-md border', statusColor(order.status))}>
                        {statusLabel(order.status)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      {age === 0 ? 'Opened today' : `Opened ${age} day${age > 1 ? 's' : ''} ago`}
                    </div>

                    {order.status !== 'completed' && (
                      <button
                        onClick={() => generateFollowUp(order)}
                        disabled={generatingFor === order.id}
                        className={cn(
                          'flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all',
                          isOverdue
                            ? 'text-red-400 bg-red-500/10 border-red-500/20 hover:bg-red-500/20'
                            : 'text-violet-400 bg-violet-600/10 border-violet-500/20 hover:bg-violet-600/20'
                        )}
                      >
                        {generatingFor === order.id ? (
                          <>
                            <div className="w-3 h-3 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3 h-3" />
                            Generate follow-up message
                          </>
                        )}
                      </button>
                    )}

                    {order.status === 'completed' && (
                      <div className="flex items-center gap-1.5 text-xs text-green-400">
                        <CheckCircle className="w-3 h-3" />
                        Resolved
                      </div>
                    )}
                  </div>

                  {/* Follow-up message output */}
                  {hasFollowUp && (
                    <div className="mt-3 p-3 bg-violet-500/5 border border-violet-500/20 rounded-lg">
                      <div className="flex items-center gap-1.5 mb-2">
                        <MessageSquare className="w-3 h-3 text-violet-400" />
                        <p className="text-xs font-medium text-violet-400">AI-drafted follow-up message</p>
                      </div>
                      <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">{followUpMessages[order.id]}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Inspection Checklist Modal */}
      {showChecklistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-violet-400" />
                <h2 className="text-base font-semibold text-white">Generate Inspection Checklist</h2>
              </div>
              <button
                onClick={() => setShowChecklistModal(false)}
                className="text-slate-500 hover:text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-5">
              {!checklist ? (
                <div className="space-y-4">
                  <p className="text-sm text-slate-400">Generate a room-by-room inspection checklist with state-specific security deposit rules.</p>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Unit Type *</label>
                    <select
                      value={checklistForm.unitType}
                      onChange={(e) => setChecklistForm({ ...checklistForm, unitType: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-violet-500 transition-colors"
                    >
                      <option value="studio">Studio</option>
                      <option value="1-bedroom">1 Bedroom</option>
                      <option value="2-bedroom">2 Bedroom</option>
                      <option value="3-bedroom">3 Bedroom</option>
                      <option value="4-bedroom">4 Bedroom</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="commercial">Commercial Unit</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">State *</label>
                    <input
                      type="text"
                      required
                      value={checklistForm.state}
                      onChange={(e) => setChecklistForm({ ...checklistForm, state: e.target.value })}
                      placeholder="e.g. CA, TX, NY"
                      maxLength={2}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Inspection Type *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[{ value: 'in', label: 'Move-In' }, { value: 'out', label: 'Move-Out' }].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setChecklistForm({ ...checklistForm, moveType: opt.value })}
                          className={cn(
                            'py-2.5 text-sm font-medium rounded-lg border transition-all',
                            checklistForm.moveType === opt.value
                              ? 'bg-violet-600/10 border-violet-500/40 text-violet-400'
                              : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={generateChecklist}
                    disabled={generatingChecklist || !checklistForm.state}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm rounded-xl transition-colors mt-2"
                  >
                    {generatingChecklist ? (
                      <><Loader2 className="w-4 h-4 animate-spin" />Generating checklist...</>
                    ) : (
                      <><Sparkles className="w-4 h-4" />Generate Checklist</>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Header info */}
                  <div className="p-4 bg-violet-500/5 border border-violet-500/20 rounded-xl">
                    <p className="text-sm font-semibold text-violet-400 mb-1">
                      {checklist.inspection_type} Checklist — {checklist.unit_type} ({checklist.state.toUpperCase()})
                    </p>
                    <p className="text-xs text-slate-400">{checklist.general_instructions}</p>
                  </div>

                  {/* Security deposit rules */}
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                    <p className="text-xs font-semibold text-slate-300 mb-2">Security Deposit Rules — {checklist.state.toUpperCase()}</p>
                    <div className="space-y-1 text-xs text-slate-400">
                      <p>Return deadline: <span className="text-slate-200">{checklist.security_deposit_rules.return_deadline} days</span></p>
                      <p>Itemization required: <span className="text-slate-200">{checklist.security_deposit_rules.itemization_required ? 'Yes' : 'No'}</span></p>
                      <p>Statute: <span className="text-slate-200">{checklist.security_deposit_rules.state_statute}</span></p>
                      {checklist.security_deposit_rules.special_requirements && (
                        <p className="text-yellow-400 mt-1">{checklist.security_deposit_rules.special_requirements}</p>
                      )}
                    </div>
                  </div>

                  {/* Rooms */}
                  {checklist.rooms.map((room, ri) => (
                    <div key={ri}>
                      <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                        <span className="w-5 h-5 bg-violet-600/20 text-violet-400 rounded text-xs flex items-center justify-center font-bold">{ri + 1}</span>
                        {room.room}
                      </h3>
                      <div className="space-y-1.5">
                        {room.items.map((item, ii) => (
                          <div key={ii} className="flex items-start gap-3 p-2.5 bg-slate-800/40 rounded-lg border border-slate-800">
                            <div className="w-4 h-4 border border-slate-600 rounded shrink-0 mt-0.5" />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium text-slate-200">{item.item}</p>
                              <p className="text-xs text-slate-500 mt-0.5">{item.what_to_check}</p>
                            </div>
                            {item.photo_required && (
                              <span className="text-xs text-blue-400 shrink-0">Photo req.</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Wear and tear */}
                  {checklist.normal_wear_and_tear_examples.length > 0 && (
                    <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                      <p className="text-xs font-semibold text-slate-300 mb-2">Normal Wear &amp; Tear vs. Damage</p>
                      <ul className="space-y-1">
                        {checklist.normal_wear_and_tear_examples.map((ex, i) => (
                          <li key={i} className="text-xs text-slate-400 flex items-start gap-1.5">
                            <span className="text-slate-600 shrink-0">·</span>{ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Signature fields */}
                  {checklist.signature_fields.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-slate-300">Signature Fields</p>
                      {checklist.signature_fields.map((sf, i) => (
                        <div key={i} className="p-3 border border-dashed border-slate-700 rounded-lg">
                          <p className="text-xs font-medium text-slate-300">{sf.label}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{sf.purpose}</p>
                          <div className="mt-3 border-t border-slate-700 pt-2">
                            <p className="text-xs text-slate-600">Signature: _________________________ Date: _____________</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Disclaimer */}
                  <p className="text-xs text-slate-600 italic border-t border-slate-800 pt-4">{checklist.disclaimer}</p>

                  <button
                    onClick={() => setChecklist(null)}
                    className="w-full py-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    Generate another checklist
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
