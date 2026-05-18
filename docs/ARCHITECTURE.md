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
│   └── AuthContext.ts      — { user, member, loading }
├── hooks/                  — data access hooks, one file per resource domain
│   ├── club.ts             — useClubInfo, useUpdateClubInfo
│   ├── members.ts          — useMembers, useMember, useInviteMember, useUpdateMember, useDeleteMember
│   ├── events.ts           — useEvents, useEvent, useCreateEvent, useUpdateEvent, useDeleteEvent
│   ├── useAuth.ts          — reads AuthContext
│   ├── useProjects.ts      — fetches projects from Supabase (pre-TanStack, to be migrated)
│   └── projects/           — TanStack Query hooks for projects domain
│       ├── projects.ts
│       └── project-members.ts
├── layouts/
│   ├── AdminLayout.tsx     — sidebar + outlet for admin routes
│   ├── OfficerLayout.tsx   — layout for officer/contributor routes
│   └── PublicLayout.tsx    — Navbar + Footer + outlet for public routes
├── pages/                  — one file per route, prefixed by audience
│   ├── Landing.tsx
│   ├── Login.tsx
│   ├── MemberProfile.tsx   — edit profile + reset password (admin & officer)
│   ├── PublicEvents.tsx
│   ├── PublicMembers.tsx
│   ├── PublicMemberDetail.tsx
│   ├── PublicProjects.tsx
│   ├── AdminClub.tsx
│   └── AdminMembers.tsx
├── providers/
│   ├── AuthProvider.tsx    — fetches session + club_members row on auth change
│   └── QueryProvider.tsx   — configures and provides the TanStack QueryClient
├── routes/
│   ├── AdminRoute.tsx      — role guard for admin pages
│   ├── OfficerRoute.tsx    — role guard for officer pages
│   ├── ProtectedRoute.tsx  — auth guard, is_setup guard, role-based index redirect
│   └── PublicRoute.tsx     — public pages
├── services/               — Supabase query functions, one file per domain
│   ├── auth.ts
│   ├── club.ts
│   ├── members.ts
│   ├── events.ts
│   └── projects/
│       ├── projects.ts
│       └── project-members.ts
├── supabase/
│   └── supabase.ts         — Supabase client (single instance)
└── types/
    ├── auth.ts
    ├── club.ts
    ├── members.ts
    ├── events.ts
    ├── projects.ts             — re-exports from projects/
    └── projects/
        ├── projects.ts
        └── project-members.ts
```

---

## Onboarding Flow

When an admin invites a new member via `invite-member`, the member is created with `is_setup = false` and a default password.

On first login:
1. `AuthProvider` fetches the `club_members` row — `is_setup` is `false`
2. `ProtectedRoute` detects `!member.is_setup` and shows `SetupGuardModal`
3. The modal blocks navigation and prompts the user to reset their password
4. On success, `reset-password` edge function updates the password and sets `is_setup = true`
5. `refetchMember()` updates the context — modal dismisses, user proceeds normally

---

## Layers

1. **Pages** — route-level components. Fetch data via hooks, compose section components, own filter/UI state.
2. **Components** — shared UI across pages (`Navbar`, `Footer`). Domain-specific cards and modals live inside `pages/` until reused.
3. **Hooks** — one file per resource domain. `club.ts`, `members.ts`, `events.ts`, and the `projects/` folder use TanStack Query for caching and mutation management. `useAuth` reads from `AuthContext`. `useProjects.ts` is a legacy hook (useState + useEffect) to be replaced by `projects/projects.ts`.
4. **Layouts** — auth-gated wrappers. `AdminLayout` enforces `role = 'admin'`; `OfficerLayout` enforces any authenticated session.
5. **Services** — plain async functions that call Supabase. No React. Used directly by hooks as `queryFn`/`mutationFn`. Never import the Supabase client outside of services.
6. **Providers** — `QueryProvider` wraps the entire app and holds the `QueryClient`. `AuthProvider` sits inside it.

---

## Data Fetching

### Server state (TanStack Query)
Resources that live on the server (`members`) use TanStack Query hooks. This provides:
- Automatic caching with a 1-minute stale time
- Cache invalidation after mutations instead of manual refetch calls
- Shared cache across all components — no prop-drilling `refetch`

Query key shape for members:
- List: `['members']`
- Single: `['members', id]`

`invalidateQueries({ queryKey: ['members'], exact: true })` targets the list only.
`invalidateQueries({ queryKey: ['members', id] })` targets one member's detail.

### Context state
Auth session is fetched once by `AuthProvider` and exposed via `AuthContext`. This doesn't use TanStack Query because it's driven by Supabase auth events, not polling.

`club_info` uses TanStack Query (`['clubInfo']`) — cached on first fetch, invalidated after `useUpdateClubInfo` mutates.

### Filter state
- Filter state is local `useState` inside the page that owns it.
- `filterOptions` derived from data with `useMemo` — never hardcoded.
- Filtered results computed with `useMemo` depending on `[data, filters]`.

---

## Conventions

### Null image handling
`photo` can be null. Always render a placeholder `<div>` instead of a broken `<img>`.

### Routing
Routes composed in `App.tsx`. Public pages under `PublicRoute`; admin pages nested under `AdminRoute` + `AdminLayout`; officer pages under `OfficerRoute` + `OfficerLayout`.

### Styling
- Tailwind CSS utility classes throughout.
- Design language: Deep-Space / Mission Control.
- Fonts: Orbitron (headings), DM Sans (body).
- Key CSS variables: `--void: #04060f`, `--accent: #00c8ff`, `--gold: #f0a500`, `--text: #e8eef8`, `--muted: #7a8aaa`.
- Starfield overlay via `::before` pseudo-element on page wrappers.
