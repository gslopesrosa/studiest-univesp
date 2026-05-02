interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          flex: 1,
          background: '#0f172a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
        }}
      >
        <img
          src="/logo.svg"
          alt="StudyRats"
          style={{
            maxWidth: '70%',
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f172a',
        }}
      >
        <div
          style={{
            width: 400,
            padding: 28,
            borderRadius: 12,
            background: '#1e293b',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}