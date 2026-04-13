/**
 * director-critique.ts
 * Human director quality gate for nanobanana-generated images.
 *
 * Operates as a trained human director reviewing dailies — not as a technical
 * detector. Flags AI-looking output, weak composition, inconsistencies, and
 * artifacts that would undermine authenticity on social platforms.
 *
 * Science foundations:
 *   De-Fake (Sha et al. 2023)    — AI image artifact taxonomy
 *   Perceptual Quality (LPIPS)   — learned perceptual similarity
 *   Cinematography evaluation    — shadow physics, lighting coherence
 *   Social content best practice — authenticity signals for TikTok/IG
 */

import * as fs from 'fs';
import * as path from 'path';
import type { SceneType } from './visual-prompts';

const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface CritiqueRequest {
  imagePath: string;
  sceneId: string;
  sceneType: SceneType;
  originalPrompt: string;
  consistencyReference?: string;  // description of what character/scene should look like
}

export interface CritiqueIssue {
  category: IssueCategory;
  severity: 'critical' | 'major' | 'minor';
  description: string;
  directorNote: string;  // Human-voice note as a director would say it
}

export interface CritiqueResult {
  pass: boolean;           // Director approves for use
  score: number;           // 0–100 director quality score
  issues: CritiqueIssue[];
  directorVerdict: string; // One-sentence director summary
  regen: boolean;          // Should regenerate vs. use with caveats
  regenGuidance?: string;  // Specific prompt adjustments if regen needed
}

export type IssueCategory =
  | 'ai_artifact'          // Detectable AI generation signatures
  | 'lighting_incoherence' // Physics violations in light/shadow
  | 'composition'          // Framing, balance, visual hierarchy
  | 'authenticity'         // Looks staged, fake, stock-photo
  | 'consistency'          // Character/style inconsistency across scenes
  | 'subject_alignment'    // Doesn't match what was prompted
  | 'technical_quality'    // Resolution, sharpness, compression
  | 'brand_alignment';     // Off-brand for DriveCredit / financial services

// ─── AI ARTIFACT DETECTION CRITERIA ──────────────────────────────────────────
// Based on De-Fake taxonomy (Sha et al. 2023) + practical director experience

const AI_ARTIFACT_SIGNATURES = [
  'Uniform sharpness everywhere with no optical depth-of-field gradient',
  'Lighting direction inconsistent — shadows pointing different directions on same surface',
  'Skin texture appears painted-smooth, over-processed, plastic quality',
  'Hair strands appear uniform, merged together, lacking individual strand physics',
  'Background elements are suspiciously perfect with no natural variation',
  'Text in image is corrupted, misshapen, or illegibly rendered',
  'Hands have incorrect number of fingers or unnatural joint positions',
  'Reflections in glasses or surfaces do not match the scene environment',
  'Boundary artifacts where subject edges blend unnaturally with background',
  'Color temperature is uniform across scene — no warm/cool shadow/highlight variation',
  'Fabric folds look geometrically regular rather than gravitationally authentic',
  'Eyes have glassy, hyper-specular quality or are asymmetrically placed',
  'Depth recession in background is too uniform, lacks atmospheric perspective',
  'Objects in scene violate physical scale relationships',
];

// ─── DIRECTOR EVALUATION PROMPTS ─────────────────────────────────────────────

function buildDirectorCritiquePrompt(req: CritiqueRequest): string {
  const artifactList = AI_ARTIFACT_SIGNATURES.map((s, i) => `${i + 1}. ${s}`).join('\n');

  return `You are a senior visual director with 15 years experience in social media content production for financial services brands. You've directed hundreds of TikTok and Instagram campaigns. You have an extremely trained eye for AI-generated imagery and know exactly what makes audiences trust or distrust content.

You are reviewing a generated image for scene "${req.sceneId}" (type: ${req.sceneType}).

ORIGINAL PROMPT:
"${req.originalPrompt}"

${req.consistencyReference ? `CONSISTENCY REFERENCE (this character/style must match across all scenes):\n"${req.consistencyReference}"\n` : ''}

EVALUATE this image with ruthless professional honesty as if you're reviewing dailies with your team. Your reputation is on the line — you would NOT approve an image that looks AI-generated for a real campaign.

EVALUATION FRAMEWORK:

1. AI ARTIFACT CHECK — Look for these specific signatures (De-Fake taxonomy):
${artifactList}

2. LIGHTING PHYSICS CHECK:
- Are shadows consistent with a single motivated light source?
- Does the color temperature make physical sense (warm highlights, cool shadows or vice versa)?
- Are there any lighting violations that break the physical reality of the scene?

3. COMPOSITION & CINEMATOGRAPHY:
- Does the framing serve the emotional intent of the scene?
- Is the visual hierarchy clear — does the eye go where it should?
- Does the depth of field feel optically authentic?

4. AUTHENTICITY / SOCIAL CONTENT:
- Would this pass as user-generated content or professional photography on TikTok?
- Does it feel real, or does it feel like a stock photo / AI generation?
- Is there any "uncanny valley" quality in faces or postures?

5. SUBJECT ALIGNMENT:
- Does the image actually show what was prompted?
- Are key elements present (product screen, setting, character)?
- Does it match the scene type intent (${req.sceneType})?

${req.sceneType === 'solution' || req.sceneType === 'social_proof'
  ? '6. BRAND ALIGNMENT (financial services):\n- Does this feel trustworthy for a financial product?\n- Nothing should feel predatory, misleading, or unethical\n- Character representation must be dignified and authentic\n'
  : ''}

OUTPUT FORMAT (respond with valid JSON only, no markdown):
{
  "pass": boolean,
  "score": number (0-100),
  "directorVerdict": "one sentence summary as a director",
  "regen": boolean,
  "regenGuidance": "specific prompt adjustments if regen needed, or null",
  "issues": [
    {
      "category": "ai_artifact|lighting_incoherence|composition|authenticity|consistency|subject_alignment|technical_quality|brand_alignment",
      "severity": "critical|major|minor",
      "description": "precise technical description",
      "directorNote": "how you'd say this in a dailies review, conversational director voice"
    }
  ]
}

SCORING RUBRIC:
- 90–100: Ship it. Broadcast quality. Authentic, compelling, technically clean.
- 75–89: Good. Minor notes. Could ship with awareness of small issues.
- 60–74: Marginal. Noticeable issues. Use only if regen fails to improve.
- 40–59: Weak. Significant problems. Regen with better guidance.
- 0–39: Reject. AI artifacts visible, composition broken, or brand risk.

Be harsh. Real audiences will notice what you miss here.`;
}

// ─── CORE CRITIQUE FUNCTION ───────────────────────────────────────────────────

export async function critiqueImage(req: CritiqueRequest): Promise<CritiqueResult> {
  if (!GOOGLE_AI_API_KEY) {
    throw new Error('GOOGLE_AI_API_KEY not set');
  }

  if (!fs.existsSync(req.imagePath)) {
    return {
      pass: false,
      score: 0,
      issues: [{
        category: 'technical_quality',
        severity: 'critical',
        description: 'Image file not found',
        directorNote: "We don't even have the file. Something went wrong upstream.",
      }],
      directorVerdict: 'Image file missing — generation failed.',
      regen: true,
      regenGuidance: 'Check generation pipeline — image was not saved.',
    };
  }

  const imageBuffer = fs.readFileSync(req.imagePath);
  const b64 = imageBuffer.toString('base64');
  const ext = path.extname(req.imagePath).toLowerCase();
  const mimeType = ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';

  const prompt = buildDirectorCritiquePrompt(req);

  const response = await fetch(
    `${API_BASE}/models/gemini-2.5-flash:generateContent?key=${GOOGLE_AI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inlineData: { mimeType, data: b64 } },
          ],
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 4096,
          responseMimeType: 'application/json',
        },
      }),
    },
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({})) as any;
    throw new Error(`Critique API failed ${response.status}: ${err?.error?.message ?? response.statusText}`);
  }

  const data = await response.json() as any;
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

  // Parse JSON from response — handle potential markdown code block wrapping
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error('Director critique returned non-JSON:', rawText.slice(0, 500));
    return buildFallbackCritique(req.sceneId, 'Could not parse director critique response');
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]) as CritiqueResult;
    // Validate and sanitize
    return {
      pass: Boolean(parsed.pass),
      score: Number(parsed.score) || 50,
      issues: Array.isArray(parsed.issues) ? parsed.issues : [],
      directorVerdict: String(parsed.directorVerdict || 'No verdict'),
      regen: Boolean(parsed.regen),
      regenGuidance: parsed.regenGuidance ?? undefined,
    };
  } catch {
    return buildFallbackCritique(req.sceneId, rawText.slice(0, 200));
  }
}

function buildFallbackCritique(sceneId: string, raw: string): CritiqueResult {
  return {
    pass: false,
    score: 0,
    issues: [{
      category: 'technical_quality',
      severity: 'critical',
      description: `Critique parsing failed: ${raw}`,
      directorNote: 'Could not evaluate this image — need manual review.',
    }],
    directorVerdict: 'Evaluation failed — manual review required.',
    regen: false,
  };
}

// ─── BATCH CRITIQUE ───────────────────────────────────────────────────────────

export interface BatchCritiqueResult {
  sceneResults: Record<string, CritiqueResult>;
  overallPass: boolean;
  criticalFailures: string[];   // Scene IDs with critical issues
  regenList: string[];          // Scene IDs that need regeneration
  directorSummary: string;
}

export async function critiqueVideoAssets(
  assets: Record<string, string>,  // scene id → file path
  sceneTypes: Record<string, SceneType>,
  prompts: Record<string, string>,
  consistencyRef?: string,
): Promise<BatchCritiqueResult> {
  const sceneResults: Record<string, CritiqueResult> = {};
  const criticalFailures: string[] = [];
  const regenList: string[] = [];

  for (const [sceneId, filePath] of Object.entries(assets)) {
    console.log(`  [Director] Reviewing scene: ${sceneId}...`);

    const result = await critiqueImage({
      imagePath: filePath,
      sceneId,
      sceneType: sceneTypes[sceneId] ?? 'solution',
      originalPrompt: prompts[sceneId] ?? '',
      consistencyReference: consistencyRef,
    });

    sceneResults[sceneId] = result;

    if (result.issues.some(i => i.severity === 'critical')) {
      criticalFailures.push(sceneId);
    }

    if (result.regen) {
      regenList.push(sceneId);
    }

    const emoji = result.pass ? '✓' : '✗';
    const scoreStr = result.score.toString().padStart(3);
    console.log(`  ${emoji} ${sceneId}: ${scoreStr}/100 — ${result.directorVerdict}`);

    if (result.issues.length > 0) {
      result.issues.forEach(issue => {
        const prefix = issue.severity === 'critical' ? '🚨' : issue.severity === 'major' ? '⚠️ ' : '📝';
        console.log(`    ${prefix} [${issue.category}] ${issue.directorNote}`);
      });
    }

    // Polite rate limit buffer between critique calls
    await new Promise(r => setTimeout(r, 1000));
  }

  const allScores = Object.values(sceneResults).map(r => r.score);
  const avgScore = allScores.length > 0 ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 0;
  const passCount = Object.values(sceneResults).filter(r => r.pass).length;
  const totalCount = Object.keys(sceneResults).length;

  const overallPass = criticalFailures.length === 0 && passCount >= Math.ceil(totalCount * 0.8);

  const directorSummary =
    overallPass
      ? `All scenes clear for production. Average director score: ${avgScore.toFixed(0)}/100. ${passCount}/${totalCount} scenes approved.`
      : `Production hold. ${criticalFailures.length} critical failures. ${regenList.length} scenes need regeneration. Average score: ${avgScore.toFixed(0)}/100.`;

  return {
    sceneResults,
    overallPass,
    criticalFailures,
    regenList,
    directorSummary,
  };
}

// ─── REGEN PROMPT IMPROVEMENT ────────────────────────────────────────────────

/**
 * Take a failed critique result and improve the original prompt.
 * Applies Reflexion-style verbal reinforcement (Shinn et al. NeurIPS 2023).
 */
export function improvePromptFromCritique(
  originalPrompt: string,
  critique: CritiqueResult,
): string {
  if (!critique.regenGuidance && critique.issues.length === 0) {
    return originalPrompt;
  }

  const additions: string[] = [];
  const removals: string[] = [];

  for (const issue of critique.issues) {
    switch (issue.category) {
      case 'ai_artifact':
        additions.push(
          'physically realistic lighting with clear directional source',
          'natural skin texture with pores and micro-details visible',
          'authentic optical depth of field with natural background blur gradient',
          'hair with individual strand variation and natural gravity',
        );
        break;

      case 'lighting_incoherence':
        additions.push(
          'single motivated light source with physically correct shadow direction',
          'warm highlights with cooler shadow fill, natural color temperature gradient',
          'coherent specular highlights matching light source position',
        );
        break;

      case 'authenticity':
        additions.push(
          'candid documentary quality, not staged',
          'authentic environmental context with natural imperfections',
          'natural posture and micro-expression, not posed',
        );
        removals.push('stock photo', 'commercial feel', 'perfect pose');
        break;

      case 'composition':
        additions.push('strong visual hierarchy with clear subject separation');
        break;

      case 'technical_quality':
        additions.push(
          'sharp in-focus subject, 8K quality equivalent',
          'clean image without compression artifacts',
        );
        break;

      default:
        break;
    }
  }

  const guidanceAddition = critique.regenGuidance ? ` ${critique.regenGuidance}.` : '';

  let improved = originalPrompt;

  if (additions.length > 0) {
    improved += `, ${additions.slice(0, 4).join(', ')}`;
  }

  if (guidanceAddition) {
    improved += guidanceAddition;
  }

  // Add explicit AI-artifact counter-modifiers
  improved +=
    '. Avoid: uniform AI smoothness, plastic skin, impossible shadows, uniform sharpness across all distances.';

  return improved;
}

// ─── CONSISTENCY CHECKER ─────────────────────────────────────────────────────

/**
 * Compare two images for visual consistency (character, lighting, style).
 * Uses Gemini vision to evaluate ConsiStory consistency requirements.
 */
export async function checkConsistency(
  referenceImagePath: string,
  testImagePath: string,
  anchor: string,  // Locked consistency anchor description
): Promise<{ consistent: boolean; score: number; issues: string[] }> {
  if (!GOOGLE_AI_API_KEY) {
    throw new Error('GOOGLE_AI_API_KEY not set');
  }

  const refBuffer = fs.readFileSync(referenceImagePath).toString('base64');
  const testBuffer = fs.readFileSync(testImagePath).toString('base64');

  const prompt = `You are evaluating visual consistency between two images in a video sequence.

CONSISTENCY ANCHOR (what must remain consistent):
"${anchor}"

Compare these two images and evaluate:
1. Is the character the same person (same face, ethnicity, age, general appearance)?
2. Is the lighting style and color temperature consistent?
3. Is the visual style and color grading consistent?
4. Would these feel like they belong in the same video?

Output JSON only:
{
  "consistent": boolean,
  "score": number (0-100, where 100 = perfect consistency),
  "issues": ["specific inconsistency descriptions"]
}`;

  const response = await fetch(
    `${API_BASE}/models/gemini-2.5-flash:generateContent?key=${GOOGLE_AI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inlineData: { mimeType: 'image/png', data: refBuffer } },
            { text: 'Reference image above. Test image below:' },
            { inlineData: { mimeType: 'image/png', data: testBuffer } },
          ],
        }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 512 },
      }),
    },
  );

  if (!response.ok) {
    return { consistent: false, score: 0, issues: ['API call failed'] };
  }

  const data = await response.json() as any;
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    return { consistent: false, score: 50, issues: ['Could not parse consistency check'] };
  }

  try {
    return JSON.parse(jsonMatch[0]);
  } catch {
    return { consistent: false, score: 50, issues: ['Parse error in consistency check'] };
  }
}
