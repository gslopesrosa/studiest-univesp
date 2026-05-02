interface FormFieldProps {
  label: string
  error?: string
  children: React.ReactNode
}

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div style={{ marginBottom: 12, width: '94%' }}>
      <label style={{ fontSize: 14, color: '#94a3b8' }}>{label}</label>
      <div>{children}</div>
      {error && (
        <p style={{ color: 'red', fontSize: 12 }}>
          {error}
        </p>
      )}
    </div>
  )
}