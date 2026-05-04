import { useDashboard } from '../hooks/useDashboard'
import { StreakCard } from '../components/StreakCard'
import { SummaryCard } from '../components/SummaryCard'
import { RankingCard } from '../components/RankingCard'
import { CalendarCard } from '../components/CalendarCard'

export function DashboardPage() {
  const { streak, summary, ranking, calendar } = useDashboard()

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ color: 'white' }}>Dashboard</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginTop: 16,
        }}
      >
        <StreakCard
          current={streak?.current || 0}
          best={streak?.best || 0}
          totalDays={streak?.totalDays || 0}
        />
        <div> {summary && <SummaryCard summary={summary} />}</div>
        {ranking && <RankingCard ranking={ranking} />}
        {calendar && <CalendarCard calendar={calendar} />}
      </div>
    </div>
  )
}