interface AuthCardProps {
  title: string
  children: React.ReactNode
}

export function AuthCard({ title, children }: AuthCardProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5',
        textAlign: 'center'
      }}
    >
      <div
        style={{
          width: 400,
          padding: 24,
          borderRadius: 8,
          background: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12
        }}
      >
        <h2 style={{ marginBottom: 16 }}>{title}</h2>

        {children}
      </div>
    </div>
  )
}