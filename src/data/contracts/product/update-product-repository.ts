import type { UpdateProduct } from '@/domain/usecases/product'

export interface UpdateProductRepository {
  update: (
    productId: string,
    data: UpdateProductRepository.Params
  ) => Promise<void>
}

export namespace UpdateProductRepository {
  export type Params = UpdateProduct.Params
}
