'use client'

import { useState } from 'react'

const SAMPLE_CSV = `order_id,product,reason,date
1001,Pro Training Shorts,size too small,2026-03-01
1002,Pro Training Shorts,size too small,2026-03-02
1003,Compression Tights,quality issue - stitching came apart,2026-03-03
1004,Running Vest,changed mind,2026-03-04
1005,Pro Training Shorts,size too small,2026-03-05
1006,Compression Tights,quality issue - seam failure,2026-03-06
1007,Performance Hoodie,changed mind,2026-03-07
1008,Pro Training Shorts,not as described,2026-03-08
1009,Compression Tights,quality issue - color faded after wash,2026-03-09
1010,Running Vest,changed mind,2026-03-10
1011,Performance Hoodie,wrong item received,2026-03-11
1012,Pro Training Shorts,size runs small,2026-03-12
1013,Compression Tights,quality issue - pilling after 2 wears,2026-03-13
1014,Running Vest,changed mind,2026-03-14
1015,Pro Training Shorts,size too small,2026-03-15`

export default function ReturnsPage() {
  const [returnsData, setReturnsData] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleAnalyze() {
    if (!returnsData.trim()) return
    setAnalyzing(true)
    setAnalysis('')

    try {
      const res = await fetch('/api/returns-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          returnsData,
          storeInfo: { name: 'Velocity Athletics' },
        }),
      })
      const data = await res.json()
      setAnalysis(data.content || '')
    } catch (err) {
      console.error(err)
      setAnalysis('Error analyzing data. Please try again.')
    }

    setAnalyzing(false)
  }

  async function copyToClipboard() {
    await navigator.clipboard.writeText(analysis)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ padding: '32px', maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px' }}>
          Returns Intelligence
        </h1>
        <p style={{ color: '#64748b', fontSize: '15px' }}>
          Paste your return/refund data and get AI-powered pattern analysis — size issues, quality clusters, description gaps, and policy recommendations.
        </p>
      </div>

      {/* Stats bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '32px',
      }}>
        {[
          { label: 'Avg Return Rate', value: '8.2%', sub: 'Industry avg: 20%', color: '#22c55e' },
          { label: 'Top Return Reason', value: 'Sizing', sub: 'Across all SKUs', color: '#f97316' },
          { label: 'Preventable Returns', value: '~60%', sub: 'With better descriptions', color: '#8b5cf6' },
          { label: 'Revenue Recovered', value: '$0', sub: 'Run analysis to see impact', color: '#64748b' },
        ].map((stat, i) => (
          <div key={i} style={{
            background: '#0f1624',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '18px 20px',
          }}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '6px', fontWeight: 500 }}>{stat.label}</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Input */}
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
                  Return Data Input
                </div>
                <div style={{ fontSize: '12px', color: '#475569' }}>
                  CSV format: order_id, product, reason, date
                </div>
              </div>
              <button
                onClick={() => setReturnsData(SAMPLE_CSV)}
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
              value={returnsData}
              onChange={(e) => setReturnsData(e.target.value)}
              placeholder={`Paste CSV data or free-form return notes:\n\norder_id,product,reason,date\n1001,Pro Training Shorts,size too small,2026-03-01\n1002,Compression Tights,quality issue,2026-03-02\n...\n\nOr paste plain text:\n"15 returns this month — 8 size complaints on Training Shorts, 4 quality issues on Compression Tights..."`}
              rows={18}
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
                boxSizing: 'border-box',
              }}
            />

            <button
              onClick={handleAnalyze}
              disabled={analyzing || !returnsData.trim()}
              style={{
                width: '100%',
                background: analyzing || !returnsData.trim()
                  ? '#1e293b'
                  : 'linear-gradient(135deg, #f97316, #ea580c)',
                color: analyzing || !returnsData.trim() ? '#64748b' : 'white',
                border: 'none',
                padding: '13px 24px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: analyzing || !returnsData.trim() ? 'not-allowed' : 'pointer',
                boxShadow: analyzing || !returnsData.trim() ? 'none' : '0 0 20px rgba(249, 115, 22, 0.2)',
              }}
            >
              {analyzing ? '⏳ Analyzing patterns...' : '🔍 Analyze Returns'}
            </button>
          </div>

          {/* What AI finds */}
          <div style={{
            background: '#0f1624',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '18px',
            marginTop: '16px',
          }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
              AI analyzes for
            </div>
            {[
              { icon: '📊', label: 'Top return reasons', desc: 'Ranked by product and frequency' },
              { icon: '📏', label: 'Size issue detection', desc: '"Runs small" pattern from complaints' },
              { icon: '⚠️', label: 'Quality clusters', desc: 'Same product, similar complaints' },
              { icon: '✍️', label: 'Description gaps', desc: 'What to add to prevent returns' },
              { icon: '📋', label: 'Policy recommendations', desc: 'Data-backed policy changes' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ fontSize: '14px', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>{item.label}</div>
                  <div style={{ fontSize: '12px', color: '#475569' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Output */}
        <div>
          {analysis ? (
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
                  <span style={{ fontSize: '16px' }}>🔍</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#f97316' }}>Returns Intelligence Report</span>
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
                  fontSize: '13px',
                  color: '#cbd5e1',
                  lineHeight: 1.8,
                  fontFamily: 'inherit',
                  margin: 0,
                }}>
                  {analysis}
                </pre>
              </div>
            </div>
          ) : (
            <div style={{
              background: '#0f1624',
              border: '1px dashed #1e293b',
              borderRadius: '16px',
              padding: '80px 32px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>↩️</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#64748b', marginBottom: '8px' }}>
                Returns intelligence report appears here
              </div>
              <div style={{ fontSize: '14px', color: '#475569', maxWidth: '280px', margin: '0 auto', lineHeight: 1.6 }}>
                Paste your return data on the left — CSV export from Shopify or plain text. AI identifies patterns you&apos;d miss manually.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
