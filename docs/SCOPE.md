# SCOPE

This document outlines the features to be implemented for the AIAA-Website, organized by domain.

---

## club_info

- Admins may view and edit club-wide information, including:
  - Name
  - Cover image
  - About/description
- Club information is managed from an admin-only dashboard page

---

## club_members

- Admin features:
  - Invite (add) a new member (triggers Supabase invite email; member sets their own password)
  - Edit member's role and title
  - Remove members
- Officer features:
  - Edit own name, photo, and bio (cannot modify email, role, or title)

- Onboarding flow:
  1. Admin invites member; user receives an invite link
  2. New user sets password on first login
  3. User is prompted to complete profile (photo, bio) before accessing main dashboard

---

## projects

- Club admin features:
  - Create, edit, or delete any project
  - Assign members to projects; set member roles and titles
- Project admin features:
  - Add/remove members for their project; edit member role/title
  - Edit their project's details (name, summary, description, cover image, status)
  - Create, edit, or delete any post in their project
- Contributor features:
  - Create, edit, or delete their own posts in assigned projects
  - Comment on any post within assigned projects

---

## events

- Admin features:
  - Create, edit, or delete events
- Events feature set includes:
  - Public and private (admin-only) event views
  - View event times, locations, detailed information
  - Status tracking for each event (upcoming, ongoing, completed)

---

(See SCHEMA.md for technical/database implementation, validation, and RLS details. See PAGES.md for page-by-page breakdown.)
