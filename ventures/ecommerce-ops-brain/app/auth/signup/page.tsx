'use client'

import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [storeName, setStoreName] = useState('')
  const [revenue, setRevenue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: signupError } = await supabase.auth.signUp({ email, password })

    if (signupError) {
      setError(signupError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      const { error: storeError } = await supabase.from('stores').insert({
        owner_id: data.user.id,
        store_name: storeName,
        annual_revenue_estimate: revenue,
        plan: revenue === '$500K-$2M' ? 'scale' : 'launch',
      })

      if (storeError) {
        console.error('Store creation error:', storeError)
      }

      router.push('/dashboard')
    }

    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080c14', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #f97316, #8b5cf6)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              🧠
            </div>
            <span style={{ fontWeight: 800, fontSize: '20px', color: '#f1f5f9' }}>Ops Brain</span>
          </Link>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginTop: '24px', marginBottom: '8px', color: '#f1f5f9' }}>
            Start your free trial
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px' }}>14 days free, no credit card required</p>
        </div>

        <div style={{
          background: '#0f1624',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          padding: '32px',
        }}>
          <form onSubmit={handleSignup}>
            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '20px',
                fontSize: '14px',
                color: '#ef4444',
              }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={e => setStoreName(e.target.value)}
                required
                placeholder="Velocity Athletics"
                style={{
                  width: '100%',
                  background: '#080c14',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  padding: '11px 14px',
                  fontSize: '14px',
                  color: '#f1f5f9',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                Annual Revenue
              </label>
              <select
                value={revenue}
                onChange={e => setRevenue(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: '#080c14',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  padding: '11px 14px',
                  fontSize: '14px',
                  color: revenue ? '#f1f5f9' : '#64748b',
                  outline: 'none',
                  appearance: 'none',
                }}
              >
                <option value="" disabled>Select your revenue range</option>
                <option value="Under $100K">Under $100K/year</option>
                <option value="$100K-$500K">$100K – $500K/year</option>
                <option value="$500K-$2M">$500K – $2M/year</option>
                <option value="Over $2M">Over $2M/year</option>
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@yourstore.com"
                style={{
                  width: '100%',
                  background: '#080c14',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  padding: '11px 14px',
                  fontSize: '14px',
                  color: '#f1f5f9',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Min. 8 characters"
                minLength={8}
                style={{
                  width: '100%',
                  background: '#080c14',
                  border: '1px solid #1e293b',
                  borderRadius: '8px',
                  padding: '11px 14px',
                  fontSize: '14px',
                  color: '#f1f5f9',
                  outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? '#1e293b' : 'linear-gradient(135deg, #f97316, #ea580c)',
                color: loading ? '#64748b' : 'white',
                border: 'none',
                padding: '13px 24px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: loading ? 'wait' : 'pointer',
                boxShadow: loading ? 'none' : '0 0 30px rgba(249, 115, 22, 0.3)',
              }}
            >
              {loading ? 'Creating Account...' : 'Start Free Trial →'}
            </button>

            <p style={{ textAlign: 'center', color: '#475569', fontSize: '12px', marginTop: '14px' }}>
              By signing up you agree to our{' '}
              <a href="#" style={{ color: '#64748b', textDecoration: 'underline' }}>Terms of Service</a>
              {' '}and{' '}
              <a href="#" style={{ color: '#64748b', textDecoration: 'underline' }}>Privacy Policy</a>
            </p>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p style={{ color: '#64748b', fontSize: '14px' }}>
              Already have an account?{' '}
              <Link href="/auth/login" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 600 }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Trust signals */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '24px' }}>
          {['No credit card', '14-day free trial', 'Cancel anytime'].map((text, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b' }}>
              <span style={{ color: '#22c55e' }}>✓</span>
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
