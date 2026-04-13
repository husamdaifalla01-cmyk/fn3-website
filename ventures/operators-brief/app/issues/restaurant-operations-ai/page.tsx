import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Restaurant That Used AI to Cut Labor Cost 18% | Operators Brief",
  description:
    "A 12-person restaurant used AI demand forecasting, staff scheduling optimization, and coverage automation to cut labor costs 18% — saving $3,400/month. Full workflow inside.",
  keywords: [
    "restaurant AI scheduling",
    "restaurant labor cost reduction",
    "AI demand forecasting restaurant",
    "staff scheduling optimization AI",
    "restaurant operations AI",
    "cut labor costs restaurant",
  ],
  alternates: {
    canonical: "https://operators-brief.vercel.app/issues/restaurant-operations-ai",
  },
  openGraph: {
    title: "The Restaurant That Used AI to Cut Labor Cost 18% | Operators Brief",
    description:
      "Staff scheduling → demand forecasting → coverage optimization. Saves $3,400/month in a 12-person restaurant. Full workflow and exact prompt included.",
    type: "article",
    url: "https://operators-brief.vercel.app/issues/restaurant-operations-ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurant Cut Labor Cost 18% With AI Scheduling — $3,400/Month Saved",
    description:
      "AI demand forecasting + schedule optimization for a 12-person restaurant. Full workflow, tools, and copy-paste prompt. Free from Operators Brief.",
  },
};

export default function RestaurantOperationsAIPage() {
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
          <span className="font-mono text-[11px] text-[#5a5550]">Restaurants / Operations</span>
          <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
          <span className="font-mono text-[11px] text-[#5a5550]">March 2026</span>
          <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
          <span className="font-mono text-[11px] text-[#5a5550]">10-min read</span>
        </div>

        {/* Title */}
        <h1 className="text-[32px] md:text-[44px] font-light leading-[1.1] tracking-tight text-[#f0ede8] mb-5">
          The Restaurant That Used AI to Manage Scheduling and Cut Labor Cost 18%
        </h1>

        <p className="text-[18px] text-[#9a9590] leading-relaxed mb-12 border-l-2 border-[#c9a84c] pl-5">
          A 12-person independent restaurant was spending 5 hours a week on scheduling — and still overstaffing Tuesdays and getting slammed on Friday nights. Here's the exact workflow they built to fix both.
        </p>

        <div className="w-full h-px bg-[#1e1e1e] mb-12" />

        {/* The Numbers */}
        <div className="mb-14">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-6">
            The Numbers
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Labor cost reduction", value: "18%", sub: "month-over-month" },
              { label: "Monthly savings", value: "$3,400", sub: "on a $19K labor budget" },
              { label: "Scheduling time saved", value: "4 hrs/wk", sub: "owner gets it back" },
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
            Scheduling by gut feel was costing $3,400/month
          </h2>
          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            The owner of a 12-staff Italian restaurant in a mid-sized city was writing the weekly schedule every Sunday morning — 4 to 5 hours of cross-referencing availability, predicting covers, and trying to match staffing to demand. He'd been doing it for 9 years.
          </p>
          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            The problem: his predictions were based on memory and rough seasonal patterns. He was consistently over-scheduling mid-week — paying 3 servers for a Tuesday that only needed 1.5 — and under-staffing Fridays, which meant slower table turns, worse service scores, and tips that drove turnover.
          </p>
          <p className="text-[15px] text-[#9a9590] leading-relaxed">
            Labor was his biggest controllable expense at ~30% of revenue. A 3-point improvement — from 30% to 27% — would net $3,400/month at his volume. He didn't need a labor scheduling platform at $500/month. He needed a workflow.
          </p>
        </div>

        {/* The Workflow */}
        <div className="mb-14">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-5">
            The Workflow — 3 Steps
          </div>
          <h2 className="text-[22px] font-light text-[#f0ede8] mb-8">
            Historical data → AI demand forecast → optimized schedule draft
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="border border-[#1e1e1e] bg-[#0d0d0d]">
              <div className="border-b border-[#1e1e1e] px-5 py-3 flex items-center gap-3">
                <span className="font-mono text-[11px] text-[#c9a84c]">Step 01</span>
                <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
                <span className="text-[13px] text-[#f0ede8]">Pull historical covers and revenue — POS export</span>
              </div>
              <div className="p-5">
                <p className="text-[14px] text-[#9a9590] leading-relaxed mb-3">
                  Every Sunday, a 2-minute POS export (the restaurant uses Toast) pulls covers and revenue by day and hour for the past 12 weeks. The file is a simple CSV — date, covers, revenue, day of week. No cleanup needed.
                </p>
                <p className="text-[14px] text-[#9a9590] leading-relaxed">
                  The owner also notes any upcoming local events (sports games, concerts, school breaks) in a simple running text note.
                </p>
                <div className="font-mono text-[11px] text-[#5a5550] mt-3">
                  Tool: Toast POS export. Alternative: any POS with CSV export (Square, Lightspeed, Revel).
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="border border-[#1e1e1e] bg-[#0d0d0d]">
              <div className="border-b border-[#1e1e1e] px-5 py-3 flex items-center gap-3">
                <span className="font-mono text-[11px] text-[#c9a84c]">Step 02</span>
                <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
                <span className="text-[13px] text-[#f0ede8]">AI demand forecast — Claude analyzes the CSV</span>
              </div>
              <div className="p-5">
                <p className="text-[14px] text-[#9a9590] leading-relaxed mb-3">
                  The CSV and the upcoming events note are pasted into Claude using the prompt below. Claude analyzes the trailing 12-week pattern, identifies day-of-week seasonality, and outputs a predicted covers range for each day of the coming week — with a confidence note and a recommended staffing level for each shift.
                </p>
                <p className="text-[14px] text-[#9a9590] leading-relaxed">
                  The output takes about 45 seconds to generate and runs inside Claude.ai — no API or technical setup required.
                </p>
                <div className="font-mono text-[11px] text-[#5a5550] mt-3">
                  Tool: Claude.ai (Pro tier, $20/mo). Could be Claude API + Zapier for full automation.
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="border border-[#1e1e1e] bg-[#0d0d0d]">
              <div className="border-b border-[#1e1e1e] px-5 py-3 flex items-center gap-3">
                <span className="font-mono text-[11px] text-[#c9a84c]">Step 03</span>
                <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
                <span className="text-[13px] text-[#f0ede8]">Coverage optimization — schedule draft in 15 minutes</span>
              </div>
              <div className="p-5">
                <p className="text-[14px] text-[#9a9590] leading-relaxed mb-3">
                  With the forecast in hand, the owner pastes staff availability (collected via a WhatsApp poll each Thursday) and asks Claude to generate an optimized schedule draft. Claude maps available staff to forecasted demand shifts, flags under-coverage, and outputs a shift-by-shift roster.
                </p>
                <p className="text-[14px] text-[#9a9590] leading-relaxed">
                  The owner spends 15 minutes reviewing and making final adjustments — down from 4–5 hours. The approved schedule goes to staff via 7shifts (free tier) or WhatsApp group.
                </p>
                <div className="font-mono text-[11px] text-[#5a5550] mt-3">
                  Tools: Claude.ai + 7shifts (free) or any shift-sharing method.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tool stack */}
        <div className="mb-14">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-5">
            Full Tool Stack
          </div>
          <div className="border border-[#1e1e1e] bg-[#0d0d0d] divide-y divide-[#1e1e1e]">
            {[
              { tool: "Toast POS", role: "Historical covers + revenue export", cost: "Existing" },
              { tool: "Claude.ai Pro", role: "Demand forecasting + schedule optimization", cost: "$20/mo" },
              { tool: "7shifts (free)", role: "Schedule distribution to staff", cost: "Free" },
              { tool: "Google Sheets", role: "Staff availability tracking", cost: "Free" },
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
              <span className="font-mono text-[11px] text-[#c9a84c] uppercase tracking-wider">Net new monthly cost</span>
              <span className="font-mono text-[13px] text-[#c9a84c]">$20/mo</span>
            </div>
          </div>
        </div>

        {/* The Prompt */}
        <div className="mb-14">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-5">
            The Exact Prompts
          </div>

          <p className="text-[14px] text-[#9a9590] leading-relaxed mb-5">
            Two prompts — one for the demand forecast, one for the schedule draft. Run them in sequence.
          </p>

          {/* Prompt 1 */}
          <div className="border border-[#1e1e1e] bg-[#070707] p-5 mb-4">
            <div className="font-mono text-[11px] text-[#5a5550] uppercase tracking-wider mb-4">
              Prompt 1 — Demand forecast
            </div>
            <pre className="font-mono text-[12px] text-[#9a9590] leading-relaxed whitespace-pre-wrap">
{`You are a restaurant operations analyst. Below is 12 weeks
of daily cover counts and revenue from our POS system.

POS DATA (CSV):
[PASTE CSV HERE]

UPCOMING EVENTS NEXT WEEK:
[PASTE NOTES HERE — e.g. "Saturday: home game at nearby stadium"]

Your task:
1. Identify the day-of-week pattern for covers over the
   last 12 weeks (Mon-Sun averages, with range).
2. Factor in any upcoming events that might affect demand.
3. For each day of the coming week (Monday [DATE] through
   Sunday [DATE]), forecast: expected covers (low / mid / high),
   and recommended front-of-house staff count for lunch
   and dinner shifts.
4. Flag any days with unusually high uncertainty.
5. Format as a clean table I can use to build a schedule.`}
            </pre>
          </div>

          {/* Prompt 2 */}
          <div className="border border-[#1e1e1e] bg-[#070707] p-5">
            <div className="font-mono text-[11px] text-[#5a5550] uppercase tracking-wider mb-4">
              Prompt 2 — Schedule draft
            </div>
            <pre className="font-mono text-[12px] text-[#9a9590] leading-relaxed whitespace-pre-wrap">
{`Here is staff availability for next week and the demand
forecast you just generated.

STAFF AVAILABILITY:
[PASTE AVAILABILITY FROM GOOGLE SHEET OR WHATSAPP POLL]

DEMAND FORECAST:
[PASTE OUTPUT FROM PROMPT 1]

STAFFING RULES:
- Lunch shift: 11am–3pm. Dinner shift: 4pm–10pm.
- Minimum 1 server per 15 covers expected.
- Always schedule 1 senior server on Friday + Saturday dinner.
- Max 2 doubles per employee per week.

Draft a schedule for the week. For each shift, list:
which staff member is assigned, their role, and total hours.
Flag any coverage gaps. Output as a plain text table.`}
            </pre>
          </div>
          <p className="text-[12px] text-[#5a5550] mt-3 font-mono">
            Adapt the staffing rules to your own ratios and constraints.
          </p>
        </div>

        {/* Results */}
        <div className="mb-14">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c] mb-5">
            Results — 60 Days In
          </div>
          <div className="space-y-4">
            {[
              { metric: "Labor cost as % of revenue", before: "30.4%", after: "24.9%", delta: "−18%" },
              { metric: "Monthly labor savings", before: "—", after: "$3,400/mo", delta: "+$40,800/yr" },
              { metric: "Owner schedule prep time", before: "4–5 hrs/week", after: "~45 min/week", delta: "−87%" },
              { metric: "Understaffed shifts (owner estimate)", before: "3–4/month", after: "0–1/month", delta: "−75%" },
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
            Full access from day one. Every issue: exact workflow, tool stack, real numbers, copy-paste prompts. New issue every Tuesday.
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
            <a href="/issues/law-firm-ai-billing" className="flex items-center justify-between group">
              <span className="text-[13px] text-[#9a9590] group-hover:text-[#f0ede8] transition-colors">
                How a 3-Attorney Firm Automated Client Billing With AI
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
