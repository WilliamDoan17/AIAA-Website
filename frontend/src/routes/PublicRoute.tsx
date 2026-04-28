import { Route, Routes } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import Landing from '../pages/Landing'
import PublicProjects from '../pages/PublicProjects'
import PublicEvents from '../pages/PublicEvents'
import PublicMembers from '../pages/PublicMembers'
import Login from '../pages/Login'
import PublicMemberDetail from '../pages/PublicMemberDetail'

const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Landing />} />
        <Route path="projects" element={<PublicProjects />} />
        <Route path="events" element={<PublicEvents />} />
        <Route path="members" element={<PublicMembers />} />
        <Route path="members/:id" element={<PublicMemberDetail />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default PublicRoute
