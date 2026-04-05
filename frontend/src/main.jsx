import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './css/index.css'
import RegisterPage from './pages/auth/RegisterPage'
import LoginPage from './pages/auth/LoginPage'
import SuccessPage from './pages/SuccessPage'
import LandingPage from './pages/landing/LandingPage'
import { RouteGuard } from './components/RouteGuard'
import HomePage from './components/Homepage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Protected Routes */}
        <Route element={<RouteGuard />}>
          <Route path="/success" element={<SuccessPage />} />
        </Route>
        <Route path="/homepage" element = {<HomePage/>}>
        </Route>
      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
