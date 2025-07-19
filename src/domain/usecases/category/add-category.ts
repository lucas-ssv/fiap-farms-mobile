export interface AddCategory {
  execute: (data: AddCategory.Params) => Promise<void>
}

export namespace AddCategory {
  export type Params = {
    name: string
    description?: string
    image?: File
  }
}
