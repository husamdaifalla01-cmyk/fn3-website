/**
 * SubziiDemo.tsx
 *
 * 30-40s product demo for Subzii — hybrid UGC hook + Apple-style app animation.
 *
 * Structure:
 *   0–4s   UGC hook (influencer clip)
 *   4–8s   Affiliate link card animates in
 *   8–16s  Payout timeline draws itself
 *   16–22s Live earnings tracker — number ticks up
 *   22–28s Influencer return
 *   28–35s CTA screen
 */
import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Sequence,
  Video,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from 'remotion';

// ── Tokens
const BRAND = {
  purple:     '#7C3AED',
  purpleLight:'#A78BFA',
  purpleDark: '#4C1D95',
  green:      '#10B981',
  greenLight: '#D1FAE5',
  amber:      '#F59E0B',
  bg:         '#0A0A0F',
  surface:    '#13131A',
  surfaceUp:  '#1E1E2A',
  border:     'rgba(255,255,255,0.08)',
  text:       '#FFFFFF',
  textMuted:  'rgba(255,255,255,0.5)',
};

const FONT = `system-ui, -apple-system, 'SF Pro Display', sans-serif`;

// ── Spring helper
function useSpring(frame: number, fps: number, delay = 0, config = { damping: 18, mass: 0.6, stiffness: 220 }) {
  return spring({ frame: frame - delay, fps, config });
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT COMPOSITION
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  hookClip?: string;   // VEO3 clip filename in public/
  returnClip?: string; // VEO3 clip filename in public/
}

export const SubziiDemo: React.FC<Props> = ({ hookClip, returnClip }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const FPS = fps;
  const S = (s: number) => Math.round(s * FPS);

  // Segment start frames
  const SEG = {
    hook:     0,
    linkCard: S(4),
    payout:   S(8),
    live:     S(16),
    return:   S(22),
    cta:      S(28),
  };

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.bg, fontFamily: FONT }}>

      {/* ── UGC Hook (0–4s) */}
      <Sequence from={SEG.hook} durationInFrames={S(4)}>
        {hookClip
          ? <UGCClip file={hookClip} text="I promoted an event last month.\nSold 87 tickets.\nStill haven't seen a dollar." />
          : <PlaceholderHook />}
      </Sequence>

      {/* ── Affiliate Link Card (4–8s) */}
      <Sequence from={SEG.linkCard} durationInFrames={S(4)}>
        <AffiliateLinkScene localFrame={frame - SEG.linkCard} fps={FPS} />
      </Sequence>

      {/* ── Payout Timeline (8–16s) */}
      <Sequence from={SEG.payout} durationInFrames={S(8)}>
        <PayoutTimelineScene localFrame={frame - SEG.payout} fps={FPS} />
      </Sequence>

      {/* ── Live Earnings (16–22s) */}
      <Sequence from={SEG.live} durationInFrames={S(6)}>
        <LiveEarningsScene localFrame={frame - SEG.live} fps={FPS} />
      </Sequence>

      {/* ── UGC Return (22–28s) */}
      <Sequence from={SEG.return} durationInFrames={S(6)}>
        {returnClip
          ? <UGCClip file={returnClip} text="This is what promoting\nshould have always looked like." />
          : <PlaceholderReturn />}
      </Sequence>

      {/* ── CTA (28–35s) */}
      <Sequence from={SEG.cta} durationInFrames={S(7)}>
        <CTAScene localFrame={frame - SEG.cta} fps={FPS} />
      </Sequence>

    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// UGC CLIP WRAPPER
// ─────────────────────────────────────────────────────────────────────────────

const UGCClip: React.FC<{ file: string; text: string }> = ({ file, text }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Video
        src={staticFile(file)}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        muted={false}
      />
      {/* Gradient scrim for text legibility */}
      <AbsoluteFill style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)',
      }} />
      <AbsoluteFill style={{ justifyContent: 'flex-end', padding: 52, paddingBottom: 160 }}>
        <p style={{
          color: '#fff',
          fontSize: 48,
          fontWeight: 800,
          lineHeight: 1.2,
          textShadow: '0 2px 20px rgba(0,0,0,0.9)',
          margin: 0,
          whiteSpace: 'pre-line',
          opacity: interpolate(frame, [0, 6], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          {text}
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// AFFILIATE LINK CARD SCENE
// ─────────────────────────────────────────────────────────────────────────────

const AffiliateLinkScene: React.FC<{ localFrame: number; fps: number }> = ({ localFrame, fps }) => {
  const bg = useSpring(localFrame, fps, 0);
  const card = useSpring(localFrame, fps, 6);
  const stats = useSpring(localFrame, fps, 18);
  const tier = useSpring(localFrame, fps, 28);

  const cardY = interpolate(card, [0, 1], [60, 0]);
  const statsO = interpolate(stats, [0, 1], [0, 1]);
  const tierO = interpolate(tier, [0, 1], [0, 1]);

  // Animate numbers counting up
  const clicks = Math.round(interpolate(stats, [0, 1], [0, 234]));
  const sales = Math.round(interpolate(stats, [0, 1], [0, 87]));
  const earned = interpolate(stats, [0, 1], [0, 1218.5]);
  const tierProgress = interpolate(tier, [0, 1], [0, 87 / 100]);

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.bg, justifyContent: 'center', alignItems: 'center' }}>

      {/* Phone frame */}
      <PhoneFrame>

        {/* Header */}
        <div style={{ padding: '24px 20px 12px', opacity: interpolate(bg, [0, 1], [0, 1]) }}>
          <div style={{ fontSize: 11, color: BRAND.textMuted, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>
            My Links
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: BRAND.text }}>
            Affiliate Performance
          </div>
        </div>

        {/* Card */}
        <div style={{
          margin: '0 16px',
          backgroundColor: BRAND.surfaceUp,
          borderRadius: 16,
          border: `1px solid ${BRAND.border}`,
          overflow: 'hidden',
          transform: `translateY(${cardY}px)`,
          opacity: interpolate(card, [0, 0.2], [0, 1]),
        }}>
          {/* Event header */}
          <div style={{
            padding: '14px 16px',
            background: `linear-gradient(135deg, ${BRAND.purpleDark}, ${BRAND.surface})`,
            borderBottom: `1px solid ${BRAND.border}`,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: `linear-gradient(135deg, ${BRAND.purple}, ${BRAND.purpleLight})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16,
            }}>🎵</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: BRAND.text }}>Night Fever — Mar 15</div>
              <div style={{ fontSize: 11, color: BRAND.textMuted, marginTop: 2 }}>Code: NF2025 · Approved ✓</div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'flex',
            borderBottom: `1px solid ${BRAND.border}`,
            opacity: statsO,
          }}>
            {[
              { label: 'Clicks', value: clicks.toLocaleString(), icon: '👆' },
              { label: 'Sales', value: sales.toLocaleString(), icon: '🎟' },
              { label: 'Earned', value: `$${earned.toFixed(0)}`, icon: '💰', highlight: true },
            ].map((stat, i) => (
              <div key={i} style={{
                flex: 1,
                padding: '12px 8px',
                textAlign: 'center',
                borderRight: i < 2 ? `1px solid ${BRAND.border}` : 'none',
              }}>
                <div style={{ fontSize: 18 }}>{stat.icon}</div>
                <div style={{
                  fontSize: 16, fontWeight: 700, marginTop: 4,
                  color: stat.highlight ? BRAND.green : BRAND.text,
                }}>{stat.value}</div>
                <div style={{ fontSize: 10, color: BRAND.textMuted, marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tier progress */}
          <div style={{ padding: '12px 16px', opacity: tierO }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: BRAND.textMuted }}>Tier: Gold (15% commission)</span>
              <span style={{ fontSize: 11, color: BRAND.amber, fontWeight: 600 }}>87 / 100 sales</span>
            </div>
            <div style={{ height: 6, backgroundColor: BRAND.surface, borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 3,
                width: `${tierProgress * 100}%`,
                background: `linear-gradient(90deg, ${BRAND.amber}, ${BRAND.green})`,
              }} />
            </div>
            <div style={{ fontSize: 10, color: BRAND.textMuted, marginTop: 4 }}>
              13 more sales → Platinum (20%)
            </div>
          </div>
        </div>

        {/* Headline text below card */}
        <div style={{
          padding: '20px 20px 0',
          opacity: statsO,
        }}>
          <p style={{ fontSize: 15, color: BRAND.textMuted, margin: 0, lineHeight: 1.5 }}>
            See every click, every sale, every dollar — in real time.
          </p>
        </div>

      </PhoneFrame>

    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PAYOUT TIMELINE SCENE
// ─────────────────────────────────────────────────────────────────────────────

const PayoutTimelineScene: React.FC<{ localFrame: number; fps: number }> = ({ localFrame, fps }) => {
  const FPS = fps;
  const S = (s: number) => Math.round(s * FPS);

  // Each stage animates in sequence
  const header  = useSpring(localFrame, fps, 0);
  const node1   = useSpring(localFrame, fps, 8);
  const line1   = useSpring(localFrame, fps, 14);
  const node2   = useSpring(localFrame, fps, 20);
  const line2   = useSpring(localFrame, fps, 26);
  const node3   = useSpring(localFrame, fps, 32);
  const node4   = useSpring(localFrame, fps, 40);
  const amount  = useSpring(localFrame, fps, 48);

  const stages = [
    { icon: '🎟', label: 'Event night', date: 'Mar 15', sub: 'Night Fever', prog: node1, color: BRAND.purple },
    { icon: '⏰', label: 'Payout eligible', date: 'Mar 17', sub: '48h after event', prog: node2, color: BRAND.amber },
    { icon: '⚡', label: 'Transfer initiated', date: 'Mar 17', sub: 'Automatic', prog: node3, color: BRAND.purpleLight },
    { icon: '🏦', label: 'In your bank', date: 'Mar 20', sub: 'No action needed', prog: node4, color: BRAND.green },
  ];

  const lineProgs = [line1, line2, useSpring(localFrame, fps, 34)];

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.bg, justifyContent: 'center', alignItems: 'center' }}>
      <PhoneFrame>

        <div style={{ padding: '24px 20px 0', opacity: interpolate(header, [0, 1], [0, 1]) }}>
          <div style={{ fontSize: 11, color: BRAND.textMuted, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>
            Payout Schedule
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: BRAND.text }}>
            Your money. On time. Guaranteed.
          </div>
          <div style={{ fontSize: 13, color: BRAND.textMuted, marginTop: 6 }}>
            Every payout is automatic — no organizer approval needed.
          </div>
        </div>

        {/* Timeline */}
        <div style={{ padding: '24px 24px 0', position: 'relative' }}>
          {stages.map((stage, i) => (
            <React.Fragment key={i}>
              {/* Node */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 16,
                opacity: interpolate(stage.prog, [0, 0.3], [0, 1]),
                transform: `translateX(${interpolate(stage.prog, [0, 1], [-20, 0])}px)`,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 22,
                  backgroundColor: BRAND.surfaceUp,
                  border: `2px solid ${stage.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, flexShrink: 0,
                  boxShadow: `0 0 16px ${stage.color}40`,
                }}>
                  {stage.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.text }}>{stage.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: stage.color }}>{stage.date}</span>
                  </div>
                  <div style={{ fontSize: 11, color: BRAND.textMuted, marginTop: 2 }}>{stage.sub}</div>
                </div>
              </div>

              {/* Connecting line */}
              {i < 3 && (
                <div style={{
                  marginLeft: 21, width: 2, backgroundColor: BRAND.border,
                  height: 24, position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    height: `${interpolate(lineProgs[i] ?? 0, [0, 1], [0, 100])}%`,
                    background: `linear-gradient(to bottom, ${stages[i].color}, ${stages[i + 1].color})`,
                  }} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Payout amount */}
        <div style={{
          margin: '20px 16px 0',
          padding: '16px',
          backgroundColor: BRAND.surfaceUp,
          borderRadius: 12,
          border: `1px solid ${BRAND.green}40`,
          opacity: interpolate(amount, [0, 1], [0, 1]),
          transform: `scale(${interpolate(amount, [0, 1], [0.95, 1])})`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, color: BRAND.textMuted }}>Night Fever — payout</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: BRAND.green, marginTop: 2 }}>
                ${interpolate(amount, [0, 1], [0, 1218.5]).toFixed(2)}
              </div>
            </div>
            <div style={{
              padding: '6px 12px',
              backgroundColor: `${BRAND.green}20`,
              borderRadius: 20,
              border: `1px solid ${BRAND.green}40`,
              fontSize: 11,
              color: BRAND.green,
              fontWeight: 600,
            }}>
              Automatic ✓
            </div>
          </div>
        </div>

      </PhoneFrame>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// LIVE EARNINGS SCENE
// ─────────────────────────────────────────────────────────────────────────────

const LiveEarningsScene: React.FC<{ localFrame: number; fps: number }> = ({ localFrame, fps }) => {
  const FPS = fps;

  const card    = useSpring(localFrame, fps, 0);
  const number  = useSpring(localFrame, fps, 10);
  const stats   = useSpring(localFrame, fps, 20);
  const text    = useSpring(localFrame, fps, 30);

  // Simulate live earnings ticking up — a new sale comes in at frame 80
  const baseAmount = 1218.5;
  const saleAt = 80;
  const salePulse = spring({ frame: localFrame - saleAt, fps, config: { damping: 12, mass: 0.5, stiffness: 300 } });
  const newSale = localFrame >= saleAt ? interpolate(salePulse, [0, 1], [0, 63.5]) : 0;
  const totalAmount = baseAmount + newSale;

  // Pulse effect on new sale
  const pulseBg = localFrame >= saleAt
    ? interpolate(salePulse, [0, 0.3, 1], [0, 0.15, 0], { extrapolateRight: 'clamp' })
    : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.bg, justifyContent: 'center', alignItems: 'center' }}>
      <PhoneFrame>
        <div style={{ padding: '24px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, color: BRAND.textMuted, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                Live Earnings
              </div>
              <div style={{ fontSize: 13, color: BRAND.textMuted, marginTop: 2 }}>Updated now</div>
            </div>
            {/* Live badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '4px 10px',
              backgroundColor: `${BRAND.green}15`,
              borderRadius: 20,
              border: `1px solid ${BRAND.green}40`,
              opacity: interpolate(card, [0, 1], [0, 1]),
            }}>
              {/* Pulsing dot */}
              <div style={{
                width: 7, height: 7, borderRadius: '50%',
                backgroundColor: BRAND.green,
                boxShadow: `0 0 ${interpolate(Math.sin(localFrame / 8), [-1, 1], [4, 10])}px ${BRAND.green}`,
              }} />
              <span style={{ fontSize: 11, color: BRAND.green, fontWeight: 600 }}>LIVE</span>
            </div>
          </div>

          {/* Main number */}
          <div style={{
            marginTop: 24,
            padding: '20px',
            backgroundColor: `${BRAND.green}${Math.round(pulseBg * 255).toString(16).padStart(2, '0')}`,
            borderRadius: 16,
            border: `1px solid ${BRAND.green}${localFrame >= saleAt ? '60' : '20'}`,
            textAlign: 'center',
            opacity: interpolate(number, [0, 1], [0, 1]),
            transform: `scale(${interpolate(number, [0, 1], [0.9, 1])})`,
            transition: 'background-color 0.3s',
          }}>
            <div style={{ fontSize: 11, color: BRAND.textMuted, marginBottom: 6 }}>TOTAL EARNED</div>
            <div style={{
              fontSize: 48, fontWeight: 800,
              color: BRAND.green,
              letterSpacing: -1,
              fontVariantNumeric: 'tabular-nums',
            }}>
              ${totalAmount.toFixed(2)}
            </div>
            {localFrame >= saleAt && (
              <div style={{
                fontSize: 12, color: BRAND.green,
                marginTop: 6,
                opacity: interpolate(salePulse, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
              }}>
                +$63.50 new sale ↑
              </div>
            )}
          </div>

          {/* Sub-stats */}
          <div style={{
            display: 'flex', gap: 8, marginTop: 12,
            opacity: interpolate(stats, [0, 1], [0, 1]),
          }}>
            {[
              { label: 'Pending',  value: '$340.00', color: BRAND.amber },
              { label: 'Today',    value: '$127.50', color: BRAND.purpleLight },
              { label: 'Sales',    value: '87',      color: BRAND.text },
            ].map((s, i) => (
              <div key={i} style={{
                flex: 1, textAlign: 'center', padding: '10px 4px',
                backgroundColor: BRAND.surfaceUp,
                borderRadius: 10,
                border: `1px solid ${BRAND.border}`,
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 10, color: BRAND.textMuted, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Copy */}
          <div style={{
            padding: '16px 0 0',
            opacity: interpolate(text, [0, 1], [0, 1]),
          }}>
            <p style={{ fontSize: 16, fontWeight: 600, color: BRAND.text, margin: 0, lineHeight: 1.4 }}>
              No middleman.{'\n'}No chasing.{'\n'}No asking.
            </p>
          </div>
        </div>
      </PhoneFrame>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CTA SCENE
// ─────────────────────────────────────────────────────────────────────────────

const CTAScene: React.FC<{ localFrame: number; fps: number }> = ({ localFrame, fps }) => {
  const logo   = useSpring(localFrame, fps, 0);
  const line1  = useSpring(localFrame, fps, 12);
  const line2  = useSpring(localFrame, fps, 24);
  const button = useSpring(localFrame, fps, 36);
  const sub    = useSpring(localFrame, fps, 48);

  return (
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at 50% 40%, ${BRAND.purpleDark} 0%, ${BRAND.bg} 70%)`,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{ textAlign: 'center', padding: '0 48px' }}>

        {/* Logo */}
        <div style={{
          opacity: interpolate(logo, [0, 1], [0, 1]),
          transform: `scale(${interpolate(logo, [0, 1], [0.7, 1])})`,
          marginBottom: 32,
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '10px 20px',
            backgroundColor: `${BRAND.purple}30`,
            borderRadius: 40,
            border: `1px solid ${BRAND.purple}60`,
          }}>
            <div style={{ fontSize: 24 }}>🎟</div>
            <span style={{ fontSize: 22, fontWeight: 800, color: BRAND.text, letterSpacing: -0.5 }}>
              Subzii
            </span>
          </div>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 36, fontWeight: 800, color: BRAND.text,
          lineHeight: 1.15, letterSpacing: -0.5,
          opacity: interpolate(line1, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line1, [0, 1], [20, 0])}px)`,
          marginBottom: 12,
        }}>
          Promote events.
        </div>
        <div style={{
          fontSize: 36, fontWeight: 800, lineHeight: 1.15, letterSpacing: -0.5,
          background: `linear-gradient(135deg, ${BRAND.purpleLight}, ${BRAND.green})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          opacity: interpolate(line2, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(line2, [0, 1], [20, 0])}px)`,
          marginBottom: 40,
        }}>
          Get paid automatically.
        </div>

        {/* CTA button */}
        <div style={{
          opacity: interpolate(button, [0, 1], [0, 1]),
          transform: `scale(${interpolate(button, [0, 1], [0.8, 1])})`,
          marginBottom: 20,
        }}>
          <div style={{
            display: 'inline-block',
            padding: '16px 40px',
            background: `linear-gradient(135deg, ${BRAND.purple}, ${BRAND.purpleLight})`,
            borderRadius: 50,
            fontSize: 17,
            fontWeight: 700,
            color: BRAND.text,
            boxShadow: `0 8px 30px ${BRAND.purple}60`,
          }}>
            Apply to promote →
          </div>
        </div>

        <div style={{
          fontSize: 14, color: BRAND.textMuted,
          opacity: interpolate(sub, [0, 1], [0, 1]),
        }}>
          Link in bio
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PHONE FRAME WRAPPER
// ─────────────────────────────────────────────────────────────────────────────

const PhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = useSpring(frame, fps, 0);

  return (
    <div style={{
      width: 320,
      backgroundColor: BRAND.surface,
      borderRadius: 32,
      border: `1px solid ${BRAND.border}`,
      overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
      transform: `scale(${interpolate(entrance, [0, 1], [0.92, 1])}) translateY(${interpolate(entrance, [0, 1], [30, 0])}px)`,
      opacity: interpolate(entrance, [0, 0.3], [0, 1]),
    }}>
      {/* Status bar */}
      <div style={{
        height: 44, backgroundColor: BRAND.surface,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: BRAND.text }}>9:41</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: BRAND.text }}>●●●</span>
          <span style={{ fontSize: 12, color: BRAND.text }}>WiFi</span>
          <span style={{ fontSize: 12, color: BRAND.text }}>🔋</span>
        </div>
      </div>
      {children}
      {/* Home indicator */}
      <div style={{ height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 120, height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2 }} />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PLACEHOLDERS (shown when UGC clips aren't available yet)
// ─────────────────────────────────────────────────────────────────────────────

const PlaceholderHook: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #1a0a2e, #0f172a)',
      justifyContent: 'center', alignItems: 'center',
    }}>
      <div style={{ textAlign: 'center', padding: '0 60px' }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>😤</div>
        <p style={{
          fontSize: 40, fontWeight: 800, color: '#fff', lineHeight: 1.2, margin: 0,
          opacity: interpolate(frame, [0, 10], [0, 1]),
        }}>
          "I promoted an event last month. Sold 87 tickets. Still haven't seen a dollar."
        </p>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', marginTop: 16 }}>
          [Replace with real UGC clip]
        </p>
      </div>
    </AbsoluteFill>
  );
};

const PlaceholderReturn: React.FC = () => (
  <AbsoluteFill style={{
    background: 'linear-gradient(135deg, #1a0a2e, #0f172a)',
    justifyContent: 'center', alignItems: 'center',
  }}>
    <div style={{ textAlign: 'center', padding: '0 60px' }}>
      <p style={{ fontSize: 40, fontWeight: 800, color: '#fff', lineHeight: 1.2, margin: 0 }}>
        "This is what promoting should have always looked like."
      </p>
      <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', marginTop: 16 }}>
        [Replace with real UGC clip]
      </p>
    </div>
  </AbsoluteFill>
);
