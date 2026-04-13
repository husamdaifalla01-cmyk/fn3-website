'use client'

import { useState } from 'react'

const LAUNCH_SECTIONS = [
  { key: 'SECTION 1', label: 'Product Description', icon: '📝', desc: 'Shopify-ready copy' },
  { key: 'SECTION 2', label: 'SEO Meta', icon: '🔍', desc: 'Title + description' },
  { key: 'SECTION 3', label: 'Launch Email', icon: '📧', desc: 'Subject + body' },
  { key: 'SECTION 4', label: 'Social Posts', icon: '📱', desc: 'Instagram, TikTok, Twitter/X' },
  { key: 'SECTION 5', label: 'Abandoned Cart Email', icon: '🛒', desc: 'Product-specific recovery' },
  { key: 'SECTION 6', label: 'FAQ Section', icon: '❓', desc: '5 buyer questions' },
]

function FormField({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
  rows = 3,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  multiline?: boolean
  rows?: number
}) {
  const baseStyle: React.CSSProperties = {
    width: '100%',
    background: '#080c14',
    border: '1px solid #1e293b',
    borderRadius: '8px',
    padding: '10px 12px',
    fontSize: '13px',
    color: '#f1f5f9',
    outline: 'none',
    fontFamily: 'inherit',
    marginBottom: '14px',
    boxSizing: 'border-box',
  }

  return (
    <div>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '5px' }}>
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          style={{ ...baseStyle, resize: 'vertical' }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={baseStyle}
        />
      )}
    </div>
  )
}

function parseSections(content: string): Record<string, string> {
  const result: Record<string, string> = {}
  // Split on --- dividers and parse each block
  const blocks = content.split(/\n---\n/)
  for (const block of blocks) {
    const trimmed = block.trim()
    if (!trimmed) continue
    const firstLine = trimmed.split('\n')[0].trim()
    const keyMatch = firstLine.match(/^(SECTION \d+)/)
    if (keyMatch) {
      const key = keyMatch[1]
      const body = trimmed.split('\n').slice(1).join('\n').trim()
      result[key] = body
    }
  }
  // fallback: return full content under first key if no sections parsed
  if (Object.keys(result).length === 0) {
    result['FULL'] = content
  }
  return result
}

export default function LaunchPage() {
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [targetCustomer, setTargetCustomer] = useState('')
  const [pricePoint, setPricePoint] = useState('')
  const [differentiators, setDifferentiators] = useState('')
  const [generating, setGenerating] = useState(false)
  const [rawContent, setRawContent] = useState('')
  const [sections, setSections] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState<string | null>(null)

  async function handleGenerate() {
    if (!productName.trim()) return
    setGenerating(true)
    setRawContent('')
    setSections({})

    try {
      const res = await fetch('/api/product-launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          description,
          targetCustomer,
          pricePoint,
          differentiators,
          storeInfo: { name: 'Velocity Athletics' },
        }),
      })
      const data = await res.json()
      const content = data.content || ''
      setRawContent(content)
      setSections(parseSections(content))
    } catch (err) {
      console.error(err)
    }

    setGenerating(false)
  }

  async function copySection(text: string, key: string) {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const hasSections = Object.keys(sections).length > 0

  return (
    <div style={{ padding: '32px', maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px' }}>
          Product Launch Toolkit
        </h1>
        <p style={{ color: '#64748b', fontSize: '15px' }}>
          Enter your product details once. Get all 6 launch assets — description, SEO, email, social posts, cart recovery, and FAQ — generated in one click.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left: Input */}
        <div>
          <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '18px' }}>
              Product Details
            </div>

            <FormField
              label="Product Name *"
              value={productName}
              onChange={setProductName}
              placeholder="Compression Recovery Tights"
            />
            <FormField
              label="Product Description"
              value={description}
              onChange={setDescription}
              placeholder="High-waist compression tights with gradient compression for post-workout recovery and active wear"
              multiline
              rows={3}
            />
            <FormField
              label="Target Customer"
              value={targetCustomer}
              onChange={setTargetCustomer}
              placeholder="Serious athletes, CrossFit/marathon runners who care about recovery"
            />
            <FormField
              label="Price Point"
              value={pricePoint}
              onChange={setPricePoint}
              placeholder="$89"
            />
            <FormField
              label="Key Differentiators"
              value={differentiators}
              onChange={setDifferentiators}
              placeholder="Medical-grade 25-30mmHg compression, 4-way stretch, moisture-wicking, seamless waistband, 3 colorways"
              multiline
              rows={3}
            />

            <button
              onClick={handleGenerate}
              disabled={generating || !productName.trim()}
              style={{
                width: '100%',
                background: generating || !productName.trim()
                  ? '#1e293b'
                  : 'linear-gradient(135deg, #f97316, #ea580c)',
                color: generating || !productName.trim() ? '#64748b' : 'white',
                border: 'none',
                padding: '13px 24px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: generating || !productName.trim() ? 'not-allowed' : 'pointer',
                boxShadow: generating || !productName.trim() ? 'none' : '0 0 20px rgba(249, 115, 22, 0.2)',
              }}
            >
              {generating ? '⏳ Generating all assets...' : '🚀 Generate Launch Assets'}
            </button>
          </div>

          {/* What's generated */}
          <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '12px', padding: '18px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
              6 Assets Generated
            </div>
            {LAUNCH_SECTIONS.map((section, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '16px' }}>{section.icon}</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: hasSections ? '#f97316' : '#94a3b8' }}>{section.label}</div>
                  <div style={{ fontSize: '11px', color: '#475569' }}>{section.desc}</div>
                </div>
                {hasSections && (
                  <span style={{ marginLeft: 'auto', color: '#22c55e', fontSize: '14px' }}>✓</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Output */}
        <div>
          {!hasSections ? (
            <div style={{
              background: '#0f1624',
              border: '1px dashed #1e293b',
              borderRadius: '16px',
              padding: '80px 32px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#64748b', marginBottom: '8px' }}>
                Complete launch kit appears here
              </div>
              <div style={{ fontSize: '14px', color: '#475569', maxWidth: '300px', margin: '0 auto', lineHeight: 1.6 }}>
                Fill in your product details on the left. One click generates all 6 launch assets, each in its own copy-paste panel.
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {LAUNCH_SECTIONS.map((section, i) => {
                const sectionContent = sections[section.key] || ''
                if (!sectionContent && !rawContent) return null
                const displayContent = sectionContent || (i === 0 ? rawContent : '')
                if (!displayContent) return null

                return (
                  <div key={i} style={{
                    background: '#0f1624',
                    border: '1px solid #1e293b',
                    borderRadius: '16px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 20px',
                      borderBottom: '1px solid #1e293b',
                      background: 'rgba(249, 115, 22, 0.04)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{section.icon}</span>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#f97316' }}>{section.label}</span>
                        <span style={{ fontSize: '12px', color: '#475569' }}>{section.desc}</span>
                      </div>
                      <button
                        onClick={() => copySection(displayContent, section.key)}
                        style={{
                          background: copied === section.key ? 'rgba(34, 197, 94, 0.15)' : 'rgba(249, 115, 22, 0.15)',
                          color: copied === section.key ? '#22c55e' : '#f97316',
                          border: `1px solid ${copied === section.key ? 'rgba(34, 197, 94, 0.3)' : 'rgba(249, 115, 22, 0.3)'}`,
                          padding: '5px 14px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {copied === section.key ? '✓ Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div style={{ padding: '20px' }}>
                      <pre style={{
                        whiteSpace: 'pre-wrap',
                        fontSize: '13px',
                        color: '#cbd5e1',
                        lineHeight: 1.7,
                        fontFamily: 'inherit',
                        margin: 0,
                      }}>
                        {displayContent}
                      </pre>
                    </div>
                  </div>
                )
              })}

              {/* Fallback: show raw if sections didn't parse cleanly */}
              {Object.keys(sections).length === 1 && sections['FULL'] && (
                <div style={{
                  background: '#0f1624',
                  border: '1px solid #1e293b',
                  borderRadius: '16px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 20px',
                    borderBottom: '1px solid #1e293b',
                    background: 'rgba(249, 115, 22, 0.04)',
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#f97316' }}>All Launch Assets</span>
                    <button
                      onClick={() => copySection(sections['FULL'], 'FULL')}
                      style={{
                        background: copied === 'FULL' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(249, 115, 22, 0.15)',
                        color: copied === 'FULL' ? '#22c55e' : '#f97316',
                        border: `1px solid ${copied === 'FULL' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(249, 115, 22, 0.3)'}`,
                        padding: '5px 14px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {copied === 'FULL' ? '✓ Copied!' : 'Copy All'}
                    </button>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <pre style={{ whiteSpace: 'pre-wrap', fontSize: '13px', color: '#cbd5e1', lineHeight: 1.7, fontFamily: 'inherit', margin: 0 }}>
                      {sections['FULL']}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
