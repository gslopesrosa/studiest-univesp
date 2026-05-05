import { useState } from 'react'
import { Subject } from '@/features/subjects/domain/types/Subject'

interface Props {
  subjects: Subject[]
  onSubmit: (data: {
    subjectId: string
    totalMinutes: number
    date: string
  }) => void
}

export function SessionForm({ subjects, onSubmit }: Props) {
  const [subjectId, setSubjectId] = useState('')
  const [totalMinutes, setTotalMinutes] = useState(0)
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0]
  )

  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 400 }}>
      <select
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
      >
        <option value="">Selecione a disciplina</option>
        {subjects.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Tempo (minutos)"
        value={totalMinutes}
        onChange={(e) => setTotalMinutes(Number(e.target.value))}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button
        onClick={() =>
          onSubmit({
            subjectId,
            totalMinutes,
            date,
          })
        }
      >
        Salvar sessão
      </button>
    </div>
  )
}