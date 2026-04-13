import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Realtor Who Qualified 200 Leads Without Answering a Single Call | Operators Brief",
  description:
    "Real estate agents: how one agent used CRM + AI lead scoring + automated follow-up to qualify 200 leads per month without a single manual call. Exact prompt included.",
  keywords: [
    "real estate AI workflow",
    "realtor lead qualification",
    "AI lead scoring real estate",
    "CRM automation real estate",
    "real estate agent AI tools",
    "automated follow-up sequence",
  ],
  alternates: {
    canonical: "https://operators-brief.vercel.app/issues/real-estate-lead-qualification-ai",
  },
  openGraph: {
    title: "The Realtor Who Qualified 200 Leads Without Answering a Single Call | Operators Brief",
    description:
      "CRM + AI qualification scoring + automated follow-up workflow for real estate agents. Copy-paste prompt, tool stack, and implementation timeline included.",
    type: "article",
    url: "https://operators-brief.vercel.app/issues/real-estate-lead-qualification-ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "200 Leads Qualified Without a Single Call — Real Estate AI Workflow",
    description:
      "The exact CRM + AI scoring workflow a solo realtor used to qualify 200 leads/month. Copy-paste prompt included. Free deep-dive from Operators Brief.",
  },
};

export default function RealEstatePage() {
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
          <span className="font-mono text-[11px] text-[#5a5550]">Real Estate</span>
          <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
          <span className="font-mono text-[11px] text-[#5a5550]">10-min read</span>
        </div>

        {/* Title */}
        <h1 className="text-[32px] md:text-[44px] font-light leading-[1.1] tracking-tight text-[#f0ede8] mb-5">
          The Realtor Who Qualified 200 Leads Without Answering a Single Call
        </h1>

        <p className="text-[18px] text-[#9a9590] leading-relaxed mb-12 border-l-2 border-[#c9a84c] pl-5">
          A solo agent in a high-volume market was drowning in inbound leads. Most weren't serious. Calling every one was burning 30+ hours a week. Here's the CRM + AI qualification workflow she built — and what came out the other side.
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
            200 leads a month. 12 hours a week just answering inquiry calls.
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            Sarah runs a solo real estate practice in the Phoenix metro. She spends about $4,500/month on lead generation across Zillow Premier Agent, Google Ads, and Facebook. On a good month, that produces 180–220 new inquiries. On a bad month, 90. Either way, the leads pour in.
          </p>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            The problem wasn't the volume. It was the qualification call. Every lead got a 10–15 minute call to determine whether they were pre-approved, actively searching, realistic about price, and actually ready to move in the next 60–90 days. Of 200 leads, roughly 14 were worth her full attention. The other 186 needed to be disqualified, nurtured, or handed off.
          </p>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            She was spending 12 hours every week on calls that produced 14 transactions-ready leads. The math was brutal: $320/hour of her time to produce a lead quality score she could have gotten another way.
          </p>

          <div className="bg-[#0d0d0d] border border-[#1e1e1e] p-5 my-8">
            <p className="text-[13px] font-mono text-[#5a5550] mb-2 uppercase tracking-wider">The inefficiency in numbers:</p>
            <p className="text-[15px] text-[#f0ede8]">
              200 leads × 12 min avg call = 40 hrs/month on qualification calls.<br />
              14 serious buyers found. <span className="text-[#c9a84c]">That's 2.8 hours per qualified lead — before a single showing.</span>
            </p>
          </div>

          <p className="text-[15px] text-[#9a9590] leading-relaxed">
            The goal wasn't to eliminate the human relationship. It was to stop spending 40 hours a month figuring out who deserved one.
          </p>
        </section>

        {/* Section 02: The Workflow */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">02</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">The Workflow</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            The 4-layer qualification system
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-8">
            This workflow runs inside Follow Up Boss (her CRM), uses Zapier for automation triggers, Claude API for scoring, and a pre-built email sequence for nurture. Setup time: about 3 weeks of part-time work, mostly configuring the CRM logic and prompt refinement.
          </p>

          {[
            {
              step: "Layer 1",
              title: "Lead intake + automatic data enrichment",
              tool: "Follow Up Boss + Clearbit/People Data Labs",
              detail:
                "Every new lead that enters the CRM is automatically enriched with available public data: LinkedIn presence, estimated income bracket (where available), neighborhood signals from their search behavior on Zillow. Zapier pulls what it can and adds it to the contact record as custom fields. This takes 90 seconds per lead and requires no manual input. Enrichment data quality is imperfect — but even partial signals improve the AI score meaningfully.",
            },
            {
              step: "Layer 2",
              title: "Automated text + email intake sequence",
              tool: "Follow Up Boss drip + Twilio",
              detail:
                "Within 90 seconds of a new lead entering, they receive a personalized text: \"Hi [Name], it's Sarah — I saw you were looking at homes in [Area]. Quick question: are you working with a lender yet, or still in the early research phase?\" Responses feed back into the CRM. Leads who respond within 2 hours are flagged; leads who don't respond in 24 hours enter a 5-email nurture sequence. The text response data is the single highest-signal input for the AI scoring step.",
            },
            {
              step: "Layer 3",
              title: "AI lead qualification scoring",
              tool: "Claude API — lead scoring prompt",
              detail:
                "Once a lead has either responded to the intake text or completed the nurture sequence, Zapier sends their full contact record (enrichment data + response text + search behavior from the CRM) to Claude. Claude returns a 1–10 qualification score and a one-sentence rationale. Scores are written back to the CRM as a custom field. Leads scoring 7+ get a calendar booking link from Sarah immediately. Leads scoring 4–6 enter a longer nurture sequence. Leads scoring 1–3 are tagged for quarterly re-engagement only.",
            },
            {
              step: "Layer 4",
              title: "Automated follow-up based on score",
              tool: "Follow Up Boss smart lists + Zapier",
              detail:
                "Each score tier triggers a different follow-up track. 7–10: Sarah gets an SMS alert with the lead's score and rationale, and they receive a booking link within 4 minutes of scoring. 4–6: 12-email sequence over 90 days, increasingly specific to their search criteria, with a re-score trigger if they click any listing link. 1–3: Monthly market update email only, with a re-qualification trigger at 90 days. No manual steps required for tiers 2 and 3.",
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

        {/* Section 03: Lead Scoring Prompt */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">03</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">The Prompt</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            The exact lead scoring prompt — copy-paste ready
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-6">
            This is the full system prompt. The user message is a JSON object containing the lead's CRM data. Adjust the scoring criteria and market details to match your practice.
          </p>

          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-8 bg-[#0d0d0d] border border-[#1e1e1e] border-b-0 flex items-center px-4 gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="ml-auto font-mono text-[10px] text-[#5a5550]">SYSTEM PROMPT — Lead Scoring</span>
            </div>
            <pre className="mt-8 bg-[#0a0a0a] border border-[#1e1e1e] p-5 text-[12px] text-[#9a9590] leading-relaxed overflow-x-auto whitespace-pre-wrap font-mono">
{`You are a lead qualification assistant for [AGENT NAME], a real estate agent
specializing in [MARKET — e.g., Phoenix metro, $400K–$800K price range,
primary residences and move-up buyers].

You will receive a JSON object containing data about a new lead: their contact
info, CRM data, search behavior, any enrichment data, and their response to
the intake text message (if available).

Your task: score this lead from 1–10 based on their likelihood of transacting
in the next 90 days and their fit for this agent's practice.

SCORING CRITERIA:
- 8–10: Pre-approved or cash, actively searching, realistic price range,
  responsive, searching in agent's core markets. Needs immediate attention.
- 5–7: Some positive signals but incomplete picture. Pre-approval not
  confirmed, timeline vague, or price expectations uncertain.
- 2–4: Early research, unrealistic expectations, or signals of low intent
  (browsing Zillow for 6+ months with no engagement increase).
- 1: No response, invalid contact, or clearly not in buying stage.

OUTPUT — return exactly two fields, nothing else:

SCORE: [number 1–10]

RATIONALE: [One sentence explaining the top factor driving this score.
Be specific. Reference actual data points from the JSON, not generalities.
Example: "Pre-approved at $620K, actively searching for 3 weeks, responded
to intake text within 8 minutes asking about a specific listing."]

RULES:
- If intake text response is available, weight it heavily — it is the
  highest-signal data point
- Do not penalize leads for being early-stage if all other signals are strong
- If critical data is missing (no pre-approval data, no timeline), note this
  in rationale and score conservatively
- Never fabricate data points not present in the JSON`}
            </pre>
          </div>

          <p className="text-[13px] text-[#5a5550] mt-4 leading-relaxed">
            Each scoring call uses roughly 600–800 input tokens (the lead data JSON) and 80–100 output tokens. At claude-3-5-sonnet pricing, that's about $0.007 per lead. For 200 leads/month: $1.40. The API cost is irrelevant relative to the time saved.
          </p>
        </section>

        {/* Section 04: Tool Stack */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">04</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">Tool Stack + Timeline</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            What it costs to run this and how long setup takes
          </h2>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border border-[#1e1e1e] text-[13px]">
              <thead>
                <tr className="border-b border-[#1e1e1e] bg-[#0d0d0d]">
                  <th className="text-left px-4 py-3 font-mono text-[11px] text-[#5a5550] uppercase tracking-wider">Tool</th>
                  <th className="text-left px-4 py-3 font-mono text-[11px] text-[#5a5550] uppercase tracking-wider">Purpose</th>
                  <th className="text-right px-4 py-3 font-mono text-[11px] text-[#5a5550] uppercase tracking-wider">Cost/mo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e1e]">
                {[
                  ["Follow Up Boss", "CRM, smart lists, drip sequences", "$69"],
                  ["Zapier (Professional)", "Automation triggers + webhooks", "$49"],
                  ["Twilio", "SMS intake + follow-up texts", "~$18"],
                  ["Claude API", "Lead scoring (200 leads/mo)", "$1.40"],
                  ["Clearbit (enrichment)", "Contact data enrichment", "$99"],
                  ["Total", "", "$236/mo"],
                ].map(([tool, purpose, cost], i) => (
                  <tr
                    key={i}
                    className={`hover:bg-[#0d0d0d] transition-colors ${tool === "Total" ? "border-t border-[#2a2a2a]" : ""}`}
                  >
                    <td className={`px-4 py-3 ${tool === "Total" ? "text-[#f0ede8] font-medium" : "text-[#9a9590]"}`}>{tool}</td>
                    <td className="px-4 py-3 text-[#5a5550]">{purpose}</td>
                    <td className={`px-4 py-3 text-right font-mono ${tool === "Total" ? "text-[#c9a84c] font-medium" : "text-[#9a9590]"}`}>{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-[18px] font-light text-[#f0ede8] mb-5">Implementation timeline (part-time, ~10 hrs/week)</h3>

          <div className="space-y-3">
            {[
              { week: "Week 1", task: "CRM audit + intake sequence setup", detail: "Clean your CRM, set up the intake text trigger in Follow Up Boss, connect Twilio. Build the 5-email nurture sequence for non-responders." },
              { week: "Week 2", task: "Data enrichment + Zapier automation", detail: "Connect your enrichment tool. Build the Zap that fires on new lead creation, pulls enrichment data, and writes custom fields back to the CRM." },
              { week: "Week 3", task: "Claude scoring integration + score-based routing", detail: "Connect the scoring Zap (CRM data → Claude API → score back to CRM). Build smart lists by score tier. Set up tier-specific follow-up tracks. Test with 10 real leads." },
            ].map((item) => (
              <div key={item.week} className="border border-[#1e1e1e] bg-[#0d0d0d] p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[11px] text-[#c9a84c] uppercase tracking-wider">{item.week}</span>
                  <span className="text-[14px] font-medium text-[#f0ede8]">{item.task}</span>
                </div>
                <p className="text-[13px] text-[#9a9590] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 05: Results */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">05</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">Results — Month 3</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            What the numbers looked like 90 days in
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Qualification calls/month", value: "0" },
              { label: "Hours saved/month on intake", value: "38 hrs" },
              { label: "Qualified leads (7+) identified", value: "16/mo" },
              { label: "Conversion rate (lead → close)", value: "7.8%" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#0d0d0d] border border-[#1e1e1e] p-5 text-center">
                <div className="font-mono text-[28px] text-[#c9a84c] leading-none mb-2">{stat.value}</div>
                <div className="text-[11px] text-[#5a5550] font-mono uppercase tracking-wider leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            The unexpected win: the AI scores surfaced two lead segments she hadn't been prioritizing — move-down buyers downsizing from larger homes (consistently scored 7–8, high close rate) and out-of-state relocations (often dismissed in qualification calls because they "weren't serious yet," but closed at 2× the rate of local leads once properly nurtured).
          </p>
          <p className="text-[15px] text-[#9a9590] leading-relaxed">
            She also found that leads scoring 4–6 who were placed in the 90-day nurture sequence converted at 11% — better than her previous rate for leads she had personally qualified. The system was better at patience than she was.
          </p>
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
                href: "/issues/customer-service-ai-ecommerce",
                label: "Deep Dive",
                title: "How a 2-Person DTC Brand Cut Support Costs by 67%",
                desc: "Automated resolution flows with Gorgias + Claude API — 74% of tickets resolved without human touch.",
              },
              {
                href: "/issues/how-accountants-cut-reporting-time",
                label: "Deep Dive",
                title: "How to Cut Client Reporting From 8 Hours to 45 Minutes",
                desc: "Claude API + Google Sheets + Zapier workflow for accountants and bookkeepers. Exact prompt included.",
              },
              {
                href: "/issues/sample",
                label: "Issue #01",
                title: "How One CPA Firm 3x'd Revenue Per Partner Without Hiring",
                desc: "A 4-step reporting automation that freed 305 hours/month and tripled client capacity.",
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
            51 more workflows like this — $15/month
          </div>
          <h3 className="text-[24px] md:text-[30px] font-light text-[#f0ede8] mb-3 leading-snug">
            Every Tuesday: one deep-dive, real numbers, exact tools.
          </h3>
          <p className="text-[14px] text-[#9a9590] mb-6 max-w-md mx-auto leading-relaxed">
            Join 2,847 operators getting one implementable AI workflow per week. Full archive from day one. Cancel any time.
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
