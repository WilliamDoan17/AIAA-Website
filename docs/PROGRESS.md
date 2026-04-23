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
| Set up Supabase Auth (invite-based sign-up, login/logout) | ⬜ |
| Write services for Auth | ⬜ |
| Implement `AuthProvider`, `AuthContext`, and `useAuth` | ⬜ |
| Write `ProtectedRoute` and wire to `App.tsx` | ⬜ |
| Add Login page (`/login`) | ⬜ |

### P2-2 — Club Info

| Task | Status |
|------|--------|
| Apply schema and RLS for `club_info` | ⬜ |
| Write service functions and hook | ⬜ |
| Wire real club info to public pages | ⬜ |
| Write `AdminRoute` and `AdminLayout` | ⬜ |
| Admin can view club info at `/admin/club` | ⬜ |
| Admin can edit name, cover image, and about text | ⬜ |

### P2-3 — Members

| Task | Status |
|------|--------|
| Apply schema and RLS for `club_members` | ⬜ |
| Write service functions and hook | ⬜ |
| Replace `useMembers` mock data with Supabase query | ⬜ |
| Public `/members/:id` detail page | ⬜ |
| Admin can view and filter member list at `/admin/members` | ⬜ |
| Admin can invite a new member | ⬜ |
| Member onboarding flow (set password → complete profile) | ⬜ |
| Admin can edit a member's role and title | ⬜ |
| Admin can remove a member | ⬜ |
| Officer can edit own name, photo, and bio | ⬜ |

### P2-4 — Events

| Task | Status |
|------|--------|
| Apply schema and RLS for `events` | ⬜ |
| Write service functions and hook | ⬜ |
| Replace `useEvents` mock data with Supabase query | ⬜ |
| Public `/events/:id` detail page | ⬜ |
| Admin can view all events at `/admin/events` | ⬜ |
| Admin can create a new event | ⬜ |
| Admin can edit or delete any event at `/admin/events/:id` | ⬜ |

### P2-5 — Projects

| Task | Status |
|------|--------|
| Apply schema and RLS for `projects`, `project_members`, `project_posts`, `project_post_comments` | ⬜ |
| Write service functions and hooks | ⬜ |
| Replace `useProjects` mock data with Supabase query | ⬜ |
| Public `/projects/:id` detail page | ⬜ |
| Club admin can view all projects at `/admin/projects` | ⬜ |
| Club admin can create, edit, or delete any project | ⬜ |
| Club admin can assign members with role and title | ⬜ |
| Project admin can manage members and posts at `/admin/projects/:id` | ⬜ |
| Contributor can view assigned projects at `/contributor/projects` | ⬜ |
| Contributor can create, edit, and delete own posts | ⬜ |
| Contributor can comment on posts in assigned projects | ⬜ |

### P2-6 — Public Launch

| Task | Status |
|------|--------|
| Seed database with real club content | ⬜ |
| Final QA pass on all public and admin flows | ⬜ |
| Redeploy on Vercel | ⬜ |
| Announce publicly | ⬜ |

---

**Last updated:** Wed Apr 23 2026
