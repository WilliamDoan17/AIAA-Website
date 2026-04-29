import { Route, Routes, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import OfficerLayout from '../layouts/OfficerLayout'
import MemberProfile from '../pages/MemberProfile'

const OfficerRoute = () => {
  const { member, loading } = useAuth()
  if (loading) return null
  if (member?.role === 'admin') return <Navigate to="/u/admin/" />

  return (
    <Routes>
      <Route path="/" element={<OfficerLayout />}>
        <Route path="profile" element={<MemberProfile />} />
      </Route>
    </Routes>
  )
}

export default OfficerRoute
