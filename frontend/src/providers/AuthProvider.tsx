import { useState, useEffect } from 'react'
import AuthContext from '../contexts/AuthContext'
import supabase from '../supabase/supabase';
import type { User } from '../types/auth';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false);
    })

    return () => data.subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider >
  )
}

export default AuthProvider
