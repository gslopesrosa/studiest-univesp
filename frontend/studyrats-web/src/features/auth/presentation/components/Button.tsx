interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

export function Button({ loading, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      style={{
        width: '100%',
        padding: '10px',
        borderRadius: 8,
        border: 'none',
        background: '#f97316',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        opacity: loading ? 0.7 : 1,
        transition: '0.2s',
      }}
      onMouseOver={(e) => (e.currentTarget.style.background = '#ea580c')}
      onMouseOut={(e) => (e.currentTarget.style.background = '#f97316')}
    >
      {loading ? 'Carregando...' : children}
    </button>
  )
}