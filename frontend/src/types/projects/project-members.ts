import type { Member } from '../members'

export type ProjectMemberRole = 'admin' | 'contributor'

export interface ProjectMember extends Omit<Member, 'role' | 'title'> {
  project_id: string
  role: ProjectMemberRole
  title: string
}

export type ProjectMemberInsert = {
  project_id: string
  member_id: string
  role: ProjectMemberRole
  title: string
}

export type ProjectMemberUpdate = Pick<ProjectMemberInsert, 'role' | 'title'>
