interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

export function Button({ loading, children, ...props }: ButtonProps) {
  return (
    <button {...props} disabled={loading || props.disabled}>
      {loading ? 'Carregando...' : children}
    </button>
  )
}