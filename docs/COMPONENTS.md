# COMPONENTS

All reusable components in `frontend/src/components/`, organized by domain.

---

## auth

### `SetupGuardModal`
Blocks navigation with a full-screen modal on first login, prompting the user to set a new password. Calls `reset-password` and refreshes auth context on success.
- **Used by:** `routes/ProtectedRoute`

---

## public

### `Navbar`
Fixed top navigation bar with links to Projects, Events, and Members. Renders `LoginButton`.
- **Used by:** `layouts/PublicLayout`

### `Footer`
Bottom footer displaying club name and address. Reads club name from `useClubInfo`.
- **Used by:** `layouts/PublicLayout`

### `LoginButton`
CTA button that navigates to `/login`.
- **Used by:** `Navbar`

---

## club

### `ClubForm`
Editable form for club name, cover image URL, and about text. Owns field state and syncs from `clubInfo` prop on mount.
- **Props:** `clubInfo, onSave, saving, saved, saveError`
- **Used by:** `pages/club/AdminClub`

---

## events

### `CreateEventForm`
Form fields for creating a new event. Owns field state, validation, and `useCreateEvent` mutation. Calls `onClose` on success.
- **Props:** `onClose`
- **Used by:** `CreateEventModal`

### `UpdateEventForm`
Form fields for editing an existing event. Pre-fills from `event` prop. Owns field state, validation, and `useUpdateEvent` mutation. Calls `onClose` on success.
- **Props:** `event, onClose`
- **Used by:** `UpdateEventModal`

### `CreateEventModal`
Modal chrome (overlay, title, close button) wrapping `CreateEventForm`.
- **Props:** `onClose`
- **Used by:** `pages/events/AdminEventList`

### `UpdateEventModal`
Modal chrome wrapping `UpdateEventForm`.
- **Props:** `event, onClose`
- **Used by:** `pages/events/AdminEventList`

### `AdminEventCard`
Row displaying an event's name, time, location, and computed status badge. Renders edit and delete action buttons.
- **Props:** `event, onEdit, onDelete`
- **Used by:** `pages/events/AdminEventList`

### `PublicEventCard`
Card displaying event cover image, date, location, name, and description. Links to `/events/:id`.
- **Props:** `event`
- **Used by:** `PublicEventGroup`

### `PublicEventGroup`
Titled grid of `PublicEventCard`s. Supports `gold` and `muted` style variants for ongoing/past groups. Renders nothing if events is empty.
- **Props:** `title, events, gold?, muted?`
- **Used by:** `pages/events/PublicEventList`

---

## members

### `PresidentCard`
Hero-style featured card for the club president. Displays a tall portrait photo, name, and "PRESIDENT" label.
- **Props:** `president`
- **Used by:** `pages/members/PublicMemberList`

### `AdminMemberCard`
Row displaying a member's avatar, name, email, title, and role badge. Renders edit and remove action buttons with loading state for the remove action.
- **Props:** `member, onEdit, onRemove, removing?`
- **Used by:** `pages/members/AdminMemberList`

### `InviteMemberModal`
Modal for inviting a new member by email. Owns form state, validation, and `useInviteMember` mutation.
- **Props:** `onClose`
- **Used by:** `pages/members/AdminMemberList`

### `UpdateMemberModal`
Modal for editing a member's title and role. Owns form state and `useUpdateMember` mutation.
- **Props:** `member, onClose`
- **Used by:** `pages/members/AdminMemberList`

### `UpdateProfileSection`
Profile edit form (name, photo, bio, title). Reads current user from `useAuth`, owns form state and `useUpdateMember` mutation. Title field is editable only for admins.
- **Used by:** `pages/members/MemberProfile`

### `ResetPasswordSection`
Password reset form (current, new, confirm). Calls `resetPassword` service directly.
- **Used by:** `pages/members/MemberProfile`

### `PublicMemberCard`
Card displaying member photo, name, and title. Links to `/members/:id`.
- **Props:** `member`
- **Used by:** `PublicMemberContainer`

### `PublicMemberContainer`
Responsive grid of `PublicMemberCard`s. Renders nothing if members is empty.
- **Props:** `members`
- **Used by:** `pages/members/PublicMemberList`

---

## projects/info

### `ProjectInfoTab`
Thin wrapper that renders `ProjectInfoForm` for editable project info. Used in admin detail where the form is always editable.
- **Props:** `project`
- **Used by:** `pages/projects/AdminProjectDetail`

### `ProjectInfoView`
Read-only display of project cover image, summary, and description.
- **Props:** `project`
- **Used by:** `pages/projects/PublicProjectDetail`, `pages/projects/OfficerProjectDetail`

### `ProjectInfoForm`
Editable form for project name, summary, description, cover image, status, and category. Owns field state, validation, and `useUpdateProject` mutation.
- **Props:** `project`
- **Used by:** `ProjectInfoTab`

---

## projects/members

### `ProjectMembersTab`
Lists project members with role badges. When `canManage` is true, shows add/edit/remove actions and manages modal state for `AddMemberModal`, `EditMemberModal`, `RemoveMemberModal`.
- **Props:** `projectId, canManage`
- **Used by:** `pages/projects/AdminProjectDetail`, `pages/projects/OfficerProjectDetail`, `pages/projects/PublicProjectDetail`

### `ProjectMemberCard`
Row displaying a project member's avatar, name, project title, and role. Conditionally renders edit/remove buttons when `canManage` is true.
- **Props:** `member, canManage?, onEdit?, onRemove?`
- **Used by:** `ProjectMembersTab`

### `AddMemberModal`
Modal for adding an existing club member to a project. Includes member search, role, and title fields. Excludes already-added members.
- **Props:** `projectId, existingMemberIds, onClose`
- **Used by:** `ProjectMembersTab`

### `EditMemberModal`
Modal for updating a project member's role and title.
- **Props:** `projectId, member, onClose`
- **Used by:** `ProjectMembersTab`

### `RemoveMemberModal`
Confirmation modal for removing a member from a project.
- **Props:** `projectId, member, onClose`
- **Used by:** `ProjectMembersTab`

---

## projects/posts

### `ProjectPostsTab`
Lists project posts as `ProjectPostCard`s. When `canManage` is true, shows create and delete actions. Manages modal state for `CreatePostModal` and `DeletePostModal`.
- **Props:** `projectId, memberId, canManage, basePath`
- **Used by:** `pages/projects/AdminProjectDetail`, `pages/projects/OfficerProjectDetail`

### `ProjectPostCard`
Row displaying a post's author avatar, title, date, and optional delete button. Links to the post detail route.
- **Props:** `post, to, onDelete?`
- **Used by:** `ProjectPostsTab`

### `CreatePostModal`
Modal for writing a new post (title + content). Owns form state, validation, and `useCreateProjectPost` mutation.
- **Props:** `projectId, memberId, onClose`
- **Used by:** `ProjectPostsTab`

### `DeletePostModal`
Confirmation modal for deleting a post.
- **Props:** `post, projectId, onClose`
- **Used by:** `ProjectPostsTab`

### `PostDetail`
Toggles between `PostDetailView` (read mode) and `PostDetailForm` (edit mode) based on local state.
- **Props:** `post, projectId, canEdit`
- **Used by:** `pages/projects/ProjectPostDetail`

### `PostDetailView`
Read-only full post display with author info, title, content, and an edit button when `canEdit` is true.
- **Props:** `post, canEdit, onEdit`
- **Used by:** `PostDetail`

### `PostDetailForm`
Inline edit form for post title and content. Owns field state, validation, and `useUpdateProjectPost` mutation.
- **Props:** `post, projectId, onCancel, onSuccess`
- **Used by:** `PostDetail`

---

## projects/comments

### `CommentSection`
Renders the full comment thread for a post. Fetches comments and project members, handles top-level comment creation, and manages reply state. Passes `canAct` to each `CommentCard` based on authorship or project admin role.
- **Props:** `postId, projectId, memberId`
- **Used by:** `pages/projects/ProjectPostDetail`

### `CommentCard`
Displays a single comment with author avatar, content, timestamp, and reply button. Supports inline editing and shows a `···` menu for edit/delete when `canAct` is true. Renders `DeleteCommentModal` and `ReplyForm` inline.
- **Props:** `comment, canAct, onReply, isIndented?`
- **Used by:** `CommentSection`

### `DeleteCommentModal`
Confirmation modal for deleting a comment.
- **Props:** `comment, onClose`
- **Used by:** `CommentCard`

### `ReplyForm`
Inline textarea form for submitting a threaded reply to a comment. Owns content state and `useCreateProjectPostComment` mutation.
- **Props:** `postId, memberId, replyToId, onClose`
- **Used by:** `CommentSection`
