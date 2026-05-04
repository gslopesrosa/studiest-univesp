import { CalendarDay } from '../../domain/types/Calendar'

interface Props {
  day: CalendarDay
}

export function DayCell({ day }: Props) {
  const [, , dayNumber] = day.date.split('T')[0].split('-')

  const studied = day.studied

  return (
    <div
      title={`${day.date} - ${day.totalMinutes} min`}
      style={{
        aspectRatio: '1 / 1',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: studied ? '#1e293b' : '#020617',
        border: studied ? '1px solid #f97316' : '1px solid #1e293b',
        color: studied ? 'white' : '#475569',
        transition: '0.2s',
      }}
    >
      {studied ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            lineHeight: 1,
          }}
        >
          <span style={{ fontSize: 10, opacity: 0.7 }}>
            {dayNumber}
          </span>
          <span style={{ fontSize: 16 }}>📚</span>
        </div>
      ) : (
        <span>{dayNumber}</span>
      )}
    </div>
  )
}