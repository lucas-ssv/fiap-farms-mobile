import type { AddAccountRepository, SaveUserRepository } from "@/data/contracts/account"
import type { AddAccount } from "@/domain/usecases/account"

export class AddAccountImpl implements AddAccount {
  constructor(
    private readonly addAccountRepository: AddAccountRepository,
    private readonly saveUserRepository: SaveUserRepository
  ) {}

  async execute(account: AddAccount.Params): Promise<void> {
    const userUID = await this.addAccountRepository.add(account)
    await this.saveUserRepository.save({
      userUID,
      name: account.name,
      username: account.username,
      email: account.email,
    })
  }
}