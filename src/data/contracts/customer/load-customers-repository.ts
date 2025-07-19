import type { LoadCustomers } from '@/domain/usecases/customer'

export interface LoadCustomersRepository {
  loadAll: () => Promise<LoadCustomersRepository.Result>
}

export namespace LoadCustomersRepository {
  export type Result = LoadCustomers.Result
}
