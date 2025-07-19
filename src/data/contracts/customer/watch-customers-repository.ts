import type { CustomerModel } from '@/domain/models/customer'

export interface WatchCustomersRepository {
  watchAll: (
    onChange: WatchCustomersRepository.Params
  ) => WatchCustomersRepository.Result
}

export namespace WatchCustomersRepository {
  export type Params = (customers: CustomerModel[]) => void

  export type Result = () => void
}
