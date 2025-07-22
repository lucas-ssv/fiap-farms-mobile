import type { WatchCustomersRepository } from '@/data/contracts/customer'
import type { WatchCustomers } from '@/domain/usecases/customer'

export class WatchCustomersImpl implements WatchCustomers {
  private watchCustomersRepository: WatchCustomersRepository

  constructor(watchProductsRepository: WatchCustomersRepository) {
    this.watchCustomersRepository = watchProductsRepository
  }

  execute(onChange: WatchCustomers.Params): WatchCustomers.Result {
    return this.watchCustomersRepository.watchAll(onChange)
  }
}
