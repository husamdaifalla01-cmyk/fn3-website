'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import AffiliateLink from '@/components/AffiliateLink'
import FinanceEmailCapture from '@/components/FinanceEmailCapture'
import FTCDisclosure from '@/components/FTCDisclosure'
import { trackEvent } from '@/lib/analytics'
import { YENDO_500_HERO } from '@/lib/affiliateUrls'
import { Hanken_Grotesk } from 'next/font/google'
import s from './ApprovalPath.module.css'

// Display = Playfair Display, provided by the finance layout via --font-playfair
// (matches the live Mintbrooks brand). Body = Hanken Grotesk.
const hanken = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-hanken', display: 'swap' })

function band(sc: number) {
  if (sc < 500) return { l: 'poor', n: "Below 500 — but you still have real, specific options. The 'apply and hope' path is closed; the collateral path is wide open." }
  if (sc < 560) return { l: 'rebuilding', n: "You're in the most common range of everyone who lands here. A 500-ish score doesn't rule you out — it just rules out the wrong kind of card." }
  return { l: 'almost there', n: 'Closer than you think. A couple of the right moves over 90 days pulls this into approved territory.' }
}

export default function ApprovalPath500() {
  const [score, setScore] = useState(520)
  const [car, setCar] = useState<null | 'yes' | 'no'>(null)
  const b = band(score)
  const pathRef = useRef<SVGPathElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const p = pathRef.current, c = chartRef.current
    if (!p || !c) return
    const len = p.getTotalLength()
    p.style.strokeDasharray = String(len); p.style.strokeDashoffset = String(len)
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { p.style.strokeDashoffset = '0'; c.classList.add(s.in); io.disconnect() }
    }), { threshold: 0.3 })
    io.observe(c)
    return () => io.disconnect()
  }, [])

  function pick(v: 'yes' | 'no') {
    setCar(v)
    trackEvent('approval_path_answer', { car: v, scoreBand: b.l })
  }

  const owns = car === 'yes'

  return (
    <div className={`${s.wrap} ${hanken.variable}`}>
      {/* HERO + ENGINE */}
      <header className={s.bleed}>
        <div className={s.hero}>
          <p className={s.bc}>Mintbrooks › Finance › Credit cards for a 500 score</p>
          <div className={s.heroGrid}>
            <div className={s.heroCopy}>
              <span className={s.kicker}>For a 500 score that keeps getting declined</span>
              <h1 className={s.h1}>Credit cards for a 500 score that <span className={s.it}>actually</span> approve.</h1>
              <p className={s.lede}>Two questions. No credit check, no signup, no lecture — just the one path most likely to approve <span className={s.it}>you</span>.</p>
            </div>
            <div className={s.engine}>
              <div className={s.ei}>
                <div className={s.step}>
                  <div className={s.stepK}><span className={s.ix}>01</span><span className={s.lbl}>Where are you, honestly?</span></div>
                  <p className={s.hint}>// drag it — nobody sees this but you</p>
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
                  <p className={s.hint}>// this decides your fastest route to a real card</p>
                  <div className={s.pills}>
                    <div className={`${s.pill} ${owns ? s.pillSel : ''}`} onClick={() => pick('yes')}>Yes, I own one</div>
                    <div className={`${s.pill} ${car === 'no' ? s.pillSel : ''}`} onClick={() => pick('no')}>Not yet</div>
                  </div>
                </div>
                <div className={`${s.reveal} ${car ? s.revealShow : ''}`}>
                  {car && (
                    <div className={s.revealCard}>
                      {owns && (
                        <div className={`${s.dreamcard}`}>
                          <div className={s.dcShine} />
                          <div className={s.dcTop}><span className={s.dcBrand}>MINTBROOKS</span><span>●●</span></div>
                          <div className={s.dcChip} />
                          <div className={s.dcNum}>•••• •••• •••• {String(score).padStart(4, '0').slice(-4)}</div>
                          <div className={s.dcBot}><span>READY TO ACTIVATE</span><span className={s.dcOk}>✓ PRE-APPROVED</span></div>
                        </div>
                      )}
                      <div className={s.rcK}><span className={s.rcDot} />Your approval path</div>
                      {owns ? (
                        <>
                          <div className={s.rcH}>This card is built for your exact situation.</div>
                          <div className={s.rcBody} dangerouslySetInnerHTML={{ __html: `A car-secured card uses your car's value — not your <strong>${score}</strong> score — to set your limit. A ${score} doesn't disqualify you. And checking is a <strong>soft pull: it won't cost you a single point.</strong>` }} />
                          <AffiliateLink href={YENDO_500_HERO} placement="ap-reveal-yendo" className={s.cta}>Check if my car qualifies — free →</AffiliateLink>
                          <div className={s.ctaSub}>✓ Soft inquiry · no score impact · ~60 seconds</div>
                        </>
                      ) : (
                        <>
                          <div className={s.rcH}>Your move: a secured card that builds real history.</div>
                          <div className={s.rcBody} dangerouslySetInnerHTML={{ __html: `At a <strong>${score}</strong> with no car to leverage, a secured card is the cleanest path — a small deposit becomes your limit, it reports to <strong>all three bureaus</strong>, and that on-time history is what actually moves your score.` }} />
                          <Link href="/finance/secured-credit-card-bad-credit" className={s.cta}>See the card that reports to all three →</Link>
                          <div className={s.ctaSub}>✓ No hard pull to check · reports to all 3 bureaus</div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* YENDO SHOWCASE */}
      <section className={`${s.yhero} ${s.fb}`}>
        <div className={s.bleed}>
          <span className={s.ek}>The card most likely to say yes</span>
          <h2 className={`${s.mega} ${s.yhead}`}>Meet Yendo.<br />It reads your <span className={s.it}>car</span>,<br />not your credit.</h2>
          <p className={s.yintro}>A <strong>real Visa</strong>, secured by the equity in a car you own — so a <strong>500, 480, even a 420</strong> can get a genuine revolving limit of <strong>$500–$10,000+</strong>. No cash deposit. You keep driving your car the whole time.</p>
          <div className={s.ygrid}>
            <div className={`${s.dreamcard} ${s.lg}`}>
              <div className={s.dcShine} />
              <div className={s.dcTop}><span className={s.dcBrand}>MINTBROOKS</span><span>●●</span></div>
              <div className={s.dcChip} />
              <div className={s.dcNum}>•••• •••• •••• ••••</div>
              <div className={s.dcBot}><span>SECURED BY YOUR CAR</span><span className={s.dcOk}>✓ NO MIN. SCORE</span></div>
            </div>
            <div>
              <div className={s.ystep}><span className={s.yn}>01</span><div><b>Check eligibility — free</b><span>A 60-second soft pull. It won&apos;t appear on your report or cost you a single point.</span></div></div>
              <div className={s.ystep}><span className={s.yn}>02</span><div><b>Yendo values your car</b><span>Your limit comes from what your car is worth — not your FICO. No deposit, no cash out of pocket.</span></div></div>
              <div className={s.ystep}><span className={s.yn}>03</span><div><b>Get a real Visa</b><span>Use it anywhere. It reports to all three bureaus, so every on-time payment rebuilds your score.</span></div></div>
              <div className={s.ygets}>
                {['Real Visa', 'No minimum score', 'No cash deposit', '$500–$10k+ limit', 'Keep your car', 'Reports to all 3 bureaus'].map((t) => <span key={t} className={s.tag}>{t}</span>)}
              </div>
              <div className={s.ycta}>
                <AffiliateLink href={YENDO_500_HERO} placement="ap-yendo-showcase" className={`${s.cta} ${s.ctaBig}`}>Check if my car qualifies — free →</AffiliateLink>
                <span className={s.yfine}>Soft inquiry · no score impact · affiliate link · not a lender</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMAIL CAPTURE (T3) */}
      <div className={s.bleed} style={{ marginTop: 48 }}>
        <FTCDisclosure />
        <FinanceEmailCapture source="finance-500-approval-path" headline="Before you apply: get the 500-score approval checklist" subtext="The 7 things to fix in the next 30 minutes that decide whether your application is auto-approved or auto-declined. Free, one email." />
      </div>

      {/* REFRAME */}
      <section className={`${s.reframe} ${s.fb}`}>
        <div className={s.bleed}>
          <span className={s.kicker} style={{ display: 'block', marginBottom: 16 }}>The reframe</span>
          <h2 className={s.h2}>Your score isn&apos;t a verdict.<br />It&apos;s a <span className={s.it}>starting line.</span></h2>
          <p>A 500 isn&apos;t who you are — it&apos;s where you begin. The people who climb out don&apos;t have better numbers. They just make the next right move instead of the next anxious one.</p>
          <div className={s.startline}>
            <div className={s.slTrack} /><div className={s.slFill} />
            <div className={s.slYou}>YOU — TODAY</div><div className={s.slMark} />
            <div className={s.slGoal}>A REAL REVOLVING CARD →</div>
          </div>
        </div>
      </section>

      {/* CLIMB */}
      <section className={s.climb}>
        <div className={s.bleed}>
          <span className={s.kicker}>The 90 days after your first yes</span>
          <h2 className={s.h2}>Watch the number climb.</h2>
          <p className={s.sub}>The first approved card is the hinge. Used right — low balance, paid on time — this is the curve most people walk in 90 days. Not magic. Just momentum.</p>
          <div className={s.chart} ref={chartRef}>
            <svg viewBox="0 0 600 270" role="img" aria-label="Credit score climbing from 500 to about 700 over 90 days">
              <defs><linearGradient id="apg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0A7D52" stopOpacity=".22" /><stop offset="1" stopColor="#0A7D52" stopOpacity="0" /></linearGradient></defs>
              <line className={s.gl} x1="40" y1="40" x2="580" y2="40" /><line className={s.gl} x1="40" y1="100" x2="580" y2="100" />
              <line className={s.gl} x1="40" y1="170" x2="580" y2="170" /><line className={s.gl} x1="40" y1="240" x2="580" y2="240" />
              <line className={s.thresh} x1="40" y1="100" x2="580" y2="100" />
              <text className={s.threshT} x="580" y="94" textAnchor="end">approval territory →</text>
              <path className={s.area} d="M40,140 C180,150 250,120 320,100 S520,55 580,42 L580,240 L40,240 Z" />
              <path className={s.cpath} ref={pathRef} d="M40,140 C180,150 250,120 320,100 S520,55 580,42" />
              <circle className={s.cdot} cx="40" cy="140" r="6" /><circle className={s.cdot} cx="320" cy="100" r="6" /><circle className={s.cdot} cx="580" cy="42" r="6" />
              <text className={s.ann} x="40" y="165"><tspan style={{ fill: '#1A1714', fontWeight: 600 }}>500</tspan> · today</text>
              <text className={s.ann} x="300" y="128">first real card</text>
              <text className={s.ann} x="560" y="34" textAnchor="end"><tspan style={{ fill: '#1A1714', fontWeight: 600 }}>~700</tspan> · real limits</text>
            </svg>
          </div>
        </div>
      </section>

      {/* UNLOCKS */}
      <section className={`${s.unlocks} ${s.fb}`}>
        <div className={s.bleed}>
          <span className={s.kicker}>What a yes actually unlocks</span>
          <h2 className={s.h2}>It was never about the card.</h2>
          <div className={s.scenes}>
            <div className={`${s.scene} ${s.s1}`}>
              <svg className={s.scIco} width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="1.6"><path d="M3 13l2-5a2 2 0 012-1.3h10A2 2 0 0119 8l2 5" /><path d="M3 13h18v4a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1H7v1a1 1 0 01-1 1H4a1 1 0 01-1-1z" /></svg>
              <h3>Drive away<br />approved.</h3><p>Walk into the dealership, the apartment, the moment you&apos;ve been putting off — already a yes.</p>
            </div>
            <div className={`${s.scene} ${s.s2}`}>
              <svg className={s.scIco} width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="1.6"><rect x="2.5" y="5.5" width="19" height="13" rx="2.5" /><path d="M2.5 9.5h19M6 14.5h4" /></svg>
              <h3>A limit you can actually use.</h3><p>Not a $200 toy. A real revolving line that grows as you prove yourself — and stops the constant juggling.</p>
            </div>
            <div className={`${s.scene} ${s.s3}`}>
              <svg className={s.scIco} width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.3l2.4 2.4 4.6-5" /></svg>
              <h3>The praying<br />stops.</h3><p>No more holding your breath at checkout. Just the quiet confidence of knowing it&apos;ll go through.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
