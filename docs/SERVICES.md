# SERVICES (suggestion)

This file will document Supabase and related backend services for the AIAA-Website. For each service, describe its role, integration details, and endpoint structure.

## auth
`src/services/auth.ts`

- login(email, password) -> `void` : Login with email and password
- logout() -> `void` : Logout of current user

## club_info
`src/services/clubInfo.ts`
- getClubInfo() -> `ClubInfo` : get club info
- updateClubInfo(updates: `Partial<ClubInfo>`): update club info (admin-only)

## members 
`src/services/members.ts`

- getAllMembers() -> `Member[]`: get all members
- getMemberInfo(id: string) -> `Member`: get member info (admin can get all, or officer can read their own)
- inviteMember(info: `MemberInput`) -> `void`: calls Edge Function `invite-member` (see below)
- updateMember(id, updates: `Partial<Member>`) -> `void`: update member info (admin can update all, or officer can only update their own)
- deleteMember(id) -> `void`: delete member (admin only)

---

## Edge Functions

### `invite-member`
`supabase/functions/invite-member/index.ts`

Creates a new auth user and inserts a `club_members` row. Must be called server-side via `supabase.functions.invoke` since it requires the `service_role` key.

**Flow:**
1. Verify caller JWT and check `club_members` role is `admin`
2. `supabase.auth.admin.createUser({ email, password: DEFAULT_PASSWORD, email_confirm: true })`
3. Insert row into `club_members` with the returned user id
4. If insert fails, delete the auth user (rollback)

**Payload:** `{ email, name, role, title, photo, bio }`

**Secrets required:**
- `SUPABASE_URL` — auto-injected
- `SUPABASE_SERVICE_ROLE_KEY` — auto-injected
- `DEFAULT_PASSWORD` — shared default password, set manually in Supabase → Edge Functions → Secrets

**Notes:**
- `email_confirm: true` skips email confirmation — account is active immediately
- Admin shares the default password with the new member out-of-band (e.g. Slack)
- Member should change their password after first login

