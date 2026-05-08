---
name: Neo-Andean Design System
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#5d3f3c'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#926e6b'
  outline-variant: '#e7bdb9'
  surface-tint: '#c0001a'
  primary: '#ad0017'
  on-primary: '#ffffff'
  primary-container: '#d91023'
  on-primary-container: '#ffecea'
  inverse-primary: '#ffb3ad'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0e0'
  on-secondary-container: '#616363'
  tertiary: '#565556'
  on-tertiary: '#ffffff'
  tertiary-container: '#6e6d6e'
  on-tertiary-container: '#f3f0f1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb3ad'
  on-primary-fixed: '#410003'
  on-primary-fixed-variant: '#930011'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e5e2e3'
  tertiary-fixed-dim: '#c8c6c7'
  on-tertiary-fixed: '#1b1b1c'
  on-tertiary-fixed-variant: '#474647'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 24px
  margin: 32px
---

## Brand & Style

This design system establishes a "Neo-Andean" aesthetic, a visual language that fuses the ancestral power of Peruvian iconography with cutting-edge 3D digital trends. The personality is energetic, rhythmic, and high-tech, drawing inspiration from the bold architecture of the New Andean movement. 

The style merges three distinct movements:
- **Neobrutalism:** Utilizing heavy charcoal strokes and rigid grid structures to ground the interface.
- **Claymorphism:** Applying soft, voluminous inner shadows to create a tactile, "squishy" 3D effect on interactive elements.
- **Retro-Futurism:** Integrating scanlines and geometric patterns that evoke both ancient textiles and early computing graphics.

The target audience seeks a high-performance, culturally resonant experience that feels tactile and premium yet unapologetically bold.

## Colors

The palette is anchored by "Inca Red" and "Cloud White," reflecting the national identity with maximum vibrance.
- **Primary Red (#D91023):** Used for primary actions, critical branding elements, and 3D surface faces.
- **Secondary White (#FFFFFF):** Provides the clean, high-contrast base for the claymorphic "glow" and background surfaces.
- **Dark Charcoal (#1A1A1B):** Replaces pure black for depth, used for neobrutalist borders, hard shadows, and typography to ensure readability against the intense red.
- **Depth Tones:** A darker shade of red is used for the extruded "sides" of 3D elements, creating the retro-3D effect.

## Typography

Space Grotesk is the exclusive typeface for this design system, chosen for its technical, geometric nature that complements the 3D visual style.
- **Headlines:** Set with tight tracking and bold weights to mimic the monumental feel of Andean stonework.
- **Labels:** Use uppercase styling with increased letter spacing to provide a "technical readout" feel.
- **Hierarchy:** Contrast is achieved through dramatic size scaling rather than font switching, maintaining a cohesive, high-tech aesthetic.

## Layout & Spacing

The layout utilizes a **12-column fluid grid** with generous gutters to allow for the heavy shadows and offsets required by the neobrutalist style.
- **Rhythm:** An 8px base unit governs all padding and margins, ensuring geometric alignment.
- **Andean Grid:** Elements should frequently use stepped alignments (staggered heights or widths) to subtly reference the *Andenes* (agricultural terraces).
- **Safe Areas:** Components require extra padding to accommodate the "inflated" claymorphic shapes without clipping their 3D shadows.

## Elevation & Depth

This design system uses a dual-layer approach to depth:
1.  **Outer Depth (Neobrutalist):** Elements feature a hard, 4px to 8px offset shadow in Dark Charcoal (#1A1A1B). These shadows have 100% opacity and no blur, creating an extruded, retro-game feel.
2.  **Inner Depth (Claymorphic):** Surfaces use a combination of top-left light inner shadows (White at 40%) and bottom-right dark inner shadows (Black or Dark Red at 20%) to create a soft, rounded, 3D volume.
3.  **Pattern Overlays:** Large background surfaces should feature a subtle, low-opacity (2-5%) repeating Andean geometric pattern (Chakana or stepped diamond) to provide texture and cultural context.

## Shapes

The shape language is "Rounded-Industrial." While the neobrutalist influence suggests sharp corners, the claymorphic twist requires a softer radius to enable the 3D inflation effect.
- **Primary Radius:** 0.5rem (8px) for standard components like input fields and small cards.
- **Large Radius:** 1.5rem (24px) for main containers and hero sections to emphasize the "clay" volume.
- **Borders:** All containers must feature a solid 2px or 3px border in Dark Charcoal to maintain structural definition against the white backgrounds.

## Components

### Buttons
Buttons are the primary expression of the 3D style. They feature a primary red face, a dark charcoal border, and a "thick" bottom offset that disappears (translates Y) when pressed to simulate a physical mechanical switch.

### Cards
Cards should be treated as "slabs." They use a white background with a subtle Andean pattern watermark in the corner. Headers are separated by a thick charcoal horizontal stroke.

### Input Fields
Inputs use a "recessed" claymorphic look, appearing as if they are carved into the surface. They utilize an inner shadow rather than an outer offset to differentiate them from clickable buttons.

### Chips & Badges
Small, pill-shaped elements with high-contrast red backgrounds and white text. These use a simplified 1px border and a smaller 2px offset shadow.

### Andean Dividers
Instead of simple lines, use "stepped" dividers or zig-zag patterns in charcoal to separate major sections of content, referencing traditional textile borders.

### Interactive States
- **Hover:** The element's offset shadow grows larger, and the "volume" (inner glow) intensifies.
- **Active (Click):** The element shifts down and right by the exact size of its shadow, with the shadow disappearing to simulate a "pressed" state.