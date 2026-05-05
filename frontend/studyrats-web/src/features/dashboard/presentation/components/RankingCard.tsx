import { Card } from './Card'
import { RankingItem } from '../../domain/types/Ranking'

interface Props {
  ranking: RankingItem[]
}

function RankingRow({ item, max }: any) {
  const percentage = (item.totalHours / max) * 100

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 4,
        }}
      >
        <span style={{ color: 'white' }}>
          {getMedal(item.rank)} {item.subject.name}
        </span>

        <span style={{ color: '#94a3b8' }}>
          {item.totalHours}h
        </span>
      </div>
      <div
        style={{
          width: '100%',
          height: 8,
          background: '#020617',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: item.subject.color,
          }}
        />
      </div>
    </div>
  )
}

function getMedal(rank: number) {
  if (rank === 1) return '🥇'
  if (rank === 2) return '🥈'
  if (rank === 3) return '🥉'
  return `#${rank}`
}

export function RankingCard({ ranking }: Props) {
  if (!ranking.length) return null

  const max = Math.max(...ranking.map((r) => r.totalHours))

  return (
    <Card>
      <h3 style={{ color: '#f97316', marginBottom: 12 }}>
        🏆 Ranking de disciplinas
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {ranking.map((item) => (
          <RankingRow key={item.subject.id} item={item} max={max} />
        ))}
      </div>
    </Card>
  )
}