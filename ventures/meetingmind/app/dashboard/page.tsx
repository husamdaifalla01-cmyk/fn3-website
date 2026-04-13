import Link from 'next/link'

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-gray-900">
            MeetingMind<span className="text-brand-600">.</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/analyze"
              className="text-sm font-medium text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-4 py-2 rounded-xl transition-colors"
            >
              + New analysis
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meeting history</h1>
            <p className="text-gray-500 mt-1">All your analyzed meetings in one place</p>
          </div>
        </div>

        {/* Auth gate placeholder */}
        <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center">
          <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
            📊
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Sign in to see your meetings</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            Create a free account to save your meeting analyses and access them anytime.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth"
              className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Sign in / Sign up
            </Link>
            <Link
              href="/analyze"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Analyze a meeting
            </Link>
          </div>
        </div>

        {/* Stats bar placeholder */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          {[
            { label: 'Total meetings', value: '—' },
            { label: 'Action items created', value: '—' },
            { label: 'Time saved (est.)', value: '—' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-gray-300 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
