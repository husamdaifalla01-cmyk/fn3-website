const STEPS = [
  {
    num: '01',
    icon: '🔍',
    title: 'Browse verified deals',
    body: 'Every offer is manually verified. We only list deals that are live, age-eligible, and actually worth your time.',
  },
  {
    num: '02',
    icon: '⚡',
    title: 'Claim in seconds',
    body: 'Click through to the offer. Sign up takes 2–5 minutes. No credit card required to claim most trials.',
  },
  {
    num: '03',
    icon: '💰',
    title: 'Start saving immediately',
    body: 'Your deal activates the moment you sign up. Prime ships free. Cards post bonus points. Insurance goes live.',
  },
]

export default function HowItWorks() {
  return (
    <section
      className="py-20 px-4"
      style={{ background: 'linear-gradient(180deg, #f8f7ff 0%, #f1eeff 100%)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-label">Simple as it gets</div>
          <h2
            className="font-black"
            style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', color: 'var(--text)', letterSpacing: '-0.025em' }}
          >
            From deal to claimed in 5 minutes
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line — desktop only */}
          <div
            className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px"
            style={{ background: 'linear-gradient(90deg, rgba(124,58,237,0.2), rgba(16,185,129,0.2))' }}
          />

          {STEPS.map((step, i) => (
            <div key={step.num} className="text-center relative">
              {/* Number */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 relative"
                style={{
                  background: i === 1
                    ? 'linear-gradient(135deg, #7c3aed, #5b21b6)'
                    : 'var(--surface)',
                  border: i === 1 ? 'none' : '1.5px solid rgba(124,58,237,0.15)',
                  boxShadow: i === 1
                    ? '0 8px 32px rgba(124,58,237,0.35)'
                    : '0 2px 12px rgba(15,10,30,0.05)',
                }}
              >
                <span style={{ fontSize: '2rem' }}>{step.icon}</span>
              </div>

              <div
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: 'var(--violet-light)', opacity: 0.6 }}
              >
                Step {step.num}
              </div>
              <h3 className="text-lg font-black mb-2" style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
