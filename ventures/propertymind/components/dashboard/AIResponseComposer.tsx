'use client'

import { useState } from 'react'
import { Button, Textarea, Select } from '@/components/ui'
import { Card } from '@/components/ui'
import { Sparkles, Copy, Check, Send, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AIResponseComposerProps {
  tenantId: string
  tenantName: string
  unitNumber: string
  propertyName: string
  leaseEndDate?: string
  monthlyRent?: number
  onResponseGenerated?: (response: string, triggersWorkOrder: boolean, workOrderDetails?: string) => void
}

export function AIResponseComposer({
  tenantName,
  unitNumber,
  propertyName,
  leaseEndDate,
  monthlyRent,
  onResponseGenerated,
}: AIResponseComposerProps) {
  const [message, setMessage] = useState('')
  const [tone, setTone] = useState<'firm' | 'friendly' | 'formal'>('formal')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    response: string
    tone_used: string
    key_points: string[]
    follow_up_actions: string[]
    triggers_work_order: boolean
    work_order_details?: string
  } | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!message.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/generate-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantMessage: message,
          context: {
            tenantName,
            unitNumber,
            propertyName,
            leaseEndDate,
            monthlyRent,
            tone,
          },
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Generation failed')

      setResult(data.result)
      onResponseGenerated?.(data.result.response, data.result.triggers_work_order, data.result.work_order_details)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result.response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Textarea
          label="Tenant Message"
          placeholder="Paste or type the tenant's message here..."
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex items-end gap-3">
          <Select
            label="Response Tone"
            value={tone}
            onChange={(e) => setTone(e.target.value as 'firm' | 'friendly' | 'formal')}
            className="w-40"
          >
            <option value="formal">Formal</option>
            <option value="friendly">Friendly</option>
            <option value="firm">Firm</option>
          </Select>

          <Button
            onClick={handleGenerate}
            loading={loading}
            disabled={!message.trim()}
            className="flex-1"
          >
            <Sparkles className="w-4 h-4" />
            Generate Response
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-3">
          {result.triggers_work_order && (
            <div className="flex items-start gap-2.5 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-orange-400">Work Order Recommended</p>
                <p className="text-xs text-orange-300/70 mt-0.5">{result.work_order_details}</p>
              </div>
            </div>
          )}

          <Card className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-medium text-slate-300">AI Draft Response</span>
                <span className="text-xs text-slate-500">· {result.tone_used}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-all"
                >
                  {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-all">
                  <Send className="w-3 h-3" />
                  Send
                </button>
              </div>
            </div>

            <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed border-t border-slate-800 pt-3">
              {result.response}
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            {result.key_points.length > 0 && (
              <Card className="p-3">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Key Points Addressed</p>
                <ul className="space-y-1">
                  {result.key_points.map((point, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                      <span className="text-violet-400 mt-0.5">·</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {result.follow_up_actions.length > 0 && (
              <Card className="p-3">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Your Follow-up Actions</p>
                <ul className="space-y-1">
                  {result.follow_up_actions.map((action, i) => (
                    <li key={i} className={cn('flex items-start gap-1.5 text-xs text-slate-300')}>
                      <span className="text-amber-400 mt-0.5">·</span>
                      {action}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
