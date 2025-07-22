import type { WatchSalesRepository } from '@/data/contracts/sale'
import type { WatchSales } from '@/domain/usecases/sale'

export class WatchSalesImpl implements WatchSales {
  private watchSalesRepository: WatchSalesRepository

  constructor(watchSalesRepository: WatchSalesRepository) {
    this.watchSalesRepository = watchSalesRepository
  }

  execute(onChange: WatchSales.Params): WatchSales.Result {
    return this.watchSalesRepository.watchAll(onChange)
  }
}
