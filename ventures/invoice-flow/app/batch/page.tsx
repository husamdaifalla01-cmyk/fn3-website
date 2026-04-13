'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'

type FileStatus = 'queued' | 'extracting' | 'categorizing' | 'done' | 'error'

interface BatchFile {
  id: string
  name: string
  size: number
  status: FileStatus
  vendor?: string
  amount?: string
  glCode?: string
  isDuplicate?: boolean
  needsReview?: boolean
  error?: string
}

const STATUS_LABELS: Record<FileStatus, string> = {
  queued: 'Queued',
  extracting: 'Extracting...',
  categorizing: 'Categorizing...',
  done: 'Done',
  error: 'Error',
}

const STATUS_COLORS: Record<FileStatus, string> = {
  queued: 'text-white/30',
  extracting: 'text-[#4f8ef7]',
  categorizing: 'text-yellow-400',
  done: 'text-green-400',
  error: 'text-red-400',
}

// Demo data to simulate realistic extraction results
const DEMO_RESULTS: Partial<BatchFile>[] = [
  { vendor: 'Amazon Web Services', amount: '$1,194.00', glCode: '6020', isDuplicate: false, needsReview: false },
  { vendor: 'Stripe, Inc.', amount: '$2,400.00', glCode: '6120', isDuplicate: true, needsReview: false },
  { vendor: 'FedEx', amount: '$347.85', glCode: '6110', isDuplicate: false, needsReview: false },
  { vendor: 'Slack Technologies', amount: '$87.50', glCode: '6020', isDuplicate: false, needsReview: false },
  { vendor: 'Google LLC', amount: '$1,250.00', glCode: '6040', isDuplicate: false, needsReview: false },
  { vendor: 'Comcast Business', amount: '$189.99', glCode: '6060', isDuplicate: false, needsReview: false },
  { vendor: 'Dell Technologies', amount: '$2,899.00', glCode: '6090', isDuplicate: false, needsReview: true },
  { vendor: 'WeWork', amount: '$3,200.00', glCode: '6070', isDuplicate: false, needsReview: false },
  { vendor: 'Unknown Vendor', amount: '$5,000.00', glCode: '6000', isDuplicate: false, needsReview: true },
  { vendor: 'UPS', amount: '$214.40', glCode: '6110', isDuplicate: false, needsReview: false },
]

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

// Simulate processing with the existing API (or mock for demo)
async function processFileMock(file: BatchFile, demoIndex: number): Promise<Partial<BatchFile>> {
  await sleep(800 + Math.random() * 600)
  const result = DEMO_RESULTS[demoIndex % DEMO_RESULTS.length]
  return result
}

export default function BatchPage() {
  const [files, setFiles] = useState<BatchFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = useCallback((newFiles: File[]) => {
    if (newFiles.length === 0) return
    const limited = newFiles.slice(0, 50)
    const mapped: BatchFile[] = limited.map((f, i) => ({
      id: `${Date.now()}-${i}`,
      name: f.name,
      size: f.size,
      status: 'queued',
    }))
    setFiles((prev) => [...prev, ...mapped].slice(0, 50))
    setIsDone(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const dropped = Array.from(e.dataTransfer.files).filter(
        (f) => f.type === 'application/pdf' || f.type.startsWith('image/')
      )
      addFiles(dropped)
    },
    [addFiles]
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files))
  }

  const updateFile = (id: string, updates: Partial<BatchFile>) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)))
  }

  const processAll = async () => {
    if (files.length === 0 || isProcessing) return
    setIsProcessing(true)
    setIsDone(false)

    const CONCURRENCY = 5
    const queue = [...files]
    let index = 0

    const processNext = async () => {
      while (queue.length > 0) {
        const file = queue.shift()
        if (!file) break
        const demoIdx = index++

        updateFile(file.id, { status: 'extracting' })
        await sleep(700 + Math.random() * 400)
        updateFile(file.id, { status: 'categorizing' })
        const result = await processFileMock(file, demoIdx)
        updateFile(file.id, { status: 'done', ...result })
      }
    }

    const workers = Array.from({ length: Math.min(CONCURRENCY, files.length) }, () => processNext())
    await Promise.all(workers)

    setIsProcessing(false)
    setIsDone(true)
  }

  const reset = () => {
    setFiles([])
    setIsDone(false)
    setIsProcessing(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  const doneCount = files.filter((f) => f.status === 'done').length
  const duplicateCount = files.filter((f) => f.isDuplicate).length
  const reviewCount = files.filter((f) => f.needsReview).length
  const errorCount = files.filter((f) => f.status === 'error').length

  return (
    <div className="min-h-screen bg-[#0f0f14] text-[#e2e8f0]">
      <Navbar variant="landing" />

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors mb-4 inline-block">
            ← Back to home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-3">Batch Invoice Processing</h1>
          <p className="text-white/40 text-lg">
            Upload up to 50 invoices at once. AI processes them in parallel — extraction, GL coding, and duplicate detection all at once.
          </p>
        </div>

        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => !isProcessing && inputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all mb-6 ${
            isDragging
              ? 'border-[#4f8ef7] bg-[#4f8ef7]/5'
              : 'border-white/10 bg-[#1a1a24] hover:border-white/20'
          } ${isProcessing ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".pdf,image/*"
            className="hidden"
            onChange={handleFileInput}
            disabled={isProcessing}
          />
          <div className="w-12 h-12 bg-[#4f8ef7]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-[#4f8ef7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="text-white font-medium mb-1">Drop up to 50 invoice files here</p>
          <p className="text-sm text-white/40">PDF, JPG, PNG — or click to browse</p>
          {files.length > 0 && (
            <p className="text-xs text-[#4f8ef7] mt-3">{files.length} file{files.length !== 1 ? 's' : ''} queued</p>
          )}
        </div>

        {/* Controls */}
        {files.length > 0 && (
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={processAll}
              disabled={isProcessing || isDone}
              className="px-6 py-2.5 bg-[#4f8ef7] hover:bg-[#4f8ef7]/80 disabled:opacity-50 text-white font-semibold rounded-xl transition-all text-sm"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing {doneCount} of {files.length}...
                </span>
              ) : isDone ? (
                'Processing complete'
              ) : (
                `Process ${files.length} invoice${files.length !== 1 ? 's' : ''} →`
              )}
            </button>
            <button
              onClick={reset}
              disabled={isProcessing}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 disabled:opacity-50 text-white/60 font-medium rounded-xl transition-all text-sm border border-white/10"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Summary banner */}
        {isDone && (
          <div className="bg-green-400/5 border border-green-400/20 rounded-xl p-4 mb-6 flex flex-wrap gap-6 items-center">
            <div className="text-sm font-semibold text-green-400">
              {doneCount} invoice{doneCount !== 1 ? 's' : ''} processed
            </div>
            {duplicateCount > 0 && (
              <div className="text-sm text-yellow-400">
                &#9888; {duplicateCount} duplicate{duplicateCount !== 1 ? 's' : ''} flagged
              </div>
            )}
            {reviewCount > 0 && (
              <div className="text-sm text-orange-400">
                &#128065; {reviewCount} need{reviewCount === 1 ? 's' : ''} review
              </div>
            )}
            {errorCount > 0 && (
              <div className="text-sm text-red-400">
                &#10007; {errorCount} error{errorCount !== 1 ? 's' : ''}
              </div>
            )}
            <Link
              href="/dashboard"
              className="ml-auto text-sm text-[#4f8ef7] hover:text-white transition-colors font-medium"
            >
              View in dashboard →
            </Link>
          </div>
        )}

        {/* File queue */}
        {files.length > 0 && (
          <div className="bg-[#1a1a24] border border-white/10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-0 px-5 py-3 border-b border-white/5">
              <div className="text-xs text-white/30 uppercase tracking-wider font-medium">File</div>
              <div className="text-xs text-white/30 uppercase tracking-wider font-medium">Status</div>
              <div className="text-xs text-white/30 uppercase tracking-wider font-medium">Vendor</div>
              <div className="text-xs text-white/30 uppercase tracking-wider font-medium text-right">Amount</div>
              <div className="text-xs text-white/30 uppercase tracking-wider font-medium">GL Code</div>
            </div>
            <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto">
              {files.map((file) => (
                <div
                  key={file.id}
                  className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-0 px-5 py-3 items-center ${
                    file.isDuplicate ? 'bg-yellow-400/[0.03]' : ''
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <svg className="w-3.5 h-3.5 text-white/20 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-xs text-white/60 truncate">{file.name}</span>
                    <span className="text-xs text-white/20 flex-shrink-0">{formatBytes(file.size)}</span>
                  </div>
                  <div className={`text-xs font-medium ${STATUS_COLORS[file.status]}`}>
                    {file.status === 'extracting' || file.status === 'categorizing' ? (
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 border border-current border-t-transparent rounded-full animate-spin" />
                        {STATUS_LABELS[file.status]}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        {file.status === 'done' && (
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        )}
                        {STATUS_LABELS[file.status]}
                        {file.isDuplicate && <span className="text-yellow-400 text-xs ml-1">&#9888;</span>}
                        {file.needsReview && !file.isDuplicate && <span className="text-orange-400 text-xs ml-1">&#128065;</span>}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-white/50 truncate">{file.vendor || '—'}</div>
                  <div className="text-xs text-white/60 text-right">{file.amount || '—'}</div>
                  <div className="text-xs text-[#4f8ef7]/70">{file.glCode ? `${file.glCode}` : '—'}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {files.length === 0 && (
          <div className="text-center py-16 text-white/20">
            <p className="text-sm">No files yet — drop some invoices above to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}
