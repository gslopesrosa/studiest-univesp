import { LoginParams } from '../types/LoginParams'
import { LoginResponse } from '../types/LoginResponse'

export interface LoginUseCase {
  execute(params: LoginParams): Promise<LoginResponse>
}