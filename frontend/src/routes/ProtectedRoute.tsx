import { Route, Routes, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import AdminRoute from './AdminRoute'

const ProtectedRoute = () => {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login"></Navigate>

  return (
    <Routes>
      <Route path="/">
        {/* will add route components with page later */}
        <Route path="/admin/" element={<AdminRoute />} />
      </Route>
    </Routes>
  )
}

export default ProtectedRoute
