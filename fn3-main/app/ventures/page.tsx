import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/nav'
import { PageHero } from '@/components/page-hero'
import { Footer } from '@/components/footer'
import { FadeInSection } from '@/components/ui/fade-in-section'
import { ventures } from '@/lib/ventures'

export const metadata: Metadata = {
  title: 'Ventures',
  description: 'Five ventures. Each one a live test of the FN3 operating model. Different industries, same infrastructure.',
}

export default function VenturesIndex() {
  return (
    <main>
      <Nav variant="chapter" />
      <PageHero
        chapterLabel="FN3 Ventures"
        title="The System In The Wild"
        description="Five ventures running on the same agent infrastructure, the same operational frameworks, the same decision architecture."
      />
      <section className="bg-white px-6 lg:px-12 py-20">
        <div>
          {ventures.map((v, i) => (
            <FadeInSection key={v.slug} delay={i * 0.08}>
              <Link
                href={`/ventures/${v.slug}`}
                className="flex items-center justify-between py-8 border-t border-[#f3f4f6] last:border-b hover:bg-fn3-warm-white transition-colors duration-150 -mx-6 lg:-mx-12 px-6 lg:px-12"
              >
                <div className="flex items-center gap-5">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: v.dotColor }}
                  />
                  <div>
                    <p className="text-[20px] font-bold text-[#111] tracking-tight">{v.name}</p>
                    <p className="label-mono text-[#9ca3af] mt-1">{v.sector}</p>
                  </div>
                </div>
                <span className="hidden lg:block text-[11px] text-[#9ca3af] tracking-[0.05em]">
                  {v.tagline} →
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
