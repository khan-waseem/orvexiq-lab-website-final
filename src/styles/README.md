# Orvexiq Lab Design System Token Architecture

## Overview

The Orvexiq Lab platform uses a strict **3-Tier Token Architecture** mapped directly from Figma (Node `218:261`).

```
Primitive Tokens (primitives.css)
       │
       ▼
Semantic Tokens (semantics.css)
       │
       ▼
Component Tokens (components.css)
       │
       ▼
UI Components (Consumes Component/Semantic CSS Variables via var(--orv-*))
```

---

## Strict Token Usage Rules

1. **NO HARDCODED VISUAL VALUES**:
   - Zero raw hex colors (`#fafafa`, `#080211`), raw pixel margins/paddings (`32px`), corner radii (`16px`), font sizes (`20px`), or backdrop blurs inline inside TSX or CSS component files.
   - All visual styles must reference CSS variables defined in this token system.

2. **Primitive Layer (`primitives.css`)**:
   - Contains raw color values (`--orv-color-raw-dark-900: #080211`), raw typography metrics, spacing scale (4pt/8pt), radiuses, shadows, blurs, and motion easing.
   - Primitive tokens are internal and must NOT be referenced directly by UI components.

3. **Semantic Layer (`semantics.css`)**:
   - Assigns intent to primitives (`--orv-surface-canvas: var(--orv-color-raw-dark-900)`).
   - Serves general layout roles (page margins, gutters, card gaps, text primary/secondary roles).

4. **Component Layer (`components.css`)**:
   - Scopes semantic tokens to specific component contexts (`--orv-nav-height: 83px`, `--orv-button-primary-bg: var(--orv-gradient-primary)`).
   - This is the primary tier consumed by UI components.

---

## Token Inventory Summary

- **Primitive Tokens**: 78 tokens (Colors, Alpha channels, Typography scales, Spacing steps, Radii, Shadows, Blurs, Gradients, Motion)
- **Semantic Tokens**: 26 tokens (Surfaces, Text roles, Borders, Accents, States, Layout grids)
- **Component Tokens**: 34 tokens (Navbar, Buttons, Glass cards, Service cards, Tags, Eyebrows, Testimonials, CTA, Footer)
- **Total Token Count**: 138 token variables
