import type { UpdateCustomer } from '@/domain/usecases/customer'

export interface UpdateCustomerRepository {
  update: (
    customerId: string,
    data: UpdateCustomerRepository.Params
  ) => Promise<void>
}

export namespace UpdateCustomerRepository {
  export type Params = UpdateCustomer.Params
}
