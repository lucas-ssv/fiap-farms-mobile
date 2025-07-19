import type { CategoryModel } from '@/domain/models/category'

export interface LoadCategories {
  execute: () => Promise<LoadCategories.Result>
}

export namespace LoadCategories {
  export type Result = Array<CategoryModel>
}
