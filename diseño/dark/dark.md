---
name: Midnight Clarity
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#dac0c9'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#a28a93'
  outline-variant: '#544249'
  surface-tint: '#ffafd3'
  primary: '#ffafd3'
  on-primary: '#620040'
  primary-container: '#f472b6'
  on-primary-container: '#6d0047'
  inverse-primary: '#a43073'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#b9c8de'
  on-tertiary: '#233143'
  tertiary-container: '#91a0b5'
  on-tertiary-container: '#283748'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd8e7'
  primary-fixed-dim: '#ffafd3'
  on-primary-fixed: '#3d0026'
  on-primary-fixed-variant: '#85145a'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#d4e4fa'
  tertiary-fixed-dim: '#b9c8de'
  on-tertiary-fixed: '#0d1c2d'
  on-tertiary-fixed-variant: '#39485a'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  headline-xl:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Noto Serif
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Noto Serif
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
This design system embodies an aesthetic of "Midnight Clarity"—a sophisticated, high-contrast approach to dark mode that prioritizes legibility and serenity. It is designed for premium editorial platforms, luxury portfolios, or high-end news applications where the content requires a focused, quiet atmosphere.

The style is a fusion of **Modern Minimalism** and **Tonal Layering**. It avoids the harshness of pure black backgrounds, opting instead for deep, atmospheric indigos that provide a softer canvas for high-contrast typography. The visual language is poised and intellectual, evoking the feeling of a high-end print magazine read under soft moonlight. Every element is intentional, utilizing generous whitespace (or "darkspace") to ensure the interface never feels crowded or noisy.

## Colors
The palette is anchored by deep, nocturnal tones that establish a sense of depth and permanence. The primary background uses a rich indigo-slate (#0F172A), while secondary surfaces utilize a lighter slate (#1E293B) to create natural hierarchy through tonal elevation rather than heavy shadows.

The coral accent (#F472B6) serves as the "spark" within the darkness. It is used sparingly for primary actions, critical highlights, and active states to maintain its potency. Text is rendered in high-contrast off-whites and cool grays to ensure AAA accessibility while reducing eye strain. This color strategy relies on the contrast between the warmth of the coral and the icy coolness of the indigo base.

## Typography
The typography is the soul of this design system. **Noto Serif** is used for both headlines and body copy to achieve an elegant, editorial rhythm. Its classic letterforms provide a humanistic touch that balances the coldness of the dark UI. 

Headlines are set with tight tracking and aggressive line heights to feel like architectural elements on the page. Body text utilizes generous line spacing to ensure long-form reading is effortless against the dark background. For functional clarity, **Inter** is introduced as a secondary typeface for utility labels, buttons, and navigation elements. Using a clean sans-serif for metadata and labels creates a "structural" frame around the more expressive serif content.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model. Content is contained within a maximum width of 1280px to prevent line lengths from becoming unreadable on ultra-wide displays. A 12-column grid is employed with wide gutters (24px) to emphasize the editorial feel.

Spacing is governed by a strict 8px linear scale. Large vertical margins (stack-lg) are encouraged between sections to maintain the "serene" brand promise. Elements should feel as though they have room to breathe, avoiding dense clusters of information. Use centered layouts for landing experiences and asymmetrical grids for content-heavy pages to mimic high-end magazine layouts.

## Elevation & Depth
In this design system, depth is communicated through **Tonal Layers** rather than traditional drop shadows. The background is divided into three primary tiers:
1.  **Base (Level 0):** #0F172A – The foundation for the entire viewport.
2.  **Surface (Level 1):** #1E293B – Used for cards, modals, and navigation bars.
3.  **Overlay (Level 2):** #334155 – Reserved for hover states or elements that require immediate attention.

To enhance the "Midnight" aesthetic, a subtle **Backdrop Blur** (12px to 20px) is applied to floating elements like navigation bars and dropdowns, allowing the deep indigo background colors to bleed through elegantly. Borders are kept minimal, using a low-opacity slate (#94A3B8 at 15% opacity) to define edges without creating visual clutter.

## Shapes
The shape language is disciplined and professional. A **Soft (Level 1)** roundedness is applied to all UI components. This subtle 4px (0.25rem) radius takes the "edge" off the high-contrast interface without making it feel overly playful or "bubbly."

-   **Buttons & Inputs:** 4px radius for a crisp, architectural look.
-   **Cards & Large Containers:** 8px (rounded-lg) to provide a gentle distinction from the background.
-   **Image Containers:** Should remain sharp (0px) or use the 4px radius to maintain the editorial, photographic feel. 
The goal is to maintain structural integrity while ensuring the interface feels approachable and modern.

## Components
-   **Buttons:** Primary buttons are filled with the Coral accent (#F472B6) with dark indigo text for maximum contrast. Secondary buttons use a "Ghost" style—transparent backgrounds with a subtle slate border and white text.
-   **Chips:** Small, pill-shaped tags using the Surface color (#1E293B) with Coral text for active states or Slate text for neutral states.
-   **Input Fields:** Minimalist design with a bottom-border only or a very subtle dark-fill. Focus states are indicated by the border transforming into the Coral accent.
-   **Cards:** Tonal cards (#1E293B) with no shadows. Use a 1px border (#94A3B8 at 10% opacity) to define the perimeter against the base background.
-   **Lists:** Divided by thin, elegant lines with generous padding. Hover states should trigger a subtle background shift to Level 2 elevation.
-   **Additional Components:** This system benefits from **Pull Quotes** (large Noto Serif italic text) and **Full-Bleed Image Spacers** to break up text-heavy layouts and lean into the editorial narrative.