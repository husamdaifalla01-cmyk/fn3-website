'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const plans = [
  {
    name: 'Starter',
    description: '2 departments automated. Agents live in under 5 days.',
    setup: 2000,
    monthly: 500,
    annualMonthly: 400,
    departments: 2,
    agents: 10,
    integrations: '2 integrations',
    reporting: 'Weekly reports',
    support: 'Email support',
    extras: ['Slack alerts (read-only)', 'Onboarding walkthrough', '30-day optimization period'],
    cta: 'Apply for Starter',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Growth',
    description: '4 departments. 25 agents. The full growth stack.',
    setup: 3500,
    monthly: 1000,
    annualMonthly: 800,
    departments: 4,
    agents: 25,
    integrations: '5 integrations',
    reporting: 'Daily reports',
    support: 'Priority email + chat',
    extras: ['Slack alerts & notifications', 'Custom agent configuration', 'Monthly strategy call', '60-day optimization period'],
    cta: 'Apply for Growth',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    description: 'All 6 departments. All 47 agents. SLA-backed.',
    setup: 5000,
    monthly: 1500,
    annualMonthly: 1200,
    departments: 6,
    agents: 47,
    integrations: 'Unlimited integrations',
    reporting: 'Real-time dashboard',
    support: 'Dedicated account manager',
    extras: ['Custom SLA & uptime guarantee', 'White-glove onboarding', 'Weekly strategy calls', '90-day optimization period', 'Custom agent development'],
    cta: 'Apply for Enterprise',
    highlighted: false,
    badge: 'Full Workforce',
  },
]

const allFeatures = [
  { name: 'Departments included', starter: '2', growth: '4', enterprise: '6 (all)' },
  { name: 'AI agents deployed', starter: '10', growth: '25', enterprise: '47' },
  { name: 'Tool integrations', starter: '2', growth: '5', enterprise: 'Unlimited' },
  { name: 'Reporting cadence', starter: 'Weekly', growth: 'Daily', enterprise: 'Real-time' },
  { name: 'Slack notifications', starter: 'Read-only', growth: 'Full', enterprise: 'Full + custom' },
  { name: 'Support level', starter: 'Email', growth: 'Priority chat', enterprise: 'Dedicated AM' },
  { name: 'Strategy calls', starter: '—', growth: 'Monthly', enterprise: 'Weekly' },
  { name: 'SLA guarantee', starter: '—', growth: '—', enterprise: 'Yes' },
  { name: 'Custom agents', starter: '—', growth: 'Partial', enterprise: 'Yes' },
  { name: 'Optimization period', starter: '30 days', growth: '60 days', enterprise: '90 days' },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/10 to-background pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-accent/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>
            Pricing
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4">
            Simple pricing.{' '}
            <span className="gradient-text">No hidden costs.</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8">
            Less than 1 junior employee. Works 24 hours a day.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-surface border border-white/[0.08] rounded-xl p-1.5">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                !annual ? 'bg-accent text-white shadow-accent-sm' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                annual ? 'bg-accent text-white shadow-accent-sm' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Annual
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${annual ? 'bg-white/20 text-white' : 'bg-green-500/20 text-green-400'}`}>
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.highlighted
                  ? 'border-2 border-accent shadow-accent scale-[1.02]'
                  : 'border border-white/[0.08] hover:border-white/[0.14]'
              }`}
              style={{
                background: plan.highlighted
                  ? 'linear-gradient(135deg, rgba(124,92,252,0.12), #111111 40%)'
                  : '#111111',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-4 right-4 bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              <div className="p-7 md:p-8">
                {/* Plan name */}
                <h3 className="text-xl font-bold text-text-primary mb-1">{plan.name}</h3>
                <p className="text-sm text-text-secondary mb-7">{plan.description}</p>

                {/* Price */}
                <div className="mb-7">
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-4xl font-bold text-text-primary">
                      ${annual ? plan.annualMonthly.toLocaleString() : plan.monthly.toLocaleString()}
                    </span>
                    <span className="text-text-muted text-sm mb-1.5">/month</span>
                  </div>
                  <div className="text-sm text-text-secondary">
                    + ${plan.setup.toLocaleString()} one-time setup
                  </div>
                  {annual && (
                    <div className="text-xs text-green-400 mt-1 font-medium">
                      Save ${((plan.monthly - plan.annualMonthly) * 12).toLocaleString()}/year
                    </div>
                  )}
                </div>

                {/* Key specs */}
                <div className="space-y-3 mb-7 pb-7 border-b border-white/[0.07]">
                  {[
                    { icon: '🏢', label: `${plan.departments} department${plan.departments > 1 ? 's' : ''}` },
                    { icon: '🤖', label: `${plan.agents} AI agents` },
                    { icon: '🔌', label: plan.integrations },
                    { icon: '📊', label: plan.reporting },
                    { icon: '💬', label: plan.support },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 text-sm">
                      <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      <span className="text-text-secondary">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Extras */}
                <div className="space-y-2 mb-8">
                  {plan.extras.map((extra) => (
                    <div key={extra} className="flex items-center gap-2.5 text-xs text-text-muted">
                      <div className="w-1 h-1 rounded-full bg-accent/50 flex-shrink-0" />
                      {extra}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => document.querySelector('#apply')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    plan.highlighted
                      ? 'bg-accent hover:bg-accent-light text-white shadow-accent'
                      : 'bg-surface-3 border border-white/[0.10] hover:border-white/20 text-text-primary hover:bg-surface-2'
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison table (desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hidden md:block bg-surface border border-white/[0.07] rounded-2xl overflow-hidden"
        >
          <div className="grid grid-cols-4 border-b border-white/[0.07]">
            <div className="p-5 text-sm font-semibold text-text-muted">Feature</div>
            {['Starter', 'Growth', 'Enterprise'].map((p) => (
              <div key={p} className="p-5 text-sm font-semibold text-center" style={{ color: p === 'Growth' ? '#7c5cfc' : undefined }}>
                {p}
              </div>
            ))}
          </div>
          {allFeatures.map((feature, i) => (
            <div
              key={feature.name}
              className={`grid grid-cols-4 border-b border-white/[0.04] ${i % 2 === 0 ? 'bg-surface-2/30' : ''}`}
            >
              <div className="p-4 text-sm text-text-secondary">{feature.name}</div>
              {[feature.starter, feature.growth, feature.enterprise].map((val, j) => (
                <div key={j} className="p-4 text-sm text-center text-text-primary">
                  {val === '—' ? <span className="text-text-muted">—</span> : val}
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Value prop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 bg-surface border border-white/[0.07] rounded-xl px-6 py-4">
            <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
            <p className="text-sm text-text-secondary">
              <span className="text-text-primary font-medium">Entry plan at $500/month</span> costs less than one day of a junior hire — and works every hour of every day, never takes PTO, and doesn&apos;t need managing.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
