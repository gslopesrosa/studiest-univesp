interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      style={{
        width: '100%',
        padding: '10px',
        borderRadius: 8,
        border: '1px solid #334155',
        background: '#0f172a',
        color: 'white',
        outline: 'none',
      }}
    />
  )
}