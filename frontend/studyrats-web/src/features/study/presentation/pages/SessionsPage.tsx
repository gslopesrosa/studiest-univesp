import { SessionCard } from '../components/SessionCard'
import { useSessions } from '../hooks/useSessions'

export function SessionsPage() {
  const { sessions, loading } = useSessions()

  if (loading) {
    return <p style={{ color: 'white' }}>Carregando...</p>
  }

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>
        📝 Registros de Sessões
      </h2>

      <div
        style={{
          display: 'grid',
          gap: 16,
        }}
      >
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
          />
        ))}
      </div>
    </div>
  )
}