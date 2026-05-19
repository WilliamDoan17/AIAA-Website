import type { Member } from '../members'

export interface ProjectPost {
  id: string
  project_id: string
  author_id: string
  title: string
  content: string
  created_at: string
  updated_at: string
}

export interface ProjectPostDetail extends ProjectPost {
  author: Member
}

export type ProjectPostInsert = Omit<ProjectPost, 'id' | 'created_at' | 'updated_at'>
export type ProjectPostUpdate = Pick<ProjectPost, 'title' | 'content'>
