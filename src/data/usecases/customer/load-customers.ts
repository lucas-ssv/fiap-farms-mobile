import type { LoadCustomersRepository } from '@/data/contracts/customer'
import type { LoadCustomers } from '@/domain/usecases/customer'

export class LoadCustomersImpl implements LoadCustomers {
  private loadCustomersRepository: LoadCustomersRepository

  constructor(loadCustomersRepository: LoadCustomersRepository) {
    this.loadCustomersRepository = loadCustomersRepository
  }

  async execute(): Promise<LoadCustomers.Result> {
    return this.loadCustomersRepository.loadAll()
  }
}
