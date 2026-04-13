'use client'

const features = [
  {
    icon: '✅',
    title: 'Action Items That Actually Get Done',
    description:
      'Not just "follow up with client." MeetingMind assigns every task to the right person with a real deadline. "Sarah to send contract by Friday." No more things falling through the cracks.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: '🔖',
    title: 'No More "Wait, What Did We Decide?"',
    description:
      'Every decision — logged with context. When a client disputes what was agreed, you have the receipt. No ambiguity, no revisiting closed discussions.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: '✉️',
    title: 'Follow-up Email Written Before You Leave the Room',
    description:
      'A professional recap email — with decisions, action items grouped by owner, and deadlines — ready to send while the meeting is still fresh. In 30 seconds.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: '📎',
    title: 'Your Meeting, Your Format',
    description:
      'Paste raw transcript text or upload a .vtt file directly from Zoom, Google Meet, or Teams. MeetingMind handles any format — no reformatting required.',
    color: 'bg-blue-50 text-blue-600',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything from one transcript
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stop spending 30 minutes writing meeting notes. MeetingMind does it in 30 seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Demo preview */}
        <div className="mt-20 bg-gray-900 rounded-2xl p-8 text-left">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-gray-400 text-sm ml-2">MeetingMind — Analysis Result</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <div className="text-green-400 font-mono mb-2">// SUMMARY</div>
              <p className="text-gray-300 leading-relaxed">
                The team aligned on Q2 product roadmap priorities, pushing the mobile app launch
                to August. Key blockers were identified around API integration. Sarah owns the
                technical spec; Marcus handles client communications.
              </p>
            </div>
            <div>
              <div className="text-blue-400 font-mono mb-2">// ACTION ITEMS</div>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span><strong className="text-white">Sarah</strong> — Send API spec draft by Thursday</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-0.5">✓</span>
                  <span><strong className="text-white">Marcus</strong> — Email clients about timeline shift</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✓</span>
                  <span><strong className="text-white">Team</strong> — Review revised roadmap by EOD Friday</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
