import type { UpdateCustomerRepository } from '@/data/contracts/customer'

export class UpdateCustomerRepositoryMock implements UpdateCustomerRepository {
  async update(
    customerId: string,
    data: UpdateCustomerRepository.Params
  ): Promise<void> {}
}
