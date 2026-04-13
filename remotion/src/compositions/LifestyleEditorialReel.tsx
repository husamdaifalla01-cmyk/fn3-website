/**
 * Mintbrooks Lifestyle — Editorial Ambient Reel
 *
 * Jake's brief: 6-second looping ambient video for the editorial dark section.
 * A living candle photograph. Slow Ken Burns zoom. Warm flicker overlay.
 * Renders at 1000×1500 (portrait, 2:3) to match the editorial section inset.
 *
 * Team decisions:
 *   - 180 frames @ 30fps = 6s loop
 *   - Ken Burns: gentle zoom 100% → 108% over 6 seconds (barely perceptible, cinematic)
 *   - Warm golden flicker: subtle opacity oscillation via interpolation
 *   - Vignette: radial gradient overlay, permanent
 *   - Color grade: warm sepia overlay at 15% opacity
 *   - No text, no UI chrome — pure mood
 *
 * Ingrid's mandate: "It should feel like the candle is actually burning."
 * Sofia's mandate: "Nothing competes with the pull quote. This lives behind it."
 */

import React from 'react'
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from 'remotion'

export const LifestyleEditorialReel: React.FC = () => {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()

  // Ken Burns: slow zoom from 100% to 108% — barely perceptible, cinematic
  const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.08])

  // Slow pan: drift slightly right (0px → 12px offset on X)
  const translateX = interpolate(frame, [0, durationInFrames], [0, -20])
  const translateY = interpolate(frame, [0, durationInFrames], [0, -8])

  // Warm flicker: oscillate a warm overlay opacity
  // Simulate candle flicker with a combination of slow and fast sine waves
  const flickerSlow = Math.sin(frame * 0.08) * 0.5 + 0.5   // 0–1, slow pulse
  const flickerFast = Math.sin(frame * 0.41) * 0.5 + 0.5   // 0–1, faster tremor
  const flicker = flickerSlow * 0.7 + flickerFast * 0.3     // weighted blend
  const flickerOpacity = interpolate(flicker, [0, 1], [0.04, 0.11])

  // Fade in/out for seamless loop
  const fadeOpacity = interpolate(
    frame,
    [0, 15, durationInFrames - 15, durationInFrames],
    [0, 1, 1, 0]
  )

  return (
    <AbsoluteFill style={{ background: '#0D1F18', overflow: 'hidden' }}>

      {/* Base image — Ken Burns zoom + pan */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          transformOrigin: 'center center',
        }}
      >
        <Img
          src={staticFile('lifestyle-editorial.jpg')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </AbsoluteFill>

      {/* Warm golden flicker overlay — Jake: simulates flame warmth */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at 45% 65%, rgba(255,180,50,1) 0%, rgba(220,120,20,0.6) 30%, transparent 70%)',
          opacity: flickerOpacity,
          mixBlendMode: 'screen',
        }}
      />

      {/* Warm sepia color grade — 12% warm tint */}
      <AbsoluteFill
        style={{
          background: 'rgba(180,110,30,0.10)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* Vignette — draws eye to center where candle lives */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(8,16,12,0.65) 100%)',
        }}
      />

      {/* Fade-in/out for seamless loop */}
      <AbsoluteFill
        style={{
          background: '#0D1F18',
          opacity: 1 - fadeOpacity,
        }}
      />

    </AbsoluteFill>
  )
}
