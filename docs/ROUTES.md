# ROUTES
This document describes the route structure for the AIAA Website.

---

## Structure

Routes are split into two top-level groups in `App.jsx`:
- `/*` — handled by `PublicRoute` (no auth required)
- `/u/*` — handled by `ProtectedRoute` (must be authenticated)

---

## Public Routes

Defined in `src/routes/PublicRoute.jsx`. Wrapped in `PageLayout` (Navbar + Footer).

| Path | Page | Status |
|------|------|--------|
| `/` | Landing | ✅ |
| `/projects` | Projects index | ✅ |
| `/events` | Events index | ✅ |
| `/members` | Members index | ✅ |
| `/projects/:id` | Project detail | Phase 2 |
| `/events/:id` | Event detail | Phase 2 |
| `/members/:id` | Member detail | Phase 2 |
| `/login` | Login | Phase 2 |

---

## Protected Routes

Defined in `src/routes/ProtectedRoute.jsx`. Redirects to `/login` if unauthenticated.

### Admin (`role = 'admin'`)

| Path | Page | Status |
|------|------|--------|
| `/u/admin/club` | Edit club info | Phase 2 |
| `/u/admin/members` | Member list — invite, edit, remove | Phase 2 |
| `/u/admin/projects` | Project list — create, edit, delete | Phase 2 |
| `/u/admin/projects/:id` | Project detail — manage members, posts | Phase 2 |
| `/u/admin/events` | Event list — create, edit, delete | Phase 2 |
| `/u/admin/events/:id` | Event detail — edit | Phase 2 |

### Contributor (`role = 'officer'`, assigned to a project)

| Path | Page | Status |
|------|------|--------|
| `/u/contributor/projects` | Assigned projects list | Phase 2 |
| `/u/contributor/projects/:id` | Project — write posts, comment | Phase 2 |

---

## Access Rules

| Route group | Guard |
|-------------|-------|
| Public | None |
| `/u/*` | Must be authenticated — `ProtectedRoute` redirects to `/login` if not |
| `/u/admin/*` | Must have `role = 'admin'` — `AdminLayout` handles role check |
| `/u/contributor/*` | Must be authenticated and assigned to project — `OfficerLayout` handles check |
