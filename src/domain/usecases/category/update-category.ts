export interface UpdateCategory {
  execute: (categoryId: string, data: UpdateCategory.Params) => Promise<void>
}

export namespace UpdateCategory {
  export type Params = {
    name?: string
    description?: string
    image?: string | File
  }
}
