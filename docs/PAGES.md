# PAGES

A list of application pages and their role in the AIAA-Website.

---

## public
- `/`: Public. Landing page. → `public/Landing`
- `/login`: Public. Log in. → `public/Login`
- `/onboarding`: Public. Onboarding. → TBD

---

## members
- `/members`: Public. List all members. → `members/PublicList`
- `/members/:id`: Public. Member detail. → `members/PublicDetail`
- `/admin/members`: Admin-only. View, filter, invite, edit, or remove members. → `members/AdminList` (`InviteModal`, `EditModal`)
- `/admin/profile`: Admin-only. View and edit own profile. Reset password. → `members/Profile` (`EditProfileSection`, `ResetPasswordSection`)
- `/admin/member/:id`: Admin-only. Member detail. → `members/Detail`
- `/officer/profile`: Officer-only. View and edit own profile. Reset password. → `members/Profile` (`EditProfileSection`, `ResetPasswordSection`)
- `/officer/member/:id`: Officer-only. Member detail. → `members/Detail`

> If `member.is_setup = false`, all protected routes redirect to the profile page to force password reset before access.

---

## projects
- `/projects`: Public. List all projects with status and category filters. → `projects/PublicList`
- `/projects/:id`: Public. Project detail — Info and Members tabs (read-only). → `projects/PublicDetail`
- `/admin/projects`: Admin-only. List, create, and delete projects. → `projects/AdminList`
- `/admin/projects/:id`: Admin-only. Info (editable), Members (manageable), Posts tabs. → `projects/AdminDetail` (`ProjectInfoTab`, `ProjectMembersTab`, `ProjectPostsTab`)
- `/admin/projects/:id/posts/:postId`: Admin-only. Full post with inline edit + comment section. → `projects/PostDetail` (`PostDetailView`, `CommentSection`)
- `/officer/projects`: Officers. View assigned projects. → `projects/OfficerList`
- `/officer/projects/:id`: Officers. Info, Members (role-aware), Posts tabs. → `projects/OfficerDetail` (`ProjectInfoTab`, `ProjectMembersTab`, `ProjectPostsTab`)
- `/officer/projects/:id/posts/:postId`: Officers. Full post with inline edit (if author or project admin) + threaded comment section. → `projects/PostDetail` (`PostDetailView`, `CommentSection`)

---

## events
- `/events`: Public. List all events with time and location. → `events/PublicList`
- `/events/:id`: Public. Event detail. → `events/PublicDetail`
- `/admin/events`: Admin-only. Event list management. → `events/AdminList`
- `/admin/events/:id`: Admin-only. View/edit event details. → TBD

---

## club
- `/admin/club`: Admin-only. See and edit club details. → `club/Admin`
