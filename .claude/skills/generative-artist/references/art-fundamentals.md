# Art Fundamentals for Generative Code

## The Physics of Seeing

Light travels in straight lines. When it hits a surface, three things happen:
1. **Absorption** — Some wavelengths are absorbed (this creates color)
2. **Diffusion** — Light scatters in many directions (matte appearance)
3. **Reflection** — Light bounces at equal angle (shiny appearance)

Every material is a ratio of these three. Understanding this ratio = understanding how to code any surface.

## The 10-Point Light Scale (Expanded)

### Zone 1: Highlight
- **What it is:** Direct reflection of light source
- **SVG translation:** feSpecularLighting with high specularConstant
- **Appearance:** Often blown out to white, small and intense
- **Common mistake:** Making it too large or diffuse

### Zone 2: Center Light
- **What it is:** Surface plane facing light source directly
- **SVG translation:** feDiffuseLighting with high diffuseConstant
- **Appearance:** Bright but not white, shows local color
- **Key insight:** This is where you see the TRUE color of the object

### Zones 3-5: Halftones
- **What they are:** Gradual transition as surface curves away from light
- **SVG translation:** The natural falloff from feDiffuseLighting
- **Appearance:** Progressive darkening, color shifts toward neutral
- **The trick:** Low elevation angle in feDistantLight creates longer halftone range

### Zone 6: Terminator Line
- **What it is:** The exact boundary where light ends
- **SVG translation:** High surfaceScale creates sharper terminator
- **Appearance:** Often the sharpest contrast edge on the form
- **Critical for:** Making forms read as 3D, not flat

### Zone 7: Core Shadow
- **What it is:** The darkest area on the object itself (not cast shadow)
- **SVG translation:** Absence of diffuse light contribution
- **Appearance:** Dark but NOT black — still has some reflected light
- **Common mistake:** Making shadows pure black (kills realism)

### Zone 8: Reflected Light
- **What it is:** Light bouncing from environment back onto shadow side
- **SVG translation:** Secondary feDiffuseLighting from opposite azimuth
- **Appearance:** Subtle lightening in shadow, often picks up environment color
- **Pro tip:** Adding a fill light from opposite direction (low intensity)

### Zone 9: Cast Shadow
- **What it is:** Shadow projected onto OTHER surfaces
- **SVG translation:** feDropShadow or feGaussianBlur + feOffset
- **Appearance:** Hardest at contact point, softer as it extends
- **The rule:** Cast shadow is DARKER than core shadow

### Zone 10: Occlusion Shadow
- **What it is:** Crevices where almost no light can reach
- **SVG translation:** Very dark values in heightmap valleys
- **Appearance:** Nearly black, defines where forms meet
- **Where it appears:** Corners, cracks, contact points

## Color Temperature in Light and Shadow

**Warm light → Cool shadows** (sunlight scenario)
**Cool light → Warm shadows** (overcast/indoor scenario)

In SVG terms:
```
Warm tint: feColorMatrix boosting R channel
Cool tint: feColorMatrix boosting B channel
```

Apply warm to lit areas, cool to shadow areas, or vice versa. This separation creates depth even in subtle implementations.

## Material Properties Matrix

| Material | Diffuse | Specular | Exponent | Texture Freq | Notes |
|----------|---------|----------|----------|--------------|-------|
| Matte plastic | High | Low | 5-15 | Low | Soft highlight spread |
| Glossy plastic | Medium | High | 30-50 | Low | Tight highlights |
| Brushed metal | Low | Very High | 60-100 | Medium (directional) | Anisotropic stretch |
| Polished metal | Very Low | Very High | 80-150 | None | Mirror-like |
| Glass | Low | Very High | 100+ | None | Add transparency |
| Fabric | High | Very Low | 3-8 | High | Fuzzy, diffuse scatter |
| Skin | High | Low | 10-20 | Medium | Subsurface scatter feel |
| Stone | High | Low | 5-15 | High (multi-octave) | Rough, complex texture |
| Water | Low | Very High | 50-80 | Low (animated) | Caustics optional |
| Sand | High | Medium | 25-40 | Very High | Individual grain sparkle |

## The Fresnel Effect

Surfaces are MORE reflective at glancing angles than head-on. This is why:
- Wet roads reflect more when you look down them
- The edge of a sphere is often brighter than expected
- Glass reflects more when viewed at angle

**SVG approximation:** Increase specular contribution toward edges using radial gradients or vignette-style compositing.

## Ambient Occlusion Principle

Where surfaces meet or come close together, less light reaches. This creates:
- Darkening in corners
- Contact shadows at bases of objects
- Depth in crevices

**SVG implementation:** Use blurred versions of the heightmap to darken valleys:
```
feTurbulence → feGaussianBlur → feComposite (darken mode)
```

## The "Drawing Light" Technique

Traditional art insight: Don't draw shadows. Draw light, and shadows emerge.

**For sand/granular surfaces:**
1. Fill the entire area with uniform shadow color
2. Use an eraser (or additive blend) to REVEAL the light on peaks
3. Each grain is a tiny sphere with its own 10-point scale

**SVG translation:**
1. Start with dark base
2. Use feSpecularLighting in screen/add mode to reveal highlights
3. The grain texture IS the heightmap that lighting responds to

## Depth Cues Hierarchy

The eye reads depth through these cues (strongest to weakest):
1. **Occlusion** — What's in front blocks what's behind
2. **Shadow** — Cast shadows anchor objects in space
3. **Size** — Larger = closer (perspective)
4. **Focus** — Sharp = close, blurry = far
5. **Color saturation** — More saturated = closer
6. **Value contrast** — Higher contrast = closer

For UI, leverage #2 (shadow) and #5/#6 (color/contrast) most heavily.

## Common Mistakes and Fixes

**Flat lighting:** Elevation too high (try 25-35° instead of 45°+)
**Plastic look:** Too much specular, not enough diffuse variation
**Dirty look:** Shadows too warm or highlights too cool
**Floating elements:** Missing contact/occlusion shadows
**Uncanny valley:** Inconsistent light direction across elements
