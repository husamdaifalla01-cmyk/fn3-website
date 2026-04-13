import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How a 2-Person DTC Brand Cut Support Costs by 67% Without Losing Customers | Operators Brief",
  description:
    "E-commerce operators: how a 2-person DTC brand used Gorgias + Claude API to cut support costs 67% while keeping CSAT at 4.6. Exact system prompt and escalation triggers included.",
  keywords: [
    "ecommerce customer service AI",
    "DTC support automation",
    "Gorgias Claude API",
    "Zendesk AI workflow",
    "ecommerce AI tools",
    "customer support automation ecommerce",
  ],
  alternates: {
    canonical: "https://operators-brief.vercel.app/issues/customer-service-ai-ecommerce",
  },
  openGraph: {
    title: "How a 2-Person DTC Brand Cut Support Costs by 67% | Operators Brief",
    description:
      "Gorgias + Claude API automated resolution workflow for e-commerce. Resolution rate benchmarks, exact system prompt, and escalation triggers. Free deep-dive.",
    type: "article",
    url: "https://operators-brief.vercel.app/issues/customer-service-ai-ecommerce",
  },
  twitter: {
    card: "summary_large_image",
    title: "67% Support Cost Cut — DTC Brand AI Workflow",
    description:
      "How a 2-person e-commerce team used Gorgias + Claude API to automate support. System prompt, escalation triggers, and benchmarks included. Free from Operators Brief.",
  },
};

export default function EcommerceCustomerServicePage() {
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
          <span className="font-mono text-[11px] text-[#5a5550]">E-Commerce / DTC</span>
          <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
          <span className="font-mono text-[11px] text-[#5a5550]">10-min read</span>
        </div>

        {/* Title */}
        <h1 className="text-[32px] md:text-[44px] font-light leading-[1.1] tracking-tight text-[#f0ede8] mb-5">
          How a 2-Person DTC Brand Cut Support Costs by 67% Without Losing Customers
        </h1>

        <p className="text-[18px] text-[#9a9590] leading-relaxed mb-12 border-l-2 border-[#c9a84c] pl-5">
          A two-person skincare brand was spending $11,000/month on a 3-person support team to handle 1,200 tickets. Here's the Gorgias + Claude API workflow that resolved 74% of those tickets automatically — while CSAT went up.
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
            1,200 tickets/month. 3 support agents. $11K/month. And CSAT still at 3.9.
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            Evergreen Skin Co. is a bootstrapped skincare brand doing $2.1M ARR with two founders and a small remote team. Their Shopify store generates 1,200 support tickets a month — about 40 a day. To handle that volume, they had three part-time support agents totaling $11,200/month in labor.
          </p>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            The bigger problem: their CSAT sat at 3.9/5. Not because the agents were bad — they weren't. It was because 78% of tickets were asking the same 11 questions: Where's my order? Can I exchange this shade? What's in this serum? How do I apply the moisturizer with my retinol? The agents were answering these on a loop, getting bored, and slipping on response consistency.
          </p>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            The founders were also fielding escalations: refund requests, ingredient allergy concerns, and influencer partnership DMs — all in the same inbox. No routing, no prioritization, no triage.
          </p>

          <div className="bg-[#0d0d0d] border border-[#1e1e1e] p-5 my-8">
            <p className="text-[13px] font-mono text-[#5a5550] mb-2 uppercase tracking-wider">The ticket breakdown:</p>
            <p className="text-[15px] text-[#f0ede8]">
              Of 1,200 monthly tickets: 936 (78%) were FAQ-type questions answerable without human judgment.<br />
              264 (22%) needed real human involvement: refunds, complaints, complex issues.<br />
              <span className="text-[#c9a84c]">$11K/month spent handling tickets that didn't require human agents.</span>
            </p>
          </div>
        </section>

        {/* Section 02: Workflow */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">02</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">The Workflow</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            The 3-tier resolution system
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-8">
            They built this inside Gorgias using native automations + Claude API via webhook. No custom code required for the core flow. Total setup time: 11 days. One founder handled the Gorgias configuration; a Zapier-connected Claude API integration handled the response generation.
          </p>

          {[
            {
              tier: "Tier 1",
              title: "Instant auto-resolution — FAQ responses",
              tool: "Gorgias Rules + Claude API",
              detail:
                "Incoming tickets are classified by Gorgias's built-in intent detection. Tickets tagged as order-status, product-info, ingredients, usage-instructions, or shipping-timeline are passed immediately to Claude with the customer's order data (pulled from Shopify via Gorgias integration) and the full product knowledge base. Claude generates a personalized response. The response is sent automatically; the ticket is closed. No human ever sees it unless the customer replies unhappy. Tier 1 handles 74% of all tickets.",
            },
            {
              tier: "Tier 2",
              title: "Drafted response — human review before send",
              tool: "Gorgias + Claude API + agent queue",
              detail:
                "Tickets tagged as exchange-request, complaint, or subscription-issue are sent to Claude for a draft response with recommended action. Claude drafts the reply and flags it: \"Recommended: approve exchange for shade mismatch, standard policy applies.\" An agent reviews the draft in 30–60 seconds, edits if needed, and sends with one click. This tier handles 18% of tickets. Agent time per ticket: 45 seconds vs. 6 minutes previously.",
            },
            {
              tier: "Tier 3",
              title: "Direct escalation — founders only",
              tool: "Gorgias priority tags + Slack alert",
              detail:
                "Tickets matching any escalation trigger (see Section 04) bypass Claude entirely and surface immediately in a dedicated Slack channel with full ticket context. These are refunds over $150, allergy reports, any mention of a medical term or adverse reaction, legal language, media or press inquiries, and influencer DMs. Founders respond within 2 hours. This tier is 8% of tickets. No SLA misses since implementation.",
            },
          ].map((item, i) => (
            <div key={i} className="mb-6 border border-[#1e1e1e] bg-[#0d0d0d]">
              <div className="border-b border-[#1e1e1e] px-5 py-3 flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#c9a84c] uppercase tracking-wider">{item.tier}</span>
                <span className="font-mono text-[11px] text-[#5a5550] uppercase tracking-wider">{item.tool}</span>
              </div>
              <div className="px-5 py-4">
                <h3 className="text-[15px] font-medium text-[#f0ede8] mb-3">{item.title}</h3>
                <p className="text-[13px] text-[#9a9590] leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Section 03: Resolution Benchmarks */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">03</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">Resolution Rate Benchmarks</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            Industry benchmarks and where this brand landed
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-6">
            DTC support benchmarks for context — and where Evergreen landed 90 days post-implementation:
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border border-[#1e1e1e] text-[13px]">
              <thead>
                <tr className="border-b border-[#1e1e1e] bg-[#0d0d0d]">
                  <th className="text-left px-4 py-3 font-mono text-[11px] text-[#5a5550] uppercase tracking-wider">Metric</th>
                  <th className="text-right px-4 py-3 font-mono text-[11px] text-[#5a5550] uppercase tracking-wider">DTC Avg</th>
                  <th className="text-right px-4 py-3 font-mono text-[11px] text-[#5a5550] uppercase tracking-wider">Before</th>
                  <th className="text-right px-4 py-3 font-mono text-[11px] text-[#c9a84c] uppercase tracking-wider">After</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e1e]">
                {[
                  ["First response time", "4.2 hrs", "3.1 hrs", "4 min"],
                  ["Resolution rate (auto)", "12%", "0%", "74%"],
                  ["CSAT score", "4.1", "3.9", "4.6"],
                  ["Tickets per agent/day", "45", "40", "88 (Tier 2 only)"],
                  ["Monthly support cost", "—", "$11,200", "$3,700"],
                  ["Cost per ticket", "—", "$9.33", "$3.08"],
                  ["Escalation rate", "—", "—", "8%"],
                ].map(([metric, avg, before, after]) => (
                  <tr key={metric} className="hover:bg-[#0d0d0d] transition-colors">
                    <td className="px-4 py-3 text-[#9a9590]">{metric}</td>
                    <td className="px-4 py-3 text-right text-[#3a3530]">{avg}</td>
                    <td className="px-4 py-3 text-right text-[#5a5550]">{before}</td>
                    <td className="px-4 py-3 text-right text-[#c9a84c] font-medium">{after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[13px] text-[#5a5550] leading-relaxed">
            CSAT improvement came from two sources: (1) AI responses to FAQ tickets were more consistent and complete than the agents had been — no variation based on who was working, no copy-paste errors. (2) Agents now only handled genuinely complex tickets, and their quality on those improved because they weren't burned out on repetitive questions.
          </p>
        </section>

        {/* Section 04: System Prompt */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">04</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">The System Prompt</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            The exact customer service prompt — copy-paste ready
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-6">
            This prompt is used for Tier 1 auto-resolutions. The user message is a JSON object containing the ticket text, customer order history, and relevant product data from Shopify. Customize the bracketed fields for your brand.
          </p>

          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-8 bg-[#0d0d0d] border border-[#1e1e1e] border-b-0 flex items-center px-4 gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="ml-auto font-mono text-[10px] text-[#5a5550]">SYSTEM PROMPT — Customer Service (Tier 1)</span>
            </div>
            <pre className="mt-8 bg-[#0a0a0a] border border-[#1e1e1e] p-5 text-[12px] text-[#9a9590] leading-relaxed overflow-x-auto whitespace-pre-wrap font-mono">
{`You are a customer support specialist for [BRAND NAME], a [PRODUCT TYPE]
brand. Your tone is warm, direct, and knowledgeable — like a helpful friend
who genuinely knows the products, not a scripted support bot.

You will receive a JSON object containing:
- The customer's support ticket text
- Their order history (from Shopify)
- Relevant product information
- Their customer tier (first-time, repeat, VIP)

Your task: write a complete, personalized support reply that fully resolves
the customer's issue.

TONE GUIDELINES:
- First-time customers: warm and welcoming, acknowledge it's their first order
- Repeat customers: familiar, reference their purchase history if relevant
- VIP (3+ orders): treat them like a brand insider

RESPONSE STRUCTURE:
1. Address them by first name
2. Acknowledge their specific situation in one sentence (don't paraphrase
   their whole message back to them)
3. Answer or resolve their question/issue directly
4. If order-related: include specific tracking or status details from the data
5. One optional closing line — a relevant tip, or a genuine sign-off

HARD RULES:
- Never make up order details, tracking numbers, or product information
  not present in the data
- Never promise a specific delivery date unless you have confirmed data
- Never offer a refund or credit — those are Tier 2/3 decisions
- If the data is insufficient to answer fully, say so directly and tell
  them what to do next (reply with X, or email Y@brand.com)
- Do not use: "I hope this helps", "Please don't hesitate", "Feel free to",
  "Certainly!", "Absolutely!", or any hollow affirmations
- Keep replies under 150 words unless the complexity genuinely requires more
- No sign-off signatures — the email footer handles that

ESCALATION — do not respond, flag immediately if you detect:
- Any mention of an allergic reaction, rash, hives, or medical symptom
- Legal language: "lawyer", "sue", "BBB", "FTC", "dispute", "chargeback"
- Any claim of physical harm
- Refund requests over $[THRESHOLD]
- The words "journalist", "article", "review", or press-related context`}
            </pre>
          </div>
        </section>

        {/* Section 05: Escalation Triggers */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">05</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">Escalation Triggers</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            When to pull humans in — the complete trigger list
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-6">
            These are the exact Gorgias rules they use to route tickets to Tier 3 (founder-level escalation), bypassing Claude entirely. Build these as keyword-based rules in your helpdesk platform.
          </p>

          <div className="border border-[#1e1e1e] bg-[#0d0d0d] divide-y divide-[#1e1e1e]">
            {[
              {
                trigger: "Adverse reaction or medical mention",
                keywords: "rash, hive, allergic, reaction, broke out, burned, itching, doctor, dermatologist, ER",
                reason: "Liability exposure. Requires founder-level response and documentation.",
              },
              {
                trigger: "Legal / dispute language",
                keywords: "lawyer, attorney, sue, lawsuit, BBB, FTC, chargeback, dispute, CFPB",
                reason: "Any legal mention needs human response and potential legal team notification.",
              },
              {
                trigger: "Refund request above threshold",
                keywords: "Rule-based: order value > $[X] AND ticket contains 'refund' or 'return'",
                reason: "High-value refunds require founder approval to protect margin.",
              },
              {
                trigger: "Press, media, or influencer",
                keywords: "journalist, reporter, article, blog, review, collab, partnership, PR, press",
                reason: "Reputation-sensitive. These are opportunities or risks — both need founder eyes.",
              },
              {
                trigger: "Repeat contact on same issue",
                keywords: "Rule-based: customer has 3+ open or closed tickets in past 30 days",
                reason: "Indicates the auto-resolution failed or the issue is more complex than classified.",
              },
              {
                trigger: "Explicit dissatisfaction with AI response",
                keywords: "bot, automated, real person, human, this doesn't help, useless, terrible response",
                reason: "The automation has broken trust. A human response is now required.",
              },
            ].map((row, i) => (
              <div key={i} className="p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-[14px] font-medium text-[#f0ede8]">{row.trigger}</h3>
                  <span className="flex-shrink-0 font-mono text-[10px] text-[#c9a84c] uppercase tracking-wider mt-0.5">Tier 3</span>
                </div>
                <p className="text-[12px] text-[#5a5550] font-mono mb-2 leading-relaxed">Keywords: {row.keywords}</p>
                <p className="text-[12px] text-[#9a9590] leading-relaxed">{row.reason}</p>
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
                href: "/issues/real-estate-lead-qualification-ai",
                label: "Deep Dive",
                title: "The Realtor Who Qualified 200 Leads Without Answering a Single Call",
                desc: "CRM + AI lead scoring + automated follow-up — 38 hours/month saved on qualification.",
              },
              {
                href: "/issues/how-accountants-cut-reporting-time",
                label: "Deep Dive",
                title: "How to Cut Client Reporting From 8 Hours to 45 Minutes",
                desc: "Claude API + Google Sheets + Zapier workflow for accountants. Exact prompt included.",
              },
              {
                href: "/issues/sample",
                label: "Issue #01",
                title: "How One CPA Firm 3x'd Revenue Per Partner Without Hiring",
                desc: "A 4-step automation that freed 305 hours/month and tripled client capacity.",
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
            A new deep-dive every Tuesday. Real business, real numbers.
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
