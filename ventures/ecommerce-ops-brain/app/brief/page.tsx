'use client'

import { useState } from 'react'

const SAMPLE_DATA = `Date: March 21, 2026
Yesterday Revenue: $3,842
7-Day Average Revenue: $4,610
Orders Yesterday: 38
Orders 7-Day Avg: 44

SKU Inventory Levels:
- Pro Training Shorts (SKU-001): 12 units, avg 4 sales/day
- Compression Tights (SKU-002): 89 units, avg 6 sales/day
- Running Vest (SKU-003): 5 units, avg 3 sales/day
- Performance Hoodie (SKU-004): 0 units (OUT OF STOCK)

Open Support Tickets:
- 3 WISMO tickets (>24 hrs unresolved)
- 2 return requests
- 1 product question

Top products by revenue: Compression Tights ($1,420), Pro Training Shorts ($980), Running Vest ($640)`

export default function DailyBriefPage() {
  const [salesSummary, setSalesSummary] = useState('')
  const [generating, setGenerating] = useState(false)
  const [briefing, setBriefing] = useState('')
  const [copied, setCopied] = useState(false)

  async function generateBrief() {
    if (!salesSummary.trim()) return
    setGenerating(true)
    setBriefing('')

    try {
      const res = await fetch('/api/daily-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          salesSummary,
          storeInfo: { name: 'Velocity Athletics' },
        }),
      })
      const data = await res.json()
      setBriefing(data.content || '')
    } catch (err) {
      console.error(err)
      setBriefing('Error generating briefing. Please try again.')
    }

    setGenerating(false)
  }

  async function copyToClipboard() {
    await navigator.clipboard.writeText(briefing)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function loadSample() {
    setSalesSummary(SAMPLE_DATA)
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div style={{ padding: '32px', maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(249, 115, 22, 0.1)',
          border: '1px solid rgba(249, 115, 22, 0.3)',
          borderRadius: '100px',
          padding: '4px 14px',
          marginBottom: '16px',
        }}>
          <span style={{ width: '6px', height: '6px', background: '#f97316', borderRadius: '50%', display: 'inline-block' }}></span>
          <span style={{ fontSize: '12px', color: '#f97316', fontWeight: 600 }}>{today}</span>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px' }}>
          Daily Operations Briefing
        </h1>
        <p style={{ color: '#64748b', fontSize: '15px' }}>
          Paste yesterday&apos;s sales summary and get your morning briefing in 60 seconds. Know exactly what needs attention before your first coffee.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Input Panel */}
        <div>
          <div style={{
            background: '#0f1624',
            border: '1px solid #1e293b',
            borderRadius: '16px',
            padding: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', marginBottom: '2px' }}>
                  Sales Summary Input
                </div>
                <div style={{ fontSize: '12px', color: '#475569' }}>
                  Paste CSV, text export, or any format
                </div>
              </div>
              <button
                onClick={loadSample}
                style={{
                  background: 'transparent',
                  border: '1px solid #1e293b',
                  borderRadius: '6px',
                  padding: '5px 12px',
                  fontSize: '12px',
                  color: '#64748b',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                Load Sample
              </button>
            </div>

            <textarea
              value={salesSummary}
              onChange={(e) => setSalesSummary(e.target.value)}
              placeholder={`Paste your data here. Accepts any format:\n\n• Shopify sales export (CSV)\n• Copy-pasted text from your analytics\n• Manual notes: "Revenue yesterday: $4,200, 3 open tickets..."\n\nThe AI figures out the rest.`}
              rows={16}
              style={{
                width: '100%',
                background: '#080c14',
                border: '1px solid #1e293b',
                borderRadius: '10px',
                padding: '14px',
                fontSize: '13px',
                color: '#cbd5e1',
                lineHeight: 1.6,
                resize: 'vertical',
                outline: 'none',
                fontFamily: 'monospace',
                marginBottom: '16px',
              }}
            />

            <button
              onClick={generateBrief}
              disabled={generating || !salesSummary.trim()}
              style={{
                width: '100%',
                background: generating || !salesSummary.trim()
                  ? '#1e293b'
                  : 'linear-gradient(135deg, #f97316, #ea580c)',
                color: generating || !salesSummary.trim() ? '#64748b' : 'white',
                border: 'none',
                padding: '13px 24px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: generating || !salesSummary.trim() ? 'not-allowed' : 'pointer',
                boxShadow: generating || !salesSummary.trim() ? 'none' : '0 0 20px rgba(249, 115, 22, 0.2)',
              }}
            >
              {generating ? '⏳ Generating briefing...' : '☀️ Generate Morning Briefing'}
            </button>
          </div>

          {/* What it covers */}
          <div style={{
            background: '#0f1624',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '18px',
            marginTop: '16px',
          }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
              Your briefing covers
            </div>
            {[
              { icon: '🚨', label: 'Stockout alerts', desc: 'SKUs with <7 days of stock' },
              { icon: '🎫', label: 'Open tickets', desc: 'Unresolved >24 hours by type' },
              { icon: '📈', label: 'Revenue snapshot', desc: 'Yesterday vs 7-day average' },
              { icon: '✍️', label: 'Content opportunity', desc: 'Top product needing copy refresh' },
              { icon: '→', label: 'Recommended action', desc: 'One thing to do right now' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9' }}>{item.label}</div>
                  <div style={{ fontSize: '12px', color: '#475569' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Output Panel */}
        <div>
          {briefing ? (
            <div style={{
              background: '#0f1624',
              border: '1px solid rgba(249, 115, 22, 0.3)',
              borderRadius: '16px',
              overflow: 'hidden',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: '1px solid #1e293b',
                background: 'rgba(249, 115, 22, 0.05)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>☀️</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#f97316' }}>Morning Briefing Ready</span>
                  <span style={{ fontSize: '12px', color: '#475569' }}>~60 second read</span>
                </div>
                <button
                  onClick={copyToClipboard}
                  style={{
                    background: copied ? 'rgba(34, 197, 94, 0.15)' : 'rgba(249, 115, 22, 0.15)',
                    color: copied ? '#22c55e' : '#f97316',
                    border: `1px solid ${copied ? 'rgba(34, 197, 94, 0.3)' : 'rgba(249, 115, 22, 0.3)'}`,
                    padding: '5px 14px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
              <div style={{ padding: '24px' }}>
                <pre style={{
                  whiteSpace: 'pre-wrap',
                  fontSize: '14px',
                  color: '#cbd5e1',
                  lineHeight: 1.8,
                  fontFamily: 'inherit',
                  margin: 0,
                }}>
                  {briefing}
                </pre>
              </div>
            </div>
          ) : (
            <div style={{
              background: '#0f1624',
              border: '1px dashed #1e293b',
              borderRadius: '16px',
              padding: '64px 32px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>☀️</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#64748b', marginBottom: '8px' }}>
                Your briefing will appear here
              </div>
              <div style={{ fontSize: '14px', color: '#475569', maxWidth: '260px', margin: '0 auto', lineHeight: 1.6 }}>
                Paste any sales data on the left — CSV, text, or free-form notes. AI handles the rest.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
