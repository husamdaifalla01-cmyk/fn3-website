'use client'

import { useState } from 'react'
import type { ActionItem, Decision } from '@/lib/supabase'

type ResultCardProps = {
  title: string
  icon: string
  children: React.ReactNode
  copyText: string
}

export function ResultCard({ title, icon, children, copyText }: ResultCardProps) {
  const [copied, setCopied] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 flex-1 text-left"
        >
          <span className="text-xl">{icon}</span>
          <span className="font-semibold text-gray-900">{title}</span>
          <span
            className={`ml-auto text-gray-400 transition-transform ${collapsed ? '' : 'rotate-180'}`}
          >
            ▾
          </span>
        </button>
        <button
          onClick={handleCopy}
          className="ml-4 flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-brand-50"
        >
          {copied ? (
            <>
              <span>✓</span>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <span>⎘</span>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {!collapsed && (
        <div className="p-6">
          {children}
        </div>
      )}
    </div>
  )
}

export function SummaryContent({ summary }: { summary: string }) {
  return (
    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{summary}</p>
  )
}

export function ActionItemsContent({ items }: { items: ActionItem[] }) {
  const priorityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  }

  if (!items || items.length === 0) {
    return <p className="text-gray-500 italic">No action items identified.</p>
  }

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
          <div className="w-6 h-6 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
            {i + 1}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900">{item.task}</p>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <span className="text-sm text-gray-500">
                Owner: <span className="font-medium text-gray-700">{item.owner}</span>
              </span>
              <span className="text-gray-300">·</span>
              <span className="text-sm text-gray-500">
                Due: <span className="font-medium text-gray-700">{item.deadline}</span>
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  priorityColors[item.priority] || priorityColors.medium
                }`}
              >
                {item.priority}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function DecisionsContent({ decisions }: { decisions: Decision[] }) {
  if (!decisions || decisions.length === 0) {
    return <p className="text-gray-500 italic">No decisions identified.</p>
  }

  return (
    <div className="space-y-4">
      {decisions.map((item, i) => (
        <div key={i} className="border-l-4 border-brand-500 pl-4">
          <p className="font-semibold text-gray-900">{item.decision}</p>
          {item.context && (
            <p className="text-sm text-gray-600 mt-1">{item.context}</p>
          )}
        </div>
      ))}
    </div>
  )
}

export function FollowUpEmailContent({ email }: { email: string }) {
  return (
    <pre className="font-sans text-gray-700 leading-relaxed whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg">
      {email}
    </pre>
  )
}
