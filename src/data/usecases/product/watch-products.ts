import type { WatchProductsRepository } from '@/data/contracts/product'
import type { WatchProducts } from '@/domain/usecases/product'

export class WatchProductsImpl implements WatchProducts {
  private watchProductsRepository: WatchProductsRepository

  constructor(watchProductsRepository: WatchProductsRepository) {
    this.watchProductsRepository = watchProductsRepository
  }

  execute(onChange: WatchProducts.Params): WatchProducts.Result {
    return this.watchProductsRepository.watchAll(onChange)
  }
}
