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
import Landing from './pages/public/Landing'
import Login from './pages/public/Login'
import PublicProjectList from './pages/projects/PublicProjectList'
import PublicProjectDetail from './pages/projects/PublicProjectDetail'
import AdminProjectList from './pages/projects/AdminProjectList'
import AdminProjectDetail from './pages/projects/AdminProjectDetail'
import OfficerDashboard from './pages/projects/OfficerDashboard'
import OfficerProjectList from './pages/projects/OfficerProjectList'
import OfficerProjectDetail from './pages/projects/OfficerProjectDetail'
import ProjectPostDetail from './pages/projects/ProjectPostDetail'
import PublicMemberList from './pages/members/PublicMemberList'
import PublicMemberDetail from './pages/members/PublicMemberDetail'
import AdminMemberList from './pages/members/AdminMemberList'
import MemberDetail from './pages/members/MemberDetail'
import MemberProfile from './pages/members/MemberProfile'
import PublicEventList from './pages/events/PublicEventList'
import PublicEventDetail from './pages/events/PublicEventDetail'
import AdminEventList from './pages/events/AdminEventList'
import AdminDashboard from './pages/AdminDashboard'
import AdminClub from './pages/club/AdminClub'

function App() {

  return (
    <QueryProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PublicRoute />}>
              <Route element={<PublicLayout />}>
                <Route index element={<Landing />} />
                <Route path="projects" element={<PublicProjectList />} />
                <Route path="projects/:id" element={<PublicProjectDetail />} />
                <Route path="events" element={<PublicEventList />} />
                <Route path="events/:id" element={<PublicEventDetail />} />
                <Route path="members" element={<PublicMemberList />} />
                <Route path="members/:id" element={<PublicMemberDetail />} />
                <Route path="login" element={<Login />} />
              </Route>
            </Route>
            <Route path="/u" element={<ProtectedRoute />}>
              <Route index element={<ProtectedIndex />} />
              <Route path="admin" element={<AdminRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="club" element={<AdminClub />} />
                  <Route path="members" element={<AdminMemberList />} />
                  <Route path="events" element={<AdminEventList />} />
                  <Route path="projects" element={<AdminProjectList />} />
                  <Route path="projects/:id" element={<AdminProjectDetail />} />
                  <Route path="projects/:id/posts/:postId" element={<ProjectPostDetail />} />
                  <Route path="profile" element={<MemberProfile />} />
                  <Route path="member/:id" element={<MemberDetail />} />
                </Route>
              </Route>
              <Route path="officer" element={<OfficerRoute />}>
                <Route element={<OfficerLayout />}>
                  <Route index element={<OfficerDashboard />} />
                  <Route path="projects" element={<OfficerProjectList />} />
                  <Route path="projects/:id" element={<OfficerProjectDetail />} />
                  <Route path="projects/:id/posts/:postId" element={<ProjectPostDetail />} />
                  <Route path="profile" element={<MemberProfile />} />
                  <Route path="member/:id" element={<MemberDetail />} />
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
