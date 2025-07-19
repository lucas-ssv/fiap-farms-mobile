import type { AddCustomerRepository } from '@/data/contracts/customer'
import type { AddCustomer } from '@/domain/usecases/customer'

export class AddCustomerImpl implements AddCustomer {
  private addCustomerRepository: AddCustomerRepository

  constructor(addCustomerRepository: AddCustomerRepository) {
    this.addCustomerRepository = addCustomerRepository
  }

  async execute(data: AddCustomer.Params): Promise<void> {
    await this.addCustomerRepository.add(data)
  }
}
