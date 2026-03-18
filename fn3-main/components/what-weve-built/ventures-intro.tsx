import { FadeInSection } from '@/components/ui/fade-in-section'

export function VenturesIntro() {
  return (
    <section className="bg-fn3-warm-white border-b border-fn3-red-faint px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="label-mono text-fn3-red-light mb-12">Why This Page Exists</p>
        <p className="text-[24px] text-[#1c1917] max-w-[680px] leading-[1.6]">
          These aren&apos;t investments. They&apos;re{' '}
          <strong className="text-fn3-red font-bold">proof</strong>. Each venture runs on
          the same agent infrastructure, the same operational frameworks, the same decision
          architecture. When a client asks &ldquo;does this actually work?&rdquo; — this page
          is the answer.
        </p>
      </FadeInSection>
    </section>
  )
}
