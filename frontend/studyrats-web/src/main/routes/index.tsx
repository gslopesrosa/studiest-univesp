import { Routes, Route } from 'react-router-dom'

import { LoginPage } from '@/features/auth/presentation/pages/LoginPage'
import { RegisterPage } from '@/features/auth/presentation/pages/RegisterPage'
import { DashboardPage } from '@/features/dashboard/presentation/pages/DashboardPage'
import { SubjectsPage } from '@/features/subjects/presentation/pages/SubjectsPage'
import { NewSessionPage } from '@/features/study/presentation/pages/NewSessionPage'

import { PrivateRoute } from './PrivateRoute'
import { AppLayout } from '@/shared/layouts/AppLayout'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/subjects" element={<SubjectsPage />} />
        <Route path="/sessions/new" element={<NewSessionPage />} />
      </Route>
    </Routes>
  )
}