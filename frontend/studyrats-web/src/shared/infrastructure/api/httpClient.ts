import axios from 'axios'
import { tokenStorage } from '@/shared/infrastructure/storage/tokenStorage'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})

api.interceptors.request.use((config) => {
  const token = tokenStorage.get()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})