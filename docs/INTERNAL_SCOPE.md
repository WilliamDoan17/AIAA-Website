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

### Features
- **admin:**
  - Add member — triggers Supabase invite email, officer sets their own password via the link
  - Edit `role` and `title` of other members
  - Remove members
- **officer:**
  - Edit own `name`, `photo`, `bio` only (cannot change `email`, `role`, `title`)

### Pages
- `/members/:id` — public, shows `name`, `title`, `photo`, `bio`
- `/admin/members` — admin only, lists all members, add/edit/remove
- `/profile` — authenticated officers and admins, view and edit own profile, upload photo

###  
