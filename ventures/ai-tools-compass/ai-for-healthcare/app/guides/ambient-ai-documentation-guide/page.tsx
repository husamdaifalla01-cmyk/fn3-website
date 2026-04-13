import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ambient AI Documentation: How Physicians Reclaim 2 Hours Per Day",
  description:
    "Ambient AI documentation explained: how it differs from traditional dictation, Nuance DAX vs. Abridge vs. Suki comparison, implementation checklist for your practice, and EHR integration considerations.",
  openGraph: {
    title: "Ambient AI Documentation: How Physicians Reclaim 2 Hours Per Day",
    description:
      "A physician's guide to ambient AI documentation — how ambient listening works, which tools lead the space, how to implement, and what to watch for with EHR integration.",
    type: "article",
  },
};

export default function AmbientAIDocumentationGuidePage() {
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
            <span className="text-white/70">Ambient AI Documentation</span>
          </div>

          <div className="mb-4 inline-block rounded-full bg-[#0891b2]/10 px-3 py-1 text-xs font-medium text-[#0891b2]">
            Updated March 2026
          </div>

          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl leading-tight">
            Ambient AI Documentation: How Physicians Reclaim 2 Hours Per Day
          </h1>

          <p className="mt-5 text-lg text-white/70 leading-relaxed">
            The average physician spends 1.5–2.5 hours per day on documentation. In a typical
            10-hour clinical day, that&apos;s 15–25% of time spent writing notes rather than seeing
            patients. Ambient AI documentation changes that math fundamentally — but not all
            implementations are equal, and deploying it poorly creates new problems. This guide
            covers how ambient AI works, which tools lead the market, and how to implement it
            in a way that actually saves time rather than just moving the burden.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-white/60">
              <svg className="h-3.5 w-3.5 text-[#0891b2]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              ~14 min read
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-white/60">
              <svg className="h-3.5 w-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              3 tools compared
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-white/60">
              <svg className="h-3.5 w-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Implementation checklist included
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12">

        {/* Section 1: What is ambient AI */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-white md:text-3xl mb-4">
            Ambient AI vs. Traditional Dictation: What&apos;s Actually Different
          </h2>

          <p className="text-white/70 leading-relaxed mb-6">
            Traditional dictation (Dragon Medical, older voice-to-text tools) requires the
            physician to explicitly narrate documentation after or between patient encounters.
            You speak, it transcribes, you review and edit. It saves some time compared to
            typing, but it&apos;s still a distinct, time-consuming workflow step — and it happens
            outside the encounter, not during it.
          </p>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <div className="rounded-xl border border-white/10 bg-[#111] p-5">
              <h3 className="font-semibold text-white mb-3">Traditional Dictation</h3>
              <ul className="space-y-2">
                {[
                  "Physician narrates after patient leaves",
                  "Transcription is verbatim — needs heavy editing",
                  "Separate workflow step, separate tool",
                  "Still creates documentation burden",
                  "No context from conversation — just what you say",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                    <span className="mt-1 h-3 w-3 flex-shrink-0 rounded-full border border-white/20" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#0891b2]/20 bg-[#0891b2]/5 p-5">
              <h3 className="font-semibold text-white mb-3">Ambient AI Documentation</h3>
              <ul className="space-y-2">
                {[
                  "Listens during the encounter passively",
                  "Generates structured clinical note automatically",
                  "Integrated into EHR — no separate tool switch",
                  "Physician reviews and edits draft (not narrates)",
                  "Captures full conversation context for richer notes",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0891b2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed mb-4">
            The critical distinction is that ambient AI flips the documentation workflow from
            &quot;generate then edit&quot; to &quot;edit a pre-generated draft.&quot; Physicians consistently report
            that editing a structured draft takes 2–4 minutes per note, versus 8–15 minutes
            for traditional dictation plus editing. At 20 patients/day, that&apos;s 120–220 minutes
            returned daily.
          </p>

          <div className="rounded-lg bg-[#0891b2]/5 border border-[#0891b2]/20 p-4">
            <p className="text-sm text-white/70">
              <span className="font-semibold text-[#0891b2]">Key requirement:</span> Ambient AI
              requires patient notification and consent before recording begins. All major
              platforms include built-in consent workflows. This is both a regulatory requirement
              and a trust issue — patients generally respond positively when the technology is
              explained clearly as &quot;helping me write your notes more accurately so I can focus
              on you during our visit.&quot;
            </p>
          </div>
        </section>

        {/* Section 2: Tool Comparison */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-white md:text-3xl mb-4">
            Nuance DAX vs. Abridge vs. Suki: Which Ambient AI Leads the Market
          </h2>

          <p className="text-white/70 leading-relaxed mb-8">
            Three platforms dominate ambient AI documentation for physician practices.
            Each has a distinct positioning: Nuance DAX is the established enterprise choice
            with the deepest Epic integration, Abridge is the clinician-favorite in independent
            studies with strong note quality, and Suki is the fastest-growing option for
            independent practices. Here&apos;s how they compare.
          </p>

          <div className="space-y-6">
            {[
              {
                name: "Nuance DAX Copilot",
                badge: "Best Epic integration",
                price: "Custom pricing (~$150–$250/provider/mo at scale)",
                url: "https://www.nuance.com/healthcare/ambient-clinical-intelligence.html",
                description: "Nuance DAX (part of Microsoft after the 2022 acquisition) is the market leader by deployment volume, particularly in large health systems. The DAX Copilot product integrates directly into Epic's ambient listening workflow, meaning note drafts appear in the Epic chart without any manual steps. The Microsoft/Azure infrastructure gives enterprise compliance teams confidence on data security and BAA coverage.",
                strengths: [
                  "Deepest native Epic integration in the market",
                  "Microsoft Azure infrastructure — enterprise-grade security",
                  "Largest deployed base (validation at scale)",
                  "Multi-specialty support (80+ specialties)",
                  "Strong ambient + dictation hybrid mode",
                ],
                weaknesses: [
                  "Enterprise-focused pricing; cost-prohibitive for solo/small practices",
                  "Implementation complexity and onboarding time",
                  "Some user reviews cite note verbosity needing significant editing",
                ],
                ehr: "Epic (native), Cerner, others via integration",
                hipaa: "Full HIPAA compliance; BAA available; Microsoft Azure HITRUST",
              },
              {
                name: "Abridge",
                badge: "Best note quality",
                price: "Custom pricing; $99–$149/provider/mo for practices (reported)",
                url: "https://www.abridge.com",
                description: "Abridge has earned a strong reputation among clinicians in independent evaluations for producing the most clinician-friendly note structure — less editing required out of the box. It was built specifically by physicians and AI researchers, and that shows in the output. Partnership with UPMC and UCSF has provided significant training data and clinical validation. Increasingly available in Epic through the App Orchard.",
                strengths: [
                  "Consistently rated highest for note quality in clinician surveys",
                  "Less post-generation editing required than competitors",
                  "Epic App Orchard integration (growing coverage)",
                  "Physician-founded; strong clinical input on note design",
                  "Supports nuanced patient education summary generation",
                ],
                weaknesses: [
                  "Smaller enterprise deployment base than Nuance",
                  "Epic integration still maturing compared to DAX",
                  "Fewer specialty templates than DAX at launch",
                ],
                ehr: "Epic (App Orchard), others expanding",
                hipaa: "Full HIPAA compliance; BAA available",
              },
              {
                name: "Suki AI",
                badge: "Best for independent practices",
                price: "From $99/provider/mo",
                url: "https://www.suki.ai",
                description: "Suki occupies a distinct niche: it's the best-positioned ambient AI for independent physician practices and small group practices that aren't on Epic or want a standalone solution. Its more transparent pricing model, faster onboarding, and strong mobile app (can use your phone as the ambient microphone) make it accessible to practices that enterprise tools ignore. Integrates with Epic, Cerner, eClinicalWorks, Athena, and others.",
                strengths: [
                  "Transparent, accessible pricing for independent practices",
                  "Broadest EHR integration list (Epic, Cerner, Athena, eCW, and more)",
                  "Phone-as-microphone mode — no additional hardware",
                  "Fast implementation (practices report going live in days, not months)",
                  "Strong telemedicine support",
                ],
                weaknesses: [
                  "Note quality generally rated below Abridge in direct comparisons",
                  "Less suited for high-complexity subspecialty documentation",
                  "Smaller training dataset than Nuance",
                ],
                ehr: "Epic, Cerner, Athena, eClinicalWorks, Allscripts, and more",
                hipaa: "Full HIPAA compliance; BAA available",
              },
            ].map((tool) => (
              <div key={tool.name} className="rounded-2xl border border-white/10 bg-[#111] p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                      <span className="rounded-full bg-[#0891b2]/20 px-2 py-0.5 text-xs font-medium text-[#0891b2]">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-sm text-white/40">{tool.price}</p>
                  </div>
                </div>

                <p className="text-sm text-white/70 leading-relaxed mb-5">{tool.description}</p>

                <div className="grid gap-4 md:grid-cols-2 mb-5">
                  <div>
                    <p className="mb-2 text-xs font-semibold text-green-400">Strengths</p>
                    <ul className="space-y-1.5">
                      {tool.strengths.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-xs text-white/70">
                          <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold text-red-400">Limitations</p>
                    <ul className="space-y-1.5">
                      {tool.weaknesses.map((w) => (
                        <li key={w} className="flex items-start gap-2 text-xs text-white/70">
                          <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid gap-3 rounded-lg bg-[#0a0a0a] p-3 text-xs sm:grid-cols-2 mb-4">
                  <div>
                    <span className="text-white/40">EHR integration: </span>
                    <span className="text-white/70">{tool.ehr}</span>
                  </div>
                  <div>
                    <span className="text-white/40">HIPAA/compliance: </span>
                    <span className="text-white/70">{tool.hipaa}</span>
                  </div>
                </div>

                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-block rounded-lg bg-[#0891b2] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
                >
                  Learn about {tool.name} →
                </a>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/compare/nuance-dax-vs-abridge"
              className="inline-flex items-center gap-2 rounded-lg border border-[#0891b2]/30 bg-[#0891b2]/5 px-4 py-2.5 text-sm font-medium text-[#0891b2] hover:bg-[#0891b2]/10 transition-colors"
            >
              See full Nuance DAX vs. Abridge comparison →
            </Link>
          </div>
        </section>

        {/* Section 3: Implementation Checklist */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-white md:text-3xl mb-4">
            Implementation Checklist for a Medical Practice
          </h2>

          <p className="text-white/70 leading-relaxed mb-6">
            Practices that get the most out of ambient AI documentation don&apos;t just install
            the software and hope for the best. The implementations that succeed share a
            common pattern: deliberate pre-work, phased rollout, and ongoing feedback loops.
            Here&apos;s the checklist that works.
          </p>

          <div className="space-y-3">
            {[
              {
                phase: "Pre-Implementation",
                items: [
                  {
                    task: "Audit your current documentation workflow",
                    detail: "Time yourself on 10 typical notes. Know your baseline before you can measure improvement.",
                  },
                  {
                    task: "Confirm EHR compatibility",
                    detail: "Contact your EHR vendor and the ambient AI vendor together. Get a clear answer on what data flows where and what requires manual copy-paste.",
                  },
                  {
                    task: "Draft patient consent language",
                    detail: "Work with your compliance team or attorney to finalize the verbal and written consent approach. Most vendors provide template language.",
                  },
                  {
                    task: "Define your note template expectations",
                    detail: "What sections do you need? SOAP, APSO, problem-based? Communicate this clearly to your vendor during setup — don't accept the default if it doesn't fit your workflow.",
                  },
                  {
                    task: "Execute a BAA with the vendor",
                    detail: "Every ambient AI documentation vendor should provide a Business Associate Agreement. Do not go live without one signed.",
                  },
                ],
              },
              {
                phase: "Pilot Phase (Weeks 1–2)",
                items: [
                  {
                    task: "Start with 1–2 willing physician champions",
                    detail: "Resistance to new tools spreads faster than enthusiasm. Start with advocates, not skeptics.",
                  },
                  {
                    task: "Run ambient listening on 5–10 encounters per day in the first week",
                    detail: "Don't immediately use AI output in the EHR — read the drafts and compare to what you would have written. Calibrate your expectations.",
                  },
                  {
                    task: "Document editing time per note",
                    detail: "Start tracking the time from 'ambient session ends' to 'note signed.' This becomes your ROI data.",
                  },
                  {
                    task: "Collect specialty-specific edge cases",
                    detail: "Note where the AI consistently misses nuance for your specific case types. Most vendors have specialty template customization available.",
                  },
                ],
              },
              {
                phase: "Full Rollout (Weeks 3–8)",
                items: [
                  {
                    task: "Train all participating physicians in a 30-minute session",
                    detail: "Focus on: starting a session, reviewing the draft, editing efficiently, and submitting to the EHR. Keep it practical.",
                  },
                  {
                    task: "Establish a team feedback channel",
                    detail: "A shared document or Slack channel where physicians can flag recurring errors or note quality issues speeds up vendor-assisted optimization.",
                  },
                  {
                    task: "Schedule a 30-day review with your vendor",
                    detail: "Reputable vendors will offer this. Use your editing time data to demonstrate what's working and what needs tuning.",
                  },
                ],
              },
              {
                phase: "Ongoing",
                items: [
                  {
                    task: "Establish a note quality review process",
                    detail: "Peer review a sample of AI-assisted notes monthly in the first 6 months. AI-generated errors tend to be systematic — catching a pattern early prevents repeated issues.",
                  },
                  {
                    task: "Review and revoke ambient access for departed staff",
                    detail: "Standard IT hygiene, but more important with ambient AI given the sensitivity of recorded encounters.",
                  },
                  {
                    task: "Stay current on vendor updates",
                    detail: "Ambient AI is evolving fast. Every major vendor is shipping meaningful improvements quarterly. Review release notes and retrain team when capabilities change significantly.",
                  },
                ],
              },
            ].map((phase) => (
              <div key={phase.phase} className="rounded-xl border border-white/10 bg-[#111] overflow-hidden">
                <div className="border-b border-white/10 bg-[#0891b2]/10 px-5 py-3">
                  <p className="font-semibold text-[#0891b2]">{phase.phase}</p>
                </div>
                <div className="p-5 space-y-4">
                  {phase.items.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded border border-white/20 flex items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-sm bg-white/20" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{item.task}</p>
                        <p className="mt-0.5 text-xs text-white/50 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: EHR Integration Considerations */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-white md:text-3xl mb-4">
            EHR Integration: What You Need to Know Before You Buy
          </h2>

          <p className="text-white/70 leading-relaxed mb-6">
            &quot;Integrates with Epic&quot; can mean many things, and the gap between
            them matters operationally. Before finalizing a vendor, ask specifically about
            the integration mode for your EHR:
          </p>

          <div className="space-y-4 mb-6">
            {[
              {
                level: "Native / Built-In Integration",
                description: "The ambient AI is accessible directly from your EHR workflow — you start a session from within Epic/Cerner, the draft appears in the note field, and signing the note requires no additional steps.",
                example: "Nuance DAX Copilot + Epic (via Microsoft partnership) is the clearest example of this level.",
                icon: "✓✓",
                iconColor: "text-green-400",
              },
              {
                level: "App Orchard / Marketplace Integration",
                description: "The ambient AI connects via the EHR's app marketplace. One-click launch is possible, and note drafts can push directly to the note field, but the setup may require IT configuration and EHR administrator access.",
                example: "Abridge + Epic via App Orchard is at this level in most implementations.",
                icon: "✓",
                iconColor: "text-[#0891b2]",
              },
              {
                level: "FHIR API Integration",
                description: "The ambient AI pulls patient context from the EHR via FHIR API and pushes the completed note back. Reliable, but requires IT setup and may have a slight workflow gap (e.g., opening a separate browser tab for the ambient tool).",
                example: "Suki AI with Athena or eClinicalWorks typically uses this approach.",
                icon: "~",
                iconColor: "text-amber-400",
              },
              {
                level: "Copy-Paste Integration",
                description: "The ambient AI generates a note in its own interface and the physician copies it into the EHR. This still saves significant time compared to writing from scratch, but adds a manual step and creates a gap in the audit trail.",
                example: "Any ambient AI that doesn't have a direct integration with your specific EHR version.",
                icon: "!",
                iconColor: "text-red-400",
              },
            ].map((item) => (
              <div key={item.level} className="flex gap-4 rounded-xl border border-white/10 bg-[#111] p-5">
                <div className={`flex-shrink-0 text-lg font-bold ${item.iconColor}`}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">{item.level}</p>
                  <p className="text-sm text-white/70 leading-relaxed mb-2">{item.description}</p>
                  <p className="text-xs text-white/40">
                    <span className="font-medium text-white/50">Example: </span>{item.example}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
            <p className="text-sm text-amber-400">
              <span className="font-semibold">Practical advice:</span> When evaluating a vendor,
              ask for a live demonstration in your actual EHR version (not a demo environment).
              Integration quality can vary significantly between EHR versions even from the same
              vendor. The demo should show exactly the workflow your physicians will use daily.
            </p>
          </div>
        </section>

        {/* The 2-hour math */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Where the 2 Hours Actually Come From</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-[#111]">
                  <th className="px-4 py-3 text-left font-semibold text-white">Documentation Task</th>
                  <th className="px-4 py-3 text-left font-semibold text-white">Without Ambient AI</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#0891b2]">With Ambient AI</th>
                  <th className="px-4 py-3 text-left font-semibold text-white/50">Saved/Day</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { task: "Progress notes (20 patients)", without: "12 min/note = 240 min", with: "3 min/note = 60 min", saved: "180 min" },
                  { task: "After-hours documentation (inbox)", without: "45 min", with: "15 min", saved: "30 min" },
                  { task: "Patient instructions / summaries", without: "5 min/patient = 100 min", with: "1.5 min = 30 min", saved: "70 min" },
                  { task: "Total (typical 20-patient day)", without: "~385 min (6.4 hrs)", with: "~105 min (1.75 hrs)", saved: "~280 min (4.7 hrs)" },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-white/5 ${i === 3 ? "bg-[#0891b2]/5 font-semibold" : ""}`}>
                    <td className="px-4 py-3 text-white">{row.task}</td>
                    <td className="px-4 py-3 text-white/50">{row.without}</td>
                    <td className="px-4 py-3 text-[#0891b2] font-medium">{row.with}</td>
                    <td className="px-4 py-3 text-green-400 font-medium">{row.saved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-white/40">
            Based on reported averages from published implementation studies. Individual results
            vary by specialty, note complexity, and EHR integration quality.
          </p>
        </section>

        {/* Related */}
        <section className="mb-10 border-t border-white/10 pt-10">
          <h2 className="text-xl font-bold text-white mb-4">Related Guides &amp; Comparisons</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/compare/nuance-dax-vs-abridge"
              className="group rounded-xl border border-white/10 bg-[#111] p-4 transition-all hover:border-[#0891b2]/30"
            >
              <p className="font-medium text-white group-hover:text-[#0891b2] transition-colors">
                Nuance DAX vs. Abridge: Full Comparison
              </p>
              <p className="mt-1 text-xs text-white/50">
                Side-by-side on EHR integrations, pricing, and specialty support
              </p>
            </Link>
            <Link
              href="/compare/best-ai-clinical-documentation"
              className="group rounded-xl border border-white/10 bg-[#111] p-4 transition-all hover:border-[#0891b2]/30"
            >
              <p className="font-medium text-white group-hover:text-[#0891b2] transition-colors">
                Best AI for Clinical Documentation
              </p>
              <p className="mt-1 text-xs text-white/50">
                Full ranking of clinical documentation AI tools in 2026
              </p>
            </Link>
          </div>
        </section>

        {/* Disclosure */}
        <div className="rounded-xl border border-white/10 bg-[#111] p-4 text-xs text-white/40">
          <span className="font-semibold text-white/60">Affiliate Disclosure:</span>{" "}
          Links marked with an arrow (→) are affiliate links. We earn a commission if you
          sign up through these links at no cost to you. Clinical recommendations are editorially
          independent and based on published research and user feedback.
        </div>
      </div>
    </>
  );
}
