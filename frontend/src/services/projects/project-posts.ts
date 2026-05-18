import supabase from "../../supabase/supabase";
import type { ProjectPost, ProjectPostInsert, ProjectPostUpdate } from "../../types/projects/project-posts";

export const getProjectPostsByProjectId = async (projectId: string): Promise<ProjectPost[]> => {
  const { data, error } = await supabase
    .from('project_posts')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export const getProjectPostById = async (postId: string): Promise<ProjectPost> => {
  const { data, error } = await supabase
    .from('project_posts')
    .select('*')
    .eq('id', postId)
    .single()

  if (error) throw error
  return data
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
