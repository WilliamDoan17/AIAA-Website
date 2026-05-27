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
import PublicProjects from './pages/projects/PublicList'
import PublicProjectDetail from './pages/projects/PublicDetail'
import AdminProjects from './pages/projects/AdminList'
import AdminProjectDetail from './pages/projects/AdminDetail'
import MemberProjects from './pages/projects/OfficerList'
import OfficerProjectDetail from './pages/projects/OfficerDetail'
import ProjectPostDetail from './pages/projects/PostDetail'
import PublicMembers from './pages/members/PublicList'
import PublicMemberDetail from './pages/members/PublicDetail'
import AdminMembers from './pages/members/AdminList'
import MemberDetail from './pages/members/Detail'
import MemberProfile from './pages/members/Profile'
import PublicEvents from './pages/events/PublicList'
import PublicEventDetail from './pages/events/PublicDetail'
import AdminEvents from './pages/events/AdminList'
import AdminClub from './pages/club/Admin'

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
                    <Route path="projects/:id/posts/:postId" element={<ProjectPostDetail />} />
                    <Route path="profile" element={<MemberProfile />} />
                    <Route path="member/:id" element={<MemberDetail />} />
                  </Route>
                </Route>
                <Route path="officer" element={<OfficerRoute />}>
                  <Route element={<OfficerLayout />}>
                    <Route index element={null}></Route>
                    <Route path="projects" element={<MemberProjects />} />
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
