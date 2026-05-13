import { useRegister } from '../hooks/useRegister'
import { Button } from './Button'
import { FormField } from './FormField'
import { Input } from './Input'

export function RegisterForm() {
  const {
    name,
    email,
    password,
    error,
    loading,
    setName,
    setEmail,
    setPassword,
    handleSubmit,
  } = useRegister()

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="Nome">
        <Input
          type="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormField>
      <FormField label="Email">
        <Input
          type="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormField>
      <FormField label="Senha">
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormField>
      <Button type="submit" loading={loading}>
        Cadastrar
      </Button>
      {error && <p>{error}</p>}
    </form>
  )
}