import './App.css'
import QueryProvider from './providers/QueryProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ClubInfoProvider from './providers/ClubInfoProvider'
import AuthProvider from './providers/AuthProvider'
import PublicRoute from './routes/PublicRoute'
import ProtectedRoute, { ProtectedIndex } from './routes/ProtectedRoute'
import AdminRoute from './routes/AdminRoute'
import OfficerRoute from './routes/OfficerRoute'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'
import OfficerLayout from './layouts/OfficerLayout'
import Landing from './pages/Landing'
import PublicProjects from './pages/PublicProjects'
import PublicEvents from './pages/PublicEvents'
import PublicMembers from './pages/PublicMembers'
import PublicMemberDetail from './pages/PublicMemberDetail'
import Login from './pages/Login'
import AdminClub from './pages/AdminClub'
import AdminMembers from './pages/AdminMembers'
import MemberProfile from './pages/MemberProfile'

function App() {

  return (
    <QueryProvider>
      <BrowserRouter>
        <AuthProvider>
          <ClubInfoProvider>
            <Routes>
              <Route path="/" element={<PublicRoute />}>
                <Route element={<PublicLayout />}>
                  <Route index element={<Landing />} />
                  <Route path="projects" element={<PublicProjects />} />
                  <Route path="events" element={<PublicEvents />} />
                  <Route path="members" element={<PublicMembers />} />
                  <Route path="members/:id" element={<PublicMemberDetail />} />
                  <Route path="login" element={<Login />} />
                </Route>
              </Route>
              <Route path="/u" element={<ProtectedRoute />}>
                <Route index element={<ProtectedIndex />} />
                <Route path="admin" element={<AdminRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route path="club" element={<AdminClub />} />
                    <Route path="members" element={<AdminMembers />} />
                    <Route path="profile" element={<MemberProfile />} />
                  </Route>
                </Route>
                <Route path="officer" element={<OfficerRoute />}>
                  <Route element={<OfficerLayout />}>
                    <Route path="profile" element={<MemberProfile />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </ClubInfoProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryProvider >
  )
}

export default App
