import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The AI Stack That Got Our CPA Through Tax Season Without Burning Out",
  description:
    "A first-person guide to the exact AI tools a CPA used to survive tax season: document ingestion, client communication, tax research, and report generation. Real tools, real pricing, real results.",
  openGraph: {
    title: "The AI Stack That Got Our CPA Through Tax Season Without Burning Out",
    description:
      "Document ingestion, client comms, tax research, report generation — the 4-tool stack that cut a CPA's tax season hours by 30%.",
    type: "article",
  },
};

export default function TaxSeasonAIStackPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-white/10 bg-gradient-to-b from-[#111] to-[#0a0a0a] py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span>Guides</span>
            <span>/</span>
            <span className="text-white/70">Tax Season AI Stack</span>
          </div>

          <div className="mb-4 inline-block rounded-full bg-[#2563eb]/10 px-3 py-1 text-xs font-medium text-[#2563eb]">
            Updated March 2026
          </div>

          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl leading-tight">
            The AI Stack That Got Our CPA Through Tax Season Without Burning Out
          </h1>

          <p className="mt-5 text-lg text-white/70 leading-relaxed">
            Last tax season I worked 73-hour weeks for six weeks straight and still felt behind.
            This year I built a four-tool AI stack before January 31st and cut that to 52-hour
            weeks — with room to actually review my work instead of just producing it.
            Here&apos;s exactly what I used, why, and what it cost.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-white/60">
              <svg className="h-3.5 w-3.5 text-[#2563eb]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              ~12 min read
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-white/60">
              <svg className="h-3.5 w-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              4 tools covered
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-white/60">
              <svg className="h-3.5 w-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Pricing included
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12">

        {/* Intro */}
        <div className="mb-12 rounded-2xl border border-[#2563eb]/20 bg-[#2563eb]/5 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#2563eb] mb-3">
            The Short Version
          </p>
          <p className="text-white/80 leading-relaxed">
            This guide covers four workflow areas that eat the most CPA time during tax season:
            getting documents out of client inboxes and into your system, responding to the
            endless client questions, doing the actual tax research, and assembling the final
            deliverables. For each, I&apos;ll tell you what I use, why I chose it over the
            alternatives, one specific workflow I run, and what it costs.
          </p>
          <p className="mt-3 text-white/60 text-sm">
            Total monthly spend for all four tools: $287/month. Hours saved in the 6-week
            peak: estimated 120+ hours. You do the math on your billing rate.
          </p>
        </div>

        {/* Section 1: Document Ingestion */}
        <section className="mb-14">
          <div className="mb-2 inline-block rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/50">
            Section 1
          </div>
          <h2 className="text-2xl font-bold text-white md:text-3xl mb-4">
            Document Ingestion: Stop Hunting Through Email
          </h2>

          <p className="text-white/70 leading-relaxed mb-6">
            The single biggest time sink in my practice during January and February used to be
            the document chase. Client sends a blurry phone photo of a W-2. Another sends a
            PDF of a 1099 buried inside a 12-email thread. A third uploads to a portal but
            in the wrong folder. By mid-February I had a spreadsheet tracking what had and
            hadn&apos;t arrived, and I was manually checking it every morning.
          </p>

          <div className="rounded-2xl border border-white/10 bg-[#111] p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Dext (formerly Receipt Bank)</h3>
                <p className="text-white/50 text-sm mt-1">Document capture and data extraction</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">From $50<span className="text-sm font-normal text-white/50">/mo</span></p>
                <p className="text-xs text-white/40 mt-0.5">per firm, scales by clients</p>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed mb-4">
              Dext solves the document chaos problem end-to-end. Clients can submit via email
              forwarding, a mobile app, or direct upload — and Dext&apos;s OCR extracts the key
              fields (vendor, date, amount, tax category) automatically. The extracted data
              syncs directly into QuickBooks or Xero with a single approval click.
            </p>

            <div className="rounded-lg bg-[#0a0a0a] p-4 mb-4">
              <p className="text-sm font-semibold text-[#2563eb] mb-2">My specific workflow:</p>
              <ol className="space-y-2 text-sm text-white/70">
                <li className="flex gap-2">
                  <span className="text-[#2563eb] font-bold flex-shrink-0">1.</span>
                  Send each client a unique Dext submission email address in my December
                  engagement letter.
                </li>
                <li className="flex gap-2">
                  <span className="text-[#2563eb] font-bold flex-shrink-0">2.</span>
                  Client forwards every tax document to that address as they arrive.
                </li>
                <li className="flex gap-2">
                  <span className="text-[#2563eb] font-bold flex-shrink-0">3.</span>
                  Each morning I review Dext&apos;s extracted data (takes 10 minutes for
                  20–30 documents) and hit approve on anything clean.
                </li>
                <li className="flex gap-2">
                  <span className="text-[#2563eb] font-bold flex-shrink-0">4.</span>
                  Run the &quot;missing documents&quot; report to see who hasn&apos;t submitted
                  their expected items yet.
                </li>
              </ol>
            </div>

            <p className="text-white/60 text-sm mb-5">
              The OCR accuracy on clean PDFs is around 98%. On phone photos it drops to
              roughly 90%, but flagged items are easy to correct. The time saved versus
              manual entry is enormous — I&apos;d estimate 3 hours per week during peak season.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://dext.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
              >
                Try Dext →
              </a>
              <Link
                href="/compare/dext-vs-hubdoc"
                className="rounded-lg border border-white/15 px-5 py-2.5 text-sm text-white/70 hover:border-white/30 hover:text-white transition-colors"
              >
                Dext vs. Hubdoc Comparison
              </Link>
            </div>
          </div>

          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
            <p className="text-sm text-amber-400">
              <span className="font-semibold">Worth noting:</span> Dext&apos;s pricing is per
              document-submitter (client), so costs scale with your client roster. If you have
              under 20 clients, the base plan covers you. Over 50 clients, budget for the mid-tier.
              Compare with Hubdoc (free with Xero/QBO Plus subscriptions) if budget is tight.
            </p>
          </div>
        </section>

        {/* Section 2: Client Communication */}
        <section className="mb-14">
          <div className="mb-2 inline-block rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/50">
            Section 2
          </div>
          <h2 className="text-2xl font-bold text-white md:text-3xl mb-4">
            Client Communication: The Questions That Never Stop
          </h2>

          <p className="text-white/70 leading-relaxed mb-6">
            During tax season, I used to spend 90 minutes a day just answering client emails.
            &quot;When will my return be ready?&quot; &quot;Can I deduct my home office?&quot;
            &quot;What do I owe?&quot; &quot;Did you get my 1099?&quot; Most of these questions
            are repetitive, but each one demands a personal, accurate response. The solution
            isn&apos;t to stop answering — it&apos;s to draft the answers faster.
          </p>

          <div className="rounded-2xl border border-white/10 bg-[#111] p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Claude for Work (Anthropic)</h3>
                <p className="text-white/50 text-sm mt-1">AI writing assistant for professional correspondence</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">$25<span className="text-sm font-normal text-white/50">/user/mo</span></p>
                <p className="text-xs text-white/40 mt-0.5">Claude Pro / Teams plans</p>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed mb-4">
              I use Claude specifically for drafting client emails, not for any tax calculations
              or legal conclusions. The distinction matters. What I&apos;ll do is paste a client&apos;s
              question, my one-line answer, and any relevant context, then ask Claude to write a
              professional, warm, plain-English response at roughly an 8th-grade reading level.
              It takes about 20 seconds to produce a draft I can send after a 10-second review.
            </p>

            <div className="rounded-lg bg-[#0a0a0a] p-4 mb-4">
              <p className="text-sm font-semibold text-[#2563eb] mb-2">My prompt template for client questions:</p>
              <div className="text-sm text-white/60 font-mono bg-[#0a0a0a] leading-relaxed">
                <p>Client question: [paste their email]</p>
                <p className="mt-2">My answer: [one sentence with the actual answer]</p>
                <p className="mt-2">Context: [any relevant details — their filing status,
                  timeline, specific situation]</p>
                <p className="mt-2">Write a professional, warm email response. Keep it under
                  150 words. Plain English, no jargon. Sign off as [Name], CPA.</p>
              </div>
            </div>

            <p className="text-white/60 text-sm mb-5">
              I&apos;ve also built a library of 30 &quot;situation prompts&quot; for the most common
              tax season questions. When a client asks about home office deductions, I pull
              up prompt #14, paste their details, and have a draft in under a minute.
              The time saving over 80+ client emails per week during peak season is material.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://claude.ai"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
              >
                Try Claude →
              </a>
            </div>
          </div>

          <div className="rounded-lg bg-[#111] border border-white/10 p-4">
            <p className="text-sm text-white/60">
              <span className="font-semibold text-white/80">Also tested:</span> ChatGPT Plus
              ($20/mo) works similarly for this use case. I ended up on Claude because the
              outputs require less editing for professional tone, but either works well for
              drafting correspondence. What I&apos;d avoid is using the free tier of any AI for
              client comms — context window size and output quality are meaningfully better
              on the paid tiers.
            </p>
          </div>
        </section>

        {/* Section 3: Tax Research */}
        <section className="mb-14">
          <div className="mb-2 inline-block rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/50">
            Section 3
          </div>
          <h2 className="text-2xl font-bold text-white md:text-3xl mb-4">
            Tax Research: From 45 Minutes to 8 Minutes Per Question
          </h2>

          <p className="text-white/70 leading-relaxed mb-6">
            Tax research used to mean opening CCH, running a search, wading through 40 pages
            of code sections, cross-referencing the regulations, and then finding the actual
            answer buried somewhere in a 2019 Rev. Proc. That process — even for a routine
            question — could take 30–60 minutes. I&apos;m not willing to bill a client $150 every
            time they ask whether a particular expense is deductible, so I was effectively
            eating that research time. Not anymore.
          </p>

          <div className="rounded-2xl border border-white/10 bg-[#111] p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Bloomberg Tax Research</h3>
                <p className="text-white/50 text-sm mt-1">AI-enhanced tax research platform</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">Custom<span className="text-sm font-normal text-white/50"> pricing</span></p>
                <p className="text-xs text-white/40 mt-0.5">Typically $2,000–$8,000/yr per firm</p>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed mb-4">
              Bloomberg Tax added an AI research assistant that lets you ask questions in
              plain English and get answers with citations back to primary sources — the
              actual code, regs, and rulings. This is critical. I don&apos;t trust AI to give me
              a tax answer without a citation; the citation is what I verify and what I stand
              behind. Bloomberg&apos;s AI is trained specifically on tax law, not general web
              content, which dramatically reduces hallucination risk on technical questions.
            </p>

            <div className="rounded-lg bg-[#0a0a0a] p-4 mb-4">
              <p className="text-sm font-semibold text-[#2563eb] mb-2">Example research workflow:</p>
              <ol className="space-y-2 text-sm text-white/70">
                <li className="flex gap-2">
                  <span className="text-[#2563eb] font-bold flex-shrink-0">1.</span>
                  Client question: &quot;I started a home recording studio for my freelance
                  music work. Can I deduct the soundproofing materials?&quot;
                </li>
                <li className="flex gap-2">
                  <span className="text-[#2563eb] font-bold flex-shrink-0">2.</span>
                  Bloomberg AI query: &quot;Deductibility of home studio improvements for
                  self-employed musician, IRC §280A and home office rules&quot;
                </li>
                <li className="flex gap-2">
                  <span className="text-[#2563eb] font-bold flex-shrink-0">3.</span>
                  Review the AI answer + 3 cited sources (takes 8 minutes total including
                  reading the relevant passages).
                </li>
                <li className="flex gap-2">
                  <span className="text-[#2563eb] font-bold flex-shrink-0">4.</span>
                  Use Claude to help me draft the client explanation in plain English.
                </li>
              </ol>
            </div>

            <p className="text-white/60 text-sm mb-5">
              For smaller firms that can&apos;t justify Bloomberg&apos;s price, Tax Notes and
              Checkpoint Edge both offer AI-assisted research at lower price points.
              Checkpoint Edge is part of Thomson Reuters and integrates with their practice
              management tools, which can simplify things if you&apos;re already in their ecosystem.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://pro.bloombergtax.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
              >
                Try Bloomberg Tax →
              </a>
            </div>
          </div>

          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
            <p className="text-sm text-amber-400">
              <span className="font-semibold">Critical caveat:</span> AI tax research tools
              reduce time-to-answer, they do not eliminate professional judgment. You still
              need to read the cited source, assess whether the fact pattern matches, and
              apply your expertise. The AI is a search accelerator, not a substitute for
              your CPA license.
            </p>
          </div>
        </section>

        {/* Section 4: Report Generation */}
        <section className="mb-14">
          <div className="mb-2 inline-block rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/50">
            Section 4
          </div>
          <h2 className="text-2xl font-bold text-white md:text-3xl mb-4">
            Report Generation: Turning Numbers Into Narratives
          </h2>

          <p className="text-white/70 leading-relaxed mb-6">
            The part of tax season I always procrastinated on was the client-facing summary —
            the letter or memo that explains what happened this year, what changed versus last
            year, and what they should be thinking about before December 31st. It&apos;s the
            highest-value thing I deliver, and it took me 45–90 minutes per client to write
            because I was starting from scratch every time. That math doesn&apos;t work across
            150 clients.
          </p>

          <div className="rounded-2xl border border-white/10 bg-[#111] p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Karbon + AI Drafting</h3>
                <p className="text-white/50 text-sm mt-1">Accounting practice management with AI features</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">From $59<span className="text-sm font-normal text-white/50">/user/mo</span></p>
                <p className="text-xs text-white/40 mt-0.5">Team plan</p>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed mb-4">
              Karbon is practice management software built specifically for accounting firms.
              What makes it relevant here is its AI-assisted email and note drafting combined
              with templated client workflows. Once you build a tax season workflow template
              (I built mine over two evenings in December), Karbon handles the status
              tracking, reminder emails, and handoff notes automatically — and the AI draft
              feature pulls in client-specific context from your notes to personalize
              the communications.
            </p>

            <div className="rounded-lg bg-[#0a0a0a] p-4 mb-4">
              <p className="text-sm font-semibold text-[#2563eb] mb-2">My report generation workflow:</p>
              <ol className="space-y-2 text-sm text-white/70">
                <li className="flex gap-2">
                  <span className="text-[#2563eb] font-bold flex-shrink-0">1.</span>
                  After return completion, I open the client&apos;s Karbon record and pull their
                  year-over-year tax figures from my notes.
                </li>
                <li className="flex gap-2">
                  <span className="text-[#2563eb] font-bold flex-shrink-0">2.</span>
                  I paste those figures plus 3–4 bullet points of situation-specific notes
                  into Claude with a prompt: &quot;Write a 400-word tax summary letter for a
                  [client profile] who owed/got back $X this year vs. $Y last year.
                  Tone: professional but warm. Include 2 year-end planning suggestions.&quot;
                </li>
                <li className="flex gap-2">
                  <span className="text-[#2563eb] font-bold flex-shrink-0">3.</span>
                  I review and edit the draft (usually 5 minutes of light editing).
                </li>
                <li className="flex gap-2">
                  <span className="text-[#2563eb] font-bold flex-shrink-0">4.</span>
                  Send via Karbon&apos;s client portal with the return attached.
                </li>
              </ol>
            </div>

            <p className="text-white/60 text-sm mb-5">
              Average time per client summary dropped from 55 minutes to 12 minutes. Across
              150 clients, that&apos;s roughly 64 hours returned to me during the busiest six
              weeks of my year. The quality is actually better too — I&apos;m not writing tired
              at 9pm anymore, so the editing I do is real editing, not trying to generate
              coherent sentences.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.karbon.app"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
              >
                Try Karbon →
              </a>
            </div>
          </div>
        </section>

        {/* Stack Summary */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white md:text-3xl mb-6">
            The Full Stack, at a Glance
          </h2>

          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-[#111]">
                  <th className="px-4 py-3 text-left font-semibold text-white">Tool</th>
                  <th className="px-4 py-3 text-left font-semibold text-white">Job to be done</th>
                  <th className="px-4 py-3 text-left font-semibold text-white">Monthly cost</th>
                  <th className="px-4 py-3 text-left font-semibold text-white">Hrs saved/week</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tool: "Dext", job: "Document capture & OCR extraction", cost: "$50–$120", hrs: "3–4 hrs" },
                  { tool: "Claude for Work", job: "Client email drafting", cost: "$25", hrs: "1.5 hrs" },
                  { tool: "Bloomberg Tax", job: "AI-assisted tax research", cost: "~$167", hrs: "3–5 hrs" },
                  { tool: "Karbon", job: "Practice management + report drafting", cost: "$59", hrs: "2–3 hrs" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/2">
                    <td className="px-4 py-3 font-medium text-white">{row.tool}</td>
                    <td className="px-4 py-3 text-white/60">{row.job}</td>
                    <td className="px-4 py-3 text-white/60">{row.cost}</td>
                    <td className="px-4 py-3 text-[#2563eb] font-medium">{row.hrs}</td>
                  </tr>
                ))}
                <tr className="bg-[#2563eb]/5">
                  <td className="px-4 py-3 font-bold text-white">Total</td>
                  <td className="px-4 py-3 text-white/60">Full tax season AI stack</td>
                  <td className="px-4 py-3 font-bold text-white">~$301–$371</td>
                  <td className="px-4 py-3 font-bold text-[#2563eb]">9–13 hrs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-white/50">
            At a $250/hr billing rate, 10 hours/week over 6 peak weeks = $15,000 in recovered
            capacity per tax season. The stack pays for itself in the first week.
          </p>
        </section>

        {/* What I'd do differently */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white md:text-3xl mb-4">
            What I&apos;d Do Differently Next Year
          </h2>
          <div className="space-y-4">
            {[
              {
                num: "1",
                head: "Start in November, not January",
                body: "I onboarded Dext during the first week of January. That meant I was training clients on a new system during crunch time. Next year I&apos;m sending the onboarding email in November so the habit is set before the documents start flying.",
              },
              {
                num: "2",
                head: "Build the prompt library before peak season",
                body: "My 30 situation prompts for Claude took about 3 hours to build — 3 hours I spent in February when I could least afford it. That's December work.",
              },
              {
                num: "3",
                head: "Add an AI-assisted organizer tool",
                body: "I didn't use a dedicated tax organizer AI this year. Canopy and TaxDome both have features I want to test that could reduce the back-and-forth even further on missing document follow-ups.",
              },
            ].map((item) => (
              <div key={item.num} className="flex gap-4 rounded-xl border border-white/10 bg-[#111] p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#2563eb]/20 text-sm font-bold text-[#2563eb]">
                  {item.num}
                </div>
                <div>
                  <p className="font-semibold text-white">{item.head}</p>
                  <p className="mt-1 text-sm text-white/60">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Links */}
        <section className="mb-10 border-t border-white/10 pt-10">
          <h2 className="text-xl font-bold text-white mb-4">Related Guides &amp; Comparisons</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/compare/dext-vs-hubdoc"
              className="group rounded-xl border border-white/10 bg-[#111] p-4 transition-all hover:border-[#2563eb]/30"
            >
              <p className="font-medium text-white group-hover:text-[#2563eb] transition-colors">
                Dext vs. Hubdoc: Full Comparison
              </p>
              <p className="mt-1 text-xs text-white/50">
                Side-by-side on OCR accuracy, pricing, and integrations
              </p>
            </Link>
            <Link
              href="/compare/best-ai-for-bookkeeping-automation"
              className="group rounded-xl border border-white/10 bg-[#111] p-4 transition-all hover:border-[#2563eb]/30"
            >
              <p className="font-medium text-white group-hover:text-[#2563eb] transition-colors">
                Best AI for Bookkeeping Automation
              </p>
              <p className="mt-1 text-xs text-white/50">
                Top-rated tools for automating bookkeeping workflows
              </p>
            </Link>
          </div>
        </section>

        {/* Disclosure */}
        <div className="rounded-xl border border-white/10 bg-[#111] p-4 text-xs text-white/40">
          <span className="font-semibold text-white/60">Affiliate Disclosure:</span>{" "}
          Links marked with an arrow (→) are affiliate links. We earn a commission if you
          sign up through these links. This doesn&apos;t affect our recommendations — we use
          and pay for these tools ourselves.
        </div>
      </div>
    </>
  );
}
