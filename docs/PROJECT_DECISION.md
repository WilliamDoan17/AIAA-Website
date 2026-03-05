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
- `members` has `photo` (optional), no `bio` or `linkedin` for now
- `project_members` junction table planned — members have a specific role per project, and can be on multiple projects

## Frontend Patterns
- Data is fetched once at the page level, never inside child components
- `filterOptions` is derived dynamically from data using `useMemo` — never hardcoded
- Filter state is a single object: `{ category: 'all', status: 'all' }`
- Filtered results are computed with `useMemo` depending on `[data, filters]`
- Empty state is handled in `ProjectContainer` with a "No projects found." message
- `cover_image` can be null — always render a placeholder div instead of a broken img

## Component Structure (Projects Page)
```
Projects (page)
  ├── Navbar
  ├── PageHeader
  ├── FilterBar        ← receives filters, setFilters, filterOptions
  ├── ProjectContainer ← receives filtered projects, filterOptions
  │     └── ProjectCard
  └── Footer
```

## Design System
- Aesthetic: Deep-Space Tech / Mission Control
- Fonts: Orbitron (display), DM Sans (body)
- CSS variables defined in each module's `:root`
- Key colors: `--void: #04060f`, `--accent: #00c8ff`, `--gold: #f0a500`, `--text: #e8eef8`, `--muted: #7a8aaa`
- Starfield overlay via `::before` pseudo-element on page wrappers
- Cards use angled `clip-path` for tags and buttons

## Files Produced
- `SCHEMA.md` — full database schema
- `mockProjects.js` — 2 projects (SUAS, COSMIC Satellite)
- `mockEvents.js` — 2 events (SUAS meetings)
- `mockMembers.js` — 4 members (president, vice president, treasurer, officer)
- `Landing.jsx` + `Landing.module.css` — landing page
- `Projects.jsx` + `index.module.css` — projects index page
- `Navbar.jsx` + `Navbar.module.css` — shared navbar
