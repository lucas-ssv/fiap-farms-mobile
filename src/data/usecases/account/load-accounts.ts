import type { LoadAccountsRepository } from "@/data/contracts/account";
import type { LoadAccounts } from "@/domain/usecases/account";

export class LoadAccountsImpl implements LoadAccounts {
  private loadAccountsRepository: LoadAccountsRepository

  constructor(loadAccountsRepository: LoadAccountsRepository) {
    this.loadAccountsRepository = loadAccountsRepository;
  }

  async execute(): Promise<LoadAccounts.Result> {
    return this.loadAccountsRepository.loadAll();
  }
}