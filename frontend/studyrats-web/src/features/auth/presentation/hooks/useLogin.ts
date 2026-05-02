import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { loginSchema } from '../schemas/loginSchema'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export function useLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = loginSchema.safeParse({ email, password })

    if (!result.success) {
      setError(result.error.issues[0]?.message || 'Erro de validação')
      setLoading(false)
      return
    }

    try {
      await login({ email, password })

      toast.success('Login realizado com sucesso! 🎉')
      
      navigate('/dashboard')
    } catch {
      setError('Erro ao fazer login')
    } finally {
    setLoading(false)
  }
  }

  return {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleSubmit,
  }
}