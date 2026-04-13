'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Invoice, Organization, PLAN_LIMITS } from '@/types'
import { InvoiceUploader } from '@/components/InvoiceUploader'
import { InvoiceTable } from '@/components/InvoiceTable'
import { Navbar } from '@/components/Navbar'
import { formatCurrency } from '@/lib/utils'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)
  const [org, setOrg] = useState<Organization | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async (userId: string) => {
    const { data: orgData } = await supabase
      .from('organizations')
      .select('*')
      .eq('owner_id', userId)
      .single()

    if (!orgData) {
      router.push('/onboarding')
      return
    }

    setOrg(orgData)

    const { data: invoiceData } = await supabase
      .from('invoices')
      .select('*, line_items(*)')
      .eq('org_id', orgData.id)
      .order('created_at', { ascending: false })
      .limit(200)

    setInvoices((invoiceData as Invoice[]) || [])
    setLoading(false)
  }, [router])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/auth/login')
        return
      }
      setUser({ id: data.user.id, email: data.user.email || '' })
      loadData(data.user.id)
    })
  }, [router, loadData])

  const handleExport = async (ids: string[], format: 'quickbooks' | 'xero') => {
    const res = await fetch('/api/export-csv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoiceIds: ids, format }),
    })

    if (res.ok) {
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `invoices-${format}-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      URL.revokeObjectURL(url)

      // Refresh to see updated statuses
      if (user) loadData(user.id)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this invoice?')) return
    await fetch(`/api/invoices/${id}`, { method: 'DELETE' })
    setInvoices((prev) => prev.filter((i) => i.id !== id))
  }

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/invoices/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setInvoices((prev) => prev.map((i) => (i.id === id ? { ...i, status: status as Invoice['status'] } : i)))
  }

  const handleInvoiceProcessed = (invoice: Invoice) => {
    setInvoices((prev) => {
      const existing = prev.find((i) => i.id === invoice.id)
      if (existing) return prev.map((i) => (i.id === invoice.id ? invoice : i))
      return [invoice, ...prev]
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f14] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#4f8ef7] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Stats
  const thisMonth = invoices.filter((i) => {
    const d = new Date(i.created_at)
    const now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })

  const extracted = invoices.filter((i) => i.status !== 'processing')
  const avgConfidence = extracted.length
    ? Math.round(extracted.reduce((sum, i) => sum + (i.confidence_score || 0), 0) / extracted.length)
    : 0
  const duplicates = invoices.filter((i) => i.is_duplicate).length
  const totalValue = invoices.reduce((sum, i) => sum + (i.total_amount || 0), 0)
  const planLimit = org ? PLAN_LIMITS[org.plan] : PLAN_LIMITS.solo
  const usagePercent = org ? Math.min(100, Math.round((org.invoice_count_this_month / planLimit.invoices) * 100)) : 0

  const stats = [
    {
      label: 'Invoices This Month',
      value: org?.invoice_count_this_month || 0,
      sub: `of ${planLimit.invoices === Infinity ? '∞' : planLimit.invoices} limit`,
      color: 'text-[#4f8ef7]',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: 'Avg. AI Confidence',
      value: `${avgConfidence}%`,
      sub: 'extraction accuracy',
      color: avgConfidence >= 90 ? 'text-green-400' : avgConfidence >= 70 ? 'text-yellow-400' : 'text-red-400',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      label: 'Duplicates Caught',
      value: duplicates,
      sub: 'prevented double-payment',
      color: 'text-yellow-400',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      label: 'Total Invoice Value',
      value: formatCurrency(totalValue),
      sub: 'all time',
      color: 'text-white',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-[#0f0f14] text-[#e2e8f0]">
      <Navbar variant="app" />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-white/40 mt-1 text-sm">{org?.name || 'Your workspace'}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
              org?.plan === 'firm' ? 'bg-purple-400/20 text-purple-400' :
              org?.plan === 'team' ? 'bg-[#4f8ef7]/20 text-[#4f8ef7]' :
              'bg-white/10 text-white/50'
            }`}>
              {org?.plan || 'solo'} plan
            </span>
          </div>
        </div>

        {/* Usage bar (if near limit) */}
        {usagePercent >= 70 && planLimit.invoices !== Infinity && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border flex items-center gap-4 ${usagePercent >= 90 ? 'bg-red-400/5 border-red-400/20' : 'bg-yellow-400/5 border-yellow-400/20'}`}
          >
            <svg className={`w-5 h-5 flex-shrink-0 ${usagePercent >= 90 ? 'text-red-400' : 'text-yellow-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="flex-1">
              <p className={`text-sm font-medium ${usagePercent >= 90 ? 'text-red-400' : 'text-yellow-400'}`}>
                {usagePercent >= 90 ? 'Invoice limit almost reached' : 'Approaching invoice limit'}
              </p>
              <p className="text-xs text-white/40 mt-0.5">
                {org?.invoice_count_this_month} of {planLimit.invoices} invoices used this month ({usagePercent}%)
              </p>
            </div>
            <a href="/pricing" className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${usagePercent >= 90 ? 'bg-red-400/20 text-red-400 hover:bg-red-400/30' : 'bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30'}`}>
              Upgrade
            </a>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-[#1a1a24] border border-white/10 rounded-2xl p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/40">
                  {stat.icon}
                </div>
              </div>
              <div className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-white/30 font-medium">{stat.label}</div>
              <div className="text-xs text-white/20 mt-0.5">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Upload Zone */}
        <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-5">Upload Invoices</h2>
          {user && org && (
            <InvoiceUploader
              orgId={org.id}
              userId={user.id}
              onInvoiceProcessed={handleInvoiceProcessed}
            />
          )}
        </div>

        {/* Invoice Table */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-white">
              Invoices
              {invoices.length > 0 && (
                <span className="ml-2 text-xs text-white/30 font-normal">({invoices.length})</span>
              )}
            </h2>
          </div>
          <InvoiceTable
            invoices={invoices}
            onExport={handleExport}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  )
}
