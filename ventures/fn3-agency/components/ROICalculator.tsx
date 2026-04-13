'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

export default function ROICalculator() {
  const [employees, setEmployees] = useState(10)
  const [hourlyRate, setHourlyRate] = useState(50)
  const [hoursPerWeek, setHoursPerWeek] = useState(15)
  const [plan, setPlan] = useState<'starter' | 'growth' | 'enterprise'>('growth')

  const planCosts = {
    starter: { setup: 2000, monthly: 500 },
    growth: { setup: 3500, monthly: 1000 },
    enterprise: { setup: 5000, monthly: 1500 },
  }

  const results = useMemo(() => {
    // hoursPerWeek is the collective team hours on automatable tasks (not per person)
    // We recover ~65% of those hours through automation
    const weeklySaved = hoursPerWeek * 0.65
    const monthlySaved = weeklySaved * 4.33
    // Value of reclaimed time = average hourly cost × hours recovered
    const hourlySavingsPerWeek = weeklySaved * hourlyRate
    const monthlyCostSavings = hourlySavingsPerWeek * 4.33
    const annualSavings = monthlyCostSavings * 12
    const monthlyCost = planCosts[plan].monthly
    const setupCost = planCosts[plan].setup
    const netMonthlySavings = monthlyCostSavings - monthlyCost
    const annualROI = ((annualSavings - (monthlyCost * 12 + setupCost)) / (monthlyCost * 12 + setupCost)) * 100
    const weeklyNetSavings = hourlySavingsPerWeek - (monthlyCost / 4.33)
    const paybackWeeks = weeklyNetSavings > 0 ? setupCost / weeklyNetSavings : 999

    return {
      weeklySaved: Math.round(weeklySaved),
      monthlySaved: Math.round(monthlySaved),
      monthlyCostSavings: Math.round(monthlyCostSavings),
      annualSavings: Math.round(annualSavings),
      netMonthlySavings: Math.round(netMonthlySavings),
      annualROI: Math.max(0, Math.round(annualROI)),
      paybackWeeks: Math.max(1, Math.round(paybackWeeks)),
    }
  }, [employees, hourlyRate, hoursPerWeek, plan])

  const formatCurrency = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n}`

  return (
    <section id="roi" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent/[0.05] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.756 4.5 4.981V18a2.25 2.25 0 0 0 2.25 2.25h10.5A2.25 2.25 0 0 0 19.5 18V4.981c0-1.225-.807-2.282-1.907-2.409A41.146 41.146 0 0 0 12 2.25Z" />
            </svg>
            ROI Calculator
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight">
            Calculate your ROI
          </h2>
          <p className="text-text-secondary mt-4 text-lg">
            See exactly how much FN3 saves you — and how fast it pays for itself.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="bg-surface border border-white/[0.08] rounded-2xl overflow-hidden shadow-card"
        >
          <div className="grid md:grid-cols-[1fr_1px_1fr]">
            {/* Inputs */}
            <div className="p-8 md:p-10">
              <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-8">Your Business</h3>

              {/* Employees slider */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm text-text-secondary">Number of employees</label>
                  <span className="text-xl font-bold text-text-primary">{employees}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full"
                  style={{
                    background: `linear-gradient(to right, #7c5cfc ${((employees - 1) / 49) * 100}%, rgba(255,255,255,0.1) ${((employees - 1) / 49) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-[10px] text-text-muted mt-1">
                  <span>1</span>
                  <span>50</span>
                </div>
              </div>

              {/* Hourly rate */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm text-text-secondary">Average hourly cost / employee</label>
                  <div className="flex items-center gap-1">
                    <span className="text-text-muted text-sm">$</span>
                    <input
                      type="number"
                      min={25}
                      max={150}
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Math.min(150, Math.max(25, Number(e.target.value))))}
                      className="w-16 text-right text-xl font-bold text-text-primary bg-transparent border-b border-white/20 focus:border-accent outline-none transition-colors"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={25}
                  max={150}
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full"
                  style={{
                    background: `linear-gradient(to right, #7c5cfc ${((hourlyRate - 25) / 125) * 100}%, rgba(255,255,255,0.1) ${((hourlyRate - 25) / 125) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-[10px] text-text-muted mt-1">
                  <span>$25</span>
                  <span>$150</span>
                </div>
              </div>

              {/* Hours per week */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm text-text-secondary">Team hours/week on automatable tasks</label>
                  <span className="text-xl font-bold text-text-primary">{hoursPerWeek}h</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={40}
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="w-full"
                  style={{
                    background: `linear-gradient(to right, #7c5cfc ${((hoursPerWeek - 5) / 35) * 100}%, rgba(255,255,255,0.1) ${((hoursPerWeek - 5) / 35) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-[10px] text-text-muted mt-1">
                  <span>5h</span>
                  <span>40h</span>
                </div>
              </div>

              {/* Plan selector */}
              <div>
                <label className="text-sm text-text-secondary block mb-3">Which plan?</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['starter', 'growth', 'enterprise'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPlan(p)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 capitalize ${
                        plan === p
                          ? 'bg-accent text-white'
                          : 'bg-surface-3 border border-white/[0.07] text-text-secondary hover:border-white/20'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <div className="text-[11px] text-text-muted mt-2 text-center">
                  ${planCosts[plan].setup.toLocaleString()} setup + ${planCosts[plan].monthly.toLocaleString()}/mo
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block bg-white/[0.06]" />

            {/* Results */}
            <div className="p-8 md:p-10 bg-surface-2/50">
              <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-8">Your Returns</h3>

              {/* Main headline */}
              <div className="bg-accent/10 border border-accent/20 rounded-xl p-5 mb-7">
                <div className="text-xs text-accent font-medium mb-2 uppercase tracking-wider">Monthly Net Savings</div>
                <div className="text-4xl font-bold text-text-primary mb-1">
                  {formatCurrency(results.netMonthlySavings)}
                </div>
                <div className="text-xs text-text-secondary">after FN3 subscription cost</div>
              </div>

              {/* Stat grid */}
              <div className="grid grid-cols-2 gap-4 mb-7">
                {[
                  { label: 'Hours saved/week', value: `${results.weeklySaved}h`, sub: 'per week' },
                  { label: 'Cost savings/month', value: formatCurrency(results.monthlyCostSavings), sub: 'gross savings' },
                  { label: 'Annual savings', value: formatCurrency(results.annualSavings), sub: 'total value' },
                  { label: 'Annual ROI', value: `${results.annualROI}%`, sub: 'return on investment' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-surface border border-white/[0.06] rounded-xl p-4">
                    <div className="text-xs text-text-muted mb-1">{stat.label}</div>
                    <div className="text-xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-[10px] text-text-muted mt-0.5">{stat.sub}</div>
                  </div>
                ))}
              </div>

              {/* Payback period */}
              <div className="flex items-center gap-3 p-4 bg-surface-3 border border-white/[0.06] rounded-xl mb-7">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-text-muted">Setup cost payback</div>
                  <div className="text-base font-bold text-text-primary">
                    {results.paybackWeeks >= 999
                      ? 'Increase hours or rate'
                      : results.paybackWeeks < 52
                      ? `${results.paybackWeeks} weeks`
                      : `${Math.round(results.paybackWeeks / 52)} years`}
                  </div>
                </div>
              </div>

              {/* Summary sentence */}
              <div className="bg-surface/50 rounded-xl p-4 text-xs text-text-secondary leading-relaxed border border-white/[0.05]">
                With your team spending{' '}
                <span className="text-text-primary font-medium">{hoursPerWeek} hours/week</span> on automatable tasks at{' '}
                <span className="text-text-primary font-medium">${hourlyRate}/hour avg cost</span>, FN3 recovers{' '}
                <span className="text-text-primary font-medium">{results.weeklySaved}h/week</span> — saving you{' '}
                <span className="text-accent font-semibold">{formatCurrency(results.monthlyCostSavings)}/month</span>
                {results.paybackWeeks < 999 && (
                  <> and paying for itself in{' '}
                  <span className="text-accent font-semibold">{results.paybackWeeks} weeks</span></>
                )}.
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(124, 92, 252, 0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector('#apply')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full mt-5 bg-accent hover:bg-accent-light text-white font-semibold py-3.5 rounded-xl transition-all duration-200 text-sm"
              >
                Get Your AI Workforce
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
