# SERVICES

Supabase and related backend services for the AIAA-Website.

---

## auth
`src/services/auth.ts`

- `login(email, password)` -> `void` : login with email and password
- `logout()` -> `void` : logout current user

---

## club_info
`src/services/clubInfo.ts`

- `getClubInfo()` -> `ClubInfo` : get club info
- `updateClubInfo(updates: Partial<ClubInfo>)` -> `void` : update club info (admin only)

---

## members
`src/services/members.ts`

- `getAllMembers()` -> `Member[]` : get all members
- `getMemberById(id: string)` -> `Member` : get a member by id (admin can get all, officer can only get their own)
- `inviteMember(info: MemberInsert)` -> `void` : calls Edge Function `invite-member` (admin only)
- `updateMember(id: string, updates: MemberUpdate)` -> `void` : update a member (admin can update all, officer can only update their own)
- `deleteMember(id: string)` -> `void` : delete a member (admin only)

---

## events
`src/services/events.ts`

- `getAllEvents()` -> `Event[]` : get all events
- `getEventById(id: string)` -> `Event` : get an event by id
- `createEvent(info: EventInsert)` -> `void` : create a new event
- `updateEvent(id: string, updates: EventUpdate)` -> `void` : update an event
- `deleteEvent(id: string)` -> `void` : delete an event

## projects

### projects
`src/services/projects/projects.ts`

- `getAllProjects()` -> `Project[]` : get all projects
- `getProjectsByMemberId(memberId: string)` -> `Project[]` : get projects by member id
- `getProjectById(id: string)` -> `Project` : get a project by id
- `createProject(info: ProjectInsert)` -> `void` : create a new project
- `updateProject(id: string, updates: ProjectUpdate)` -> `void` : update a project
- `deleteProject(id: string)` -> `void` : delete a project

### project-members
`src/services/projects/project-members.ts`

- `getMembersByProjectId(projectId: string)` -> `ProjectMember[]`: get all members of a project
- `addProjectMember(info: ProjectMemberInsert)` -> `void`: add a club member to a project with role and title
- `updateProjectMember(projectId: string, memberId: string, updates: ProjectMemberUpdate)` -> `void`: update a project member's role or title
- `removeProjectMember(projectId: string, memberId: string)` -> `void`: remove a member from a project
