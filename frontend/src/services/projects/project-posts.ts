import supabase from "../../supabase/supabase";
import type { Member } from "../../types/members";
import type { ProjectPostDetail, ProjectPostInsert, ProjectPostUpdate } from "../../types/projects/project-posts";

const mapPost = (row: any): ProjectPostDetail => ({
  id: row.id,
  project_id: row.project_id,
  author_id: row.author_id,
  title: row.title,
  content: row.content,
  created_at: row.created_at,
  updated_at: row.updated_at,
  author: row.club_members as unknown as Member,
})

export const getProjectPostsByProjectId = async (projectId: string): Promise<ProjectPostDetail[]> => {
  const { data, error } = await supabase
    .from('project_posts')
    .select('*, club_members(*)')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []).map(mapPost)
}

export const getProjectPostById = async (postId: string): Promise<ProjectPostDetail> => {
  const { data, error } = await supabase
    .from('project_posts')
    .select('*, club_members(*)')
    .eq('id', postId)
    .single()

  if (error) throw error
  return mapPost(data)
}

export const createProjectPost = async (info: ProjectPostInsert): Promise<void> => {
  const { error } = await supabase
    .from('project_posts')
    .insert(info)

  if (error) throw error
}

export const updateProjectPost = async (postId: string, updates: ProjectPostUpdate): Promise<void> => {
  const { error } = await supabase
    .from('project_posts')
    .update(updates)
    .eq('id', postId)

  if (error) throw error
}

export const deleteProjectPost = async (postId: string): Promise<void> => {
  const { error } = await supabase
    .from('project_posts')
    .delete()
    .eq('id', postId)

  if (error) throw error
}
