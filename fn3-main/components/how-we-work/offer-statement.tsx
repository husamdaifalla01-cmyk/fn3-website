import { FadeInSection } from '@/components/ui/fade-in-section'

export function OfferStatement() {
  return (
    <section className="bg-fn3-warm-white border-b border-fn3-red-faint px-6 lg:px-12 py-20">
      <FadeInSection>
        <p className="label-mono text-fn3-red-light mb-12">The Offer</p>
        <h2 className="font-display text-[clamp(32px,3.5vw,40px)] text-[#1c1917] leading-[1.1] tracking-tight max-w-[640px] mb-8">
          You don&apos;t hire us.<br />You{' '}
          <span className="text-fn3-red">integrate</span> us.
        </h2>
        <p className="text-[16px] text-[#78716c] max-w-[520px] leading-[1.75]">
          FN3 doesn&apos;t parachute in with slide decks. We plug the operating system
          directly into your business — agents, automation, and frameworks that run
          alongside your team, not above it.
        </p>
      </FadeInSection>
    </section>
  )
}
