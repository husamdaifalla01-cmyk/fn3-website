import { createServerSupabaseClient } from '@/lib/supabase-server'
import { formatDate, daysUntil } from '@/lib/utils'
import { LeaseRiskBadge } from '@/components/dashboard/LeaseRiskBadge'
import { FileText, AlertCircle, Clock } from 'lucide-react'
import Link from 'next/link'

export default async function LeasesPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: tenants } = await supabase
    .from('pm_tenants')
    .select('*, pm_units(unit_number, pm_properties(name))')
    .eq('user_id', user!.id)
    .not('lease_end', 'is', null)
    .order('lease_end', { ascending: true })

  const withLeases = tenants || []

  const expiring30 = withLeases.filter(t => { const d = daysUntil(t.lease_end); return d != null && d >= 0 && d <= 30 })
  const expiring60 = withLeases.filter(t => { const d = daysUntil(t.lease_end); return d != null && d > 30 && d <= 60 })
  const expiring90 = withLeases.filter(t => { const d = daysUntil(t.lease_end); return d != null && d > 60 && d <= 90 })
  const expired = withLeases.filter(t => { const d = daysUntil(t.lease_end); return d != null && d < 0 })

  const groups = [
    { label: 'Expired', items: expired, color: 'red' as const },
    { label: 'Expiring in 30 days', items: expiring30, color: 'red' as const },
    { label: 'Expiring in 31–60 days', items: expiring60, color: 'yellow' as const },
    { label: 'Expiring in 61–90 days', items: expiring90, color: 'yellow' as const },
  ]

  const remaining = withLeases.filter(t => {
    const d = daysUntil(t.lease_end)
    return d != null && d > 90
  })

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Leases</h1>
          <p className="text-slate-400 text-sm mt-1">Track renewals and analyze lease risk</p>
        </div>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Total leases', value: withLeases.length, color: 'slate' },
          { label: 'Expired', value: expired.length, color: 'red' },
          { label: 'Expiring < 30d', value: expiring30.length, color: 'red' },
          { label: 'Expiring 30–90d', value: expiring60.length + expiring90.length, color: 'yellow' },
        ].map((s) => (
          <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${
              s.color === 'red' && s.value > 0 ? 'text-red-400' :
              s.color === 'yellow' && s.value > 0 ? 'text-yellow-400' :
              'text-white'
            }`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Priority groups */}
      {groups.map((group) => group.items.length > 0 && (
        <div key={group.label} className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            {group.color === 'red' ? (
              <AlertCircle className="w-4 h-4 text-red-400" />
            ) : (
              <Clock className="w-4 h-4 text-yellow-400" />
            )}
            <h2 className="text-sm font-medium text-slate-300">{group.label}</h2>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              group.color === 'red' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'
            }`}>
              {group.items.length}
            </span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            {group.items.map((tenant, i) => (
              <Link key={tenant.id} href={`/dashboard/tenants/${tenant.id}`}>
                <div className={`flex items-center justify-between px-4 py-3.5 hover:bg-slate-800/40 transition-colors ${
                  i < group.items.length - 1 ? 'border-b border-slate-800' : ''
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center text-xs font-medium text-slate-300">
                      {tenant.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">{tenant.name}</p>
                      <p className="text-xs text-slate-500">
                        {(tenant.pm_units as { unit_number: string; pm_properties: { name: string } } | null)?.unit_number
                          ? `Unit ${(tenant.pm_units as { unit_number: string; pm_properties: { name: string } }).unit_number} · ${(tenant.pm_units as { unit_number: string; pm_properties: { name: string } }).pm_properties?.name}`
                          : 'Unit not assigned'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-slate-300">{formatDate(tenant.lease_end)}</p>
                      <p className={`text-xs ${group.color === 'red' ? 'text-red-400' : 'text-yellow-400'}`}>
                        {(() => {
                          const d = daysUntil(tenant.lease_end)
                          if (d == null) return ''
                          if (d < 0) return `${Math.abs(d)} days ago`
                          return `${d} days left`
                        })()}
                      </p>
                    </div>
                    <LeaseRiskBadge score={tenant.risk_score} size="sm" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* All other leases */}
      {remaining.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-slate-400" />
            <h2 className="text-sm font-medium text-slate-300">Active Leases (&gt;90 days)</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-400">
              {remaining.length}
            </span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            {remaining.map((tenant, i) => (
              <Link key={tenant.id} href={`/dashboard/tenants/${tenant.id}`}>
                <div className={`flex items-center justify-between px-4 py-3.5 hover:bg-slate-800/40 transition-colors ${
                  i < remaining.length - 1 ? 'border-b border-slate-800' : ''
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center text-xs font-medium text-slate-300">
                      {tenant.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">{tenant.name}</p>
                      <p className="text-xs text-slate-500">
                        {(tenant.pm_units as { unit_number: string; pm_properties: { name: string } } | null)?.unit_number
                          ? `Unit ${(tenant.pm_units as { unit_number: string; pm_properties: { name: string } }).unit_number}`
                          : '—'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-slate-300">{formatDate(tenant.lease_end)}</p>
                      <p className="text-xs text-slate-500">{daysUntil(tenant.lease_end)} days left</p>
                    </div>
                    <LeaseRiskBadge score={tenant.risk_score} size="sm" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {withLeases.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 border-dashed rounded-xl p-12 text-center">
          <FileText className="w-10 h-10 text-slate-700 mx-auto mb-3" />
          <p className="text-slate-400 mb-2">No leases tracked yet</p>
          <p className="text-slate-600 text-sm">Add tenants with lease dates to start tracking renewals</p>
          <Link href="/dashboard/tenants" className="inline-block mt-4 text-sm text-violet-400 hover:text-violet-300 transition-colors">
            Go to Tenants →
          </Link>
        </div>
      )}
    </div>
  )
}
