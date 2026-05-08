import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { tokenStorage } from '@/shared/infrastructure/storage/tokenStorage'
import { AuthApi } from '@/features/auth/infrastructure/api/AuthApi'
import { LoginParams } from '../../domain/types/LoginParams'
import { User } from '../../domain/entities/User'

const authApi = new AuthApi()


interface AuthContextData {
  user: User | null
  token: string | null
  loading: boolean
  isAuthenticated: boolean
  login: (params: LoginParams) => Promise<void>
  logout: () => void
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      const storedToken = tokenStorage.get()

      if (!storedToken) {
        setLoading(false)
        return
      }

      try {
        setToken(storedToken)

        const user = await authApi.getMe()
        setUser(user)
      } catch (error) {
        console.error('Erro ao carregar usuário:', error)

        tokenStorage.remove()
        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  async function login(params: LoginParams) {
    const response = await authApi.login(params)

    tokenStorage.set(response.token)

    setToken(response.token)
    setUser(response.user)
  }

  function logout() {
    tokenStorage.remove()
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}