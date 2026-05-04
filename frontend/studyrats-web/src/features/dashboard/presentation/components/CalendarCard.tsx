import { Card } from './Card'
import { Calendar } from '../../domain/types/Calendar'
import { DayCell } from './DayCell'

interface Props {
  calendar: Calendar
}

export function CalendarCard({ calendar }: Props) {
  const date = new Date(calendar.year, calendar.month - 1)

  const monthLabel = date.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  })

  const daysInMonth = new Date(
    calendar.year,
    calendar.month,
    0
  ).getDate()

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNumber = i + 1

    const existing = calendar.days.find((d) => {
      const [, , day] = d.date.split('T')[0].split('-')
      return Number(day) === dayNumber
    })

    return (
      existing || {
        date: `${calendar.year}-${String(calendar.month).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`,
        studied: false,
        totalMinutes: 0,
        sessionCount: 0,
        mainSubject: null,
      }
    )
  })

  const firstDay = new Date(calendar.year, calendar.month - 1, 1)
  const jsDay = firstDay.getDay()
  const startDay = jsDay === 0 ? 6 : jsDay - 1
  const emptyDaysStart = Array.from({ length: startDay })

  const totalCells = emptyDaysStart.length + days.length
  const remaining =
    totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7)

  const emptyDaysEnd = Array.from({ length: remaining })

  const weekDays = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']

  return (
    <Card>
      <h3 style={{ color: '#f97316', marginBottom: 12 }}>
        📅 {monthLabel}
      </h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          marginBottom: 8,
          fontSize: 12,
          color: '#94a3b8',
          textAlign: 'center',
        }}
      >
        {weekDays.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 6,
        }}
      >
        {emptyDaysStart.map((_, index) => (
          <div key={`start-${index}`} />
        ))}

        {days.map((day) => (
          <DayCell key={day.date} day={day} />
        ))}

        {emptyDaysEnd.map((_, index) => (
          <div key={`end-${index}`} />
        ))}
      </div>
    </Card>
  )
}