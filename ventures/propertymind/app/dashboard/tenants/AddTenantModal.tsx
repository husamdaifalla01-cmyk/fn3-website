'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Button, Input } from '@/components/ui'
import { X } from 'lucide-react'

interface AddTenantModalProps {
  onClose: () => void
  onSaved: () => void
}

export function AddTenantModal({ onClose, onSaved }: AddTenantModalProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    lease_start: '',
    lease_end: '',
    monthly_rent: '',
    unit_id: '',
  })
  const [units, setUnits] = useState<{ id: string; unit_number: string; property_name: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchUnits = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('pm_units')
        .select('id, unit_number, pm_properties(name, user_id)')
        .eq('pm_properties.user_id', user.id)
        .eq('status', 'vacant')
      setUnits((data || []).map(u => ({
        id: u.id,
        unit_number: u.unit_number,
        property_name: (u.pm_properties as unknown as { name: string } | null)?.name || '',
      })))
    }
    fetchUnits()
  }, [])

  const handleSave = async () => {
    if (!form.name.trim()) return
    setLoading(true)
    setError(null)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const { error } = await supabase.from('pm_tenants').insert({
        user_id: user!.id,
        name: form.name,
        email: form.email || null,
        phone: form.phone || null,
        lease_start: form.lease_start || null,
        lease_end: form.lease_end || null,
        monthly_rent: form.monthly_rent ? parseFloat(form.monthly_rent) : null,
        unit_id: form.unit_id || null,
      })
      if (error) throw error
      onSaved()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-white">Add Tenant</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <Input label="Full Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@example.com" />
            <Input label="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="555-555-5555" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Lease Start" type="date" value={form.lease_start} onChange={e => setForm({ ...form, lease_start: e.target.value })} />
            <Input label="Lease End" type="date" value={form.lease_end} onChange={e => setForm({ ...form, lease_end: e.target.value })} />
          </div>
          <Input label="Monthly Rent ($)" type="number" value={form.monthly_rent} onChange={e => setForm({ ...form, monthly_rent: e.target.value })} placeholder="1500" />

          {units.length > 0 && (
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-1.5">Assign Unit</label>
              <select
                value={form.unit_id}
                onChange={e => setForm({ ...form, unit_id: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              >
                <option value="">Select unit (optional)</option>
                {units.map(u => (
                  <option key={u.id} value={u.id}>{u.property_name} — Unit {u.unit_number}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

        <div className="flex gap-3 mt-5">
          <Button variant="secondary" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={handleSave} loading={loading} className="flex-1">Add Tenant</Button>
        </div>
      </div>
    </div>
  )
}
