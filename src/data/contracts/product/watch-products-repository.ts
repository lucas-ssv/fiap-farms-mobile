import type { ProductModel } from '@/domain/models/product'

export interface WatchProductsRepository {
  watchAll: (
    onChange: WatchProductsRepository.Params
  ) => WatchProductsRepository.Result
}

export namespace WatchProductsRepository {
  export type Params = (products: ProductModel[]) => void

  export type Result = () => void
}
