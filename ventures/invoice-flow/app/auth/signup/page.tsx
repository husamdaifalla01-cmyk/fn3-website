'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firmName, setFirmName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { firm_name: firmName },
      },
    })

    if (signupError) {
      setError(signupError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      // Create organization
      const { error: orgError } = await supabase.from('organizations').insert({
        owner_id: data.user.id,
        name: firmName || email.split('@')[0],
        plan: 'solo',
        invoice_count_this_month: 0,
        subscription_status: 'trialing',
      })

      if (orgError) {
        console.error('Org creation error:', orgError)
      }

      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f14] flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#4f8ef7]/8 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#4f8ef7] rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg">InvoiceFlow</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Start your free trial</h1>
          <p className="text-white/40 mt-1.5 text-sm">14 days free · No credit card required</p>
        </div>

        <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSignup} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-400/10 border border-red-400/20 rounded-lg text-sm text-red-400">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm text-white/60 mb-2">Firm / Company Name</label>
              <input
                type="text"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                placeholder="Acme Accounting LLC"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#4f8ef7]/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@yourfirm.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#4f8ef7]/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Min. 8 characters"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#4f8ef7]/50 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#4f8ef7] hover:bg-[#4f8ef7]/80 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                'Create free account →'
              )}
            </button>

            <p className="text-xs text-white/25 text-center">
              By signing up, you agree to our terms of service and privacy policy.
            </p>
          </form>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {[
            { icon: '⚡', label: 'Setup in 2 min' },
            { icon: '🔒', label: 'SOC 2 secure' },
            { icon: '✕', label: 'Cancel anytime' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-lg mb-1">{item.icon}</div>
              <div className="text-xs text-white/30">{item.label}</div>
            </div>
          ))}
        </div>

        <p className="text-center mt-6 text-sm text-white/40">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#4f8ef7] hover:text-[#4f8ef7]/80 font-medium">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
