import { RegisterUseCase } from '../../domain/usecases/RegisterUseCase'
import { RegisterParams } from '../../domain/types/RegisterParams'
import { RegisterResponse } from '../../domain/types/RegisterResponse'
import { AuthRepository } from '../protocols/AuthRepository'

export class RegisterUser implements RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(params: RegisterParams): Promise<RegisterResponse> {
    return this.authRepository.register(params)
  }
}