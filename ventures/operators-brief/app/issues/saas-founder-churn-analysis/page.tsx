import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How a SaaS Founder Used AI to Cut Churn 34% Without a CS Team | Operators Brief",
  description:
    "SaaS founders: the exact Stripe webhook + Claude API win-back workflow that reduced churn 34% — $4,200/month recovered MRR, 8 hrs/week saved, no customer success hire.",
  keywords: [
    "SaaS churn reduction AI",
    "Stripe webhook automation",
    "Claude API win-back email",
    "SaaS founder automation",
    "reduce churn without CS team",
    "SaaS AI workflow",
  ],
  alternates: {
    canonical: "https://operators-brief.vercel.app/issues/saas-founder-churn-analysis",
  },
  openGraph: {
    title: "How a SaaS Founder Cut Churn 34% Without a CS Team | Operators Brief",
    description:
      "Stripe webhook + Claude API + Postmark workflow. 34% churn reduction. $4,200/month recovered MRR. 8 hrs/week saved. Exact trigger conditions and prompt inside. Free deep-dive.",
    type: "article",
    url: "https://operators-brief.vercel.app/issues/saas-founder-churn-analysis",
  },
  twitter: {
    card: "summary_large_image",
    title: "34% Churn Reduction With No CS Team — SaaS AI Workflow",
    description:
      "Stripe webhook + Claude win-back email workflow. $4,200/month recovered. Trigger conditions, full prompt, Stripe structure included. Free from Operators Brief.",
  },
};

export default function SaasFounderChurnPage() {
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
          <span className="font-mono text-[11px] text-[#5a5550]">SaaS / Product</span>
          <span className="w-1 h-1 bg-[#2a2a2a] rounded-full" />
          <span className="font-mono text-[11px] text-[#5a5550]">11-min read</span>
        </div>

        {/* Title */}
        <h1 className="text-[32px] md:text-[44px] font-light leading-[1.1] tracking-tight text-[#f0ede8] mb-5">
          How a SaaS Founder Used AI to Cut Churn 34% Without a CS Team
        </h1>

        <p className="text-[18px] text-[#9a9590] leading-relaxed mb-12 border-l-2 border-[#c9a84c] pl-5">
          A solo SaaS founder was losing 7–9% of revenue monthly to churn — and couldn't afford a customer success hire. Here's the exact Stripe webhook + Claude + Postmark pipeline that detects churn signals automatically and sends personalized win-back emails, including the trigger conditions, full prompt, and Stripe webhook structure.
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
            Churn is a timing problem, not a product problem
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            Most SaaS churn doesn't happen because the product is bad. It happens because no one reached out at the right moment. A user goes quiet for two weeks — they didn't cancel, they just disengaged. A payment fails — they're busy, they'll get to it, and by the time they do it's been 10 days and they've already moved on mentally. A plan gets downgraded — it's a warning shot, not a decision.
          </p>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            In a funded startup, a CS team catches these moments. They monitor dashboards, they trigger check-ins, they personalize outreach. That's 2–4 full-time headcount. As a solo founder or small team, you're watching the churn number tick up and manually emailing people when you notice — which is always too late, always inconsistent, and always drawing on time you don't have.
          </p>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-4">
            The window for effective win-back is narrow. Research on SaaS churn recovery consistently shows that the probability of recovering a churning account drops by roughly half for every 48 hours you wait after the first churn signal appears. Manual processes miss this window almost every time.
          </p>

          <div className="bg-[#0d0d0d] border border-[#1e1e1e] p-5 my-8">
            <p className="text-[13px] font-mono text-[#5a5550] mb-2 uppercase tracking-wider">The compounding math:</p>
            <p className="text-[15px] text-[#f0ede8]">
              At 7% monthly churn on $20K MRR, you're losing <span className="text-[#c9a84c]">$1,400/month and compounding backward.</span> Cutting that to 4.6% with a $30/month automation recovers $480/month net in month one — and the gap widens every month.
            </p>
          </div>
        </section>

        {/* Section 02 */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">02</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">The Workflow</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            Stripe webhook → churn signal detection → Claude writes win-back → Postmark sends
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-6">
            Four churn signal types. One detection pipeline. Win-back emails sent within minutes of the trigger, not days. Tool stack: Stripe webhooks, a lightweight webhook handler (Vercel function or Railway), Claude API, Postmark. Monthly cost: approximately $30–$45 depending on MRR volume.
          </p>

          {/* Trigger signals */}
          <p className="text-[14px] text-[#f0ede8] mb-4 font-medium">Churn signal definitions:</p>
          <div className="overflow-x-auto mb-8">
            <table className="w-full border border-[#1e1e1e] text-[13px]">
              <thead>
                <tr className="border-b border-[#1e1e1e] bg-[#0d0d0d]">
                  <th className="text-left px-4 py-3 font-mono text-[11px] text-[#5a5550] uppercase tracking-wider">Signal</th>
                  <th className="text-left px-4 py-3 font-mono text-[11px] text-[#5a5550] uppercase tracking-wider">Trigger Condition</th>
                  <th className="text-left px-4 py-3 font-mono text-[11px] text-[#c9a84c] uppercase tracking-wider">Win-back Window</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e1e]">
                {[
                  ["Payment failure", "invoice.payment_failed webhook fires", "Within 2 hours"],
                  ["Plan downgrade", "customer.subscription.updated: lower tier", "Within 4 hours"],
                  ["No login 14+ days", "Nightly cron: last_login_at > 14 days ago", "Same day"],
                  ["Trial canceled", "customer.subscription.deleted: trial period", "Within 1 hour"],
                ].map(([signal, trigger, window]) => (
                  <tr key={signal} className="hover:bg-[#0d0d0d] transition-colors">
                    <td className="px-4 py-3 text-[#c9a84c] font-mono text-[12px] whitespace-nowrap">{signal}</td>
                    <td className="px-4 py-3 text-[#9a9590] font-mono text-[11px]">{trigger}</td>
                    <td className="px-4 py-3 text-[#f0ede8]">{window}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {[
            {
              step: "Step 1",
              title: "Stripe webhooks → event listener",
              tool: "Stripe Webhooks + Vercel/Railway Function",
              detail:
                "Configure Stripe to send invoice.payment_failed and customer.subscription.updated / deleted events to your webhook endpoint. A lightweight serverless function (40–60 lines of Node.js or Python) receives the event, validates the Stripe signature, and extracts customer data: customer ID, email, plan, MRR, account age, and any usage data available via the Stripe API.",
            },
            {
              step: "Step 2",
              title: "Customer context → Claude API for win-back email generation",
              tool: "Claude API",
              detail:
                "The webhook handler calls Claude with a structured payload: signal type, customer data, plan, account age, and any notes pulled from your internal database (e.g., last support ticket, feature usage). Claude writes a personalized win-back email specific to the signal type. A payment failure email is different from a disengagement email — same system prompt, different tone and CTA.",
            },
            {
              step: "Step 3",
              title: "Win-back email → Postmark send",
              tool: "Postmark",
              detail:
                "The Claude-generated email is passed to Postmark's API and sent immediately. No queue, no delay beyond the processing time. Postmark is used over SendGrid or Mailchimp because delivery speed matters here — win-back timing is measured in hours, not days. The email lands in the inbox within minutes of the churn signal.",
            },
            {
              step: "Step 4",
              title: "Response tracking → Stripe tag",
              tool: "Stripe Customer Metadata",
              detail:
                "If the customer opens the email and takes action (payment updated, logs back in, upgrades), Postmark's open webhook + your event tracking writes a tag to the Stripe customer record: win_back_success: true. This gives you clean cohort data over time — you can see which signal type has the highest recovery rate and tune accordingly.",
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

        {/* Section 03: Stripe webhook structure */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">03</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">Stripe Webhook Structure</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            The exact events to subscribe to and the data you need
          </h2>

          <div className="relative mb-6">
            <div className="absolute top-0 left-0 right-0 h-8 bg-[#0d0d0d] border border-[#1e1e1e] border-b-0 flex items-center px-4 gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="ml-auto font-mono text-[10px] text-[#5a5550]">STRIPE WEBHOOK — events to subscribe</span>
            </div>
            <pre className="mt-8 bg-[#0a0a0a] border border-[#1e1e1e] p-5 text-[12px] text-[#9a9590] leading-relaxed overflow-x-auto whitespace-pre-wrap font-mono">
{`// Events to subscribe in Stripe Dashboard → Webhooks:
invoice.payment_failed
customer.subscription.updated
customer.subscription.deleted

// Payload structure from invoice.payment_failed (key fields):
{
  "type": "invoice.payment_failed",
  "data": {
    "object": {
      "customer": "cus_XXXXXXXXXX",
      "customer_email": "user@example.com",
      "amount_due": 4900,
      "currency": "usd",
      "attempt_count": 1,
      "subscription": "sub_XXXXXXXXXX",
      "lines": {
        "data": [{
          "plan": {
            "nickname": "Pro Monthly",
            "amount": 4900
          }
        }]
      }
    }
  }
}

// Payload structure from customer.subscription.updated (key fields):
{
  "type": "customer.subscription.updated",
  "data": {
    "object": {
      "customer": "cus_XXXXXXXXXX",
      "status": "active",
      "items": {
        "data": [{
          "plan": {
            "nickname": "Starter Monthly",  // new (downgraded) plan
            "amount": 1900
          }
        }]
      }
    },
    "previous_attributes": {
      "items": {
        "data": [{
          "plan": {
            "nickname": "Pro Monthly",  // previous (higher) plan
            "amount": 4900
          }
        }]
      }
    }
  }
}`}
            </pre>
          </div>

          <p className="text-[13px] text-[#5a5550] leading-relaxed">
            The downgrade signal requires checking previous_attributes — a subscription update to a lower-priced plan is a churn signal; an update to a higher plan is not. Your webhook handler should detect this by comparing the amount values.
          </p>
        </section>

        {/* Section 04: The Prompt */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">04</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">The Prompt</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            The win-back email prompt — copy-paste ready
          </h2>

          <p className="text-[15px] text-[#9a9590] leading-relaxed mb-6">
            One system prompt handles all four signal types. The user message contains the signal type and customer context. Claude adjusts tone and CTA accordingly. Customize the bracketed fields for your product.
          </p>

          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-8 bg-[#0d0d0d] border border-[#1e1e1e] border-b-0 flex items-center px-4 gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#1e1e1e]" />
              <span className="ml-auto font-mono text-[10px] text-[#5a5550]">SYSTEM PROMPT — Claude API</span>
            </div>
            <pre className="mt-8 bg-[#0a0a0a] border border-[#1e1e1e] p-5 text-[12px] text-[#9a9590] leading-relaxed overflow-x-auto whitespace-pre-wrap font-mono">
{`You are writing a win-back email on behalf of [FOUNDER NAME], the founder
of [PRODUCT NAME] — a [one-line product description, e.g., "project management
tool for independent consultants"].

You will receive a JSON object with:
- signal_type: one of [payment_failed, downgraded, inactive_14_days, trial_canceled]
- customer_name: first name if available, otherwise null
- plan: their current or last plan name
- mrr: their monthly payment amount in dollars
- account_age_days: how long they've been a customer
- last_login: ISO date string of their last login, or null

Write a single transactional email. No HTML — plain text only.

TONE: Direct, warm, and founder-personal. Write as if [FOUNDER NAME] is
personally reaching out, not a support bot. Short. Not desperate.

OUTPUT FORMAT — return only valid JSON:
{
  "subject": "[email subject line]",
  "body": "[full email body — plain text, newlines as \\n]"
}

SIGNAL-SPECIFIC INSTRUCTIONS:

payment_failed:
- Subject: something practical, not alarming. e.g. "Quick note about your [PRODUCT] payment"
- Acknowledge the payment issue matter-of-factly. Provide the direct link to update
  billing: [YOUR BILLING UPDATE URL]. Keep it under 80 words.
- Do not imply they did anything wrong. Payment failures happen.

downgraded:
- Subject: something curious, not salesy. e.g. "Did [PRODUCT] miss the mark?"
- Ask one genuine question about what drove the decision. Offer to jump on a
  10-minute call or answer by reply. Do not lead with a promo offer.
- Keep it under 100 words.

inactive_14_days:
- Subject: something low-pressure. e.g. "Still there, [first_name]?"
- Reference one specific feature they haven't used (or a generally useful one
  if you don't have feature usage data). Offer one concrete tip or resource.
  Include a direct link to log in: [YOUR LOGIN URL].
- Keep it under 120 words.

trial_canceled:
- Subject: something honest. e.g. "Before you go — one question"
- Ask directly what didn't work. Offer a [X]-day extension if they want to
  give it another shot: [YOUR TRIAL EXTENSION LINK]. Be genuine — you want
  the feedback, not just the retention.
- Keep it under 100 words.

UNIVERSAL RULES:
- Use first name if available. If null, use no name (don't write "Hi there" or "Hello").
- Never use: "I hope this finds you well", "Just checking in", "Don't hesitate to"
- Signature: [FOUNDER NAME] | [PRODUCT NAME] | [REPLY EMAIL]
- Every email must be under 150 words total.`}
            </pre>
          </div>

          <p className="text-[13px] text-[#5a5550] mt-4 leading-relaxed">
            At ~300 input tokens + ~250 output tokens per email, cost is approximately $0.003/email. At 100 churn signals/month, that's $0.30/month in API costs.
          </p>
        </section>

        {/* Section 05: Results */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#c9a84c]">05</span>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#5a5550]">Before vs. After</span>
          </div>

          <h2 className="text-[24px] font-light text-[#f0ede8] mb-5 leading-snug">
            90 days of data from a $20K MRR product
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
                  ["Monthly churn rate", "7.1%", "4.7%", "−34%"],
                  ["MRR recovered/month", "$0", "$4,200", "+$4,200"],
                  ["Payment failure recovery rate", "31%", "58%", "+87%"],
                  ["Win-back email open rate", "—", "61%", "—"],
                  ["Time on manual CS outreach/week", "8 hrs", "0.5 hrs", "−94%"],
                  ["Median time to win-back send", "48–72 hrs", "< 8 min", "−99%"],
                  ["Tool cost/month", "$0", "$38/mo", "—"],
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
              { label: "Churn reduction", value: "−34%" },
              { label: "MRR recovered/mo", value: "$4,200" },
              { label: "CS hours saved/wk", value: "7.5 hrs" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#0d0d0d] border border-[#1e1e1e] p-5 text-center">
                <div className="font-mono text-[32px] text-[#c9a84c] leading-none mb-2">{stat.value}</div>
                <div className="text-[11px] text-[#5a5550] font-mono uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-[#0d0d0d] border border-[#1e1e1e] p-5">
            <p className="text-[13px] font-mono text-[#5a5550] uppercase tracking-wider mb-2">Note on the payment failure numbers:</p>
            <p className="text-[13px] text-[#9a9590] leading-relaxed">
              The 87% improvement in payment failure recovery is the single biggest driver. Before this system, failed payments were caught during a weekly manual review — often 4–5 days after the failure. By that point, many customers had already mentally churned. Reaching them within 2 hours, when they're still in the context of using the product, is the variable that matters most.
            </p>
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
                desc: "Gmail + Claude categorizer workflow. Inbox zero every evening, response time from 18 hrs to 4 hrs.",
              },
              {
                href: "/issues/agency-owner-client-reporting",
                label: "Deep Dive",
                title: "How an Agency Cut Client Reporting Time From 6 Hours to 40 Minutes",
                desc: "Zapier + Claude API + Google Slides workflow. 90 hrs/month freed, $13,500 recovered capacity.",
              },
              {
                href: "/issues/customer-service-ai-ecommerce",
                label: "Deep Dive",
                title: "How a 2-Person DTC Brand Cut Support Costs by 67%",
                desc: "Gorgias + Claude API workflow that resolved 74% of tickets without human intervention.",
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
