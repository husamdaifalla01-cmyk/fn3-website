import { createServerSupabaseClient } from '@/lib/supabase-server'
import { MaintenanceCard } from '@/components/dashboard/MaintenanceCard'
import { Wrench, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function MaintenancePage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: items } = await supabase
    .from('pm_maintenance')
    .select(`
      *,
      pm_units(unit_number, pm_properties!inner(name, user_id)),
      pm_tenants(name)
    `)
    .eq('pm_units.pm_properties.user_id', user!.id)
    .order('created_at', { ascending: false })

  const all = items || []
  const open = all.filter(m => m.status === 'open')
  const inProgress = all.filter(m => ['assigned', 'in_progress'].includes(m.status))
  const completed = all.filter(m => m.status === 'completed')

  const grouped = [
    { label: 'Open', items: open, dotColor: 'bg-red-400' },
    { label: 'In Progress', items: inProgress, dotColor: 'bg-yellow-400' },
    { label: 'Completed', items: completed.slice(0, 10), dotColor: 'bg-green-400' },
  ]

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Maintenance</h1>
          <p className="text-slate-400 text-sm mt-1">{open.length} open, {inProgress.length} in progress</p>
        </div>
        <Link
          href="/dashboard/maintenance/new"
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Log Request
        </Link>
      </div>

      {all.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 border-dashed rounded-xl p-12 text-center">
          <Wrench className="w-10 h-10 text-slate-700 mx-auto mb-3" />
          <p className="text-slate-400 mb-1">No maintenance requests yet</p>
          <Link href="/dashboard/maintenance/new" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
            Log your first request
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map((group) => group.items.length > 0 && (
            <div key={group.label}>
              <div className="flex items-center gap-2.5 mb-3">
                <div className={`w-2 h-2 rounded-full ${group.dotColor}`} />
                <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">{group.label}</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-500">{group.items.length}</span>
              </div>
              <div className="space-y-2">
                {group.items.map((item) => {
                  const unit = item.pm_units as { unit_number: string; pm_properties: { name: string } } | null
                  const tenant = item.pm_tenants as { name: string } | null
                  return (
                    <MaintenanceCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      description={item.description}
                      priority={item.priority}
                      status={item.status}
                      unitNumber={unit?.unit_number}
                      propertyName={unit?.pm_properties?.name}
                      tenantName={tenant?.name}
                      createdAt={item.created_at}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
