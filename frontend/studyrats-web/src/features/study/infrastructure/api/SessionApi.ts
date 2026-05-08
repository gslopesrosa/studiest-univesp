import { api } from '@/shared/infrastructure/api/httpClient'

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
    const { data } = await api.get('/study-sessions')
    return data
  }
}