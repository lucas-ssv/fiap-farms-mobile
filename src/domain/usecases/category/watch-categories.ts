import type { CategoryModel } from '@/domain/models/category'

export interface WatchCategories {
  execute: (onChange: WatchCategories.Params) => WatchCategories.Result
}

export namespace WatchCategories {
  export type Params = (categories: CategoryModel[]) => void

  export type Result = () => void
}
