import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { FadeInSection } from '@/components/ui/fade-in-section'
import { ventures, getVentureBySlug } from '@/lib/ventures'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return ventures.map((v) => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const venture = getVentureBySlug(params.slug)
  if (!venture) return {}
  return {
    title: `${venture.name} — ${venture.sector}`,
    description: venture.heroDescription,
  }
}

export default function VenturePage({ params }: Props) {
  const venture = getVentureBySlug(params.slug)
  if (!venture) notFound()

  return (
    <main>
      <Nav variant="chapter" />

      {/* Hero */}
      <section className="bg-fn3-red px-6 lg:px-12 pt-[72px] pb-[80px]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">
          <div>
            <p className="label-mono text-white/30 mb-5">
              {venture.sector} — FN3 Venture
            </p>
            <h1 className="font-display text-[clamp(40px,5vw,64px)] text-white leading-[1] tracking-[-0.05em]">
              {venture.name}
            </h1>
            <p className="font-serif-italic text-[18px] text-white/50 mt-4">
              {venture.tagline}
            </p>
          </div>
          <p className="text-base text-white/55 leading-[1.75] lg:self-end">
            {venture.heroDescription}
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-fn3-warm-white border-b border-fn3-red-faint px-6 lg:px-12 py-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          <FadeInSection className="lg:col-span-2">
            <p className="label-mono text-fn3-red-light mb-4">The Problem</p>
            <h2 className="font-display text-[clamp(24px,2.5vw,32px)] text-fn3-body leading-[1.1] tracking-tight">
              Where the operational gap lives.
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.1} className="lg:col-span-3">
            <p className="text-[16px] text-[#78716c] leading-[1.8]">{venture.problem}</p>
          </FadeInSection>
        </div>
      </section>

      {/* How FN3 operates it */}
      <section className="bg-white border-b border-[#f3f4f6] px-6 lg:px-12 py-20">
        <div className="max-w-[1400px] mx-auto">
          <FadeInSection>
            <p className="label-mono text-fn3-red-light mb-10">How FN3 Operates It</p>
          </FadeInSection>
          <div>
            {venture.howFN3OperatesIt.map((item, i) => (
              <FadeInSection key={i} delay={i * 0.08}>
                <div className="flex gap-6 py-7 border-t border-[#f3f4f6] last:border-b items-start">
                  <span className="label-mono text-fn3-red-light mt-1 w-8 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[15px] text-[#1c1917] leading-[1.75]">{item}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics strip */}
      <section className="bg-fn3-near-black px-6 lg:px-12 py-16">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row gap-10 sm:gap-0">
          {venture.metrics.map((metric, i) => (
            <div
              key={metric.label}
              className={`${i > 0 ? 'sm:border-l border-fn3-dark-border sm:pl-12' : ''} ${i < venture.metrics.length - 1 ? 'sm:pr-12' : ''}`}
            >
              <p className="font-display text-[32px] text-white leading-none mb-2">
                {metric.value}
              </p>
              <p className="label-mono text-fn3-dark-text">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-fn3-warm-white px-6 lg:px-12 py-20">
        <FadeInSection>
          <p className="font-serif-italic text-[clamp(24px,3vw,36px)] text-[#1c1917] leading-[1.3] max-w-[560px] mb-8">
            {venture.ctaLine}
          </p>
          <a
            href="/work-with-us"
            className="inline-block label-mono text-fn3-red border-b border-fn3-red pb-px hover:border-fn3-red-light hover:text-fn3-red-light transition-colors duration-150"
          >
            Work With Us →
          </a>
        </FadeInSection>
      </section>

      <Footer />
    </main>
  )
}
