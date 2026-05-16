# SERVICES

Supabase and related backend services for the AIAA-Website.

---

## auth
`src/services/auth.ts`

- `login(email, password)` -> `void` : login with email and password
- `logout()` -> `void` : logout current user

---

## club_info
`src/services/clubInfo.ts`

- `getClubInfo()` -> `ClubInfo` : get club info
- `updateClubInfo(updates: Partial<ClubInfo>)` -> `void` : update club info (admin only)

---

## members
`src/services/members.ts`

- `getAllMembers()` -> `Member[]` : get all members
- `getMemberById(id: string)` -> `Member` : get a member by id (admin can get all, officer can only get their own)
- `inviteMember(info: MemberInsert)` -> `void` : calls Edge Function `invite-member` (admin only)
- `updateMember(id: string, updates: MemberUpdate)` -> `void` : update a member (admin can update all, officer can only update their own)
- `deleteMember(id: string)` -> `void` : delete a member (admin only)

---

## events
`src/services/events.ts`

- `getAllEvents()` -> `Event[]` : get all events
- `getEventById(id: string)` -> `Event` : get an event by id
- `createEvent(info: EventInsert)` -> `void` : create a new event
- `updateEvent(id: string, updates: EventUpdate)` -> `void` : update an event
- `deleteEvent(id: string)` -> `void` : delete an event

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
