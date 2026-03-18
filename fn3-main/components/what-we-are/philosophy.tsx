import { FadeInSection } from '@/components/ui/fade-in-section'

export function Philosophy() {
  return (
    <section className="bg-fn3-warm-white border-b border-fn3-red-faint px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="label-mono text-fn3-red-light mb-12">The Philosophy</p>
      </FadeInSection>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
        <FadeInSection className="lg:col-span-2">
          <h2 className="font-display text-[clamp(28px,3vw,36px)] text-[#1c1917] leading-[1.1] tracking-tight">
            Built to run many things<br />without{' '}
            <span className="text-fn3-red">becoming</span><br />many things.
          </h2>
        </FadeInSection>
        <FadeInSection delay={0.1} className="lg:col-span-3">
          <p className="text-[16px] text-[#78716c] leading-[1.8] mb-6">
            Most companies scale by adding people, layers, and complexity. FN3 scales
            by deepening the system. Every process is designed to be automated before
            it&apos;s designed to be staffed. Every service is built as an API before
            it&apos;s built as a team.
          </p>
          <p className="text-[16px] text-[#78716c] leading-[1.8]">
            The result: a holding company that runs like software. Lean by design.
            Compound by nature. AI-native from the ground up.
          </p>
        </FadeInSection>
      </div>
    </section>
  )
}
