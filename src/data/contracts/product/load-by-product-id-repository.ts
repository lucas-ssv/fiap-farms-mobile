import type { ProductModel } from '@/domain/models/product'

export interface LoadByProductIdRepository {
  loadByProductId: (
    productId: string
  ) => Promise<LoadByProductIdRepository.Result>
}

export namespace LoadByProductIdRepository {
  export type Result = ProductModel
}
