import { cn, formatDate, formatCurrency, daysUntil } from '@/lib/utils'
import { LeaseRiskBadge } from './LeaseRiskBadge'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

interface TenantRowProps {
  id: string
  name: string
  email?: string | null
  unitNumber?: string
  propertyName?: string
  leaseEnd?: string | null
  monthlyRent?: number | null
  riskScore?: number | null
}

export function TenantRow({ id, name, email, unitNumber, propertyName, leaseEnd, monthlyRent, riskScore }: TenantRowProps) {
  const daysLeft = daysUntil(leaseEnd)
  const isExpiringSoon = daysLeft != null && daysLeft <= 90 && daysLeft > 0
  const isExpired = daysLeft != null && daysLeft <= 0

  return (
    <Link href={`/dashboard/tenants/${id}`}>
      <div className="flex items-center gap-4 px-4 py-3.5 hover:bg-slate-800/40 transition-colors border-b border-slate-800/60 last:border-b-0 group">
        {/* Avatar */}
        <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center shrink-0 text-sm font-medium text-slate-300">
          {name.charAt(0).toUpperCase()}
        </div>

        {/* Name + Email */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{name}</p>
          {email && <p className="text-xs text-slate-500 truncate">{email}</p>}
        </div>

        {/* Unit */}
        <div className="hidden md:block w-28 text-sm text-slate-400">
          {unitNumber ? `Unit ${unitNumber}` : '—'}
          {propertyName && <p className="text-xs text-slate-600 truncate">{propertyName}</p>}
        </div>

        {/* Rent */}
        <div className="hidden md:block w-24 text-sm text-slate-300 font-mono">
          {formatCurrency(monthlyRent)}
        </div>

        {/* Lease End */}
        <div className="hidden lg:block w-36">
          {leaseEnd ? (
            <div className="flex items-center gap-1.5">
              {(isExpiringSoon || isExpired) && (
                <AlertCircle className={cn('w-3.5 h-3.5 shrink-0', isExpired ? 'text-red-400' : 'text-yellow-400')} />
              )}
              <div>
                <p className={cn(
                  'text-xs font-medium',
                  isExpired ? 'text-red-400' : isExpiringSoon ? 'text-yellow-400' : 'text-slate-400'
                )}>
                  {formatDate(leaseEnd)}
                </p>
                {daysLeft != null && (
                  <p className="text-xs text-slate-600">
                    {isExpired ? `${Math.abs(daysLeft)}d expired` : `${daysLeft}d left`}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <span className="text-xs text-slate-600">—</span>
          )}
        </div>

        {/* Risk */}
        <div className="w-28 flex justify-end">
          <LeaseRiskBadge score={riskScore ?? null} size="sm" showScore={false} />
        </div>
      </div>
    </Link>
  )
}
