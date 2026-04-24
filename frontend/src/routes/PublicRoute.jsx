import { Route, Routes } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import Landing from '../pages/Landing'
import Projects from '../pages/Projects'
import Events from '../pages/Events'
import Members from '../pages/Members'

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
