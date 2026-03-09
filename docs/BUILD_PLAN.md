# BUILD PLAN
Build plan for the AIAA USF Website project.

## Scope
### Public Users
- See an introduction page of the club
- See which projects the club is working on, completed, and not started yet, filtered by category
- See the details of each project as a website post, consisting of:
  - Overview
  - Explanation
  - Members working on the project and their roles
  - Progress / update posts
- Look up events of the club, including upcoming, ongoing, and past events
- Read the details of each event:
  - Overview
  - What happens in the event
  - Location / link
  - RSVP link
- See members of the club, and upon click see member details:
  - Photo
  - Role
  - Bio
  - Projects they are on, with their role and project updates

### Admin / Officers
- Modify club information
- Add, update, delete projects
- Modify project details (the post)
- Add, update, delete events
- Modify event details (the event post)
- Add, update, remove members
- Modify member details

---

## Phases

### Phase 1 — Frontend with Mock Data
Focus: public-facing, simple display pages where the UI is the main unknown.
Backend is not involved. All data comes from mock data files.

**Pages:**
- `/` Landing page
- `/projects` Projects index page
- `/events` Events index page
- `/members` Members index page

**Goal:** Validate the UI, nail the layout and component structure, and prove out the data shapes before committing to a real schema.

---

### Phase 2 — Backend, Auth, and Complex Pages
Focus: finalize the schema, replace mock data with Supabase, then build the detail pages and admin views.

The detail pages are deferred to this phase because they involve relational data (project members with roles, update posts per project) that is too complex and artificial to mock reliably. Building them on a real backend is cleaner.

**Backend:**
- Finalize Supabase schema (projects, events, members, project_members, posts)
- Replace mock data with real Supabase queries
- Set up Supabase Auth for officer logins
- Row Level Security (RLS) for admin-only operations

**Pages:**
- `/projects/:id` Project detail page
- `/events/:id` Event detail page
- `/members/:id` Member detail page
- Admin views (add, edit, delete for projects, events, members)

**Goal:** Ship a fully functional, deployed website with real content managed by club officers.

---

## Deployment Strategy

### Soft Launch — end of Phase 1
- Deploy the site with mock data once the 4 index pages are complete and polished
- Share internally with club officers only — not publicly
- Purpose: gather UI feedback early, and have a live URL for the resume before Phase 2 is done
- Platform: Vercel (trivial deployment for Vite + React)

### Public Launch — end of Phase 2
- Redeploy once real Supabase data is wired up and officers can manage content
- Announce publicly and share with the club and university
- By this point the site has real projects, real events, and real members visible
