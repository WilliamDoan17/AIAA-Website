import type { ClubInfo } from "../types/club";
import supabase from '../supabase/supabase'

export const getClubInfo = async (): Promise<ClubInfo> => {
  const { data, error } = await supabase
    .from('club_info')
    .select('*')
    .limit(1)
    .single()
  if (error) throw error
  return data
}


