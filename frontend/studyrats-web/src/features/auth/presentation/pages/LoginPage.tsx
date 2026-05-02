import { Link } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
import { AuthCard } from '../components/AuthCard'

export function LoginPage() {
  return (
    <AuthCard title="Login">
      <LoginForm />

      <p style={{ marginTop: 16 }}>
        Não tem conta? <Link to="/register">Criar conta</Link>
      </p>
    </AuthCard>
  )
}