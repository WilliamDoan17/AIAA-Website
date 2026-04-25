# AIAA USF — Club Website

The official website for the American Institute of Aeronautics and Astronautics chapter at the University of South Florida. The platform serves as the club's public presence, giving visitors a place to explore the club's active aerospace engineering projects, upcoming events, and team members. Beyond the public-facing side, the site includes a full content management system that allows club officers to manage all club content through a protected admin dashboard without ever touching the codebase.

---

## Who This Is For

**Visitors** — students, faculty, and prospective members who want to learn about the club, see what projects are active, and find upcoming events.

**Officers** — club officers who manage projects, events, and member profiles through a protected dashboard. Access is invite-only — admins onboard new members directly through the platform.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) + TypeScript |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Backend | Supabase (PostgreSQL + Auth) |
| Deployment | Vercel |

---

## Current Status

### Phase 1 — Public Frontend ✅
- Landing, Projects, Events, and Members index pages
- Deep-space design system with custom Tailwind theme
- Soft-launched on Vercel

### Phase 2 — Backend & Auth (in progress)
- ✅ Supabase Auth — invite-based login, protected routes, AuthProvider
- ✅ Login page (`/login`)
- ✅ Club info schema and RLS
- ✅ Club members schema and RLS
- ⬜ Admin dashboard
- ⬜ Member, event, and project management
- ⬜ Public detail pages (`/projects/:id`, `/events/:id`, `/members/:id`)
- ⬜ Public launch

---

## Pages

| Route | Page | Status |
|---|---|---|
| `/` | Landing | ✅ |
| `/projects` | Projects index | ✅ |
| `/events` | Events index | ✅ |
| `/members` | Members index | ✅ |
| `/login` | Login | ✅ |
| `/projects/:id` | Project detail | ⬜ |
| `/events/:id` | Event detail | ⬜ |
| `/members/:id` | Member detail | ⬜ |
| `/admin/*` | Admin dashboard | ⬜ |

---

## How To Run

1. Clone the repository
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`
4. Create a `.env` file with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```
5. Start the dev server: `npm run dev`

---

## Documentation

All project docs live in [`docs/`](./docs/):

| File | Purpose |
|------|---------|
| [SCOPE.md](./docs/SCOPE.md) | Full feature scope by domain |
| [BUILD_PLAN.md](./docs/BUILD_PLAN.md) | Development phases and task breakdown |
| [PROGRESS.md](./docs/PROGRESS.md) | Status of each phase |
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Frontend structure and conventions |
| [SCHEMA.md](./docs/SCHEMA.md) | Database tables, types, and RLS |
| [HOOKS.md](./docs/HOOKS.md) | Custom React hooks |
| [TYPES.md](./docs/TYPES.md) | TypeScript types |
| [PAGES.md](./docs/PAGES.md) | Routes and page-level features |

---

## Contributing

This project is maintained by AIAA USF officers.
For questions or access, contact the current webmaster.
