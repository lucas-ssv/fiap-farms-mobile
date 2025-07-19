import type { AddCustomerRepository } from '@/data/contracts/customer'

export class AddCustomerRepositoryMock implements AddCustomerRepository {
  async add(params: AddCustomerRepository.Params): Promise<void> {}
}
