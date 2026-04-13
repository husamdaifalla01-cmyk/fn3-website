'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { PropertyCard } from '@/components/dashboard/PropertyCard'
import { Button, Input } from '@/components/ui'
import { Building2, Plus, X } from 'lucide-react'

interface Property {
  id: string
  name: string
  address: string | null
  units_count: number
}

interface Unit {
  property_id: string
  status: string
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [units, setUnits] = useState<Unit[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ name: '', address: '', units_count: '1' })
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const [{ data: props }, { data: us }] = await Promise.all([
      supabase.from('pm_properties').select('*').eq('user_id', user.id).order('created_at'),
      supabase.from('pm_units').select('property_id, status, pm_properties!inner(user_id)').eq('pm_properties.user_id', user.id),
    ])
    setProperties((props || []) as Property[])
    setUnits((us || []) as Unit[])
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

  const handleAdd = async () => {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('pm_properties').insert({
      user_id: user!.id,
      name: form.name,
      address: form.address || null,
      units_count: parseInt(form.units_count) || 1,
    })
    if (!error) {
      setShowAdd(false)
      setForm({ name: '', address: '', units_count: '1' })
      fetchData()
    }
    setSaving(false)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Properties</h1>
          <p className="text-slate-400 text-sm mt-1">{properties.length} properties managed</p>
        </div>
        <Button onClick={() => setShowAdd(true)}>
          <Plus className="w-4 h-4" />
          Add Property
        </Button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-36 bg-slate-900 border border-slate-800 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : properties.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((p) => {
            const propertyUnits = units.filter(u => u.property_id === p.id)
            const occupied = propertyUnits.filter(u => u.status === 'occupied').length
            return (
              <PropertyCard
                key={p.id}
                id={p.id}
                name={p.name}
                address={p.address}
                unitsCount={propertyUnits.length || p.units_count}
                occupiedUnits={occupied}
              />
            )
          })}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 border-dashed rounded-xl p-12 text-center">
          <Building2 className="w-10 h-10 text-slate-700 mx-auto mb-3" />
          <p className="text-slate-400 mb-1">No properties yet</p>
          <button onClick={() => setShowAdd(true)} className="text-sm text-violet-400 hover:text-violet-300 transition-colors mt-2">
            Add your first property
          </button>
        </div>
      )}

      {/* Add modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-white">Add Property</h2>
              <button onClick={() => setShowAdd(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <Input label="Property Name *" placeholder="Sunset Apartments" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <Input label="Address" placeholder="221 Oak Street, Austin, TX" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
              <Input label="Number of Units" type="number" min="1" value={form.units_count} onChange={e => setForm({ ...form, units_count: e.target.value })} />
            </div>
            <div className="flex gap-3 mt-5">
              <Button variant="secondary" onClick={() => setShowAdd(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleAdd} loading={saving} disabled={!form.name.trim()} className="flex-1">Add Property</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
