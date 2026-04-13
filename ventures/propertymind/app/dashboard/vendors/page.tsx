'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Button, Input } from '@/components/ui'
import { HardHat, Plus, Star, Phone, Mail, X } from 'lucide-react'

interface Vendor {
  id: string
  name: string
  trade: string | null
  phone: string | null
  email: string | null
  rating: number | null
  notes: string | null
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ name: '', trade: '', phone: '', email: '', notes: '' })
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  const fetchVendors = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase.from('pm_vendors').select('*').eq('user_id', user.id).order('name')
    setVendors((data || []) as Vendor[])
    setLoading(false)
  }

  useEffect(() => { fetchVendors() }, [])

  const handleAdd = async () => {
    if (!form.name.trim()) return
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('pm_vendors').insert({
      user_id: user!.id,
      name: form.name,
      trade: form.trade || null,
      phone: form.phone || null,
      email: form.email || null,
      notes: form.notes || null,
    })
    if (!error) {
      setShowAdd(false)
      setForm({ name: '', trade: '', phone: '', email: '', notes: '' })
      fetchVendors()
    }
    setSaving(false)
  }

  const TRADES = ['Plumber', 'Electrician', 'HVAC', 'Handyman', 'Painter', 'Roofer', 'Locksmith', 'Pest Control', 'Cleaner', 'Other']

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Vendors</h1>
          <p className="text-slate-400 text-sm mt-1">{vendors.length} vendors in your network</p>
        </div>
        <Button onClick={() => setShowAdd(true)}>
          <Plus className="w-4 h-4" />
          Add Vendor
        </Button>
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-slate-900 border border-slate-800 rounded-xl animate-pulse" />)}</div>
      ) : vendors.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {vendors.map((v) => (
            <div key={v.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium text-slate-200">{v.name}</p>
                  {v.trade && (
                    <span className="text-xs text-violet-400 bg-violet-600/10 border border-violet-500/20 px-2 py-0.5 rounded-md mt-1 inline-block">
                      {v.trade}
                    </span>
                  )}
                </div>
                {v.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-slate-200">{v.rating}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {v.phone && (
                  <a href={`tel:${v.phone}`} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors">
                    <Phone className="w-3 h-3" />
                    {v.phone}
                  </a>
                )}
                {v.email && (
                  <a href={`mailto:${v.email}`} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors">
                    <Mail className="w-3 h-3" />
                    {v.email}
                  </a>
                )}
              </div>
              {v.notes && <p className="text-xs text-slate-500 mt-2">{v.notes}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 border-dashed rounded-xl p-12 text-center">
          <HardHat className="w-10 h-10 text-slate-700 mx-auto mb-3" />
          <p className="text-slate-400 mb-1">No vendors yet</p>
          <button onClick={() => setShowAdd(true)} className="text-sm text-violet-400 hover:text-violet-300 transition-colors mt-2">
            Add your first vendor
          </button>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-white">Add Vendor</h2>
              <button onClick={() => setShowAdd(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <Input label="Name *" placeholder="Mike's Plumbing" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <div>
                <label className="text-sm font-medium text-slate-300 block mb-1.5">Trade</label>
                <select value={form.trade} onChange={e => setForm({ ...form, trade: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50">
                  <option value="">Select trade</option>
                  {TRADES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Phone" placeholder="555-555-5555" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                <Input label="Email" type="email" placeholder="vendor@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <Input label="Notes" placeholder="Reliable, good rates, available weekends" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>
            <div className="flex gap-3 mt-5">
              <Button variant="secondary" onClick={() => setShowAdd(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleAdd} loading={saving} disabled={!form.name.trim()} className="flex-1">Add Vendor</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
