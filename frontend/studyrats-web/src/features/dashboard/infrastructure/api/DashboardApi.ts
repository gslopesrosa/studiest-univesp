import { tokenStorage } from '@/shared/infrastructure/storage/tokenStorage'

export class DashboardApi {
  private baseUrl = 'http://localhost:3333'

  private getHeaders() {
    const token = tokenStorage.get()

    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }

  async getStreak() {
    const res = await fetch(`${this.baseUrl}/dashboard/streak`, {
      headers: this.getHeaders(),
    })
    return res.json()
  }

  async getSummary() {
    const res = await fetch(`${this.baseUrl}/dashboard/summary`, {
      headers: this.getHeaders(),
    })
    return res.json()
  }

  async getCalendar(month: number, year: number) {
    const res = await fetch(
      `${this.baseUrl}/dashboard/calendar?year=${year}&month=${month}`,
      {
        headers: this.getHeaders(),
      }
    )

    return res.json()
  }

  async getRanking() {
    const res = await fetch(`${this.baseUrl}/dashboard/subjects-ranking`, {
      headers: this.getHeaders(),
    })
    return res.json()
  }
}