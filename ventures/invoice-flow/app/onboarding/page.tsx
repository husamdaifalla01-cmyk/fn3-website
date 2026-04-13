'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'

export default function OnboardingPage() {
  const router = useRouter()
  const [firmName, setFirmName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) {
      router.push('/auth/login')
      return
    }

    // Check if org already exists
    const { data: existing } = await supabase
      .from('organizations')
      .select('id')
      .eq('owner_id', userData.user.id)
      .single()

    if (existing) {
      router.push('/dashboard')
      return
    }

    const { error } = await supabase.from('organizations').insert({
      owner_id: userData.user.id,
      name: firmName || userData.user.email?.split('@')[0] || 'My Firm',
      plan: 'solo',
      invoice_count_this_month: 0,
      subscription_status: 'trialing',
    })

    if (!error) {
      router.push('/dashboard')
    } else {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f14] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#4f8ef7] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Set up your workspace</h1>
          <p className="text-white/40 mt-2 text-sm">Just one quick step to get started</p>
        </div>

        <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-white/60 mb-2">Firm or Business Name</label>
              <input
                type="text"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                placeholder="Acme Accounting LLC"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#4f8ef7]/50 transition-colors"
              />
              <p className="text-xs text-white/25 mt-1.5">This will appear on your exports and reports</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#4f8ef7] hover:bg-[#4f8ef7]/80 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Setting up...
                </span>
              ) : (
                'Go to Dashboard →'
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
