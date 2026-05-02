import { useState } from 'react'
import { LoginUser } from '../../application/usecases/LoginUser'
import { AuthApi } from '../../infrastructure/api/AuthApi'
import { LoginParams } from '../../domain/types/LoginParams'
import { LoginResponse } from '../../domain/types/LoginResponse'

export function useAuth() {
  const [user, setUser] = useState<LoginResponse['user'] | null>(null)

  const authApi = new AuthApi()
  const loginUser = new LoginUser(authApi)

  async function login(params: LoginParams) {
    const response = await loginUser.execute(params)

    localStorage.setItem('token', response.token)

    setUser(response.user)
  }

  return {
    user,
    login,
  }
}