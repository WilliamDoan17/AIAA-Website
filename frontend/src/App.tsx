import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicRoute from './routes/PublicRoute'
import ProtectedRoute from './routes/ProtectedRoute'
import AuthProvider from './providers/AuthProvider'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<PublicRoute></PublicRoute>}></Route>
          <Route path="/u/*" element={<ProtectedRoute></ProtectedRoute>}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
