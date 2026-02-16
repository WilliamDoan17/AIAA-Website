import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Landing from './Landing/Landing.tsx';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path = "/"
          element = {<Landing></Landing>}
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
