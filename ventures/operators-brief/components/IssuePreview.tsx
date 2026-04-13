const pastIssues = [
  {
    number: "08",
    date: "April 2026",
    title: "The solo CPA who went from 28 to 84 bookkeeping clients — same hours, 3x the revenue",
    summary:
      "A Nashville CPA built an AI bookkeeping assistant that handles transaction categorization, anomaly flagging, and draft financials. Monthly revenue jumped from $11,200 to $33,600 without adding a single staff hour. Onboarding time per new client: down from 4 hours to 40 minutes.",
    metrics: [
      { label: "Clients served", value: "3×" },
      { label: "Monthly revenue", value: "$33,600" },
      { label: "Onboarding time", value: "−83%" },
    ],
  },
  {
    number: "04",
    date: "March 2026",
    title: "How a law firm cut contract review from 2.5 hours to 22 minutes — and recaptured 1,840 billable hours",
    summary:
      "A 12-attorney Chicago firm ran a 90-day AI contract review pilot. Associates now spend 22 minutes on contracts that previously took 2.5 hours. 1,840 billable hours recovered annually. The near-miss: they almost deployed without a mandatory human sign-off clause — read why it mattered.",
    metrics: [
      { label: "Review time reduction", value: "85%" },
      { label: "Billable hours recaptured", value: "1,840" },
      { label: "Zero malpractice claims", value: "$0" },
    ],
  },
  {
    number: "02",
    date: "March 2026",
    title: "How a 7-figure DTC brand replaced 11 support staff with 3 AI agents — and kept CSAT at 4.7",
    summary:
      "A DTC e-commerce brand moved from 11 support staff to 3 AI agents plus one human escalation manager. 94% of tickets resolved without human intervention. Monthly support cost dropped from $38K to $16K. No customer-visible degradation in quality.",
    metrics: [
      { label: "Monthly savings", value: "$22K" },
      { label: "AI resolution rate", value: "94%" },
      { label: "CSAT score", value: "4.7★" },
    ],
  },
  {
    number: "11",
    date: "May 2026",
    title: "How a property manager used AI lease analysis to avoid $140K in bad tenant placements",
    summary:
      "A property management firm managing 340 units implemented AI-assisted tenant screening and lease risk analysis. In 14 months, 23 high-risk applicants were flagged and declined — placements the previous screening process would have approved. Estimated loss avoided: $140K.",
    metrics: [
      { label: "Units managed", value: "340" },
      { label: "High-risk placements avoided", value: "23" },
      { label: "Estimated loss avoided", value: "$140K" },
    ],
  },
  {
    number: "03",
    date: "March 2026",
    title: "The solo consultant who 4x'd client capacity to $136K/month — without a single hire",
    summary:
      "A solo operations consultant went from serving 4 clients at $8K/month to 17 clients at the same price point by automating the repeatable 60% of every engagement. Revenue: $32K/month to $136K/month. The automation stack cost $340/month to run.",
    metrics: [
      { label: "Client capacity", value: "4× " },
      { label: "Monthly revenue", value: "$136K" },
      { label: "Automation stack cost", value: "$340/mo" },
    ],
  },
];

export default function IssuePreview() {
  return (
    <section className="py-24 px-6 bg-[#0d0d0d] border-b border-[#1e1e1e]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">
            Past Issues
          </span>
          <h2 className="text-[36px] md:text-[44px] font-light text-[#f0ede8] mt-4">
            Every issue is a
            <br />
            working blueprint.
          </h2>
          <p className="text-[16px] text-[#9a9590] mt-4 max-w-xl">
            Specific outcomes. Exact tools. What failed before it worked. Pro subscribers get the full archive — 12 issues and counting.
          </p>
        </div>

        <div className="space-y-4">
          {pastIssues.map((issue) => (
            <div
              key={issue.number}
              className="border border-[#1e1e1e] bg-[#0a0a0a] hover:border-[#2a2a2a] transition-colors"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Issue number */}
                  <div className="flex-shrink-0">
                    <span className="font-mono text-[11px] tracking-widest text-[#c9a84c] uppercase">
                      Issue #{issue.number}
                    </span>
                    <div className="font-mono text-[11px] text-[#5a5550] mt-1">{issue.date}</div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-[17px] font-medium text-[#f0ede8] leading-snug mb-3">
                      {issue.title}
                    </h3>
                    <p className="text-[13px] text-[#5a5550] leading-relaxed mb-5">
                      {issue.summary}
                    </p>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-6">
                      {issue.metrics.map((m) => (
                        <div key={m.label}>
                          <div className="font-mono text-[18px] text-[#f0ede8] number-stat">
                            {m.value}
                          </div>
                          <div className="text-[11px] text-[#5a5550] mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lock icon for pro */}
                  <div className="flex-shrink-0 flex items-center">
                    <div className="text-[#2a2a2a] border border-[#1e1e1e] px-3 py-1.5 text-[11px] font-mono tracking-wider uppercase">
                      Pro
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More indicator */}
        <div className="mt-8 flex items-center gap-4">
          <span className="font-mono text-[12px] text-[#5a5550]">
            + 7 more issues in the archive. New issue every Tuesday.
          </span>
          <a
            href="#pricing"
            className="text-[13px] text-[#c9a84c] hover:text-[#d4b660] transition-colors"
          >
            Get full access — $15/month →
          </a>
        </div>
      </div>
    </section>
  );
}
