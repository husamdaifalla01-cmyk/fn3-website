'use client'

import { useState, useRef } from 'react'
import type { ActionItem, Decision } from '@/lib/supabase'
import {
  ResultCard,
  SummaryContent,
  ActionItemsContent,
  DecisionsContent,
  FollowUpEmailContent,
} from './ResultCard'

type AnalysisResult = {
  summary: string
  actionItems: ActionItem[]
  decisions: Decision[]
  followUpEmail: string
}

const SAMPLE_TRANSCRIPT = `[00:00:02] Sarah Chen: Alright, let's get started. We've got a lot to cover for the Apex product kickoff. Marcus and Jamie, thanks for joining.

[00:00:09] Marcus Rivera: Happy to be here. I've reviewed the brief — excited to dig in.

[00:00:14] Jamie Osei: Same. I have a few questions about timeline once we get there.

[00:00:19] Sarah Chen: Perfect. So the goal today is to align on scope, assign ownership, and lock in the first milestone. Let's start with the core feature set. We're launching with onboarding, dashboard, and the reporting module. Analytics can wait for v2.

[00:00:38] Marcus Rivera: Agreed. Analytics would push us out another six weeks minimum. Good call to defer it.

[00:00:44] Jamie Osei: I'm fine with that. One thing — the dashboard needs the new design system components, not the old ones. Can we confirm that's decided?

[00:00:53] Sarah Chen: Yes, confirmed. We build on the new design system. No legacy components in this release.

[00:01:01] Sarah Chen: Okay, actions. Marcus, can you draft the technical spec for the onboarding flow? We need that before engineering kicks off next week.

[00:01:11] Marcus Rivera: I'll have it done by Wednesday EOD.

[00:01:14] Sarah Chen: Great. Jamie, can you set up the staging environment and share access credentials with the team?

[00:01:20] Jamie Osei: Sure. I'll get that done by end of day tomorrow.

[00:01:24] Sarah Chen: And I'll schedule the design review with the stakeholders — aiming for next Thursday. I'll send a calendar invite by end of week.

[00:01:33] Marcus Rivera: One more thing — we should decide on the API authentication approach. JWT or OAuth?

[00:01:40] Jamie Osei: JWT is simpler for v1. OAuth adds overhead we don't need yet.

[00:01:45] Sarah Chen: Agreed. JWT for v1. We revisit OAuth when we add third-party integrations.

[00:01:51] Sarah Chen: Good. Next sync is same time next week. Talk soon.`

type LoadingStep = 'extracting' | 'identifying' | 'drafting' | null

const LOADING_STEPS = [
  { key: 'extracting', label: 'Extracting summary...' },
  { key: 'identifying', label: 'Identifying action items...' },
  { key: 'drafting', label: 'Drafting follow-up...' },
]

export default function MeetingAnalyzer() {
  const [inputMode, setInputMode] = useState<'paste' | 'upload'>('paste')
  const [transcript, setTranscript] = useState('')
  const [title, setTitle] = useState('')
  const [participants, setParticipants] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState<LoadingStep>(null)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (file: File) => {
    setFileName(file.name)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/parse-vtt', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
        return
      }
      setTranscript(data.transcript)
    } catch {
      setError('Failed to parse file. Please try pasting the transcript instead.')
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFileUpload(file)
  }

  const simulateLoadingSteps = async () => {
    for (const step of LOADING_STEPS) {
      setLoadingStep(step.key as LoadingStep)
      await new Promise((r) => setTimeout(r, 800))
    }
  }

  const handleAnalyze = async () => {
    if (!transcript.trim()) {
      setError('Please paste or upload a meeting transcript.')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    const stepPromise = simulateLoadingSteps()

    try {
      const participantList = participants
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean)

      const res = await fetch('/api/analyze-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript,
          title: title || undefined,
          participants: participantList.length > 0 ? participantList : undefined,
        }),
      })

      await stepPromise

      const data = await res.json()

      if (data.error) {
        setError(data.error)
        return
      }

      setResult(data)
    } catch {
      await stepPromise
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
      setLoadingStep(null)
    }
  }

  const actionItemsCopyText = result?.actionItems
    .map(
      (item, i) =>
        `${i + 1}. ${item.task}\n   Owner: ${item.owner} | Due: ${item.deadline} | Priority: ${item.priority}`
    )
    .join('\n\n') ?? ''

  const decisionsCopyText = result?.decisions
    .map((d, i) => `${i + 1}. ${d.decision}\n   Context: ${d.context}`)
    .join('\n\n') ?? ''

  return (
    <div className="max-w-3xl mx-auto">
      {/* Input section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Analyze your meeting</h2>

        {/* Mode toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6 w-fit">
          <button
            onClick={() => setInputMode('paste')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              inputMode === 'paste'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Paste transcript
          </button>
          <button
            onClick={() => setInputMode('upload')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              inputMode === 'upload'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Upload .vtt / .txt
          </button>
        </div>

        {/* Transcript input */}
        {inputMode === 'paste' ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Paste your transcript below</span>
              <button
                onClick={() => setTranscript(SAMPLE_TRANSCRIPT)}
                className="text-sm font-medium text-brand-600 hover:text-brand-700 underline underline-offset-2 transition-colors"
              >
                Load sample transcript
              </button>
            </div>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste your meeting transcript here..."
              className="w-full h-48 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>
        ) : (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-400 hover:bg-brand-50 transition-colors"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".vtt,.txt"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(file)
              }}
            />
            <span className="text-4xl mb-3">📎</span>
            {fileName ? (
              <>
                <p className="font-medium text-gray-900">{fileName}</p>
                <p className="text-sm text-green-600 mt-1">File loaded successfully</p>
              </>
            ) : (
              <>
                <p className="font-medium text-gray-700">Drop your file here or click to browse</p>
                <p className="text-sm text-gray-500 mt-1">Supports .vtt and .txt files</p>
              </>
            )}
          </div>
        )}

        {/* Optional fields */}
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Meeting title <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Q2 Planning Call"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Participants <span className="text-gray-400 font-normal">(optional, comma-separated)</span>
            </label>
            <input
              type="text"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              placeholder="e.g., Sarah, Marcus, Alex"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 text-red-700 text-sm px-4 py-3 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading || !transcript.trim()}
          className="mt-6 w-full bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl text-lg transition-colors"
        >
          {loading ? 'Analyzing...' : 'Analyze Meeting'}
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="bg-brand-50 border border-brand-200 rounded-2xl p-8 mb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="space-y-2">
            {LOADING_STEPS.map((step) => (
              <div
                key={step.key}
                className={`text-sm transition-all ${
                  loadingStep === step.key
                    ? 'text-brand-700 font-semibold'
                    : 'text-brand-400'
                }`}
              >
                {loadingStep === step.key && '→ '}{step.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900">Analysis complete</h3>
            <button
              onClick={() => {
                // TODO: save to dashboard with auth
                alert('Sign in to save meetings to your dashboard')
              }}
              className="text-sm font-medium text-brand-600 hover:text-brand-700 border border-brand-200 hover:border-brand-400 px-4 py-2 rounded-lg transition-colors"
            >
              Save to dashboard
            </button>
          </div>

          <ResultCard
            title="Meeting Summary"
            icon="📋"
            copyText={result.summary}
          >
            <SummaryContent summary={result.summary} />
          </ResultCard>

          <ResultCard
            title={`Action Items (${result.actionItems.length})`}
            icon="✅"
            copyText={actionItemsCopyText}
          >
            <ActionItemsContent items={result.actionItems} />
          </ResultCard>

          <ResultCard
            title={`Decisions (${result.decisions.length})`}
            icon="🔖"
            copyText={decisionsCopyText}
          >
            <DecisionsContent decisions={result.decisions} />
          </ResultCard>

          <ResultCard
            title="Follow-up Email"
            icon="✉️"
            copyText={result.followUpEmail}
          >
            <FollowUpEmailContent email={result.followUpEmail} />
          </ResultCard>
        </div>
      )}
    </div>
  )
}
