'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const agents = [
  { dept: 'Sales', name: 'Pipeline Agent', status: 'Qualifying leads', color: '#7c5cfc', x: 15, y: 20 },
  { dept: 'Sales', name: 'Outreach Agent', status: 'Sending sequence', color: '#7c5cfc', x: 15, y: 42 },
  { dept: 'Marketing', name: 'Content Agent', status: 'Writing blog post', color: '#06b6d4', x: 38, y: 15 },
  { dept: 'Marketing', name: 'SEO Agent', status: 'Optimizing pages', color: '#06b6d4', x: 38, y: 37 },
  { dept: 'Support', name: 'Ticket Agent', status: 'Resolving #1042', color: '#10b981', x: 62, y: 20 },
  { dept: 'Support', name: 'FAQ Agent', status: 'Updating KB', color: '#10b981', x: 62, y: 42 },
  { dept: 'Ops', name: 'Ops Agent', status: 'Generating report', color: '#f59e0b', x: 82, y: 15 },
  { dept: 'Finance', name: 'Finance Agent', status: 'Processing invoices', color: '#f59e0b', x: 82, y: 37 },
]

function AgentCard({ agent, delay }: { agent: typeof agents[0]; delay: number }) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 2000 + delay * 300)
    return () => clearInterval(interval)
  }, [delay])

  const statusMessages: Record<string, string[]> = {
    'Pipeline Agent': ['Qualifying leads', 'Found 3 hot leads', 'Updating CRM', 'Scoring prospects'],
    'Outreach Agent': ['Sending sequence', 'Email delivered', 'Follow-up sent', 'Reply detected'],
    'Content Agent': ['Writing blog post', 'Draft complete', 'Scheduling post', 'SEO optimized'],
    'SEO Agent': ['Optimizing pages', 'Rank improved', 'Analyzing gaps', 'Building links'],
    'Ticket Agent': ['Resolving #1042', 'Ticket resolved', 'Customer notified', 'CSAT: 5/5'],
    'FAQ Agent': ['Updating KB', 'Article added', 'Sync complete', 'Searching docs'],
    'Ops Agent': ['Generating report', 'Report sent', 'Data analyzed', 'Dashboard updated'],
    'Finance Agent': ['Processing invoices', 'Invoice matched', 'Expense logged', 'Report ready'],
  }

  const messages = statusMessages[agent.name] || [agent.status]
  const currentStatus = messages[tick % messages.length]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay * 0.15, duration: 0.5 }}
      className="absolute"
      style={{ left: `${agent.x}%`, top: `${agent.y}%` }}
    >
      <div className="bg-surface-2 border border-white/[0.08] rounded-xl p-3 w-44 shadow-card hover:shadow-card-hover transition-shadow duration-300 hover:border-white/[0.14] group">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{
              backgroundColor: agent.color,
              boxShadow: `0 0 8px ${agent.color}80`,
              animation: `blink ${1.5 + delay * 0.3}s ease-in-out infinite`
            }}
          />
          <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: agent.color }}>
            {agent.dept}
          </span>
        </div>
        <div className="text-xs font-medium text-text-primary mb-1">{agent.name}</div>
        <motion.div
          key={currentStatus}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] text-text-secondary truncate"
        >
          {currentStatus}
        </motion.div>
        {/* Activity bar */}
        <div className="mt-2 h-0.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: agent.color }}
            animate={{ width: ['30%', '80%', '45%', '90%', '60%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const target = 47
    const duration = 1500
    const steps = 60
    const increment = target / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col pt-20 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-accent/[0.06] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-accent/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 flex-1 flex flex-col">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent text-xs font-medium px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            Now deploying for Q2 2026 — 3 slots remaining
          </div>
        </motion.div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
          >
            Your AI Workforce.
            <br />
            <span className="gradient-text">Running 24/7.</span>
            <br />
            Starting Monday.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            We deploy a fully configured team of AI agents across Sales, Marketing, Support, and Operations —
            trained on your business, integrated with your tools, working while you sleep.
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(124, 92, 252, 0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#apply')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-7 py-4 rounded-xl transition-all duration-200 shadow-accent text-base w-full sm:w-auto justify-center"
          >
            Apply for AI Workforce
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, borderColor: 'rgba(124, 92, 252, 0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#solution')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 border border-white/20 hover:border-accent/50 text-text-primary font-medium px-7 py-4 rounded-xl transition-all duration-200 text-base w-full sm:w-auto justify-center"
          >
            See How It Works
            <svg className="w-4 h-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <div className="flex -space-x-2">
            {['#7c5cfc', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'].map((c, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold text-white"
                style={{ backgroundColor: c }}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <div className="text-sm text-text-secondary">
            <span className="text-text-primary font-semibold">12 businesses</span> deployed · avg <span className="text-text-primary font-semibold">4.8★</span>
          </div>
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(i => (
              <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </motion.div>

        {/* Agent Grid Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto w-full max-w-5xl"
        >
          {/* Container */}
          <div className="relative bg-surface/60 backdrop-blur-sm border border-white/[0.07] rounded-2xl overflow-hidden"
               style={{ height: 'clamp(280px, 40vw, 420px)' }}>

            {/* Header bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-surface-2/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 flex items-center justify-center gap-3">
                <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  FN3 Workforce Dashboard — Live
                </div>
              </div>
              <div className="text-[10px] text-text-muted font-mono">
                {count}/{47} agents active
              </div>
            </div>

            {/* Agent cards */}
            <div className="relative w-full h-full">
              {agents.map((agent, i) => (
                <AgentCard key={agent.name} agent={agent} delay={i} />
              ))}

              {/* Connection lines SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <defs>
                  <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M 0 0 L 6 3 L 0 6 z" fill="rgba(124,92,252,0.3)" />
                  </marker>
                </defs>
                {[
                  { x1: '37%', y1: '28%', x2: '62%', y2: '28%' },
                  { x1: '56%', y1: '31%', x2: '82%', y2: '23%' },
                ].map((line, i) => (
                  <motion.line
                    key={i}
                    x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                    stroke="rgba(124,92,252,0.2)"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 1 + i * 0.3, duration: 0.8 }}
                  />
                ))}
              </svg>
            </div>

            {/* Overlay gradient at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
          </div>

          {/* Stats below visual */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { value: '47', label: 'AI Agents', sub: 'across 6 departments' },
              { value: '24/7', label: 'Always Working', sub: 'no breaks, no sick days' },
              { value: '5 days', label: 'To Deploy', sub: 'intake to live agents' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="text-center p-4 bg-surface/50 border border-white/[0.06] rounded-xl"
              >
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm font-medium text-text-primary mt-1">{stat.label}</div>
                <div className="text-xs text-text-muted mt-0.5">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
