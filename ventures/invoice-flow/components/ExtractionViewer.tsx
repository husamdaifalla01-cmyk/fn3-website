'use client'

import { useState } from 'react'
import { Invoice, LineItem, Anomaly } from '@/types'
import { formatCurrency, getConfidenceBg } from '@/lib/utils'

interface ExtractionViewerProps {
  invoice: Invoice
  onSave: (updates: Partial<Invoice>) => Promise<void>
  onApprove: () => Promise<void>
  onReject: () => Promise<void>
}

export function ExtractionViewer({ invoice, onSave, onApprove, onReject }: ExtractionViewerProps) {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    vendor_name: invoice.vendor_name || '',
    vendor_address: invoice.vendor_address || '',
    invoice_number: invoice.invoice_number || '',
    invoice_date: invoice.invoice_date || '',
    due_date: invoice.due_date || '',
    subtotal: invoice.subtotal ?? '',
    tax_amount: invoice.tax_amount ?? '',
    total_amount: invoice.total_amount ?? '',
    currency: invoice.currency || 'USD',
    gl_code: invoice.gl_code || '',
    expense_category: invoice.expense_category || '',
    payment_terms: invoice.payment_terms || '',
    notes: invoice.notes || '',
  })

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave({
        ...form,
        subtotal: form.subtotal ? parseFloat(String(form.subtotal)) : undefined,
        tax_amount: form.tax_amount ? parseFloat(String(form.tax_amount)) : undefined,
        total_amount: form.total_amount ? parseFloat(String(form.total_amount)) : undefined,
        status: 'reviewed',
      })
      setEditing(false)
    } finally {
      setSaving(false)
    }
  }

  const Field = ({
    label,
    field,
    type = 'text',
  }: {
    label: string
    field: keyof typeof form
    type?: string
  }) => (
    <div>
      <label className="block text-xs text-white/40 mb-1">{label}</label>
      {editing ? (
        <input
          type={type}
          value={String(form[field])}
          onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#4f8ef7]/50"
        />
      ) : (
        <p className="text-sm text-white/80">
          {form[field] ? String(form[field]) : <span className="text-white/20">—</span>}
        </p>
      )}
    </div>
  )

  const severityColor = (severity: Anomaly['severity']) => {
    if (severity === 'high') return 'border-red-400/30 bg-red-400/5 text-red-400'
    if (severity === 'medium') return 'border-yellow-400/30 bg-yellow-400/5 text-yellow-400'
    return 'border-blue-400/30 bg-blue-400/5 text-blue-400'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {invoice.confidence_score != null && (
            <span className={`text-sm px-3 py-1 rounded-full font-medium ${getConfidenceBg(invoice.confidence_score)}`}>
              {invoice.confidence_score}% confidence
            </span>
          )}
          {invoice.is_duplicate && (
            <span className="text-xs px-3 py-1 rounded-full bg-red-400/20 text-red-400 font-medium">
              Duplicate detected
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <button
                onClick={() => setEditing(false)}
                className="px-3 py-1.5 text-sm text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-3 py-1.5 text-sm text-white bg-[#4f8ef7] hover:bg-[#4f8ef7]/80 rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="px-3 py-1.5 text-sm text-white/70 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                Edit
              </button>
              <button
                onClick={onReject}
                className="px-3 py-1.5 text-sm text-red-400 bg-red-400/10 hover:bg-red-400/20 rounded-lg transition-colors"
              >
                Reject
              </button>
              <button
                onClick={onApprove}
                className="px-3 py-1.5 text-sm text-white bg-green-500 hover:bg-green-500/80 rounded-lg transition-colors"
              >
                Approve
              </button>
            </>
          )}
        </div>
      </div>

      {/* Anomaly warnings */}
      {invoice.anomalies && invoice.anomalies.length > 0 && (
        <div className="space-y-2">
          {invoice.anomalies.map((anomaly, i) => (
            <div key={i} className={`flex items-start gap-3 p-3 border rounded-lg ${severityColor(anomaly.severity)}`}>
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide opacity-70">{anomaly.type.replace(/_/g, ' ')}</p>
                <p className="text-xs mt-0.5 opacity-80">{anomaly.description}</p>
              </div>
              <span className="ml-auto text-xs opacity-60 uppercase font-medium">{anomaly.severity}</span>
            </div>
          ))}
        </div>
      )}

      {/* Extracted fields */}
      <div className="bg-[#1a1a24] border border-white/10 rounded-xl p-5 space-y-5">
        <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">Vendor Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Vendor Name" field="vendor_name" />
          <Field label="Invoice Number" field="invoice_number" />
          <div className="col-span-2">
            <Field label="Vendor Address" field="vendor_address" />
          </div>
        </div>

        <div className="border-t border-white/5 pt-5">
          <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">Invoice Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Invoice Date" field="invoice_date" type="date" />
            <Field label="Due Date" field="due_date" type="date" />
            <Field label="Payment Terms" field="payment_terms" />
            <Field label="Currency" field="currency" />
          </div>
        </div>

        <div className="border-t border-white/5 pt-5">
          <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">Amounts</h3>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Subtotal" field="subtotal" type="number" />
            <Field label="Tax Amount" field="tax_amount" type="number" />
            <div>
              <label className="block text-xs text-white/40 mb-1">Total Amount</label>
              {editing ? (
                <input
                  type="number"
                  value={String(form.total_amount)}
                  onChange={(e) => setForm((prev) => ({ ...prev, total_amount: e.target.value }))}
                  className="w-full px-3 py-2 bg-white/5 border border-[#4f8ef7]/30 rounded-lg text-sm text-white font-semibold focus:outline-none"
                />
              ) : (
                <p className="text-sm font-semibold text-white">
                  {form.total_amount ? formatCurrency(parseFloat(String(form.total_amount)), form.currency) : <span className="text-white/20">—</span>}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-5">
          <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">GL Classification</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="GL Code" field="gl_code" />
            <Field label="Expense Category" field="expense_category" />
          </div>
        </div>
      </div>

      {/* Line items */}
      {invoice.line_items && invoice.line_items.length > 0 && (
        <div className="bg-[#1a1a24] border border-white/10 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5">
            <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">Line Items</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-4 py-2 text-left text-xs text-white/30 font-medium">Description</th>
                  <th className="px-4 py-2 text-right text-xs text-white/30 font-medium">Qty</th>
                  <th className="px-4 py-2 text-right text-xs text-white/30 font-medium">Unit Price</th>
                  <th className="px-4 py-2 text-right text-xs text-white/30 font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {invoice.line_items.map((item: LineItem) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2.5 text-sm text-white/70">{item.description || '—'}</td>
                    <td className="px-4 py-2.5 text-sm text-white/50 text-right">{item.quantity ?? '—'}</td>
                    <td className="px-4 py-2.5 text-sm text-white/50 text-right">{formatCurrency(item.unit_price)}</td>
                    <td className="px-4 py-2.5 text-sm text-white text-right font-medium">{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
