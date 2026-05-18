import supabase from "../../supabase/supabase";
import type { Project, ProjectInsert, ProjectUpdate } from "../../types/projects/projects";

export const getAllProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')

  if (error) throw error
  return data ?? []
}

export const getProjectsByMemberId = async (memberId: string): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('project_members')
    .select('projects(*)')
    .eq('member_id', memberId)

  if (error) throw error

  return (data ?? []).map(row => row.projects as unknown as Project)
}

export const getProjectById = async (id: string): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const createProject = async (info: ProjectInsert): Promise<void> => {
  const { error } = await supabase
    .from('projects')
    .insert(info)

  if (error) throw error
}

export const updateProject = async (id: string, updates: ProjectUpdate): Promise<void> => {
  const { error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)

  if (error) throw error
}

export const deleteProject = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) throw error
}
