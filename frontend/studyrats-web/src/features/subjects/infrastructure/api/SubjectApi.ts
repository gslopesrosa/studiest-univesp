import { api } from '@/shared/infrastructure/api/httpClient'
import { Subject } from '../../domain/types/Subject'

export class SubjectApi {
  async getAll(): Promise<Subject[]> {
    const { data } = await api.get('/subjects')
    return data
  }

  async create(name: string, color: string): Promise<Subject> {
    const { data } = await api.post('/subjects', {
      name,
      color,
    })
    return data
  }

  async update(id: string, name: string, color: string) {
    await api.put(`/subjects/${id}`, {
      name,
      color,
    })
  }

  async delete(id: string) {
    await api.delete(`/subjects/${id}`)
  }
}