import { cn, getRiskBg, getRiskLabel } from '@/lib/utils'
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react'

interface LeaseRiskBadgeProps {
  score: number | null
  showScore?: boolean
  size?: 'sm' | 'md'
}

export function LeaseRiskBadge({ score, showScore = true, size = 'md' }: LeaseRiskBadgeProps) {
  if (score == null) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-slate-700/50 text-slate-400 border border-slate-700">
        Not analyzed
      </span>
    )
  }

  const Icon = score >= 70 ? AlertTriangle : score >= 40 ? AlertCircle : CheckCircle
  const label = getRiskLabel(score)
  const colorClass = getRiskBg(score)

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 rounded-md font-medium border',
        size === 'sm' ? 'text-xs' : 'text-sm',
        colorClass
      )}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      {label}
      {showScore && <span className="opacity-70">({score})</span>}
    </span>
  )
}
