export interface SummaryPeriod {
  totalMinutes: number
  totalHours: number
  sessionCount: number
  studiedDays?: number
}

export interface Summary {
  week: SummaryPeriod
  month: SummaryPeriod
  total: SummaryPeriod
}