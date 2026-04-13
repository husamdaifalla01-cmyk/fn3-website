import Link from 'next/link'
import MeetingAnalyzer from '@/components/MeetingAnalyzer'

export default function AnalyzePage() {
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
              href="/dashboard"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/auth"
              className="text-sm font-medium text-brand-600 hover:text-brand-700 border border-brand-200 hover:border-brand-400 px-4 py-2 rounded-xl transition-colors"
            >
              Sign in to save
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Analyze your meeting
          </h1>
          <p className="text-lg text-gray-600">
            Paste your transcript or upload a .vtt file. Results in under 30 seconds.
          </p>
        </div>

        <MeetingAnalyzer />
      </div>
    </main>
  )
}
