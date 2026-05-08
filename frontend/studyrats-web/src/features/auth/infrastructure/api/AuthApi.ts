import { tokenStorage } from '@/shared/infrastructure/storage/tokenStorage'
import { AuthRepository } from '../../application/protocols/AuthRepository'
import { LoginParams } from '../../domain/types/LoginParams'
import { LoginResponse } from '../../domain/types/LoginResponse'
import { RegisterParams } from '../../domain/types/RegisterParams'
import { RegisterResponse } from '../../domain/types/RegisterResponse'

export class AuthApi implements AuthRepository {
  async login(params: LoginParams): Promise<LoginResponse> {
    const response = await fetch('http://localhost:3333/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error('Login failed')
    }

    const data = await response.json()

    return {
      user: data.user,
      token: data.token,
    }
  }

  async register(params: RegisterParams): Promise<RegisterResponse> {
    const response = await fetch('http://localhost:3333/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error('Register failed')
    }

    const data = await response.json()

    return {
      user: data.user,
      token: data.token,
    }
  }

  async getMe() {
    const token = tokenStorage.get()

    const response = await fetch('http://localhost:3333/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Unauthorized')
    }

    const data = await response.json()

    return data.user
  }
}