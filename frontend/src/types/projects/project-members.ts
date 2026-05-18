import type { Member } from '../members'

export type ProjectMemberRole = 'admin' | 'contributor'

export interface ProjectMember {
  project_id: string
  member_id: string
  role: ProjectMemberRole
  title: string
}

export interface ProjectMemberDetail extends ProjectMember {
  member: Member
}

export type ProjectMemberInsert = ProjectMember
export type ProjectMemberUpdate = Pick<ProjectMember, 'role' | 'title'>
