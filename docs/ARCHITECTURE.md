# ARCHITECTURE
This document describes the structure and conventions of the AIAA Website frontend.

---

## Folder Layout

```
frontend/src/
├── main.tsx                — React entry point
├── App.tsx                 — router + provider composition
├── components/             — shared UI (Navbar, Footer)
├── contexts/
│   ├── AuthContext.ts      — { user, member, loading }
│   └── ClubInfoContext.ts  — { clubInfo, loading }
├── hooks/                  — thin wrappers around contexts and services
│   ├── useAuth.ts
│   ├── useClubInfo.ts
│   ├── useEvents.ts
│   ├── useMembers.ts
│   └── useProjects.ts
├── layouts/
│   ├── AdminLayout.tsx     — sidebar + outlet for admin routes
│   ├── OfficerLayout.tsx   — layout for officer/contributor routes
│   └── PublicLayout.tsx    — Navbar + Footer + outlet for public routes
├── pages/                  — one file per route, prefixed by audience
│   ├── Landing.tsx
│   ├── Login.tsx
│   ├── PublicEvents.tsx
│   ├── PublicMembers.tsx
│   ├── PublicMemberDetail.tsx
│   ├── PublicProjects.tsx
│   ├── AdminClub.tsx
│   └── AdminMembers.tsx
├── providers/
│   ├── AuthProvider.tsx    — fetches session + club_members row on auth change
│   └── ClubInfoProvider.tsx — fetches club_info once at app level
├── routes/
│   ├── AdminRoute.tsx      — role guard for admin pages
│   ├── ProtectedRoute.tsx  — auth guard, role-based index redirect
│   └── PublicRoute.tsx     — public pages
├── services/               — Supabase query functions, one file per domain
│   ├── auth.ts
│   ├── club.ts
│   └── members.ts
├── supabase/
│   └── supabase.ts         — Supabase client (single instance)
└── types/
    ├── auth.ts
    ├── club.ts
    ├── event.ts
    ├── member.ts
    └── project.ts

supabase/functions/
└── invite-member/
    └── index.ts            — Edge Function: create auth user + insert club_members row
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
- Tailwind CSS utility classes for all new components and pages.
- Existing Phase 1 pages retain their CSS Modules — migrate incrementally.
- Design language: Deep-Space / Mission Control.
- Fonts: Orbitron (headings), DM Sans (body).
- Key CSS variables: `--void: #04060f`, `--accent: #00c8ff`, `--gold: #f0a500`, `--text: #e8eef8`, `--muted: #7a8aaa`.
- Starfield overlay via `::before` pseudo-element on page wrappers.

### Naming
- Pages: `index.jsx` + `index.module.css` inside a named folder (e.g. `pages/projects/`).
- Shared components: `PascalCase.jsx` + `PascalCase.module.css` in `components/`.
