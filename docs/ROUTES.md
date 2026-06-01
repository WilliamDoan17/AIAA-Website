# ROUTES
This document describes the route structure for the AIAA Website.

---

## Structure

Routes are split into two top-level groups in `App.tsx`:
- `/*` — handled by `PublicRoute` (no auth required)
- `/u/*` — handled by `ProtectedRoute` (must be authenticated)

---

## Public Routes

Defined in `src/routes/PublicRoute.tsx`. Wrapped in `PublicLayout` (Navbar + Footer).

| Path | Page | Status |
|------|------|--------|
| `/` | Landing | ✅ |
| `/projects` | Projects index | ✅ |
| `/projects/:id` | Project detail (Info + Members + Posts tabs) | ✅ |
| `/events` | Events index | ✅ |
| `/events/:id` | Event detail | ✅ |
| `/members` | Members index | ✅ |
| `/members/:id` | Member detail (public profile) | ✅ |
| `/login` | Login | ✅ |

---

## Protected Routes

Defined in `src/routes/ProtectedRoute.tsx`. Redirects to `/login` if unauthenticated.

### Admin (`role = 'admin'`)

| Path | Page | Status |
|------|------|--------|
| `/u/admin` | Admin dashboard | ✅ |
| `/u/admin/club` | Edit club info | ✅ |
| `/u/admin/members` | Member list — invite, edit, remove | ✅ |
| `/u/admin/member/:id` | View any member's detail | ✅ |
| `/u/admin/profile` | Edit own profile and password | ✅ |
| `/u/admin/events` | Event list — create, edit, delete | ✅ |
| `/u/admin/projects` | Project list — create, edit, delete | ✅ |
| `/u/admin/projects/:id` | Project detail — manage members | ✅ |
| `/u/admin/projects/:id/posts/:postId` | Post detail with comments | ✅ |

### Officer (`role = 'officer'`, assigned to a project)

| Path | Page | Status |
|------|------|--------|
| `/u/officer` | Officer dashboard | ✅ |
| `/u/officer/projects` | Assigned projects list | ✅ |
| `/u/officer/projects/:id` | Project — write posts, comment | ✅ |
| `/u/officer/projects/:id/posts/:postId` | Post detail with comments | ✅ |
| `/u/officer/profile` | Edit own profile and password | ✅ |
| `/u/officer/member/:id` | View any member's detail | ✅ |

---

## Access Rules

| Route group | Guard |
|-------------|-------|
| Public | None |
| `/u/*` | Must be authenticated — `ProtectedRoute` redirects to `/login` if not |
| `/u/admin/*` | Must have `role = 'admin'` — `AdminRoute` + `AdminLayout` handle role check |
| `/u/officer/*` | Must be authenticated — `OfficerRoute` + `OfficerLayout` handle setup check |
