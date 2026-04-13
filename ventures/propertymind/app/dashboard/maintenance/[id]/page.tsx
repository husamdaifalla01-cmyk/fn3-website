'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { formatDate, getPriorityColor, getStatusColor } from '@/lib/utils'
import { Button } from '@/components/ui'
import { ArrowLeft, FileText, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { use } from 'react'

export default function MaintenanceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [item, setItem] = useState<Record<string, unknown> | null>(null)
  const [generating, setGenerating] = useState(false)
  const [workOrder, setWorkOrder] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('pm_maintenance')
        .select(`*, pm_units(unit_number, pm_properties(name, address)), pm_tenants(name, phone), pm_vendors(name, trade)`)
        .eq('id', id)
        .single()
      setItem(data)
      setWorkOrder((data as Record<string, unknown> | null)?.work_order as string | null)
    }
    fetch()
  }, [id])

  const handleStatusChange = async (status: string) => {
    await supabase.from('pm_maintenance').update({
      status,
      completed_at: status === 'completed' ? new Date().toISOString() : null,
    }).eq('id', id)
    setItem(prev => prev ? { ...prev, status } : null)
  }

  const handleGenerateWorkOrder = async () => {
    if (!item) return
    setGenerating(true)
    try {
      const unit = item.pm_units as { unit_number: string; pm_properties: { name: string; address?: string } } | null
      const tenant = item.pm_tenants as { name: string; phone?: string } | null
      const res = await fetch('/api/generate-work-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          issue: item.description || item.title,
          context: {
            unitNumber: unit?.unit_number || 'Unknown',
            propertyName: unit?.pm_properties?.name || 'Unknown',
            propertyAddress: unit?.pm_properties?.address,
            tenantName: tenant?.name || 'Tenant',
            tenantPhone: tenant?.phone,
            priority: item.priority,
          },
          maintenanceId: id,
        }),
      })
      const data = await res.json()
      setWorkOrder(data.result.work_order)
    } finally {
      setGenerating(false)
    }
  }

  if (!item) return (
    <div className="p-6">
      <div className="h-8 w-48 bg-slate-800 rounded animate-pulse mb-4" />
      <div className="h-64 bg-slate-900 border border-slate-800 rounded-xl animate-pulse" />
    </div>
  )

  const unit = item.pm_units as { unit_number: string; pm_properties: { name: string } } | null
  const tenant = item.pm_tenants as { name: string } | null

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link href="/dashboard/maintenance" className="flex items-center gap-2 text-slate-400 hover:text-slate-200 text-sm mb-6 transition-colors">
        <ArrowLeft className="w-3 h-3" />
        Back
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white mb-2">{String(item.title)}</h1>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-medium px-2 py-1 rounded-md border ${getPriorityColor(String(item.priority))}`}>
              {String(item.priority).charAt(0).toUpperCase() + String(item.priority).slice(1)} Priority
            </span>
            <span className={`text-xs px-2 py-1 rounded-md ${getStatusColor(String(item.status))}`}>
              {String(item.status).replace('_', ' ').charAt(0).toUpperCase() + String(item.status).replace('_', ' ').slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-500 mb-1">Unit</p>
          <p className="text-sm text-slate-200">{unit ? `Unit ${unit.unit_number}` : '—'}</p>
          {unit && <p className="text-xs text-slate-500">{unit.pm_properties?.name}</p>}
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-500 mb-1">Tenant</p>
          <p className="text-sm text-slate-200">{tenant?.name || '—'}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-500 mb-1">Reported</p>
          <p className="text-sm text-slate-200">{formatDate(item.created_at as string)}</p>
        </div>
      </div>

      {(item.description as string | null) && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-4">
          <p className="text-xs text-slate-500 mb-2">Description</p>
          <p className="text-sm text-slate-300 leading-relaxed">{String(item.description)}</p>
        </div>
      )}

      {/* Work Order */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-violet-400" />
            <h2 className="text-sm font-medium text-slate-300">Work Order</h2>
          </div>
          <Button variant="secondary" size="sm" onClick={handleGenerateWorkOrder} loading={generating}>
            <Sparkles className="w-3.5 h-3.5" />
            {workOrder ? 'Regenerate' : 'Generate'}
          </Button>
        </div>
        {workOrder ? (
          <div className="bg-slate-800/50 rounded-lg p-4 text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
            {workOrder}
          </div>
        ) : (
          <p className="text-xs text-slate-500">Click Generate to create a professional work order for this request</p>
        )}
      </div>

      {/* Status actions */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <p className="text-sm font-medium text-slate-300 mb-3">Update Status</p>
        <div className="flex flex-wrap gap-2">
          {['open', 'assigned', 'in_progress', 'completed'].map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                item.status === s
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {s.replace('_', ' ').charAt(0).toUpperCase() + s.replace('_', ' ').slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
