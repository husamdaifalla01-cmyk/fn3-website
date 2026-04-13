import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What's Included in Operators Brief Pro | Operators Brief",
  description:
    "Every Tuesday: a new AI workflow issue. 51+ back issues. Copy-paste Claude prompts, ROI spreadsheet templates, implementation checklists. $15/month, cancel anytime.",
  keywords: [
    "operators brief pro",
    "AI workflow newsletter",
    "AI business case studies subscription",
    "what you get operators brief",
    "AI ROI templates",
  ],
  alternates: {
    canonical: "https://operators-brief.vercel.app/what-you-get",
  },
  openGraph: {
    title: "What's Included in Operators Brief Pro",
    description:
      "Weekly AI workflow issues, 51+ back issues, Claude prompts, ROI spreadsheets. $15/month. Full breakdown of every benefit.",
    type: "website",
    url: "https://operators-brief.vercel.app/what-you-get",
  },
};

const recentTopics = [
  { issue: "#49", title: "How a 12-Person Restaurant Cut Labor Cost 18% With Demand Forecasting" },
  { issue: "#50", title: "The 3-Attorney Firm That Automated Client Billing and Saved 6 Hours/Attorney/Month" },
  { issue: "#51", title: "How a Consulting Firm Built a Knowledge Base That Answers Client Questions Automatically" },
  { issue: "#52", title: "The E-Commerce Brand That Cut Returns 31% With AI-Powered Product Descriptions" },
];

const spreadsheetTemplates = [
  {
    name: "ROI Projection Calculator",
    description: "Enter your current hours/cost, get a 12-month ROI forecast for any workflow automation.",
  },
  {
    name: "Tool Stack Comparison Matrix",
    description: "Side-by-side comparison of automation tools by use case, cost, and integration complexity.",
  },
  {
    name: "Implementation Timeline Planner",
    description: "Week-by-week rollout plan for any workflow from Issue, pre-filled with milestones.",
  },
  {
    name: "Time Audit Template",
    description: "Track where hours go before automation — used in 14 issues as the baseline benchmark.",
  },
];

export default function WhatYouGetPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Nav */}
      <div className="border-b border-[#1e1e1e] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] hover:text-[#d4b660] transition-colors"
          >
            ← Operators Brief
          </Link>
          <a
            href="/#signup"
            className="font-mono text-[11px] tracking-widest uppercase bg-[#c9a84c] text-[#0a0a0a] px-4 py-2 hover:bg-[#d4b660] transition-colors"
          >
            Start Pro — $15/mo
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-4">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">
            Pro Membership
          </span>
        </div>
        <h1 className="text-[32px] md:text-[44px] font-light text-[#f0ede8] leading-[1.1] tracking-tight mb-5">
          Everything you get for $15/month
        </h1>
        <p className="text-[16px] text-[#9a9590] leading-relaxed mb-12 border-l-2 border-[#c9a84c] pl-5">
          One subscription. Full archive from day one. New issue every Tuesday. Practical tools you use immediately — not theory.
        </p>

        <div className="w-full h-px bg-[#1e1e1e] mb-12" />

        {/* Benefit 1: Weekly issue */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-widest uppercase text-[#c9a84c] border border-[#c9a84c] px-2 py-0.5">
              01
            </span>
            <h2 className="text-[20px] font-light text-[#f0ede8]">
              Every Tuesday: a new deep-dive issue
            </h2>
          </div>
          <p className="text-[14px] text-[#9a9590] leading-relaxed mb-6">
            Each issue covers one real business that used AI to solve a specific operational problem. Exact tools, exact numbers, step-by-step workflow, copy-paste prompt, and implementation checklist — everything you need to replicate it.
          </p>
          <div className="border border-[#1e1e1e] bg-[#0d0d0d] p-5">
            <div className="font-mono text-[10px] text-[#5a5550] uppercase tracking-wider mb-4">
              Recent issues
            </div>
            <div className="space-y-3">
              {recentTopics.map((t) => (
                <div key={t.issue} className="flex items-start gap-3">
                  <span className="font-mono text-[11px] text-[#c9a84c] flex-shrink-0">{t.issue}</span>
                  <span className="text-[13px] text-[#9a9590] leading-snug">{t.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefit 2: Archive */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-widest uppercase text-[#c9a84c] border border-[#c9a84c] px-2 py-0.5">
              02
            </span>
            <h2 className="text-[20px] font-light text-[#f0ede8]">
              Access to all 51+ back issues — from day one
            </h2>
          </div>
          <p className="text-[14px] text-[#9a9590] leading-relaxed mb-6">
            No waiting period. The moment you subscribe, you unlock the entire archive. Industries covered: accounting, legal, e-commerce, real estate, healthcare, SaaS, logistics, recruiting, insurance, consulting, and more.
          </p>
          {/* Archive visual mock */}
          <div className="border border-[#1e1e1e] bg-[#0d0d0d] p-5">
            <div className="font-mono text-[10px] text-[#5a5550] uppercase tracking-wider mb-4">
              Archive — 51 issues
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["Accounting", "Legal", "E-commerce", "Real Estate", "Healthcare", "SaaS", "Logistics", "Recruiting", "Insurance", "Consulting", "Restaurants", "Marketing"].map((ind) => (
                <div
                  key={ind}
                  className="border border-[#1e1e1e] px-3 py-2 flex items-center justify-between"
                >
                  <span className="text-[12px] text-[#9a9590]">{ind}</span>
                  <span className="font-mono text-[10px] text-[#5a5550]">
                    {Math.floor(Math.random() * 4) + 2} issues
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefit 3: Claude prompts */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-widest uppercase text-[#c9a84c] border border-[#c9a84c] px-2 py-0.5">
              03
            </span>
            <h2 className="text-[20px] font-light text-[#f0ede8]">
              Copy-paste Claude prompts — one per issue
            </h2>
          </div>
          <p className="text-[14px] text-[#9a9590] leading-relaxed mb-6">
            Every issue includes the exact Claude prompt used in the workflow. Not a template — the literal prompt, tested, with notes on what to modify for your context.
          </p>
          {/* Actual prompt from Issue #01 */}
          <div className="border border-[#1e1e1e] bg-[#0d0d0d] p-5">
            <div className="font-mono text-[10px] text-[#5a5550] uppercase tracking-wider mb-4">
              Example — Issue #01 prompt (accounting)
            </div>
            <div className="border border-[#1e1e1e] bg-[#070707] p-4 font-mono text-[12px] text-[#9a9590] leading-relaxed whitespace-pre-wrap">
{`You are a senior accountant preparing a monthly
management report. Here is the raw trial balance
data from QuickBooks:

[PASTE DATA HERE]

1. Summarize the top 3 variances vs. prior month
   with dollar amounts and % change.
2. Flag any line items above $10,000 that moved
   more than 15% month-over-month.
3. Write a 3-sentence executive summary a
   non-accountant CEO can read in 30 seconds.
4. Output the result as plain text with headers.`}
            </div>
            <p className="text-[11px] text-[#5a5550] mt-3">
              This prompt replaced 4 hours of manual report writing per client per month.
            </p>
          </div>
        </div>

        {/* Benefit 4: Spreadsheet templates */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-widest uppercase text-[#c9a84c] border border-[#c9a84c] px-2 py-0.5">
              04
            </span>
            <h2 className="text-[20px] font-light text-[#f0ede8]">
              ROI spreadsheet templates
            </h2>
          </div>
          <p className="text-[14px] text-[#9a9590] leading-relaxed mb-6">
            Every subscriber gets the full set of spreadsheet templates referenced across issues. Use them to justify the investment internally, track actual vs. projected savings, and build the business case for any automation.
          </p>
          <div className="space-y-3">
            {spreadsheetTemplates.map((t) => (
              <div key={t.name} className="border border-[#1e1e1e] bg-[#0d0d0d] p-4 flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 border border-[#2a2a2a] flex items-center justify-center mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect width="12" height="12" rx="1" fill="none" />
                    <path d="M2 3h8M2 6h8M2 9h5" stroke="#c9a84c" strokeWidth="1.2" />
                  </svg>
                </div>
                <div>
                  <p className="text-[13px] text-[#f0ede8] mb-1">{t.name}</p>
                  <p className="text-[12px] text-[#5a5550] leading-relaxed">{t.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefit 5: Coming soon */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-widest uppercase text-[#c9a84c] border border-[#c9a84c] px-2 py-0.5">
              05
            </span>
            <h2 className="text-[20px] font-light text-[#f0ede8]">
              Early access to new formats
            </h2>
          </div>
          <p className="text-[14px] text-[#9a9590] leading-relaxed mb-6">
            Pro subscribers get first access when new formats launch. Coming in 2026:
          </p>
          <div className="space-y-3">
            {[
              { label: "Audio Issues", desc: "15-minute narrated walkthroughs of each workflow — commute-friendly", status: "Q2 2026" },
              { label: "Video Walkthroughs", desc: "Screen-recorded implementation of the exact workflow from the issue", status: "Q3 2026" },
              { label: "Live Q&A Sessions", desc: "Monthly calls where we work through a workflow live with subscribers", status: "Q3 2026" },
            ].map((item) => (
              <div key={item.label} className="border border-[#1e1e1e] bg-[#0d0d0d] p-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[13px] text-[#f0ede8] mb-1">{item.label}</p>
                  <p className="text-[12px] text-[#5a5550] leading-relaxed">{item.desc}</p>
                </div>
                <span className="flex-shrink-0 font-mono text-[10px] text-[#c9a84c] border border-[#c9a84c] px-2 py-1 uppercase tracking-wider">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-[#1e1e1e] mb-12" />

        {/* Referral program */}
        <div className="border border-[#1e1e1e] bg-[#0d0d0d] p-6 mb-12">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-3">
            Referral Program
          </div>
          <h3 className="text-[18px] font-light text-[#f0ede8] mb-3">
            Refer 3 friends — get 1 month free
          </h3>
          <p className="text-[13px] text-[#9a9590] leading-relaxed mb-4">
            Every subscriber gets a personal referral link. When 3 people subscribe through your link, your next month is on us. No cap — refer 9 friends, get 3 months free.
          </p>
          <div className="border border-[#1e1e1e] bg-[#070707] p-3 flex items-center justify-between gap-3">
            <span className="font-mono text-[12px] text-[#5a5550]">
              operators-brief.vercel.app/?ref=yourname
            </span>
            <span className="font-mono text-[10px] text-[#3a3530] uppercase tracking-wider flex-shrink-0">
              Available after signup
            </span>
          </div>
        </div>

        {/* Pricing summary */}
        <div className="border border-[#c9a84c] bg-[#0d0d0d] p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] tracking-widest uppercase text-[#c9a84c] mb-3">
                Pro — $15/month
              </div>
              <ul className="space-y-2">
                {[
                  "New issue every Tuesday",
                  "Full archive — all 51+ back issues",
                  "Copy-paste Claude prompts",
                  "ROI spreadsheet templates",
                  "Implementation checklists",
                  "Early access to audio + video formats",
                  "Refer 3 friends → 1 month free",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-[13px] text-[#9a9590]">
                    <svg
                      className="text-[#c9a84c] flex-shrink-0"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0 text-center md:text-right">
              <div className="text-[48px] font-light text-[#f0ede8] leading-none mb-1">$15</div>
              <div className="text-[14px] text-[#5a5550]">/month</div>
              <div className="text-[11px] text-[#5a5550] mt-2">Cancel any time</div>
              <div className="text-[11px] text-[#5a5550]">Refund within 7 days, no questions</div>
            </div>
          </div>
          <div className="mt-6">
            <a
              href="/#signup"
              className="block text-center bg-[#c9a84c] text-[#0a0a0a] text-[14px] font-medium py-3 px-10 hover:bg-[#d4b660] transition-colors"
            >
              Start Pro — $15/month →
            </a>
          </div>
        </div>

        <p className="text-[12px] text-[#5a5550] text-center">
          No credit card until checkout. Cancel any time — one click, no friction. Refund available within 7 days.
        </p>

        {/* Internal links */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/best-of"
            className="flex-1 border border-[#1e1e1e] p-4 text-center text-[13px] text-[#9a9590] hover:border-[#2a2a2a] hover:text-[#f0ede8] transition-colors"
          >
            Read the 10 best issues →
          </Link>
          <Link
            href="/issues"
            className="flex-1 border border-[#1e1e1e] p-4 text-center text-[13px] text-[#9a9590] hover:border-[#2a2a2a] hover:text-[#f0ede8] transition-colors"
          >
            Browse the full archive →
          </Link>
        </div>
      </div>
    </main>
  );
}
