export interface Subject {
  id: string
  name: string
  color: string
  createdAt: string
}

export interface CalendarDay {
  date: string
  studied: boolean
  totalMinutes: number
  sessionCount: number
  mainSubject:  Subject | null
}

export interface CalendarSummary {
  studiedDays: number
  totalMinutes: number
  totalSessions: number
}

export interface Calendar {
  year: number
  month: number
  days: CalendarDay[]
  summary: CalendarSummary
}