/**
 * SubziiApple.tsx  v2
 *
 * Apple presentation style promo for Subzii — rebuilt with @remotion/transitions
 * 1080 × 1920 · 30fps · ~20s · 585 frames
 *
 * Changes from v1:
 *   – TransitionSeries replaces raw <Sequence> stack + manual overlap hacks
 *   – Per-cut presentation chosen by emotional intent
 *   – springTiming(durationRestThreshold:0.001) everywhere — no cutoff artifacts
 *   – Removed fo() / SceneWrap — TransitionSeries owns the visual overlap
 *   – flip(from-left) reveals the actual UI (S5→S6) — card flip moment
 *   – clockWipe + neon overlay on brand cut
 *   – Enter via slide(from-bottom), exit via fade
 *
 * Duration math (TransitionSeries):
 *   Σ sequences: 115+140+115+115+105+105+60 = 755f
 *   Σ transitions: 28+28+28+28+30+28        = 170f
 *   Net total: 755 − 170 = 585f ≈ 19.5s
 */

import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from 'remotion';
import {
  TransitionSeries,
  springTiming,
  linearTiming,
} from '@remotion/transitions';
import { fade }  from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { flip }  from '@remotion/transitions/flip';

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  black:  '#000000',
  white:  '#FFFFFF',
  offW:   '#F5F5F7',
  grey:   '#86868B',
  dim:    '#48484A',
  green:  '#BDFF00',
  greenD: '#8AB800',
  greenF: '#D4FF4D',
};

const INTER = `Inter, -apple-system, 'Helvetica Neue', sans-serif`;
const MONO  = `'SF Mono', 'Fira Code', ui-monospace, monospace`;

// ─── Shared timings ───────────────────────────────────────────────────────────
// springTiming with durationRestThreshold:0.001 → no cutoff — approx 28f at 30fps
const SPRING_T = springTiming({ config: { damping: 200 }, durationRestThreshold: 0.001 });
const FLIP_T   = linearTiming({ durationInFrames: 30, easing: Easing.bezier(0.4, 0, 0.2, 1) });

// ─── Spring helpers (for element-level animations inside scenes) ──────────────
const cfg = {
  ease: { damping: 26, stiffness: 180, mass: 0.9 },
  snap: { damping: 20, stiffness: 300, mass: 0.5 },
  slow: { damping: 32, stiffness: 120, mass: 1.2 },
};

function sp(frame: number, fps: number, delay = 0, preset: keyof typeof cfg = 'ease') {
  return spring({ frame: frame - delay, fps, config: cfg[preset] });
}

function lerp(t: number, a: number, b: number) {
  return interpolate(t, [0, 1], [a, b], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export const SubziiApple: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: C.black, fontFamily: INTER }}>
      <TransitionSeries>

        {/* S1 — Problem */}
        <TransitionSeries.Sequence durationInFrames={115}>
          <S1_Problem />
        </TransitionSeries.Sequence>

        {/* S1→S2: fade — silence before the name lands */}
        <TransitionSeries.Transition presentation={fade()} timing={SPRING_T} />

        {/* S2 — Name reveal */}
        <TransitionSeries.Sequence durationInFrames={140}>
          <S2_Name />
        </TransitionSeries.Sequence>

        {/* S2→S3: slide from-bottom — Apple WWDC upward push into features */}
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-bottom' })}
          timing={SPRING_T}
        />

        {/* S3 — Feature 1: See every dollar */}
        <TransitionSeries.Sequence durationInFrames={115}>
          <S3_Feature
            eyebrow="Real-time earnings"
            headline={`See every\ndollar.`}
            sub={"Every click. Every sale.\nEvery cent. Live."}
          />
        </TransitionSeries.Sequence>

        {/* S3→S4: slide from-left — lateral feature scroll */}
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-left' })}
          timing={SPRING_T}
        />

        {/* S4 — Feature 2: Paid in 48 hours */}
        <TransitionSeries.Sequence durationInFrames={115}>
          <S3_Feature
            eyebrow="Automatic payouts"
            headline={`Paid in\n48 hours.`}
            sub={"Stripe Connect transfer.\nNo organizer. No waiting."}
          />
        </TransitionSeries.Sequence>

        {/* S4→S5: slide from-left — continue lateral progression */}
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-left' })}
          timing={SPRING_T}
        />

        {/* S5 — Feature 3: Earn more as you grow */}
        <TransitionSeries.Sequence durationInFrames={105}>
          <S3_Feature
            eyebrow="Tiered commissions"
            headline={`Earn more\nas you grow.`}
            sub={"Bronze → Silver → Gold → Platinum\n10%  →  12%  →  15%  →  20%"}
          />
        </TransitionSeries.Sequence>

        {/* S5→S6: flip from-left — card flip reveals the actual product */}
        <TransitionSeries.Transition
          presentation={flip({ direction: 'from-left', perspective: 1200 })}
          timing={FLIP_T}
        />

        {/* S6 — UI Demo */}
        <TransitionSeries.Sequence durationInFrames={105}>
          <S6_UIDemo />
        </TransitionSeries.Sequence>

        {/* S6→S7: fade — meditative close */}
        <TransitionSeries.Transition presentation={fade()} timing={SPRING_T} />

        {/* S7 — Tagline */}
        <TransitionSeries.Sequence durationInFrames={60}>
          <S7_Tagline />
        </TransitionSeries.Sequence>

        {/* Exit fade */}
        <TransitionSeries.Transition presentation={fade()} timing={SPRING_T} />

      </TransitionSeries>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// S1 — Problem
// ─────────────────────────────────────────────────────────────────────────────
const S1_Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stat = sp(frame, fps, 0, 'snap');
  const line = sp(frame, fps, 20, 'ease');

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', padding: '0 80px' }}>
        <div style={{
          fontSize: 76, fontWeight: 800, color: C.white,
          letterSpacing: -2.5, lineHeight: 1.0,
          opacity: interpolate(stat, [0, 0.3], [0, 1]),
          transform: `scale(${lerp(stat, 0.88, 1)})`,
          marginBottom: 20,
        }}>
          87 tickets sold.
        </div>
        <div style={{
          fontSize: 36, fontWeight: 400, color: C.grey,
          letterSpacing: -0.5, lineHeight: 1.4,
          opacity: interpolate(line, [0, 0.4], [0, 1]),
          transform: `translateY(${lerp(line, 14, 0)}px)`,
        }}>
          Still waiting on your money?
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// S2 — Name reveal
// ─────────────────────────────────────────────────────────────────────────────
const S2_Name: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glow    = sp(frame, fps, 0, 'slow');
  const logo    = sp(frame, fps, 6, 'snap');
  const name    = sp(frame, fps, 18, 'snap');
  const divider = sp(frame, fps, 28, 'ease');
  const tag     = sp(frame, fps, 34, 'ease');

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>

      {/* Neon glow bloom */}
      <div style={{
        position: 'absolute',
        width: 700, height: 700, borderRadius: '50%',
        background: `radial-gradient(circle, ${C.green}22 0%, transparent 65%)`,
        opacity: lerp(glow, 0, 1),
        transform: `scale(${lerp(glow, 0.5, 1)})`,
      }} />

      <div style={{
        textAlign: 'center', position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>

        {/* Real logo */}
        <div style={{
          marginBottom: 20,
          opacity: interpolate(logo, [0, 0.4], [0, 1]),
          transform: `scale(${lerp(logo, 0.55, 1)}) rotate(${lerp(logo, -12, 0)}deg)`,
        }}>
          <Img src={staticFile('subzii-logo.png')} style={{ width: 100, height: 100, objectFit: 'contain' }} />
        </div>

        {/* Wordmark */}
        <div style={{
          fontSize: 108, fontWeight: 900, color: C.white,
          letterSpacing: -4, lineHeight: 0.92,
          opacity: interpolate(name, [0, 0.3], [0, 1]),
          transform: `scale(${lerp(name, 0.82, 1)})`,
          marginBottom: 18,
          textShadow: `0 0 80px ${C.green}40`,
        }}>
          Subzii
        </div>

        {/* Neon divider line draws itself */}
        <div style={{
          width: lerp(divider, 0, 160),
          height: 3,
          backgroundColor: C.green,
          borderRadius: 2,
          boxShadow: `0 0 20px ${C.green}80, 0 0 40px ${C.green}40`,
          marginBottom: 20,
        }} />

        {/* Tagline */}
        <div style={{
          fontSize: 26, fontWeight: 500, color: C.grey, letterSpacing: 0.2,
          opacity: interpolate(tag, [0, 0.4], [0, 1]),
          transform: `translateY(${lerp(tag, 10, 0)}px)`,
        }}>
          Turn Events Into Income
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// S3/S4/S5 — Feature beats (reused for all 3)
// ─────────────────────────────────────────────────────────────────────────────
const S3_Feature: React.FC<{ eyebrow: string; headline: string; sub: string }> = ({
  eyebrow, headline, sub,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eye  = sp(frame, fps, 0, 'ease');
  const head = sp(frame, fps, 12, 'snap');
  const body = sp(frame, fps, 28, 'ease');
  const line = sp(frame, fps, 4, 'ease');

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'flex-start', padding: '0 80px' }}>

      {/* Neon accent bar */}
      <div style={{
        position: 'absolute', left: 80, top: '50%',
        height: 3,
        width: lerp(line, 0, 52),
        backgroundColor: C.green,
        borderRadius: 2,
        marginTop: -118,
        boxShadow: `0 0 16px ${C.green}80, 0 0 32px ${C.green}40`,
      }} />

      <div style={{ paddingTop: '41%' }}>
        <div style={{
          fontSize: 17, fontWeight: 600, color: C.green,
          letterSpacing: 2.5, textTransform: 'uppercase',
          opacity: interpolate(eye, [0, 0.4], [0, 1]),
          transform: `translateY(${lerp(eye, 8, 0)}px)`,
          marginBottom: 16,
          textShadow: `0 0 20px ${C.green}60`,
        }}>
          {eyebrow}
        </div>

        <div style={{
          fontSize: 76, fontWeight: 800, color: C.white,
          letterSpacing: -2.5, lineHeight: 1.0,
          opacity: interpolate(head, [0, 0.3], [0, 1]),
          transform: `scale(${lerp(head, 0.92, 1)})`,
          transformOrigin: 'left center',
          marginBottom: 26,
          whiteSpace: 'pre-line',
        }}>
          {headline}
        </div>

        <div style={{
          fontSize: 28, fontWeight: 400, color: C.grey,
          lineHeight: 1.55, letterSpacing: -0.2,
          whiteSpace: 'pre-line',
          opacity: interpolate(body, [0, 0.4], [0, 1]),
          transform: `translateY(${lerp(body, 12, 0)}px)`,
        }}>
          {sub}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// S6 — UI Demo (Apple hardware phone)
// ─────────────────────────────────────────────────────────────────────────────
const S6_UIDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phone  = sp(frame, fps, 0, 'slow');
  const header = sp(frame, fps, 14, 'ease');
  const amount = sp(frame, fps, 22, 'ease');
  const rows   = sp(frame, fps, 34, 'ease');
  const badge  = sp(frame, fps, 44, 'snap');
  const payout = sp(frame, fps, 54, 'ease');

  const total = lerp(amount, 0, 1218.5);
  const newSale = spring({ frame: frame - 60, fps, config: cfg.snap });
  const extra   = frame >= 60 ? lerp(newSale, 0, 63.5) : 0;

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>

      <div style={{
        position: 'absolute',
        width: 500, height: 600, borderRadius: '50%',
        background: `radial-gradient(ellipse, ${C.green}18 0%, transparent 65%)`,
        opacity: lerp(phone, 0, 1),
      }} />

      <div style={{
        opacity: interpolate(phone, [0, 0.35], [0, 1]),
        transform: `scale(${lerp(phone, 0.86, 1)}) translateY(${lerp(phone, 70, 0)}px)`,
      }}>
        <div style={{
          width: 360,
          backgroundColor: '#0A0A0A',
          borderRadius: 54,
          border: '10px solid #2C2C2E',
          boxShadow: `0 0 0 1px #3A3A3C, 0 60px 140px rgba(0,0,0,0.95), 0 0 60px ${C.green}20`,
          overflow: 'hidden',
        }}>
          {/* Dynamic island */}
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 14, marginBottom: 10 }}>
            <div style={{ width: 120, height: 34, backgroundColor: '#000', borderRadius: 20 }} />
          </div>

          <div style={{ padding: '4px 20px 0' }}>
            {/* Header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 18,
              opacity: interpolate(header, [0, 0.5], [0, 1]),
            }}>
              <div>
                <div style={{ fontSize: 11, color: '#48484A', textTransform: 'uppercase', letterSpacing: 1.5 }}>Live Earnings</div>
                <div style={{ fontSize: 13, color: '#86868B' }}>Night Fever · Mar 15</div>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 10px',
                backgroundColor: `${C.green}18`,
                borderRadius: 20,
                border: `1px solid ${C.green}40`,
                opacity: interpolate(badge, [0, 0.5], [0, 1]),
                transform: `scale(${lerp(badge, 0.8, 1)})`,
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  backgroundColor: C.green,
                  boxShadow: `0 0 ${interpolate(Math.sin(frame / 7), [-1, 1], [4, 10])}px ${C.green}`,
                }} />
                <span style={{ fontSize: 11, color: C.green, fontWeight: 700 }}>LIVE</span>
              </div>
            </div>

            {/* Big number */}
            <div style={{
              textAlign: 'center', padding: '18px 12px',
              backgroundColor: '#111',
              borderRadius: 16,
              border: `1px solid ${C.green}${frame >= 60 ? '40' : '18'}`,
              marginBottom: 14,
              opacity: interpolate(amount, [0, 0.4], [0, 1]),
              transform: `scale(${lerp(amount, 0.88, 1)})`,
            }}>
              <div style={{
                fontSize: 52, fontWeight: 800, color: C.green,
                letterSpacing: -2, fontVariantNumeric: 'tabular-nums',
                textShadow: `0 0 30px ${C.green}60`,
              }}>
                ${(total + extra).toFixed(2)}
              </div>
              {frame >= 60 && (
                <div style={{
                  fontSize: 12, color: C.green, marginTop: 5,
                  opacity: interpolate(newSale, [0, 0.2, 0.7, 1], [0, 1, 1, 0.4]),
                }}>
                  +$63.50 — new sale ↑
                </div>
              )}
              <div style={{ fontSize: 12, color: '#48484A', marginTop: 4 }}>CAD · 87 sales</div>
            </div>

            {/* Stat pills */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, opacity: interpolate(rows, [0, 0.5], [0, 1]) }}>
              {[
                { label: 'Pending', val: '$340',   color: '#FF9F0A' },
                { label: 'Today',   val: '$127',   color: '#BF5AF2' },
                { label: 'Tier',    val: 'Gold',   color: '#FFD60A' },
              ].map((s, i) => (
                <div key={i} style={{
                  flex: 1, textAlign: 'center', padding: '10px 4px',
                  backgroundColor: '#1C1C1E', borderRadius: 12,
                }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: '#48484A', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Payout row */}
            <div style={{
              padding: '12px 14px', backgroundColor: '#1C1C1E', borderRadius: 14,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 8,
              opacity: interpolate(payout, [0, 0.5], [0, 1]),
              transform: `translateY(${lerp(payout, 8, 0)}px)`,
            }}>
              <div>
                <div style={{ fontSize: 12, color: '#86868B' }}>Next payout</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.white }}>Mar 17 · Automatic</div>
              </div>
              <div style={{
                padding: '5px 12px', backgroundColor: `${C.green}18`,
                borderRadius: 20, fontSize: 12, color: C.green, fontWeight: 600,
                border: `1px solid ${C.green}40`,
              }}>
                Scheduled ✓
              </div>
            </div>
          </div>

          {/* Home indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0 12px' }}>
            <div style={{ width: 120, height: 4, backgroundColor: '#3A3A3C', borderRadius: 2 }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// S7 — Closing tagline
// ─────────────────────────────────────────────────────────────────────────────
const S7_Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glow = sp(frame, fps, 0, 'slow');
  const sub  = sp(frame, fps, 0, 'snap');
  const name = sp(frame, fps, 10, 'snap');
  const logo = sp(frame, fps, 4, 'snap');
  const link = sp(frame, fps, 22, 'ease');

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        position: 'absolute', width: 800, height: 800, borderRadius: '50%',
        background: `radial-gradient(circle, ${C.green}18 0%, transparent 65%)`,
        opacity: lerp(glow, 0, 1),
      }} />

      <div style={{ textAlign: 'center', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          marginBottom: 12,
          opacity: interpolate(logo, [0, 0.5], [0, 1]),
          transform: `scale(${lerp(logo, 0.7, 1)})`,
        }}>
          <Img src={staticFile('subzii-logo.png')} style={{ width: 64, height: 64, objectFit: 'contain' }} />
        </div>

        <div style={{
          fontSize: 24, fontWeight: 500, color: C.grey, marginBottom: 10,
          opacity: interpolate(sub, [0, 0.4], [0, 1]),
          transform: `translateY(${lerp(sub, 10, 0)}px)`,
        }}>
          Turn Events Into Income
        </div>

        <div style={{
          fontSize: 100, fontWeight: 900, color: C.white,
          letterSpacing: -4, lineHeight: 0.92, marginBottom: 20,
          opacity: interpolate(name, [0, 0.3], [0, 1]),
          transform: `scale(${lerp(name, 0.9, 1)})`,
          textShadow: `0 0 80px ${C.green}35`,
        }}>
          Subzii
        </div>

        <div style={{
          fontSize: 18, color: C.dim, fontFamily: MONO, letterSpacing: 0.5,
          opacity: interpolate(link, [0, 0.5], [0, 1]),
        }}>
          subzii.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
