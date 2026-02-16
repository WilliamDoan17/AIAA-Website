import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing.tsx'
import Projects from './pages/Projects.tsx'
import Events from './pages/Events.jsx'
import Members from './pages/Members.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
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
