---
name: Midnight Tech
colors:
  surface: '#0e1416'
  surface-dim: '#0e1416'
  surface-bright: '#343a3c'
  surface-container-lowest: '#090f11'
  surface-container-low: '#161d1e'
  surface-container: '#1a2122'
  surface-container-high: '#242b2d'
  surface-container-highest: '#2f3638'
  on-surface: '#dde4e5'
  on-surface-variant: '#bbc9cd'
  inverse-surface: '#dde4e5'
  inverse-on-surface: '#2b3233'
  outline: '#859397'
  outline-variant: '#3c494c'
  surface-tint: '#2fd9f4'
  primary: '#8aebff'
  on-primary: '#00363e'
  primary-container: '#22d3ee'
  on-primary-container: '#005763'
  inverse-primary: '#006877'
  secondary: '#b9c8de'
  on-secondary: '#233143'
  secondary-container: '#39485a'
  on-secondary-container: '#a7b6cc'
  tertiary: '#cfdef7'
  on-tertiary: '#233144'
  tertiary-container: '#b3c2da'
  on-tertiary-container: '#425064'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a2eeff'
  primary-fixed-dim: '#2fd9f4'
  on-primary-fixed: '#001f25'
  on-primary-fixed-variant: '#004e5a'
  secondary-fixed: '#d4e4fa'
  secondary-fixed-dim: '#b9c8de'
  on-secondary-fixed: '#0d1c2d'
  on-secondary-fixed-variant: '#39485a'
  tertiary-fixed: '#d5e3fd'
  tertiary-fixed-dim: '#b9c7e0'
  on-tertiary-fixed: '#0d1c2f'
  on-tertiary-fixed-variant: '#3a485c'
  background: '#0e1416'
  on-background: '#dde4e5'
  surface-variant: '#2f3638'
typography:
  headline-xl:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  section-gap: 80px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system is engineered for high-end technical portfolios, emphasizing precision, intellectual depth, and digital craftsmanship. The aesthetic is rooted in **Modern Minimalism**, utilizing expansive negative space and a strict typographic hierarchy to convey authority. By pairing a traditional serif with a high-energy neon accent, the system strikes a balance between timeless professional credibility and cutting-edge innovation. 

The emotional objective is to evoke a sense of "quiet power"—a professional environment that is calm and focused, yet punctuated by bursts of technical vibrancy.

## Colors
The palette is anchored by a deep navy foundation that provides a more sophisticated depth than pure black. The primary accent, **Electric Cyan (#22D3EE)**, is used sparingly but strategically for interactive elements and key highlights to ensure maximum visual impact against the dark backdrop. 

- **Primary:** Electric Cyan for calls to action, focus states, and data visualization.
- **Base:** Deep Navy (#0B1326) for the primary canvas.
- **Surface:** Slightly lighter slate-navy tones for cards and section differentiation.
- **Typography:** High-contrast off-white (#F8FAFC) for readability, with slate-gray for secondary information.

## Typography
This design system utilizes a sophisticated typographic pairing to differentiate between narrative content and functional UI. 

**Noto Serif** is reserved for headlines and editorial moments, providing a classic, authoritative feel that suggests expertise. **Inter** is used for all functional UI elements, body text, and labels, ensuring maximum legibility and a clean, technical appearance. Use tight letter-spacing for large headlines to maintain a modern edge, and generous line-height for body text to facilitate long-form reading on dark backgrounds.

## Layout & Spacing
The layout follows a **Fixed Grid** model for desktop to ensure a controlled, gallery-like presentation of portfolio work. A 12-column system is used with generous gutters to maintain a clean, minimalist feel. 

Spacing follows a strict 8px baseline grid. Section vertical spacing is intentionally large (80px+) to allow the typography and work samples room to breathe, preventing the dark interface from feeling cramped or overwhelming.

## Elevation & Depth
Depth is achieved through **Tonal Layers** and **Low-Contrast Outlines** rather than traditional shadows. 

In this design system, surfaces "lift" by becoming slightly lighter in color (moving from #0B1326 to #111A2E). Interactive cards and containers should use a 1px border in a muted slate (#1E293B) to define edges. For the primary accent, a subtle outer glow (0px 0px 15px rgba(34, 211, 238, 0.3)) can be applied to buttons or active indicators to simulate a tech-forward, emissive display.

## Shapes
The shape language is "Soft" (Level 1), utilizing subtle 4px corner radii. This approach maintains the professional rigor of sharp-edged minimalism while making the interface feel modern and engineered. 

Avoid fully circular "pill" shapes for buttons; instead, use the standard 4px radius to keep the silhouette architectural. Icons should follow a "linear" style with consistent 2px stroke weights to match the precision of the typography.

## Components
- **Buttons:** Primary buttons use a solid Electric Cyan background with black text for maximum contrast. Secondary buttons are "ghost" style with a 1px slate border and white text.
- **Cards:** Use a slightly elevated surface color (#111A2E) with a 1px border. On hover, the border color transitions to Electric Cyan.
- **Chips/Tags:** Small, low-contrast slate backgrounds with uppercase Inter labels. Active tags use a subtle cyan underline.
- **Inputs:** Darker background than the surface, with a 1px border that glows Electric Cyan upon focus.
- **Project Grid:** Large-scale imagery paired with Noto Serif titles. Metadata (date, role) should use the Inter label-sm style.
- **Navigation:** Fixed top-bar with a backdrop blur (Glassmorphism) effect to maintain context while scrolling through deep content.