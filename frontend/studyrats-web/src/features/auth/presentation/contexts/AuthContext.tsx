import { createContext, useContext, useEffect, useState } from 'react'
import { LoginParams } from '../../domain/types/LoginParams'
import { User } from '../../domain/entities/User'
import { LoginUser } from '../../application/usecases/LoginUser'
import { AuthApi } from '../../infrastructure/api/AuthApi'
import { tokenStorage } from '@/shared/infrastructure/storage/tokenStorage'

interface AuthContextData {
  user: User | null
  login: (params: LoginParams) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const authApi = new AuthApi()
  const loginUser = new LoginUser(authApi)

  useEffect(() => {
    async function loadUser() {
      const token = tokenStorage.get()

      if (!token) {
        setLoading(false)
        return
      }

      try {
        const user = await authApi.getMe()
        setUser(user)
      } catch {
        tokenStorage.remove()
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  async function login(params: LoginParams) {
    const response = await loginUser.execute(params)

    tokenStorage.set(response.token)
    setUser(response.user)
  }

  function logout() {
    tokenStorage.remove()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}