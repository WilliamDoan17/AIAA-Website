import supabase from "../supabase/supabase";
import type { Member, MemberInput } from "../types/member";

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
  const { error } = await supabase.functions.invoke('invite-member', {
    body: info,
  })
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
