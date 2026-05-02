import { useState } from 'react'
import { registerSchema } from '../schemas/registerSchema'
import { useNavigate } from 'react-router-dom'
import { AuthApi } from '../../infrastructure/api/AuthApi'
import { RegisterUser } from '../../application/usecases/RegisterUser'
import toast from 'react-hot-toast'

export function useRegister() {
  const navigate = useNavigate()
  const authApi = new AuthApi()
  const registerUser = new RegisterUser(authApi)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const result = registerSchema.safeParse({ name, email, password })

    if (!result.success) {
      setError(result.error.issues[0]?.message || 'Erro de validação')
      return
    }

    try {
      await registerUser.execute({ name, email, password })

      toast.success('Conta criada com sucesso! 🎉')

      navigate('/')
    } catch {
      setError('Erro ao cadastrar')
    }
  }

  return {
    name,
    email,
    password,
    error,
    setName,
    setEmail,
    setPassword,
    handleSubmit,
  }
}