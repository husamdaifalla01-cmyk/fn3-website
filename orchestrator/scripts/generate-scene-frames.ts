/**
 * generate-scene-frames.ts
 * Enriches existing pipeline-result.json files with multiple frames per scene.
 *
 * Each scene gets N image variants showing different moments within the same beat.
 * When combined with Ken Burns + smash cuts in the renderer, this creates the
 * illusion of actual video motion rather than a zoomed static image.
 *
 * Frame progression model per scene type:
 *   hook (3s, 4 frames)    : setup → anticipation → reaction → peak
 *   problem (5s, 4 frames) : observe → recognize → feel → confront
 *   solution (12s, 6 frames): reveal → process → understand → believe → embrace → resolve
 *   social_proof (8s, 5f)  : credibility → detail → proof → emotion → conviction
 *   cta (4s, 3 frames)     : desire → decide → act
 *
 * Writes frames as {sceneId}_f01.png, {sceneId}_f02.png, etc.
 * Updates pipeline-result.json with assets[sceneId].frames[] array.
 *
 * Run: npx tsx scripts/generate-scene-frames.ts
 * Cost: ~$0.02/image × avg 4 frames × 4–5 scenes × 4 videos ≈ $1.40 total
 */

import 'dotenv/config'
import * as fs from 'fs'
import * as path from 'path'
import { generateImage, type ImageModel } from '../src/utils/nanobanana'

// ─── CONFIG ────────────────────────────────────────────────────────────────

const BASE_DIR      = path.resolve(__dirname, '../output/drive-credit')
const MODEL: ImageModel = 'nano-banana-pro-preview'
const API_DELAY_MS  = 7000  // 7s between calls — stays under paid tier rate limit

// Frame counts per scene type
const FRAME_COUNTS: Record<string, number> = {
  hook:         4,
  problem:      4,
  solution:     6,
  social_proof: 5,
  cta:          3,
}

// Default if scene type can't be inferred
const DEFAULT_FRAME_COUNT = 4

// ─── FRAME MOMENT DESCRIPTORS ──────────────────────────────────────────────
// For each scene type, N moment descriptors modify the base prompt slightly.
// Each descriptor describes the emotional/physical progression within the beat.

const MOMENT_DESCRIPTORS: Record<string, string[]> = {
  hook: [
    'establishing moment, subject just noticing, eyebrows beginning to raise, natural resting expression transitioning to curiosity',
    'lean forward, eyebrows fully raised, eyes widening, lips parting slightly, first spark of recognition',
    'peak curiosity, mouth slightly open, slight head tilt, fully engaged, leaning toward camera',
    'peak reaction, eyes wide, expression of realization, authentic candid emotion, mouth open in surprise',
  ],
  problem: [
    'initial observation, neutral expression reading the situation, studying what is in front of them',
    'recognition moment, slight furrowing of brow, realizing the problem is real, starting to connect dots',
    'emotional weight, visible frustration or concern, feeling the impact of the problem personally',
    'direct confrontation, looking straight at camera, knowing expression, arms coming in, resolved stance',
  ],
  solution: [
    'first glimpse of solution, eyes beginning to light up, cautious but hopeful expression',
    'processing the information, reading carefully, slight nodding, starting to understand',
    'moment of realization, wider eyes, genuine smile beginning, leaning slightly back with surprise',
    'full understanding, confident smile, nodding, expression of "this makes sense now"',
    'excitement building, more animated gestures, sharing the discovery, infectious energy',
    'resolved and confident, direct eye contact, calm knowing smile, transformed from doubt to belief',
  ],
  social_proof: [
    'credibility anchor, composed professional expression, evidence clearly displayed',
    'pointing to specific detail, directing viewer attention, educational confident posture',
    'emotional response to the proof, genuine expression of "this is real", authentic reaction',
    'connecting proof to viewer, direct eye contact, "you can have this too" energy',
    'conviction and certainty, strong confident close, leaving no doubt in viewer\'s mind',
  ],
  cta: [
    'desire activation, phone or product clearly visible, inviting energy, slight forward lean',
    'decision moment, direct eye contact with camera, pointing or gesturing to action, clear invitation',
    'urgency without pressure, confident smile, "do this now" energy, clear and direct',
  ],
}

// ─── HELPERS ───────────────────────────────────────────────────────────────

function inferSceneType(sceneId: string): string {
  const id = sceneId.toLowerCase()
  if (id.includes('hook'))                               return 'hook'
  if (id.includes('problem') || id.includes('step') || id.includes('state-check'))
                                                         return 'problem'
  if (id.includes('solution') || id.includes('reveal') || id.includes('approved') ||
      id.includes('education') || id.includes('walkthrough'))
                                                         return 'solution'
  if (id.includes('proof') || id.includes('social'))    return 'social_proof'
  if (id.includes('cta'))                               return 'cta'
  return 'problem'
}

function getFrameCount(sceneType: string): number {
  return FRAME_COUNTS[sceneType] ?? DEFAULT_FRAME_COUNT
}

function getMomentDescriptors(sceneType: string, count: number): string[] {
  const descriptors = MOMENT_DESCRIPTORS[sceneType] ?? MOMENT_DESCRIPTORS.problem
  // If we need more descriptors than defined, repeat with slight variations
  const result: string[] = []
  for (let i = 0; i < count; i++) {
    result.push(descriptors[i % descriptors.length])
  }
  return result
}

function buildFramePrompt(basePrompt: string, momentDescriptor: string, frameIndex: number, totalFrames: number): string {
  // Append the moment descriptor to the base prompt
  // The base prompt already has quality, lighting, style instructions
  const momentNote = `This is frame ${frameIndex + 1} of ${totalFrames}. ${momentDescriptor}.`

  // Insert before the quality suffix (which starts with "cinematic quality" or "Avoid:")
  const insertPoint = basePrompt.indexOf('. Avoid:')
  if (insertPoint > -1) {
    return basePrompt.slice(0, insertPoint) + `, ${momentNote}` + basePrompt.slice(insertPoint)
  }
  return `${basePrompt} ${momentNote}`
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ─── PIPELINE RESULT TYPES ─────────────────────────────────────────────────

interface AssetRecord {
  sceneId: string
  filePath?: string
  frames?: string[]
  promptUsed?: string
  model?: string
  critiqueScore?: number
  critiquePass?: boolean
  regenCount?: number
}

interface PipelineResult {
  slug: string
  remotionConfig: {
    assetMap: Record<string, string>
    sceneOrder: string[]
    outputDir: string
  }
  assets?: Record<string, AssetRecord>
}

// ─── FRAME GENERATOR ───────────────────────────────────────────────────────

async function generateFramesForScene(
  sceneId: string,
  basePrompt: string,
  outputDir: string,
  existingFilePath?: string,
): Promise<string[]> {
  const sceneType   = inferSceneType(sceneId)
  const frameCount  = getFrameCount(sceneType)
  const descriptors = getMomentDescriptors(sceneType, frameCount)
  const frames: string[] = []

  // Frame 0: reuse the existing generated image (no API call needed)
  if (existingFilePath && fs.existsSync(existingFilePath)) {
    const f0Path = path.join(outputDir, `${sceneId}_f00.png`)
    if (!fs.existsSync(f0Path)) {
      fs.copyFileSync(existingFilePath, f0Path)
    }
    frames.push(f0Path)
    console.log(`    ✓ frame 1/${frameCount} — reused existing ${path.basename(existingFilePath)}`)
  }

  // Frames 1+: generate new variants
  const startFrame = frames.length
  for (let fi = startFrame; fi < frameCount; fi++) {
    const framePath = path.join(outputDir, `${sceneId}_f${String(fi).padStart(2, '0')}.png`)

    // Skip if already generated
    if (fs.existsSync(framePath)) {
      frames.push(framePath)
      console.log(`    ✓ frame ${fi + 1}/${frameCount} — already exists, skipping`)
      continue
    }

    const framePrompt = buildFramePrompt(basePrompt, descriptors[fi], fi, frameCount)

    console.log(`    → frame ${fi + 1}/${frameCount} [${descriptors[fi].slice(0, 60)}...]`)

    const result = await generateImage({
      prompt: framePrompt,
      outputPath: framePath,
      model: MODEL,
      aspectRatio: '9:16',
    })

    if (result.success && result.filePath) {
      frames.push(result.filePath)
      console.log(`    ✓ frame ${fi + 1}/${frameCount} → ${path.basename(framePath)}`)
    } else {
      console.error(`    ✗ frame ${fi + 1}/${frameCount} FAILED: ${result.error}`)
      // Still include the slot as missing — renderer handles gracefully
    }

    // Rate limit buffer
    if (fi < frameCount - 1) await sleep(API_DELAY_MS)
  }

  return frames
}

// ─── VIDEO ENRICHER ────────────────────────────────────────────────────────

async function enrichVideo(videoDir: string): Promise<void> {
  const slug       = path.basename(videoDir)
  const resultPath = path.join(videoDir, 'pipeline-result.json')

  if (!fs.existsSync(resultPath)) {
    console.log(`  ⚠️  No pipeline-result.json in ${slug} — skipping`)
    return
  }

  const result: PipelineResult = JSON.parse(fs.readFileSync(resultPath, 'utf8'))
  const { sceneOrder, assetMap } = result.remotionConfig

  if (!sceneOrder || sceneOrder.length === 0) {
    console.log(`  ⚠️  No scenes in ${slug} — skipping`)
    return
  }

  console.log(`\n  ━━━ ${slug} ━━━`)
  console.log(`  Scenes: ${sceneOrder.join(' → ')}`)

  // Initialize assets map if not present
  if (!result.assets) result.assets = {}

  for (const sceneId of sceneOrder) {
    const existing = result.assets[sceneId] ?? {}
    const filePath = existing.filePath ?? assetMap[sceneId]
    const prompt   = existing.promptUsed

    if (!prompt) {
      console.log(`\n  Scene: ${sceneId} — no prompt available, skipping multi-frame`)
      continue
    }

    // Skip if frames already fully generated
    const sceneType  = inferSceneType(sceneId)
    const frameCount = getFrameCount(sceneType)
    if (existing.frames && existing.frames.length >= frameCount) {
      const allExist = existing.frames.every(f => fs.existsSync(f))
      if (allExist) {
        console.log(`\n  Scene: ${sceneId} — ${frameCount} frames already generated, skipping`)
        continue
      }
    }

    console.log(`\n  Scene: ${sceneId} (${sceneType}) — generating ${frameCount} frames`)

    const frames = await generateFramesForScene(sceneId, prompt, videoDir, filePath)

    // Update asset record with frames array
    result.assets[sceneId] = {
      ...existing,
      filePath: filePath ?? existing.filePath,
      frames,
    }

    // Write result after each scene (crash-safe)
    fs.writeFileSync(resultPath, JSON.stringify(result, null, 2))
    console.log(`  ✓ ${sceneId} — ${frames.length} frames saved to pipeline-result.json`)
  }

  console.log(`\n  ✓ ${slug} enriched with multi-frame scenes`)
}

// ─── MAIN ──────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(BASE_DIR)) {
    console.error(`Output dir not found: ${BASE_DIR}`)
    process.exit(1)
  }

  const videoDirs = fs.readdirSync(BASE_DIR)
    .map(d => path.join(BASE_DIR, d))
    .filter(d => fs.statSync(d).isDirectory())

  console.log('\n╔══════════════════════════════════════════════════════════════╗')
  console.log('║       MULTI-FRAME SCENE GENERATOR — DriveCredit            ║')
  console.log('║       Adds N frames per scene for cinematic fluidity       ║')
  console.log(`║       ${videoDirs.length} video${videoDirs.length !== 1 ? 's' : ''} queued                                        ║`)
  console.log('╚══════════════════════════════════════════════════════════════╝')

  for (const dir of videoDirs) {
    try {
      await enrichVideo(dir)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`\n  ✗ FAILED: ${path.basename(dir)}: ${msg.slice(0, 300)}`)
    }
  }

  console.log('\n╔══════════════════════════════════════════════════════════════╗')
  console.log('║                    GENERATION COMPLETE                     ║')
  console.log('╚══════════════════════════════════════════════════════════════╝')
  console.log('\n  Now run the renderer:')
  console.log('  npx tsx scripts/render-videos-ffmpeg.ts')
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
