import type { ClubInfo } from "../types/club";
import supabase from '../supabase/supabase'

const clubInfoId = import.meta.env.VITE_SUPABASE_CLUB_INFO_ID;

export const getClubInfo = async (): Promise<ClubInfo> => {
  const { data, error } = await supabase
    .from('club_info')
    .select('*')
    .single()
  if (error) throw error
  return data
}

export const updateClubInfo = async (updates: Partial<Omit<ClubInfo, 'id'>>): Promise<void> => {
  const { error } = await supabase
    .from('club_info')
    .update(updates)
    .eq('id', clubInfoId)

  if (error) throw error
}
