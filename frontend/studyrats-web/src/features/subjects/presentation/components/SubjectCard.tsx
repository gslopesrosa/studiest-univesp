import { Subject } from '../../domain/types/Subject'

interface Props {
  subject: Subject
  onEdit: (subject: Subject) => void
  onDelete: (id: string) => void
}

export function SubjectCard({ subject, onEdit, onDelete }: Props) {
  return (
    <div
      style={{
        background: '#020617',
        border: '1px solid #1e293b',
        borderRadius: 8,
        padding: 12,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: subject.color,
          }}
        />
        <span>{subject.name}</span>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => onEdit(subject)}>✏️</button>
        <button onClick={() => onDelete(subject.id)}>🗑️</button>
      </div>
    </div>
  )
}