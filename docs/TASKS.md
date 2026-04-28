# TASKS
Daily log of tasks worked on. One `<details>` block per day, newest on top.

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
