import { createContext } from 'react'
import type { ClubInfo } from '../types/club'

interface ClubInfoContextType {
  clubInfo: ClubInfo | null
  loading: boolean
}

const ClubInfoContext = createContext<ClubInfoContextType>({
  clubInfo: null,
  loading: true,
})

export default ClubInfoContext
