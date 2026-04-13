import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to Operators Brief — Your first issue is on its way",
  description:
    "You're in. Here's exactly what's coming to your inbox over the next week — and what to read right now.",
};

export default function WelcomePage() {
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
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-4">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">
            You&apos;re in
          </span>
        </div>

        <h1 className="text-[32px] md:text-[44px] font-light leading-[1.1] tracking-tight text-[#f0ede8] mb-5">
          Welcome to Operators Brief
        </h1>

        <p className="text-[18px] text-[#9a9590] leading-relaxed mb-12 border-l-2 border-[#c9a84c] pl-5">
          Check your inbox — Issue #01 is already on its way. Here&apos;s what&apos;s coming over the next week.
        </p>

        <div className="w-full h-px bg-[#1e1e1e] mb-12" />

        {/* Drip sequence */}
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550] mb-6">
          Here&apos;s what&apos;s coming to your inbox:
        </div>

        <div className="space-y-4 mb-14">
          {[
            {
              day: "Today",
              issue: "Issue #01",
              title: "How One CPA Firm 3x'd Revenue Per Partner Without Hiring",
              bonus: "Bonus: ROI spreadsheet template pre-built for the workflow",
              highlight: true,
            },
            {
              day: "Day 3",
              issue: "Issue #05",
              title: "The E-Commerce Brand That Saved $340K/Year by Rethinking Their 3PL Workflow",
              bonus: "Bonus: Tool comparison matrix — 7 3PL automation tools head-to-head",
              highlight: false,
            },
            {
              day: "Day 7",
              issue: "Issue #11",
              title: "How a Property Manager Used AI Lease Analysis to Avoid $140K in Bad Tenant Placements",
              bonus: "Bonus: Tenant screening checklist with AI-assisted red flag detection",
              highlight: false,
            },
            {
              day: "Every Tuesday",
              issue: "New issue",
              title: "One working AI workflow — tools, numbers, implementation checklist, copy-paste prompt",
              bonus: null,
              highlight: false,
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`border ${item.highlight ? "border-[#c9a84c]" : "border-[#1e1e1e]"} bg-[#0d0d0d]`}
            >
              <div className="border-b border-[#1e1e1e] px-5 py-3 flex items-center justify-between">
                <span className={`font-mono text-[11px] uppercase tracking-wider ${item.highlight ? "text-[#c9a84c]" : "text-[#5a5550]"}`}>
                  {item.day}
                </span>
                <span className="font-mono text-[11px] text-[#3a3530] uppercase tracking-wider">
                  {item.issue}
                </span>
              </div>
              <div className="px-5 py-4">
                <p className={`text-[14px] leading-snug mb-2 ${item.highlight ? "text-[#f0ede8] font-medium" : "text-[#9a9590]"}`}>
                  {item.title}
                </p>
                {item.bonus && (
                  <div className="flex items-start gap-2 mt-3">
                    <span className="text-[#c9a84c] text-[11px] flex-shrink-0 mt-0.5">+</span>
                    <span className="text-[12px] text-[#5a5550] font-mono leading-relaxed">{item.bonus}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-[#1e1e1e] mb-12" />

        {/* Referral program */}
        <div className="border border-[#c9a84c] bg-[#0d0d0d] p-6 mb-8">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-3">
            Referral Program
          </div>
          <h3 className="text-[18px] font-light text-[#f0ede8] mb-3">
            Refer 3 friends → get 1 month free
          </h3>
          <p className="text-[13px] text-[#9a9590] leading-relaxed mb-4">
            Share your referral link. When 3 people subscribe through it, your next month is free. No cap — refer 9, get 3 months free.
          </p>
          <div className="border border-[#1e1e1e] bg-[#070707] p-3 flex items-center justify-between gap-3">
            <span className="font-mono text-[12px] text-[#5a5550]">
              operators-brief.vercel.app/?ref=yourname
            </span>
            <span className="font-mono text-[10px] text-[#3a3530] uppercase tracking-wider flex-shrink-0">
              Your link is in your welcome email
            </span>
          </div>
        </div>

        {/* Archive link */}
        <div className="bg-[#0d0d0d] border border-[#1e1e1e] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-[14px] text-[#f0ede8] font-medium mb-1">In the meantime, explore the archive</p>
            <p className="text-[13px] text-[#5a5550]">51+ issues. Every workflow documented start to finish.</p>
          </div>
          <Link
            href="/issues"
            className="flex-shrink-0 font-mono text-[11px] uppercase tracking-wider text-[#c9a84c] hover:text-[#d4b660] transition-colors whitespace-nowrap"
          >
            Read the archive →
          </Link>
        </div>

      </div>
    </main>
  );
}
