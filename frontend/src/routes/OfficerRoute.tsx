import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const OfficerRoute = () => {
  const { member, loading } = useAuth()
  if (loading) return null
  if (member?.role === 'admin') return <Navigate to="/u/admin/" />

  return <Outlet />
}

export default OfficerRoute
