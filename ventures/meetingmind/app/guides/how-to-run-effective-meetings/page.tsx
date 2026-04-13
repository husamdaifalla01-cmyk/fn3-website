import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Run Effective Meetings That Actually Get Things Done | MeetingMind',
  description:
    'A practical guide to running effective meetings: pre-meeting prep, facilitation techniques, decision frameworks, and follow-up systems that keep action items from falling through the cracks.',
  keywords: [
    'how to run effective meetings',
    'effective meeting tips',
    'meeting facilitation',
    'how to run a meeting',
    'productive meetings',
    'meeting agenda template',
  ],
  openGraph: {
    title: 'How to Run Effective Meetings That Actually Get Things Done',
    description:
      'Pre-meeting, during, and post-meeting frameworks for running meetings that produce real outcomes — not just more meetings.',
    type: 'article',
  },
}

export default function EffectiveMeetingsPage() {
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
            How to Run Effective Meetings That Actually Get Things Done
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            The average company wastes $37 billion a year on unproductive meetings. This guide gives you a repeatable system for every phase — what to do before, during, and after — so your meetings generate outcomes instead of obligations.
          </p>
        </div>

        {/* Cost calculator callout */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-12">
          <h2 className="font-bold text-red-900 mb-2">The cost of a bad meeting</h2>
          <p className="text-red-700 text-sm leading-relaxed mb-3">
            A one-hour meeting with 8 attendees at an average salary of $80,000/year costs roughly <strong>$308 in salary alone</strong> — before you account for preparation time, context-switching costs, and the follow-on work created by unclear outcomes.
          </p>
          <p className="text-red-700 text-sm leading-relaxed">
            <strong>Formula:</strong> Attendees × (Annual salary ÷ 2,080 hours) × Meeting duration = Meeting cost
          </p>
          <div className="mt-4 bg-white rounded-xl p-4 text-sm font-mono text-red-800">
            <div>8 attendees × ($80,000 ÷ 2,080) × 1 hour = <strong>$308</strong></div>
            <div className="text-red-500 mt-1 text-xs">× 3 meetings/day × 250 working days = <strong>$231,000/year</strong> per employee in meeting cost</div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-12">
          <h2 className="font-bold text-gray-900 mb-3">In this guide</h2>
          <ol className="space-y-2 text-sm text-brand-600">
            <li><a href="#pre-meeting" className="hover:underline">1. Pre-meeting: set up for success</a></li>
            <li><a href="#during" className="hover:underline">2. During: facilitation and decisions</a></li>
            <li><a href="#post-meeting" className="hover:underline">3. Post-meeting: the 24-hour rule</a></li>
          </ol>
        </div>

        {/* Section 1: Pre-Meeting */}
        <section id="pre-meeting" className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Pre-meeting: set up for success</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Most meeting failures are caused before the meeting starts. An unclear purpose, the wrong people in the room, or no agenda turns a 30-minute meeting into an hour of drift. The pre-meeting phase is where the ROI is highest.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3">Write an agenda that works</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            A real agenda is more than a list of topics. Each item should specify: the topic, the type of discussion needed (inform, discuss, decide), the person leading it, and the time allocated. Without this, any item can sprawl to fill the available time.
          </p>

          <div className="bg-gray-900 rounded-xl p-5 mb-6 text-sm font-mono">
            <div className="text-green-400 mb-3 font-sans font-semibold text-xs uppercase tracking-wider">Agenda template</div>
            <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed">{`MEETING: [Name]
DATE: [Date] | TIME: [Start–End]
GOAL: [One sentence — what does success look like?]

AGENDA
──────
[Time]  [Topic]                    [Type]    [Owner]
5 min   Q3 revenue update          INFORM    Sarah
15 min  Pricing model decision     DECIDE    Marcus
10 min  Launch date discussion     DISCUSS   Jamie
5 min   Action items & wrap-up     —         Facilitator

PRE-READ: [Link to any materials attendees should review first]`}</pre>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-3">Invite the right people</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The ideal meeting has the minimum number of people needed to make the decision. Every additional attendee increases coordination overhead and makes consensus harder. Apply the &ldquo;newspaper test&rdquo;: if this person wouldn&apos;t be quoted in a story about this meeting, they probably don&apos;t need to be there.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Decision-makers', desc: 'People with authority to approve outcomes' },
              { label: 'Contributors', desc: 'People with information needed to decide' },
              { label: 'Implementers', desc: 'People who will own action items' },
            ].map(({ label, desc }) => (
              <div key={label} className="bg-brand-50 rounded-xl p-4">
                <p className="font-semibold text-brand-800 text-sm mb-1">{label}</p>
                <p className="text-brand-600 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-700 leading-relaxed">
            If someone needs to be informed but not present, send them a summary afterward instead of pulling them into the meeting. The 30-second read is almost always a better use of their time than 60 minutes in a room.
          </p>
        </section>

        {/* Section 2: During */}
        <section id="during" className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">2. During: facilitation and decisions</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            The facilitator&apos;s job is not to have the best ideas — it&apos;s to create the conditions for the best ideas to emerge and get decided on. That means managing time, balancing voices, and driving toward clear outcomes.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3">Facilitation techniques that work</h3>
          <div className="space-y-4 mb-8">
            {[
              {
                technique: 'Open with the goal',
                how: 'State the meeting objective in one sentence at the start. "By the end of this meeting, we need to have decided X." This frames all discussion and makes it easier to cut tangents.',
              },
              {
                technique: 'Use a parking lot',
                how: 'Create a visible "parking lot" list for good ideas that are out of scope. This lets you acknowledge contributions without derailing the agenda. Address parking lot items at the end if time allows.',
              },
              {
                technique: 'Call on quieter voices',
                how: 'Extroverts naturally take more airtime. Explicitly ask quieter participants for their input: "Sarah, you haven\'t weighed in — what\'s your read?" Better decisions come from broader input.',
              },
              {
                technique: 'Watch the clock out loud',
                how: '"We have five minutes left on this topic. Let\'s make a decision or defer it." Saying the time constraint explicitly forces closure rather than letting discussions trail off.',
              },
            ].map(({ technique, how }) => (
              <div key={technique} className="border border-gray-100 rounded-xl p-5">
                <h4 className="font-semibold text-gray-900 mb-2">{technique}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{how}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-3">Decision-making frameworks</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The biggest time sink in meetings is undecided decisions — items that get discussed but not resolved, and resurface at the next meeting. A clear decision-making framework prevents this.
          </p>

          <div className="space-y-4 mb-6">
            {[
              {
                name: 'DACI (Driver, Approver, Contributor, Informed)',
                desc: 'Assign roles before the discussion. One Driver owns the outcome, one Approver has final say, Contributors provide input, Informed parties just need the result. Eliminates "who decides this?" debates.',
                use: 'Best for: cross-functional decisions with multiple stakeholders',
              },
              {
                name: 'Gradients of Agreement (1–5 scale)',
                desc: 'Instead of "do you agree?", ask everyone to vote 1–5 (1 = strongly oppose, 5 = fully support). This surfaces hidden dissent and distinguishes "I have concerns but won\'t block" from genuine objection.',
                use: 'Best for: decisions where consensus matters but unanimity is unrealistic',
              },
              {
                name: 'Two-way door test',
                desc: 'Ask: "Is this reversible?" Reversible decisions (two-way doors) can be made quickly with available information. Irreversible decisions (one-way doors) warrant more deliberation. Most decisions are more reversible than they feel.',
                use: 'Best for: when a group is over-deliberating a low-stakes choice',
              },
            ].map(({ name, desc, use }) => (
              <div key={name} className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-semibold text-gray-900 mb-2">{name}</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">{desc}</p>
                <p className="text-brand-600 text-xs font-medium">{use}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Post-Meeting */}
        <section id="post-meeting" className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Post-meeting: the 24-hour rule</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The 24-hour rule is simple: meeting notes, action items, and follow-up communications must go out within 24 hours. After that, context decays, memories diverge, and the accountability window closes.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Research from Harvard Business Review found that follow-up communication sent within 24 hours of a meeting increases action item completion rates by 42% compared to follow-ups sent 48–72 hours later.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mb-3">What to send within 24 hours</h3>
          <div className="space-y-3 mb-8">
            {[
              { item: 'Summary of what was decided', why: 'Prevents revisiting closed decisions' },
              { item: 'Full action items list with owners and deadlines', why: 'Creates named accountability' },
              { item: 'Any open questions or parking lot items', why: 'Documents what still needs resolution' },
              { item: 'Date of next meeting or check-in', why: 'Removes ambiguity about follow-up timing' },
            ].map(({ item, why }) => (
              <div key={item} className="flex items-start gap-3">
                <div className="mt-1.5 flex-shrink-0 w-4 h-4 rounded-full bg-brand-100 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-600"></div>
                </div>
                <div>
                  <strong className="text-gray-900 text-sm">{item}</strong>
                  <span className="text-gray-500 text-sm"> — {why}</span>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-3">Action item tracking systems</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            A follow-up email gets buried. Action items that live only in email have a short half-life. For recurring teams, move action items into a persistent system where they can be checked off and carry over if missed.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200 mb-6">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['System', 'Best for', 'Limitation'].map((h) => (
                    <th key={h} className="text-left font-semibold text-gray-700 px-4 py-3 border-b border-gray-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { system: 'Email follow-up', best: 'One-off external meetings', limit: 'Gets buried; no tracking' },
                  { system: 'Shared doc (Notion, Confluence)', best: 'Internal recurring teams', limit: 'Requires manual upkeep' },
                  { system: 'Project management tool (Linear, Asana)', best: 'Engineering / product teams', limit: 'Overhead for simple items' },
                  { system: 'AI-generated follow-up', best: 'Any meeting type', limit: 'Requires transcript input' },
                ].map(({ system, best, limit }) => (
                  <tr key={system} className={system === 'AI-generated follow-up' ? 'bg-brand-50' : ''}>
                    <td className={`px-4 py-3 font-medium ${system === 'AI-generated follow-up' ? 'text-brand-900' : 'text-gray-800'}`}>{system}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{best}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 leading-relaxed">
            The best system is whichever one your team will actually use consistently. Don&apos;t add process overhead that dies in week two. If you already use Notion, paste the action items there. If you&apos;re a small team, a well-structured email works fine as long as it goes out within 24 hours.
          </p>
        </section>

        {/* CTA */}
        <div className="bg-brand-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            The fastest post-meeting follow-up you&apos;ll ever send
          </h2>
          <p className="text-brand-100 mb-6 max-w-lg mx-auto">
            Paste your meeting transcript and get a complete summary, action items with owners, key decisions, and a ready-to-send follow-up email in 30 seconds. The 24-hour rule has never been easier to keep.
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
