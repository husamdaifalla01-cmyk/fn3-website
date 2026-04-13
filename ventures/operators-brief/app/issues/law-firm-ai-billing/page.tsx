import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How a 3-Attorney Firm Automated Client Billing With AI | Operators Brief",
  description:
    "A 3-attorney law firm uses AI to automate time tracking, matter summaries, invoice drafts, and QuickBooks export — saving 6 hours per attorney per month. Exact prompt included.",
  keywords: [
    "law firm AI billing automation",
    "attorney time tracking AI",
    "legal billing software AI",
    "QuickBooks law firm automation",
    "AI invoice generation law firm",
    "legal AI workflow",
  ],
  alternates: {
    canonical: "https://operators-brief.vercel.app/issues/law-firm-ai-billing",
  },
  openGraph: {
    title: "How a 3-Attorney Firm Automated Client Billing With AI | Operators Brief",
    description:
      "Time tracking → AI matter summary → invoice draft → QuickBooks export. 6 hours saved per attorney per month. Full workflow breakdown, copy-paste prompt included.",
    type: "article",
    url: "https://operators-brief.vercel.app/issues/law-firm-ai-billing",
  },
  twitter: {
    card: "summary_large_image",
    title: "3-Attorney Firm Automated Client Billing — Saves 18 Hours/Month",
    description:
      "AI billing workflow: time tracking → matter summary → invoice → QuickBooks. 6 hours saved per attorney. Free deep-dive from Operators Brief.",
  },
};

export default function LawFirmAIBillingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Nav bar */}
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
            Get All 51+ Issues — $15/mo
          </a>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Issue meta */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">
            Deep Dive
          </span>
          <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
          <span className="font-mono text-[11px] text-[#5a5550]">Legal / Billing</span>
          <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
          <span className="font-mono text-[11px] text-[#5a5550]">March 2026</span>
          <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
          <span className="font-mono text-[11px] text-[#5a5550]">9-min read</span>
        </div>

        {/* Title */}
        <h1 className="text-[32px] md:text-[44px] font-light leading-[1.1] tracking-tight text-[#f0ede8] mb-5">
          How a 3-Attorney Firm Automated Client Billing With AI
        </h1>

        <p className="text-[18px] text-[#9a9590] leading-relaxed mb-12 border-l-2 border-[#c9a84c] pl-5">
          A small litigation firm was losing 18 hours a month to billing admin — time tracking, matter summaries, invoice drafts, QuickBooks entry. Here's the exact 4-step workflow they built to eliminate it.
        </p>

        <div className="w-full h-px bg-[#1e1e1e] mb-12" />

        {/* The Numbers */}
        <div className="mb-14">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-6">
            The Numbers
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Hours saved/month", value: "18 hrs", sub: "6 per attorney" },
              { label: "Time to implement", value: "2 weeks", sub: "no dev help" },
              { label: "Monthly tool cost", value: "$67", sub: "vs. $3,800+ saved" },
            ].map((stat) => (
              <div key={stat.label} className="border border-[#1e1e1e] bg-[#0d0d0d] p-5">
                <div className="text-[28px] font-light text-[#c9a84c] leading-none mb-1">
                  {stat.value}
                </div>
                <div className="text-[11px] text-[#9a9590] mb-1">{stat.label}</div>
                <div className="font-mono text-[10px] text-[#5a5550]">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* The Problem */}
        <div className="mb-14">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-5">
            The Problem
          </div>
          <h2 className="text-[22px] font-light text-[#f0ede8] mb-4">
            Billing admin was eating attorney time
          </h2>
          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            The firm had three attorneys and one paralegal. Every attorney tracked time in a spreadsheet, then spent 90 minutes at the end of each month writing matter summaries from memory, drafting invoices in Word, and manually entering line items into QuickBooks. For three attorneys, that's 4.5 hours per billing cycle per attorney — roughly 18 hours total, every single month.
          </p>
          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            The paralegal spent another 6 hours reconciling entries and chasing attorneys for missing descriptions. Total monthly billing overhead: ~24 hours. At a blended billing rate of $350/hour, that's $8,400 of attorney time going to admin every month.
          </p>
          <p className="text-[15px] text-[#9a9590] leading-relaxed">
            The managing partner's goal: cut that to under 2 hours per attorney, without sacrificing billing accuracy or detail.
          </p>
        </div>

        {/* The Workflow */}
        <div className="mb-14">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-5">
            The Workflow — 4 Steps
          </div>
          <h2 className="text-[22px] font-light text-[#f0ede8] mb-8">
            Time tracking → AI matter summary → invoice draft → QuickBooks export
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="border border-[#1e1e1e] bg-[#0d0d0d]">
              <div className="border-b border-[#1e1e1e] px-5 py-3 flex items-center gap-3">
                <span className="font-mono text-[11px] text-[#c9a84c]">Step 01</span>
                <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
                <span className="text-[13px] text-[#f0ede8]">Time capture — Toggl Track</span>
              </div>
              <div className="p-5">
                <p className="text-[14px] text-[#9a9590] leading-relaxed mb-3">
                  Attorneys use Toggl Track (free tier works). Each time entry gets a client tag and a brief label — "deposition prep," "contract review," "client call." Takes 10 seconds per entry. No summaries written yet.
                </p>
                <div className="font-mono text-[11px] text-[#5a5550]">
                  Tool: Toggl Track — Free / $10/seat. Alternative: Harvest, Clockify.
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="border border-[#1e1e1e] bg-[#0d0d0d]">
              <div className="border-b border-[#1e1e1e] px-5 py-3 flex items-center gap-3">
                <span className="font-mono text-[11px] text-[#c9a84c]">Step 02</span>
                <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
                <span className="text-[13px] text-[#f0ede8]">AI matter summary — Claude via Zapier</span>
              </div>
              <div className="p-5">
                <p className="text-[14px] text-[#9a9590] leading-relaxed mb-3">
                  At month end, a Zapier automation pulls all Toggl entries for each client and sends them to Claude via the Anthropic API. Claude groups entries by matter, writes professional billing descriptions, and returns a formatted matter summary with time subtotals.
                </p>
                <p className="text-[14px] text-[#9a9590] leading-relaxed">
                  The attorney reviews the output — usually takes 5–10 minutes per client instead of 60–90.
                </p>
                <div className="font-mono text-[11px] text-[#5a5550] mt-3">
                  Tools: Zapier ($20/mo) + Anthropic API (~$8/mo at this volume)
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="border border-[#1e1e1e] bg-[#0d0d0d]">
              <div className="border-b border-[#1e1e1e] px-5 py-3 flex items-center gap-3">
                <span className="font-mono text-[11px] text-[#c9a84c]">Step 03</span>
                <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
                <span className="text-[13px] text-[#f0ede8]">Invoice draft — auto-populated in Google Docs</span>
              </div>
              <div className="p-5">
                <p className="text-[14px] text-[#9a9590] leading-relaxed mb-3">
                  The Zapier workflow takes the Claude output and populates a Google Docs invoice template — client name, matter descriptions, hours, rates, totals. The attorney opens it, makes any edits, and approves.
                </p>
                <div className="font-mono text-[11px] text-[#5a5550]">
                  Tool: Google Docs template + Zapier. Alternative: PandaDoc.
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="border border-[#1e1e1e] bg-[#0d0d0d]">
              <div className="border-b border-[#1e1e1e] px-5 py-3 flex items-center gap-3">
                <span className="font-mono text-[11px] text-[#c9a84c]">Step 04</span>
                <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
                <span className="text-[13px] text-[#f0ede8]">QuickBooks export — auto-synced</span>
              </div>
              <div className="p-5">
                <p className="text-[14px] text-[#9a9590] leading-relaxed mb-3">
                  Once approved, a second Zapier step creates the invoice in QuickBooks Online automatically — client, line items, amounts, due date. The paralegal's only job is to send the final invoice to the client.
                </p>
                <div className="font-mono text-[11px] text-[#5a5550]">
                  Tool: QuickBooks Online ($30/mo). Zapier has a native QuickBooks integration.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full tool stack */}
        <div className="mb-14">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-5">
            Full Tool Stack
          </div>
          <div className="border border-[#1e1e1e] bg-[#0d0d0d] divide-y divide-[#1e1e1e]">
            {[
              { tool: "Toggl Track", role: "Time capture", cost: "Free" },
              { tool: "Zapier", role: "Automation backbone", cost: "$20/mo" },
              { tool: "Anthropic API (Claude)", role: "Matter summary generation", cost: "~$8/mo" },
              { tool: "Google Docs", role: "Invoice template", cost: "Free" },
              { tool: "QuickBooks Online", role: "Accounting / invoicing", cost: "$30/mo" },
            ].map((row) => (
              <div key={row.tool} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <span className="text-[13px] text-[#f0ede8]">{row.tool}</span>
                  <span className="text-[12px] text-[#5a5550] ml-3">{row.role}</span>
                </div>
                <span className="font-mono text-[12px] text-[#9a9590]">{row.cost}</span>
              </div>
            ))}
            <div className="px-5 py-3 flex items-center justify-between bg-[#070707]">
              <span className="font-mono text-[11px] text-[#c9a84c] uppercase tracking-wider">Total monthly cost</span>
              <span className="font-mono text-[13px] text-[#c9a84c]">~$58/mo</span>
            </div>
          </div>
        </div>

        {/* The Prompt */}
        <div className="mb-14">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-5">
            The Exact Prompt
          </div>
          <p className="text-[14px] text-[#9a9590] leading-relaxed mb-5">
            This prompt runs once per client per month, fed the raw Toggl export for that client:
          </p>
          <div className="border border-[#c9a84c] bg-[#070707] p-5">
            <div className="font-mono text-[11px] text-[#5a5550] uppercase tracking-wider mb-4">
              Claude prompt — law firm billing
            </div>
            <pre className="font-mono text-[12px] text-[#9a9590] leading-relaxed whitespace-pre-wrap">
{`You are a legal billing specialist at a litigation firm.
Below is a raw time log export for client [CLIENT NAME]
for the month of [MONTH].

TIME LOG:
[PASTE TOGGL EXPORT HERE]

Your task:
1. Group entries by matter or project.
2. For each group, write a professional billing description
   (2–3 sentences) suitable for a client invoice — specific,
   not generic. Use the time entry labels as context.
3. Show the total hours and dollar amount per group
   at the billing rate of $[RATE]/hour.
4. Provide a grand total hours and grand total amount.
5. Format the output as clean plain text with clear headers.

Do not invent activities. Only describe what the time log
entries indicate. If an entry is ambiguous, write
"[Attorney note needed]" next to it.`}
            </pre>
          </div>
          <p className="text-[12px] text-[#5a5550] mt-3 font-mono">
            Replace [CLIENT NAME], [MONTH], and [RATE] via Zapier before sending to the API.
          </p>
        </div>

        {/* Results */}
        <div className="mb-14">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-5">
            Results — 90 Days In
          </div>
          <div className="space-y-4">
            {[
              { metric: "Billing time per attorney", before: "~6 hrs/month", after: "~45 min/month", delta: "−87%" },
              { metric: "Paralegal reconciliation time", before: "6 hrs/month", after: "1 hr/month", delta: "−83%" },
              { metric: "Invoice accuracy (disputed items)", before: "~3 disputes/mo", after: "0 disputes", delta: "−100%" },
              { metric: "Days to invoice after month close", before: "8–12 days", after: "1–2 days", delta: "−85%" },
            ].map((row) => (
              <div key={row.metric} className="border border-[#1e1e1e] bg-[#0d0d0d] p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1">
                  <p className="text-[13px] text-[#f0ede8] mb-2">{row.metric}</p>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-[#5a5550]">{row.before}</span>
                    <span className="text-[#3a3530]">→</span>
                    <span className="font-mono text-[11px] text-[#9a9590]">{row.after}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="font-mono text-[14px] text-[#c9a84c]">{row.delta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-[#1e1e1e] mb-12" />

        {/* Locked CTA */}
        <div className="border border-[#c9a84c] bg-[#0d0d0d] p-8 text-center mb-12">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-4">
            Unlock the full archive
          </div>
          <h3 className="text-[22px] font-light text-[#f0ede8] mb-3">
            51+ issues like this one — $15/month
          </h3>
          <p className="text-[14px] text-[#9a9590] mb-6 max-w-md mx-auto leading-relaxed">
            Full access from day one. Every issue: exact workflow, tool stack, real numbers, copy-paste prompt. New issue every Tuesday.
          </p>
          <a
            href="/#signup"
            className="inline-block bg-[#c9a84c] text-[#0a0a0a] text-[14px] font-medium py-3 px-10 hover:bg-[#d4b660] transition-colors"
          >
            $15/month — Start Now →
          </a>
          <p className="text-[12px] text-[#5a5550] mt-4">No credit card until checkout. Cancel any time.</p>
        </div>

        {/* Related links */}
        <div className="border border-[#1e1e1e] bg-[#0d0d0d] p-5">
          <div className="font-mono text-[10px] text-[#5a5550] uppercase tracking-wider mb-4">Related issues</div>
          <div className="space-y-3">
            <a href="/issues/sample" className="flex items-center justify-between group">
              <span className="text-[13px] text-[#9a9590] group-hover:text-[#f0ede8] transition-colors">
                How One CPA Firm 3x'd Revenue Per Partner Without Hiring
              </span>
              <span className="font-mono text-[11px] text-[#c9a84c] flex-shrink-0 ml-4">Free →</span>
            </a>
            <a href="/issues/how-accountants-cut-reporting-time" className="flex items-center justify-between group">
              <span className="text-[13px] text-[#9a9590] group-hover:text-[#f0ede8] transition-colors">
                How Accountants Cut Monthly Reporting Time by 90%
              </span>
              <span className="font-mono text-[11px] text-[#c9a84c] flex-shrink-0 ml-4">Free →</span>
            </a>
            <a href="/issues" className="flex items-center justify-between group">
              <span className="text-[13px] text-[#9a9590] group-hover:text-[#f0ede8] transition-colors">
                Browse the full issue archive
              </span>
              <span className="font-mono text-[11px] text-[#c9a84c] flex-shrink-0 ml-4">View →</span>
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
