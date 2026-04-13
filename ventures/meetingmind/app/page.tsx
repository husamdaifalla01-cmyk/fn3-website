import Link from 'next/link'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'

const testimonials = [
  {
    quote:
      'I run 8 client meetings a week. MeetingMind saves me 45 minutes every day writing follow-ups.',
    name: 'Alex P.',
    title: 'Agency Owner',
    initials: 'AP',
    color: 'bg-brand-500',
  },
  {
    quote:
      'Finally stopped losing action items. Before MeetingMind, 30% of action items from meetings never got done.',
    name: 'Rachel T.',
    title: 'Ops Manager',
    initials: 'RT',
    color: 'bg-purple-500',
  },
  {
    quote:
      'The decision log is the hidden gem. Clients can\'t argue about what was agreed when it\'s all documented.',
    name: 'Marcus W.',
    title: 'Consultant',
    initials: 'MW',
    color: 'bg-green-500',
  },
]

export default function Home() {
  return (
    <main>
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-gray-900">
            MeetingMind<span className="text-brand-600">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
            <Link href="/auth" className="hover:text-gray-900 transition-colors">Sign in</Link>
          </div>
          <Link
            href="/analyze"
            className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Try free
          </Link>
        </div>
      </nav>

      <Hero />
      <Features />

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            What customers say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${t.color} text-white flex items-center justify-center text-sm font-bold`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-500 text-sm">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Pricing />

      {/* Final CTA */}
      <section className="py-24 px-6 bg-brand-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Stop writing meeting notes manually
          </h2>
          <p className="text-brand-100 text-xl mb-10">
            Analyze your first meeting free. No credit card required.
          </p>
          <Link
            href="/analyze"
            className="inline-block bg-white text-brand-600 hover:bg-brand-50 font-bold px-10 py-4 rounded-xl text-lg transition-colors"
          >
            Analyze a meeting now
          </Link>
        </div>
      </section>

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
