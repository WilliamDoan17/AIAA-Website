import useAuth from "../hooks/useAuth";
import { Route, Routes, Navigate } from 'react-router-dom'
import AdminClub from '../pages/AdminClub'
import AdminLayout from "../layouts/AdminLayout";
import AdminMembers from "../pages/AdminMembers";

const AdminRoute = () => {
  const { member, loading } = useAuth();
  if (loading) return null;
  if (member?.role !== "admin") {
    return <Navigate to="/u/" />
  }

  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="club" element={<AdminClub />} />
        <Route path="members" element={<AdminMembers />}></Route>
      </Route>
    </Routes>
  )
}

export default AdminRoute;
