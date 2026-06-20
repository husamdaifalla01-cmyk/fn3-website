'use client'

import { useState } from 'react'
import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'
import { Hanken_Grotesk } from 'next/font/google'
import s from './ApprovalPath.module.css'

// Display = Playfair Display (from the finance layout's --font-playfair). Body = Hanken.
const hanken = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-hanken', display: 'swap' })

function band(sc: number) {
  if (sc < 500) return { l: 'poor', n: "Below 500 — but you still have real, specific options. The 'apply and hope' path is closed; the collateral path is wide open." }
  if (sc < 560) return { l: 'rebuilding', n: "You're in the most common range of everyone who lands here. A 500-ish score doesn't rule you out — it just rules out the wrong kind of card." }
  return { l: 'almost there', n: 'Closer than you think. A couple of the right moves over 90 days pulls this into approved territory.' }
}

export default function ApprovalPathHub() {
  const [score, setScore] = useState(520)
  const [car, setCar] = useState<null | 'yes' | 'no'>(null)
  const b = band(score)
  const owns = car === 'yes'

  function pick(v: 'yes' | 'no') { setCar(v); trackEvent('approval_path_answer', { car: v, scoreBand: b.l, surface: 'hub' }) }

  return (
    <div className={`${s.wrap} ${hanken.variable}`}>
      <header className={s.bleed}>
        <div className={s.hero}>
          <div className={s.heroGrid}>
            <div className={s.heroCopy}>
              <span className={s.kicker}>Money &amp; Credit · start here</span>
              <h1 className={s.h1}>Bad credit?<br />You&apos;re in the <span className={s.it}>right place.</span></h1>
              <p className={s.lede}>Don&apos;t read a hundred articles. Tell us two things and we&apos;ll point you straight to the next step that fits <span className={s.it}>your</span> situation.</p>
            </div>
            <div className={s.engine}>
              <div className={s.ei}>
                <div className={s.step}>
                  <div className={s.stepK}><span className={s.ix}>01</span><span className={s.lbl}>Where&apos;s your score, roughly?</span></div>
                  <p className={s.hint}>// a guess is fine — this just routes you</p>
                  <div className={s.readout}><span className={s.rn}>{score}</span><span className={s.rb}>· {b.l}</span></div>
                  <div className={s.trackWrap}>
                    <div className={s.popBand} style={{ left: '64.5%', width: '28.7%' }} />
                    <div className={s.popLabel} style={{ left: '79%' }}>most people start here</div>
                    <input className={s.range} type="range" min={300} max={579} value={score} onChange={(e) => setScore(+e.target.value)} aria-label="Your credit score" />
                    <div className={s.ends}><span>300</span><span>579</span></div>
                  </div>
                  <p className={s.reassure}>{b.n}</p>
                </div>
                <div className={s.step}>
                  <div className={s.stepK}><span className={s.ix}>02</span><span className={s.lbl}>Do you own a car? (paid off, or close)</span></div>
                  <p className={s.hint}>// it opens a faster path than most people realize</p>
                  <div className={s.pills}>
                    <div className={`${s.pill} ${owns ? s.pillSel : ''}`} onClick={() => pick('yes')}>Yes, I own one</div>
                    <div className={`${s.pill} ${car === 'no' ? s.pillSel : ''}`} onClick={() => pick('no')}>Not yet</div>
                  </div>
                </div>
                <div className={`${s.reveal} ${car ? s.revealShow : ''}`}>
                  {car && (
                    <div className={s.revealCard}>
                      <div className={s.rcK}><span className={s.rcDot} />Where to go next</div>
                      <div className={s.rcH}>Here&apos;s your path.</div>
                      {owns ? (
                        <>
                          <div className={s.rcBody} dangerouslySetInnerHTML={{ __html: `You own a car and you&apos;re rebuilding from a <strong>${score}</strong>. Start with a <strong>car-secured card</strong> — the highest-limit &apos;yes&apos; available to you, and it ignores your score entirely.` }} />
                          <Link href="/finance/credit-card-500-credit-score" className={s.cta}>Open the 500-score card guide →</Link>
                        </>
                      ) : (
                        <>
                          <div className={s.rcBody} dangerouslySetInnerHTML={{ __html: `No car to leverage at a <strong>${score}</strong>? Start with a <strong>secured card</strong> that reports to all three bureaus — the most reliable way to build the history lenders want to see.` }} />
                          <Link href="/finance/secured-credit-card-bad-credit" className={s.cta}>Open the secured-card guide →</Link>
                        </>
                      )}
                      <div className={s.ctaSub}>✓ Plain-English guide · the soft-pull check · what to avoid</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
