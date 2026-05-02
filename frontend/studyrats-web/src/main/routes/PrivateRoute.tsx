import { Navigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/presentation/contexts/AuthContext'
import { JSX } from 'react'

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}