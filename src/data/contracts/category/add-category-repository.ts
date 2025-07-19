export interface AddCategoryRepository {
  add: (
    data: AddCategoryRepository.Params
  ) => Promise<AddCategoryRepository.CategoryId>
}

export namespace AddCategoryRepository {
  export type Params = {
    name: string
    description?: string
    image?: File
  }

  export type CategoryId = string
}
