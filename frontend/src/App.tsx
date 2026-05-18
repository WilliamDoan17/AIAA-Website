import './App.css'
import QueryProvider from './providers/QueryProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import PublicEventDetail from './pages/PublicEventDetail'
import PublicProjectDetail from './pages/PublicProjectDetail'
import Login from './pages/Login'
import AdminClub from './pages/AdminClub'
import AdminMembers from './pages/AdminMembers'
import AdminEvents from './pages/AdminEvents'
import AdminProjects from './pages/AdminProjects'
import AdminProjectDetail from './pages/AdminProjectDetail'
import MemberProfile from './pages/MemberProfile'

function App() {

  return (
    <QueryProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
              <Route path="/" element={<PublicRoute />}>
                <Route element={<PublicLayout />}>
                  <Route index element={<Landing />} />
                  <Route path="projects" element={<PublicProjects />} />
                  <Route path="projects/:id" element={<PublicProjectDetail />} />
                  <Route path="events" element={<PublicEvents />} />
                  <Route path="events/:id" element={<PublicEventDetail />} />
                  <Route path="members" element={<PublicMembers />} />
                  <Route path="members/:id" element={<PublicMemberDetail />} />
                  <Route path="login" element={<Login />} />
                </Route>
              </Route>
              <Route path="/u" element={<ProtectedRoute />}>
                <Route index element={<ProtectedIndex />} />
                <Route path="admin" element={<AdminRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route index element={null}></Route>
                    <Route path="club" element={<AdminClub />} />
                    <Route path="members" element={<AdminMembers />} />
                    <Route path="events" element={<AdminEvents />} />
                    <Route path="projects" element={<AdminProjects />} />
                    <Route path="projects/:id" element={<AdminProjectDetail />} />
                    <Route path="profile" element={<MemberProfile />} />
                  </Route>
                </Route>
                <Route path="officer" element={<OfficerRoute />}>
                  <Route element={<OfficerLayout />}>
                    <Route index element={null}></Route>
                    <Route path="profile" element={<MemberProfile />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryProvider >
  )
}

export default App
