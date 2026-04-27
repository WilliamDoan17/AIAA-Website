# TYPES

Shared data types used across hooks, services, and components. Derived from the database schema and current mock data.

---

## ClubInfo

| Field       | Type   | Notes                |
|-------------|--------|----------------------|
| id          | string | uuid                 |
| name        | string |                      |
| cover_image | string | url or storage ref   |
| about       | string |                      |

---

## Member

| Field      | Type        | Notes                  |
|------------|-------------|------------------------|
| id         | string      | uuid, references auth  |
| created_at | string      | ISO 8601 timestamptz   |
| name       | string      |                        |
| role       | ClubRole    |                        |
| title      | string      |                        |
| photo      | string\|null | url or storage ref    |
| bio        | string      |                        |

### ClubRole
`'admin'` | `'officer'`

### MemberInput
`Omit<Member, 'id' | 'created_at'`

---

## Event

| Field       | Type         | Notes                  |
|-------------|--------------|------------------------|
| id          | string       | uuid                   |
| created_at  | string       | ISO 8601 timestamptz   |
| name        | string       |                        |
| summary     | string       |                        |
| description | string       |                        |
| cover_image | string\|null  | url or storage ref     |
| location    | string       |                        |
| url         | string\|null  |                        |
| start_time  | string       | ISO 8601 timestamptz   |
| end_time    | string       | ISO 8601 timestamptz   |
| status      | EventStatus  |                        |

### EventStatus
`'upcoming'` | `'ongoing'` | `'completed'`

---

## Project

| Field       | Type            | Notes                |
|-------------|-----------------|----------------------|
| id          | string          | uuid                 |
| created_at  | string          | ISO 8601 timestamptz |
| name        | string          |                      |
| summary     | string          |                      |
| description | string          |                      |
| cover_image | string\|null     | url or storage ref   |
| status      | ProjectStatus   |                      |
| category    | ProjectCategory |                      |

### ProjectStatus
`'not_started'` | `'in_progress'` | `'paused'` | `'completed'`

### ProjectCategory
`'competition'` | `'research'`
