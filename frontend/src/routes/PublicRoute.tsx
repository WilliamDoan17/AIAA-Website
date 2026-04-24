import { Route, Routes } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import Landing from '../pages/Landing'
import Projects from '../pages/Projects'
import Events from '../pages/Events'
import Members from '../pages/Members'
import Login from '../pages/Login'

const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Landing></Landing>}></Route>
        <Route path="projects" element={<Projects></Projects>}></Route>
        <Route path="events" element={<Events></Events>}></Route>
        <Route path="members" element={<Members></Members>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
      </Route>
    </Routes>

  )
}

export default PublicRoute
