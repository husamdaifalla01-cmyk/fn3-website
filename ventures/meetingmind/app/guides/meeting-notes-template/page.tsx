import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Professional Meeting Notes Template (Free Download, 2026) | MeetingMind',
  description:
    'The 5-section meeting notes format used by top teams. Includes copy-paste templates for 1:1s, standups, client calls, board meetings, and project kickoffs.',
  keywords: [
    'meeting notes template',
    'professional meeting notes format',
    'meeting notes format',
    'how to write meeting notes',
    'meeting minutes template',
    'team meeting notes',
  ],
  openGraph: {
    title: 'Professional Meeting Notes Template (Free Download, 2026)',
    description:
      'The 5-section format used by top teams. Copy-paste templates for every meeting type — or let AI generate them in 30 seconds.',
    type: 'article',
  },
}

export default function MeetingNotesTemplatePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-gray-900">
            MeetingMind<span className="text-brand-600">.</span>
          </Link>
          <Link
            href="/analyze"
            className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Try free
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Professional Meeting Notes Template (Free Download, 2026)
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Good meeting notes aren&apos;t just a record — they&apos;re a decision log, an accountability system, and a legal protection. This guide gives you the five-section format every professional should know, plus copy-paste templates for every major meeting type.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-12">
          <h2 className="font-bold text-gray-900 mb-3">In this guide</h2>
          <ol className="space-y-2 text-sm text-brand-600">
            <li><a href="#why" className="hover:underline">1. Why good meeting notes matter</a></li>
            <li><a href="#five-sections" className="hover:underline">2. The 5 sections every meeting note needs</a></li>
            <li><a href="#templates" className="hover:underline">3. Templates for every meeting type</a></li>
            <li><a href="#faster" className="hover:underline">4. How to write meeting notes faster</a></li>
          </ol>
        </div>

        {/* Section 1 */}
        <section id="why" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Why good meeting notes matter</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Professionals spend an average of 31 hours in unproductive meetings every month. What makes a meeting productive isn&apos;t just what happens during it — it&apos;s what gets captured afterward. Without a structured record, even the most focused meetings lose their output.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Here&apos;s what good meeting notes do for you:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              { title: 'Create accountability', desc: 'When action items are written down with named owners and deadlines, completion rates jump from ~60% to over 90%. What gets measured gets done.' },
              { title: 'Prevent revisiting closed decisions', desc: 'Without a decision log, teams re-litigate the same questions meeting after meeting. Notes that capture what was decided — and why — stop that cycle.' },
              { title: 'Protect you in client relationships', desc: 'Clients remember what they wanted, not what they agreed to. A written record of every commitment eliminates scope disputes before they start.' },
              { title: 'Onboard people who missed the meeting', desc: 'A well-structured set of notes means anyone who couldn\'t attend can get fully up to speed in five minutes — not 30.' },
            ].map(({ title, desc }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="text-brand-600 font-bold mt-0.5">—</span>
                <div>
                  <strong className="text-gray-900">{title}.</strong>
                  <span className="text-gray-600"> {desc}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-gray-700 leading-relaxed">
            The ROI is concrete. If your average meeting has six attendees earning $75/hour and runs 60 minutes, that&apos;s $450 of salary time. Notes that capture a clear decision and three action items can prevent one unnecessary follow-up meeting — saving $450 immediately.
          </p>
        </section>

        {/* Section 2 */}
        <section id="five-sections" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. The 5 sections every meeting note needs</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Regardless of meeting type or length, every set of notes should have these five sections. Skip any one and you lose a critical piece of the record.
          </p>
          <div className="space-y-6">
            {[
              {
                num: '01',
                title: 'Attendees',
                desc: 'List every person present, including their role or company for external participants. This matters for accountability ("Marcus agreed to deliver X") and for legal defensibility ("the client\'s CTO was in the room when this was discussed").',
                tip: 'Include people who were invited but didn\'t attend — marked as "absent." Their absence is relevant context if decisions were made that affect them.',
              },
              {
                num: '02',
                title: 'Agenda',
                desc: 'Document what was supposed to be covered, even if the meeting went off-track. This creates a trail showing whether the meeting accomplished its stated purpose and what got deferred.',
                tip: 'If your meeting didn\'t have an agenda going in, write a retrospective one. "Topics discussed" works fine.',
              },
              {
                num: '03',
                title: 'Discussion',
                desc: 'A brief summary of what was said — not a verbatim transcript. Focus on the reasoning behind decisions, concerns raised, and context that would be lost otherwise. This section helps people who weren\'t in the meeting understand the "why."',
                tip: 'Aim for bullet points, not paragraphs. Three to five bullets per agenda item is usually enough.',
              },
              {
                num: '04',
                title: 'Decisions',
                desc: 'The most underused section in most meeting notes. Every decision made should be documented explicitly: what was decided, who made the call, and any conditions attached. This is your insurance policy against "I don\'t remember agreeing to that."',
                tip: 'Use clear, declarative language. Not "we discussed possibly moving the launch" but "Decision: launch date moved to April 14th."',
              },
              {
                num: '05',
                title: 'Action Items',
                desc: 'Each action item needs three things: the specific task, the named owner, and a deadline. Without all three, it\'s a wish, not a commitment. A task assigned to "the team" or "everyone" belongs to no one.',
                tip: 'Sort action items by owner so each person can quickly scan their own list. Send the notes within 24 hours while context is fresh.',
              },
            ].map(({ num, title, desc, tip }) => (
              <div key={num} className="border border-gray-100 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-bold text-brand-200 leading-none mt-0.5">{num}</span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">{desc}</p>
                    <div className="bg-brand-50 rounded-lg px-4 py-3 text-sm text-brand-700">
                      <strong>Pro tip:</strong> {tip}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 — Templates */}
        <section id="templates" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Templates for every meeting type</h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            Different meeting types have different emphasis. A 1:1 focuses on personal development and blockers. A client call focuses on commitments and scope. Here are purpose-built templates for the five most common meeting types.
          </p>

          {[
            {
              type: '1:1 Meeting',
              badge: 'bg-purple-100 text-purple-700',
              template: `MEETING: 1:1 — [Manager Name] / [Report Name]
DATE: [Date] | DURATION: [Time]

AGENDA
──────
• Wins since last 1:1
• Current priorities and blockers
• Career / development topics
• Manager feedback

DISCUSSION NOTES
────────────────
Wins: [Key accomplishments since last meeting]
Blockers: [What's slowing progress — technical, process, people]
Development: [Skills, goals, opportunities discussed]

DECISIONS
─────────
• [Any decisions made about priorities, projects, etc.]

ACTION ITEMS
────────────
[ ] Task: _____ | Owner: _____ | By: _____
[ ] Task: _____ | Owner: _____ | By: _____

NEXT 1:1: [Date]`,
            },
            {
              type: 'Team Standup',
              badge: 'bg-green-100 text-green-700',
              template: `STANDUP: [Team Name]
DATE: [Date]

UPDATES BY PERSON
─────────────────
[Name]:
  Done: [What was completed]
  Today: [What they're working on]
  Blockers: [Anything blocking progress]

[Name]:
  Done: _____ | Today: _____ | Blockers: _____

BLOCKERS REQUIRING ACTION
─────────────────────────
• [Blocker] → Owner to resolve: [Name] by [Date]

ACTION ITEMS
────────────
[ ] Task: _____ | Owner: _____ | By: _____`,
            },
            {
              type: 'Client Call',
              badge: 'bg-blue-100 text-blue-700',
              template: `CLIENT CALL: [Client Name] / [Project]
DATE: [Date] | ATTENDEES: [Your team] + [Client contacts + titles]

AGENDA COVERED
──────────────
• [Topic 1]
• [Topic 2]

DISCUSSION SUMMARY
──────────────────
[High-level summary of what was discussed — 3–5 bullets max]

DECISIONS & AGREEMENTS
──────────────────────
• Decision: [What was agreed] — confirmed by [Client name]
• Decision: [What was agreed] — confirmed by [Client name]

CLIENT COMMITMENTS (they owe us)
─────────────────────────────────
[ ] Task: _____ | Client owner: _____ | By: _____

OUR COMMITMENTS (we owe them)
──────────────────────────────
[ ] Task: _____ | Our owner: _____ | By: _____

NEXT CALL: [Date / TBD]`,
            },
            {
              type: 'Board Meeting',
              badge: 'bg-red-100 text-red-700',
              template: `BOARD MEETING: [Company Name]
DATE: [Date] | LOCATION: [Location / Virtual]
DIRECTORS PRESENT: [Names + roles]
DIRECTORS ABSENT: [Names]
ALSO PRESENT: [Executives, advisors, counsel]

CALL TO ORDER
─────────────
Meeting called to order at [Time] by [Name].
Quorum: [Yes / No — X of Y directors present]

AGENDA ITEMS
────────────
1. [Agenda item] — Presented by [Name]
   Summary: [Key points]
   Vote: [Approved / Deferred / Rejected] — [Unanimous / X–Y]

2. [Agenda item] — Presented by [Name]
   Summary: _____
   Vote: _____

FORMAL RESOLUTIONS
──────────────────
RESOLVED: [Exact resolution language]
Result: [Approved unanimously / X–Y vote]

ACTION ITEMS
────────────
[ ] Task: _____ | Owner: _____ | By: _____

ADJOURNMENT
───────────
Meeting adjourned at [Time].
Next board meeting: [Date / TBD]
Minutes recorded by: [Name]`,
            },
            {
              type: 'Project Kickoff',
              badge: 'bg-yellow-100 text-yellow-700',
              template: `PROJECT KICKOFF: [Project Name]
DATE: [Date]
ATTENDEES: [Names + roles]

PROJECT OVERVIEW
────────────────
Goal: [One sentence — what does success look like?]
Scope: [What's in / what's explicitly out]
Timeline: [Start date → Target end date]
Budget: [If applicable]

ROLES & RESPONSIBILITIES
────────────────────────
Project Lead: [Name]
Technical Lead: [Name]
Stakeholder / Sponsor: [Name]
[Other roles]: [Names]

KEY DECISIONS MADE
──────────────────
• [Decision 1 — e.g., tech stack, methodology]
• [Decision 2]

RISKS & OPEN QUESTIONS
───────────────────────
• Risk: [Description] → Mitigation: [Plan]
• Open: [Question that needs to be answered] → Owner: [Name]

ACTION ITEMS
────────────
[ ] Task: _____ | Owner: _____ | By: _____
[ ] Task: _____ | Owner: _____ | By: _____

NEXT MILESTONE: [Milestone name] by [Date]`,
            },
          ].map(({ type, badge, template }) => (
            <div key={type} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${badge}`}>{type}</span>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 text-sm font-mono">
                <div className="text-green-400 mb-3 font-sans font-semibold text-xs uppercase tracking-wider">
                  Copy-paste template
                </div>
                <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed">{template}</pre>
              </div>
            </div>
          ))}
        </section>

        {/* Section 4 */}
        <section id="faster" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How to write meeting notes faster</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            The biggest barrier to good notes is time. Most people know what good notes look like — they just can&apos;t produce them while also running or participating in the meeting. Here are the approaches that actually work.
          </p>
          <div className="space-y-5">
            {[
              {
                title: 'Use a template before the meeting starts',
                desc: 'Open your template and fill in the attendees, date, and agenda items before anyone joins. By the time the meeting starts, you only need to fill in the blanks.',
              },
              {
                title: 'Take live notes during, not after',
                desc: 'Capture bullet points in real time, even if they\'re rough. Polishing notes while the meeting is still fresh (immediately after) takes 10 minutes. Reconstructing a meeting from memory two hours later takes 40 minutes and is less accurate.',
              },
              {
                title: 'Use shorthand for the discussion section',
                desc: 'The discussion section doesn\'t need to be prose. Three-word bullets are fine: "timeline concern raised (Sarah)" or "budget not finalized — deferred." You can expand later if needed.',
              },
              {
                title: 'Designate a notetaker in advance',
                desc: 'The meeting facilitator should not take notes. Running a meeting and taking notes simultaneously degrades both. Rotate the notetaker role or assign it permanently to one team member.',
              },
              {
                title: 'Use AI for transcripts you already have',
                desc: 'If your meeting tool (Zoom, Teams, Meet) generates a transcript, paste it into an AI tool to extract the structured notes automatically. What takes 30 minutes manually takes 30 seconds with AI — with higher accuracy.',
              },
            ].map(({ title, desc }, i) => (
              <div key={title} className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-100 text-brand-700 font-bold text-sm flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <strong className="text-gray-900 block mb-1">{title}</strong>
                  <p className="text-gray-600 leading-relaxed text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-brand-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Skip the manual templates entirely
          </h2>
          <p className="text-brand-100 mb-6 max-w-lg mx-auto">
            Paste your meeting transcript and get a complete summary, action items, decision log, and follow-up email in 30 seconds. Every section filled in automatically.
          </p>
          <Link
            href="/analyze"
            className="inline-block bg-white text-brand-600 hover:bg-brand-50 font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Try MeetingMind free
          </Link>
          <p className="text-brand-200 text-sm mt-4">No credit card required. First meeting analysis is free.</p>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-bold text-white text-lg">
            MeetingMind<span className="text-brand-500">.</span>
          </div>
          <p className="text-sm">© 2026 MeetingMind. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="mailto:hello@meetingmind.ai" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
