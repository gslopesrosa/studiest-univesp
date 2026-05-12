import { useEffect, useState } from 'react'
import { Subject } from '@/features/subjects/domain/types/Subject'
import { SubjectApi } from '@/features/subjects/infrastructure/api/SubjectApi'
import { StudySessionApi } from '@/features/study/infrastructure/api/StudySessionApi'
import { SessionForm } from '../components/SessionForm'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export function NewSessionPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])

  const subjectApi = new SubjectApi()
  const sessionApi = new StudySessionApi()

  const navigate = useNavigate()

  async function loadSubjects() {
    const data = await subjectApi.getAll()
    setSubjects(data)
  }

  useEffect(() => {
    loadSubjects()
  }, [])

  async function handleSubmit(data: {
    subjectId: string
    totalMinutes: number
    date: string
  }) {
    const session = await sessionApi.create(data)
    toast.success('Sessão criada!')
    navigate(`/sessions/${session.id}/photo`)
  }

  return (
    <div style={{ padding: 24 }}>
      <SessionForm
        subjects={subjects}
        onSubmit={handleSubmit}
      />
    </div>
  )
}