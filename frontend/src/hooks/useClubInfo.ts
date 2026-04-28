import { useContext } from 'react'
import ClubInfoContext from '../contexts/ClubInfoContext'

const useClubInfo = () => useContext(ClubInfoContext)

export default useClubInfo
