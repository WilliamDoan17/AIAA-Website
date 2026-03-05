# SCHEMA
This document states the data schema for the AIAA Website project.

## Conventions
- Follows Supabase PostgreSQL conventions for types, naming, and usage
- All tables include `id` and `created_at` as standard fields
- Optional fields default to `null` unless otherwise stated

---

## Data Schema

### projects

#### Properties
- id:
  - type: uuid
  - primary key
  - defaults to gen_random_uuid()
  - Unique identifier for each project
- created_at:
  - type: timestamptz
  - defaults to now()
  - constraints:
    - not null
  - Records when the project entry was created
- author_id:
  - type: uuid
  - foreign key, references auth.users(id)
  - constraints:
    - not null
    - on delete cascade
  - The officer who created this project entry
- name:
  - type: text
  - constraints:
    - not null
    - check: name <> ''
  - Display name of the project
- summary:
  - type: text
  - constraints:
    - not null
    - check: summary <> ''
  - Short description shown on the project card
- description:
  - type: text
  - constraints:
    - not null
    - check: description <> ''
  - Full content shown on the project detail page
- cover_image:
  - type: text
  - defaults to null
  - URL pointing to the project's cover image, optional
- status:
  - type: project_status (ENUM('not_started', 'in_progress', 'paused', 'completed'))
  - defaults to 'not_started'
  - constraints:
    - not null
  - Represents the current state of the project
- category:
  - type: project_category (ENUM('competition', 'research'))
  - constraints:
    - not null
  - Classifies the project type for filtering and display

#### Implementation
```sql
create type project_status as ENUM ('not_started', 'in_progress', 'paused', 'completed');
create type project_category as ENUM ('competition', 'research');

create table projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  author_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (name <> ''),
  summary text not null check (summary <> ''),
  description text not null check (description <> ''),
  cover_image text default null,
  status project_status default 'not_started' not null,
  category project_category not null
);
```

---

### events

#### Properties
- id:
  - type: uuid
  - primary key
  - defaults to gen_random_uuid()
  - Unique identifier for each event
- created_at:
  - type: timestamptz
  - defaults to now()
  - constraints:
    - not null
  - Records when the event entry was created
- name:
  - type: text
  - constraints:
    - not null
    - check: name <> ''
  - Display name of the event
- description:
  - type: text
  - constraints:
    - not null
    - check: description <> ''
  - Full description of the event shown on the detail page
- cover_image:
  - type: text
  - defaults to null
  - URL pointing to the event's cover image, optional
- location:
  - type: text
  - constraints:
    - not null
    - check: location <> ''
  - Plain text address or venue name of the event
- url:
  - type: text
  - defaults to null
  - Optional link for online or hybrid events (e.g. Zoom, livestream)
- start_time:
  - type: timestamptz
  - constraints:
    - not null
  - When the event begins
- end_time:
  - type: timestamptz
  - constraints:
    - not null
    - check: end_time > start_time
  - When the event ends, must be after start_time
- status:
  - type: event_status (ENUM('upcoming', 'ongoing', 'completed'))
  - defaults to 'upcoming'
  - constraints:
    - not null
  - Represents the current state of the event

#### Implementation
```sql
create type event_status as ENUM ('upcoming', 'ongoing', 'completed');

create table events (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  name text not null check (name <> ''),
  description text not null check (description <> ''),
  cover_image text default null,
  location text not null check (location <> ''),
  url text default null,
  start_time timestamptz not null,
  end_time timestamptz not null check (end_time > start_time),
  status event_status default 'upcoming' not null
);
```

---

### members

#### Properties
- id:
  - type: uuid
  - primary key
  - defaults to gen_random_uuid()
  - Unique identifier for each member
- created_at:
  - type: timestamptz
  - defaults to now()
  - constraints:
    - not null
  - Records when the member entry was created
- name:
  - type: text
  - constraints:
    - not null
    - check: name <> ''
  - Full display name of the member
- role:
  - type: member_role (ENUM('president', 'vice_president', 'treasurer', 'officer'))
  - constraints:
    - not null
  - The member's role within the club
- photo:
  - type: text
  - defaults to null
  - URL pointing to the member's photo, optional
#### Implementation
```sql
create type member_role as ENUM ('president', 'vice_president', 'treasurer', 'officer');

create table members (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  name text not null check (name <> ''),
  role member_role not null,
  photo text default null
);
```
