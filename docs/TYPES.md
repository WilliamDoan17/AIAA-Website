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
| updated_at  | string          | ISO 8601 timestamptz |
| name        | string          |                      |
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

| Field      | Type              | Notes                       |
|------------|-------------------|-----------------------------|
| project_id | string            | uuid, references projects   |
| member_id  | string            | uuid, references auth.users |
| role       | ProjectMemberRole |                             |
| title      | string            |                             |

### ProjectMemberRole
`'admin'` | `'contributor'`

### ProjectMemberInsert
`ProjectMember` (all fields required on insert, no auto-generated fields)

### ProjectMemberUpdate
`Pick<ProjectMember, 'role' | 'title'>` — `project_id` and `member_id` are immutable
