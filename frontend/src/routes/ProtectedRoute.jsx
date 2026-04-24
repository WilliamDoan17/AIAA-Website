import { Route, Routes, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const ProtectedRoute = () => {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login"></Navigate>

  return (
    <Routes>
      <Route path="/">
        {/* will add route components with page later */}
      </Route>
    </Routes>
  )
}

export default ProtectedRoute
