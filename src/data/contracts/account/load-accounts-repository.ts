import type { LoadAccounts } from "@/domain/usecases/account"

export interface LoadAccountsRepository {
  loadAll: () => Promise<LoadAccountsRepository.Result>
}

export namespace LoadAccountsRepository {
  export type Result = LoadAccounts.Result
}