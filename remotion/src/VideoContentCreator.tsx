/**
 * VideoContentCreator.tsx
 * Stitches VEO3-animated clips with smash cuts, Ken Burns overlay, zoom punch, text-on-frame-0.
 * Works with both <Video> clips (VEO3 output) and <Img> stills as fallback.
 */
import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  Video,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from 'remotion';

type Transition = 'smash' | 'slideleft' | 'fadew';

export interface ClipMeta {
  id: string;
  file: string;              // .mp4 (VEO3 clip) or .png (still fallback)
  durationSeconds: number;
  transition?: Transition;
  punchAtSecond?: number;    // when within this clip to fire zoom punch
  hookText?: string;         // text on frame 0, no entrance
}

interface Props {
  clips: ClipMeta[];
}

export const VideoContentCreator: React.FC<Props> = ({ clips }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  let offset = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {clips.map((clip, i) => {
        const durationFrames = Math.round(clip.durationSeconds * fps);
        const from = offset;
        offset += durationFrames;

        const punchFrame = clip.punchAtSecond != null
          ? Math.round(clip.punchAtSecond * fps)
          : null;

        return (
          <Sequence key={clip.id} from={from} durationInFrames={durationFrames}>
            <SceneCard
              file={clip.file}
              localFrame={frame - from}
              durationFrames={durationFrames}
              fps={fps}
              punchFrame={punchFrame}
              hookText={clip.hookText}
              transition={clip.transition ?? 'smash'}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

interface SceneCardProps {
  file: string;
  localFrame: number;
  durationFrames: number;
  fps: number;
  punchFrame: number | null;
  hookText?: string | null;
  transition: Transition;
}

const SceneCard: React.FC<SceneCardProps> = ({
  file,
  localFrame,
  durationFrames,
  fps,
  punchFrame,
  hookText,
  transition,
}) => {
  const isVideo = file.endsWith('.mp4') || file.endsWith('.webm');

  // Ken Burns: 0.0003/frame — subliminal, prevents dead feeling on still fallbacks
  // On VEO3 clips this stacks on top of the native motion (barely perceptible)
  const kenBurns = 1 + localFrame * 0.0003;

  // Zoom punch spring: fires at the reveal moment
  const punchProgress = punchFrame != null
    ? spring({ frame: localFrame - punchFrame, fps, config: { damping: 8, stiffness: 500, mass: 0.2 } })
    : 0;
  const punch = interpolate(punchProgress, [0, 1], [0, 0.05]);

  // SlideLeft: 6-frame cubic-out entrance
  const slideX = transition === 'slideleft'
    ? interpolate(localFrame, [0, 6], [-1080, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
      })
    : 0;

  // FadeW: horizontal wipe via clip-path
  const wipeWidth = transition === 'fadew'
    ? interpolate(localFrame, [0, 4], [0, 1080], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 1080;
  const clipPath = transition === 'fadew' ? `inset(0 ${1080 - wipeWidth}px 0 0)` : 'none';

  const mediaStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  };

  return (
    <AbsoluteFill style={{ transform: `translateX(${slideX}px)`, clipPath, overflow: 'hidden' }}>

      {/* Media layer: VEO3 clip or still image, with Ken Burns + punch overlay */}
      <AbsoluteFill style={{ transform: `scale(${kenBurns + punch})`, transformOrigin: 'center center' }}>
        {isVideo
          ? <Video src={staticFile(file.split('/').pop()!)} style={mediaStyle} muted />
          : <Img src={staticFile(file.split('/').pop()!)} style={mediaStyle} />
        }
      </AbsoluteFill>

      {/* Text: on frame 0, no entrance delay. Bottom-anchored. */}
      {hookText && (
        <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'flex-start', padding: 48, paddingBottom: 180 }}>
          <p style={{
            color: '#fff',
            fontSize: 52,
            fontWeight: 900,
            lineHeight: 1.2,
            textShadow: '0 2px 24px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.6)',
            margin: 0,
            maxWidth: '88%',
            whiteSpace: 'pre-line',
          }}>
            {hookText}
          </p>
        </AbsoluteFill>
      )}

    </AbsoluteFill>
  );
};
