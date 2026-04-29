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

export const resetPassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  const { error } = await supabase.functions.invoke('reset-password', {
    body: { current_password: currentPassword, new_password: newPassword },
  })
  if (error) throw error
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error
  }
}
