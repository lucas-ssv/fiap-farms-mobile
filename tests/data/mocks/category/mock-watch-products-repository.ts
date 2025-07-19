import type { WatchCategoriesRepository } from '@/data/contracts/category'
import type { CategoryModel } from '@/domain/models/category'

export class WatchCategoriesRepositoryStub implements WatchCategoriesRepository {
  watchAll(
    onChange: WatchCategoriesRepository.Params
  ): WatchCategoriesRepository.Result {
    const categories: CategoryModel[] = [
      {
        id: 'any_category_id',
        name: 'any_category_name',
        description: 'any_category_description',
        image: 'any_category_image',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    onChange(categories)
    return () => {}
  }
}
