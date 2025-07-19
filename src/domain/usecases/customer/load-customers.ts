import type { CustomerModel } from '@/domain/models/customer'

export interface LoadCustomers {
  execute: () => Promise<LoadCustomers.Result>
}

export namespace LoadCustomers {
  export type Result = Array<CustomerModel>
}
