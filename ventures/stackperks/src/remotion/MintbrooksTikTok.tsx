import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
} from 'remotion';

// ─── Brand Colors ────────────────────────────────────────────────────────────
const COLORS = {
  bgDark: '#0f1a14',
  bgCard: '#132a1f',
  accent: '#34d399',      // emerald
  accentDim: '#065f46',
  textWhite: '#f0fdf4',
  textMuted: 'rgba(240,253,244,0.55)',
  amber: '#fbbf24',
  disclosure: 'rgba(240,253,244,0.25)',
};

// ─── Props ───────────────────────────────────────────────────────────────────
export interface MintbrooksTikTokProps {
  hookText: string;
  bodyPoints: string[];
  ctaText: string;
}

// ─── Hook Slide (frames 0–89 = 0–3s) ────────────────────────────────────────
const HookSlide: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12, stiffness: 120 } });
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  // Pulsing glow effect
  const glowOpacity = interpolate(
    frame,
    [30, 50, 70, 89],
    [0.3, 0.6, 0.3, 0.6],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${COLORS.bgCard} 0%, ${COLORS.bgDark} 70%)`,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: COLORS.accent,
          opacity: glowOpacity * 0.15,
          filter: 'blur(120px)',
        }}
      />

      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 900,
            color: COLORS.textWhite,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            whiteSpace: 'pre-line',
            textShadow: `0 0 60px ${COLORS.accent}33`,
          }}
        >
          {text}
        </div>
      </div>

      {/* Mintbrooks watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: 140,
          fontSize: 22,
          fontWeight: 700,
          color: COLORS.textMuted,
          letterSpacing: '0.08em',
        }}
      >
        MINT<span style={{ color: COLORS.amber }}>BROOKS</span>
      </div>
    </AbsoluteFill>
  );
};

// ─── Body Slide (frames 90–329 = 3–11s) ─────────────────────────────────────
const BodySlide: React.FC<{ points: string[] }> = ({ points }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      <div style={{ width: '100%', maxWidth: 900 }}>
        {points.map((point, i) => {
          const delay = i * 20;
          const pointOpacity = interpolate(
            frame,
            [delay, delay + 15],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
          const slideX = interpolate(
            frame,
            [delay, delay + 15],
            [60, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          return (
            <div
              key={i}
              style={{
                opacity: pointOpacity,
                transform: `translateX(${slideX}px)`,
                marginBottom: 40,
                display: 'flex',
                alignItems: 'center',
                gap: 24,
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: COLORS.accent,
                  flexShrink: 0,
                  boxShadow: `0 0 20px ${COLORS.accent}66`,
                }}
              />
              <span
                style={{
                  fontSize: 52,
                  fontWeight: 700,
                  color: COLORS.textWhite,
                  lineHeight: 1.3,
                }}
              >
                {point}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── CTA Slide (frames 330–449 = 11–15s) ────────────────────────────────────
const CTASlide: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 100, mass: 0.8 },
  });

  // Pulsing CTA button
  const pulse = interpolate(
    frame,
    [0, 30, 60, 90, 119],
    [1, 1.05, 1, 1.05, 1],
    { extrapolateRight: 'clamp' }
  );

  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.bgDark} 0%, ${COLORS.accentDim} 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            marginBottom: 60,
            color: COLORS.textWhite,
            letterSpacing: '0.05em',
          }}
        >
          MINT<span style={{ color: COLORS.amber }}>BROOKS</span>
        </div>

        {/* CTA button */}
        <div
          style={{
            transform: `scale(${pulse})`,
            background: COLORS.accent,
            color: COLORS.bgDark,
            fontSize: 42,
            fontWeight: 800,
            padding: '36px 64px',
            borderRadius: 24,
            boxShadow: `0 0 40px ${COLORS.accent}55`,
          }}
        >
          {text}
        </div>

        {/* FTC Disclosure */}
        <div
          style={{
            position: 'absolute',
            bottom: 120,
            left: 60,
            right: 60,
            textAlign: 'center',
            fontSize: 20,
            color: COLORS.disclosure,
            lineHeight: 1.5,
          }}
        >
          #ad · Affiliate link · Mintbrooks may earn a commission · Not a lender · Approval not guaranteed
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Main Composition ────────────────────────────────────────────────────────
export const MintbrooksTikTok: React.FC<MintbrooksTikTokProps> = ({
  hookText,
  bodyPoints,
  ctaText,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgDark }}>
      {/* Hook: 0–3s (frames 0–89) */}
      <Sequence from={0} durationInFrames={90}>
        <HookSlide text={hookText} />
      </Sequence>

      {/* Body: 3–11s (frames 90–329) */}
      <Sequence from={90} durationInFrames={240}>
        <BodySlide points={bodyPoints} />
      </Sequence>

      {/* CTA: 11–15s (frames 330–449) */}
      <Sequence from={330} durationInFrames={120}>
        <CTASlide text={ctaText} />
      </Sequence>

      {/* Persistent FTC disclosure bar at bottom (always visible) */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 18,
          color: COLORS.disclosure,
          padding: '0 40px',
        }}
      >
        Paid partnership · Mintbrooks is not a lender
      </div>
    </AbsoluteFill>
  );
};
