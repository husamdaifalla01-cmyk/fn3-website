# Material Recipes

Ready-to-use SVG filter code for realistic materials. Each recipe includes the complete filter and usage.

---

## Sand (Desert Dunes - TOP VIEW)

Wavy ripples with granular sparkle. Based on real sand light physics.

```xml
<defs>
  <filter id="desertSand" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB">
    <!-- Primary ripple pattern -->
    <feTurbulence type="turbulence" baseFrequency="0.004 0.018" numOctaves="3" seed="17" result="primaryRipple"/>

    <!-- Organic warp field -->
    <feTurbulence type="fractalNoise" baseFrequency="0.008 0.003" numOctaves="2" seed="33" result="warpField"/>

    <!-- Displace ripples for organic curves -->
    <feDisplacementMap in="primaryRipple" in2="warpField" scale="90" xChannelSelector="R" yChannelSelector="G" result="wavyRipples"/>

    <!-- Sharpen wave definition -->
    <feComponentTransfer in="wavyRipples" result="definedWaves">
      <feFuncR type="linear" slope="2.8" intercept="-0.9"/>
      <feFuncG type="linear" slope="2.8" intercept="-0.9"/>
      <feFuncB type="linear" slope="2.8" intercept="-0.9"/>
    </feComponentTransfer>

    <!-- Fine grain texture -->
    <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="6" seed="77" result="fineGrain"/>

    <!-- Medium grain clusters -->
    <feTurbulence type="fractalNoise" baseFrequency="0.15" numOctaves="3" seed="55" result="mediumGrain"/>

    <!-- Blend grains -->
    <feBlend in="fineGrain" in2="mediumGrain" mode="overlay" result="grainLayers"/>

    <!-- Combine waves and grain -->
    <feBlend in="definedWaves" in2="grainLayers" mode="hard-light" result="fullHeightmap"/>

    <!-- Grayscale heightmap -->
    <feColorMatrix in="fullHeightmap" type="saturate" values="0" result="grayHeight"/>

    <!-- Main diffuse lighting -->
    <feDiffuseLighting in="grayHeight" surfaceScale="24" diffuseConstant="1.05" lighting-color="#FFF8E8" result="mainDiffuse">
      <feDistantLight azimuth="305" elevation="28"/>
    </feDiffuseLighting>

    <!-- Fill light from opposite -->
    <feDiffuseLighting in="grayHeight" surfaceScale="8" diffuseConstant="0.3" lighting-color="#E8D8C8" result="fillDiffuse">
      <feDistantLight azimuth="125" elevation="50"/>
    </feDiffuseLighting>

    <!-- Combine diffuse -->
    <feBlend in="mainDiffuse" in2="fillDiffuse" mode="screen" result="combinedDiffuse"/>

    <!-- Specular sparkle -->
    <feSpecularLighting in="grayHeight" surfaceScale="10" specularConstant="2.5" specularExponent="65" lighting-color="#ffffff" result="brightSpecular">
      <feDistantLight azimuth="305" elevation="52"/>
    </feSpecularLighting>

    <!-- Sand base color -->
    <feFlood flood-color="#D8A458" result="sandColor"/>

    <!-- Apply lighting -->
    <feBlend in="sandColor" in2="combinedDiffuse" mode="multiply" result="litSand"/>
    <feBlend in="litSand" in2="brightSpecular" mode="screen" result="sparkled"/>

    <!-- Color grading -->
    <feColorMatrix in="sparkled" type="matrix" values="1.12 0.05 0 0 0.02  0.03 1.0 0.02 0 0  0 0.03 0.85 0 0  0 0 0 1 0" result="graded"/>

    <!-- Vignette -->
    <feGaussianBlur in="SourceAlpha" stdDeviation="140" result="vigBlur"/>
    <feFlood flood-color="#5A3A10" flood-opacity="0.25" result="vigColor"/>
    <feComposite in="vigColor" in2="vigBlur" operator="out" result="vig"/>
    <feBlend in="graded" in2="vig" mode="multiply"/>
  </filter>
</defs>

<rect width="800" height="600" filter="url(#desertSand)"/>
```

**Tune:** `baseFrequency` ratio controls ripple direction. `scale` on displacement controls curve intensity. `surfaceScale` on diffuse controls 3D depth.

---

## Brushed Metal

Anisotropic highlights with directional grain.

```xml
<defs>
  <filter id="brushedMetal" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
    <!-- Directional brush strokes -->
    <feTurbulence type="fractalNoise" baseFrequency="0.4 0.01" numOctaves="3" seed="42" result="brush"/>
    <feColorMatrix in="brush" type="saturate" values="0" result="brushGray"/>

    <!-- Subtle surface variation -->
    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="10" result="variation"/>
    <feBlend in="brushGray" in2="variation" mode="soft-light" result="heightmap"/>

    <!-- Diffuse - low for metal -->
    <feDiffuseLighting in="heightmap" surfaceScale="3" diffuseConstant="0.6" lighting-color="#e8e8e8" result="diffuse">
      <feDistantLight azimuth="270" elevation="40"/>
    </feDiffuseLighting>

    <!-- Specular - high and tight for metal -->
    <feSpecularLighting in="heightmap" surfaceScale="2" specularConstant="3" specularExponent="80" lighting-color="#ffffff" result="specular">
      <feDistantLight azimuth="270" elevation="60"/>
    </feSpecularLighting>

    <!-- Metal base color -->
    <feFlood flood-color="#8a9199" result="metalColor"/>

    <!-- Composite -->
    <feBlend in="metalColor" in2="diffuse" mode="multiply" result="shaded"/>
    <feBlend in="shaded" in2="specular" mode="screen"/>
  </filter>
</defs>

<rect width="400" height="300" filter="url(#brushedMetal)"/>
```

**Tune:** Flip `baseFrequency` values for vertical vs horizontal brush direction.

---

## Water Surface

Caustic-like patterns with high reflectivity.

```xml
<defs>
  <filter id="waterSurface" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
    <!-- Large wave forms -->
    <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="3" seed="7" result="waves"/>

    <!-- Small ripples -->
    <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="2" seed="22" result="ripples"/>

    <!-- Combine waves -->
    <feBlend in="waves" in2="ripples" mode="overlay" result="combined"/>
    <feColorMatrix in="combined" type="saturate" values="0" result="heightmap"/>

    <!-- Subtle diffuse -->
    <feDiffuseLighting in="heightmap" surfaceScale="8" diffuseConstant="0.7" lighting-color="#e0f0ff" result="diffuse">
      <feDistantLight azimuth="315" elevation="50"/>
    </feDiffuseLighting>

    <!-- Strong specular for wet look -->
    <feSpecularLighting in="heightmap" surfaceScale="6" specularConstant="2.5" specularExponent="60" lighting-color="#ffffff" result="specular">
      <feDistantLight azimuth="315" elevation="65"/>
    </feSpecularLighting>

    <!-- Water color -->
    <feFlood flood-color="#2a6a8a" flood-opacity="0.85" result="waterColor"/>

    <!-- Composite -->
    <feBlend in="waterColor" in2="diffuse" mode="multiply" result="shaded"/>
    <feBlend in="shaded" in2="specular" mode="screen"/>
  </filter>
</defs>

<rect width="600" height="400" filter="url(#waterSurface)"/>
```

---

## Rough Stone

Multi-octave texture with strong depth.

```xml
<defs>
  <filter id="roughStone" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB">
    <!-- Large form variation -->
    <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="5" result="largeForm"/>

    <!-- Medium detail -->
    <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="4" seed="15" result="mediumDetail"/>

    <!-- Fine pitting -->
    <feTurbulence type="fractalNoise" baseFrequency="0.3" numOctaves="3" seed="25" result="finePits"/>

    <!-- Layer them -->
    <feBlend in="largeForm" in2="mediumDetail" mode="overlay" result="combined1"/>
    <feBlend in="combined1" in2="finePits" mode="soft-light" result="heightmap"/>
    <feColorMatrix in="heightmap" type="saturate" values="0" result="grayHeight"/>

    <!-- Strong diffuse for matte stone -->
    <feDiffuseLighting in="grayHeight" surfaceScale="20" diffuseConstant="1.1" lighting-color="#f5f0e8" result="diffuse">
      <feDistantLight azimuth="300" elevation="30"/>
    </feDiffuseLighting>

    <!-- Minimal specular -->
    <feSpecularLighting in="grayHeight" surfaceScale="8" specularConstant="0.8" specularExponent="15" lighting-color="#ffffff" result="specular">
      <feDistantLight azimuth="300" elevation="45"/>
    </feSpecularLighting>

    <!-- Stone color -->
    <feFlood flood-color="#7a7065" result="stoneColor"/>

    <!-- Composite -->
    <feBlend in="stoneColor" in2="diffuse" mode="multiply" result="shaded"/>
    <feComposite in="specular" in2="shaded" operator="arithmetic" k1="0" k2="1" k3="0.15" k4="0"/>
  </filter>
</defs>

<rect width="500" height="400" filter="url(#roughStone)"/>
```

---

## Glass / Crystal

High specular, subtle refraction effect.

```xml
<defs>
  <filter id="glass" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
    <!-- Subtle surface imperfection -->
    <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="7" result="surface"/>
    <feColorMatrix in="surface" type="saturate" values="0" result="heightmap"/>

    <!-- Very low diffuse -->
    <feDiffuseLighting in="heightmap" surfaceScale="2" diffuseConstant="0.3" lighting-color="#f0f8ff" result="diffuse">
      <feDistantLight azimuth="315" elevation="60"/>
    </feDiffuseLighting>

    <!-- Very high, tight specular -->
    <feSpecularLighting in="heightmap" surfaceScale="3" specularConstant="4" specularExponent="120" lighting-color="#ffffff" result="specular">
      <feDistantLight azimuth="315" elevation="70"/>
    </feSpecularLighting>

    <!-- Subtle tint -->
    <feFlood flood-color="#e8f4f8" flood-opacity="0.7" result="glassTint"/>

    <!-- Composite -->
    <feBlend in="glassTint" in2="diffuse" mode="multiply" result="shaded"/>
    <feBlend in="shaded" in2="specular" mode="screen"/>
  </filter>
</defs>

<rect width="300" height="400" filter="url(#glass)"/>
```

---

## Quick Customization Guide

| Want... | Adjust... |
|---------|-----------|
| Deeper 3D | Increase `surfaceScale` on diffuse (15→25) |
| More shine | Increase `specularConstant` (1→3) |
| Tighter highlights | Increase `specularExponent` (30→80) |
| Finer texture | Increase `baseFrequency` (0.1→0.5) |
| Larger features | Decrease `baseFrequency` (0.01→0.003) |
| Softer look | Decrease elevation angle (45→25) |
| Dramatic contrast | Decrease elevation angle + increase surfaceScale |
| Warmer tone | Add red bias in feColorMatrix |
| Cooler tone | Add blue bias in feColorMatrix |
