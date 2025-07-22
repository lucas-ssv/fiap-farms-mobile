import type { RemoveCustomerRepository } from '@/data/contracts/customer'
import type { RemoveCustomer } from '@/domain/usecases/customer'

export class RemoveCustomerImpl implements RemoveCustomer {
  private removeCustomerRepository: RemoveCustomerRepository

  constructor(removeCustomerRepository: RemoveCustomerRepository) {
    this.removeCustomerRepository = removeCustomerRepository
  }

  async execute(customerId: string): Promise<void> {
    await this.removeCustomerRepository.remove(customerId)
  }
}
