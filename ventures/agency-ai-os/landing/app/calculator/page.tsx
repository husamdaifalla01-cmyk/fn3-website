"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type ProjectType =
  | "automation"
  | "chatbot"
  | "agents"
  | "content"
  | "analytics"
  | "training";
type ClientSize = "smb" | "mid" | "enterprise";
type Timeline = "1mo" | "3mo" | "6mo";
type TeamSize = "1-2" | "3-5" | "5+";

interface Inputs {
  projectType: ProjectType | "";
  clientSize: ClientSize | "";
  timeline: Timeline | "";
  teamSize: TeamSize | "";
}

interface PriceOutput {
  low: number;
  mid: number;
  high: number;
  phases: {
    name: string;
    low: number;
    mid: number;
    high: number;
    description: string;
  }[];
  pitch: string;
}

const PROJECT_TYPES: { value: ProjectType; label: string; icon: string }[] = [
  { value: "automation", label: "Workflow Automation", icon: "⚙️" },
  { value: "chatbot", label: "Chatbot Development", icon: "💬" },
  { value: "agents", label: "AI Agent Deployment", icon: "🤖" },
  { value: "content", label: "AI Content Strategy", icon: "✍️" },
  { value: "analytics", label: "Marketing Analytics", icon: "📊" },
  { value: "training", label: "AI Training & Enablement", icon: "🎓" },
];

const CLIENT_SIZES: { value: ClientSize; label: string; desc: string }[] = [
  { value: "smb", label: "SMB", desc: "Under 50 employees · $500K–$5M revenue" },
  { value: "mid", label: "Mid-Market", desc: "50–500 employees · $5M–$100M revenue" },
  {
    value: "enterprise",
    label: "Enterprise",
    desc: "500+ employees · $100M+ revenue",
  },
];

const TIMELINES: { value: Timeline; label: string }[] = [
  { value: "1mo", label: "1 Month" },
  { value: "3mo", label: "3 Months" },
  { value: "6mo", label: "6 Months" },
];

const TEAM_SIZES: { value: TeamSize; label: string }[] = [
  { value: "1-2", label: "1–2 people" },
  { value: "3-5", label: "3–5 people" },
  { value: "5+", label: "5+ people" },
];

const BASE_PRICES: Record<ProjectType, { low: number; mid: number; high: number }> = {
  automation: { low: 2500, mid: 4500, high: 7000 },
  chatbot: { low: 5000, mid: 9000, high: 15000 },
  agents: { low: 8000, mid: 14000, high: 25000 },
  content: { low: 2000, mid: 3500, high: 5500 },
  analytics: { low: 2000, mid: 3000, high: 5000 },
  training: { low: 3000, mid: 5500, high: 9000 },
};

const CLIENT_MULTIPLIERS: Record<ClientSize, number> = {
  smb: 1,
  mid: 1.6,
  enterprise: 2.5,
};

const TIMELINE_MULTIPLIERS: Record<Timeline, number> = {
  "1mo": 1,
  "3mo": 1.35,
  "6mo": 1.7,
};

const TEAM_MULTIPLIERS: Record<TeamSize, number> = {
  "1-2": 1,
  "3-5": 1.3,
  "5+": 1.65,
};

const PHASE_SPLITS = {
  automation: [
    { name: "Discovery & Audit", pct: 0.2, description: "Process mapping, automation opportunity report" },
    { name: "Build & Configure", pct: 0.55, description: "Core automations and integrations" },
    { name: "Testing & QA", pct: 0.15, description: "Real-data testing, edge case handling" },
    { name: "Launch & Support", pct: 0.1, description: "Deployment, team training, 30-day check-in" },
  ],
  chatbot: [
    { name: "Discovery & Design", pct: 0.2, description: "Use case definition, conversation design" },
    { name: "Build & Train", pct: 0.5, description: "Bot build, knowledge base, integrations" },
    { name: "Testing & QA", pct: 0.2, description: "Flow testing, edge cases, analytics setup" },
    { name: "Launch & Support", pct: 0.1, description: "Deployment, 30-day monitoring and tuning" },
  ],
  agents: [
    { name: "Agent Scoping", pct: 0.15, description: "Goal definition, tool architecture, design doc" },
    { name: "Build & Test", pct: 0.55, description: "Agent build, tool integrations, HITL controls" },
    { name: "Deployment", pct: 0.2, description: "Production deploy, monitoring, alerting" },
    { name: "Post-Launch", pct: 0.1, description: "30-day support, runbook documentation" },
  ],
  content: [
    { name: "Setup & Onboarding", pct: 0.25, description: "Brand voice, prompt library, editorial system" },
    { name: "Production (Month 1)", pct: 0.5, description: "Full content production pipeline launch" },
    { name: "QA & Optimization", pct: 0.15, description: "Review workflow, performance analysis" },
    { name: "Steady State", pct: 0.1, description: "Ongoing management handoff documentation" },
  ],
  analytics: [
    { name: "Data Audit & Setup", pct: 0.3, description: "Data sources, dashboard architecture" },
    { name: "Dashboard Build", pct: 0.4, description: "Unified dashboard, anomaly detection" },
    { name: "AI Narrative Setup", pct: 0.2, description: "Automated commentary and reporting cadence" },
    { name: "Handover", pct: 0.1, description: "Stakeholder training, documentation" },
  ],
  training: [
    { name: "Assessment", pct: 0.15, description: "Team assessment, curriculum design" },
    { name: "Workshop Delivery", pct: 0.5, description: "Live workshop, role-specific prompt libraries" },
    { name: "Follow-Up Program", pct: 0.25, description: "30-day adoption plan, Q&A sessions" },
    { name: "Documentation", pct: 0.1, description: "SOPs, Slack templates, async content" },
  ],
};

function round(n: number): number {
  return Math.round(n / 100) * 100;
}

function formatCurrency(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

function calculatePrice(inputs: Inputs): PriceOutput | null {
  if (!inputs.projectType || !inputs.clientSize || !inputs.timeline || !inputs.teamSize) {
    return null;
  }

  const base = BASE_PRICES[inputs.projectType as ProjectType];
  const cm = CLIENT_MULTIPLIERS[inputs.clientSize as ClientSize];
  const tm = TIMELINE_MULTIPLIERS[inputs.timeline as Timeline];
  const sm = TEAM_MULTIPLIERS[inputs.teamSize as TeamSize];

  const total = {
    low: round(base.low * cm * tm * sm),
    mid: round(base.mid * cm * tm * sm),
    high: round(base.high * cm * tm * sm),
  };

  const splits = PHASE_SPLITS[inputs.projectType as ProjectType];
  const phases = splits.map((s) => ({
    name: s.name,
    description: s.description,
    low: round(total.low * s.pct),
    mid: round(total.mid * s.pct),
    high: round(total.high * s.pct),
  }));

  const typeLabel = PROJECT_TYPES.find((t) => t.value === inputs.projectType)?.label ?? "";
  const sizeLabel = CLIENT_SIZES.find((s) => s.value === inputs.clientSize)?.label ?? "";
  const timelineLabel = TIMELINES.find((t) => t.value === inputs.timeline)?.label ?? "";

  const pitch = `For a ${typeLabel.toLowerCase()} project of this scope — ${sizeLabel} client, ${timelineLabel.toLowerCase()} engagement — our investment starts at ${formatCurrency(total.mid)}. That reflects the full delivery: from discovery and architecture through deployment and post-launch support. Depending on the complexity of your integrations and the level of ongoing management you need, the total investment ranges from ${formatCurrency(total.low)} to ${formatCurrency(total.high)}.`;

  return { ...total, phases, pitch };
}

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<Inputs>({
    projectType: "",
    clientSize: "",
    timeline: "",
    teamSize: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const result = calculatePrice(inputs);
  const allFilled = !!(inputs.projectType && inputs.clientSize && inputs.timeline && inputs.teamSize);

  function update<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  function handleDownload(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#080808] text-[#f5f5f5]">

      {/* NAV */}
      <nav className="border-b border-[#181818] bg-[#080808]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold tracking-tight">
            Agency <span className="text-purple-400">AI OS</span>
          </Link>
          <Link
            href="/#pricing"
            className="text-xs px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-md font-semibold transition-colors"
          >
            Get Full Access
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-4xl mb-5 block">🧮</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            AI Agency Pricing Calculator
          </h1>
          <p className="text-[#666] text-sm max-w-xl mx-auto leading-relaxed">
            Select your project parameters and get a recommended price range, phase-by-phase
            breakdown, and a pitch you can use on your next call — instantly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* INPUTS */}
          <div className="space-y-7">

            {/* Project Type */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-xs font-bold uppercase tracking-widest text-[#555] mb-3">
                Project Type
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {PROJECT_TYPES.map((pt) => (
                  <button
                    key={pt.value}
                    onClick={() => update("projectType", pt.value)}
                    className={`flex items-center gap-2.5 p-3.5 rounded-xl text-sm font-medium border transition-all text-left ${
                      inputs.projectType === pt.value
                        ? "border-purple-500/60 bg-purple-500/10 text-white"
                        : "border-[#1c1c1c] bg-[#111] text-[#666] hover:border-[#2a2a2a] hover:text-[#aaa]"
                    }`}
                  >
                    <span className="text-base">{pt.icon}</span>
                    <span className="text-xs leading-tight">{pt.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Client Size */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <label className="block text-xs font-bold uppercase tracking-widest text-[#555] mb-3">
                Client Size
              </label>
              <div className="space-y-2">
                {CLIENT_SIZES.map((cs) => (
                  <button
                    key={cs.value}
                    onClick={() => update("clientSize", cs.value)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl text-sm border transition-all ${
                      inputs.clientSize === cs.value
                        ? "border-purple-500/60 bg-purple-500/10"
                        : "border-[#1c1c1c] bg-[#111] hover:border-[#2a2a2a]"
                    }`}
                  >
                    <span
                      className={`font-semibold ${
                        inputs.clientSize === cs.value ? "text-white" : "text-[#888]"
                      }`}
                    >
                      {cs.label}
                    </span>
                    <span className="text-xs text-[#444]">{cs.desc}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Timeline + Team Size */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-xs font-bold uppercase tracking-widest text-[#555] mb-3">
                  Timeline
                </label>
                <div className="space-y-2">
                  {TIMELINES.map((tl) => (
                    <button
                      key={tl.value}
                      onClick={() => update("timeline", tl.value)}
                      className={`w-full py-3 px-4 rounded-xl text-sm font-medium border transition-all ${
                        inputs.timeline === tl.value
                          ? "border-purple-500/60 bg-purple-500/10 text-white"
                          : "border-[#1c1c1c] bg-[#111] text-[#666] hover:border-[#2a2a2a] hover:text-[#aaa]"
                      }`}
                    >
                      {tl.label}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <label className="block text-xs font-bold uppercase tracking-widest text-[#555] mb-3">
                  Team Required
                </label>
                <div className="space-y-2">
                  {TEAM_SIZES.map((ts) => (
                    <button
                      key={ts.value}
                      onClick={() => update("teamSize", ts.value)}
                      className={`w-full py-3 px-4 rounded-xl text-sm font-medium border transition-all ${
                        inputs.teamSize === ts.value
                          ? "border-purple-500/60 bg-purple-500/10 text-white"
                          : "border-[#1c1c1c] bg-[#111] text-[#666] hover:border-[#2a2a2a] hover:text-[#aaa]"
                      }`}
                    >
                      {ts.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* OUTPUT */}
          <div>
            <AnimatePresence mode="wait">
              {!allFilled ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[400px] rounded-2xl border border-dashed border-[#1c1c1c] flex flex-col items-center justify-center text-center p-10"
                >
                  <div className="text-4xl mb-4 opacity-30">💡</div>
                  <p className="text-sm text-[#333]">
                    Select all four inputs to see your recommended price range.
                  </p>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                >
                  {/* Price Range */}
                  <div className="p-6 rounded-2xl bg-[#111] border border-[#1c1c1c]">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#444] mb-4">
                      Recommended Price Range
                    </p>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="text-xs text-[#444] mb-1">Conservative</p>
                        <p className="text-xl font-black text-[#888]">{formatCurrency(result.low)}</p>
                      </div>
                      <div className="border-x border-[#1c1c1c]">
                        <p className="text-xs text-purple-400 mb-1 font-semibold">Recommended</p>
                        <p className="text-2xl font-black text-white">{formatCurrency(result.mid)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#444] mb-1">Premium</p>
                        <p className="text-xl font-black text-[#888]">{formatCurrency(result.high)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Phase Breakdown */}
                  <div className="p-6 rounded-2xl bg-[#111] border border-[#1c1c1c]">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#444] mb-4">
                      Phase Breakdown
                    </p>
                    <div className="space-y-3">
                      {result.phases.map((phase) => (
                        <div
                          key={phase.name}
                          className="flex items-center justify-between gap-3"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white truncate">{phase.name}</p>
                            <p className="text-[10px] text-[#444] leading-tight">{phase.description}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-bold text-white">{formatCurrency(phase.mid)}</p>
                            <p className="text-[10px] text-[#333]">
                              {formatCurrency(phase.low)}–{formatCurrency(phase.high)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pitch */}
                  <div className="p-6 rounded-2xl bg-[#0d0a14] border border-purple-500/25">
                    <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3">
                      Your Suggested Pitch
                    </p>
                    <p className="text-sm text-[#aaa] leading-relaxed italic">
                      &ldquo;{result.pitch}&rdquo;
                    </p>
                  </div>

                  {/* Download */}
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full py-4 rounded-xl text-sm font-bold bg-purple-600 hover:bg-purple-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download This Estimate
                  </button>

                  <p className="text-center text-xs text-[#333] px-4">
                    Want to close this project?{" "}
                    <Link href="/#pricing" className="text-purple-500 hover:text-purple-400 underline underline-offset-2">
                      Get the proposal template
                    </Link>{" "}
                    for this exact service type.
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-[#111] border border-[#1c1c1c] text-center"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3">
            Want the full system?
          </p>
          <h2 className="text-xl sm:text-2xl font-black mb-3">
            This calculator is included in Agency OS Complete
          </h2>
          <p className="text-sm text-[#555] mb-6 max-w-lg mx-auto leading-relaxed">
            Agency OS Complete includes this pricing calculator, 25 proposal templates for every
            AI service, the complete delivery framework, 30 objection scripts, and more.
          </p>
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-bold transition-all"
          >
            See What&apos;s Inside Agency OS Complete
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* EMAIL CAPTURE MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowModal(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md bg-[#111] border border-[#222] rounded-2xl p-8"
            >
              {!submitted ? (
                <>
                  <h3 className="text-xl font-black mb-2">Download Your Estimate</h3>
                  <p className="text-sm text-[#555] mb-7">
                    Enter your email and we&apos;ll send you this estimate as a formatted PDF — ready to
                    share with your client or use in your proposal.
                  </p>
                  <form onSubmit={handleDownload} className="space-y-4">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#0a0a0a] border border-[#222] text-sm text-white placeholder-[#333] focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-bold transition-colors"
                    >
                      Send Me the Estimate
                    </button>
                  </form>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mt-4 w-full py-2 text-xs text-[#333] hover:text-[#666] transition-colors"
                  >
                    No thanks
                  </button>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="text-lg font-black mb-2">Check your inbox</h3>
                  <p className="text-sm text-[#555] mb-6">
                    Your estimate is on its way to {email}. While you wait — want the proposal
                    template to go with it?
                  </p>
                  <Link
                    href="/#pricing"
                    onClick={() => setShowModal(false)}
                    className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm font-bold transition-colors"
                  >
                    Get the Proposal Template
                  </Link>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mt-3 block w-full py-2 text-xs text-[#333] hover:text-[#666] transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
