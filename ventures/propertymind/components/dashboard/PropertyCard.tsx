import { Building2, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface PropertyCardProps {
  id: string
  name: string
  address?: string | null
  unitsCount: number
  occupiedUnits?: number
}

export function PropertyCard({ id, name, address, unitsCount, occupiedUnits = 0 }: PropertyCardProps) {
  const occupancyRate = unitsCount > 0 ? Math.round((occupiedUnits / unitsCount) * 100) : 0

  return (
    <Link href={`/dashboard/properties/${id}`}>
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-all duration-150 group">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-violet-600/10 border border-violet-500/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-violet-600/20 transition-colors">
            <Building2 className="w-5 h-5 text-violet-400" />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-slate-200 truncate">{name}</p>
            {address && <p className="text-xs text-slate-500 mt-0.5 truncate">{address}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1">
              <Users className="w-3 h-3 text-slate-500" />
              <span className="text-xs text-slate-500">Units</span>
            </div>
            <p className="text-lg font-semibold text-slate-200">{unitsCount}</p>
          </div>
          <div className="p-3 bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp className="w-3 h-3 text-slate-500" />
              <span className="text-xs text-slate-500">Occupancy</span>
            </div>
            <p className={`text-lg font-semibold ${occupancyRate >= 80 ? 'text-green-400' : occupancyRate >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
              {occupancyRate}%
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
