---
name: GXC Precision Systems
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e3e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#44474e'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#465f87'
  primary: '#00091b'
  on-primary: '#ffffff'
  primary-container: '#002045'
  on-primary-container: '#7089b3'
  inverse-primary: '#aec7f5'
  secondary: '#745a25'
  on-secondary: '#ffffff'
  secondary-container: '#ffdb9a'
  on-secondary-container: '#795f29'
  tertiary: '#000b05'
  on-tertiary: '#ffffff'
  tertiary-container: '#002617'
  on-tertiary-container: '#579476'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#aec7f5'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#2e476e'
  secondary-fixed: '#ffdea4'
  secondary-fixed-dim: '#e4c282'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5a430f'
  tertiary-fixed: '#b1f0ce'
  tertiary-fixed-dim: '#95d4b3'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#0e5138'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e3e2e2'
  surface-base: '#fcf9f8'
  surface-glass-light: rgba(255, 255, 255, 0.85)
  surface-glass-dark: rgba(26, 54, 93, 0.95)
  accent-teal: '#6eab8c'
  gradient-start: '#d6e3ff'
typography:
  display:
    fontFamily: Inter
    fontSize: 72px
    fontWeight: '600'
    lineHeight: '1.05'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  base: 8px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  container-max: 1440px
---

## Brand & Style

GXC Precision Systems embodies a **Corporate Modern** aesthetic infused with **Glassmorphism** and **Ambient Depth**. The brand personality is authoritative yet technologically advanced, targeting local service industries that require high-reliability operations software. 

The visual strategy balances heavy, stable typography with airy, translucent interface layers. It uses a "Workspace" metaphor where primary tasks are elevated on glass panels against a soft, expansive background. The emotional goal is to evoke a sense of "organized intelligence"—transforming chaotic manual processes into a calm, automated, and high-performance flow.

## Colors

The palette is anchored by **Deep Navy (#002045)**, providing a foundation of professional trust. This is contrasted against a warm, off-white **Surface Base (#fcf9f8)** to avoid the clinical feel of pure white. 

- **Primary:** Used for headlines, heavy action buttons, and core branding.
- **Secondary (Gold):** Used sparingly for status indicators or secondary decorative accents.
- **Tertiary (Deep Green):** Reserved for "Qualified" or "Success" states, indicating growth and positive outcomes.
- **Glass Surfaces:** Two tiers of transparency—a light frost for secondary widgets and a deep navy blur for main workspace containers.
- **Gradients:** A subtle radial gradient (`#d6e3ff` to `#fcf9f8`) is used in hero backgrounds to create a sense of infinite, clean space.

## Typography

The system relies exclusively on **Inter** to maintain a technical, systematic appearance. 

Visual hierarchy is achieved through tight tracking on display sizes and generous line heights for body text. **Italicized Primary text** within headlines is used as a stylistic device to emphasize key results. Labels utilize uppercase styling with increased letter spacing (0.05em) for category headers and status chips.

## Layout & Spacing

The system follows a **Fixed Grid** philosophy for large screens, centering content within a `1440px` container. 

- **Vertical Rhythm:** Uses an 8px base unit. Sections are separated by `xl` (80px) spacing. 
- **Internal Spacing:** Components use `md` (24px) for internal padding to maintain an airy, premium feel.
- **Hero Composition:** Utilizes a "Layered Stack" approach where elements overlap to create depth, rather than adhering to a strict linear column flow.
- **Mobile Adaptivity:** Breakpoints at 768px (Tablet) and 1024px (Desktop). On mobile, the `xl` padding reduces to `md`, and complex overlapping layers reflow into a single-column vertical stack.

## Elevation & Depth

Depth is the primary driver of the GXC interface. It uses three specific tiers:

1.  **Base Layer:** The gradient background with blurred decorative orbs.
2.  **Glass Panels:** Medium elevation (Z-index 30-40). Uses `backdrop-filter: blur(12px)` and semi-transparent backgrounds to suggest objects floating above the base.
3.  **Active Elevation:** Components currently in focus or "active" states (like high-priority leads) use **Ambient Shadows** (`0 32px 64px -16px rgba(0, 32, 69, 0.12)`) and **Active Glows** (colored box-shadows) to draw immediate attention.

Borders are kept thin and low-contrast (`outline-variant/10`) to ensure the blur and shadow do the heavy lifting of separation.

## Shapes

The shape language is **Rounded and Organic**. 

- **Standard Buttons & Inputs:** Use `rounded-xl` (1.5rem / 24px) to feel modern and tactile.
- **Main Panels:** Use a larger `rounded-[32px]` radius to emphasize the "container" nature of the workspace.
- **Chips & Badges:** Use `full` (pill-shaped) rounding for high-speed identification of status.
- **Icon Containers:** Use `rounded-2xl` (1rem) for a square-ish but soft aesthetic.

## Components

### Buttons
- **Primary:** Solid `#002045`, white text, `rounded-xl`. High-shadow on hover.
- **Secondary (Ghost):** Translucent white with a thin border, emphasizing the glass effect.
- **Icon Action:** Square `14x14` ratio with `rounded-xl` borders and centered Material Symbols.

### Cards & Containers
- **Main Workspace:** Dark glass with a distinct top-border stroke.
- **Activity Cards:** Light glass panels. Hovering triggers a subtle scale-up and shadow increase.
- **Status Badges:** Color-coded backgrounds (Tertiary for Success, Secondary for Pending) with heavy tracking on label-sm text.

### Inputs & Lists
- **Lead Items:** Rounded tiles with a status indicator (dot). The "New" state uses a subtle border-left accent.
- **Detail View:** Uses `surface-container-low` with 50% opacity to group related data points inside a larger card.

### Interactive Elements
- **Floating Animations:** Key visual elements should utilize a slow `floating-anim` (6-7s duration) to suggest a living, breathing system.
- **Active Indicators:** Pulsing "glow" shadows on critical status dots to signify real-time activity.