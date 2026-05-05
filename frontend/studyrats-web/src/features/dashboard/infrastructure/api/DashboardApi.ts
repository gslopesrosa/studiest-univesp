import { api } from '@/shared/infrastructure/api/httpClient'

export class DashboardApi {
  async getStreak() {
    const { data } = await api.get('/dashboard/streak')
    return data
  }

  async getSummary() {
    const { data } = await api.get('/dashboard/summary')
    return data
  }

  async getCalendar(month: number, year: number) {
    const { data } = await api.get('/dashboard/calendar', {
      params: { month, year },
    })
    return data
  }

  async getRanking() {
    const { data } = await api.get('/dashboard/subjects-ranking')
    return data
  }
}