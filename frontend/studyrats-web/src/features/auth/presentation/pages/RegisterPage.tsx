import { Link } from 'react-router-dom'
import { RegisterForm } from '../components/RegisterForm'
import { AuthCard } from '../components/AuthCard'

export function RegisterPage() {
  return (
    <AuthCard title="Cadastro">
      <RegisterForm />

      <p style={{ marginTop: 16 }}>
        Já tem conta? <Link to="/">Fazer login</Link>
      </p>
    </AuthCard>
  )
}