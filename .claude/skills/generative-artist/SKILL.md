---
name: generative-artist
description: Transform Claude into a digital fine artist who generates photorealistic textures, materials, and UI elements through code. Use when creating visually stunning UI/UX, realistic textures (sand, water, metal, glass, fabric), 3D-looking surfaces, or any visual output that should look crafted rather than generic. Triggers on requests for "realistic", "beautiful UI", "premium design", "3D effect", "texture", "material", or when current output looks flat/generic. This skill bridges classical art fundamentals with SVG filters and CSS to produce visual code that rivals rendered 3D graphics.
---

# Generative Artist Skill

**The Bob Ross of Code** — Understanding WHY light behaves, then translating that into generative primitives.

## Core Philosophy

Most UI looks flat because developers skip the art. Most art can't be coded because artists skip the math. This skill bridges both: **see like an artist, output like an engineer.**

Every realistic surface follows the same 10-point light scale. Master this once, apply it to any material.

## The Light Scale (Memorize This)

```
1. HIGHLIGHT ——— Direct light source reflection (brightest)
2. CENTER LIGHT — Area facing light directly
3-5. HALFTONES — Gradual transition (light → mid → dark)
6. TERMINATOR —— Where light ends (critical edge)
7. CORE SHADOW — Darkest on the form itself
8. REFLECTED —— Light bouncing from environment
9. CAST SHADOW — Shadow projected onto other surfaces
10. OCCLUSION —— Crevices where no light reaches (darkest)
```

**The Insight:** You're not drawing shadows. You're drawing where light ISN'T.

## SVG Filter Translation

| Art Concept | SVG Primitive | Key Parameters |
|-------------|---------------|----------------|
| Surface texture | `feTurbulence` | baseFrequency, numOctaves |
| 3D form from texture | `feDiffuseLighting` | surfaceScale, elevation |
| Sparkle/shine | `feSpecularLighting` | specularExponent (higher = tighter) |
| Warp/distort | `feDisplacementMap` | scale, xChannelSelector |
| Color grading | `feColorMatrix` | matrix values |
| Contrast/levels | `feComponentTransfer` | slope, intercept, gamma |
| Layer blending | `feBlend` | mode (multiply, screen, overlay) |
| Heightmap creation | `feColorMatrix type="luminanceToAlpha"` | — |

## The Universal Pipeline

```
TEXTURE → HEIGHTMAP → LIGHTING → COLOR → COMPOSITE
   ↓          ↓           ↓         ↓          ↓
feTurbulence → grayscale → feDiffuse + feSpecular → feColorMatrix → feBlend
```

**Critical Rule:** The SAME heightmap must feed BOTH diffuse and specular lighting for coherent 3D.

## Quick Start: Any Material

1. **Analyze the surface** — Is it rough/smooth? Metallic/matte? What's the grain scale?
2. **Create heightmap** — feTurbulence with appropriate frequency
3. **Apply diffuse lighting** — surfaceScale controls depth perception
4. **Add specular** — High exponent = metal/wet, Low = matte/fabric
5. **Color grade** — Warm highlights, cool shadows (or inverse)
6. **Composite** — Multiply for shadows, Screen for highlights

## Reference Files

- **Art Fundamentals**: `references/art-fundamentals.md` — Deep dive on light physics, color theory, material properties
- **Material Recipes**: `references/material-recipes.md` — Ready-to-use code for sand, water, metal, glass, fabric, stone
- **Cognitive Loop**: `references/cognitive-loop.md` — When stuck, draw the light physics first

## When Output Looks Flat

Check these in order:
1. Is surfaceScale too low? (Try 15-30 for pronounced 3D)
2. Is light elevation too high? (Lower = more dramatic shadows)
3. Missing specular layer? (Even matte surfaces have subtle shine)
4. Heightmap not grayscale? (Lighting needs luminance input)
5. Same turbulence feeding both displacement AND lighting?

## The Competitive Edge

Generic UI uses: `box-shadow`, `linear-gradient`, `border-radius`

This skill produces: Physically-based lighting, material-accurate textures, depth that feels touchable

The difference is understanding that a button isn't a rectangle with effects — it's a **surface in 3D space** responding to light.
