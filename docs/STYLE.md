# STYLE

Design language: **WattVision** — Power BI-style data dashboard running on a deep-space color palette. Dark, precise, minimal chrome. Data first.

---

## Fonts

| Token         | Family              | Usage                              |
|---------------|---------------------|------------------------------------|
| `font-display`| Inter SemiBold      | Headings, labels, nav, section titles |
| `font-body`   | Inter Regular       | Body text, form fields, paragraphs |
| `font-mono`   | JetBrains Mono      | KPI values, stat numbers, metrics  |

- Display: `font-semibold`, moderate tracking (`tracking-wide` max), uppercase only for nav/label chips
- Body: `font-normal` or `font-medium` for most text, `text-sm` for secondary content
- Mono: `font-bold` for metric values

---

## Color Tokens

Colors remain in the deep-space palette — the WattVision shift is about shape, typography, and effects, not hue.

| Token          | Value                    | Usage                                      |
|----------------|--------------------------|--------------------------------------------|
| `bg-void`      | `#04060f`                | Page background                            |
| `bg-deep`      | `#080d1f`                | Section backgrounds                        |
| `bg-panel`     | `#0c1228`                | Sidebar, panels                            |
| `bg-surface`   | `#111827`                | Cards, inputs                              |
| `border-rim`   | `#1a2743`                | Borders, dividers                          |
| `text-accent`  | `#00c8ff`                | Active states, highlights, links           |
| `bg-accent-dim`| `rgba(0,200,255,0.15)`   | Hover fills, active nav backgrounds        |
| `text-gold`    | `#f0a500`                | Special highlights, ongoing status         |
| `text-copy`    | `#e8eef8`                | Primary text                               |
| `text-muted`   | `#7a8aaa`                | Secondary text, placeholders, idle nav     |

---

## Custom CSS Classes

Defined in `index.css`. Only the classes below exist — all aerospace FX have been removed.

| Class                    | Effect                                                      |
|--------------------------|-------------------------------------------------------------|
| `section-underline`      | 2px accent-color underline after heading via `::after`      |
| `section-underline-gold` | 2px gold underline variant                                  |
| `nav-link`               | Muted → copy color + accent underline slide-in on hover     |
| `alert-bar`              | Left 4px red border + dark red bg for error/alert blocks    |
| `kpi-value`              | JetBrains Mono, bold, large — for stat/metric numbers       |

**Removed from previous version:** `starfield`, `hero-glow`, `hero-line`, `heading-gradient`, `card-accent`, `member-glow`, `president-bar`, `cta-btn`, `logo-text`, `footer-wrap`, `fade-up*`

---

## Patterns

### Page wrapper
```tsx
<div className="min-h-screen bg-void text-copy">
```

### Section heading
```tsx
<h2 className="font-display text-xl font-semibold tracking-wide text-copy section-underline">
```

### Form label
```tsx
<label className="font-body text-xs font-medium text-muted uppercase tracking-wide">
```

### Input / Textarea
```tsx
<input className="bg-surface border border-rim rounded-xl px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200" />
```

### Primary button
```tsx
<button className="px-5 py-2.5 rounded-xl bg-accent text-void text-sm font-display font-semibold hover:bg-accent/90 transition-colors duration-200">
```

### Secondary button
```tsx
<button className="px-5 py-2.5 rounded-xl border border-rim text-muted text-sm font-body hover:text-copy hover:bg-surface transition-colors duration-200">
```

### Card (admin row)
```tsx
<div className="flex items-center gap-4 bg-surface border border-rim rounded-2xl px-5 py-4 hover:bg-surface/80 transition-colors duration-200">
```

### Card (public / feature)
```tsx
<div className="bg-panel border border-rim rounded-2xl overflow-hidden transition-[border-color] duration-200 hover:border-accent/40">
```

### Status / category badge (pill)
```tsx
<span className="rounded-full px-3 py-0.5 text-xs font-medium border">
```

### KPI stat card
```tsx
<div className="bg-surface border border-rim rounded-2xl px-6 py-5">
  <p className="font-body text-xs text-muted uppercase tracking-wide">Label</p>
  <p className="kpi-value">42</p>
</div>
```

### Modal overlay + panel
```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm">
  <div className="bg-panel border border-rim rounded-2xl w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
```

### Active nav link (sidebar)
```tsx
// active:   bg-accent-dim text-accent
// inactive: text-muted hover:text-copy hover:bg-surface
```

### Navbar link
```tsx
<NavLink className="font-display text-[0.7rem] font-semibold uppercase tracking-wide relative pb-1 nav-link" />
```

### Alert / error block
```tsx
<div className="alert-bar px-4 py-3 text-sm font-body text-red-400">
  Error message here
</div>
```

---

## Layout

- Admin: fixed left sidebar (`w-56 bg-panel border-r border-rim`) + scrollable `<main className="flex-1 overflow-auto px-8 py-8">`
- Public: full-width with top `Navbar` (fixed, `h-16`) and `Footer`
- Max content width on admin forms: `max-w-2xl`
- Section spacing: `gap-6` between form fields, `mb-8` after page headings
- Border radius convention: `rounded-2xl` for cards/modals, `rounded-xl` for inputs/buttons, `rounded-full` for badges/avatars

---

## Conventions

- Never use raw hex values in JSX — use the token classes above
- `font-display` for structural elements (headings, labels, nav); `font-body` for content; `font-mono` for numbers/metrics
- Borders are always `border-rim`; focused inputs use `focus:border-accent`
- Disabled states: `disabled:opacity-50 disabled:cursor-not-allowed`
- Transitions: `transition-colors duration-200` as the default
- No decorative pseudo-element backgrounds on pages (no starfield, no glows)
- Badges are always pill-shaped (`rounded-full`), never `clip-path` polygons
- Buttons have solid fills — no slide animations
