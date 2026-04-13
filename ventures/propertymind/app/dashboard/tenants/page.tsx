'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { TenantRow } from '@/components/dashboard/TenantRow'
import { Button, Input } from '@/components/ui'
import { Users, Plus, Search } from 'lucide-react'
import { AddTenantModal } from './AddTenantModal'

interface Tenant {
  id: string
  name: string
  email: string | null
  phone: string | null
  lease_start: string | null
  lease_end: string | null
  monthly_rent: number | null
  risk_score: number | null
  unit_id: string | null
  pm_units: {
    unit_number: string
    pm_properties: { name: string }
  } | null
}

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const supabase = createClient()

  const fetchTenants = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data } = await supabase
      .from('pm_tenants')
      .select('*, pm_units(unit_number, pm_properties(name))')
      .eq('user_id', user.id)
      .order('name')
    setTenants((data || []) as Tenant[])
    setLoading(false)
  }

  useEffect(() => { fetchTenants() }, [])

  const filtered = tenants.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    (t.email || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Tenants</h1>
          <p className="text-slate-400 text-sm mt-1">{tenants.length} total tenants</p>
        </div>
        <Button onClick={() => setShowAdd(true)}>
          <Plus className="w-4 h-4" />
          Add Tenant
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search tenants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-violet-500/50 text-sm"
        />
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 bg-slate-900 border border-slate-800 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="hidden md:flex items-center px-4 py-2.5 border-b border-slate-800 bg-slate-900/50">
            <div className="flex-1 text-xs font-medium text-slate-500 uppercase tracking-wider">Tenant</div>
            <div className="w-28 text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:block">Unit</div>
            <div className="w-24 text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:block">Rent</div>
            <div className="w-36 text-xs font-medium text-slate-500 uppercase tracking-wider hidden lg:block">Lease End</div>
            <div className="w-28 text-xs font-medium text-slate-500 uppercase tracking-wider text-right">Risk</div>
          </div>
          {filtered.map((tenant) => (
            <TenantRow
              key={tenant.id}
              id={tenant.id}
              name={tenant.name}
              email={tenant.email}
              unitNumber={tenant.pm_units?.unit_number}
              propertyName={tenant.pm_units?.pm_properties?.name}
              leaseEnd={tenant.lease_end}
              monthlyRent={tenant.monthly_rent}
              riskScore={tenant.risk_score}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 border-dashed rounded-xl p-12 text-center">
          <Users className="w-10 h-10 text-slate-700 mx-auto mb-3" />
          <p className="text-slate-400 mb-1">{search ? 'No tenants match your search' : 'No tenants yet'}</p>
          {!search && (
            <button
              onClick={() => setShowAdd(true)}
              className="mt-3 text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              Add your first tenant
            </button>
          )}
        </div>
      )}

      {showAdd && (
        <AddTenantModal
          onClose={() => setShowAdd(false)}
          onSaved={() => { setShowAdd(false); fetchTenants() }}
        />
      )}
    </div>
  )
}
