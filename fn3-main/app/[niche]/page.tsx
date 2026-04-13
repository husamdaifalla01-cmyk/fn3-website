import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { FadeInSection } from '@/components/ui/fade-in-section'
import { niches, getNicheById } from '@/lib/niches'

interface Props {
  params: Promise<{ niche: string }>
}

export async function generateStaticParams() {
  return niches.map((n) => ({ niche: n.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { niche: nicheId } = await params
  const niche = getNicheById(nicheId)
  if (!niche) return {}
  return {
    title: `${niche.heroTitle} — FN3`,
    description: niche.description,
  }
}

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Diagnose',
    body: 'We audit your current operations and map every friction point, manual task, and bottleneck across your workflows.',
  },
  {
    number: '02',
    title: 'Deploy',
    body: 'Agents and automations are built and integrated directly into the tools and systems your team already uses.',
  },
  {
    number: '03',
    title: 'Scale',
    body: 'The system runs autonomously, compounds over time, and delivers weekly reporting — not management overhead.',
  },
]

export default async function NichePage({ params }: Props) {
  const { niche: nicheId } = await params
  const niche = getNicheById(nicheId)
  if (!niche) notFound()

  return (
    <main>
      <Nav variant="chapter" />

      {/* ── Hero ── */}
      <section className="relative bg-fn3-red px-6 lg:px-12 pt-[72px] pb-[100px] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative max-w-[1400px] mx-auto">
          <p className="label-mono text-white/50 mb-8">{niche.sectorLabel}</p>
          <h1 className="font-display text-[clamp(44px,5.5vw,76px)] text-white leading-[1.02] tracking-[-0.04em] mb-8 max-w-[900px]">
            {niche.heroTitle}
          </h1>
          <p className="text-[18px] text-white/80 leading-[1.8] max-w-[560px] mb-12">
            {niche.description}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="/work-with-us"
              className="inline-block bg-white text-fn3-red font-mono text-[12px] uppercase tracking-[0.1em] font-bold px-8 py-4 hover:bg-white/90 transition-colors duration-150"
            >
              {niche.cta.primary}
            </a>
            <a
              href="/how-we-work"
              className="inline-block font-mono text-[12px] uppercase tracking-[0.1em] text-white/70 border-b border-white/40 hover:text-white hover:border-white pb-px transition-colors duration-150"
            >
              See How We Work →
            </a>
          </div>
        </div>
      </section>

      {/* ── Who It's For ── */}
      <section className="bg-fn3-near-black border-b border-fn3-dark-border px-6 lg:px-12 py-8">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center gap-3">
          <span className="text-[13px] font-medium text-fn3-dark-text shrink-0 mr-2 uppercase tracking-widest">Built for</span>
          {niche.targetAudience.map((role) => (
            <span
              key={role}
              className="inline-block text-[13px] text-white/70 border border-fn3-dark-border px-4 py-2 rounded-sm"
            >
              {role}
            </span>
          ))}
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="bg-fn3-warm-white border-b border-fn3-red-faint px-6 lg:px-12 py-24">
        <div className="max-w-[1400px] mx-auto">
          <FadeInSection>
            <p className="label-mono text-fn3-red-light mb-10">The Problem</p>
          </FadeInSection>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            <FadeInSection className="lg:col-span-2">
              <h2 className="font-display text-[clamp(28px,3vw,42px)] text-fn3-body leading-[1.15] tracking-tight">
                Where {niche.industry.toLowerCase()} operations break down.
              </h2>
            </FadeInSection>
            <div className="lg:col-span-3">
              {niche.painPoints.map((point, i) => (
                <FadeInSection key={i} delay={i * 0.07}>
                  <div className="flex gap-6 py-6 border-t border-fn3-red-faint last:border-b items-start">
                    <span className="label-mono text-fn3-red mt-1 flex-shrink-0 w-6">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[17px] text-fn3-dark-text leading-[1.8]">{point}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How FN3 Fixes It ── */}
      <section className="bg-white border-b border-[#ece8e8] px-6 lg:px-12 py-24">
        <div className="max-w-[1400px] mx-auto">
          <FadeInSection>
            <p className="label-mono text-fn3-red-light mb-4">How FN3 Fixes It</p>
            <h2 className="font-display text-[clamp(26px,3vw,42px)] text-fn3-body leading-[1.15] tracking-tight mb-14 max-w-[560px]">
              Intelligence deployed directly into your operations.
            </h2>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#ece8e8]">
            {niche.solutions.map((solution, i) => (
              <FadeInSection key={i} delay={i * 0.06}>
                <div className="bg-white p-10 flex flex-col gap-5 h-full">
                  <span className="label-mono text-fn3-red-light">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[17px] text-fn3-body leading-[1.8]">{solution}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="bg-fn3-near-black px-6 lg:px-12 py-24">
        <div className="max-w-[1400px] mx-auto">
          <FadeInSection>
            <p className="label-mono text-fn3-dark-label mb-4">Results</p>
            <p className="text-[19px] text-[#a8a09a] mb-16 max-w-[500px] leading-[1.7] font-serif-italic">
              What {niche.industry.toLowerCase()} operators see after deploying FN3.
            </p>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {niche.metrics.map((metric, i) => (
              <FadeInSection key={metric.label} delay={i * 0.1}>
                <div className={[
                  i > 0 ? 'pt-10 sm:pt-0 sm:pl-12 border-t sm:border-t-0 sm:border-l border-fn3-dark-border' : '',
                  i < niche.metrics.length - 1 ? 'pb-10 sm:pb-0 sm:pr-12' : '',
                ].filter(Boolean).join(' ')}>
                  <p className="font-serif text-[80px] text-fn3-red font-normal leading-none mb-5">
                    {metric.value}
                  </p>
                  <p className="text-[16px] font-semibold text-white mb-2">{metric.label}</p>
                  <p className="text-[15px] text-[#7c736e] leading-[1.7]">{metric.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Process ── */}
      <section className="bg-white border-b border-[#ece8e8] px-6 lg:px-12 py-24">
        <div className="max-w-[1400px] mx-auto">
          <FadeInSection>
            <p className="label-mono text-fn3-red-light mb-4">The Process</p>
            <h2 className="font-display text-[clamp(26px,3vw,42px)] text-fn3-body leading-[1.15] tracking-tight mb-16 max-w-[480px]">
              From audit to autonomous in three stages.
            </h2>
          </FadeInSection>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#ece8e8]">
            {PROCESS_STEPS.map((step, i) => (
              <FadeInSection key={step.number} delay={i * 0.08}>
                <div className="bg-white p-10 flex flex-col gap-7 h-full">
                  <span className="font-serif text-[60px] text-fn3-red-faint font-normal leading-none">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display text-[22px] text-fn3-body tracking-tight mb-4">
                      {step.title}
                    </h3>
                    <p className="text-[16px] text-fn3-dark-text leading-[1.8]">{step.body}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      {niche.testimonial && (
        <section className="bg-fn3-warm-white border-b border-fn3-red-faint px-6 lg:px-12 py-24">
          <div className="max-w-[1400px] mx-auto">
            <FadeInSection>
              <blockquote className="font-serif-italic text-[clamp(22px,2.8vw,36px)] text-fn3-body leading-[1.55] max-w-[800px] mb-12">
                &ldquo;{niche.testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-5">
                <div className="w-10 h-px bg-fn3-red" />
                <div>
                  <p className="text-[16px] font-semibold text-fn3-body">{niche.testimonial.author}</p>
                  <p className="text-[14px] text-fn3-red-light mt-1 font-mono uppercase tracking-wider">
                    {niche.testimonial.role}, {niche.testimonial.company}
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="relative bg-fn3-red px-6 lg:px-12 py-28 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative max-w-[1400px] mx-auto">
          <FadeInSection>
            <p className="label-mono text-white/50 mb-7">Ready to deploy</p>
            <h2 className="font-display text-[clamp(34px,4.5vw,60px)] text-white leading-[1.08] tracking-[-0.04em] max-w-[680px] mb-12">
              Bring operational intelligence into your {niche.industry.toLowerCase()} business.
            </h2>
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <a
                href="/work-with-us"
                className="inline-block bg-white text-fn3-red font-mono text-[12px] uppercase tracking-[0.1em] font-bold px-9 py-4 hover:bg-white/90 transition-colors duration-150"
              >
                {niche.cta.primary}
              </a>
              <a
                href="/how-we-work"
                className="inline-block font-mono text-[12px] uppercase tracking-[0.1em] text-white/70 border-b border-white/40 hover:text-white hover:border-white pb-px transition-colors duration-150 sm:mt-[18px]"
              >
                See How We Work →
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      <Footer />
    </main>
  )
}
