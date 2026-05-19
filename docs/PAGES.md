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
- `/events`: Public. List all events with time and location. → `PublicEvents`

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
- `/projects/:id`: Public. Project detail — Info and Members tabs (read-only). → `PublicProjectDetail`
- `/admin/projects`: Admin-only. List, create, and delete projects. → `AdminProjects`
- `/admin/projects/:id`: Admin-only. Info (editable), Members (manageable), Posts tabs. → `AdminProjectDetail` (`ProjectInfoTab`, `ProjectMembersTab`, `ProjectPostsTab`)
- `/admin/projects/:id/posts/:postId`: Admin-only. Full post with inline edit + comment section. → `ProjectPostDetail` (`PostDetailView`, `CommentSection`)
- `/officer/projects`: Officers. View assigned projects. → `MemberProjects`
- `/officer/projects/:id`: Officers. Info, Members (role-aware), Posts tabs. → `OfficerProjectDetail` (`ProjectInfoTab`, `ProjectMembersTab`, `ProjectPostsTab`)
- `/officer/projects/:id/posts/:postId`: Officers. Full post with inline edit (if author or project admin) + threaded comment section. → `ProjectPostDetail` (`PostDetailView`, `CommentSection`)

---

## events
- `/admin/events`: Admin-only. Event list management. → TBD
- `/admin/events/:id`: Admin-only. View/edit event details. → TBD
