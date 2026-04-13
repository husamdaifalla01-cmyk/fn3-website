'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
}

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    title: 'Drag & Drop Upload',
    desc: 'Upload PDF, JPG, or PNG invoices. Process hundreds at once. Supports all major invoice formats.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'AI Data Extraction',
    desc: 'Claude AI extracts vendor, amounts, dates, and line items with 99%+ accuracy. No templates needed.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    title: 'Auto GL Coding',
    desc: "Maps every invoice to the right GL code automatically. Learns your chart of accounts and gets smarter over time.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    title: 'Duplicate Detection',
    desc: "Instantly flags duplicate invoices before payment. Catches vendor billing errors and re-submissions automatically.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    title: 'Anomaly Alerts',
    desc: 'Flags unusual amounts, new vendors, missing details, and suspicious billing patterns before they become problems.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    title: 'One-Click Export',
    desc: 'Export to QuickBooks or Xero-compatible CSV in seconds. What used to take hours now takes one click.',
  },
]

const steps = [
  { num: '01', title: 'Upload Invoices', desc: 'Drag and drop PDF or image invoices. Process one at a time or hundreds in bulk.' },
  { num: '02', title: 'AI Extracts Everything', desc: "Claude AI reads every invoice and extracts all data — vendor, amounts, dates, line items — in seconds." },
  { num: '03', title: 'Review & Approve', desc: 'See extracted data side-by-side with the original. Edit anything. Approve with confidence.' },
  { num: '04', title: 'Export to QuickBooks', desc: 'One click exports all approved invoices as a QuickBooks or Xero-compatible CSV. Done.' },
]

const demoSteps = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    step: 'Step 1',
    title: 'Upload',
    desc: 'PDF, image, or CSV',
    detail: 'Drag-drop any invoice format — Stripe, AWS, vendor PDFs, scanned images. Batch up to 50 at once.',
    color: 'text-[#4f8ef7]',
    bg: 'bg-[#4f8ef7]/10',
    border: 'border-[#4f8ef7]/20',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    step: 'Step 2',
    title: 'Extract',
    desc: 'Vendor, amount, date, line items pulled automatically',
    detail: 'AI reads every field in seconds — no templates, no configuration. Confidence scores flag anything uncertain.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    step: 'Step 3',
    title: 'Categorize',
    desc: 'GL codes assigned, duplicates flagged, anomalies detected',
    detail: 'Your GL rules engine runs automatically. Duplicates within 30 days are flagged. Unusual amounts get alerts.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/20',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    step: 'Step 4',
    title: 'Export',
    desc: 'QuickBooks IIF, Xero CSV, or generic export — one click',
    detail: 'Download your approved invoices in the format your accounting software expects. Import in under a minute.',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/20',
  },
]

const testimonials = [
  {
    quote: "We process 400 invoices a month for 12 clients. InvoiceFlow cut our AP processing time from 22 hours to 3. It paid for itself in week one.",
    name: "Sarah K.",
    title: "CPA, 8-person firm",
    initials: "SK",
    color: "bg-[#4f8ef7]",
  },
  {
    quote: "The GL rules engine is the killer feature. Set it once, never touch it again. AWS always goes to 7200, Stripe always goes to 4100.",
    name: "Marcus T.",
    title: "Controller, SaaS company",
    initials: "MT",
    color: "bg-purple-500",
  },
  {
    quote: "Finally caught a duplicate invoice from our AWS reseller. Would have cost us $4,800. InvoiceFlow flagged it in the batch.",
    name: "Jennifer L.",
    title: "Bookkeeper, 3 clients",
    initials: "JL",
    color: "bg-green-600",
  },
]

const integrationGroups = [
  {
    label: 'Accounting Software',
    items: ['QuickBooks Online', 'Xero', 'FreshBooks', 'Wave Accounting'],
  },
  {
    label: 'File Formats',
    items: ['PDF', 'JPEG', 'PNG', 'CSV'],
  },
  {
    label: 'Vendor Invoices',
    items: ['Stripe', 'AWS', 'Google', 'Microsoft'],
  },
  {
    label: 'Workflow Automation',
    items: ['Zapier', 'Make'],
  },
]

const stats = [
  { value: '40%', label: 'of accountant time spent on data entry', color: 'text-red-400' },
  { value: '4 min', label: 'to process 50 invoices with InvoiceFlow', color: 'text-green-400' },
  { value: '99%+', label: 'AI extraction accuracy', color: 'text-[#4f8ef7]' },
  { value: '$0', label: 'duplicate payments with detection enabled', color: 'text-yellow-400' },
]

function InvoiceExtractionDemo() {
  return (
    <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-5 text-left">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <span className="ml-2 text-xs text-white/30">InvoiceFlow — AI Extraction Preview</span>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {/* Left: "Before" raw PDF description */}
        <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
          <p className="text-xs text-white/30 uppercase tracking-wider mb-3">PDF Upload (AWS invoice)</p>
          <div className="space-y-1.5 text-xs text-white/40 font-mono">
            <p>Amazon Web Services, Inc.</p>
            <p>Invoice Number: 123456789</p>
            <p>Bill Period: Feb 1 – Feb 28, 2026</p>
            <p>EC2 On-Demand Instances ... $847.32</p>
            <p>S3 Storage (500 GB) ........ $11.50</p>
            <p>CloudFront Data Transfer ... $23.18</p>
            <p>RDS Multi-AZ .............. $312.00</p>
            <p>Total: $1,194.00</p>
          </div>
        </div>
        {/* Right: "After" extracted JSON */}
        <div className="bg-[#4f8ef7]/5 rounded-xl p-4 border border-[#4f8ef7]/20">
          <p className="text-xs text-[#4f8ef7] uppercase tracking-wider mb-3">Extracted in 3 seconds</p>
          <div className="space-y-1.5 text-xs font-mono">
            <p><span className="text-white/30">vendor</span> <span className="text-green-400">Amazon Web Services</span></p>
            <p><span className="text-white/30">invoice#</span> <span className="text-white/70">123456789</span></p>
            <p><span className="text-white/30">date</span> <span className="text-white/70">2026-02-28</span></p>
            <p><span className="text-white/30">total</span> <span className="text-green-400 font-bold">$1,194.00</span></p>
            <p><span className="text-white/30">gl_code</span> <span className="text-[#4f8ef7]">6020 – Software & SaaS</span></p>
            <p><span className="text-white/30">line_items</span> <span className="text-white/50">4 extracted</span></p>
            <p className="pt-1 text-[#4f8ef7]/70">→ Ready for QuickBooks export</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function TryItFreeDemo() {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="bg-[#1a1a24] border border-[#4f8ef7]/30 rounded-2xl p-6 md:p-8 text-left">
      {/* Invoice snippet */}
      <div className="mb-6">
        <p className="text-xs text-white/30 uppercase tracking-wider mb-3">Sample invoice — Amazon Web Services</p>
        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5 font-mono text-xs text-white/40 space-y-1.5">
          <p className="text-white/60 font-semibold">Amazon Web Services, Inc.</p>
          <p>Invoice #: AWS-2026-02-8821</p>
          <p>Bill Period: Feb 1 – Feb 28, 2026</p>
          <p className="pt-1 border-t border-white/5 mt-2">EC2 On-Demand Instances ........ $847.32</p>
          <p>S3 Object Storage (500 GB) ..... $11.50</p>
          <p>RDS Multi-AZ .................. $312.00</p>
          <p className="pt-1 border-t border-white/5 mt-2 text-white/60 font-semibold">Total Due: $1,170.82</p>
        </div>
      </div>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-full py-3.5 bg-[#4f8ef7] hover:bg-[#4f8ef7]/80 text-white font-semibold rounded-xl transition-all hover:scale-[1.01] text-sm flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          See what InvoiceFlow extracts →
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <p className="text-xs text-green-400 font-medium uppercase tracking-wider">Extracted in 2.8 seconds</p>
          </div>
          <div className="bg-[#4f8ef7]/5 border border-[#4f8ef7]/20 rounded-xl p-5 font-mono text-xs space-y-2 mb-5">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-wider mb-0.5">Vendor</p>
                <p className="text-green-400 font-semibold">Amazon Web Services</p>
              </div>
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-wider mb-0.5">Invoice #</p>
                <p className="text-white/70">AWS-2026-02-8821</p>
              </div>
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-wider mb-0.5">Date</p>
                <p className="text-white/70">2026-02-28</p>
              </div>
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-wider mb-0.5">Total Amount</p>
                <p className="text-green-400 font-bold">$1,170.82</p>
              </div>
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-wider mb-0.5">GL Code</p>
                <p className="text-[#4f8ef7]">6025 – Cloud Infrastructure</p>
              </div>
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-wider mb-0.5">Category</p>
                <p className="text-[#4f8ef7]">Software &amp; SaaS</p>
              </div>
            </div>
            <div className="pt-3 border-t border-white/5">
              <p className="text-white/30 text-[10px] uppercase tracking-wider mb-2">Line Items (3 extracted)</p>
              <div className="space-y-1">
                <div className="flex justify-between text-white/50">
                  <span>EC2 On-Demand Instances</span><span className="text-white/70">$847.32</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>S3 Object Storage (500 GB)</span><span className="text-white/70">$11.50</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>RDS Multi-AZ</span><span className="text-white/70">$312.00</span>
                </div>
              </div>
            </div>
            <p className="pt-2 text-[#4f8ef7]/60">→ Ready for QuickBooks export</p>
          </div>
          <Link
            href="/auth/signup"
            className="block w-full py-3.5 bg-[#4f8ef7] hover:bg-[#4f8ef7]/80 text-white font-semibold rounded-xl transition-all hover:scale-[1.01] text-sm text-center"
          >
            Process your own invoices — start free trial →
          </Link>
          <p className="text-center text-xs text-white/30 mt-3">No account needed for the first 5 invoices</p>
        </motion.div>
      )}
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f0f14] text-[#e2e8f0]">
      <Navbar variant="landing" />

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#4f8ef7]/10 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#4f8ef7]/10 border border-[#4f8ef7]/20 rounded-full text-xs text-[#4f8ef7] font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7] animate-pulse" />
              AI-powered invoice processing
            </span>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1} className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Stop Manually Keying Invoices<br />
            <span className="text-[#4f8ef7]">for 4 Hours Every Month</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2} className="text-xl text-white/50 mb-6 max-w-2xl mx-auto leading-relaxed">
            InvoiceFlow reads your PDFs — Stripe, AWS, vendor invoices — extracts every field, assigns GL codes, and exports directly to <span className="text-white/80 font-medium">QuickBooks or Xero</span>. What takes 4 hours takes 4 minutes.
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2.5} className="mb-8 max-w-2xl mx-auto">
            <InvoiceExtractionDemo />
          </motion.div>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="px-7 py-3.5 bg-[#4f8ef7] hover:bg-[#4f8ef7]/80 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] text-base">
              Start free trial →
            </Link>
            <Link href="#how-it-works" className="px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium rounded-xl transition-all text-base border border-white/10">
              See how it works
            </Link>
          </motion.div>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={4} className="mt-5 text-xs text-white/30">
            14-day free trial · No credit card required · Cancel anytime
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5} className="text-center">
                <div className={`text-4xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-white/40 leading-snug">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before vs After */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-3">The Old Way vs. InvoiceFlow</h2>
          <p className="text-white/40">Stop paying your best accountants to type numbers into spreadsheets</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="bg-[#1a1a24] border border-red-400/20 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-sm font-medium text-red-400">Before InvoiceFlow</span>
            </div>
            <ul className="space-y-4">
              {['40-60% of billable time spent on manual data entry', 'Invoice data manually typed into spreadsheets', 'Duplicate invoices caught (sometimes) by eye', 'GL coding guessed or looked up each time', 'Export to QuickBooks takes hours per client', 'Anomalies and billing errors missed entirely'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/50">
                  <svg className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="bg-[#1a1a24] border border-green-400/20 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm font-medium text-green-400">With InvoiceFlow</span>
            </div>
            <ul className="space-y-4">
              {['100% of data entry handled by AI in seconds', 'Upload invoice, AI extracts all fields instantly', 'Duplicate detection flags every re-submission', 'GL codes assigned automatically from your COA', 'QuickBooks/Xero export in one click, any time', 'Anomaly alerts catch errors before payment'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                  <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-3">Everything you need to eliminate data entry</h2>
            <p className="text-white/40 max-w-xl mx-auto">Built specifically for accounting firms and bookkeepers who process hundreds of invoices monthly.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5} className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6 hover:border-[#4f8ef7]/30 transition-colors group">
                <div className="w-10 h-10 bg-[#4f8ef7]/10 rounded-xl flex items-center justify-center text-[#4f8ef7] mb-4 group-hover:bg-[#4f8ef7]/20 transition-colors">{feature.icon}</div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 max-w-5xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-3">Up and running in minutes</h2>
          <p className="text-white/40">No setup. No templates. No training required.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5}>
              <div className="text-4xl font-bold text-[#4f8ef7]/20 mb-3">{step.num}</div>
              <h3 className="text-white font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* See It In Action — Animated Step Demo */}
      <section id="see-it-in-action" className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#4f8ef7]/10 border border-[#4f8ef7]/20 rounded-full text-xs text-[#4f8ef7] font-medium mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7] animate-pulse" />
              See it in action
            </span>
            <h2 className="text-3xl font-bold text-white mb-3">Four steps. Seconds, not hours.</h2>
            <p className="text-white/40 max-w-xl mx-auto">From raw invoice to QuickBooks-ready export — completely automated.</p>
          </motion.div>

          {/* Step flow */}
          <div className="grid md:grid-cols-4 gap-4 mb-14">
            {demoSteps.map((s, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i * 0.4}
                className={`relative bg-[#1a1a24] border ${s.border} rounded-2xl p-5 flex flex-col items-start gap-3`}
              >
                {/* connector arrow between steps */}
                {i < demoSteps.length - 1 && (
                  <div className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-white/20 text-lg">›</div>
                )}
                <div className={`w-14 h-14 ${s.bg} rounded-xl flex items-center justify-center ${s.color}`}>
                  {s.icon}
                </div>
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${s.color}`}>{s.step}</p>
                  <h3 className="text-white font-bold text-lg mb-0.5">{s.title}</h3>
                  <p className={`text-xs font-medium ${s.color} mb-2`}>{s.desc}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{s.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Before / After comparison */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <p className="text-center text-xs text-white/30 uppercase tracking-wider mb-5">Before vs. After — same invoice batch</p>
            <div className="grid md:grid-cols-2 gap-5">
              {/* Before: manual spreadsheet */}
              <div className="bg-[#1a1a24] border border-red-400/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Before — manual spreadsheet</span>
                </div>
                <div className="font-mono text-xs space-y-1 text-white/30">
                  <div className="grid grid-cols-4 gap-2 border-b border-white/5 pb-2 text-white/20 uppercase text-[10px]">
                    <span>Date</span><span>Vendor</span><span>Amount</span><span>GL</span>
                  </div>
                  {[
                    ['2/1', 'Ama... Web…', '$1,194', '???'],
                    ['2/2', 'Stripe, Inc.', '$2,400', '6120?'],
                    ['2/3', 'FedEx Corp', '$347.85', ''],
                    ['2/5', 'Slack Tech…', '$87.50', '6020'],
                    ['2/5', 'Stripe, Inc.', '$2,400', '—dup?'],
                  ].map(([d, v, a, g], i) => (
                    <div key={i} className={`grid grid-cols-4 gap-2 py-1 ${i === 4 ? 'text-yellow-400/50' : ''}`}>
                      <span>{d}</span><span>{v}</span><span>{a}</span><span>{g || <span className="text-red-400/60">missing</span>}</span>
                    </div>
                  ))}
                  <div className="pt-3 text-red-400/60 text-[10px]">3 hrs of manual entry · 2 GL codes missing · 1 possible dup unchecked</div>
                </div>
              </div>

              {/* After: InvoiceFlow dashboard */}
              <div className="bg-[#1a1a24] border border-green-400/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">After — InvoiceFlow dashboard</span>
                </div>
                <div className="font-mono text-xs space-y-1">
                  <div className="grid grid-cols-4 gap-2 border-b border-white/5 pb-2 text-white/20 uppercase text-[10px]">
                    <span>Date</span><span>Vendor</span><span>Amount</span><span>GL</span>
                  </div>
                  {[
                    { d: '2026-02-01', v: 'Amazon Web Services', a: '$1,194.00', g: '6020', status: 'green' },
                    { d: '2026-02-02', v: 'Stripe, Inc.', a: '$2,400.00', g: '4100', status: 'green' },
                    { d: '2026-02-03', v: 'FedEx Corp', a: '$347.85', g: '6110', status: 'green' },
                    { d: '2026-02-05', v: 'Slack Technologies', a: '$87.50', g: '6020', status: 'green' },
                    { d: '2026-02-05', v: 'Stripe, Inc.', a: '$2,400.00', g: '4100', status: 'yellow' },
                  ].map((row, i) => (
                    <div key={i} className={`grid grid-cols-4 gap-2 py-1 ${row.status === 'yellow' ? 'text-yellow-400' : 'text-white/60'}`}>
                      <span className="text-white/30">{row.d}</span>
                      <span className={row.status === 'yellow' ? 'text-yellow-400' : 'text-green-400'}>{row.v}</span>
                      <span>{row.a}</span>
                      <span className={row.status === 'yellow' ? 'text-yellow-400' : 'text-[#4f8ef7]'}>{row.g}{row.status === 'yellow' && ' ⚠'}</span>
                    </div>
                  ))}
                  <div className="pt-3 text-green-400/70 text-[10px]">Processed in 18 seconds · all GL codes assigned · 1 duplicate flagged</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Accountants love it. Numbers prove it.</h2>
          <p className="text-white/40">From solo bookkeepers to controllers at growing SaaS companies.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i * 0.4}
              className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-white/20 transition-colors"
            >
              <svg className="w-6 h-6 text-[#4f8ef7]/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-sm text-white/70 leading-relaxed flex-1">{t.quote}</p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm text-white font-medium">{t.name}</p>
                  <p className="text-xs text-white/40">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Integration Logos */}
      <section className="py-16 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <p className="text-xs text-white/30 uppercase tracking-widest font-medium">Works with your existing tools</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {integrationGroups.map((group, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3}>
                <p className="text-[10px] text-white/25 uppercase tracking-wider font-medium mb-3">{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="inline-flex items-center px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-white/60 font-medium hover:border-white/20 hover:text-white/80 transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Simple, transparent pricing</h2>
            <p className="text-white/40">Save 20% with annual billing</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: 'Solo', price: '$149', desc: 'For independent bookkeepers', features: ['1 user', '500 invoices/month', 'AI extraction + GL coding', 'QuickBooks/Xero export', 'Email support'], highlight: false },
              { name: 'Team', price: '$299', desc: 'For growing accounting firms', features: ['5 users', '2,000 invoices/month', 'Everything in Solo', 'Team workspace', 'Priority support'], highlight: true },
              { name: 'Firm', price: '$499', desc: 'For large firms', features: ['Unlimited users', 'Unlimited invoices', 'Everything in Team', 'API access', 'Custom GL mapping', 'Dedicated support'], highlight: false },
            ].map((plan, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5} className={`rounded-2xl p-6 border ${plan.highlight ? 'border-[#4f8ef7]/50 bg-[#4f8ef7]/5' : 'border-white/10 bg-[#1a1a24]'}`}>
                {plan.highlight && <div className="text-xs text-[#4f8ef7] font-medium mb-3 uppercase tracking-wider">Most Popular</div>}
                <div className="text-white font-bold text-xl mb-1">{plan.name}</div>
                <div className="mb-1"><span className="text-3xl font-bold text-white">{plan.price}</span><span className="text-white/40 text-sm">/month</span></div>
                <p className="text-sm text-white/40 mb-5">{plan.desc}</p>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-white/60">
                      <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signup" className={`block text-center py-2.5 rounded-lg text-sm font-medium transition-colors ${plan.highlight ? 'bg-[#4f8ef7] text-white hover:bg-[#4f8ef7]/80' : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'}`}>
                  Start free trial
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QuickBooks Export Preview */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">QuickBooks-ready in one click</h2>
          <p className="text-white/40 max-w-xl mx-auto">Every extracted invoice maps to your chart of accounts and exports as a properly formatted CSV. Import directly into QuickBooks or Xero — no reformatting required.</p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
          <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-5 text-left">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                <span className="ml-2 text-xs text-white/30">invoiceflow_export_feb2026.csv</span>
              </div>
              <a
                href="/sample-export.csv"
                download
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4f8ef7]/10 hover:bg-[#4f8ef7]/20 border border-[#4f8ef7]/20 rounded-lg text-xs text-[#4f8ef7] font-medium transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download sample export
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-6 text-white/30 font-medium">Date</th>
                    <th className="text-left py-2 pr-6 text-white/30 font-medium">Vendor</th>
                    <th className="text-left py-2 pr-6 text-white/30 font-medium">Account</th>
                    <th className="text-right py-2 pr-6 text-white/30 font-medium">Amount</th>
                    <th className="text-left py-2 text-white/30 font-medium">Memo</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: '2026-02-28', vendor: 'Amazon Web Services', account: '6020 – Software & SaaS', amount: '$1,194.00', memo: 'EC2, S3, CloudFront, RDS – Feb 2026' },
                    { date: '2026-02-29', vendor: 'Stripe, Inc.', account: '6120 – Bank & Finance Charges', amount: '$2,400.00', memo: 'Payment processing fees – Feb 2026' },
                    { date: '2026-02-27', vendor: 'FedEx', account: '6110 – Shipping & Postage', amount: '$347.85', memo: 'Ground shipping – client deliveries' },
                    { date: '2026-02-25', vendor: 'Slack Technologies', account: '6020 – Software & SaaS', amount: '$87.50', memo: 'Team plan – 25 seats' },
                  ].map((row, i) => (
                    <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                      <td className="py-2.5 pr-6 text-white/50">{row.date}</td>
                      <td className="py-2.5 pr-6 text-green-400">{row.vendor}</td>
                      <td className="py-2.5 pr-6 text-[#4f8ef7]">{row.account}</td>
                      <td className="py-2.5 pr-6 text-white/70 text-right">{row.amount}</td>
                      <td className="py-2.5 text-white/40">{row.memo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <p className="text-xs text-white/30">47 invoices · $18,432.15 total · ready to import</p>
              <p className="text-xs text-[#4f8ef7]/70">Compatible with QuickBooks Desktop, QBO, and Xero</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Duplicate Detection Demo */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Catch duplicates before they hit your books</h2>
            <p className="text-white/40 max-w-xl mx-auto">Duplicate invoices cost businesses thousands every year. InvoiceFlow flags them automatically — same vendor, same amount, within a 30-day window.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {[
                { label: 'Invoice #8821', date: 'Feb 1, 2026', tag: 'Original' },
                { label: 'Invoice #9104', date: 'Mar 2, 2026', tag: 'Flagged' },
              ].map((inv, i) => (
                <div key={i} className={`bg-[#1a1a24] border rounded-2xl p-5 ${i === 1 ? 'border-yellow-400/40' : 'border-white/10'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-white/30 font-mono">{inv.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${i === 1 ? 'bg-yellow-400/10 text-yellow-400' : 'bg-green-400/10 text-green-400'}`}>{inv.tag}</span>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between"><span className="text-white/40">Vendor</span><span className="text-white/80 font-medium">Stripe, Inc.</span></div>
                    <div className="flex justify-between"><span className="text-white/40">Amount</span><span className="text-green-400 font-bold">$2,400.00</span></div>
                    <div className="flex justify-between"><span className="text-white/40">Date</span><span className="text-white/60">{inv.date}</span></div>
                    <div className="flex justify-between"><span className="text-white/40">GL Code</span><span className="text-[#4f8ef7]">6120 – Finance Charges</span></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-yellow-400/5 border border-yellow-400/30 rounded-xl p-4 flex items-start gap-3">
              <span className="text-yellow-400 text-lg mt-0.5">&#9888;</span>
              <div>
                <p className="text-sm font-semibold text-yellow-400 mb-1">Possible duplicate detected — same vendor, same amount, 30-day window</p>
                <p className="text-xs text-white/40">Invoice #9104 from Stripe, Inc. for $2,400.00 closely matches Invoice #8821 submitted 29 days earlier. Review before approving to avoid double-payment.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Try It Free Section */}
      <section className="py-24 max-w-3xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-400/10 border border-green-400/20 rounded-full text-xs text-green-400 font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Try it free — no account needed
          </span>
          <h2 className="text-3xl font-bold text-white mb-3">See it extract a real invoice</h2>
          <p className="text-white/40 max-w-lg mx-auto">Click to see exactly what InvoiceFlow extracts from an AWS invoice — vendor, amount, date, line items, GL code, and category. Instantly.</p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
          <TryItFreeDemo />
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-24 max-w-3xl mx-auto px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-4xl font-bold text-white mb-4">
            Stop paying for data entry.<br />
            <span className="text-[#4f8ef7]">Start paying for results.</span>
          </h2>
          <p className="text-white/40 mb-8 text-lg">Join accounting firms processing thousands of invoices monthly with InvoiceFlow.</p>
          <Link href="/auth/signup" className="inline-flex px-8 py-4 bg-[#4f8ef7] hover:bg-[#4f8ef7]/80 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] text-base">
            Start your free 14-day trial →
          </Link>
          <p className="mt-4 text-xs text-white/30">No credit card required. Cancel anytime.</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#4f8ef7] rounded-md flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">InvoiceFlow</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-white/30">
            <Link href="/pricing" className="hover:text-white/60 transition-colors">Pricing</Link>
            <Link href="/guides/invoice-processing-automation" className="hover:text-white/60 transition-colors">AP Guide</Link>
            <Link href="/guides/gl-coding-best-practices" className="hover:text-white/60 transition-colors">GL Guide</Link>
            <Link href="/auth/login" className="hover:text-white/60 transition-colors">Sign in</Link>
            <Link href="/auth/signup" className="hover:text-white/60 transition-colors">Sign up</Link>
          </div>
          <p className="text-xs text-white/20">© 2026 InvoiceFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
