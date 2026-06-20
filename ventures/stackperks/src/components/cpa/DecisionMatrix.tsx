'use client'

const CHOICES = [
  { href: 'https://mintbrooks.com/finance/build-credit-with-your-car?utm_source=editorial&utm_medium=decide&utm_campaign=yendo',
    label: 'Score under 520',       sub: 'Yendo — car title, no score minimum' },
  { href: 'https://mintbrooks.com/finance/debt-consolidation-check?utm_source=editorial&utm_medium=decide&utm_campaign=slamdunk',
    label: 'Drowning in cards',      sub: 'Slamdunk — consolidate multiple debts' },
  { href: 'https://afflat3e3.com/trk/lnk/39C31C1E-2822-4350-B92A-2693C829ED6A/?o=12940&c=918277&a=769106&k=CBCB19B53F865FD4B516A6030205801C&l=13434&aff_sub=decide',
    label: 'Need cash now',          sub: 'Fast Cash — funded in 24 hours' },
  { href: 'https://afflat3e1.com/trk/lnk/39C31C1E-2822-4350-B92A-2693C829ED6A/?o=18576&c=918277&a=769106&k=ED393B6EF2DE462C0A98B2528BBEA265&l=19773&aff_sub=decide',
    label: 'Want the best rate',     sub: 'CompareMe — 20+ lenders at once' },
]

export default function DecisionMatrix() {
  return (
    <section className="mb-decide">
      <header className="mb-decide-head">
        <span className="mb-decide-eyebrow">Pick One</span>
        <h3>Still deciding? Match the line that sounds like you.</h3>
      </header>
      <div className="mb-decide-grid">
        {CHOICES.map((c) => (
          <a key={c.label} href={c.href} target="_blank" rel="sponsored nofollow noopener" className="mb-decide-card">
            <span className="mb-decide-label">{c.label}</span>
            <span className="mb-decide-sub">{c.sub}</span>
            <span className="mb-decide-arrow" aria-hidden>→</span>
          </a>
        ))}
      </div>

      <style>{`
        .mb-decide {
          margin: 48px 0;
          background: #1D3A2F;
          border-radius: 18px;
          padding: clamp(28px, 4.5vw, 40px);
          color: #FDFAF6;
          position: relative;
          overflow: hidden;
        }
        .mb-decide::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 50% at 100% 0%, rgba(184,149,90,0.18) 0%, transparent 50%);
          pointer-events: none;
        }
        .mb-decide-head { margin-bottom: 20px; position: relative; }
        .mb-decide-eyebrow {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #B8955A;
          margin-bottom: 10px;
        }
        .mb-decide-head h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(22px, 2.8vw, 30px);
          font-weight: 700;
          color: #FDFAF6;
          margin: 0;
          line-height: 1.2;
          letter-spacing: -0.015em;
          max-width: 640px;
        }
        .mb-decide-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 12px;
          position: relative;
        }
        .mb-decide-card {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 18px 20px;
          background: rgba(253,250,246,0.06);
          border: 1px solid rgba(253,250,246,0.14);
          border-radius: 12px;
          text-decoration: none;
          color: #FDFAF6;
          position: relative;
          transition: background 160ms, border-color 160ms, transform 180ms;
        }
        .mb-decide-card:hover {
          background: rgba(253,250,246,0.1);
          border-color: rgba(184,149,90,0.6);
          transform: translateY(-2px);
        }
        .mb-decide-label { font-weight: 700; font-size: 16px; color: #FDFAF6; }
        .mb-decide-sub { font-size: 14px; color: #D4CAB8; line-height: 1.4; }
        .mb-decide-arrow {
          position: absolute;
          top: 16px; right: 18px;
          color: #B8955A;
          font-size: 18px;
          transition: transform 180ms;
        }
        .mb-decide-card:hover .mb-decide-arrow { transform: translateX(4px); }
      `}</style>
    </section>
  )
}
