import { Link } from 'react-router-dom'
import { RegisterForm } from '../components/RegisterForm'
import { AuthLayout } from '../components/AuthLayout'

export function RegisterPage() {
  return (
    <AuthLayout>
      <h2 style={{ color: '#f97316', marginBottom: 16 }}>Cadastro</h2>
      <RegisterForm />
      <p style={{ marginTop: 16 }}>
        Já tem conta?{' '}
        <Link
          to="/"
          style={{
            color: '#f97316',
            fontWeight: 500,
          }}
        >
          Fazer login
        </Link>
      </p>
    </AuthLayout>
  )
}