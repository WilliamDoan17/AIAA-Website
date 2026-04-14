# Internal Scope for AIAA-Website

This is the scope and plan for the scop of internal members for AIAA-Website

## club_members

### Schema
```sql
create type club_role as enum ('admin', 'officer');
```

| Field | Type | Notes |
|---|---|---|
| id | uuid | primary key references auth.users(id) not null |
| email | text | not null check (email <> '') |
| name | text | not null check (name <> '') |
| role | club_role | not null default 'officer' |
| title | text | not null check (title <> '') |
| photo | text | |
| bio | text | not null default '' |
| created_at | timpstamptz | not null default now() |

### Features
- **admin:**
  - Add member — triggers Supabase invite email, officer sets their own password via the link
  - Edit `role` and `title` of other members
  - Remove members
- **officer:**
  - Edit own `name`, `photo`, `bio` only (cannot change `email`, `role`, `title`)

### Validation
| Field | Validation |
|---|---|
| email | valid email format, not empty, unique |
| name | not empty, 2–64 chars, UTF-8 printable |
| role | enforced by ENUM |
| title | not empty, 2–48 chars |
| photo | valid URL or storage reference |
| bio | max 2048 chars, strip HTML |
| created_at | auto-generated, no user input |

### RLS Policies
- **SELECT:** authenticated users
- **INSERT:** admin only
- **UPDATE:** admin, or user updates own `name`, `photo`, `bio` (auth.uid = id)
- **DELETE:** admin only

```sql
-- Allow members to update own profile
CREATE POLICY "members can update own profile"
ON club_members
FOR UPDATE
USING (auth.uid() = id);
```

### Storage
- Bucket: `profile-photos/`
- Max size: 5MB
- Formats: JPEG, PNG, WebP
- Naming: `{user-id}/{uuid}.{ext}`

### Onboarding
1. Admin clicks "Add Member" → triggers Supabase invite email
2. User receives invite email → clicks link to set password
3. First login → user prompted to complete profile (photo, bio)
4. UI blocks dashboard access until profile complete

## projects

### Schema

```sql
create type project_status as enum ('not_started', 'in_progress', 'paused', 'completed');
create type project_category as enum ('competition', 'research');
create type project_member_role as enum ('admin', 'contributor');
```

#### projects
| Field | Type | Notes |
|---|---|---|
| id | uuid | primary key not null default gen_random_uuid() |
| name | text | not null check (name <> '') |
| summary | text | not null check (summary <> '') |
| description | text | not null check (description <> '') |
| cover_image | text | |
| status | project_status | not null default 'not_started' |
| category | project_category | not null |
| created_at | timestamptz | not null default now() |
| updated_at | timestamptz | not null default now() |

#### project_members
| Field | Type | Notes |
|---|---|---|
| project_id | uuid | not null references projects(id) on delete cascade |
| member_id | uuid | not null references auth.users(id) on delete cascade |
| role | project_member_role | not null default 'contributor' |
| title | text | not null check (title <> '') |
| primary key | (project_id, member_id) | |

#### project_posts
| Field | Type | Notes |
|---|---|---|
| id | uuid | primary key not null default gen_random_uuid() |
| project_id | uuid | not null references projects(id) on delete cascade |
| author_id | uuid | not null references auth.users(id) on delete cascade |
| title | text | not null check (title <> '') |
| content | text | not null check (content <> '') |
| created_at | timestamptz | not null default now() |
| updated_at | timestamptz | not null default now() |

#### project_post_comments
| Field | Type | Notes |
|---|---|---|
| id | uuid | primary key not null default gen_random_uuid() |
| post_id | uuid | not null references project_posts(id) on delete cascade |
| author_id | uuid | not null references auth.users(id) on delete cascade |
| content | text | not null check (content <> '') |
| reply_to_id | uuid | references project_post_comments(id) on delete cascade |
| created_at | timestamptz | not null default now() |
| updated_at | timestamptz | not null default now() |

### Features

- **club admin:**
  - Create, edit, delete any project
  - Assign members to projects, set their role and title
- **project admin:**
  - Add, remove members from their project, edit their role and title
  - Edit project details (name, summary, description, cover_image, status)
  - Create, edit, delete any post in their project
- **contributor:**
  - Create, edit, delete own posts only
  - Comment on any post in projects they are assigned to

### Pages
- `/projects` — public, lists all projects with status and category
- `/projects/:id` — public, shows project details, members, and posts
- `/admin/projects` — club admin only, lists all projects, add/edit/delete
- `/admin/projects/:id` — project admin and club admin, manage members, posts
- `/contributor/projects`  - contributors, look up projects
- `/contributor/projects/:id` - contributor site for project with id, to create/edit posts, and comment to posts

### Validation
| Table | Field | Validation |
|---|---|---|
| projects | name | not empty, 3–80 chars, unique within org |
| projects | summary | not empty, max 256 chars |
| projects | description | not empty, max 4096 chars, strip HTML |
| projects | cover_image | valid URL or storage reference |
| projects | status | ENUM only |
| projects | category | ENUM only |
| projects | created_at, updated_at | auto-generated |
| project_members | project_id, member_id | must exist (FK) |
| project_members | title | not empty, 2–48 chars |
| project_members | role | ENUM only |
| project_posts | title | not empty, 2–128 chars |
| project_posts | content | not empty, 2–4096 chars |
| project_posts | author_id | must exist (FK) |
| project_post_comments | content | not empty, 2–2048 chars |
| project_post_comments | author_id | must exist (FK) |

### RLS Policies
**projects:**
- **SELECT:** all users
- **INSERT/UPDATE/DELETE:** club admin only

**project_members:**
- **SELECT:** project members and club admin
- **INSERT/UPDATE/DELETE:** project admin or club admin

**project_posts:**
- **SELECT:** assigned project members
- **INSERT:** project members
- **UPDATE/DELETE:** author or project/club admin

**project_post_comments:**
- **SELECT:** assigned project members
- **INSERT:** project members
- **UPDATE/DELETE:** author or project/club admin

```sql
-- Authors can update own posts
CREATE POLICY "authors can update own posts"
ON project_posts
FOR UPDATE
USING (auth.uid() = author_id);
```

### Storage
- Bucket: `project-covers/`
- Max size: 5MB
- Formats: JPEG, PNG, WebP
- Naming: `{project-id}/{uuid}.{ext}`

## events

### Schema

#### events

```sql
create type event_status as ENUM ('upcoming', 'ongoing', 'completed');
```


| Field | Type | Notes |
| --- | --- | --- |
| id | uuid | primary key default gen_random_uuid() |
| created_at | timestamptz | not null default now() |
| name | text | not null check (name <> '') |
| description | text | not null check (description <> '') |
| cover_image | text | |
| content | text | not null default '' |
| location | text | not null check (location <> '') |
| url | text | |
| start_time | timestamptz | not null |
| end_time | timestamptz | not null check (end_time > start_time) |
| status | event_status | not null default 'upcoming' |


### Features

- club admin: 
  - create, edit, delete events

### Pages

- `events/`: public, see events, time and location, as well as their status
- `events/:id`: public, see specific event info
- `admin/events/`: club admin, see event list, create/delete events
- `admin/events/:id`: club admin, see event detailed info and edit them

### Validation
| Field | Validation |
|---|---|
| name | required, 2–64 chars |
| description | required, max 2048 chars |
| content | required, max 4096 chars |
| cover_image | valid URL or storage reference |
| location | required, 2–128 chars |
| url | valid URL, HTTPS preferred |
| start_time | required, future for creation |
| end_time | required, > start_time |
| status | ENUM only |

### RLS Policies
- **SELECT:** public (all users)
- **INSERT/UPDATE/DELETE:** club admin only

```sql
-- Only admins can insert events
CREATE POLICY "admins can insert events"
ON events
FOR INSERT
WITH CHECK (
  auth.uid() IN (SELECT id FROM club_members WHERE role = 'admin')
);
```

### Storage
- Bucket: `event-covers/`
- Max size: 5MB
- Formats: JPEG, PNG, WebP
- Naming: `{event-id}/{uuid}.{ext}`
