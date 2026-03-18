# Cognitive Loop for Generative Art

When stuck, draw the light physics first. This document provides a systematic approach to debugging visual output.

## The Debugging Loop

```
1. OBSERVE → What exactly looks wrong?
2. ANALYZE → Which light zone is incorrect?
3. HYPOTHESIZE → What SVG parameter controls that zone?
4. TEST → Change ONE parameter, observe result
5. ITERATE → Repeat until solved
```

## Common Problems → Solutions

### Problem: "It looks flat"

**Analysis:** Missing shadows or insufficient value range.

**Check list:**
1. Is `surfaceScale` too low? → Try 15-30
2. Is light `elevation` too high? → Try 25-35° (not 45°+)
3. Is the heightmap actually grayscale? → Check for unintended color
4. Is there a specular layer? → Even matte needs subtle shine

**Quick fix:** Lower elevation, increase surfaceScale.

---

### Problem: "The highlights look like plastic"

**Analysis:** Specular is too strong relative to diffuse.

**Check list:**
1. Is `specularConstant` too high? → Try 0.5-2.0 for most surfaces
2. Is `specularExponent` too low? → Higher = tighter highlights
3. Is diffuse too weak? → Increase `diffuseConstant`

**Quick fix:** Reduce specularConstant, increase specularExponent.

---

### Problem: "Colors look muddy/dirty"

**Analysis:** Incorrect color temperature relationship.

**Rule:** Warm light → Cool shadows, OR Cool light → Warm shadows

**Check list:**
1. Are both highlights AND shadows warm? → Add blue to shadows
2. Is there too much color mixing? → Use separate layers
3. Is the base color too saturated? → Desaturate before lighting

**Quick fix:** Add subtle blue bias to shadow areas via feColorMatrix.

---

### Problem: "Texture looks mechanical/repetitive"

**Analysis:** Need more organic variation.

**Check list:**
1. Is `numOctaves` too low? → Try 4-6 for complexity
2. Using only one turbulence layer? → Add multiple scales
3. Missing displacement? → Warp the base pattern

**Quick fix:** Add feDisplacementMap with second turbulence source.

---

### Problem: "Lighting direction inconsistent"

**Analysis:** Azimuth and elevation not aligned between layers.

**Critical rule:** ALL lighting primitives should share the same `azimuth` and similar `elevation`.

**Check list:**
1. Do diffuse and specular have same azimuth? → Make them match
2. Are secondary lights labeled as such? → Use lower intensity
3. Is there a fill light from opposite? → Good, but keep it subtle (0.2-0.3)

**Quick fix:** Set all lights to same azimuth first, then adjust.

---

### Problem: "Sand doesn't sparkle"

**Analysis:** Missing or weak specular on grain layer.

**Sand-specific check:**
1. Is grain texture feeding specular? → Must use same heightmap
2. Is `specularExponent` high enough? → Try 50-80 for individual grains
3. Is grain frequency high enough? → baseFrequency 0.5-1.0 for fine sand

**Quick fix:** Increase grain baseFrequency AND specularExponent.

---

### Problem: "Ripples look like stripes, not waves"

**Analysis:** Missing organic warp/curve.

**Ripple-specific check:**
1. Is there a displacement stage? → Required for natural curves
2. Is warp frequency too regular? → Use fractalNoise, not turbulence
3. Is displacement scale too low? → Try 60-100 for visible curves

**Quick fix:** Add feDisplacementMap with separate fractalNoise input.

---

## The Mental Model

Think of SVG filters as a **virtual 3D renderer**:

```
feTurbulence  = Procedural geometry (heightmap)
feDiffuseLighting = Matte surface shader
feSpecularLighting = Glossy surface shader
feColorMatrix = Color correction pass
feBlend = Compositing layers
```

The same heightmap MUST feed both diffuse and specular for coherent results. This is the #1 mistake.

## When All Else Fails

1. **Start over with the simplest case**
   - Single feTurbulence → Single feDiffuseLighting
   - Get that working first

2. **Draw it on paper**
   - Literally sketch where light should be brightest/darkest
   - Mark the terminator line
   - This clarifies what you're aiming for

3. **Reference reality**
   - Take a photo of the material you're simulating
   - Identify the 10 light zones in the photo
   - Match your output zone by zone

4. **Isolate each stage**
   - Output just the heightmap (should be grayscale)
   - Output just diffuse (should show form)
   - Output just specular (should show highlights)
   - Then composite

## Performance Optimization

If filters are slow:
1. Reduce `numOctaves` (biggest impact)
2. Reduce filter region size (`x`, `y`, `width`, `height`)
3. Use `feImage` for pre-rendered textures
4. Cache filter results with `result` attributes

## The Championship Mindset

Flat UI is everywhere because it's easy. Realistic materials take understanding.

Every time you create photorealistic output, you're demonstrating mastery of:
- Light physics
- Material science
- Color theory
- SVG filter pipeline

This is what separates generic from championship.
