import supabase from '../supabase/supabase.js'

export const login = async (email, password) => {
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
