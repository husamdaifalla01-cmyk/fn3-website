import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meeting Action Items Template: How to Never Miss a Follow-Up | MeetingMind',
  description:
    'A practical guide to tracking meeting action items that actually get done. Includes a copy-paste template, the SMART framework, and how AI extraction works.',
  keywords: [
    'meeting action items template',
    'how to track action items from meetings',
    'meeting follow up template',
    'action items after meeting',
    'meeting minutes action items',
  ],
  openGraph: {
    title: 'Meeting Action Items Template: How to Never Miss a Follow-Up',
    description:
      'Stop losing action items after every meeting. Use this free template and SMART framework to track every task — or let AI do it in 30 seconds.',
    type: 'article',
  },
}

const templateRows = [
  { task: 'Send revised proposal to client', owner: 'Sarah', deadline: 'Friday, Mar 28', priority: 'High', status: 'In Progress' },
  { task: 'Set up staging environment', owner: 'Marcus', deadline: 'Tuesday, Mar 25', priority: 'High', status: 'Not Started' },
  { task: 'Review new design system components', owner: 'Jamie', deadline: 'End of week', priority: 'Medium', status: 'Not Started' },
  { task: 'Send calendar invite for design review', owner: 'Sarah', deadline: 'Thursday, Mar 27', priority: 'Medium', status: 'Done' },
  { task: 'Confirm API auth approach with team', owner: 'Marcus', deadline: 'No deadline set', priority: 'Low', status: 'Not Started' },
]

export default function MeetingActionItemsGuide() {
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
            Meeting Action Items Template: How to Never Miss a Follow-Up
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            The average professional attends 25 meetings a week. Research shows 30–40% of action items from those meetings are never completed. This guide explains why — and gives you a practical system to fix it.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-12">
          <h2 className="font-bold text-gray-900 mb-3">In this guide</h2>
          <ol className="space-y-2 text-sm text-brand-600">
            <li><a href="#why-lost" className="hover:underline">1. Why action items get lost after every meeting</a></li>
            <li><a href="#smart" className="hover:underline">2. The SMART framework for action items</a></li>
            <li><a href="#ai-extraction" className="hover:underline">3. How AI action item extraction works</a></li>
            <li><a href="#template" className="hover:underline">4. Copy-paste template for manual tracking</a></li>
            <li><a href="#comparison" className="hover:underline">5. Tool comparison: manual vs AI</a></li>
          </ol>
        </div>

        {/* Section 1 */}
        <section id="why-lost" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Why action items get lost after every meeting</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Most meetings end without a clear record. Notes are scattered — some in a shared doc, some in someone's notebook, some only in people's heads. By the time the follow-up email lands (if it does), half the context has evaporated.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            There are three root causes:
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <span className="text-brand-600 font-bold mt-0.5">1.</span>
              <div>
                <strong className="text-gray-900">No single owner.</strong>
                <span className="text-gray-600"> When a task is assigned to "the team," it belongs to no one. Without a named individual responsible, it doesn't get done.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-600 font-bold mt-0.5">2.</span>
              <div>
                <strong className="text-gray-900">No deadline.</strong>
                <span className="text-gray-600"> "We'll get to that" is not a deadline. Tasks without dates drift indefinitely until the next meeting, when everyone realizes they didn't happen.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-600 font-bold mt-0.5">3.</span>
              <div>
                <strong className="text-gray-900">No written record.</strong>
                <span className="text-gray-600"> If action items live only in people's memory or in a quickly-forgotten email, they're invisible. Out of sight, out of mind.</span>
              </div>
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            The fix is simple in principle: every action item needs a specific task, a named owner, and a concrete deadline. The hard part is capturing that consistently — especially when you're the one running the meeting.
          </p>
        </section>

        {/* Section 2 */}
        <section id="smart" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. The SMART framework for action items</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            The SMART framework — originally designed for goal-setting — applies directly to meeting action items. Each task should be:
          </p>
          <div className="space-y-4 mb-6">
            {[
              { letter: 'S', word: 'Specific', bad: '"Follow up on the proposal"', good: '"Send the revised proposal PDF to client@example.com"' },
              { letter: 'M', word: 'Measurable', bad: '"Work on the onboarding flow"', good: '"Complete wireframes for steps 1–3 of onboarding"' },
              { letter: 'A', word: 'Assigned', bad: '"Someone should schedule a review"', good: '"Sarah schedules the design review with stakeholders"' },
              { letter: 'R', word: 'Realistic', bad: '"Launch the full feature by Friday"', good: '"Deliver v1 scope to QA by Friday; full launch next sprint"' },
              { letter: 'T', word: 'Time-bound', bad: '"When you get a chance"', good: '"By Thursday EOD"' },
            ].map(({ letter, word, bad, good }) => (
              <div key={letter} className="border border-gray-100 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-brand-600 text-white font-bold flex items-center justify-center text-sm">{letter}</span>
                  <span className="font-semibold text-gray-900">{word}</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-red-600 font-medium mb-1">Bad:</p>
                    <p className="text-red-800">&ldquo;{bad}&rdquo;</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-green-600 font-medium mb-1">Good:</p>
                    <p className="text-green-800">&ldquo;{good}&rdquo;</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-700 leading-relaxed">
            In practice, applying SMART criteria mid-meeting requires discipline and slows things down. That's where automation helps — but more on that in section 3.
          </p>
        </section>

        {/* Section 3 */}
        <section id="ai-extraction" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How AI action item extraction works</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Modern AI models can parse meeting transcripts and identify action items more reliably than most humans taking notes mid-meeting. Here's how the process works:
          </p>
          <ol className="space-y-4 mb-6">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-100 text-brand-700 font-bold text-sm flex items-center justify-center">1</span>
              <div>
                <strong className="text-gray-900 block mb-1">Transcript ingestion</strong>
                <p className="text-gray-600 text-sm leading-relaxed">The AI receives the full meeting transcript — either as raw text or a parsed .vtt file from Zoom, Google Meet, or Teams. Speaker labels are preserved so ownership can be inferred.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-100 text-brand-700 font-bold text-sm flex items-center justify-center">2</span>
              <div>
                <strong className="text-gray-900 block mb-1">Intent detection</strong>
                <p className="text-gray-600 text-sm leading-relaxed">The model identifies utterances that indicate commitment — phrases like "I'll send," "can you handle," "we need to," "by Friday." These are extracted as candidate action items.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-100 text-brand-700 font-bold text-sm flex items-center justify-center">3</span>
              <div>
                <strong className="text-gray-900 block mb-1">Owner and deadline assignment</strong>
                <p className="text-gray-600 text-sm leading-relaxed">The AI matches each task to the speaker who committed to it. Deadlines are extracted from context — "by EOD," "next Thursday," "before the launch" — and converted to specific dates where possible.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-100 text-brand-700 font-bold text-sm flex items-center justify-center">4</span>
              <div>
                <strong className="text-gray-900 block mb-1">Structured output</strong>
                <p className="text-gray-600 text-sm leading-relaxed">Each action item is output as a structured record: task, owner, deadline, priority. This can be immediately inserted into a task manager or sent in a follow-up email.</p>
              </div>
            </li>
          </ol>
          <p className="text-gray-700 leading-relaxed">
            The key advantage over manual note-taking: AI captures items mentioned in passing that a human notetaker would miss while also listening to the meeting. Studies suggest AI extraction achieves 95%+ recall on clearly stated action items.
          </p>
        </section>

        {/* Section 4 — Template */}
        <section id="template" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Copy-paste template for manual tracking</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            If you prefer a manual system, this template covers the essentials. Copy it into a Google Doc, Notion page, or your notes app after each meeting.
          </p>

          {/* Visual table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 mb-6">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Task', 'Owner', 'Deadline', 'Priority', 'Status'].map((h) => (
                    <th key={h} className="text-left font-semibold text-gray-700 px-4 py-3 border-b border-gray-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {templateRows.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-3 text-gray-800">{row.task}</td>
                    <td className="px-4 py-3 text-gray-700 font-medium">{row.owner}</td>
                    <td className="px-4 py-3 text-gray-600">{row.deadline}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        row.priority === 'High' ? 'bg-red-100 text-red-700' :
                        row.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>{row.priority}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        row.status === 'Done' ? 'bg-green-100 text-green-700' :
                        row.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Plain text template */}
          <div className="bg-gray-900 rounded-xl p-6 text-sm font-mono">
            <div className="text-green-400 mb-3 font-sans font-semibold text-xs uppercase tracking-wider">Plain text template — copy and paste</div>
            <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed">{`MEETING: [Meeting Name]
DATE: [Date]
ATTENDEES: [Names]

ACTION ITEMS
────────────
[ ] Task: [What needs to be done]
    Owner: [Name]
    Deadline: [Specific date or "No deadline set"]
    Priority: High / Medium / Low

[ ] Task: [What needs to be done]
    Owner: [Name]
    Deadline: [Specific date or "No deadline set"]
    Priority: High / Medium / Low

DECISIONS MADE
──────────────
• [What was decided] — [Brief context]
• [What was decided] — [Brief context]

NEXT MEETING: [Date / "TBD"]`}</pre>
          </div>
        </section>

        {/* Section 5 */}
        <section id="comparison" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Tool comparison: manual vs AI</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Different teams have different needs. Here's an honest comparison of approaches.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Approach', 'Time to capture', 'Accuracy', 'Works while presenting', 'Cost'].map((h) => (
                    <th key={h} className="text-left font-semibold text-gray-700 px-4 py-3 border-b border-gray-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-800">Manual notes (you)</td>
                  <td className="px-4 py-3 text-gray-600">20–40 min post-meeting</td>
                  <td className="px-4 py-3 text-gray-600">Depends on attention</td>
                  <td className="px-4 py-3 text-red-600">No</td>
                  <td className="px-4 py-3 text-gray-600">Free</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-800">Dedicated notetaker</td>
                  <td className="px-4 py-3 text-gray-600">Real-time + 15 min cleanup</td>
                  <td className="px-4 py-3 text-gray-600">Good if experienced</td>
                  <td className="px-4 py-3 text-green-600">Yes</td>
                  <td className="px-4 py-3 text-gray-600">Staff time cost</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-800">Otter.ai / Fireflies</td>
                  <td className="px-4 py-3 text-gray-600">Auto-transcribes live</td>
                  <td className="px-4 py-3 text-gray-600">Transcription good; analysis basic</td>
                  <td className="px-4 py-3 text-green-600">Yes</td>
                  <td className="px-4 py-3 text-gray-600">$10–30/user/mo</td>
                </tr>
                <tr className="bg-brand-50">
                  <td className="px-4 py-3 font-medium text-brand-900">MeetingMind (AI)</td>
                  <td className="px-4 py-3 text-brand-700 font-medium">30 seconds post-meeting</td>
                  <td className="px-4 py-3 text-brand-700 font-medium">97% action item capture</td>
                  <td className="px-4 py-3 text-green-600">Yes — paste transcript after</td>
                  <td className="px-4 py-3 text-brand-700 font-medium">From $49/month</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-brand-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Stop tracking action items manually
          </h2>
          <p className="text-brand-100 mb-6 max-w-lg mx-auto">
            Paste any meeting transcript and get a complete action items list, decision log, and follow-up email in 30 seconds. No setup required.
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
