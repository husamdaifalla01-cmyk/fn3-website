'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Invoice } from '@/types'

interface InvoiceUploaderProps {
  orgId: string
  userId: string
  onInvoiceProcessed: (invoice: Invoice) => void
}

interface UploadState {
  file: File
  status: 'uploading' | 'extracting' | 'categorizing' | 'done' | 'error'
  progress: number
  invoice?: Invoice
  error?: string
}

export function InvoiceUploader({ orgId, userId, onInvoiceProcessed }: InvoiceUploaderProps) {
  const [uploads, setUploads] = useState<UploadState[]>([])

  const processFile = async (file: File) => {
    const uploadState: UploadState = {
      file,
      status: 'uploading',
      progress: 10,
    }

    setUploads((prev) => [...prev, uploadState])

    const updateUpload = (updates: Partial<UploadState>) => {
      setUploads((prev) =>
        prev.map((u) => (u.file === file ? { ...u, ...updates } : u))
      )
    }

    try {
      // Step 1: Upload file to storage & create DB record
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('orgId', orgId)
      uploadFormData.append('userId', userId)

      const uploadRes = await fetch('/api/invoices/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      if (!uploadRes.ok) throw new Error('Upload failed')
      const { invoice } = await uploadRes.json()

      updateUpload({ status: 'extracting', progress: 35 })

      // Step 2: Extract invoice data with AI
      const extractFormData = new FormData()
      extractFormData.append('file', file)

      const extractRes = await fetch('/api/extract-invoice', {
        method: 'POST',
        body: extractFormData,
      })

      const extractData = await extractRes.json()

      if (!extractData.success) throw new Error('Extraction failed')

      updateUpload({ status: 'categorizing', progress: 65 })

      // Step 3: Categorize and detect anomalies
      const catRes = await fetch('/api/categorize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoice: extractData.data }),
      })

      const catData = await catRes.json()

      // Step 4: Check for duplicates
      const { data: potentialDupes } = await supabase
        .from('invoices')
        .select('id')
        .eq('org_id', orgId)
        .eq('invoice_number', extractData.data.invoice_number || '')
        .eq('vendor_name', extractData.data.vendor_name || '')
        .neq('id', invoice.id)
        .limit(1)

      const isDuplicate = (potentialDupes?.length || 0) > 0
      const duplicateOf = isDuplicate ? potentialDupes![0].id : null

      updateUpload({ progress: 85 })

      // Step 5: Save all extracted data to DB
      const updatePayload: Partial<Invoice> = {
        ...extractData.data,
        status: 'extracted',
        gl_code: catData.data?.gl_code,
        expense_category: catData.data?.expense_category,
        confidence_score: extractData.data.confidence,
        is_duplicate: isDuplicate,
        duplicate_of: duplicateOf,
        anomalies: catData.data?.anomalies || [],
        raw_extraction: extractData.data,
      }

      const { data: updatedInvoice } = await supabase
        .from('invoices')
        .update(updatePayload)
        .eq('id', invoice.id)
        .select()
        .single()

      // Step 6: Save line items
      if (extractData.data.line_items?.length > 0) {
        await supabase.from('line_items').insert(
          extractData.data.line_items.map((li: { description: string; quantity: number; unit_price: number; total: number }) => ({
            invoice_id: invoice.id,
            description: li.description,
            quantity: li.quantity,
            unit_price: li.unit_price,
            total: li.total,
            gl_code: catData.data?.gl_code,
          }))
        )
      }

      updateUpload({ status: 'done', progress: 100, invoice: updatedInvoice })
      onInvoiceProcessed(updatedInvoice)

      // Remove from upload queue after 3 seconds
      setTimeout(() => {
        setUploads((prev) => prev.filter((u) => u.file !== file))
      }, 3000)
    } catch (error) {
      console.error('Processing error:', error)
      updateUpload({
        status: 'error',
        progress: 0,
        error: error instanceof Error ? error.message : 'Processing failed',
      })
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach(processFile)
    },
    [orgId, userId]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'application/pdf': ['.pdf'],
    },
    maxSize: 20 * 1024 * 1024, // 20MB
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200
          ${isDragActive
            ? 'border-[#4f8ef7] bg-[#4f8ef7]/10 scale-[1.02]'
            : 'border-white/10 hover:border-[#4f8ef7]/50 hover:bg-white/[0.02]'
          }
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${isDragActive ? 'bg-[#4f8ef7]/20' : 'bg-white/5'}`}>
            <svg
              className={`w-8 h-8 transition-colors ${isDragActive ? 'text-[#4f8ef7]' : 'text-white/40'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          {isDragActive ? (
            <p className="text-[#4f8ef7] font-medium text-lg">Drop invoices here...</p>
          ) : (
            <>
              <div>
                <p className="text-white font-medium text-lg">
                  Drag & drop invoices here
                </p>
                <p className="text-white/40 mt-1">or click to browse files</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/30">
                <span className="px-2 py-1 rounded bg-white/5 font-mono">PDF</span>
                <span className="px-2 py-1 rounded bg-white/5 font-mono">JPG</span>
                <span className="px-2 py-1 rounded bg-white/5 font-mono">PNG</span>
                <span className="text-white/20">up to 20MB each</span>
              </div>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {uploads.map((upload, i) => (
          <motion.div
            key={`${upload.file.name}-${i}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#1a1a24] border border-white/10 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#4f8ef7]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#4f8ef7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-white font-medium truncate max-w-[200px]">{upload.file.name}</p>
                  <p className="text-xs text-white/40">
                    {upload.status === 'uploading' && 'Uploading...'}
                    {upload.status === 'extracting' && 'AI extracting data...'}
                    {upload.status === 'categorizing' && 'Categorizing & analyzing...'}
                    {upload.status === 'done' && 'Processing complete!'}
                    {upload.status === 'error' && upload.error}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {upload.status === 'done' && (
                  <span className="text-green-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
                {upload.status === 'error' && (
                  <span className="text-red-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                )}
                {['uploading', 'extracting', 'categorizing'].includes(upload.status) && (
                  <div className="w-4 h-4 border-2 border-[#4f8ef7] border-t-transparent rounded-full animate-spin" />
                )}
              </div>
            </div>

            {upload.status !== 'error' && (
              <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className={`absolute inset-y-0 left-0 rounded-full ${upload.status === 'done' ? 'bg-green-400' : 'bg-[#4f8ef7]'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${upload.progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
