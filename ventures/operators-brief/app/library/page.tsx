import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workflow Library — Operators Brief",
  description:
    "12 complete AI workflow blueprints across industries. Real tools, real numbers, copy-paste prompts. Pro members get full access.",
};

const workflows = [
  {
    title: "Automated Client Reporting",
    industry: "Accounting",
    timeToImplement: "11 days",
    tools: ["Zapier", "Claude API", "Google Apps Script"],
    outcome: "3× revenue per partner",
    locked: false,
  },
  {
    title: "AI Customer Support Agents",
    industry: "E-Commerce",
    timeToImplement: "3 weeks",
    tools: ["Intercom", "Claude API", "Zapier"],
    outcome: "11 support staff → 3 AI agents",
    locked: true,
  },
  {
    title: "Client Capacity Scaling",
    industry: "Consulting",
    timeToImplement: "2 weeks",
    tools: ["Make", "Claude API", "Notion"],
    outcome: "4× client capacity",
    locked: true,
  },
  {
    title: "Contract Review Automation",
    industry: "Legal",
    timeToImplement: "6 weeks",
    tools: ["Claude API", "Python", "DocuSign"],
    outcome: "2.5 hrs → 22 min per contract",
    locked: true,
  },
  {
    title: "Patient Follow-Up Recovery",
    industry: "Healthcare",
    timeToImplement: "1 week",
    tools: ["Zapier", "Claude API", "Twilio"],
    outcome: "$18K/month recovered",
    locked: true,
  },
  {
    title: "Campaign Reporting Pipeline",
    industry: "Marketing Agency",
    timeToImplement: "2 weeks",
    tools: ["Google Sheets", "Claude API", "Zapier"],
    outcome: "80% reporting automated",
    locked: true,
  },
  {
    title: "Freight Quote Automation",
    industry: "Logistics",
    timeToImplement: "3 weeks",
    tools: ["Python", "Claude API", "Airtable"],
    outcome: "4 hrs → 9 min turnaround",
    locked: true,
  },
  {
    title: "Bookkeeping Client Scaling",
    industry: "Accounting",
    timeToImplement: "10 days",
    tools: ["QuickBooks API", "Claude API", "Zapier"],
    outcome: "28 → 84 clients, same hours",
    locked: true,
  },
  {
    title: "Candidate Screening System",
    industry: "Recruiting",
    timeToImplement: "2 weeks",
    tools: ["Ashby", "Claude API", "Make"],
    outcome: "70% faster screening",
    locked: true,
  },
  {
    title: "Onboarding Automation",
    industry: "SaaS",
    timeToImplement: "4 weeks",
    tools: ["Segment", "Claude API", "Customer.io"],
    outcome: "Churn: 8.4% → 3.1%",
    locked: true,
  },
  {
    title: "AI Lease Analysis",
    industry: "Real Estate",
    timeToImplement: "3 weeks",
    tools: ["Claude API", "Python", "Airtable"],
    outcome: "$140K in bad placements avoided",
    locked: true,
  },
  {
    title: "Policy Comparison Engine",
    industry: "Insurance",
    timeToImplement: "2 weeks",
    tools: ["Claude API", "Zapier", "Google Sheets"],
    outcome: "+$28K/month in commissions",
    locked: true,
  },
];

export default function LibraryPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Nav */}
      <div className="border-b border-[#1e1e1e] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
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
            Unlock All — $15/mo
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-4">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">
            Workflow Library
          </span>
        </div>
        <h1 className="text-[32px] md:text-[44px] font-light text-[#f0ede8] leading-[1.1] tracking-tight mb-5">
          12 working AI workflows.<br />Ready to implement.
        </h1>
        <p className="text-[16px] text-[#9a9590] leading-relaxed mb-10 max-w-xl">
          Every workflow comes with the full issue breakdown, copy-paste Claude prompt, ROI spreadsheet, and implementation checklist. New workflows added every Tuesday.
        </p>

        {/* Unlock banner */}
        <div className="border border-[#c9a84c] bg-[#0d0d0d] p-5 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[14px] text-[#9a9590]">
            <span className="text-[#f0ede8] font-medium">Unlock all 12 workflows + new ones every week</span> — full breakdown, prompts, templates, Slack community.
          </p>
          <a
            href="/#signup"
            className="flex-shrink-0 bg-[#c9a84c] text-[#0a0a0a] text-[13px] font-medium py-2.5 px-6 hover:bg-[#d4b660] transition-colors whitespace-nowrap"
          >
            $15/month — Unlock All →
          </a>
        </div>

        {/* Workflow grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflows.map((wf, i) => (
            <div
              key={i}
              className={`relative border ${wf.locked ? "border-[#1e1e1e]" : "border-[#c9a84c]"} bg-[#0d0d0d] flex flex-col`}
            >
              {/* Pro badge */}
              {wf.locked && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#0a0a0a] border border-[#2a2a2a] px-2 py-1">
                  <svg width="9" height="11" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="6" width="10" height="7" rx="1" stroke="#3a3530" strokeWidth="1.2" />
                    <path d="M3.5 6V4a2.5 2.5 0 0 1 5 0v2" stroke="#3a3530" strokeWidth="1.2" />
                  </svg>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#3a3530]">Pro</span>
                </div>
              )}

              <div className={`p-5 flex-1 ${wf.locked ? "select-none" : ""}`}>
                {/* Industry */}
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#c9a84c] mb-3">
                  {wf.industry}
                </div>

                {/* Title */}
                <h2
                  className={`text-[14px] font-medium leading-snug mb-4 ${
                    wf.locked ? "blur-[3px] text-[#9a9590]" : "text-[#f0ede8]"
                  }`}
                >
                  {wf.title}
                </h2>

                {/* Outcome */}
                <div
                  className={`text-[13px] mb-4 ${
                    wf.locked ? "blur-[3px] text-[#c9a84c]" : "text-[#c9a84c]"
                  }`}
                >
                  {wf.outcome}
                </div>

                {/* Meta */}
                <div className={`space-y-2 ${wf.locked ? "blur-[3px]" : ""}`}>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#3a3530] uppercase tracking-wider">Time:</span>
                    <span className="font-mono text-[10px] text-[#5a5550]">{wf.timeToImplement}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-[10px] text-[#3a3530] uppercase tracking-wider flex-shrink-0">Tools:</span>
                    <span className="font-mono text-[10px] text-[#5a5550] leading-relaxed">
                      {wf.tools.join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div className="border-t border-[#1e1e1e] px-5 py-3">
                {wf.locked ? (
                  <a
                    href="/#signup"
                    className="font-mono text-[11px] uppercase tracking-wider text-[#3a3530] hover:text-[#c9a84c] transition-colors"
                  >
                    Unlock with Pro →
                  </a>
                ) : (
                  <Link
                    href="/issues/sample"
                    className="font-mono text-[11px] uppercase tracking-wider text-[#c9a84c] hover:text-[#d4b660] transition-colors"
                  >
                    Read free →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-[#0d0d0d] border border-[#c9a84c] p-8 text-center">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-4">
            Pro membership
          </div>
          <h3 className="text-[24px] md:text-[30px] font-light text-[#f0ede8] mb-3 leading-snug">
            Unlock all 12 workflows + new ones every week
          </h3>
          <p className="text-[14px] text-[#9a9590] mb-6 max-w-lg mx-auto leading-relaxed">
            Every workflow includes the full case study, the exact Claude prompt, an ROI spreadsheet template, and a step-by-step implementation checklist. New workflow every Tuesday.
          </p>
          <a
            href="/#signup"
            className="inline-block bg-[#c9a84c] text-[#0a0a0a] text-[14px] font-medium py-3 px-10 hover:bg-[#d4b660] transition-colors"
          >
            Join 2,847 operators — $15/month
          </a>
          <p className="text-[12px] text-[#5a5550] mt-4">Cancel any time. No friction. One click.</p>
        </div>

      </div>
    </main>
  );
}
