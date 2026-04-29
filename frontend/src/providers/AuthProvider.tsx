import { useState, useEffect, useRef, useCallback } from 'react'
import AuthContext from '../contexts/AuthContext'
import supabase from '../supabase/supabase';
import type { User } from '../types/auth';
import { getMemberInfo } from '../services/members';
import type { Member } from '../types/member';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null)
  const [member, setMember] = useState<Member | null>(null);
  const userIdRef = useRef<string | null>(null);

  const fetchMemberInfo = useCallback(async (id: string) => {
    const currMember = await getMemberInfo(id);
    setMember(currMember);
  }, [])

  const refetchMember = useCallback(async () => {
    if (!userIdRef.current) return
    await fetchMemberInfo(userIdRef.current)
  }, [fetchMemberInfo])

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      const currUser = session?.user ?? null;
      setUser(currUser)
      userIdRef.current = currUser?.id ?? null
      if (currUser) {
        fetchMemberInfo(currUser.id).finally(() => setLoading(false));
      } else {
        setMember(null);
        setLoading(false);
      }
    })

    return () => data.subscription.unsubscribe()
  }, [fetchMemberInfo])

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        member,
        refetchMember,
      }}
    >
      {children}
    </AuthContext.Provider >
  )
}

export default AuthProvider
