# PAGES

A list of application pages and their role in the AIAA-Website.

---

## auth
- `/login`: Public. Log in. → `Login`
- `/onboarding`: Public. Onboarding. → TBD

---

## public
- `/`: Public. Landing page. → `Landing`
- `/members`: Public. List all members. → `PublicMembers`
- `/members/:id`: Public. Member detail. → `PublicMemberDetail`
- `/projects`: Public. List all projects with status and category filters. → `PublicProjects`
- `/events`: Public. List all events with time, location, and status. → `PublicEvents`

---

## club_members
- `/admin/members`: Admin-only. View, filter, invite, edit, or remove members. → `AdminMembers` (`InviteModal`, `EditModal`)
- `/admin/profile`: Admin-only. View and edit own profile. Reset password. → `MemberProfile` (`EditProfileSection`, `ResetPasswordSection`)
- `/officer/profile`: Officer-only. View and edit own profile. Reset password. → `MemberProfile` (`EditProfileSection`, `ResetPasswordSection`)

> If `member.is_setup = false`, all protected routes redirect to the profile page to force password reset before access.

---

## club_info
- `/admin/club`: Admin-only. See and edit club details. → `AdminClub`

---

## projects
- `/admin/projects`: Admin-only. List, add, edit, and delete projects. → TBD
- `/admin/projects/:id`: Admin-only. Manage project members, posts. → TBD
- `/contributor/projects`: Contributors. View assigned projects. → TBD
- `/contributor/projects/:id`: Contributors. Manage posts, comment. → TBD

---

## events
- `/admin/events`: Admin-only. Event list management. → TBD
- `/admin/events/:id`: Admin-only. View/edit event details. → TBD
