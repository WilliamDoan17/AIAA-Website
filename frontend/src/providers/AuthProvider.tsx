import { useState, useEffect } from 'react'
import AuthContext from '../contexts/AuthContext'
import supabase from '../supabase/supabase';
import type { User } from '../types/auth';
import { getMemberInfo } from '../services/members';
import type { Member } from '../types/member';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null)
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    const getCurrentMember = async (id: string) => {
      const currMember = await getMemberInfo(id);
      setMember(currMember);
    }

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      const currUser = session?.user ?? null;
      setUser(currUser)
      if (currUser) {
        getCurrentMember(currUser.id);
      } else {
        setMember(null);
      }
      setLoading(false);
    })

    return () => data.subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        member,
      }}
    >
      {children}
    </AuthContext.Provider >
  )
}

export default AuthProvider
