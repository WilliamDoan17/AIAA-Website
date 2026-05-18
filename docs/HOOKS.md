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

## Projects (`hooks/projects/projects.ts`)

All project hooks use **TanStack Query**. Mutations invalidate the relevant cache entries on success.

Query keys:
- List: `['projects']`
- By member: `['projects', 'member', memberId]`
- Single: `['projects', id]`

### `useProjects`
Fetches all projects.

| Return    | Type            | Notes                   |
|-----------|-----------------|-------------------------|
| data      | Project\[]      | undefined while loading |
| isLoading | boolean         |                         |
| isError   | boolean         |                         |
| error     | Error \| null   |                         |

### `useMemberProjects(memberId)`
Fetches all projects a member is assigned to.

| Return    | Type            | Notes |
|-----------|-----------------|-------|
| data      | Project\[]      |       |
| isLoading | boolean         |       |
| isError   | boolean         |       |

### `useProject(id)`
Fetches a single project by id.

| Return    | Type                  | Notes |
|-----------|-----------------------|-------|
| data      | Project \| undefined  |       |
| isLoading | boolean               |       |
| isError   | boolean               |       |

### `useCreateProject`
Creates a new project. Invalidates `['projects']` (list only) on success.

```tsx
const { mutate: create, isPending, error } = useCreateProject()
create(info)   // info: ProjectInsert
```

### `useUpdateProject`
Updates a project's fields. Invalidates all `['projects']` queries on success.

```tsx
const { mutate: update, isPending, error } = useUpdateProject()
update({ id, updates })   // updates: ProjectUpdate
```

### `useDeleteProject`
Deletes a project. Invalidates all `['projects']` queries on success.

```tsx
const { mutate: remove, isPending, variables } = useDeleteProject()
remove(id)
```

---

## Project Members (`hooks/projects/project-members.ts`)

All project member hooks use **TanStack Query**.

Query key:
- By project: `['projectMembers', projectId]`

### `useProjectMembers(projectId)`
Fetches all members of a project.

| Return    | Type                  | Notes |
|-----------|-----------------------|-------|
| data      | ProjectMember\[]      |       |
| isLoading | boolean               |       |
| isError   | boolean               |       |

### `useAddProjectMember`
Adds a club member to a project. Invalidates `['projectMembers', projectId]` on success.

```tsx
const { mutate: add, isPending, error } = useAddProjectMember()
add(info)   // info: ProjectMemberInsert
```

### `useUpdateProjectMember`
Updates a project member's role or title. Invalidates `['projectMembers', projectId]` on success.

```tsx
const { mutate: update, isPending, error } = useUpdateProjectMember()
update({ projectId, memberId, updates })   // updates: ProjectMemberUpdate
```

### `useRemoveProjectMember`
Removes a member from a project. Invalidates `['projectMembers', projectId]` on success.

```tsx
const { mutate: remove, isPending, variables } = useRemoveProjectMember()
remove({ projectId, memberId })
```

---

## Project Posts (`hooks/projects/project-posts.ts`)

All project post hooks use **TanStack Query**.

Query keys:
- By project: `['projectPosts', projectId]`
- Single: `['projectPosts', postId]`

### `useProjectPosts(projectId)`
Fetches all posts for a project, ordered newest first.

| Return    | Type               | Notes |
|-----------|--------------------|-------|
| data      | ProjectPost\[]     |       |
| isLoading | boolean            |       |
| isError   | boolean            |       |

### `useProjectPost(postId)`
Fetches a single post by id.

| Return    | Type                      | Notes |
|-----------|---------------------------|-------|
| data      | ProjectPost \| undefined  |       |
| isLoading | boolean                   |       |
| isError   | boolean                   |       |

### `useCreateProjectPost`
Creates a new post. Invalidates `['projectPosts', projectId]` on success.

```tsx
const { mutate: create, isPending, error } = useCreateProjectPost()
create(info)   // info: ProjectPostInsert
```

### `useUpdateProjectPost`
Updates a post's title or content. Invalidates `['projectPosts', postId]` and `['projectPosts', projectId]` on success.

```tsx
const { mutate: update, isPending, error } = useUpdateProjectPost()
update({ postId, updates })   // updates: ProjectPostUpdate
```

### `useDeleteProjectPost`
Deletes a post. Invalidates `['projectPosts', projectId]` on success.

```tsx
const { mutate: remove, isPending, variables } = useDeleteProjectPost()
remove({ postId, projectId })
```

---

## Project Post Comments (`hooks/projects/project-post-comments.ts`)

All project post comment hooks use **TanStack Query**.

Query keys:
- By post: `['projectPostComments', postId]`
- Single: `['projectPostComments', commentId]`

### `useProjectPostComments(postId)`
Fetches all comments for a post, ordered oldest first (chronological thread order).

| Return    | Type                        | Notes |
|-----------|-----------------------------|-------|
| data      | ProjectPostCommentDetail\[] |       |
| isLoading | boolean                     |       |
| isError   | boolean                     |       |

### `useProjectPostComment(commentId)`
Fetches a single comment by id. Used when rendering a reply target.

| Return    | Type                                   | Notes |
|-----------|----------------------------------------|-------|
| data      | ProjectPostCommentDetail \| undefined  |       |
| isLoading | boolean                                |       |
| isError   | boolean                                |       |

### `useCreateProjectPostComment`
Creates a comment. Pass `reply_to_id` in `info` to create a reply. Invalidates `['projectPostComments', postId]` on success.

```tsx
const { mutate: create, isPending, error } = useCreateProjectPostComment()
create(info)   // info: ProjectPostCommentInsert (reply_to_id: null | string)
```

### `useUpdateProjectPostComment`
Updates a comment's content. Invalidates `['projectPostComments', postId]` on success.

```tsx
const { mutate: update, isPending, error } = useUpdateProjectPostComment()
update({ commentId, postId, updates })   // updates: ProjectPostCommentUpdate
```

### `useDeleteProjectPostComment`
Deletes a comment. Invalidates `['projectPostComments', postId]` on success.

```tsx
const { mutate: remove, isPending, variables } = useDeleteProjectPostComment()
remove({ commentId, postId })
```
