export interface Profile {
  id: string
  name: string
  email: string
  avatarUrl?: string
  createdAt: string

  stats: {
    totalStudyMinutes: number
    totalSessions: number
    subjectsCount: number
  }
}