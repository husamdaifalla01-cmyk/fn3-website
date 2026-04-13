'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-brand-50 to-white pt-20 pb-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
          AI-powered meeting intelligence
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Your meeting ended 10 minutes ago.{' '}
          <span className="text-brand-600">Your follow-up email should already be written.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Paste your transcript. MeetingMind extracts action items with owners, key decisions,
          and a ready-to-send recap email — in 30 seconds.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/analyze"
            className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-brand-500/25"
          >
            Analyze a meeting — free
          </Link>
          <a
            href="#pricing"
            className="bg-white hover:bg-gray-50 text-gray-800 font-semibold px-8 py-4 rounded-xl text-lg transition-colors border border-gray-200"
          >
            See pricing
          </a>
        </div>

        {/* Stats bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">2,400+</span>
            <span>meetings processed</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-gray-200" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">97%</span>
            <span>action item capture rate</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-gray-200" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">45 min</span>
            <span>saved per meeting avg</span>
          </div>
        </div>
      </div>
    </section>
  )
}
