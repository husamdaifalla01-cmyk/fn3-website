import { ComplianceStatus } from '@/types'

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function getStatusColor(status: ComplianceStatus): string {
  switch (status) {
    case 'compliant':
      return '#00d4aa'
    case 'partial':
      return '#f59e0b'
    case 'non_compliant':
      return '#ef4444'
    case 'not_started':
      return '#6b7280'
    default:
      return '#6b7280'
  }
}

export function getStatusLabel(status: ComplianceStatus): string {
  switch (status) {
    case 'compliant':
      return 'Compliant'
    case 'partial':
      return 'Partial'
    case 'non_compliant':
      return 'Non-Compliant'
    case 'not_started':
      return 'Not Started'
    default:
      return 'Unknown'
  }
}

export function getScoreColor(score: number): string {
  if (score >= 80) return '#00d4aa'
  if (score >= 60) return '#f59e0b'
  if (score >= 40) return '#f97316'
  return '#ef4444'
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Strong'
  if (score >= 60) return 'Moderate'
  if (score >= 40) return 'Needs Work'
  return 'Critical Risk'
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function calculateComplianceScore(statuses: ComplianceStatus[]): number {
  if (statuses.length === 0) return 0
  const total = statuses.reduce((acc, status) => {
    switch (status) {
      case 'compliant': return acc + 100
      case 'partial': return acc + 50
      case 'non_compliant': return acc + 0
      case 'not_started': return acc + 0
      default: return acc
    }
  }, 0)
  return Math.round(total / statuses.length)
}

export function downloadTextFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}
