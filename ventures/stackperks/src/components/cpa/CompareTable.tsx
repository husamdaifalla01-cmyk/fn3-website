'use client'

type Row = { id: string; name: string; minScore: string; bestFor: string; time: string; href: string }

const ROWS: Row[] = [
  { id: 'yendo',              name: 'Yendo',          minScore: 'No min',  bestFor: 'Car title backed',     time: '2 min',  href: 'https://mintbrooks.com/finance/build-credit-with-your-car?utm_source=editorial&utm_medium=compare&utm_campaign=yendo' },
  { id: 'slamdunk_finance',   name: 'Slamdunk',       minScore: '500+',    bestFor: 'Debt consolidation',   time: '3 min',  href: 'https://mintbrooks.com/finance/debt-consolidation-check?utm_source=editorial&utm_medium=compare&utm_campaign=slamdunk' },
  { id: 'fast_cash_online',   name: 'Fast Cash',      minScore: '500+',    bestFor: 'Emergency, 24h fund',  time: '2 min',  href: 'https://afflat3e3.com/trk/lnk/39C31C1E-2822-4350-B92A-2693C829ED6A/?o=12940&c=918277&a=769106&k=CBCB19B53F865FD4B516A6030205801C&l=13434&aff_sub=compare' },
  { id: 'comparemefunds',     name: 'CompareMe',      minScore: '580+',    bestFor: 'Rates, 20+ lenders',   time: '90s',    href: 'https://afflat3e1.com/trk/lnk/39C31C1E-2822-4350-B92A-2693C829ED6A/?o=18576&c=918277&a=769106&k=ED393B6EF2DE462C0A98B2528BBEA265&l=19773&aff_sub=compare' },
]

export default function CompareTable() {
  return (
    <section className="mb-compare">
      <header className="mb-compare-head">
        <span className="mb-compare-eyebrow">Side by Side</span>
        <h3>Top 4 options, compared</h3>
        <p>Ranked by approval realism for sub-640 applicants. Every check is a soft pull — no score impact.</p>
      </header>

      <div className="mb-compare-table" role="table">
        <div className="mb-compare-thead" role="row">
          <div role="columnheader">Lender</div>
          <div role="columnheader">Min score</div>
          <div role="columnheader">Best for</div>
          <div role="columnheader">Check</div>
          <div role="columnheader" aria-label="Action" />
        </div>
        {ROWS.map((r) => (
          <a
            key={r.id}
            href={r.href}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="mb-compare-row"
            role="row"
          >
            <div role="cell" className="mb-compare-name">{r.name}</div>
            <div role="cell" className="mb-compare-score">{r.minScore}</div>
            <div role="cell" className="mb-compare-best">{r.bestFor}</div>
            <div role="cell" className="mb-compare-time">{r.time}</div>
            <div role="cell" className="mb-compare-cta"><span>Check</span><span className="mb-compare-arrow">→</span></div>
          </a>
        ))}
      </div>

      <style>{`
        .mb-compare {
          margin: 48px 0;
          background: #FDFAF6;
          border: 1px solid #E7DFD3;
          border-radius: 18px;
          padding: clamp(24px, 4vw, 36px);
        }
        .mb-compare-head { margin-bottom: 20px; }
        .mb-compare-eyebrow {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #B8955A;
          margin-bottom: 10px;
        }
        .mb-compare-head h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(22px, 2.5vw, 28px);
          font-weight: 700;
          color: #1D3A2F;
          margin: 0 0 8px;
          letter-spacing: -0.015em;
        }
        .mb-compare-head p { margin: 0; color: #6B6557; font-size: 14px; line-height: 1.5; }

        .mb-compare-table { display: flex; flex-direction: column; border-radius: 12px; overflow: hidden; border: 1px solid #E7DFD3; }
        .mb-compare-thead,
        .mb-compare-row {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 1.6fr 0.7fr 1.2fr;
          gap: 12px;
          align-items: center;
          padding: 14px 18px;
          background: #fff;
        }
        .mb-compare-thead {
          background: #1D3A2F;
          color: #FDFAF6;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 12px 18px;
        }
        .mb-compare-row {
          text-decoration: none;
          color: #1A1714;
          border-top: 1px solid #F0E8DA;
          transition: background 160ms, transform 160ms;
        }
        .mb-compare-row:hover { background: #FDFAF6; transform: translateX(2px); }

        .mb-compare-name { font-weight: 700; color: #1D3A2F; }
        .mb-compare-score { font-variant-numeric: tabular-nums; color: #1A1714; font-weight: 600; }
        .mb-compare-best { color: #6B6557; font-size: 14px; }
        .mb-compare-time { color: #8a8578; font-size: 13px; font-variant-numeric: tabular-nums; }
        .mb-compare-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 14px;
          background: #1D3A2F;
          color: #FDFAF6;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          justify-self: end;
          transition: background 160ms, gap 160ms;
        }
        .mb-compare-row:hover .mb-compare-cta { background: #24483A; gap: 12px; }
        .mb-compare-arrow { transition: transform 180ms; }
        .mb-compare-row:hover .mb-compare-arrow { transform: translateX(2px); }

        @media (max-width: 760px) {
          .mb-compare-thead { display: none; }
          .mb-compare-row {
            grid-template-columns: 1fr auto;
            grid-template-areas:
              'name    cta'
              'score   time'
              'best    best';
            gap: 6px 12px;
            padding: 16px 18px;
          }
          .mb-compare-name  { grid-area: name; font-size: 18px; }
          .mb-compare-score { grid-area: score; font-size: 14px; }
          .mb-compare-best  { grid-area: best; font-size: 13px; color: #8a8578; }
          .mb-compare-time  { grid-area: time; text-align: right; font-size: 13px; }
          .mb-compare-cta   { grid-area: cta; justify-self: end; }
        }
      `}</style>
    </section>
  )
}
