import { useState, useEffect } from "react"
import { getAllMembers } from "../services/members"
import { Member } from "../types/member"

const useMembers = () => {
  const [data, setData] = useState<Member[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    getAllMembers()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}

export default useMembers
