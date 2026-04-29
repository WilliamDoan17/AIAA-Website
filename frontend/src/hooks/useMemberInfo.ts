import { useState, useEffect, useCallback } from "react"
import type { Member } from "../types/member"
import { getMemberInfo } from "../services/members"

const useMemberInfo = (id: string) => {
  const [memberInfo, setMemberInfo] = useState<Member | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMemberInfo = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getMemberInfo(id)
      setMemberInfo(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch member"))
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchMemberInfo()
  }, [fetchMemberInfo])

  return {
    memberInfo,
    loading,
    error,
    refetch: fetchMemberInfo,
  }
}

export default useMemberInfo
