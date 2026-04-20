import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './css/index.css'
import RegisterPage from './pages/auth/RegisterPage'
import LoginPage from './pages/auth/LoginPage'
import LandingPage from './pages/landing/LandingPage'
import { RouteGuard } from './components/RouteGuard'
import HomePage from './pages/home/Homepage'
import RedirectPage from './pages/redirect/RedirectPage'
import VerifyPage from './pages/auth/VerifyPage'
import OnboardingPage from './pages/onboarding/OnboardingPage'
import RecipeDetailPage from './pages/recipe/RecipeDetailPage'
import ResetPwPage from './pages/auth/ResetPwPage'
import ForgotPwPage from './pages/auth/ForgotPwPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/reset" element={<ResetPwPage />} />
        <Route path="/forgot" element={<ForgotPwPage />} />
        {/* Protected Routes */}
        <Route element={<RouteGuard />}>
          <Route path="/redirect" element={<RedirectPage />} />
          <Route path="/home" element = {<HomePage/>} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          {/* new routes */}
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
