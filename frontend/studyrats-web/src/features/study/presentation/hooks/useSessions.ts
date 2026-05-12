import { useEffect, useState } from 'react'
import { StudySessionApi } from '../../infrastructure/api/StudySessionApi'
import { StudySession } from '../../domain/types/StudySession'

const api = new StudySessionApi()

export function useSessions() {
  const [sessions, setSessions] = useState<StudySession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const response = await api.getAll()

        setSessions(response.data)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return {
    sessions,
    loading,
  }
}