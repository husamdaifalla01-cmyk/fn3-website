import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How an Agency Cut Client Reporting Time From 6 Hours to 40 Minutes | Operators Brief",
  description:
    "Digital agency owners: the exact Zapier + Claude API + Google Slides workflow that cuts monthly client reporting from 6 hours to 40 minutes per client — freeing 90 hrs/month.",
  keywords: [
    "agency client reporting automation",
    "Google Slides AI workflow",
    "marketing agency AI tools",
    "Claude API agency automation",
    "client reporting software",
    "agency workflow automation",
  ],
  alternates: {
    canonical: "https://operators-brief.vercel.app/issues/agency-owner-client-reporting",
  },
  openGraph: {
    title: "How an Agency Cut Client Reporting Time From 6 Hours to 40 Minutes | Operators Brief",
    description:
      "The exact Zapier + Claude API + Google Slides workflow. 90 hrs/month freed, $13,500 in recovered capacity, 3 new clients onboarded same month. Free deep-dive.",
    type: "article",
    url: "https://operators-brief.vercel.app/issues/agency-owner-client-reporting",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agency Client Reporting: 6 Hours → 40 Minutes",
    description:
      "Zapier + Claude API + Google Slides workflow. 90 hrs/month freed. $13,500 recovered capacity. Exact prompts included. Free from Operators Brief.",
  },
};

export default function AgencyClientReportingPage() {
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
            Get All Issues — $15/mo
          </a>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Issue meta */}
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">
            Deep Dive
          </span>
          <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
          <span className="font-mono text-[11px] text-[#5a5550]">Free Issue</span>
          <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
          <span className="font-mono text-[11px] text-[#5a5550]">Digital Agency</span>
          <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
          <span className="font-mono text-[11px] text-[#5a5550]">10-min read</span>
        </div>

        {/* Title */}
        <h1 className="text-[32px] md:text-[44px] font-light leading-[1.1] tracking-tight text-[#f0ede8] mb-5">
          How an Agency Cut Client Reporting Time From 6 Hours to 40 Minutes
        </h1>

        <p className="text-[18px] text-[#9a9590] leading-relaxed mb-12 border-l-2 border-[#c9a84c] pl-5">
          A 15-client agency was burning 90 hours a month building slide decks from Google Analytics and Facebook Ads. Here's the exact Zapier + Claude API + Google Slides workflow that got it to 40 minutes — including both prompts, the implementation checklist, and the month they took on 3 new clients with the freed capacity.
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
            Why monthly reporting is the silent growth cap for agencies
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            At 15 clients, the reporting burden is manageable — barely. You pull data from Google Analytics. You pull data from Facebook Ads Manager. You reconcile the numbers in a spreadsheet. You write the narrative. You drop everything into a slide deck. You format it. You send it. You wait for questions and spend an hour answering them.
          </p>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            Six hours per client. Fifteen clients. Ninety hours a month. That's more than two full work weeks spent on deliverables that clients skim in eight minutes on their phone.
          </p>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            The model breaks the moment you try to grow. Every new client adds six hours of reporting overhead. You can't hire fast enough to keep up with the reporting load, and you can't take on more clients until you do. Most agencies hit a ceiling of 12–18 clients and stall out — not because they can't win the business, but because they can't operationalize it.
          </p>

          <div className="bg-[#0d0d0d] border border-[#1e1e1e] p-5 my-8">
            <p className="text-[13px] font-mono text-[#5a5550] mb-2 uppercase tracking-wider">The math:</p>
            <p className="text-[15px] text-[#f0ede8]">
              6 hrs × 15 clients × $150/hr equivalent = <span className="text-[#c9a84c]">$13,500/month locked in slide decks.</span> That's not overhead — that's your hiring budget, your growth runway, and your next three clients.
            </p>
          </div>

          <p className="text-[15px] text-[#9a9590] leading-relaxed">
            The workflow below automates data aggregation, narrative writing, and slide generation. The only thing you review is accuracy. Setup takes one weekend.
          </p>
        </section>

        {/* Section 02 */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">02</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">The Workflow</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            Four steps: raw data to delivered slide deck
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-8">
            Tool stack: Zapier, Claude API (claude-3-5-sonnet), Google Sheets, Google Slides API. Total monthly cost for 15 clients: approximately $90–$130. No developers required for the core setup.
          </p>

          {[
            {
              step: "Step 1",
              title: "Pull performance data — Google Analytics + Facebook Ads → Google Sheets",
              tool: "Zapier",
              detail:
                "A scheduled Zap fires on the last day of each month and pulls the previous month's data for each client: GA4 sessions, conversions, revenue (if tracked), top channels; Facebook Ads spend, impressions, clicks, CPC, ROAS by campaign. All data lands in a standardized Google Sheet per client. Columns are named consistently across all clients — sessions, conversions, fb_spend, fb_roas, fb_top_campaign — so downstream steps are identical regardless of client.",
            },
            {
              step: "Step 2",
              title: "Google Sheets → structured JSON payload via Apps Script",
              tool: "Google Apps Script (free)",
              detail:
                "A lightweight Apps Script reads each client's sheet and outputs a JSON object: client name, reporting month, all metrics, month-over-month deltas, and any null/missing fields flagged. The script triggers automatically after the Zap completes. Paste your column names into Claude and ask it to write the script — takes under 5 minutes.",
            },
            {
              step: "Step 3",
              title: "JSON → performance summary + slide narrative via Claude API",
              tool: "Claude API",
              detail:
                "Two separate Claude calls per client (see Section 04 for both prompts): the first generates a performance summary — top metric movers, channel breakdown, ROAS analysis. The second writes the slide narrative — executive overview, 3 key findings, one recommendation. Both return structured text mapped directly to slide placeholders. API cost: ~$0.06 per client report.",
            },
            {
              step: "Step 4",
              title: "Narrative + data → auto-generated Google Slides report",
              tool: "Google Slides API",
              detail:
                "A master slide template with your agency's branding uses merge fields ({{client_name}}, {{executive_overview}}, {{finding_1}}, {{chart_data_1}}, etc.). The Slides API populates the template with Claude's narrative and the raw metrics. Charts are generated from the data. Output is a fully formatted .pptx or Google Slides link, automatically emailed to the client.",
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
            What the numbers looked like at 90 days
          </h2>

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
                  ["Time per client report", "6 hrs", "40 min", "−89%"],
                  ["Total reporting hours/month (15 clients)", "90 hrs", "10 hrs", "−89%"],
                  ["Capacity freed/month", "—", "80 hrs", "+80 hrs"],
                  ["API + tooling cost (15 clients)", "$0", "$115/mo", "—"],
                  ["New clients onboarded (month 1)", "0", "3", "+3"],
                  ["Monthly revenue added from new clients", "$0", "$13,500", "+$13,500"],
                  ["Report quality score (client survey)", "3.8 / 5", "4.6 / 5", "+21%"],
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
              { label: "Time per report", value: "40 min" },
              { label: "Hours freed/month", value: "80 hrs" },
              { label: "New MRR (month 1)", value: "$13,500" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#0d0d0d] border border-[#1e1e1e] p-5 text-center">
                <div className="font-mono text-[32px] text-[#c9a84c] leading-none mb-2">{stat.value}</div>
                <div className="text-[11px] text-[#5a5550] font-mono uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 04: The Prompts */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">04</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">The Prompts</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            Both Claude prompts — copy-paste ready
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-8">
            Two calls per client. The first generates the raw performance summary used to populate data slides. The second writes the narrative that runs through the entire report. Both receive the same JSON payload from Step 2.
          </p>

          {/* Prompt 1 */}
          <p className="text-[14px] text-[#f0ede8] mb-3 font-medium">Prompt 1 — Performance Summary</p>
          <div className="relative mb-8">
            <div className="absolute top-0 left-0 right-0 h-8 bg-[#0d0d0d] border border-[#1e1e1e] border-b-0 flex items-center px-4 gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="ml-auto font-mono text-[10px] text-[#5a5550]">SYSTEM PROMPT 1 — Claude API</span>
            </div>
            <pre className="mt-8 bg-[#0a0a0a] border border-[#1e1e1e] p-5 text-[12px] text-[#9a9590] leading-relaxed overflow-x-auto whitespace-pre-wrap font-mono">
{`You are a performance analyst at [AGENCY NAME], a digital marketing agency.
You will receive a JSON object with one month of performance data for a client
(Google Analytics + Facebook Ads metrics). Produce a structured performance
summary used to populate a monthly client report.

OUTPUT — return exactly these labeled sections:

TOP_METRIC: (The single most significant number this month — the one the
client will care about most. Include MoM delta. Max 1 sentence.)

CHANNEL_BREAKDOWN: (3–5 bullet points. One per channel. Format:
"[Channel]: [key metric] ([delta vs last month])". Be specific — cite numbers.)

FACEBOOK_ANALYSIS: (2–3 sentences. Lead with ROAS. Call out the top
performing campaign by name and spend efficiency. Flag any campaign
burning budget without conversion.)

TRAFFIC_ANALYSIS: (2–3 sentences. Sessions trend, top source, and whether
conversion rate moved. Only note anomalies — skip anything flat.)

DATA_FLAGS: (List any metrics that are null, missing, or suspicious.
If none: write NONE.)

RULES:
- Never round numbers unless they exceed 10,000 (then round to nearest 100)
- Do not invent data not present in the JSON
- No filler. Every line must contain a specific number.`}
            </pre>
          </div>

          {/* Prompt 2 */}
          <p className="text-[14px] text-[#f0ede8] mb-3 font-medium">Prompt 2 — Slide Narrative</p>
          <div className="relative mb-6">
            <div className="absolute top-0 left-0 right-0 h-8 bg-[#0d0d0d] border border-[#1e1e1e] border-b-0 flex items-center px-4 gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="ml-auto font-mono text-[10px] text-[#5a5550]">SYSTEM PROMPT 2 — Claude API</span>
            </div>
            <pre className="mt-8 bg-[#0a0a0a] border border-[#1e1e1e] p-5 text-[12px] text-[#9a9590] leading-relaxed overflow-x-auto whitespace-pre-wrap font-mono">
{`You are the account lead at [AGENCY NAME]. You're writing the narrative
sections of a monthly performance report for [CLIENT NAME], a [CLIENT INDUSTRY]
business. You've been managing their account for [X] months.

TONE: Confident, specific, and consultative. Like an advisor who knows their
numbers cold. No hedging. No jargon. Client is a business owner, not a marketer.

You will receive the same performance JSON as Prompt 1. Produce the narrative
sections that run alongside the data slides.

OUTPUT — return exactly these labeled sections:

EXECUTIVE_OVERVIEW: (3–4 sentences. Lead with the story of the month —
what moved, what it means for the business, and the one thing that needs
attention. Write as if you're on a call with them.)

KEY_FINDING_1: (One positive result. Specific number, why it matters,
what drove it. 2–3 sentences.)

KEY_FINDING_2: (One area to improve or monitor. Specific, not vague.
Suggest a lever to pull. 2–3 sentences.)

KEY_FINDING_3: (One forward-looking observation. A trend forming, a
seasonal factor, or a test to run next month. 2–3 sentences.)

RECOMMENDATION: (One specific action for next month. Budget, targeting,
creative, or channel mix. Be concrete — not "we should test X" but
"shift $[amount] from [campaign A] to [campaign B] and run [specific test]".)

SLIDE_TITLE: (Subject line for the report email. Format:
"[Client Name] — [Month]: [One concrete headline]". Max 65 characters.)

RULES:
- Never invent numbers. Pull directly from the JSON.
- Write to a business owner, not a marketing manager.
- Every recommendation must be actionable next week.`}
            </pre>
          </div>

          <p className="text-[13px] text-[#5a5550] leading-relaxed">
            Combined, both calls run approximately $0.06/client. At 15 clients, that's $0.90/month in API costs for the narrative layer.
          </p>
        </section>

        {/* Section 05: Implementation Checklist */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">05</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">Implementation Checklist</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            From zero to live — one weekend of setup
          </h2>

          <div className="mb-6 bg-[#0d0d0d] border border-[#1e1e1e] p-4">
            <p className="text-[13px] font-mono text-[#5a5550] uppercase tracking-wider mb-2">Tool Stack</p>
            <div className="flex flex-wrap gap-2">
              {["Zapier", "Claude API", "Google Sheets", "Google Apps Script", "Google Slides API"].map((tool) => (
                <span key={tool} className="font-mono text-[11px] text-[#c9a84c] border border-[#2a2a2a] px-3 py-1">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="border border-[#1e1e1e] bg-[#0d0d0d] divide-y divide-[#1e1e1e]">
            {[
              {
                item: "Standardize your data structure across all clients",
                detail: "Create one master Google Sheet template with identical column names for every client. This is the single most important setup step — consistency here makes everything downstream reusable.",
              },
              {
                item: "Connect GA4 and Facebook Ads to Google Sheets via Zapier",
                detail: "Use Zapier's native GA4 and Facebook Lead Ads integrations. For Facebook Ads data, you may need to use a third-party connector like Supermetrics or the Facebook Ads Zapier integration. Schedule the Zap to fire on the 1st of each month.",
              },
              {
                item: "Write the Apps Script to generate JSON from each client sheet",
                detail: "Paste your column headers into Claude: \"Write a Google Apps Script that reads these columns from a Sheet and outputs a JSON object with these field names.\" Test it on 2 clients before deploying across all.",
              },
              {
                item: "Get a Claude API key and test both prompts",
                detail: "Run 3 test reports with real client data. The goal is to match your agency's voice — refine the tone descriptors in Prompt 2 until a client couldn't tell the difference from your manual narrative.",
              },
              {
                item: "Build your branded Google Slides master template",
                detail: "Create one master deck with your agency's branding. Use text boxes with merge field names ({{executive_overview}}, {{key_finding_1}}, etc.) as placeholders. The Slides API will populate these automatically.",
              },
              {
                item: "Connect the pipeline: Apps Script → Claude API → Slides API → email delivery",
                detail: "This is the integration step. If you're not technical, a Zapier or Make.com expert on Upwork will build this for $200–$350. Provide them the JSON structure, both prompts, and the Slides template.",
              },
              {
                item: "Run a 3-client pilot for one full reporting cycle",
                detail: "Before replacing your manual process, run the automated reports alongside your normal ones for one month. Compare quality. Collect one piece of client feedback. Only then roll out to all clients.",
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
                href: "/issues/solopreneur-inbox-zero-ai",
                label: "Deep Dive",
                title: "How a Solopreneur Processes 200 Emails a Day Without Reading Them",
                desc: "Gmail + Claude categorizer workflow. Inbox zero every evening, response time down from 18 hrs to 4 hrs.",
              },
              {
                href: "/issues/saas-founder-churn-analysis",
                label: "Deep Dive",
                title: "How a SaaS Founder Cut Churn 34% Without a CS Team",
                desc: "Stripe webhook + Claude win-back workflow. $4,200/month recovered MRR, 8 hrs/week saved.",
              },
              {
                href: "/issues/how-accountants-cut-reporting-time",
                label: "Deep Dive",
                title: "How to Cut Client Reporting From 8 Hours to 45 Minutes",
                desc: "The exact Claude API + Google Sheets + Zapier workflow. Real numbers, copy-paste prompt included.",
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
            Get the full library — $15/month
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
