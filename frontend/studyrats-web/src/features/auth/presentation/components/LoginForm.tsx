import { useLogin } from '../hooks/useLogin'
import { Button } from './Button'
import { FormField } from './FormField'
import { Input } from './Input'

export function LoginForm() {
  const {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLogin()

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="Email">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </FormField>

      <FormField label="Senha">
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </FormField>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Button type="submit" loading={loading}>
        Entrar
      </Button>
    </form>
  )
}