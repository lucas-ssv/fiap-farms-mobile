import type { UpdateCategory } from '@/domain/usecases/category'

export interface UpdateCategoryRepository {
  update: (
    categoryId: string,
    data: UpdateCategoryRepository.Params
  ) => Promise<void>
}

export namespace UpdateCategoryRepository {
  export type Params = UpdateCategory.Params
}
