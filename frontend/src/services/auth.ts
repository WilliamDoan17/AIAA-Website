import supabase from '../supabase/supabase'

export const login = async (email: string, password: string): Promise<void> => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) {
    throw error
  }
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error
  }
}
