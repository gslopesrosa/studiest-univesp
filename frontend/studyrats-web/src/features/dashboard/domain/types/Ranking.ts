import { Subject } from './Calendar'

export interface RankingItem {
  rank: number
  subject: Subject
  totalMinutes: number
  totalHours: number
  sessionCount: number
}