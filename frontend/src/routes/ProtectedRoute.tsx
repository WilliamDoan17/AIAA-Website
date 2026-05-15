import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import SetupGuardModal from '../components/SetupGuardModal'

const ProtectedRoute = () => {
  const { user, member, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" />

  return (
    <>
      {member && !member.is_setup && <SetupGuardModal />}
      <Outlet />
    </>
  )
}

export const ProtectedIndex = () => {
  const { member, loading } = useAuth()
  if (loading) return null
  return <Navigate to={member?.role === 'admin' ? '/u/admin/' : '/u/officer/'} replace />
}

export default ProtectedRoute
