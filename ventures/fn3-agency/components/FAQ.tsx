'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: 'How long does deployment take?',
    answer:
      'From signed agreement to live agents: 5 business days. Day 1–2 is discovery and intake (we map your workflows and tools). Days 3–4 is configuration and integration setup. Day 5 is QA testing. Monday morning, your agents are live. For Enterprise plans with complex integrations, allow up to 7 days.',
  },
  {
    question: 'What tools do you integrate with?',
    answer:
      'We integrate with the tools your business already uses. On the Growth plan and above: HubSpot, Salesforce, Pipedrive, Google Workspace, Microsoft 365, Slack, Notion, Intercom, Zendesk, QuickBooks, and 30+ others. For Starter plans, we handle 2 core integrations. On Enterprise, we build custom integrations for any tool with an API.',
  },
  {
    question: 'Do I need technical knowledge to manage the agents?',
    answer:
      'No. You interact with your AI workforce through natural language in Slack or a simple dashboard — tell them what you need, review their output, set priorities. The only people who need to understand the technical infrastructure are us. You manage them like a team, not like software.',
  },
  {
    question: 'What if an agent makes a mistake?',
    answer:
      'Agents are configured with guardrails for anything high-stakes: they draft, they don\'t send. For example, your sales agent drafts outreach emails for your review before they go out — until you\'ve validated its judgment and want it to send autonomously. We design a "trust ladder" during setup, starting conservative and expanding autonomy as you verify quality. Mistakes are caught by the system before they reach your customers.',
  },
  {
    question: 'How is this different from hiring a VA or using Zapier?',
    answer:
      'A VA is one person with limited bandwidth, sick days, and a learning curve. Zapier automates simple triggers but can\'t reason, write, or adapt. FN3 deploys agents that can handle context-dependent tasks, write content, make decisions within defined parameters, and work collaboratively across your entire operation. It\'s the difference between a workflow trigger and an employee who thinks.',
  },
  {
    question: 'Is my business data secure?',
    answer:
      'Yes. We use Claude Max via Anthropic\'s enterprise API, which does not train on your data. Business data is processed in memory only — never stored in agent context between sessions unless you explicitly configure a knowledge base. All integrations use read/write permissions you control. We sign NDAs with every client and can provide a data processing agreement for enterprise clients.',
  },
  {
    question: 'Can I customize what the agents do?',
    answer:
      'Everything is customized to your business. During the intake process, we map your specific workflows, train the agents on your brand voice and SOPs, and configure exactly what each agent handles. After deployment, you can request workflow changes at any time. Growth and Enterprise plans include monthly and weekly strategy calls specifically for this. The agents learn and improve over time as we tune them.',
  },
  {
    question: 'What happens if I want to cancel?',
    answer:
      'Month-to-month on all plans. No long-term contracts, no cancellation fees. If you cancel, we provide a full handover document: all agent configurations, system prompts, workflow maps, and integration details — so you own everything we built. We prefer clients who stay because they\'re getting results, not because they\'re locked in.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-surface/20 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>
            FAQ
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight">
            Everything you want to know
          </h2>
          <p className="text-text-secondary mt-4">
            If you have a question not listed here, you can ask it in your application.
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`bg-surface border rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === i ? 'border-accent/30 shadow-accent-sm' : 'border-white/[0.07] hover:border-white/[0.14]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left group"
              >
                <span className={`text-sm font-medium leading-snug pr-4 transition-colors ${
                  openIndex === i ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'
                }`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                    openIndex === i ? 'bg-accent border-accent text-white' : 'border-white/20 text-text-muted group-hover:border-white/40'
                  }`}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="h-px bg-white/[0.06] mb-4" />
                      <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 p-8 bg-surface border border-white/[0.07] rounded-2xl"
        >
          <div className="text-base font-medium text-text-primary mb-2">Still have questions?</div>
          <p className="text-sm text-text-secondary mb-5">
            Include them in your application. We review every one personally.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#apply')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 text-sm"
          >
            Apply & Ask Your Questions
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
