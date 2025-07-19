export interface UpdateProduct {
  execute: (productId: string, data: UpdateProduct.Params) => Promise<void>
}

export namespace UpdateProduct {
  export type Params = {
    name?: string
    price?: number
    cost?: number
    categoryId?: string
    stock?: number
    minStock?: number
    maxStock?: number
    unit?: string
    description?: string
    image?: string | File
  }
}
