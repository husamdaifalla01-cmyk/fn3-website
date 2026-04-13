'use client'

import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080c14', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #f97316, #8b5cf6)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
              🧠
            </div>
            <span style={{ fontWeight: 800, fontSize: '20px', color: '#f1f5f9' }}>Ops Brain</span>
          </Link>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginTop: '24px', marginBottom: '8px', color: '#f1f5f9' }}>
            Welcome back
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px' }}>Sign in to your operations dashboard</p>
        </div>

        <div style={{
          background: '#0f1624',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          padding: '32px',
        }}>
          <form onSubmit={handleLogin}>
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
                placeholder="••••••••"
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
              {loading ? 'Signing In...' : 'Sign In →'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <p style={{ color: '#64748b', fontSize: '14px' }}>
              No account yet?{' '}
              <Link href="/auth/signup" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 600 }}>
                Start free trial
              </Link>
            </p>
          </div>
        </div>

        {/* Demo note */}
        <div style={{
          textAlign: 'center',
          marginTop: '16px',
          padding: '12px 16px',
          background: 'rgba(139, 92, 246, 0.08)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '10px',
        }}>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
            Want to see the demo first?{' '}
            <Link href="/dashboard" style={{ color: '#8b5cf6', textDecoration: 'none', fontWeight: 600 }}>
              View demo dashboard →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
