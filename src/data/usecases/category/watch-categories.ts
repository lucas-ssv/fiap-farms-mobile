import type { WatchCategoriesRepository } from '@/data/contracts/category'
import type { WatchCategories } from '@/domain/usecases/category'

export class WatchCategoriesImpl implements WatchCategories {
  private watchCategoriesRepository: WatchCategoriesRepository

  constructor(watchProductsRepository: WatchCategoriesRepository) {
    this.watchCategoriesRepository = watchProductsRepository
  }

  execute(onChange: WatchCategories.Params): WatchCategories.Result {
    return this.watchCategoriesRepository.watchAll(onChange)
  }
}
