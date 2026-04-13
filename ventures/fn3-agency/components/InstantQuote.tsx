'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Message = {
  id: number
  role: 'bot' | 'user'
  text: string
}

type Stage = 'closed' | 'open' | 'q1' | 'q2' | 'q3' | 'result'

const QUESTIONS = [
  {
    key: 'q1',
    text: "What's your monthly revenue range?",
    options: ['Under $10K', '$10K–$50K', '$50K–$250K', '$250K+'],
  },
  {
    key: 'q2',
    text: 'How big is your team?',
    options: ['1–5 people', '6–15 people', '16–50 people', '50+ people'],
  },
  {
    key: 'q3',
    text: "What's your top bottleneck?",
    options: ['Sales & leads', 'Operations', 'Customer support', 'Marketing'],
  },
]

const packageMap: Record<string, string> = {
  'Under $10K': 'Starter',
  '$10K–$50K': 'Starter',
  '$50K–$250K': 'Growth',
  '$250K+': 'Enterprise',
}

const savingsMap: Record<string, string> = {
  'Under $10K': '$2,400–$4,800/mo',
  '$10K–$50K': '$4,800–$9,600/mo',
  '$50K–$250K': '$9,600–$24,000/mo',
  '$250K+': '$24,000–$60,000/mo',
}

const bottleneckMap: Record<string, string> = {
  'Sales & leads': 'Sales Department (Proposal + Outreach agents)',
  Operations: 'Operations Department (Reporting + Workflow agents)',
  'Customer support': 'Customer Support Department (Triage + Resolution agents)',
  Marketing: 'Marketing Department (Content + SEO agents)',
}

function buildResult(answers: Record<string, string>): string {
  const pkg = packageMap[answers.q1] || 'Growth'
  const savings = savingsMap[answers.q1] || '$5K–$15K/mo'
  const dept = bottleneckMap[answers.q3] || 'Sales Department'
  return `Based on your answers, we recommend the **${pkg} Plan** — starting with your ${dept}.\n\nEstimated monthly savings: **${savings}**.\n\nReady to see the full breakdown?`
}

let msgId = 0
const nextId = () => ++msgId

export default function InstantQuote() {
  const [stage, setStage] = useState<Stage>('closed')
  const [messages, setMessages] = useState<Message[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentQ, setCurrentQ] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const addBotMessage = (text: string, delay = 0) => {
    return new Promise<void>((resolve) => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setMessages((prev) => [...prev, { id: nextId(), role: 'bot', text }])
        resolve()
      }, delay + 800)
    })
  }

  const handleOpen = async () => {
    setStage('open')
    setMessages([])
    setAnswers({})
    setCurrentQ(0)
    await addBotMessage("Hey! I'll get you a custom quote in about 60 seconds.", 100)
    await addBotMessage(QUESTIONS[0].text, 200)
    setStage('q1')
  }

  const handleOption = async (option: string) => {
    const qKey = QUESTIONS[currentQ].key
    const newAnswers = { ...answers, [qKey]: option }
    setAnswers(newAnswers)

    setMessages((prev) => [...prev, { id: nextId(), role: 'user', text: option }])

    const nextQ = currentQ + 1

    if (nextQ < QUESTIONS.length) {
      setStage('open')
      await addBotMessage(QUESTIONS[nextQ].text, 100)
      setCurrentQ(nextQ)
      setStage(QUESTIONS[nextQ].key as Stage)
    } else {
      setStage('open')
      await addBotMessage("Perfect — let me calculate that for you.", 100)
      const resultText = buildResult(newAnswers)
      await addBotMessage(resultText, 300)
      setStage('result')
    }
  }

  const handleClose = () => {
    setStage('closed')
  }

  const handleReset = () => {
    setMessages([])
    setAnswers({})
    setCurrentQ(0)
    setStage('closed')
  }

  const activeQuestion = QUESTIONS[currentQ]
  const isAnswering = stage === 'q1' || stage === 'q2' || stage === 'q3'

  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/)
    return parts.map((part, i) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={i} className="text-text-primary font-semibold">
          {part.slice(2, -2)}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      )
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      <AnimatePresence>
        {stage !== 'closed' && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-[340px] bg-surface border border-white/[0.1] rounded-2xl shadow-[0_8px_48px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col"
            style={{ maxHeight: '520px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 bg-surface-2 border-b border-white/[0.07]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-text-primary">FN3 Instant Quote</div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    Online now
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-6 h-6 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors rounded-md hover:bg-surface-3"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[200px]">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-accent text-white rounded-br-sm'
                        : 'bg-surface-3 border border-white/[0.07] text-text-secondary rounded-bl-sm'
                    }`}
                  >
                    {renderText(msg.text)}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-surface-3 border border-white/[0.07] rounded-xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 bg-text-muted rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Options / CTA */}
            {isAnswering && !isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="px-4 pb-4 pt-1 grid grid-cols-2 gap-2 border-t border-white/[0.06]"
              >
                {activeQuestion.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleOption(opt)}
                    className="py-2 px-3 bg-surface-3 border border-white/[0.07] hover:border-accent/40 hover:bg-accent/10 hover:text-accent text-text-secondary rounded-lg text-xs font-medium transition-all duration-150 text-left leading-snug"
                  >
                    {opt}
                  </button>
                ))}
              </motion.div>
            )}

            {stage === 'result' && !isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="px-4 pb-4 pt-2 space-y-2 border-t border-white/[0.06]"
              >
                <button
                  onClick={() => {
                    handleClose()
                    setTimeout(() => document.querySelector('#apply')?.scrollIntoView({ behavior: 'smooth' }), 200)
                  }}
                  className="w-full bg-accent hover:bg-accent-light text-white font-semibold py-3 rounded-xl text-xs transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  Apply Now — See Full Breakdown
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
                <button
                  onClick={handleReset}
                  className="w-full text-text-muted hover:text-text-secondary text-[11px] py-1 transition-colors"
                >
                  Start over
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        onClick={stage === 'closed' ? handleOpen : handleClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2.5 px-5 py-3.5 rounded-full font-semibold text-sm shadow-accent transition-all duration-200 ${
          stage !== 'closed'
            ? 'bg-surface-2 border border-white/[0.1] text-text-secondary'
            : 'bg-accent hover:bg-accent-light text-white'
        }`}
      >
        {stage === 'closed' ? (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
            </svg>
            Get a custom quote in 60 seconds
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            Close
          </>
        )}
      </motion.button>
    </div>
  )
}
