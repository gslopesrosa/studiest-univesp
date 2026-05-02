import { Link } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
import { AuthLayout } from '../components/AuthLayout'

export function LoginPage() {
  return (
    <AuthLayout>
      <h2 style={{ color: '#f97316', marginBottom: 16 }}>Login</h2>
      <LoginForm />
      <p style={{ marginTop: 12 }}>
        Não tem conta?{' '}
        <Link
          to="/register"
          style={{
            color: '#f97316',
            fontWeight: 500,
          }}
        >
          Criar conta
        </Link>
      </p>
    </AuthLayout>
  )
}