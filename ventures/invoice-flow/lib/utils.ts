import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | null | undefined, currency = 'USD'): string {
  if (amount == null) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: string | null | undefined): string {
  if (!date) return '—'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export function getConfidenceColor(score: number | null | undefined): string {
  if (!score) return 'text-gray-400'
  if (score >= 90) return 'text-green-400'
  if (score >= 70) return 'text-yellow-400'
  return 'text-red-400'
}

export function getConfidenceBg(score: number | null | undefined): string {
  if (!score) return 'bg-gray-400/20 text-gray-400'
  if (score >= 90) return 'bg-green-400/20 text-green-400'
  if (score >= 70) return 'bg-yellow-400/20 text-yellow-400'
  return 'bg-red-400/20 text-red-400'
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'extracted':
      return 'bg-blue-400/20 text-blue-400'
    case 'reviewed':
      return 'bg-green-400/20 text-green-400'
    case 'exported':
      return 'bg-purple-400/20 text-purple-400'
    case 'rejected':
      return 'bg-red-400/20 text-red-400'
    case 'processing':
    default:
      return 'bg-yellow-400/20 text-yellow-400'
  }
}

export function truncate(str: string, n: number): string {
  return str.length > n ? str.slice(0, n - 1) + '...' : str
}
