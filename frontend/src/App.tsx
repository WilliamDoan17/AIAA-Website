import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicRoute from './routes/PublicRoute'
import ProtectedRoute from './routes/ProtectedRoute'
import AuthProvider from './providers/AuthProvider'
import ClubInfoProvider from './providers/ClubInfoProvider'
import QueryProvider from './providers/QueryProvider'

function App() {

  return (
    <QueryProvider>
      <BrowserRouter>
        <AuthProvider>
          <ClubInfoProvider>
            <Routes>
              <Route path="/*" element={<PublicRoute />} />
              <Route path="/u/*" element={<ProtectedRoute />} />
            </Routes>
          </ClubInfoProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryProvider>
  )
}

export default App
