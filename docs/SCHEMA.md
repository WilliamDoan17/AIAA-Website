# SCHEMA

This document details the data model, validations, and access (RLS) controls for the AIAA Website database.

---

## club_info

### Schema
| Field        | Type    | Notes                        |
|--------------|---------|------------------------------|
| id           | uuid    | primary key, auto-generated  |
| name         | text    | not null, not empty          |
| cover_image  | text    | not null, default ''         |
| about        | text    | not null, default ''         |

### RLS
- **SELECT**: none
- INSERT: nobody can insert
- UPDATE: admin only
- DELETE: nobody can delete

---

## club_members

### Schema
| Field      | Type             | Notes                              |
|------------|------------------|------------------------------------|
| id         | uuid             | primary key, references auth.users |
| email      | text             | not null, not empty                |
| name       | text             | not null, not empty                |
| role       | club_role enum   | not null, default 'officer'        |
| title      | text             | not null, not empty                |
| photo      | text             | nullable                           |
| bio        | text             | not null, default ''               |
| created_at | timestamptz      | not null, default now()            |

> `club_role`: `admin` | `officer`

### Field Validation
| Field      | Validation                                    |
|------------|-----------------------------------------------|
| email      | valid email, not empty, unique                |
| name       | not empty, 2–64 chars, UTF-8 printable        |
| role       | enum constraint                               |
| title      | not empty, 2–48 chars                         |
| photo      | valid URL or storage ref                      |
| bio        | max 2048 chars, strip HTML                    |
| created_at | auto-generated, no user input                 |

### RLS Policies
- SELECT: authenticated users
- INSERT: admin only
- UPDATE: admin, or user updates own name, photo, bio
- DELETE: admin only

---

## projects

### Schema — projects
| Field       | Type                  | Notes                       |
|-------------|-----------------------|-----------------------------|
| id          | uuid                  | primary key, auto-generated |
| name        | text                  | not null, not empty         |
| summary     | text                  | not null, not empty         |
| description | text                  | not null, not empty         |
| cover_image | text                  | nullable                    |
| status      | project_status enum   | not null, default 'not_started' |
| category    | project_category enum | not null                    |
| created_at  | timestamptz           | not null, default now()     |
| updated_at  | timestamptz           | not null, default now()     |

> `project_status`: `not_started` | `in_progress` | `paused` | `completed`  
> `project_category`: `competition` | `research`

### Schema — project_members
| Field      | Type                      | Notes                              |
|------------|---------------------------|------------------------------------|
| project_id | uuid                      | PK, references projects            |
| member_id  | uuid                      | PK, references auth.users          |
| role       | project_member_role enum  | not null, default 'contributor'    |
| title      | text                      | not null, not empty                |

> `project_member_role`: `admin` | `contributor`

### Schema — project_posts
| Field      | Type        | Notes                           |
|------------|-------------|---------------------------------|
| id         | uuid        | primary key, auto-generated     |
| project_id | uuid        | not null, references projects   |
| author_id  | uuid        | not null, references auth.users |
| title      | text        | not null, not empty             |
| content    | text        | not null, not empty             |
| created_at | timestamptz | not null, default now()         |
| updated_at | timestamptz | not null, default now()         |

### Schema — project_post_comments
| Field       | Type        | Notes                                    |
|-------------|-------------|------------------------------------------|
| id          | uuid        | primary key, auto-generated              |
| post_id     | uuid        | not null, references project_posts       |
| author_id   | uuid        | not null, references auth.users          |
| content     | text        | not null, not empty                      |
| reply_to_id | uuid        | nullable, references project_post_comments |
| created_at  | timestamptz | not null, default now()                  |
| updated_at  | timestamptz | not null, default now()                  |

### Field Validation
| Table                 | Field         | Validation                      |
|-----------------------|---------------|---------------------------------|
| projects              | name          | not empty, 3–80 chars, unique   |
| projects              | summary       | not empty, max 256 chars        |
| projects              | description   | not empty, max 4096 chars       |
| projects              | cover_image   | valid URL or storage ref        |
| projects              | status        | enum only                       |
| projects              | category      | enum only                       |
| project_members       | title         | not empty, 2–48 chars           |
| project_members       | role          | enum only                       |
| project_posts         | title         | not empty, 2–128 chars          |
| project_posts         | content       | not empty, 2–4096 chars         |
| project_post_comments | content       | not empty, 2–2048 chars         |

### RLS Policies
- projects: SELECT all users — INSERT/UPDATE/DELETE admin only
- project_members: SELECT project members & admin — INSERT/UPDATE/DELETE project admin or club admin
- project_posts: SELECT assigned members — INSERT project members — UPDATE/DELETE author or admin
- project_post_comments: SELECT assigned members — INSERT project members — UPDATE/DELETE author or admin

---

## events

### Schema
| Field       | Type              | Notes                        |
|-------------|-------------------|------------------------------|
| id          | uuid              | primary key, auto-generated  |
| created_at  | timestamptz       | not null, default now()      |
| name        | text              | not null, not empty          |
| description | text              | not null, not empty          |
| cover_image | text              | nullable                     |
| content     | text              | not null, default ''         |
| location    | text              | not null, not empty          |
| url         | text              | nullable                     |
| start_time  | timestamptz       | not null                     |
| end_time    | timestamptz       | not null, end_time > start_time |
| status      | event_status enum | not null, default 'upcoming' |

> `event_status`: `upcoming` | `ongoing` | `completed`

### Validation
| Field       | Validation                            |
|-------------|---------------------------------------|
| name        | required, 2–64 chars                  |
| description | required, max 2048 chars              |
| content     | required, max 4096 chars              |
| cover_image | valid URL or storage ref              |
| location    | required, 2–128 chars                 |
| url         | valid URL (HTTPS preferred)           |
| start_time  | required, future time (on create)     |
| end_time    | required, end > start                 |
| status      | enum only                             |

### RLS Policies
- SELECT: public (all users)
- INSERT/UPDATE/DELETE: club admin only
