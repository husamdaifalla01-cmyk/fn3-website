import Link from 'next/link'
import { FadeInSection } from '@/components/ui/fade-in-section'

const chapters = [
  { num: '01', title: 'What We Are', sub: 'Philosophy + Structure', href: '/what-we-are', accent: false },
  { num: '02', title: "What We've Built", sub: 'Ventures + Proof of System', href: '/what-weve-built', accent: false },
  { num: '03', title: 'How We Work', sub: 'Capabilities + Operating Model', href: '/how-we-work', accent: false },
  { num: '04', title: 'Work With Us', sub: 'Bring FN3 Into Your Operations', href: '/work-with-us', accent: true },
]

export function ChapterEntry() {
  return (
    <section className="bg-white px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="label-mono text-[#9ca3af] mb-10">Enter the site</p>
      </FadeInSection>
      <div>
        {chapters.map((ch, i) => (
          <FadeInSection key={ch.href} delay={i * 0.08}>
            <Link
              href={ch.href}
              className="flex items-center justify-between py-6 border-t border-[#f3f4f6] last:border-b hover:bg-fn3-warm-white transition-colors duration-150 -mx-6 lg:-mx-12 px-6 lg:px-12"
            >
              <div className="flex items-center gap-5">
                <span className="font-mono text-[10px] text-[#9ca3af] w-6">{ch.num}</span>
                <span className={`text-[22px] font-bold tracking-tight ${ch.accent ? 'text-fn3-red' : 'text-[#111]'}`}>
                  {ch.title}
                </span>
              </div>
              <span className="hidden lg:block text-[11px] text-[#9ca3af] tracking-[0.05em]">
                {ch.sub} →
              </span>
            </Link>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
