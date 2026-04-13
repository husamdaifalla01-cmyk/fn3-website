'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

function PolicyGenerator() {
  const [policyType, setPolicyType] = useState('privacy_policy')
  const [practiceName, setPracticeName] = useState('')
  const [state, setState] = useState('')
  const [practiceType, setPracticeType] = useState('')
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const policyLabels: Record<string, string> = {
    privacy_policy: 'Privacy Notice (Notice of Privacy Practices)',
    baa_template: 'Business Associate Agreement (BAA)',
    workforce_training: 'Workforce Training Policy',
  }

  async function handleGenerate() {
    if (!practiceName.trim() || !state.trim() || !practiceType.trim()) {
      setError('Please fill in all fields before generating.')
      return
    }
    setError(null)
    setLoading(true)
    setPreview(null)
    try {
      const res = await fetch('/api/generate-policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType: policyType,
          practiceInfo: {
            name: practiceName.trim(),
            state: state.trim(),
            type: practiceType.trim(),
            providerCount: 1,
          },
        }),
      })
      if (!res.ok) throw new Error('Generation failed')
      const data = await res.json()
      const text: string = data.content || ''
      setPreview(text.slice(0, 900))
    } catch {
      setError('Unable to generate preview. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section style={{ padding: '80px 24px', background: '#12121a', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 20, background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.2)', color: '#00d4aa', fontSize: 12, fontWeight: 600, marginBottom: 16 }}>
            FREE PREVIEW
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 12, lineHeight: 1.2 }}>
            Generate Your First Policy Free
          </h2>
          <p style={{ color: '#9ca3af', fontSize: 16, lineHeight: 1.6, maxWidth: 520, margin: '0 auto' }}>
            Enter your practice details and get a free preview of any policy — generated specifically for your practice type and state, not a generic template.
          </p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#9ca3af', fontSize: 13, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Policy Type
            </label>
            <select
              value={policyType}
              onChange={(e) => setPolicyType(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#e8e8e8',
                fontSize: 15,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="privacy_policy" style={{ background: '#1a1a2e' }}>Privacy Notice (Notice of Privacy Practices)</option>
              <option value="baa_template" style={{ background: '#1a1a2e' }}>Business Associate Agreement (BAA)</option>
              <option value="workforce_training" style={{ background: '#1a1a2e' }}>Workforce Training Policy</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#9ca3af', fontSize: 13, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Practice Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sunrise Family Clinic"
                value={practiceName}
                onChange={(e) => setPracticeName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#e8e8e8',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#9ca3af', fontSize: 13, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                State
              </label>
              <input
                type="text"
                placeholder="e.g. California"
                value={state}
                onChange={(e) => setState(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#e8e8e8',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#9ca3af', fontSize: 13, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Practice Type
              </label>
              <input
                type="text"
                placeholder="e.g. mental health"
                value={practiceType}
                onChange={(e) => setPracticeType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#e8e8e8',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {error && (
            <p style={{ color: '#fca5a5', fontSize: 13, marginBottom: 16 }}>{error}</p>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px 24px',
              borderRadius: 12,
              background: loading ? 'rgba(0,212,170,0.4)' : '#00d4aa',
              color: '#0a0a0f',
              fontSize: 16,
              fontWeight: 700,
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'Generating preview...' : 'Generate Free Preview'}
          </button>
        </div>

        {preview && (
          <div style={{ marginTop: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#00d4aa', fontSize: 13, fontWeight: 600 }}>{policyLabels[policyType]} — Free Preview (first ~200 words)</span>
              <span style={{ color: '#6b7280', fontSize: 12 }}>Generated for {practiceName}</span>
            </div>
            <div style={{ padding: 24, position: 'relative' }}>
              <p style={{ color: '#d1d5db', fontSize: 14, lineHeight: 1.8, fontFamily: 'Georgia, serif', whiteSpace: 'pre-wrap', margin: 0 }}>
                {preview}
                <span style={{ color: '#6b7280' }}>...</span>
              </p>
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 120,
                background: 'linear-gradient(to bottom, transparent, #0d0d17)',
                borderRadius: '0 0 16px 16px',
              }} />
            </div>
            <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center', background: 'rgba(0,212,170,0.04)' }}>
              <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 14 }}>
                Get the full {policyLabels[policyType]} plus all 6 required HIPAA policies — customized for your practice.
              </p>
              <Link
                href="/dashboard"
                style={{
                  display: 'inline-block',
                  padding: '12px 28px',
                  borderRadius: 10,
                  background: '#00d4aa',
                  color: '#0a0a0f',
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: 'none',
                }}
              >
                Get the Full Policy &amp; All 6 Required Policies — Start Free Trial
              </Link>
              <p style={{ color: '#4b5563', fontSize: 12, marginTop: 10, margin: '10px 0 0' }}>No credit card required.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const prices = {
    monthly: { starter: 199, practice: 399, enterprise: 799 },
    annual: { starter: 166, practice: 332, enterprise: 665 },
  }

  const current = prices[billingCycle]

  return (
    <div style={{ backgroundColor: '#0a0a0f', color: '#e8e8e8', fontFamily: 'Inter, -apple-system, sans-serif' }}>

      {/* Navigation */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(0,212,170,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#00d4aa', fontSize: 14, fontWeight: 700 }}>C</span>
            </div>
            <span style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>ComplianceAI</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="#features" style={{ color: '#9ca3af', fontSize: 14, textDecoration: 'none' }}>Features</a>
            <a href="#pricing" style={{ color: '#9ca3af', fontSize: 14, textDecoration: 'none' }}>Pricing</a>
            <a href="#testimonials" style={{ color: '#9ca3af', fontSize: 14, textDecoration: 'none' }}>Reviews</a>
            <Link href="/assessment" style={{ color: '#9ca3af', fontSize: 14, textDecoration: 'none' }}>Risk Assessment</Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/auth" style={{ color: '#9ca3af', fontSize: 14, textDecoration: 'none' }}>Sign in</Link>
            <Link
              href="/dashboard"
              style={{
                padding: '8px 20px',
                borderRadius: 10,
                background: 'rgba(0,212,170,0.15)',
                color: '#00d4aa',
                border: '1px solid rgba(0,212,170,0.3)',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '120px 24px 80px', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <motion.div {...fadeUp}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 100,
            background: 'rgba(0,212,170,0.08)',
            border: '1px solid rgba(0,212,170,0.2)',
            marginBottom: 32,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00d4aa', display: 'inline-block' }} />
            <span style={{ color: '#00d4aa', fontSize: 13, fontWeight: 500 }}>HIPAA Compliance Automation</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.1, color: '#fff', marginBottom: 24, letterSpacing: '-0.02em' }}
        >
          Solo Practitioners &amp; Therapists:
          <br />
          <span style={{ color: '#00d4aa' }}>HIPAA Without the $300/Hour</span>
          <br />
          Consultant
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontSize: 20, color: '#9ca3af', maxWidth: 640, margin: '0 auto 16px', lineHeight: 1.7 }}
        >
          Most solo practices score under 40/100 on HIPAA compliance — putting them at risk of OCR penalties up to <span style={{ color: '#f59e0b', fontWeight: 600 }}>$50,000 per violation</span>. ComplianceAI gets you to 90+ in 30 days.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 16, marginBottom: 32, padding: '12px 24px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12 }}
        >
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: '#ef4444' }}>34</span>
            <span style={{ fontSize: 13, color: '#6b7280', display: 'block' }}>Your practice today</span>
          </div>
          <div style={{ fontSize: 22, color: '#6b7280' }}>→</div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: '#00d4aa' }}>91</span>
            <span style={{ fontSize: 13, color: '#6b7280', display: 'block' }}>After 30 days</span>
          </div>
          <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.08)' }} />
          <span style={{ fontSize: 13, color: '#9ca3af', maxWidth: 140, lineHeight: 1.4 }}>Compliance score out of 100</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}
        >
          <Link
            href="/dashboard"
            style={{
              padding: '16px 32px',
              borderRadius: 12,
              background: '#00d4aa',
              color: '#0a0a0f',
              fontSize: 16,
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Start Free 14-Day Trial
          </Link>
          <Link
            href="/assessment"
            style={{
              padding: '16px 32px',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.06)',
              color: '#e8e8e8',
              border: '1px solid rgba(255,255,255,0.1)',
              fontSize: 16,
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Free Risk Assessment
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ fontSize: 13, color: '#6b7280', marginTop: 16 }}
        >
          No credit card required. Cancel anytime.
        </motion.p>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ marginTop: 64 }}
        >
          <DashboardPreview />
        </motion.div>
      </section>

      {/* Social Proof Numbers */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '48px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, textAlign: 'center' }}>
          {[
            { value: '2,400+', label: 'Healthcare Practices' },
            { value: '$847K', label: 'Avg. Penalty Avoided' },
            { value: '94%', label: 'Audit Success Rate' },
            { value: '< 2 min', label: 'Policy Generation Time' },
          ].map((stat, i) => (
            <div key={i}>
              <p style={{ fontSize: 36, fontWeight: 800, color: '#00d4aa', marginBottom: 4 }}>{stat.value}</p>
              <p style={{ fontSize: 14, color: '#6b7280' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <p style={{ color: '#00d4aa', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Everything You Need</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
            The Only HIPAA Tool Built for
            <br />Real Healthcare Practices
          </h2>
          <p style={{ fontSize: 18, color: '#9ca3af', maxWidth: 540, margin: '0 auto' }}>
            Not generic templates. Not checkbox compliance. Actual, practice-specific protection.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{
                background: '#12121a',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 20,
                padding: 28,
              }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: `${feature.color}15`,
                border: `1px solid ${feature.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                marginBottom: 16,
              }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{feature.title}</h3>
              <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 24px', background: '#12121a', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 40, fontWeight: 800, color: '#fff', marginBottom: 16 }}>Up and Running in 10 Minutes</h2>
            <p style={{ color: '#9ca3af', fontSize: 17 }}>No consultant. No complexity. Just compliance.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
            {steps.map((step, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'rgba(0,212,170,0.12)',
                  border: '2px solid rgba(0,212,170,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: 20,
                  fontWeight: 800,
                  color: '#00d4aa',
                }}>
                  {i + 1}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 40, fontWeight: 800, color: '#fff', marginBottom: 16 }}>Healthcare Providers Love It</h2>
          <p style={{ color: '#9ca3af', fontSize: 17 }}>Join thousands of practices that sleep better at night.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: '#12121a',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 20,
                padding: 28,
              }}
            >
              <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} style={{ color: '#f59e0b', fontSize: 16 }}>&#9733;</span>
                ))}
              </div>
              <p style={{ color: '#d1d5db', fontSize: 15, lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: `hsl(${(i * 60) + 180}, 50%, 30%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 15,
                }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{t.name}</p>
                  <p style={{ color: '#6b7280', fontSize: 13 }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '100px 24px', background: '#12121a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 40, fontWeight: 800, color: '#fff', marginBottom: 16 }}>
              Pricing That Makes Sense
            </h2>
            <p style={{ color: '#9ca3af', fontSize: 17, marginBottom: 32 }}>
              One compliance consultant hour costs more than a month of ComplianceAI.
            </p>

            {/* Billing Toggle */}
            <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 4, gap: 4 }}>
              <button
                onClick={() => setBillingCycle('monthly')}
                style={{
                  padding: '8px 20px',
                  borderRadius: 8,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  background: billingCycle === 'monthly' ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: billingCycle === 'monthly' ? '#fff' : '#6b7280',
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                style={{
                  padding: '8px 20px',
                  borderRadius: 8,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  background: billingCycle === 'annual' ? 'rgba(0,212,170,0.15)' : 'transparent',
                  color: billingCycle === 'annual' ? '#00d4aa' : '#6b7280',
                }}
              >
                Annual
                <span style={{
                  marginLeft: 6,
                  fontSize: 11,
                  background: 'rgba(0,212,170,0.2)',
                  color: '#00d4aa',
                  padding: '2px 6px',
                  borderRadius: 100,
                }}>
                  Save 17%
                </span>
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <PricingCard
              name="Starter"
              price={current.starter}
              billing={billingCycle}
              description="Perfect for solo practitioners and small practices"
              features={[
                '1 to 3 providers',
                'Live compliance score dashboard',
                'All 4 HIPAA safeguard assessments',
                'AI policy generator (all 6 documents)',
                'Incident response system',
                'Audit-ready reports',
                'Email support',
              ]}
              cta="Start Free Trial"
              popular={false}
            />

            <PricingCard
              name="Practice"
              price={current.practice}
              billing={billingCycle}
              description="For growing practices with multiple providers"
              features={[
                'Up to 20 providers',
                'Everything in Starter',
                'Priority support (under 4 hour response)',
                'Custom policy branding',
                'Multi-location support',
                'Staff training tracking',
                'BAA management dashboard',
              ]}
              cta="Start Free Trial"
              popular={true}
            />

            <PricingCard
              name="Enterprise"
              price={current.enterprise}
              billing={billingCycle}
              description="For large practices and healthcare organizations"
              features={[
                'Unlimited providers',
                'Everything in Practice',
                'White-glove onboarding',
                'Dedicated compliance advisor',
                'Custom integrations',
                'SSO and advanced security',
                'SLA guarantee',
              ]}
              cta="Contact Sales"
              popular={false}
            />
          </div>

          {/* vs. Consultant Comparison */}
          <div style={{
            marginTop: 48,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: '32px',
            overflow: 'hidden',
          }}>
            <p style={{ textAlign: 'center', color: '#00d4aa', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
              Cost Comparison
            </p>
            <h3 style={{ textAlign: 'center', color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 28 }}>
              ComplianceAI vs. HIPAA Compliance Consultant
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Consultant Column */}
              <div style={{
                background: 'rgba(239,68,68,0.05)',
                border: '1px solid rgba(239,68,68,0.15)',
                borderRadius: 14,
                padding: '24px 20px',
              }}>
                <p style={{ color: '#ef4444', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                  HIPAA Consultant
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { label: 'Initial Assessment', value: '$2,500 – $15,000', sub: 'One-time engagement' },
                    { label: 'Hourly Rate', value: '$300 / hour', sub: 'Ongoing consultation' },
                    { label: 'Annual Policy Review', value: '$3,000 – $8,000', sub: 'Per engagement' },
                    { label: 'Breach Response', value: '$5,000 – $25,000+', sub: 'Legal & consultant fees' },
                    { label: 'Typical Year 1 Cost', value: '$12,000 – $30,000', sub: 'Solo practice estimate' },
                  ].map((item) => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div>
                        <p style={{ color: '#d1d5db', fontSize: 13, fontWeight: 500 }}>{item.label}</p>
                        <p style={{ color: '#6b7280', fontSize: 11 }}>{item.sub}</p>
                      </div>
                      <p style={{ color: '#ef4444', fontSize: 13, fontWeight: 700, textAlign: 'right' }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ComplianceAI Column */}
              <div style={{
                background: 'rgba(0,212,170,0.05)',
                border: '1px solid rgba(0,212,170,0.2)',
                borderRadius: 14,
                padding: '24px 20px',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  top: -1,
                  right: 20,
                  background: '#00d4aa',
                  color: '#0a0a0f',
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '0 0 6px 6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>
                  Save on average $8,700/yr
                </div>
                <p style={{ color: '#00d4aa', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                  ComplianceAI
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { label: 'Compliance Score Dashboard', value: 'Included', sub: 'Real-time, all safeguards' },
                    { label: 'All 6 Policy Documents', value: 'Included', sub: 'AI-generated, practice-specific' },
                    { label: 'Annual Risk Assessment', value: 'Included', sub: 'Per 45 CFR 164.308(a)(1)' },
                    { label: 'Breach Response Tool', value: 'Included', sub: 'OCR letters auto-generated' },
                    { label: 'Total Monthly Cost', value: 'From $199/mo', sub: 'All-in, no hourly surprises' },
                  ].map((item) => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div>
                        <p style={{ color: '#d1d5db', fontSize: 13, fontWeight: 500 }}>{item.label}</p>
                        <p style={{ color: '#6b7280', fontSize: 11 }}>{item.sub}</p>
                      </div>
                      <p style={{ color: '#00d4aa', fontSize: 13, fontWeight: 700, textAlign: 'right' }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Savings Callout */}
            <div style={{
              marginTop: 20,
              padding: '16px 20px',
              background: 'rgba(0,212,170,0.06)',
              border: '1px solid rgba(0,212,170,0.15)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              flexWrap: 'wrap',
              textAlign: 'center',
            }}>
              <span style={{ color: '#9ca3af', fontSize: 14 }}>Average annual savings vs. consultant:</span>
              <span style={{ color: '#00d4aa', fontSize: 22, fontWeight: 800 }}>$8,700</span>
              <span style={{ color: '#6b7280', fontSize: 13 }}>(Based on solo practice typical compliance spend)</span>
            </div>
          </div>

          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: 14, marginTop: 32 }}>
            All plans include 14-day free trial. No credit card required.
            OCR penalty range: <span style={{ color: '#ef4444' }}>$100 – $50,000 per violation</span>, up to <span style={{ color: '#ef4444' }}>$1.9M/year per category</span>. Monthly cost of ComplianceAI: from <span style={{ color: '#00d4aa' }}>$199</span>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '100px 24px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 40, fontWeight: 800, color: '#fff', marginBottom: 16 }}>Common Questions</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                background: activeFaq === i ? 'rgba(0,212,170,0.05)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${activeFaq === i ? 'rgba(0,212,170,0.2)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 12,
                overflow: 'hidden',
                transition: 'all 0.2s',
              }}
            >
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 600,
                  gap: 16,
                }}
              >
                {faq.question}
                <span style={{ color: '#00d4aa', fontSize: 20, flexShrink: 0 }}>{activeFaq === i ? '-' : '+'}</span>
              </button>
              {activeFaq === i && (
                <div style={{ padding: '0 24px 20px', color: '#9ca3af', fontSize: 15, lineHeight: 1.7 }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: '#12121a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 44, fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 20 }}>
            Your Next Audit Is Coming.
            <br />
            <span style={{ color: '#00d4aa' }}>Are You Ready?</span>
          </h2>
          <p style={{ color: '#9ca3af', fontSize: 18, marginBottom: 36, lineHeight: 1.6 }}>
            Join 2,400+ practices that have replaced their compliance consultant with ComplianceAI. Get your compliance score in under 10 minutes.
          </p>
          <Link
            href="/dashboard"
            style={{
              display: 'inline-block',
              padding: '18px 40px',
              borderRadius: 14,
              background: '#00d4aa',
              color: '#0a0a0f',
              fontSize: 18,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Start Free 14-Day Trial
          </Link>
          <p style={{ color: '#4b5563', fontSize: 14, marginTop: 16 }}>
            No credit card required. 14-day free trial. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '48px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: 'rgba(0,212,170,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#00d4aa', fontSize: 12, fontWeight: 700 }}>C</span>
            </div>
            <span style={{ color: '#6b7280', fontSize: 14 }}>ComplianceAI - HIPAA Compliance Automation</span>
          </div>
          <p style={{ color: '#4b5563', fontSize: 13 }}>
            2026 ComplianceAI. Not legal advice. Consult a qualified healthcare attorney.
          </p>
        </div>
      </footer>

    </div>
  )
}

function DashboardPreview() {
  return (
    <div style={{
      background: '#12121a',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 20,
      padding: 24,
      maxWidth: 900,
      margin: '0 auto',
      textAlign: 'left',
    }}>
      {/* Mock browser chrome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444', opacity: 0.7 }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b', opacity: 0.7 }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#00d4aa', opacity: 0.7 }} />
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 6, height: 24, marginLeft: 12, display: 'flex', alignItems: 'center', paddingLeft: 12 }}>
          <span style={{ fontSize: 11, color: '#4b5563' }}>app.complianceai.com/dashboard</span>
        </div>
      </div>

      {/* Mock Dashboard Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
        {/* Score Ring Mock */}
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Compliance Score</p>
          <div style={{ position: 'relative', width: 100, height: 100 }}>
            <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#00d4aa" strokeWidth="8" strokeLinecap="round"
                strokeDasharray="251" strokeDashoffset="63" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: '#00d4aa' }}>75</span>
              <span style={{ fontSize: 10, color: '#6b7280' }}>/ 100</span>
            </div>
          </div>
          <p style={{ color: '#00d4aa', fontSize: 13, fontWeight: 600, marginTop: 8 }}>Moderate</p>
        </div>

        {/* Bars Mock */}
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 20 }}>
          <p style={{ fontSize: 11, color: '#6b7280', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>By Safeguard Area</p>
          {[
            { label: 'Administrative', score: 82, color: '#00d4aa' },
            { label: 'Technical', score: 71, color: '#00d4aa' },
            { label: 'Physical', score: 68, color: '#f59e0b' },
            { label: 'Organizational', score: 45, color: '#f97316' },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: '#9ca3af' }}>{item.label}</span>
                <span style={{ fontSize: 12, color: item.color, fontFamily: 'monospace' }}>{item.score}%</span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${item.score}%`, height: '100%', background: item.color, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
        {['Generate Privacy Policy', 'Log Incident', 'Download Audit Report'].map(action => (
          <div key={action} style={{
            padding: '8px 14px',
            background: 'rgba(0,212,170,0.08)',
            border: '1px solid rgba(0,212,170,0.2)',
            borderRadius: 8,
            color: '#00d4aa',
            fontSize: 12,
            fontWeight: 500,
          }}>
            {action}
          </div>
        ))}
      </div>
    </div>
  )
}

function PricingCard({
  name,
  price,
  billing,
  description,
  features,
  cta,
  popular,
}: {
  name: string
  price: number
  billing: 'monthly' | 'annual'
  description: string
  features: string[]
  cta: string
  popular: boolean
}) {
  return (
    <div style={{
      background: popular ? 'rgba(0,212,170,0.05)' : '#0a0a0f',
      border: popular ? '1px solid rgba(0,212,170,0.3)' : '1px solid rgba(255,255,255,0.08)',
      borderRadius: 20,
      padding: 32,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {popular && (
        <div style={{
          position: 'absolute',
          top: -12,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#00d4aa',
          color: '#0a0a0f',
          fontSize: 11,
          fontWeight: 700,
          padding: '4px 14px',
          borderRadius: 100,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          whiteSpace: 'nowrap',
        }}>
          Most Popular
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{name}</h3>
        <p style={{ fontSize: 14, color: '#6b7280' }}>{description}</p>
      </div>

      <div style={{ marginBottom: 24 }}>
        <span style={{ fontSize: 48, fontWeight: 800, color: '#fff' }}>${price}</span>
        <span style={{ color: '#6b7280', fontSize: 15 }}>/month</span>
        {billing === 'annual' && (
          <p style={{ fontSize: 13, color: '#00d4aa', marginTop: 4 }}>Billed annually (2 months free)</p>
        )}
      </div>

      <ul style={{ listStyle: 'none', padding: 0, marginBottom: 28, flex: 1 }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: 14, color: '#d1d5db' }}>
            <span style={{ color: '#00d4aa', fontWeight: 700, flexShrink: 0 }}>&#10003;</span>
            {f}
          </li>
        ))}
      </ul>

      <Link
        href="/dashboard"
        style={{
          display: 'block',
          textAlign: 'center',
          padding: '14px 24px',
          borderRadius: 12,
          background: popular ? '#00d4aa' : 'rgba(255,255,255,0.06)',
          color: popular ? '#0a0a0f' : '#e8e8e8',
          border: popular ? 'none' : '1px solid rgba(255,255,255,0.1)',
          fontSize: 15,
          fontWeight: 700,
          textDecoration: 'none',
          transition: 'all 0.2s',
        }}
      >
        {cta}
      </Link>
    </div>
  )
}

const features = [
  {
    icon: '📊',
    title: 'Live Compliance Score',
    description: 'Real-time compliance score across all 4 HIPAA safeguard domains — administrative, physical, technical, and organizational. Know exactly where you stand.',
    color: '#00d4aa',
  },
  {
    icon: '📝',
    title: 'AI Policy Generator',
    description: 'Generate practice-specific policies — not generic templates. Your Notice of Privacy Practices references your actual practice type, state, and provider count.',
    color: '#3b82f6',
  },
  {
    icon: '🚨',
    title: 'Incident Response System',
    description: 'Log any potential breach. AI instantly generates step-by-step response workflows and determines if OCR notification is required within 60 days.',
    color: '#ef4444',
  },
  {
    icon: '📑',
    title: 'Audit-Ready Reports',
    description: 'One-click comprehensive compliance reports formatted for HHS Office for Civil Rights investigations. Have everything ready before the investigator calls.',
    color: '#8b5cf6',
  },
  {
    icon: '🔔',
    title: 'Continuous Monitoring',
    description: 'Automated alerts when your compliance score drops or when new HIPAA guidance from HHS affects your practice type. Never miss a regulatory update.',
    color: '#f59e0b',
  },
  {
    icon: '🤝',
    title: 'BAA Template Library',
    description: 'Pre-drafted Business Associate Agreements for EHR vendors, billing services, cloud storage, and 50+ other common healthcare vendor relationships.',
    color: '#10b981',
  },
]

const steps = [
  {
    title: 'Enter Practice Info',
    description: 'Tell us your practice type, state, and number of providers. Takes 2 minutes.',
  },
  {
    title: 'Get Your Score',
    description: 'Your compliance checklist is pre-populated across all HIPAA domains. Mark your status.',
  },
  {
    title: 'Generate Policies',
    description: 'Click generate on any policy document. AI creates a practice-specific version in under 2 minutes.',
  },
  {
    title: 'Stay Compliant',
    description: 'Dashboard updates in real-time. Get alerts. Download audit reports anytime.',
  },
]

const testimonials = [
  {
    quote: "I was paying $1,800 for a quarterly compliance review that was basically a generic checklist. ComplianceAI gives me a real-time score and actually knows I'm a mental health practice in California. Completely different product.",
    name: 'Dr. Sarah Chen',
    role: 'Licensed Psychologist, SF Bay Area',
  },
  {
    quote: "We had an employee accidentally send a fax to the wrong number. Previously I would have panicked and called a lawyer. ComplianceAI walked me through exactly what to do — whether to report, sample notification letter, everything. Saved me thousands in legal fees.",
    name: 'Marcus Williams, DDS',
    role: 'Solo Dental Practice, Austin TX',
  },
  {
    quote: "The privacy policy it generated actually mentions our specific EHR system and the fact that we're a chiropractic practice. The consultant I used before gave me the exact same template I could have googled. This is what technology should do.",
    name: 'Dr. Jennifer Patel',
    role: 'Chiropractic Practice, Chicago IL',
  },
  {
    quote: "We got a letter from HHS asking about a complaint. I was terrified. ComplianceAI generated a complete response package in 15 minutes. The investigator closed the case without penalty. Worth every penny.",
    name: 'Robert Nguyen, MD',
    role: 'Internal Medicine, Portland OR',
  },
  {
    quote: "Running a 3-provider urgent care with no dedicated compliance staff. ComplianceAI is basically a part-time compliance officer for $200/month. I check the dashboard weekly and everything stays green.",
    name: 'Dr. Amara Osei',
    role: 'Urgent Care Owner, Atlanta GA',
  },
  {
    quote: "The workforce training policy it generated included specific training topics for a physical therapy practice — things I wouldn't have thought to include. My staff actually learned something from it.",
    name: 'Lisa Torres, PT, DPT',
    role: 'Physical Therapy Practice, Denver CO',
  },
]

const faqs = [
  {
    question: 'Does ComplianceAI replace a healthcare attorney?',
    answer: 'No. ComplianceAI automates the administrative burden of HIPAA compliance — document generation, tracking, and reporting. For complex legal questions, breach investigations, or regulatory disputes, you should still consult a qualified healthcare attorney. Think of us as the automated foundation that handles 90% of your compliance needs, with attorneys for the other 10%.',
  },
  {
    question: 'Are the generated policies legally valid?',
    answer: "The policies generated by ComplianceAI are based on HIPAA regulations (45 CFR Parts 160 and 164), include all required elements, and are customized to your practice. They are intended to be legally sound and have been reviewed against regulatory requirements. We recommend having any document reviewed by healthcare counsel before first use.",
  },
  {
    question: 'What does "practice-specific" mean?',
    answer: "Every document is generated with your actual practice name, practice type, state, and provider count. A Notice of Privacy Practices for a mental health practice in California is very different from one for a dental practice in Texas — different state laws, different practice types, different patient populations. Generic templates miss all of this.",
  },
  {
    question: 'What happens if we have an actual breach?',
    answer: 'Log the incident in ComplianceAI and our AI analyzes it against the HIPAA breach notification rules (45 CFR 164.400-414). It determines whether OCR notification is required, generates the required documentation, provides sample individual notification letters, and tracks your response. This does not replace legal counsel for serious breaches.',
  },
  {
    question: 'How current is the compliance guidance?',
    answer: "Our AI models are trained on HIPAA regulations, HHS guidance, and OCR enforcement actions. We update our guidance when HHS issues new guidance. You will receive alerts when regulatory changes affect your practice type.",
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes. No contracts, no minimum terms on monthly plans. Annual plans are billed yearly but you can request a prorated refund within 30 days. All generated documents remain downloadable after cancellation for 90 days.',
  },
]
