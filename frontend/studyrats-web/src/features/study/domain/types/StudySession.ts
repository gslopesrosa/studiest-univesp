export interface StudySession {
  id: string
  studyDate: string
  durationMinutes: number
  description: string
  didExercises: boolean
  exerciseCount: number

  subject: {
    id: string
    name: string
    color: string
  }

  photos: {
    id: string
    imageUrl: string
  }[]
}