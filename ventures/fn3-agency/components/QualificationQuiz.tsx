'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type QuizAnswers = {
  bottleneck: string
  teamSize: string
  revenue: string
  timeline: string
  aiExperience: string
}

const questions = [
  {
    id: 'bottleneck',
    question: "What's your biggest bottleneck right now?",
    options: ['Sales', 'Operations', 'Customer Service', 'Marketing', 'Finance'],
    insight: {
      Sales: "FN3's 8 Sales agents typically reduce proposal time by 80% in the first 30 days.",
      Operations: "Our Ops agents eliminate ~70% of manual reporting and data entry across most deployments.",
      'Customer Service': "FN3 Support agents resolve 60–80% of inbound tickets without human intervention.",
      Marketing: "Content + SEO agents generate 3–5x more output than a single in-house hire.",
      Finance: "Finance agents cut invoice processing time from hours to minutes — at 99.8% accuracy.",
    },
  },
  {
    id: 'teamSize',
    question: 'How many employees handle this bottleneck today?',
    options: ['1–2', '3–5', '6–10', '10+'],
    insight: {
      '1–2': "Perfect fit — FN3 acts as a force multiplier, giving 1–2 people the output of a full team.",
      '3–5': "Clients with 3–5 person teams typically see the fastest ROI — usually under 8 weeks.",
      '6–10': "Mid-size teams often find 50–60% of their workload is automatable. We build exactly what fits.",
      '10+': "For larger teams, FN3 deploys department-specific agents across multiple functions in parallel.",
    },
  },
  {
    id: 'revenue',
    question: "What's your current monthly revenue?",
    options: ['$0–10K', '$10–50K', '$50–250K', '$250K+'],
    insight: {
      '$0–10K': "Our Starter plan is designed for early-stage teams — you get 8 agents and immediate automation.",
      '$10–50K': "Growth-stage companies see the highest percentage ROI — often 300–500% in year one.",
      '$50–250K': "At this revenue level, Growth or Enterprise plans typically pay back within 6 weeks.",
      '$250K+': "Enterprise clients get dedicated deployment + white-glove onboarding across all 6 departments.",
    },
  },
  {
    id: 'timeline',
    question: 'How quickly do you need results?',
    options: ['ASAP', '1–3 months', '3–6 months', 'Exploring'],
    insight: {
      ASAP: "We can deploy your first agents within 7 business days. Most clients see output by day 10.",
      '1–3 months': "Our standard deployment runs 2–4 weeks. You'll have agents running well within that window.",
      '3–6 months': "We'll map out a full 90-day rollout plan and start with your highest-impact bottleneck.",
      Exploring: "No pressure — we'll send a custom analysis based on your answers so you can evaluate properly.",
    },
  },
  {
    id: 'aiExperience',
    question: 'Have you tried AI tools before?',
    options: ['Yes, failed', 'Yes, partial success', 'No, starting fresh'],
    insight: {
      'Yes, failed': "Most AI tool failures stem from generic tools with no integration. FN3 builds custom agents for your exact workflow.",
      'Yes, partial success': "We start from what worked and build on it — no ripping anything out, just expanding what's proven.",
      'No, starting fresh': "Starting fresh means no bad habits to undo. We'll design your AI stack from the ground up.",
    },
  },
]

const planRecommendation = (answers: QuizAnswers): { plan: string; dept: string; message: string } => {
  const isEnterprise = answers.revenue === '$250K+' || answers.teamSize === '10+'
  const isGrowth = answers.revenue === '$50–250K' || answers.teamSize === '6–10'

  const plan = isEnterprise ? 'Enterprise' : isGrowth ? 'Growth' : 'Starter'

  const deptMap: Record<string, string> = {
    Sales: 'Sales Department',
    Operations: 'Operations Department',
    'Customer Service': 'Customer Support Department',
    Marketing: 'Marketing Department',
    Finance: 'Finance Department',
  }
  const dept = deptMap[answers.bottleneck] || 'Sales Department'

  const urgencyMessages: Record<string, string> = {
    ASAP: "Given your urgency, we'd prioritize onboarding you in the next sprint — which starts Monday.",
    '1–3 months': "We can schedule your deployment kick-off within 2 weeks and have agents live by week 4.",
    '3–6 months': "We'll build a phased 90-day roadmap so each department comes online in order of impact.",
    Exploring: "We'll send you a detailed breakdown of expected savings before you commit to anything.",
  }

  const experienceNote: Record<string, string> = {
    'Yes, failed': "We've successfully relaunched AI automation for 4 clients who had failed attempts elsewhere.",
    'Yes, partial success': "We'll audit what's already working and build the missing pieces around it.",
    'No, starting fresh': "Starting clean means we design everything optimally from day one.",
  }

  const message = `Based on your ${answers.bottleneck} bottleneck and ${answers.teamSize} team, the ${plan} plan is your ideal fit. ${urgencyMessages[answers.timeline] || ''} ${experienceNote[answers.aiExperience] || ''}`

  return { plan, dept, message }
}

interface QualificationQuizProps {
  onQuizComplete?: (answers: QuizAnswers) => void
}

export default function QualificationQuiz({ onQuizComplete }: QualificationQuizProps) {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({})
  const [showInsight, setShowInsight] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)

  const q = questions[currentQ]
  const totalQuestions = questions.length
  const progress = (currentQ / totalQuestions) * 100

  const handleAnswer = (option: string) => {
    const key = q.id as keyof QuizAnswers
    const newAnswers = { ...answers, [key]: option }
    setAnswers(newAnswers)
    setShowInsight(option)

    setTimeout(() => {
      setShowInsight(null)
      if (currentQ < totalQuestions - 1) {
        setCurrentQ((c) => c + 1)
      } else {
        setCompleted(true)
        if (onQuizComplete) {
          onQuizComplete(newAnswers as QuizAnswers)
        }
      }
    }, 2200)
  }

  const result = completed ? planRecommendation(answers as QuizAnswers) : null

  const scrollToApply = () => {
    document.querySelector('#apply')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="quiz" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/[0.06] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>
            Self-Qualification Quiz
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight">
            Is FN3 right for you?
          </h2>
          <p className="text-text-secondary mt-4 text-lg">
            5 questions. Instant recommendation. No fluff.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-surface border border-white/[0.08] rounded-2xl p-7 md:p-10 shadow-card"
            >
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between text-xs text-text-muted mb-2">
                  <span>Question {currentQ + 1} of {totalQuestions}</span>
                  <span>{Math.round(((currentQ + 1) / totalQuestions) * 100)}% complete</span>
                </div>
                <div className="w-full h-1.5 bg-surface-3 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent rounded-full"
                    initial={{ width: `${progress}%` }}
                    animate={{ width: `${((currentQ + 1) / totalQuestions) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Question */}
              <motion.h3
                key={`q-${currentQ}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className="text-xl font-semibold text-text-primary mb-6"
              >
                {q.question}
              </motion.h3>

              {/* Options */}
              <motion.div
                key={`opts-${currentQ}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="grid grid-cols-1 gap-3 mb-6"
              >
                {q.options.map((option) => {
                  const isSelected = answers[q.id as keyof QuizAnswers] === option
                  const isDisabled = showInsight !== null

                  return (
                    <button
                      key={option}
                      onClick={() => !isDisabled && handleAnswer(option)}
                      disabled={isDisabled}
                      className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all duration-200 ${
                        isSelected
                          ? 'bg-accent/15 border-accent/50 text-accent'
                          : isDisabled
                          ? 'bg-surface-3 border-white/[0.04] text-text-muted cursor-not-allowed opacity-50'
                          : 'bg-surface-3 border-white/[0.07] text-text-secondary hover:border-accent/40 hover:text-text-primary hover:bg-surface-2'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isSelected ? 'bg-accent' : 'bg-white/20'}`} />
                        {option}
                      </span>
                    </button>
                  )
                })}
              </motion.div>

              {/* Micro-insight */}
              <AnimatePresence>
                {showInsight && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-3 p-4 bg-accent/10 border border-accent/25 rounded-xl"
                  >
                    <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      <span className="text-accent font-medium">FN3 insight: </span>
                      {(q.insight as unknown as Record<string, string>)[showInsight]}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-surface border border-accent/25 rounded-2xl overflow-hidden shadow-accent"
            >
              {/* Result header */}
              <div className="bg-accent/10 border-b border-accent/15 px-7 md:px-10 py-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-accent text-sm font-semibold uppercase tracking-wider">Your Recommendation</span>
                </div>
                <h3 className="text-2xl font-bold text-text-primary">
                  {result?.plan} Plan — Starting with {result?.dept}
                </h3>
              </div>

              <div className="px-7 md:px-10 py-8 space-y-6">
                {/* Custom message */}
                <p className="text-text-secondary leading-relaxed text-sm">
                  {result?.message}
                </p>

                {/* Summary chips */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Bottleneck', value: answers.bottleneck },
                    { label: 'Team size', value: answers.teamSize },
                    { label: 'Revenue', value: answers.revenue },
                    { label: 'Timeline', value: answers.timeline },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center gap-1.5 bg-surface-3 border border-white/[0.07] rounded-lg px-3 py-1.5 text-xs">
                      <span className="text-text-muted">{label}:</span>
                      <span className="text-text-primary font-medium">{value}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-2 space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(124, 92, 252, 0.35)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={scrollToApply}
                    className="w-full bg-accent hover:bg-accent-light text-white font-semibold py-4 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2"
                  >
                    Apply Now — {result?.plan} Plan
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </motion.button>
                  <button
                    onClick={() => {
                      setCurrentQ(0)
                      setAnswers({})
                      setCompleted(false)
                      setShowInsight(null)
                    }}
                    className="w-full text-text-muted hover:text-text-secondary text-xs py-2 transition-colors"
                  >
                    Retake quiz
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
