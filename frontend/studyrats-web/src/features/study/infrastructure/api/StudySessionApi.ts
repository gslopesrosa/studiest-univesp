import { api } from '@/shared/infrastructure/api/httpClient'
import { tokenStorage } from '@/shared/infrastructure/storage/tokenStorage'
import { API_URL } from '@/shared/config/api'

export class StudySessionApi {
   async create(data: {
    subjectId: string
    studyDate: string
    durationMinutes: number
    description: string
    didExercises: boolean
    exerciseCount: number
  }) {
    const { data: response } = await api.post(
      '/study-sessions',
      data
    )

    return response
  }

  async getAll() {
  const token = tokenStorage.get()

  const response = await fetch(`${API_URL}/study-sessions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Erro ao buscar sessões')
  }

  return response.json()
}

  async uploadPhoto(sessionId: string, photo: File) {
  const token = tokenStorage.get()

  const formData = new FormData()

  formData.append('photo', photo)

  const response = await fetch(
    `${API_URL}/study-sessions/${sessionId}/photos`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  )

  if (!response.ok) {
    throw new Error('Erro ao enviar foto')
  }

  return response.json()
}
}