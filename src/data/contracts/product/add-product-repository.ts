import type { AddProduct } from '@/domain/usecases/product'

export interface AddProductRepository {
  add: (
    data: AddProductRepository.Params
  ) => Promise<AddProductRepository.ProductId>
}

export namespace AddProductRepository {
  export type Params = AddProduct.Params

  export type ProductId = string
}
