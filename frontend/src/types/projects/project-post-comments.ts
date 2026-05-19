import type { Member } from '../members'

export interface ProjectPostComment {
  id: string
  post_id: string
  author_id: string
  content: string
  reply_to_id: string | null
  created_at: string
  updated_at: string
}

export interface ProjectPostCommentDetail extends ProjectPostComment {
  author: Member
}

export type ProjectPostCommentInsert = Omit<ProjectPostComment, 'id' | 'created_at' | 'updated_at'>
export type ProjectPostCommentUpdate = Pick<ProjectPostComment, 'content'>
