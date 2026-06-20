'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// ─── Stripe payment link ─────────────────────────────────────────────────────
const STRIPE_URL = 'https://buy.stripe.com/14A4gz90Bgn230BfbG08g0c'

// ─── Helpers ─────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ─── Phase card data ──────────────────────────────────────────────────────────
const PHASES = [
  {
    num: '01',
    label: 'Days 1–30',
    headline: 'The Foundation',
    body: 'Not about sacrifice. About clarity. By the end of Phase 1 you\'ll have done something most people postpone for years: looked at the full picture.',
    accent: '#1D3A2F',
    bg: '#EEF3F1',
  },
  {
    num: '02',
    label: 'Days 31–60',
    headline: 'The Triage',
    body: 'This is where the actual credit movement starts. Which accounts to address first — and word-for-word language to negotiate with creditors and collections agencies.',
    accent: '#7B5E4A',
    bg: '#F5EDE5',
  },
  {
    num: '03',
    label: 'Days 61–90',
    headline: 'The Build',
    body: 'Small, specific actions that begin signaling creditworthiness to the bureaus. This is how a 571 starts moving toward 620, and 620 pushes toward 660.',
    accent: '#B8955A',
    bg: '#FBF4E8',
  },
]

// ─── Deliverables ─────────────────────────────────────────────────────────────
const DELIVERABLES = [
  {
    icon: '◈',
    headline: '90-Day Step-by-Step Protocol',
    body: 'One action per day. Sometimes 3 minutes, sometimes 15. The decision is already made — your only job is to do the thing.',
  },
  {
    icon: '◎',
    headline: 'Creditor Communication Scripts',
    body: 'Word-for-word language for collections agencies, pay-for-delete negotiation, and bureau dispute letters. Written for you.',
  },
  {
    icon: '▦',
    headline: 'Weekly Tracking System',
    body: 'One page per week. Not a 47-cell spreadsheet. Intentionally minimal so you actually use it.',
  },
  {
    icon: '◉',
    headline: 'The No-Shame Mindset Framework',
    body: 'Pages 8–14. The section most people say changed how they think about money entirely. Why avoidance feels rational — and how to interrupt it.',
  },
  {
    icon: '◆',
    headline: 'Credit Utilization Optimizer',
    body: 'Shows exactly where to apply payments to move your utilization ratio the fastest. Most people pay in the wrong order for credit score impact.',
  },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: 'I\'ve tried every budgeting app. None of them stuck because they all assumed I was already motivated. This one assumed I wasn\'t — and that changed everything. Day 47, score is up 38 points.',
    name: 'Sarah K.',
    location: 'Michigan',
  },
  {
    quote: 'The creditor scripts alone were worth 10x the price. I got two collections removed in 45 days using the pay-for-delete language in Chapter 3. I didn\'t know I could even ask for that.',
    name: 'Marcus D.',
    location: 'Texas',
  },
  {
    quote: 'I bought this in January and told myself I\'d probably quit by week two like everything else. It\'s April. I\'m still going. Score went from 541 to 607. First time over 600 in four years.',
    name: 'Rachel M.',
    location: 'Ohio',
  },
]

// ─── Timeline ─────────────────────────────────────────────────────────────────
const TIMELINE = [
  { period: 'Month 1–2', headline: '+15 to +40 pts', body: 'Utilization drops. Score starts reflecting it immediately — no waiting period, no aging.' },
  { period: 'Month 2–3', headline: 'Disputes clear', body: 'Errors removed. One collection deleted can mean +50–80 points depending on what it was.' },
  { period: 'Month 3–6', headline: 'History builds', body: 'Positive payment history accumulates on any new accounts opened. Slow, but compounding.' },
  { period: 'Month 6–12', headline: '580 → 650+', body: 'Scores in the 580–620 range push toward 650+. Consolidation options open. Cards unlock.' },
  { period: 'Month 12–24', headline: 'Aging works for you', body: 'Negative items lose scoring weight. The same debt that crushed your score matters far less.' },
]

// ─────────────────────────────────────────────────────────────────────────────
export default function MoneyResetPage() {
  const heroImgRef = useRef<HTMLImageElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)
  const [navVisible, setNavVisible] = useState(false)

  // Ken Burns on hero
  useEffect(() => {
    const img = heroImgRef.current
    if (!img) return
    requestAnimationFrame(() => {
      img.style.transition = 'transform 14s ease'
      img.style.transform = 'scale(1.09)'
    })
  }, [])

  // Floating buy button after scrolling past hero
  useEffect(() => {
    const onScroll = () => setNavVisible(window.scrollY > window.innerHeight * 0.85)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Staggered hero text entrance
  useEffect(() => {
    const el = heroTextRef.current
    if (!el) return
    const children = Array.from(el.children) as HTMLElement[]
    children.forEach((child, i) => {
      child.style.opacity = '0'
      child.style.transform = 'translateY(32px)'
      setTimeout(() => {
        child.style.transition = 'opacity 0.9s ease, transform 0.9s ease'
        child.style.opacity = '1'
        child.style.transform = 'translateY(0)'
      }, 300 + i * 180)
    })
  }, [])

  return (
    <>
      {/* ── Floating sticky CTA nav ─────────────────────────────────────── */}
      <div style={{
        position: 'fixed',
        bottom: '28px',
        left: '50%',
        transform: `translateX(-50%) translateY(${navVisible ? '0' : '80px'})`,
        opacity: navVisible ? 1 : 0,
        transition: 'transform 0.4s ease, opacity 0.4s ease',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        background: 'rgba(26,23,20,0.96)',
        backdropFilter: 'blur(12px)',
        padding: '14px 24px 14px 28px',
        borderRadius: '100px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
      }}>
        <span style={{ color: 'rgba(253,250,246,0.7)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.02em' }}>
          The 90-Day Money Reset
        </span>
        <a
          href={STRIPE_URL}
          style={{
            background: 'linear-gradient(135deg, #1D3A2F, #2C4E3F)',
            color: '#FDFAF6',
            padding: '10px 24px',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 16px rgba(29,58,47,0.5)',
          }}
        >
          Get it — $17 →
        </a>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
      }}>
        {/* Full-bleed background image — Ken Burns */}
        <img
          ref={heroImgRef}
          src="/finance.jpg"
          alt="Mintbrooks — The 90-Day Money Reset"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'scale(1.0)',
            zIndex: 0,
          }}
        />

        {/* Gradient overlay — strong bottom for text legibility */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: [
            'linear-gradient(to top,',
            '  rgba(26,23,20,0.96) 0%,',
            '  rgba(26,23,20,0.72) 40%,',
            '  rgba(26,23,20,0.28) 75%,',
            '  rgba(26,23,20,0.08) 100%)',
          ].join(''),
        }} />

        {/* Decorative top accent line */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #B8955A 25%, #1D3A2F 75%, transparent)',
          zIndex: 3,
        }} />

        {/* Hero content — bottom-left anchored */}
        <div
          ref={heroTextRef}
          style={{
            position: 'relative',
            zIndex: 2,
            padding: 'clamp(40px, 6vw, 80px)',
            paddingBottom: 'clamp(80px, 10vw, 120px)',
            maxWidth: '820px',
          }}
        >
          {/* Label */}
          <span style={{
            display: 'inline-block',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#B8955A',
            marginBottom: '28px',
          }}>
            mintbrooks · personal finance
          </span>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 700,
            color: '#FDFAF6',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            margin: '0 0 28px',
          }}>
            The 90-Day
            <br />
            <em style={{ fontStyle: 'italic', color: '#B8955A' }}>Money Reset.</em>
          </h1>

          {/* Subhead */}
          <p style={{
            fontSize: 'clamp(17px, 2vw, 21px)',
            color: 'rgba(253,250,246,0.78)',
            lineHeight: 1.6,
            margin: '0 0 48px',
            maxWidth: '520px',
            fontWeight: 400,
          }}>
            A step-by-step protocol for people who already know what they should do —
            and need a structure that makes actually doing it feel possible.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href={STRIPE_URL}
              style={{
                background: 'linear-gradient(135deg, #1D3A2F, #2C4E3F)',
                color: '#FDFAF6',
                padding: '18px 40px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '0 6px 28px rgba(29,58,47,0.45)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 36px rgba(29,58,47,0.55)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 6px 28px rgba(29,58,47,0.45)'
              }}
            >
              Start my reset — $17
            </a>
            <a
              href="#how-it-works"
              style={{
                background: 'rgba(253,250,246,0.08)',
                backdropFilter: 'blur(8px)',
                color: 'rgba(253,250,246,0.82)',
                border: '1.5px solid rgba(253,250,246,0.2)',
                padding: '18px 40px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(253,250,246,0.14)'
                e.currentTarget.style.color = '#FDFAF6'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(253,250,246,0.08)'
                e.currentTarget.style.color = 'rgba(253,250,246,0.82)'
              }}
            >
              How it works ↓
            </a>
          </div>

          {/* Trust bar */}
          <div style={{
            marginTop: '32px',
            display: 'flex',
            gap: '28px',
            flexWrap: 'wrap',
          }}>
            {['One-time $17', 'Instant PDF delivery', '60-day guarantee'].map(t => (
              <span key={t} style={{
                fontSize: '12px',
                color: 'rgba(253,250,246,0.5)',
                letterSpacing: '0.04em',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <span style={{ color: '#B8955A', fontSize: '10px' }}>✓</span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM — dark forest ─────────────────────────────────────────── */}
      <ProblemSection />

      {/* ── HOW IT WORKS — 3-phase mechanism ────────────────────────────── */}
      <PhaseSection />

      {/* ── WHAT'S INSIDE — deliverables grid ───────────────────────────── */}
      <DeliverablesSection />

      {/* ── HONEST TIMELINE ──────────────────────────────────────────────── */}
      <TimelineSection />

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ── BUY ──────────────────────────────────────────────────────────── */}
      <BuySection />

      {/* ── GUARANTEE ────────────────────────────────────────────────────── */}
      <GuaranteeSection />

      {/* ── CLOSE ────────────────────────────────────────────────────────── */}
      <CloseSection />

      {/* Page-level styles */}
      <style>{`
        @media (max-width: 640px) {
          .phase-grid { grid-template-columns: 1fr !important; }
          .deliverable-grid { grid-template-columns: 1fr !important; }
          .testimonial-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .phase-grid { grid-template-columns: 1fr 1fr !important; }
          .deliverable-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  )
}

// ─── PROBLEM SECTION ─────────────────────────────────────────────────────────
function ProblemSection() {
  const { ref, visible } = useInView()
  return (
    <section style={{
      background: '#1D3A2F',
      padding: 'clamp(80px, 12vw, 160px) clamp(40px, 8vw, 120px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative oversized character */}
      <div aria-hidden style={{
        position: 'absolute',
        right: '-40px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: '"Playfair Display", Georgia, serif',
        fontSize: 'clamp(240px, 30vw, 420px)',
        fontWeight: 700,
        color: 'rgba(253,250,246,0.025)',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        $
      </div>

      <div
        ref={ref}
        style={{
          maxWidth: '840px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}
      >
        <span style={{
          display: 'block',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(184,149,90,0.8)',
          marginBottom: '32px',
        }}>
          The real problem
        </span>

        <h2 style={{
          fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 700,
          color: '#FDFAF6',
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
          margin: '0 0 40px',
        }}>
          You know what
          <em style={{ fontStyle: 'italic', color: '#B8955A' }}> you should do.</em>
          <br />You're just not doing it.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
        }}
          className="problem-cols"
        >
          <div>
            <p style={{
              fontSize: 'clamp(16px, 1.8vw, 19px)',
              color: 'rgba(253,250,246,0.72)',
              lineHeight: 1.75,
              margin: '0 0 24px',
            }}>
              You've watched the videos. Downloaded the apps. Made the budget in
              the notes app at 11pm and felt briefly hopeful. You know the debt
              avalanche. You know your utilization is too high.
            </p>
            <p style={{
              fontSize: 'clamp(16px, 1.8vw, 19px)',
              color: 'rgba(253,250,246,0.72)',
              lineHeight: 1.75,
              margin: 0,
            }}>
              And yet — you close the banking app without looking at the balance.
              The envelope from collections goes in the pile. You'll start fresh
              on the 1st. Then the 1st comes.
            </p>
          </div>
          <div>
            <blockquote style={{
              borderLeft: '3px solid #B8955A',
              paddingLeft: '28px',
              margin: 0,
            }}>
              <p style={{
                fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                fontSize: 'clamp(20px, 2.5vw, 28px)',
                fontStyle: 'italic',
                color: '#FDFAF6',
                lineHeight: 1.45,
                margin: '0 0 20px',
                fontWeight: 700,
              }}>
                "This is not a knowledge problem.
                This is not a willpower problem."
              </p>
              <p style={{
                fontSize: '15px',
                color: 'rgba(253,250,246,0.55)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                This is financial avoidance — and it has almost nothing to do
                with how smart you are or how much you care. Logic doesn't fix
                avoidance. Structure does.
              </p>
            </blockquote>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .problem-cols { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  )
}

// ─── PHASE SECTION ────────────────────────────────────────────────────────────
function PhaseSection() {
  return (
    <section
      id="how-it-works"
      style={{
        background: '#FDFAF6',
        padding: 'clamp(80px, 10vw, 140px) clamp(40px, 6vw, 80px)',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '60px' }}>
        <span style={{
          display: 'block',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#B8955A',
          marginBottom: '16px',
        }}>
          The Credit Sequence
        </span>
        <h2 style={{
          fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 700,
          color: '#1A1714',
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
          margin: '0 0 20px',
          maxWidth: '600px',
        }}>
          Why this works when
          <em style={{ fontStyle: 'italic' }}> nothing else did.</em>
        </h2>
        <p style={{
          fontSize: 'clamp(15px, 1.6vw, 18px)',
          color: '#6B6557',
          lineHeight: 1.65,
          maxWidth: '560px',
          margin: 0,
        }}>
          Credit bureaus respond to <strong style={{ color: '#1A1714' }}>sequence.</strong> Most people
          try to fix everything at once — dispute, pay off, open a secured card, reduce utilization —
          simultaneously, in the wrong order. The score barely moves. Or drops.
          The Credit Sequence gives you the correct order of operations.
        </p>
      </div>

      {/* Phase cards */}
      <div
        className="phase-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}
      >
        {PHASES.map((p, i) => (
          <PhaseCard key={p.num} phase={p} index={i} />
        ))}
      </div>

      {/* Below-grid note */}
      <p style={{
        marginTop: '48px',
        fontSize: '14px',
        color: '#9B9388',
        lineHeight: 1.6,
        maxWidth: '540px',
        borderLeft: '2px solid #E8E2D8',
        paddingLeft: '20px',
      }}>
        There is no Phase 4 where you maintain a complicated system forever.
        After 90 days, you'll have built habits that run on autopilot.
        That's the design.
      </p>
    </section>
  )
}

function PhaseCard({ phase, index }: { phase: typeof PHASES[0]; index: number }) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      style={{
        background: phase.bg,
        borderRadius: '20px',
        padding: '44px 36px',
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.7s ease ${index * 100}ms, transform 0.7s ease ${index * 100}ms`,
        cursor: 'default',
      }}
    >
      {/* Big decorative number */}
      <div aria-hidden style={{
        position: 'absolute',
        right: '-8px',
        top: '-10px',
        fontFamily: '"Playfair Display", Georgia, serif',
        fontSize: '120px',
        fontWeight: 700,
        color: phase.accent,
        opacity: 0.07,
        lineHeight: 1,
        userSelect: 'none',
      }}>
        {phase.num}
      </div>

      {/* Phase label */}
      <span style={{
        display: 'inline-block',
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: phase.accent,
        marginBottom: '20px',
        opacity: 0.7,
      }}>
        {phase.label}
      </span>

      {/* Headline */}
      <h3 style={{
        fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
        fontSize: 'clamp(24px, 2.8vw, 32px)',
        fontWeight: 700,
        color: '#1A1714',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        margin: '0 0 16px',
      }}>
        {phase.headline}
      </h3>

      {/* Body */}
      <p style={{
        fontSize: '15px',
        color: '#5A5147',
        lineHeight: 1.7,
        margin: 0,
      }}>
        {phase.body}
      </p>
    </div>
  )
}

// ─── DELIVERABLES SECTION ──────────────────────────────────────────────────────
function DeliverablesSection() {
  const { ref, visible } = useInView()
  return (
    <section style={{
      background: '#1A1714',
      padding: 'clamp(80px, 10vw, 140px) clamp(40px, 6vw, 80px)',
    }}>
      <div
        ref={ref}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '60px',
          gap: '24px',
          flexWrap: 'wrap',
        }}>
          <div>
            <span style={{
              display: 'block',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(184,149,90,0.75)',
              marginBottom: '16px',
            }}>
              What you get
            </span>
            <h2 style={{
              fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 700,
              color: '#FDFAF6',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              margin: 0,
            }}>
              Everything you need.
              <br />
              <em style={{ fontStyle: 'italic', color: '#B8955A' }}>Nothing you don't.</em>
            </h2>
          </div>

          {/* Price callout */}
          <div style={{
            background: 'rgba(253,250,246,0.05)',
            border: '1px solid rgba(253,250,246,0.1)',
            borderRadius: '16px',
            padding: '24px 32px',
            textAlign: 'center',
            flexShrink: 0,
          }}>
            <div style={{
              fontSize: '13px',
              color: 'rgba(253,250,246,0.45)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}>
              One-time
            </div>
            <div style={{
              fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
              fontSize: '56px',
              fontWeight: 700,
              color: '#FDFAF6',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}>
              $17
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(253,250,246,0.35)', marginTop: '6px' }}>
              Instant PDF delivery
            </div>
          </div>
        </div>

        {/* Deliverables grid */}
        <div
          className="deliverable-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '2px',
          }}
        >
          {DELIVERABLES.map((d) => (
            <div
              key={d.headline}
              style={{
                background: 'rgba(253,250,246,0.04)',
                borderRadius: '4px',
                padding: '36px 28px',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(253,250,246,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(253,250,246,0.04)')}
            >
              <div style={{
                fontSize: '28px',
                color: '#B8955A',
                marginBottom: '20px',
                opacity: 0.7,
              }}>
                {d.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                fontSize: '17px',
                fontWeight: 700,
                color: '#FDFAF6',
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
                margin: '0 0 12px',
              }}>
                {d.headline}
              </h3>
              <p style={{
                fontSize: '13px',
                color: 'rgba(253,250,246,0.5)',
                lineHeight: 1.65,
                margin: 0,
              }}>
                {d.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: '56px', display: 'flex', justifyContent: 'center' }}>
          <a
            href={STRIPE_URL}
            style={{
              background: 'linear-gradient(135deg, #B8955A, #9A7A42)',
              color: '#1A1714',
              padding: '20px 56px',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 6px 32px rgba(184,149,90,0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(184,149,90,0.45)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 6px 32px rgba(184,149,90,0.35)'
            }}
          >
            Get everything — $17
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .deliverable-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 580px) {
          .deliverable-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

// ─── TIMELINE SECTION ─────────────────────────────────────────────────────────
function TimelineSection() {
  const { ref, visible } = useInView()
  return (
    <section style={{
      background: '#FDFAF6',
      padding: 'clamp(80px, 10vw, 140px) clamp(40px, 6vw, 80px)',
    }}>
      <div
        ref={ref}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <span style={{
          display: 'block',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#B8955A',
          marginBottom: '16px',
        }}>
          Honest expectations
        </span>
        <h2 style={{
          fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 700,
          color: '#1A1714',
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
          margin: '0 0 64px',
          maxWidth: '520px',
        }}>
          What to expect.
          <em style={{ fontStyle: 'italic' }}> Real numbers.</em>
        </h2>

        {/* Timeline track */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '119px',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'linear-gradient(to bottom, #1D3A2F, rgba(29,58,47,0.1))',
          }} className="timeline-line" />

          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {TIMELINE.map((item, i) => (
              <div
                key={item.period}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 40px 1fr',
                  gap: '0 24px',
                  alignItems: 'center',
                  padding: '28px 0',
                  borderBottom: i < TIMELINE.length - 1 ? '1px solid #F0EDE6' : 'none',
                }}
                className="timeline-row"
              >
                {/* Period */}
                <span style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: '#9B9388',
                  textTransform: 'uppercase',
                  textAlign: 'right',
                }}>
                  {item.period}
                </span>

                {/* Node */}
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#1D3A2F',
                  border: '3px solid #FDFAF6',
                  boxShadow: '0 0 0 1.5px #1D3A2F',
                  justifySelf: 'center',
                  flexShrink: 0,
                  zIndex: 1,
                  position: 'relative',
                }} />

                {/* Content */}
                <div>
                  <h4 style={{
                    fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                    fontSize: 'clamp(18px, 2.2vw, 24px)',
                    fontWeight: 700,
                    color: '#1A1714',
                    margin: '0 0 6px',
                    letterSpacing: '-0.015em',
                  }}>
                    {item.headline}
                  </h4>
                  <p style={{
                    fontSize: '15px',
                    color: '#6B6557',
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Caveat */}
        <div style={{
          marginTop: '48px',
          padding: '24px 28px',
          background: 'rgba(29,58,47,0.06)',
          borderRadius: '12px',
          borderLeft: '3px solid #1D3A2F',
          maxWidth: '640px',
        }}>
          <p style={{
            fontSize: '15px',
            color: '#1A1714',
            lineHeight: 1.65,
            margin: 0,
            fontWeight: 500,
          }}>
            The most important thing you can do right now: stop adding new derogatory items.
            Everything else in this guide is working forward. New missed payments work backward.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 580px) {
          .timeline-line { left: 0 !important; display: none; }
          .timeline-row { grid-template-columns: 1fr !important; gap: 8px !important; }
          .timeline-row > span:first-child { text-align: left !important; }
          .timeline-row > div:nth-child(2) { display: none; }
        }
      `}</style>
    </section>
  )
}

// ─── TESTIMONIALS SECTION ─────────────────────────────────────────────────────
function TestimonialsSection() {
  const { ref, visible } = useInView()
  return (
    <section style={{
      background: '#F0EDE8',
      padding: 'clamp(80px, 10vw, 140px) clamp(40px, 6vw, 80px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background image fade */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/newsletter.jpg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.12 }}
          aria-hidden
        />
      </div>

      <div ref={ref} style={{ position: 'relative', zIndex: 1 }}>
        <span style={{
          display: 'block',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#B8955A',
          marginBottom: '16px',
        }}>
          Real results
        </span>
        <h2 style={{
          fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 700,
          color: '#1A1714',
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
          margin: '0 0 60px',
          maxWidth: '480px',
        }}>
          Real people.
          <em style={{ fontStyle: 'italic' }}> Real scores.</em>
        </h2>

        {/* NOTE: Replace these with real testimonials before running paid ads */}
        <div
          className="testimonial-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              style={{
                background: '#FDFAF6',
                borderRadius: '20px',
                padding: '36px 32px',
                boxShadow: '0 2px 24px rgba(26,23,20,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {/* Stars */}
              <div style={{ color: '#B8955A', fontSize: '14px', letterSpacing: '3px' }}>
                ★★★★★
              </div>

              {/* Quote */}
              <blockquote style={{
                margin: 0,
                fontSize: '15px',
                color: '#2A2520',
                lineHeight: 1.72,
                fontStyle: 'italic',
                flex: 1,
              }}>
                "{t.quote}"
              </blockquote>

              {/* Attribution */}
              <div style={{
                fontSize: '13px',
                color: '#9B9388',
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}>
                — {t.name}, verified buyer · {t.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── BUY SECTION ──────────────────────────────────────────────────────────────
function BuySection() {
  const { ref, visible } = useInView()
  return (
    <section
      id="buy"
      style={{
        background: '#1D3A2F',
        padding: 'clamp(80px, 12vw, 160px) clamp(40px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(184,149,90,0.06) 0%, transparent 70%)',
        zIndex: 0,
      }} />

      <div
        ref={ref}
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <span style={{
          display: 'block',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(184,149,90,0.75)',
          marginBottom: '24px',
        }}>
          Get started today
        </span>

        <h2 style={{
          fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 700,
          color: '#FDFAF6',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          margin: '0 0 16px',
        }}>
          The 90-Day Money Reset.
        </h2>

        <p style={{
          fontSize: 'clamp(17px, 1.8vw, 20px)',
          color: 'rgba(253,250,246,0.62)',
          lineHeight: 1.6,
          maxWidth: '480px',
          margin: '0 0 60px',
        }}>
          One payment. Instant PDF delivery. The full Credit Sequence —
          everything you need to go from avoidance to action in 90 days.
        </p>

        {/* Pricing card */}
        <div style={{
          background: '#FDFAF6',
          borderRadius: '24px',
          padding: 'clamp(36px, 5vw, 56px)',
          maxWidth: '440px',
          width: '100%',
          boxShadow: '0 24px 80px rgba(0,0,0,0.28)',
        }}>
          {/* Price */}
          <div style={{
            fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
            fontSize: '80px',
            fontWeight: 700,
            color: '#1A1714',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            marginBottom: '8px',
          }}>
            $17
          </div>
          <div style={{
            fontSize: '13px',
            color: '#9B9388',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}>
            One-time · No subscription
          </div>

          {/* Feature checklist */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '36px',
            textAlign: 'left',
          }}>
            {[
              '90-Day Step-by-Step Protocol PDF',
              'Creditor Communication Scripts',
              'Weekly Tracking System',
              'No-Shame Mindset Framework',
              'Credit Utilization Optimizer',
              '60-Day Money-Back Guarantee',
            ].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{
                  color: '#1D3A2F',
                  fontWeight: 700,
                  fontSize: '14px',
                  flexShrink: 0,
                  marginTop: '1px',
                }}>✓</span>
                <span style={{ fontSize: '14px', color: '#2A2520', lineHeight: 1.4 }}>{f}</span>
              </div>
            ))}
          </div>

          {/* Main CTA */}
          <a
            href={STRIPE_URL}
            style={{
              display: 'block',
              background: 'linear-gradient(135deg, #1D3A2F, #2C4E3F)',
              color: '#FDFAF6',
              padding: '18px 32px',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              textAlign: 'center',
              boxShadow: '0 6px 28px rgba(29,58,47,0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 12px 36px rgba(29,58,47,0.45)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 6px 28px rgba(29,58,47,0.35)'
            }}
          >
            Start my reset — $17
          </a>

          {/* Security line */}
          <p style={{
            fontSize: '12px',
            color: '#9B9388',
            marginTop: '16px',
            letterSpacing: '0.02em',
            textAlign: 'center',
          }}>
            Secure checkout via Stripe · hello@mintbrooks.com
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── GUARANTEE SECTION ────────────────────────────────────────────────────────
function GuaranteeSection() {
  const { ref, visible } = useInView()
  return (
    <section style={{
      background: '#FDFAF6',
      padding: 'clamp(64px, 8vw, 100px) clamp(40px, 6vw, 80px)',
      borderBottom: '1px solid #F0EDE6',
    }}>
      <div
        ref={ref}
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          display: 'flex',
          gap: '32px',
          alignItems: 'flex-start',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        {/* Badge */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: '#1D3A2F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: '28px',
          color: '#B8955A',
          boxShadow: '0 4px 24px rgba(29,58,47,0.25)',
        }}>
          60
        </div>

        <div>
          <h3 style={{
            fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
            fontSize: 'clamp(22px, 3vw, 30px)',
            fontWeight: 700,
            color: '#1A1714',
            margin: '0 0 14px',
            letterSpacing: '-0.02em',
          }}>
            The 60-Day Guarantee
          </h3>
          <p style={{
            fontSize: '15px',
            color: '#6B6557',
            lineHeight: 1.72,
            margin: '0 0 12px',
          }}>
            Follow the Phase 1 and Phase 2 actions. Complete at least 45 of the first 60 days.
            If you haven't seen measurable movement — a score increase, a debt removed, a
            creditor communication resolved — email us for a full refund. No interrogation.
            No "prove it." You did the work. If it didn't move the needle, you get your $17 back.
          </p>
          <p style={{
            fontSize: '13px',
            color: '#9B9388',
            lineHeight: 1.6,
            margin: 0,
            fontStyle: 'italic',
          }}>
            $17 is less than one missed payment's penalty fee.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── CLOSE SECTION ────────────────────────────────────────────────────────────
function CloseSection() {
  const { ref, visible } = useInView()
  return (
    <section style={{
      background: '#1A1714',
      padding: 'clamp(100px, 14vw, 180px) clamp(40px, 8vw, 120px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background image, very faded */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/hero.jpg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.06 }}
          aria-hidden
        />
      </div>

      <div
        ref={ref}
        style={{
          maxWidth: '680px',
          position: 'relative',
          zIndex: 1,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}
      >
        <h2 style={{
          fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
          fontSize: 'clamp(36px, 6vw, 68px)',
          fontWeight: 700,
          color: '#FDFAF6',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          margin: '0 0 36px',
        }}>
          The credit score you want
          <br />
          <em style={{ fontStyle: 'italic', color: '#B8955A' }}>is 90 days away.</em>
        </h2>

        <p style={{
          fontSize: 'clamp(16px, 1.8vw, 19px)',
          color: 'rgba(253,250,246,0.65)',
          lineHeight: 1.75,
          margin: '0 0 20px',
        }}>
          You've been here before. Not on this page — in this moment. The moment
          where you're considering doing something about the number, about the
          avoidance, about the quiet hum of financial anxiety that's been running
          in the background of your life.
        </p>

        <p style={{
          fontSize: 'clamp(16px, 1.8vw, 19px)',
          color: 'rgba(253,250,246,0.65)',
          lineHeight: 1.75,
          margin: '0 0 52px',
        }}>
          You might close this tab. Those are all things you've done before.
          Or: you could spend $17 today — one time, no subscription — and get a
          day-by-day path out of avoidance built specifically for a person who
          already knows what they should do.
        </p>

        <a
          href={STRIPE_URL}
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #B8955A, #9A7A42)',
            color: '#1A1714',
            padding: '20px 56px',
            borderRadius: '100px',
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            boxShadow: '0 6px 32px rgba(184,149,90,0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            marginBottom: '48px',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(184,149,90,0.42)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 6px 32px rgba(184,149,90,0.3)'
          }}
        >
          The only question is whether you start counting today
        </a>

        {/* P.S. */}
        <div style={{
          borderTop: '1px solid rgba(253,250,246,0.1)',
          paddingTop: '32px',
        }}>
          <p style={{
            fontSize: '14px',
            color: 'rgba(253,250,246,0.4)',
            lineHeight: 1.75,
            margin: 0,
            fontStyle: 'italic',
          }}>
            P.S. — The most common thing people say after buying this guide is: "I wish I'd done
            this two years ago." The second most common: "I can't believe how manageable this felt."
            You've been postponing this for at least that long. The shame you feel about the number
            is keeping the number exactly where it is. $17 and 90 days is a very small trade for
            the thing you've been carrying.
          </p>
        </div>
      </div>

      {/* Affiliate disclosure */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        marginTop: '80px',
        paddingTop: '32px',
        borderTop: '1px solid rgba(253,250,246,0.07)',
        maxWidth: '680px',
      }}>
        <p style={{
          fontSize: '11px',
          color: 'rgba(253,250,246,0.25)',
          lineHeight: 1.7,
          margin: 0,
        }}>
          This guide is for personal educational use only and does not constitute financial or legal advice.
          For debt amounts above $10,000 or situations involving wage garnishment, consult a nonprofit credit counselor —
          NFCC.org offers free counseling. Some products recommended in this guide (Yendo, SlamDunk Finance)
          are affiliate partners. mintbrooks may receive compensation if you use their services.
          This does not affect what you pay or the quality of the recommendation.
        </p>
      </div>
    </section>
  )
}
