# HOOKS

Custom React hooks for data access. Hooks are grouped by domain — one file per resource.

---

## Auth

### `useAuth`
Reads from `AuthContext` (provided by `AuthProvider`).

| Return  | Type           | Notes                                   |
|---------|----------------|-----------------------------------------|
| user    | User \| null   | Supabase user object, null if guest     |
| member  | Member \| null | club_members row for the logged-in user |
| loading | boolean        | true while session is resolving         |

> Backed by `supabase.auth.onAuthStateChange` — updates reactively on login/logout.

---

## Club Info

### `useClubInfo`
Reads from `ClubInfoContext` (provided by `ClubInfoProvider`).

| Return   | Type             | Notes                          |
|----------|------------------|--------------------------------|
| clubInfo | ClubInfo \| null | Fetched once at app level      |
| loading  | boolean          |                                |

---

## Members (`hooks/members.ts`)

All member hooks use **TanStack Query**. Queries are cached for 1 minute (`staleTime: 60s`). Mutations invalidate the relevant cache entries instead of triggering manual refetches.

Query keys:
- List: `['members']`
- Single: `['members', id]`

### `useMembers`
Fetches all club members.

| Return     | Type     | Notes                              |
|------------|----------|------------------------------------|
| data       | Member[] | undefined while loading            |
| isLoading  | boolean  |                                    |
| isError    | boolean  |                                    |
| error      | Error \| null |                               |

### `useMember(id)`
Fetches a single member by id.

| Return     | Type          | Notes                   |
|------------|---------------|-------------------------|
| data       | Member \| undefined |                   |
| isLoading  | boolean       |                         |
| isError    | boolean       |                         |

### `useInviteMember`
Invites a new member via the `invite-member` edge function. Invalidates `['members']` (list only) on success.

```tsx
const { mutate: invite, isPending, error } = useInviteMember()
invite(info)   // info: MemberInput
```

### `useUpdateMember`
Updates a member's fields. Invalidates `['members', id]` (that member's detail) on success.

```tsx
const { mutate: update, isPending, error } = useUpdateMember()
update({ id, updates })   // updates: Partial<Member>
```

### `useDeleteMember`
Deletes a member. Invalidates `['members']` (full prefix — list + any cached details) on success.

```tsx
const { mutate: remove, isPending, variables } = useDeleteMember()
remove(id)
// variables holds the id passed to the in-flight mutation — useful for per-row pending UI
```

---

## Events

### `useEvents`
Fetches all events from Supabase.

| Return  | Type    | Notes |
|---------|---------|-------|
| data    | Event[] |       |
| loading | boolean |       |
| error   | Error \| null | |

> Uses `useState` + `useEffect`. Not yet migrated to TanStack Query.

---

## Projects

### `useProjects`
Fetches all projects from Supabase.

| Return  | Type      | Notes |
|---------|-----------|-------|
| data    | Project[] |       |
| loading | boolean   |       |
| error   | Error \| null | |

> Uses `useState` + `useEffect`. Not yet migrated to TanStack Query.
