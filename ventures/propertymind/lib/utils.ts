import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | null | undefined): string {
  if (amount == null) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return '—'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export function daysUntil(date: string | Date | null | undefined): number | null {
  if (!date) return null
  const target = new Date(date)
  const now = new Date()
  const diff = Math.floor((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return diff
}

export function getRiskColor(score: number): string {
  if (score >= 70) return 'text-red-400'
  if (score >= 40) return 'text-yellow-400'
  return 'text-green-400'
}

export function getRiskBg(score: number): string {
  if (score >= 70) return 'bg-red-500/10 border-red-500/20 text-red-400'
  if (score >= 40) return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
  return 'bg-green-500/10 border-green-500/20 text-green-400'
}

export function getRiskLabel(score: number): string {
  if (score >= 70) return 'High Risk'
  if (score >= 40) return 'Medium Risk'
  return 'Low Risk'
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'emergency': return 'bg-red-500/10 border-red-500/30 text-red-400'
    case 'high': return 'bg-orange-500/10 border-orange-500/30 text-orange-400'
    case 'medium': return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
    case 'low': return 'bg-blue-500/10 border-blue-500/30 text-blue-400'
    default: return 'bg-slate-500/10 border-slate-500/30 text-slate-400'
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'open': return 'bg-red-500/10 text-red-400'
    case 'assigned': return 'bg-yellow-500/10 text-yellow-400'
    case 'in_progress': return 'bg-blue-500/10 text-blue-400'
    case 'completed': return 'bg-green-500/10 text-green-400'
    case 'occupied': return 'bg-green-500/10 text-green-400'
    case 'vacant': return 'bg-slate-500/10 text-slate-400'
    case 'maintenance': return 'bg-yellow-500/10 text-yellow-400'
    default: return 'bg-slate-500/10 text-slate-400'
  }
}
