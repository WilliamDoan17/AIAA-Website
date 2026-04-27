import supabase from "../supabase/supabase";
import { Member } from "../types/member";

type MemberInput = Omit<Member, 'id' | 'created_at'>

export const getAllMembers = async (): Promise<Member[]> => {
  const { data, error } = await supabase
    .from('club_members')
    .select('*')

  if (error) throw error
  return data ?? []
}

export const getMemberInfo = async (id: string): Promise<Member> => {
  const { data, error } = await supabase
    .from('club_members')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const inviteMember = async (info: MemberInput): Promise<void> => {
  const { data: authData, error: authError } = await supabase.auth.admin.inviteUserByEmail(email)
  if (authError) throw authError

  const { error } = await supabase
    .from('club_members')
    .insert({ id: authData.user.id, ...info })

  if (error) throw error
}

export const updateMember = async (id: string, updates: Partial<Member>): Promise<void> => {
  const { error } = await supabase
    .from('club_members')
    .update(updates)
    .eq('id', id)

  if (error) throw error
}

export const deleteMember = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('club_members')
    .delete()
    .eq('id', id)

  if (error) throw error
}
