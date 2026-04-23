# BUILD PLAN
Build plan for the AIAA USF Website project.


## Phases

### Phase 1 — Frontend with Mock Data - Done
Focus: public-facing, simple display pages where the UI is the main unknown.
Backend is not involved. All data comes from mock data files.

**Pages:**
- `/` Landing page
- `/projects` Projects index page
- `/events` Events index page
- `/members` Members index page

**Goal:** Validate the UI, nail the layout and component structure, and prove out the data shapes before committing to a real schema.

---

### Phase 2 — Backend, Auth, and Complex Pages
Focus: finalize the schema, replace mock data with Supabase, then build the detail pages and admin views.

The detail pages are deferred to this phase because they involve relational data (project members with roles, update posts per project) that is too complex and artificial to mock reliably. Building them on a real backend is cleaner.

**Goal:** Ship a fully functional, deployed website with real content managed by club officers.

---

### Steps

#### P2-1 — Auth
- Set up Supabase Auth (invite-based sign-up, officer login/logout)
- write services for Auth
- implement `AuthProvider`, `AuthContext` and `useAuth` (hook)
- write `ProtectedRoute` and wire to `App.tsx`
- add Login page (Public route, path `/login`, lives in `pages/auth/Login.tsx`)
- write `Login.tsx` that uses hook to login

#### P2-2 — Club Info
- Apply schema and RLS for `club_info`
- Write service functions and hook
- Wire real info from database to public club info 
- Write `AdminRoute` & `AdminLayout`
- Admin can view club info at `/admin/club`
- Admin can edit name, cover image, and about text

#### P2-3 — Members
- Apply schema and RLS for `club_members`
- Write service functions and hook
- Replace `useMembers` mock data with Supabase query — public `/members` page stays identical
- Public `/members/:id` detail page (photo, title, bio)
- Admin can view and filter member list at `/admin/members`
- Admin can invite a new member (triggers Supabase invite email)
- New member receives invite link → sets password → completes profile (photo, bio) before accessing dashboard
- Admin can edit a member's role and title
- Admin can remove a member
- Officer can edit own name, photo, and bio at their profile page

#### P2-4 — Events
- Apply schema and RLS for `events`
- Write service functions and hook
- Replace `useEvents` mock data with Supabase query — public `/events` page stays identical
- Public `/events/:id` detail page (description, content, location, time, link)
- Admin can view all events at `/admin/events`
- Admin can create a new event
- Admin can edit or delete any event at `/admin/events/:id`

#### P2-5 — Projects
- Apply schema and RLS for `projects`, `project_members`, `project_posts`, `project_post_comments`
- Write service functions and hooks
- Replace `useProjects` mock data with Supabase query — public `/projects` page stays identical
- Public `/projects/:id` detail page (project info, member list with roles, posts)
- Club admin can view all projects at `/admin/projects`
- Club admin can create, edit, or delete any project
- Club admin can assign members to a project and set their role and title
- Project admin can manage members and posts of their project at `/admin/projects/:id`
- Contributor can view assigned projects at `/contributor/projects`
- Contributor can create, edit, and delete their own posts at `/contributor/projects/:id`
- Contributor can comment on posts in projects they are assigned to

#### P2-6 — Public Launch
- Seed database with real club content (projects, events, members)
- Final QA pass on all public and admin flows
- Redeploy on Vercel
- Announce publicly

---

## Development Strategy
- Develop and ship by features (vertical slices of the scope)

---

## Deployment Strategy

### Soft Launch — end of Phase 1
- Deploy the site with mock data once the 4 index pages are complete and polished
- Share internally with club officers only — not publicly
- Purpose: gather UI feedback early, and have a live URL for the resume before Phase 2 is done
- Platform: Vercel (trivial deployment for Vite + React)

### Public Launch — end of Phase 2
- Redeploy once real Supabase data is wired up and officers can manage content
- Announce publicly and share with the club and university
- By this point the site has real projects, real events, and real members visible
