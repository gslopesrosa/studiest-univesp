import { useAuth } from '@/features/auth/presentation/contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export function PrivateRoute({ children }: any) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return null

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return children
}