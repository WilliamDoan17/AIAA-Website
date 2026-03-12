# AIAA USF — Club Website

The official website for the American Institute of Aeronautics and Astronautics chapter at the University of South Florida.

Provides a public-facing interface for visitors to explore the club's active projects, upcoming events, and board members. A future admin system will allow officers to manage and update club content without touching code.

> **Status:** Phase 1 in progress — public frontend with mock data

---

## Who This Is For

**Visitors** — students, faculty, and prospective members who want to learn about the club, see what projects are active, and find upcoming events.

**Officers (Phase 2)** — club officers who need to add, edit, and remove projects, events, and member profiles through a protected dashboard.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Routing | React Router v6 |
| Styling | CSS Modules |
| Backend (Phase 2) | Supabase (PostgreSQL + Auth) |

---

## Project Scope

### Phase 1 — Frontend + Mock Data *(current)*
Public-facing index pages built in React consuming local mock data. No backend, no auth. Goal is to validate the UI, nail the layout and component structure, and prove out data shapes before committing to a real schema.

**Soft launch** at the end of Phase 1 — deployed to Vercel with mock data, shared internally with officers for UI feedback.

### Phase 2 — Backend, Auth, and Complex Pages *(planned)*
Supabase schema finalized, mock data replaced with real queries, detail pages built on relational data, and a protected admin dashboard added for officers to manage content.

**Public launch** at the end of Phase 2 — real content managed by club officers, announced publicly.

---

## Pages

| Route | Page | Status |
|---|---|---|
| `/` | Landing | ✅ Phase 1 |
| `/projects` | Projects index | ✅ Phase 1 |
| `/events` | Events index | ✅ Phase 1 |
| `/members` | Members index | ✅ Phase 1 |
| `/projects/:id` | Project detail | Phase 2 |
| `/events/:id` | Event detail | Phase 2 |
| `/members/:id` | Member detail | Phase 2 |
| `/admin/*` | Admin dashboard | Phase 2 |

---

## Data Schema

Three main tables: `projects`, `events`, `members`.
A `project_members` junction table is planned for Phase 2 (members have a role per project and can be on multiple projects).

> See `SCHEMA.md` for full entity definitions.

---

## Folder Structure

```
coming soon
```

---

## How To Run

```
coming soon
```

---

## Environment Variables

```
coming soon — required for Phase 2 (Supabase keys, Auth config)
```

---

## Contributing

This project is maintained by AIAA USF officers.
For questions or access, contact the current webmaster.
