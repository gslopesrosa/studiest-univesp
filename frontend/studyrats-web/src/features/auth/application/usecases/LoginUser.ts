import { LoginUseCase } from '../../domain/usecases/LoginUseCase'
import { LoginParams } from '../../domain/types/LoginParams'
import { LoginResponse } from '../../domain/types/LoginResponse'
import { AuthRepository } from '../protocols/AuthRepository'

export class LoginUser implements LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(params: LoginParams): Promise<LoginResponse> {
    const response = await this.authRepository.login(params)

    return response
  }
}