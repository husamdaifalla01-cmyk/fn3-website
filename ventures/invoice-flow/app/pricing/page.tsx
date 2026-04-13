'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { supabase } from '@/lib/supabase'
import { PLAN_PRICES } from '@/types'

const plans = [
  {
    key: 'solo' as const,
    name: 'Solo',
    desc: 'Perfect for independent bookkeepers and solo practitioners',
    features: [
      '1 user account',
      '500 invoices per month',
      'AI data extraction (all fields)',
      'Auto GL code assignment',
      'Duplicate detection',
      'Anomaly alerts',
      'QuickBooks CSV export',
      'Xero CSV export',
      'Email support (48h response)',
    ],
    notIncluded: ['Team workspace', 'API access', 'Custom GL mapping', 'Dedicated support'],
  },
  {
    key: 'team' as const,
    name: 'Team',
    desc: 'For growing accounting firms with multiple staff members',
    features: [
      '5 user accounts',
      '2,000 invoices per month',
      'Everything in Solo',
      'Team workspace & collaboration',
      'Shared chart of accounts',
      'Bulk invoice processing',
      'Priority support (12h response)',
      'Usage analytics',
    ],
    notIncluded: ['API access', 'Custom GL mapping', 'Dedicated support'],
    highlight: true,
  },
  {
    key: 'firm' as const,
    name: 'Firm',
    desc: 'For large firms with enterprise-grade requirements',
    features: [
      'Unlimited users',
      'Unlimited invoices',
      'Everything in Team',
      'REST API access',
      'Custom GL code mapping',
      'White-label reports',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom integrations',
      'SSO / SAML',
    ],
    notIncluded: [],
  },
]

const faqs = [
  {
    q: 'What counts as an invoice?',
    a: 'Any document you upload for AI extraction counts as one invoice — whether it\'s a PDF, JPG, or PNG. Multi-page PDFs count as one invoice.',
  },
  {
    q: 'How accurate is the AI extraction?',
    a: 'InvoiceFlow achieves 99%+ accuracy on clean, standard invoices. Each extraction includes a confidence score so you can quickly identify any that need review.',
  },
  {
    q: 'Can I export to systems other than QuickBooks and Xero?',
    a: 'We export standard CSV files in QuickBooks and Xero formats. These can often be adapted for other systems. The Firm plan includes API access for custom integrations.',
  },
  {
    q: 'What happens if I exceed my invoice limit?',
    a: "You'll receive an email warning at 80% and 100% of your limit. Processing will pause until you upgrade your plan or the monthly counter resets.",
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel from your account settings at any time. Your plan remains active until the end of the billing period.',
  },
  {
    q: 'How does per-invoice pricing work?',
    a: 'Each plan includes a monthly invoice allowance — 500 on Solo, 2,000 on Team, unlimited on Firm. Every document you upload and process counts as one invoice against that limit. Unused invoices do not roll over. You can upgrade your plan at any time to increase your limit.',
  },
  {
    q: 'Can I process invoices for multiple clients?',
    a: 'Yes. Every plan supports multiple client workspaces so you can keep each client\'s invoices, GL rules, and exports completely separate. The Team and Firm plans allow multiple team members to collaborate across client accounts.',
  },
  {
    q: 'What happens if the extraction is wrong?',
    a: 'Every extracted invoice is shown side-by-side with the original document before you approve it. You can edit any field manually before exporting. Extractions with lower confidence are automatically flagged for your review so nothing slips through.',
  },
  {
    q: 'Is my invoice data secure?',
    a: 'All invoice files are encrypted at rest (AES-256) and in transit (TLS 1.3). We use Supabase with row-level security so no data is ever shared across accounts. Invoice files are processed in isolated, ephemeral environments and are never shared with third-party AI training datasets.',
  },
  {
    q: 'Do you integrate with QuickBooks Desktop (not Online)?',
    a: 'Yes. InvoiceFlow exports the IIF file format compatible with QuickBooks Desktop as well as the QBO-compatible CSV for QuickBooks Online. You can choose your export format on every batch. Xero CSV export is also included on all plans.',
  },
]

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)
  const [org, setOrg] = useState<{ id: string; plan: string; stripe_customer_id?: string } | null>(null)
  const [loading, setLoading] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({ id: data.user.id, email: data.user.email || '' })
        supabase
          .from('organizations')
          .select('id, plan, stripe_customer_id')
          .eq('owner_id', data.user.id)
          .single()
          .then(({ data: orgData }) => setOrg(orgData))
      }
    })
  }, [])

  const handleSubscribe = async (planKey: string) => {
    if (!user) {
      window.location.href = '/auth/signup'
      return
    }

    setLoading(planKey)

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: planKey,
          billing,
          email: user.email,
          userId: user.id,
          orgId: org?.id,
        }),
      })

      const { url } = await res.json()
      if (url) window.location.href = url
    } finally {
      setLoading(null)
    }
  }

  const handleManageBilling = async () => {
    if (!org?.stripe_customer_id) return
    const res = await fetch('/api/stripe/portal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId: org.stripe_customer_id }),
    })
    const { url } = await res.json()
    if (url) window.location.href = url
  }

  return (
    <div className="min-h-screen bg-[#0f0f14] text-[#e2e8f0]">
      <Navbar variant={user ? 'app' : 'landing'} />

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-3">
            Pay for results, not data entry
          </h1>
          <p className="text-white/40 text-lg mb-8 max-w-xl mx-auto">
            Every plan includes AI extraction, GL coding, duplicate detection, and QuickBooks/Xero export.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 bg-[#1a1a24] border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${billing === 'monthly' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('annual')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${billing === 'annual' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
            >
              Annual
              <span className="text-xs bg-green-400/20 text-green-400 px-1.5 py-0.5 rounded font-medium">-20%</span>
            </button>
          </div>
        </motion.div>

        {/* Manage billing button */}
        {org?.stripe_customer_id && (
          <div className="text-center mb-8">
            <button
              onClick={handleManageBilling}
              className="text-sm text-[#4f8ef7] hover:text-white transition-colors"
            >
              Manage billing & subscription →
            </button>
          </div>
        )}

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-5 mb-20">
          {plans.map((plan, i) => {
            const price = PLAN_PRICES[plan.key][billing]
            const isCurrent = org?.plan === plan.key

            return (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 border flex flex-col ${
                  plan.highlight
                    ? 'border-[#4f8ef7]/50 bg-[#4f8ef7]/5'
                    : 'border-white/10 bg-[#1a1a24]'
                }`}
              >
                {plan.highlight && (
                  <div className="text-xs text-[#4f8ef7] font-semibold uppercase tracking-wider mb-3">
                    Most Popular
                  </div>
                )}
                <div className="text-white font-bold text-xl mb-1">{plan.name}</div>
                <p className="text-xs text-white/40 mb-5">{plan.desc}</p>

                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-white">${price}</span>
                    <span className="text-white/40 text-sm mb-1">/month</span>
                  </div>
                  {billing === 'annual' && (
                    <p className="text-xs text-green-400 mt-1">
                      Save ${(PLAN_PRICES[plan.key].monthly - price) * 12}/year
                    </p>
                  )}
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/60">
                      <svg className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                  {plan.notIncluded.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/20">
                      <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <div className="text-center py-2.5 rounded-lg text-sm font-medium bg-white/5 text-white/40 border border-white/10">
                    Current plan
                  </div>
                ) : (
                  <button
                    onClick={() => handleSubscribe(plan.key)}
                    disabled={loading === plan.key}
                    className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                      plan.highlight
                        ? 'bg-[#4f8ef7] text-white hover:bg-[#4f8ef7]/80'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {loading === plan.key ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Loading...
                      </span>
                    ) : user ? (
                      'Upgrade now'
                    ) : (
                      'Start free trial'
                    )}
                  </button>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* vs. Manual Entry */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-2">vs. Manual Entry</h2>
          <p className="text-white/40 text-center text-sm mb-8">At 10+ invoices/month, InvoiceFlow pays for itself</p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-[#1a1a24] border border-red-400/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-sm font-semibold text-red-400">Manual entry cost (per year)</span>
              </div>
              <div className="space-y-3 text-sm text-white/50 mb-5">
                <div className="flex justify-between">
                  <span>Bookkeeper rate</span>
                  <span className="text-white/70">$25–40/hr</span>
                </div>
                <div className="flex justify-between">
                  <span>Hours spent on invoices/month</span>
                  <span className="text-white/70">4 hrs</span>
                </div>
                <div className="flex justify-between">
                  <span>Months per year</span>
                  <span className="text-white/70">× 12</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between font-semibold">
                  <span className="text-white/70">Annual cost</span>
                  <span className="text-red-400">$1,200–$1,920/year</span>
                </div>
              </div>
              <p className="text-xs text-white/30">Plus hidden costs: errors, duplicates, late payment fees</p>
            </div>
            <div className="bg-[#1a1a24] border border-green-400/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-sm font-semibold text-green-400">InvoiceFlow Solo plan (per year)</span>
              </div>
              <div className="space-y-3 text-sm text-white/50 mb-5">
                <div className="flex justify-between">
                  <span>Monthly subscription</span>
                  <span className="text-white/70">$149/month</span>
                </div>
                <div className="flex justify-between">
                  <span>Months per year</span>
                  <span className="text-white/70">× 12</span>
                </div>
                <div className="flex justify-between">
                  <span>Hours saved per month</span>
                  <span className="text-green-400">4 hrs → 0.1 hrs</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between font-semibold">
                  <span className="text-white/70">Annual cost</span>
                  <span className="text-green-400">$1,788/year</span>
                </div>
              </div>
              <div className="bg-green-400/5 border border-green-400/10 rounded-lg p-3 text-xs text-green-400">
                Saves 48 hours/year · Eliminates manual errors · Pays back at 10+ invoices/month
              </div>
            </div>
          </div>
        </div>

        {/* Feature comparison */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Full feature comparison</h2>
          <div className="bg-[#1a1a24] border border-white/10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 gap-0">
              <div className="p-4 border-b border-white/5 text-xs text-white/30 uppercase tracking-wider font-medium">Feature</div>
              {['Solo', 'Team', 'Firm'].map((p) => (
                <div key={p} className={`p-4 border-b border-white/5 text-center text-sm font-semibold ${p === 'Team' ? 'text-[#4f8ef7]' : 'text-white'}`}>{p}</div>
              ))}
            </div>
            {[
              ['Users', '1', '5', 'Unlimited'],
              ['Invoices / month', '500', '2,000', 'Unlimited'],
              ['AI extraction', '✓', '✓', '✓'],
              ['GL auto-coding', '✓', '✓', '✓'],
              ['Duplicate detection', '✓', '✓', '✓'],
              ['Anomaly alerts', '✓', '✓', '✓'],
              ['QuickBooks export', '✓', '✓', '✓'],
              ['Xero export', '✓', '✓', '✓'],
              ['Team workspace', '—', '✓', '✓'],
              ['API access', '—', '—', '✓'],
              ['Custom GL mapping', '—', '—', '✓'],
              ['Dedicated support', '—', '—', '✓'],
              ['SLA guarantee', '—', '—', '✓'],
            ].map(([feature, solo, team, firm], i) => (
              <div key={i} className={`grid grid-cols-4 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                <div className="p-4 text-sm text-white/50">{feature}</div>
                {[solo, team, firm].map((val, j) => (
                  <div key={j} className={`p-4 text-sm text-center ${val === '✓' ? 'text-green-400' : val === '—' ? 'text-white/15' : 'text-white/60'}`}>{val}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently asked questions</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-[#1a1a24] border border-white/10 rounded-xl p-5"
              >
                <h3 className="text-white font-medium mb-2">{faq.q}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
