import { LoginParams } from '../../domain/types/LoginParams'
import { LoginResponse } from '../../domain/types/LoginResponse'
import { RegisterParams } from '../../domain/types/RegisterParams'
import { RegisterResponse } from '../../domain/types/RegisterResponse'

export interface AuthRepository {
  login(params: LoginParams): Promise<LoginResponse>
  register(params: RegisterParams): Promise<RegisterResponse>
}