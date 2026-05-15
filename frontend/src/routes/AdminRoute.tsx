import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const AdminRoute = () => {
  const { member, loading } = useAuth()
  if (loading) return null
  if (member?.role !== 'admin') return <Navigate to="/u/" />

  return <Outlet />
}

export default AdminRoute
