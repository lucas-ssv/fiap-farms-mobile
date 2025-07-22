import type { AddCustomer } from '@/domain/usecases/customer'

export interface AddCustomerRepository {
  add: (params: AddCustomerRepository.Params) => Promise<void>
}

export namespace AddCustomerRepository {
  export type Params = AddCustomer.Params
}
