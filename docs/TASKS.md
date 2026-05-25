# TASKS
Daily log of tasks worked on. One `<details>` block per day, newest on top.

<details>
  <summary>May 25, 2026</summary>

  - split supabase_functions to `TRIGGERS.md`, `FUNCTIONS.md`
  - See others profile (member) on click to: 
    - comments name / profile picture
    - post name / profile picture
  - UI polish:
    - split pages into components for easy management
    - add a dashboard for members
    - change the UI so it makes the unique style for each (members, projects, etc.)
  - Server: 
    - check database implementation for constraints and fix it
    - add column of `updated_at` and update trigger for each db domain
    - take notes of current trigger and trigger functions
  - Seed database with club content

</details>

<details>
  <summary>May 19, 2026</summary>

  - Carried over from May 18 / May 17:

</details>

<details>
  <summary>May 18, 2026</summary>

  - P2-5b — Projects: Posts & Comments ✅
    - Apply schema and RLS for `project_posts`, `project_post_comments` ✅
    - Write types, service functions and hooks for posts and comments ✅
    - Add tab `Posts` to `ProjectDetail` that can fetch to project posts for members (role aware) ✅
    - Create, edit, and delete post (role aware) (uses hooks from `hooks/projects/project-posts.ts`) ✅
    - Fix `ProjectPost` recurring problems (in many commits): ✅
      - Remove Edit buttons from `ProjectPostCard` (split `ProjectPostCard` from `ProjectPostTab`) ✅
      - Types & Services: Create a `ProjectPostDetail` that has author info and rewire hooks & service to use that ✅
      - `ProjectPostCard` now uses `ProjectPostDetail` and has author info, (name, cover_image) ✅
    - `/projects/:id/posts/:postId` — post detail with comments (role-aware) ✅
      - `pages/ProjectPostDetail.tsx` (uses `useProjectPost(postId)` and `hooks/projects/project-post-comments.ts`) ✅
      - `ProjectPostCard` links to `ProjectPostDetail` on click ✅
      - has edit button that turns on the form (no modal, the form replaces the normal appearance of the post) if editable ✅
      - split into components in `/src/components` ✅
      - a comment section that resembles facebook/reddit ✅
      - project members and admin can create comments ✅
      - `CommentCard` has a reply button, a ... button at the side for delete/edit ✅
        - edit uses inline form ✅
        - delete has a modal ✅

  - Carried over from May 17:
    - UI polish:
      - split pages into components for easy management
      - add a dashboard for members
      - change the UI so it makes the unique style for each (members, projects, etc.)
    - check database implementation for constraints and fix it
    - split supabase_functions to `TRIGGERS.md`, `FUNCTIONS.md`
    - add column of `updated_at` and update trigger for each db domain

</details>

<details>
  <summary>May 17, 2026</summary>

  - P2-5a - Projects: Detail & Members
    - Apply schema and RLS for `projects`, `project_members` ✅
      - `projects` schema, trigger, RLS ✅
      - `project_members` schema, trigger, RLS ✅
    - Decided on unified role-aware routes (no separate `/contributor/` routes) ✅
    - Document and implement types for projects and project_members ✅
    - Write service functions and hooks for projects and project_members 
      - Service functions ✅
      - Hooks ✅
    - `PublicProjects` uses `useProjects` instead of mock data ✅
    - Seed database of projects  with mock data ✅
    - Club admin can view all projects at `/admin/projects`  ✅
    - Club admin can create, edit, or delete any project  ✅
    - Public `/projects/:id` detail page ✅
    - Club admin can view project details at `/admin/projects/:id` ✅
    - Club admin can assign members with role and title ✅
    - `/projects/:id/members` — role-aware member tab (project admin manages, contributor reads) ✅
    - Public `/projects/:id` — Info + Members tabs (read-only) ✅
    - Members can view their assigned projects at `/u/officer/projects` ✅

  - UI polish:
    - add a dashboard for members
    - change the UI so it makes the unique style for each (members, projects, etc.)
  - check database implementation for constraints and fix it 
  - split supabase_functions to `TRIGGERS.md`, `FUNCTIONS.md`
  - add column of `updated_at` and update trigger for each db domain

</details>

<details>
  <summary>May 16, 2026</summary>

  - Admin Events Page ✅
    - Admin can create new events ✅
    - Admin can edit or delete any event at `/admin/events/:id` ✅

  - fix time display for cross-day events (public + admin) ✅
    - same-day: `Date · startTime – endTime` ✅
    - cross-day: `Date1, startTime – Date2, endTime` ✅
  
  - Sort events on `/admin/events` by start time, then end time ✅

  - Remove event status column — compute from `start_time` / `end_time` ✅

  - AdminClub refactor ✅
    - Migrate club info to React Query (`hooks/club.ts`) ✅
    - `useClubInfo` — cached, no re-fetch on navigation ✅
    - `useUpdateClubInfo` — invalidates cache after save ✅
    - Drop `ClubInfoProvider`, `ClubInfoContext`, `hooks/useClubInfo.ts` ✅

  - fix event create/edit form showing UTC instead of local time ✅
    - `toDatetimeLocal` converts UTC → local for display ✅
    - `fromDatetimeLocal` converts local → UTC on submit ✅

</details>

<details>
  <summary>May 15, 2026</summary>

  - Refactor the uses of `Routes` and `Layout` ✅
  - Apply schema and RLS for `events` ✅
  - Write service functions and hook for events  
    - Write types for events ✅
    - Write service functions for events ✅
    - Plan on hooks for events using React Query and update the docs ✅
    - Implement hooks for events  ✅

  - naming convention fix: ✅
    - (domain)Input -> (domain)Insert for types ✅
    - add a (domain)Update type using `Partial<(domain)Insert>` for each domain needs it ✅
    - decide naming on (domain) with `s` or no `s` for domain naming files ✅
    - service naming conventions: ✅
      - use byId instead of get(domain)Info (excluding clubInfo) ✅

  - document everything ✅
  - Public Event Detail Page ✅
    - Create a page tsx running at `/events/:id` ✅
    - Add mock data ✅
    - Public Event Cards link to the detail page ✅

  - Admin Events Page
    - Admin can view all events at `/admin/events` ✅

  - fix syncing update profile problem ✅

</details>

<details>
  <summary>May 12, 2026</summary>

  - Hooks now use `@tanstack/react-query` to manage refetch ✅
    - create branch `refactor/tanstack-query-introduction` ✅
    - install `@tanstack/react-query` (+ devtools in dev) ✅
    - set up `QueryClient` and wrap app in `<QueryClientProvider>` in `main.tsx` ✅
    - rename `hooks/useMembers.ts` → `hooks/members.ts`; merge `useMemberInfo` in and delete the old file ✅
    - implement `useMembers`, `useMember(id)`, and `useInviteMember`, `useUpdateMember`, `useDeleteMember` in `hooks/members.ts`  ✅
    - update callsites (`AdminMembers`, `PublicMembers`, `MemberProfile`, `PublicMemberDetail`) to new return shapes; remove manual `refetch` plumbing ✅ 
    - typecheck + manual smoke test (list loads, detail loads, invite refreshes list automatically) ✅
    - rewrite docs: ARCHITECTURE.md, HOOKS.md ✅
</details>

<details>
  <summary>Apr 29, 2026</summary>

  - Member onboarding flow (set password → complete profile) at `/u/profile`
    - Hook for member info (`useMemberInfo`) (use `useEffect`) ✅
    - `resetPassword` service ✅
    - `MemberProfile.tsx` ✅
    - Wire to `ProtectedRoute` ✅
    - Wire to `AdminLayout` ✅
    - edit profile & password ✅
    - Write `OfficerRoute` and `OfficerLayout` ✅
    - Implement `is_setup` to `club_members` ✅
      - update docs ✅
      - Add column `is_setup` ✅
      - RLS can't update `is_setup` (let the server function handle) ✅
      - `MemberInput` excludes `is_setup` ✅
      - Run SQL to update all accounts up to now as `is_setup` = `false` ✅
    - Write Edge Function for reset password ✅
      - Verify current password ✅
      - Update password via admin API ✅
      - Set `is_setup = true` in `club_members` ✅
    - Handle redirection if `member.is_setup` = `false` ✅
    - `SetupGuardModal` — blocks navigation, prompts password reset on first login ✅
    - Update architecture docs for onboarding flow ✅

</details>

<details>
  <summary>Apr 28, 2026</summary>

  - Fix cannot invite member bugs ✅
</details>

<details>
  <summary>Apr 27, 2026</summary>

  - Write service and hook for club_members ✅
  - Add member to `AuthContext` and `AuthProvider` ✅
  - Write `AdminRoute` ✅
  - Admin can view club info at `/admin/club`: ✅
    - Write `AdminClub.tsx` ✅
    - Wire that to `AdminRoute` ✅
  - Admin can edit name, cover image, and about text ✅
  - Replace `useMembers` mock data with Supabase query ✅
  - Public `/members/:id` detail page ✅
  - Admin can view and filter member list at `/admin/members`
    - Rename `Members.tsx` to `PublicMembers.tsx` and apply the same pattern ✅
    - Write `AdminMembers.tsx` ✅
  - Use context and provider for `club_info` ✅ 
  - Admin can view and filter member list at `/admin/members` ✅
  - Admin can invite a new member ✅


</details>

<details>
<summary>Apr 24, 2026</summary>

- Fixed ts errors ✅
- Wire real club info to public pages ✅
- Add phongjesus@gmail.com as an admin ✅

</details>

<details>
<summary>Apr 24, 2026</summary>

- Write `ProtectedRoute` and wire to `App.tsx` ✅
- Refactor folder structure & switch to Tailwind ✅
- Add Login page (`/login`) ✅
  - Implement `Login.tsx` ✅
  - Write `LoginButton` and implement to `NavBar` ✅
- Apply schema and RLS for `club_info` ✅
- Migrate to `TypeScript` ✅

</details>

---

<details>
<summary>Apr 23, 2026</summary>

- set up docs in Fintrack style ✅
- Set up Supabase Auth (invite-based sign-up, login/logout)
  - Turn off new user sign-up ✅
- Write services for Auth (`src/services/auth.js`) ✅
- Implement `AuthProvider`, `AuthContext`, and `useAuth` ✅
  - `AuthContext` ✅
  - `AuthProvider` ✅
  - `useAuth` ✅

</details>
