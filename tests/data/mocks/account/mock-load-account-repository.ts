import type { LoadAccountRepository } from "@/data/contracts/account";

export class LoadAccountRepositoryMock implements LoadAccountRepository {
  async auth(params: LoadAccountRepository.Params): Promise<void> {}
}