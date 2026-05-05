import { useState, useEffect } from 'react'
import { Subject } from '../../domain/types/Subject'

interface Props {
  onSubmit: (name: string, color: string) => void
  initialData?: Subject | null
}

export function SubjectForm({ onSubmit, initialData }: Props) {
  const [name, setName] = useState('')
  const [color, setColor] = useState('#7C3AED')

  useEffect(() => {
    if (initialData) {
      setName(initialData.name)
      setColor(initialData.color)
    }
  }, [initialData])

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <input
        placeholder="Nome da disciplina"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <button onClick={() => onSubmit(name, color)}>
        Salvar
      </button>
    </div>
  )
}