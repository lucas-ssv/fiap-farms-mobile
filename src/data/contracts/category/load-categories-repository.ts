import type { CategoryModel } from '@/domain/models/category'

export interface LoadCategoriesRepository {
  loadAll: () => Promise<LoadCategoriesRepository.Result>
}

export namespace LoadCategoriesRepository {
  export type Result = Array<CategoryModel>
}
