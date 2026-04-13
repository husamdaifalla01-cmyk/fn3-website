import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Start an AI Automation Agency in 2026 (The Complete Guide)',
  description:
    'Everything you need to know about starting an AI automation agency in 2026 — what to automate, how to price, how to land your first 3 clients, and which tools actually work.',
  keywords: [
    'ai automation agency',
    'start ai agency',
    'how to start an ai automation agency',
    'ai agency 2026',
    'ai automation business',
  ],
  openGraph: {
    title: 'How to Start an AI Automation Agency in 2026 (The Complete Guide)',
    description:
      'What is an AI automation agency, why 2026 is the year to launch, the 6 departments you can automate, how to price, and how to get your first 3 clients.',
    type: 'article',
  },
}

export default function AIAutomationAgencyGuide() {
  return (
    <main className="min-h-screen bg-background text-text-primary antialiased">
      {/* Nav */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to FN3 Agency
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        {/* Header */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            Complete Guide · 2026
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-6">
            How to Start an AI Automation Agency in 2026
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            The opportunity is real, the tooling is mature, and most businesses are still doing everything manually.
            Here is everything you need to build a profitable AI automation agency this year — what to sell, how to
            price it, which tools to use, and how to land your first paying clients.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-text-muted">
            <span>~2,000 words</span>
            <span>·</span>
            <span>8 min read</span>
            <span>·</span>
            <span>Updated March 2026</span>
          </div>
        </header>

        {/* TOC */}
        <nav className="bg-surface border border-white/[0.08] rounded-2xl p-6 mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">In this guide</div>
          <ol className="space-y-2 text-sm text-text-secondary list-decimal list-inside">
            <li><a href="#what-is" className="hover:text-accent transition-colors">What is an AI automation agency?</a></li>
            <li><a href="#why-now" className="hover:text-accent transition-colors">Why 2026 is the right time</a></li>
            <li><a href="#six-departments" className="hover:text-accent transition-colors">The 6 departments you can automate</a></li>
            <li><a href="#pricing" className="hover:text-accent transition-colors">How to price: the 1/5th rule</a></li>
            <li><a href="#first-clients" className="hover:text-accent transition-colors">Your first 3 clients</a></li>
            <li><a href="#tools" className="hover:text-accent transition-colors">Tools you need to get started</a></li>
          </ol>
        </nav>

        {/* Section 1 */}
        <section id="what-is" className="mb-14 scroll-mt-20">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-5">
            1. What is an AI automation agency?
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            An AI automation agency helps businesses replace manual, repetitive work with AI-powered systems. You are
            not building AI products — you are configuring, deploying, and maintaining AI workflows for other
            businesses. Think of it as implementation work: your clients have the problem, you bring the solution.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            The deliverable is a running system. A client comes to you drowning in lead qualification emails. You leave
            them with an AI agent that reads every inbound inquiry, scores the lead, drafts a personalized reply, and
            logs everything to their CRM — without a human touching it.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            The business model is straightforward: a setup fee to build and configure the system (typically $1,500–$5,000)
            and a monthly retainer to maintain, monitor, and improve it ($500–$2,000/month). Some agencies layer in
            usage-based billing on top.
          </p>
          <p className="text-text-secondary leading-relaxed">
            The best example of what this looks like at scale is{' '}
            <Link href="/" className="text-accent hover:underline">FN3 Agency</Link>, which deploys full AI workforces
            across all 6 business departments for small and medium businesses. Their case studies show 3–6 week payback
            periods and $18K+ in monthly pipeline automation for typical clients.
          </p>
        </section>

        {/* Section 2 */}
        <section id="why-now" className="mb-14 scroll-mt-20">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-5">
            2. Why 2026 is the right time
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Three things came together in the last 18 months that make an AI automation agency viable at the SMB level:
          </p>

          <div className="space-y-5 mb-6">
            <div className="bg-surface border border-white/[0.08] rounded-xl p-5">
              <h3 className="font-semibold text-text-primary mb-2">The models are good enough</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Claude, GPT-4o, and Gemini 1.5 Pro can all handle real business tasks — drafting proposals, reviewing
                contracts, classifying support tickets — with error rates low enough for production use. A year ago you
                had to babysit every output. Today you can configure guardrails and let them run.
              </p>
            </div>
            <div className="bg-surface border border-white/[0.08] rounded-xl p-5">
              <h3 className="font-semibold text-text-primary mb-2">The tooling is mature</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Make.com, n8n, Zapier with AI steps, LangChain, and the Anthropic API all give you primitives to build
                reliable automations without building from scratch. You can go from brief to live system in days.
              </p>
            </div>
            <div className="bg-surface border border-white/[0.08] rounded-xl p-5">
              <h3 className="font-semibold text-text-primary mb-2">The market is wide open</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Only 14% of SMBs have deployed any AI in their operations (Salesforce SMB Trends, Q1 2026). The
                demand is high — business owners hear about AI every day — but the implementation gap is enormous. Most
                businesses do not know where to start. That is your job.
              </p>
            </div>
          </div>

          <p className="text-text-secondary leading-relaxed">
            The window to establish yourself is 18–24 months before this becomes a commoditized market. Agencies that
            build track records and case studies now will be the ones clients turn to when they are finally ready to move.
          </p>
        </section>

        {/* Section 3 */}
        <section id="six-departments" className="mb-14 scroll-mt-20">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-5">
            3. The 6 departments you can automate
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Every business has the same six functional areas. All six are automatable. Most agencies pick two or three
            to specialize in — at least to start. Here is what AI can do in each department, and how much time it
            typically reclaims:
          </p>

          <div className="space-y-4">
            {[
              {
                dept: 'Sales',
                color: '#7c5cfc',
                tasks: ['Lead qualification and scoring', 'Outreach sequence drafting and follow-up', 'CRM data entry and pipeline hygiene', 'Proposal and quote generation'],
                impact: '15–25 hours/week reclaimed per sales rep',
              },
              {
                dept: 'Marketing',
                color: '#06b6d4',
                tasks: ['Content calendar execution and drafting', 'Email campaign personalization', 'SEO content production', 'Social media scheduling and copy'],
                impact: '20–35 hours/week reclaimed per marketer',
              },
              {
                dept: 'Customer Support',
                color: '#10b981',
                tasks: ['Tier 1 ticket resolution (80–95% of volume)', 'Customer onboarding sequences', 'Escalation routing', 'Proactive at-risk account outreach'],
                impact: '1 agent replaces 2–3 support headcount at scale',
              },
              {
                dept: 'Operations',
                color: '#f59e0b',
                tasks: ['Weekly reporting and dashboards', 'SOP documentation', 'Vendor communication', 'Project status updates and task routing'],
                impact: '10–20 hours/week saved on reporting alone',
              },
              {
                dept: 'Finance',
                color: '#ec4899',
                tasks: ['Invoice processing and categorization', 'Expense report review', 'Cash flow forecasting summaries', 'Audit prep and document organization'],
                impact: 'Up to 60% reduction in bookkeeping time',
              },
              {
                dept: 'HR & Legal',
                color: '#ef4444',
                tasks: ['Job description and offer letter drafting', 'Contract first-pass review and redlining', 'Onboarding document generation', 'Compliance calendar management'],
                impact: '80% faster contract review cycles',
              },
            ].map((item) => (
              <div key={item.dept} className="bg-surface border border-white/[0.08] rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
                    style={{ color: item.color, backgroundColor: `${item.color}15`, borderColor: `${item.color}30` }}
                  >
                    {item.dept}
                  </span>
                </div>
                <ul className="text-sm text-text-secondary space-y-1 mb-3">
                  {item.tasks.map((task) => (
                    <li key={task} className="flex items-start gap-2">
                      <span className="text-accent mt-1">›</span>
                      {task}
                    </li>
                  ))}
                </ul>
                <div className="text-xs font-medium text-green-400">{item.impact}</div>
              </div>
            ))}
          </div>

          <p className="text-text-secondary leading-relaxed mt-6">
            If you want to see what full-department automation looks like in practice, the{' '}
            <Link href="/#case-studies" className="text-accent hover:underline">FN3 Agency case studies</Link> break
            down exact results by department for real clients.
          </p>
        </section>

        {/* Section 4 */}
        <section id="pricing" className="mb-14 scroll-mt-20">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-5">
            4. How to price: the 1/5th rule
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            The single best pricing heuristic for AI automation work: charge roughly one-fifth of the value you create.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            If your automation saves a client 25 hours per week at a fully loaded cost of $40/hour, the monthly value
            created is approximately $4,000. At the 1/5th rule, you charge $800/month. The client keeps 80% of the
            value, you keep 20%. This is an easy sell.
          </p>

          <div className="bg-surface border border-accent/20 rounded-2xl p-6 mb-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-4">Example calculation</div>
            <div className="space-y-3 text-sm">
              {[
                ['Hours reclaimed per week', '25 hrs'],
                ['Fully loaded hourly cost', '$40/hr'],
                ['Monthly value created', '$4,000'],
                ['Your monthly retainer (1/5th)', '$800/mo'],
                ['Client keeps', '$3,200/mo'],
                ['Your setup fee', '$2,000–$3,000 (one-time)'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center border-b border-white/[0.05] pb-2 last:border-0 last:pb-0">
                  <span className="text-text-secondary">{label}</span>
                  <span className="font-semibold text-text-primary">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-text-secondary leading-relaxed mb-4">
            Three pricing models work for AI automation agencies:
          </p>

          <div className="space-y-4 mb-4">
            <div className="bg-surface border border-white/[0.08] rounded-xl p-5">
              <h3 className="font-semibold text-text-primary mb-2">Value-based retainer (recommended)</h3>
              <p className="text-sm text-text-secondary">Setup fee + monthly retainer priced at 1/5th of value created. Best margin, easiest to justify, scales well.</p>
            </div>
            <div className="bg-surface border border-white/[0.08] rounded-xl p-5">
              <h3 className="font-semibold text-text-primary mb-2">Project-based</h3>
              <p className="text-sm text-text-secondary">Fixed price for build + deployment. Simpler to sell, but you lose the compounding retainer income. Good for initial clients.</p>
            </div>
            <div className="bg-surface border border-white/[0.08] rounded-xl p-5">
              <h3 className="font-semibold text-text-primary mb-2">Percentage of savings</h3>
              <p className="text-sm text-text-secondary">You take 15–25% of measurable cost savings. Hard to track, but very easy to sell to ROI-focused clients.</p>
            </div>
          </div>

          <p className="text-text-secondary leading-relaxed">
            For more detailed pricing models and competitor benchmarks, see the{' '}
            <Link href="/guides/ai-agency-pricing" className="text-accent hover:underline">AI Agency Pricing Guide 2026</Link>.
          </p>
        </section>

        {/* Section 5 */}
        <section id="first-clients" className="mb-14 scroll-mt-20">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-5">
            5. Your first 3 clients
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            The hardest part of starting an AI agency is the chicken-and-egg problem: clients want case studies, but
            you need clients to get case studies. Here is the fastest way through.
          </p>

          <div className="space-y-6">
            <div className="bg-surface border border-white/[0.08] rounded-xl p-6">
              <div className="text-accent font-bold text-lg mb-2">Client 1: Free, fast, famous</div>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                Find a business in your network — a friend, a family member, a former employer. Do the work for free or
                heavily discounted in exchange for a documented case study and a testimonial. Focus on a narrow use case
                (one department, one workflow) and measure everything. This becomes your proof of concept.
              </p>
              <p className="text-xs text-text-muted">Timeline: 2–3 weeks. Investment: your time only.</p>
            </div>

            <div className="bg-surface border border-white/[0.08] rounded-xl p-6">
              <div className="text-accent font-bold text-lg mb-2">Client 2: Cold outreach with a specific offer</div>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                Take the use case you just solved and find 30 businesses in the same industry with the same problem.
                Write a cold email that describes their pain in exact terms and links to your case study. The subject
                line: "I just automated [specific thing] for [industry peer] — interested?" You need a 3–5% reply rate.
                That is achievable with a targeted list and a specific offer.
              </p>
              <p className="text-xs text-text-muted">Timeline: 3–4 weeks. Charge 50% of your target rate.</p>
            </div>

            <div className="bg-surface border border-white/[0.08] rounded-xl p-6">
              <div className="text-accent font-bold text-lg mb-2">Client 3: Referral from Client 2</div>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                When you deliver results for Client 2, ask for one referral. Business owners talk to other business
                owners. A warm referral with a live case study is the easiest sale you will ever make. By this point,
                charge full rate — you have two case studies and social proof.
              </p>
              <p className="text-xs text-text-muted">Timeline: 6–8 weeks from start. Charge full rate.</p>
            </div>
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-xl p-5 mt-6">
            <p className="text-sm text-text-secondary leading-relaxed">
              <span className="font-semibold text-text-primary">The common mistake:</span> trying to build a
              &ldquo;productized service&rdquo; before you have validated what the market actually wants. Sell first,
              standardize second. Your first three clients will teach you more about positioning than any course or
              framework.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section id="tools" className="mb-14 scroll-mt-20">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-5">
            6. Tools you need to get started
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            You do not need to build infrastructure from scratch. The following stack covers 90% of what a growing AI
            automation agency needs:
          </p>

          <div className="space-y-3">
            {[
              {
                category: 'AI backbone',
                tools: 'Anthropic API (Claude) + OpenAI API',
                why: 'Claude excels at document work, reasoning, and following complex instructions. GPT-4o is strong for structured data extraction. Use both.',
              },
              {
                category: 'Workflow automation',
                tools: 'Make.com (primary), n8n (self-hosted for cost)',
                why: 'Make has the best library of integrations and the most visual builder. n8n is better if you want to self-host and reduce per-operation costs at scale.',
              },
              {
                category: 'Vector database / memory',
                tools: 'Pinecone or Supabase with pgvector',
                why: 'For agents that need long-term memory or need to search through a client\'s documents and knowledge base.',
              },
              {
                category: 'Agent framework',
                tools: 'LangChain or direct API calls',
                why: 'Start with direct API calls for simple workflows. Move to LangChain when you need multi-step reasoning, tool use, or complex orchestration.',
              },
              {
                category: 'Client-facing dashboard',
                tools: 'Notion + Zapier / custom Next.js',
                why: 'Clients need to see what their agents are doing. Notion is the fastest way to build a shared workspace. Custom dashboards come later when you are productizing.',
              },
              {
                category: 'CRM for your own sales',
                tools: 'HubSpot free tier or Pipedrive',
                why: 'You are an AI agency — you should be using CRM automation for your own outreach pipeline from day one.',
              },
              {
                category: 'Contracts and payments',
                tools: 'Stripe + DocuSign (or PandaDoc)',
                why: 'Stripe handles retainer billing automatically. PandaDoc generates and tracks contracts without you chasing signatures.',
              },
            ].map((item) => (
              <div key={item.category} className="bg-surface border border-white/[0.08] rounded-xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 mb-2">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-text-muted w-36 flex-shrink-0 pt-0.5">{item.category}</div>
                  <div className="font-semibold text-text-primary text-sm">{item.tools}</div>
                </div>
                <div className="sm:pl-36 text-sm text-text-secondary leading-relaxed">{item.why}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Closing / CTA */}
        <section className="border-t border-white/[0.08] pt-12 mt-4">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
            Ready to see what a full AI workforce deployment looks like?
          </h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            FN3 Agency deploys AI across all 6 departments for SMBs — live in 5 days. If you are researching how to
            start your own agency, studying how an established operation works is the fastest shortcut. Browse the case
            studies, the ROI calculator, and the pricing breakdown.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 shadow-accent text-sm"
            >
              Explore FN3 Agency
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/guides/ai-agency-pricing"
              className="inline-flex items-center justify-center gap-2 border border-white/[0.12] hover:border-accent/40 text-text-secondary hover:text-text-primary font-medium px-6 py-3.5 rounded-xl transition-all duration-200 text-sm"
            >
              AI Agency Pricing Guide 2026
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
