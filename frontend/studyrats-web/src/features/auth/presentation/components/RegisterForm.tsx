import { useRegister } from '../hooks/useRegister'
import { FormField } from './FormField'
import { Input } from './Input'

export function RegisterForm() {
  const {
    name,
    email,
    password,
    error,
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
      <FormField label="password">
        <Input
          type="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormField>
      <button type="submit">Cadastrar</button>
      {error && <p>{error}</p>}
    </form>
  )
}