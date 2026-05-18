export type ProjectMemberRole = 'admin' | 'contributor'

export interface ProjectMember {
  project_id: string
  member_id: string
  role: ProjectMemberRole
  title: string
}

export type ProjectMemberInsert = ProjectMember
export type ProjectMemberUpdate = Pick<ProjectMember, 'role' | 'title'>
