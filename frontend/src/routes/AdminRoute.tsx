import useAuth from "../hooks/useAuth";
import { Routes } from 'react-router-dom'

const AdminRoute = () => {
  const { user, member: { role }, loading } = useAuth();
  if (loading) return null;

  return (
    <Routes>
    </Routes>
  )
}

export default AdminRoute;
