# SCHEMA

This document details the data model, validations, and access (RLS) controls for the AIAA Website database.

---

## club_info

### Schema
| Field        | Type    | Notes                                  |
|--------------|---------|----------------------------------------|
| id           | uuid    | primary key default gen_random_uuid()   |
| name         | text    | not null check (name <> '')             |
| cover_image  | text    | not null default ''                     |
| about        | text    | not null default ''                     |

### No advanced validation or special RLS noted (admin access to edit).

---

## club_members

### Schema
```sql
create type club_role as enum ('admin', 'officer');

create table club_members (
  id uuid primary key references auth.users(id) not null,
  email text not null check (email <> ''),
  name text not null check (name <> ''),
  role club_role not null default 'officer',
  title text not null check (title <> ''),
  photo text,
  bio text not null default '',
  created_at timestamptz not null default now()
);
```

### Field Validation
| Field     | Validation                                    |
|-----------|-----------------------------------------------|
| email     | valid email, not empty, unique                |
| name      | not empty, 2–64 chars, UTF-8 printable        |
| role      | enum constraint                               |
| title     | not empty, 2–48 chars                         |
| photo     | valid URL or storage ref                      |
| bio       | max 2048 chars, strip HTML                    |
| created_at| auto-generated, no user input                 |

### RLS Policies
- SELECT: authenticated users
- INSERT: admin only
- UPDATE: admin, or user updates own name, photo, bio
- DELETE: admin only

```sql
-- Allow members to update own profile
CREATE POLICY "members can update own profile"
ON club_members
FOR UPDATE
USING (auth.uid() = id);
```

---

## projects

### Schemas
```sql
create type project_status as enum ('not_started', 'in_progress', 'paused', 'completed');
create type project_category as enum ('competition', 'research');
create type project_member_role as enum ('admin', 'contributor');

create table projects (
  id uuid primary key not null default gen_random_uuid(),
  name text not null check (name <> ''),
  summary text not null check (summary <> ''),
  description text not null check (description <> ''),
  cover_image text,
  status project_status not null default 'not_started',
  category project_category not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table project_members (
  project_id uuid not null references projects(id) on delete cascade,
  member_id uuid not null references auth.users(id) on delete cascade,
  role project_member_role not null default 'contributor',
  title text not null check (title <> ''),
  primary key (project_id, member_id)
);

create table project_posts (
  id uuid primary key not null default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (title <> ''),
  content text not null check (content <> ''),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table project_post_comments (
  id uuid primary key not null default gen_random_uuid(),
  post_id uuid not null references project_posts(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  content text not null check (content <> ''),
  reply_to_id uuid references project_post_comments(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### Field Validation
| Table              | Field         | Validation/extras               |
|--------------------|--------------|---------------------------------|
| projects           | name         | not empty, 3–80 chars, unique   |
| projects           | summary      | not empty, max 256 chars        |
| projects           | description  | not empty, max 4096 chars       |
| projects           | cover_image  | valid URL or storage ref        |
| projects           | status       | enum only                       |
| projects           | category     | enum only                       |
| project_members    | title        | not empty, 2–48 chars           |
| project_members    | role         | enum only                       |
| project_posts      | title        | not empty, 2–128 chars          |
| project_posts      | content      | not empty, 2–4096 chars         |
| project_post_comments | content   | not empty, 2–2048 chars         |

### RLS Policies
- projects:
  - SELECT: all users
  - INSERT/UPDATE/DELETE: club admin only
- project_members:
  - SELECT: project members & club admin
  - INSERT/UPDATE/DELETE: project admin/club admin
- project_posts:
  - SELECT: assigned project members
  - INSERT: project members
  - UPDATE/DELETE: author or project/club admin
- project_post_comments:
  - SELECT: assigned project members
  - INSERT: project members
  - UPDATE/DELETE: author or project/club admin

```sql
-- Authors can update own posts
CREATE POLICY "authors can update own posts"
ON project_posts
FOR UPDATE
USING (auth.uid() = author_id);
```

---

## events

### Schema
```sql
create type event_status as ENUM ('upcoming', 'ongoing', 'completed');

create table events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (name <> ''),
  description text not null check (description <> ''),
  cover_image text,
  content text not null default '',
  location text not null check (location <> ''),
  url text,
  start_time timestamptz not null,
  end_time timestamptz not null check (end_time > start_time),
  status event_status not null default 'upcoming'
);
```

### Validation
| Field      | Validation                            |
|------------|---------------------------------------|
| name       | required, 2–64 chars                  |
| description| required, max 2048 chars              |
| content    | required, max 4096 chars              |
| cover_image| valid URL or storage ref              |
| location   | required, 2–128 chars                 |
| url        | valid URL (HTTPS preferred)           |
| start_time | required, future time (on create)     |
| end_time   | required, end > start                 |
| status     | enum only                             |

### RLS Policies
- SELECT: public (all users)
- INSERT/UPDATE/DELETE: club admin only

```sql
-- Only admins can insert events
CREATE POLICY "admins can insert events"
ON events
FOR INSERT
WITH CHECK (
  auth.uid() IN (SELECT id FROM club_members WHERE role = 'admin')
);
```
