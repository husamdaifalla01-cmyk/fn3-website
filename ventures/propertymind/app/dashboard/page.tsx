import { createServerSupabaseClient } from '@/lib/supabase-server'
import { formatCurrency, daysUntil, formatDate } from '@/lib/utils'
import { Building2, Users, DollarSign, Wrench, AlertTriangle, Clock, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { LeaseRiskBadge } from '@/components/dashboard/LeaseRiskBadge'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [
    { data: properties },
    { data: tenants },
    { data: units },
    { data: maintenance },
  ] = await Promise.all([
    supabase.from('pm_properties').select('*').eq('user_id', user!.id),
    supabase.from('pm_tenants').select('*, pm_units(unit_number, pm_properties(name))').eq('user_id', user!.id),
    supabase.from('pm_units').select('*, pm_properties!inner(user_id)').eq('pm_properties.user_id', user!.id),
    supabase.from('pm_maintenance').select('*, pm_units(unit_number, pm_properties(name, user_id))').neq('status', 'completed').order('created_at', { ascending: false }),
  ])

  const totalUnits = units?.length || 0
  const occupiedUnits = units?.filter(u => u.status === 'occupied').length || 0
  const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0
  const totalRent = tenants?.reduce((sum, t) => sum + (t.monthly_rent || 0), 0) || 0
  const openMaintenance = maintenance?.length || 0

  // Leases expiring soon
  const expiringLeases = tenants?.filter(t => {
    const days = daysUntil(t.lease_end)
    return days != null && days >= 0 && days <= 90
  }).sort((a, b) => {
    const da = daysUntil(a.lease_end) || 0
    const db = daysUntil(b.lease_end) || 0
    return da - db
  }) || []

  // High risk tenants
  const highRiskTenants = tenants?.filter(t => (t.risk_score || 0) >= 70) || []

  // Emergency maintenance
  const emergencyMaintenance = maintenance?.filter(m => m.priority === 'emergency') || []

  const metrics = [
    { label: 'Total Units', value: totalUnits.toString(), icon: Building2, color: 'violet' },
    { label: 'Occupancy Rate', value: `${occupancyRate}%`, icon: TrendingUp, color: occupancyRate >= 80 ? 'green' : occupancyRate >= 60 ? 'yellow' : 'red' },
    { label: 'Monthly Rent Roll', value: formatCurrency(totalRent), icon: DollarSign, color: 'green' },
    { label: 'Open Maintenance', value: openMaintenance.toString(), icon: Wrench, color: openMaintenance > 5 ? 'red' : openMaintenance > 0 ? 'yellow' : 'green' },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Overview</h1>
        <p className="text-slate-400 text-sm mt-1">Your property portfolio at a glance</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m) => (
          <div key={m.label} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{m.label}</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                m.color === 'violet' ? 'bg-violet-600/10' :
                m.color === 'green' ? 'bg-green-500/10' :
                m.color === 'yellow' ? 'bg-yellow-500/10' :
                'bg-red-500/10'
              }`}>
                <m.icon className={`w-4 h-4 ${
                  m.color === 'violet' ? 'text-violet-400' :
                  m.color === 'green' ? 'text-green-400' :
                  m.color === 'yellow' ? 'text-yellow-400' :
                  'text-red-400'
                }`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Alerts */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Alerts</h2>

          {/* Emergency maintenance */}
          {emergencyMaintenance.length > 0 && (
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">Emergency Maintenance</span>
              </div>
              <div className="space-y-2">
                {emergencyMaintenance.slice(0, 3).map((m) => (
                  <Link key={m.id} href={`/dashboard/maintenance/${m.id}`} className="block text-xs text-slate-300 hover:text-white transition-colors">
                    · {m.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Expiring leases */}
          {expiringLeases.length > 0 && (
            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-yellow-400">Leases Expiring</span>
              </div>
              <div className="space-y-2.5">
                {expiringLeases.slice(0, 5).map((t) => {
                  const days = daysUntil(t.lease_end)
                  return (
                    <Link key={t.id} href={`/dashboard/tenants/${t.id}`} className="flex items-center justify-between hover:opacity-80 transition-opacity">
                      <span className="text-xs text-slate-300">{t.name}</span>
                      <span className={`text-xs font-medium ${days != null && days <= 30 ? 'text-red-400' : 'text-yellow-400'}`}>
                        {days}d
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* High risk */}
          {highRiskTenants.length > 0 && (
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-medium text-orange-400">High Risk Tenants</span>
              </div>
              <div className="space-y-2.5">
                {highRiskTenants.slice(0, 4).map((t) => (
                  <Link key={t.id} href={`/dashboard/tenants/${t.id}`} className="flex items-center justify-between hover:opacity-80 transition-opacity">
                    <span className="text-xs text-slate-300">{t.name}</span>
                    <LeaseRiskBadge score={t.risk_score} size="sm" showScore={true} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {emergencyMaintenance.length === 0 && expiringLeases.length === 0 && highRiskTenants.length === 0 && (
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4 text-center">
              <p className="text-green-400 text-sm font-medium">All clear</p>
              <p className="text-slate-500 text-xs mt-1">No urgent alerts at this time</p>
            </div>
          )}
        </div>

        {/* Recent activity */}
        <div className="lg:col-span-2 space-y-4">
          {/* Properties */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Properties</h2>
              <Link href="/dashboard/properties" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                View all
              </Link>
            </div>
            {properties && properties.length > 0 ? (
              <div className="space-y-3">
                {properties.slice(0, 4).map((p) => {
                  const propertyUnits = units?.filter(u => u.property_id === p.id) || []
                  const occupied = propertyUnits.filter(u => u.status === 'occupied').length
                  return (
                    <Link key={p.id} href={`/dashboard/properties/${p.id}`} className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-violet-600/10 border border-violet-500/20 rounded-lg flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-violet-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-200">{p.name}</p>
                          {p.address && <p className="text-xs text-slate-500">{p.address}</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-200">{occupied}/{propertyUnits.length} units</p>
                        <p className="text-xs text-slate-500">
                          {propertyUnits.length > 0 ? Math.round((occupied / propertyUnits.length) * 100) : 0}% occupied
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 border-dashed rounded-xl p-8 text-center">
                <Building2 className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-400 text-sm mb-2">No properties yet</p>
                <Link href="/dashboard/properties" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                  Add your first property
                </Link>
              </div>
            )}
          </div>

          {/* Maintenance */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Open Maintenance</h2>
              <Link href="/dashboard/maintenance" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                View all
              </Link>
            </div>
            {maintenance && maintenance.length > 0 ? (
              <div className="space-y-2">
                {maintenance.slice(0, 5).map((m) => (
                  <Link key={m.id} href={`/dashboard/maintenance/${m.id}`} className="flex items-center justify-between p-3.5 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-all">
                    <div className="flex items-center gap-3 min-w-0">
                      <Wrench className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <p className="text-sm text-slate-300 truncate">{m.title}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                        m.priority === 'emergency' ? 'bg-red-500/10 text-red-400' :
                        m.priority === 'high' ? 'bg-orange-500/10 text-orange-400' :
                        m.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-slate-700 text-slate-400'
                      }`}>
                        {m.priority}
                      </span>
                      <span className="text-xs text-slate-500">{formatDate(m.created_at)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 border-dashed rounded-xl p-6 text-center">
                <p className="text-slate-500 text-sm">No open maintenance requests</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
