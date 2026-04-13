'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Button, Input, Textarea, Select } from '@/components/ui'
import { Sparkles, ArrowLeft, FileText } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Unit {
  id: string
  unit_number: string
  property_name: string
  tenant_name?: string
  tenant_id?: string
  tenant_phone?: string
}

export default function NewMaintenancePage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    unit_id: '',
  })
  const [units, setUnits] = useState<Unit[]>([])
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [workOrder, setWorkOrder] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchUnits = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('pm_units')
        .select(`
          id, unit_number, tenant_id,
          pm_properties!inner(name, user_id),
          pm_tenants(name, phone)
        `)
        .eq('pm_properties.user_id', user.id)
        .eq('status', 'occupied')
      setUnits((data || []).map(u => ({
        id: u.id,
        unit_number: u.unit_number,
        property_name: (u.pm_properties as unknown as { name: string } | null)?.name || '',
        tenant_name: Array.isArray(u.pm_tenants) ? u.pm_tenants[0]?.name : (u.pm_tenants as { name: string } | null)?.name,
        tenant_id: u.tenant_id,
        tenant_phone: Array.isArray(u.pm_tenants) ? u.pm_tenants[0]?.phone : (u.pm_tenants as { phone: string } | null)?.phone,
      })))
    }
    fetchUnits()
  }, [])

  const selectedUnit = units.find(u => u.id === form.unit_id)

  const handleGenerateWorkOrder = async () => {
    if (!form.description.trim()) return
    setGenerating(true)
    setError(null)
    try {
      const res = await fetch('/api/generate-work-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          issue: form.description,
          context: {
            unitNumber: selectedUnit?.unit_number || 'Unknown',
            propertyName: selectedUnit?.property_name || 'Unknown',
            tenantName: selectedUnit?.tenant_name || 'Tenant',
            tenantPhone: selectedUnit?.tenant_phone,
            priority: form.priority,
          },
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setWorkOrder(data.result.work_order)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate work order')
    } finally {
      setGenerating(false)
    }
  }

  const handleSubmit = async () => {
    if (!form.title.trim()) return
    setLoading(true)
    setError(null)
    try {
      const { error } = await supabase.from('pm_maintenance').insert({
        title: form.title,
        description: form.description || null,
        priority: form.priority,
        unit_id: form.unit_id || null,
        tenant_id: selectedUnit?.tenant_id || null,
        work_order: workOrder || null,
        status: 'open',
      })
      if (error) throw error
      router.push('/dashboard/maintenance')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/dashboard/maintenance" className="flex items-center gap-2 text-slate-400 hover:text-slate-200 text-sm mb-4 transition-colors">
          <ArrowLeft className="w-3 h-3" />
          Back to Maintenance
        </Link>
        <h1 className="text-2xl font-bold text-white">Log Maintenance Request</h1>
        <p className="text-slate-400 text-sm mt-1">AI will generate a professional work order automatically</p>
      </div>

      <div className="space-y-4">
        <Input
          label="Title *"
          placeholder="e.g. HVAC not heating, Leaking faucet, Broken window"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <Textarea
          label="Description"
          placeholder="Describe the issue in detail as reported by the tenant..."
          rows={4}
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Priority"
            value={form.priority}
            onChange={e => setForm({ ...form, priority: e.target.value })}
          >
            <option value="emergency">Emergency</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Select>

          <div>
            <label className="text-sm font-medium text-slate-300 block mb-1.5">Unit</label>
            <select
              value={form.unit_id}
              onChange={e => setForm({ ...form, unit_id: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            >
              <option value="">Select unit</option>
              {units.map(u => (
                <option key={u.id} value={u.id}>
                  {u.property_name} — Unit {u.unit_number} {u.tenant_name ? `(${u.tenant_name})` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* AI Work Order */}
        <div className="border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-slate-300">AI Work Order</span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleGenerateWorkOrder}
              loading={generating}
              disabled={!form.description.trim()}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Generate
            </Button>
          </div>

          {workOrder ? (
            <div className="bg-slate-800/50 rounded-lg p-3 text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
              {workOrder}
            </div>
          ) : (
            <p className="text-xs text-slate-500">
              Add a description above and click Generate to create a professional work order
            </p>
          )}
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <Link href="/dashboard/maintenance" className="flex-1">
            <Button variant="secondary" className="w-full">Cancel</Button>
          </Link>
          <Button onClick={handleSubmit} loading={loading} disabled={!form.title.trim()} className="flex-1">
            Log Request
          </Button>
        </div>
      </div>
    </div>
  )
}
