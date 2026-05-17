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

## Club Info (`hooks/club.ts`)

All club hooks use **TanStack Query**.

Query key: `['clubInfo']`

### `useClubInfo`
| Return | Type                    | Notes                    |
|--------|-------------------------|--------------------------|
| data   | ClubInfo \| undefined   | Cached, no reload on nav |
| isLoading | boolean              |                          |

### `useUpdateClubInfo`
| Prop      | Type                              |
|-----------|-----------------------------------|
| mutationFn | `updateClubInfo(updates)`        |
| onSuccess | invalidates `['clubInfo']`        |

---

## Members (`hooks/members.ts`)

All member hooks use **TanStack Query**. Mutations invalidate the relevant cache entries instead of triggering manual refetches.

Query keys:
- List: `['members']`
- Single: `['members', id]`

### `useMembers`
Fetches all club members.

| Return     | Type               | Notes                   |
|------------|--------------------|-------------------------|
| data       | Member\[]          | undefined while loading |
| isLoading  | boolean            |                         |
| isError    | boolean            |                         |
| error      | Error \| null      |                         |

### `useMember(id)`
Fetches a single member by id.

| Return     | Type                  | Notes |
|------------|-----------------------|-------|
| data       | Member \| undefined   |       |
| isLoading  | boolean               |       |
| isError    | boolean               |       |

### `useInviteMember`
Invites a new member via the `invite-member` edge function. Invalidates `['members']` (list only) on success.

```tsx
const { mutate: invite, isPending, error } = useInviteMember()
invite(info)   // info: MemberInsert
```

### `useUpdateMember`
Updates a member's fields. Invalidates all `['members']` queries (list + any cached details) on success.

```tsx
const { mutate: update, isPending, error } = useUpdateMember()
update({ id, updates })   // updates: MemberUpdate
```

### `useDeleteMember`
Deletes a member. Invalidates all `['members']` queries on success.

```tsx
const { mutate: remove, isPending, variables } = useDeleteMember()
remove(id)
// variables holds the id passed to the in-flight mutation — useful for per-row pending UI
```

---

## Events (`hooks/events.ts`)

All event hooks use **TanStack Query**. Mutations invalidate the relevant cache entries on success.

Query keys:
- List: `['events']`
- Single: `['events', id]`

### `useEvents`
Fetches all events.

| Return     | Type              | Notes                   |
|------------|-------------------|-------------------------|
| data       | Event\[]          | undefined while loading |
| isLoading  | boolean           |                         |
| isError    | boolean           |                         |
| error      | Error \| null     |                         |

### `useEvent(id)`
Fetches a single event by id.

| Return     | Type                | Notes |
|------------|---------------------|-------|
| data       | Event \| undefined  |       |
| isLoading  | boolean             |       |
| isError    | boolean             |       |

### `useCreateEvent`
Creates a new event. Invalidates `['events']` (list only) on success.

```tsx
const { mutate: create, isPending, error } = useCreateEvent()
create(info)   // info: EventInsert
```

### `useUpdateEvent`
Updates an event's fields. Invalidates all `['events']` queries (list + any cached details) on success.

```tsx
const { mutate: update, isPending, error } = useUpdateEvent()
update({ id, updates })   // updates: EventUpdate
```

### `useDeleteEvent`
Deletes an event. Invalidates all `['events']` queries on success.

```tsx
const { mutate: remove, isPending, variables } = useDeleteEvent()
remove(id)
```

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
