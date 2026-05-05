---
name: Ethereal Dusk
colors:
  surface: '#fbf8fd'
  surface-dim: '#dbd9de'
  surface-bright: '#fbf8fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f8'
  surface-container: '#efedf2'
  surface-container-high: '#e9e7ec'
  surface-container-highest: '#e3e2e6'
  on-surface: '#1b1b1f'
  on-surface-variant: '#44464f'
  inverse-surface: '#303034'
  inverse-on-surface: '#f2f0f5'
  outline: '#757780'
  outline-variant: '#c5c6d0'
  surface-tint: '#4a5d90'
  primary: '#334678'
  on-primary: '#ffffff'
  primary-container: '#4b5e91'
  on-primary-container: '#cfd9ff'
  inverse-primary: '#b2c5ff'
  secondary: '#98453b'
  on-secondary: '#ffffff'
  secondary-container: '#ff9789'
  on-secondary-container: '#782d25'
  tertiary: '#58397a'
  on-tertiary: '#ffffff'
  tertiary-container: '#705193'
  on-tertiary-container: '#e9d1ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b2c5ff'
  on-primary-fixed: '#001848'
  on-primary-fixed-variant: '#324576'
  secondary-fixed: '#ffdad5'
  secondary-fixed-dim: '#ffb4aa'
  on-secondary-fixed: '#3f0303'
  on-secondary-fixed-variant: '#7a2e26'
  tertiary-fixed: '#efdbff'
  tertiary-fixed-dim: '#dbb8ff'
  on-tertiary-fixed: '#29074a'
  on-tertiary-fixed-variant: '#573878'
  background: '#fbf8fd'
  on-background: '#1b1b1f'
  surface-variant: '#e3e2e6'
typography:
  h1:
    fontFamily: Noto Serif
    fontSize: 4.5rem
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Noto Serif
    fontSize: 3rem
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Noto Serif
    fontSize: 2rem
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  section-padding: 120px
---

## Brand & Style

This design system is built for high-end creative professionals and studios. It evokes the tranquil, transitionary period of dusk—a moment of clarity, reflection, and quiet sophistication. The brand personality is poised, intellectual, and understated, favoring editorial-grade layouts over aggressive marketing tactics.

The visual style is a blend of **Minimalism** and **Modern Editorial**. It leverages expansive whitespace (the "sky") to let work take center stage, using the deep indigo and sunset coral as high-contrast anchors. The aesthetic response should feel like browsing a premium gallery: airy, expensive, and deeply intentional.

## Colors

The palette is derived from a cinematic sunset. 
- **Primary (#4B5E91):** A deep, dusk indigo used for primary text, structural lines, and steadying elements. It provides better readability and a softer soul than pure black.
- **Secondary (#F28C7F):** A vibrant sunset coral used sparingly for call-to-actions, accents, and highlights.
- **Tertiary (#D8B4FE):** A soft lavender haze used for subtle hover states or background washes.
- **Background (#F8F9FF):** A light lavender-tinted white that prevents the clinical feel of pure white, adding warmth and depth to the canvas.

In the Dark Mode variant, the background shifts to a deep midnight charcoal (#1A1C26), allowing the secondary coral to glow with increased luminescence.

## Typography

This design system uses a classic serif/sans-serif pairing to create a sense of authority and modernity.
- **Headlines:** Noto Serif is utilized for its timeless, literary quality. Large scale h1 and h2 tags should be treated as design elements themselves, often with generous leading and tight letter-spacing.
- **Body & Interface:** Inter provides a functional, neutral contrast. It ensures that technical details and long-form descriptions remain legible and unobtrusive.
- **Labels:** Use uppercase Inter with increased letter spacing for category tags, small captions, and navigation items to create a refined, architectural feel.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop, centering content within a 1280px container to maintain editorial control. 

- **The 8px Rhythm:** All padding and margins are multiples of 8px. 
- **Airy Proportions:** Use significant vertical spacing (120px+) between major sections to evoke the vastness of the horizon. 
- **Asymmetry:** Encourage the use of offset columns (e.g., a 4-column text block next to an 8-column image) to create a dynamic, modern portfolio flow.

## Elevation & Depth

To maintain a minimalist profile, this system avoids traditional heavy shadows. Depth is communicated through:
- **Tonal Layering:** Using the soft lavender (#F8F9FF) for the base and pure white (#FFFFFF) for elevated surfaces like cards.
- **Low-Contrast Outlines:** Elements are defined by thin 1px borders in a muted version of the primary color (10-15% opacity) rather than drop shadows.
- **Glassmorphism:** For navigation bars and floating overlays, use a high-density backdrop blur (20px) with a semi-transparent background color to mimic the atmospheric quality of mist at dusk.

## Shapes

The shape language is "Soft" (0.25rem - 0.75rem radius). While the layout is structural and grid-aligned, the subtle rounding prevents the interface from feeling sharp or aggressive. 

- **Buttons & Small Components:** Use a 4px (0.25rem) radius for a disciplined, professional look.
- **Portfolio Images & Cards:** Use a 12px (0.75rem) radius to soften the visual impact of photography.
- **Interactive States:** Use subtle scale-up transforms (1.02x) rather than heavy color shifts to indicate interactivity.

## Components

- **Buttons:** Primary buttons use a solid indigo (#4B5E91) fill with white text. Secondary buttons use a ghost style with a 1px indigo border. Use "Text Links" with a coral (#F28C7F) underline for an editorial feel.
- **Cards:** Borderless with a very slight background shift or a 1px muted border. Imagery within cards should fill the top area completely.
- **Chips/Tags:** Small, pill-shaped labels using the tertiary lavender background and indigo text, used for project categories.
- **Inputs:** Minimalist bottom-border only or very light ghost-outlined boxes. Focus states should transition the border color to coral.
- **Navigation:** A centered or split-header layout with significant height (80px+). Use the Glassmorphism blur effect on scroll.
- **Project Grid:** A mix of large-scale hero images and smaller supporting shots, emphasizing "negative space" between items.