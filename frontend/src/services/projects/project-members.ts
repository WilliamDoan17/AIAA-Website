import supabase from "../../supabase/supabase";
import type { ProjectMember, ProjectMemberInsert, ProjectMemberUpdate } from "../../types/projects/project-members";

export const getMembersByProjectId = async (projectId: string): Promise<ProjectMember[]> => {
  const { data, error } = await supabase
    .from('project_members')
    .select('*')
    .eq('project_id', projectId)

  if (error) throw error
  return data ?? []
}

export const addProjectMember = async (info: ProjectMemberInsert): Promise<void> => {
  const { error } = await supabase
    .from('project_members')
    .insert(info)

  if (error) throw error
}

export const updateProjectMember = async (projectId: string, memberId: string, updates: ProjectMemberUpdate): Promise<void> => {
  const { error } = await supabase
    .from('project_members')
    .update(updates)
    .eq('project_id', projectId)
    .eq('member_id', memberId)

  if (error) throw error
}

export const removeProjectMember = async (projectId: string, memberId: string): Promise<void> => {
  const { error } = await supabase
    .from('project_members')
    .delete()
    .eq('project_id', projectId)
    .eq('member_id', memberId)

  if (error) throw error
}
