/**
 * run-drive-credit-videos.ts
 * Generates 4 TikTok videos for DriveCredit — one per content pillar.
 *
 * Content pillars (from venture-context.md):
 *   1. Education  — "Your Car Equity Secret"       → hispanic_millennial
 *   2. Empathy    — "The Credit System is Broken"  → african_american_gen_z
 *   3. Proof      — "How It Actually Works"        → white_suburban
 *   4. Urgency    — "Limited to 36 States"         → generic_diverse
 *
 * Run: npx tsx scripts/run-drive-credit-videos.ts
 * Output: ./output/drive-credit/{video-slug}/
 */

import 'dotenv/config'
import * as fs from 'fs'
import * as path from 'path'
import {
  runVideoPipeline,
  writeRemotionInputProps,
  type VideoPipelineConfig,
} from '../src/utils/video-pipeline'
import { DRIVE_CREDIT_ANCHORS } from '../src/utils/visual-prompts'

// UTM-tagged Yendo URLs per video (mirrors TIKTOK_CAMPAIGN_URLS in offers.ts)
const YENDO_BASE = 'https://afflat3e3.com/trk/lnk/39C31C1E-2822-4350-B92A-2693C829ED6A/?o=27618&c=918277&a=769106&k=D083BC665DB0EC415E23BE307260F10E&l=36989'

function utmUrl(campaign: string): string {
  return `${YENDO_BASE}&utm_source=tiktok&utm_medium=video&utm_campaign=${encodeURIComponent(campaign)}`
}

// ─── VIDEO CONFIGS ─────────────────────────────────────────────────────────────

const VIDEOS: Array<{
  slug: string
  pillar: string
  title: string
  utmCampaign: string
  config: Omit<VideoPipelineConfig, 'outputDir'>
}> = [
  // ── Video 1: Education — "Your Car Equity Secret"
  {
    slug: 'car-equity-secret-v1',
    pillar: 'Education',
    title: 'Your Car Equity Secret',
    utmCampaign: 'car-equity-secret-v1',
    config: {
      brand: { product: 'DriveCredit car-secured credit card', demographic: 'hispanic_millennial', platform: 'tiktok' },
      mood:  { emotion: 'curiosity', energy: 'dynamic', palette: 'aspiration_warm' },
      anchor: DRIVE_CREDIT_ANCHORS.hispanic_millennial,
      critiqueEnabled: true,
      maxRegenAttempts: 3,
      consistencyCheckEnabled: true,
      referenceSceneId: 'hook',
      scenes: [
        {
          id: 'hook',
          sceneType: 'hook',
          subject: {
            primary: 'close-up of car keys on table next to wallet with empty credit slots, dollar sign hologram floating above keys',
            secondary: DRIVE_CREDIT_ANCHORS.hispanic_millennial.characterDescription,
            environment: 'kitchen counter, warm morning light, authentic home setting',
            action: 'picking up keys with realization expression, eyebrows raised',
          },
          mood:  { emotion: 'curiosity', energy: 'dynamic', palette: 'aspiration_warm' },
          brand: { product: 'DriveCredit car-secured credit card', demographic: 'hispanic_millennial', platform: 'tiktok' },
          consistencyAnchor: DRIVE_CREDIT_ANCHORS.hispanic_millennial,
        },
        {
          id: 'education-reveal',
          sceneType: 'solution',
          subject: {
            primary: 'infographic overlay showing car value converting to credit line: car icon → arrow → Visa card icon → $10,000',
            secondary: DRIVE_CREDIT_ANCHORS.hispanic_millennial.characterDescription,
            environment: 'modern apartment living room, soft warm lighting',
            action: 'excited expression pointing at phone screen, mouth slightly open in surprise',
          },
          mood:  { emotion: 'aspiration', energy: 'bold', palette: 'aspiration_warm' },
          brand: { product: 'DriveCredit car-secured credit card', demographic: 'hispanic_millennial', platform: 'tiktok' },
          consistencyAnchor: DRIVE_CREDIT_ANCHORS.hispanic_millennial,
        },
        {
          id: 'cta',
          sceneType: 'cta',
          subject: {
            primary: 'smartphone showing credit card approval screen, green checkmark, $7,500 credit limit, Visa logo',
            environment: 'clean white surface, soft diffused lighting, premium product feel',
          },
          mood:  { emotion: 'trust', energy: 'calm', palette: 'trust_cool' },
          brand: { product: 'DriveCredit car-secured credit card', demographic: 'hispanic_millennial', platform: 'tiktok' },
          consistencyAnchor: DRIVE_CREDIT_ANCHORS.hispanic_millennial,
        },
      ],
    },
  },

  // ── Video 2: Empathy — "The Credit System is Broken"
  {
    slug: 'credit-system-broken-v1',
    pillar: 'Empathy',
    title: 'The Credit System is Broken',
    utmCampaign: 'credit-system-broken-v1',
    config: {
      brand: { product: 'DriveCredit car-secured credit card', demographic: 'african_american_gen_z', platform: 'tiktok' },
      mood:  { emotion: 'urgency', energy: 'bold', palette: 'trust_cool' },
      anchor: DRIVE_CREDIT_ANCHORS.african_american_gen_z,
      critiqueEnabled: true,
      maxRegenAttempts: 3,
      consistencyCheckEnabled: true,
      referenceSceneId: 'hook',
      scenes: [
        {
          id: 'hook',
          sceneType: 'hook',
          subject: {
            primary: 'smartphone screen showing credit card denial notification in red, "Application Declined" text visible',
            secondary: DRIVE_CREDIT_ANCHORS.african_american_gen_z.characterDescription,
            environment: 'urban apartment, city lights background through window, evening light',
            action: 'frustrated expression looking at phone, hand on forehead',
          },
          mood:  { emotion: 'urgency', energy: 'bold', palette: 'trust_cool' },
          brand: { product: 'DriveCredit car-secured credit card', demographic: 'african_american_gen_z', platform: 'tiktok' },
          consistencyAnchor: DRIVE_CREDIT_ANCHORS.african_american_gen_z,
        },
        {
          id: 'problem-statement',
          sceneType: 'problem',
          subject: {
            primary: 'visual metaphor: wall with "NEED CREDIT TO GET CREDIT" graffiti text, broken cycle diagram',
            secondary: DRIVE_CREDIT_ANCHORS.african_american_gen_z.characterDescription,
            environment: 'urban street corner, gritty authentic feel, overcast light',
            action: 'arms crossed, knowing look at camera, slight head shake',
          },
          mood:  { emotion: 'urgency', energy: 'bold', palette: 'trust_cool' },
          brand: { product: 'DriveCredit car-secured credit card', demographic: 'african_american_gen_z', platform: 'tiktok' },
          consistencyAnchor: DRIVE_CREDIT_ANCHORS.african_american_gen_z,
        },
        {
          id: 'solution-reveal',
          sceneType: 'solution',
          subject: {
            primary: 'close-up of car key fob and a real Visa credit card side by side, text overlay "Your car = your credit"',
            secondary: DRIVE_CREDIT_ANCHORS.african_american_gen_z.characterDescription,
            environment: 'car interior, steering wheel visible, warm interior lighting',
            action: 'confident smile, holding both card and key, direct eye contact with camera',
          },
          mood:  { emotion: 'triumph', energy: 'bold', palette: 'aspiration_warm' },
          brand: { product: 'DriveCredit car-secured credit card', demographic: 'african_american_gen_z', platform: 'tiktok' },
          consistencyAnchor: DRIVE_CREDIT_ANCHORS.african_american_gen_z,
        },
        {
          id: 'cta',
          sceneType: 'cta',
          subject: {
            primary: 'clean smartphone showing approval screen, "Approved: $6,500 Visa Credit Card" in green, car icon badge',
            environment: 'minimal dark background, spotlight on phone, premium feel',
          },
          mood:  { emotion: 'trust', energy: 'calm', palette: 'trust_cool' },
          brand: { product: 'DriveCredit car-secured credit card', demographic: 'african_american_gen_z', platform: 'tiktok' },
          consistencyAnchor: DRIVE_CREDIT_ANCHORS.african_american_gen_z,
        },
      ],
    },
  },

  // ── Video 3: Proof — "Car as Collateral — How It Actually Works"
  {
    slug: 'how-it-works-proof-v1',
    pillar: 'Proof',
    title: 'Car as Collateral — How It Actually Works',
    utmCampaign: 'how-it-works-proof-v1',
    config: {
      brand: { product: 'DriveCredit car-secured credit card', demographic: 'white_suburban', platform: 'tiktok' },
      mood:  { emotion: 'trust', energy: 'calm', palette: 'trust_cool' },
      anchor: DRIVE_CREDIT_ANCHORS.white_suburban,
      critiqueEnabled: true,
      maxRegenAttempts: 3,
      consistencyCheckEnabled: true,
      referenceSceneId: 'hook',
      scenes: [
        {
          id: 'hook',
          sceneType: 'hook',
          subject: {
            primary: 'car parked in driveway with floating dollar amount overlay showing estimated equity value $18,500',
            secondary: DRIVE_CREDIT_ANCHORS.white_suburban.characterDescription,
            environment: 'suburban home driveway, daytime, clean neighborhood',
            action: 'standing next to car, gesturing toward it with curious/excited expression',
          },
          mood:  { emotion: 'curiosity', energy: 'dynamic', palette: 'trust_cool' },
          brand: { product: 'DriveCredit car-secured credit card', demographic: 'white_suburban', platform: 'tiktok' },
          consistencyAnchor: DRIVE_CREDIT_ANCHORS.white_suburban,
        },
        {
          id: 'walkthrough-step1',
          sceneType: 'problem',
          subject: {
            primary: 'step-by-step diagram: Step 1 "Enter your car year & condition" with car illustration',
            secondary: DRIVE_CREDIT_ANCHORS.white_suburban.characterDescription,
            environment: 'bright home office desk, laptop open, clean organized space',
            action: 'pointing at laptop screen showing the car calculator, explaining clearly',
          },
          mood:  { emotion: 'trust', energy: 'calm', palette: 'trust_cool' },
          brand: { product: 'DriveCredit car-secured credit card', demographic: 'white_suburban', platform: 'tiktok' },
          consistencyAnchor: DRIVE_CREDIT_ANCHORS.white_suburban,
        },
        {
          id: 'walkthrough-approved',
          sceneType: 'solution',
          subject: {
            primary: 'phone screen showing: "Your car qualifies! Estimated credit line: $500 – $9,800" with green checkmark and Visa logo',
            secondary: DRIVE_CREDIT_ANCHORS.white_suburban.characterDescription,
            environment: 'same home office, warm satisfied lighting',
            action: 'relieved and happy expression, showing phone to camera, thumbs up',
          },
          mood:  { emotion: 'relief', energy: 'calm', palette: 'aspiration_warm' },
          brand: { product: 'DriveCredit car-secured credit card', demographic: 'white_suburban', platform: 'tiktok' },
          consistencyAnchor: DRIVE_CREDIT_ANCHORS.white_suburban,
        },
        {
          id: 'cta',
          sceneType: 'cta',
          subject: {
            primary: 'phone showing DriveCredit car calculator interface, input fields visible, "Check My Car →" button prominent',
            environment: 'clean white background, soft shadows, minimal distraction',
          },
          mood:  { emotion: 'trust', energy: 'calm', palette: 'trust_cool' },
          brand: { product: 'DriveCredit car-secured credit card', demographic: 'white_suburban', platform: 'tiktok' },
          consistencyAnchor: DRIVE_CREDIT_ANCHORS.white_suburban,
        },
      ],
    },
  },

  // ── Video 4: Urgency — "Limited to 36 States"
  {
    slug: 'state-availability-v1',
    pillar: 'Urgency',
    title: 'Limited to 36 States',
    utmCampaign: 'state-availability-v1',
    config: {
      brand: { product: 'DriveCredit car-secured credit card', demographic: 'generic_diverse', platform: 'tiktok' },
      mood:  { emotion: 'urgency', energy: 'dynamic', palette: 'aspiration_warm' },
      anchor: DRIVE_CREDIT_ANCHORS.generic_diverse,
      critiqueEnabled: true,
      maxRegenAttempts: 3,
      consistencyCheckEnabled: false,  // No character consistency needed — map-focused video
      referenceSceneId: 'hook',
      scenes: [
        {
          id: 'hook',
          sceneType: 'hook',
          subject: {
            primary: 'stylized US map with 36 states highlighted in green, 14 states in gray, animated pulsing effect on available states',
            environment: 'dark background, map centered, clean minimalist design',
            action: 'map coming into frame with reveal animation energy',
          },
          mood:  { emotion: 'urgency', energy: 'bold', palette: 'aspiration_warm' },
          brand: { product: 'DriveCredit car-secured credit card', demographic: 'generic_diverse', platform: 'tiktok' },
          consistencyAnchor: DRIVE_CREDIT_ANCHORS.generic_diverse,
        },
        {
          id: 'state-check',
          sceneType: 'problem',
          subject: {
            primary: 'phone screen showing state selector with user selecting their state, green checkmark appearing: "✓ Texas — You qualify!"',
            secondary: DRIVE_CREDIT_ANCHORS.generic_diverse.characterDescription,
            environment: 'casual home environment, warm ambient light',
            action: 'tapping phone screen with anticipation, then big smile at result',
          },
          mood:  { emotion: 'urgency', energy: 'dynamic', palette: 'aspiration_warm' },
          brand: { product: 'DriveCredit car-secured credit card', demographic: 'generic_diverse', platform: 'tiktok' },
          consistencyAnchor: DRIVE_CREDIT_ANCHORS.generic_diverse,
        },
        {
          id: 'cta',
          sceneType: 'cta',
          subject: {
            primary: 'phone screen showing "Check your state now →" button with map thumbnail, urgency badge "Available now in your state"',
            environment: 'clean minimal background, phone centered, bright accent lighting',
          },
          mood:  { emotion: 'urgency', energy: 'bold', palette: 'aspiration_warm' },
          brand: { product: 'DriveCredit car-secured credit card', demographic: 'generic_diverse', platform: 'tiktok' },
          consistencyAnchor: DRIVE_CREDIT_ANCHORS.generic_diverse,
        },
      ],
    },
  },
]

// ─── RUNNER ────────────────────────────────────────────────────────────────────

async function main() {
  const baseOutputDir = path.resolve(__dirname, '../output/drive-credit')
  fs.mkdirSync(baseOutputDir, { recursive: true })

  console.log('\n╔══════════════════════════════════════════════════════════════╗')
  console.log('║         DRIVE-CREDIT TIKTOK VIDEO PIPELINE                  ║')
  console.log('║         4 Videos × 4 Content Pillars                        ║')
  console.log('╚══════════════════════════════════════════════════════════════╝\n')

  const results: Array<{ slug: string; success: boolean; outputDir: string; utmUrl: string }> = []

  for (const video of VIDEOS) {
    console.log(`\n${'═'.repeat(64)}`)
    console.log(`  [${video.pillar.toUpperCase()}] ${video.title}`)
    console.log(`  Slug: ${video.slug}`)
    console.log(`  UTM:  ${utmUrl(video.utmCampaign)}`)
    console.log(`${'═'.repeat(64)}\n`)

    const outputDir = path.join(baseOutputDir, video.slug)
    fs.mkdirSync(outputDir, { recursive: true })

    // Write the UTM-tracked affiliate URL for this video alongside its assets
    fs.writeFileSync(
      path.join(outputDir, 'affiliate-url.txt'),
      `UTM-tracked affiliate URL for ${video.title}\n\nPillar: ${video.pillar}\nCampaign: ${video.utmCampaign}\n\nURL:\n${utmUrl(video.utmCampaign)}\n\nUse this URL as the "link in bio" destination when this video is live.\n`,
    )

    try {
      const result = await runVideoPipeline({ ...video.config, outputDir })

      // Write Remotion inputProps
      writeRemotionInputProps(
        result.remotionConfig,
        path.join(outputDir, 'remotion-input-props.json'),
      )

      // Write pipeline summary JSON
      fs.writeFileSync(
        path.join(outputDir, 'pipeline-result.json'),
        JSON.stringify({ slug: video.slug, pillar: video.pillar, utmUrl: utmUrl(video.utmCampaign), ...result }, null, 2),
      )

      results.push({ slug: video.slug, success: result.success, outputDir, utmUrl: utmUrl(video.utmCampaign) })

      console.log(`\n  ✓ ${video.slug} — ${result.summary.generated} scenes generated`)

    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`\n  ✗ ${video.slug} FAILED: ${msg}`)
      results.push({ slug: video.slug, success: false, outputDir, utmUrl: utmUrl(video.utmCampaign) })
    }
  }

  // ── Final summary
  console.log('\n\n╔══════════════════════════════════════════════════════════════╗')
  console.log('║                    BATCH COMPLETE                           ║')
  console.log('╚══════════════════════════════════════════════════════════════╝\n')

  for (const r of results) {
    const icon = r.success ? '✓' : '✗'
    console.log(`  ${icon} ${r.slug}`)
    console.log(`    Output: ${r.outputDir}`)
    console.log(`    UTM:    ${r.utmUrl}\n`)
  }

  const successCount = results.filter(r => r.success).length
  console.log(`  ${successCount}/${results.length} videos generated successfully`)
  console.log('\n  Next steps:')
  console.log('  1. Run Remotion renderer against each remotion-input-props.json')
  console.log('  2. Upload videos to TikTok')
  console.log('  3. Set "link in bio" to the URL in affiliate-url.txt for each video')
  console.log('  4. Monitor Plausible dashboard for utm_campaign attribution\n')
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
