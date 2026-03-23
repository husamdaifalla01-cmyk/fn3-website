'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const stagger: Variants = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

const fadeUp: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

// ─── Ops Flow Trace ───────────────────────────────────────────────────────────

const SCENARIOS = [
  { input: 'lead arrives',     agent: 'qualifies',   output: 'booked'    },
  { input: 'invoice created',  agent: 'reconciles',  output: 'filed'     },
  { input: 'support ticket',   agent: 'triages',     output: 'resolved'  },
  { input: 'appt. request',    agent: 'schedules',   output: 'confirmed' },
  { input: 'contractor req.',  agent: 'dispatches',  output: 'assigned'  },
]

function OpsFlowTrace() {
  const [scene, setScene] = useState(0)
  const [phase, setPhase] = useState<0 | 1 | 2>(0) // 0=input, 1=agent, 2=output

  useEffect(() => {
    const t = setInterval(() => setScene(s => (s + 1) % SCENARIOS.length), 3800)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    // Sync phase transitions with packet animation times
    // packet times: [0, 0.34, 0.38, 0.74, 0.78, 1] over 3800ms
    const cycle = () => {
      setPhase(0)
      const t1 = setTimeout(() => setPhase(1), 3800 * 0.34) // ~1292ms — ball hits agent
      const t2 = setTimeout(() => setPhase(2), 3800 * 0.74) // ~2812ms — ball hits output
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
    let cleanup = cycle()
    const interval = setInterval(() => { cleanup(); cleanup = cycle() }, 3800)
    return () => { clearInterval(interval); cleanup() }
  }, [])

  const scenario = SCENARIOS[scene]
  const W = 460
  const nodeY = 20
  const x1 = 18
  const x2 = W / 2
  const x3 = W - 18

  return (
    <div className="w-full max-w-[460px]">
      {/* Flow diagram */}
      <svg width="100%" viewBox={`0 0 ${W} 42`} className="overflow-visible mb-2">
        {/* Track lines */}
        <line x1={x1} y1={nodeY} x2={x2} y2={nodeY} stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
        <line x1={x2} y1={nodeY} x2={x3} y2={nodeY} stroke="rgba(255,255,255,0.14)" strokeWidth="1" />

        {/* Input node */}
        <circle cx={x1} cy={nodeY} r="5" fill="none" strokeWidth="1"
          stroke="white"
          style={{ opacity: phase === 0 ? 0.9 : 0.25, transition: 'opacity 0.3s ease' }} />

        {/* Agent node — slightly larger, inner dot */}
        <circle cx={x2} cy={nodeY} r="8" fill="none" strokeWidth="1"
          stroke="white"
          style={{ opacity: phase === 1 ? 0.9 : 0.25, transition: 'opacity 0.3s ease' }} />
        <circle cx={x2} cy={nodeY} r="3" fill="white"
          style={{ opacity: phase === 1 ? 0.7 : 0.25, transition: 'opacity 0.3s ease' }} />

        {/* Output node */}
        <circle cx={x3} cy={nodeY} r="5" fill="none" strokeWidth="1"
          stroke="white"
          style={{ opacity: phase === 2 ? 0.9 : 0.25, transition: 'opacity 0.3s ease' }} />

        {/* Traveling packet */}
        <motion.circle
          cy={nodeY}
          r="3"
          fill="white"
          animate={{
            cx:      [x1,  x2,   x2,   x3,   x3,   x1  ],
            opacity: [1,   1,    1,    1,    0,    0   ],
          }}
          transition={{
            duration: 3.8,
            times:    [0, 0.34, 0.38, 0.74, 0.78, 1],
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Node type labels */}
        <text x={x1} y={38} textAnchor="middle" fill="white" fontSize="9" fontFamily="ui-monospace,monospace" letterSpacing="1.5"
          style={{ opacity: phase === 0 ? 0.9 : 0.3, transition: 'opacity 0.3s ease' }}>INPUT</text>
        <text x={x2} y={41} textAnchor="middle" fill="white" fontSize="9" fontFamily="ui-monospace,monospace" letterSpacing="1.5"
          style={{ opacity: phase === 1 ? 0.9 : 0.3, transition: 'opacity 0.3s ease' }}>AGENT</text>
        <text x={x3} y={38} textAnchor="middle" fill="white" fontSize="9" fontFamily="ui-monospace,monospace" letterSpacing="1.5"
          style={{ opacity: phase === 2 ? 0.9 : 0.3, transition: 'opacity 0.3s ease' }}>OUTPUT</text>
      </svg>

      {/* Scenario labels — cross-fade on scene change */}
      <motion.div
        key={scene}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between"
      >
        <span className="font-mono text-[12px] w-[33%] text-left" style={{ color: 'white', opacity: phase === 0 ? 1 : 0.35, fontWeight: phase === 0 ? 600 : 400, transition: 'opacity 0.3s ease, font-weight 0.3s ease' }}>{scenario.input}</span>
        <span className="font-mono text-[12px] w-[33%] text-center" style={{ color: 'white', opacity: phase === 1 ? 1 : 0.35, fontWeight: phase === 1 ? 600 : 400, transition: 'opacity 0.3s ease, font-weight 0.3s ease' }}>{scenario.agent}</span>
        <span className="font-mono text-[12px] w-[33%] text-right" style={{ color: 'white', opacity: phase === 2 ? 1 : 0.35, fontWeight: phase === 2 ? 600 : 400, transition: 'opacity 0.3s ease, font-weight 0.3s ease' }}>{scenario.output}</span>
      </motion.div>
    </div>
  )
}

// ─── Live Ops Feed ─────────────────────────────────────────────────────────────

const OPS_POOL = [
  { agent: 'scheduler',  task: 'synced 312 appointments',    ms: '380ms',  tag: 'SUBZII'      },
  { agent: 'pricing',    task: 'updated 89 event listings',  ms: '1.2s',   tag: 'SUBZII'      },
  { agent: 'intake',     task: 'qualified 14 inbound leads', ms: '820ms',  tag: 'DETAILMAPS'  },
  { agent: 'dispatch',   task: 'routed 7 contractors',       ms: '290ms',  tag: 'DRYJETS'     },
  { agent: 'forecast',   task: 'ran demand model',           ms: '2.1s',   tag: 'SUBZII'      },
  { agent: 'compliance', task: 'flagged 3 patient records',  ms: '610ms',  tag: 'DAWA'        },
  { agent: 'comms',      task: 'dispatched 204 reminders',   ms: '1.8s',   tag: 'DETAILMAPS'  },
  { agent: 'analytics',  task: 'compiled weekly report',     ms: '3.2s',   tag: 'FN3'         },
  { agent: 'billing',    task: 'reconciled 41 invoices',     ms: '940ms',  tag: 'DRYJETS'     },
  { agent: 'triage',     task: 'processed 88 requests',      ms: '510ms',  tag: 'DAWA'        },
  { agent: 'inventory',  task: 'rebalanced stock levels',    ms: '760ms',  tag: 'DETAILMAPS'  },
  { agent: 'scoring',    task: 'ranked 33 applicants',       ms: '1.4s',   tag: 'FN3'         },
]

type OpsEntry = typeof OPS_POOL[0] & { id: number }

function LiveOpsFeed() {
  const [entries, setEntries] = useState<OpsEntry[]>([])
  const [total, setTotal] = useState(4817)
  const counterRef = useRef(4817)
  const poolIndex = useRef(0)
  const idRef = useRef(0)

  useEffect(() => {
    const initial: OpsEntry[] = []
    for (let i = 0; i < 7; i++) {
      initial.push({ ...OPS_POOL[i % OPS_POOL.length], id: idRef.current++ })
    }
    poolIndex.current = 7
    setEntries(initial)

    const interval = setInterval(() => {
      const next = OPS_POOL[poolIndex.current % OPS_POOL.length]
      poolIndex.current++
      counterRef.current += Math.floor(Math.random() * 3) + 1
      setTotal(counterRef.current)
      setEntries(prev => {
        const updated = [...prev, { ...next, id: idRef.current++ }]
        return updated.slice(-12)
      })
    }, 1800)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      className="w-full max-w-[500px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-fn3-red-faint">
        <p className="font-mono text-[13px] uppercase tracking-[0.1em] font-semibold text-[#1c1917]">Active Operations</p>
        <div className="flex items-center gap-2">
          <motion.span
            className="w-2 h-2 rounded-full bg-fn3-red"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span className="font-mono text-[12px] uppercase tracking-[0.1em] font-semibold text-fn3-red">Running</span>
        </div>
      </div>

      {/* Log rows */}
      <div className="min-h-[440px]">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: i === entries.length - 1 ? 1 : 0.45 + (i / entries.length) * 0.55 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-[100px_1fr_52px] gap-4 items-baseline py-3 border-b border-fn3-red-faint"
          >
            <span className="label-mono text-fn3-red-light truncate">
              {entry.agent}
            </span>
            <span className="text-[14px] text-[#1c1917] leading-snug truncate">
              {entry.task}
            </span>
            <span className="font-mono text-[11px] text-[#9ca3af] text-right">
              {entry.ms}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Footer — large editorial counter */}
      <div className="pt-5 border-t border-fn3-red-faint flex items-baseline gap-4">
        <motion.span
          key={total}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          className="font-serif text-[52px] text-[#1c1917] leading-none tabular-nums"
        >
          {total.toLocaleString()}
        </motion.span>
        <span className="label-mono text-[#9ca3af]">tasks completed today</span>
      </div>
    </motion.div>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

export function HomeHero() {
  return (
    <section className="relative bg-fn3-red px-6 lg:px-12 pt-[72px] pb-[90px] min-h-[82vh] flex flex-col justify-center overflow-hidden">

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* White diagonal panel — desktop only */}
      <div
        className="absolute inset-0 hidden lg:block pointer-events-none"
        style={{
          background: 'white',
          clipPath: 'polygon(58% 0%, 100% 0%, 100% 100%, 44% 100%)',
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-10 lg:gap-2 items-center">

        <motion.div variants={stagger} initial="initial" animate="animate">

          {/* Eyebrow */}
          <motion.p variants={fadeUp} className="label-mono text-white/50 mb-8">
            FN3 — Operational Intelligence
          </motion.p>

          {/* Ops flow trace — sits where clarifying block was */}
          <motion.div variants={fadeUp} className="mb-8">
            <OpsFlowTrace />
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(38px,5vw,64px)] text-white leading-[1.02] tracking-[-0.05em] mb-6"
          >
            Your business,<br />
            run on AI.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p variants={fadeUp} className="text-[16px] text-white/75 leading-[1.75] max-w-[460px] mb-8">
            We deploy AI agents and automation into your operations —
            eliminating manual work, cutting overhead, and building systems
            that scale. The same infrastructure we run inside our own ventures.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5">
            <Link
              href="/how-we-work"
              className="inline-block bg-white text-fn3-red font-mono text-[11px] uppercase tracking-[0.1em] font-bold px-6 py-3.5 hover:bg-white/90 transition-colors duration-150"
            >
              See How We Work →
            </Link>
            <Link
              href="/what-weve-built"
              className="inline-block font-mono text-[11px] uppercase tracking-[0.1em] text-white/70 border-b border-white/30 hover:text-white hover:border-white pb-px transition-colors duration-150"
            >
              View Our Ventures
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: live ops feed */}
        <div className="hidden lg:flex justify-center items-center">
          <LiveOpsFeed />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-7 left-6 lg:left-12 right-6 lg:right-12 flex items-center justify-between">
        <p className="label-mono text-white/40">Scroll to explore ↓</p>
        <div className="flex items-center gap-2">
          <motion.span
            className="inline-block w-1.5 h-1.5 rounded-full bg-white/60"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="label-mono text-white/40">System Active</span>
        </div>
      </div>
    </section>
  )
}
