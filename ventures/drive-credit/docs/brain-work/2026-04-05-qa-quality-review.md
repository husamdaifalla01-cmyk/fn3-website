# Mintbrooks — QA Quality Review (Cycle 2026-04-05)
**Author:** QA Director (Peep Laja lens)

## Review: All Outputs This Cycle

### 1. Content Scripts (Batches 1-3)
| Criterion | Pass/Fail | Notes |
|-----------|-----------|-------|
| Hook in first 3 seconds | ✅ PASS | All scripts front-load the hook |
| CTA present | ✅ PASS | "Link in bio" in every script |
| FTC disclosure | ✅ PASS | Templates provided |
| Brand voice consistent | ✅ PASS | Empowering, plain-speaking |
| No "guaranteed approval" | ✅ PASS | Verified |
| Duration 30-60s | ✅ PASS | All within range |
| "No credit check" language | ⚠️ FLAG | Legal flagged — change to "soft pull only" |

### 2. Remotion Videos (4 rendered)
| Criterion | Pass/Fail | Notes |
|-----------|-----------|-------|
| Dimensions correct (1080x1920) | ✅ PASS | Verified |
| Duration appropriate | ✅ PASS | 15s each |
| Brand colors used | ✅ PASS | Dark/amber/emerald |
| Text readable on mobile | NEEDS VERIFY | Must test on actual phone |
| Audio/music | ❌ NO AUDIO | Remotion videos are silent — need trending audio overlay before posting |

### 3. Instagram Posts (3 existing)
| Criterion | Pass/Fail | Notes |
|-----------|-----------|-------|
| Design quality (Canva-level) | NEEDS VERIFY | Posted Apr 3, haven't been audited against new design standard |
| Hashtags present | ✅ PASS | Full hashtag sets included |
| FTC disclosure | ✅ PASS | At end of each caption |

### 4. Pinterest Pins (6 existing)
| Criterion | Pass/Fail | Notes |
|-----------|-----------|-------|
| Vertical format (2:3) | NEEDS VERIFY | Should be 1000x1500 |
| Keyword-rich descriptions | ✅ PASS | Per strategy doc |
| Links to mintbrooks.com | ✅ PASS | All linked |

## Critical QA Finding: Remotion Videos Need Audio
The 4 rendered Remotion videos are SILENT. TikTok videos without audio get significantly less reach. Before posting:
1. Add trending audio track (use TikTok's built-in library)
2. OR add voiceover reading the text
3. OR add a royalty-free background music track

**Action:** When posting, use TikTok's in-app audio tools to add a trending sound.

## Page Speed (from last session audit)
- Site loads under 2s on mobile: ✅ VERIFIED
- Plausible tracking: LIVE ✅
- Core Web Vitals: Need real user data (no traffic yet)

## Next Cycle QA Tasks
1. Verify Remotion video playback quality on actual phone screen
2. Audit IG posts against Design Quality Standard
3. Once traffic exists, check Plausible for unusual patterns
4. Verify exit intent popup doesn't fire on /links page (could annoy TikTok referrals)
