'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Invoice } from '@/types'
import { formatCurrency, formatDate, getStatusColor, getConfidenceBg, truncate } from '@/lib/utils'

interface InvoiceTableProps {
  invoices: Invoice[]
  onExport: (ids: string[], format: 'quickbooks' | 'xero') => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: string) => void
}

type SortKey = 'vendor_name' | 'invoice_date' | 'total_amount' | 'status' | 'confidence_score' | 'created_at'

export function InvoiceTable({ invoices, onExport, onDelete, onStatusChange }: InvoiceTableProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [sortKey, setSortKey] = useState<SortKey>('created_at')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [exportFormat, setExportFormat] = useState<'quickbooks' | 'xero'>('quickbooks')

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(filtered.map((i) => i.id)))
    }
  }

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const filtered = invoices
    .filter((inv) => {
      if (statusFilter !== 'all' && inv.status !== statusFilter) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          inv.vendor_name?.toLowerCase().includes(q) ||
          inv.invoice_number?.toLowerCase().includes(q) ||
          inv.expense_category?.toLowerCase().includes(q)
        )
      }
      return true
    })
    .sort((a, b) => {
      const aVal = a[sortKey] ?? ''
      const bVal = b[sortKey] ?? ''
      const dir = sortDir === 'asc' ? 1 : -1
      if (aVal < bVal) return -dir
      if (aVal > bVal) return dir
      return 0
    })

  const SortIcon = ({ col }: { col: SortKey }) => (
    <svg
      className={`w-3 h-3 ml-1 inline ${sortKey === col ? 'text-[#4f8ef7]' : 'text-white/20'}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {sortKey === col && sortDir === 'asc' ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      )}
    </svg>
  )

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search invoices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#4f8ef7]/50 w-52"
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70 focus:outline-none focus:border-[#4f8ef7]/50"
          >
            <option value="all">All Status</option>
            <option value="processing">Processing</option>
            <option value="extracted">Extracted</option>
            <option value="reviewed">Reviewed</option>
            <option value="exported">Exported</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Bulk actions */}
        {selected.size > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2"
          >
            <span className="text-sm text-white/50">{selected.size} selected</span>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as 'quickbooks' | 'xero')}
              className="px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70"
            >
              <option value="quickbooks">QuickBooks</option>
              <option value="xero">Xero</option>
            </select>
            <button
              onClick={() => onExport(Array.from(selected), exportFormat)}
              className="px-3 py-1.5 bg-[#4f8ef7] text-white text-xs rounded-lg hover:bg-[#4f8ef7]/80 transition-colors font-medium"
            >
              Export CSV
            </button>
            <button
              onClick={() => setSelected(new Set())}
              className="px-3 py-1.5 bg-white/5 text-white/60 text-xs rounded-lg hover:bg-white/10 transition-colors"
            >
              Clear
            </button>
          </motion.div>
        )}
      </div>

      {/* Table */}
      <div className="bg-[#1a1a24] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selected.size === filtered.length && filtered.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded accent-[#4f8ef7]"
                  />
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider cursor-pointer hover:text-white/60"
                  onClick={() => handleSort('vendor_name')}
                >
                  Vendor <SortIcon col="vendor_name" />
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider cursor-pointer hover:text-white/60"
                  onClick={() => handleSort('invoice_date')}
                >
                  Date <SortIcon col="invoice_date" />
                </th>
                <th
                  className="px-4 py-3 text-right text-xs font-medium text-white/40 uppercase tracking-wider cursor-pointer hover:text-white/60"
                  onClick={() => handleSort('total_amount')}
                >
                  Amount <SortIcon col="total_amount" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                  Category
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider cursor-pointer hover:text-white/60"
                  onClick={() => handleSort('status')}
                >
                  Status <SortIcon col="status" />
                </th>
                <th
                  className="px-4 py-3 text-center text-xs font-medium text-white/40 uppercase tracking-wider cursor-pointer hover:text-white/60"
                  onClick={() => handleSort('confidence_score')}
                >
                  Confidence <SortIcon col="confidence_score" />
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-white/40 uppercase tracking-wider">
                  Flags
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-white/40 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-white/30">
                    No invoices found
                  </td>
                </tr>
              ) : (
                filtered.map((invoice) => (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`hover:bg-white/[0.02] transition-colors ${selected.has(invoice.id) ? 'bg-[#4f8ef7]/5' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(invoice.id)}
                        onChange={() => toggleSelect(invoice.id)}
                        className="w-4 h-4 rounded accent-[#4f8ef7]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm text-white font-medium">
                          {truncate(invoice.vendor_name || 'Unknown vendor', 28)}
                        </p>
                        {invoice.invoice_number && (
                          <p className="text-xs text-white/30 font-mono">{invoice.invoice_number}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-white/60">
                      {formatDate(invoice.invoice_date)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-medium text-white">
                        {formatCurrency(invoice.total_amount, invoice.currency)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {invoice.expense_category ? (
                        <span className="text-xs text-white/50 bg-white/5 px-2 py-0.5 rounded">
                          {truncate(invoice.expense_category, 20)}
                        </span>
                      ) : (
                        <span className="text-white/20">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {invoice.confidence_score != null ? (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getConfidenceBg(invoice.confidence_score)}`}>
                          {invoice.confidence_score}%
                        </span>
                      ) : (
                        <span className="text-white/20">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {invoice.is_duplicate && (
                          <span title="Duplicate detected" className="w-5 h-5 bg-red-400/20 rounded-full flex items-center justify-center">
                            <span className="text-red-400 text-xs font-bold">D</span>
                          </span>
                        )}
                        {invoice.anomalies?.length > 0 && (
                          <span title={`${invoice.anomalies.length} anomalies detected`} className="w-5 h-5 bg-yellow-400/20 rounded-full flex items-center justify-center">
                            <span className="text-yellow-400 text-xs font-bold">!</span>
                          </span>
                        )}
                        {!invoice.is_duplicate && invoice.anomalies?.length === 0 && (
                          <span className="text-white/20">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/invoices/${invoice.id}`}
                          className="px-2 py-1 text-xs text-[#4f8ef7] hover:text-white bg-[#4f8ef7]/10 hover:bg-[#4f8ef7]/20 rounded transition-colors"
                        >
                          Review
                        </Link>
                        <button
                          onClick={() => onDelete(invoice.id)}
                          className="px-2 py-1 text-xs text-red-400/60 hover:text-red-400 bg-red-400/5 hover:bg-red-400/10 rounded transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-white/5 text-xs text-white/30">
            Showing {filtered.length} of {invoices.length} invoices
          </div>
        )}
      </div>
    </div>
  )
}
