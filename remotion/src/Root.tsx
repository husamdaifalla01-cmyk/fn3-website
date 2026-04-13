import React from 'react';
import { Composition } from 'remotion';
import { LifestyleEditorialReel } from './compositions/LifestyleEditorialReel';
import { VideoContentCreator, type ClipMeta } from './VideoContentCreator';
import { SubziiDemo } from './SubziiDemo';
import { SubziiPromo } from './SubziiPromo';
import { SubziiApple } from './SubziiApple';
import manifest from '../../orchestrator/output/subzii-v1/remotion-manifest.json';

// Remap absolute paths → filenames (Remotion serves from public/)
const clips: ClipMeta[] = manifest.clips.map((c: any) => ({
  id: c.id,
  file: (c.file as string).split('/').pop() as string,
  durationSeconds: c.durationSeconds,
  transition: c.transition,
  punchAtSecond: c.punchAtSecond ?? undefined,
  hookText: c.hookText ?? undefined,
}));

const totalFrames = manifest.totalDurationSeconds * 30;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="VideoContentCreator"
      component={VideoContentCreator}
      durationInFrames={totalFrames}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ clips }}
    />
    <Composition
      id="SubziiDemo"
      component={SubziiDemo}
      durationInFrames={1050}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{}}
    />
    <Composition
      id="SubziiApple"
      component={SubziiApple}
      durationInFrames={585}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{}}
    />
    <Composition
      id="SubziiPromo"
      component={SubziiPromo}
      durationInFrames={1105}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{}}
    />
    {/* Mintbrooks Lifestyle — Editorial Ambient Reel */}
    {/* 6s loop, portrait 2:3, for editorial dark section */}
    <Composition
      id="LifestyleEditorialReel"
      component={LifestyleEditorialReel}
      durationInFrames={180}
      fps={30}
      width={1000}
      height={1500}
      defaultProps={{}}
    />
  </>
);
