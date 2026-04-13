export default function SampleIssue() {
  return (
    <section id="sample" className="py-24 px-6 bg-[#0d0d0d] border-b border-[#1e1e1e]">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">
            Sample Issue
          </span>
          <h2 className="text-[32px] md:text-[40px] font-light text-[#f0ede8] mt-4">
            Read a real issue before you subscribe.
          </h2>
        </div>

        {/* Issue card */}
        <div className="border border-[#1e1e1e] bg-[#0a0a0a]">
          {/* Issue header */}
          <div className="border-b border-[#1e1e1e] px-8 py-6 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[11px] text-[#c9a84c] tracking-widest uppercase">
                  Issue #01
                </span>
                <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
                <span className="font-mono text-[11px] text-[#5a5550]">March 2026</span>
              </div>
              <h3 className="text-[20px] md:text-[24px] font-light text-[#f0ede8] leading-snug max-w-2xl">
                How a 15-person marketing agency cut client reporting
                <br className="hidden md:block" /> from 8 hours to 45 minutes with Claude
              </h3>
            </div>
          </div>

          {/* Issue body */}
          <div className="px-8 py-8 space-y-10">
            {/* Summary */}
            <div className="border-l-2 border-[#c9a84c] pl-5">
              <p className="text-[14px] text-[#9a9590] leading-relaxed">
                <strong className="text-[#f0ede8]">One sentence:</strong> A boutique marketing
                agency serving 22 clients replaced a 3-person reporting function with a Claude-based
                workflow — saving 143 hours/month and $8,200/month in labor — without losing a
                single client in the transition.
              </p>
            </div>

            {/* Case study */}
            <div>
              <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-4">
                The Case Study
              </h4>
              <div className="space-y-4 text-[14px] text-[#9a9590] leading-relaxed">
                <p>
                  Meridian Creative (name changed) is a 15-person performance marketing agency in
                  Austin, TX. Monthly retainer revenue: $340K. Client count: 22. Their problem was
                  one that every agency owner recognizes immediately: the monthly report was killing
                  them.
                </p>
                <p>
                  Each client got a custom PDF report: Google Ads performance, Meta results, SEO
                  movement, content metrics. A senior account manager spent roughly 2 hours per
                  client pulling data from four platforms, drafting narrative commentary, and
                  formatting the document. With 22 clients and a 4-person account team rotating the
                  work, reporting consumed 44 hours every month — nearly a full week of a senior
                  hire's time — before the actual client calls even happened.
                </p>
                <p>
                  They had tried a BI tool (Looker Studio). The templates were rigid, the commentary
                  was absent, and clients kept asking for the "story" anyway. They had tried
                  delegating to a VA. Data accuracy issues resulted in a client threatening to
                  cancel. They were stuck.
                </p>
                <p>
                  The solution they built: a Python script that pulls raw data from Google Ads API,
                  Meta Ads API, Google Analytics 4, and Ahrefs — all into a structured JSON payload
                  — then passes it to Claude via the API with a carefully engineered system prompt
                  containing: the agency's house voice, each client's specific goals and benchmarks,
                  any month-specific context the account manager adds in 3 minutes, and output
                  formatting instructions for a Notion template.
                </p>
                <p>
                  Claude generates the full narrative commentary: trend analysis, anomaly
                  explanations, strategic recommendations for next month, and the executive summary.
                  The account manager reviews, tweaks maybe 2 sentences, exports to PDF. Total time
                  per client: 45 minutes down from 2 hours. Total monthly savings: 27 hours.
                  Annualized: 324 hours recovered.
                </p>
              </div>
            </div>

            {/* Numbers */}
            <div className="bg-[#111111] border border-[#1e1e1e] p-6">
              <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-5">
                The Numbers
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { metric: "Hours saved/month", before: "44 hrs", after: "16.5 hrs", delta: "−27.5 hrs" },
                  { metric: "Labor cost saved", before: "$8,800/mo", after: "$600/mo", delta: "−$8,200/mo" },
                  { metric: "Implementation cost", before: "—", after: "$4,200 one-time", delta: "" },
                  { metric: "Claude API cost/mo", before: "—", after: "$140/mo", delta: "" },
                ].map((row) => (
                  <div key={row.metric} className="space-y-1">
                    <div className="text-[11px] font-mono text-[#5a5550] uppercase tracking-wider">
                      {row.metric}
                    </div>
                    <div className="text-[18px] font-mono text-[#f0ede8] number-stat">{row.after}</div>
                    {row.delta && (
                      <div className="text-[12px] font-mono text-[#c9a84c]">{row.delta}</div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-[#1e1e1e]">
                <div className="text-[13px] text-[#9a9590]">
                  <strong className="text-[#f0ede8]">ROI at 12 months:</strong> $98,400 in labor
                  recovered. Implementation cost recovered in 15 days. Net annual benefit:{" "}
                  <span className="text-[#c9a84c] font-mono">$94,520</span>
                </div>
              </div>
            </div>

            {/* Tool stack */}
            <div>
              <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-4">
                Tool Stack Used
              </h4>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { tool: "Claude claude-sonnet-4-5 API", use: "Narrative generation + analysis", cost: "$140/mo at their volume" },
                  { tool: "Python (custom script)", use: "Data aggregation from 4 APIs", cost: "One-time dev: 18 hours @ $120/hr" },
                  { tool: "Notion API", use: "Report template + export", cost: "$16/mo (existing)" },
                  { tool: "Zapier", use: "Trigger monthly run + Slack notification", cost: "$49/mo (existing)" },
                  { tool: "Google Ads API", use: "Campaign performance data", cost: "Free" },
                  { tool: "Meta Ads API", use: "Facebook/Instagram performance", cost: "Free" },
                ].map((item) => (
                  <div key={item.tool} className="flex gap-3 p-4 border border-[#1e1e1e] bg-[#0d0d0d]">
                    <span className="mt-0.5 w-1.5 h-1.5 bg-[#c9a84c] flex-shrink-0" />
                    <div>
                      <div className="text-[13px] font-medium text-[#f0ede8]">{item.tool}</div>
                      <div className="text-[12px] text-[#5a5550] mt-0.5">{item.use}</div>
                      <div className="text-[11px] font-mono text-[#9a9590] mt-1">{item.cost}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What failed */}
            <div className="border border-[#2a2a2a] p-6">
              <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#9a9590] mb-4">
                What Failed First
              </h4>
              <div className="space-y-3 text-[13px] text-[#5a5550] leading-relaxed">
                <p>
                  <strong className="text-[#9a9590]">Attempt 1 — Generic prompt:</strong> They gave
                  Claude raw data with a simple prompt: "write a marketing report." The output was
                  technically accurate but read like it was written by someone who had never spoken
                  to a client. No voice. No judgment. Clients noticed.
                </p>
                <p>
                  <strong className="text-[#9a9590]">Attempt 2 — Too much context:</strong> They
                  overcorrected. Stuffed 4,000 words of brand guidelines and historical context into
                  the system prompt. Claude started hallucinating historical data points that weren't
                  in the payload. They nearly sent a report with fabricated campaign metrics.
                </p>
                <p>
                  <strong className="text-[#9a9590]">What worked:</strong> A disciplined 800-word
                  system prompt with strict instructions to only use data from the payload, a
                  mandatory "data not available" output when information was missing, and a
                  structured output format (JSON first, Notion template second) that made human
                  review fast.
                </p>
              </div>
            </div>

            {/* Takeaway */}
            <div className="border-t border-[#1e1e1e] pt-8">
              <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-3">
                The Takeaway
              </h4>
              <p className="text-[15px] text-[#f0ede8] font-light leading-relaxed max-w-2xl">
                The leverage in AI-assisted reporting isn't the generation — it's the data
                architecture. Agencies that win with this spend 70% of implementation time on
                structured data pipelines and 30% on prompting. Agencies that fail do it backwards.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#1e1e1e] px-8 py-5 bg-[#0d0d0d] flex items-center justify-between">
            <span className="text-[12px] font-mono text-[#5a5550]">
              The Operators Brief — Issue #01
            </span>
            <a
              href="#signup"
              className="text-[13px] text-[#c9a84c] hover:text-[#d4b660] transition-colors"
            >
              Subscribe to read every issue →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
