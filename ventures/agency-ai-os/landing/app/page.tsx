"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-purple-400 shrink-0 mt-0.5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

const TIERS = [
  {
    name: "Agency Starter",
    price: "$297",
    tagline: "Everything you need to send your first AI proposal this week.",
    popular: false,
    items: [
      "AI Service Menu — 10 services with descriptions, ideal clients, deliverables, price ranges, and scoping guidance",
      "Pricing Methodology — 2,400-word value anchoring guide that ends the undercharging cycle forever",
      "Discovery Call Script — qualify leads, uncover ROI, and control the conversation before you send anything",
      "5 done-for-you proposal templates: AI content, customer service, workflow automation, sales automation, fractional AI officer",
      "Quick-start guide: send your first proposal in under 30 minutes",
    ],
    cta: "Get Instant Access — $297",
    href: "#",
    ctaStyle:
      "bg-white/8 hover:bg-white/12 text-white border border-white/20 hover:border-white/30",
    badge: null,
  },
  {
    name: "Agency Pro",
    price: "$597",
    tagline: "Add delivery systems, 20 more templates, and objection scripts.",
    popular: false,
    items: [
      "Everything in Starter",
      "25 total done-for-you proposal templates — every AI service category fully covered",
      "6-phase client delivery framework with QA checkpoints at every transition",
      "30 objection handling scripts — scripted, field-tested responses for every 'no'",
      "AI Project Kickoff Deck template",
      "Scope creep prevention playbook + 5-email client onboarding sequence",
    ],
    cta: "Get Instant Access — $597",
    href: "#",
    ctaStyle:
      "bg-white/8 hover:bg-white/12 text-white border border-white/20 hover:border-white/30",
    badge: null,
  },
  {
    name: "Agency OS Complete",
    price: "$997",
    tagline: "The full operating system: proposals, delivery, team training, and measurement.",
    popular: true,
    items: [
      "Everything in Pro",
      "AI Agency Pricing Calculator — interactive web tool at /calculator",
      "10 case study templates across every service type",
      "Team training framework — hire and train delivery staff without you bottlenecking",
      "Agency AI Stack: curated tool recommendations by service type",
      "Client success metrics template for every service",
      "Quarterly updates for life + private community access",
    ],
    cta: "Get Instant Access — $997",
    href: "#",
    ctaStyle: "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/30",
    badge: "Best Value",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah K.",
    role: "AI Automation Agency, 3-person team",
    quote:
      "Went from $8K/month to $34K/month in 90 days. The pricing methodology alone was worth 10x the price. I was leaving so much money on the table — I just didn't have the language to justify what I was charging. Now I do.",
    result: "$8K → $34K/mo in 90 days",
    tier: "Agency OS Complete",
  },
  {
    name: "Marcus T.",
    role: "Independent AI Consultant",
    quote:
      "Closed my first $25K AI implementation deal using the proposal template. Word for word. I'd been sending hand-rolled proposals that went nowhere. The template structure changed everything — it reads like a business investment, not a vendor quote.",
    result: "First $25K deal closed in week 2",
    tier: "Agency Pro",
  },
  {
    name: "Jamie L.",
    role: "Fractional AI Officer (serves 4 clients)",
    quote:
      "The delivery framework is what I'd been trying to build for 2 years. Done in a document. Week 1 through handoff — every step, every checkpoint, every thing to watch out for. I stopped reinventing this wheel for every client.",
    result: "2 years of build work, delivered day 1",
    tier: "Agency OS Complete",
  },
  {
    name: "Priya M.",
    role: "B2B SaaS AI Consultancy",
    quote:
      "The objection scripts are the part nobody talks about. I used to freeze when a prospect said 'we can do this with ChatGPT.' Now I have a scripted, calm, professional response that reframes the entire conversation. Close rate jumped 40% in the first month.",
    result: "40% increase in close rate",
    tier: "Agency Pro",
  },
  {
    name: "Derek W.",
    role: "Agency Owner, 7-person team",
    quote:
      "We were doing $15K/month and stuck. The service menu showed us 6 services we weren't selling. The pricing methodology showed us we were undercharging on everything. Three months later we're at $52K/month. This isn't a course. It's a business.",
    result: "$15K → $52K/mo in 3 months",
    tier: "Agency OS Complete",
  },
];

const FAQS = [
  {
    q: "Is this for beginners or experienced agency owners?",
    a: "Both — but for different reasons. If you're starting out: Agency Starter gives you a complete service menu (know what to sell), pricing methodology (know what to charge), and 5 real proposal templates (something to send the moment you have a lead). You skip the 6-month build phase most consultants go through. If you're already at $10K+/month: Pro and Complete are built for you. The delivery framework, objection scripts, and expanded template library typically increase close rates and average deal size within the first two sales cycles.",
  },
  {
    q: "What AI tools do I need?",
    a: "None upfront. The system is tool-agnostic — it works whether you're using ChatGPT, Claude, custom-built agents, or no-code automation platforms. Agency OS Complete includes our Agency AI Stack guide with curated tool recommendations by service type, so you know what to use when. But the proposals, pricing methodology, and delivery framework work regardless of your tech stack.",
  },
  {
    q: "How is this different from other agency courses or communities?",
    a: "There are no videos. No modules. No course platform to log into. Agency AI OS is documents and tools — the actual artifacts you use in your business the day you open them. The proposals are real proposals you customize with your name. The scripts are scripts you use before calls. The framework is the document you share with clients. You don't learn about the system. You use it. Most agency courses teach theory. This is the operating system.",
  },
  {
    q: "Is this just another 'how to use AI' guide?",
    a: "No. There are no tutorials on how to use ChatGPT. No modules on prompt engineering. Agency AI OS is an operating system — the service menu, proposals, pricing methodology, delivery framework, objection scripts, and calculator. It's what you hand clients and what you run your business from. If you want to learn about AI, there are free YouTube videos. If you want to run a professional AI agency, this is the system.",
  },
  {
    q: "What if I open it and it's not what I expected?",
    a: "30-day full refund — as long as you actually implement it. Send one proposal using one of the templates. Run one discovery call using the script. If you did those things and didn't see meaningful progress, send us proof and we'll refund every dollar. We're not worried: the people who actually implement it get results.",
  },
  {
    q: "Can I upgrade from Starter to Pro or Complete later?",
    a: "Yes. You pay the difference. If you start with Starter at $297 and later want Agency OS Complete, you pay $700 to upgrade — not the full $997. We want you to start where you are, not where you think you should be.",
  },
];

const PROPOSALS = [
  "AI Content Strategy & Production",
  "Customer Service Chatbot",
  "Workflow Automation Audit & Build",
  "Sales Automation System",
  "Fractional AI Officer (retainer)",
  "AI Agent Deployment",
  "Document Processing Automation",
  "Marketing Analytics Dashboard",
  "AI Training & Enablement Workshop",
  "Email Marketing Automation",
  "Lead Qualification Agent",
  "Internal Knowledge Base (RAG)",
  "Competitive Intelligence Agent",
  "AI-Powered Reporting System",
  "Social Media Content Engine",
  "Customer Onboarding Automation",
  "Product Description Generator",
  "Support Ticket Triage System",
  "AI Recruiting Screener",
  "Contract & Document Review",
  "Invoice & AP Automation",
  "AI Meeting Summarization",
  "Demand Forecasting System",
  "Pricing Optimization Agent",
  "Custom AI Strategy Engagement",
];

function RoiCalculator() {
  const [clients, setClients] = useState(1);
  const [dealSize, setDealSize] = useState(5000);
  const tierPrice = 297;

  const annualRevenue = clients * dealSize * 12;
  const roi = Math.round((annualRevenue / tierPrice) * 100);

  return (
    <div className="p-7 rounded-2xl bg-[#0d0a14] border border-purple-500/30">
      <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-5">
        ROI Calculator
      </p>
      <p className="text-sm text-[#666] mb-6 leading-relaxed">
        If you close just 1 additional client using these templates, at your average deal size, your
        return on investment is:
      </p>

      <div className="space-y-5 mb-7">
        <div>
          <div className="flex justify-between text-xs text-[#555] mb-2">
            <span>Additional clients closed per month</span>
            <span className="font-bold text-white">{clients}</span>
          </div>
          <input
            type="range"
            min={1}
            max={5}
            value={clients}
            onChange={(e) => setClients(Number(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#333] mt-1">
            <span>1</span><span>5</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-[#555] mb-2">
            <span>Average deal size</span>
            <span className="font-bold text-white">${dealSize.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={1000}
            max={25000}
            step={500}
            value={dealSize}
            onChange={(e) => setDealSize(Number(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#333] mt-1">
            <span>$1K</span><span>$25K</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-5 border-t border-[#1c1c1c]">
        <div>
          <p className="text-xs text-[#444] mb-1">Annual revenue added</p>
          <p className="text-2xl font-black text-white">
            ${annualRevenue.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#444] mb-1">ROI on $297 investment</p>
          <p className="text-2xl font-black text-purple-400">{roi.toLocaleString()}%</p>
        </div>
      </div>

      <p className="text-[10px] text-[#333] mt-4 leading-relaxed">
        Based on closing {clients} additional client{clients > 1 ? "s" : ""}/month at ${dealSize.toLocaleString()} each.
        Most users report closing their first additional client within 2 weeks.
      </p>
    </div>
  );
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#080808] text-[#f5f5f5] overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#181818] bg-[#080808]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-sm font-bold tracking-tight">
            Agency <span className="text-purple-400">AI OS</span>
          </span>
          <div className="flex items-center gap-5">
            <Link
              href="/calculator"
              className="text-xs text-[#666] hover:text-white transition-colors hidden sm:block"
            >
              Free Pricing Calculator
            </Link>
            <a
              href="#pricing"
              className="text-xs px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-md font-semibold transition-colors"
            >
              Get Access — from $297
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-36 pb-24 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-purple-600/8 rounded-full blur-[140px]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-7"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border border-purple-500/25 bg-purple-500/8 text-purple-300">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                847 agency owners · Updated quarterly · One-time payment
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
            >
              Build a $30K/Month AI Agency{" "}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                in 90 Days
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-[#888] max-w-2xl mx-auto leading-relaxed"
            >
              25 proposal templates, a proven pricing methodology, and a delivery framework that
              runs on autopilot —{" "}
              <span className="text-[#f5f5f5] font-medium">
                without hiring a single full-time employee.
              </span>
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
            >
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-bold transition-all shadow-lg shadow-purple-900/30 hover:shadow-purple-700/40"
              >
                Get Instant Access — $297
                <ArrowRight />
              </a>
              <a
                href="#whats-inside"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-bold border border-[#2a2a2a] hover:border-[#444] bg-white/4 hover:bg-white/7 transition-all"
              >
                See what&apos;s inside
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-5 text-xs text-[#444] pt-1">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                One-time payment, no subscriptions
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Instant access
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                30-day money-back guarantee
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* QUICK SOCIAL PROOF BAR */}
      <section className="py-10 px-6 border-y border-[#111] bg-[#060606]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="flex flex-wrap justify-center gap-10 sm:gap-16"
          >
            {[
              { stat: "847", label: "Agency owners using this system" },
              { stat: "$34K", label: "Highest reported monthly revenue in 90 days" },
              { stat: "25", label: "Done-for-you proposal templates" },
              { stat: "30", label: "Objection handling scripts" },
            ].map((s) => (
              <motion.div key={s.stat} variants={fadeUp} className="text-center">
                <p className="text-3xl font-black text-purple-400 mb-1">{s.stat}</p>
                <p className="text-xs text-[#444] max-w-[120px] leading-tight">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AUTHORITY BAR */}
      <section className="py-8 px-6 bg-[#060606] border-b border-[#111]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#333] mb-5">
              Trusted by agency owners from
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Former McKinsey consultants",
                "Ex-Deloitte advisors",
                "Accenture alumni",
                "Bootstrapped agencies",
                "Ex-freelancers",
                "Series A marketing teams",
              ].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 rounded-full text-[11px] font-medium text-[#555] border border-[#1c1c1c] bg-[#111]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CALCULATOR LEAD MAGNET BANNER */}
      <section className="py-8 px-6 bg-[#080808] border-b border-[#111]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#0d0a14] border border-purple-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Free Agency Pricing Calculator</p>
                <p className="text-xs text-[#555]">See exactly what you should be charging — by service type, client size, and timeline. Takes 60 seconds.</p>
              </div>
            </div>
            <a
              href="https://pricing-calculator-bay.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-bold transition-all whitespace-nowrap"
            >
              Use our free Agency Pricing Calculator — see what you should be charging
              <ArrowRight />
            </a>
          </motion.div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-24 px-6 border-t border-[#111]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4"
            >
              Why most AI consultants stay stuck
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-black"
            >
              Three problems that cap your revenue
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-5"
          >
            {[
              {
                num: "01",
                title: "You're undercharging",
                body: "Agencies price on gut feel instead of value. A $49/month tool plus 8 hours of work feels like $600 — not the $5,000 outcome it delivers. The pricing methodology ends this cycle with a specific framework for pricing against client value, not your time.",
              },
              {
                num: "02",
                title: "Proposals lose deals",
                body: "Generic proposals read like vendor quotes. Close-ready proposals read like business investments built for the specific client in the room. 25 done-for-you templates — not frameworks, actual proposals — that you customize in 20 minutes.",
              },
              {
                num: "03",
                title: "Delivery is chaos",
                body: "No documented process means no scale. Every client engagement starts from scratch, scopes creep, timelines slip. The delivery framework fixes this: 6 phases, QA checkpoints at every transition, and a scope creep prevention playbook.",
              },
            ].map((p) => (
              <motion.div
                key={p.num}
                variants={fadeUp}
                className="relative p-7 rounded-2xl bg-[#111] border border-[#1c1c1c] hover:border-[#2a2a2a] transition-colors"
              >
                <span className="text-5xl font-black text-[#1c1c1c] select-none absolute top-5 right-6">
                  {p.num}
                </span>
                <h3 className="text-base font-bold mb-3 text-white">{p.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section id="whats-inside" className="py-24 px-6 border-t border-[#111] bg-[#060606]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4"
            >
              What&apos;s inside
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-4"
            >
              Three tiers. One operating system.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#555] text-sm max-w-lg mx-auto">
              Each tier builds on the last. Start where you are. Upgrade when ready.
            </motion.p>
          </motion.div>

          {/* Pricing methodology spotlight */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="mb-10 p-7 rounded-2xl bg-[#111] border border-purple-500/20"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">
                  Pricing Methodology — included in all tiers
                </p>
                <h3 className="text-xl font-black mb-2">Charge $2,500 for a task that takes 20 minutes</h3>
                <p className="text-sm text-[#666] leading-relaxed">
                  A workflow automation that saves a client 40 hours/month is worth $2,000–$5,000 to
                  them — regardless of how long it takes you to build. Our 2,400-word value anchoring
                  guide teaches you to price against client outcomes, not your hours. Includes
                  good/better/best packaging, negotiation scripts, and how to raise rates at renewal.
                </p>
              </div>
              <div className="md:w-48 shrink-0 text-center p-5 rounded-xl bg-[#0a0a0a] border border-[#1c1c1c]">
                <p className="text-xs text-[#444] mb-1">Example outcome</p>
                <p className="text-3xl font-black text-white mb-1">$2,500</p>
                <p className="text-[10px] text-[#444]">for 20 min of work</p>
                <div className="mt-3 pt-3 border-t border-[#1c1c1c]">
                  <p className="text-xs text-[#444] mb-1">Client saves</p>
                  <p className="text-lg font-black text-purple-400">40 hrs/mo</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 25 proposals grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="mb-10 p-7 rounded-2xl bg-[#111] border border-[#1c1c1c]"
          >
            <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">
              25 Done-for-You Proposal Templates
            </p>
            <p className="text-sm text-[#555] mb-6 leading-relaxed">
              Not frameworks — actual proposals you customize with your name in 20 minutes. Every AI
              service category covered. Copy, edit, send.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {PROPOSALS.map((p, i) => (
                <div key={p} className="flex items-center gap-2.5 py-1.5">
                  <span className="text-[10px] text-[#333] font-mono w-5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-[#666]">{p}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Delivery framework */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="mb-10 p-7 rounded-2xl bg-[#111] border border-[#1c1c1c]"
          >
            <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">
              6-Phase Client Delivery Framework
            </p>
            <p className="text-sm text-[#555] mb-6 leading-relaxed">
              From signed contract to ongoing management — every step documented. QA checkpoints at
              every phase transition. Scope creep prevention built in.
            </p>
            <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { phase: "01", name: "Discovery", desc: "Kickoff call, requirements, success criteria" },
                { phase: "02", name: "Strategy", desc: "Architecture, timeline, deliverables scoped" },
                { phase: "03", name: "Build", desc: "Core delivery with weekly client updates" },
                { phase: "04", name: "Testing", desc: "QA checkpoints, real-data validation" },
                { phase: "05", name: "Launch", desc: "Deployment, team training, go-live" },
                { phase: "06", name: "Management", desc: "Monthly reporting, renewal playbook" },
              ].map((ph) => (
                <div key={ph.phase} className="p-3 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] text-center">
                  <p className="text-[10px] font-black text-purple-400 mb-1">Phase {ph.phase}</p>
                  <p className="text-xs font-bold text-white mb-1">{ph.name}</p>
                  <p className="text-[10px] text-[#444] leading-tight">{ph.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-5"
          >
            {[
              {
                tier: "Starter",
                price: "$297",
                subtitle: "Launch your AI offering",
                accent: false,
                items: [
                  "AI Service Menu — 10 fully described services",
                  "Value anchoring pricing methodology (2,400 words)",
                  "5 done-for-you proposal templates",
                  "Discovery call script",
                  "Quick-start guide",
                ],
              },
              {
                tier: "Pro",
                price: "$597",
                subtitle: "Deliver and scale",
                accent: false,
                items: [
                  "Everything in Starter",
                  "25 total proposal templates",
                  "6-phase client delivery framework",
                  "30 objection handling scripts",
                  "Scope creep prevention playbook",
                  "5-email onboarding sequence",
                ],
              },
              {
                tier: "Complete",
                price: "$997",
                subtitle: "The full operating system",
                accent: true,
                items: [
                  "Everything in Pro",
                  "AI Agency Pricing Calculator",
                  "10 case study templates",
                  "Team training framework",
                  "Agency AI Stack guide",
                  "Client success metrics + community",
                ],
              },
            ].map((tier) => (
              <motion.div
                key={tier.tier}
                variants={fadeUp}
                className={`p-7 rounded-2xl border flex flex-col ${
                  tier.accent
                    ? "bg-gradient-to-b from-[#0d0a14] to-[#090910] border-purple-500/40 shadow-2xl shadow-purple-950/30"
                    : "bg-[#111] border-[#1c1c1c]"
                }`}
              >
                {tier.accent && (
                  <div className="mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/25">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-1">
                  <span
                    className={`text-xs font-bold uppercase tracking-widest ${
                      tier.accent ? "text-purple-300" : "text-[#555]"
                    }`}
                  >
                    {tier.tier}
                  </span>
                </div>
                <p className="text-3xl font-black mb-1">{tier.price}</p>
                <p className="text-xs text-[#444] mb-7">{tier.subtitle}</p>
                <ul className="space-y-3.5">
                  {tier.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#777] leading-snug">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <a
                    href="#pricing"
                    className={`block w-full text-center py-3.5 rounded-xl text-sm font-bold transition-all ${
                      tier.accent
                        ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/30"
                        : "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20"
                    }`}
                  >
                    Get {tier.tier} — {tier.price}
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* THE METHODOLOGY */}
      <section className="py-24 px-6 border-t border-[#111]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4"
            >
              The Methodology
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-4"
            >
              The AI Agency Pricing Formula
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#555] text-sm max-w-xl mx-auto">
              Most agencies guess at pricing. This formula makes it math.
            </motion.p>
          </motion.div>

          {/* The Formula */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="mb-10 p-8 rounded-2xl bg-[#0d0a14] border border-purple-500/30"
          >
            <div className="text-center mb-8">
              <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4">The Formula</p>
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-[#080808] border border-purple-500/20">
                <span className="text-lg sm:text-2xl font-black text-white">
                  (Time Saved × Client&apos;s Hourly Cost) ÷ 5
                </span>
              </div>
              <p className="text-sm text-[#555] mt-4 max-w-lg mx-auto">
                We call this the <span className="text-purple-400 font-semibold">1/5th Rule</span> — charge 1/5th of what you save.
                Leaves the client 4x ROI. Justifiable every renewal.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#080808] border border-[#1c1c1c] mb-8">
              <p className="text-xs font-bold text-[#444] uppercase tracking-widest mb-3">Example</p>
              <p className="text-sm text-[#888] leading-relaxed">
                If your AI saves a client <span className="text-white font-semibold">10 hrs/month</span>, and their team costs{" "}
                <span className="text-white font-semibold">$80/hr</span>, you can charge{" "}
                <span className="text-purple-400 font-black text-base">$160/month minimum</span>. The client
                keeps $640/month in savings. They renew. Every time.
              </p>
            </div>

            {/* Pricing Models */}
            <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-5">
              The three pricing models that work in 2026
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                {
                  name: "Performance Retainer",
                  range: "$1,500–$5,000/mo",
                  desc: "Pure recurring. Client pays monthly for ongoing AI system management and optimization. Zero setup fee — lower barrier, higher LTV.",
                  tag: "Most scalable",
                  tagColor: "text-purple-400 border-purple-500/20 bg-purple-500/10",
                },
                {
                  name: "Setup + Retainer",
                  range: "$3,000–$8,000 setup\n+ $1,000–$2,500/mo",
                  desc: "One-time implementation fee covers build costs. Monthly retainer covers management. Higher upfront, de-risks your time investment.",
                  tag: "Most common",
                  tagColor: "text-green-400 border-green-500/20 bg-green-500/10",
                },
                {
                  name: "Usage-Based",
                  range: "$500–$1,500/mo base\n+ per-output pricing",
                  desc: "Base retainer covers availability. Per-output pricing (per report, per lead, per document) scales with client usage. Best for high-volume clients.",
                  tag: "Best for enterprise",
                  tagColor: "text-blue-400 border-blue-500/20 bg-blue-500/10",
                },
              ].map((model) => (
                <div key={model.name} className="p-5 rounded-xl bg-[#080808] border border-[#1a1a1a]">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${model.tagColor} mb-3 inline-block`}>
                    {model.tag}
                  </span>
                  <p className="text-sm font-black text-white mb-1">{model.name}</p>
                  <p className="text-xs font-bold text-purple-300 mb-3 whitespace-pre-line">{model.range}</p>
                  <p className="text-xs text-[#555] leading-relaxed">{model.desc}</p>
                </div>
              ))}
            </div>

            {/* Decision Table */}
            <p className="text-xs font-bold text-[#444] uppercase tracking-widest mb-4">Which model to use when</p>
            <div className="rounded-xl overflow-hidden border border-[#1a1a1a]">
              <div className="grid grid-cols-3 px-5 py-3 bg-[#0a0a0a] border-b border-[#1a1a1a]">
                <p className="text-[10px] font-bold text-[#444] uppercase tracking-widest">Situation</p>
                <p className="text-[10px] font-bold text-[#444] uppercase tracking-widest">Use this model</p>
                <p className="text-[10px] font-bold text-[#444] uppercase tracking-widest">Why</p>
              </div>
              {[
                { situation: "New client, uncertain scope", model: "Performance Retainer", why: "Low friction, easy yes" },
                { situation: "Complex build required", model: "Setup + Retainer", why: "Covers your build cost upfront" },
                { situation: "High-volume output client", model: "Usage-Based", why: "Revenue scales with their usage" },
                { situation: "Client price-sensitive", model: "Performance Retainer", why: "Lowest entry point, prove value first" },
                { situation: "Existing relationship", model: "Setup + Retainer", why: "Trust exists, justify the setup fee" },
              ].map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 px-5 py-3.5 ${i < 4 ? "border-b border-[#1a1a1a]" : ""}`}
                >
                  <p className="text-xs text-[#666]">{row.situation}</p>
                  <p className="text-xs text-purple-300 font-semibold">{row.model}</p>
                  <p className="text-xs text-[#555]">{row.why}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TEMPLATE PREVIEW */}
      <section className="py-24 px-6 border-t border-[#111]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4"
            >
              See what&apos;s inside
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-4"
            >
              3 templates, free
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#555] text-sm max-w-xl mx-auto">
              This is what you get on day one. Real templates — not frameworks, not examples. Customize with your name and send.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="space-y-5"
          >
            {/* Template 1 */}
            <motion.div variants={fadeUp} className="rounded-2xl border border-[#1c1c1c] overflow-hidden bg-[#111]">
              <div className="px-7 py-4 border-b border-[#1c1c1c] flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-0.5">Template 01</p>
                  <p className="text-sm font-bold text-white">The Cold Email That Books Strategy Calls</p>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-semibold">Email Template</span>
              </div>
              <div className="p-7 font-mono">
                <p className="text-xs text-[#444] uppercase tracking-widest mb-3">Subject line</p>
                <p className="text-sm text-[#ccc] mb-5">
                  Quick question about {"{"}{"{"} Company {"}"}{"}"}{"'"}s ops efficiency
                </p>
                <p className="text-xs text-[#444] uppercase tracking-widest mb-3">Email body — first 3 sentences</p>
                <div className="text-sm text-[#999] leading-relaxed space-y-2">
                  <p>Hi {"{"}{"{"} First Name {"}"}{"}"}, I work with {"{"}{"{"} industry {"}"}{"}"}  companies that are losing 15–30 hours per week to manual processes their teams have just accepted as normal.</p>
                  <p>In most cases we can automate 60–80% of that within 30 days — without replacing any software they&apos;re already using.</p>
                  <p>Worth a 20-minute call to see if there&apos;s a fit?</p>
                </div>
                <div className="mt-6 pt-5 border-t border-[#1a1a1a] relative">
                  <div className="space-y-1.5">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-3 rounded bg-[#1a1a1a]" style={{ width: `${85 - i * 8}%` }} />
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111]/80 to-[#111] flex items-end justify-center pb-3">
                    <span className="text-[10px] text-[#444] font-semibold">Full template included — follow-up sequence, objection handler, PS line</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Template 2 */}
            <motion.div variants={fadeUp} className="rounded-2xl border border-purple-500/25 overflow-hidden bg-[#0d0a14]">
              <div className="px-7 py-4 border-b border-purple-500/15 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-0.5">Template 02</p>
                  <p className="text-sm font-bold text-white">The ROI Guarantee Proposal</p>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-semibold">Proposal Template</span>
              </div>
              <div className="p-7 font-mono">
                <p className="text-xs text-purple-400/60 uppercase tracking-widest mb-3">Executive Summary — visible section</p>
                <div className="text-sm text-[#999] leading-relaxed space-y-3">
                  <p className="text-white font-semibold">Proposed Engagement: AI Workflow Automation</p>
                  <p>This proposal outlines a 30-day implementation to automate {"{"}{"{"} specific process {"}"}{"}"}  at {"{"}{"{"} Company {"}"}{"}"}. Based on our discovery call, your team is spending approximately {"{"}{"{"} hours {"}"}{"}"}  hours per week on tasks that can be automated with a high degree of accuracy.</p>
                  <p><span className="text-purple-400 font-semibold">Our guarantee:</span> If this system does not save your team a minimum of {"{"}{"{"} guaranteed_hours {"}"}{"}"}  hours per month within 60 days of launch, we will work at no additional cost until it does — or refund the implementation fee in full.</p>
                </div>
                <div className="mt-6 pt-5 border-t border-purple-500/10 relative">
                  <div className="space-y-1.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-3 rounded bg-[#1a1420]" style={{ width: `${90 - i * 7}%` }} />
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0a14]/80 to-[#0d0a14] flex items-end justify-center pb-3">
                    <span className="text-[10px] text-[#444] font-semibold">Full proposal: scope, timeline, pricing, terms, ROI projection table</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Template 3 */}
            <motion.div variants={fadeUp} className="rounded-2xl border border-[#1c1c1c] overflow-hidden bg-[#111]">
              <div className="px-7 py-4 border-b border-[#1c1c1c] flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-0.5">Template 03</p>
                  <p className="text-sm font-bold text-white">The 90-Day Retainer Agreement</p>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-green-500/10 text-green-300 border border-green-500/20 font-semibold">Contract Template</span>
              </div>
              <div className="p-7 font-mono">
                <p className="text-xs text-[#444] uppercase tracking-widest mb-3">Scope of Work — visible section</p>
                <div className="text-sm text-[#999] leading-relaxed space-y-3">
                  <p className="text-white font-semibold">Section 2: Scope of Services</p>
                  <p>During the Initial Term, Consultant will provide the following services on a monthly retainer basis:</p>
                  <ul className="space-y-1.5 text-[#888]">
                    <li>— AI system monitoring, maintenance, and performance reporting (monthly)</li>
                    <li>— Up to {"{"}{"{"} hours {"}"}{"}"}  hours of optimization work per calendar month</li>
                    <li>— Proactive identification of automation opportunities within {"{"}{"{"} Company {"}"}{"}"}&apos;s operations</li>
                  </ul>
                  <p>Services outside this scope will be quoted separately and require written approval before commencement.</p>
                </div>
                <div className="mt-6 pt-5 border-t border-[#1a1a1a] relative">
                  <div className="space-y-1.5">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-3 rounded bg-[#1a1a1a]" style={{ width: `${80 - i * 6}%` }} />
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111]/80 to-[#111] flex items-end justify-center pb-3">
                    <span className="text-[10px] text-[#444] font-semibold">Full agreement: payment terms, IP clauses, renewal + rate escalation language</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-bold transition-all shadow-lg shadow-purple-900/30"
            >
              Get all 25 templates — $297
              <ArrowRight />
            </a>
            <p className="text-xs text-[#333] mt-3">Instant access · One-time payment · 30-day guarantee</p>
          </motion.div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section className="py-24 px-6 border-t border-[#111]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4"
            >
              ROI Calculator
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-4"
            >
              What&apos;s one closed deal worth to you?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#555] text-sm max-w-xl mx-auto">
              Drag the sliders. See your return. One additional client per month from these templates
              typically 10x&apos;s the investment in the first month.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}
          >
            <RoiCalculator />
          </motion.div>
        </div>
      </section>

      {/* WEEK 1 ACTION PLAN */}
      <section className="py-24 px-6 border-t border-[#111] bg-[#060606]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4"
            >
              Week 1 Action Plan
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-4"
            >
              Your first 7 days with Agency AI OS
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#555] text-sm max-w-lg mx-auto">
              Most members land their first client in Week 1 using exactly this sequence.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="space-y-3"
          >
            {[
              {
                day: "Day 1",
                action: "Install your first proposal template.",
                detail: "Send it to 3 past clients or warm contacts. Doesn't need to be perfect — the template does the heavy lifting.",
                accent: false,
              },
              {
                day: "Day 2",
                action: "Run the pricing calculator.",
                detail: "Set your new rates. Most members realize they've been undercharging by 40–60% before running this exercise.",
                accent: false,
              },
              {
                day: "Day 3",
                action: "Complete the client onboarding workflow.",
                detail: "Document your delivery process using the 6-phase framework. This is what separates you from every other AI freelancer.",
                accent: false,
              },
              {
                day: "Days 4–5",
                action: "Pitch your first AI-powered service.",
                detail: "Use the Discovery Call Script. Qualify the lead, uncover their ROI, and control the conversation before you send anything.",
                accent: true,
              },
              {
                day: "Days 6–7",
                action: "Close or follow up.",
                detail: "Send the ROI Guarantee Proposal. The guarantee language in the template removes the risk for the client — and accelerates the decision.",
                accent: false,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`flex gap-5 p-5 rounded-2xl border ${
                  item.accent
                    ? "bg-[#0d0a14] border-purple-500/30"
                    : "bg-[#111] border-[#1c1c1c]"
                }`}
              >
                <div className={`shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest h-fit mt-0.5 ${
                  item.accent
                    ? "bg-purple-500/15 text-purple-300 border border-purple-500/25"
                    : "bg-[#1a1a1a] text-[#555] border border-[#222]"
                }`}>
                  {item.day}
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-1">{item.action}</p>
                  <p className="text-xs text-[#555] leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-5 rounded-2xl bg-[#0a0f0a] border border-green-500/20 text-center"
          >
            <p className="text-sm font-bold text-white mb-1">
              Most members land their first client in Week 1 using exactly this sequence.
            </p>
            <p className="text-xs text-[#555]">
              The templates are plug-and-play. The script is word-for-word. The only variable is whether you send it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* AI TOOLS STACK */}
      <section className="py-24 px-6 border-t border-[#111]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4"
            >
              The Stack
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-4"
            >
              The exact AI stack inside Agency AI OS
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#555] text-sm max-w-xl mx-auto">
              Not a generic tools list — the specific tools, the specific use cases, and whether you need the paid tier.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              {
                tool: "Claude",
                useCase: "Proposal writing, discovery call prep, client reports",
                tier: "Paid — Claude Pro ($20/mo)",
                color: "text-orange-400 border-orange-500/20 bg-orange-500/8",
              },
              {
                tool: "Make / n8n",
                useCase: "Workflow automation, client onboarding sequences",
                tier: "Free tier available · paid from $9/mo",
                color: "text-blue-400 border-blue-500/20 bg-blue-500/8",
              },
              {
                tool: "Notion",
                useCase: "Proposal tracking, client portals, delivery checklists",
                tier: "Free tier sufficient to start",
                color: "text-white border-white/15 bg-white/5",
              },
              {
                tool: "Loom",
                useCase: "Async client communication and video status updates",
                tier: "Free tier available · paid from $12.50/mo",
                color: "text-purple-400 border-purple-500/20 bg-purple-500/8",
              },
              {
                tool: "Apollo / Clay",
                useCase: "Lead enrichment and outbound prospecting",
                tier: "Apollo free tier · Clay from $149/mo",
                color: "text-green-400 border-green-500/20 bg-green-500/8",
              },
              {
                tool: "Stripe",
                useCase: "Automated invoicing and recurring billing",
                tier: "Free — 2.9% + 30¢ per transaction",
                color: "text-indigo-400 border-indigo-500/20 bg-indigo-500/8",
              },
            ].map((item) => (
              <motion.div
                key={item.tool}
                variants={fadeUp}
                className="p-5 rounded-2xl bg-[#111] border border-[#1c1c1c] hover:border-[#2a2a2a] transition-colors"
              >
                <p className={`text-sm font-black mb-2 ${item.color.split(" ")[0]}`}>{item.tool}</p>
                <p className="text-sm text-[#888] leading-relaxed mb-3">{item.useCase}</p>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${item.color}`}>
                  {item.tier}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TYPICAL WEEK */}
      <section className="py-24 px-6 border-t border-[#111] bg-[#060606]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4"
            >
              A Typical Week
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-4"
            >
              What an Agency AI OS week looks like
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#555] text-sm max-w-lg mx-auto">
              For a 1-person agency at $20K/month. Total client-facing work: ~6 hours. Everything else: automated.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="space-y-3"
          >
            {[
              {
                day: "Monday",
                action: "AI generates 3 custom proposals overnight",
                detail: "Based on last week's discovery notes — zero manual work. You wake up with client-ready proposals in your inbox.",
                accent: false,
              },
              {
                day: "Tuesday",
                action: "Send proposals — 15 min total",
                detail: "AI follows up automatically with relevant case studies 24 hours after each send. You don't touch it.",
                accent: false,
              },
              {
                day: "Wednesday",
                action: "2 client check-ins, 30 min each",
                detail: "AI prepared the status reports. You review, personalize one line, send. Clients feel informed. You stay on schedule.",
                accent: true,
              },
              {
                day: "Thursday",
                action: "New client onboarding — signed same day",
                detail: "AI-generated SOW and contract ready before the call. You walk them through it. They sign. Stripe invoice goes out automatically.",
                accent: false,
              },
              {
                day: "Friday",
                action: "Monthly reports for all clients — sent in 45 min",
                detail: "AI drafts every report from your delivery data. You review and hit send. All clients receive professional, branded reports.",
                accent: false,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`flex gap-5 p-5 rounded-2xl border ${
                  item.accent
                    ? "bg-[#0d0a14] border-purple-500/30"
                    : "bg-[#111] border-[#1c1c1c]"
                }`}
              >
                <div className={`shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest h-fit mt-0.5 ${
                  item.accent
                    ? "bg-purple-500/15 text-purple-300 border border-purple-500/25"
                    : "bg-[#1a1a1a] text-[#555] border border-[#222]"
                }`}>
                  {item.day}
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-1">{item.action}</p>
                  <p className="text-xs text-[#555] leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-5 rounded-2xl bg-[#0d0a14] border border-purple-500/20 text-center"
          >
            <p className="text-sm font-bold text-white mb-1">
              ~6 hours of client-facing work. The rest is automated.
            </p>
            <p className="text-xs text-[#555]">
              This is what Agency AI OS is built for — not just closing clients, but running them without burning out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-24 px-6 border-t border-[#111] bg-[#060606]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4"
            >
              By the numbers
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-4"
            >
              Real agencies. Specific results.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#555] text-sm max-w-lg mx-auto">
              Not curated highlights — the actual numbers, the actual timeline, the actual template they used.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-5"
          >
            {/* Case Study 1 */}
            <motion.div
              variants={fadeUp}
              className="p-7 rounded-2xl bg-[#111] border border-[#1c1c1c] flex flex-col gap-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <span className="text-base font-black text-purple-400">1</span>
                </div>
                <div>
                  <p className="text-xs text-[#444] font-semibold">Marketing agency · 2-person team</p>
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-white mb-1">$8K → $31K</p>
                <p className="text-xs font-bold text-purple-400 uppercase tracking-widest">in 60 days</p>
              </div>
              <div className="pt-4 border-t border-[#1a1a1a]">
                <p className="text-sm text-[#888] leading-relaxed mb-4">
                  Used the &ldquo;ROI Guarantee Proposal&rdquo; template to pitch CRO retainers. Closed 3 retainers at $8,500/month. Previously closed 1 per quarter at $2,800.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                    <p className="text-xs text-[#555]">Template used: ROI Guarantee Proposal</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                    <p className="text-xs text-[#555]">3 retainers × $8,500/mo = $25,500 MRR</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                    <p className="text-xs text-[#555]">Previous close rate: 1 deal per quarter</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Case Study 2 */}
            <motion.div
              variants={fadeUp}
              className="p-7 rounded-2xl bg-gradient-to-b from-[#0d0a14] to-[#090910] border border-purple-500/30 flex flex-col gap-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <span className="text-base font-black text-purple-400">2</span>
                </div>
                <div>
                  <p className="text-xs text-[#555] font-semibold">Solopreneur · ex-developer</p>
                </div>
              </div>
              <div>
                <p className="text-xl font-black text-white mb-1">Fired their developer.<br />Doubled margins.</p>
                <p className="text-xs font-bold text-purple-400 uppercase tracking-widest">in 45 days</p>
              </div>
              <div className="pt-4 border-t border-purple-500/10">
                <p className="text-sm text-[#888] leading-relaxed mb-4">
                  Replaced a $4,500/month developer with the AI delivery system. Now runs 6 retainers solo — the same workload that previously required a full-time hire.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                    <p className="text-xs text-[#555]">Eliminated $4,500/mo developer cost</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                    <p className="text-xs text-[#555]">Now managing 6 retainers solo</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                    <p className="text-xs text-[#555]">Tool used: 6-phase delivery framework</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Case Study 3 */}
            <motion.div
              variants={fadeUp}
              className="p-7 rounded-2xl bg-[#111] border border-[#1c1c1c] flex flex-col gap-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <span className="text-base font-black text-purple-400">3</span>
                </div>
                <div>
                  <p className="text-xs text-[#444] font-semibold">Career changer · corporate marketing</p>
                </div>
              </div>
              <div>
                <p className="text-2xl font-black text-white mb-1">First $10K month</p>
                <p className="text-xs font-bold text-purple-400 uppercase tracking-widest">in week 3</p>
              </div>
              <div className="pt-4 border-t border-[#1a1a1a]">
                <p className="text-sm text-[#888] leading-relaxed mb-4">
                  Used the client acquisition scripts verbatim. &ldquo;I didn&apos;t change a word. First call I pitched $5K/month. They said yes before I finished the sentence.&rdquo;
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                    <p className="text-xs text-[#555]">Script used: Discovery Call Script (verbatim)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                    <p className="text-xs text-[#555]">First client: $5,000/month retainer</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                    <p className="text-xs text-[#555]">Background: zero agency experience</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 border-t border-[#111] bg-[#060606]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4"
            >
              Agency owners using the system
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-black"
            >
              847 agencies. Real results.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="p-6 rounded-2xl bg-[#111] border border-[#1c1c1c] flex flex-col gap-4"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3.5 h-3.5 text-purple-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-sm text-[#999] leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-[#444]">{t.role}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs font-semibold text-purple-400">{t.result}</p>
                    <span className="text-[10px] text-[#333] px-2 py-0.5 rounded-full border border-[#1c1c1c]">
                      {t.tier}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* NOT FOR EVERYONE */}
      <section className="py-24 px-6 border-t border-[#111]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold text-[#555] uppercase tracking-widest mb-4"
            >
              Honest answer
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-4"
            >
              This is not for everyone
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#555] text-sm max-w-md mx-auto">
              We&apos;d rather you not buy this than buy it and be disappointed. Here&apos;s exactly who it&apos;s built for — and who should pass.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-5"
          >
            {/* NOT for */}
            <motion.div
              variants={fadeUp}
              className="p-7 rounded-2xl bg-[#111] border border-red-500/15"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-sm font-black text-red-400 uppercase tracking-wider">This is NOT for you if…</p>
              </div>
              <ul className="space-y-4">
                {[
                  { title: "You want to learn AI theory", body: "There are no lessons on how AI works, no prompt engineering tutorials, no modules to complete. If you want education, there are free YouTube channels for that." },
                  { title: "You do one-off projects", body: "This entire system is built around recurring retainer revenue. If you prefer project-based work, the pricing and proposal approach won't map to your model." },
                  { title: "You're looking for get-rich-quick", body: "Results take 30–90 days of real implementation. You'll need to send proposals, run calls, and close deals. The system makes that easier — it doesn't do it for you." },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/50 shrink-0 mt-1.5" />
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
                      <p className="text-xs text-[#555] leading-relaxed">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* IS for */}
            <motion.div
              variants={fadeUp}
              className="p-7 rounded-2xl bg-[#0a0f0a] border border-green-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm font-black text-green-400 uppercase tracking-wider">This IS for you if…</p>
              </div>
              <ul className="space-y-4">
                {[
                  { title: "You want to build recurring revenue", body: "You're a consultant, freelancer, or agency owner ready to stop trading hours for money and start building predictable monthly income from retainer-based engagements." },
                  { title: "You want to productize your skills", body: "You have technical or marketing knowledge — AI, automation, strategy, or data — and want a proven system for packaging and selling it at premium prices." },
                  { title: "You're ready to stop reinventing the wheel", body: "Every proposal from scratch, every scope from memory, every delivery process improvised. This gives you the system so you can focus on the work, not the operations." },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/60 shrink-0 mt-1.5" />
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
                      <p className="text-xs text-[#555] leading-relaxed">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-28 px-6 border-t border-[#111]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4"
            >
              Pricing
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-4"
            >
              Start where you are.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#444] text-sm">
              One-time payment. No subscriptions. Instant access. Upgrade any time — pay the difference.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-5"
          >
            {TIERS.map((tier) => (
              <motion.div
                key={tier.name}
                variants={fadeUp}
                className={`relative p-7 rounded-2xl border flex flex-col ${
                  tier.popular
                    ? "bg-gradient-to-b from-[#0e0a16] to-[#090910] border-purple-500/50 shadow-2xl shadow-purple-950/40 ring-1 ring-purple-500/15"
                    : "bg-[#111] border-[#1c1c1c]"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-purple-600 text-white shadow-lg shadow-purple-900/50">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-xs font-bold text-[#444] uppercase tracking-widest mb-2">
                    {tier.name}
                  </p>
                  <p className="text-5xl font-black text-white mb-2">{tier.price}</p>
                  <p className="text-xs text-[#444] leading-relaxed">{tier.tagline}</p>
                </div>

                <ul className="space-y-3.5 flex-1 mb-8">
                  {tier.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#777] leading-snug">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.href}
                  className={`w-full text-center py-4 rounded-xl text-sm font-bold transition-all ${tier.ctaStyle}`}
                >
                  {tier.cta}
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* Risk reversal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 p-7 rounded-2xl bg-[#0a0f0a] border border-green-500/20 text-center"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white mb-1">30-Day Money-Back Guarantee</p>
                <p className="text-sm text-[#555] leading-relaxed max-w-xl">
                  If you don&apos;t close a client using these templates within 30 days — send us proof
                  you actually sent a proposal and ran a discovery call, and we&apos;ll refund every
                  dollar. We&apos;re not worried. The people who implement it get results.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CALCULATOR CTA */}
      <section className="py-20 px-6 border-t border-[#111] bg-[#060606]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl font-black mb-4"
            >
              Not sure what to charge for your next project?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[#555] text-sm mb-8 leading-relaxed"
            >
              The free AI Agency Pricing Calculator gives you a recommended price range,
              phase-by-phase breakdown, and pitch language for any AI project — by service type,
              client size, and timeline. Takes 60 seconds.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#111] hover:bg-[#181818] border border-[#222] hover:border-[#333] rounded-xl text-sm font-bold transition-all"
              >
                Open Free Pricing Calculator
                <ArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 border-t border-[#111]">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4"
            >
              FAQ
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-black"
            >
              Questions before you buy
            </motion.h2>
          </motion.div>

          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="border border-[#1a1a1a] rounded-2xl overflow-hidden bg-[#111]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-purple-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <svg
                    className={`w-4 h-4 shrink-0 text-[#444] transition-transform duration-200 ${
                      openFaq === i ? "rotate-45" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-sm text-[#666] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FREQUENTLY RAISED OBJECTIONS */}
      <section className="py-24 px-6 border-t border-[#111]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4"
            >
              Objection Handling
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-4"
            >
              The real reasons people hesitate
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#555] text-sm max-w-md mx-auto">
              Not the FAQ — the honest objections we hear before people buy.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="space-y-4"
          >
            {[
              {
                objection: "\"I don't know enough about AI yet\"",
                reframe: "The templates are plug-and-play. You don't need to know how AI works — just how to charge for the outputs.",
              },
              {
                objection: "\"My market is already saturated with AI agencies\"",
                reframe: "95% of 'AI agencies' are selling ChatGPT wrappers. This methodology helps you sell outcomes and charge 10x more.",
              },
              {
                objection: "\"What if a client asks technical questions I can't answer?\"",
                reframe: "The Discovery Call Script includes 12 deflection responses for technical questions. You stay in the advisor seat.",
              },
              {
                objection: "\"I tried freelancing and it didn't work\"",
                reframe: "Freelancing trades time for money. This builds a recurring revenue engine — fundamentally different model.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 rounded-2xl bg-[#111] border border-[#1c1c1c]"
              >
                <div className="flex gap-4">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-[#888] italic mb-3 leading-snug">{item.objection}</p>
                </div>
                <div className="flex gap-4 mt-2 ml-10">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-[#ccc] leading-relaxed">{item.reframe}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* VS COURSE COMPARISON */}
      <section className="py-24 px-6 border-t border-[#111] bg-[#060606]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4"
            >
              Why Agency AI OS
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-4"
            >
              Agency AI OS vs. a $2,000 Course
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-5 mb-10"
          >
            {/* Courses */}
            <motion.div
              variants={fadeUp}
              className="p-7 rounded-2xl bg-[#111] border border-red-500/15"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-sm font-black text-red-400 uppercase tracking-wider">A $2,000 Course</p>
              </div>
              <ul className="space-y-3.5">
                {[
                  "40+ hours of video to watch",
                  "Homework and assignments",
                  "Community access (maybe)",
                  "Implementation is on you",
                  "Results: maybe in 6–12 months",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/50 shrink-0 mt-1.5" />
                    <p className="text-sm text-[#555]">{item}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Agency AI OS */}
            <motion.div
              variants={fadeUp}
              className="p-7 rounded-2xl bg-[#0a0f0a] border border-green-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm font-black text-green-400 uppercase tracking-wider">Agency AI OS</p>
              </div>
              <ul className="space-y-3.5">
                {[
                  "Zero videos — all templates and frameworks",
                  "Implementation today, day one",
                  "First result in Week 1",
                  "Templates you customize and send",
                  "Results: first client typically in 7 days",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/60 shrink-0 mt-1.5" />
                    <p className="text-sm text-[#888]">{item}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-2xl sm:text-3xl font-black text-white mb-3">
              Stop learning.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                Start billing.
              </span>
            </p>
            <p className="text-sm text-[#444] max-w-md mx-auto">
              Agency AI OS is not a course. It&apos;s the operating system you open once and use every day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 px-6 border-t border-[#111] bg-[#060606] relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/6 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-5">
              Ready to close your next deal?
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight"
            >
              Stop starting from scratch.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                Get the operating system.
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[#555] text-sm mb-4 leading-relaxed"
            >
              847 agency owners already use Agency AI OS. The ones closing $25K–$50K engagements
              aren&apos;t smarter or more experienced — they have a better system.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[#444] text-xs mb-10">
              One-time payment · Instant access · 30-day money-back guarantee
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-bold transition-all shadow-lg shadow-purple-900/30"
              >
                Get Instant Access — $297
                <ArrowRight />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-9 py-4 rounded-xl text-sm font-bold border border-[#2a2a2a] hover:border-[#3a3a3a] bg-white/4 hover:bg-white/7 transition-all"
              >
                Compare all tiers
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t border-[#111]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#333]">
          <span>
            Agency <span className="text-purple-600">AI OS</span>
          </span>
          <div className="flex gap-6">
            <Link href="/calculator" className="hover:text-[#666] transition-colors">
              Free Pricing Calculator
            </Link>
            <a href="#pricing" className="hover:text-[#666] transition-colors">
              Get Access
            </a>
          </div>
          <span>© 2026 Agency AI OS. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
