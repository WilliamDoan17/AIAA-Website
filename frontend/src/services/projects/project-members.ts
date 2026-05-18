import supabase from "../../supabase/supabase";
import type { Member } from "../../types/members";
import type { ProjectMemberDetail, ProjectMemberInsert, ProjectMemberUpdate } from "../../types/projects/project-members";

export const getMembersByProjectId = async (projectId: string): Promise<ProjectMemberDetail[]> => {
  const { data, error } = await supabase
    .from('project_members')
    .select('*, club_members(*)')
    .eq('project_id', projectId)

  if (error) throw error
  return (data ?? []).map(row => ({
    project_id: row.project_id,
    member_id: row.member_id,
    role: row.role,
    title: row.title,
    member: row.club_members as unknown as Member,
  }))
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
