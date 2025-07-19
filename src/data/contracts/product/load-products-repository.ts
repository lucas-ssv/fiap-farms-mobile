import type { LoadProducts } from '@/domain/usecases/product'

export interface LoadProductsRepository {
  loadAll: () => Promise<LoadProductsRepository.Result>
}

export namespace LoadProductsRepository {
  export type Result = LoadProducts.Result
}
