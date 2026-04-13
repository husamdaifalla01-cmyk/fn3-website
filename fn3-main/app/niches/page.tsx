import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/nav'
import { PageHero } from '@/components/page-hero'
import { Footer } from '@/components/footer'
import { FadeInSection } from '@/components/ui/fade-in-section'
import { niches } from '@/lib/niches'

export const metadata: Metadata = {
  title: 'Industries We Operate In',
  description: 'FN3 operational intelligence deployed across dental, wealth management, legal, healthcare, and trades industries.',
}

export default function NichesIndex() {
  return (
    <main>
      <Nav variant="chapter" />
      <PageHero
        chapterLabel="FN3 — Industries"
        title="Operational Intelligence Across Industries"
        description="The same operating model. The same agent infrastructure. Applied to the specific operational gaps in your industry."
      />
      <section className="bg-white px-6 lg:px-12 py-20">
        <div className="max-w-[1400px] mx-auto">
          {niches.map((niche, i) => (
            <FadeInSection key={niche.id} delay={i * 0.08}>
              <Link
                href={`/${niche.id}`}
                className="flex items-center justify-between py-8 border-t border-[#f3f4f6] last:border-b hover:bg-fn3-warm-white transition-colors duration-150 -mx-6 lg:-mx-12 px-6 lg:px-12"
              >
                <div className="flex items-center gap-5">
                  <span className="label-mono text-[#d1d5db] w-6">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="text-[20px] font-bold text-[#111] tracking-tight">{niche.name}</p>
                    <p className="text-[13px] text-[#9ca3af] mt-1">{niche.tagline}</p>
                  </div>
                </div>
                <span className="hidden lg:block text-[11px] text-[#9ca3af] tracking-[0.05em]">
                  {niche.industry} →
                </span>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
