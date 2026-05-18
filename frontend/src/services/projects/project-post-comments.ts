import supabase from "../../supabase/supabase";
import type { Member } from "../../types/members";
import type { ProjectPostCommentDetail, ProjectPostCommentInsert, ProjectPostCommentUpdate } from "../../types/projects/project-post-comments";

export const getCommentsByPostId = async (postId: string): Promise<ProjectPostCommentDetail[]> => {
  const { data, error } = await supabase
    .from('project_post_comments')
    .select('*, club_members(*)')
    .eq('post_id', postId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return (data ?? []).map(row => ({
    id: row.id,
    post_id: row.post_id,
    author_id: row.author_id,
    content: row.content,
    reply_to_id: row.reply_to_id,
    created_at: row.created_at,
    updated_at: row.updated_at,
    author: row.club_members as unknown as Member,
  }))
}

export const getProjectPostCommentById = async (commentId: string): Promise<ProjectPostCommentDetail> => {
  const { data, error } = await supabase
    .from('project_post_comments')
    .select('*, club_members(*)')
    .eq('id', commentId)
    .single()

  if (error) throw error
  return {
    id: data.id,
    post_id: data.post_id,
    author_id: data.author_id,
    content: data.content,
    reply_to_id: data.reply_to_id,
    created_at: data.created_at,
    updated_at: data.updated_at,
    author: data.club_members as unknown as Member,
  }
}

export const createProjectPostComment = async (info: ProjectPostCommentInsert): Promise<void> => {
  const { error } = await supabase
    .from('project_post_comments')
    .insert(info)

  if (error) throw error
}

export const updateProjectPostComment = async (commentId: string, updates: ProjectPostCommentUpdate): Promise<void> => {
  const { error } = await supabase
    .from('project_post_comments')
    .update(updates)
    .eq('id', commentId)

  if (error) throw error
}

export const deleteProjectPostComment = async (commentId: string): Promise<void> => {
  const { error } = await supabase
    .from('project_post_comments')
    .delete()
    .eq('id', commentId)

  if (error) throw error
}
