# AIAA USF — Club Website

The official website for the American Institute of Aeronautics and Astronautics chapter at the University of South Florida.

Provides a public-facing interface for visitors to explore the club's active projects, upcoming events, and board members. A future admin system will allow officers to manage and update club content without touching code.

> **Status:** Stage 1 in progress — public frontend with mock data

---

## Who This Is For

**Visitors** — students, faculty, and prospective members who want to learn about the club, see what projects are active, and find upcoming events.

**Admins (Stage 2)** — club officers who need to add, edit, and remove projects, events, and member profiles through a protected dashboard.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Routing | React Router v6 |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth (Stage 2) | JWT |

---

## Project Scope

**Stage 1 — Frontend + Mock Data** *(current)*
Public pages built in React consuming local mock data. No backend, no auth.

**Stage 2 — Backend + Admin System** *(planned)*
Express API + MongoDB replacing mock data. JWT-protected admin dashboard for managing content.

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Landing | Hero, club mission, previews of projects/events/members |
| `/projects` | Projects | All club projects with status and tags |
| `/events` | Events | Upcoming and past events |
| `/members` | Members | Board members and active members |
| `/admin/*` | Admin *(Stage 2)* | Protected dashboard for content management |

---

## Data Schema

> See [`/docs/SCHEMA.md`](/docs/SCHEMA.md) for full entity definitions.

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
coming soon — required for Stage 2
```

---

## Contributing

This project is maintained by AIAA USF officers.
For questions or access, contact the current webmaster. 
