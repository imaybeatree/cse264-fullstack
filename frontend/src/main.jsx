import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './css/index.css'
import RegisterPage from './pages/auth/RegisterPage'
import LoginPage from './pages/auth/LoginPage'
import LandingPage from './pages/landing/LandingPage'
import { RouteGuard } from './components/RouteGuard'
import HomePage from './pages/home/Homepage'
import OnboardingPage from './pages/auth/OnboardingPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        {/* Protected Routes */}
        <Route element={<RouteGuard />}>
          <Route path="/home" element = {<HomePage/>} />
        </Route>
      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
