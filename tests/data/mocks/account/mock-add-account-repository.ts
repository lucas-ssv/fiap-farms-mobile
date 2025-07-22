import type { AddAccountRepository } from "@/data/contracts/account";

export class AddAccountRepositoryMock implements AddAccountRepository {
  async add(account: AddAccountRepository.Params): Promise<string> {
    return 'any_user_uid'
  }
}