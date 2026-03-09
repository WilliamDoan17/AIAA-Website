import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Projects from './pages/projects/index'
import Events from './pages/events/index'
import Members from './pages/members/index'
import PageLayout from './components/PageLayout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Landing></Landing>}></Route>
          <Route path="projects" element={<Projects></Projects>}></Route>
          <Route path="events" element={<Events></Events>}></Route>
          <Route path="members" element={<Members></Members>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
