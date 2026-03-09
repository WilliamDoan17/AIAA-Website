# AIAA Website — Project Decisions Summary
This document summarizes the key decisions made during planning and early development of the AIAA USF club website. Use this to onboard a new AI chat session quickly.

## Project Overview
A public-facing club website for AIAA at USF. Two types of users:
- **Officers** — log in to write and publish content (projects, events, members)
- **Public** — view club information, no auth needed

## Tech Stack
- **Frontend:** Vite + React
- **Backend:** Supabase (PostgreSQL + Auth)
- **Styling:** CSS Modules
- **Routing:** React Router

## Build Order
1. Client-facing UI with mock data (current phase)
2. Backend — Supabase schema + real data replaces mocks
3. Admin view — write, edit, publish content
4. Auth — lock admin view behind login

## Pages Planned
- `/` — Landing page (done)
- `/projects` — Projects index page (done)
- `/projects/:id` — Project detail page (not started)
- `/events` — Events page (not started)
- `/members` — Members page (not started)

## Data Schema
Three tables: `projects`, `events`, `members`.
A fourth table `project_members` (junction) is planned for the project detail page.
Full schema is in `SCHEMA.md`.

## Key Data Decisions
- `projects` has both `summary` (short, for cards) and `description` (full, for detail page)
- `events` uses `timestamptz` for `start_time` and `end_time` — no separate `date` field
# AIAA Website — Project Decisions Summary

This document summarizes the key decisions made during planning and early development of the AIAA USF club website. Use this to onboard a new AI chat session quickly.

## Project Overview

A public-facing club website for AIAA at USF. Two types of users:
- **Officers** — log in to write and publish content (projects, events, members)
- **Public** — view club information, no auth needed

## Tech Stack

- **Frontend:** Vite + React
- **Backend:** Supabase (PostgreSQL + Auth)
- **Styling:** CSS Modules
- **Routing:** React Router

## Build Order

1. Client-facing UI with mock data (current phase)
2. Backend — Supabase schema + real data replaces mocks
3. Admin view — write, edit, publish content
4. Auth — lock admin view behind login

## Deployment Strategy

- **Soft launch** — end of Phase 1, deploy with mock data to Vercel, share internally with officers only
- **Public launch** — end of Phase 2, real content, announce publicly

## Pages Planned

- `/` — Landing page ✅
- `/projects` — Projects index page ✅
- `/events` — Events index page ✅
- `/members` — Members index page ✅
- `/projects/:id` — Project detail page (Phase 2)
- `/events/:id` — Event detail page (Phase 2)
- `/members/:id` — Member detail page (Phase 2)

## Data Schema

Three tables: `projects`, `events`, `members`.
A fourth table `project_members` (junction) is planned for the project detail page.
Full schema is in `SCHEMA.md`.

## Key Data Decisions

- `projects` has both `summary` (short, for cards) and `description` (full, for detail page)
- `events` uses `timestamptz` for `start_time` and `end_time` — no separate `date` field
- `events` has no `status` field — status (`upcoming`, `ongoing`, `past`) is derived at runtime from `start_time`/`end_time` vs `now()`
- `events` timestamps use Florida timezone offset (`-05:00` EST for Feb, `-04:00` EDT for March+)
- `members` has `photo` (optional), no `bio` or `linkedin` for now
- `project_members` junction table planned — members have a specific role per project, and can be on multiple projects

## Frontend Patterns

- Data is fetched once at the page level, never inside child components
- `filterOptions` is derived dynamically from data using `useMemo` — never hardcoded
- Filter state is a single object: `{ category: 'all', status: 'all' }`
- Filtered results are computed with `useMemo` depending on `[data, filters]`
- Empty state is handled in `ProjectContainer` with a "No projects found." message
- `cover_image` / `photo` can be null — always render a placeholder div instead of a broken img
- `formatRole` is defined outside components so it's not recreated on every render
- Event status is derived at render: `upcoming = start > now`, `ongoing = start <= now && end >= now`, `past = end < now`
- `now = new Date()` is computed at render time (intentional — resets on page load)

## Component Structure

### Projects Page
```
Projects (page)
  ├── Navbar
  ├── PageHeader
  ├── FilterBar        ← receives filters, setFilters, filterOptions
  ├── ProjectContainer ← receives filtered projects, filterOptions
  │     └── ProjectCard
  └── Footer
```

### Events Page
```
Events (page)
  ├── PageHeader (h1)
  ├── OngoingEvents    ← returns null if empty
  ├── UpcomingEvents   ← returns null if empty
  ├── ShowPastButton   ← toggles showPastEvents state
  └── PastEvents       ← only rendered when showPastEvents === true
        └── EventCard
```

### Members Page
```
Members (page)
  ├── PresidentCard    ← full width, editorial style, gold accent
  │     ├── PresidentCardImage (with null handle)
  │     └── PresidentCardContent (h3 name + p role)
  └── MemberContainer  ← grid of crew cards, returns null if empty
        └── MemberCard (centered, compact, mission dossier style)
```

### Landing Page Sections
```
Landing
  ├── HeroSection
  ├── AboutSection
  ├── ProjectSection   ← ProjectCard (vertical)
  ├── EventSection     ← EventCard (ongoing first, then upcoming)
  └── MemberSection    ← MemberCard (centered grid)
```

## Design System

- Aesthetic: Deep-Space Tech / Mission Control
- Fonts: Orbitron (display), DM Sans (body)
- CSS variables defined in each module's `:root`
- Key colors: `--void: #04060f`, `--accent: #00c8ff`, `--gold: #f0a500`, `--text: #e8eef8`, `--muted: #7a8aaa`
- Starfield overlay via `::before` pseudo-element on page wrappers
- Cards use angled `clip-path` for tags and buttons
- `MemberContainer` on all pages: no background color, `gap: 1.5rem`, individual card borders
- `PresidentCard`: photo left (3/4 aspect ratio), content right (top-aligned), gold left accent bar
- `MemberCard`: circular photo, center-aligned, cyan accent on hover

## Files Produced

- `SCHEMA.md` — full database schema
- `BUILD_PLAN.md` — scope, phases, deployment strategy
- `PROJECT_DECISIONS.md` — this file
- `mockProjects.js` — 2 projects (SUAS, COSMIC Satellite)
- `mockEvents.js` — 8 events across Feb 26 – Mar 19 (past + upcoming)
- `mockMembers.js` — 4 members (president, vice president, treasurer, officer)
- `Landing.jsx` + `Landing.module.css` — landing page
- `Projects.jsx` + `index.module.css` — projects index page
- `Events.jsx` + `events.index.module.css` — events index page
- `Members.jsx` + `members.index.module.css` — members index page
- `Navbar.jsx` + `Navbar.module.css` — shared navbar
