import { useEffect, useState } from 'react'
import { DashboardApi } from '../../infrastructure/api/DashboardApi'
import { Streak } from '../../domain/types/Streak'
import { Calendar } from '../../domain/types/Calendar'
import { RankingItem } from '../../domain/types/Ranking'
import { Summary } from '../../domain/types/Summary'

export function useDashboard() {
  const api = new DashboardApi()


const [streak, setStreak] = useState<Streak | null>(null)
const [summary, setSummary] = useState<Summary | null>(null)
const [calendar, setCalendar] = useState<Calendar | null>(null)
const [ranking, setRanking] = useState<RankingItem[] | null>(null)

  useEffect(() => {
    async function load() {
      const today = new Date()
      const month = today.getMonth() + 1 
      const year = today.getFullYear()
      const [s, sum, cal, rank] = await Promise.all([
        api.getStreak(),
        api.getSummary(),
        api.getCalendar(month, year),
        api.getRanking(),
      ])

      setStreak(s)
      setSummary(sum)
      setCalendar(cal)
      setRanking(rank)
    }
    load()
  }, [])

  return { streak, summary, calendar, ranking }
}