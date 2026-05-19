# TYPES

Shared data types used across hooks, services, and components. Derived from the database schema and current mock data.

---

## ClubInfo
`src/types/club.ts`

| Field       | Type   | Notes                |
|-------------|--------|----------------------|
| id          | string | uuid                 |
| name        | string |                      |
| cover_image | string | url or storage ref   |
| about       | string |                      |

---

## Member
`src/types/members.ts`

| Field      | Type        | Notes                  |
|------------|-------------|------------------------|
| id         | string      | uuid, references auth  |
| created_at | string      | ISO 8601 timestamptz   |
| email      | string      |                        |
| name       | string      |                        |
| role       | ClubRole    |                        |
| title      | string      |                        |
| photo      | string      | url or storage ref     |
| bio        | string      |                        |
| is_setup   | boolean     |                        |

### ClubRole
`'admin'` | `'officer'`

### MemberInsert
`Omit<Member, 'id' | 'created_at' | 'is_setup'>`

### MemberUpdate
`Partial<MemberInsert>`

---

## Event
`src/types/events.ts`

| Field       | Type         | Notes                  |
|-------------|--------------|------------------------|
| id          | string       | uuid                   |
| created_at  | string       | ISO 8601 timestamptz   |
| name        | string       |                        |
| description | string       |                        |
| content     | string       |                        |
| cover_image | string       | url or storage ref     |
| location    | string       |                        |
| url         | string\|null |                        |
| start_time  | string       | ISO 8601 timestamptz   |
| end_time    | string       | ISO 8601 timestamptz   |

> Status (`upcoming` | `ongoing` | `completed`) is computed client-side from `start_time` and `end_time`.

### EventInsert
`Omit<Event, 'id' | 'created_at'>`

### EventUpdate
`Partial<EventInsert>`

---

## Project
`src/types/projects/projects.ts`

| Field       | Type            | Notes                |
|-------------|-----------------|----------------------|
| id          | string          | uuid                 |
| created_at  | string          | ISO 8601 timestamptz |
| name        | string          |                      |
| updated_at  | string          | ISO 8601 timestamptz |
| summary     | string          |                      |
| description | string          |                      |
| cover_image | string          | url or storage ref   |
| status      | ProjectStatus   |                      |
| category    | ProjectCategory |                      |

### ProjectStatus
`'not_started'` | `'in_progress'` | `'paused'` | `'completed'`

### ProjectCategory
`'competition'` | `'research'`

### ProjectInsert
`Omit<Project, 'id' | 'created_at' | 'updated_at'>`

### ProjectUpdate
`Partial<ProjectInsert>`

---

## ProjectMember
`src/types/projects/project-members.ts`

Raw DB record — used for insert/update operations.

| Field      | Type              | Notes                       |
|------------|-------------------|-----------------------------|
| project_id | string            | uuid, references projects   |
| member_id  | string            | uuid, references auth.users |
| role       | ProjectMemberRole |                             |
| title      | string            |                             |

### ProjectMemberRole
`'admin'` | `'contributor'`

### ProjectMemberDetail
`ProjectMember` + `member: Member` — enriched type returned by `getMembersByProjectId`. Used for display; includes the full club member profile nested under `member`.

### ProjectMemberInsert
`ProjectMember` (all fields required on insert, no auto-generated fields)

### ProjectMemberUpdate
`Pick<ProjectMember, 'role' | 'title'>` — `project_id` and `member_id` are immutable

## ProjectPost
`src/types/projects/project-posts.ts`

### ProjectPost

| Field      | Type   | Notes                              |
|------------|--------|------------------------------------|
| id         | string | uuid                               |
| project_id | string | uuid, references projects          |
| author_id  | string | uuid, references club_members      |
| title      | string |                                    |
| content    | string |                                    |
| created_at | string | ISO 8601 timestamptz               |
| updated_at | string | ISO 8601 timestamptz               |

### ProjectPostDetail
`ProjectPost` + `author: Member` — enriched type returned by `getProjectPostsByProjectId` and `getProjectPostById`. Used for display; includes the full club member profile nested under `author`.

### ProjectPostInsert
`Omit<ProjectPost, 'id' | 'created_at' | 'updated_at'>`

### ProjectPostUpdate
`Pick<ProjectPost, 'title' | 'content'>`

---

## ProjectPostComment
`src/types/projects/project-post-comments.ts`

### ProjectPostComment

Raw DB record — used for insert/update operations.

| Field       | Type        | Notes                                       |
|-------------|-------------|---------------------------------------------|
| id          | string      | uuid                                        |
| post_id     | string      | uuid, references project_posts              |
| author_id   | string      | uuid, references club_members               |
| content     | string      |                                             |
| reply_to_id | string\|null | uuid, references project_post_comments     |
| created_at  | string      | ISO 8601 timestamptz                        |
| updated_at  | string      | ISO 8601 timestamptz                        |

### ProjectPostCommentDetail
`ProjectPostComment` + `author: Member` — enriched type returned by `getCommentsByPostId` and `getProjectPostCommentById`. Used for display; includes the full club member profile nested under `author`.

### ProjectPostCommentInsert
`Omit<ProjectPostComment, 'id' | 'created_at' | 'updated_at'>` — `reply_to_id` is optional (null when not a reply)

### ProjectPostCommentUpdate
`Pick<ProjectPostComment, 'content'>`
