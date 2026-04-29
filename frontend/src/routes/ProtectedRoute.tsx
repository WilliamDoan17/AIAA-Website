import { Route, Routes, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import AdminRoute from './AdminRoute'
import OfficerRoute from './OfficerRoute'
import SetupGuardModal from '../components/SetupGuardModal'

const ProtectedRoute = () => {
  const { user, member, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" />

  return (
    <>
      {member && !member.is_setup && <SetupGuardModal />}
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to={member?.role === 'admin' ? '/u/admin/' : '/u/officer/'} replace />} />
          <Route path="admin/*" element={<AdminRoute />} />
          <Route path="officer/*" element={<OfficerRoute />} />
        </Route>
      </Routes>
    </>
  )
}

export default ProtectedRoute
