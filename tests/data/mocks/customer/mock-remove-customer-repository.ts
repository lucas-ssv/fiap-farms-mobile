import type { RemoveCustomerRepository } from '@/data/contracts/customer'

export class RemoveCustomerRepositoryMock implements RemoveCustomerRepository {
  async remove(customerId: string): Promise<void> {}
}
