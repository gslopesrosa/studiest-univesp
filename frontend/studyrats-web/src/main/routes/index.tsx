import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from '@/features/auth/presentation/pages/LoginPage'
import { RegisterPage } from '@/features/auth/presentation/pages/RegisterPage'
import { DashboardPage } from '@/features/dashboard/presentation/pages/DashboardPage'
import { PrivateRoute } from './PrivateRoute'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}