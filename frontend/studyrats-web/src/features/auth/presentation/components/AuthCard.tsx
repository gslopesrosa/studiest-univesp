interface AuthCardProps {
  title: string
  children: React.ReactNode
}

export function AuthCard({ title, children }: AuthCardProps) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: 400,
        padding: 24,
        borderRadius: 12,
        background: '#1e293b',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#f97316' }}>{title}</h2>
        {children}
      </div>
    </div>
  )
}