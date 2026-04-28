import { useState, useEffect } from 'react'
import ClubInfoContext from '../contexts/ClubInfoContext'
import { getClubInfo } from '../services/club'
import type { ClubInfo } from '../types/club'

const ClubInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [clubInfo, setClubInfo] = useState<ClubInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getClubInfo()
      .then(setClubInfo)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <ClubInfoContext.Provider value={{ clubInfo, loading }}>
      {children}
    </ClubInfoContext.Provider>
  )
}

export default ClubInfoProvider
