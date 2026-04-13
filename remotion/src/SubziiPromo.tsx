/**
 * SubziiPromo.tsx  v2
 *
 * 1080×1920 · 30fps · ~37s · 1105 frames
 *
 * Changes from v1:
 *   – TransitionSeries replaces <Sequence> + SceneWrap (no more double-fade)
 *   – Per-cut transition: wipe/slide/flip/clockWipe/fade by emotional intent
 *   – springTiming(durationRestThreshold:0.001) — no cutoff artifacts
 *   – Brand corrected: purple → neon lime #BDFF00, real S-ribbon logo
 *   – Tagline fixed: "Turn Events Into Income"
 *   – TransitionSeries.Overlay: neon flash on S6→S7 brand reveal cut
 *   – Enter slide(from-bottom), exit fade
 *
 * Duration math:
 *   Σ sequences: 150+175+180+150+160+140+210+150 = 1315f
 *   Σ transitions: 28+28+28+30+28+40+28          = 210f
 *   Net total: 1315 − 210 = 1105f ≈ 36.8s
 */

import React from 'react';
import {
  AbsoluteFill,
  Audio,
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
import { fade }      from '@remotion/transitions/fade';
import { slide }     from '@remotion/transitions/slide';
import { wipe }      from '@remotion/transitions/wipe';
import { flip }      from '@remotion/transitions/flip';
import { clockWipe } from '@remotion/transitions/clock-wipe';

// ─── Brand tokens (real Subzii) ───────────────────────────────────────────────
const B = {
  bg:      '#0A0A0F',
  surface: '#13131A',
  up:      '#1E1E2A',
  border:  '#2A2A3A',
  lime:    '#BDFF00',   // real brand color
  limeD:   '#8AB800',
  limeF:   '#D4FF4D',
  amber:   '#F59E0B',
  green:   '#10B981',   // earnings/money
  red:     '#EF4444',
  white:   '#FAFAF9',
  muted:   '#A8A29E',
  dim:     '#78716C',
};

const UI    = `Inter, system-ui, -apple-system, sans-serif`;
const MONO  = `'SF Mono','Fira Code',monospace`;
const BRAND = `Georgia,'Times New Roman',serif`;

// ─── Shared timings ───────────────────────────────────────────────────────────
const SPRING_T    = springTiming({ config: { damping: 200 }, durationRestThreshold: 0.001 });
const FLIP_T      = linearTiming({ durationInFrames: 30, easing: Easing.bezier(0.4, 0, 0.2, 1) });
const CLOCKWIPE_T = linearTiming({ durationInFrames: 40, easing: Easing.bezier(0.4, 0, 0.2, 1) });

// ─── Element-level spring helpers ─────────────────────────────────────────────
function sp(frame: number, fps: number, delay = 0, damping = 18, stiffness = 220, mass = 0.6) {
  return spring({ frame: frame - delay, fps, config: { damping, stiffness, mass } });
}
function lerp(t: number, a: number, b: number) {
  return interpolate(t, [0, 1], [a, b], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
}

// ─── Mobile chrome ────────────────────────────────────────────────────────────
const AppWindow: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div style={{
    width: 380, backgroundColor: B.surface, borderRadius: 44,
    border: `1px solid ${B.border}`, overflow: 'hidden',
    boxShadow: `0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)`,
  }}>
    <div style={{
      height: 48, backgroundColor: B.surface,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px',
    }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: B.white, fontFamily: UI }}>9:41</span>
      {title && <span style={{ fontSize: 12, color: B.muted, fontFamily: UI }}>{title}</span>}
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: B.white }}>●●●</span>
        <span style={{ fontSize: 11, color: B.white }}>🔋</span>
      </div>
    </div>
    {children}
    <div style={{ height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 134, height: 5, backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 3 }} />
    </div>
  </div>
);

// ─── Terminal chrome ──────────────────────────────────────────────────────────
const Terminal: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    width: 640, backgroundColor: '#0D0D0D', borderRadius: 12,
    border: '1px solid #333', overflow: 'hidden',
    boxShadow: '0 32px 100px rgba(0,0,0,0.8)', fontFamily: MONO,
  }}>
    <div style={{
      height: 40, backgroundColor: '#1A1A1A',
      display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8,
    }}>
      {['#FF5F57','#FFBD2E','#28CA41'].map((c, i) => (
        <div key={i} style={{ width: 13, height: 13, borderRadius: '50%', backgroundColor: c }} />
      ))}
      <span style={{ marginLeft: 'auto', fontSize: 12, color: '#666' }}>zsh — subzii</span>
    </div>
    <div style={{ padding: '16px 20px', fontSize: 14, lineHeight: 1.7, color: '#e5e7eb' }}>
      {children}
    </div>
  </div>
);

// ─── Root ─────────────────────────────────────────────────────────────────────
export const SubziiPromo: React.FC<{ musicFile?: string }> = ({ musicFile }) => {
  const { fps, width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: B.bg, fontFamily: UI }}>

      {musicFile && (
        <Audio
          src={staticFile(musicFile)}
          volume={(f) => interpolate(f, [0, 30, 1075, 1105], [0, 0.4, 0.4, 0], { extrapolateRight: 'clamp' })}
        />
      )}

      <TransitionSeries>

        {/* S1 — Pain Hook */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <S1_PainHook />
        </TransitionSeries.Sequence>

        {/* S1→S2: wipe from-bottom — app loads up */}
        <TransitionSeries.Transition
          presentation={wipe({ direction: 'from-bottom' })}
          timing={SPRING_T}
        />

        {/* S2 — App Home */}
        <TransitionSeries.Sequence durationInFrames={175}>
          <S2_AppHome />
        </TransitionSeries.Sequence>

        {/* S2→S3: slide from-left — navigate deeper */}
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-left' })}
          timing={SPRING_T}
        />

        {/* S3 — Affiliate Dashboard */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <S3_AffiliateDashboard />
        </TransitionSeries.Sequence>

        {/* S3→S4: slide from-left — continue deeper */}
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-left' })}
          timing={SPRING_T}
        />

        {/* S4 — Live Earnings */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <S4_LiveEarnings />
        </TransitionSeries.Sequence>

        {/* S4→S5: flip from-left — card flip to payout info */}
        <TransitionSeries.Transition
          presentation={flip({ direction: 'from-left', perspective: 1400 })}
          timing={FLIP_T}
        />

        {/* S5 — Payout Timeline */}
        <TransitionSeries.Sequence durationInFrames={160}>
          <S5_PayoutTimeline />
        </TransitionSeries.Sequence>

        {/* S5→S6: slide from-left — next feature */}
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-left' })}
          timing={SPRING_T}
        />

        {/* S6 — Tier Ladder */}
        <TransitionSeries.Sequence durationInFrames={140}>
          <S6_TierLadder />
        </TransitionSeries.Sequence>

        {/* Neon lime flash overlay — straddles the S6→S7 cut (offset=-6 places it 6f before end of S6) */}
        <TransitionSeries.Overlay durationInFrames={12} offset={-6}>
          <NeonFlash />
        </TransitionSeries.Overlay>

        {/* S6→S7: clockWipe — cinematic brand reveal */}
        <TransitionSeries.Transition
          presentation={clockWipe({ width, height })}
          timing={CLOCKWIPE_T}
        />

        {/* S7 — Brand Reveal */}
        <TransitionSeries.Sequence durationInFrames={210}>
          <S7_BrandReveal />
        </TransitionSeries.Sequence>

        {/* S7→S8: fade — power and silence */}
        <TransitionSeries.Transition presentation={fade()} timing={SPRING_T} />

        {/* S8 — CTA */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <S8_CTA />
        </TransitionSeries.Sequence>

        {/* Exit */}
        <TransitionSeries.Transition presentation={fade()} timing={SPRING_T} />

      </TransitionSeries>
    </AbsoluteFill>
  );
};

// ─── Neon flash overlay ───────────────────────────────────────────────────────
const NeonFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 3, 9, 12], [0, 0.18, 0.12, 0], { extrapolateRight: 'clamp' });
  return <AbsoluteFill style={{ backgroundColor: B.lime, opacity }} />;
};

// ─────────────────────────────────────────────────────────────────────────────
// S1 — Pain Hook (terminal stats)
// ─────────────────────────────────────────────────────────────────────────────
const TERMINAL_LINES = [
  { text: '$ subzii status',                   delay: 0,  color: B.lime },
  { text: '● Fetching your dashboard...',      delay: 18, color: B.muted },
  { text: '',                                  delay: 26, color: '' },
  { text: '  Event     Night Fever — Mar 15',  delay: 30, color: '#e5e7eb' },
  { text: '  Tickets sold        87',          delay: 42, color: '#e5e7eb' },
  { text: '  Commission owed     $1,218.50',   delay: 50, color: B.limeF },
  { text: '  Payout status       PENDING',     delay: 58, color: B.red },
  { text: '  Organizer response  —',           delay: 66, color: B.dim },
  { text: '  Days waiting        12',          delay: 74, color: B.red },
  { text: '',                                  delay: 82, color: '' },
  { text: '⚠  No payment. No ETA. No transparency.', delay: 86, color: B.red },
];

const S1_PainHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tilt  = sp(frame, fps, 0, 14, 180, 0.8);
  const rotX  = lerp(tilt, 20, 0);
  const rotY  = Math.sin(frame / 30) * 1.5;
  const slideY = lerp(tilt, 120, 0);

  return (
    <AbsoluteFill style={{
      justifyContent: 'center', alignItems: 'center',
      background: `radial-gradient(ellipse at 50% 80%, ${B.limeD}20 0%, transparent 60%)`,
    }}>
      <div style={{ transform: `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(${slideY}px)` }}>
        <Terminal>
          {TERMINAL_LINES.map((line, i) => {
            if (!line.text) return <div key={i} style={{ height: 8 }} />;
            const visible   = frame >= line.delay;
            const charCount = visible ? Math.min(line.text.length, frame - line.delay + 1) : 0;
            return (
              <div key={i} style={{
                color: line.color || '#e5e7eb', fontFamily: MONO, fontSize: 14,
                opacity: visible ? 1 : 0, whiteSpace: 'pre',
              }}>
                {line.text.slice(0, charCount)}
                {visible && charCount < line.text.length && (
                  <span style={{
                    display: 'inline-block', width: 8, height: 14,
                    backgroundColor: B.lime, marginLeft: 1,
                    opacity: Math.sin(frame / 4) > 0 ? 1 : 0,
                  }} />
                )}
              </div>
            );
          })}
        </Terminal>
      </div>

      {frame >= 110 && (
        <div style={{
          position: 'absolute', bottom: 180,
          opacity: interpolate(frame, [110, 125], [0, 1], { extrapolateRight: 'clamp' }),
          transform: `translateY(${interpolate(frame, [110, 125], [20, 0], { extrapolateRight: 'clamp' })}px)`,
          textAlign: 'center',
        }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: B.white, fontFamily: BRAND }}>
            There's a better way.
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// S2 — App Home
// ─────────────────────────────────────────────────────────────────────────────
const S2_AppHome: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const win   = sp(frame, fps, 0);
  const logo  = sp(frame, fps, 8);
  const tag   = sp(frame, fps, 20);
  const input = sp(frame, fps, 34);
  const chips = sp(frame, fps, 48);

  return (
    <AbsoluteFill style={{
      justifyContent: 'center', alignItems: 'center',
      background: `radial-gradient(ellipse at 50% 30%, ${B.limeD}30 0%, transparent 65%)`,
    }}>
      <div style={{
        opacity: interpolate(win, [0, 0.25], [0, 1]),
        transform: `scale(${lerp(win, 0.92, 1)}) translateY(${lerp(win, 40, 0)}px)`,
      }}>
        <AppWindow title="Subzii">
          <div style={{ padding: '28px 24px 0', textAlign: 'center' }}>

            {/* Real logo + wordmark */}
            <div style={{
              opacity: interpolate(logo, [0, 0.3], [0, 1]),
              transform: `scale(${lerp(logo, 0.7, 1)})`,
              marginBottom: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            }}>
              <Img src={staticFile('subzii-logo.png')} style={{ width: 48, height: 48, objectFit: 'contain' }} />
              <span style={{ fontSize: 26, fontWeight: 800, color: B.white, fontFamily: BRAND, letterSpacing: -0.5 }}>
                Subzii
              </span>
            </div>

            <div style={{
              opacity: interpolate(tag, [0, 0.4], [0, 1]),
              transform: `translateY(${lerp(tag, 16, 0)}px)`, marginBottom: 28,
            }}>
              <p style={{ fontSize: 15, color: B.muted, margin: 0, lineHeight: 1.5, fontFamily: UI }}>
                Turn Events Into Income
              </p>
            </div>

            {/* Chat input */}
            <div style={{
              opacity: interpolate(input, [0, 0.4], [0, 1]),
              transform: `translateY(${lerp(input, 20, 0)}px)`, marginBottom: 16,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                backgroundColor: B.up, borderRadius: 22, border: `1px solid ${B.border}`,
                padding: '12px 14px',
              }}>
                <span style={{ fontSize: 13, color: B.dim, flex: 1, fontFamily: UI }}>Ask Subzii anything...</span>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${B.lime}, ${B.limeD})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, color: '#000', fontWeight: 800,
                }}>↑</div>
              </div>
            </div>

            {/* Chips */}
            <div style={{
              opacity: interpolate(chips, [0, 0.4], [0, 1]),
              display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', paddingBottom: 8,
            }}>
              {[
                { label: 'Promoter', color: B.lime },
                { label: 'Opus 4.6', color: B.amber },
                { label: '+ Attach', color: B.dim },
              ].map((chip, i) => (
                <div key={i} style={{
                  padding: '6px 14px', backgroundColor: B.up, borderRadius: 20,
                  border: `1px solid ${chip.color}55`,
                  fontSize: 12, color: chip.color, fontFamily: UI, fontWeight: 600,
                }}>
                  {chip.label}
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions grid */}
          <div style={{
            margin: '16px 16px 4px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
            opacity: interpolate(chips, [0.2, 0.8], [0, 1]),
          }}>
            {[
              { icon: '🔗', label: 'My Links',  sub: '3 active events' },
              { icon: '💰', label: 'Earnings',  sub: '$1,218 total' },
              { icon: '📊', label: 'Analytics', sub: '87 sales' },
              { icon: '⚡', label: 'Payouts',   sub: 'Next: Mar 17' },
            ].map((item, i) => (
              <div key={i} style={{
                backgroundColor: B.up, borderRadius: 14,
                border: `1px solid ${B.border}`, padding: '12px 14px',
              }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: B.white, fontFamily: UI }}>{item.label}</div>
                <div style={{ fontSize: 11, color: B.muted, fontFamily: UI }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </AppWindow>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// S3 — Affiliate Dashboard (3-column)
// ─────────────────────────────────────────────────────────────────────────────
const S3_AffiliateDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const left   = sp(frame, fps, 0);
  const center = sp(frame, fps, 12);
  const right  = sp(frame, fps, 24);
  const stats  = sp(frame, fps, 36);

  const clicks = Math.round(lerp(stats, 0, 234));
  const sales  = Math.round(lerp(stats, 0, 87));
  const earned = lerp(stats, 0, 1218.5);

  const EVENTS = ['Night Fever', 'Rooftop Sessions', 'Velvet Lounge'];
  const STEPS  = ['Reading files', 'Tracking sales', 'Calculating tier', 'Queuing payout'];
  const TOOLS  = [
    { name: 'affiliate.getLink', done: frame > 50 },
    { name: 'sales.track',       done: frame > 70 },
    { name: 'stripe.transfer',   done: frame > 100 },
  ];

  return (
    <AbsoluteFill style={{
      justifyContent: 'center', alignItems: 'center',
      background: `radial-gradient(ellipse at 50% 50%, ${B.limeD}18 0%, transparent 65%)`,
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>

        {/* Left: event list */}
        <div style={{
          width: 170,
          opacity: interpolate(left, [0, 0.4], [0, 1]),
          transform: `translateX(${lerp(left, -20, 0)}px)`,
        }}>
          <div style={{ backgroundColor: B.surface, borderRadius: 14, border: `1px solid ${B.border}`, padding: '12px 0', overflow: 'hidden' }}>
            <div style={{ padding: '0 14px 10px', fontSize: 11, color: B.dim, textTransform: 'uppercase', letterSpacing: 1.2, fontFamily: UI }}>
              My Events
            </div>
            {EVENTS.map((e, i) => (
              <div key={i} style={{
                padding: '10px 14px',
                backgroundColor: i === 0 ? `${B.lime}18` : 'transparent',
                borderLeft: i === 0 ? `3px solid ${B.lime}` : '3px solid transparent',
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: i === 0 ? B.white : B.muted, fontFamily: UI }}>{e}</div>
                <div style={{ fontSize: 10, color: B.dim, marginTop: 2, fontFamily: UI }}>
                  {i === 0 ? 'Active · Gold tier' : i === 1 ? '62 sales' : '28 sales'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center: link card */}
        <div style={{
          width: 220,
          opacity: interpolate(center, [0, 0.4], [0, 1]),
          transform: `translateY(${lerp(center, 20, 0)}px)`,
        }}>
          <div style={{ backgroundColor: B.surface, borderRadius: 14, border: `1px solid ${B.border}`, overflow: 'hidden' }}>
            <div style={{
              padding: '12px 14px',
              background: `linear-gradient(135deg, ${B.limeD}40, ${B.surface})`,
              borderBottom: `1px solid ${B.border}`,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: `linear-gradient(135deg, ${B.lime}, ${B.limeD})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                overflow: 'hidden',
              }}>
                <Img src={staticFile('subzii-logo.png')} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: B.white, fontFamily: UI }}>Night Fever</div>
                <div style={{ fontSize: 10, color: B.muted, fontFamily: UI }}>NF2025 · Approved ✓</div>
              </div>
            </div>

            <div style={{ display: 'flex', borderBottom: `1px solid ${B.border}` }}>
              {[
                { label: 'Clicks', val: clicks.toLocaleString(), icon: '👆' },
                { label: 'Sales',  val: sales.toLocaleString(),  icon: '🎟' },
                { label: 'Earned', val: `$${earned.toFixed(0)}`, icon: '💰', hi: true },
              ].map((s, i) => (
                <div key={i} style={{
                  flex: 1, padding: '10px 6px', textAlign: 'center',
                  borderRight: i < 2 ? `1px solid ${B.border}` : 'none',
                }}>
                  <div style={{ fontSize: 16 }}>{s.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginTop: 3, color: s.hi ? B.green : B.white, fontFamily: UI }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: B.muted, fontFamily: UI }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ padding: '10px 14px' }}>
              <div style={{ fontSize: 10, color: B.dim, marginBottom: 4, fontFamily: MONO }}>Your link</div>
              <div style={{
                fontSize: 11, color: B.lime, fontFamily: MONO,
                backgroundColor: B.up, borderRadius: 6, padding: '6px 10px', border: `1px solid ${B.border}`,
              }}>
                subzii.com/nf2025
              </div>
            </div>
          </div>
        </div>

        {/* Right: pipeline + tools */}
        <div style={{
          width: 170,
          opacity: interpolate(right, [0, 0.4], [0, 1]),
          transform: `translateX(${lerp(right, 20, 0)}px)`,
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <div style={{ backgroundColor: B.surface, borderRadius: 14, border: `1px solid ${B.border}`, padding: '12px 14px' }}>
            <div style={{ fontSize: 10, color: B.dim, textTransform: 'uppercase', letterSpacing: 1.1, marginBottom: 10, fontFamily: UI }}>Pipeline</div>
            {STEPS.map((step, i) => {
              const done = frame > 40 + i * 20;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, opacity: done ? 1 : 0.3 }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                    backgroundColor: done ? B.green : B.border,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, color: done ? '#fff' : B.dim,
                  }}>
                    {done ? '✓' : '○'}
                  </div>
                  <span style={{ fontSize: 11, color: done ? B.white : B.dim, fontFamily: UI }}>{step}</span>
                </div>
              );
            })}
          </div>

          <div style={{ backgroundColor: B.surface, borderRadius: 14, border: `1px solid ${B.border}`, padding: '12px 14px' }}>
            <div style={{ fontSize: 10, color: B.dim, textTransform: 'uppercase', letterSpacing: 1.1, marginBottom: 10, fontFamily: UI }}>Tool calls</div>
            {TOOLS.map((t, i) => (
              <div key={i} style={{ marginBottom: 8, opacity: t.done ? 1 : 0.3 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 9, color: t.done ? B.green : B.dim }}>{t.done ? '✓' : '◌'}</span>
                  <span style={{ fontSize: 10, color: t.done ? B.lime : B.dim, fontFamily: MONO }}>{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// S4 — Live Earnings
// ─────────────────────────────────────────────────────────────────────────────
const S4_LiveEarnings: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const card   = sp(frame, fps, 0);
  const num    = sp(frame, fps, 10);
  const sub    = sp(frame, fps, 22);
  const saleAt = 80;
  const pulse  = spring({ frame: frame - saleAt, fps, config: { damping: 12, mass: 0.5, stiffness: 300 } });
  const newSale = frame >= saleAt ? lerp(pulse, 0, 63.5) : 0;
  const total   = 1218.5 + newSale;
  const pulseBg = frame >= saleAt ? interpolate(pulse, [0, 0.3, 1], [0, 0.18, 0], { extrapolateRight: 'clamp' }) : 0;

  return (
    <AbsoluteFill style={{
      justifyContent: 'center', alignItems: 'center',
      background: `radial-gradient(ellipse at 50% 40%, ${B.limeD}22 0%, transparent 65%)`,
    }}>
      <div style={{
        opacity: interpolate(card, [0, 0.3], [0, 1]),
        transform: `scale(${lerp(card, 0.92, 1)}) translateY(${lerp(card, 40, 0)}px)`,
      }}>
        <AppWindow title="Live Earnings">
          <div style={{ padding: '20px 20px 8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, color: B.dim, letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: UI }}>Total Earned</div>
                <div style={{ fontSize: 12, color: B.muted, marginTop: 2, fontFamily: UI }}>Updated now</div>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '5px 12px', backgroundColor: `${B.green}15`, borderRadius: 20,
                border: `1px solid ${B.green}40`,
                opacity: interpolate(card, [0, 0.5], [0, 1]),
              }}>
                <div style={{
                  width: 7, height: 7, borderRadius: '50%', backgroundColor: B.green,
                  boxShadow: `0 0 ${interpolate(Math.sin(frame / 8), [-1, 1], [4, 10])}px ${B.green}`,
                }} />
                <span style={{ fontSize: 11, color: B.green, fontWeight: 700, fontFamily: UI }}>LIVE</span>
              </div>
            </div>

            <div style={{
              padding: '22px 16px', borderRadius: 18,
              backgroundColor: `rgba(16,185,129,${pulseBg.toFixed(3)})`,
              border: `1px solid ${B.green}${frame >= saleAt ? '55' : '25'}`,
              textAlign: 'center', marginBottom: 14,
              opacity: interpolate(num, [0, 0.4], [0, 1]),
              transform: `scale(${lerp(num, 0.9, 1)})`,
            }}>
              <div style={{
                fontSize: 52, fontWeight: 800, color: B.green,
                letterSpacing: -1, fontVariantNumeric: 'tabular-nums', fontFamily: UI,
              }}>
                ${total.toFixed(2)}
              </div>
              {frame >= saleAt && (
                <div style={{
                  fontSize: 13, color: B.green, marginTop: 6, fontFamily: UI,
                  opacity: interpolate(pulse, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
                }}>
                  +$63.50 — new sale ↑
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 8, opacity: interpolate(sub, [0, 0.5], [0, 1]) }}>
              {[
                { label: 'Pending', val: '$340.00', color: B.amber },
                { label: 'Today',   val: '$127.50', color: B.lime },
                { label: 'Sales',   val: '87',      color: B.white },
              ].map((s, i) => (
                <div key={i} style={{
                  flex: 1, textAlign: 'center', padding: '10px 4px',
                  backgroundColor: B.up, borderRadius: 10, border: `1px solid ${B.border}`,
                }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: s.color, fontFamily: UI }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: B.muted, marginTop: 2, fontFamily: UI }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ paddingTop: 16, opacity: interpolate(sub, [0.3, 0.8], [0, 1]) }}>
              <p style={{ fontSize: 16, fontWeight: 600, color: B.white, margin: 0, lineHeight: 1.4, fontFamily: UI }}>
                No middleman.{'  '}No chasing.{'  '}No asking.
              </p>
            </div>
          </div>
        </AppWindow>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// S5 — Payout Timeline
// ─────────────────────────────────────────────────────────────────────────────
const TIMELINE_NODES = [
  { icon: '🎟', label: 'Event night',       date: 'Mar 15', sub: 'Night Fever',          color: B.lime },
  { icon: '⏰', label: 'Payout eligible',   date: 'Mar 17', sub: '48h after event',       color: B.amber },
  { icon: '⚡', label: 'Transfer initiated', date: 'Mar 17', sub: 'Stripe Connect — auto', color: '#BF5AF2' },
  { icon: '🏦', label: 'In your bank',      date: 'Mar 20', sub: 'No action needed',      color: B.green },
];

const S5_PayoutTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const header = sp(frame, fps, 0);
  const nodes  = TIMELINE_NODES.map((_, i) => sp(frame, fps, 8 + i * 20));
  const lines  = TIMELINE_NODES.slice(0, 3).map((_, i) => sp(frame, fps, 16 + i * 20));
  const amount = sp(frame, fps, 90);

  return (
    <AbsoluteFill style={{
      justifyContent: 'center', alignItems: 'center',
      background: `radial-gradient(ellipse at 50% 50%, ${B.limeD}20 0%, transparent 65%)`,
    }}>
      <div style={{
        opacity: interpolate(header, [0, 0.4], [0, 1]),
        transform: `scale(${lerp(header, 0.93, 1)})`,
      }}>
        <AppWindow title="Payout Schedule">
          <div style={{ padding: '20px 20px 0' }}>
            <div style={{ fontSize: 11, color: B.dim, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 4, fontFamily: UI }}>Payout Schedule</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: B.white, fontFamily: UI, marginBottom: 4 }}>Your money. On time. Guaranteed.</div>
            <div style={{ fontSize: 12, color: B.muted, marginBottom: 20, fontFamily: UI }}>Every payout is automatic — no organizer approval.</div>

            <div style={{ position: 'relative' }}>
              {TIMELINE_NODES.map((node, i) => (
                <React.Fragment key={i}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    opacity: interpolate(nodes[i], [0, 0.35], [0, 1]),
                    transform: `translateX(${lerp(nodes[i], -18, 0)}px)`,
                  }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 21, flexShrink: 0,
                      backgroundColor: B.up, border: `2px solid ${node.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                      boxShadow: `0 0 18px ${node.color}40`,
                    }}>
                      {node.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: B.white, fontFamily: UI }}>{node.label}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: node.color, fontFamily: UI }}>{node.date}</span>
                      </div>
                      <div style={{ fontSize: 11, color: B.muted, marginTop: 1, fontFamily: UI }}>{node.sub}</div>
                    </div>
                  </div>

                  {i < 3 && (
                    <div style={{ marginLeft: 20, width: 2, height: 22, backgroundColor: B.border, position: 'relative', overflow: 'hidden' }}>
                      <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0,
                        height: `${lerp(lines[i], 0, 100)}%`,
                        background: `linear-gradient(to bottom, ${node.color}, ${TIMELINE_NODES[i + 1].color})`,
                      }} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div style={{
              marginTop: 16, marginBottom: 4, padding: '14px 16px',
              backgroundColor: B.up, borderRadius: 12, border: `1px solid ${B.green}40`,
              opacity: interpolate(amount, [0, 0.5], [0, 1]),
              transform: `scale(${lerp(amount, 0.95, 1)})`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 11, color: B.muted, fontFamily: UI }}>Night Fever — payout</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: B.green, marginTop: 2, fontFamily: UI }}>
                    ${lerp(amount, 0, 1218.5).toFixed(2)}
                  </div>
                </div>
                <div style={{
                  padding: '6px 14px', backgroundColor: `${B.green}20`, borderRadius: 20,
                  border: `1px solid ${B.green}40`, fontSize: 11, color: B.green, fontWeight: 600, fontFamily: UI,
                }}>
                  Automatic ✓
                </div>
              </div>
            </div>
          </div>
        </AppWindow>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// S6 — Tier Ladder
// ─────────────────────────────────────────────────────────────────────────────
const TIERS = [
  { name: 'Bronze',   pct: '10%', min: 0,   color: '#CD7F32', current: false },
  { name: 'Silver',   pct: '12%', min: 25,  color: '#C0C0C0', current: false },
  { name: 'Gold',     pct: '15%', min: 50,  color: B.amber,   current: true  },
  { name: 'Platinum', pct: '20%', min: 100, color: B.lime,    current: false },
];

const S6_TierLadder: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const left   = sp(frame, fps, 0);
  const right  = sp(frame, fps, 14);
  const bottom = sp(frame, fps, 40);

  return (
    <AbsoluteFill style={{
      justifyContent: 'center', alignItems: 'center',
      background: `radial-gradient(ellipse at 50% 50%, ${B.limeD}20 0%, transparent 65%)`,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 14 }}>

          {/* Tier levels */}
          <div style={{
            width: 200,
            opacity: interpolate(left, [0, 0.4], [0, 1]),
            transform: `translateX(${lerp(left, -24, 0)}px)`,
          }}>
            <div style={{ backgroundColor: B.surface, borderRadius: 16, border: `1px solid ${B.border}`, overflow: 'hidden' }}>
              <div style={{ padding: '14px 16px 10px' }}>
                <div style={{ fontSize: 11, color: B.dim, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10, fontFamily: UI }}>Commission Tier</div>
                {TIERS.map((tier, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 10px', marginBottom: 4,
                    backgroundColor: tier.current ? `${tier.color}18` : 'transparent',
                    borderRadius: 10, border: tier.current ? `1px solid ${tier.color}55` : '1px solid transparent',
                    opacity: frame > i * 12 ? 1 : 0.2,
                  }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: '50%', backgroundColor: tier.color,
                      boxShadow: tier.current ? `0 0 10px ${tier.color}80` : 'none',
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: tier.current ? B.white : B.muted, fontFamily: UI }}>
                        {tier.name}
                        {tier.current && <span style={{ fontSize: 10, color: tier.color, marginLeft: 6 }}>← you</span>}
                      </div>
                      <div style={{ fontSize: 10, color: B.dim, fontFamily: UI }}>{tier.min}+ sales</div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: tier.color, fontFamily: UI }}>{tier.pct}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress */}
          <div style={{
            width: 200,
            opacity: interpolate(right, [0, 0.4], [0, 1]),
            transform: `translateX(${lerp(right, 24, 0)}px)`,
          }}>
            <div style={{ backgroundColor: B.surface, borderRadius: 16, border: `1px solid ${B.border}`, padding: '14px 16px' }}>
              <div style={{ fontSize: 11, color: B.dim, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 12, fontFamily: UI }}>Your Progress</div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, color: B.muted, marginBottom: 4, fontFamily: UI }}>Night Fever</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: B.amber, fontFamily: UI }}>87 / 100 sales</div>
                <div style={{ fontSize: 11, color: B.dim, marginTop: 3, fontFamily: UI }}>13 more → Platinum (20%)</div>
              </div>

              <div style={{ height: 8, backgroundColor: B.up, borderRadius: 4, overflow: 'hidden', marginBottom: 14 }}>
                <div style={{
                  height: '100%',
                  width: `${lerp(sp(frame, fps, 20), 0, 87)}%`,
                  background: `linear-gradient(90deg, ${B.amber}, ${B.lime})`,
                  borderRadius: 4,
                }} />
              </div>

              {[
                { tier: 'Gold (now)',     val: '$1,218.50' },
                { tier: 'Platinum (13→)', val: '$1,625.33' },
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '6px 0', borderTop: `1px solid ${B.border}`,
                  opacity: frame > 40 + i * 16 ? 1 : 0.2,
                }}>
                  <span style={{ fontSize: 11, color: B.muted, fontFamily: UI }}>{row.tier}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: B.green, fontFamily: UI }}>{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          opacity: interpolate(bottom, [0, 0.5], [0, 1]),
          transform: `translateY(${lerp(bottom, 14, 0)}px)`,
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 16, color: B.muted, margin: 0, fontFamily: UI }}>
            Sell more · Earn more · <span style={{ color: B.lime }}>Automatically tiered</span>
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// S7 — Brand Reveal
// ─────────────────────────────────────────────────────────────────────────────
const S7_BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineA = sp(frame, fps, 0,   16, 200, 0.7);
  const lineB = sp(frame, fps, 6,   16, 200, 0.7);
  const lineC = sp(frame, fps, 12,  16, 200, 0.7);
  const burst = sp(frame, fps, 20,  20, 280, 0.5);
  const logo  = sp(frame, fps, 50,  18, 240, 0.6);
  const sub1  = sp(frame, fps, 64,  18, 220, 0.6);
  const sub2  = sp(frame, fps, 80,  18, 220, 0.6);
  const icons = sp(frame, fps, 100, 16, 200, 0.7);

  const WORDS    = ['Turn', 'Events', 'Into', 'Income'];
  const PARTNERS = [
    { label: 'Stripe',   color: '#6772E5', icon: '💳' },
    { label: 'Supabase', color: '#3ECF8E', icon: '🗄' },
    { label: 'Vercel',   color: '#fff',    icon: '▲' },
    { label: 'Twilio',   color: '#F22F46', icon: '📱' },
  ];
  const particles = Array.from({ length: 10 }, (_, i) => ({
    x: 50 + 40 * Math.cos((i / 10) * Math.PI * 2),
    y: 50 + 40 * Math.sin((i / 10) * Math.PI * 2),
    delay: i * 8,
  }));

  return (
    <AbsoluteFill style={{
      justifyContent: 'center', alignItems: 'center',
      background: `radial-gradient(ellipse at 50% 50%, ${B.limeD}45 0%, ${B.bg} 70%)`,
      overflow: 'hidden',
    }}>
      {/* Grid */}
      <AbsoluteFill style={{ opacity: 0.06 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} style={{ position: 'absolute', left: `${(i / 20) * 100}%`, top: 0, bottom: 0, width: 1, backgroundColor: B.lime }} />
        ))}
        {Array.from({ length: 36 }, (_, i) => (
          <div key={i} style={{ position: 'absolute', top: `${(i / 36) * 100}%`, left: 0, right: 0, height: 1, backgroundColor: B.lime }} />
        ))}
      </AbsoluteFill>

      {/* Converging lines */}
      {frame < 55 && (
        <AbsoluteFill style={{ opacity: interpolate(frame, [48, 55], [1, 0], { extrapolateRight: 'clamp' }) }}>
          {[lineA, lineB, lineC].map((l, i) => {
            const angle = [-30, 0, 30][i];
            return (
              <div key={i} style={{
                position: 'absolute', left: '50%', top: '50%',
                width: lerp(l, 0, 500), height: 2,
                background: `linear-gradient(90deg, ${B.lime}, transparent)`,
                transformOrigin: 'left center',
                transform: `translateY(-50%) rotate(${angle + 180}deg)`,
              }} />
            );
          })}
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            width: lerp(burst, 0, 160), height: lerp(burst, 0, 160),
            borderRadius: '50%', border: `2px solid ${B.lime}`,
            transform: 'translate(-50%, -50%)',
            opacity: interpolate(burst, [0.8, 1], [0.8, 0]),
          }} />
        </AbsoluteFill>
      )}

      {/* Particles */}
      {particles.map((p, i) => {
        const pr = sp(frame, fps, p.delay, 14, 180, 0.7);
        return (
          <div key={i} style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: 5, height: 5, borderRadius: '50%', backgroundColor: B.lime,
            opacity: interpolate(pr, [0, 0.3, 1], [0, 0.8, 0.3]),
            transform: `scale(${lerp(pr, 0, 1)}) translate(-50%,-50%)`,
          }} />
        );
      })}

      {/* Logo + tagline */}
      {frame >= 44 && (
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 14, color: B.lime, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16, fontFamily: UI, opacity: interpolate(logo, [0, 0.4], [0, 1]) }}>
            ✦ Introducing ✦
          </div>

          {/* Real logo */}
          <div style={{
            marginBottom: 12,
            opacity: interpolate(logo, [0, 0.5], [0, 1]),
            transform: `scale(${lerp(logo, 0.65, 1)})`,
          }}>
            <Img src={staticFile('subzii-logo.png')} style={{ width: 72, height: 72, objectFit: 'contain' }} />
          </div>

          {/* SUBZII */}
          <div style={{
            fontSize: 80, fontWeight: 900, fontFamily: BRAND,
            background: `linear-gradient(160deg, ${B.white} 30%, ${B.lime})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: -2, lineHeight: 1,
            opacity: interpolate(logo, [0, 0.5], [0, 1]),
            transform: `scale(${lerp(logo, 0.75, 1)})`,
            marginBottom: 16,
          }}>
            SUBZII
          </div>

          {/* Word-by-word tagline */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16, opacity: interpolate(sub1, [0, 0.4], [0, 1]) }}>
            {WORDS.map((w, i) => {
              const ws = sp(frame, fps, 66 + i * 8, 18, 220);
              return (
                <span key={i} style={{
                  fontSize: 22, fontWeight: 700, color: B.white, fontFamily: UI,
                  opacity: interpolate(ws, [0, 0.5], [0, 1]),
                  transform: `translateY(${lerp(ws, 16, 0)}px)`, display: 'inline-block',
                }}>
                  {w}
                </span>
              );
            })}
          </div>

          {/* Feature line */}
          <div style={{
            fontSize: 13, fontFamily: MONO,
            background: `linear-gradient(90deg, ${B.lime}, ${B.amber}, ${B.green})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: 0.5,
            opacity: interpolate(sub2, [0, 0.5], [0, 1]),
            marginBottom: 28,
          }}>
            Automatic payouts · Tiered commissions · Real-time tracking
          </div>

          {/* Partner icons */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', opacity: interpolate(icons, [0, 0.5], [0, 1]) }}>
            {PARTNERS.map((p, i) => {
              const ps = sp(frame, fps, 102 + i * 10, 16, 200, 0.7);
              return (
                <div key={i} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  opacity: interpolate(ps, [0, 0.4], [0, 1]),
                  transform: `scale(${lerp(ps, 0.7, 1)})`,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, backgroundColor: B.up,
                    border: `1px solid ${p.color}55`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                    boxShadow: `0 0 12px ${p.color}30`,
                  }}>
                    {p.icon}
                  </div>
                  <span style={{ fontSize: 11, color: B.muted, fontFamily: UI }}>{p.label}</span>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: p.color }} />
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 20, fontSize: 13, color: B.dim, fontFamily: UI, opacity: interpolate(icons, [0.3, 0.8], [0, 1]) }}>
            Stripe + Supabase · Real payouts · Open to all promoters
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// S8 — CTA
// ─────────────────────────────────────────────────────────────────────────────
const S8_CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const label  = sp(frame, fps, 0);
  const logo   = sp(frame, fps, 10, 16, 200, 0.7);
  const title  = sp(frame, fps, 28);
  const link   = sp(frame, fps, 44);
  const button = sp(frame, fps, 56);

  const spin  = interpolate(logo, [0, 1], [-180, 0], { extrapolateRight: 'clamp' });
  const pulse = interpolate(Math.sin(frame / 10), [-1, 1], [0.97, 1.02]);

  const STARS = Array.from({ length: 6 }, (_, i) => ({
    angle: (i / 6) * 360 + frame * 1.5,
    r: 80,
  }));
  const DOTS = Array.from({ length: 14 }, (_, i) => ({
    x: (i * 73 + 17) % 100, y: (i * 41 + 31) % 100,
    size: 2 + (i % 3), delay: i * 5, speed: 0.02 + (i % 4) * 0.01,
  }));

  return (
    <AbsoluteFill style={{
      justifyContent: 'center', alignItems: 'center',
      background: `radial-gradient(ellipse at 50% 40%, ${B.limeD}40 0%, ${B.bg} 70%)`,
      overflow: 'hidden',
    }}>
      {/* Grid */}
      <AbsoluteFill style={{ opacity: 0.05 }}>
        {Array.from({ length: 16 }, (_, i) => (
          <div key={i} style={{ position: 'absolute', left: `${(i / 16) * 100}%`, top: 0, bottom: 0, width: 1, backgroundColor: B.lime }} />
        ))}
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} style={{ position: 'absolute', top: `${(i / 30) * 100}%`, left: 0, right: 0, height: 1, backgroundColor: B.lime }} />
        ))}
      </AbsoluteFill>

      {/* Floating dots */}
      {DOTS.map((d, i) => {
        const dp = sp(frame, fps, d.delay, 14, 160);
        return (
          <div key={i} style={{
            position: 'absolute', left: `${d.x}%`, top: `${d.y}%`,
            width: d.size, height: d.size, borderRadius: '50%', backgroundColor: B.lime,
            opacity: interpolate(dp, [0, 0.5, 1], [0, 0.4, 0.15]),
            transform: `translate(-50%,-50%) translateY(${Math.sin(frame * d.speed) * 8}px)`,
          }} />
        );
      })}

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{
          fontSize: 11, letterSpacing: 3, textTransform: 'uppercase',
          color: B.lime, fontFamily: UI, marginBottom: 24,
          opacity: interpolate(label, [0, 0.5], [0, 1]),
          transform: `translateY(${lerp(label, 10, 0)}px)`,
          textShadow: `0 0 20px ${B.lime}60`,
        }}>
          ★ 100% Free to Promote
        </div>

        {/* Spinning logo + orbiting stars */}
        <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 24px' }}>
          {STARS.map((star, i) => {
            const rad = (star.angle * Math.PI) / 180;
            return (
              <div key={i} style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: `translate(-50%,-50%) translate(${star.r * Math.cos(rad)}px, ${star.r * Math.sin(rad)}px)`,
                fontSize: 14, color: B.lime,
                opacity: interpolate(logo, [0, 0.6], [0, 1]),
              }}>✦</div>
            );
          })}
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: `translate(-50%,-50%) rotate(${spin}deg)`,
            opacity: interpolate(logo, [0, 0.5], [0, 1]),
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: 20,
              background: `linear-gradient(135deg, ${B.lime}, ${B.limeD})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 8px 40px ${B.lime}50`,
              overflow: 'hidden',
              padding: 8,
            }}>
              <Img src={staticFile('subzii-logo.png')} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          </div>
        </div>

        <div style={{
          fontSize: 34, fontWeight: 800, color: B.white, fontFamily: UI,
          letterSpacing: -0.5, lineHeight: 1.15, marginBottom: 16,
          opacity: interpolate(title, [0, 0.4], [0, 1]),
          transform: `translateY(${lerp(title, 16, 0)}px)`,
        }}>
          Apply to Promote<br />
          <span style={{
            background: `linear-gradient(135deg, ${B.lime}, ${B.amber})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            on Subzii
          </span>
        </div>

        <div style={{
          display: 'inline-block', padding: '10px 24px',
          backgroundColor: B.up, borderRadius: 12, border: `1px solid ${B.border}`,
          marginBottom: 24,
          opacity: interpolate(link, [0, 0.5], [0, 1]),
          transform: `scale(${lerp(link, 0.9, 1)})`,
        }}>
          <span style={{ fontSize: 14, color: B.muted, fontFamily: MONO }}>subzii.com</span>
        </div>

        <div style={{
          opacity: interpolate(button, [0, 0.5], [0, 1]),
          transform: `scale(${lerp(button, 0.8, 1) * pulse})`,
        }}>
          <div style={{
            display: 'inline-block', padding: '16px 44px',
            background: `linear-gradient(135deg, ${B.lime}, ${B.limeD})`,
            borderRadius: 50, fontSize: 17, fontWeight: 700, color: '#000', fontFamily: UI,
            boxShadow: `0 8px 36px ${B.lime}50`,
          }}>
            Link in bio →
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
