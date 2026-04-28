import { Route, Routes, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import AdminRoute from './AdminRoute'

const ProtectedRoute = () => {
  const { user, member, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" />

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Navigate to={member?.role === 'admin' ? '/u/admin/' : '/u/'} replace />} />
        <Route path="admin/*" element={<AdminRoute />} />
      </Route>
    </Routes>
  )
}

export default ProtectedRoute
