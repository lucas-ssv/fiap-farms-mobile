import type { CustomerModel } from '@/domain/models/customer'

export interface WatchCustomers {
  execute: (onChange: WatchCustomers.Params) => WatchCustomers.Result
}

export namespace WatchCustomers {
  export type Params = (customers: CustomerModel[]) => void

  export type Result = () => void
}
