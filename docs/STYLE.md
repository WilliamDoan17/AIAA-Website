# STYLE

Design language: **Deep-Space / Mission Control** — dark backgrounds, cyan accent, gold highlights, aerospace typography.

---

## Fonts

| Token         | Family              | Usage                              |
|---------------|---------------------|------------------------------------|
| `font-display`| Orbitron            | Headings, labels, nav, logo        |
| `font-body`   | DM Sans             | Body text, form fields, paragraphs |

- Display: `font-semibold` or `font-bold`, `tracking-wide` or `tracking-widest`, `uppercase` for labels/nav
- Body: `font-normal` or `font-medium` for most text, `text-sm` for secondary content

---

## Color Tokens

| Token          | Value                    | Usage                                      |
|----------------|--------------------------|--------------------------------------------|
| `bg-void`      | `#04060f`                | Page background                            |
| `bg-deep`      | `#080d1f`                | Section backgrounds                        |
| `bg-panel`     | `#0c1228`                | Sidebar, panels                            |
| `bg-surface`   | `#111827`                | Cards, inputs                              |
| `border-rim`   | `#1a2743`                | Borders, dividers                          |
| `text-accent`  | `#00c8ff`                | Active states, highlights, links           |
| `bg-accent-dim`| `rgba(0,200,255,0.15)`   | Hover fills, active nav backgrounds        |
| `text-gold`    | `#f0a500`                | President/special highlights               |
| `text-copy`    | `#e8eef8`                | Primary text                               |
| `text-muted`   | `#7a8aaa`                | Secondary text, placeholders, idle nav     |

---

## Custom CSS Classes

These are defined in `index.css` and used alongside Tailwind:

| Class                  | Effect                                                    |
|------------------------|-----------------------------------------------------------|
| `starfield`            | Fixed multi-dot star background via `::before`            |
| `heading-gradient`     | White → accent gradient text                              |
| `section-underline`    | Cyan gradient underline after heading via `::after`       |
| `section-underline-gold` | Gold gradient underline variant                         |
| `card-accent`          | Cyan left bar that grows to full height on hover          |
| `cta-btn`              | Accent fill slides in on hover, text flips to void        |
| `member-glow`          | Radial accent glow appears on hover via `::after`         |
| `president-bar`        | Gold left bar (static, full height)                       |
| `navbar`               | Top accent line via `::before`                            |
| `nav-link`             | Muted → copy color + accent underline slide-in on hover   |
| `logo-text`            | White → accent gradient text, reverses on hover           |
| `footer-wrap`          | Bottom glow + top accent line via pseudo-elements         |
| `fade-up`              | `fadeSlideUp` 0.6s animation                              |
| `fade-up-slow`         | `fadeSlideUp` 0.9s animation                              |
| `fade-up-slow-d1`      | `fadeSlideUp` 0.9s with 0.15s delay                       |
| `fade-up-slow-d2`      | `fadeSlideUp` 0.9s with 0.3s delay                        |

---

## Patterns

### Page wrapper
```tsx
<div className="min-h-screen bg-void text-copy starfield">
```

### Section heading
```tsx
<h2 className="font-display text-xl font-semibold tracking-wide text-copy section-underline">
```

### Form label
```tsx
<label className="font-body text-xs font-medium text-muted uppercase tracking-widest">
```

### Input / Textarea
```tsx
<input className="bg-surface border border-rim rounded px-4 py-2.5 text-sm font-body text-copy placeholder-muted focus:outline-none focus:border-accent transition-colors duration-200" />
```

### Primary button (CTA)
```tsx
<button className="relative overflow-hidden px-6 py-2.5 rounded border border-accent text-accent text-sm font-body font-medium tracking-wide cta-btn transition-colors duration-200">
```

### Card
```tsx
<div className="relative bg-surface border border-rim rounded-lg p-5 card-accent overflow-hidden">
```

### Active nav link (sidebar)
```tsx
// active:   bg-accent-dim text-accent
// inactive: text-muted hover:text-copy hover:bg-rim
```

### Navbar link
```tsx
<NavLink className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] relative pb-1 nav-link" />
```

---

## Layout

- Admin: fixed left sidebar (`w-56 bg-panel border-r border-rim`) + scrollable `<main className="flex-1 overflow-auto px-8 py-8">`
- Public: full-width with top `Navbar` (fixed, `h-16`) and `Footer`
- Max content width on admin forms: `max-w-2xl`
- Section spacing: `gap-6` between form fields, `mb-8` after page headings

---

## Conventions

- Never use raw hex values in JSX — use the token classes above
- `font-display` for anything structural (headings, labels, nav); `font-body` for content
- Borders are always `border-rim`; focused inputs use `focus:border-accent`
- Disabled states: `disabled:opacity-50 disabled:cursor-not-allowed`
- Transitions: `transition-colors duration-200` as the default
