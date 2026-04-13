'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { DocumentType, DOCUMENT_TYPES, Practice } from '@/types'
import { downloadTextFile, copyToClipboard } from '@/lib/utils'

interface PolicyGeneratorProps {
  practice: Practice
}

const LOADING_MESSAGES = [
  'Analyzing your practice profile...',
  'Reviewing HIPAA requirements for your state...',
  'Customizing for your practice type...',
  'Drafting practice-specific language...',
  'Adding required regulatory elements...',
  'Finalizing your document...',
]

export default function PolicyGenerator({ practice }: PolicyGeneratorProps) {
  const [selectedType, setSelectedType] = useState<DocumentType>('privacy_policy')
  const [generating, setGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [generatedTitle, setGeneratedTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0)
  const [savedDocuments, setSavedDocuments] = useState<{ type: DocumentType; title: string; id: string }[]>([])

  const generatePolicy = async () => {
    setGenerating(true)
    setError(null)
    setGeneratedContent(null)
    setLoadingMessageIndex(0)

    // Cycle through loading messages
    const interval = setInterval(() => {
      setLoadingMessageIndex(prev => (prev + 1) % LOADING_MESSAGES.length)
    }, 2000)

    try {
      const res = await fetch('/api/generate-policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          practiceId: practice.id,
          documentType: selectedType,
          practiceInfo: {
            name: practice.name,
            type: practice.practice_type,
            state: practice.state,
            providerCount: practice.provider_count,
          },
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Generation failed')
      }

      setGeneratedContent(data.content)
      setGeneratedTitle(data.title || DOCUMENT_TYPES[selectedType])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate policy')
    } finally {
      clearInterval(interval)
      setGenerating(false)
    }
  }

  const saveDocument = async () => {
    if (!generatedContent) return

    const { data, error } = await supabase
      .from('policy_documents')
      .insert({
        practice_id: practice.id,
        document_type: selectedType,
        title: generatedTitle,
        content: generatedContent,
        version: 1,
      })
      .select()
      .single()

    if (error) {
      console.error('Save error:', error)
      return
    }

    setSaved(true)
    setSavedDocuments(prev => [...prev, { type: selectedType, title: generatedTitle, id: data.id }])
    setTimeout(() => setSaved(false), 3000)
  }

  const handleCopy = async () => {
    if (!generatedContent) return
    await copyToClipboard(generatedContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!generatedContent) return
    const filename = `${generatedTitle.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`
    downloadTextFile(generatedContent, filename)
  }

  const documentTypeOptions: { value: DocumentType; label: string; description: string; time: string }[] = [
    {
      value: 'privacy_policy',
      label: 'Notice of Privacy Practices',
      description: 'Required patient-facing document explaining PHI use',
      time: '~45 seconds',
    },
    {
      value: 'security_policy',
      label: 'HIPAA Security Policy',
      description: 'Comprehensive security safeguards policy for your practice',
      time: '~60 seconds',
    },
    {
      value: 'workforce_training',
      label: 'Workforce Training Policy',
      description: 'Training requirements, curriculum, and attestation forms',
      time: '~45 seconds',
    },
    {
      value: 'baa_template',
      label: 'BAA Template',
      description: 'Business Associate Agreement for vendor relationships',
      time: '~45 seconds',
    },
    {
      value: 'risk_assessment',
      label: 'Annual Risk Assessment',
      description: 'Required HIPAA risk analysis with threat/vulnerability matrix',
      time: '~60 seconds',
    },
    {
      value: 'sanctions_policy',
      label: 'Workforce Sanctions Policy',
      description: 'Violation categories and disciplinary procedures',
      time: '~30 seconds',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Document Type Selection */}
      <div>
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">
          Select Document Type
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {documentTypeOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => {
                setSelectedType(opt.value)
                setGeneratedContent(null)
              }}
              className={`text-left p-4 rounded-xl border transition-all ${
                selectedType === opt.value
                  ? 'border-teal-500/40 bg-teal-500/10'
                  : 'border-white/10 bg-white/2 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className={`text-sm font-medium mb-1 ${selectedType === opt.value ? 'text-teal-400' : 'text-gray-200'}`}>
                    {opt.label}
                  </p>
                  <p className="text-xs text-gray-500">{opt.description}</p>
                </div>
                <span className="text-xs text-gray-600 shrink-0 mt-0.5">{opt.time}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Practice Info Preview */}
      <div className="bg-white/3 rounded-xl p-4 border border-white/8">
        <p className="text-xs text-gray-500 mb-2">Generating for:</p>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-white font-medium">{practice.name}</span>
          <span className="text-gray-400 capitalize">{practice.practice_type.replace('_', ' ')}</span>
          <span className="text-gray-400">{practice.state}</span>
          <span className="text-gray-400">{practice.provider_count} provider(s)</span>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generatePolicy}
        disabled={generating}
        className="w-full py-4 px-6 rounded-xl font-semibold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: generating ? 'rgba(0, 212, 170, 0.1)' : 'rgba(0, 212, 170, 0.15)',
          color: '#00d4aa',
          border: '1px solid rgba(0, 212, 170, 0.3)',
        }}
      >
        {generating ? (
          <span className="flex items-center justify-center gap-3">
            <span className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
            Generating...
          </span>
        ) : (
          `Generate ${documentTypeOptions.find(d => d.value === selectedType)?.label}`
        )}
      </button>

      {/* Loading State */}
      <AnimatePresence>
        {generating && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 border-2 border-teal-500/20 rounded-full" />
                <div className="absolute inset-0 w-16 h-16 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingMessageIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-teal-400 text-sm font-medium"
                >
                  {LOADING_MESSAGES[loadingMessageIndex]}
                </motion.p>
              </AnimatePresence>
              <p className="text-xs text-gray-600">
                Claude is creating a practice-specific document for {practice.name}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Generated Document */}
      <AnimatePresence>
        {generatedContent && !generating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">{generatedTitle}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 text-gray-400 hover:text-gray-200 hover:border-white/20 transition-all"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 text-gray-400 hover:text-gray-200 hover:border-white/20 transition-all"
                >
                  Download .txt
                </button>
                <button
                  onClick={saveDocument}
                  disabled={saved}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: 'rgba(0, 212, 170, 0.15)',
                    color: '#00d4aa',
                    border: '1px solid rgba(0, 212, 170, 0.3)',
                  }}
                >
                  {saved ? '✓ Saved' : 'Save to Library'}
                </button>
              </div>
            </div>

            <div
              className="bg-[#0d0d14] border border-white/8 rounded-xl p-6 max-h-[600px] overflow-y-auto"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed font-sans">
                {generatedContent}
              </pre>
            </div>

            <p className="text-xs text-gray-600">
              This document has been generated by AI based on HIPAA regulations. Review with a qualified healthcare attorney before official use.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Saved Documents */}
      {savedDocuments.length > 0 && (
        <div className="border-t border-white/10 pt-6">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-3">
            Saved This Session
          </h3>
          <div className="space-y-2">
            {savedDocuments.map(doc => (
              <div key={doc.id} className="flex items-center gap-3 text-sm">
                <span className="text-teal-400">✓</span>
                <span className="text-gray-300">{doc.title}</span>
                <span className="text-gray-600 text-xs">Saved to library</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
