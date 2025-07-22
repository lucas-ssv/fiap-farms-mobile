import type { LoadCategoriesRepository } from '@/data/contracts/category'
import type { LoadCategories } from '@/domain/usecases/category'

export class LoadCategoriesImpl implements LoadCategories {
  private loadCategoriesRepository: LoadCategoriesRepository

  constructor(loadCategoriesRepository: LoadCategoriesRepository) {
    this.loadCategoriesRepository = loadCategoriesRepository
  }

  async execute(): Promise<LoadCategories.Result> {
    return await this.loadCategoriesRepository.loadAll()
  }
}
