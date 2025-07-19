import type { CategoryModel } from '@/domain/models/category'

export interface WatchCategoriesRepository {
  watchAll: (
    onChange: WatchCategoriesRepository.Params
  ) => WatchCategoriesRepository.Result
}

export namespace WatchCategoriesRepository {
  export type Params = (categories: CategoryModel[]) => void

  export type Result = () => void
}
