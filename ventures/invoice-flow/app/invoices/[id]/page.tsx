'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Invoice } from '@/types'
import { ExtractionViewer } from '@/components/ExtractionViewer'
import { Navbar } from '@/components/Navbar'
import { formatDate, formatCurrency } from '@/lib/utils'

export default function InvoiceDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const loadInvoice = async () => {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) {
        router.push('/auth/login')
        return
      }

      const { data, error } = await supabase
        .from('invoices')
        .select('*, line_items(*)')
        .eq('id', id)
        .single()

      if (error || !data) {
        router.push('/dashboard')
        return
      }

      setInvoice(data as Invoice)
      setLoading(false)
    }

    loadInvoice()
  }, [id, router])

  const handleSave = async (updates: Partial<Invoice>) => {
    const { data, error } = await supabase
      .from('invoices')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('*, line_items(*)')
      .single()

    if (!error && data) setInvoice(data as Invoice)
  }

  const handleApprove = async () => {
    await handleSave({ status: 'reviewed' })
  }

  const handleReject = async () => {
    await handleSave({ status: 'rejected' })
    router.push('/dashboard')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f14] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#4f8ef7] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!invoice) return null

  const isPDF = invoice.file_name?.toLowerCase().endsWith('.pdf')

  return (
    <div className="min-h-screen bg-[#0f0f14] text-[#e2e8f0]">
      <Navbar variant="app" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/30 mb-6">
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-white/60">{invoice.vendor_name || invoice.file_name || 'Invoice'}</span>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold text-white">
              {invoice.vendor_name || 'Unknown Vendor'}
            </h1>
            <div className="flex items-center gap-4 mt-1.5 text-sm text-white/40">
              {invoice.invoice_number && <span>#{invoice.invoice_number}</span>}
              {invoice.invoice_date && <span>{formatDate(invoice.invoice_date)}</span>}
              {invoice.total_amount && (
                <span className="text-white font-semibold">{formatCurrency(invoice.total_amount, invoice.currency)}</span>
              )}
            </div>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 text-sm text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          >
            ← Back
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Original Document */}
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-white/50 uppercase tracking-wider">Original Document</h2>
            <div className="bg-[#1a1a24] border border-white/10 rounded-2xl overflow-hidden min-h-[500px] flex items-center justify-center">
              {invoice.file_url && !imageError ? (
                isPDF ? (
                  <iframe
                    src={invoice.file_url}
                    className="w-full h-[600px]"
                    title="Invoice PDF"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={invoice.file_url}
                    alt="Invoice"
                    className="max-w-full max-h-[600px] object-contain"
                    onError={() => setImageError(true)}
                  />
                )
              ) : (
                <div className="text-center p-12">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-white/30 text-sm">{invoice.file_name || 'Document preview not available'}</p>
                  {invoice.file_url && (
                    <a
                      href={invoice.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex text-xs text-[#4f8ef7] hover:underline"
                    >
                      Open original file ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Extracted Data */}
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-white/50 uppercase tracking-wider">Extracted Data</h2>
            <ExtractionViewer
              invoice={invoice}
              onSave={handleSave}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
