'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'

interface NavbarProps {
  variant?: 'landing' | 'app'
}

export function Navbar({ variant = 'landing' }: NavbarProps) {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string } | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser({ email: data.user.email || '' })
    })
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (variant === 'app') {
    return (
      <nav className="border-b border-white/5 bg-[#0f0f14]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#4f8ef7] rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-white font-semibold text-sm">InvoiceFlow</span>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              href="/dashboard"
              className="px-3 py-1.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/clients"
              className="px-3 py-1.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              Clients
            </Link>
            <Link
              href="/approval"
              className="px-3 py-1.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              Approvals
            </Link>
            <Link
              href="/rules"
              className="px-3 py-1.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              Rules
            </Link>
            <Link
              href="/pricing"
              className="px-3 py-1.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              Plans
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <span className="text-xs text-white/30 hidden sm:block">{user.email}</span>
            )}
            <button
              onClick={handleSignOut}
              className="px-3 py-1.5 text-sm text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="border-b border-white/5 bg-[#0f0f14]/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#4f8ef7] rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-white font-bold">InvoiceFlow</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm text-white/50 hover:text-white transition-colors">Features</Link>
          <Link href="/pricing" className="text-sm text-white/50 hover:text-white transition-colors">Pricing</Link>
          <Link href="#how-it-works" className="text-sm text-white/50 hover:text-white transition-colors">How it works</Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-[#4f8ef7] hover:bg-[#4f8ef7]/80 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 bg-[#4f8ef7] hover:bg-[#4f8ef7]/80 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Start free trial
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
