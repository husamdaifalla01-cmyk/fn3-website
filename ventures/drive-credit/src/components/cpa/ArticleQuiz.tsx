'use client'

import { useState, useCallback } from 'react'

// Score-routing: Q1 answer → best-fit funnel.
type Score = 'under_500' | '500_580' | '580_640' | '640_plus'

export type QuizProps = {
  offerId: string
  // Funnel URLs keyed by score band. Falls back to the article's own offer.
  routes: Record<Score, string>
  // The article's default offer, used if a route isn't configured.
  fallback: string
}

const SCORE_OPTS: { val: Score; label: string; sub: string }[] = [
  { val: 'under_500', label: 'Under 500',  sub: 'Declined recently' },
  { val: '500_580',  label: '500 – 580',   sub: 'Collections on file' },
  { val: '580_640',  label: '580 – 640',   sub: 'Rebuilding' },
  { val: '640_plus', label: '640+',        sub: 'Want better options' },
]

const CAR_OPTS = [
  { val: 'yes_paid', label: 'Yes — paid off' },
  { val: 'yes_loan', label: 'Yes — still have a loan' },
  { val: 'no',       label: 'No car' },
]

const GOAL_OPTS = [
  { val: 'rebuild',     label: 'Rebuild my credit' },
  { val: 'cash',        label: 'Fast cash I can repay' },
  { val: 'consolidate', label: 'Consolidate debt' },
]

export default function ArticleQuiz({ offerId, routes, fallback }: QuizProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [answers, setAnswers] = useState<string[]>([])

  const pick = useCallback((val: string) => {
    const next = [...answers, val]
    setAnswers(next)
    if (step < 3) {
      setStep((step + 1) as 2 | 3)
    } else {
      setStep(4)
      // Plausible (if loaded)
      if (typeof window !== 'undefined') {
        const w = window as unknown as { plausible?: (e: string, o?: unknown) => void }
        w.plausible?.('quiz_complete', {
          props: { offer_origin: offerId, score: next[0], answers: next.join('_') },
        })
      }
    }
  }, [answers, step, offerId])

  const score = (answers[0] as Score) || 'under_500'
  const route = routes[score] ?? fallback
  const cta = `${route}${route.includes('?') ? '&' : '?'}quiz=${answers.join('_')}`

  return (
    <section className="mb-quiz">
      <div className="mb-quiz-inner">
        <div className="mb-quiz-head">
          <span className="mb-quiz-eyebrow">30-Second Match</span>
          <h3>See your real approval odds</h3>
          <p>Three questions. No credit check. We&apos;ll match you to the lender most likely to approve <em>you</em>.</p>
        </div>

        {step === 1 && (
          <div className="mb-quiz-step" key="s1">
            <p className="mb-quiz-q">What&apos;s your credit score today?</p>
            <div className="mb-quiz-grid mb-quiz-grid-2">
              {SCORE_OPTS.map((o) => (
                <button key={o.val} className="mb-quiz-opt mb-quiz-opt-tall" onClick={() => pick(o.val)}>
                  <span className="mb-quiz-opt-label">{o.label}</span>
                  <span className="mb-quiz-opt-sub">{o.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mb-quiz-step" key="s2">
            <p className="mb-quiz-q">Do you own a car?</p>
            <div className="mb-quiz-grid mb-quiz-grid-1">
              {CAR_OPTS.map((o) => (
                <button key={o.val} className="mb-quiz-opt" onClick={() => pick(o.val)}>
                  <span className="mb-quiz-opt-label">{o.label}</span>
                  <span className="mb-quiz-arrow">→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mb-quiz-step" key="s3">
            <p className="mb-quiz-q">What&apos;s the #1 thing to solve in 90 days?</p>
            <div className="mb-quiz-grid mb-quiz-grid-1">
              {GOAL_OPTS.map((o) => (
                <button key={o.val} className="mb-quiz-opt" onClick={() => pick(o.val)}>
                  <span className="mb-quiz-opt-label">{o.label}</span>
                  <span className="mb-quiz-arrow">→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="mb-quiz-result" key="r">
            <p className="mb-quiz-result-label">Your matched path</p>
            <p className="mb-quiz-result-head">Fastest approval route for a <strong>{SCORE_OPTS.find(s => s.val === score)?.label}</strong> score:</p>
            <a className="mb-quiz-cta" href={cta} target="_blank" rel="sponsored nofollow noopener">
              <span>See my matched offer</span>
              <span className="mb-quiz-cta-arrow">→</span>
            </a>
            <p className="mb-quiz-fine">Soft pull only. No impact to your credit score. Under 2 minutes.</p>
          </div>
        )}

        <div className="mb-quiz-progress" aria-hidden>
          {[1, 2, 3].map((n) => (
            <span key={n} className={`mb-quiz-dot ${step > n ? 'done' : step === n ? 'on' : ''}`} />
          ))}
        </div>
      </div>

      <style>{`
        .mb-quiz {
          position: relative;
          margin: 48px 0;
          background: linear-gradient(180deg, #FDFAF6 0%, #F5EDE5 100%);
          border: 1px solid #E7DFD3;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(29,58,47,0.04), 0 24px 48px -24px rgba(29,58,47,0.18);
        }
        .mb-quiz::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 100% 0%, rgba(184,149,90,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 0% 100%, rgba(29,58,47,0.06) 0%, transparent 60%);
          pointer-events: none;
        }
        .mb-quiz-inner { position: relative; padding: clamp(24px, 4vw, 40px); }
        .mb-quiz-head { margin-bottom: 28px; }
        .mb-quiz-eyebrow {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #B8955A;
          margin-bottom: 12px;
        }
        .mb-quiz-head h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 700;
          color: #1D3A2F;
          line-height: 1.15;
          margin: 0 0 10px;
          letter-spacing: -0.015em;
        }
        .mb-quiz-head p { margin: 0; color: #6B6557; font-size: 15px; line-height: 1.6; }
        .mb-quiz-head em { color: #1D3A2F; font-style: italic; }

        .mb-quiz-step { animation: mb-quiz-in 260ms cubic-bezier(.2,.7,.2,1); }
        @keyframes mb-quiz-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }

        .mb-quiz-q {
          font-weight: 600;
          color: #1A1714;
          margin: 0 0 14px;
          font-size: 16px;
        }
        .mb-quiz-grid { display: grid; gap: 10px; }
        .mb-quiz-grid-1 { grid-template-columns: 1fr; }
        .mb-quiz-grid-2 { grid-template-columns: 1fr 1fr; }
        @media (max-width: 520px) { .mb-quiz-grid-2 { grid-template-columns: 1fr; } }

        .mb-quiz-opt {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          width: 100%;
          padding: 16px 18px;
          background: #fff;
          border: 1px solid #D4CAB8;
          border-radius: 12px;
          font: inherit;
          color: #1A1714;
          text-align: left;
          cursor: pointer;
          transition: border-color 160ms, transform 160ms, box-shadow 160ms, background 160ms;
        }
        .mb-quiz-opt-tall {
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          padding: 18px 18px 16px;
        }
        .mb-quiz-opt:hover {
          border-color: #1D3A2F;
          background: #FFFDF9;
          transform: translateY(-1px);
          box-shadow: 0 8px 16px -8px rgba(29,58,47,0.18);
        }
        .mb-quiz-opt:focus-visible {
          outline: 2px solid #1D3A2F;
          outline-offset: 2px;
        }
        .mb-quiz-opt:active { transform: translateY(0); }
        .mb-quiz-opt-label { font-weight: 600; font-size: 16px; }
        .mb-quiz-opt-sub { font-size: 13px; color: #8a8578; }
        .mb-quiz-arrow { color: #B8955A; font-weight: 700; font-size: 18px; }

        .mb-quiz-result {
          text-align: center;
          padding: 12px 0 4px;
          animation: mb-quiz-in 400ms cubic-bezier(.2,.7,.2,1);
        }
        .mb-quiz-result-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #B8955A;
          margin: 0 0 10px;
        }
        .mb-quiz-result-head {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 22px;
          color: #1A1714;
          margin: 0 auto 22px;
          max-width: 520px;
          line-height: 1.35;
        }
        .mb-quiz-result-head strong { color: #1D3A2F; }
        .mb-quiz-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          background: #1D3A2F;
          color: #FDFAF6;
          text-decoration: none;
          border-radius: 999px;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 0.01em;
          transition: transform 160ms, box-shadow 160ms, background 160ms;
          box-shadow: 0 1px 2px rgba(0,0,0,0.08), 0 8px 16px -8px rgba(29,58,47,0.4);
        }
        .mb-quiz-cta:hover { transform: translateY(-2px); box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 14px 24px -10px rgba(29,58,47,0.5); background: #24483A; }
        .mb-quiz-cta:active { transform: translateY(0); }
        .mb-quiz-cta-arrow { transition: transform 200ms; }
        .mb-quiz-cta:hover .mb-quiz-cta-arrow { transform: translateX(4px); }
        .mb-quiz-fine { margin: 16px 0 0; font-size: 12px; color: #8a8578; }

        .mb-quiz-progress {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
        }
        .mb-quiz-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #D4CAB8;
          transition: background 200ms, width 200ms;
        }
        .mb-quiz-dot.on { background: #1D3A2F; width: 20px; border-radius: 3px; }
        .mb-quiz-dot.done { background: #B8955A; }
      `}</style>
    </section>
  )
}
