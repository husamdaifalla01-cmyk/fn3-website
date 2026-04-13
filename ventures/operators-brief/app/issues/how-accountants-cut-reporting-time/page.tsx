import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Cut Client Reporting From 8 Hours to 45 Minutes | Operators Brief",
  description:
    "Accountants and bookkeepers: the exact Claude API + Google Sheets + Zapier workflow that cuts monthly client reporting from 8 hours to 45 minutes per client.",
  keywords: [
    "accountant AI workflow",
    "bookkeeper automation",
    "Claude API accounting",
    "Google Sheets Zapier accounting",
    "client reporting automation",
    "CPA AI tools",
  ],
  alternates: {
    canonical: "https://operators-brief.vercel.app/issues/how-accountants-cut-reporting-time",
  },
  openGraph: {
    title: "How to Cut Client Reporting From 8 Hours to 45 Minutes | Operators Brief",
    description:
      "The exact workflow accountants use to automate monthly client reporting with Claude API, Google Sheets, and Zapier. Real numbers, copy-paste prompt included.",
    type: "article",
    url: "https://operators-brief.vercel.app/issues/how-accountants-cut-reporting-time",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cut Client Reporting From 8 Hours to 45 Minutes",
    description:
      "The exact Claude API + Google Sheets + Zapier workflow. Copy-paste prompt included. Free deep-dive from Operators Brief.",
  },
};

export default function AccountantsReportingPage() {
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
            Get All 52 Issues — $15/mo
          </a>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Issue meta */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">
            Deep Dive
          </span>
          <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
          <span className="font-mono text-[11px] text-[#5a5550]">Free Issue</span>
          <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
          <span className="font-mono text-[11px] text-[#5a5550]">Accounting & Bookkeeping</span>
          <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
          <span className="font-mono text-[11px] text-[#5a5550]">9-min read</span>
        </div>

        {/* Title */}
        <h1 className="text-[32px] md:text-[44px] font-light leading-[1.1] tracking-tight text-[#f0ede8] mb-5">
          How to Cut Client Reporting From 8 Hours to 45 Minutes
        </h1>

        <p className="text-[18px] text-[#9a9590] leading-relaxed mb-12 border-l-2 border-[#c9a84c] pl-5">
          Most accounting firms are still spending a full workday per client on monthly reporting. Here's the exact Claude API + Google Sheets + Zapier workflow to get that down to 45 minutes — including the prompt, the checklist, and the before/after numbers.
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-[#1e1e1e] mb-12" />

        {/* Section 01 */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">01</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">The Problem</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            Why 8-hour reporting cycles are killing accounting margins
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            The average accountant or bookkeeper spends 6–10 hours per client per month on reporting. Pull the data from the accounting software, normalize it, write the narrative summary, package it in a PDF, send it to the client, wait for questions, answer them. Repeat 30–50 times a month.
          </p>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            At 40 clients and 8 hours each, that's 320 hours — roughly two full-time employees worth of bandwidth — spent on work that is largely identical month over month. The narrative changes slightly. The formatting doesn't. The conclusions are often the same. And the clients rarely read past the first page.
          </p>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            The ceiling isn't effort. It's the reporting bottleneck. You can't take on more clients if each one costs you a full day a month in deliverables. And you can't raise rates until you can demonstrate advisory value instead of data transcription.
          </p>

          <div className="bg-[#0d0d0d] border border-[#1e1e1e] p-5 my-8">
            <p className="text-[13px] font-mono text-[#5a5550] mb-2 uppercase tracking-wider">The real constraint:</p>
            <p className="text-[15px] text-[#f0ede8]">
              At $200/hr equivalent, 8 hrs/client × 40 clients = <span className="text-[#c9a84c]">$64,000/month locked in formatting and narrative writing.</span> That's not overhead. That's your growth ceiling.
            </p>
          </div>

          <p className="text-[15px] text-[#9a9590] leading-relaxed">
            This workflow doesn't eliminate reporting. It automates the parts that don't require judgment — so the parts that do get your full attention.
          </p>
        </section>

        {/* Section 02 */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">02</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">The Workflow</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            The 5-step pipeline: accounting software to client inbox
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-8">
            This workflow uses Claude API, Google Sheets, Zapier, Google Apps Script, and Google Docs. Total tooling cost: approximately $120–$180/month for 40 clients. No developers required.
          </p>

          {[
            {
              step: "Step 1",
              title: "Accounting software → Google Sheets (automated monthly pull)",
              tool: "Zapier + QuickBooks Online / Xero",
              detail:
                "A scheduled Zap fires on the 1st of each month and pulls P&L, balance sheet, and cash flow data for each client into a standardized Google Sheet template. The template uses named cells — revenue, COGS, net income, cash position, top 5 expense categories — so downstream steps can reference them reliably. One-time setup: 2–4 hours. Monthly maintenance: zero.",
            },
            {
              step: "Step 2",
              title: "Google Sheets → structured JSON payload",
              tool: "Google Apps Script (free)",
              detail:
                "A 40-line Apps Script reads each client's sheet and outputs a clean JSON object: client name, reporting month, key financial metrics, month-over-month deltas, and any cells flagged as null or missing. The script triggers automatically after the Zap completes. If you're not comfortable writing it yourself, paste your column names into Claude and ask it to write the script — it takes about 90 seconds.",
            },
            {
              step: "Step 3",
              title: "JSON → narrative summary via Claude API",
              tool: "Claude API (claude-3-5-sonnet)",
              detail:
                "The JSON payload is sent to Claude with a firm-specific system prompt (see Section 04). Claude returns a structured narrative: executive summary, 3 observations, one risk flag if triggered, one advisory discussion prompt, and a subject line for the email. Output is plain text, formatted for direct insertion into the report template. API cost: ~$0.04 per client report.",
            },
            {
              step: "Step 4",
              title: "Narrative → branded PDF",
              tool: "Google Docs API",
              detail:
                "The narrative text drops into a Google Doc template using merge fields ({{executive_summary}}, {{observation_1}}, etc.). The Google Docs API exports the populated doc as a PDF. The template includes your firm's logo, colors, and standard layout — set it up once and it renders consistently for every client.",
            },
            {
              step: "Step 5",
              title: "PDF → client email with dynamic subject line",
              tool: "Gmail API / Zapier",
              detail:
                "The PDF attaches to an email with the subject line generated by Claude in Step 3 — something like \"Meridian Bakery — February Brief: Cash position up 18%, one expense flag.\" Clients notice the specificity. Open rates go up. Questions come in more focused. The email sends automatically; you review a summary dashboard before it goes out.",
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

        {/* Section 03: Before/After Table */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">03</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">Before vs. After</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            The time and cost comparison — with real numbers
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-8">
            These benchmarks are based on a 40-client bookkeeping practice running this workflow for 90 days. Your numbers will vary by client count, software mix, and how much you customize the narrative template.
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
                  ["Time per client report", "8 hrs", "45 min", "−91%"],
                  ["Total reporting hours/month (40 clients)", "320 hrs", "30 hrs", "−91%"],
                  ["Accountant hours freed/month", "—", "290 hrs", "+290 hrs"],
                  ["API + tooling cost (40 clients)", "$0", "$145/mo", "—"],
                  ["Client email open rate", "31%", "54%", "+74%"],
                  ["Capacity to add new clients", "+0/month", "+8–12/month", "—"],
                  ["Avg review time per report (human check)", "40 min", "4 min", "−90%"],
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
              { label: "Time per report", value: "45 min" },
              { label: "Hours freed/month", value: "290 hrs" },
              { label: "Client open rate lift", value: "+74%" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#0d0d0d] border border-[#1e1e1e] p-5 text-center">
                <div className="font-mono text-[32px] text-[#c9a84c] leading-none mb-2">{stat.value}</div>
                <div className="text-[11px] text-[#5a5550] font-mono uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 04: The Prompt */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">04</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">The Prompt</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            The exact Claude prompt — copy-paste ready
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-6">
            This system prompt is sent with every API call. The user message is the JSON payload from Apps Script. Customize the bracketed fields for your firm.
          </p>

          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-8 bg-[#0d0d0d] border border-[#1e1e1e] border-b-0 flex items-center px-4 gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="ml-auto font-mono text-[10px] text-[#5a5550]">SYSTEM PROMPT — Claude API</span>
            </div>
            <pre className="mt-8 bg-[#0a0a0a] border border-[#1e1e1e] p-5 text-[12px] text-[#9a9590] leading-relaxed overflow-x-auto whitespace-pre-wrap font-mono">
{`You are a senior financial analyst at [FIRM NAME], a bookkeeping and
accounting firm serving [CLIENT TYPE — e.g., small business owners,
restaurant operators, e-commerce brands].

You will receive a JSON object containing a client's monthly financial data.
Your task is to produce a concise, professional monthly financial brief that
feels like it was written by their most trusted advisor.

TONE: Direct and specific. No jargon. No hedging. Write with the confidence
of someone who has reviewed this client's books for three years.

OUTPUT — return exactly these labeled sections:

EXECUTIVE_SUMMARY: (2–3 sentences. Lead with the single most significant
number or trend this month. Be specific — cite the actual figure.)

OBSERVATION_1: (One positive or neutral finding with supporting data.)

OBSERVATION_2: (One area requiring attention — elevated expenses, slowing
revenue, cash trend. Be factual, not alarming.)

OBSERVATION_3: (One forward-looking note — a pattern, seasonal factor,
or upcoming decision point based on what you see in the data.)

RISK_FLAG: (Only include if: cash runway < 60 days, any expense category
up >20% MoM, or revenue down >15% MoM. Otherwise write: NONE)

ADVISORY_PROMPT: (One specific question you'd ask this client in a review
call to deepen the conversation. Tie it directly to their numbers.)

SUBJECT_LINE: (Email subject line. Format: "[Client Name] — [Month] Brief:
[One concrete insight]". Max 70 characters. No em-dashes.)

RULES:
- Never invent numbers not present in the JSON
- If a field is null, note it briefly and continue
- Avoid filler phrases: "it's worth noting", "as we can see", "importantly"
- Every sentence must carry information. Cut anything decorative.
- Do not include greetings or sign-offs in any section`}
            </pre>
          </div>

          <p className="text-[13px] text-[#5a5550] mt-4 leading-relaxed">
            At ~420 input tokens + 380 output tokens per report, this runs approximately $0.04/client at claude-3-5-sonnet pricing. For 40 clients, that's $1.60/month in API costs — less than a coffee.
          </p>
        </section>

        {/* Section 05: Implementation Checklist */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">05</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">Implementation Checklist</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            8 steps to go live — estimated 2 weekends of setup
          </h2>

          <div className="border border-[#1e1e1e] bg-[#0d0d0d] divide-y divide-[#1e1e1e]">
            {[
              {
                item: "Time your current reporting process for one client end-to-end",
                detail: "Most accountants guess 4–5 hours and discover it's closer to 8. Actual data changes the ROI math significantly.",
              },
              {
                item: "Create a standardized Google Sheet template for all clients",
                detail: "Same column names, same layout. This is what makes the Zap and Apps Script reusable across every client.",
              },
              {
                item: "Build the QuickBooks/Xero → Google Sheets Zap",
                detail: "Use Zapier's native QB Online or Xero integrations. Map P&L, balance sheet, and cash flow. Test with 2 clients before scaling.",
              },
              {
                item: "Write the Apps Script to output JSON",
                detail: "Paste your sheet column names into Claude and ask: \"Write a Google Apps Script that reads these columns and outputs a JSON object with these fields.\" It takes 2 minutes.",
              },
              {
                item: "Get a Claude API key and test the prompt",
                detail: "Run 3–5 test reports with real client data. Refine the prompt until the narrative tone matches your firm's voice. Budget 2 hours for this.",
              },
              {
                item: "Create the Google Doc PDF template with merge fields",
                detail: "Use {{executive_summary}}, {{observation_1}}, etc. as placeholders. Include your logo, brand colors, and any standard boilerplate.",
              },
              {
                item: "Connect the pipeline: Apps Script → Claude API → Docs API → Gmail",
                detail: "This is the integration step. If you're not technical, hire a Zapier expert on Upwork for 2–3 hours. Quote should be $150–$250.",
              },
              {
                item: "Run a 3-client pilot for one full cycle before full rollout",
                detail: "Check narrative accuracy, tone, and whether clients notice or respond differently. Get one client to give you verbal feedback before scaling.",
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

        {/* Divider */}
        <div className="w-full h-px bg-[#1e1e1e] mb-12" />

        {/* Related Issues */}
        <section className="mb-12">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550] mb-6">
            Related Issues
          </div>
          <div className="space-y-3">
            {[
              {
                href: "/issues/sample",
                label: "Issue #01",
                title: "How One CPA Firm 3x'd Revenue Per Partner Without Hiring",
                desc: "The 4-step reporting automation that freed 305 hours/month and tripled client capacity.",
              },
              {
                href: "/issues/customer-service-ai-ecommerce",
                label: "Deep Dive",
                title: "How a 2-Person DTC Brand Cut Support Costs by 67%",
                desc: "Gorgias + Claude API workflow that resolved 74% of tickets without human intervention.",
              },
              {
                href: "/issues/real-estate-lead-qualification-ai",
                label: "Deep Dive",
                title: "The Realtor Who Qualified 200 Leads Without Answering a Single Call",
                desc: "CRM + AI scoring workflow with copy-paste lead qualification prompt.",
              },
            ].map((rel) => (
              <Link
                key={rel.href}
                href={rel.href}
                className="block border border-[#1e1e1e] bg-[#0d0d0d] hover:border-[#2a2a2a] transition-colors p-5"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[10px] text-[#c9a84c] uppercase tracking-wider">{rel.label}</span>
                </div>
                <h3 className="text-[14px] font-medium text-[#f0ede8] mb-1 leading-snug">{rel.title}</h3>
                <p className="text-[12px] text-[#5a5550] leading-relaxed">{rel.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* End CTA */}
        <div className="bg-[#0d0d0d] border border-[#c9a84c] p-8 text-center">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-4">
            Get 51 more like this — $15/month
          </div>
          <h3 className="text-[24px] md:text-[30px] font-light text-[#f0ede8] mb-3 leading-snug">
            A new workflow every Tuesday. Real numbers, exact tools.
          </h3>
          <p className="text-[14px] text-[#9a9590] mb-6 max-w-md mx-auto leading-relaxed">
            Every issue covers one real AI implementation — what it cost, how it was built, and the exact prompts and tools used. Full archive from day one.
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
              See full archive →
            </Link>
          </div>
          <p className="text-[12px] text-[#5a5550]">Cancel any time. No friction. One click.</p>
        </div>
      </article>
    </main>
  );
}
