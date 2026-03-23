import { FadeInSection } from '@/components/ui/fade-in-section'

const paths = [
  {
    label: 'For Clients',
    text: "Tell us what you're building and where operations are breaking down. We'll respond within 48 hours.",
  },
  {
    label: 'For Partners',
    text: "Strategic partnerships, joint ventures, and collaborative builds. We're selective but always open to the right conversation.",
  },
  {
    label: 'For Investors',
    text: "FN3 is not actively raising. If you're building a long-term thesis around operational AI, we want to know you.",
  },
]

export function ContactSection() {
  return (
    <section className="bg-fn3-warm-white px-6 lg:px-12 py-24 lg:py-32 min-h-[60vh] flex flex-col justify-center">
      <FadeInSection>
        <p className="label-mono text-fn3-red-light mb-12">Get In Touch</p>
        <p className="font-serif-italic text-[clamp(32px,4vw,52px)] text-[#1c1917] leading-[1.2] tracking-tight max-w-[600px] mb-12">
          Ready to bring operational intelligence into your business?
        </p>
        <a
          href="mailto:hello@flownexis3.com"
          className="inline-block text-[20px] lg:text-[28px] font-bold text-fn3-red tracking-tight border-b-2 border-fn3-red-faint hover:border-fn3-red pb-1 transition-colors duration-150 mb-12 break-all"
        >
          hello@flownexis3.com →
        </a>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          {paths.map((path) => (
            <div key={path.label} className="border-t border-fn3-red-faint pt-5 lg:w-[200px]">
              <p className="label-mono text-fn3-red-light mb-2">{path.label}</p>
              <p className="text-[14px] text-[#78716c] leading-[1.6]">{path.text}</p>
            </div>
          ))}
        </div>
      </FadeInSection>
    </section>
  )
}
