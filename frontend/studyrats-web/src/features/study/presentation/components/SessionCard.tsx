import { StudySession } from '../../domain/types/StudySession'

interface Props {
  session: StudySession
}

export function SessionCard({ session }: Props) {

  const formatDate = (date: string) => {
    const [year, month, day] = date.split('T')[0].split('-')

    return `${day}/${month}/${year}`
  }

  return (
    <div
      style={{
        background: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: 16,
        padding: 16,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <strong style={{ color: session.subject.color }}>
          {session.subject.name}
        </strong>

        <span style={{ color: '#94a3b8' }}>
          {formatDate(session.studyDate)}
        </span>
      </div>

      <p style={{ color: 'white', marginBottom: 8 }}>
        ⏱ {session.durationMinutes} min
      </p>

      {session.description && (
        <p
          style={{
            color: '#cbd5e1',
            marginBottom: 12,
          }}
        >
          {session.description}
        </p>
      )}

      {session.didExercises && (
        <p
          style={{
            color: '#f97316',
            marginBottom: 12,
          }}
        >
          📚 Exercícios: {session.exerciseCount}
        </p>
      )}

      {session.photos.length > 0 && (
        <img
          src={session.photos[0].imageUrl}
          alt=""
          style={{
            width: '100%',
            height: 220,
            objectFit: 'cover',
            borderRadius: 12,
          }}
        />
      )}
    </div>
  )
}