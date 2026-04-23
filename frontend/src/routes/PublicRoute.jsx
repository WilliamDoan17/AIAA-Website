import { Route, Routes } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import Landing from '../pages/landing/Landing'
import Projects from '../pages/projects/index.jsx'
import Events from '../pages/events/index.jsx'
import Members from '../pages/members/index.jsx'

const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Landing></Landing>}></Route>
        <Route path="projects" element={<Projects></Projects>}></Route>
        <Route path="events" element={<Events></Events>}></Route>
        <Route path="members" element={<Members></Members>}></Route>
      </Route>
    </Routes>

  )
}

export default PublicRoute
