# ARCHITECTURE
This document describes the structure and conventions of the AIAA Website frontend.

---

## Folder Layout

```
frontend/src/
├── main.jsx                — React entry point
├── App.jsx                 — router + layout composition
├── components/             — shared UI (Navbar, Footer, PageLayout)
├── data/                   — mock data files (Phase 1 only, replaced by hooks in Phase 2)
├── hooks/                  — data-fetching hooks (one per domain)
├── layouts/
│   ├── AdminLayout.jsx     — auth-gated wrapper for admin routes
│   └── OfficerLayout.jsx   — auth-gated wrapper for officer/contributor routes
├── pages/
│   ├── landing/            — `/` landing page
│   ├── projects/           — `/projects` index; Phase 2: detail page
│   ├── events/             — `/events` index; Phase 2: detail page
│   └── members/            — `/members` index; Phase 2: detail page
├── routes/
│   ├── ProtectedRoute.jsx  — redirects unauthenticated users
│   └── PublicRoute.jsx     — redirects authenticated users away from auth pages
└── supabase/
    └── supabase.js         — Supabase client
```

---

## Layers

1. **Pages** — route-level components. Fetch data via hooks, compose section components, own filter state.
2. **Components** — shared UI across pages (`Navbar`, `Footer`, `PageLayout`). Domain-specific cards and containers live under `pages/` for now; move to `components/` as they get reused.
3. **Hooks** — one per domain (`useProjects`, `useEvents`, `useMembers`). Phase 1: return mock data. Phase 2: call Supabase, expose `{ data, loading, error }`.
4. **Layouts** — auth-gated wrappers. `AdminLayout` enforces `role = 'admin'`; `OfficerLayout` enforces any authenticated session.
5. **Supabase client** — single import from `supabase/supabase.js`. Never instantiate the client elsewhere.

---

## Conventions

### Data fetching
- Fetch once at the page level; pass data down as props.
- Never fetch inside cards or child components.
- Phase 1: hooks return mock data directly. Phase 2: hooks query Supabase and expose a loading/error state.

### Filter state
- Filter state is a single object: `{ category: 'all', status: 'all' }`.
- `filterOptions` is derived from data with `useMemo` — never hardcoded.
- Filtered results computed with `useMemo` depending on `[data, filters]`.

### Null image handling
- `cover_image` and `photo` can be null. Always render a placeholder `<div>` instead of a broken `<img>`.

### Routing
- Routes composed in `src/App.jsx`.
- Public pages under no layout wrapper.
- Admin pages nested under `AdminLayout`; officer/contributor pages under `OfficerLayout`.

### Styling
- CSS Modules per component/page.
- Design language: Deep-Space / Mission Control.
- Fonts: Orbitron (headings), DM Sans (body).
- Key CSS variables: `--void: #04060f`, `--accent: #00c8ff`, `--gold: #f0a500`, `--text: #e8eef8`, `--muted: #7a8aaa`.
- Starfield overlay via `::before` pseudo-element on page wrappers.

### Naming
- Pages: `index.jsx` + `index.module.css` inside a named folder (e.g. `pages/projects/`).
- Shared components: `PascalCase.jsx` + `PascalCase.module.css` in `components/`.
