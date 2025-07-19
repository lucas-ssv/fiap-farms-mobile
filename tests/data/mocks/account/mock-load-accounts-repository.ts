import type { LoadAccountsRepository } from "@/data/contracts/account";
import { mockAccountsResult } from "./mocks";

export class LoadAccountsRepositoryStub implements LoadAccountsRepository {
  async loadAll(): Promise<LoadAccountsRepository.Result> {
    return mockAccountsResult()
  }
}