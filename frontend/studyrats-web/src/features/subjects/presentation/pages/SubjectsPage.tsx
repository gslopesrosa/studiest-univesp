import { useEffect, useState } from 'react'
import { Subject } from '../../domain/types/Subject'
import { SubjectApi } from '../../infrastructure/api/SubjectApi'
import { SubjectCard } from '../components/SubjectCard'
import { SubjectForm } from '../components/SubjectForm'

export function SubjectsPage() {
  const api = new SubjectApi()

  const [subjects, setSubjects] = useState<Subject[]>([])
  const [editing, setEditing] = useState<Subject | null>(null)

  async function loadSubjects() {
    const data = await api.getAll()
    setSubjects(data)
  }

  useEffect(() => {
    loadSubjects()
  }, [])

  async function handleCreate(name: string, color: string) {
    await api.create(name, color)
    setEditing(null)
    loadSubjects()
  }

  async function handleUpdate(name: string, color: string) {
    if (!editing) return

    await api.update(editing.id, name, color)
    setEditing(null)
    loadSubjects()
  }

  async function handleDelete(id: string) {
    await api.delete(id)
    loadSubjects()
  }

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>📚 Disciplinas</h2>

      <SubjectForm
        onSubmit={editing ? handleUpdate : handleCreate}
        initialData={editing}
      />

      <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}