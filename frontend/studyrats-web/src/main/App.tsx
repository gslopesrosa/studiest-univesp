import { AuthProvider } from '@/features/auth/presentation/contexts/AuthContext'
import { AppRoutes } from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast'

export function App() {
  return (
    <>
      <Toaster position="top-right" />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  )
}