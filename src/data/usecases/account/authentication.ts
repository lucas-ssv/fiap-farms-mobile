import type { LoadAccountRepository } from "@/data/contracts/account";
import type { Authentication } from "@/domain/usecases/account";

export class AuthenticationImpl implements Authentication {
  constructor(private readonly loadAccountRepository: LoadAccountRepository) {}

  async execute(params: Authentication.Params): Promise<void> {
    await this.loadAccountRepository.auth({
      email: params.email,
      password: params.password,
    })
  }
}