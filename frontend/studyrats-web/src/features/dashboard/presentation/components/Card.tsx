export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: '#1e293b',
        padding: 16,
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      }}
    >
      {children}
    </div>
  )
}