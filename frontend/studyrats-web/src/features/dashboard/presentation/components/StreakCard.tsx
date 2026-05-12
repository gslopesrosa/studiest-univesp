import { Card } from './Card'

interface StreakProps {
  current: number
  best: number
  totalDays: number
}

export function StreakCard({ current, best, totalDays }: StreakProps) {
  return (
    <Card>
      <h3 style={{ color: '#f97316', marginBottom: 12 }}>
        🔥 Sequência de estudos
      </h3>
      <p
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        {current} {current === 1 ? 'dia' : 'dias'}
      </p>

      <span style={{ color: '#94a3b8', fontSize: 14 }}>
        seguidos
      </span>
      <div
        style={{
          height: 1,
          background: '#334155',
          margin: '12px 0',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: 12, color: '#94a3b8' }}>🏆 Recorde</p>
          <strong style={{ color: 'white' }}>
            {best} {best === 1 ? 'dia' : 'dias'}
          </strong>
        </div>
        <div>
          <p style={{ fontSize: 12, color: '#94a3b8' }}>📅 Total</p>
          <strong style={{ color: 'white' }}>
            {totalDays} dias
          </strong>
        </div>
      </div>
    </Card>
  )
}