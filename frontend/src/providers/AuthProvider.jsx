import { useState, useEffect } from 'react'
import AuthContext from '../contexts/AuthContext'
import supabase from '../supabase/supabase';

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null)

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
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
