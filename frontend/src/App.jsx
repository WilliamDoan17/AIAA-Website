import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicRoute from './routes/PublicRoute'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
