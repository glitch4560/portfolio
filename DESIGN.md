# Design system

Dark editorial. One accent, hairline rules, serif display type, no boxes with
hard shadows. Replaces the neobrutalist system the site launched with.

## Tokens

Defined in `tailwind.config.js`, mirrored as CSS variables in `src/index.css`.

| Token | Value | Use |
|---|---|---|
| `ground` | `#0A0A0B` | page background |
| `surface` | `#141417` | visual panels; sections use `bg-surface/40` to lift |
| `fg` | `#F2F1ED` | primary text |
| `muted` | `#87878A` | mono labels, secondary text |
| `line` | `rgba(242,241,237,.09)` | every rule and border |
| `line-strong` | `rgba(242,241,237,.18)` | hover borders |
| `accent` | `#E9B949` | one accent, used sparingly |

## Type

- **Display** — Instrument Serif. Headings only. Italic is the single flourish,
  used on the second line of the hero name and of the contact heading.
- **UI** — Inter Tight, weight 300–400. Body copy runs light at 15–20px.
- **Labels** — JetBrains Mono, 10–11px, uppercase, `0.22em` tracking. This is
  the `.label` component class and it carries the technical register.

## Rules

- Borders are always 1px `line`. No 2px borders, no offset shadows, no blur.
- Sections separate with `border-t border-line`, not with colour blocks.
- Accent appears at most twice per viewport.
- Layout hangs off `.shell` (max 1320px, responsive padding). Do not set
  padding on sections directly.

## Motion

`src/lib/motion.js` holds the shared easing (`cubic-bezier(0.16, 1, 0.3, 1)`)
and durations. Scroll reveals fire once, via `src/components/ui/Reveal.jsx`.
Every animated component checks `useReducedMotion` and renders its final state
when motion is reduced — nothing on the page depends on an animation running.

## Project visuals

`src/components/visuals/` holds one generated SVG per project. They are drawn
from deterministic maths, never `Math.random`, so they are identical on every
render. Register a new one in `src/components/visuals/index.js` and point a
project's `visual` key at it in `src/data/content.js`.

## Editing content

All copy lives in `src/data/content.js`. Nothing else should need touching to
change text, projects, skills or links.
