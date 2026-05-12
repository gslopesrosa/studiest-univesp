import { Card } from './Card'
import { Summary } from '../../domain/types/Summary'

interface Props {
  summary: Summary
}

function Section({ title, data }: any) {
  return (
    <div>
      <p style={{ color: '#94a3b8', fontSize: 14 }}>{title}</p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 6,
        }}
      >
        <Metric label="⏱ Tempo" value={`${data.totalHours}h`} />
        <Metric label="📚 Sessões" value={data.sessionCount} />
        <Metric label="📅 Dias" value={data.studiedDays ?? '-'} />
      </div>
    </div>
  )
}

function Metric({ label, value }: any) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: 12, color: '#94a3b8' }}>{label}</p>
      <strong style={{ color: 'white' }}>{value}</strong>
    </div>
  )
}

function Divider() {
  return (
    <div
      style={{
        height: 1,
        background: '#334155',
        margin: '12px 0',
      }}
    />
  )
}

export function SummaryCard({ summary }: Props) {
  return (
    <Card>
      <h3 style={{ color: '#f97316', marginBottom: 12 }}>
        📊 Resumo de estudos
      </h3>
      <Section title="Semana" data={summary.week} />
      <Divider />
      <Section title="Mês" data={summary.month} />
    </Card>
  )
}