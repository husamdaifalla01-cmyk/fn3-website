import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How a Solopreneur Processes 200 Emails a Day Without Reading Them | Operators Brief",
  description:
    "Consultants and freelancers: the exact Gmail + Claude API triage workflow that handles 200 emails/day automatically — inbox zero every evening, response time from 18 hrs to 4 hrs.",
  keywords: [
    "solopreneur email automation",
    "Gmail AI workflow",
    "Claude API email triage",
    "inbox zero automation",
    "freelancer productivity AI",
    "email automation consultant",
  ],
  alternates: {
    canonical: "https://operators-brief.vercel.app/issues/solopreneur-inbox-zero-ai",
  },
  openGraph: {
    title: "How a Solopreneur Processes 200 Emails a Day Without Reading Them | Operators Brief",
    description:
      "Gmail + Claude categorizer workflow. Saves 1.5 hrs/day. Inbox zero every evening. Response time from 18 hrs to 4 hrs. Exact system prompt included. Free deep-dive.",
    type: "article",
    url: "https://operators-brief.vercel.app/issues/solopreneur-inbox-zero-ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "200 Emails/Day Without Reading Them — Solopreneur AI Workflow",
    description:
      "Gmail + Claude triage workflow. 1.5 hrs/day saved. Inbox zero every evening. Response time cut 78%. Exact prompt inside. Free from Operators Brief.",
  },
};

export default function SolopreneurInboxZeroPage() {
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
          <span className="font-mono text-[11px] text-[#5a5550]">Solopreneur / Freelancer</span>
          <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
          <span className="font-mono text-[11px] text-[#5a5550]">9-min read</span>
        </div>

        {/* Title */}
        <h1 className="text-[32px] md:text-[44px] font-light leading-[1.1] tracking-tight text-[#f0ede8] mb-5">
          How a Solopreneur Processes 200 Emails a Day Without Reading Them
        </h1>

        <p className="text-[18px] text-[#9a9590] leading-relaxed mb-12 border-l-2 border-[#c9a84c] pl-5">
          A 200-email-a-day inbox was costing 1.5 hours every single day — and the average response time was 18 hours. Here's the exact Gmail + Claude triage system that sorts, drafts, archives, and escalates every email automatically, with the full system prompt and category definitions.
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
            Email is the solopreneur's most expensive overhead
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            At 200 emails a day, the inbox is a full-time job embedded inside your actual job. Most of those emails don't require a response. Many require the same response. A handful actually matter. But you can't know which is which without reading all of them — and reading 200 emails takes 90 minutes whether or not any of them were worth your time.
          </p>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            The real cost isn't just the time. It's the context-switching. Every time you open your inbox, you're inviting the world's priorities into your workday. A question from a vendor pulls you out of a deliverable. A newsletter triggers a tangent. A cold pitch gets skimmed for 45 seconds. And by the time you're done, you've lost the thread.
          </p>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            The pattern for solopreneurs and consultants is almost universal: check email first thing, then at lunch, then before leaving, then again before bed. Four context-switches a day. 1.5 hours minimum. And the inbox is still unmanageable by Friday.
          </p>

          <div className="bg-[#0d0d0d] border border-[#1e1e1e] p-5 my-8">
            <p className="text-[13px] font-mono text-[#5a5550] mb-2 uppercase tracking-wider">The real cost:</p>
            <p className="text-[15px] text-[#f0ede8]">
              1.5 hrs/day × 250 working days = <span className="text-[#c9a84c]">375 hours/year on email.</span> At $200/hr, that's $75,000 of billable capacity going directly into your inbox.
            </p>
          </div>

          <p className="text-[15px] text-[#9a9590] leading-relaxed">
            The triage system below doesn't mean you stop reading email. It means you only read the emails that require your judgment — and you respond to everything else automatically, faster than you ever could manually.
          </p>
        </section>

        {/* Section 02 */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">02</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">The Workflow</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            Gmail → Claude categorizer → auto-reply/draft/archive/escalate
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-6">
            Every incoming email is routed through Claude for classification before you ever see it. Based on the category, one of four things happens automatically: auto-reply sent, draft staged for your review, email archived with label, or email escalated to your priority inbox.
          </p>

          {/* Category table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full border border-[#1e1e1e] text-[13px]">
              <thead>
                <tr className="border-b border-[#1e1e1e] bg-[#0d0d0d]">
                  <th className="text-left px-4 py-3 font-mono text-[11px] text-[#5a5550] uppercase tracking-wider">Category</th>
                  <th className="text-left px-4 py-3 font-mono text-[11px] text-[#5a5550] uppercase tracking-wider">Definition</th>
                  <th className="text-left px-4 py-3 font-mono text-[11px] text-[#c9a84c] uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e1e]">
                {[
                  ["Client Urgent", "Time-sensitive client request, blocker, or question needing same-day response", "Escalate to priority inbox + push notification"],
                  ["Client Non-Urgent", "Client update, FYI, or question that can wait 24 hrs", "Draft reply staged for review"],
                  ["Vendor", "Invoices, service updates, renewal notices, supplier communication", "Archive with label — weekly review"],
                  ["Newsletter", "Any subscription, digest, or content email not requiring action", "Archive immediately, no label"],
                  ["Invoice", "Payment confirmations, receipts, billing statements", "Archive with label + forward to bookkeeping folder"],
                  ["Cold Outreach", "Unsolicited pitches, partnership offers, intro requests", "Auto-reply + archive"],
                ].map(([cat, def, action]) => (
                  <tr key={cat} className="hover:bg-[#0d0d0d] transition-colors">
                    <td className="px-4 py-3 text-[#c9a84c] font-mono text-[12px] whitespace-nowrap">{cat}</td>
                    <td className="px-4 py-3 text-[#9a9590]">{def}</td>
                    <td className="px-4 py-3 text-[#f0ede8] text-[12px]">{action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[14px] text-[#f0ede8] mb-5 font-medium">How the pipeline is built:</p>

          {[
            {
              step: "Step 1",
              title: "Gmail → Zapier trigger on every new email",
              tool: "Zapier",
              detail:
                "A Zap triggers on every new email received. It captures sender, subject, first 1,000 characters of body, and any existing labels. This payload is passed to Claude for classification. The Zap runs in near-real-time — typically within 1–2 minutes of receipt.",
            },
            {
              step: "Step 2",
              title: "Payload → Claude API for classification + draft generation",
              tool: "Claude API",
              detail:
                "Claude receives the email payload and returns two things: (1) the category from the six-category taxonomy, and (2) a draft reply if the category requires one. For Client Non-Urgent, it writes a courteous, specific draft in your voice. For Cold Outreach, it writes a short, polite decline. For other categories, it returns only the classification.",
            },
            {
              step: "Step 3",
              title: "Classification → action routing",
              tool: "Zapier (conditional paths)",
              detail:
                "Based on Claude's classification, the Zap follows one of four paths: escalate (add to priority label + send push notification via Pushover), draft (create Gmail draft for your review), archive (apply label, mark as read, move out of inbox), or auto-reply (send pre-written response + archive). No email sits unhandled.",
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

        {/* Section 03: Before/After */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">03</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">Before vs. After</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            What 60 days of triage actually looks like
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
                  ["Time in inbox per day", "1.5 hrs", "20 min", "−78%"],
                  ["Average response time", "18 hrs", "4 hrs", "−78%"],
                  ["Emails requiring manual read", "200/day", "~30/day", "−85%"],
                  ["Inbox zero days per week", "0", "5", "—"],
                  ["Client escalations missed", "~2–3/week", "0", "−100%"],
                  ["Auto-replies sent/day", "0", "~45", "+45"],
                  ["API + Zapier cost/month", "$0", "$28/mo", "—"],
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
              { label: "Time saved/day", value: "70 min" },
              { label: "Response time", value: "4 hrs" },
              { label: "Emails auto-handled", value: "85%" },
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
            The email triage system prompt — copy-paste ready
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-6">
            This is a single system prompt. The user message is the raw email payload (sender, subject, body). The model returns a structured JSON response used by Zapier to route the email. Customize the bracketed fields and cold outreach reply to match your voice.
          </p>

          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-8 bg-[#0d0d0d] border border-[#1e1e1e] border-b-0 flex items-center px-4 gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="ml-auto font-mono text-[10px] text-[#5a5550]">SYSTEM PROMPT — Claude API</span>
            </div>
            <pre className="mt-8 bg-[#0a0a0a] border border-[#1e1e1e] p-5 text-[12px] text-[#9a9590] leading-relaxed overflow-x-auto whitespace-pre-wrap font-mono">
{`You are an email triage assistant for [YOUR NAME], a [YOUR ROLE —
e.g., independent marketing consultant / freelance developer / business coach].

You will receive an email payload: sender name, sender email, subject line,
and the first 1,000 characters of the body. Your job is to classify the email
into exactly one of the following categories and return a structured JSON response.

CATEGORIES:
- CLIENT_URGENT: Time-sensitive request, blocker, or decision from an active
  client. Requires same-day response.
- CLIENT_NON_URGENT: Update, question, or FYI from an active client that can
  wait up to 24 hours.
- VENDOR: Invoice, service update, renewal notice, or communication from a
  software provider, supplier, or service you use.
- NEWSLETTER: Any subscription, digest, or content email. No action required.
- INVOICE: Payment confirmation, receipt, or billing statement.
- COLD_OUTREACH: Unsolicited pitch, partnership offer, or intro request from
  someone [YOUR NAME] has no existing relationship with.

OUTPUT — return only valid JSON in this exact format:
{
  "category": "[CATEGORY]",
  "confidence": "[HIGH / MEDIUM / LOW]",
  "reason": "[One sentence explaining classification]",
  "draft_reply": "[Draft reply text, or null if no reply needed]",
  "subject_line": "[Reply subject line, or null]",
  "priority_flag": true/false
}

REPLY RULES:
- CLIENT_URGENT: priority_flag = true, draft_reply = null (escalate to human)
- CLIENT_NON_URGENT: Write a professional, warm draft reply in [YOUR NAME]'s
  voice. Acknowledge the email, address the question if answerable, and set
  a clear next step. 3–5 sentences max.
- VENDOR: draft_reply = null
- NEWSLETTER: draft_reply = null
- INVOICE: draft_reply = null
- COLD_OUTREACH: draft_reply = "Thanks for reaching out. I'm not taking on
  [new partnerships / advisory calls / vendor conversations] right now, but I
  appreciate you thinking of me. Best of luck with [reference their project/
  company if mentioned]." — customize this to your voice.

CLASSIFICATION RULES:
- When in doubt between CLIENT_URGENT and CLIENT_NON_URGENT, choose URGENT.
  Missing an urgent client email is worse than over-escalating.
- An email from a known client domain is not automatically CLIENT_URGENT.
  Read the content, not just the sender.
- Newsletters with "unsubscribe" in footer = NEWSLETTER, regardless of sender.
- If confidence is LOW, set priority_flag = true so the human reviews it.

[YOUR NAME]'s active client domains: [list 3–5 domains, e.g. acmecorp.com,
brightside.io, etc. — helps with classification accuracy]`}
            </pre>
          </div>

          <p className="text-[13px] text-[#5a5550] mt-4 leading-relaxed">
            At ~350 input tokens + ~200 output tokens per email, this runs approximately $0.001/email at claude-3-5-sonnet pricing. At 200 emails/day, that's $0.20/day — about $6/month in API costs. Add Zapier's cost and the total is under $30/month.
          </p>
        </section>

        {/* Section 05: Setup notes */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">05</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">Setup Notes</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            Three things that determine whether this works
          </h2>

          <div className="space-y-4">
            {[
              {
                title: "Start with your client list in the prompt",
                body: "The single biggest improvement to classification accuracy is listing your active client email domains in the system prompt. Without it, the model classifies by tone alone — with it, it classifies by relationship. Add your top 5–10 clients.",
              },
              {
                title: "Tune confidence thresholds before going live",
                body: "Run the system in monitor mode for one week before letting auto-replies go out. Have every email routed to a review queue. Audit the LOW and MEDIUM confidence classifications. Adjust the system prompt based on what's miscategorized.",
              },
              {
                title: "The cold outreach reply needs to be yours",
                body: "The default cold outreach response in the prompt is intentionally generic. Rewrite it in your exact voice — the way you'd actually respond to an unsolicited pitch on a Tuesday afternoon. People can tell the difference between a polished template and something that sounds like you.",
              },
            ].map((note, i) => (
              <div key={i} className="border border-[#1e1e1e] bg-[#0d0d0d] p-5">
                <p className="text-[14px] text-[#f0ede8] font-medium mb-2">{note.title}</p>
                <p className="text-[13px] text-[#9a9590] leading-relaxed">{note.body}</p>
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
                href: "/issues/agency-owner-client-reporting",
                label: "Deep Dive",
                title: "How an Agency Cut Client Reporting Time From 6 Hours to 40 Minutes",
                desc: "Zapier + Claude API + Google Slides workflow. 90 hrs/month freed, $13,500 recovered capacity.",
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
