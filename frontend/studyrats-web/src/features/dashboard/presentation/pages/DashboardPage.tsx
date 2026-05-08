import { useDashboard } from '../hooks/useDashboard'
import { StreakCard } from '../components/StreakCard'
import { SummaryCard } from '../components/SummaryCard'
import { RankingCard } from '../components/RankingCard'
import { CalendarCard } from '../components/CalendarCard'

export function DashboardPage() {
  const { streak, summary, ranking, calendar } =
    useDashboard()

  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <h1
        style={{
          color: 'white',
          fontSize: 20,
          marginBottom: 20,
        }}
      >
        Dashboard
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'start',
          gap: 20,
        }}
      >
        <StreakCard
          current={streak?.current || 0}
          best={streak?.best || 0}
          totalDays={streak?.totalDays || 0}
        />

        {summary && (
          <SummaryCard summary={summary} />
        )}

        {ranking && (
          <RankingCard ranking={ranking} />
        )}

        {calendar && (
          <CalendarCard calendar={calendar} />
        )}
      </div>
    </div>
  )
}