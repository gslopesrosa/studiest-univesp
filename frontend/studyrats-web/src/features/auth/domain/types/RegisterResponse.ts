import { User } from '../entities/User'

export interface RegisterResponse {
  user: User
  token: string
}