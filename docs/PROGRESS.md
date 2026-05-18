# AIAA Website Progress

---

## Phase 1 — Frontend with Mock Data

| Task | Status |
|------|--------|
| Landing page | ✅ |
| Projects index page | ✅ |
| Events index page | ✅ |
| Members index page | ✅ |
| Soft launch (Vercel, internal) | ✅ |

---

## Phase 2 — Backend, Auth, and Complex Pages

### P2-1 — Auth

| Task | Status |
|------|--------|
| Set up Supabase Auth (invite-based sign-up, login/logout) | ✅ |
| Write services for Auth | ✅ |
| Implement `AuthProvider`, `AuthContext`, and `useAuth` | ✅ |
| Write `ProtectedRoute` and wire to `App.tsx` | ✅ |
| Add Login page (`/login`) | ✅ |

### P2-2 — Club Info

| Task | Status |
|------|--------|
| Apply schema and RLS for `club_info` | ✅ |
| Write service functions and hook | ✅ |
| Wire real club info to public pages | ✅ |

### P2-3 — Members

| Task | Status |
|------|--------|
| Apply schema and RLS for `club_members` | ✅ |
| Write service functions and hook | ✅  |
| Write `AdminRoute` and `AdminLayout` | ✅ |
| Add `phongjesus@gmail.com` as `admin` | ✅  |
| Admin can view club info at `/admin/club` | ✅ |
| Admin can edit name, cover image, and about text | ✅ |
| Replace `useMembers` mock data with Supabase query | ✅ |
| Public `/members/:id` detail page | ✅ |
| Admin can view and filter member list at `/admin/members` | ✅ |
| Admin can invite a new member | ✅ |
| Member onboarding flow (set password → complete profile) at `/u/profile` | ✅ |
| `SetupGuardModal` — force password reset on first login | ✅ |
| Write `OfficerRoute` and `OfficerLayout` | ✅ |
| Admin can edit a member's role and title | ✅ |
| Admin can remove a member | ✅ |
| Officer can edit own name, photo, and bio | ✅ |
| RLS: block `is_setup` writes from client, block self-update of `title` for non-admins | ✅ |

### P2-4 — Events

| Task | Status |
|------|--------|
| Apply schema and RLS for `events` | ✅ |
| Write service functions and hook | ✅ |
| Replace `useEvents` mock data with Supabase query | ✅ |
| Public `/events/:id` detail page | ✅ |
| Admin can view all events at `/admin/events` | ✅ |
| Admin can create a new event | ✅ |
| Admin can edit or delete any event at `/admin/events/:id` | ✅ |

### P2-5a — Projects: Detail & Members

| Task | Status |
|------|--------|
| Apply schema and RLS for `projects`, `project_members` | ✅ |
| Write service functions and hooks for projects and project_members | ✅ |
| Replace `useProjects` mock data with Supabase query | ✅ |
| Public `/projects/:id` detail page (Info + Members tabs) | ✅ |
| Club admin can view all projects at `/admin/projects` | ✅ |
| Club admin can create, edit, or delete any project | ✅ |
| Club admin can view and edit project details at `/admin/projects/:id` | ✅ |
| Club admin can assign members with role and title | ✅ |
| `/projects/:id/members` — role-aware member tab (project admin manages, contributor reads) | ✅ |
| Members can view their assigned projects at `/u/officer/projects` | ✅ |

### P2-5b — Projects: Posts & Comments

| Task | Status |
|------|--------|
| Apply schema and RLS for `project_posts`, `project_post_comments` | ⬜ |
| Write service functions and hooks for posts and comments | ⬜ |
| `/projects/:id/posts` — role-aware post list (project admin full control, contributor own posts only) | ⬜ |
| `/projects/:id/posts/:postId` — post detail with comments | ⬜ |
| Contributor can comment on posts in assigned projects | ⬜ |

### P2-6 — Public Launch

| Task | Status |
|------|--------|
| Seed database with real club content | ⬜ |
| Final QA pass on all public and admin flows | ⬜ |
| Redeploy on Vercel | ⬜ |
| Announce publicly | ⬜ |

---

**Last updated:** Tue Apr 29 2026
