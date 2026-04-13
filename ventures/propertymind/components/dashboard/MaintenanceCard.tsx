import { cn, getPriorityColor, getStatusColor, formatDate } from '@/lib/utils'
import { Wrench, Clock } from 'lucide-react'
import Link from 'next/link'

interface MaintenanceCardProps {
  id: string
  title: string
  description?: string | null
  priority: string
  status: string
  unitNumber?: string
  propertyName?: string
  tenantName?: string
  createdAt: string
}

export function MaintenanceCard({
  id,
  title,
  description,
  priority,
  status,
  unitNumber,
  tenantName,
  createdAt,
}: MaintenanceCardProps) {
  return (
    <Link href={`/dashboard/maintenance/${id}`}>
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-all duration-150 group">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-slate-700 transition-colors">
              <Wrench className="w-4 h-4 text-slate-400" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">{title}</p>
              {description && (
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{description}</p>
              )}
            </div>
          </div>
          <span className={cn('text-xs font-medium px-2 py-1 rounded-md border shrink-0', getPriorityColor(priority))}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            {unitNumber && <span>Unit {unitNumber}</span>}
            {tenantName && <span>· {tenantName}</span>}
          </div>
          <div className="flex items-center gap-2">
            <span className={cn('text-xs px-2 py-0.5 rounded-md', getStatusColor(status))}>
              {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3 h-3" />
              {formatDate(createdAt)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
