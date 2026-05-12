import { RegisterParams } from '../types/RegisterParams'
import { RegisterResponse } from '../types/RegisterResponse'

export interface RegisterUseCase {
  execute(params: RegisterParams): Promise<RegisterResponse>
}