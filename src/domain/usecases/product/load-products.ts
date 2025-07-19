import type { ProductModel } from '@/domain/models/product'

export interface LoadProducts {
  execute: () => Promise<LoadProducts.Result>
}

export namespace LoadProducts {
  export type Result = Array<ProductModel>
}
