import type { UpdateCustomerRepository } from '@/data/contracts/customer'
import type { UpdateCustomer } from '@/domain/usecases/customer'

export class UpdateCustomerImpl implements UpdateCustomer {
  private updateCustomerRepository: UpdateCustomerRepository

  constructor(updateCustomerRepository: UpdateCustomerRepository) {
    this.updateCustomerRepository = updateCustomerRepository
  }

  async execute(
    customerId: string,
    data: UpdateCustomer.Params
  ): Promise<void> {
    await this.updateCustomerRepository.update(customerId, data)
  }
}
