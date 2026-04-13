import Link from "next/link";
import type { Metadata } from "next";
import CopyLinkButton from "./CopyLinkButton";

export const metadata: Metadata = {
  title: "Sample Issue #01 — How One CPA Firm 3x'd Revenue Per Partner Without Hiring | Operators Brief",
  description:
    "Free issue: The exact workflow, tools, numbers, and Claude prompt a CPA firm used to 3x revenue per partner — without adding headcount. QuickBooks + Zapier + Claude API.",
  keywords: [
    "CPA AI workflow",
    "accounting automation",
    "Claude API accounting",
    "QuickBooks Zapier automation",
    "AI for accountants",
    "revenue per partner CPA",
  ],
  alternates: {
    canonical: "https://operators-brief.vercel.app/issues/sample",
  },
  openGraph: {
    title: "How One CPA Firm 3x'd Revenue Per Partner Without Hiring | Operators Brief",
    description:
      "The 4-step QuickBooks + Zapier + Claude API reporting workflow. Cut 320 hours/month to 15 and tripled client capacity. Full breakdown, free to read.",
    type: "article",
    url: "https://operators-brief.vercel.app/issues/sample",
  },
  twitter: {
    card: "summary_large_image",
    title: "CPA Firm 3x'd Revenue Per Partner — Full AI Workflow Breakdown",
    description:
      "Free issue: QuickBooks + Zapier + Claude API reporting automation. 320 hrs/month cut to 15. Copy-paste prompt included.",
  },
};

export default function SampleIssuePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Nav bar */}
      <div className="border-b border-[#1e1e1e] px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] hover:text-[#d4b660] transition-colors">
            ← Operators Brief
          </Link>
          <a
            href="/#signup"
            className="font-mono text-[11px] tracking-widest uppercase bg-[#c9a84c] text-[#0a0a0a] px-4 py-2 hover:bg-[#d4b660] transition-colors"
          >
            Get All 52 Issues — $15/mo
          </a>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16">

        {/* Issue meta */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">
            Issue #01
          </span>
          <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
          <span className="font-mono text-[11px] text-[#5a5550]">Free Sample</span>
          <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
          <span className="font-mono text-[11px] text-[#5a5550]">March 4, 2026</span>
          <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
          <span className="font-mono text-[11px] text-[#5a5550]">8-min read</span>
        </div>

        {/* Title */}
        <h1 className="text-[32px] md:text-[44px] font-light leading-[1.1] tracking-tight text-[#f0ede8] mb-5">
          How One CPA Firm 3x'd Revenue Per Partner Without Hiring
        </h1>

        <p className="text-[18px] text-[#9a9590] leading-relaxed mb-12 border-l-2 border-[#c9a84c] pl-5">
          A mid-size accounting firm was drowning in reporting overhead. Here's the exact workflow they built, what it cost, and the numbers that came out the other side.
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-[#1e1e1e] mb-12" />

        {/* ── Section 1: The Problem ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">01</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">The Problem</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            320 hours a month disappearing into reporting
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            Client reporting was eating 8 hours per client per month. At 40 clients, that's 320 hours. That's 2 full-time employees worth of time — except it wasn't coming from employees. It was coming from partners.
          </p>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            The firm (based in Austin, TX — 6 partners, 40 business clients averaging $2,800/month) had a simple problem with a compounding cost: every monthly reporting cycle required pulling data from QuickBooks, normalizing it, writing a narrative summary, and packaging it into a branded PDF. Every. Single. Month. Per client.
          </p>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            Partners were spending 3–4 hours per client on work that was identical month over month. Meanwhile, advisory work — the kind clients actually pay premium for — was getting squeezed into whatever was left.
          </p>

          <div className="bg-[#0d0d0d] border border-[#1e1e1e] p-5 my-8">
            <p className="text-[13px] font-mono text-[#5a5550] mb-2 uppercase tracking-wider">The real cost calculation:</p>
            <p className="text-[15px] text-[#f0ede8]">
              40 clients × 8 hrs/month = 320 hrs<br />
              320 hrs × $250 partner billing rate = <span className="text-[#c9a84c]">$80,000/month in unrecoverable time</span>
            </p>
          </div>

          <p className="text-[15px] text-[#9a9590] leading-relaxed">
            They weren't losing money on reporting. They just weren't making any either — and they were too busy doing it to add clients.
          </p>
        </section>

        {/* ── Section 2: The Workflow ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">02</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">The Workflow</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            The 4-step system they built in 11 days
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-8">
            They didn't hire a developer. One partner with basic Zapier experience set this up across two weekends.
          </p>

          {/* Steps */}
          {[
            {
              step: "Step 1",
              title: "QuickBooks → Google Sheets (automated export)",
              tool: "Zapier + QuickBooks Online",
              detail: "Every 1st of the month, a Zap pulls the P&L, balance sheet, and cash flow statement for each client into a standardized Google Sheet template. The trigger is a scheduled Zap; the action maps QB line items to named sheet cells. Setup time: ~3 hours total across 40 clients using a bulk Zap template. Monthly maintenance: 0.",
            },
            {
              step: "Step 2",
              title: "Google Sheets → structured JSON payload",
              tool: "Google Apps Script (free)",
              detail: "A 40-line Apps Script reads the normalized sheet and outputs a JSON object: client name, reporting month, key metrics (revenue, expenses, net, YoY delta, top 3 expense categories, cash position). This JSON is what gets sent to Claude. Script runs automatically after the Zap completes.",
            },
            {
              step: "Step 3",
              title: "JSON → narrative report via Claude API",
              tool: "Claude API (claude-3-5-sonnet)",
              detail: "The JSON payload is sent to Claude with a firm-specific system prompt (see Section 05 below). Claude returns a structured narrative: executive summary, 3 key observations, one risk flag if applicable, one advisory prompt question. Output is plain text, pre-formatted for insertion into the PDF template. API cost per report: ~$0.04.",
            },
            {
              step: "Step 4",
              title: "Narrative → branded PDF → client email",
              tool: "Google Docs API + Gmail",
              detail: "The narrative drops into a Google Doc template (firm logo, colors, standard layout). Google Docs API exports as PDF. Gmail sends it to the client contact with a subject line generated by Claude: \"[Client Name] — [Month] Financial Brief: [One-line insight]\". Total end-to-end time per client: 4 minutes. Human review: 15 minutes for all 40 clients combined.",
            },
          ].map((item, i) => (
            <div key={i} className="mb-6 border border-[#1e1e1e] bg-[#0d0d0d]">
              <div className="border-b border-[#1e1e1e] px-5 py-3 flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#c9a84c] uppercase tracking-wider">{item.step}</span>
                <span className="font-mono text-[11px] text-[#5a5550] uppercase tracking-wider">{item.tool}</span>
              </div>
              <div className="px-5 py-4">
                <h3 className="text-[15px] font-medium text-[#f0ede8] mb-3">{item.title}</h3>
                <p className="text-[13px] text-[#9a9590] leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ── Section 3: The Numbers ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">03</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">The Numbers</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            Before and after, in cold hard numbers
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-8">
            These are actuals from month 3 post-implementation (month 1 and 2 included setup and refinement time):
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border border-[#1e1e1e] text-[13px]">
              <thead>
                <tr className="border-b border-[#1e1e1e] bg-[#0d0d0d]">
                  <th className="text-left px-4 py-3 font-mono text-[11px] text-[#5a5550] uppercase tracking-wider">Metric</th>
                  <th className="text-right px-4 py-3 font-mono text-[11px] text-[#5a5550] uppercase tracking-wider">Before</th>
                  <th className="text-right px-4 py-3 font-mono text-[11px] text-[#c9a84c] uppercase tracking-wider">After</th>
                  <th className="text-right px-4 py-3 font-mono text-[11px] text-[#5a5550] uppercase tracking-wider">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e1e]">
                {[
                  ["Reporting hrs/month (total)", "320 hrs", "15 hrs", "−95%"],
                  ["Reporting hrs per client", "8 hrs", "22 min", "−95%"],
                  ["Partner time freed/month", "—", "305 hrs", "+305 hrs"],
                  ["Clients served", "40", "120", "+3×"],
                  ["Monthly revenue", "$112,000", "$336,000", "+$224K"],
                  ["Revenue per partner", "$18,667", "$56,000", "+3×"],
                  ["Automation stack cost", "$0", "$1,840/mo", "—"],
                  ["Net new revenue (Year 1)", "—", "$2,688,000", "—"],
                ].map(([metric, before, after, change]) => (
                  <tr key={metric} className="hover:bg-[#0d0d0d] transition-colors">
                    <td className="px-4 py-3 text-[#9a9590]">{metric}</td>
                    <td className="px-4 py-3 text-right text-[#5a5550]">{before}</td>
                    <td className="px-4 py-3 text-right text-[#c9a84c] font-medium">{after}</td>
                    <td className="px-4 py-3 text-right text-[#f0ede8]">{change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Revenue per partner", value: "3×" },
              { label: "Monthly revenue", value: "$336K" },
              { label: "Reporting time", value: "−95%" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#0d0d0d] border border-[#1e1e1e] p-5 text-center">
                <div className="font-mono text-[32px] text-[#c9a84c] leading-none mb-2">{stat.value}</div>
                <div className="text-[11px] text-[#5a5550] font-mono uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: Implementation Checklist ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">04</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">Implementation Checklist</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            7 steps to replicate this in your firm
          </h2>

          <div className="border border-[#1e1e1e] bg-[#0d0d0d] divide-y divide-[#1e1e1e]">
            {[
              {
                item: "Audit your reporting process — time it for one client end-to-end",
                detail: "Most firms underestimate this by 2–3×. Track it for real.",
              },
              {
                item: "Standardize your Google Sheet template across all clients",
                detail: "Consistent column names are what make the Zap and the Apps Script reusable.",
              },
              {
                item: "Set up QuickBooks → Google Sheets Zap (use Zapier's QB Online integration)",
                detail: "Map P&L, balance sheet, and cash flow. Test with one client first.",
              },
              {
                item: "Write the Google Apps Script to output your JSON payload",
                detail: "You can use Claude to write this script — paste in your sheet column names and ask for the script.",
              },
              {
                item: "Build your system prompt (customize the one in Section 05)",
                detail: "Add your firm's voice, client industry context, and any standing flags to watch.",
              },
              {
                item: "Create your Google Doc PDF template with placeholders",
                detail: "Use {{executive_summary}}, {{observation_1}}, etc. as merge fields.",
              },
              {
                item: "Run a 3-client pilot for one month before full rollout",
                detail: "Check for narrative accuracy, tone consistency, and client response before scaling.",
              },
            ].map((row, i) => (
              <div key={i} className="flex items-start gap-4 p-5">
                <div className="flex-shrink-0 w-6 h-6 border border-[#2a2a2a] rounded-sm mt-0.5 flex items-center justify-center">
                  <span className="font-mono text-[10px] text-[#5a5550]">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <p className="text-[14px] text-[#f0ede8] mb-1">{row.item}</p>
                  <p className="text-[12px] text-[#5a5550] leading-relaxed">{row.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 5: The Prompt ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">05</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">The Prompt</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            The exact Claude prompt — copy-paste ready
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-6">
            This is the system prompt they use. The user message is the JSON payload from Apps Script. Customize the bracketed sections for your firm.
          </p>

          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-8 bg-[#0d0d0d] border border-[#1e1e1e] border-b-0 flex items-center px-4 gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="ml-auto font-mono text-[10px] text-[#5a5550]">SYSTEM PROMPT — Claude API</span>
            </div>
            <pre className="mt-8 bg-[#0a0a0a] border border-[#1e1e1e] p-5 text-[12px] text-[#9a9590] leading-relaxed overflow-x-auto whitespace-pre-wrap font-mono">
{`You are a senior financial analyst and client advisor for [FIRM NAME],
a CPA firm specializing in [INDUSTRY/CLIENT TYPE].

You will receive a JSON object containing a client's monthly financial data.
Your job is to produce a concise, professional monthly financial brief.

TONE: Direct, clear, and advisory. No jargon. Write like a trusted advisor,
not a software output. Use the client's first name if available.

OUTPUT FORMAT — respond with exactly these sections, nothing else:

EXECUTIVE_SUMMARY: (2-3 sentences. Lead with the single most important
number or trend this month. Be specific.)

OBSERVATION_1: (One key positive or neutral finding with supporting data.)

OBSERVATION_2: (One area of attention — not alarm, but worth watching.)

OBSERVATION_3: (One forward-looking note — a question, pattern, or
upcoming decision point.)

RISK_FLAG: (Only include if there is a genuine concern — cash runway < 60
days, expense category >20% MoM increase, revenue decline >15%. If no
flag, output: NONE)

ADVISORY_PROMPT: (One question you would ask the client in a review call
to deepen the conversation. Make it specific to their data.)

SUBJECT_LINE: (For the email delivery — format: "[Client First Name] —
[Month Year] Brief: [One concrete insight]". Max 70 chars.)

RULES:
- Never fabricate numbers not present in the JSON
- If a data field is missing or null, note it and move on
- Do not use em-dashes in SUBJECT_LINE
- Avoid phrases like "it's worth noting" or "it's important to remember"
- Every sentence must earn its place. Cut anything decorative.`}
            </pre>
          </div>

          <p className="text-[13px] text-[#5a5550] mt-4 leading-relaxed">
            At roughly 400 input tokens + 350 output tokens per report, this costs ~$0.04 per client at claude-3-5-sonnet pricing. For 40 clients: $1.60/month in API costs.
          </p>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-[#1e1e1e] mb-12" />

        {/* Free vs Pro upgrade path */}
        <section className="mb-12">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-6">
            You just read Issue #01. Here&apos;s what Pro members got this week:
          </div>

          <div className="space-y-4 mb-8">
            {[
              {
                number: "51",
                title: "The Staffing Agency That Replaced 3 Account Managers With One AI Workflow — $22K/Month Saved",
                teaser: "A mid-size staffing firm used Claude + Zapier to automate client check-ins, job order updates, and weekly status reports across 60 accounts. Two account managers were redeployed to business development; the third role was eliminated at attrition.",
              },
              {
                number: "50",
                title: "How a SaaS Founder Automated Investor Reporting and Got 4 Hours Back Every Month",
                teaser: "Monthly board updates were eating the CEO's Sundays. They built a pipeline that pulls Stripe, Mixpanel, and HubSpot data into a structured Claude prompt — and outputs a complete investor update in under 8 minutes. The board noticed the improvement in quality.",
              },
              {
                number: "49",
                title: "The E-Commerce Brand That Cut Influencer Vetting From 6 Hours to 40 Minutes",
                teaser: "Manually reviewing influencer profiles, engagement rates, and audience overlap was a weekly bottleneck. A simple Python + Claude workflow now produces a standardized vetting report per creator — flagging fake engagement, audience fit, and brand safety risks automatically.",
              },
            ].map((issue) => (
              <div key={issue.number} className="border border-[#1e1e1e] bg-[#0d0d0d]">
                <div className="border-b border-[#1e1e1e] px-5 py-3 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#5a5550] uppercase tracking-wider">Issue #{issue.number}</span>
                  <div className="flex items-center gap-2 text-[#2a2a2a]">
                    <svg width="10" height="12" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="6" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M3.5 6V4a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#3a3530]">Pro</span>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <h3 className="text-[14px] font-medium text-[#f0ede8] mb-2 leading-snug">{issue.title}</h3>
                  <p className="text-[13px] text-[#5a5550] leading-relaxed">{issue.teaser}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-[#1e1e1e] bg-[#0d0d0d] p-5 mb-8">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-3">Pro members also got:</div>
            <ul className="space-y-2">
              {[
                "The exact Claude prompt from each issue — copy-paste ready, no adaptation needed",
                "ROI spreadsheet templates pre-built for each workflow",
                "Access to the full Slack community — ask questions, share results, get feedback",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#c9a84c] mt-0.5 flex-shrink-0">→</span>
                  <span className="text-[14px] text-[#9a9590] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Share this issue */}
        <section className="mb-12">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550] mb-4">
            Share this issue
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Just read how a CPA 3x'd revenue per partner with AI. The exact workflow is in @OperatorsBrief. Free to read:")}&url=${encodeURIComponent("https://operators-brief.vercel.app/issues/sample")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-[#1e1e1e] bg-[#0d0d0d] text-[#9a9590] text-[12px] font-mono px-4 py-2.5 hover:border-[#2a2a2a] hover:text-[#f0ede8] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Share on X
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent("https://operators-brief.vercel.app/issues/sample")}&title=${encodeURIComponent("How One CPA Firm 3x'd Revenue Per Partner Without Hiring")}&summary=${encodeURIComponent("A mid-size CPA firm built a 4-step AI workflow that cut reporting from 320 hours/month to 15 — then tripled their client base. Full breakdown, tools, costs, and copy-paste Claude prompt. Free to read in Operators Brief.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-[#1e1e1e] bg-[#0d0d0d] text-[#9a9590] text-[12px] font-mono px-4 py-2.5 hover:border-[#2a2a2a] hover:text-[#f0ede8] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Share on LinkedIn
            </a>
            <CopyLinkButton url="https://operators-brief.vercel.app/issues/sample" />
          </div>
        </section>

        {/* End CTA */}
        <div className="bg-[#0d0d0d] border border-[#c9a84c] p-8 text-center">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-4">
            51 more issues like this one
          </div>
          <h3 className="text-[24px] md:text-[30px] font-light text-[#f0ede8] mb-3 leading-snug">
            Join 2,847 operators — $15/month
          </h3>
          <p className="text-[14px] text-[#9a9590] mb-6 max-w-md mx-auto leading-relaxed">
            Every Tuesday: one deep-dive like this one. Real business. Real workflow. Real numbers. Full archive included from day one.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <a
              href="/#signup"
              className="inline-block bg-[#c9a84c] text-[#0a0a0a] text-[14px] font-medium py-3 px-8 hover:bg-[#d4b660] transition-colors"
            >
              Join 2,847 operators — $15/month
            </a>
            <Link
              href="/issues"
              className="inline-block border border-[#1e1e1e] text-[#9a9590] text-[14px] py-3 px-8 hover:border-[#2a2a2a] hover:text-[#f0ede8] transition-colors"
            >
              See all 12 issues →
            </Link>
          </div>

          <p className="text-[12px] text-[#5a5550]">Cancel any time. No friction. One click.</p>
        </div>

      </article>
    </main>
  );
}
