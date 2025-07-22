import type { ProductModel } from '@/domain/models/product'

export interface WatchProducts {
  execute: (onChange: WatchProducts.Params) => WatchProducts.Result
}

export namespace WatchProducts {
  export type Params = (products: ProductModel[]) => void

  export type Result = () => void
}
