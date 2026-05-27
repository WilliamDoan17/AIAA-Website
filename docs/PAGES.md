# PAGES

A list of application pages and their role in the AIAA-Website.

---

## public
- `/`: Public. Landing page. → `public/Landing`
- `/login`: Public. Log in. → `public/Login`
- `/onboarding`: Public. Onboarding. → TBD

---

## dashboards
- `/u/admin`: Admin-only. Overview stats, upcoming events, quick actions. → `AdminDashboard`
- `/u/officer`: Officer-only. Assigned projects (up to 4), upcoming events, quick actions. → `OfficerDashboard`

---

## members
- `/members`: Public. List all members. → `members/PublicMemberList`
- `/members/:id`: Public. Member detail. → `members/PublicMemberDetail`
- `/admin/members`: Admin-only. View, filter, invite, edit, or remove members. → `members/AdminMemberList` (`InviteModal`, `EditModal`)
- `/admin/profile`: Admin-only. View and edit own profile. Reset password. → `members/MemberProfile` (`EditProfileSection`, `ResetPasswordSection`)
- `/admin/member/:id`: Admin-only. Member detail. → `members/MemberDetail`
- `/officer/profile`: Officer-only. View and edit own profile. Reset password. → `members/MemberProfile` (`EditProfileSection`, `ResetPasswordSection`)
- `/officer/member/:id`: Officer-only. Member detail. → `members/MemberDetail`

> If `member.is_setup = false`, all protected routes redirect to the profile page to force password reset before access.

---

## projects
- `/projects`: Public. List all projects with status and category filters. → `projects/PublicProjectList`
- `/projects/:id`: Public. Project detail — Info and Members tabs (read-only). → `projects/PublicProjectDetail`
- `/admin/projects`: Admin-only. List, create, and delete projects. → `projects/AdminProjectList`
- `/admin/projects/:id`: Admin-only. Info (editable), Members (manageable), Posts tabs. → `projects/AdminProjectDetail` (`ProjectInfoTab`, `ProjectMembersTab`, `ProjectPostsTab`)
- `/admin/projects/:id/posts/:postId`: Admin-only. Full post with inline edit + comment section. → `projects/ProjectPostDetail` (`PostDetailView`, `CommentSection`)
- `/officer/projects`: Officers. View assigned projects. → `projects/OfficerProjectList`
- `/officer/projects/:id`: Officers. Info, Members (role-aware), Posts tabs. → `projects/OfficerProjectDetail` (`ProjectInfoTab`, `ProjectMembersTab`, `ProjectPostsTab`)
- `/officer/projects/:id/posts/:postId`: Officers. Full post with inline edit (if author or project admin) + threaded comment section. → `projects/ProjectPostDetail` (`PostDetailView`, `CommentSection`)

---

## events
- `/events`: Public. List all events with time and location. → `events/PublicEventList`
- `/events/:id`: Public. Event detail. → `events/PublicEventDetail`
- `/admin/events`: Admin-only. Event list management. → `events/AdminEventList`
- `/admin/events/:id`: Admin-only. View/edit event details. → TBD

---

## club
- `/admin/club`: Admin-only. See and edit club details. → `club/AdminClub`
