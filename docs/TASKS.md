# TASKS
Daily log of tasks worked on. One `<details>` block per day, newest on top.


<details>
  <summary>May 16, 2026</summary>

  - Admin Events Page
    - Admin can create new events
    - Admin can edit or delete any event at `/admin/events/:id`
  
  - Sort the events seen at `/admin/events/:id` by time

  - folder structure (architecture) refactor:
    - group by feature (domain) vs. group by attributes (decide)
    - implement

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
