'use client'

import { useState } from 'react'

type ContentType = 'product_description' | 'collection_page' | 'abandoned_cart_email' | 'ad_copy' | 'email_sequence' | 'social_post' | 'supplier_negotiation' | 'competitive_analysis'

const CONTENT_TYPES: { id: ContentType, label: string, icon: string, desc: string }[] = [
  { id: 'product_description', label: 'Product Description', icon: '📝', desc: 'SEO title, description, bullets + meta — paste into Shopify admin' },
  { id: 'collection_page', label: 'Collection Page', icon: '🗂️', desc: 'Headline, description + SEO meta for Shopify collections' },
  { id: 'abandoned_cart_email', label: 'Abandoned Cart Emails', icon: '🛒', desc: '3-email recovery sequence for Klaviyo or Shopify Email' },
  { id: 'ad_copy', label: 'Ad Copy', icon: '📣', desc: 'Facebook & Instagram ad variants (3 angles)' },
  { id: 'email_sequence', label: 'Product Launch Emails', icon: '📧', desc: '3-email launch sequence ready for Klaviyo' },
  { id: 'social_post', label: 'Social Post', icon: '📱', desc: 'Instagram captions, hashtag sets + TikTok hooks' },
  { id: 'supplier_negotiation', label: 'Supplier Negotiation', icon: '🤝', desc: 'Data-backed pricing negotiation emails' },
  { id: 'competitive_analysis', label: 'Competitive Positioning', icon: '⚔️', desc: 'Positioning narrative vs 3 competitors — taglines + angles' },
]

interface GeneratedContent {
  type: ContentType
  content: string
  timestamp: Date
}

export default function ContentPage() {
  const [activeType, setActiveType] = useState<ContentType>('product_description')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState<GeneratedContent[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  // Form fields
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('')
  const [keyFeatures, setKeyFeatures] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [supplierName, setSupplierName] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')
  const [orderVolume, setOrderVolume] = useState('')
  const [competitorPrice, setCompetitorPrice] = useState('')
  // Competitive analysis fields
  const [compProductName, setCompProductName] = useState('')
  const [compYourPrice, setCompYourPrice] = useState('')
  const [compUrl1, setCompUrl1] = useState('')
  const [compUrl2, setCompUrl2] = useState('')
  const [compUrl3, setCompUrl3] = useState('')

  async function handleGenerate() {
    setGenerating(true)

    let endpoint = '/api/generate-product-content'
    let body: Record<string, string> = {}

    if (activeType === 'supplier_negotiation') {
      endpoint = '/api/supplier-negotiation'
      body = { supplierName, currentPrice, orderVolume, competitorPrice, storeInfo: JSON.stringify({ name: 'Velocity Athletics' }) }
    } else if (activeType === 'competitive_analysis') {
      endpoint = '/api/competitive-analysis'
      body = {
        productName: compProductName,
        yourPrice: compYourPrice,
        competitorUrl1: compUrl1,
        competitorUrl2: compUrl2,
        competitorUrl3: compUrl3,
        storeInfo: JSON.stringify({ name: 'Velocity Athletics' }),
      }
    } else {
      body = {
        productName,
        category,
        keyFeatures,
        targetAudience,
        contentType: activeType,
        storeInfo: JSON.stringify({ name: 'Velocity Athletics' }),
      }
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      const content = data.content || data.email || JSON.stringify(data, null, 2)
      setGenerated(prev => [{
        type: activeType,
        content,
        timestamp: new Date(),
      }, ...prev].slice(0, 10))
    } catch (err) {
      console.error(err)
    }

    setGenerating(false)
  }

  async function copyToClipboard(text: string, id: string) {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const typeInfo = CONTENT_TYPES.find(t => t.id === activeType)!

  return (
    <div style={{ padding: '32px', maxWidth: '1200px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px' }}>
          Content Engine
        </h1>
        <p style={{ color: '#64748b', fontSize: '15px' }}>
          Generate product descriptions, ad copy, emails, and social posts in seconds
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left Panel */}
        <div>
          {/* Content Type Selector */}
          <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
              Content Type
            </div>
            {CONTENT_TYPES.map(type => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: activeType === type.id ? 'rgba(249, 115, 22, 0.4)' : 'transparent',
                  background: activeType === type.id ? 'rgba(249, 115, 22, 0.08)' : 'transparent',
                  cursor: 'pointer',
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span style={{ fontSize: '18px' }}>{type.icon}</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: activeType === type.id ? '#f97316' : '#f1f5f9' }}>
                    {type.label}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '1px' }}>{type.desc}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Form */}
          <div style={{ background: '#0f1624', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              {typeInfo.icon} {typeInfo.label} Details
            </div>

            {activeType === 'supplier_negotiation' ? (
              <>
                <FormField label="Supplier Name" value={supplierName} onChange={setSupplierName} placeholder="Pacific Sportswear Co." />
                <FormField label="Current Unit Price" value={currentPrice} onChange={setCurrentPrice} placeholder="$12.50/unit" />
                <FormField label="Monthly Order Volume" value={orderVolume} onChange={setOrderVolume} placeholder="500 units" />
                <FormField label="Competitor Price (optional)" value={competitorPrice} onChange={setCompetitorPrice} placeholder="$10.00/unit" />
              </>
            ) : activeType === 'competitive_analysis' ? (
              <>
                <FormField label="Your Product Name" value={compProductName} onChange={setCompProductName} placeholder="Pro Training Shorts" />
                <FormField label="Your Price" value={compYourPrice} onChange={setCompYourPrice} placeholder="$49" />
                <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Competitor URLs (for reference — not crawled)</div>
                <FormField label="Competitor 1 URL" value={compUrl1} onChange={setCompUrl1} placeholder="https://competitor-a.com/product" />
                <FormField label="Competitor 2 URL" value={compUrl2} onChange={setCompUrl2} placeholder="https://competitor-b.com/product" />
                <FormField label="Competitor 3 URL" value={compUrl3} onChange={setCompUrl3} placeholder="https://competitor-c.com/product" />
              </>
            ) : (
              <>
                <FormField label="Product Name" value={productName} onChange={setProductName} placeholder="Pro Training Shorts" />
                <FormField label="Category" value={category} onChange={setCategory} placeholder="Athletic Apparel" />
                <FormField
                  label="Key Features"
                  value={keyFeatures}
                  onChange={setKeyFeatures}
                  placeholder="4-way stretch, moisture-wicking, 7-inch inseam, side pockets"
                  multiline
                />
                <FormField label="Target Audience" value={targetAudience} onChange={setTargetAudience} placeholder="Serious athletes, gym-goers" />
              </>
            )}

            <button
              onClick={handleGenerate}
              disabled={generating}
              style={{
                width: '100%',
                background: generating ? '#1e293b' : 'linear-gradient(135deg, #f97316, #ea580c)',
                color: generating ? '#64748b' : 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: generating ? 'wait' : 'pointer',
                marginTop: '4px',
                boxShadow: generating ? 'none' : '0 0 20px rgba(249, 115, 22, 0.2)',
              }}
            >
              {generating ? '⏳ Generating...' : `✨ Generate ${typeInfo.label}`}
            </button>
          </div>
        </div>

        {/* Right Panel - Generated Content */}
        <div>
          {generated.length === 0 ? (
            <div style={{
              background: '#0f1624',
              border: '1px dashed #1e293b',
              borderRadius: '16px',
              padding: '64px 32px',
              textAlign: 'center',
              color: '#475569',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{typeInfo.icon}</div>
              <div style={{ fontSize: '18px', fontWeight: 600, color: '#64748b', marginBottom: '8px' }}>
                Ready to generate {typeInfo.label.toLowerCase()}
              </div>
              <div style={{ fontSize: '14px' }}>
                Fill in the details on the left and click Generate
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {generated.map((item, i) => {
                const itemTypeInfo = CONTENT_TYPES.find(t => t.id === item.type)!
                const id = `generated-${i}`
                return (
                  <div key={id} style={{
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
                        <span>{itemTypeInfo.icon}</span>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#f97316' }}>{itemTypeInfo.label}</span>
                        <span style={{ fontSize: '12px', color: '#475569' }}>
                          {item.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(item.content, id)}
                        style={{
                          background: copied === id ? 'rgba(34, 197, 94, 0.15)' : 'rgba(249, 115, 22, 0.15)',
                          color: copied === id ? '#22c55e' : '#f97316',
                          border: `1px solid ${copied === id ? 'rgba(34, 197, 94, 0.3)' : 'rgba(249, 115, 22, 0.3)'}`,
                          padding: '5px 14px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {copied === id ? '✓ Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div style={{ padding: '20px' }}>
                      <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', color: '#cbd5e1', lineHeight: 1.7, fontFamily: 'inherit', margin: 0 }}>
                        {item.content}
                      </pre>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  multiline?: boolean
}) {
  const baseStyle = {
    width: '100%',
    background: '#080c14',
    border: '1px solid #1e293b',
    borderRadius: '8px',
    padding: '10px 12px',
    fontSize: '13px',
    color: '#f1f5f9',
    outline: 'none',
    fontFamily: 'inherit',
    marginBottom: '12px',
  }

  return (
    <div style={{ marginBottom: '0' }}>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '5px' }}>
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          style={{ ...baseStyle, resize: 'vertical' }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={baseStyle}
        />
      )}
    </div>
  )
}
